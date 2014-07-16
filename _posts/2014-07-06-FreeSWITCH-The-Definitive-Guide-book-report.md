---
layout: post
title: "[投稿]读《FreeSWITCH权威指南》有感"
tags:
  - "投稿"
  - "征文"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>

王涛投稿。

**注意**：本文版权归原作者所有。

--《FreeSWITCH权威指南书评》

--
<br />
最近正在拜读杜金房先生的著作《FreeSWITCH权威指南》，感觉收获颇多。

之前在freeswitch的官方网站中查看freeswitch的资料，虽然能够找到一些英文资料，但对于从零开始学习freeswitch的我，感觉还是很吃力，尤其是freeswitch中比较关键的SIP、DialPlan、Event_Slocket等模块，通过freeswitch的官网英文资料还是不能全面的了解其中的来龙去脉（都怪自己没把英文学习坚持下来）。

学习该书中关于SIP协议的介绍，让我受益匪浅。在读该书之前，我在本地的虚拟机上安装了fs，通过wireshark抓包学习SIP呼叫流程，但是对于抓获的包，自己不能十分清楚其中数据的含义，这个一直是我心中的一个疙瘩。看到该书中关于SIP这一节的介绍，顿时豁然开朗，里面详细介绍了SIP协议中的每一项，每个参数的含义都给出了详细的介绍，真的很给力！目前正在学习DialPlan部分，也确实学到了不少东西，比起自己通过查找英文wiki，效率高多了。

整体感觉这书买的没错，我作为一名从零开始学习的菜鸟，感觉书中内容通俗易懂，自己收获很多。作为一个从零开始学习的菜鸟，个人感觉书中要是再介绍介绍如何使用freeswitch的官网查找资料，如何提交fs的bug，如何同全球其他开发者一起交流，就感觉更棒了，这样就能吸引更多的人来参与fs！

总之，这本书买的很值，看的很过瘾，之前通过网络自学时遇到的问题点，有不少都在书中找到了答案，十分期待更高阶的第二版！

<br />
原文链接：http://blog.csdn.net/wtswjtu/article/details/34856999