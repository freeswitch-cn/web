---
layout: post
title: "FreeSWITCH培训2013"
tags:
  - "培训"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>

## 课程

* FreeSWITCH高手速成 (北京 2013-06-30) 1200元
* FreeSWITCH实战 （北京 2013-07-01 - 2013-07-02）3800元

## 优惠

在[FreeSWITCH-CN 2013开发者沙龙](/2013/05/16/freeswitch-cn-zhong-wen-she-qu-2013-di-er-jie-kai-fa-zhe-sha-long.html)之际，优惠多多，请免费注册获取优惠券：

* [FreeSWITCH高手速成优惠券](http://freeswitch-training-beginnings.eventbrite.com/)，立减820元
* [FreeSWITCH实战优惠券](http://freeswitch-training-master.eventbrite.com/)，立减1400元

## 讲师

* [杜金房](http://about.me/dujinfang)（[@SevenDu](http://weibo.com/dujinfang)）：

FreeSWITCH-CN创始人，北京信悦通科技有限公司，技术总监。2008年开始研究FreeSWITCH，在语音通讯及软交换领域中具有丰富的研发及应用经验，参加了[ClueCon 2011](http://www.cluecon.com/2011/)及[ClueCon 2012](http://www.cluecon.com/2011/)大会。

## 内容

### FreeSWITCH高手速成培训课程

    课程目标：

    本课程使你快速加入到FreeSWITCH高手的行列，您是否考虑过以下问题：
    1.我想快速熟悉FreeSWITCH的系统框架和主要功能？
    2.FreeSWITCH有什么最新的技术升级和未来路线的规划？
    3.FreeSWITCH是否可以助力公司现有的产品功能？
    4.FreeSWITCH已经帮助哪些行业和哪些公司解决了什么问题？
    5.FreeSWITCH为什么用于高效的并发处理能力？

    通过本培训，能使你快速认识FreeSWITCH，带你从0开始打造一个企业PBX通信系统。
    从一个没有FreeSWITCH甚至没有通信基础的新手成为一个合格的企业PBX管理员，
    所有的功能都是用你自己的双手创建的。我们会通过大量的实际操作帮助你理解和掌握
    完成该任务所需的所有概念和技能。有经验的学员也可以更加深入的了解FreeSWITCH，
    把以前不太听话的FreeSWITCH用起来得心应手！

    当然，最重要的，你会明白它如何能帮助你的职业生涯或你的企业发展。

    培训大纲：
    
    1. 快速了解FreeSWITCH
        什么是FreeSWITCH？谁在使用FreeSWITCH？
        打第一个电话
        为什么需要注册？它是如何工作的
        添加一个分机
        添加网关拨打外部电话
        创建一个新的IVR，并将来话路由到IVR
    2. 让基础知识更扎实一些
        通信简史
        UA、载体、信令和媒体
        PSTN与VoIP
        早期媒体与呼叫流程
        PBX与B2BUA
        通信网
    3. 认识FreeSWITCH的基本概念及关键协议
        基本概念 - SIP UA、代理、重定向服务器、B2BUA、SBC、SIP、RTP
        SIP注册
        单腿呼叫
        桥接的呼叫
        语音编码与协商
        视频呼叫
        NAT
    4. 让貌似繁琐的配置简单和有趣
        FreeSWITCH架构
        配置架构
        用户目录
        Channel、Call、API与APP
        呼叫字符串，使用API发起呼叫
        使用APP来处理呼叫
        高级 originate API使用
        重要的sofia配置参数
        Dialplan/正则表达式
        默认配置简介与实例
        企业通信功能 - 呼叫转移，同组代答，录音、同振、顺振
        更改主、被叫号码
     

### FreeSWITCH实战培训课程

    课程目标：

    本课程使您更加深入的了解FreeSWITCH核心技术及学到更多的案例分享，您是否考虑过：
    1.我如何自己编写一个FreeSWITCH模块，为自己产品高效专用？
    2.FreeSWITCH最新的技术升级和未来路线能给我带来什么高效的解决方案？
    3.FreeSWITCH的HA及负载分担全套解决方案？
    4.FreeSWITCH在各行业中的技术解决方案有哪些？
    5.FreeSWITCH的实际案例如何实施的？
    总之，我们帮助你更多更深入的了解FreeSWITCH的实战信息。
         
    培训大纲：

    1.FreeSWITCH基本概念回顾
        SIP UA
        Channel
        Call
        Early Media
        API/APP
        Channel Variable
        DialString
    2.Dialplan 深入剖析 
        Context概念，从哪里来，到哪里去。
        路由 - 解析与执行
        使用 xml_curl 提供dialplan
        Channel Variables
        两台FreeSWITCH级连
        在一台机器上启动两个FreeSWITCH实例
        Best Practise，调试与排错 
    3.嵌入式脚本开发 
        Lua 基础
        使用Lua提供IVR
        用Lua获得用户输入
        Javascript 例子 
    4.Event Socket 
        inbound
        outbound
        ESL
        使用时候该用inbound，什么时候用outbound
        Java、C#、Erlang
    5.自己动手写一个FreeSWITCH模块 
        源代码导读
        mod_vod
        mod_shine 
        为FreeSWITCH提交Bug，给FreeSWITCH 打补丁，为开源社区做贡献。

## 联系方式

    联系人：胡亚利
    邮件：freeswitch@x-y-t.com
    电话：(010) 5719-5865  186-0064-0235

## 注意事项

* 实战课程学员赠《FreeSWITCH: VoIP实战》一本，高手速成课程学员不赠；
* 建议大家携带笔记本电脑，这可是实战课啊 ：） 
* 培训时间为两天，总费用为3800元，请尽快注册以得到更多折扣；
* 注册时留下详细的联系方式，我们会有专人联系你付款；
* 退款需收取20%管理费。
