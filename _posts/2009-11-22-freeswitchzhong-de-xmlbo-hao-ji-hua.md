---
layout: post
title: "FreeSWITCH中的XML拨号计划"
tags:
  - "dialplan"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


本文是arlyardo翻译的，内容来自<http://wiki.freeswitch.org/wiki/Dialplan_XML>。


介绍
========

FS的配置文件都在conf目录下，都是xml文件。拨号方案的配置文件主要在dialplan目录下。Xml文件可以直接进行编辑，这使得配置FS的拨号方案非常灵活、方便。官方文档中，FS的拨号方案叫做XML Dialplan。Xml配置文件中允许使用Perl兼容的正则表达式来匹配一个号码域，如^(10[01][0-9])匹配1000到1019的号码。正则表达式的用法参考<http://wiki.freeswitch.org/wiki/Regular_Expression>。

FS运行时，会先解析所有xml文件，形成一个完整的配置方案。

变量
========

XML Dialplan可以通过变量和表达式检测各种状况，当然如果判断条件不允许，该分支中的变量是不会起作用的。

XML Dialplan实际上是用于呼叫路由（Call Routing），而不是用于繁杂的条件检测和评估。FS支持lua、JavaScript、Perl、Python等脚本语言，这是比直接单纯使用复杂的XML方案更好的选择。

FS的拨号方案分为两步骤：查找和执行（hunting and executing）。首先查找时，基于条件判断，执行或撤销一个动作(action)，把所有的应用解析出来，然后按顺序执行。也就是说，在查找的时候，执行阶段的信道变量（Channel variables）是不会起作用的。比如XML文件中配置了<action application="info"/>，但是这个应用在前期的查找中，不符合条件的话就得不到执行，不过也可以通过使用脚本语言来修改条件，或者XML中使用条件求值使它在解析阶段就得到执行。

注：自SVN Rev14906起，允许某些应用使用inline关键字，这意味着它们可以在解析阶段求值，并应用于以后的条件匹配中。

主叫描述文件(Caller Profile)字段与信道变量(Channel variables)的区别：

在组织你的Dialplan时，这两者之间的区别可能是最令人头痛的，注意，前者是直接的字符串描述

	<code>
	<condition field="destination_number" blah...> 
	</code>

而后者使用变量语法

	<code>
	<condition field="${sip_has_crypto}" blah...>
	</code>

注意，${....}表示获取一个变量的值。

XML Dialplan解析
===========

当呼叫到达ROUTING状态时，拨号方案配置文件就会被解析。解析完后得到一个完整的建立channel的步骤，这些步骤由解析xml中`<action>`或`<anti-action>`标示得到。对于熟悉Asterisk的人来说，可能期望在一个action中获得的值能影响下一个action的判断。在FreeSWITCH中不是这样了。除非用“${api func(api arg ${var_name})}”这样的字段，在解析阶段从一个模块中调用一个可插入式的API，这情况仅应用于显示实时信息，如时间或其他可快速访问获取的信息，而不应该被滥用。

XML Dialplan剖析
===========

XML Dialplan中有几大要素：context（上下文）、extension（分机号）、condition（条件）、action（动作），它们会被按顺序处理，直到action被处理，action告诉FS要执行的操作。对一个分机号，可以有多个condition（条件判断）和action。

Extension通俗的说就是电话号码，当然FS可以为其他设备分配号码，甚至是一个特殊的应用分配一个号码，如会议号。

XML Dialplan 目录
--------

可以考虑把分机号的xml配置文件放置到conf/dialplan/default目录，该目录中的分机号会被优先于Enum extension被解析到拨号方案中。Xml文件会按名字排序，排前面的xml文件会被优先加载，如001_MYExt.xml会优先于002_Yu.xml。默认已经有1000到1019分机号的xml文件。Enum extension放在最后，如果执行到这一步时，它会匹配所有的分机号。

Context
------

