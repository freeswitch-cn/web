---
layout: post
title: "FreeSWITCH & 潮流IP电话高性价比企业通信解决方案"
tags:
  - "联合解决方案"
---


# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


FreeSWITCH作为核心的交换机，Grandstream IP电话作为终端话机。Grandstream IP电话包括基础普及型及企业中高端型多个产品型号，覆盖了企业通信组网中包括前台、员工、管理层等不同的通话需求；千兆/百兆网口直接接入IP网络，可以省去为电话单独布线的麻烦；具有卓越的高清语音品质，丰富领先的电话系统功能，并提供用户个性化的信息定制和企业ICT集成接口，支持自动部署和先进的安全保护机制，是企业高性价比通信解决方案的首选电话终端。

FreeSWITCH的默认配置就是一个小型的企业通信PBX，因而，配置起来相当简单。

## 安装FreeSWITCH

FreeSWITCH是跨平台的，因而大家可以选用适合自己的平台。

### 在Windows上安装

Windows平台是大家在平时办公应用中使用最广泛的平台，FreeSWITCH在Windows上安装最简单：
 
1)	直接下载安装文件，下载地址为 http://files.freeswitch.org/windows/installer；  
2)	根据自己的系统，选择相应的目录（freeswitch.msi是最新的安装程序，一般隔几天就会更新到最新的版本）；  
3)	一路默认，即连续单击“Next”；  
4)	安装完毕。

完成后，选择”开始菜单”->“所有程序”->“FreeSWITCH”-> “FreeSWITCH”便可以启动FreeSWITCH了，启动后的界面如图所示：

![FreeSWITCH启动界面](/images/solution/img06.jpg)

如果安装过程中你没有修改默认安装路径的话，那么FreeSWITCH的实际安装路径是：c:\Program Files\FreeSWITCH，配置文件在该目录的conf目录下。

### 在Linux上安装

在Linux上安装要稍微复杂一些，但对于有经验的Linux系统管理员来说，这都不是事。首先，FreeSWITCH有基于Debian和Centos/Redhat的安装包，可以很方便的安装。当然，如果喜欢折腾的管理员也可以自己从源代码编译。

下面，我们以Debian为例讲一个基本的安装方法：

虽然FreeSWITCH可以装在类似Ubuntu、CentOS、Redhat、等Linux发行版上，但是，Debian是官方推荐的系统，安装起来都更方便一些。

#### 安装依赖包

1)	首先更新源列表

	apt-get update

2)	然后安装所需依赖包

	apt-get install autoconf automake devscripts gawk g++ git-core libjpeg-dev \
    libncurses5-dev libtool make python-dev gawk pkg-config libtiff5-dev \
    libperl-dev libgdbm-dev libdb-dev gettext libssl-dev libcurl4-openssl-dev \
    libpcre3-dev libspeex-dev libspeexdsp-dev libsqlite3-dev libedit-dev libldns-dev

3)	安装FreeSWITCH

方法一、使用deb包安装

	echo 'deb http://files.freeswitch.org/repo/deb/debian/ wheezy main' >> /etc/apt/sources.list.d/freeswitch.list
	curl http://files.freeswitch.org/repo/deb/debian/freeswitch_archive_g0.pub | apt-key add -
	apt-get update
	apt-get install freeswitch-meta-vanilla
	cp -a /usr/share/freeswitch/conf/vanilla /etc/freeswitch

方法二、 从源代码编译安装

1)	从git地址下载源码

	git clone https://stash.freeswitch.org/scm/fs/freeswitch.git
	cd freeswitch

2)	编译安装

	./bootstrap.sh
	./configure
	make install
	ln -sf /usr/local/freeswitch/bin/freeswitch /usr/bin/
	ln -sf /usr/local/freeswitch/bin/fs_cli /usr/bin/

## 启动 FreeSWITCH

安装完成后，可以使用以下命令来启动FreeSWITCH：

	freeswitch -nc

以下命令可以连接到FreeSWITCH控制台，进行各种操作：

	fs_cli

## 注册话机

FreeSWITCH安装运行以后，自己默认带了1000到1019一共20个账号，因而，一点都不需要配置。所以，我们可以直接将话机终端“注册”到FreeSWITCH上打电话。

