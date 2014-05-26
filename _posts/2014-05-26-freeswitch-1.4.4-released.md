---
layout: post
title: "FreeSWITCH 1.4.4正式版发布"
tags:
  - "news"
  - "发行版"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>

在历经将近一年的打磨之后，FreeSWITCH 1.4.4正式版终于发布了。它带来了如下的新特性：

完全支持WebRTC、OPUS, DTLS，以及更多
RTP处理与SIP完全解耦
从源代码库中删除了很多第三方的库，而开始使用操作系统提供的库，如SQLite、OpenSSL等
通过审查代码发现并修复了很多安全性问题和稳定性问题

FreeSWITCH的源代码包可以从 <http://files.freeswitch.org> 下载。另外，Debian 7的DEB包也有了。

详情参见：<http://www.freeswitch.org/node/491>。
