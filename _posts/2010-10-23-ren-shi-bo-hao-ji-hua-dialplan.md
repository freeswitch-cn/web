---
layout: post
title: "认识拨号计划 - Dialplan"
tags:
  - "book"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


拨号计划是 FreeSWITCH 中至关重要的一部分。它的主要作用就是对电话进行路由（从这一点上来说，相当于一个路由表）。说的简明一点，就是当一个用户拨号时，对用户所拨的号码进行分析，进而决定下一步该做什么。当然，实际上，它所能做的比你想象的要强大的多。

我们在第二章中已经提到过修改过拨号计划，单从配置文件看，还算比较简单直观。实际上，它的概念也不是很复杂。如果你理解正则表达式，那你应该能看懂系统系统自带的大部分的配置。但是，在实际应用中，有许多问题还是常常令初学者感到疑惑。主要的问题是，要理解 Dialplan，还需要了解 FS 是怎样工作的（第五章），API 与 APP 的区别等。

通过本章，我们除了要了解 Dialplan 的基本概念和运作方式，还要以理论与实践相结合的方式来进行学习，使用初学者能快速上手，有经验的人也能学到新的维护和调试技巧。

## XML Dialplan

Dialplan 是 FreeSWITCH 中一个抽象的部分，它可以支持多种不同的格式，如类似 Asterisk 的格式（由 mod\_dialplan\_asterisk提供）。但在实际使用中，用的最多的还是 XML 格式。下面，我们就先讨论这种格式。

### 配置文件的结构

拨号计划的配置文件在 conf/dialplan 中，在前面的章节中我们讲过，它们是在 freeswitch.xml 中，由 <X-PRE-PROCESS cmd="include" data="dialplan/*.xml"/> 装入的。

拨号计划由多个 Context （上下文/环境）组成。每个 Context 中有多个 Extension （分支，在简单的 PBX 中也可以认为是分机号，但很显然，Extension 涵盖的内容远比分机号多）。所以，Context 就是多个 Extension 的逻辑集合，它相当于一个分组，一个 Context 中的 Extension 与其它 Context 中的 Extension 在逻辑上是隔离的。

下面是 Dialplan 的完整结构：

	<?xml version="1.0"?>
	<document type="freeswitch/xml">
	  <section name="dialplan" description="Regex/XML Dialplan">
	    <context name="default">
	         <extension name="Test Extension">
	         </extension>
	    </context>
	  </section>
	</document>

Extension 相当于路由表中的表项，其中，每一个 Extension 都有一个 name 属性。它可以是任何合法的字符串，本身对呼叫流程没有任何影响，但取一个好听的名字，有助于你在查看 Log 时发现它。

在 Extension 中可以对一些 condition （条件）进行判断，如果满足测试条件所指定的表达式，则执行相对应的 action （动作）。

例如，我们将下列 Extension 配置加入到 conf/dialplan/default.xml 中。并作为第一个 Extension。

	<extension name="My Echo Test">
	  <condition field="destination_number" expression="^echo|1234$">
	    <action application="echo" data=""/>
	  </condition>
	</extension>

FreeSWITCH 安装时，提供了很多例子，为了避免与提供的例子冲突，强列建议在学习时把自己写的 Extension 写在最前面。当然我说的最前面并不是 default.xml 的第一行，而是放到第一个 Extension 的位置，就是以下语句的后面（你通常能在第13-14行找到它们）：

	<include>
	  <context name="default">
	
用你喜欢的编译器编辑好并存盘后，在 FreeSWITCH 命令行上（Console 或 fs\_cli）执行 reloadxml 或按 F6键，使 FreeSWITCH 重新读入你修改过的配置文件。并按 F8 键将 log 级别设置为 DEBUG，以看到详细日志.然后，将软电话注册上，并拨叫 1234 或 echo （大部分软电话都能呼叫字母，如Zoiper，Xlite可以使用空格键切换数字和字母）。

你将会看到很多 Log, 注意如下的行：

	Processing Seven <1000>->1234 in context default
	parsing [default->My Echo Test] continue=false
	Regex (PASS) [Echo Test] destination_number(1234) =~ /^echo|1234$/ break=on-false
	Action echo()
	
