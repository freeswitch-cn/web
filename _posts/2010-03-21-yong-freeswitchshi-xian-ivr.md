---
layout: default
title: "用FreeSWITCH实现IVR"
---

# {{ page.title }}

IVR的全称的Interactive Voice Response，就是我们经常说的电话语音菜单。FreeSWITCH支持非常强大的语音菜单──你可以写简单的XML，或更灵活的Lua，当然还有Event Socket，Erlang Socket等等。

这里，简单介绍一下XML。其实语音菜单说来也简单，说难也难。让我们先来一个感性的认识--其实，FreeSWITCH默认的配置已包含了一个功能齐全的例子，随便拿起一个分机，拨5000，就可以听到菜单提示了，当然，默认的提示是英文的，大意是说欢迎来到FreeSWITCH，拨1进入FreeSWITCH会议；拨2进入回音（echo）程序，这时候可以听到自己的回音；拨3听等待音乐（MOH，Music on Hold），拨4会转到FreeSWITCH开发者Brian West的SIP电话上；拨5你会听到一只尖叫的猴子；拨6进入下级菜单；拨9重听，拨1000-1019之间的号码则会转到对应分机。

最简单的菜单
--------

感受这些之后，让我们先来配置一种最简单的情形。一些廉价的企业小交换机通常只能提供这点功能──“您好，欢迎致电XX公司，请直拨分机号，查号请拨0”。在此，我们假定使用FreeSWITCH的默认配置，分机号为1000-1019，前台分机号为0，拨0则转人工台，查号或转接其它分机。

系统默认的配置文件存放在/usr/local/freesiwtch/conf/autoload\_configs/ivr.conf，配置文件是XML格式，菜单放到<menus> </menus>中，而每一个<menu> </menu>即是一个菜单。并且，每个menu应该有一个唯一的名字（name），以便在拨号计划（dialplan）中引用。

<code>
<configuration name="ivr.conf" description="IVR menus">
  <menus>
    <menu name="demo_ivr">
    </menu>
  </menus>
</configuration>
</code>

好，我们先来实现上述最简单的menu：

<code>
<menu name="welcome"
    greet-long="custom/welcome.wav"
    greet-short="custom/welcom_short.wav"
    invalid-sound="ivr/ivr-that_was_an_invalid_entry.wav"
    exit-sound="voicemail/vm-goodbye.wav"
    timeout="15000"
    max-failures="3"
    max-timeouts="3"
    inter-digit-timeout="2000"
    digit-len="4">

    <entry action="menu-exec-app" digits="0" param="transfer 1000 XML default"/>
    <entry action="menu-exec-app" digits="/^(10[01][0-9])$/" param="transfer $1 XML default"/> 

</menu>

</code>

我们指定菜单的名字是welcome，greet-long即为最开始播放的语音--“您好，欢迎致电XX公司，请直拨分机号，查号请拨0”，该语音文件默认的位置应该是/usr/local/freeswitch/sounds/，所以，您应该事先把声音文件录好，放到custom/welcome.wav（当然，你也可以使用其它路径，如/home/your\_name/ivr/welcome.wav）。并且，由于PSTN交换机都是使用PCM编码，所以，welcome.wav文件的格式应为单声道，8000HZ。

如果用户长时间没有按键，刚应重新提示拨号，但重新提示应该简短，如“请直拨分机号，查号请拨0”。所以，可以录制这么一个声音文件放到custom/welcome\_short.wav。

invalid-sound：如果用户按错了键，则会使用该提示。如果你安装时指定了make sounds-install，则该文件应该用默认存在的，只是它是英文的，如果你需要中文的提示，可以自己录一个放到custom中。

exit-sound：不说也知道，最后菜单退出时（一般时超时），会提示Good Bye。

timeout指定超时时间；max-failures容忍用户按键错误的次数。max-timeouts即最大超时次数。inter-digit-timeout为两次按键的最大间隔（毫秒），如用户拨分机号1001时，如果拨了10，等2秒，然后再按01，这时系统收到的号码为10，则会提示错误 invalid-sound。

digit-len说明菜单项的长度，在本例中，用户分机号为4位。

该menu中有两个选项，第一个是在用户按0时, menu-exec-app执行一个命令（参见[mod\_command](http://wiki.freeswitch.org/wiki/Mod_command)），在此处它执行transfer，将来话转到分机1000。

如果来电用户知道分机号，则可以直接拨分机号，而不用经过前台转接，节约时间。在该例中，正则表达式"/^(10\[01\]\[0-9\])$/" 会匹配用户输入1000-1019之间的分机，

以上菜单设定好后，需要在控制台中执行 reloadxml （或按F6）才可以配置生效。

配置完成后就可以在控制台上进行测试：

FS> originate user/1001 &ivr(welcome)

测试成功后，当然，你可能需要先把用户来话转到语音菜单。根据配置不同，用户来话的接听有多种配置方式，一般来说，来话会先到达public dialplan，所以，你可以在conf/dialplan/public.xml中加入一个extension:

<code>
    <extension name="incoming_call">
      <condition field="destination_number" expression="^你的DID号码$">
	<action application="answer" data=""/>
	<action application="sleep" data="1000"/>
	<action application="ivr" data="welcome"/>
      </condition>
    </extension>
</code>

这样，如果有外部呼叫进来，就可以听到语音菜单了。


默认菜单简介
--------

明白了以上简单的菜单，就很容易理解更复杂一点的配置了。系统默认提供了一个名字demo\_ivr的菜单。最初的语音提示greet-long/greet-short是用phrase实现的。phrase是用XML定义的一些短语，最终也是播放声音文件，但在多语言系统中会更灵活。在此，我们不讨论phrase，你可以简单的认为它就是一个声音文件。

菜单选项大多都是根据用户按键使用menu-exec-app执行相应的命令，上面已经讲到了。menu-sub表示会执行一个下级菜单，这样，在下级菜单中（此外是demo\_ivr\_submenu）便可以用menu-top来返回上级菜单。

基本上就这么多。通过设置多级菜单，以及与dialplan配合，根据不同的情况进行跳转，可以实现相当复杂的一些功能。如果这些还不够，可以尝试一下更高级的LUA菜单或Event Socket。


调试
--------

打开控制台或fs\_cli，按F8将loglevel调到debug状态，能看到详细的执行过程。如果看到红色的（如果你的控制台不支持彩色，看ERROR的吧），可能是配置错误，不过一般会是声音文件找不到之类的，检查相应路径下是否有对应的声音文件。
