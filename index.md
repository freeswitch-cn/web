---
layout: default
title: {{ site.com }}
---

<div style="background-color:blue;color:yellow;padding:5px;text-align:center"><a style="color:white" href="/2013/07/02/freeswitch-cn-zhong-wen-she-qu-2013-di-er-jie-kai-fa-zhe-sha-long-yuan-man-cheng-gong.html">[FreeSWITCH-CN 2013 开发者沙龙圆满成功]</a></div>

<!-- <div style="background-color:red;color:yellow;padding:5px;text-align:center"><a style="color:white" href="/2013/05/30/freeswitch-peixun-2013.html">[FreeSWITCH-CN 2013培训]</a> 火热报名中 ...</div> -->

欢迎光临FreeSWITCH中文站，本站是非官方的，其官方网站是：<a href="http://www.freeswitch.org" target="_blank">http://www.freeswitch.org</a> 。

FreeSWITCH是一个开源的电话软交换平台，主要开发语言是C，某些模块中使用了C++，以[MPL1.1](http://www.opensource.org/licenses/mozilla1.1.php)发布。更多的说明请参考[什么是FreeSWITCH?](/2009/11/08/shi-yao-shi-freeswitch.html)和[FreeSWITCH新手指南](/2009/11/08/freeswitch-xin-shou-zhi-nan.html)。
您也可以开始阅读这本正在写作中的FreeSWITCH电子书-[《FreeSWITCH: VoIP实战》](/document)。

我们有一个[新浪微群](http://q.t.sina.com.cn/164023)、一个[豆瓣小组](http://www.douban.com/group/239803/)、大熊同学维护着一个QQ群：190435825 。

本站接受[读者投稿](/2010/07/23/guan-yu-zai-ben-zhan-tou-gao-de-shuo-ming.html)，欢迎与大家分享经验。

最推荐的交流方式是加入 Google Groups [FreeSWITCH-CN 邮件列表](http://groups.google.com/group/freeswitch-cn?hl=en)。但由于众所周知的原因，Google Groups 有时在国内无法访问。但只要您能加入，邮件列表功能应该是正常的。我们感谢您的积极参与，对此带来的不便请谅解。(如果http不行，试试[用 https 访问 FreeSWITCH-CN](https://groups.google.com/group/freeswitch-cn?hl=en))。
<br>

# 最新文章

<div>

<ul class="posts">
  {% for post in site.posts limit:20 %}
    <li><span>{{ post.date | date: "%Y-%m-%d" }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
    <li><a href="/posts.html">更多文章...</a></li>
</ul>

</div>