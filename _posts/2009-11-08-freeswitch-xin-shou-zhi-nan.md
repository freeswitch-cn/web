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

关于Linux平台，开发者大部分使用 Debian，你也可以使用 CentOS，也有人使用 Ubuntu 或 BSD 系列。

在某些平台上，有已经编译好的安装包，但最好是自己下载源代码编译。如果你提交BUG时，他们也只对Git master中的代码提供支持。

下载地址： <http://files.freeswitch.org>

由于 FreeSWITCH 更新非常快，请自己查找最新的版本，如，截止2014年6月5日，最稳定的发行版是：[1.4.6](http://files.freeswitch.org/freeswitch-1.4.6.tar.gz)

你可能想试一下[一分钟速成](/2014/07/28/FreeSWITCH-sucheng.html) 这么爽的事。

Git代码库：

    git clone https://stash.freeswitch.org/scm/fs/freeswitch.git

安装前需要的软件：

在不同的平台上，依赖不同的包，如：

CentOS:

    yum install -y subversion autoconf automake libtool gcc-c++ ncurses-devel make

Ubuntu:

    apt-get -y install build-essential subversion automake autoconf wget libtool libncurses5-dev

你最好参考一下 <http://www.freeswitch.org.cn/Makefile> 以确定你的平台上应该安装哪些包。当然，该文件不是永远能保证最新的。

编译安装：

    ./bootstrap.sh
    ./configure
    make
    make install

当然，你也可以尝试以下命令安装（但你最好弄明白那个Makefile是什么意思）：

    cd /tmp && wget http://www.freeswitch.org.cn/Makefile && make

详见：[Installation Guide](http://wiki.freeswitch.org/wiki/Installation_Guide)和[Getting Started Guide](http://wiki.freeswitch.org/wiki/Getting_Started_Guide).


配置：FreeSWITCH缺省的配置是作为一个Home PBX来运行，你可以先用它来试验各种功能。等熟悉了以后再进行高级的配置与开发。

[wiki.freeswitch.org](http://wiki.freeswitch.org)是英文文档的大本营，如果你的英文不错的话，是需要好好阅读的地方。你也可以在wiki上注册账号，修改你认为不正确的页面或添加你自己的内容。

[wiki.freeswitch.org.cn](http://wiki.freeswitch.org.cn)是一些中文爱好者维护的中文文档，主要从官方文档翻译过来。

FreeSWITCH社区成员都很友好，你可以通过[邮件列表（英文）](lists.freeswitch.org)，[IRC](http://wiki.freeswitch.org/wiki/IRC)等获取帮助和交流经验。

[Pastebin](http://pastebin.freeswitch.org/)是一个专供粘贴配置、debug、log等文本信息的地方，用户名和密码分别是 pastebin 和 freeswitch（其实人家已经告诉你了）。提交问题时，先把相关log、出错信息等贴完后再把对应的链接发到邮件列表或IRC，就可以让别人帮你看一看是哪儿出错了。

[Jira](https://freeswitch.org/jira/secure/Dashboard.jspa)是FreeSWITCH的缺陷跟踪工具，详情请参阅[Reporting Bugs]( http://wiki.freeswitch.org/wiki/Reporting_Bugs)

获取中文帮助信息，请加入[FreeSWITCH-CN Google Group](http://groups.google.com/group/freeswitch-cn)（免费）。为了得到及时有效的帮助，请在发帖前仔细读一下[橡皮鸭子问题](/2012/09/21/jie-jue-xiang-pi-ya-zi-wen-ti.html)。

QQ 群 190435825 中也有好多热心的网友，同样，为了得到更好的帮助，仔细阅读橡皮鸭子问题。

邮件列表和群里面的网友都很好，如果不是特别必要，请尽量不要往私人邮箱发邮件和在QQ上发起私聊，因为：

- 对方可能正在忙，相反，如果你发到公共列表或群里，更多的网友能看见，就有更多的机会得到帮助。
- 对方可能对你提的问题不专业。相反，如果你发到公共列表或群里，更多的网友能看见，就有更多的机会得到帮助。
- 你这样做可能不是很礼貌。

使用邮件列表的好处：

邮件列表中的消息是异步的，这意味着，你的问题可能总会有人看到并给你答案。相反，如果你在QQ群中提问一个问题，这时候知道答案的人正好不在，而等他回来的时候你已经下线了。

另外，[FreeSWITCH知乎专栏](http://zhuanlan.zhihu.com/freeswitch)上的文章或许对你有用，尤其是这一篇<http://zhuanlan.zhihu.com/freeswitch/19648543>。

还没有加FreeSWITCH-CN微信公共账号的，扫一扫右侧的二维码或许对你有用，里面会不定期地发布关于FreeSWITCH的知识。

如果你还有问题又想深入学习FreeSWITCH，[《FreeSWITCH权威指南》](http://book.dujinfang.com)这本书可能适合你。

