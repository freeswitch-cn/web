---
layout: default
title: "第四章 SIP"
---

# {{ page.title }}

                                   
在继续学习 FreeSWITCH 之前我们有必要来学习一下 SIP 协议，因为它是 FreeSWITCH 的核心。但即使如此，讲清楚 SIP 必然需要很大篇幅，本书是关于 FreeSWITCH 的，而重点不是 SIP。因此，我将仅就理解 FreeSWITCH 必需的一些概念加以通俗的解释，更严肃一些的请参阅其它资料或 RFC（Request For Comments）。

## SIP 的概念和相关元素
                                                             
会话初始协议（Session Initiation Protocol）是一个控制发起、修改和终结交互式多媒体会话的信令协议。它是由 IETF（Internet Engineering Task Force，Internet工程任务组）在 RFC 2543 中定义的。最早发布于 1999 年 3 月，后来在 2002 年 6 月又发布了一个新的标准 RFC 2361。

SIP 是一个基于文本的协议，在这一点上与 HTTP 和 SMTP 相似。我们来对比一个简单的 SIP 请求与 HTTP 请求：
	
	GET /index.html HTTP/1.1

	INVITE sip:seven@freeswitch.org.cn SIP/2.0
	
请求由三部分组成。在 HTTP 中， GET 指明一个获取资源（文件）的动作，而 /index.html 则是资源的地址，最后是协议版本号。而在 SIP 中，INVITE 表示发起一次请求，seven@freeswitch.org.cn 为请求的地址，称为 SIP URI，最后也是版本号。其中，SIP URI很类似一个电子邮件，其格式为“协议:名称@主机”。与 HTTP 和 HTTPS 相对应，有 SIP 和 SIPS，后者是加密的；名称可以是一串数字的电话号码，也可以是字母表示的名称；而主机可以是一个域名，也可以是一个IP地址。

SIP 是一个对等的协议，类似 P2P。不像传统电话那样必须有一个中心的交换机，它可以在不需要服务器的情况下进行通信，只要通信双方都彼此知道对方地址（或者，只有一方知道另一方地址），如下图，bob 给 alice 发送一个 INVITE 请求，说“Hi, 一起吃饭吧...”，alice 说"好的，OK"，电话就通了。

<img src="http://commondatastorage.googleapis.com/freeswitch.org.cn/images/4-1.png"/>

在 SIP 网络中，alice 和 bob 都叫做用户代理（UA, User Agent）。UA 是在 SIP 网络中发起或响应 SIP 处理的逻辑功能。UA是有状态的，也就是说，它维护会话（或称对话）的状态。UA 有两种功能：一种是 UAC（UA Client用户代理客户端），它是发起 SIP 请求的一方，如上图的 bob。另一种是 UAS（UA Server），它是接受请求并发送响应的一方，如上图中的 alice。由于 SIP 是对等的，如果 alice 呼叫 bob 时（有时候 alice 也主动叫 bob 一起吃饭），alice 就称为 UAC，而 bob 则执行 UAS的功能。一般来说，UA 都会实现上述两种功能。

设想 bob 和 alice 是经人介绍认识的，而他们还不熟悉，bob 想请 alice 吃饭就需要一个中间人（M）传话，而这个中间人就叫代理服务器（Proxy Server）。还有另一种中间人叫做重定向服务器（Redirect Server），它类似于这样的方式工作──中间人 M 告诉 bob，我也不知道 alice 在哪里，但我老婆知道，要不然我告诉你我老婆的电话，你直接问她吧，我老婆叫 W。这样，M 就成了一个重定向服务器，而他老婆 W 则是真正的代理服务器。这两种服务器都是 UAS，它们主要是提供一对欲通话的 UA 之间的路由选择功能。具有这种功能的设备通常称为边界会话控制器（SBC，Service Border Controller）。

还有一种 UAS 叫做注册服务器。试想这样一种情况，alice 还是个学生，没有自己的手机，但它又希望 bob 能随时找到她，于是当她在学校时就告诉中间人 M 说她在学校，如果有事打她可以打宿舍的电话；而当她回家时也通知 M 说有事打家里电话。只要 alice 换一个新的位置，它就要向 M 重新“注册”新位置的电话，以让 M 能随时找到她，这时候 M 就是一个注册服务器。

最后一种叫做背靠背用户代理（B2BUA，Back-to-Back UA）。需要指出，其实 RFC 3261 并没有定义 B2BUA的功能，它只是一对 UAS 和 UAC的串联。FreeSWITCH 就是一个典型的 B2BUA，事实上，B2BUA 的概念会贯穿本书始终，所以，在此我们需要多花一点笔墨来解释。

我们来看上述故事的另一个版本：M 和 W 是一对恩爱夫妻。M 认识 bob 而 W 认识 alice。M 和 W 有意搓合两个年轻人，但见面时由于两人太腼腆而互相没留电话号码。事后 bob 相知道 alice 对他感觉如何，于是打电话问 M，M 不认识 alice，就转身问老婆 W （注意这次 M 没有直接把 W 电话给 bob），W 接着打电话给 alice，alice 说印象还不错，W 就把这句话告诉 M， M 又转过身告诉 bob。 M 和 W 一个面向 bob，一个对着 alice，他们两个合在一起，称作 B2BUA。在这里，bob 是 UAC，因为他发起请求；M 是 UAS，因为他接受 bob 的请求并为他服务；我们把 M 和 W 看做一个整体，他们背靠着背（站着坐着躺着都行），W 是 UAC，因为她又向 alice 发起了请求，最后 alice 是 UAS。其实这里UAC 和 UAS 的概念也不是那么重要，重要的是要理解这个**背靠背的用户代理**。因为事情还没有完，bob 一听说 alice 对他印象还不错，心花怒放，便想请 alice 吃饭，他告诉 M， M 告诉 W， W 又告诉 alice，alice 问去哪吃，W 又只好问 M， M 再问 bob…… 在这对年轻人挂断电话这前， M 和 W 只能“背对背”的工作。