在我的终端上，上面的第一行是以绿色显示的。当然，为了排版方便，我省去了 Log 中的日期以及其它不关键的一些信息。

第一行，Processing 说明是在处理 Dialplan，**Seven** 是我的的 SIP 名字，**1000** 是我的分机号， **1234** 是我所拨叫的号码，这里，我直接拨叫了 1234。它完整意思是说，呼叫已经达到路由阶段，要从 XML Dialplan 中查找路由，该呼叫来自 Seven，分机号是1000，它所呼叫的被叫号码是 1234 （或 echo，如果你拨叫 echo 的话）。

第二行，呼叫进入 parsing (解析XML) 阶段，它首先找到 XML 中的一个 Context，这里是 **default**（它是在 user directory 中定义的，看第五章。user directory 中有一项 <variable name="user_context" value="default"/> ， 说明，如果 1000 这个用户发起呼叫，则它的 context 就是 default，所以要从 XML Dialplan 中的 default 这个 Context 查起）。它首先找到的第一个 Extension 的 name 是 **My Echo Test**（还记得吧？我们我们把它放到了 Dialplan 的最前面）。continue=false 的意思我们后面再讲。

第三行，由于该 Extension 中有一个 Condition，它的测试条件是 **destination\_number**，也就是被叫号码，所以， FreeSWITCH 测试被叫号码（这里是 1234）是否与配置文件中的正则表达式相匹配。 **^echo|1234$** 是正则表达式，它匹配 echo 或 1234。所以这里匹配成功，Log 中显示 Regex (PASS)。 当然既然匹配成功了，它就开始执行动作 echo（它是一个 APP），所以你就听到了自己的声音。

这是最简单的路由查找。前面我已经说了，系统自带了一些 Dialplan 的例子，也许在第二章你已经测试过了。下面，我们试一下系统自带的 echo 的例子。这次，我呼叫的是 9196。在 Log 中，还是从绿色的行开始看：

	Processing Seven <1000>->9196 in context default
	parsing [default->My Echo Test] continue=false
	Regex (FAIL) [Echo Test] destination_number(9196) =~ /^echo|1234$/ break=on-false
	parsing [default->unloop] continue=false
	Regex (PASS) [unloop] ${unroll_loops}(true) =~ /^true$/ break=on-false
	Regex (FAIL) [unloop] ${sip_looped_call}() =~ /^true$/ break=on-false
	parsing [default->tod_example] continue=true
	Date/Time Match (FAIL) [tod_example] break=on-false
	parsing [default->holiday_example] continue=true
	Date/Time Match (FAIL) [holiday_example] break=on-false
	parsing [default->global-intercept] continue=false
	Regex (FAIL) [global-intercept] destination_number(9196) =~ /^886$/ break=on-false
	parsing [default->group-intercept] continue=false
	Regex (FAIL) [group-intercept] destination_number(9196) =~ /^\*8$/ break=on-false
	parsing [default->intercept-ext] continue=false
	Regex (FAIL) [intercept-ext] destination_number(9196) =~ /^\*\*(\d+)$/ break=on-false
	parsing [default->redial] continue=false
	Regex (FAIL) [redial] destination_number(9196) =~ /^(redial|870)$/ break=on-false
	parsing [default->global] continue=true
	Regex (FAIL) [global] ${call_debug}(false) =~ /^true$/ break=never
	
	[][][][][][] 此处省略五百字...
	
	parsing [default->fax_receive] continue=false
	Regex (FAIL) [fax_receive] destination_number(9196) =~ /^9178$/ break=on-false
	parsing [default->fax_transmit] continue=false
	Regex (FAIL) [fax_transmit] destination_number(9196) =~ /^9179$/ break=on-false
	parsing [default->ringback_180] continue=false
	Regex (FAIL) [ringback_180] destination_number(9196) =~ /^9180$/ break=on-false
	parsing [default->ringback_183_uk_ring] continue=false
	Regex (FAIL) [ringback_183_uk_ring] destination_number(9196) =~ /^9181$/ break=on-false
	parsing [default->ringback_183_music_ring] continue=false
	Regex (FAIL) [ringback_183_music_ring] destination_number(9196) =~ /^9182$/ break=on-false
	parsing [default->ringback_post_answer_uk_ring] continue=false
	Regex (FAIL) [ringback_post_answer_uk_ring] destination_number(9196) =~ /^9183$/ break=on-false
	parsing [default->ringback_post_answer_music] continue=false
	Regex (FAIL) [ringback_post_answer_music] destination_number(9196) =~ /^9184$/ break=on-false
	parsing [default->ClueCon] continue=false
	Regex (FAIL) [ClueCon] destination_number(9196) =~ /^9191$/ break=on-false
	parsing [default->show_info] continue=false
	Regex (FAIL) [show_info] destination_number(9196) =~ /^9192$/ break=on-false
	parsing [default->video_record] continue=false
	Regex (FAIL) [video_record] destination_number(9196) =~ /^9193$/ break=on-false
	parsing [default->video_playback] continue=false
	Regex (FAIL) [video_playback] destination_number(9196) =~ /^9194$/ break=on-false
	parsing [default->delay_echo] continue=false
	Regex (FAIL) [delay_echo] destination_number(9196) =~ /^9195$/ break=on-false
	parsing [default->echo] continue=false
	Regex (PASS) [echo] destination_number(9196) =~ /^9196$/ break=on-false
	Action answer() 
	Action echo()
	
