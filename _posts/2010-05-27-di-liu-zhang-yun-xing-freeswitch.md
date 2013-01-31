---
layout: post
title: "第六章 运行 FreeSWITCH"
tags:
  - "book"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>




读到本章，你应该对 FreeSWITCH 有了一个比较全面的了解，迫切地想实验它强大的功能了。让我们从最初的运行开始，一步一步进入 FreeSWITCH 的神秘世界。

## 命令行参数

一般来说，FreeSWITCH 不需要任何命令行参数就可以启动，但在某些情况下，你需要以一些特殊的参数启动。在此，仅作简单介绍。如果你知道是什么意思，那么你就可以使用，如果不知道，多半你用不到。 

使用 freeswitch -help 或 freeswitch \-\-help 会显示以下信息：

    -nf                    -- no forking
    -u [user]              -- 启动后以非 root 用户 user 身份运行
    -g [group]             -- 启动后以非 root 组 group 身份运行
    -help                  -- 显示本帮助信息
    -version               -- 显示版本信息
    -waste                 -- 允许浪费内存，FreeSWITCH 仅需 240K 的栈空间
                              你可以使用 ulimit -s 240 限制栈空间使用，或使用该选择忽略警告信息
    -core                  -- 出错时进行内核转储
    -hp                    -- 以高优先级运行
    -vg                    -- 在 valgrind 下运行，调试内存泄露时使用
    -nosql                 -- 不使用 SQL，show channels 类的命令将不能显示结果
    -heavy-timer           -- 更精确的时钟。可能会更精确，但对系统要求更高
    -nonat                 -- 如果路由器支持 uPnP 或 NAT-PMP，则 FreeSWITCH 
                              可以自动解决 NAT 穿越问题。如果路由器不支持，则该选项可以使启动更快
    -nocal                 -- 关闭时钟核准。FreeSWTICH 理想的运行环境是 1000 Hz 的内核时钟
                              如果你的内核时钟小于 1000 Hz 或在虚拟机上，可以尝试关闭该选项
    -nort                  -- 关闭实时时钟
    -stop                  -- 关闭 FreeSWTICH，它会在 run 目录中查找 PID文件
    -nc                    -- 启动到后台模式，没有控制台
    -c                     -- 启动到控制台，默认
    -conf [confdir]        -- 指定其它的配置文件所在目录，须与 -log、 -db 合用
    -log [logdir]          -- 指定其它的日志目录
    -run [rundir]          -- 指定其它存放 PID 文件的运行目录
    -db [dbdir]            -- 指定其它数据库目录
    -mod [moddir]          -- 指定其它模块目录
    -htdocs [htdocsdir]    -- 指定其它 HTTP 根目录
    -scripts [scriptsdir]  -- 指定其它脚本目录

## 系统启动脚本
                      
在学习调试阶段，你可以启动到前台，而系统真正运行时，你可以使用 -nc 参数启动到后台，然后通过查看 log/freeswitch.log 跟踪系统运行情况（你可以用 tail -f 命令实时跟踪，我一般使用 less）。

