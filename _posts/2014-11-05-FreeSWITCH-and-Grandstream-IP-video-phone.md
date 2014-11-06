---
layout: post
title: "FreeSWITCH & 潮流IP视频话机解决方案"
tags:
  - "联合解决方案"
---


# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


FreeSWITCH是一个非常强大的软交换系统。除基本的音视频通话以外，它也支持多方的音频和视频会议。下面我们就来看一下FreeSWITCH在视频会议方面都有哪些功能。

## 普通视频会议

要让FreeSWITCH支持视频会议，首要配置FreeSWITCH支持视频通话。FreeSWITCH默认的配置是不支持视频通话的，假设我们增加H264编码支持，在 vars.xml中配置如下：

	<X-PRE-PROCESS cmd="set" data="global_codec_prefs=G722,PCMU,PCMA,GSM,GSM,H264"/>
	<X-PRE-PROCESS cmd="set" data="outbound_codec_prefs=PCMU,PCMA,GSM,GSM,H264"/>

配置好视频编解码后，重启FreeSWITCH，就可以拨打3000呼入默认的会议进行视频会议了。在FreeSWITCH视频会议中，FreeSWITCH会检测当前发言的人，并自动显示当前发言人的头像。
在FreeSWITCH 1.4中，新加入了一个vid-floor子命令，可以用它来控制当前哪个成员显示在大家面前。比如，在会议中，以下命令将大家看到的视频切换到member-id为3的成员：

	conference 3000 vid-floor 3 force

注意其中的force参数，该参数是可选的。如果没有该参数，则只是临时切换到该成员，根据声音大小自动切换还是会出现；如果使用该参数，就固定永远显示这一个成员（当然如果该成员挂机，就又会变成自动选择模式）。

## 终端视频会议

目前，FreeSWITCH中的视频会议不支持“融屏”，即不能像MCU一样将多个参与者，不过，潮流的视频终端可以做到这一点。

潮流网络新款安卓7寸触摸屏GXV3275支持主流的视频编解码H264，并话机本身允许最大三方视频会议的建立，如果服务器的视频会议室被占满的情况下，可以使用GXV3275临时快速建立简单的三方视频会议。

GXV3275支持1080P的编解码，最大帧率支持30帧，一路视频通话可以实现1080P@30fps。以下配置图设置了720P的视频大小，一般使用视频速率为2M Kbps，在带宽足够的情况下（比如），视频通话流畅度可达到30帧。如果带宽不足（比如），可以使用4CIF的视频大小，视频速率，一般视频流畅度可达到15帧。

![GXV3275视频配置图](/images/solution/img01.jpg)

Ps：H.264视频大小和视频速率是调节视频的主要两个参数值，请根据实际网络带宽来配置。


下面是三方视频会议建立步骤：

1）首先通过桌面的会议APP图标进入会议界面，通过“+”按钮把其他两方成员加进会议，建立三方语音会议后，点击视频控制进行视频会议。

![会议界面](/images/solution/img02.jpg)

2） 勾选要进行视频通话的线路，点击开启视频会议

![会议界面](/images/solution/img03.jpg)

3） 建立三方视频会议

![会议界面](/images/solution/img04.jpg)

4） 此外，从会议室界面可看到，GXV3275允许邀请其他五方成员进行语音会议，通过触摸按键邀请成员，可以快速的建立起六方语音会议，如果是普通的IP话机建立语音会议，必须要一路一路建立通话后再建立起会议。GXV3275的六方语音会议节省了服务器会议室资源，并且节省了用户操作时间，更加的人性化使用。

## 视频监控

有了视频会议及融屏的解决方案以后，就可以将视频监控也融入到FreeSWITCH中了。为了能与FreeSWITCH进行视频通信，最简单的方案就是找一个支持SIP协议的摄像机。潮流网络公司有一款摄像机型号是GXV3615W。下图是该摄像机的SIP配置页面，可以看出，它跟普通的SIP话机配置方式基本上是一样的。

![SIP配置界面](/images/solution/img05.jpg)

配置完成后，该摄像机也是以一个SIP客户端的方式注册到FreeSWITCH上。一般来说，它不会主动发起呼叫，但是我们可以从FreeSWITCH中呼叫它。摄像机在接收到呼叫后，会自动应答，所以，我们就可以简单呼叫一个电话号码查看该摄像机覆盖范围内的图像了。在一些智能家居类的应用中，通过呼叫一个电话号码即可以查看家里的情况。在FreeSWITCH中，就这么简单地实现了。
当然，我们也可以将该摄像机加入会议，如（所配置的账号为1010）：

	conference 3000 dial user/1010

由于该摄像机一般不会说话，所以在FreeSWITCH视频会议中如果想看到它的话，就需要使用“vid-floor”功能强制把floor设置成它，如：

	conference 3000 vid-floor 2 force

当然，FreeSWITCH对外提供丰富的API，大家可以很方便的把这些功能集成到自己的软件中。