以潮流（GrandStream）话机GXP2130（型号）为例，它的配置界面如下图所示。其中“账号名”可以随便填，“SIP服务器”中输入你的IP地址，“SIP用户ID”、“认证ID”及“名称”都填入1003，“密码”也是默认的1234。点击保存并提交后即可注册。潮流话机的注册状态是在单独的“状态”页面中显示的。

FreeSWITCH安装运行以后，自己默认带了1000到1019一共20个账号，因而，一点都不需要配置。所以我们可以直接将话机终端注册到FreeSWITCH上打电话。

![账号配置界面](/images/solution/img07.jpg)

这里面要填写的账号信息有以下几个选项：

1.	激活账号：选是激活该账号  
2.	帐号名：随意填写  
3.	SIP服务器：填写FreeSWITCH的IP地址  
4.	次要SIP服务器和出局代理商服务器可选项，如没有就不必要填写。  
5.	SIP用户ID：填写FreeSWITCH分配的账号  
6.	认证ID：与用户ID一样  
7.	认证密码：填写用户账号密码

## 体验各种功能

FreeSWITCH默认的配置就具备比较完善的PBX功能，下面介绍下我们注册多个话机后，体验以下话机功能。

### 转移

呼叫转移功能是在办公应用中经常用到的功能。转移分为盲转和协商转两种。

所谓盲转，是指下面这种场景：首先A与B已建立通话，这时候B想把A转接给C。这里，B称为Transferor，它是转接的发起者；而A称为Transferee，它是被转接的一方；C称为Target，是转接的目的地。转接成功后B与C通话。

在SIP的实现上，B首先发re-INVITE请求给FS（FreeSWITCH），请求将B的电话置为Hold（保持）状态，FS收到请求后就给A播放保持音乐。同时，B的话机放拨号音，以提示用户输入被叫号码。B输入C的号码后，B给FS发REFER请求。FS收到后会释放B，并同时呼叫C。如果C正常接听，则A与C通话，转接完成。

潮流话机（GXP2130）上的操作：

1)	用户A与用户B建立通话。  
2)	用户A按TRANSFER键，输入用户C的号码后按SEND键发送呼叫。  
3)	当前通话被无条件转移至用户C。

潮流话机支持多路通话，因而可以在话机端（通过Refer）实现协商转。典型地，话机终端B可以把第一路电话置于Hold状态，然后再发起另外一路通话到C，C接听后B可以任意切换与A和C之间的通话，并可以通过本地会议桥进行混音以支持三方通话（也叫会议）。

此时B如果想退出A与C的通话，则可以发送REFER消息，让服务器把通话中的B替换为C。该消息与盲转不同的是，它带了Replaces参数，如下：

	Refer-To: sip:1002@192.168.1.118?Replaces=1388923627@192.168.1.110;to-tag=NDj261X80jpKF;from-tag=1013380895>
	
潮流话机（GXP2130）上的操作：

1)	用户A与用户B建立通话。  
2)	用户A按另一路线路按键，输入用户C的号码后按SEND键发送呼叫。此时用户A与用户B的通话被保持。  
3)	用户C接听电话，与用户A建立通话。  
4)	用户A按TRANSFER键，然后按需要转移的呼叫对应的线路按键。  
5)	通话被转移至用户C，用户A退出通话。

###	代接

代接——（别人给A打电话时）A电话振铃后，在B话机上进行接听（代替A来接听）。一般用于办公室中某工位上没人其它工位上的人代为接听的场景。

FreeSWITCH默认的Dialplan中就有代接相关的例子。其中，886为全局代接。即，当有分机振铃时，在另外的话机上直接按886就能接听，同时原先振铃的话机结束振铃。“ * 8”为组内代接，也就是同组代答，即在上述情况下按“ * 8”只能代接本组内的正在振铃的分机。以上两种方式在有多个分机同时振铃时只能接听最后振铃的那一个。此外，还有一个“ ** ”前缀码，拨打“ ** ”加上指定的分机号就能直接代接指定分机，如拨“ ** 1001”就可以接听正在振铃的1001分机上的电话。当然，上面讲的只是FreeSWITCH的默认配置，实际的拨号规则可以根据用户的拨号习惯灵活的进行配置。

###	多方通话（GXP2130）

**开始会议**

