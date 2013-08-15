---
layout: post
title: "[投稿]FreeSWITCH实现多人来电选择接听思路"
tags:
  - "freeswitch"
  - "sdp"
  - "默言"
  - "投稿"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>

默言投稿，来自：<http://www.cnblogs.com/jizha/p/multiusercall.html>。

场景介绍
--

该篇文章主要用于介绍如何使用FreeSWITCH实现通讯系统中常见的多人来电功能。    
具体场景如下：   
A与B正在通话中，此时C拨打A/B，FreeSWITCH发送消息给A/B提示有新电话进来，A/B收到提示后，可以选择不予理睬或者保持当前通话接通C。在与C通话完毕后，在还没挂断的情况下，可以继续返回与B/A继续通话。
### 设置拨号方案 ###
在文件/usr/local/freeswitch/conf/dialplan/default.xml中增加如下语句：

    <!-- 用于将来电转入队列中 -->
    <extension name="fifo_in">
      <condition field="destination_number" expression="^fifo_in_(\d+)$">
        <action application="answer"/>
        <action application="fifo" data="$1@$${domain} in undef $${base_dir}/sounds/music/8000/hood_loop_music.wav"/>
      </condition>
    </extension>

    <!-- 用于接听队列中等待的用户 -->
    <extension name="fifo_out">
      <condition field="destination_number" expression="^fifo_out_(\d+)$">
        <action application="answer"/>
        <action application="fifo" data="$1@$${domain} out nowait"/>
      </condition>
    </extension>

### 保持第三方来电 ###

假设A的号码为1000，B为1001，C为1002  
如果A与B在通话中，此时C拨打A，则将C转入A号码对应的队列（fifo）中等待.  
命令如下所示：   

    uuid_transfer c的uuid fifo_in_1000

上述的命令执行完毕后，C将进入队列1000中等待，在等待的过程中，由freeswitch播放等待音乐hood\_loop_music.wav   
在将C放入队列中后，需要给A发送消息，提示有新的电话来临。（此时可以看出有自己的SIP客户端是多么重要，自己的客户端就可以决定怎么处理收到的消息）

### 接听第三方来电 ###

如果客户端A决定要接听C的话，则可以在服务器端执行下面的命令，   
命令如下：      

    uuid_dual_transfer A的uuid fifo_out_1000 fifo_in_1000

上面命令的意思是让A接听队列1000中等待的C，将与A正在通话的B同时转入队列1000中。   
这样就能达到接听C，保持B的效果。

如果A与C通话完成还没挂断的情况下，A又想切换回与B的通话，则可以再次执行下面的命令：

    uuid_dual_transfer A的uuid fifo_out_1000 fifo_in_1000
