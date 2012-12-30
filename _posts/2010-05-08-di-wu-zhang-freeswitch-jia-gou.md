---
layout: post
title: "第五章 FreeSWITCH 架构"
---

# {{ page.title }}

从来章开始，我们正式开始我们的 FreeSWITCH 之旅。今后我们不再用单独的章节来讲述VoIP中的其它要素和概念，而是在用到时穿插于各个章节之中。

总体结构
----

FreeSWITCH 由一个稳定的核心及外围模块组成，下图来自 FreeSWITCH Wiki：

<img src="http://commondatastorage.googleapis.com/freeswitch.org.cn/images/5-1.jpg"/>                    

FreeSWITCH 使用线程模型来处理并发请求，每个连接都在单独的线程中进行处理。这不仅能提供最大强度的并发，更重要的是，即使某路电话发生问题，也只影响到它所在的线程，而不会影响到其它电话。FreeSWITCH 的核心非常短小精悍，这也是保持稳定的关键。所有其它功能都在外围的模块中。模块是可以动态加载（以及卸载）的，在实际应用中可以只加载用到的模块。外围模块通过核心提供的 Public API 与核心进行通信，而核心则通过回调机制执行外围模块中的代码。

核心
----

FS Core 是 FreeSWITCH 的核心，它包含了关键的数据结构和复杂的代码，但这些代码只出现在核心中，并保持了最大限度的重用。外围模块只能通过 API 调用核心的功能，因而核心运行在一个受保护的环境中，核心代码都经过精心的编码和严格的测试，最大限度地保持了系统整体的稳定。

核心代码保持了最高度的抽象，因而它可以调用不同功能，不同协议的模块。同时，良好的 API 也使得编写不同的外围模块非常容易。

数据库
----

FreeSWITCH 的核心除了使用内部的队列、哈希表存储数据外，也使用外部的 SQL 数据库存储数据。当前，系统的核心数据库使用 SQLite，默认的存储位置是 db/core.db 。 使用外部数据库的好处是--查询数据不用锁定内存数据结构，这不仅能提供性能，而且降低了死锁的风险，保证了系统稳定。命令 show calls、show channels 等都是直接从数据库中读取内容并显示的。由于 SQLite 会进行读锁定，因此不建议直接读取核心数据库。

系统对数据库操作做了优化，在高并发状态时，核心会尽量将几百条 SQL 一齐执行，这大大提高了性能。但在低并发的状态下执行显得稍微有点慢，如一个 channel 已经建立了，但还不能在 show channels 中显示；或者，一个 channel 已经 destroy 了，还显示在 show channels 中。但由于这些数据只用于查询，而不用于决策，所以一般没什么问题。

除核心数据库外，系统也支持使用 ODBC 方式连接其它数据库，如 PostgreSQL、MySQL等。某些模块，如 mod\_sofia、mod\_fifo等都有自己的数据库（表）。如果在 \*nix 类系统上使用 ODBC，需要安装 UnixODBC，并进行正确的配置，如果编译安装的话还需要开发包 unixodbc-devel（CentOS） 或 unixodbc-dev（Debian/Ubuntu）。由于 PostgreSQL、MySQL 等都是 Client-Server 的结构，因此，外部程序可以直接查询数据（但需要清楚数据的准确性，可能会比 FreeSWITCH 核心中的数据有所滞后）。
  
模块
----                                                                               
FreeSWITCH 主要分为以下几个部分：

### 终点

End Points 是终结 FreeSWITCH 的地方，也就是说再往外走就超出 FreeSWITCH 的控制了。它主要包含了不同呼叫控制协议的接口，如 SIP， TDM 硬件，H323 以及 Google Talk 等。这使得 FreeSWITCH 可以与众多不同的电话系统进行通信。如，可以使用 mod\_skypopen 与 Skype 网络进行通信。另外，前面也讲过，它还可以通过 portaudio 驱动本地声卡，用作一个软电话。

### 拨号计划

Dialplan 主要是为了查找电话路由，主要的是 XML 描述的，但它也支持 Asterisk 格式的配置文件。另外它也持 ENUM 查询。

### XML 接口

XML Interface 支持多种获取 XML 配置的方式，它可以是本地的配置文件，或从数据库中读取，甚至是一个能动态返回 XML 的远程 HTTP 服务器。

### 编解码器

FreeSWITCH 支持最广泛的 Codec，除了大多数 VoIP 系统支持的 G711、G722、G729、GSM 外，它还支持 iLBC，BV16/32、SILK、CELT等。它可以同时桥接不同采样频率的电话，以及电话会议等。          

### 语音识别