<img src="http://commondatastorage.googleapis.com/freeswitch.org.cn/images/4-2.png"/>

从上图可以看出，四个人其实全是 UA。从上面故事可以看出，虽然 FreeSWITCH 是 B2BUA，但也可以经过特殊的配置，实现一些代理服务器和重定向服务器的功能，甚至也可以从中间劈开，两边分别作为一个普通的 UA 来工作。这没有什么奇怪的，在 SIP 世界中，所有 UA 都是平等的。具体到实物，则 M 和 W 就组成了实现软交换功能的交换机，它们对外说的语言是 SIP，而在内部，它们则使用自己家的语言沟通。bob 和 alice 就分别成了我们常见的软电话，或者硬件的 SIP 电话。


## SIP 注册

不像普通的固定电话网中，电话的地址都是固定的。因特网是开放的，alice 的 UA 可能在家也可能在学校，或者，在世界是任何角落，只要能上网，它就能与世界通信。为了让我们的 	FreeSWITCH 服务器能找到它，它必须向服务器进行注册。通常的注册流程是：


    Alice                          FreeSWITCH 
      |                                |
      |           REGISTER             |
      |------------------------------->|
      |   SIP/2.0 401 Unauthorized     |
	  |<-------------------------------|
	  |           REGISTER             |
	  |------------------------------->|
	  |   SIP/2.0 200 OK               |
	  |                                |
	

我们用真正的注册流程进行说明。下面的 SIP 消息是在真正的 FreeSWITCH 中 trace 出来的。其中 FreeSWITCH 服务器的 IP 地址是 192.168.4.4，使用默认的端口号 5060，在这里，我们使用的是 UDP 协议。 alice 使用的 UAC 是 Zoiper，端口号是 5090（在我写作时它与 FreeSWITCH 在同一台机器上，所以不能再使用端口 5060）。其中每个消息短横线之间的内容都是 FreeSWITCH 中输出的调试信息，不是 SIP 的一部分。

	------------------------------------------------------------------------
	recv 584 bytes from udp/[192.168.4.4]:5090 at 12:30:57.916812:
	------------------------------------------------------------------------
	REGISTER sip:192.168.4.4;transport=UDP SIP/2.0
	Via: SIP/2.0/UDP 192.168.4.4:5090;branch=z9hG4bK-d8754z-d9ed3bbae47e568b-1---d8754z-;rport
	Max-Forwards: 70
	Contact: <sip:alice@192.168.4.4:5090;rinstance=d42207a765c0626b;transport=UDP>
	To: <sip:alice@192.168.4.4;transport=UDP>
	From: <sip:alice@192.168.4.4;transport=UDP>;tag=9c709222
	Call-ID: NmFjNzA3MWY1MDI3NGViMjY1N2QwZDlmZWQ5ZGY2OGE.
	CSeq: 1 REGISTER
	Expires: 3600
	Allow: INVITE, ACK, CANCEL, BYE, NOTIFY, REFER, MESSAGE, OPTIONS, INFO, SUBSCRIBE
	User-Agent: Zoiper rev.5415
	Allow-Events: presence
	Content-Length: 0
                                 
recv 表明 FreeSWITCH 收到来自 alice 的消息。我们前面已经说进，SIP 是纯文本的协议，类似 HTTP，所以很容易阅读。

* 第一行的 REGISTER 表示是一条注册消息。
* Via 是 SIP 的消息路由，如果 SIP 经过好多代理服务器转发，则会有多条 Via 记录。
* Max-forwards 指出消息最多可以经过多少次转发，主要是为了防止产生死循环。
* Contact 是 alice 家的地址，本例中，FreeSWITCH 应该能在 192.168.4.4 这台机器上的 5090 端口找到她。
* To 和 From 先不管。
* Call-ID 是本次 SIP 会话（Session）的标志。
* CSeq 是一个序号，由于 UDP 是不可靠的协议，在不可靠的网络上可能丢包，所以有些包需要重发，该序号则可以防止重发引起的消息重复。
* Expires 是说明本次注册的有效期，单位是秒。在本例中，alice 应该在一小时内再次向 FreeSWITCH 注册，防止 FreeSWITCH 忘掉她。实际上，大部分 UA 的实现都会在几十秒内就重新发一次注册请求，这在 NAT 的网络中有助于保持连接。
* Allow 是说明 alice 的 UA 所能支持的功能，某些 UA 功能丰富，而某些 UA 仅有有限的功能。
* User-Agent 是 UA 的型号。
* Allow-Events 则是说明她允许哪些事件通知。
* Content-Length 是消息体（Body）的长度，在这里，只有消息头（Header），没有消息体，因此长度为 0 。
                    
.
	------------------------------------------------------------------------
	send 664 bytes to udp/[192.168.4.4]:5090 at 12:30:57.919364:
	------------------------------------------------------------------------
	SIP/2.0 401 Unauthorized
	Via: SIP/2.0/UDP 192.168.4.4:5090;branch=z9hG4bK-d8754z-d9ed3bbae47e568b-1---d8754z-;rport=5090
	From: <sip:alice@192.168.4.4;transport=UDP>;tag=9c709222
	To: <sip:alice@192.168.4.4;transport=UDP>;tag=QFXyg6gcByvUH
	Call-ID: NmFjNzA3MWY1MDI3NGViMjY1N2QwZDlmZWQ5ZGY2OGE.
	CSeq: 1 REGISTER
	User-Agent: FreeSWITCH-mod_sofia/1.0.trunk-16981M
	Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, UPDATE, INFO, REGISTER, REFER,
	 	NOTIFY, PUBLISH, SUBSCRIBE
	Supported: timer, precondition, path, replaces
	WWW-Authenticate: Digest realm="192.168.4.4",
	 	nonce="62fb812c-71d2-4a36-93d6-e0008e6a63ee", algorithm=MD5, qop="auth"
	Content-Length: 0

