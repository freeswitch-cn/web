---
layout: post
title: "[投稿]FreeSWITCH小结：关于export的原理介绍"
tags:
  - "投稿"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>

默言投稿。

### Export原理
<br />
#### 普通export用法

在dialplan中经常会用到export，如下所示：

    <action application="export" data="myvar=test"/>

上面的xml在执行后，会在本地通道中修改如下：

	>myvar=test    
	>export_vars=<other_export_vars>,myvar

在本地变量中增加myvar，同时修改export _ vars变量，将export指定的变量附加到后面。

这样，在bridge时候，系统会将export _ vars指定的变量从a腿导入到b腿上。

#### 带nolocal的export用法

有时候，仅仅需要将变量设置到b腿，而不需要设置到a腿，所以这里就需要参数nolocal。
用法如下：

    <action application="export" data="nolocal:myvar=test"/>

上面的命令在执行后，会在本地增加的变量如下：

	>nolocal:myvar=test
	>export_vars=<other_export_vars>,nolocal:myvar

也就是说增加的变量名称就是nolocal:myvar, 由于有nolocal前缀，就可以跟本地变量很好的区别开。

同样，在bridge的时候，系统也会将export_vars指定的变量从a腿导出到b腿。

巧妙的是，在导出nolocal:myvar的时候，会自动将nolocal:前缀去掉，从而达到将变量只设置到b腿的目的。

而如果留意就会发现，使用下面的命令还是可以获取到值的：

	uuid_getvar <a_leg_uuid> nolocal:myvar

而使用下面的命令是获取不到任何值的：

	uuid_getvar <a_leg_uuid> myvar

### Export用法
<br />
知道了export的原理之后，即使api命令中没有uuid_export，我们也可以模拟出来。
如下：

#### 用法1：只将指定的变量导出到b腿

	originate {nolocal:sip_h_X-AutoAccept=true,export_vars='nolocal:sip_h_X-AutoAccept'}user/60400 60401

#### 用法2：只将指定的变量设置到a腿

	originate {sip_h_X-AutoAccept=true}user/60400 60401

#### 用法3：同时将变量设置到a腿和b腿

	originate {sip_h_X-AutoAccept=true,nolocal:sip_h_X-AutoAccept=true,export_vars='nolocal:sip_h_X-AutoAccept'}user/60400 60401

**注意事项**

这里所说的设置到b腿，是指bridge之后设置到b腿

### Export示例
<br />
#### 示例1：在呼叫前，同时设置a腿和b腿的uuid，以便后期跟踪

	originate {origination_uuid=xxxxx,nolocal:origination_uuid=yyyyy,export_vars='nolocal:origination_uuid'}user/60401 60402

<br>

链接博客：[http://www.cnblogs.com/jizha/p/export_yuanli_and_yingyong.html](http://www.cnblogs.com/jizha/p/export_yuanli_and_yingyong.html)

<br>
<br>
<hr>


**文章版权归原作者所有**。谢谢投稿。