支持语音自动识别（ASR）及文本-语音转换（TTS）。

### 文件格式

支持不同的声音文件格式，如 wav，mp3等。 

###日志

日志可以写到控制台、日志文件、系统日志（syslog）以及远程的日志服务器。

### 嵌入式语言

通过 swig 包装支持多种脚本语本语言控制呼叫流程，如 Lua、Javascript、Perl等。

### 事件套接字

使用 Event Socket 可以使用任何其它语言通过 Socket 方式控制呼叫流程、扩展 FreeSWITCH 功能。

                                                                    
目录结构
----

在 \*nix 类系统上，FreeSWITCH 默认的安装位置是 */usr/local/freeswitch*，在 Windows 上可能是 *C:\freeswitch*，目录结构大致相同。

	
	bin			可执行程序
	db			系统数据库（sqlite），FreeSWITCH 把呼叫信息存放到数据库里以便在查询时无需对核心数据结构加锁
	htdocs		HTTP Web srver 根目录
	lib			库文件
	mod			可加载模块
	run			运行目录，存放 PID
	sounds		声音文件，使用 playback() 时默认的寻找路径
	grammar		语法
	include		头文件
	log			日志，CDR 等
	recordings	录音，使用 record() 时默认的存放路径
	scripts		嵌入式语言写的脚本，如使用 lua()、luarun()、jsrun 等默认寻找的路径
	storage		语言留言（Voicemail）的录音
	conf		配置文件，详见下节
	
## 配置文件
                                  
配置文件由许多 XML 文件组成。在系统装载时，XML解析器会将所有XML文件组织在一起，并读入内存，称为XML注册表。这种设计的好处在于其非常高的可扩展性。由于XML文档本身非常适合描述复杂的数据结构，在 FreeSWITCH 中 就可以非常灵活的使用这些数据。并且，外部应用程序也可以很简单地生成XML，FreeSWITCH 在需要时可以动态的装载这些 XML。另外，系统还允许在某些 XML 节点上安装回调程序(函数)，当这些节点的数据变化时，系统便自动调用这些回调程序。