Contexts是extensions（分机号）的逻辑分组。我们可能会有多个分机号在一个context中。Context需要一个叫‘name’的参数，它的值是any的话表示匹配任何情况。Name是用于表示context的，freeswitch.xml文件中默认包含几个context：

	<code>
	<?xml version="1.0"?>
	<document type="freeswitch/xml">
	  <section name="dialplan" description="Regex/XML Dialplan">
	    <context name="default"> //默认
	    </context>
	  </section>
	</document>
	</code>

extension
--------

Extension是一个呼叫的目的地，所以它不仅仅表示电话号码，虽然我叫它分机号...需要给出一个name和conditions和actions以告诉FS如何找到它。这里name是唯一的，标识一个分机号供后面使用。一个附加的参数叫做continue，默认把它设置为false，设为true表示FS在当前分机号的所有action都解析完后会继续解析后续的所有分机号的actions。

如下，添加一个action：‘bridge’，桥接到分机号500：

	<code>
	<!--- ext 500 -->
	
	<extension name="500">   //找号码为500的分机，找到则解析action
	
	   <condition field="destination_number" expression="^500$">
	
	       <!--- The?% behind the username tells FS to lookup the user in it's  local sip_registration database %：本地注册用户 -->
	
	       <action application="bridge"      data="sofia/profilename/500%x.x.x.x"/>
	
	       <!--- x.x.x.x in the line above is the IP address to the FreeSWITCH  server/device  @：一个Sip URI，非本地注册账号-->
	
	       <!--- If you don't want to bridge a call to a local registered user,  but to a SIP URI, use the @ instead of?%:
	
	       <action  application="bridge"data="sofia/profilename/500@x.x.x.x"/>
	
	       -->
	
	   </condition>
	
	</extension> 
	</code>

第一行原型如下：

	<code>
	<extension name="{exten_name}" [continue="[true|false]"]>
	</code>

第二行表示条件判断：如果有分机的号码是500则继续解析下面的action。

	<code>
	<condition field="[{field_name}|${variable_name}|${api_func(api_args ${var_name})}]" expression="{expression}" break="[on-true|on-false|always|never]">   //break表示判断后的行为，有以下值：
	</code>

* On-true：第一次匹配后停止查找

* On-false：默认值，第一次失败后停止查找

* Always：不管匹配与否都停止

* Never： 无论匹配与否都继续查找

经过网关的呼叫
--------

gateway是mod_sofia的关键字，表示一个呼叫需要经过一个配置好的网关：

	<code>
	<extension name="testing"> //当呼叫网关上的号码100
	
	  <condition field="destination_number" expression="^(100)$">
	
	    <action application="bridge" data="sofia/gateway/gw/$1"/>
	
	  </condition> //bridge 到网关上
	
	</extension>
	</code>

Condition
-------

Condition是模式匹配标签，帮助FS决定是否处理对当前extension的呼叫。可以比较的参数有context、rdnis、destination_number、caller_id_name等；filed段和expression段都可以有参数。Field段表示要匹配的对象（目的？上下文。。。），expression段表示要匹配的表达式。下面是一个网关的例子：

	<code>
	<extension name="To PSTN"> //field域和expression域
	
	  <condition field="fdnis" expression="9541231234"/>
	
	  <condition field="destination_number" expression="(.*)">
	
	      <action application="bridge" data="sofia/profilename/$1@x.x.x.x:5061"/> //网关ip和端口
	
	   </condition>
	
	</extension>
	</code>

FS注册这个网关来呼叫PSTN上的电话。

Action and Anti-Action
--------

当conditions判断匹配的话，就会执行action，否则执行Anti-action。Action有两个参数：application表示已经注册的要执行的应用，如bridge；data是application的参数。使用Anti-action的时候不可以使用 $1，因为正则表达式不匹配，第一个参数是无效的。

Inline Actions
--------

如果在action中把附加参数inline设置为true，则该action在dialplan查找期间就得到执行：<action inline="true" application="set" data="some_var=some_val"/>

