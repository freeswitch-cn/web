---
layout: post
title: "FreeSWITCH代码库国内镜像"
tags:
  - "News"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>

国内的程序员都比较辛苦，访问FreeSWITCH官方代码库要么太慢，要么连不上。

为此，我们建立了FreeSWITCH代码为国内镜像，存放在 GitCafe 上： <https://gitcafe.com/freeswitch/freeswitch-mirror> 。

可以使用如下代码获取代码库：

    git clone git://gitcafe.com/freeswitch/freeswitch-mirror.git

或

    git clone https://gitcafe.com/freeswitch/freeswitch-mirror.git

如果已经使用了官方的版本，也可以另外加一个remote：

    git remote add gcafe https://gitcafe.com/freeswitch/freeswitch-mirror.git
    git pull gcafe master

目前我们仅镜像了master分支。
