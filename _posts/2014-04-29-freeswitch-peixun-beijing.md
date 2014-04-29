---
layout: post
title: "FreeSWITCH高手速成培训2014夏季班（北京站）"
tags:
  - "培训"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>

<strong style="color:red">6月16-18日，FreeSWITCH高手速成培训震撼来袭。5月1日上午7:00开始售票。5张特价票先到先得。请<a href="http://fstrainingsh.vasee.com" target="_blank">到这里报名</a> </strong>。


## 什么是FreeSWITCH？

FreeSWITCH是一个开源的电话交换平台。官方给它的定义是——世界上第一个跨平台的、伸缩性极好的、免费的、多协议的电话软交换平台。

首先它是跨平台的。它能原生地运行于Windows、Max OS X、Linux、BSD 及 Solaris 等诸多32/64位平台（甚至，也有人成功的将它应用于Linksys NLS2平台及Raspberry Pi上）。

它具有很强的可伸缩性——从一个简单的软电话客户端到运营商级的软交换设备几乎无所不能。

它是免费的，它采用MPL 1.1协议授权，意味着任何人都可以免费的使用并获取源代码，任何人都可以修改、发布、甚至出售自己的应用。

它支持SIP、H323、Skype、Google Talk等多种通信协议，并能很容易地与各种开源的PBX系统如sipXecs、Call Weaver、Bayonne、YATE及Asterisk等通信，它也可以与商用的交换系统如华为、中兴的交换机或思科、Avaya的交换机等互通。

它可以用作一个简单的交换引擎、一个PBX，一个媒体网关或媒体支持IVR的服务器，或在运营商的IMS网络中担当CSCF或Application Server等。

它遵循相关RFC并支持很多高级的SIP特性，如 presence、BLF、SLA以及TCP、TLS和sRTP等。它也可以用作一个SBC进行透明的SIP代理（proxy）以支持其他媒体如T.38等。

它支持宽带及窄带语音编码，电话会议桥可同时支持8、12、16、24、32及48kHz的语音。

## FreeSWITCH能做什么？

FreeSWITCH是一个B2BUA，所以，它能做的工作非常多，典型的，如：
   * 在线计费、预付费功能
   * 电话路由服务器
   * 语音转码服务器
   * 支持资源优先权和QoS的服务器
   * 多点会议服务器
   * IVR、语音通知服务器
   * VoiceMail服务器
   * PBX应用和软交换
   * 应用层网关
   * 防火墙/NAT穿越应用
   * 私有服务器
   * 第三方呼叫控制应用
   * 业务生成环境运行时引擎
   * 会话边界控制器
   * IMS中的S-CSCF/P-CSCF/I-CSCF
   * SIP网间互联网关
   * SBC及安全网关
   * 传真服务器、T.30到T.38网关
   * 其它

## 课程目标：

本课程使你从新手快速加入到FreeSWITCH高手的行列，您是否考虑过以下问题：

1. FreeSWITCH是什么？能做什么？
2. FreeSWITCH有什么最新的技术升级和未来路线的规划？
3. FreeSWITCH是否可以助力公司现有的产品功能？
4. FreeSWITCH已经帮助哪些行业和哪些公司解决了什么问题？
5. FreeSWITCH为什么有高效的并发处理能力？
6. FreeSWITCH如何快速上手？
7. 如何基于FreeSWITCH开发，什么情况下应该选用哪种开发模式和开发框架？
8. FreeSWITCH的源代码如何上手？

总之，我们帮助你更多更深入的了解FreeSWITCH的实战信息。

## 课程特色：

本课程由国内资深FreeSWITCH专家杜金房讲授。他一直本着“授人以鱼不如授人以渔”的思想，通过“手把手”的实战演练方式让大家明白各种基本概念和基本理论，然后通过“举一反三”、“知其然并知其所以然”的方式使大家对所学的知识融会贯通、灵活运用。

通过本培训，能使你快速认识FreeSWITCH，带你从0开始打造一个企业PBX通信系统。从一个没有FreeSWITCH甚至没有通信基础的新手成为一个合格的企业PBX管理员，从没有通信基础的程序员变能VoIP开发的高手。

