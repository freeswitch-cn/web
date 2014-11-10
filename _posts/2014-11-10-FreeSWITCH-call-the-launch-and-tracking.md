---
layout: post
title: "[投稿]FreeSWITCH小结：呼叫的发起与跟踪"
tags:
  - "投稿"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>

默言投稿。

<br />
## 需求描述

虽然现有的FreeSWITCH功能已经很强大，但是很多情况下，为了配合业务上的功能，还需要做一些定制开发。

有一个基本需求是：**如何控制fs外呼，并跟踪外呼后的一系列状态。**

## 解决方案

下面我就把自己现有的解决方案跟大家分享下，以便抛砖引玉，引出大家更好的方案。

我的方案也简单，在呼叫之前，指定呼叫的uuid，然后根据该uuid跟踪呼叫到完整状态。

### 1.获取可用的通道UUID

所以说FreeSWITCH考虑比较周到，连获取uuid的方法都提供了！

当然，你也可以使用自己到方式来生成uuid。不过，一旦uuid出现重复，可是会出现比较麻烦的问题，所以还是使用FreeSWITCH的官方提供的方法比较靠谱。

命令如下：

	create_uuid 

该命令会返回一个可用的uuid。

### 2.发起呼叫

无需多说，此处originate命令登场，不过和平时使用区别的地方是需要指定呼叫的uuid。

下面是两种指定方法，可选择性试用：

方案一：在呼叫时，指定A腿uuid

	originate {origination_uuid=xxxxx}user/60401 60402

方案二：在呼叫时，同时指定A腿和B腿的uuid

	originate {origination_uuid=xxxxx}user/60401 &bridge({origination_uuid=yyyyy}user/60402)

在使用该命令后，通过命令show channels就可看到两个新创建的通道和指定的通道uuid，xxxxx和yyyyy。

此处留给大家自己去验证了！

同时也感谢杜老大的书，这条命令是从他的书上学来的。

### 3.跟踪呼叫

跟踪呼叫，说白了，其实很简单，只是有的人可能没留意到而已，就是利用FreeSWITCH的事件机制进行跟踪。关于事件如何订阅，不是这里的重点，略去不说。

下面先说说一些基本常识：

1、跟呼叫相关的通道事件有如下几个：

Channel _ Create：通道创建事件  
Channel _ Progress：通道振铃事件  
Channel _ Answer：通道应答事件  
Channel _ Bridge：通道桥接事件  
Channel _ Hangup：通道挂断事件

2、通道事件的Unique_ID字段与我们呼叫前指定的uuid相同，这个也是我们能跟踪的前提。

有了上面两个条件之后，跟踪就变得简单和美妙起来！在呼叫开始前，将呼叫对象与uuid的对应关系存到数据库中，在收到不同的事件后，根据事件的Unique_ID找到对应的呼叫对象，然后更新它的呼叫状态即可。

### 4.注意事项

1、Channel _ Create事件比较特殊，含有的内容比较少，所以处理起来要特别注意。

该事件是在呼叫开始Routing之前就被抛出来，换句话说，你在dialplan中定义的任何变量都不会被读取到。如果这点没注意到的话，会导致判断逻辑出现问题。

2、Channel _ Bridge事件中同时含有A腿和B腿的uuid，具体字段我是不打了，感兴趣的可以自己看看。

<br>

链接博客：[http://www.cnblogs.com/jizha/p/how_ to _ trace _ call _ and_state.html](http://www.cnblogs.com/jizha/p/how_to_trace_call_and_state.html)

<br>
<br>
<hr>


**文章版权归原作者所有**。谢谢投稿。