你可以看到，前面的正则表达式匹配都没有成功（Regex (FAIL)），只是到最后匹配到 ^9196$才成功（你看到 Regex (PASS)了），成功后先应答（answer），然后执行 echo。

在这一节里，我们花了很多篇幅来讲解如此简单的问题。但实际上，我是想让你知道，这一节最重要的不是讲 Dialplan，而是告诉你如何看 Log。在邮件列表上，大多数新手遇到的问题都可以很轻松的从 Log 中看出来，但他们不知道怎么看，或者是看了也不理解。所以，在这里，我想请你再看一下我们的第一个例子。**永远记住：遇到 Dialplan 的问题，按F8打开DEBUG级别的日志，从绿色的行开始看起（当然，如果你的终端不能显示颜色，那么，从 Processing 一行看起）**。我们的第一个例子虽然只有短短的四行 Log，但是它包含了所有你需要的信息。

### 默认的配置文件结构

系统默认提供的配置文件包含三个 Context：default、features和 public，它们分别在三个 XML 文件中。default 是默认的 dialplan，一般来说注册用户都可以使用它来打电话，如拨打其它分机或外部电话等。而 public 则是接收外部呼叫，因为从外部进来的呼叫是不可信的，所以要进行更严格的控制。如，你肯定不想从外部进来的电话再通过你的网关进行国内或国际长途呼叫。

当然，这么说不是绝对的，等你熟悉了 Dialplan 的概念之后，可以发挥你的想象力进行任何有创意的配置。

其中，在 default 和 public 中，又通过 INCLUDE 预处理指令分别加入了 default/ 和 include/ 目录中的所有 XML 文件。 这些目录中的文件仅包含一些额外的 Extension。由于 Dialplan 在处理是时候是顺序处理的，所以，一定要注意这些文件的装入顺序。通常，这些文件都按文件名排序，如 00\_，01\_等等。如果你新加入 Extension，可以在这些目录里创建文件。但要注意，这些文件的优先级比直接写在如 default.xml 中低。我前面已经说过，由于你不熟悉系统提供的默认的 Dialplan，很可能出现与系统冲突的情况。当然，你已经学会如何查看 Log，所以能很容易的找到问题所在。但在本书中，我还是坚持将新加的 Extension 加在 Dialplan 中的最前面，以便于说明问题。

实际上，由于在处理 Dialplan 时要对每一项进行正则表达式匹配，是非常影响效率的。所以，在生产环境中，往往要删除这些默认的 Dialplan，而只配置有用的部分。但我们还不能删，因为里面有好多例子我们可以学习。

### 正则表达式

