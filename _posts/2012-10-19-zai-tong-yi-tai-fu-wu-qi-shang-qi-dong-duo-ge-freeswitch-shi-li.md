---
layout: default
title: "在同一台服务器上启动多个 FreeSWITCH 实例"
---

# {{ page.title }}

有时候，需要用到多个FreeSWITCH进行测试，或者需要在一台服务器上部署多个“不兼容”的系统。我们在这一节探讨一下怎么做。

## 背景故事 ##

几年前我还在Idapted工作的时候，由于需要连接Skype及Google Talk。就曾经做过这样的部署（如下图，附录中也有）。
             
                           |--- PSTN gateways
    /-------\              |--- FS-skype
    | FS    |--------------|--- FS-gtalk
    \-------/              |--- FS-skype2
                           |--- more ...

当时主要的考虑是Skype(mod\_skypiax，后来改名为mod\_skypopen)模块不太稳定，所以我们把带Skype的FreeSWITCH启动到另一个实例，这样就避免了由于Skype模块崩溃影响所有业务。后来，我们在这上面又做了扩展，即再启动一个带Skype的实例。对于主的FreeSWITCH而言，他们就相当于两个Skype网关。平时可以负荷分担的工作，其中一个崩溃，另一个也可以正常工作，起到了HA（High Availability，高可用）效果。

后来我们又启到了一个带mod\_dingaling的FreeSWITCH实例，用于跟Google Talk互通。除了当时mod\_dingaling也有点稳定性问题外，我们主要是为了让呼叫处理更方便，如，不管是呼叫什么用户，呼叫字符串都是 sofia/gateway/<gateway-name>，编程就方便了许多。

## 练习 ##

闲话少叙，我们今天虽不能复现当时的场景，但基本概念是差不多的。我们今天的练习就是在同一机器上启动两个FreeSWITCH实例而互相不冲突，甚至，可以用各种方式互通。

我们都知道FreeSWITCH默认的配置文件在 /usr/local/freeswitch/conf。这里假设第一个实例已启动并正确运行。

首先，我们要复制一份新的环境（放到freeswitch2目录中，以下的操作都在该目录中）：

    mkdir /usr/local/freeswitch2
    cd /usr/local/freeswitch2
    cp -R /usr/local/freeswitch/conf .
    mkdir log
    mkdir db
    ln -sf ../freeswitch/sounds .

其中第1行创建一个新目录，第3行把旧的配置文件复制过来，第4、5行分别创建log和db目录，最后一行做个符号链接，确保有正确的声音文件。

然后，需要修改一些配置以防止端口冲突。第一个要修改的是 conf/autoload\_configs/event_socket.conf.xml，把其中的8021改成另一个端口，比方说9021。

修改 conf/vars.xml，把其中的5060,5080也改成其它的，如7060,7080。

默认的这样就行了，当然如果你还加载了其它的模块，注意要把可能引起冲突的资源都改一下。比如因为我用到 mod\_erlang 模块，我就需要改autoload\_configs/erlang_event.conf.xml中的listen-port和nodename。

下面我们可以启动试试了：

    cd /usr/local/freeswitch2/
    /usr/local/freeswitch/bin/freeswitch -conf conf -log log -db db

以上命令分别用 -conf、-log、-db 指定新的目录。启动完成后将进入控制台。如果想使用 fs\_cli，则可以打开另外一个终端窗口，连接（还记得我们把端口改成9021了吧？）：

    /usr/local/freeswitch/bin/fs_cli -P 9021

找个软电话注册到7060端口试试，比如我用Xlite注册的地址就是 192.168.1.100:7060。

## 进阶 ##

当然，上面的两个FreeSWITCH实例都运行的同一份代码。有时候，你还可能运行两个不同版本的FreeSWITCH。你可以在编译的时候指定一个不同的安装目录，如：

    ./configure --prefix=/opt/freeswitch
    make && make install

这样就可以将FreeSWITCH安装到/opt/freeswitch目录中，如果执行 /opt/freeswitch/bin/freeswitch，它就默认使用 /opt/freeswitch/conf 下面的配置文件，我们也不需要再copy一份了。

当然，如果需要两个实例同时运行，你还是要改其中一个的某些端口，以避免冲突。改完后运行：

    /opt/freeswitch/bin/freeswitch

真好玩。

## 让两个实例相互通信？ ##

我记得已经写过了，看《[多台 FreeSWITCH 服务器级联](/blog/past/2012/3/28/duo-tai-freeswitch-fu-wu-qi-ji-lian/)》一节。

### 小结 ###

通过本节，相信你对FreeSWITCH配置文件、运行方式、及 fs\_cli 等工具又多了一层认识。当然，即使你不需要启动多个实例，相信也能从这一节学到一些有用的东西。

