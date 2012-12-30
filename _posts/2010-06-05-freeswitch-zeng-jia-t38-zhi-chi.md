---
layout: post
title: "FreeSWITCH  增加 T.38 支持"
---

# {{ page.title }}

FreeSWITCH GIT 版本库中已加入 T.38 支持，将包含在下一个发布版本 1.0.7 中。

旧的 mod_fax 以及很多编解码实现现在都合并进了一个新的 mod_spandsp 模块。该模块得益于 spandsp 库中所有的 DSP 特性，包括 T.38 支持。

T.38 的全称是 “Procedures for Real-Time Group 3 Facsimile Communication Over IP” ，它是一种在 VoIP 上传送传真的协议。


来自：<http://www.freeswitch.org/node/264>

参见：

* <http://en.wikipedia.org/wiki/T.38>

* <http://www.soft-switch.org/>