Dialplan 使用 Perl 兼容的正则表达式（PCRE, Perl-compatible regular expressions）匹配。熟悉编程的同学肯定已经很熟悉它了，为了方便不熟悉的同学，在这里仅作简单介绍：

	^1234$         ^ 匹配字符串开头，$ 匹配结尾，所以本表达式严格匹配 1234
	^1234|5678$    | 是或的意思，表示匹配 1234 或 5678
	^123[0-9]$     [ ] 表式匹配其中的任意一个字符，其中的 - 是省略的方式，表示 0 到 9，它等于 [0123456789]
	               也就是说它会匹配 1230，1231，1232 ... 1239
	^123\d$        同上，\d 等于 [0-9]
	^123\d+$       + 号表示1个或多个它前面的字符，因为 + 前面是 \d，所以它就等于1个或多个数字，实际上，
	               它匹配任何以123开头的至少4位数的数字串，如1230，12300，12311，123456789等
	^123\d*$       *号与+号的不同在于，它匹配0个或多个前面的字符。
	               所以，它匹配以123开头的至少3位数的数字串，如 123，123789
	^123           跟上面一样，由于没有结尾的$，它匹配任何以123开头的数字串，但除此之外，它还匹配后面是字母的情况，如 123abc
	123$           匹配任何以123结尾的字符串
	^123\d{5}$     {5}表示精确匹配5位，包含它前面的一个字符。在这里，它匹配以123开头的所有8位的电话号码
	^123(\d+)$     ( )在匹配中不起作用，跟^123\d+是相同的，但它对匹配结果有作用，
	               匹配结果中除123之外的数字都将存储在$1这个变量中，在下一步使用
	^123(\d)(\d+)$ 如果用它跟12345678匹配，则匹配成功，结果是 $1 = 4， $2 = 5678

简单的正则表达式比较容易理解，更深入的学习请查阅相关资料。正则表达式功能很强大，但配置不当也容易出现错误，轻者造成电话不通，重者可能会造成误拨或套拨，带来经济损失。

### 信道变量 - Channel Variables

在 FreeSWITCH 中，每一次呼叫都由一条或多条“腿”(Call Leg)组成，其中的一条腿又称为一个 Channel（信道），每一个 Channel 都有好多属性，用于标识 Channel 的状态，性能等，这些属性称为 Channel Variable（信道变量），简写为 Channel Var 或 Chan Var 或 Var。

通过使用 info 这个 APP，可以查看所有的 Channel Var。我们先修改一下 Dialplan。

	<extension name="Show Channel Variable">
	  <condition field="destination_number" expression="^1235$">
	    <action application="info" data=""/>
	  </condition>
	</extension>
	
加入 default.xml 中，为了复习上一节的内容，我们这一次加入 My Echo Test 这一 Extension 的后面，存盘，然后在 FreeSWITCH 命令行上执行 reloadxml。从软电话上呼叫 1235，可以看到有很多 Log输出，还是从绿色的行开始看:

	Processing Seven <1000>->1235 in context default
	parsing [default->Echo Test] continue=false
	Regex (FAIL) [Echo Test] destination_number(1235) =~ /^echo|1234$/ break=on-false
	parsing [default->Show Channel Variable] continue=false
	Regex (PASS) [Show Channel Variable] destination_number(1235) =~ /^1235$/ break=on-false
	Action info() 
	...
	EXECUTE sofia/internal/1000@192.168.7.10 info()
	2010-10-23 09:46:31.662281 [INFO] mod_dptools.c:1171 CHANNEL_DATA:
	Channel-State: [CS_EXECUTE]
	Channel-Call-State: [RINGING]
	Channel-State-Number: [4]
	Channel-Name: [sofia/internal/1000@192.168.7.10]
	Unique-ID: [cfea988b-2dc4-42ec-b731-2cd7ea864fc6]
	Caller-Direction: [inbound]
	Caller-Username: [1000]
	Caller-Dialplan: [XML]
	Caller-Caller-ID-Name: [Seven]
	Caller-Caller-ID-Number: [1000]
	Caller-Network-Addr: [192.168.7.10]
	Caller-ANI: [1000]
	Caller-Destination-Number: [1235]
	variable_direction: [inbound]
	variable_uuid: [cfea988b-2dc4-42ec-b731-2cd7ea864fc6]
	variable_sip_local_network_addr: [123.130.140.154]
	variable_remote_media_ip: [123.130.140.154]
	variable_remote_media_port: [8000]
	variable_sip_use_codec_name: [PCMA]
	variable_sip_use_codec_rate: [8000]
	variable_sip_use_codec_ptime: [20]
	variable_read_codec: [PCMA]
	variable_read_rate: [8000]
	variable_write_codec: [PCMA]
	variable_write_rate: [8000]
	variable_endpoint_disposition: [RECEIVED]
	variable_current_application: [info]
	
