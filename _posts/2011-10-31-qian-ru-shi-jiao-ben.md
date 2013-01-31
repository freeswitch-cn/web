---
layout: post
title: "嵌入式脚本"
tags:
  - "book"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


前面已经说了，FreeSWITCH  支持使用你喜欢的各种程序语言来控制呼叫流程。你不仅可以用它们写出灵活多样的IVR，给用户带来更好的体验，更重要的是你可以通过它们很好地与你的业务进行无缝集成，以节省你的后台业务处理及管理成本。

使用程序语言来做这些事情有两种方式：第一种是嵌入式脚本，第二种是独立的程序。如果使用后者，理论上讲，你可以使用任何你喜欢的语言，只要该语言支持 TCP Socket。关于使用  Socket 方式来控制 FreeSWITCH 的编程方法我们将在下一章讲解。本章主要关注嵌入式脚本。

## 什么是嵌入式脚本？

其实前面我们学到的 XML dialplan 已经体现了其非凡的配置能力，它配合 FreeSWITCH  提供的各种 App 也可以认为是一种脚本。当然，毕竟 XML 是一种描述语言，功能还有限。FreeSWITCH  通过嵌入其它语言的解析器支持很多流行的编程语言。

一般来说，编程语言分为两种：编译型语言（如C）和解释型语言（如 javascript，perl 等）。使用解释型语言编写出来的脚本不需要编译，因而非常灵活方便。典型地，FreeSWITCH 支持的语言有：

* Lua
* Javascript
* Python
* Perl
* Java