使用 XML 唯一的不足就是手工编辑这些 XML 比较困难，但正如[其作者所言](http://www.freeswitch.org/node/123)，他绝对不是 XML 的粉丝，但这一缺点与它所带来的好处相比是微不足道的。而且，将来也许会有图形化的配置工具，到时候只所高级用户会去看这些XML了。

### 目录结构

配置文件的的目录结构如下（其中结尾有 “/” 的为目录）：

	autoload_configs/
	dialplan/
	directory/
	extensions.conf
	freeswitch.xml
	fur_elise.ttml
	jingle_profiles/
	lang/
	mime.types
	notify-voicemail.tpl
	sip_profiles/
	tetris.ttml
	vars.xml
	voicemail.tpl
	web-vm.tpl

其中最重要的是 freeswitch.xml，就是它将所有配置文件“粘”到一起。只要有一点 XML 知识，这些配置是很容易看懂的。其中，X-PRE-PROCESS标签称为预处理命令，它用来设置一些变量和装入其它配置文件。在 XML 加载阶段，FreeSWITCH 的 XML 解析器会先将预处理命令进行展开，生成一个大的 XML 文件 log/freeswitch.xml.fsxml。该文件是一个内存镜像，用户不应该手工编辑它。但它对调试非常有用，假设你不慎弄错了某个标签，又不知道它在哪个地方，FreeSWITCH 在加载时就报 XML 的某一行出错，在该文件中就行容易找到。

整个XML文件分为几个重要的部分：configuration  （配置）、dialplan （拨号计划）、directory（用户目录）及phrase（分词）。每一部分又分别装入不同的 XML。
                                
	小知识：XML
	XML由标签(Tag)和属性构成。<tag> 和 </tag>组成一对标签，如果该标签有相关属性，刚以
	<tag attr="value"></tag> 形式指定。有些标签无须配对，则必须以 “/>”关闭该标签定义，
	如<other\_tag attr="value"/>。

### freeswitch.xml
    
	<?xml version="1.0"?>
	<document type="freeswitch/xml">
        <!-- #comment 这是一个配置文件，本行是注释 -->
		
		<X-PRE-PROCESS cmd="include" data="vars.xml"/>

		<section name="configuration" description="Various Configuration">
		    <X-PRE-PROCESS cmd="include" data="autoload_configs/*.xml"/>
		</section>
	</document>
	
上面是一个精减了的 freeswitch.xml。它的根是 *document*，在 *document* 中，有许多 *section*，每个 *section* 都对应一部分功能。其中有两个 X-PRE-PROCESS 预处理指令，它们的作用是将 *data* 参数指定的文件包含（*include*）到本文件中来。由于它是一个预处理指令，FreeSWITCH 在加载阶段只对其进行简单替换，并不进行语法分析，因此，对它进行注释是没有效果的，这是一个新手常犯的错误。假设 vars.xml 的内容如下，它是一个合法的 XML：

	<!-- this is vars.xml -->
	<var>xxxxx</var>

若你在调试阶段想把一条 X-PRE-PROCESS 指令注释掉：

	<!-- <X-PRE-PROCESS cmd="include" data="vars.xml"/> -->

当 FreeSWITCH 预处理时，还没有到达 XML 解析阶段，也就是说它还不认识 XML 注释语法，而仅会机械地将预处理指令替换为 vars.xml 里的内容：

	<!-- <!-- this is vars.xml -->
	<var>xxxxx</var> -->                                                  
	
由于 XML 的注释不能嵌套，因此便产生错误的XML。解决办法是破坏掉 X-PRE-PROCESS 的定义，如我常用下面两种方法：

	<xX-PRE-PROCESS cmd="include" data="vars.xml"/>
	<XPRE-PROCESS cmd="include" data="vars.xml"/>

由于 FreeSWITCH 不认识 xX-PRE-PROCESS 及 XPRE-PROCESS，因此它会忽略掉该行，相当于注释掉了。

### vars.xml
vars.xml 主要通过 X-PRE-PROCESS 指令定义了一些全局变量。全局变量以 *$${var}* 表示，临时变量以 *${var}* 表示。有些变量是系统在运行时自动获取的，如默认情况下 *$${base\_dir}*=/usr/local/freeswitch, *$${local\_ip\_v4}*=你机器的IP地址等。

### autoload\_configs 目录
autoload\_configs目录下面的各种配置文件会在系统启动时装入。一般来说都是模块级的配置文件，每个模块对应一个。文件名一般以 *模块名.conf.xxml* 方式命名。其中 *modules.conf.xml* 决定了 FreeSWITCH 启动时自动加载哪些模块。

### dialplan 目录
定义 XML 拨号计划，我们会有专门的章节讲解拨号计划。

### directory 目录
它里面的配置文本决定了 FreeSWITCH 作为注册服务器时哪些用户可以注册上来。FreeSWITCH 支持多个域（Domain），每个域可以写到一个 XML 文件里。默认的配置包括一个 default.xml，里面定义了 1000 ~ 1019 一共 20 个用户。

### sip\_profiles
它定义了 SIP 配置文件，实际上它是由 mod_sofia 模块在 autoload\_configs/sofia.conf.xml 中加载的。但由于它本身比较复杂又是核心的功能，因此单列了一个目录。我们将会在后面加以详细解释。

## XML 用户目录

XML 用户目录决定了哪些用户可以注册到 FreeSWITCH 上。当然，SIP 并不要求一定要注册才可以打电话，但是用户认证仍需要在用户目录中配置。

用户目录的默认配置文件在 conf/directory/，系统自带的配置文件为 default.xml（其中 dial-string 一行由于排版要求人工换行，实际上不应该有换行）：

	<domain name="$${domain}">
	  <params>
	    <param name="dial-string" value="{presence_id=${dialed_user}@${dialed_domain}}
			${sofia_contact(${dialed_user}@${dialed_domain})}"/>
	  </params>

	  <variables>
	    <variable name="record_stereo" value="true"/>
	    <variable name="default_gateway" value="$${default_provider}"/>
	    <variable name="default_areacode" value="$${default_areacode}"/>
	    <variable name="transfer_fallback_extension" value="operator"/>
	  </variables>

	</domain>

该配置文件决定了哪些用户能注册到 FreeSWITCH 中。一般来说，所有用户都应该属于同一个 domain（除非你想使用多 domain，后面我们会有例子）。这里的 $${domain} 全局变量是在 vars.xml 中设置的，它默认是主机的 IP 地址，但也可以修改，使用一个域名。params 中定义了该 domain 中所有用户的公共参数。在这里只定义了一个 dial-string，这是一个至关重要的参数。当你在使用 user/user\_name 或 sofia/internal/user\_name 这样的呼叫字符串时，它会扩展成实际的 SIP 地址。其中 sofia\_contact 是一个 API，它会根据用户的注册地址扩展成相应的呼叫字符串。

variables 则定义了一些公共变量，在用户做主叫或被叫时，这些变量会绑定到相应的 Channel 上形成 Channel Variable。

在 domain 中还定义了许多组（group），组里面包含很多用户（user）。

	<groups>
	  <group name="default">
	    <users>
	      <X-PRE-PROCESS cmd="include" data="default/*.xml"/>
	    </users>
	  </group>
	</groups>               

在这里，组名 default 并没有什么特殊的意义，它只是随便起的，你可以修改成任何值。在用户标签里，又使用预处理指令装入了 default/ 目录中的所有 XML 文件。你可以看到，在 default/ 目录中，每个用户都对应一个文件。

你也可以定义其它的用户组，组中的用户并不需要是完整的 XML 节点，也可以是一个指向一个已存在用户的“指针”，如下图，使用 type="pointer" 可以定义指针。

	  <group name="sales">
	    <users>
	      <user id="1000" type="pointer"/>
	      <user id="1001" type="pointer"/>
	      <user id="1002" type="pointer"/>
	    </users>
	  </group>
	
虽然我们这里设置了组，但使用组并不是必需的。如果你不打算使用组，可以将用户节点（users）直接放到 domain 的下一级。但使用组可以支持像群呼、代接等业务。使用 group\_call 可以同时或顺序的呼叫某个组的用户。

实际用户相关的设置也很直观，下面显示了 alice 这个用户的设置：

	<user id="alice">
	  <params>
	    <param name="password" value="$${default_password}"/>
	    <param name="vm-password" value="alice"/>
	  </params>
	  <variables>
	    <variable name="toll_allow" value="domestic,international,local"/>
	    <variable name="accountcode" value="alice"/>
	    <variable name="user_context" value="default"/>
	    <variable name="effective_caller_id_name" value="Extension 1000"/>
	    <variable name="effective_caller_id_number" value="1000"/>
	    <variable name="outbound_caller_id_name" value="$${outbound_caller_name}"/>
	    <variable name="outbound_caller_id_number" value="$${outbound_caller_id}"/>
	    <variable name="callgroup" value="techsupport"/>
	  </variables>
	</user>

由上面可以看到，实际上 params 和 variables 可以出现在 user 节点中，也可以出现在 group 或 domain 中。 当它们有重复时，优先级顺序为 user，group，domain。
                    
当然，用户目录还有一些更复杂的设置，我们留待以后再做研究。

## 呼叫流程及相关概念
再复习一下，FreeSWITCH是一个B2BUA，我们还是以第四章中的图为例：

<img src="http://commondatastorage.googleapis.com/freeswitch.org.cn/images/4-3.png"/>

主要呼叫流程有以下两种：

 * bob 向 FreeSWITCH 发起呼叫，FreeSWTICH 接着启动另一个 UA 呼叫 alice，两者通话；
 * FreeSWITCH 同时呼叫 bob 和 alice，两者接电话后 FreeSWITCH 将 a-leg 和 b-leg 桥接（bridge）到一起，两者通话。

其中第二种又有一种变种。如市场上有人利用上、下行通话的不对称性卖电话回拨卡获取不正当利润：bob 呼叫 FreeSWITCH，FreeSWITCH 不应答，而是在获取 bob 的主叫号码后直接挂机；然后 FreeSWITCH 回拨 bob；bob 接听后 FreeSWITCH 启动一个 IVR 程序指示 bob 输入 alice 的号码；然后 FreeSWITCH 呼叫 Alice……

在实际应用中，由于涉及回铃音、呼叫失败等，实际情况要复杂的多。

### Session 与 Channel                         

对每一次呼叫，FreeSWITCH 都会启动一个 Session（会话，它包含SIP会话，SIP会在每对UAC-UAS之间生成一个 SIP Session），用于控制整个呼叫，它会一直持续到通话结束。其中，每个 Session 都控制着一个 Channel（信道），Channel 是一对 UA 间通信的实体，相当于 FreeSWITCH 的一条腿（leg），每个 Channel 都有一个唯一的 UUID。另外，Channel 上可以绑定一些呼叫参数，称为 Channel Variable（信道变量）。Channel 中可能包含媒体（音频或视频流），也可能不包含。通话时，FreeSWITCH 的作用是将两个 Channel（a-leg 和 b-leg，通常先创建的或占主动的叫 a-leg）桥接（bridge）到一起，使双方可以通话。

通话中，媒体（音频或视频）数据流在 RTP 包中传送（不同于 SIP， RTP是另外的协议）。一般来说，Channel是双向的，因此，媒体流会有发送（Send/Write）和接收（Receive/Read）两个方向。

### 回铃音与 Early Media
             

	A  ------ |a 交换机 | ---X--- | 交换机 b| -------- B

为了便于说明，我们假定A与B不在同一台服务器上（如在PSTN通话中可能不在同一座城市），中间需要经过多级服务器的中转。

假设上图是在 PSTN 网络中，A 呼叫 B，B 话机开始振铃，A 端听回铃音（Ring Back Tone）。在早期，B 端所在的交换机只给 A 端交换机送地址全（ACM）信号，证明呼叫是可以到达 B 的，A 端听到的回铃音铃流是由 A 端所在的交换机生成并发送的。但后来，为了在 A 端能听到 B 端特殊的回铃音（如“您拨打的电话正在通话中…” 或 “对方暂时不方便接听您的电话” 尤其是现代交换机支持各种个性化的彩铃 - Ring Back Color Tone 等），回铃音就只能由 B 端交换机发送。在 B 接听电话前，回铃音和彩铃是不收费的（不收取本次通话费。彩铃费用一般是在 B 端以月租或套餐形式收取的）。这些回铃音就称为 Early Media(早期媒体)。它是由 SIP 的183(带有SDP)消息描述的。

理论上讲，B 接听电话后交换机 b 可以一直不向 a 交换机发送应答消息，而将真正的话音数据伪装成 Early Media，以实现“免费通话”。

### Channel Variable
在每一个 Channel 上都可以设置好多 Variable，称为信道变量。FreeSWITCH 呼叫过程中，会根据这些变量控制 Channel 的行为。

#### $${var} 与 ${var}

${var} 是在 dialplan、application 或 directory 中设置的变量，它会影响呼叫流程并且可以动态的改变。而 $${var} 则是全局的变量，它仅在预处理阶段（系统启动时，或重新装载 - reloadxml时）被求值。后者一般用于设置一些系统一旦启动就不会轻易改变的量，如 $${domain} 或 $${local\_ip\_v4}等。所以，两者最大的区别是，$${var} 只求值一次，而 ${var} 则在每次执行时求值（如一个新电话进来时）。

#### $variable_xxxx

你会发现，有些变量在显示时（可以使用dp\_tools 中的 info() 显示，后面会讲到）是以“variable\_”开头的，但在实际引用时要去掉这开头的“variable\_”。如“variable\_user\_name”，引用时要使用“${user_name}”。<http://wiki.freeswitch.org/wiki/Channel_Variables#variable_xxxx> 列举了一些常见的变量显示与引用时的对应关系。                                                   

#### 给 Variable 赋值

在 dialplan 中，有两个程序可以给 Variable 赋值：                                                             

	<action application="set" data="my_var=my_value"/>
	<action application="export" data="my_var=my_value"/>

以上两条命令都可以设置 my\_var 变量的值为 my_value。不同的是 -- set 程序仅会作用于“当前”的 Channel （a-leg），而 export 程序则会将变量设置到两个 Channel （a-leg 和 b-leg）上，如果当时 b-leg 还没有创建，则会在创建时设置。另外，export 还可以只将变量设置到 b-leg 上：

	<action appliction="export" data="nolocal:my_var=my_value"/>
	
在实际应用中，如果 a-leg 上已经有一些变量的值（如 var1、var2、var3），而想同时把这些变量都复制到 b-leg 上，可以使用以下几种办法：

	<action application="export" data="var1=$var1"/>
	<action application="export" data="var2=$var2"/>
	<action application="export" data="var3=$var3"/>
	
或者使用如下等价的方式：                                                         

	<action application="set" data="export_vars=var1,var2,var3">

所以，其实 set 也具有能往 b-leg 上赋值的能力，其实，它和 export 一样，都是操作 export\_vars 这个特殊的变量。

#### 取消 Variable 定义

取消 Variable 定义只需对它赋一个特殊的值\_undef\_”：

	<action application="set" data="var1=_undef_">
	
#### 截取 Variable 的一部分

可以使用特殊的语法取一个 Variable 的子串，格式是“${var:位置:长度}”。其中 “位置” 从 0 开始计烽，若为负数则从字符串尾部开始计数；如果“长度”为 0 或小于 0，则会从当前“位置”一直取到字符串结尾（或开头，若“位置”为负的话）。例如 var 的值为 1234567890，那么：
                 
	${var}      = 1234567890
	${var:0:1}  = 1
	${var:1}    = 234567890
	${var:-4}   = 7890
	${var:-4:2} = 78
	${var:4:2}  = 56


## 小结

本章描述了 FreeSWITCH 的架构。到这里，读者应该对 FreeSWITCH 有了一个总体的了解。我们也提到了一些基本元素和概念，简单介绍了配置文件的基本结构，由于脱离了实际单讲配置会比较抽象，因此，我们把具体的配置也写到后面的章节里，即，用到时再说。