一般情况下，启动到前台更容易调试，但你又不想在每次关闭 Terminal 时停止 FreeSWITCH，那么，你可以借助 [screen](http://wiki.freeswitch.org/wiki/Freeswitch_In_Screen) 来实现。 

在真正的生产系统上，你需要它能跟系统一起启动。在 \*nix 系统上，启动脚本一般放在 /etc/init.d/。你可以在系统源代码目录下找到不同系统启动脚本 debian/freeswitch.init 及 build/freeswitch.init.\*，参考使用。在 Windows 上，你也可以注册为 Windows 服务，参见附录中的 FAQ。

## 控制台与命令客户端

系统不带参数会启动到控制台，在控制台上你可以输入各种命令以控制或查询 FreeSWITCH 的状态。试试输入以下命令：

	version           -- 显示当前版本
	status            -- 显示当前状态
	sofia status      -- 显示 sofia 状态
	help              -- 显示帮助

为了调试方便，FreeSWITCH 还在 conf/autoload_configs/switch.conf.xml 中定义了一些控制台快捷键。你可以通过F1-F12来使用它们（不过，在某些操作系统上，有些快捷键可能与操作系统的相冲突，那你就只直接输入这些命令或重新定义他们了）。

	<cli-keybindings>
	  <key name="1" value="help"/>
	  <key name="2" value="status"/>
	  <key name="3" value="show channels"/>
	  <key name="4" value="show calls"/>
	  <key name="5" value="sofia status"/>
	  <key name="6" value="reloadxml"/>
	  <key name="7" value="console loglevel 0"/>
	  <key name="8" value="console loglevel 7"/>
	  <key name="9" value="sofia status profile internal"/>
	  <key name="10" value="sofia profile internal siptrace on"/>
	  <key name="11" value="sofia profile internal siptrace off"/>
	  <key name="12" value="version"/>
	</cli-keybindings>

FreeSWITCH 是 Client-Server结构，不管 FreeSWITCH 运行在前台还是后台，你都可以使用客户端软件 fs\_cli 连接 FreeSWITCH.

fs\_cli 是一个类似 Telnet 的客户端（也类似于 Asterisk 中的 asterisk -r命令），它使用 FreeSWITCH 的 ESL（Event Socket Library）库与 FreeSWITCH 通信。当然，需要加载模块 mod\_event\_socket。该模块是默认加载的。

正常情况下，直接输入 bin/fs_cli 即可连接上，并出现系统提示符。如果出现：
	[ERROR] libs/esl/fs_cli.c:652 main() Error Connecting [Socket Connection Error]
这样的错误，说明 FreeSWITCH 没有启动或 mod\_event\_socket 没有正确加载，请检查TCP端口8021端口是否处于监听状态或被其它进程占用。

fs\_cli 也支持很多命令行参数，值得一提的是 -x 参数，它允许执行一条命令后退出，这在编写脚本程序时非常有用（如果它能支持管道会更有用，但是它不支持）：

	bin/fs\_cli -x "version"
	bin/fs\_cli -x "status"
	
其它的参数都可以通过配置文件来实现，在这里就不多说了。可以参见：<http://wiki.freeswitch.org/wiki/Fs_cli>

使用fs\_cli，不仅可以连接到本机的 FreeSWITCH，也可以连接到其它机器的 FreeSWITCH 上（或本机另外的 FreeSWITCH 实例上），通过在用户主目录下编辑配置文件 **.fs\_cli\_conf**（注意前面的点“.”），可以定义要连接的多个机器：

	[server1]
	host     => 192.168.1.10
	port     => 8021
	password => secret_password
	debug    => 7

	[server2]
	host     => 192.168.1.11
	port     => 8021
	password => someother_password
	debug    => 0

注意：如果要连接到其它机器，要确保 FreeSWITCH 的 Event Socket 是监听在真实网卡的 IP 地址上，而不是127.0.0.1。另外，在UNIX中，以点开头的文件是隐藏文件，普通的 *ls* 命令是不能列出它的，可以使用 *ls -a*。

一旦配置好，就可以这样使用它：

	bin/fs_cli server1
	bin/fs_cli server2

在 fs\_cli 中，有几个特殊的命令，它们是以 “/” 开头的，这些命令并不直接发送到 FreeSWITCH，而是先由 fs\_cli 处理。/quit、/bye、/exit、Ctrl + D 都可以退出 fs\_cli；/help是帮助。

其它一些 “/”开头的指令与 Event Socket 中相关的命令相同，如：

	/event       -- 开启事件接收
	/noevents    -- 关闭事件接收
	/nixevent    -- 除了特定一种外，开启所有事件
	/log         -- 设置 log 级别，如 /log info 或 /log debug 等 
	/nolog       -- 关闭 log
	/filter      -- 过滤事件
	                      
另外，一些“重要”命令不能直接在 fs\_cli 中执行，如 shutdown 命令，在控制台上可以直接执行，但在 fs\_cli中，需要执行 fsctl shutdown。

除此之外，其它命令都与直接在 FreeSWITCH 控制台上执行是一样的。它也支持快捷键，最常用的快捷键是 F6（reloadxml）、F7（关闭 log输出）、F8（开启 debug 级别的 log 输出）。

在 \*nix上，两者都通过 libeditline 支持[命令行编辑功能](http://wiki.freeswitch.org/wiki/Mod_console#Command-Line_Editing)。可以通过上、下箭头查看命令历史。

## 发起呼叫

可以在 FreeSWITCH 中使用 originate 命令发起一次呼叫，如果用户 1000 已经注册，那么：

	originate user/alice &echo
	
上述命令在呼叫 1000 这个用户后，便执行 echo 这个程序。echo 是一个回音程序，即它会把任何它“听到”的声音（或视频）再返回（说）给对方。因此，如果这时候用户 1000 接了电话，无论说什么都能听到自己的声音。

### 呼叫字符串

上面的例子中，user/alice 称为呼叫字符串，或呼叫 URL。user 是一种特殊的呼叫字符串。我们先来复习一下第四章的场景。FreeSWITCH UA 的地址为 192.168.4.4:5050，alice UA 的地址为 192.168.4.4:5090，bob UA 的地址为 192.168.4.4:26000。若 alice 已向 FreeSWITCH 注册，在 FreeSWITCH 中就可以看到她的注册信息：

	freeswitch@du-sevens-mac-pro.local> sofia status profile internal reg


	Registrations:
	=============================================================================================
	Call-ID:        ZTRkYjdjYzY0OWFhNDRhOGFkNDUxMTdhMWJhNjRmNmE.
	User:           alice@192.168.4.4
	Contact:        "Alice" <sip:alice@192.168.4.4:5090;rinstance=a86a656037ccfaba;transport=UDP>
	Agent:          Zoiper rev.5415
	Status:         Registered(UDP)(unknown) EXP(2010-05-02 18:10:53)
	Host:           du-sevens-mac-pro.local
	IP:             192.168.4.4
	Port:           5090
	Auth-User:      alice
	Auth-Realm:     192.168.4.4
	MWI-Account:    alice@192.168.4.4

	=============================================================================================

FreeSWITCH 根据 Contact 字段知道 alice 的 SIP 地址 sip:alice@192.168.4.4:5090。当使用 originate 呼叫 user/alice 这个地址时，FreeSWITCH 便查找本地数据库，向 alice 的地址 sip:alice@192.168.4.4:5090 发送 INVITE 请求（实际的呼叫字符串是由用户目录中的 dial-string 参数决定的）。

### API 与 APP

在上面的例子中，originate 是一个命令（Command），它用于控制 FreeSWITCH 发起一个呼叫。FreeSWITCH 的命令不仅可以在控制台上使用，也可以在各种嵌入式脚本、Event Socket （fs\_cli 就是使用了 ESL库）或 HTTP RPC 上使用，所有命令都遵循一个抽像的接口，因而这些命令又称 API Commands。

echo() 则是一个程序（Application，简称 APP），它的作用是控制一个 Channel 的一端。我们知道，一个 Channel 有两端，在上面的例子中，alice 是一端，别一端就是 echo()。电话接通后相当于 alice 在跟 echo() 这个家伙在通话。另一个常用的 APP 是 park()

	originate user/alice &park()                                     
	
我们初始化了一个呼叫，在 alice 接电话后对端必须有一个人在跟也讲话，否则的话，一个 Channel 只有一端，那是不可思议的。而如果这时 FreeSWITCH 找不到一个合适的人跟 alice 通话，那么它可以将该电话“挂起”，park()便是执行这个功能，它相当于一个 Channel 特殊的一端。

park() 的用户体验不好，alice 不知道要等多长时间才有人接电话，由于她听不到任何声音，实际上她在奇怪电话到底有没有接通。相对而言，另一个程序 hold()则比较友好，它能在等待的同时播放保持音乐（MOH， Music on Hold）。

	originate user/alice &hold()               
	
当然，你也可以直接播放一个特定的声音文件：	                      

	originate user/alice &playback(/root/welcome.wav)                                     

或者，直接录音：
	originate user/alice &record(/root/voice_of_alice.wav)                                     

以上的例子实际上都只是建立一个 Channel，相当于 FreeSWITCH 作为一个 UA 跟 alice 通话。它是个一条腿（one leg，只有a-leg）的通话。在大多数情况下，FreeSWITCH 都是做为一个 B2BUA 来桥接两个 UA 进行通话话的。在 alice 接听电话以后，bridge()程序可以再启动一个 UA 呼叫 bob：

	originate user/alice &bridge(user/bob)
	
终于，alice 和 bob 可以通话了。我们也可以用另一个方式建立他们之音的通话：

	originate user/alice &park()
	originate user/bob &park()
	show channels
	uuid_bridge <alice_uuid> <bob_uuid>
	
在这里，我们分别呼叫 alice 和 bob，并把他们暂时 park 到一个地方。通过命令 show channels 我们可以知道每个 Channel 的 UUID，然后使用 uuid\_bridge 命令将两个 Channel 桥接起来。与上一种方式不同，上一种方式实际上是先桥接，再呼叫 bob。

上面，我们一共学习了两条命令（API），originate 和 uuid\_bridge。以及几个程序（APP） - echo、park、bridge等。细心的读者可以会发现，uuid\_bridge API 和 bridge APP 有些类似，我也知道他们一个是先呼叫后桥接，另一个是先桥接后呼叫，那么，它们到底有什么本质的区别呢？

**简单来说，一个 APP 是一个程序（Application），它作为一个 Channel 一端与另一端的 UA 进行通信，相当于它工作在 Channel 内部；而一个 API 则是独立于一个 Channel 之外的，它只能通过 UUID 来控制一个 Channel（如果需要的话）。**
                                               
这就是 API 与 APP 最本质的区别。通常，我们在控制台上输入的命令都是 API；而在 dialplan 中执行的程序都是 APP（dialplan 中也能执行一些特殊的 API）。大部分公用的 API 都是在 mod\_commands 模块中加载的；而 APP 则在 mod\_dptools 中，因而 APP 又称为拨号计划工具（Dialplan Tools）。某些模块（如 mod\_sofia）有自己的的 API 和 APP。

某些 APP 有与其对应的 API，如上述的 bridge/uuid\_bridge，还有 transfer/uuid\_transfer、playback/uuid\_playback等。UUID 版本的 API 都是在一个 Channel 之外对 Channel 进行控制的，它们应用于不能参与到通话中却又想对正在通话的 Channel做点什么的场景中。例如 alice 和 bob 正在畅聊，有个坏蛋使用 uuid\_kill 将电话切断，或使用 uuid\_broadcast 给他们广播恶作剧音频，或者使用 uuid\_record 把他们谈话的内容录音等。

## 命令行帮助

在本章的最后，我们来学习一个如何使用 FreeSWITCH 的命令行帮助。

使用 help 命令可以列出所有命令的帮助信息。某些命令，也有自己的帮助信息，如 sofia：

	freeswitch@du-sevens-mac-pro.local> sofia help

	USAGE:
	--------------------------------------------------------------------------------
	sofia help
	sofia profile <profile_name> [[start|stop|restart|rescan] 
		[reloadxml]|flush_inbound_reg [<call_id>] [reboot]|[register|unregister]
    ....

其中，用尖括号（< >）括起来的表示要输入的参数，而用方括号（[ ]）括起来的则表示可选项，该参数可以有也可以没有。用竖线（|）分开的参数列表表示“或”的关系，即只能选其一。

FreeSWITCH 的命令参数没有统一的解析函数，而都是由命令本身的函数负责解析的，因而不是很规范，不同的命令可能有不同的风格。所以使用时，除使用帮助信息外，最好还是查阅一下 Wiki 上的帮助（<http://wiki.freeswitch.org/wiki/Mod_commands>），那里大部分命令都有相关的例子。关于 APP，则可以参考 <http://wiki.freeswitch.org/wiki/Mod_dptools>。本书的附录中也有相应的中文参考。

## 小结

本章介绍了如何启动与控制 FreeSWTICH，并提到了几个常用的命令。另外，本章还着重讲述了 APP 与 API 的区别，搞清楚这些概念对后面的学习是很有帮助的。



 
