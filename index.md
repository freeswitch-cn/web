---
layout: default
title: 首页
---

<!--
<div style="background-color:blue;color:yellow;padding:5px;text-align:center;margin-top:10px"><a style="color:white;text-decoration:none" href="/2013/07/02/freeswitch-cn-zhong-wen-she-qu-2013-di-er-jie-kai-fa-zhe-sha-long-yuan-man-cheng-gong.html">FreeSWITCH-CN 2013 开发者沙龙圆满成功</a>
 | <a style="color:white;text-decoration:none" href="/2013/12/27/FreeSWITCH-CN-wei-xin-gong-gong-zhang-hao-kai-zhang.html">FreeSWITCH-CN 微信公共账号 &rarr;</a>
</div>
-->

<!--<div style="background-color:red;color:yellow;padding:5px;text-align:center"><a style="color:white" href="/2014/04/29/freeswitch-peixun-beijing.html">[FreeSWITCH高手速成培训2014夏季班（北京站）]</a>（6月14--16日）火热报名中 ...</div>

<div style="background-color:blue;color:yellow;padding:5px;text-align:center"><a style="color:white" href="/2014/04/30/ncc-and-freeswitch-salon-2014.html">[下一代呼叫中心与企业通信发展论坛暨FreeSWITCH-CN第三届开发者沙龙]</a>（6月13日）报名 </div>-->

欢迎光临FreeSWITCH中文站，本站是非官方的，其官方网站是：<a href="http://www.freeswitch.org" target="_blank">http://www.freeswitch.org</a> 。

FreeSWITCH是一个开源的电话软交换平台，主要开发语言是C，某些模块中使用了C++，以[MPL1.1](http://www.opensource.org/licenses/mozilla1.1.php)发布。更多的说明请参考[什么是FreeSWITCH?](/2009/11/08/shi-yao-shi-freeswitch.html)和[FreeSWITCH新手指南](/2009/11/08/freeswitch-xin-shou-zhi-nan.html)。
您也可以阅读这本《[FreeSWITCH权威指南](http://book.dujinfang.com)》。

我们有一个QQ群：190435825 、一个[豆瓣小组](http://www.douban.com/group/239803/)、一个微信公共账号 FreeSWITCH-CN（可以扫描右侧的二维码加入），以及一个[知乎专栏](http://zhuanlan.zhihu.com/freeswitch/19648543)。

本站接受[读者投稿](/2010/07/23/guan-yu-zai-ben-zhan-tou-gao-de-shuo-ming.html)，欢迎与大家分享经验。

欢迎加入 Google Groups [FreeSWITCH-CN 邮件列表](http://groups.google.com/group/freeswitch-cn?hl=en)，也欢迎到[知乎](http://zhihu.com)上提问。
<br>

# 最新文章

<div>

<ul class="posts">
  {% for post in site.posts limit:40 %}
    <li><span>{{ post.date | date: "%Y-%m-%d" }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
    <li><a href="/posts.html">更多文章...</a></li>
</ul>

</div>