可以内联执行的action有：

    * check_acl,
    * eval,
    * event,
    * export,
    * log,
    * presence,
    * set,
    * set_global,
    * set_profile_var,
    * set_user,
    * sleep,
    * unset,
    * verbose_events,
    * cidlookup,
    * curl,
    * easyroute,
    * enum,
    * lcr,
    * nibblebill,
    * odbc_query

内联执行的应用不会记录到cdr中。

EXAMPLES
========

如果你要在单独的xml文件中加入自己的分机号，需要注释掉你不需要的enum extension（应该就是default.xml中默认配置的分机号，如1000到1019）。使用`<include>`把xml文件包含到XML Dialplan.

Example 1
--------

如下：
	
	<code>
	<extension name="Test1">
	
	  <condition field="network_addr" expression="^192\.168\.1\.1$"/>
	
	  <condition field="destination_number" expression="^(\d+)$">
	
	    <action application="bridge" data="sofia/profilename/$1@192.168.2.2"/>
	
	  </condition>
	
	</extension>
	</code>

第一个conditions：当呼叫方的ip是192.168.1.1时，呼叫就会被处理，

第二个conditions：拨打的号码会被提取到 $1，提供给后面的action。

下面例子是错误的：

	<code>
	<extension name="Test1Wrong">
	
	  <condition field="destination_number" expression="^(\d+)$"/>
	
	  <condition field="network_addr" expression="^192\.168\.1\.1$">
	
	    <action application="bridge" data="sofia/profilename/$1@192.168.2.2"/>
	
	  </condition>
	
	</extension>
	</code>

因为目的号码的匹配时在不同的conditions域action取不到$1的值。

当然可以定义变量来保存目的号码，如下：

	<code>
	<extension name="Test1_2">
	
	  <condition field="destination_number" expression="^(\d+)$">
	
	    <action application="set" data="dialed_number=$1"/>
	
	  </condition>
	
	  <condition field="network_addr" expression="^192\.168\.1\.1$">
	
	    <action application="bridge" data="sofia/profilename/${dialed_number}@192.168.2.2"/>
	
	  </condition>
	
	</extension>
	</code>

注意，在extension内部使用set设置的变量不能用在后续的condition匹配中，因为set的求值是在执行阶段，而condition的匹配要先于set。如果你确实需要根据变量的值来决定执行action，需要在变量被填充值时使用execute_extension或transfer应用。

注：新的的版本允许使用inline关键字来执行set，那样的话你就可以在后续的condition中使用。

Example 2
--------

这个例子判断来自固$定ip和由1开头的号码。这里$1表示1后面的数值,$0才表示整个号码:

	<code>
	<extension name="Test2">
	
	  <condition field="network_addr" expression="^192\.168\.1\.1$"/>
	
	  <condition field="destination_number" expression="^1(\d+)$">
	
	    <action application="bridge" data="sofia/profilename/$0@192.168.2.2"/>
	
	  </condition>
	
	</extension>
	</code>

Example 3
--------

接受00开头的号码,把号码交给FS处理时,把00前缀去掉,如接到00123,把123交给FS

	<code>
	<extension name="Test3.1">
	
	  <condition field="destination_number" expression="^00(\d+)$">
	
	    <action application="bridge" data="sofia/profilename/$1@192.168.2.2"/>
	
	  </condition>
	
	</extension>
	</code>

这里(\d+)表示数字，任意个，（.+）表示任意个字符

Example 4
--------

接受带前缀的号码,处理时除掉前缀,在给它加上新的前缀.

	<code>
	<extension name="Test4">
	
	  <condition field="destination_number" expression="^00(\d+)$">
	
	    <action application="bridge" data="sofia/profilename/011$1@x.x.x.x"/>
	
	  </condition>
	
	</extension>
	</code>

Example 5
--------