FreeSWITCH 需要验证 alice 的身分才允许她注册。在 SIP 中，没有发明新的认证方式，而是使用已有的 HTTP 摘要（Digest）方式来认证。401 消息表示未认证，它是 FreeSWITCH 对 alice 的响应。同时，它在本端生成一个认证摘要（WWW-Authenticate），一齐发送给 alice。

	------------------------------------------------------------------------
	recv 846 bytes from udp/[192.168.4.4]:5090 at 12:30:57.921011:
	------------------------------------------------------------------------
	REGISTER sip:192.168.4.4;transport=UDP SIP/2.0
	Via: SIP/2.0/UDP 192.168.4.4:5090;branch=z9hG4bK-d8754z-dae1693be9f8c10d-1---d8754z-;rport
	Max-Forwards: 70
	Contact: <sip:alice@192.168.4.4:5090;rinstance=d42207a765c0626b;transport=UDP>
	To: <sip:alice@192.168.4.4;transport=UDP>
	From: <sip:alice@192.168.4.4;transport=UDP>;tag=9c709222
	Call-ID: NmFjNzA3MWY1MDI3NGViMjY1N2QwZDlmZWQ5ZGY2OGE.
	CSeq: 2 REGISTER
	Expires: 3600
	Allow: INVITE, ACK, CANCEL, BYE, NOTIFY, REFER, MESSAGE, OPTIONS, INFO, SUBSCRIBE
	User-Agent: Zoiper rev.5415
	Authorization: Digest username="alice",realm="192.168.4.4",
		nonce="62fb812c-71d2-4a36-93d6-e0008e6a63ee",
		uri="sip:192.168.4.4;transport=UDP",response="32b5ddaea8647a3becd25cb84346b1c3",
		cnonce="b4c6ac7e57fc76b85df9440994e2ede8",nc=00000001,qop=auth,algorithm=MD5
	Allow-Events: presence
	Content-Length: 0

alice 收到带有摘要的 401 后，后新发起注册请求，这一次，加上了根据收到的摘要和它自己的密码生成的认证信息（Authorization）。并且，你可以看到，CSeq 序号变成了 2。

	------------------------------------------------------------------------
	send 665 bytes to udp/[192.168.4.4]:5090 at 12:30:57.936940:
	------------------------------------------------------------------------
	SIP/2.0 200 OK
	Via: SIP/2.0/UDP 192.168.4.4:5090;branch=z9hG4bK-d8754z-dae1693be9f8c10d-1---d8754z-;rport=5090
	From: <sip:alice@192.168.4.4;transport=UDP>;tag=9c709222
	To: <sip:alice@192.168.4.4;transport=UDP>;tag=rrpQj11F86jeD
	Call-ID: NmFjNzA3MWY1MDI3NGViMjY1N2QwZDlmZWQ5ZGY2OGE.
	CSeq: 2 REGISTER
	Contact: <sip:alice@192.168.4.4:5090;rinstance=d42207a765c0626b;transport=UDP>;expires=3600
	Date: Tue, 27 Apr 2010 12:30:57 GMT
	User-Agent: FreeSWITCH-mod_sofia/1.0.trunk-16981M
	Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, UPDATE, INFO, REGISTER, REFER,
	 	NOTIFY, PUBLISH, SUBSCRIBE
	Supported: timer, precondition, path, replaces
	Content-Length: 0

FreeSWITCH 收到带有认证的注册消息后，核实 alice 身份，认证通过，回应 200 OK。 如果失败，则回应 403 Forbidden 或其它失败消息，如下。

	------------------------------------------------------------------------
	send 542 bytes to udp/[192.168.4.4]:5090 at 13:22:49.195554:
	------------------------------------------------------------------------
	SIP/2.0 403 Forbidden
	Via: SIP/2.0/UDP 192.168.4.4:5090;branch=z9hG4bK-d8754z-d447f43b66912a1b-1---d8754z-;rport=5090
	From: <sip:alice@192.168.4.4;transport=UDP>;tag=c097e17f
	To: <sip:alice@192.168.4.4;transport=UDP>;tag=yeecX364pvryj
	Call-ID: ZjkxMGJmMjE4Y2ZiNjU5MzM5NDZkMTE5NzMzMzM0Mjc.
	CSeq: 2 REGISTER
	User-Agent: FreeSWITCH-mod_sofia/1.0.trunk-16981M
	Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, UPDATE, INFO, REGISTER, REFER,
	 	NOTIFY, PUBLISH, SUBSCRIBE
	Supported: timer, precondition, path, replaces
	Content-Length: 0           
	
你可以看到，alice 的密码是不会直接在 SIP 中传送的，因而一定程序上保证了安全（当然还是会有中间人，重放之类的攻击，我们留到后面讨论）。

## SIP 呼叫流程

### UA 间直接呼叫

上面我们说过，SIP 的 UA 是平等的，如果一方知道另一方的地址，就可以通信。我们先来做一个实验。在笔者的机器上，我启动了两个软电话（UA）， 一个是 bob 的 X-Lite（左），另一个是 alice 是 Zoiper。它们的 IP 地址都是 192.168.4.4，而端口号分别是 26000 和 5090，当 bob 呼叫 alice 时，它只需直接呼叫 alice 的  SIP 地址：sip:alice@192.168.4.4:5090。如图，alice 的电话正在振铃：

<img src="http://commondatastorage.googleapis.com/freeswitch.org.cn/images/4-4.png"/>  

详细的呼叫流程图为：

	bob               alice
	|                     |
	|    INVITE           |
	|-------------------->|
	|    100 Trying       |
	|<--------------------|
	|    180 Ringing      |
	|<--------------------|
	|    200 OK           |
	|<--------------------|
	|    ACK              |
	|-------------------->|
	|                     |
	|<---RTP------------->|
	|<---RTP------------->|
	|<---RTP------------->|
	|    ...              |
	|                     |
	|    BYE              |
	|<--------------------|
	|    200 OK           |
	|-------------------->|
	|                     |

