---
layout: post
title: "[投稿]FreeSWITCH的SDP读取与设置"
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

默言投稿，来自：<http://www.cnblogs.com/jizha/archive/2013/06/07/freeswitch_sdp.html>。

在对接第三方SIP客户端和网关时，常常需要修改手工修改SDP信息。
下面给出设置修改SDP信息的两种方法，如下：   

* 通过拨号方案修改SDP信息   
* 通过API命令修改SDP信息

## 通过拨号方案修改SDP信息 ##

### 拨号方案重写SDP信息 ###

在拨号方案里面通过set方法设置`switch_r_sdp`的值，该方法会直接覆盖掉原有的sdp值。   
具体拨号方案如下所示：

    <extension name="show_info">
      <condition field="destination_number" expression="^9192$">
      <action application="answer"/>
      <action application="info"/>
      <action application="log" data="INFO  ===switch_r_sdp Before:========${switch_r_sdp}"/>
      <action application="set"><![CDATA[switch_r_sdp=v=0
    o=- 123456 123 IN IP4 192.168.1.112
    s=etmedia
    c=IN IP4 192.168.1.113
    t=0 0
    a=X-nat:0 Unknown
    m=audio 4002 RTP/AVP 18 103 102 117 3 0 8 9 118 119 104 4 101
    a=rtpmap:18 G729/8000
    ]]>
      </action>
      <action application="log" data="INFO  ===switch_r_sdp After:============${switch_r_sdp}"/>
      <action application="sleep" data="250"/>
      <action application="hangup"/>
      </condition>
    </extension>  
  
控制台输出如下所示：

    2013-06-07 22:04:44.210888 [INFO] mod_dptools.c:1458  ===switch_r_sdp Before:========v=0
    o=- 3579631484 3579631484 IN IP4 192.168.1.101
    s=etmedia
    c=IN IP4 192.168.1.101
    t=0 0
    a=X-nat:0 Unknown
    m=audio 4018 RTP/AVP 18 103 102 117 3 0 8 9 118 119 104 4 101
    a=rtpmap:18 G729/8000
    a=rtpmap:103 speex/16000
    a=rtpmap:102 speex/8000
    a=rtpmap:117 iLBC/8000
    a=fmtp:117 mode=30
    a=rtpmap:3 GSM/8000
    a=rtpmap:0 PCMU/8000
    a=rtpmap:8 PCMA/8000
    a=rtpmap:9 G722/8000
    a=rtpmap:118 AMR/8000
    a=rtpmap:119 AMR-WB/16000
    a=rtpmap:104 speex/32000
    a=rtpmap:4 G723/8000
    a=rtpmap:101 telephone-event/8000
    a=fmtp:101 0-15
    a=rtcp:4019 IN IP4 192.168.1.101
    
    2013-06-07 22:04:44.210888 [INFO] mod_dptools.c:1458  ===switch_r_sdp After:============v=0
    o=- 123456 123 IN IP4 192.168.1.112
    s=etmedia
    c=IN IP4 192.168.1.113
    t=0 0
    a=X-nat:0 Unknown
    m=audio 4002 RTP/AVP 18 103 102 117 3 0 8 9 118 119 104 4 101
    a=rtpmap:18 G729/8000

从上面的输出结果可以看到，在设置完`switch_r_sdp`后，原有的SDP变量的值都被替换为新值。

### 拨号方案向A-Leg附加SDP新值 ###

上面的方法会直接覆盖掉所有的SDP值，那如果只是要附加一部分值的话，可以采用下面的方式：   

如下方拨号方案所示：

    <extension name="show_info">
      <condition field="destination_number" expression="^9192$">
      <action application="answer"/>
      <action application="info"/
      <action application="set" data="switch_r_sdp=${switch_r_sdp}AS:384"/>
      <action application="sleep" data="250"/>
      <action application="hangup"/>
      </condition>
    </extension>  
  
在原有变量的后面附加上自己需要的值即可。

### 拨号方案向B-Leg附加SDP新值 ###

如果需要在桥接B-Leg之前，修改B-Leg的SDP值的话，需要用到一个通道变量`sip_append_audio_sdp`。     

可采用下面的方式来解决：

    <extension name="show_info">
      <condition field="destination_number" expression="^9192$">
      <action application="answer"/>
      <action application="info"/>
      <action application="export" data="sip_append_audio_sdp=b=AS:384"/>
      <action application="sleep" data="250"/>
      <action application="hangup"/>
      </condition>
    </extension> 

### 应用场景 ###

在桥接第三方SIP客户端时，需要在SDP在里面增加对方自定义的值才能协商语音成功，在这种场景里面需要用到该变量。（此处是个人理解，如果有更好的应用，欢迎指点）

### 变量说明 ###

`sip_append_audio_sdp`在官网的Wiki文档说明如下：   
This may be used to append audio parameters to the SDP sent to B-leg.    
It should/must be set before bridging.    
Usage:    

    <action application="export" data="sip_append_audio_sdp=a=fmtp:18 annexb=no"/>   
简单翻译下是该变量可以用来设置发送给B-Leg的语音变量，不过，需要在Bridge之前进行设置。

## 通过API命令修改SDP信息 ##

### API命令读取SDP ###

#### 前提假设 ####

假设现在有两个短号互打，1000为Easytalk，1001为x-lite，1001拨打1000,通话正常建立。

1000对应的通道UUID为：**31c0ea2e-53b6-4457-8790-70b1b1c36d10**   
1001对应的通道UUID为：**6fec25de-34e9-4a4a-9d1c-5284bf023e43**

#### 查询A-Leg的SDP信息 ####

使用下面的命令查询使用的SDP：   
FreeSWITCH@wchi-PC> `uuid_getvar 6fec25de-34e9-4a4a-9d1c-5284bf023e43 switch_r_sdp`  
返回结果：
    
    v=0
    o=- 2 2 IN IP4 192.168.1.101
    s=CounterPath X-Lite 3.0
    c=IN IP4 192.168.1.101
    t=0 0
    m=audio 55190 RTP/AVP 107 119 100 106 0 105 98 8 101
    a=rtpmap:107 BV32/16000
    a=rtpmap:119 BV32-FEC/16000
    a=rtpmap:100 SPEEX/16000
    a=rtpmap:106 SPEEX-FEC/16000
    a=rtpmap:105 SPEEX-FEC/8000
    a=rtpmap:98 iLBC/8000
    a=rtpmap:101 telephone-event/8000
    a=fmtp:101 0-15
    a=alt:1 1 : +pnfung+ CxnLWcRO 192.168.1.101 55190
    
    
#### 查询B-Leg的SDP信息 ####

FreeSWITCH@wchi-PC> `uuid_getvar 31c0ea2e-53b6-4457-8790-70b1b1c36d10 switch_r_sdp`   
返回结果：
    
    v=0
    o=- 3579629755 3579629756 IN IP4 192.168.1.101
    s=etmedia
    c=IN IP4 192.168.1.101
    t=0 0
    a=X-nat:0 Unknown
    m=audio 4016 RTP/AVP 0 101
    a=rtpmap:0 PCMU/8000
    a=rtpmap:101 telephone-event/8000
    a=fmtp:101 0-15
    a=rtcp:4017 IN IP4 192.168.1.101

### API命令设置SDP ###

设置方法同上面拨号方案类似，都是通过修改通道变量来达到目的。只是修改的方式不同而已。
