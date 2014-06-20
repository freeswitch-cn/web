---
layout: default
title: 博客
---

# 全部页面       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<small>([全部标签](/tags.html))</small>

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date: "%Y-%m-%d" }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>