为节省篇幅，我们删去了一部分。

可以看到，由于我们呼叫的是 1235，它在第三行测试 My Echo Test 的 1234 的时候失败了，接在接下来测试 1235的时候成功了，便执行相对应的 Action - info 这个APP。它的作用就是把所有 Channel Variables 都打印到 Log 中。

所有的 Channel Variable 都是可以在 Dialplan 中访问的，使用格式是 ${变量名}，如 ${destination\_number}。将下列配置加入 Dialplan 中（存盘，reloadxml 不用再说了吧？）:

	<extension name="Accessing Channel Variable">
	  <condition field="destination_number" expression="^1236(\d+)$">
	    <action application="log" data="INFO Hahaha, I know you called ${destination_number}"/>
	    <action application="log" data="INFO The Last few digists is $1"/>
	    <action application="log" data="ERR This is not actually an error, just jocking"/>
	    <action application="hangup"/>
	  </condition>
	</extension>
	
这次我们呼叫 1236789，看看结果：

	Processing Seven <1000>->1236789 in context default
	parsing [default->Echo Test] continue=false
	Regex (FAIL) [Echo Test] destination_number(1236789) =~ /^echo|1234$/ break=on-false
	parsing [default->Show Channel Variable] continue=false
	Regex (FAIL) [Show Channel Variable] destination_number(1236789) =~ /^1235$/ break=on-false
	parsing [default->Accessing Channel Variable] continue=false
	Regex (PASS) [Accessing Channel Variable] destination_number(1236789) =~ /^1236(\d+)$/ break=on-false
	Action log(INFO Hahaha, I know you called ${destination_number}) 
	Action log(NOTICE The Last few digists is 789) 
	Action log(ERR This is not actually an error, just jocking) 
	Action hangup() 

	[DEBUG] switch_core_state_machine.c:157 sofia/internal/1000@192.168.7.10 Standard EXECUTE

	EXECUTE sofia/internal/1000@192.168.7.10 log(INFO Hahaha, I know you called 1236789)
	[INFO] mod_dptools.c:1152 Hahaha, I know you called 1236789
	EXECUTE sofia/internal/1000@192.168.7.10 log(NOTICE The Last few digists is 789)
	[NOTICE] mod_dptools.c:1152 The Last few digists is 789
	EXECUTE sofia/internal/1000@192.168.7.10 log(ERR This is not actually an error, just jocking)
	[ERR] mod_dptools.c:1152 This is not actually an error, just jocking
	EXECUTE sofia/internal/1000@192.168.7.10 hangup()

跟前面一样，我们还是从绿色的行开始看。这一次，1236789 匹配了正则表达式 ^1236(\d+)，并将 789 存储在变量 $1 中。然后在 8-11 行看到它解析出的四个 Action（三个 log 一个 hangup）。到这里为止，Channel 的状态一直没有变，还处在路由查找的阶段。在所有 Dialplan 解析完成后，Channel 状态才进行 Standard Execute 阶段。理解这一点是非常重要的，我们后面再做详细说明，但是在这里你要记住路由查找（解析）和执行分属于不同的阶段。当 Channel 状态进入执行阶段后，它才开始依次执行所有的 Action。log() 的作用就是将信息写到 Log 中，它的第一个参数是 leglevel，就是 Log 的级别，有 INFO、Err、DEBUG等，不同的级别在彩色的终端上能以不同的颜色显示。（详细的级别请参考<http://wiki.freeswitch.org/wiki/Mod_logfile#Log_Levels>）。

你肯定看到彩色的 Log 了，同时也看到了用 $ 表示的 Channel Variable 被替换成了相应的值。

同时你也看到，这次实验我们特意增加了几个 Action。一个 Action 通常有两个参数，一个是 application，代表要执行的 APP，另一个是 data，就是 APP 的参数，当 APP 没有参数时，data也可能省略。

