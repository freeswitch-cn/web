---
layout: default
title: "FreeSWITCH 第二本书 FreeSWITCH CookBook 出版了"
---

# {{ page.title }}

这是 FreeSWITCH 官方出版的第二本书。电子版打折后一共是 £9.59。可以直接顺着 FreeSWITCH 网站上的链接购买，也可以在 Amazon 上购买。有 Visa 或 MasterCard 信用卡付费就可以了。

详细信息：

<http://www.freeswitch.org/node/381>

其实我2年前开始写的 《FreeSWITCH: VoIP 实战》目的也是多提供一些实例，给官方的第一本书作一个补充。只是由于平时很忙到现在也没有完成。现在官方的书出来了，我觉得还是值得一读的。好了，废话少说，今天刚拿到手还没来得及看，先把目录贴上来大家尝尝鲜：

<code>
Table of Contents

Preface	1

Chapter 1: Routing Calls
	Introduction
	Internal calls
	Incoming DID calls
	Outgoing calls
	Ringing multiple endpoints simultaneously
	Ringing multiple endpoints sequentially (simple failover)
	Advanced multiple endpoint calling with enterprise originate
	Time of day routing
	Manipulating To: headers on registered endpoints to reflect DID numbers

Chapter 2: Connecting Telephones and Service Providers
	Introduction
	Configuring a SIP phone to register with FreeSWITCH
	Connecting audio devices with PortAudio
	Using FreeSWITCH as a softphone
	Configuring a SIP gateway
	Configuring Google Voicc
	Codec configuration

Chapter 3: Processing Call Detail Records
	Introduction
	Using CSV CDRs
	Using XML CDRs
	Inserting CDRs into a backend database
	Using a web server to handle XML CDRs
	Using the event socket to handle CDRs

Chapter 4: External Control	63 Introduction
	Getting familiar with the fs_cli interface
	Setting up the event socket library
	Establishing an inbound event socket connection
	Establishing an outbound event socket connection
	Using fs_ivrd to manage outbound connections
	Filtering events
	Launching a call with an inbound event socket connection
	Using the ESL connection object for call control
	Using the built-in web interface

Chapter 5: PBX Functionality
	Introduction
	Creating users
	Accessing voicemail
	Company directory
	Using phrase macros to build sound prompts
	Creating XML IVR menus
	Music on hold
	Creating conferences
	Sending faxes
	Receiving faxes
	Basic text-to-speech with mod_flite
	Advanced text-to-speech with mod_tts_commandline
	Listening to live calls with telecast
	Recording calls
</code>


补充：请大家不要向我索要这本书。我买到第一本书的时候就有人到处散播说我有本书不愿意分享。且不说电子书每一页上都写着我的名字，即使用没有，我也总归有点版权意识。况且这些年来我的书写了一半，被好多人到处转载，而没有遵循知识共享版权协议。而且转载后大部分都没有进行格式排版，以至于面目全非，影响读者阅读。更甚者，前两天我看到有人传到百度文库上赚积分。如果你是这个人，请速删除此文。要不然，过几天我该找找百度了。