方法一：  
步骤 1.	会议发起者使用一条线路与参与者A建立通话连接。  
步骤 2.	按另一路线路按键，选择相同账号，与参与者B建立通话连接，此时参与者A的通话被保持。  
步骤 3.	按CONF键发起会议。  
步骤 4.	按线路按键将相应的线路加入会议。  
步骤 5.	重复步骤2到步骤4，可以将更多的参与者添加到会议。

方法二：  
步骤 1.	会议发起者使用一条线路与参与者A建立通话连接。  
步骤 2.	按CONF键发起会议，输入参与者B的号码并发送。  
步骤 3.	与参与者B建立通话后按CONF键或根据屏幕提示按下“会议呼叫”对应的软按键。  
步骤 4.	重复步骤2和步骤3，可以将更多的参与者添加到会议。

说明：电话会议开始后，会议发起者不能中途退出会议。用户可以开启静音以避免在会议中发言。

**取消会议**

按CONF后，如果用户决定不添加任何参与者进入会议，则再次按CONF，就恢复到正常通话状态了。

**分裂和重建会议**

会议过程中发起者按下HOLD键将会议成员置为保持状态，此时会议分裂，屏幕上出现“重建会议”选项。按下“重建会议”对应的软按键后会议恢复或者按下保持中的线路键与其他成员单独通话。

**结束会议**

步骤 1.	会议发起者按HOLD键结束会议，发起者与参与者之间的通话转为呼叫保持。按线路按键可以与相应的参与者进行单独通话。  
步骤 2.	会议发起者结束通话，则会议中的各方均断开通话连接。

###	IAD设备连接模拟话机(GXW4216)

在实际应用中，如果是使用IAD网关设备则需要连接模拟话机。这里说的模拟电话机就是我们在家里或公司中常见的普通电话机，由于历史原因，很多家庭或单位还有一些遗留下来的模拟话机，我们当然希望在有了FreeSWITCH的VoIP时代也让这些旧话机焕发新生。

潮流网络语音网关种类较全，有1至48端口的语音网关，配置方法都较类似。这里采用一款型号为GXW4216的多口高密度模拟网关为例，它有16个普通电话接口（RJ11）和一个以太网接口(RJ45)，电话接口用于连接普通电话，以太网口用于通过以太网连接FreeSWITCH。如果把它和与之相连的模拟话机看成一体的话，实际上就相当于一个SIP话机。也可以说，这款模拟网关能把普通的模拟话机“变”成一个SIP话机。

GXW4216网关有一个简单的Web配置界面，如下图所示：

![web配置界面](/images/solution/img08.jpg)

![会议界面](/images/solution/img09.jpg)

1)	首先切换到“模板1”配置界面，配置相关的SIP服务器地址。

a)	启用模板：是。  
b)	SIP服务器：填入FreeSWITCH服务器的IP地址。  
c)	次SIP服务器：这里是一个备份服务器，可以不填。

2)	切换到“FXS端口”配置页面，配置端口的账号注册信息。

a)	SIP用户ID：填入注册的账号，在这里使用FreeSWITCH默认提供的账号1000。  
b)	认证ID：一般跟账号一样。  
c)	密码：填入账号的密码。  
d)	用户名：即SIP中显示的名字，可以随便填写。  
e)	模板：这里我们以模板一为例，所以选择“模板一”。
 
正确配置完上述选项后，就可以切换到“状态”页面查看注册状态。如果注册正常，拿起相连的模拟话机的话筒就可以听到拨号音，然后就可以像正常的SIP话机一样打电话了。别人拨打SIP账号1000时，模拟话机也会振铃。

这里有一个配置要介绍下，潮流网络近日针对中国呼叫中心及企业通讯市场的语音网关需求和使用环境特点，推出1.0.5.5软件版本。本次软件版本充分考虑到中国企业网络接入及高并发的呼叫中心应用场景，量身定制做了全面优化工作，以符合中国呼叫中心及企业大容量的并发呼叫使用需求，并且针对中国用户提出配置操作复杂问题，进行了统一优化工作，提供一键优化的简洁配置方法，用户只需选择China ITSP模式，即可轻松完成中国制式配置，这将大大改善国内模拟话机的兼容使用。

配置方式：

1）	进入GXW42XX的高级配置—>系统功能配置页面，修改定制部署方案为“China ITSP”模式，保存应用，如下图所示：