其它脚本语言如 Php, Ruby 以前是支持的，由于它们有内存及性能问题，且没有志愿者维护，现在已经被列为 [Unsupported](http://fisheye.freeswitch.org/browse/Unsupported) 了。

## 应用场景

一般来说，这些嵌入式脚本主要用于写 IVR，即主要用来控制一路通话的呼叫流程。虽然它们也可以控制多路通话（在后面我们也会讲到这样的例子，但这不是他们擅长的功能。

当然，这里说的一路通话不是说它们只能控制唯一一路通话。以 Lua 为例，你可以把呼叫路由到一个 lua 脚本，当有电话进来时，FreeSWITCH 会为每一路通话启动一个线程，控制每一路通话的 lua 脚本则在相应的线程内执行，互不干扰。Java 语言需要 Java 的虚拟机环境，比这个要复杂些。

## Lua

这是一门小众语言，听起来，它可能不像其它语言（如 Java）那样“如雷贯耳”，但由于其优雅的语法及小巧的身段受到很多开发者的青睐，尤其是在游戏领域（我相信有很多人知道它是缘于2010年一则新闻中说一个14岁的少年用它编出了 iPhone 上的名为 Bubble Ball 的游戏，该游戏下载量曾一度超过史上最流行的“愤怒的小鸟”）。

在 FreeSWITCH  中，[Lua 模块](http://wiki.freeswitch.org/wiki/Mod_lua)是默认加载的。在所有嵌入式脚本语言中，它是最值得推荐的语言。首先它非常轻量级，mod\_lua.so 经过减肥(strip)后只有272K；另外，它的语法也是相的的简单。有人做过对比说，在嵌入式的脚本语言里，如果 Python 得 2 分，Perl 拿 4，Javascript 得 5, 则  Lua 语言可得 10 分。可见一斑。

另外， Lua  模块的文档也是最全的。写其它语言的程序好多时候都需要参照 Lua 模块的文档。

### 语法简介

[Lua](http://www.lua.org) 语言的注释为 “--” 开头（单行），或 “--[[ ]]”（多行）。

Lua 变量不需要类型声明

Lua 支持类似面向对象的编程，所有对象都是一个 Table(Lua 中独有的概念)。

Lua 支持尾递归、闭包。

详细的资料请参阅有关资料，底线是 -- 如果你会其它编程语言，在 30 分钟内就能学会它。

### 将电话路由到 Lua 脚本

在 dialplan XML 中，使用

     <action application="lua" data="test.lua"/>

便可将进入 dialplan 的电话交给 lua 脚本接管。脚本的默认路径是安装路径的  scripts/ 目录下，当然你也可以指定绝对路径，如 /tmp/test.lua。需要注意在 windows 下目录分隔符是用 "\" ，所以有时候需要两个，如“c:\\test\\test.lua”。

### Session 相关函数

FreeSWITCH 会自动生成一个 session 对象（实际上是一个 table），因而可以使用  Lua 面象对象的特性编程，如以下脚本放播放欢迎声音(来自 [Hello Lua](http://wiki.freeswitch.org/wiki/Mod_lua#Hello_Lua)) 。

     -- answer the call
     session:answer();

     -- sleep a second
     session:sleep(1000);

     -- play a file
     session:streamFile("/tmp/hello-lua.wav");

     -- hangup
     session:hangup();


大部分跟 session  有关的函数是跟 FreeSWITCH 中的 App 是一一对应的，如上面的 answer()、hangup() 等，特别的， streamFile() 对应 playback() App 。如果没有对应的函数，也可以通过 session:execute() 来执行相关的 App，如 session:execute("playback", "/tmp/sound.wav") 等价于 session:streamFile("/tmp/sound.wav")。

需要注意，lua 脚本执行完毕后默认会挂断电话，所以上面的 Hello Lua 例子中不需要明确的  session:hangup()。如果想在 lua 脚本执行完毕后继续执行 dialplan 中的后续流程，则需要在脚本开始处执行

     session:setAutoHangup(false)

如下列场景，test.lua 执行完毕后（假设没有 session:hangup()，主叫也没有挂机），如果没有 setAutoHangup(false)，则后续的 playback 动作得不到执行。

     <extension name="eavesdrop">
          <condition field="destination_number" expression="^1234$">
               <action application="answer"/>
               <action application="lua" data="test.lua"/>
               <action application="playback" data="lua-script-complete.wav"/>
          </condition>
     </extension>

更多的函数可以参考相关的 wiki 文档：<http://wiki.freeswitch.org/wiki/Mod_lua>


### 非 Session 函数

Lua 脚本中也可以使用跟 sesion 不相关的函数，最典型的是 freeswitch.consoleLog()，用于输出日志，如：

     freeswitch.consoleLog("NOTICE", "Hello lua log!\n")

另外一个是 freeswitch.API，它允许你执行任意 API，如

     api = freeswitch.API(); 
     reply = api:executeString("sofia", "status");

### 独立的 Lua 脚本

独立的 Lua 脚本可以直接在控制台终端上(使用 luarun)执行，这种脚本大部分可用于执行一些非  Session 相关的功能，后面我们会讲到相关例子。


### 数据库

在 Lua 中，可以使用 [LuaSQL](http://www.keplerproject.org/luasql/) 连接各种关系型数据库，但据说 LuaSQL 与某些版本的数据库驱动结合有内存泄漏问题，配置起来也比较复杂。

另一种连接数据库的方式是直接使用  freeswitch.Dbh。它可以直接通过 FreeSWITCH  内部的数据库连接句柄来连接 sqlite 数据库或任何支持 ODBC 的数据库。

（略）

## Javascript

相对于 Lua来说, 大家可能对 Javascript 更熟悉一些。Javascript 是 Web 浏览器上最主流的编程语言，它最早是设计出来用于配合 HTML 渲染页面用的，近几年由于 [Node.js](http://nodejs.org) 的发展使它在服务器端的应用也已发扬光大。它遵循 [EMCAScript](http://zh.wikipedia.org/wiki/ECMAScript) 标准。

（略）

## 其它脚本语言

其它脚本语言的使用也类似，读者可参照使用。值得一提的是，FreeSWITCH 有一个 mod_managed 模块支持 Windows .NET 架构下的语言（F#, VB.NET, C#, IronRuby, IronPython, JScript.NET），通过 mono 也可以支持其它平台（如 Linux ）。
