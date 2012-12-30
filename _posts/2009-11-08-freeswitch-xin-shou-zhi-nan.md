---
layout: post
title: "FreeSWITCH 新手指南"
---

# {{ page.title }}

FreeSWITCH的官方网站是 [www.freeswitch.org](http://www.freeswitch.org)。

FreeSWITCH最理想的运行平台是64位的Linux，如果你坚持使用Windows，可以到[files.freeswitch.org](http://files.freeswitch.org) 下载已编译好的安装包。如果你有Visual Studio的开发环境，也可以下载源代码自己编译。

在某些平台上，有已经编译好的安装包，但最好是自己下载源代码编译。如果你提交BUG时，他们也只对SVN trunk中的代码提供支持。

稳定的发行版是：

[freeswitch-1.0.4.tar.bz2](http://files.freeswitch.org/freeswitch-1.0.4.tar.bz2)
[freeswitch-1.0.4.tar.gz](http://files.freeswitch.org/freeswitch-1.0.4.tar.gz)

[freeswitch-1.0.5.tar.bz2](http://files.freeswitch.org/freeswitch-1.0.5.tar.bz2)
[freeswitch-1.0.5.tar.gz](http://files.freeswitch.org/freeswitch-1.0.5.tar.gz)
将于11月10日发布。

SVN代码树：

<code>svn co http://svn.freeswitch.org/svn/freeswitch/trunk freeswitch</code>

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

FreeSWITCH社区成员都很友好，你可以通过[邮件列表（英文）](lists.freeswitch.org)，[IRC](http://wiki.freeswitch.org/wiki/IRC)等获取帮助和交流经验。

[PasteBin](http://pastebin.freeswitch.org/)是一个专供粘贴配置、debug、log等文本信息的地方，用户名和密码分别是 pastebin 和 freeswitch。提交问题时，先把相关log、出错信息等贴完后再把对应的链接发到邮件列表或IRC，就可以让别人帮你看一看是哪儿出错了。

[Jira](jira.freeswitch.org)是FreeSWITCH的缺陷跟踪工具，详情请参阅[Reporting Bugs]( http://wiki.freeswitch.org/wiki/Reporting_Bugs)

获取中文帮助信息，请加入[FreeSWITCH-CN Google Group](http://groups.google.com/group/freeswitch-cn)。发帖前请参阅[在邮件列表中发帖的约定](http://groups.google.com/group/freeswitch-cn/web/%E5%9C%A8%E9%82%AE%E4%BB%B6%E5%88%97%E8%A1%A8%E4%B8%AD%E5%8F%91%E5%B8%96%E7%9A%84%E7%BA%A6%E5%AE%9A)。
