---
layout: post
title: "FreeSWITCH连接迅时网关快速指南"
image: "0608.png"
tags:
  - "互联互通"
---


# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>

FreeSWITCH是一个软交换，是一个SIP Server，是一个IP-PBX。你可以很方便的配置它，测试各种功能，配合迅时网关往外打电话等。

## FreeSWITCH速成

以FreeSWITCH Windows版为例，先确定你的系统是32位还是64位的。然后根据你的系统
下载相应的 [32位](http://files.freeswitch.org/windows_installer/installer/x86/freeswitch.msi) 或 [64位](http://files.freeswitch.org/windows_installer/installer/x64/freeswitch.msi) FreeSWITCH安装文件。

关掉防火墙！（很多情况下Windows防火墙是导致打不通电话的第一大问题。关于如何让FreeSWITCH在有防火墙的情况下工作，显然超出了本文的范围）。

双击FreeSWITCH安装文件进行安装，安装完成后，启动FreeSWITCH。如果一切顺利，启动后将看到类似如下的界面：

![FreeSWITCH Windows界面](../images/fs-on-windows.png)

FreeSWITCH默认配置了1000～1019一共20个账号，默认的密码都是1234，当然，你还要知道你运行FreeSWITCH的机器的IP地址。

到此，FreeSWITCH已经准备好了，FreeSWITCH的配置文件都在安装目录下面的conf目录中，（如c:\Programe Files\FreeSWITCH\conf），我们后面会用到。接下来我们以迅时MX-8模拟网关为例看一下如何配置，该网关有4个FXS口和4个FXO口。

## 配置FXS口连接模拟话机

FXS口用于连接模拟话机，该网关的作用就是将你的模拟话机“变”成一个SIP电话。所以，在这里，我们将使用“注册”的方式将每一个FXS口“变”成一个SIP客户端向FreeSWITCH进行注册。

首先，连接MX8的Web配置界面后，依次选择“基本配置” &gt; “SIP”，在“注册服务器”和“代理服务器”中填入FreeSWITCH的IP地址（在本例中是`192.168.7.6`），在配置页面上选择注册方式为“按线路注册”，使用这种注册方式可以单独配置每个FXS口对应的SIP账号，相当于4个独立的SIP话机。

配置好SIP服务器的地址后，再转到“线路配置” &gt; “用户线功能”页面，如下图所示（笔者使用的版本号是“Rev 1.9.82.331”，其它版本可能稍有出入）。在线路号码中选择一个FXS端口，如FXS-1；电话号码即我们的SIP注册账号，在图中的例子我们使用1009，勾选“注册”复选框，然后在密码栏中输入“1234”，提交后，就可以成功注册到SIP服务器上了。

![MX8网关FXS口的配置](/images/newrock/xunshi-1.png)

如果有多个模拟话机，可以依次注册其他的（如1001）。拿起话机听到拨号音，便可以互相拨打电话了（如呼叫1001），为了能加速拨号，可以在所拨的号码后加入一个“#”号链，如“1001#”。

### 配置FXO连接外线

FXO口可以连接运营商提供的电话线（我们称为外线）与外界通话。在MX8中，连接到FXO口的电话线称为中继线。切换到“线路配置” &gt; “中继线功能”可以看到如下图所示的界面。在这里，在线路号码中选择一个端口，如FXO-1；外线号码填入运营商给我们分配的电话号码（实际上在这里可以是任意号码，它只是作为一个标志使用）；我们不像FXS那样使用注册方式向FreeSWITCH注册，而是使用“中继对接”方式与FreeSWITCH对接，因此，我们不选注册复选框；接入方式选择“绑定”，并输入绑定号码（该绑定号码一般应该是运营商提供给我们的电话号码，但同样，也可以是做任意值，我们这里以88888888为例，该号码到达FreeSWITCH后将作为被叫号码，或称DID）。

![MX8网关FXO口配置](/images/newrock/xunshi-fxo.png)

通过使用绑定方式，我们可以在FXO口有来话时自动路由到FreeSWITCH上。在MX8网关中，路由是靠路由表来控制的。路由表的语法也很简单。首先进入“拨号及路由”页面，我们添加如下的路由：

    FXO     x       ROUTE   IP      192.168.7.6:5080
    IP      x       ROUTE   FXO     5,6,7,8

其中，第一行表示，所有从FXO来的呼叫，不管被叫号码是什么（x），统一路由到一个IP地址上，也就是我们就的是我们FreeSWITCH服务器的地址192.168.7.6，并且，我们在这里使用5080端口，以避免在FreeSWITCH侧对网关发来的INVITE请求进行鉴权。

下面，我们分几种情况进行说明。

1）模拟话机做主叫。当它发起呼叫时，由于我们在这里使用了向FreeSWITCH“注册”的方式，因而相当于网关设备把它转换成了一个SIP话机，网关设备就会向FreeSWITCH发起INVITE请求，接下来的接续流程就是跟SIP话机做主叫是一样的，呼叫进入FreeSWITCH的Dialplan，然后进行下一步的路由。

2）模拟话机做被叫。如果在FreeSWITCH中有人呼叫该模拟话机的号码（如1009），FreeSWITCH只是认为它就是一个普通的SIP用户，因而会找到网关设备注册时的Contact地址（即网关的IP），并向该网关发INVITE请求。网关收到INVITE请求后，查找路由表，并匹配到上述路由表中的第一行，因而，连接在相关的FXS口的模拟话机就会振铃。

3）接受模拟外线呼入。如果外面的电话从外线呼入，来话就到达网关的FXO口。网关从上述路由表中查到第1行所示的路由，并向`192.168.7.6:5080`发送INVITE请求。FreeSWITCH在收到INVITE请求后，会进入路由阶段，我们在日志中就可以看到类似如下的输出：

    Processing 139xxxxxxxx <139xxxxxxxx>->88888888 in context public

注意，其中的88888888就是我们设置的DID。因此，为了能处理该通话，我们需要在public Dialplan（conf/dialplan/public.xml）中添加类似如下的配置：

    <extension name="DID">
        <condition field="destination_number" expression="^88888888$">
            <action application="info" data=""/>
            <action application="ivr" data="demo_ivr"/>
        </condition>
    </extension>

上述配置可以在日志中显示来话Channel的相关信息，并进入一个IVR，提示来电用户进行下一步操作。此时，用户可输入一个分机号（如1009），FreeSWITCH将自动进行转接。

当然，如果你不想进入IVR，也可以将来话直接路由到任意一个分机上，如，下列配置将外线来话路由到1009分机上：

    <extension name="DID">
        <condition field="destination_number" expression="^88888888$">
            <action application="bridge" data="user/1009"/>
        </condition>
    </extension>

当然，更简单的，如果你在上面配置“绑定号码”时，不是输入88888888，而是直接输入了一个分机号（如1009），**则你不需要做任何配置**，因为FreeSWITCH中默认的配置已包含对1009的路由了。

4）通过模拟外线呼出。如果需要让本地话机通过模拟外线呼出，则需要首先在FreeSWITCH中做一条路由，将去话路由到MX8网关上，如，我们在default Dialplan（conf/dialplan/default.xml）中添加如下内容：

    <extension name="DID">
        <condition field="destination_number" expression="^0(.*)$">
            <action application="bridge" data="sofia/external/$1@192.168.7.14"/>
        </condition>
    </extension>

其中，`192.168.7.14`为MX8的IP地址，当电话路由到这里时，FreeSWITCH将向该IP的5060端口发送INVITE SIP请求。注意，正则表达式“`^0(.*)$`”匹配所有以0开头的电话号码，并将除0之外的号码作为被叫号码（俗称“吃掉0”）发到MX8上去，因此，一般要在实际的被叫号码前多加一个0。

## 参考资料

更多的信息请参考以下资料：

FreeSWITCH一分钟速成：<http://www.freeswitch.org.cn/2014/07/28/FreeSWITCH-sucheng.html>

FreeSWITCH通过迅时网关连接PSTN：<http://www.freeswitch.org.cn/2014/06/08/FreeSWITCH-interop-newrock.html>

FreeSWITCH中文站：<http://www.freeswitch.org.cn>

