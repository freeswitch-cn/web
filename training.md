---
layout: default
title: 培训
---


为了将FreeSWITCH传播到各个领域的通信行业，决定在2013年开始展开FreeSWITCH沙龙和培训，第一站定于北京。

# 最新文章

<div>

<ul class="posts">
  {% for post in site.posts limit:32 %}
    <li class="post_list">
        <div style="float:left;margin-right:5px;">
        {% if post.image %}
        <img src="/images/posts/t-{{ post.image }}"/>
        {% else %}
        <img src="/images/posts/fscn.png"/>
        {% endif %}
        <br>
        <span>{{ post.date | date: "%Y-%m-%d" }}</span>
        </div>
        <a href="{{ post.url }}">{{ post.title | truncate: "54"}}</a>

    </li>
  {% endfor %}
    <li class="post_list">
        <div style="float:left;margin-right:5px;">
            <img src="/images/posts/fscn.png"/>
            <br>
            <span>...</span>
        </div>
        <br>
        <br>
        <a href="/posts.html">更多文章...</a>
    </li>
</ul>

</div>

<br style="clear:both"/>