![系统功能配置界面](/images/solution/img10.jpg)

2）保存修改信息，并重启设备应用修改。

### 通过网关拨打外部电话

首先在FreeSWITCH里的dialplan下设置路由，默认路径：/usr/local/freeswitch/conf/dialplan/default.xml，以9为出局码，网关地址：192.168.1.10，具体如下：

	<extension name="grandstream">
	   <condition field="destination_number" expression="9(.*)">
	      <action application="bridge" data="sofia/internal/$1@192.168.1.10"/>
	   </condition>
	</extension>

添加完毕后，在FreeSWITCH控制台执行reloadxml就可以了。接下来再配置网关。

我们使用的是潮流单口网关HT503，HT503的FXO端口注册到FreeSWITCH服务器上，当出局呼叫通过FXO端口时，通话将会从FreeSWITCH呼叫到外部。下面我们来看下HT503如何对接FreeSWITCH。

A. 首先准备工作，在FXO接入PSTN模拟线；  
B. 获知HT503的IP地址，并通过WEB方式（网页浏览方式）访问获取到该IP地址进入设备FXO PORT 页面，进行端口注册基本配置，如下图：

![端口配置界面](/images/solution/img11.jpg)

一般情况下，配置账号注册需要配置以下选项，具体说明如下：  

1. 主SIP服务器：填入我们FreeSWITCH服务器的IP地址；  
2. 次SIP服务器：一个备份服务器，可以不填；  
3. SIP 用户ID：我们注册的账号，在这里我们使用FreeSWITCH默认提供的账号1000；  
4. 认证ID：跟账号一样；  
5. 认证密码：填入1234；  
6. 名字：可以随便起一个；  
7. 其他的都保留默认配置就可以了。

C. 当FXO端口注册上去后，FS下的分机根据出局路由规则拨打号码，通话从FXO端口出局。

###	呼入电话处理、IVR

IVR（Interactive Voice Response，交互式语音响应）实际上就是我们经常说的电话语音菜单。在练习IVR的配置之前，我们先来一个感性的认识： FreeSWITCH默认的配置已包含了一个功能齐全的例子。随便拿起一个分机，拨5000，就可以听到菜单提示了。当然，默认的提示是英文的，大意是说欢迎来到FreeSWITCH，按1进入FreeSWITCH会议；按2进入回音（echo）程序（这时候可以听到自己的回音）；按3听等待音乐（MOH，Music on Hold）；按4转到FreeSWITCH开发者Brian West的SIP电话上；按5会听到一只猴子的尖叫；按6进入下级菜单；拨9重听；拨1000～1019之间的号码则会转到对应分机。

我们来练习配置一种最简单的情形。当有电话呼入时，会播放：“您好，欢迎致电某某公司，请直拨分机号，查号请拨0”。然后，来话用户就可以输入1000～1019之间的分机号，也可以直接按0转到人工台（如分机1000）进行查号，或要求转接其他分机。

IVR系统默认的配置文件为conf/autoload_configs/ivr.conf.xml，它装入conf/ivr_menus/目录下所有的XML文件。系统有一个示例的IVR配置，叫demo_ivr，也就是我们刚才拨5000听到的那个。
为了实现我们的目标菜单，我们创建一个XML配置文件conf/ivr_menus/welcome.xml，内容如下：

	<include>
	    <menus>
	        <menu name="welcome"
	            greet-long="welcome.wav"
	            greet-short="welcom_short.wav"
	            invalid-sound="ivr/ivr-that_was_an_invalid_entry.wav"
	            exit-sound="voicemail/vm-goodbye.wav"
	            timeout="15000"
	            max-failures="3"
	            max-timeouts="3"
	            inter-digit-timeout="2000"
	            digit-len="4">
	
	            <entry action="menu-exec-app" digits="0" param="transfer 1000 XML default"/>
	            <entry action="menu-exec-app" digits="/^(10[01][0-9])$/"
	                   param="transfer $1 XML default"/>
	        </menu>
	    </menus>
	</include>

在上述配置中，首先，我们指定菜单的名字（name）是welcome，其他各项的含义如下：

