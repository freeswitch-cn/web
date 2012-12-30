---
layout: post
title: "FreeSWITCH 增加 iSAC 语音编码支持"
---

# {{ page.title }}

刚看到 FreeSWITCH 增加了对 iSAC 语音编码的支持。

[iSAC](http://en.wikipedia.org/wiki/Internet_Speech_Audio_Codec) 语音编码是由 Global IP Solutions 开发的语音编码，已经应用于 [WebRTC](http://www.webrtc.org/)项目，另外，据说也已经应用于 Skype 及 QQ 上。

众所周知，Global IP Solutions 开发了很多牛X的语音编码，如 iLBC等，它们的主要特点就是在因特网上丢包比较严重的情况下仍能保持比较好的语音质量。随着该公司在 2011 年 1 月份被 Google 收购，很多东西就理所当然的开源了。

该编码来源于 WebRTC 项目，我已经下载编译了没任何问题，还没来得及试用，详细情况见这里：<http://freeswitch.org/node/376>。