首先 bob 向 alice 发送 INVITE 请求建立 SIP 连接，alice 的 UA 回 100 Trying 说我收到你的请求了，先等会，接着 alice 的电话开始振铃，并给对回消息 180 Ringing 说我这边已经振铃了，alice 一会就过来接电话，bob 的 UA 收到该消息后可以播放回铃音。接着 alice 接了电话，她发送 200 OK 消息给 bob，该消息是对 INVITE 消息的最终响应，而先前的 100 和 180 消息都是临时状态，只是表明呼叫进展的情况。 bob 收到 200 后向 alice 回 ACK 证实消息。 INVITE - 200 - ACK 完成三次握手，它们合在一起称作一个对话（Dialogue）。这时候 bob 已经在跟 alice 能通话了，他们通话的内容（语音数据）是在SIP之外的 RTP 包中传递的，我们后面再详细讨论。

最后，alice 挂断电话，向 bob 送 BYE 消息，bob 收到 BYE 后回送 200 OK，通话完毕。其中 BYE 和 200 OK 也是一个对话，而上面的所有消息，称作一个会话（Session）。

反过来也一样，alice 可以直接呼叫 bob 的地址： sip:bob@192.168.4.4:26000。

上面描述了一个最简单的 SIP 呼叫流程。实际上，SIP 还有其它一些消息，它们大致可分为请求和响应两类。请求由 UAC 发出，到达 UAS 后， UAS 回送响应消息。某些响应消息需要证实（ACK），以完成三次握手。其中请求消息包括 INVITE、ACK、OPTIOS、BYE、CANCEL、REGISTER 以及一些扩展 re-INVITE、PRACK、SUBSCRIBE、NOTIFY、UPDATE、MESSAGE、REFER等。而响应消息则都包含一个状态码。跟 HTTP 响应类似，状态码有三位数字组成。其中，1xx 组的响应为临时状态，表明呼叫进展的情况；2xx 表明请求已成功处理；3xx 表明 SIP 请求需要转向到另一个 UAS 处理；4xx 表明请求失败，这种失败一般是由客户端或网络引起的，如密码错误等；5xx 为服务器内部错误；6xx 为更严重的错误。  
                  
### 通过 B2BUA 呼叫

在真实世界中，bob 和 alice 肯定要经常改变位置，那么它们的 SIP 地址也会相应改变，并且，如果他们之中有一个或两个处于 NAT 的网络中时，直接通信就更困难了。所以，他们通常会借助于一个服务器来相互通信。通过注册到服务器上，他们都可以获得一个服务器上的 SIP 地址。注册服务器的地址一般是不变的，因此他们的 SIP 地址就不会发生变化，因而，他们总是能够进行通信。

我们让他们两个都注册到 FreeSWITCH 上。上面已经说过，FreeSWITCH 监听的端口是 SIP 默认的端口 5060。bob 和 alice 注册后，他们分别获得了一个服务器的地址（SIP URI）：sip:bob@192.168.4.4 和 sip:alice@192.168.4.4（默认的端口号 5060 可以省略）。
      
下面是 bob 呼叫 alice 的流程。需要指出，如果 bob 只是发起呼叫而不接收呼叫，他并不需要向 FreeSWITCH 注册（有些软交换服务器需要先注册才能发起呼叫，但 SIP 是不强制这么做的）。                                                                    

	------------------------------------------------------------------------
	recv 1118 bytes from udp/[192.168.4.4]:26000 at 13:31:39.938891:
	------------------------------------------------------------------------
	INVITE sip:alice@192.168.4.4 SIP/2.0
	Via: SIP/2.0/UDP 192.168.4.4:26000;branch=z9hG4bK-d8754z-56adad736231f024-1---d8754z-;rport
	Max-Forwards: 70
	Contact: <sip:bob@192.168.4.4:26000>
	To: "alice"<sip:alice@192.168.4.4>
	From: "Bob"<sip:bob@192.168.4.4>;tag=15c8325a
	Call-ID: YWEwYjNlZTZjOWZjNDg3ZjU3MjQ3MTA1ZmQ1MDM5YmQ.
	CSeq: 1 INVITE
	Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, NOTIFY, MESSAGE, SUBSCRIBE, INFO
	Content-Type: application/sdp
	User-Agent: X-Lite release 1014k stamp 47051
	Content-Length: 594

上面的消息中省略了 SDP 的内容，我们将留到以后再探讨。bob 的 UAC 通过 INVITE 消息向 FreeSWITCH 发起请求。bob 的 UAC 用的是 X-Lite（User-Agent），它运行在端口 26000 上（实际上，它默认在端口也是 5060，但由于在我的实验环境下它也是跟 FreeSWITCH 运行在一台机器上，已被占用，因此它需要选择另一个端口）。其中，From 为主叫用户的地址，To 为被叫用户的地址。此时 FreeSWITCH 作为一个 UAS 接受请求并进行响应。它得知 bob 要呼叫 alice，需要在自己的数据库中查找 alice 是否已在服务器上注册，好知道应该怎么找到 alice。但在此之前，它先通知 bob 它已经收到了他的请求。

	------------------------------------------------------------------------
	send 345 bytes to udp/[192.168.4.4]:26000 at 13:31:39.940278:
	------------------------------------------------------------------------
	SIP/2.0 100 Trying
	Via: SIP/2.0/UDP 192.168.4.4:26000;branch=z9hG4bK-d8754z-56adad736231f024-1---d8754z-;rport=26000
	From: "Bob"<sip:bob@192.168.4.4>;tag=15c8325a
	To: "alice"<sip:alice@192.168.4.4>
	Call-ID: YWEwYjNlZTZjOWZjNDg3ZjU3MjQ3MTA1ZmQ1MDM5YmQ.
	CSeq: 1 INVITE
	User-Agent: FreeSWITCH-mod_sofia/1.0.trunk-16981M
	Content-Length: 0        
	
