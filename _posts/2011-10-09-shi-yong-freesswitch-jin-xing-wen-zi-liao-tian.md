---
layout: post
title: "使用 FreesSWITCH 进行文字聊天"
tags:
  - "simple"
  - "message"
  - "news"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


FreeSWITCH  在上个月刚刚加入了一个新模块 mod_sms，可以实现 SIP MESSAGE 消息路由。有了它，你就可以使用lua 脚本或者 ESL 开发任何聊天应用了。值得一提的是，它不仅只支持 SIP，也支持 Skype 及 Google talk间互通。

Seven Du 同志早早的就试用了这个模块，还写了一篇 [WIKI](http://wiki.freeswitch.org/wiki/Mod_sms)。

官方的发布信息请看这里：<http://www.freeswitch.org/node/341>
