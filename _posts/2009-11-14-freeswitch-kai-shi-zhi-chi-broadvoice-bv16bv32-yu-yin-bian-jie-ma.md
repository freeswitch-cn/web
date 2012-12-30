---
layout: post
title: "FreeSWITCH 开始支持 Broadvoice BV16/BV32 语音编解码"
---

# {{ page.title }}

FreeSWITCH团队宣布支持开源的BroadVoice语音编解码--窄带8kKZ的BV16和宽带16kHZ的BV32。

BroadVoice2.1使用LGPL（Lesser General Public License）发布，完全免费，因而被广泛使用在许多开源的电话系统中。

BV16和BV32编码质量很高，特点有：
 

    * 低延迟 - 只有5毫秒
    * 低CPU使用率 - 与ITU编码相比，可节省1/2到1/3的CPU
    * 高质量 - 与其它编码相比，有较好的MOS得分
    * 适当的比特率 - 编码效率很高

Bradvoice编码是自去年以来第三个加入FreeSWITCH的高清语音编码，其它两个免费、高质量的语音编码是CELT和G.722。

来自：[freeswitch.org](http://freeswitch.org/node/217)
