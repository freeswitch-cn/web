---
layout: default
---

FreeSWITCH培训中心，这里有最具专业的授课老师，齐全的操作环境以及步步提升的服务质量等.我们致力于将这一开源平台让更多的人熟
知，让从事VoIP的行业人员受益.

<br>
<br style="clear:both">
<!--<hr>
<h1>最新培训</h1>-->

<ul class="posts">
        <div class="separator">
	    <h1>最新培训</h1>
	</div>
	<div class="row">
	{% for category_tra in site.categories limit:10 %}
	    {% if category_tra[0] == 'training' %}
	        {% for cate in category_tra.last %}
       	    	<div class="plate">
			<div style="float:left;margin-right:5px;">
      			{% if cate.image %}
       			<img src="/images/posts/t-{{ cate.image }}"/>
       			{% else %}
       			<img src="/images/posts/fscn.png"/>
       			{% endif %}
       			<br>
       			<!--<span>{{ cate.date | date: "%Y-%m-%d" }}</span>-->
       			</div>
			{% if cate.url %}
       			<a href="{{ cate.url }}">{{ cate.title | truncate: "54"}}</a>
			<br>
			<br>
			<span>{{ cate.abstract }}</span>
			{% endif %}
    	    	</div>
	   	{% endfor %}
	    {% endif %}
    	{% endfor %}
	</div> <!--row-->

	<!--<div class="plate">
        	<div style="float:left;margin-right:5px;">
                    <img src="/images/posts/fscn.png"/>
                    <br>
                    <span>...</span>
               	</div>
               	<br>
               	<br>
               	<a href="/posts.html">更多文章...</a>
	</div>-->

</ul>	


<br style="clear:both"/>
<br>
<ul class="posts">
        <div class="separator">
            <h1>最新沙龙</h1>
        </div>
        <div class="row">
	{% for category_salon in site.categories limit:10 %}
	    {% if category_salon[0] == 'salon' %}
                {% for cat in category_salon.last %}
		<div class="plate">
			<div style="float:left;margin-right:5px;">
                        {% if cat.image %}
                        <img src="/images/posts/t-{{ cat.image }}"/>
                        {% else %}
                        <img src="/images/posts/fscn.png"/>
                        {% endif %}
                        <br>
                        <!--<span>{{ cat.date | date: "%Y-%m-%d" }}</span>-->
                        </div>
                        {% if cat.url %}
                        <a href="{{ cat.url }}">{{ cat.title | truncate: "54"}}</a>
                        <br>
                        <br>
                        <span>{{ cat.abstract }}</span>
                        {% endif %}
		</div>
	        {% endfor %}
	    {% endif %}
	{% endfor %}
	</div> <!--row-->
     	    
	<!--<div class="plate">
		<div style="float:left;margin-right:5px;">
                	<img src="/images/posts/fscn.png"/>
                  	<br>
                  	<span>...</span>
               </div>
               <br>
               <br>
               <a href="/posts.html">更多文章...</a>
	</div>-->
        
</ul>