这个例子演示profiles的用法,profile是对这段的描述,所以需要需要终端支持才可以配置,如mod_Sofia,sip终端,它的profiles如下：

	<code>
	<profile name="profile1">
	
	  <param name="debug" value="1"/>
	
	  <param name="rfc2833-pt" value="101"/>
	
	  <param name="sip-port" value="5060"/>
	
	  <param name="dialplan" value="XML"/>
	
	  <param name="dtmf-duration" value="100"/>
	
	  <param name="codec-prefs" value="PCMU@20i"/>
	
	  <param name="codec-ms" value="20"/>
	
	  <param name="use-rtp-timer" value="true"/>
	
	</profile>
	
	<profile name="profile2">
	
	  <param name="debug" value="1"/>
	
	  <param name="rfc2833-pt" value="101"/>
	
	  <param name="sip-port" value="5070"/>
	
	  <param name="dialplan" value="XML"/>
	
	  <param name="dtmf-duration" value="100"/>
	
	  <param name="codec-prefs" value="PCMA@20i"/>
	
	  <param name="codec-ms" value="20"/>
	
	  <param name="use-rtp-timer" value="true"/>
	
	</profile>
	</code>

这两个profile不同之处在编码选择上，一个g711 ulaw，一个alaw，使用方法如下：

	<code>
	<extension name="Test5ulaw">
	
	  <condition field="network_addr" expression="^192\.168\.1\.1$"/>
	
	  <condition field="destination_number" expression="^1(\d+)$">
	
	    <action application="bridge" data="sofia/profile1/$0@192.168.2.2"/>
	
	  </condition>
	
	</extension>
	</code>

在sip\_profile文件夹中包含了internal.xml /external.xml，internal.xml描述内部的终端的属性，如使用5060端口，external.xml描述外部设备属性，如使用5080端口。


Example 6
--------

例举如何桥接一个注册到FS上的设备，例子中，假设已经定义了一个sofia profile ：local_profile，且电话注册到example.com域。

	<code>
	<extension name="internal">
	
	  <condition field="source" expression="mod_sofia" /> //sip 终端
	
	  <condition field="destination_number" expression="^4（\d+)">
	
	    <action application="bridge" data="sofia/local_profile/$0%example.com" />
	
	  </condition> //把以4开头的sip电话，去掉前缀，转接到example.com域下
	
	</extension>    //的电话
	</code>

Example 7
--------

这个例子演示当一个action执行失败时如何执行另外的action：

	<code>
	<extension name="internal">
	
	  <condition field="destination_number" expression="^1111">
	
	    <action application="set" data="hangup_after_bridge=true"/>
	
	 
	    <action application="bridge" data="sofia/local_profile/1111@example1.company.com" /> //action1
	
	 
	    <action application="bridge" data="sofia/local_profile/1111@example2.company.com" /> //action2
	
	  </condition>
	
	</extension>
	</code>

如果action1成功，则呼叫被转移到example1域下的1111分机，直到挂机。如果action1没有成功，则会继续执行action2. 如果参数hangup\_after\_bridge=false，则被叫挂断，主叫不挂的话，也会继续执行后续的action。

Example 8
--------

例子说明呼叫时如何要求验证：

	<code>
	<extension name="9191">
	
	   <condition field="destination_number" expression="^9191$"/>
	
	   <condition field="${sip_authorized}" expression="true">
	
	     <anti-action application="reject" data="407"/>
	
	   </condition> //true表示需要认证，返回407认证请求
	 
	
	   <condition>
	
	     <action application="playback" data="/tmp/itworked.wav"/>
	
	   </condition>  //播放提示音
	
	</extension>
	</code>

Example 9
--------

把从5080端口进来的呼叫经过DID转移到内部1001分机上。

Public.xml:

	<code>
	
	   <extension name="test_did">
	
	     <condition field="destination_number" expression="^(XXXxxxxxxx)$">
	
	       <action application="transfer" data="$1 XML default"/>
	
	     </condition>
	
	   </extension>