1. greet-long：指定最开始的欢迎音，即为最开始播放的“您好，欢迎致电某某公司，请直拨分机号，查号请拨0”的语音，该语音文件默认的位置应该是在/usr/local/freeswitch/sounds目录下。
2. greet-short：该项指定一个简短的提示音。
3. invalid-sound：如果用户按错了键，则会使用该提示。如果你安装时使用了“make sounds-install”命令安装了声音文件，则该文件应该是默认存在的。
4. exit-sound：该项指定最后菜单退出时（一般是超时没有按键）的声音，默认会提示“Good Bye”。
5. timeout：指定超时时间（毫秒），即多长时间没有收到按键就超时，播放其他提示音。
6. max-failures：为容忍用户按键错误的次数。如果用户的按键与下面配置的正则表达式不匹配（即没有找到相关的菜单项），就认为是错误。
7. max-timeouts：即最大超时次数。
8. inter-digit-timeout：为两次按键的最大间隔（毫秒）。如用户拨分机号1001时，假设拨了10，等3秒，然后再按01，这时系统实际收到的号码为10（后面的01超时后没有收到），则会播放invalid-sound指定的声音文件以提示错误。
9. digit-len：说明菜单项的长度，即最大收号位数。在本例中，用户分机号长度为4位，因此我们使用4。

以上菜单设定好后，需要在控制台中执行reloadxml（或按F6键）使配置生效。

配置完成后就可以在控制台上进行如下测试（呼叫1001，接听后进入ivr菜单）：

	freeswitch> originate user/1001 &ivr(welcome)

测试成功后，你就可以配置Dialplan把并户来话转接到菜单了，在Dialplan中加入一个extension（请注意，你需要加到正确的Dialplan Context中，如果不确定应该加到哪个Context中的话，在default和public中都加上会比较保险。）:

	<extension name="incoming_call">
	    <condition field="destination_number" expression="^1234$">
	        <action application="answer" data=""/>
	        <action application="sleep" data="1000"/>
	        <action application="ivr" data="welcome"/>
	    </condition>
	</extension>

接下来呼叫1234进行测试，就可以听到我们刚才配置的IVR菜单了。注意，在实际应用中，为了能接受外部来的呼叫，你可能要把这里的1234改成你实际的DID（Direct Inbound Dial）号码。

###	添加一个账号

在实现应用中，FreeSWITCH默认提供的20个账号可能不够用；或者，我们需要不同的号码段（如使用600~699号码段）作为分机号。这时，就需要添加一个新的账号。

我们已经了解现有的用户配置文件是存放在FreeSWITCH安装目录的conf/directory/default目录下，每个用户对应一个XML配置文件，如1000.xml即包含了1000这个用户的配置文件。例如我们要添加6001这个用户，只需以1000.xml为模板，将该文件中的内容复制为6001.xml，然后把6001.xml文件中的所有出现1000的地方全部替换成6001即可。

当然，除了手工的复制和替换外，上述步骤可以在UNIX系统上的Shell中使用下列命令完成：

	# sed -e "s/1000/6001/" 1000.xml > 6001.xml

###	批量添加账号

如果需要添加很多账号，很显然一个一个的添加是不现实的。

其实也很简单，如果在Linux系统下，我们只需要用一下Shell中的for循环就可以了。比如我们要创建6020～6039这20个用户，具体的Shell命令如下：

	# for i in `seq 6020 6039`; do sed -e "s/1000/$i/" 1000.xml > $i.xml ; done

使用Windows平台的人，可以安装UnxUtils，就可以使用大部分的UNIX命令了。如我们可以使用如下“.bat”脚本完成同样的添加用户的功能（将下列内容存到与1000.xml相同的目录下的扩展名为“.bat”的文件中，用鼠标双击即可执行）：

	for /L %%i in (6020, 1 6039) do sed -e "s/1000/%%i" 1000.xml > %%i.xml

创建完用户配置文件后就可以在FreeSWITCH中使用reloadxml命令使之生效了。配置生效后，使用这些用户注册和呼出都没有问题，如果这些用户也需要做被叫的话，那就需要修改Dialplan，增加到这部分用户的路由。如，我们增加了6020～6039这20个用户后，可以简单地将默认的Dialplan中的正则表达式“^(10[01][0-9])$”改为“^(60[0-3][0-9])$”，就可以包含我们新创建的用户了。更改后的部分内容如下：

	<extension name="Local_Extension">
	    <condition field="destination_number" 
	expression="^(60[0-3][0-9])$">

