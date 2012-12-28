---
layout: default
title: "Event Socket"
---

# {{ page.title }}

# 第十章 Event Socket

相信好多读者都已经等待本章好久了。Event Socket 是操控 FreeSWITCH 的瑞士军刀。它可以通过 Socket 使用FreeSWITCH提供的所有 App 和 API函数。由于使用 Socket, 它几乎可以跟任何语言开发的程序通信（只要它支持Socket），也就是说，它几乎可以跟任何系统进行集成。

FreeSWITCH 使用 [swig](http://www.swig.org/) 来支持多语言。简单来讲，FreeSWITCH用C语言写了一些库函数，通过swig包装成其它语言接口。现在已知支持的语言有 C、 Perl、 Php、 Python、 Ruby、 Lua、 Java、 Tcl、以及由 managed 支持的 .Net 平台语言如 C#, VB.NET 等。

值得一提的是，Event Socket 并没有提供什么新的功能，它只是提供了一个开发接口，所有的通道处理及媒体控制还都是由 FreeSWITCH 提供的 App 和 API 来完成的。当然，读到这里没有必要失望，我这么说只是希望读者能更专注于这个**接口**的概念，以便更好地理解这里的逻辑。

## 架构

[Event Socket](http://wiki.freeswitch.org/wiki/Event_Socket) 有两种模式，内连（inbound）模式和外连（outbound）模式。注意，这里所说的内外是针对 FreeSWITCH 而言的。


#### C 客户端示例

在源代码目录 libs/esl/ 有个 test_client.c ，运行它后会使用 inbound 模式连接 FreeSWITCH。

<pre>
int main(void)
{
        // 初始化 handle
        esl_handle_t handle = {{0}};

        // 连接服务器，如果成功 handle  就代表这个连接了，参数意义都很明显
        esl_connect(&handle, "localhost", 8021, NULL, "ClueCon");

        // 发送一个命令，并接收返回值
        esl_send_recv(&handle, "api status\n\n");

        // last_sr_event 应该是 last server response event，即针对上面命令的响应
        // 如果在此之前收到事件（在本例中不会，因为没有订阅），事件会存到一个队列里，不会发生竞争条件

        if (handle.last_sr_event && handle.last_sr_event->body) {
                // 打印返回结果
                printf("%s\n", handle.last_sr_event->body);
        } else {
                // 对于 api 和 bgapi 来说（上面已经将命令写死了），应该不会走到这里；
                // 但其它命令可能会到这里
                printf("%s\n", handle.last_sr_reply);
        }

        // 断开连接
        esl_disconnect(&handle);
        return 0;
}
</pre>

#### C 服务器示例

同样的目录中有一个 testserver.c，运行于 *outbound* 模式，它是多线程的，每次有电话进来时，通过 *dialplan* 路由到 *socket*，FreeSWITCH 便向它发起一个连接

我们先从 *main()* 函数开始看。第 n 行把 log 级别开到最大，这样能看到详细的 log，包括所有协议的细节。 然后它通过 *esl\_listen\_threaded 启动一个 socket 监听 8084 端口。如果有连接到来时，它便回调 *mycallback* 函数。