Default.xml

	     <extension name="Local_Extension">
	
	     <condition field="destination_number" expression="^(XXXxxxxxxx)$">
	
	       <action application="set" data="dialed_ext=$1"/>
	
	     </condition>
	
	     <condition field="destination_number" expression="^${caller_id_number}$">
	
	       <action application="set" data="voicemail_authorized=${sip_authorized}"/ >
	
	       <action application="answer"/>
	
	       <action application="sleep" data="1000"/>
	
	       <action application="voicemail" data="check default $${domain} ${dialed_ext}"/>
	
	       <anti-action application="ring_ready"/>
	
	       <anti-action application="set" data="call_timeout=10"/>
	
	       <anti-action application="set" data="hangup_after_bridge=true"/>
	
	       <anti-action application="set" data="continue_on_fail=true"/>
	
	       <anti-action application="bridge" data="USER/1001@$${domain}"/>
	
	       <anti-action application="answer"/>
	
	       <anti-action application="sleep" data="1000"/>
	
	       <anti-action application="voicemail" data="default $${domain} ${dialed_ext}"/>
	
	     </condition>
	
	   </extension>

	</code>

Example 10
--------

把来自1000分机的，10位数字的呼叫，转移到asterlink.com网关上，并且显示主叫为8001231234

	<code>
	<extension name="asterlink.com">
	
	     <condition field="caller_id_number" expression="^1000$"/>
	
	     <condition field="destination_number" expression="^(\d{10})$">       
	
	         <action application="set" data="effective_caller_id_number=8001231234"/>
	
	         <action application="set" data="effective_caller_id_name=800 Number"/>
	
	         <action application="bridge" data="sofia/gateway/asterlink.com/1208$1"/>
	
	     </condition>
	
	   </extension>
	</code>

Example 11
--------

把基于NPANXX的呼叫路由到不同的目的，并根据发送给FS的目的地址，给主叫返回相应的错误信息。

NPANXX：North American Numbering Plan（北美电话编号方案）

NPA identifies the 3-digit Numbering Plan Area (Area Code，3位区号)    
NXX identifies the Central Office (aka. Exchange) within the NPA(交换局号)    
XXXX identifies the Station within the NXX (交换局内的标志号)
 
	<code>
	<extension>
	
	  <condition field="network_addr" expression="^(66\.123\.321\.231|70\.221\.221\.221)$" break="on-false"/>
	
	  <condition field="destination_number" expression="^\d+$" break="never">
	
	  <action application="set" data="continue_on_fail=NORMAL_TEMPORARY_FAILURE,TIMEOUT,NO_ROUTE_DESTINATION"/>
	
	  <action application="set" data="bypass_media=true"/>
	
	  <action application="set" data="accountcode=myaccount"/>
	
	  </condition>
	
	  <condition field="destination_number" expression="^(1813\d+|1863\d+|1727\d+|1941\d+|404\d+)$" break="never">
	
	  <action application="bridge" data="sofia/outbound_profile/${sip_to_user}@switch1.mydomain.com"/>
	
	  <action application="info"/>
	
	  <action application="respond" data="503"/>
	
	  <action application="hangup"/>
	
	  </condition>
	
	  <condition field="destination_number" expression="^(1404\d+|1678\d+|1770\d+)$">
	
	  <action application="bridge" data="sofia/outbound_profile/${sip_to_user}@switch2.mydomain.com"/>
	
	  <action application="info"/>
	
	  <action application="respond" data="503"/>
	
	  <action application="hangup"/>
	
	  <anti-action application="respond" data="503"/>
	
	  <anti-action application="hangup"/>
	
	  </condition>
	
	</extension>
	</code>

Example 12
--------

例子说明捕捉错误的分机号和目的地址，要把这个extension放在dialplan底部，但在ENUM被包含之前。

	<code>
	<extension name="catchall">
	
	  <condition field="destination_number" expression=".*" continue="on-true">
	
	   <action application="playback" data="bla.wav"/>
	
	  </condition>
	
	</extension>
	</code>

Example 13 涮选
--------

