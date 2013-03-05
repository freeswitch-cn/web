---
layout: post
title: "FreeSWITCH WebRTC 支持进展"
---

# {{ page.title }}

互联网已进入 HTML5 时代，而[WebRTC](http://www.webrtc.org/)技术对于主导将来的语音、视频多媒体通信是非常令人期待的。当前，sipml5 已加入了对 WebRTC 的支持，而 FreeSWITCH 对 WebRTC 的支持也已得上日程。在  Google 将 iSAC 语音编码开源后，FreeSWITCH 就迅速加入了对它的支持。几个月前，开发人员就提交了一个 mod_html5 的模块，被认为是最早支持 WebRTC 的迹象，后来，又加入了一个 libcc 库似乎是研究独立处理 SDP 的可行性。由于 WebRTC 协议要求必须是加密的，因此 FreeSWITCH 底层需要做不小的改动。今天，Michael Jerris 提交了 sofia 协议栈的 RTP/SAVPF 支持，看来万事俱备，只欠东风了。

<http://fisheye.freeswitch.org/changelog/freeswitch.git?cs=41b2ce51d2743117459bf19970d91f18f1692866>

更新201302：来自官方网站的剧透：<http://www.freeswitch.org/node/437>。