###	视频通话

FreeSWITCH也支持基于SIP的视频通话，潮流有很多型号的视频话机如GXV3275，下面我们来看一看基本的设置，以及视频转码与录像等高级话题。

1)	配置视频通话：

FreeSWITCH默认的配置文件中并没有对视频编解码的相关项，因而默认不支持视频呼叫。如果需要支持视频呼叫，只需要在配置文件中增加相关的视频编解码就可以了。

目前FreeSWITCH支持的视频编解码有H261、H263、H263-1998（H263+）、H263-2000（H263++）、H264、VP8等。具体应该使用哪种或哪几种编解码需要看SIP终端的支持。需要注意的是，与音频编解码不同，FreeSWITCH中的视频编解码目前仅支持透传，即FreeSWITCH仅将通话中一方的视频原样送到另一方去，而不做任何编码转换。这就要求进行视频通信的双方要使用一致的编解码。

FreeSWITCH支持的媒体编码默认是在conf/vars.xml中定义的，读者可以在该文件中找到类似下面的配置：

	<X-PRE-PROCESS cmd="set" data="global_codec_prefs=G722,PCMU,PCMA,GSM"/>
	<X-PRE-PROCESS cmd="set" data="outbound_codec_prefs=PCMU,PCMA,GSM"/>

以上两行分别定义了两个全局变量，它们的字面意思分别是全局的和出局的编解码首选项。假设我们增加H264编码支持，配置如下：

	<X-PRE-PROCESS cmd="set" data="global_codec_prefs=G722,PCMU,PCMA,GSM,GSM,H264"/>
	<X-PRE-PROCESS cmd="set" data="outbound_codec_prefs=PCMU,PCMA,GSM,GSM,H264"/>

修改完上述配置文件后，由于它实际修改的是全局变量，一般来说需要重启FreeSWITCH才能使之生效（当然也有不重启FreeSWITCH使之生效的方法，但由于操作比较复杂，在此就不多介绍了）。

配置完毕后可以使用如下命令查看是否生效（其中“CODECS IN”和“CODECS OUT”分别代表入局和出局时使用的编解码）：

	freeswitch> sofia status profile internal

	=====================================================================
	======================================
	Name                internal
	CODECS IN           G722,PCMU,PCMA,GSM,G729,H264
	CODECS OUT          PCMU,PCMA,GSM,G729,H264

配置了正确的视频编解码后，就可以在视频话机之间进行视频通话了。

2)	视频录像与回放

FreeSWITCH中支持录音，有了视频通话后，大家就希望支持录像。与录音相比，录像要复杂一些。录像数据要按一定的格式存储在文件中，而这些文件格式有好多种。不同的文件格式称为不同的容器（Container），在这些容器中，通常会包含多个音频轨道（Track）和视频轨道，有的还含有同步信息。

目前，处理视频格式最好的开源软件就是ffmpeg，暂时还没有人将它与FreeSWITCH集成（这样说也不全对，因为笔者已经在做了）。FreeSWITCH中实现了一个简单的mod_fsv模块，提供FreeSWITCH中的录像及回放支持。它不依赖于任何其他的视频处理库，而是自己定义了一种私有的格式，将音频轨道用L16编码的数据保存，视频轨道则将整个RTP原始包都保存进去。

在默认的Dialplan中，也提供了录像与回放的例子。拨打9193可以通过record_fsv App进行录像，Dialplan的设置如下：

	<action application="record_fsv" data="/tmp/testrecord.fsv"/>

录像过程中，用户可以看到自己的视频也被原样echo了回来。

录制完成后，就可以拨打9194播放刚刚录制的录像了，它是使用play_fsv App实现的:

	<action application="play_fsv" data="/tmp/testrecord.fsv"/>

**小结**：

从上面我们可以看出， FreeSWITCH与潮流IP电话组合部署提供了很好的的企业通信解决方案。
FreeSWITCH是开源的软交换软件，不仅配置非常灵活，而且在性价比方面也有非常好的优势。对于最终用户来说，FreeSWITCH的默认配置就已经包含了非常实用的功能，基本不用太多的配置。对于集成商或开发人员来说，FreeSWITCH提供了非常丰富灵活的开发接口，因而也能很容易的与业务系统进行集成。

