---
layout: post
title: "多台 FreeSWITCH 服务器级联"
tags:
  - "trunk"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


其实，只要你吃透了前些章节的内容，做 FreeSWITCH 级联是没有任何问题的。但这个问题还常常被众网友问到，我就索性再写一篇。

## 双机级联

假设你有两台 FreeSWITCH 机器， 分别为A和B，同样IP分别为 192.168.1.A 和 192.168.1.B。每台机器均为默认配置，也就是说在每台机器上 1000 ～ 1019 这 20 个号码可以互打电话。位于同一机器上的用户称为“网内用户”，如果需要与其它机器上的用户通信，则其它机器上的用户就称为“网外用户”。

现在你需要在两台机器之间的用户互拨，因此你想了一种拨号方案。如果A1000想拨打B1000，则B1000相对于A1000来说就是“网外用户”。就一般的企业PBX而言，一般拨打外网用户就需要加一个特殊的号码，比方说“0”。这样，“0”就称为“出局字冠。

好了，我们规定，不管是A用户还是B上的用户，拨打外网用户均需要加0. 下面我们仅配置A打B，把B打A的情况留给读者练习。

在A机上，把以下 dialplan 片断加到 default.xml 中：

	<code>
	<extension name="B">
	  <condition field="destination_number" expression="^0(.*)$">
	    <action application="bridge" data="sofia/external/sip:$1@192.168.1.B:5080"/>
	  </condition>
	</extension>
	</code>

其中，expression= 后面的正则表示式表示匹配以0开头的号码，“吃”掉0后，把剩下的号码送到B机的5080端口上。

所以，如果用户1000在A上拨 01000，将会发送 INVITE sip:1000@192.168.1.B:5080 到B上。B收到后，由于5080端口默认走public dialplan，所以查找 public.xml，找到1000后将电话最终接续到B机的1000用户。


除了SIP外，我还在两台机器上分别加了两块E1板卡，中间用交叉线直连，这样的话，我希望拨9开头就走E1到对端，设置如下：

	<code>
	<extension name="B_E1">
	  <condition field="destination_number" expression="^9(.*)$">
	    <action application="bridge" data="freetdm/1/a/$1"/>
	  </condition>
	</extension>
	</code>




## 汇接模式


<pre>
                             |  汇接局  X |
                            /      |       \
                           /       |        \
                         A         B         C
</pre>

其实你搞定了第一种模式以后，这种汇接模式也就很简单了。无非你需要动一动脑子做一下拨号计划，比方说到A拨0，B拨1，到C拨2之类的。然后在汇接局配置相关的 dialplan 就OK了。

遇到 dialplan 的问题还是再看一下第八章，还是那句话，使用 F8 打开详细的 LOG，打一个电话，从绿色的行开始看。

## 安全性

上面的方法只使用5080端口从 public dialplan 做互通，而发送到5080端口的INVITE是不需要鉴权的，这意味着，你任何人均可以向它发送INVITE从而按你设定的路由规则打电话。这在第一种模式下问题可能不大，因为你的public dialplan 仅将外面的来话路由到本地用户。但在汇接局模式下，你可能将一个来话再转接到其它外部网关中去，那你就需要好好考虑一下安全问题了，因为你肯定不希望全世界的人都用你的网关打免费电话。


一般说来，解决这个问题有两种方式，那就是让所有来话都经过认证鉴权后再进行路由（本地用户发到5060端口上都是需要鉴权的）。

考虑双机级联的情况，你只需要在A上配置一个到B的网关（将下列内容存成XML文件放到 conf/sip_profiles/external/b.xml）：

	<code>
	<include>
	        <gateway name="b">
	                <param name="realm" value="192.168.1.B"/>
	                <param name="username" value="1000"/>
	                <param name="password" value="1234"/>
	        </gateway>
	</include>
	</code>


同时把A上的 dialplan 改成：

	<code>
	<extension name="B">
	  <condition field="destination_number" expression="^0(.*)$">
	    <action application="bridge" data="sofia/gateway/b/$1"/>
	  </condition>
	</extension>
	</code>

这样，A上的用户可以呼通所有B上的用户，从B的用户来看，好像所有电话都是从本机的1000这个用户打进来的（这就是网关的概念，因为对于B来说，A机就相当于一个普通的SIP用户1000。当然你从A上理解，B就是给你提供了一条SIP中继，如果在B上解决了“主叫号码透传”以后，B就相法于一条真正的中继了）。如果这么说理解有难度的话，想像一下B是联通或电信的服务器网关，你是不能控制的，而它只给了你一个网关的IP，用户名，和密码，你把它配到你的A上，就可以呼通电信能呼通的任何固定电话或手机了。