先向主叫请求一个名字，然后连接被叫，念出这个名字，然后等被叫按1接通或者挂机。如果被叫挂机，则连接到语音邮箱。

	<code>
	<extension name="screen">
	
	   <condition field="destination_number" expression="^(\d{4})$">
	
	     <action application="set" data="call_screen_filename=/tmp/${caller_id_number}-name.wav"/>
	
	     <action application="answer"/>
	
	     <action application="sleep" data="1000"/>
	
	     <action application="phrase" data="voicemail_record_name"/>
	
	     <action application="playback" data="tone_stream://%(500, 0, 640)"/>
	
	     <action application="set" data="playback_terminators=#*0123456789"/>
	
	     <action application="record" data="${call_screen_filename} 7 200 2"/>
	
	     <action application="set" data="group_confirm_key=1"/>
	
	     <action application="set" data="fail_on_single_reject=true"/>
	
	     <action application="set" data="group_confirm_file=phrase:screen_confirm:${call_screen_filename}"/>
	
	     <action application="set" data="continue_on_fail=true"/>
	
	     <action application="bridge" data="user/$1"/>
	
	     <action application="voicemail" data="default $${domain} $1"/>
	
	     <action application="hangup"/>
	
	   </condition>
	
	</extension>
	
	</code>

Example 14 录音
--------

对特定号码的呼叫进行录音，或呼叫特定号码时，播放语音文件。

	<code>
	     <extension name="recording">
	
	       <condition field="destination_number" expression="^(2020)$">
	
	         <action application="answer"/>
	
	         <action application="set" data="playback_terminators=#"/>
	
	         <action application="record" data="/tmp/recorded.wav 20 200"/>
	
	       </condition>
	
	     </extension>
	
	     <extension name="playback">
	
	       <condition field="destination_number" expression="^(2021)$">
	
	         <action application="answer"/>
	
	         <action application="set" data="playback_terminators=#"/>
	
	         <action application="playback" data="/tmp/recorded.wav"/>
	
	       </condition>
	
	     </extension>
	</code>

Example 15 报时
--------

使用Flite库的TTS功能：

	<code>
	<include>
	
	  <extension name="SpeakTime">
	
	    <condition field="destination_number" expression="^2910$">
	
	      <action application="set" data="actime=${strftime(%H:%M)}"/>
	
	      <action application="set" data="tts_engine=flite"/>
	
	      <action application="set" data="tts_voice=slt"/>                     
	
	      <action application="speak" data="Is it +${actime}"/>
	
	    </condition>
	
	  </extension>
	
	</include>
	</code>

SIP呼叫常用的选项组合
========

呼叫SIP URI
--------

	<code>
	sofia/my_profile/1234@192.168.0.1
	</code>

呼叫注册用户
--------

域(domain)设置了别名

	<code>
	sofia/mydomain.com/1234
	</code> 
 
域没设别名

	<code>
	sofia/my_profile/1234%mydomain.com
	</code>

本地域

	<code>
	user/1234@mydomain.com
	</code>

经过网关的呼叫
--------

	<code>
	sofia/gateway/mygateway.com/1234
	</code>
 
指定传输协议的呼叫
--------

	<code>
	sofia/my_profile/1234@192.168.0.1;transport=tcp  //或 udp , TLS..
	</code>

指定编码的呼叫
--------

	<code>
	{absolute_codec_string=XXXX}sofia/my_profile/user@your.domain.com
	</code>

享受PortAudio的乐趣
--------

如果你配置了PortAudio并希望在呼叫时指定语音编解码(codec)的话，你需要先呼叫第一个然后桥接到另一个：

	<code>
	originate {absolute_codec_string=XXXX}sofia/default/foo@bar.com &bridge（portaudio/auto_answer）
	</code>

或使用inline dialplan(注意inline dialplan是一个单独的拨号计划，不同于上文所述的inline关键字)

	<code>
	originate {absolute_codec_string=XXXX}sofia/default/foo@bar.com bridge:portaudio/auto_answer inline
	</code>
