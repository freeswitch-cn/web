---
layout: post
title: "使用 Erlang 控制呼叫流程"
tags:
  - "book"
  - "erlang"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


## 概述

Erlang 是一门函数式编程语言。相比其它语言来说，它是一门小众语言，但它具有轻量级多进程、高并发、热代码替换等地球人不能拒绝的特性，并非常易于创建集群应用(Cluster)。更重要的是，它天生就是为了编写**电信应用**的。

除电信领域外，它在游戏及金融领域也担负着重要的作用。就 FreeSWITCH 来讲，[OpenACD](https://github.com/OpenACD) 及 [Whistle](http://www.2600hz.org/) 已是比较成熟的项目。
 
FreeSWITCH 有一个原生的模块叫 mod\_erlang_socket，它作为一个隐藏的Erlang节点(Hidden Node)可以与任何 Erlang 节点通信。

以下假定读者有一定 Erlang 基础，其基本原理和语法就不再赘述。

## 安装 Erlang 模块

Erlang 模块默认是不安装的，首先请确认你的机器上已经安装 Erlang。我总是通过源代码安装（./configure && make && make install），如果通过管理工具安装的请确认有 erlang-devel 或  erlang-dev 包。

确认安装好 Erlang 环境以后，在 FreeSWITCH 源代码目录中重新执行 ./configure，以产生相关的 Makefile。

然后执行

     make mod_erlang_event-install

在 FreeSWITCH 控制台上执行
 
     load mod_erlang_event

## 把电话控制权转给 Erlang

在该例子中，Erlang 程序作为一个节点运行，它类似于 Event Socket 概念中的外连套接字（outbound socket）。

在我们开始之前，先检查 Erlang 模块的设置，确认 erlang\_event.conf.xml 中有以下三行（其它的行不动）.

     <param name="nodename" value="freeswitch@localhost"/>
     <param name="encoding" value="binary"/>
     <param name="cookie" value="ClueCon"/>

其中第一行的 nodename 是为了强制 FreeSWITCH 节点的名字，如果不配置的话，FreeSWITCH 会自己的节点起一个最适合的名字，但我们发现它自己起的名字并不总是正确，因此在这里为了防止引起任何可能的错误，人工指定一个名字。注意这里我们使用了短名字，如果你的 Erlang 程序在另一台机器上，你应该使用长名字。

第二行，我们使用二进制编码。默认的节点间通信使用文本编码，文本编码比二进制编码效率要低一些。

第三行，设置该节点的 Cookie。注意要与 Erlang 节点的要相同。

在 Erlang 代码里，我们先定义一些宏：

    -define(FS_NODE, 'freeswitch@localhost').
    -define(WELCOME_SOUND, "tone_stream://%(100,1000,800);loops=1").
    -define(INPUT_NUMBER_SOUND, "tone_stream://%(100,1000,800);loops=2").

在这里，欢迎音（WELCOME_SOUND ）是一个”嘀“声，请输入一个号码（INPUT_NUMBER_SOUND）使用两个"嘀"声。我们这么做的目的是使读者能直接编译代码而不用依赖于任何声音文件，当然，为了能更好的理解这个例子，你应该换成更观的声音文件，如“/tmp/welcome.wav”（您好，欢迎，请输入一个号码 ....）。

为了使用整个通信过程更加透明化，我没有使用缺省的 freeswitch.erl 库，而是自己写了几个函数用于在 Erlang 程序和 FreeSWITCH 间传递真正的消息。

## 把电话发给 Erlang

在 outbound 模式下，FreeSWITCH （可以看作一个客户端）会连接到你的 Erlang 程序节点（可以看作一个服务器）上，并把进来的电话控制权送给它。

在 Dialplan 中有两种设置方法：

     <extension name="test">
          <condition field="destination_number" expression="^7777$">
               <action application="erlang" data ="ivr:start test@localhost"/>
          </condition>
     </extension>
     <extension name="test">
          <condition field="destination_number" expression="^7778$">
               <action application="erlang" data ="ivr:! test@localhost"/>
          </condition>
     </extension>


### 7777 法

7777 法是我起的名字。在这种方法里，如果你呼叫 7777, FreeSWITCH 会首先将当前的 Channel 给 Park 起来，并给你的 Erlang 程序（test@localhost 节点）发送一个 RPC 调用，调用的函数为：ivr:start(Ref)。其中，ivr:start 是你在上述 XML 中定义的，Ref 则是由 FreeSWITCH 端生成的针对该请求的唯一引用。在 Erlang 端，start/1 函数应该 spawn 一个新的进程，并且并新进程的 PID 返回，FreeSWITCH 收到后会将与该 Channel 相关的所有事件（Event）送给该进程。

     start(Ref) ->
          NewPid = spawn(fun() -> serve() end),
          {Ref, NewPid}.

上述代码产生一个新进程，新进程将运行 serve() 函数，同时原来的进程会将新进程的 Pid 返回给 FreeSWITCH。

这是用 Erlang 控制呼叫的最简单的方法。任何时候来了一个呼叫，FreeSWITCH 发起一个远端 RPC 调用给 Erlang, Erlang 端启动一个新进程来控制该呼叫。由于 Erlang 的进程都是非常轻量级的，因而这种方式非常优雅（当然，Erlang 端也不用每次都启动一个新进程，比如说可以事先启动一组 Pid，看到进来的请求时选择一个空闲的进程来为该电话服务。当然，正如我们一再强调的，Erlang 中的进程是非常轻量级的，产生一个新进程也是相当快的，所以，没有必要用这种传统软件中“进程池”那么复杂方法）。

我们将在后面再讨论 serve() 函数。

### 7778 法

除了使用 RPC 生成新的进程外，还可以用另外一种方法产生新进程。如上面 7778 所示，与 7777 不同的是，其中的 ivr:start 中的 *start* 换成了“*！*”。该方法需要你首先在 Erlang 端启动一个进程，该进程监听也有进来的请求。当 FreeSWITCH 把电话路由到 Erlang 节点时，“*！*”语法说明，FreeSWITCH 会发送一个 *{getpid, ...}* 消息给 Erlang，意思是说，我这里有一个电话，告诉我哪个 Pid 可以处理。这种方法比上一种方法稍微有点复杂，但程序有更大的自由度。

	start() ->
	      register(ivr, self()),
	      loop().
	 loop() ->
	      receive
	          {get_pid, UUID, Ref, FSPid} ->
	                NewPid = spawn(fun() -> serve() end),
	                FSPid ! {Ref, NewPid},
	                ?LOG("Main process ~p spawned new child process ~p~n", [self(), NewPid]),
	                loop();
	           _X ->
	                loop()
	end.

上面的代码中，用户应在 Erlang 节点启动后首先执行 start/0 以启动监听。start() 时，将首先注册一个名字，叫 ivr，然后进入 loop 循环等待接收消息。一旦它收到 {get_pid, ...} 消息，就 spawn 一个新的进程，并把新进程的 Pid 发送给 FreeSWITCH，然后再次等待新的消息。在这里，新产生的进程同样执行 serve() 函数为新进来的 Channel 服务。

## 呼叫控制

我们来做这样一个例子。当有电话进入时，它首先播放欢迎音：“您好，欢迎致电 XX 公司 ...”，然后让用户输入一个电话号码：“请输入一个分机号”，接下来我们会检查号码并转接到该号码，如果不正确，则重新让用户输入。

	serve() ->
     receive
          {call, {event, [UUID | Event]} } ->
               ?LOG("New call ~p~n", [UUID]),
               send_msg(UUID, set, "hangup_after_bridge=true"),
               send_lock_msg(UUID, playback, ?WELCOME_SOUND),
               send_msg(UUID, read, "1 4 " ?INPUT_NUMBER_SOUND " erl_dst_number 5000 #"),
               serve();
          {call_event, {event, [UUID | Event]} } ->
               Name = proplists:get_value(<<"Event-Name">>, Event),
               App = proplists:get_value(<<"Application">>, Event),
               ?LOG("Event: ~p, App: ~p~n", [Name, App]),
               case Name of
                    <<"CHANNEL_EXECUTE_COMPLETE">> when App =:= <<"read">> ->
                         case proplists:get_value(<<"variable_erl_dst_number">>, Event) of
                              undefined ->
                                   send_msg(UUID, read, "1 4 " ?INPUT_NUMBER_SOUND " erl_dst_number 5000 #");
                              Dest ->
                                   send_msg(UUID, bridge, "user/" ++ binary_to_list(Dest))
                         end;
                    _ -> ok
               end,
               serve();
          call_hangup ->
               ?LOG("Call hangup~n", []);
          _X ->
               ?LOG("ignoring message ~p~n", [_X]),
               serve()
     end.

到这里，我们再回想一下，FreeSWITCH 将一个新来电置为 Park 状态，然后向你的 Erlang 程序要一个 Pid，得到后会将所有与该 Channel 相关的消息发送给该 Pid（而该 Pid 现在正在运行 serve() 函数等待新消息）。如果一期如我们所愿，该 Pid 收到的第一个消息永远是 *{call, {event, [UUID | Event]} }* 。好了，接下来就看你的了。

首先，为了学习方便，你打印了一条 Log 消息。然后，你通过设置 hangup_after_bridge=true 来确保该 Channel 能正常挂断（你可以看到，跟在 dialplan 中的设置是一样的）。接下来，你播放（playback）了欢迎音。注意，这里的 send\_lock\_msg() 很关键，它确保 FreeSWITCH 在播放完当前文件后再执行收到的下一条消息。

后续的消息都类似 {call_event, {event, [UUID | Event]} }. 所以，如果你收到 CHANNEL_EXECUTE_COMPLETE 消息后，检测到其 **Application** 参数是 **read** 时，它表示用户按下了按键（或者超时），在上面的代码中，它就会 **bridge** 到某一分机（或者在输入超时的情况下重新询问号码）.

当收到 **call_hangup** 消息时，意味着电话已经挂机了，我们的Erlang进程没有别的事可做，就轻轻的消亡了。


下面是 **send_msg** 和 **send_lock_msg** 函数：

	send_msg(UUID, App, Args) ->
	     Headers = [{"call-command", "execute"},
	          {"execute-app-name", atom_to_list(App)}, {"execute-app-arg", Args}],
	     send_msg(UUID, Headers).
	send_lock_msg(UUID, App, Args) ->
	     Headers = [{"call-command", "execute"}, {"event-lock", "true"},
	          {"execute-app-name", atom_to_list(App)}, {"execute-app-arg", Args}],
	     send_msg(UUID, Headers).
	send_msg(UUID, Headers) -> {sendmsg, ?FS_NODE} ! {sendmsg, UUID, Headers}.

## 使用状态机实现

事实上，一个 **channel** 在不同的时刻有不同的状态，所以呼叫流程控制非常适合用状态机实现。Erlang OTP 有一个 **gen_fsm behaviour**，使用它可以非常简单的实现状态机。

本例中我使用了一个 **gen_fsm** 的增强版本，叫做  [gen_fsfsm](https://gist.github.com/1354864)。它在原先的基础上增加了以下几个函数。


在收到 FreeSWITCH 侧的大部分消息时回调 Module:StateName(Message, StateData) ，如

     wait_bridge({call_event, <<"CHANNEL_EXECUTE_COMPLETE">>, UUID, Event}, State)

在收到 **CHANNEL_HANGUP_COMPLETE** 及 **CHANNEL_DESTROY** 类的消息时回调以下函数

    Module:handle_event({channel_hangup_event, UUID, Event}, StateName, State) on 
    Module:handle_event({channel_destroy_event, UUID, Event}, StateName, State) on CHANNEL_DESTROY

在这时我们使用 [gen_fsfsm](https://gist.github.com/1354864) 来实现上面的例子。不过在这时里我们增加了一个语言提示：”请选择提示语言，1 为普通话，2 为英语...”，以使用读者对本例有更直观的印象。

见下面的代码。首先我们定义一个记录（见第XX行）来“记住” FSM 进程中的一些东西。简单起见，我们只是使用上面提到的**7778**法来启动 FSM 进程。

进程启动时（init），我们简单的过渡到 **welcom** 状态并等待，收到第一条消息后开始播放欢迎声音，然后让主叫用户输入一个按键以选择语言，同时进程转换到 **wait_lang** 状态并等待。其中，我们将主叫号码（caller id）等记在状态机的 state 变量中。

当用户有按键输入时，会收到 CHANNEL_EXECUTE_COMPLETE 消息，根据按键它会通过设置 **sound_prefix** 信道变量以支持不同语种的声音。接下来会继续让用户输入一个号码，并进入 **wait_nubmer** 状态。

在 **wait_number** 可能会收到一个合法的号码，然后进行呼叫，或者用户输入超时，它就会播放声音提示用户重新输入一个号码。

当进程转移到 **wait_hangup** 状态时（表示电话已接通，双方正在对话），它会把收到的消息统统打印出来，所以你会看到 CHANNEL_BRIDGE， CHANNEL_UNBRIDGE 等消息。当然收到这些消息后你可以选择更新数据库有更有用的事件，这里就不再多说了。

当然，你肯定已经猜出来了，当回调函数执行到 handle_event({channel_hangup_event, ... }) 时进程会清理现场并终止。

	-module(fsm_ivr). 
	-behaviour(gen_fsfsm).
	 
	-export([start/1, init/1, handle_info/3, handle_event/3, terminate/3]).
	-export([welcome/2, wait_lang/2, wait_number/2, wait_hangup/2]).
	
	-define(FS_NODE, 'freeswitch@localhost').
	-define(WELCOME_SOUND, "tone_stream://%(100,1000,800);loops=1").
	-define(INPUT_NUMBER_SOUND, "tone_stream://%(100,1000,800);loops=2").
	-define(SELECT_LANG_SOUND, "tone_stream://%(100,1000,800);loops=3").
	-define(LOG(Fmt, Args), io:format("~b " ++ Fmt, [?LINE | Args])).
	
	-record(state, {
		fsnode           :: atom(),                  % freeswitch node name
		uuid             :: undefined | string(),    % channel uuid
		cid_number       :: undefined | string(),    % caller id
		dest_number      :: undefined | string()     % called number
	}).
	
	start(Ref) ->
		{ok, NewPid} = gen_fsfsm:start(?MODULE, [], []),
		{Ref, NewPid}.
	
	init([]) ->
		State = #state{fsnode = ?FS_NODE},
		{ok, welcome, State}.
	
	%% The state machine
	welcome({call, _Name, UUID, Event}, State) ->
		CidNumber = proplists:get_value(<<"Caller-Caller-ID-Number">>, Event),
		DestNumber = proplists:get_value(<<"Caller-Caller-Destination-Number">>, Event),
		?LOG("welcome ~p", [CidNumber]),
		send_lock_msg(UUID, playback, ?WELCOME_SOUND),
		case u_utils:get_env(dtmf_type) of
			{ok, inband} ->
				send_msg(UUID, start_dtmf, "");
			_ -> ok
		end,
		send_msg(UUID, read, "1 1 " ?SELECT_LANG_SOUND " erl_lang 5000 #"),
		{next_state, wait_lang, State#state{uuid = UUID, cid_number = CidNumber, dest_number = DestNumber}}.
	
	wait_lang({call_event, <<"CHANNEL_EXECUTE_COMPLETE">>, UUID, Event}, State) ->
		case proplists:get_value(<<"Application">>, Event) of
			<<"read">> ->
				DTMF = proplists:get_value(<<"variable_erl_lang">>, Event),
				LANG = case DTMF of
					<<"1">> -> "cn";
					<<"2">> -> "fr";
					_ -> "en"
				end,
				send_msg(UUID, set, "sound_prefix=/usr/local/freeswitch/sounds/" ++ LANG);
			_ -> ok
		end,
		send_msg(UUID, read, "1 4 " ?INPUT_NUMBER_SOUND " erl_dst_number 5000 #"),
		{next_state, wait_number, State};
	wait_lang(_Any, State) -> {next_state, wait_lang, State}. % ignore any other messages
	
	wait_number({call_event, <<"CHANNEL_EXECUTE_COMPLETE">>, UUID, Event}, State) ->
		case proplists:get_value(<<"Application">>, Event) of
			<<"read">> ->
				case proplists:get_value(<<"variable_erl_dst_number">>, Event) of
					undefined ->
						send_msg(UUID, read, "1 4 " ?INPUT_NUMBER_SOUND " erl_dst_number 5000 #"),
						{next_state, wait_number, State};
					Dest ->
						send_msg(UUID, bridge, "user/" ++ binary_to_list(Dest)),
						{next_state, wait_hangup, State}
				end;
			_ -> {next_state, wait_number, State}
		end;
	wait_number(_Any, State) -> {next_state, wait_number, State}. % ignore any other messages
	
	wait_hangup({call_event, Name, _UUID, Event}, State) ->
		?LOG("Event: ~p~n", [Name]),
		{next_state, wait_hangup, State};
	wait_hangup(_Any, State) -> {next_state, wait_hangup, State}. % ignore any other messages
	
	handle_info(call_hangup, StateName, State) ->
		?LOG("Call hangup on ~p~n", [StateName]),
		{stop, normal, State};
	handle_info(_Info, StateName, State) ->	{next_state, StateName, State}.
	
	
	handle_event({channel_hangup_event, UUID, Event}, StateName, State) ->
		%% perhaps do bill here
		HangupCause = proplists:get_value(<<"Channel-Hangup-Cause">>, Event),
		?LOG("Hangup Cause: ~p~n", [HangupCause]),
		{stop, normal, State}.
	
	terminate(normal, _StateName, State) ->	ok;
	terminate(Reason, _StateName, State) ->
		% do some clean up here
		send_msg(State#state.uuid, hangup, ""),
	  	ok.
	
	%% private functions
	send_msg(UUID, App, Args) ->
		Headers = [{"call-command", "execute"},
			{"execute-app-name", atom_to_list(App)}, {"execute-app-arg", Args}],
		send_msg(UUID, Headers).
	send_lock_msg(UUID, App, Args) ->
		Headers = [{"call-command", "execute"}, {"event-lock", "true"},
			{"execute-app-name", atom_to_list(App)}, {"execute-app-arg", Args}],
		send_msg(UUID, Headers).
	send_msg(UUID, Headers) -> {sendmsg, ?FS_NODE} ! {sendmsg, UUID, Headers}.

## 接收事件

（待续）

## 动态提供目录服务及拨号计划

（待续）
....
