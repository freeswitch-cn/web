---
layout: post
title: "FreeSWITCH一分钟速成"
tags:
  - "指南"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>

在过去的几年里，我一直试图指导大家一步一步从根本上了解FreeSWITCH，但总是有些“没有耐心”的人，希望以最快的速度搞定FreeSWITCH。下面，我就提供一种我认为可行的方法。

如果你是Windows用户，先确定你的系统是32位还是64位的。是的，这个需要你自己解决。

下载[32位](http://files.freeswitch.org/windows_installer/installer/x86/freeswitch.msi) 或 [64位](http://files.freeswitch.org/windows_installer/installer/x64/freeswitch.msi) FreeSWITCH安装文件。（这个过程可能不止一分钟）

关掉防火墙！（很多情况下Windows防火墙是导致打不通电话的第一大问题。关于如何让FreeSWITCH在有防火墙的情况下工作，显然超出了本文的范围）。

安装完成后，启动FreeSWITCH。

但愿一切顺利！

如果你知道怎么看哪些端口被正确监听，那么，你可以查一下 5060 TCP和UDP端口是否正确监听。不知道的话，也无所谓，继续往下看。

FreeSWITCH默认配置了1000～1019一共20个账号，足够你用的了。用你熟悉的软电话，或者硬件的SIP话机，直接向FreeSWITCH注册。默认的密码都是1234，当然，最重要的参数是你运行FreeSWITCH的机器的IP地址。有了这三个参数，你就应该知道怎么做了。如果你对SIP终端不熟悉，对不起，你可能一分钟内搞不定这事。

接下来呢？多注册几个号码互相打电话。

如果遇到问题怎么办？ 自己找答案：<http://www.freeswitch.org.cn>上有相关的资源。如果你想在QQ群或任何地方提问关于FreeSWITCH的问题，最好事先看一下“FreeSWITCH新手指南”，我已经告诉你了在哪里能找到该指南。