FreeSWITCH 通过 100 Trying 消息告诉 bob “我已经收到你的消息了，别着急，我正在联系 alice 呢...” 该消息称为呼叫进展消息。

	------------------------------------------------------------------------
	send 826 bytes to udp/[192.168.4.4]:26000 at 13:31:39.943392:
	------------------------------------------------------------------------
	SIP/2.0 407 Proxy Authentication Required
	Via: SIP/2.0/UDP 192.168.4.4:26000;branch=z9hG4bK-d8754z-56adad736231f024-1---d8754z-;rport=26000
	From: "Bob"<sip:bob@192.168.4.4>;tag=15c8325a
	To: "alice" <sip:alice@192.168.4.4>;tag=B4pem31jHgtHS
	Call-ID: YWEwYjNlZTZjOWZjNDg3ZjU3MjQ3MTA1ZmQ1MDM5YmQ.
	CSeq: 1 INVITE
	User-Agent: FreeSWITCH-mod_sofia/1.0.trunk-16981M
	Accept: application/sdp
	Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, UPDATE, INFO, REGISTER, REFER,
	 	NOTIFY, PUBLISH, SUBSCRIBE
	Supported: timer, precondition, path, replaces
	Allow-Events: talk, presence, dialog, line-seize, call-info, sla,
	 	include-session-description, presence.winfo, message-summary, refer
	Proxy-Authenticate: Digest realm="192.168.4.4",
	 	nonce="31c5c3e0-cc6e-46c8-a661-599b0c7f87d8", algorithm=MD5, qop="auth"
	Content-Length: 0

但就在此时，FreeSWITCH 发现 bob 并不是授权用户，因而它需要确认 bob 的身份。它通过发送带有 Digest 验证信息的 407 消息来通知 bob（注意，这里与注册流程中的 401 不同）。

	------------------------------------------------------------------------
	recv 319 bytes from udp/[192.168.4.4]:26000 at 13:31:39.945314:
	------------------------------------------------------------------------
	ACK sip:alice@192.168.4.4 SIP/2.0
	Via: SIP/2.0/UDP 192.168.4.4:26000;branch=z9hG4bK-d8754z-56adad736231f024-1---d8754z-;rport
	To: "alice" <sip:alice@192.168.4.4>;tag=B4pem31jHgtHS
	From: "Bob"<sip:bob@192.168.4.4>;tag=15c8325a
	Call-ID: YWEwYjNlZTZjOWZjNDg3ZjU3MjQ3MTA1ZmQ1MDM5YmQ.
	CSeq: 1 ACK
	Content-Length: 0
                                                     
bob 回送 ACK 证实消息向 FreeSWITCH 证实已收到认证要求。并重新发送 INVITE，这次，附带了验证信息。

	------------------------------------------------------------------------
	recv 1376 bytes from udp/[192.168.4.4]:26000 at 13:31:39.945526:
	------------------------------------------------------------------------
	INVITE sip:alice@192.168.4.4 SIP/2.0
	Via: SIP/2.0/UDP 192.168.4.4:26000;branch=z9hG4bK-d8754z-87d60b47b6627c3a-1---d8754z-;rport
	Max-Forwards: 70
	Contact: <sip:bob@192.168.4.4:26000>
	To: "alice"<sip:alice@192.168.4.4>
	From: "Bob"<sip:bob@192.168.4.4>;tag=15c8325a
	Call-ID: YWEwYjNlZTZjOWZjNDg3ZjU3MjQ3MTA1ZmQ1MDM5YmQ.
	CSeq: 2 INVITE
	Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, REFER, NOTIFY, MESSAGE, SUBSCRIBE, INFO
	Content-Type: application/sdp
	Proxy-Authorization: Digest username="bob",realm="192.168.4.4",
		nonce="31c5c3e0-cc6e-46c8-a661-599b0c7f87d8",
		uri="sip:alice@192.168.4.4",response="327887635344405bcd545da06763c466",
		cnonce="c164b74f625ff2161bd8d47dba3a0ee2",nc=00000001,qop=auth,
		algorithm=MD5
	User-Agent: X-Lite release 1014k stamp 47051
	Content-Length: 594

这里也省略了 SDP 消息体。

	------------------------------------------------------------------------
	send 345 bytes to udp/[192.168.4.4]:26000 at 13:31:39.946349:
	------------------------------------------------------------------------
	SIP/2.0 100 Trying
	Via: SIP/2.0/UDP 192.168.4.4:26000;branch=z9hG4bK-d8754z-87d60b47b6627c3a-1---d8754z-;rport=26000
	From: "Bob"<sip:bob@192.168.4.4>;tag=15c8325a
	To: "alice"<sip:alice@192.168.4.4>
	Call-ID: YWEwYjNlZTZjOWZjNDg3ZjU3MjQ3MTA1ZmQ1MDM5YmQ.
	CSeq: 2 INVITE
	User-Agent: FreeSWITCH-mod_sofia/1.0.trunk-16981M
	Content-Length: 0
	
FreeSWITCH 重新回 100 Trying，告诉 bob 呼叫进展情况。

至此，bob 与 FreeSWITCH 之间的通信已经初步建立，这种通信的通道称作一个信道（channel）。该信道是由 bob 的 UA 和 FreeSWITCH 的一个 UA 构成的，我们称它为 FreeSWITCH 的一条腿，叫做 a-leg。

接下来 FreeSWITCH 要建立另一条腿，称为 b-leg。它通过查打本地数据库，得到了 alice 的位置，接着启动一个 UA（用作 UAC），向 alice 发送 INVITE 消息。如下：

	------------------------------------------------------------------------
	send 1340 bytes to udp/[192.168.4.4]:5090 at 13:31:40.028988:
	------------------------------------------------------------------------
	INVITE sip:alice@192.168.4.4:5090;rinstance=e7d5364c81f2b879;transport=UDP SIP/2.0
	Via: SIP/2.0/UDP 192.168.4.4;rport;branch=z9hG4bKey90QUyHZQXNN
	Route: <sip:alice@192.168.4.4:5090>;rinstance=e7d5364c81f2b879;transport=UDP
	Max-Forwards: 69
	From: "Bob" <sip:bob@192.168.4.4>;tag=Dp9ZQS3SB26pg
	To: <sip:alice@192.168.4.4:5090;rinstance=e7d5364c81f2b879;transport=UDP>
	Call-ID: 0d74ac35-cca4-122d-81a2-2990e5b2bd3e
	CSeq: 130069214 INVITE
	Contact: <sip:mod_sofia@192.168.4.4:5060>
	User-Agent: FreeSWITCH-mod_sofia/1.0.trunk-16981M
	Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, UPDATE, INFO, REGISTER, REFER,
	 	NOTIFY, PUBLISH, SUBSCRIBE
	Supported: timer, precondition, path, replaces
	Allow-Events: talk, presence, dialog, line-seize, call-info, sla,
	 	include-session-description, presence.winfo, message-summary, refer
	Content-Type: application/sdp
	Content-Disposition: session
	Content-Length: 313
	X-FS-Support: update_display
	Remote-Party-ID: "Bob" <sip:bob@192.168.4.4>;party=calling;screen=yes;privacy=off

