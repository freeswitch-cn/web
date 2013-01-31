---
layout: post
title: "又一个新的语音编解码方案 - Opus"
tags:
  - "news"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


FreeSWITCH 开发者的手就是快，IETF 的标准刚出台，这里就已经实现了。

[Opus](http://tools.ietf.org/html/draft-ietf-codec-opus-00) 是 [CELT](http://www.celt-codec.org/) 和 SILK 两种编码的混血儿，继承了两方的各种优点。

CELT 提供高清语音（ 8 - 48 KHz) ，而 SILK 则是 Skype 开发的，已用于最新的 Skype 客户端中。

据 <http://tools.ietf.org/html/draft-ietf-codec-opus-00> 所说，Opus 的工作方式非常有趣。它能在不同的频率和带宽下很好的权衡 CELT 和 SILK 的特性，从而针对特定的比特率产生最优的编码方案。它支持很多采样频率，从8HKz（窄带PSTN）到48KHz（高品质语音），每信道比特率从8kbps 到 128+ kbps。


更多信息请参考：<http://www.freeswitch.org/node/308>
