---
layout: post
title: "FreePBX v3和2600hz背后的故事"
tags:
  - "转载"
  - "2600Hz"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


来自：<http://454171.137.hostcn.cn/read.php?tid=1070>
时间：2010-08-13 00:44 作者：asterisk


FreePBX的一些核心开发人员组织起来开始了2600hz项目——一个推动开源电话应用的新公司。现在，他们发布了blue.box，FreePBX的新版本。这家公司是由Darren Schreiber发起成立并作为一个新成立的VoIP Inc公司的子公司。有消息说，2600hz项目已经从匿名投资者那里获得25万美金的投资。 

2600 Hz以前是电话公司用的频率，被破解用来寻找免费的长途电话呼叫。为了破解这个，需要一个设备来产生2600赫兹拨号音，这个设备叫做blue box。新公司取这个名字或许就是为了向这些光荣传统和前辈致敬？ 

按照我的理解，新公司的成立是由于FreePBX开发人员和项目赞助商意见不合而造成的。 FreePBX是个位于开源电话软件比如Asterisk之上的一个图形化用户界面，由Bandwidth.com赞助支持。
 
因为，自消息发布以来，Bandwidth.com并没有站出来对此事发表任何意见。 

当FreePBX宣布 v3版本首要支持的FreeSWITCH而非其竞争对手Asterisk，这让人们对FreePBX和Asterisk之间的微妙关系难免胡乱猜想。在Asterisk赞助商Digium前不久才发布的AsteriskNow——一个集成了CentOS Linux操作系统、FreePBX软件、Asterisk软件的安装包——中主动推介了FreePBX的背景下，FreePBX的这种态度不算理智。 

因此，剥离v3版本独立发展（即2600hz），无疑是FreePBX正确的选择。 

基于2600hz事件的持续发酵，本站已经陆续发表了多篇文章介绍2600hz和FreePBX v3以及FreeSWITCH，后面还会在名人堂里对Darren Schreiber进行详细介绍，也将摘录他博客里的精彩内容以飨读者。请继续关注51asterisk.com的后续报道。
