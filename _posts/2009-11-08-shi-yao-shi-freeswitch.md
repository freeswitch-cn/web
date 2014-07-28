---
layout: post
title: "什么是 FreeSWITCH ?"
tags:
  - "freeswitch"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


FreeSWITCH是一个开源的电话软交换平台，主要开发语言是C，以[MPL1.1](http://www.opensource.org/licenses/mozilla1.1.php)发布。


它有很强的可伸缩性──从最简单的软电话到商业级的软交换平台几乎无所不能。它支持SIP、Skype、H232、IAX及Google Talk等通信协议。另外，它还支持很多高级的SIP特性，如presence、BLF、SLA以及TCP TLS和sRTP等。它可以作为纯SBC使用，如做为T.38及其它点对点通信的代理等。也可以作为B2BUA连接其它开源的VoIP系统，如OpenPBX、Bayonne、 YATE、Asterisk等。

FreeSWITCH支持各种带宽的语音编解码，支持8K，16K，32K及48KHz的高清通话，并可以在桥接不同频率的语音时自动进行转换。它可以运行在32位及64位的Windows、MacOSX、Linux、及Solaris等平台上，也有人成功地安装到某些嵌入式处理器上。

它支持TTS(Text-To-Speach)以及VAD(Voice Activity Detection)。允许你使用Lua、Javascript、Python等嵌入式脚本语言来控制呼叫流程，或者你也可以通过Event Socket与C、Ruby、Erlang、Python、Perl、Java等任何你所熟悉的语言进行交互。

为了不重复发明轮子，它使用了相当多的第三方软件库。同时，为了方便编译和安装，这些库代码都集成到了源代码树中。

它使用一种模块化、可扩展性的结构，只有必需的功能和函数才会加入到内核中，从而保证了其稳定。作为一款开源软件，它最大的好处就是你可以拿过来自己编译进行，并根据你的需要来开发自己的模块。

它的作者Anthony Minissale曾经是Asterisk的开发者，关于开发FreeSWITCH的原因和动机请参阅[FreeSWITCH背后的故事](http://www.dujinfang.com/past/2009/10/31/freeswitchbei-hou-de-gu-shi/) 。

如果想进一步深入了解FreeSWITCH，[《FreeSWITCH权威指南》](http://book.dujinfang.com)当然是最好的指导书。