你可以看到，该INVITE 的 Call-ID 与前面的不同，说明这是另一个 SIP 会话（Session）。另外，它还多了一个 Remote-Party-ID，它主要是用来支持来电显示。因为，在 alice 的话机上，希望显示 bob 的号码，显示呼叫它的那个 UA（负责 b-leg的那个 UA）没什么意义。与普通的 POTS 电话不同，在 SIP 电话中，不仅能显示电话号码（这里是 bob），还能显示一个可选的名字（“Bob”）。这也说明了 FreeSWITCH 这个 B2BUA 本身是一个整体，它虽然是以一个单独的 UA 呼叫 alice，但还是跟负责 bob 的那个 UA 有联系--就是这种背靠背的串联。
	
	------------------------------------------------------------------------
	recv 309 bytes from udp/[192.168.4.4]:5090 at 13:31:40.193634:
	------------------------------------------------------------------------
	SIP/2.0 100 Trying
	Via: SIP/2.0/UDP 192.168.4.4;rport=5060;branch=z9hG4bKey90QUyHZQXNN
	To: <sip:alice@192.168.4.4:5090;rinstance=e7d5364c81f2b879;transport=UDP>
	From: "Bob" <sip:bob@192.168.4.4>;tag=Dp9ZQS3SB26pg
	Call-ID: 0d74ac35-cca4-122d-81a2-2990e5b2bd3e
	CSeq: 130069214 INVITE
	Content-Length: 0

跟上面的流程差不多，alice回的呼叫进展。此时，alice 的 UA 开始振铃。

	------------------------------------------------------------------------
	recv 431 bytes from udp/[192.168.4.4]:5090 at 13:31:40.193816:
	------------------------------------------------------------------------
	SIP/2.0 180 Ringing
	Via: SIP/2.0/UDP 192.168.4.4;rport=5060;branch=z9hG4bKey90QUyHZQXNN
	Contact: <sip:alice@192.168.4.4:5090;rinstance=e7d5364c81f2b879;transport=UDP>
	To: <sip:alice@192.168.4.4:5090;rinstance=e7d5364c81f2b879;transport=UDP>;tag=3813e926
	From: "Bob"<sip:bob@192.168.4.4>;tag=Dp9ZQS3SB26pg
	Call-ID: 0d74ac35-cca4-122d-81a2-2990e5b2bd3e
	CSeq: 130069214 INVITE
	User-Agent: Zoiper rev.5415
	Content-Length: 0

180也是呼叫进展消息，它说明，我这边已经准备好了，alice 的电话已经响了，她听到了一会就会接听。

	send 1125 bytes to udp/[192.168.4.4]:26000 at 13:31:40.270533:
	------------------------------------------------------------------------
	SIP/2.0 183 Session Progress
	Via: SIP/2.0/UDP 192.168.4.4:26000;branch=z9hG4bK-d8754z-87d60b47b6627c3a-1---d8754z-;rport=26000
	From: "Bob"<sip:bob@192.168.4.4>;tag=15c8325a
	To: "alice" <sip:alice@192.168.4.4>;tag=cDg7NyjpeSg4m
	Call-ID: YWEwYjNlZTZjOWZjNDg3ZjU3MjQ3MTA1ZmQ1MDM5YmQ.
	CSeq: 2 INVITE
	Contact: <sip:alice@192.168.4.4:5060;transport=udp>
	User-Agent: FreeSWITCH-mod_sofia/1.0.trunk-16981M
	Accept: application/sdp
	Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, UPDATE, INFO, REGISTER, REFER,
	 	NOTIFY, PUBLISH, SUBSCRIBE
	Supported: timer, precondition, path, replaces
	Allow-Events: talk, presence, dialog, line-seize, call-info, sla,
	 	include-session-description, presence.winfo, message-summary, refer
	Content-Type: application/sdp
	Content-Disposition: session
	Content-Length: 267
	Remote-Party-ID: "alice" <sip:alice@192.168.4.4>

FreeSWITCH 在收到 alice 的 180 Ringing 消息后，便告诉 bob 呼叫进展情况，183 与 180 不同的是，它包含 SDP，即接下来它会向 bob 发送 RTP 的媒体流，就是回铃音。

	------------------------------------------------------------------------
	recv 768 bytes from udp/[192.168.4.4]:5090 at 13:31:43.251980:
	------------------------------------------------------------------------
	SIP/2.0 200 OK
	Via: SIP/2.0/UDP 192.168.4.4;rport=5060;branch=z9hG4bKey90QUyHZQXNN
	Contact: <sip:alice@192.168.4.4:5090;rinstance=e7d5364c81f2b879;transport=UDP>
	To: <sip:alice@192.168.4.4:5090;rinstance=e7d5364c81f2b879;transport=UDP>;tag=3813e926
	From: "Bob"<sip:bob@192.168.4.4>;tag=Dp9ZQS3SB26pg
	Call-ID: 0d74ac35-cca4-122d-81a2-2990e5b2bd3e
	CSeq: 130069214 INVITE
	Allow: INVITE, ACK, CANCEL, BYE, NOTIFY, REFER, MESSAGE, OPTIONS, INFO, SUBSCRIBE
	Content-Type: application/sdp
	User-Agent: Zoiper rev.5415
	Content-Length: 226

