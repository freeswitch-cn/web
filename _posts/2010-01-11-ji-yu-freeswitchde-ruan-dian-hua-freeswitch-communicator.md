---
layout: default
title: "基于FreeSWITCH的软电话 - FreeSWITCH Communicator"
---

# {{ page.title }}


FreeSWITCH团队日前宣布了一款新的基于FreeSWITCH的软件：FreeSWITCH Communicator - 它是一款以FreeSWITCH为内核的软电话。该项目的负责人João Mesquita是FreeSWITCH社区一位非常活跃的用户和开发者。

什么是软电话？
-------- 
当问到João Mesquita开发这一新项目的动机时，他回答说目前没有一款真正“开源、跨平台、并且非常稳定的”软电话，当想到如何在项目中使用libfreeswitch库时，做一个软电话是很自然的选择。目前，关于FreeSWITCH的可伸缩性有很多讨论。说到“伸缩性”人们往往更侧重于“伸”，但FreeSWITCH communicator会告诉我们“缩”同样有用。

使用FreeSWITCH的另一优势是它支持非常多的、免费的语音编解码。试想一下，这款软电话能支持Siren, CELT, G.711, G.722, BroadVoice 16 and 32以及iLBC、SpeeX等众多其它的编解码。而且，由于很强的跨平台性，它可以用于Linux, Mac OSX, 和Windows等平台。

FreeSWITCH COMMUNCATOR内部是如何实现的，它如何工作？
--------

它的目标是一个跨平台的软电话，因此必须选择一个跨平台的GUI开发环境。João说选择的空间其实很有限，而且，对于该项目来说，更没有其它选择：就使用Nokia的Qt。Qt工具箱像FreeSWITCH一样支持[非常多的平台](http://doc.trolltech.com/4.6/supported-platforms.html)。FreeSWITCH Communicator项目则致力于支持最主流的三大平台：Linux, MacOSX和Windows。
 
该软电话使用FreeSWITCH的[softphone](http://svn.freeswitch.org/svn/configs/softphone/)配置文件，声音模块使用mod_portaudio，SIP interface模块则使用mod_sofia。所有支持的语音编解码都可编译包含在内。该项目会支持未来的所有语音编码（以FreeSWITCH作为语音引擎的另一原因是 - 对新的语音编解码和新特性的支持可以非常快的加入）。

我如何对该项目提供帮助？
-------- 

像众多开源项目一样，帮助社区的方式有很多。现在最重要的事情是去下载代码来编译和使用它。关于使用FreeSWITCH Communicator更多的信息可以在[wiki](http://wiki.freeswitch.org/wiki/FSComm)上找到。João会非常耐心地听取关于编译和使用FreeSWITCH Communicator的建设性的意见。当然，你也可以写新的wiki文档，包括编译及运行的how-to信息等。有编程经验的人也可以帮助编写代码和Doxygen标记。如果你善长图像处理、艺术或UI设计，那么你的设计肯定可以让FreeSWITCH Communicator更炫。。如果你想提供帮助，请联系João，它的IRC是: jmesquita。

再一次感谢João Mesquita以及其它社区成员对这一开源电话软件的贡献，请再接再励！

新闻来源：<http://www.freeswitch.org/node/226>
