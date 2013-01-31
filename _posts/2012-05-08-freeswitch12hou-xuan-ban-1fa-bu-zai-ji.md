---
layout: post
title: "FreeSWITCH-1.2侯选版发布"
tags:
  - "news"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


FreeSWITCH 已经准备发布稳定的1.2版了，目前RC2已经可以下载了。

源码下载地址：<http://files.freeswitch.org/freeswitch-1.2.rc2.tar.bz2>


<http://fisheye.freeswitch.org/changelog/freeswitch.git?cs=1ecb6be00915107491f66f14298930317409e8e0>

<http://fisheye.freeswitch.org/changelog/freeswitch.git?cs=a1177a79941d2d667c6c399199c9ff2f6f1cbfb0>


版本历史回顾：

FreeSWITCH最早向世界宣布是在2006年1月份，有记载的最早的应用是2007年6月份。

FreeSWITCH's 第一个官方的发行版是 1.0.0 release (Phoenix)，于当地时间 2008年5月26日发布。

FreeSWITCH 曾经发布过  1.0.1, 1.0.2, 1.0.3, 1.0.4, 1.0.5, 1.0.6, 1.0.7 等。这些发行版有的持续时间较长，有的则较短。但自2011年1月14日发布1.0.7以后，FreeSWITCH开发团队决定不再发行新的版本，而主攻 git master 分支。他们这样做的理由是，大家都用了稳定版本的，就很少人直接用最新的开发版，因为报告 bug 的用户就少了，这样不利于开发。

值得一提的是，FreeSWITCH git 版本通常是非常稳定的，发现的 Bug 很快就修好了。由于更新的修复很快，修复的 Bug 也不会再重新 merge 回原先的发行版中，因而实际上一般来说 git 里的代码反而比上面提到的发行版中的代码新。而且 FreeSWITCH 开发团队也不对旧的代码提供支持。因此，如果你发现一个 Bug，最基本的要求是先试一试 git master 分支是不是已经修好了。

然而，随着 FreeSWITCH 社区的发展状大，越来越多的人使用 FreeSWITCH。在生产环境中保持一个稳定的版本对一般用户来讲还真不是一件很容易的事。所以，开发团队后来决定发布并维护一个新的稳定版本 FreeSWITCH-1.2 (<http://freeswitch.org/node/383>)，以后在稳定版本中就不再追加新的特性，而只修复未来发现的Bug。