alice 接听电话以后，其 UA 向 FreeSWITCH 送 200 OK，即应答消息。

	------------------------------------------------------------------------
	send 436 bytes to udp/[192.168.4.4]:5090 at 13:31:43.256692:
	------------------------------------------------------------------------
	ACK sip:alice@192.168.4.4:5090;rinstance=e7d5364c81f2b879;transport=UDP SIP/2.0
	Via: SIP/2.0/UDP 192.168.4.4;rport;branch=z9hG4bKF72SSpFNv0K8g
	Max-Forwards: 70
	From: "Bob" <sip:bob@192.168.4.4>;tag=Dp9ZQS3SB26pg
	To: <sip:alice@192.168.4.4:5090;rinstance=e7d5364c81f2b879;transport=UDP>;tag=3813e926
	Call-ID: 0d74ac35-cca4-122d-81a2-2990e5b2bd3e
	CSeq: 130069214 ACK
	Contact: <sip:mod_sofia@192.168.4.4:5060>
	Content-Length: 0

FreeSWITCH 向 alice 回送证实消息，证实已经知道了。至此，b-leg已经完全建立完毕，多半这时 alice 已经开始说话了：“Hi, bob，你好……”

	------------------------------------------------------------------------
	send 1135 bytes to udp/[192.168.4.4]:26000 at 13:31:43.293311:
	------------------------------------------------------------------------
	SIP/2.0 200 OK
	Via: SIP/2.0/UDP 192.168.4.4:26000;branch=z9hG4bK-d8754z-87d60b47b6627c3a-1---d8754z-;rport=26000
	From: "Bob"<sip:bob@192.168.4.4>;tag=15c8325a
	To: "alice" <sip:alice@192.168.4.4>;tag=cDg7NyjpeSg4m
	Call-ID: YWEwYjNlZTZjOWZjNDg3ZjU3MjQ3MTA1ZmQ1MDM5YmQ.
	CSeq: 2 INVITE
	Contact: <sip:alice@192.168.4.4:5060;transport=udp>
	User-Agent: FreeSWITCH-mod_sofia/1.0.trunk-16981M
	Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, UPDATE, INFO, REGISTER, REFER,
	 	NOTIFY, PUBLISH, SUBSCRIBE
	Supported: timer, precondition, path, replaces
	Allow-Events: talk, presence, dialog, line-seize, call-info, sla,
	 	include-session-description, presence.winfo, message-summary, refer
	Session-Expires: 120;refresher=uas
	Min-SE: 120
	Content-Type: application/sdp
	Content-Disposition: session
	Content-Length: 267
	Remote-Party-ID: "alice" <sip:alice@192.168.4.4>


与此同时，它也给 bob 送应答消息，告诉他电话已经接通了，可以跟 alice 说话了。在需要计费的情况下，应该从此时开始对 bob 的电话计费。bob 的 UA 收到该消息后启动麦克风让 bob 讲话。

	------------------------------------------------------------------------
	recv 697 bytes from udp/[192.168.4.4]:26000 at 13:31:43.413025:
	------------------------------------------------------------------------
	ACK sip:alice@192.168.4.4:5060;transport=udp SIP/2.0
	Via: SIP/2.0/UDP 192.168.4.4:26000;branch=z9hG4bK-d8754z-ef53864320037c04-1---d8754z-;rport
	Max-Forwards: 70
	Contact: <sip:bob@192.168.4.4:26000>
	To: "alice"<sip:alice@192.168.4.4>;tag=cDg7NyjpeSg4m
	From: "Bob"<sip:bob@192.168.4.4>;tag=15c8325a
	Call-ID: YWEwYjNlZTZjOWZjNDg3ZjU3MjQ3MTA1ZmQ1MDM5YmQ.
	CSeq: 2 ACK
	Proxy-Authorization: Digest username="bob",realm="192.168.4.4",
		nonce="31c5c3e0-cc6e-46c8-a661-599b0c7f87d8",
		uri="sip:alice@192.168.4.4",response="327887635344405bcd545da06763c466",
		cnonce="c164b74f625ff2161bd8d47dba3a0ee2",nc=00000001,qop=auth,
		algorithm=MD5
	User-Agent: X-Lite release 1014k stamp 47051
	Content-Length: 0
	
bob 在收到应答消息后也需要回送证实消息。至此 a-leg 也建立完毕。双方正常通话。

[][][][][][] **此处省略 5000 字** [][][][][]

	------------------------------------------------------------------------
	recv 484 bytes from udp/[192.168.4.4]:5090 at 13:31:49.949240:
	------------------------------------------------------------------------
	BYE sip:mod_sofia@192.168.4.4:5060 SIP/2.0
	Via: SIP/2.0/UDP 192.168.4.4:5090;branch=z9hG4bK-d8754z-2146ae0ddd113efe-1---d8754z-;rport
	Max-Forwards: 70
	Contact: <sip:alice@192.168.4.4:5090;rinstance=e7d5364c81f2b879;transport=UDP>
	To: "Bob"<sip:bob@192.168.4.4>;tag=Dp9ZQS3SB26pg
	From: <sip:alice@192.168.4.4:5090;rinstance=e7d5364c81f2b879;transport=UDP>;tag=3813e926
	Call-ID: 0d74ac35-cca4-122d-81a2-2990e5b2bd3e
	CSeq: 2 BYE
	User-Agent: Zoiper rev.5415
	Content-Length: 0

