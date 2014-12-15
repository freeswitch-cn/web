---
layout: post
title: "在 FreeSWITCH 中快速创建用户XML配置文件"
tags:
  - "config"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


有时候需要在 FreeSWITCH 中添加大量用户，在 Linux 上，我用以下脚本生成：

    for i in `seq 1020 1039`; do sed -e "s/1000/$i/" 1000.xml > $i.xml ; done

上面的脚本会生成 1020 到 1039 的用户配置文件。


另外，发现 Mac 上竟然没有 seq ，自己用 ruby 写了一个 

	#!/usr/bin/env ruby
	
	(ARGV[0].to_i .. ARGV[1].to_i).each { |x| puts x}

在 windows 真不知道怎么弄，不过后来想起了[UnxUtils](http://www.dujinfang.com/past/2010/5/27/zai-windows-shang-an-zhuang-unixutils/)，又 google 了一把，终于搞出来一个.bat脚本：

	for /L %%i in (1020, 1 1039) do sed -e "s/1000/%%i" 1000.xml > %%i.xml