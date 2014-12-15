---
layout: post
title: "使用Erlang建立IVR实现复杂业务逻辑"
tags:
  - "ivr"
  - "erlang"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


曾写过一篇[使用XML实现IVR](http://www.freeswitch.org.cn/blog/past/2010/3/21/yong-freeswitchshi-xian-ivr/)
。但当你要实现更复杂、更智能的业务逻辑时，你免不了跟数据库或其它系统交互。我们曾用Ruby借助event\_socket实现过比较复杂的功能，但当业务变得更加复杂时，我们使用Erlang重写了整个逻辑。

什么是 Erlang ?
----

[Erlang](http://www.erlang.org/)是一种函数式编程语言，它天生支持高并发，高可靠性的编程。

为什么使用 Erlang ?
----

Erlang 最初就是设计用来编写电信程序的，它具有OTP（开放电信平台）库，使用它可以很容易地实现FSM（有限状态机）。

我们的PBX服务器运行在办公室里，但当有电话进来时它需要到国外的一台服务器上取数据，并以此来选择坐席。呼叫过程中，它也需要更新远程的数据。我们使用HTTP与远程服务器交互。如此长距离的通信不仅会有很大的延时，而且经常会失败。FreeSWITCH本身有mod\_http及mod\_curl模块，并且其它嵌入式脚本语言也都有HTTP支持，但我们认为Erlang会更加健壮。而且，通过使用Erlang的轻量级进程，当一有电话进来时，我们可以一边启动IVR拨放欢迎词，一边spawn一个新进程到远程HTTP上取数据。当IVR运行到需要数据进行决策时，绝大多数情况下这些数据已经有了。即使获取数据失败，我们也可以以默认的方式进行路由。这样，客户就不会感觉到任何延迟。

实现
----

我们使用[mod\_erlang\_socket](http://wiki.freeswitch.org/wiki/Mod_erlang_event)的outbound模式。当有电话进来时，FreeSWITCH会通过dialplan立即把控制权交给Erlang。

    <extension name="icall_fsm">
      <condition field="destination_number" expression="^fsm$">
        <action application="erlang" data="icall:fsm acd@192.168.1.27"/>
      </condition>
    </extension>

其中，Erlang程序acd运行在节点192.168.1.27上，FreeSWITCH会使用RPC调用执行icall:fsm()并在Erlang中启动一个有限状态机，它接下来会控制呼叫流程，实现进行状态转移，直到呼叫结束。并且，在呼叫过程中我们还通过db\_pbx模块与数据库及远程HTTP交互。Erlang实现的FSM代码真的非常好看。

	-module(icall). 
	-behaviour(gen_fsm).
	 
	-export([start/0, stop/0, fsm/1, init/1, welcome/2, handle_info/3, handle_event/3, terminate/3]).
	-export([welcome_wait_playback/2, main_menu/2, main_menu_wait_dtmf/2, call_hst/2, call_sales/2, call_cc/2, call_extn/2, 
		call_cellphone/2, final_loop/2]).
	 
	-import(freeswitch_msg, [get_var/2, get_var/3, sendmsg/3]).
	
	start() -> gen_fsm:start(icall_fsm, [], []). 
	stop() ->  gen_fsm:send_all_state_event(self(), stop).
	fsm(Ref) ->
		{ok, NewPid} = ?MODULE:start(),
		{Ref, NewPid}.
	
	
	%% send a stop this will end up in "handle_event" 
	% stop() -> gen_fsm:send_all_state_event(hello, stopit). 
	%% -- interface end 
	% This initialisation routine gets called 
	init(State) -> 
		io:format("icall_fsm init ~p, PID: ~p~n", [State, self()]),
		{ok, welcome, []}. 
	
	%% The state machine
	welcome([], []) ->
		{next_state, welcome, []};
	% welcome(UUID, []) ->
	% 	{next_state, welcome, [UUID]};
	welcome({call, {event, [UUID | Data]}}, []) -> 
		CallerID = get_var("Channel-Caller-ID-Number", Data, "00000000"),
		Pid = self(),
		spawn(fun() -> fetch_cc_extn_from_crm(Pid, CallerID) end),
		io:format("New call from [~p]~n", [CallerID]),
		db_pbx:new_call(UUID, Data),
		sendmsg(UUID, playback, "new_sales/1000.wav"),
		{next_state, welcome_wait_playback, UUID}.
		
	welcome_wait_playback({call_event, {event, [UUID | Data]} }, UUID) ->
		Name = get_var("Event-Name", Data),
		App = get_var("Application", Data),
	
		error_logger:info_msg("welcome_wait_playback: Pid ~p: UUID ~p, Event ~p~n",[self(), UUID, Name]),
	
		case Name of
			"CHANNEL_EXECUTE_COMPLETE" when App =:= "playback" ->
				NextState = route_time_condition(UUID),
				gen_fsm:send_event(self(), UUID),
				{next_state, NextState, UUID};
			_ ->
				{next_state, welcome_wait_playback, UUID}
		end.
		
	main_menu(UUID, UUID) ->
		sendmsg(UUID, play_and_get_digits, "1 1 3 5000 # new_sales/1001.wav new_sales/9004.wav menu_number [1-5]"),
		db_pbx:log(UUID, "MainMenu", ""),
		gen_fsm:send_event(self(), {call_event, {event, [UUID]}}),
		{next_state, main_menu_wait_dtmf, UUID}.
	main_menu_wait_dtmf({call_event, {event, [UUID | Data]} }, UUID) ->
	    Name = get_var("Event-Name", Data),
		App = get_var("Application", Data),
	
		error_logger:info_msg("Pid ~p: UUID ~p, Event ~p, State: main_menu_wait_dtmf~n",[self(), UUID, Name]),
	
		case Name of
			"CHANNEL_EXECUTE_COMPLETE" when App =:= "play_and_get_digits" ->
				MenuNumber = get_var("variable_menu_number", Data),
				db_pbx:log(UUID, "MainMenu", MenuNumber),
				case MenuNumber of
					"1" -> 
						gen_fsm:send_event(self(), UUID),
						{next_state, call_hst, UUID};
					"5" -> 
						%<min> <max> <tries> <timeout> <terminators> <file> <invalid_file> <var_name> <regexp>
						sendmsg(UUID, play_and_get_digits, "3 3 3 5000 # new_sales/2002.wav new_sales/9004.wav extn_number [68]\\d\\d"),
						{next_state, call_extn, no_extn};
					X when X == "2"; X == "3"; X == "4" ->
						gen_fsm:send_event(self(), UUID),
						{next_state, call_sales, UUID};
					_ ->
						sendmsg(UUID, playback, "new_sales/9003.wav"),
						timer:sleep(5000),
						sendmsg(UUID, hangup, ""),
						{next_state, final_loop, UUID}
				end;
			_ ->
				{next_state, main_menu_wait_dtmf, UUID}			
		end.
		
	call_hst(UUID, UUID) ->
		transfer(UUID, "fifo_hst"),
		{next_state, final_loop, UUID}.
	
	call_cellphone(UUID, UUID) ->
		transfer(UUID, "fifo_cellphone"),
		{next_state, final_loop, UUID}.
	
	call_sales(UUID, UUID) ->
		case get(cc_extn) of 
			undefined ->
				transfer(UUID, "fifo_sales"),
				db_pbx:log(UUID, "SalesFifo", ""),
				{next_state, final_loop, UUID};
			Extn ->
				play_intransfer(UUID),
				sendmsg(UUID, set, "ringback=${us-ring}"),
				sendmsg(UUID, set, "continue_on_fail=true"),
				sendmsg(UUID, set, "hangup_after_bridge=true"),
				sendmsg(UUID, bridge, "user/" ++ Extn),
				db_pbx:log(UUID, "CallCC", Extn),
				{next_state, call_cc, Extn}
		end.
	
	call_cc({call_event, {event, [UUID | Data]} }, Extn) ->
	    Name = get_var("Event-Name", Data),
		App = get_var("Application", Data),
	
	    error_logger:info_msg("Pid ~p: UUID ~p, Event ~p, Extn ~p~n",[self(), UUID, Name, Extn]),
	
		case Name of
			"CHANNEL_EXECUTE_COMPLETE" when App =:= "bridge" ->
				HangupCause = get_var("variable_originate_disposition", Data),
				DialedUser = get_var("variable_dialed_user", Data),
				sendmsg(UUID, play_and_get_digits, "1 1 2 5000 # new_sales/8" ++ Extn ++
					".wav new_sales/9004.wav cc_menu_number [12]"),
				db_pbx:log(UUID, "CCFailure", HangupCause),
				{next_state, call_cc, Extn};
			"CHANNEL_EXECUTE_COMPLETE" when App =:= "play_and_get_digits" ->
				CCMenuNumber = get_var("variable_cc_menu_number", Data),
				case CCMenuNumber of
					"1" -> sendmsg(UUID, transfer, "Playcell_" ++ Extn);
					"2" -> sendmsg(UUID, transfer, "VM_" ++ Extn);
					_ -> sendmsg(UUID, transfer, "Quit")
				end,
				{next_state, final_loop, UUID};
			_ -> 
				{next_state, call_cc, Extn}
		end.
		
	call_extn({call_event, {event, [UUID | Data]} }, no_extn) ->
	    Name = get_var("Event-Name", Data),
		App = get_var("Application", Data),
	
		error_logger:info_msg("Pid ~p: UUID ~p, Event ~p, State: call_extn",[self(), UUID, Name]),
	
		case Name of
			"CHANNEL_EXECUTE_COMPLETE" when App =:= "play_and_get_digits" ->
				Extn = get_var("variable_extn_number", Data),
				db_pbx:log(UUID, "CallExtn", Extn),
				gen_fsm:send_event(self(), UUID),
				{next_state, call_extn, Extn};
			_ ->
				{next_state, call_extn, no_extn}
		end;
	
	call_extn(UUID, Extn) ->
		io:format("Calling extn: ~p~n", [Extn]),
		% sendmsg(UUID, set, "campon=true"),
		sendmsg(UUID, set, "ringback=${us-ring}"),
		sendmsg(UUID, set, "continue_on_fail=true"),
		sendmsg(UUID, set, "hangup_after_bridge=true"),
		DialString = "user/" ++ Extn,
		sendmsg(UUID, bridge, DialString),
		{next_state, call_cc, Extn}.
	
		
	final_loop({call_event, {event, [UUID | Data]} }, UUID) ->
		Name = get_var("Event-Name", Data),
	
		error_logger:info_msg("final_loop Pid ~p: UUID ~p, Event ~p~n",[self(), UUID, Name]),
	
		{next_state, final_loop, UUID};
	final_loop(UUID, UUID) ->
		{next_state, final_loop, UUID}.
	
	handle_info({cc_extn, error}, State, Data) ->
		{next_state, State, Data};
	handle_info({cc_extn, Extn}, State, Data) ->
		put(cc_extn, Extn),
		io:format("Found CC Extn: ~p~n", [Extn]),
		{next_state, State, Data};
	handle_info(call_hangup, State, Args) ->
		io:format("Hangup ~p ~p ~n", [State, Args]),
		{stop, normal, State};
	handle_info({E, {event, [UUID | Data]}} = Event, State, StateData) ->
		Name = get_var("Event-Name", Data),
		App = list_to_atom(get_var("Application", Data, "undefined")),
	
		error_logger:info_msg("handle_info: ~p ~p ~p ~p~n~p~n",[self(), UUID, Name, State, StateData]),
	
		case Name of
			"CHANNEL_HANGUP_COMPLETE"->
				db_pbx:hangup(UUID, Data),
				% {next_state, final_loop, UUID};
				{stop, normal, UUID};
			"CUSTOM" ->
				SubClass = get_var("Event-Subclass", Data),
				Action = get_var("FIFO-Action", Data),
	
				io:format("Fifo: ~p ~p~n", [SubClass, Action]),
	
				case SubClass of
					"fifo::info" when Action =:= "bridge-caller" ->
						db_pbx:process(UUID, Data);
					_ -> ok
				end,
				{next_state, State, StateData};
			_ ->
				List = [welcome, welcome_wait_playback, main_menu_wait_dtmf, call_cc, call_extn],
				case lists:any(fun(Elem) -> Elem =:= State end, List) of
					true ->
						gen_fsm:send_event(self(), Event);
					_ -> ok
				end,
				{next_state, State, StateData}
		end;
	handle_info(Info, State, Data) ->
		io:format("Got Other Info: ~p ~p ~p ~n", [Info, State, Data]).
	
	handle_event(stop, _StateName, StateData) ->  
	 	{stop, normal, StateData}.
	terminate(normal, _StateName, _StateData) ->  
		io:format("Stop with reason: normal ~p ~p~n", [_StateName, _StateData]),
	  	ok;
	terminate(Reason, _StateName, _StateData) ->
		io:format("Stop with reason: ~p ~p ~p~n", [Reason, _StateName, _StateData]),
	  	ok.
	
	
	%% private
		
	route_time_condition(UUID) ->
		case db_pbx:get_time_condition("sales_icall") of
			{Action, Args} ->
				case Action of
					% "idp_acd:" ++ ErlAction ->
					% 	Fun = list_to_atom(ErlAction),
					% 	db_pbx:log(UUID, "TimeCondition", ErlAction ++ " " ++ Args),
					% 	?MODULE:Fun(UUID, Args);
					Action -> 
						db_pbx:log(UUID, "TimeCondition", Action ++ " " ++ Args), 
						sendmsg(UUID, list_to_atom(Action), Args),
						final_loop
				end;
			_ ->
				{Date, {Hour, Min, _Sec}} = erlang:localtime(),
				Weekday = calendar:day_of_the_week(Date),
				route_work_time(UUID, Weekday, Hour, Min)
		end.	
	
	route_work_time(UUID, Weekday, Hour, Min)
		when Weekday > 5 andalso Hour > 10 andalso (Hour < 20 orelse ( Min < 30 andalso Hour < 21) ) ->
		db_pbx:log(UUID, "Weekend", "10:00 - 20:30"),
		main_menu;
	route_work_time(UUID, Weekday, Hour, Min) when Hour > 9 andalso (Hour < 20 orelse (Min < 30 andalso Hour < 21 ))->
		db_pbx:log(UUID, "Workday", "Weekend 9:00 - 20:30"),
		main_menu;
	route_work_time(UUID, _Weekday, Hour, Min) when (Hour > 21 orelse (Hour > 20 andalso Min > 30)) andalso Hour < 23 ->
		db_pbx:log(UUID, "Time", "20:30 - 23:00"),
		call_hst;
	route_work_time(UUID, _Weekday, _Hour, _Min) ->
		db_pbx:log(UUID, "NonWorktime", "Cellphone"),
		call_cellphone.
		
	transfer(UUID, Dest) ->
		transfer(UUID, Dest, "XML", "new_sales").
	transfer(UUID, Dest, Dialplan, Context) ->
		sendmsg(UUID, transfer, Dest ++ " " ++ Dialplan ++ " " ++ Context).
		
	play_intransfer(UUID) ->
		sendmsg(UUID, playback, "new_sales/1002.wav"),
		timer:sleep(3000).
		
	fetch_cc_extn_from_crm(Pid, CallerID) ->
		Extn = case helpers:http_fetch(?CRM_APP, "/voip/cdrs?caller_id=" ++ CallerID) of
			{error, _} -> error;
			Number -> Number
		end,
			
		 Pid ! {cc_extn, Extn}.
	
其它讨论
----

1） Erlang在这里是完全异步的。所以，当你通知FreeSWITCH执行一个application时（如playback），你必须等待收到CHANEL\_EXECUTE\_COMPLETE事件再进行下一步操作。这比起直接在dialplan或lua脚本中要麻烦一些，但正因为你是异步的，你可以随时终止正在执行的application。当然，如果你非要同步并且你知道某程序要执行多长时间时（如你知道要playback的声音文件的长度），你也可以用timer:sleep延时一下。

2）当我们觉得不再需要Erlang的特性时，我们会把流程转到dialplan，毕竟修改XML要容易些。

3）mod\_fifo在Erlang中不能很好工作，除非你在fifo结束时将流程transfer到其它地方。因为channel在送到Erlang关是park的，而fifo中bridge到另一分机时无法解除park状态。这也是为什么我们在最后都送流程再送回dialplan。

4）代码已经很清晰了，但我想，如果有时间能现写个gen\_fs\_behaviour之类的东东把FreeSWITCH的事件消息包装一下会更好看。

本文也有一个英文版本：<http://www.dujinfang.com/past/2010/4/22/build-a-complex-hence-powerful-freeswitch-ivr-in-erlang/>