终于聊完了，alice 挂断电话，发送 BYE 消息。

	------------------------------------------------------------------------
	send 543 bytes to udp/[192.168.4.4]:5090 at 13:31:49.950425:
	------------------------------------------------------------------------
	SIP/2.0 200 OK
	Via: SIP/2.0/UDP 192.168.4.4:5090;branch=z9hG4bK-d8754z-2146ae0ddd113efe-1---d8754z-;rport=5090
	From: <sip:alice@192.168.4.4:5090;rinstance=e7d5364c81f2b879;transport=UDP>;tag=3813e926
	To: "Bob"<sip:bob@192.168.4.4>;tag=Dp9ZQS3SB26pg
	Call-ID: 0d74ac35-cca4-122d-81a2-2990e5b2bd3e
	CSeq: 2 BYE
	User-Agent: FreeSWITCH-mod_sofia/1.0.trunk-16981M
	Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, UPDATE, INFO, REGISTER, REFER,
	 	NOTIFY, PUBLISH, SUBSCRIBE
	Supported: timer, precondition, path, replaces
	Content-Length: 0

FreeSWITCH 返回 OK，b-leg 释放完毕。

	------------------------------------------------------------------------
	send 630 bytes to udp/[192.168.4.4]:26000 at 13:31:50.003165:
	------------------------------------------------------------------------
	BYE sip:bob@192.168.4.4:26000 SIP/2.0
	Via: SIP/2.0/UDP 192.168.4.4;rport;branch=z9hG4bKggvjUH0rS99tc
	Max-Forwards: 70
	From: "alice" <sip:alice@192.168.4.4>;tag=cDg7NyjpeSg4m
	To: "Bob" <sip:bob@192.168.4.4>;tag=15c8325a
	Call-ID: YWEwYjNlZTZjOWZjNDg3ZjU3MjQ3MTA1ZmQ1MDM5YmQ.
	CSeq: 130069219 BYE
	Contact: <sip:alice@192.168.4.4:5060;transport=udp>
	User-Agent: FreeSWITCH-mod_sofia/1.0.trunk-16981M
	Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, UPDATE, INFO, REGISTER, REFER,
	 	NOTIFY, PUBLISH, SUBSCRIBE
	Supported: timer, precondition, path, replaces
	Reason: Q.850;cause=16;text="NORMAL_CLEARING"
	Content-Length: 0

接下来 FreeSWITCH 给 bob 发送 BYE，通知要拆线了。出于对 bob 负责，它包含了挂机原因（Hangup Cause），此处 NOMAL\_CLEARING 表示正常释放。

	------------------------------------------------------------------------
	recv 367 bytes from udp/[192.168.4.4]:26000 at 13:31:50.111765:
	------------------------------------------------------------------------
	SIP/2.0 200 OK
	Via: SIP/2.0/UDP 192.168.4.4;rport=5060;branch=z9hG4bKggvjUH0rS99tc
	Contact: <sip:bob@192.168.4.4:26000>
	To: "Bob"<sip:bob@192.168.4.4>;tag=15c8325a
	From: "alice"<sip:alice@192.168.4.4>;tag=cDg7NyjpeSg4m
	Call-ID: YWEwYjNlZTZjOWZjNDg3ZjU3MjQ3MTA1ZmQ1MDM5YmQ.
	CSeq: 130069219 BYE
	User-Agent: X-Lite release 1014k stamp 47051
	Content-Length: 0

bob 回送 OK，a-leg 释放完毕，通话结束。从下图可以很形象地看出 FreeSWITCH 的两条“腿”-- a-leg 和 b-leg。 

<img src="http://commondatastorage.googleapis.com/freeswitch.org.cn/images/4-3.png"/>


整个呼叫流程图示如下：

	bob (UAC)           [ UAS-UAC ]          (UAS) alice
	 |                     |   |                     |
     |   INVITE            |   |                     |
     |-------------------->|   |                     |
     |   100 Trying        |   |                     |
     |<--------------------|   |                     |
     |   407 Authentication Required                 |
     |<--------------------|   |                     |
     |   ACK               |   |                     |
     |-------------------->|   |                     |
     |   INVITE            |   |                     |
     |-------------------->|   |                     |
     |   100 Trying        |   |    INVITE           |
     |<--------------------<   >-------------------->|
     |                     |   |    100 Trying       |
     |                     |   |<--------------------|
     |   183 Progress      |   |    180 Ringing      |
     |<--------------------<   |<--------------------|
     |                     |   |    200 OK           |
     |                     |   |<--------------------|
     |   200 OK            |   |    ACK              |
     |<--------------------<   >-------------------->|
     |   ACK               |   |                     |
     |-------------------->|   |                     |
     |                                               |
     |                Call Connected                 |
     |                                               |
     |                     |   |     BYE             |
     |                     |   |<--------------------|
     |   BYE               |   |    200 OK           |
     |<--------------------<   >-------------------->|
     |   200 OK            |   |                     |
     |-------------------->|   |                     |
     |                     |   |                     |

从流程图可以看出，右半部分跟上一节“UA间直接呼叫”一样，而左半部分也类似。这就更好的说明了实际上有 4 个 UA （两对）参与到了通信中，并且，有两个 Session。 	              
	
## 再论 SIP URI

上面我们介绍了一些 FreeSWITCH 的基本概念，并通过一个真正的呼叫流程讲解了一下 SIP。由于实验中所有 UA 都 运行在一台机器上，这可能会引起迷惑，如果我们有三台服务器，那么情况可能是：

                        /---------------\
                        |  FreeSWITCH   |
                        |  192.168.0.1  |
                        \ --------------/
    sip:bob@192.168.0.1    /          \     sip:alice@192.168.0.1
                          /            \
                         /              \
      /-----------------\               /-----------------\
      |  bob            |               |  alice          |
      |  192.168.0.100  |               |  192.168.0.200  |
      \-----------------/               \-----------------/

      sip:bob@192.168.0.100                sip:alice@192.168.0.200

alice 注册到 FreeSWITCH，bob呼叫她时，使用她的服务器地址，即 sip:alice@192.168.0.1，FreeSWITCH 接到请求后，查找本地数据库，发现 alice 的实际地址是 sip:alice@192.168.0.200，便可以建立呼叫。

SIP URI 除使用 IP 地址外，也可以使用域名，如 sip:alice@freeswitch.org.cn。更高级也更复杂的配置则需要 DNS 的 SRV 记录，在此就不做讨论了。
