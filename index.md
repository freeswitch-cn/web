---
layout: default
title: 首页
---

<!--
<div style="background-color:blue;color:yellow;padding:5px;text-align:center;margin-top:10px"><a style="color:white;text-decoration:none" href="/2013/07/02/freeswitch-cn-zhong-wen-she-qu-2013-di-er-jie-kai-fa-zhe-sha-long-yuan-man-cheng-gong.html">FreeSWITCH-CN 2013 开发者沙龙圆满成功</a>
 | <a style="color:white;text-decoration:none" href="/2013/12/27/FreeSWITCH-CN-wei-xin-gong-gong-zhang-hao-kai-zhang.html">FreeSWITCH-CN 微信公共账号 &rarr;</a>
</div>
-->

<!--<div style="background-color:red;color:yellow;padding:5px;text-align:center"><a style="color:white" href="/2014/12/15/freeswitch-peixun-chengdu.html">[FreeSWITCH高级培训2014冬季班（成都站）]</a>（2015年1月17--19日），正在进行中……</div>-->

<!--<div style="background-color:blue;color:yellow;padding:5px;text-align:center"><a style="color:white" href="/2014/04/30/ncc-and-freeswitch-salon-2014.html">[下一代呼叫中心与企业通信发展论坛暨FreeSWITCH-CN第三届开发者沙龙]</a>（6月13日）报名 </div>-->

<!--<div style="background-color:red;color:yellow;padding:5px;text-align:center"><a style="color:white" href="/2014/09/15/freeswitch-peixun-shenzhen.html">[FreeSWITCH高手速成培训2014秋季班（深圳站）]</a>（11月20--22日）火热报名中 ...</div>-->

欢迎光临FreeSWITCH中文站，本站是非官方的，其官方网站是：<a href="http://www.freeswitch.org" target="_blank">http://www.freeswitch.org</a> 。

FreeSWITCH是一个开源的电话软交换平台，主要开发语言是C，某些模块中使用了C++，以[MPL1.1](http://www.opensource.org/licenses/mozilla1.1.php)发布。更多的说明请参考[什么是FreeSWITCH?](/2009/11/08/shi-yao-shi-freeswitch.html)和[FreeSWITCH新手指南](http://bbs.freeswitch.org.cn/t/freeswitchxin-shou-zhi-nan/46)。
您也可以阅读这本《[FreeSWITCH权威指南](http://book.dujinfang.com)》。

我们有一个QQ群：190435825 、一个[BBS](http://bbs.freeswitch.org.cn)、一个微信公共账号 FreeSWITCH-CN（可以扫描右侧的二维码加入），以及一个[知乎专栏](http://zhuanlan.zhihu.com/freeswitch/19648543)。

有条件的同学，也欢迎加入 Google Groups [FreeSWITCH-CN 邮件列表](/2014/09/16/google-groups.html)。
<br>
# 最新招聘

<ul class="posts">
    <li class="post_list"><a href="/jobs.html">上海米领通信技术有限公司</a></li>
</ul>

<br style="clear:both">

# BBS最新帖

<div>

<ul class="posts" id="bbs">
</ul>

<br style="clear:both">
<hr>
<h1>本站最新文章</h1>

<ul class="posts">

ttt

  {% for post in site.posts limit:20 %}

    <li class="post_list"
        {% if post.title == "Welcome to Jekyll!" %}
            style="display:none"
        {% endif %}
    >
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

<script type="text/javascript" src="/assets/javascripts/libs/jquery-1.7.2.min.js"></script>
<script type="text/javascript">
    function find_avatar(users, id) {
        var default_img = "/images/posts/fscn.png";

        if (id == -1) return default_img;

        for (var i = 0; i<users.length; i++) {
            if (users[i].id == id) {
                return 'http://bbs.freeswitch.org.cn/' + users[i].avatar_template.replace("{size}", "64");
            }
        }

        return default_img;
    }

    $.ajax({
        dataType: 'json',
        url: "http://bbs.freeswitch.org.cn/latest.json",
        success: function(json){
            console.log(json);
            $.each(json.topic_list.topics, function(i, topic) {
                var img = find_avatar(json.users, topic.posters[0].user_id);
                // console.log(img);
                item = '<li class="post_list">' +
                        '<div style="float:left;margin-right:5px;">' +
                        '<img src="' + img + '"/>' +
                        '<br><span>' + topic.last_posted_at.substring(0,10) +
                        '</span></div>' +
                        '<a target="bbs" href="http://bbs.freeswitch.org.cn/t/' +
                        topic.slug + '">' + topic.fancy_title.substring(0, 54) + '</a></li>';
                $('#bbs').append(item);
            })
        }}
    )

</script>