所有的功能都是用你自己的双手创建的。我们会通过大量的实际操作帮助你理解和掌握完成该任务所需的所有概念和技能。有经验的学员也可以更加深入的了解FreeSWITCH，把以前不太听话的FreeSWITCH用起来得心应手！当然，最重要的，你会明白它如何能帮助你的企业发展或职业生涯规划。

## 培训大纲：

1. 百闻不如一见——快速了解FreeSWITCH

    * 什么是FreeSWITCH？谁在使用FreeSWITCH？
    * 打第一个电话    为什么需要注册？
    * 它是如何工作的
    * 添加一个分机
    * 添加网关拨打外部电话
    * 创建一个新的IVR，并将来话路由到IVR

2. 温故而知新——基础知识与基本概念

    * 通信简史
    * UA、载体、信令和媒体
    * PSTN与VoIP
    * 早期媒体与呼叫流程
    * PBX与B2BUA
    * 通信网
    * 基本概念 - SIP UA、代理、重定向服务器、B2BUA、SBC、SIP、RTP
    * SIP注册
    * 单腿呼叫
    * 桥接的呼叫
    * 语音编码与协商
    * 视频呼叫
    * NAT问题

3. 大道至简——让貌似繁琐的配置简单而有趣

    * FreeSWITCH架构
    * 配置架构
    * 用户目录
    * Channel、Call、API与APP
    * 呼叫字符串，使用API发起呼叫
    * 使用APP来处理呼叫
    * 高级 originate API使用
    * 重要的sofia配置参数
    * Dialplan/正则表达式
    * 默认配置简介与实例
    * 企业通信功能 - 呼叫转移，同组代答，录音、同振、顺振
    * 更改主、被叫号码
    * 多人电话会议、视频会议

4. 高手进阶——Dialplan 深入剖析
    * Context概念，从哪里来，到哪里去
    * 路由 - 解析与执行
    * 使用 xml_curl 提供dialplan
    * Channel Variables
    * 两台FreeSWITCH级连
    * 在一台机器上启动两个FreeSWITCH实例
    * Best Practise，调试与排错

5. 牛刀小试——嵌入式脚本开发
    * Lua 基础
    * 使用Lua提供IVR
    * 用Lua获得用户输入
    * 用Lua实现复杂的IVR
    * Javascript例子

6. 瑞士军刀——Event Socket
    * outbound
    * inbound
    * ESL
    * 使用时候该用inbound，什么时候用outbound
    * 自已动手写一个排队机，Outbound实现
    * 自己动手写一个排队机，Inbound实现
    * Java、Erlang实例

7. 融会贯通——真正的高手从这里开始

    * 源码编译与源码导读


费用：5000元（含午餐，不含其它食宿），提前注册可打折。

## 讲师介绍：

杜金房（Seven Du）。FreeSWITCH-CN中文社区创始人，FreeSWITCH代码贡献和维护者。
2001年毕业于烟台大学，同年进入烟台电信工作，负责程序交换机、网管系统维护，并开发了大量网管及办公系统。经历了电信改通信、通信改网通等一系列中国电信业的分拆合并变革。
2008到北京，加入Idapted，开始使用FreeSWTICH做网络一对一教学系统。
2009年创办FreeSWITCH-CN（www.freeswitch.org.cn）开源软件中国社区。
2011年创办北京信悦通科技有限公司（x-y-t.com），提供FreeSWITCH培训、咨询服务、解决方案及商业支持。
2011、2012及2013年，参加在美国芝加哥举办的ClueCon全球VoIP开发者大会，并做主题演讲。
自2012年开始主办中国FreeSWITCH开发者沙龙，每年吸引很多业内人士参加。

自2011年起，在全国大中小企业中提供各种级别的FreeSWITCH培训十余次，2012年6月在北京开始举办公共FreeSWITCH培训班。

著有《FreeSWITCH：VoIP实战》网络版电子书，实体书《FreeSWITCH权威指南》将于近期由华章公司机械工业出版社出版。

## 注意事项：

* 学员可携带个人电脑，以便进行实战练习
* 如果在线报名有问题，请联系我们

## 联系人：

秦倩 13501904410  QQ30917711
