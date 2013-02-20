---
layout: post
title: "FreeSWITCH 新手指南"
tags:
  - "freeswitch"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


FreeSWITCH的官方网站是 [www.freeswitch.org](http://www.freeswitch.org)。

FreeSWITCH最理想的运行平台是64位的Linux，如果你坚持使用Windows，可以到[files.freeswitch.org](http://files.freeswitch.org) 下载已编译好的安装包。如果你有Visual Studio的开发环境，也可以下载源代码自己编译。

关于Linux平台，开发者大部分使用 CentOS，也有很多人使用 Debian，也有人使用 Ubuntu。

在某些平台上，有已经编译好的安装包，但最好是自己下载源代码编译。如果你提交BUG时，他们也只对git master 及 stable 分支中的代码提供支持。

下载地址： <http://files.freeswitch.org>

由于 FreeSWITCH 更新非常快，请自己查找最新的版本，如，截止2013年2月20日，最稳定的发行版是：

[freeswitch-1.2.5.tar.bz2](http://files.freeswitch.org/freeswitch-1.2.5.tar.bz2)

git代码库：

<code>git clone git@git.freeswitch.org/freeswitch.git</code>

安装前需要的软件：

<code>
CentOS: yum install -y subversion autoconf automake libtool gcc-c++ ncurses-devel make

Ubuntu: apt-get -y install build-essential subversion automake autoconf wget libtool libncurses5-dev
</code>


编译安装：

<code>
./bootstrap
./configure
make install
</code>

详见：[Installation Guide](http://wiki.freeswitch.org/wiki/Installation_Guide)和[Getting Started Guide](http://wiki.freeswitch.org/wiki/Getting_Started_Guide).

配置: FreeSWITCH缺省的配置是作为一个Home PBX来运行，你可以先用它来试验各种功能。等熟悉了以后再进行高级的配置与开发。

[wiki.freeswitch.org](http://wiki.freeswitch.org)是英文文档的大本营，如果你的英文不错的话，是需要好好阅读的地方。你也可以在wiki上注册账号，修改你认为不正确的页面或添加你自己的内容。

[wiki.freeswitch.org.cn](http://wiki.freeswitch.org.cn)是一些中文爱好者维护的中文文档，主要从官方文档翻译过来。

FreeSWITCH社区成员都很友好，你可以通过[邮件列表（英文）](lists.freeswitch.org)，[IRC](http://wiki.freeswitch.org/wiki/IRC)等获取帮助和交流经验。

[PasteBin](http://pastebin.freeswitch.org/)是一个专供粘贴配置、debug、log等文本信息的地方，用户名和密码分别是 pastebin 和 freeswitch。提交问题时，先把相关log、出错信息等贴完后再把对应的链接发到邮件列表或IRC，就可以让别人帮你看一看是哪儿出错了。

[Jira](jira.freeswitch.org)是FreeSWITCH的缺陷跟踪工具，详情请参阅[Reporting Bugs]( http://wiki.freeswitch.org/wiki/Reporting_Bugs)

获取中文帮助信息，请加入[FreeSWITCH-CN Google Group](http://groups.google.com/group/freeswitch-cn)（免费）。为了得到及时有效的帮助，请在发帖前仔细读一下[橡皮鸭子问题](/2012/09/21/jie-jue-xiang-pi-ya-zi-wen-ti.html)。

QQ 群 190435825 中也有好多热心的网友，同样，为了得到更好的帮助，仔细阅读橡皮鸭子问题。

邮件列表和群里面的网友都很好，如果不是特别必要，请尽量不要往私人邮箱发邮件和在QQ上发起私聊。
