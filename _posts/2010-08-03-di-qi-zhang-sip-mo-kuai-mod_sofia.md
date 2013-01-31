---
layout: post
title: "第七章 SIP 模块 - mod_sofia "
tags:
  - "book"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


SIP 模块是 FreeSWITCH 的主要模块，所以，值得拿出专门一章来讲解。

在前几章时里，你肯定见过几次 sofia 这个词，只是或许还不知道是什么意思。是这样的，[Sofia-SIP](http://sofia-sip.sourceforge.net/) 是由诺基亚公司开发的 SIP 协议栈，它以开源的许可证 LGPL 发布，为了避免重复发明轮子，FreeSWITCH 便直接使用了它。

在 FreeSWITCH 中，实现一些互联协议接口的模块称为 Endpoint。FreeSWITH 支持很多的 Endpoint， 如 SIP、H232等。那么实现 SIP 的模块为什么不支持叫 mod\_sip呢？这是由于 FreeSWITCH 的 Endpoint 是一个抽象的概念，你可以用任何的技术来实现。实际上 mod\_sofia 只是对 Sofia-SIP 库的一个粘合和封装。除 Sofia-SIP 外，还有很多开源的 SIP 协议栈，如 pjsip、osip 等。最初选型的时候，FreeSWITCH 的开发团队也对比过许多不同的 SIP 协议栈，最终选用了 Sofia-SIP。FreeSWITCH 是一个高度模块化的结构，如果你不喜欢，可以自己实现 mod\_pjsip 或 mod\_osip 等，它们是互不影响的。这也正是 FreeSWITCH 架构设计的精巧之处。

Sofia-SIP 遵循 RFC3261 标准，因而 FreeSWITCH 也是。

## 配置文件

Sofia 的配置文件是 conf/autoload\_configs/sofia.conf.xml，不过，你一般不用直接修改它，因为它实际上直接使用一条预处理指令装入了 conf/sip\_profiles/ 目录中的 XML 文件：                                   

	    <X-PRE-PROCESS cmd="include" data="../sip_profiles/*.xml"/>
	
所以，从现在起，可以认为所有的 Sofia 配置文件都在 conf/sip\_profiles/ 中。

Sofia 支持多个 profile，而一个 profile 相当于一个 SIP UA，在启动后它会监听一个 “IP地址:端口” 对。读到这里细心的读者或许会发现我们前面的一个错误。我们在讲 B2BUA 的概念时，实际上只用到了一个 profile，也就是一个 UA，但我们还是说 FreeSWITCH 启动了两个 UA（一对背靠背的 UA）来为 alice 和 bob 服务。是的，从物理上来讲，它确实只是一个 UA，但由于它同时支持多个 Session，在逻辑上就是相当于两个 UA，为了不使用读者太纠结于这种概念问题中，我在前面没有太多的分析。但到了本章，你应该非常清楚 UA 的含义了。

FreeSWITCH 默认的配置带了三个 profile（也就是三个 UA），在这里，我们不讨论 IPv6，因此只剩下 internal 和 external 两个。 internal 和 external 的区别就是一个运行在 5060 端口上，另一个是在 5080 端口上。当然，还有其它区别，我们慢慢讲。

### internal.xml

internel.xml 定义了一个 profile，在本节，我们以系统默认的配置逐行来解释：

	<profile name="internal">

profile 的名字就叫 internal，这个名字本身并没有特殊的意义，也不需要与文件名相同，你可以改成任何你喜欢的名字，只是需要记住它，因为很多地方要使用这个名字。

	  <aliases>
	    <!--   <alias name="default"/>  -->
	  </aliases>
                                      
如果你喜欢，可以为该 profile 起一个别名。注意默认是加了注释的，也就是说不起作用。再说一遍，“\<!\-\-  \-\-\>”在 XML 中的含义是注释。

	  <gateways>
	    <X-PRE-PROCESS cmd="include" data="internal/*.xml"/>
	  </gateways>

即然 profile 是一个 UA，它就可以注册到别的 SIP 服务器上去，它要注册的 SIP 服务器就称为 Gateway。我们一般不在 internal 这个 profile 上使用 Gateway，这个留到 external 时再讲。

	  <domains>
	    <!--<domain name="$${domain}" parse="true"/>-->
	    <domain name="all" alias="true" parse="false"/> 
	  </domains>

定义该 profile 所属的 domain。它可以是 IP 地址，或一个 DNS 域名。需要注意，直接在 hosts 文件中设置的 IP-域名可能不好用。
  
	  <settings>

settings 部分设置 profile 的参数。

	    <!--<param name="media-option" value="resume-media-on-hold"/> -->
	
如果 FreeSWITCH 是没有媒体（no media）的，那么如果设置了该参数，当你在话机上按下 hold 键时，FreeSWITCH 将会回到有媒体的状态。

那么什么叫有媒体无媒体呢？如下图，bob 和 alice 通过 FreeSWITCH 使用 SIP 接通了电话，他们谈话的语音（或视频）数据要通过 RTP 包传送的。RTP 可以 像 SIP 一样经过 FreeSWITCH 转发，但是，RTP 占用很大的带宽，如果 FreeSWITCH 不需要“偷听”他们谈话的话，为了节省带宽，完全可以让 RTP 直接在两者间传送，这种情况对 FreeSWITCH 来讲就是没有 media 的，在 FreeSWITCH 中也称 bypass media（绕过媒体）。


                    FreeSWITCH
              SIP /            \ SIP
                /                \
            bob  ------RTP------  alice
.
	    <!--<param name="media-option" value="bypass-media-after-att-xfer"/>-->

Attended Transfer 称为出席转移，它需要 media 才能完成工作。但如果在执行 att-xfer 之前没有媒体，该参数能让 att-xfer 执行时有 media，转移结束后再回到 bypass media 状态。

	    <!-- <param name="user-agent-string" value="FreeSWITCH Rocks!"/> -->

不用解释，就是设置 SIP 消息中显示的 User-Agent 字段。

	    <param name="debug" value="0"/>

debug 级别。

		<!-- <param name="shutdown-on-fail" value="true"/> -->

由于各种原因（如端口被占用，IP地址错误等），都可能造成 UA 在初始化时失败，该参数在失败时会停止 FreeSWITCH。

	    <param name="sip-trace" value="no"/>

是否开启 SIP 消息跟踪。另外，也可以在控制台上用以下命令开启和关闭 sip-trace：

	sofia profile internal siptrace on
	sofia profile internal siptrace off
.
	    <param name="log-auth-failures" value="true"/>

是否将认证错误写入日志。
	
	    <param name="context" value="public"/>

context 是 dialplan 中的环境。在此指定来话要落到 dialplan 的哪个 context 环境中。需要指出，如果用户注册到该 profile 上（或是经过认证的用户，即本地用户），则用户目录（directory）中设置的 contex 优先级要比这里高。

	    <param name="rfc2833-pt" value="101"/>
	
设置 SDP 中 RFC2833 的值。RFC2833 是传递 DTMF 的标准。

	    <param name="sip-port" value="$${internal_sip_port}"/>
	
监听的 SIP 端口号，变量 internal\_sip\_port 在 vars.xml 中定义，默认是 5060。
	
	    <param name="dialplan" value="XML"/>

设置对应默认的 dialplan。我们后面会专门讲 dialplan。

	    <param name="dtmf-duration" value="2000"/>

设置 DTMF 的时长。

	    <param name="inbound-codec-prefs" value="$${global_codec_prefs}"/>

支持的来话语音编码，用于语音编码协商。global\_codec\_prefs 是在 vars.xml中定义的。

	    <param name="outbound-codec-prefs" value="$${global_codec_prefs}"/>
	
支持的去话语音编码。

	    <param name="rtp-timer-name" value="soft"/>

RTP 时钟名称 

	    <param name="rtp-ip" value="$${local_ip_v4}"/>

RTP 的 IP 地址，仅支持 IP 地址而不支持域名。虽然 RTP 标准说应该域名，但实际情况是域名解析有时不可靠。

	    <param name="sip-ip" value="$${local_ip_v4}"/>

SIP 的 IP。不支持域名。

	    <param name="hold-music" value="$${hold_music}"/>

UA 进行 hold 状态时默认播放的音乐。

	    <param name="apply-nat-acl" value="nat.auto"/>

使用哪个 NAT ACL。

	    <!-- <param name="extended-info-parsing" value="true"/> -->

扩展 INFO 解析支持。

	    <!--<param name="aggressive-nat-detection" value="true"/>-->
	
NAT穿越，检测 SIP 消息中的 IP 地址与实际的 IP 地址是否相符，详见 NAT穿越。

	    <!--
		There are known issues (asserts and segfaults) when 100rel is enabled.
		It is not recommended to enable 100rel at this time.
	    -->
	    <!--<param name="enable-100rel" value="true"/>-->
	
该功能暂时还不推荐使用。

	    <!--<param name="enable-compact-headers" value="true"/>-->

支持压缩 SIP 头。

	    <!--<param name="enable-timer" value="false"/>-->

开启、关闭 SIP 时钟。

	    <!--<param name="minimum-session-expires" value="120"/>-->

SIP 会话超时值，在 SIP 消息中设置 Min-SE。

	    <param name="apply-inbound-acl" value="domains"/>
	
对来话采用哪个 ACL。详见 ACL。

	    <param name="local-network-acl" value="localnet.auto"/>

默认情况下，FreeSWITCH 会自动检测本地网络，并创建一条 localnet.auto ACL 规则。

	    <!--<param name="apply-register-acl" value="domains"/>-->

对注册请求采用哪个 ACL。

	    <!--<param name="dtmf-type" value="info"/>-->

DTMF 收号的类型。有三种方式，info、inband、rfc2833。

* info 方式是采用 SIP 的 INFO 消息传送 DTMF 按键信息的，由于 SIP 和 RTP 是分开走的，所以，可能会造成不同步。
* inband 是在 RTP 包中象普通语音数据那样进行带内传送，由于需要对所有包进行鉴别和提取，需要占用更多的资源。
* rfc2833 也是在带内传送，但它的 RTP 包有特殊的标记，因而比 inband 方式节省资源。它是在 RFC2833 中定义的。

	    <!-- 'true' means every time 'first-only' means on the first register -->
	    <!--<param name="send-message-query-on-register" value="true"/>-->

如何发送请求消息。true 是每次都发送，而 first-only 只是首次注册时发送。   
      
	<!--<param name="caller-id-type" value="rpid|pid|none"/>-->

设置来电显示的类型，rpid 将会在 SIP 消息中设置 Remote-Party-ID，而 pid 则会设置 P-*-Identity，如果不需要这些，可以设置成 none。

	    <param name="record-path" value="$${recordings_dir}"/>

录音文件的默认存放路径。

	    <param name="record-template" value="${caller_id_number}.${target_domain}.${strftime(%Y-%m-%d-%H-%M-%S)}.wav"/>

录音文件名模板。

	    <param name="manage-presence" value="true"/>
是否支持列席。

	    <!--<param name="manage-shared-appearance" value="true"/>-->

是否支持 SLA - Shared Line Apperance。

	    <!--<param name="dbname" value="share_presence"/>-->
	    <!--<param name="presence-hosts" value="$${domain}"/>-->
	
这两个参数用以在多个 profile 间共享列席信息。


	    <!-- This setting is for AAL2 bitpacking on G726 -->
	    <!-- <param name="bitpacking" value="aal2"/> -->

	    <!--<param name="max-proceeding" value="1000"/>-->

最大的开放对话（SIP Dialog）数。

	    <!--session timers for all call to expire after the specified seconds -->
	    <!--<param name="session-timeout" value="120"/>-->

会话超时时间。

	    <!-- Can be 'true' or 'contact' -->
	    <!--<param name="multiple-registrations" value="contact"/>-->
	
是否支持多点注册，可以是 contact 或 true。开启多点注册后多个 UA 可以注册上来，有人呼叫这些 UA 时所有 UA 都会振铃。

	    <!--set to 'greedy' if you want your codec list to take precedence -->
	    <param name="inbound-codec-negotiation" value="generous"/>

SDP 中的语音编协商，如果设成 greedy，则自己提供的语音编码列表会有优先权.

	    <!-- if you want to send any special bind params of your own -->
	    <!--<param name="bind-params" value="transport=udp"/>-->

	    <!--<param name="unregister-on-options-fail" value="true"/>-->

为了 NAT 穿越或 keep alive，如果 FreeSWITCH 向其它网关注册时，可以周期性地发一些 OPTIONS 包，相当于 ping 功能。该参数说明当 ping 失败时是否自动取消注册。

	    <param name="tls" value="$${internal_ssl_enable}"/>

是否支持 TLS，默认否。
	
	    <!-- additional bind parameters for TLS -->
	    <param name="tls-bind-params" value="transport=tls"/>
	    <!-- Port to listen on for TLS requests. (5061 will be used if unspecified) -->
	    <param name="tls-sip-port" value="$${internal_tls_port}"/>
	    <!-- Location of the agent.pem and cafile.pem ssl certificates (needed for TLS server) -->
	    <param name="tls-cert-dir" value="$${internal_ssl_dir}"/>
	    <!-- TLS version ("sslv23" (default), "tlsv1"). NOTE: Phones may not work with TLSv1 -->
	    <param name="tls-version" value="$${sip_tls_version}"/>

下面都是与 TLS 有关的参数，略。

	    <!--<param name="rtp-autoflush-during-bridge" value="false"/>-->

该选项默认为 true。即在桥接电话是是否自动 flush 媒体数据（如果套接字上已有数据时，它会忽略定时器睡眠，能有效减少延迟）。
    
	    <!--<param name="rtp-rewrite-timestamps" value="true"/>-->

是否透传 RTP 时间戳。

	    <!--<param name="pass-rfc2833" value="true"/>-->

是否透传 RFC2833 DTMF 包。

	    <!--<param name="odbc-dsn" value="dsn:user:pass"/>-->
	
使用 ODBC 数据库代替默认的 SQLite。
    
	    <!--<param name="inbound-bypass-media" value="true"/>-->

将所有来电设置为媒体绕过。

	    <!--<param name="inbound-proxy-media" value="true"/>-->

将所有来电设置为媒体透传。
    
	    <!--Uncomment to let calls hit the dialplan *before* you decide if the codec is ok-->
	    <!--<param name="inbound-late-negotiation" value="true"/>-->

对所有来电来讲，晚协商有助于在协商媒体编码之前，先前电话送到 Dialplan，因而在 Dialplan 中可以进行个性化的媒体协商。
    
	    <!-- <param name="accept-blind-reg" value="true"/> -->     
	
该选项允许任何电话注册，而不检查用户和密码及其它设置。	

	    <!-- <param name="accept-blind-auth" value="true"/> -->

与上一条类似，该选项允许任何电话通过认证。
    
	    <!-- <param name="suppress-cng" value="true"/> -->

抑制 CNG。    

	    <param name="nonce-ttl" value="60"/>

SIP 认证中 nonce 的生存时间。

	    <!--<param name="disable-transcoding" value="true"/>-->
	
禁止译码，如果该项为 true 则在 bridge 其它电话时，只提供与 a-leg 兼容或相同的语音编码列表进行协商，以避免译码。
	
	    <!--<param name="manual-redirect" value="true"/> -->     

允许在 Dialplan 中进行人工转向。	
	
	    <!--<param name="disable-transfer" value="true"/> -->

禁止转移。

	    <!--<param name="disable-register" value="true"/> -->

禁止注册。

	    <!-- Used for when phones respond to a challenged ACK with method INVITE in the hash -->
	    <!--<param name="NDLB-broken-auth-hash" value="true"/>-->
	    <!-- add a ;received="<ip>:<port>" to the contact when replying to register for nat handling -->
	    <!--<param name="NDLB-received-in-nat-reg-contact" value="true"/>-->

	    <param name="auth-calls" value="$${internal_auth_calls}"/>

是否对电话进行认证。

	    <!-- Force the user and auth-user to match. -->


	    <param name="inbound-reg-force-matching-username" value="true"/>

强制用户与认证用户必须相同。

	    <param name="auth-all-packets" value="false"/>

在认证时，对所有 SIP 消息都进行认证，而不是仅针对 INVITE 消息。
    
	    <!-- external_sip_ip
	      Used as the public IP address for SDP.
	      Can be an one of:
	           ip address            - "12.34.56.78"
	           a stun server lookup  - "stun:stun.server.com"
	           a DNS name            - "host:host.server.com"
	           auto                  - Use guessed ip.
	           auto-nat              - Use ip learned from NAT-PMP or UPNP
	       -->
	    <param name="ext-rtp-ip" value="auto-nat"/>
	    <param name="ext-sip-ip" value="auto-nat"/>

设置 NAT 环境中公网的 RTP IP。该设置会影响 SDP 中的 IP 地址。有以下几种可能：

* 一个IP 地址，如 12.34.56.78
* 一个 stun 服务器，它会使用 stun 协议获得公网 IP， 如 stun:stun.server.com
* 一个 DNS 名称，如 host:host.server.com
* auto ， 它会自动检测 IP 地址
* auto-nat，如果路由器支持 NAT-PMP 或 UPNP，则可以使用这些协议获取公网 IP。

	    <param name="rtp-timeout-sec" value="300"/>

指定的时间内 RTP 没有数据传送，则挂机。

	    <param name="rtp-hold-timeout-sec" value="1800"/>
	
RTP 处理保持状态的最大时长。
	
	    <!-- <param name="vad" value="in"/> -->
	    <!-- <param name="vad" value="out"/> -->
	    <!-- <param name="vad" value="both"/> -->

语音活动状态检测，有三种可能，可设为入、出，或双向，通常来说“出”（out）是一个比较好的选择。	
	
	    <!--<param name="alias" value="sip:10.0.1.251:5555"/>-->
	
给本 sip profile 设置别名。


	    <!--all inbound reg will look in this domain for the users -->
	    <param name="force-register-domain" value="$${domain}"/>
	    <!--force the domain in subscriptions to this value -->
	    <param name="force-subscription-domain" value="$${domain}"/>
	    <!--all inbound reg will stored in the db using this domain -->
	    <param name="force-register-db-domain" value="$${domain}"/>
	    <!--force suscription expires to a lower value than requested-->
	    <!--<param name="force-subscription-expires" value="60"/>-->

以上选项默认是起作用的，这有助于默认的例子更好的工作。它们会在注册及订阅时在数据库中写入同样的域信息。如果你在使用一个 FreeSWITCH 支持多个域时，不要选这些选项。

	    <!--<param name="enable-3pcc" value="true"/>-->                               
	
该选项有两个值，true 或 poxy。 true 则直接接受 3pcc 来电；如果选 proxy，则会一直等待电话应答后才回送接受。	
	
	
	    <!-- use at your own risk or if you know what this does.-->
	    <!--<param name="NDLB-force-rport" value="true"/>-->

在 NAT 时强制 rport。除非你很了解该参数，否则后果自负。

	    <param name="challenge-realm" value="auto_from"/>
设置 SIP Challenge 是使用的 realm 字段是从哪个域获取，auto\_from 和 auto\_to 分别是从 from 和 to 中获取，除了这两者，也可以是任意的值，如 freeswitch.org.cn。

	    <!--<param name="disable-rtp-auto-adjust" value="true"/>-->

大多数情况下，为了更好的穿越 NAT，FreeSWITCH 会自动调整 RTP 包的 IP 地址，但在某些情况下（尤其是在 mod\_dingaling 中会有多个候选 IP），FreeSWITCH 可能会改变本来正确的 IP 地址。该参数禁用此功能。

	    <!--<param name="inbound-use-callid-as-uuid" value="true"/>-->

在 FreeSWITCH 是，每一个 Channel 都有一个 UUID， 该 UUID 是由系统生成的全局唯一的。对于来话，你可以使用 SIP 中的 callid 字段来做 UUID. 在某些情况下对于信令的跟踪分析比较有用。

	    <!--<param name="outbound-use-uuid-as-callid" value="true"/>-->

与上一个参数差不多，只是在去话时可以使用 UUID 作为 callid。

	    <!--<param name="rtp-autofix-timing" value="false"/>-->

RTP 自动定时。如果语音质量有问题，可以尝试将该值设成 false。

	    <!--<param name="pass-callee-id" value="false"/>-->

默认情况下 FreeSWITCH 会设置额外的 X- SIP 消息头，在 SIP 标准中，所有 X- 打头的消息头都是应该忽略的。但并不是所有的实现都符合标准，所以在对方的网关不支持这种 SIP 头时，该选项允许你关掉它。


	    <!-- clear clears them all or supply the name to add or the name prefixed with ~ to remove
		 valid values:

		 clear
		 CISCO_SKIP_MARK_BIT_2833
		 SONUS_SEND_INVALID_TIMESTAMP_2833

	    -->
	    <!--<param name="auto-rtp-bugs" data="clear"/>-->

某些运营商的设备不符合标准。为了最大限度的支持这些设备，FreeSWITCH 在这方面进行了妥协。使用该参数时要小心。


		 <!-- the following can be used as workaround with bogus SRV/NAPTR records -->
		 <!--<param name="disable-srv" value="false" />-->
		 <!--<param name="disable-naptr" value="false" />-->

这两个参数可以规避 DNS 中某些错误的 SRV 或 NAPTR 记录。

最后的这几个参数允许根据需要调整 sofia 库中底层的时钟，一般情况下不需要改动。

		<!-- The following can be used to fine-tune timers within sofia's transport layer 
			 Those settings are for advanced users and can safely be left as-is -->
		
		<!-- Initial retransmission interval (in milliseconds).
			Set the T1 retransmission interval used by the SIP transaction engine. 
			The T1 is the initial duration used by request retransmission timers A and E (UDP) as well as response retransmission timer G. 	 -->
		<!-- <param name="timer-T1" value="500" /> -->
	
		<!--  Transaction timeout (defaults to T1 * 64).
			Set the T1x64 timeout value used by the SIP transaction engine.
			The T1x64 is duration used for timers B, F, H, and J (UDP) by the SIP transaction engine. 
			The timeout value T1x64 can be adjusted separately from the initial retransmission interval T1. -->
		<!-- <param name="timer-T1X64" value="32000" /> -->
	
	
		<!-- Maximum retransmission interval (in milliseconds).
			Set the maximum retransmission interval used by the SIP transaction engine. 
			The T2 is the maximum duration used for the timers E (UDP) and G by the SIP transaction engine. 
			Note that the timer A is not capped by T2. Retransmission interval of INVITE requests grows exponentially 
			until the timer B fires.  -->
		<!-- <param name="timer-T2" value="4000" /> -->
		
		<!--
			Transaction lifetime (in milliseconds).
			Set the lifetime for completed transactions used by the SIP transaction engine. 
			A completed transaction is kept around for the duration of T4 in order to catch late responses. 
			The T4 is the maximum duration for the messages to stay in the network and the duration of SIP timer K. -->
		<!-- <param name="timer-T4" value="4000" /> -->
    
	  </settings>
	</profile>

### external.xml

它是另一个 UA 配置文件，它默认使用端口 5080。你可以看到，大部分参数都与 internal.xml 相同。最大的不同是 auth-calls 参数。在 internal.xml 中，auth-calls 默认是 true；而在 external.xml 中，默认是 false。也就是说，发往 5060 端口的 SIP 消息（一般只有 INVITE 消息）需要认证，而发往 5080 的消息则不需要认证。我们一般把本地用户都注册到 5060 上，所以，它们打电话时要经过认证，保证只有在们用户 directory 中配置的用户能打电话。而 5080 则不同，任何人均可以向该端口发送 SIP 请求。

TODO.

### gateway

TODO.

## NAT 问题

TODO.