一个 Action 必须是一个合法的 XML 标签，在前面，你看到的 context，extension 等都是成对出现的，如 <extension> </extension>。但由于 Action 比较简单，一般彩用简写的形式来关闭标签，即 <action />。注意大于号前面的“/”，如果不小漏掉，在 reloadxml 时将会出现类似“+OK [[error near line 3371]: unexpected closing tag </condition>]” 的错误，而实际的错误位置又通常不是出错的那一行。这是在编辑 XML 文件时经常遇到的问题，又比较难于查找。因此在修改时要多加小心，并推荐使用具有语法高亮的功能的编辑器来编辑。

读到这里，你或许还有疑问，既然我们在 info APP 的输出里没看到 destination\_number这一变量，它到底是从哪里来的呢？是这样的，它在 info 中的输出是 Caller-Destination-Number，但你在引用的时候就需要使用 destination\_number。还有一些变量，在 info 中的输出是 variable\_xxxx，如 variable\_domain\_name，而实际引用时要去掉 variable\_ 前缀。不要紧张，这里有一份对照表： <http://wiki.freeswitch.org/wiki/Channel_Variables#Info_Application_Variable_Names_.28variable_xxxx.29>

### 测试条件 - Conditions

### 动作与反动作 - Action & Anti-Action

### 工作机制进阶

### 实例解析

...

以上的论述应该涵盖了 Dialplan 的所有概念，当然，要活学活用，还需要一些经验。下面，我们讲几个真实的例子。这些例子大部分来自默认的配置文件。

#### Local\_Extension

我们要看的第一个例子是 Local_Extension。 FreeSWITCH 默认的配置提供了 1000 - 1019 共 20 个 SIP 账号，密码都是 1234 。

	<extension name="Local_Extension">
	    <condition field="destination_number" expression="^(10[01][0-9])$">
	    //actions
	    </condition>
	</extension>
	
这个框架说明，用正则表达式 (10[01][0-9])$ 来匹配被叫号码，它匹配所有  1000 - 1019 这 20 个号码。

这里我们假设在 SIP 客户端上，用 1000 和 1001 分别注册到了 FreeSWITCH 上，则 1000 呼叫 1001 时，FreeSWITCH 会建立一个 Channel，该 Channel 构成一次呼叫的 a-leg（一条腿）。初始化完毕后，Channel 进入 ROUTING 状态，即进入 Dialplan。由于被叫号码 1001 与这里的正则表达式匹配，所以，会执行下面这些 Action。另外，由于我们在正则表达式中使用了 “( )”，因此，匹配结果会放入变量 $1 中，因此，在这里，$1 = 1001。
	
	<action application="set" data="dialed_extension=$1"/>
	<action application="export" data="dialed_extension=$1"/>
	
set 和 export 都是设置一个变量，该变量的名字是 dialed\_extension，值是 1001。
	
关于 set 和 export 的区别我们在前面已经讲过了。这里再重复一次： set 是将变量设置到当前的 Channel 上，即 a-leg。而 export 则也将变量设置到 b-leg 上。当然，这里 b-leg 还不存在。所以在这里它对该 Channel 的影响与 set 其实是一样的。因此，使用 set 完全是多余的。但是除此之外，export 还设置了一个特殊的变量，叫 export_vars，它的值是dialed\_extension。所以，实际上。上面的第二行就等价于下面的两行：
	
	<action application="set" data="dialed_extension=$1"/>
	<action application="set" data="export_vars=dialed_extension"/>
.
	
	<!-- bind_meta_app can have these args <key> [a|b|ab] [a|b|o|s] <app> -->
	<action application="bind_meta_app" data="1 b s execute_extension::dx XML features"/>
	<action application="bind_meta_app" data="2 b s record_session::$${recordings_dir}/${caller_id_number}.${strftime(%Y-%m-%d-%H-%M-%S)}.wav"/>
	<action application="bind_meta_app" data="3 b s execute_extension::cf XML features"/>
	<action application="bind_meta_app" data="4 b s execute_extension::att_xfer XML features"/>
	
bind_meta_app 的作用是在该 Channel 是绑定 DTMF。上面四行分别绑定了 1、2、3、4 四个按键，它们都绑定到了 b-leg上。注意，这时候 b-leg 还不存在。所以，请记住这里，我们下面再讲。

	<action application="set" data="ringback=${us-ring}"/>

