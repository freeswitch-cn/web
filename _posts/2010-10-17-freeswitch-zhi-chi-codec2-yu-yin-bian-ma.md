---
layout: post
title: "FreeSWITCH 支持 Codec2 语音编码"
tags:
  - "codec"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


[Codec2](http://www.rowetel.com/blog/?page_id=452) 是一款开源的低比特率的语音编码，它支持在大约 2400 bit/s 的低速率下进行正常的语音通信。它的出现，填补了开源领域在 5000 bit/s 以下的低比特率的语音编码的空白。它是以 LGPL(GNU Lesser General Public License)发布的。

跟往常一样，在 Codec2 的 Alpha 版本刚发布不久，FreeSWITCH 就加入了对它的支持。
