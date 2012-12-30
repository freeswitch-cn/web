---
layout: post
title: "FreeSWITCH 官方的第一本书出版了"
---

# {{ page.title }}

FreeSWITCH 官方日前出版了第一本书。作者是　Anthony Minessale、 Michael S. Collins 和　Darren Schreiber。

该书的全名是：　FreeSWITCH 1.0.6　- Build robust high performance telephony systems using FreeSWITCH (使用 FreeSWITCH 构建高性能电话系统)

热心的读者可以从以下地址购买，PDF版的现在是　$25.59。

<https://www.packtpub.com/freeswitch-1-0-6-build-robust-high-performance-telephony-systems/book>

笔者日前已拿到了电子书 PDF 版，下面共享一下前言部分：


In 1999, the first shot of the telephony revolution was fired when the Asterisk PBX was released to the world. In the ensuing decade, open source telephony took the world by storm, lead by Asterisk and a host of other software packages such as OpenSER and YATE.

In 2006, an Asterisk developer named Anthony Minessale announced an ambitious project: a new telephony software engine, built from the ground up. Some thought this was crazy considering the wild success of the Asterisk platform. However, Anthony's vision was to create a telephony platform unlike any in existence—open source or proprietary. In May 2008, this new project reached a critical milestone with the release of FreeSWITCH 1.0.0.

Now that FreeSWITCH has been available for several years, some developers have migrated from Asterisk to FreeSWITCH. Others have added FreeSWITCH to an existing environment, having it work together with Asterisk, OpenSER, OpenSIPS, Kamailio, and other telephony applications.

Is FreeSWITCH right for you? The correct answer is, of course: It depends. When people ask the FreeSWITCH developers which telephony software they should use, the developers always reply with another correct answer: Use what works for your situation. To know the answer you will need to investigate further.

## What FreeSWITCH is and what it is not

FreeSWITCH is a scalable softswitch. In practical terms this means that it can do anything a traditional PBX can do and much more. It can (and does) act as the core switching software for commercial carriers. It can scale up to handle thousands of simultaneous calls. It can also scale down to act as a simple softphone for your laptop or personal computer. It can also work in a cluster of servers.

FreeSWITCH is not a proxy server. If you need proxy server functionality, then consider OpenSIPS, Kamailio, or other similar software. FreeSWITCH is a back-to-back user agent or B2BUA. In this regard, it is similar to Asterisk and other IP PBX software.

## Version and licensing

At the time of this writing this book, the FreeSWITCH developers were putting the finishing touches on FreeSWITCH version 1.2. While the examples presented in this book were specifically tested with version 1.0.6, they have also been confirmed to work with the latest FreeSWITCH development versions that form the basis of version 1.2. Do not be concerned about the fact that this material does not cover version 1.2—it certainly does. The FreeSWITCH user interface is very stable between versions; therefore, this text will be applicable for years to come.

FreeSWITCH is released under the Mozilla Public License (MPL) version 1.1. Since FreeSWITCH is a library that can be implemented in other software applications and projects, the developers felt it important to strike a balance between the extremely liberal BSD license and the so-called "viral" GPL. The MPL fits this paradigm well and allows businesses to create commercial products based on FreeSWITCH without licensing concerns.

However, what about using FreeSWITCH with GPL-based software? It should suffice if we said that the developers wanted to make sure that anyone, including proprietary and GPL-based software users, could use FreeSWITCH. The powerful event socket gives us this functionality—a simple TCP socket-based interface that allows an external program to control FreeSWITCH. Regardless of the license you may be using for your own software, you can still connect to a FreeSWITCH server without any licensing issues.

## What this book covers

* Chapter 1, Architecture of FreeSWITCH gives a brief, but thorough introduction to the underlying architecture of FreeSWITCH.

* Chapter 2, Building and Installation shows how to download and install FreeSWITCH on Windows and Unix-like operating systems.

* Chapter 3, Test Driving the Default Configuration provides a hands-on look at the powerful and feature-rich default FreeSWITCH configuration.

* Chapter 4, SIP and the User Directory offers an introduction to the concept of users and the directory as well as brief look at SIP user agents.

* Chapter 5, Understanding the XML Dialplan explains the basics of creating and editing Dialplan extensions to add advanced functionality to a FreeSWITCH install.

* Chapter 6, Using the Built-In XML IVR Engine discusses how to create menus and sound phrases for interacting with callers.

* Chapter 7, Building IVR Applications with Lua introduces the concept of advanced call handling using the lightweight scripting language Lua.

* Chapter 8, Advanced Dialplan Concepts builds upon the foundation laid in Chapter 5 and shows how to handle more challenging routing scenarios.

* Chapter 9, Controlling FreeSWITCH Externally introduces the incredibly powerful Event Socket and the Event Socket library that can be used to access and control a FreeSWITCH server.

* Chapter 10, Advanced Features and Further Reading highlights some of the more powerful FreeSWITCH features like conferencing and offers some ideas on where to learn more about FreeSWITCH.

* Appendix A, The FreeSWITCH Online Community gives a brief introduction to the worldwide online community and the tools used to stay in contact.

* Appendix B, The History Of FreeSWITCH is a description of how FreeSWITCH came to be from one of the authors, Anthony Minessale.

## Who this book is for
This book is for prospective FreeSWITCH administrators as well as enthusiasts who wish to learn more about how to set up, configure, and extend a FreeSWITCH installation. If you are already using FreeSWITCH, you will find that the information in this book compliments what you have already learned from your personal experience.

A solid understanding of basic networking concepts is very important. Previous experience with VoIP is not required, but will certainly make the learning process go faster.