设置回铃音是美音（不同国家的回铃音是有区别的），${us-ring} 的值是在 vars.xml 中设置的。

	<action application="set" data="transfer_ringback=$${hold_music}"/>

设置呼叫转移时，用户听到的回铃音。

	<action application="set" data="call_timeout=30"/>

设置呼叫超时。

	<action application="set" data="hangup_after_bridge=true"/>
	<!--<action application="set" data="continue_on_fail=NORMAL_TEMPORARY_FAILURE,USER_BUSY,NO_ANSWER,TIMEOUT,NO_ROUTE_DESTINATION"/> -->
	<action application="set" data="continue_on_fail=true"/>

	这些变量影响呼叫流程，详细说明见下面的 bridge。

	<action application="hash" data="insert/${domain_name}-call_return/${dialed_extension}/${caller_id_number}"/>
	<action application="hash" data="insert/${domain_name}-last_dial_ext/${dialed_extension}/${uuid}"/>
	<action application="hash" data="insert/${domain_name}-last_dial_ext/${called_party_callgroup}/${uuid}"/>
	<action application="hash" data="insert/${domain_name}-last_dial_ext/global/${uuid}"/>
	
hash 是内存中的哈希表数据结构。它可以设置一个键-值对（Key-Value pair）。如，上面最后一行上向 ${domain\_name}-last\_dial\_ext 这个哈希表中插入 global 这么一个键，它的值是 ${uuid}，就是本 Channel 的唯一标志。

不管是上面的 set， 还是 hash，都是保存一些数据为后面做准备的。

	<action application="set" data="called_party_callgroup=${user_data(${dialed_extension}@${domain_name} var callgroup)}"/>
	<!--<action application="export" data="nolocal:sip_secure_media=${user_data(${dialed_extension}@${domain_name} var sip_secure_media)}"/>-->
	
这一行默认是注释掉的，因此不起作用。 nolocal 的作用我们已前也讲到过，它告诉 export 只将该变量设置到 b-leg 上，而不要设置到 a-leg 上。

	<action application="hash" data="insert/${domain_name}-last_dial/${called_party_callgroup}/${uuid}"/>

还是 hash.

	<action application="bridge" data="{sip_invite_domain=$${domain}}user/${dialed_extension}@${domain_name}"/>

bridge 是最关键的部分。其实上面除 bridge 以外的 action 都可以省略，只是会少一些功能。

回忆一下第四章中的内容。用户 1000 其实是一个 SIP UA（UAC），它向 FreeSWITCH（作为UAS） 发送一个 INVITE 请求。然后 FreeSWITCH 建立一个 Channel，从 INVITE 请求中找到被叫号码（destination\_number=1001），然后在 Dialplan 中查找 1001 就一直走到这里。

bridge 的作用就是把 FreeSWITCH 作为一个 SIP UAC，再向 1001 这个 SIP UA（UAS）发起一个 INVITE 请求，并建立一个 Channel。这就是我们的 b-leg。1001 开始振铃，bridge 把回铃音传回到 1000，因此，1000 就能听到回铃音（如果 1001 有自己的回铃音，则 1000 能听到，否则，将会听到默认的回铃音 ${us-ring}）。

当然，实际的情况比我们所说的要复杂，因为在呼叫之前。FreeSWITCH 首先要查找 1001 这个用户是否已经注册，否则，会直接返回 USER\_NOT\_REGISTERED，而不会建立 b-leg。

bridge 的参数是一个标准的呼叫字符串（Dial string），以前我们也讲到过。domain 和 domain\_name 都是预设的变量，默认就是服务器的 IP 地址。user 是一个特殊的 endpoint，它指本地用户。所以，呼叫字符串翻译出来就是（假设 IP 是 192.168.7.2）：

	{sip_invite_domain=192.168.7.2}user/1001@192.168.7.2
	
其中，“{ }”里是设置变量，由于 bridge 在这里要建立 b-leg，因此，这些变量只会建立在 b-leg 上。与 set 是不一样的。但它等价于下面的 export ：

	<action application="export" value="nolocal:sip_invite_domain=192.168.7.2"/>
	<action application="bridge" value="user/1001@192.168.7.2"/>

