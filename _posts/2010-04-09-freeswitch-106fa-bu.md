---
layout: post
title: "FreeSWITCH 1.0.6发布"
tags:
  - "news"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


在继FreeSWITCH 1.0.4发布8个月后，FreeSWITCH团队宣布了1.0.6版。该版本增加了许多新特性，并在语音编码，SIP处理、CPU占用率，TDM硬件支持等方面有显著提高。

新的语音编码
------

FreeSWITCH刚刚加入了SILK和BroadVoice语音编码的支持，这两种编码刚刚以开源软件发布。Broadcom公司支持的(纳斯达克BRCM)BroadVoice系列编码最近以GNU LGPL许可证发布，免版税。Skype公司发明的SILK编码也允许开发者用于非商业性的应用中，如系统对接测试等。FreeSWITCH本来就支持相当丰富的免费语音编码，这两种编码的加入则使FreeSWITCH的编码支持更上一层楼。FreeSWITCH提供VoIP领域真正的“免费”通话。

从另一方面讲，这些语音编码的加入也非常容易，这得益于FreeSWITCH的模块化结构。“在FreeSWITCH中加入SILK编码支持仅需要90分钟”，一位FreeSWITCH语音编码的核心开发者Brian K. West如是说。“在Skype发布SILK源代码的同一天就能在FreeSWITCH中使用SILK是相当令人感到愉快的”。另外，很容易地加入新编码对测试也非常有用。FreeSWITCH开发者曾发现BroadVoice编码的一个问题并立即汇报给了Broadcom的工程师，然后他们很快便解决了。

另一个重要的编码是G.729。虽然G.729不像其它编码一样是“免费”的，但它已被广泛使用，并且费用也是很合理的。在此之前，FreeSWITCH仅支持 passthrough（即不进行解码） 模式，现在，用户可以通过购买商业的许可证对G.729进行解码了。

新特性
------
FreeSWITCH 1.0.6的一个主要的新特征是在VoIP环境中支持Broadsoft的SCA（Shared Call Apperance）。该特性已知可以在polycom, Snome Cisco SPA(Small Business Pro 500系列)以及Astra及其它电话上工作。FreeSWITCH团队在很多不同的话机上花了大量时间用不同的呼叫流程测试该特性。任何做过SCA的人都知道即使使用同一厂商的话机，搞定该功能也是很难的，何况FreeSWITCH支持不同厂商的话机。使用该特性，你可以做一个共享线路同时显示在Polycom, Cisco, Aastra, 以及 Snom 电话上。通过在SIP配置文件中设置 manage-shared-appearance 参数以及在电话上开启SCA功能便可以使用该功能。

最新版本的FreeSWITCH还包括很多新特性以支持高级通话处理。新的valet\_park应用允许对通话进行灵活地挂起和解挂。“电话停靠站”允许操作员指定电话停放的位置，然后该电话可以从任何话机上“取出”。新的valet\_park支持手工和自动指定停靠位置。另一个特性是campon。该特性类似于呼叫等待--当被叫忙时，可以接听另一个电话。如果被叫不应该第二个来电，则来电可以转到语音留言或其它分机。另外还有一个新的fifo\_position信道变量允许管理员查看电话队列。playback应用也增强了，它可以通过在声音文件尾加上"@@抽样数量"以从任意的位置拨放声音文件。

FreeSWITCH开发者也为VoIP系统管理员加入了很多新的系统诊断命令。"uuid\_audio"允许对通话进行单向或双向的放大或静音。终端间的话音问题可以通话"uuid\_debug\_audio"来检测。另一个很有用的命令是"uuid\_simplify"，它允许FreeSWITCH自己从某些通话路径中移出。如某些呼叫转移的，音频流从本地VoIP服务器转移到一个远端服务器又被转回来的情况，该命令通过去掉到远端服务器的不必要的路由对音频路径简单化，进而增加语音质量和减少网络占用。

其它的增加包括增加了ESL（Event Socket Library）的TCL语言支持以及FreeSWITCH客户端fs\_cli的tab补全。在Linux/Unix系统中，支持fail2ban应用来防止某些攻击，如brute-force SIP注册等。

新模块
------

FreeSWITCH加入了好多新模块，并扩展了功能。mod\_say模拟增加了处理性别的信息，并加入了法语、意大利语、匈牙利语及泰语的支持。法语、德语及西班牙语中也增加了一些声音文件。

另外一些新模拟包括：
 
mod\_skinny: 一个处理思科SCCP(skinny)信令的模块。还不大成熟。

mod\_directory: 一个新的以姓名呼叫的目录模块，增强了自动话务员处理。

mod\_tts\_commandline: 与文本语音转换引擎的命令行接口。通过它你可以使用pico2wave, pico2wav是Andriod项目中一个很好并且免费的TTS引擎。

mod\_shell\_stream: 该模块允许你从一个shell命令中获取语音流，你可以从声卡、数据库，或其它音频源中获取数据。

mod\_h323: 一个支持H.323信令的模块，不太成熟。
 
项目进展
------

FreeSWITCH 项目有了很多重要的改变。最近，Sangoma 公司宣布他们扩大了对FreeSWITCH项目的支持，并把OpenZAP迁移到FreeTDM。 FreeTDM是在FreeSWITCH中进行TDM呼叫的一个信令和硬件抽象层。通过它，Sangoma Boost PRI接口可用于FreeSWITCH.

另一个重要的变化是开发者使用的版本控制系统。FreeSWITCH所用的版本控制系统已从SVN迁移到Git（另有一个只许的SVN镜像还在维护着）。迁移到Git将有助于加快发行周期，并简化分支管理。

一个光明的未来
------

FreeSWITCH项目自2008年5月发行1.0.0以来，有了超过10000次的源代码提交；自1.0.4以来有超过700个changelog。FreeSWITCH在以后继续有所发展，它的稳定性和性能也会有所增强。请别忘了参加今年8月份的ClueCon开源电话系统开发者会议，FreeSWITCH开发团队有重要的事情会对FreeSWITCH社区宣布！

<http://www.freeswitch.org/node/250>
