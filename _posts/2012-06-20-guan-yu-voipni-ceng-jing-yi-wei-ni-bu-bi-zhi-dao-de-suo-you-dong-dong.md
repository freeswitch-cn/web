---
layout: default
title: "关于VoIP你曾经以为你不必知道的所有东东 "
---

# {{ page.title }}

本文原作者为 Kristian Kielhofner，以  [Creative Commons Attribution-ShareAlike license](http://creativecommons.org/licenses/by-sa/3.0/legalcode)  协议发布

本文原载于 <https://docs.google.com/document/d/1WBznJ_R-2JgQPbRzFVRvWZdlwIwRrmu3X1J-QmH6Ecs/edit?pli=1>

本书原名：Everything you wish you didn't need to know about VoIP

本书原版权声名：
Entire document Copyright 2012 by Kristian KielhofnerProvided under the [Creative Commons Attribution-ShareAlike license](http://creativecommons.org/licenses/by-sa/3.0/legalcode) .

--- 译者 Seven Du

背景：<http://blog.krisk.org/2012/06/everything-you-wish-you-didnt-need-to.html?cc12-0618>

如果你阅读本文，你或许对VoIP有一个模糊的理解。你可能知道也可能不知道的是---它会有多么的糟糕。它有各种各样的标准，以及各种样样的实现方式（有时是故意的）。让人眼花瞭乱的丰富特性以及各种各样的功能加在一起，使得VoIP互联比起电信从业人员所熟知的 PRI 和 tip/ring 来说复杂的多。

本文是：

* 围绕 SIP 对各种协议和一个概述
* 对于想从技术角度了解更多的人来讲，进行一个深入的剖析
* 对我过去10年中使用过的各种 SIP 平台经验的一个总结
* 与实现无关，但略倾向于相对清晰的开源协议栈，我将尽可能保持客观

本文不是：

* 针对任何东西的简介或初级教程。阅读本文需要对VoIP，电话系统，数据（IP）网络等有一些基本的概念。
* 非常深入的剖析。除非必须，我们不会深入讨论 SIP 事务处理，CSeq，tags，timers，以及状态机。
* 关于 Skype，H.323，H.248，Skinny(SCCP)，MEGACO，Unistim或任何其它的愚蠢的、受版权保护的或没用的 "VoIP" 协议实现。
* 漂亮简洁。

如果说在阅读本文时你需要时刻记住一点的话，那就是：在SIP中没有绝对的东西。无论我如何强调（基于我在该领域中对标准和实现的理解）某个地方，总会有一些糟糕的实现。有些地方或者有些人可能对我的假设有不同的意见。但有意见请保留，让我们继续。


SIP 是一个信令协议。它主要的目的就是建立及销毁会话。让它停留一会儿---SIP的工作就是给其它协议让路，因而其它的协议（如RTP）可以做一些对用户有意义的事情（比方说传输语音以建立一个对话）。既然这样说，SIP也可以自身交流信息，如：


* 会话信息（被叫号码，主叫号码，实现细节等）
* 消息等待指示
* 即时消息、呈现对话（通过SIP SIMPLE）
* 终端能力查询（OPTIONS）


待续 .....