好了，到此为止电话路由基本上就完成了，我们已经建立了 1000 到 1001 之间的呼叫，就等 1001 接电话了。接下来会有几种情况：

* 被叫应答
* 被叫忙
* 被叫无应答
* 被叫拒绝
* 其它情况 ...

我们先来看一下被叫应答的情况。1001 接电话，与 1000 畅聊。在这个时候 bridge 是阻塞的，也就是说，bridge 这个 APP 会一直等待两者挂机（或者其它错误）后才返回，才有可能继续执行下面的 Action。好吧，让我们休息一下，等他们两个聊完吧。

最后，无论哪一方挂机，bridge 就算结束了。如果 1000 先挂机，则 FreeSWITCH 会将挂机原因发送给 1001，一般是 NORMAL\_RELEASE（正常释放）。同时 Dialplan 就再也没有往下执行的必要的，因此会发送计费信息，并销售 a-leg 。

如果 1001 先挂机，b-leg 就这样消失了。但 a-leg 依然存在，所以还有戏看。

b-leg 会将挂机原因传到 a-leg。在 a-leg 决定是否继续往下执行之前，会检查一些变量。其中，我们在前面设置了 hangup\_after\_bridge=true。它的意思是，如果 bridge 正常完成后，就挂机。因此，a-leg 到这里就释放了，它的挂机原因是参考 b-leg 得出的。

但由于种种原因 1001 可能没接电话。1001 可能会拒接（CAlL\_REJECTED，但多数 SIP UA都会在用户拒接时返回 USER\_BUSY）、忙（USER_\_BUSY）、无应答（NO\_ANSWER 或 NO\_USER\_RESPONSE）等。出现这些情况时，FreeSWITCH 认为这是不成功的 bridge，因此 hangup\_after\_bridge 变量就不管用了。这时候它会检查另一个变量 continue\_on\_fail。由于我们上面设置的 continue\_on\_fail=true，因此在 bridge 失败（fail）后会继续执行下面的 Action。

这里值得说明的是，通过给 continue\_on\_fail 不同的值，可以决定在什么情况下继续。如：

	<action application="set" data="continue_on_fail=USER_BUSY,NO_ANSWER"/>
	
将只在用户忙和无应答的情况下继续。其它的值有：NORMAL\_TEMPORARY\_FAILURE（临时故障）、TIMEOUT（超时，一般时SIP超时）、NO\_ROUTE\_DESTINATION（没有路由）等。

	<action application="answer"/>

最后，无论什么原因导致 bridge 失败（我们没法联系上 1001），我们都决定继续执行. 首先 FreeSWITCH 给 1000 回送应答消息。这时非常重要的。

	<action application="sleep" data="1000"/>
	<action application="voicemail" data="default ${domain_name} ${dialed_extension}"/>

接下来，暂停一秒，并转到 1001 的语音信箱。语音信箱的知识等我们以后再讲。另外，默认配置中使用的是 loopback endpoint 转到 voicemail，为了方便说明，我直接改成了 voicemail。


#### 回声

没什么好解释的，如果拨 9196，就能听到自己的回声

	<extension name="echo">
	    <condition field="destination_number" expression="^9196$">
	        <action application="answer"/>
	        <action application="echo"/>
	    </condition>
	</extension>

#### 延迟回声

与 echo 基本一样，但回声会有一定延迟，5000 是毫秒数。

	<extension name="delay_echo">
	    <condition field="destination_number" expression="^9195$">
	        <action application="answer"/>
	        <action application="delay_echo" data="5000"/>
	    </condition>
	</extension>

## 内连拨号计划 - Inline Dialplan

首先，Inline dialplan 与上面我们讲的 Action 中的 inline 参数是不同的。 

XML Dialplan 支持非常丰富的功能，但在测试或编写程序时，我们经常用到一些临时的，或者是很简单的 Dialplan，如果每次都需要修改 XML，不仅麻烦，而且执行效率也会有所折扣。所以，我们需要一种短小、轻便的 Dialplan 以便更高效地完成任务。而且，通过使用 Inline dialplan，也可以很方便的在脚本中生成动态的 Dialplan 而无需使用复杂的 reloadxml 以及 mod\_xml\_curl 技术等。

（略）
