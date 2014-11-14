---
layout: post
title: "关于在本站投稿的说明"
tags:
  - "通知"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


# 关于在本站投稿的说明


大家好，越来越多的网友喜欢 FreeSWITCH，也有越来越多的网友在 FreeSWITCH-CN Google Group 中参与讨论，分享经验。Google Group 适合作为一个邮件列表进行经验交流，但对于一些分享经验的邮件，却不大容易组织。与此同时，我们的 Blog 却更适合这一工作。同时，也有热心网友希望能将自己的作品放到本站上。

需要说明的是，本 Blog 只是一种极其简单的 Blog 程序，它不像 WordPress 那样复杂，因此各种功能受到一些限制。所以，如果有人希望分享经验，并发布在本站的 Blog 上，我们暂时仅接受投稿方式。

请将投稿发送至
freeswitch-cn \_\_at\_\_ freeswitch.org.cn (将\_\_at\_\_ 换成 @)。并在邮件中注明作者署名及希望链接到的博客或个人（公司）网站地址等。

有其它问题可以在 Google Groups 中讨论，或发邮件至上述地址。

## 投稿须知：

* 本站只接受技术型稿件，不接受反动、煽动发族仇恨、使用不文明用语及其它不适宜（或本站编辑认为不适宜）在本站发表的文章。
* 本站内容采用 [知识共享 署名-非商业性使用-禁止演绎 2.5 中国大陆(CC-BY-NC-ND)](http://creativecommons.org/licenses/by-nc-nd/2.5/cn/legalcode)，因此会为作者署名，不支付稿费。
* 本站编辑有权对来稿内容在不伤原意的情况下进行编辑，包括但不限于修改错别字，排错等。
* 投稿仅接受 Markdown 纯文本格式(.txt 或 .markdown 或 .md)，请使用 UTF-8 编码，文件名用英文。最好使用 Unix 换行符格式。
* 投稿前请使用相关 Markdown 工具确保能正确转换成 HTML. 可使用[Showdown](http://attacklab.net/showdown/)测试。
* 如果文章中有图片，请使用 .png 或 .jpg、.jpeg 格式， 动画使用 .gif。
* 如果一篇文章文件不多于三个（含附件）且文件大小不超过5M，则不要打包。如果文件多了，可以进行打包或压缩。压缩文件支持 .tar.gz、.tar.bz2、.zip 及 .rar。
* 解释权归本站所有。

## 为什么使用 Markdown?

因为它简单。可读性好。且可以使用相关工具换成 TXT、RTF、HTML、PDF、Microsoft Doc等。

## Markdown 语法简介


### 标题
	# 一级
	## 二级
	### 三级
### 列表
	* 111
	* 222
	1. xxxx
	1. yyyy
	1. zzzz
### 链接
	<http://www.freeswitch.org.cn>
	[FreeSWITCH-CN](http://www.freeswitch.org.cn)
### 图片
	![Alt text](/path/to/img.jpg)
	![Alt text](http://www.example.com/path/to/img.jpg)
	<img src="http://www.example.com/xx.png"/>
### 代码
	<code> xxxxxx </code>
	<code>
		code here
	</code>
	或，在一行开头空四个空格或一个TAB

## 参考资料
* 英文 <http://custombuttons2.com/en-us/wiki/markdown>
* 英文 <http://daringfireball.net/projects/markdown/syntax>
* 中文 <http://sinolog.it/?p=383>

## 相关工具
* Markdown: <http://daringfireball.net/projects/markdown/>
* Discount(本站使用该工具) <http://www.pell.portland.or.us/~orc/Code/discount/>
* Pandoc <http://johnmacfarlane.net/pandoc/>
* Pandoc Windows Installer: <http://code.google.com/p/pandoc/downloads/list>
* Showdown: <http://attacklab.net/showdown/>

## 附件： 本文 Markdown 源代码
下面是本文的源代码，供参考：


	# 关于在本站投稿的说明


	大家好，越来越多的网友喜欢 FreeSWITCH，也有越来越多的网友在 FreeSWITCH-CN Google Group 中参与讨论，分享经验。Google Grooup 适合作为一个邮件列表进行经验交流，但对于一些分享经验的邮件，却不大容易组织。与此同时，我们的 Blog 却更适合这一工作。

	需要说明的是，本 Blog 只是一种极其简单的 Blog 程序，它不像 WordPress 那样复杂，因此各种功能受到一些限制。所以，如果有人希望分享经验，并发布在本站的 Blog 上，我们暂时仅接受投稿方式。

	请将投稿发送至
	freeswitch-cn \_\_at\_\_ freeswitch.org.cn (将\_\_at\_\_ 换成 @)

	有其它问题可以在 Google Groups 中讨论，或发邮件至上述地址。

	## 投稿须知：
	* 本站只接受技术型稿件，不接受反动、煽动发族仇恨、使用不文明用语及其它不适宜（或本站编辑认为不适宜）在本站发表的文章。
	* 本站内容采用 [知识共享 署名-非商业性使用-禁止演绎 2.5 中国大陆(CC-BY-NC-ND)](http://creativecommons.org/licenses/by-nc-nd/2.5/cn/legalcode)，因此会为作者署名，不支付稿费。
	* 投稿仅接受 Markdown 纯文本格式(.txt 或 .markdown 或 .md)，请使用 UTF-8 编码，文件名用英文。最好使用 Unix 换行符格式。
	* 投稿前请使用相关 Markdown 工具确保能正确转换成 HTML. 可使用[Showdown](http://attacklab.net/showdown/)测试。
	* 如果文章中有图片，请使用 .png 或 .jpg、.jpeg 格式， 动画使用 .gif。
	* 如果一篇文章文件不多于三个（含附件）且文件大小不超过5M，则不要打包。如果文件多了，可以进行打包或压缩。压缩文件支持 .tar.gz、.tar.bz2、.zip 及 .rar。

	## 为什么使用 Markdown?

	因为它简单。可读性好。且可以使用相关工具换成 TXT、RTF、HTML、PDF、Microsoft Doc等。

	## Markdown 语法简介


	### 标题
		# 一级
		## 二级
		### 三级
	### 列表
		* 111
		* 222
		1. xxxx
		1. yyyy
		1. zzzz
	### 链接
		<http://www.freeswitch.org.cn>
		[FreeSWITCH-CN](http://www.freeswitch.org.cn)
	### 图片
		![Alt text](/path/to/img.jpg)
		![Alt text](http://www.example.com/path/to/img.jpg)
		<img src="http://www.example.com/xx.png"/>
	### 代码
		<code> xxxxxx </code>
		<code>
			code here
		</code>
		或，在一行开头空四个空格或一个TAB

	## 参考资料
	* 英文 <http://custombuttons2.com/en-us/wiki/markdown>
	* 英文 <http://daringfireball.net/projects/markdown/syntax>
	* 中文 <http://sinolog.it/?p=383>

	## 相关工具
	* Markdown: <http://daringfireball.net/projects/markdown/>
	* Discount(本站使用该工具) <http://www.pell.portland.or.us/~orc/Code/discount/>
	* Pandoc <http://johnmacfarlane.net/pandoc/>
	* Pandoc Windows Installer: <http://code.google.com/p/pandoc/downloads/list>
	* Showdown: <http://attacklab.net/showdown/>

	## 附件： 本文 Markdown 源代码
	下面是本文的源代码，供参考：


