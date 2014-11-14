---
layout: post
title: "使用SIPP对FreeSWITCH进行稳定性及压力测试"
---

# {{ page.title }}

[SIPP](http://sipp.sourceforge.net/) 是一个很好的SIP测试工具，不过其缺省的配置文件好像有点问题，因此FreeSWITCH推荐使用以下配置文件进行测试：

http://www.freeswitch.org/eg/load_test/dft_cap.xml

使用方法很简单，只需要运行以下命令就可以了，我进行了个简单测试，每秒发一个请求，每个请示持续10秒（10000ms）。发到FreeSWITCH的5080端口：

	sipp -sf dft_cap.xml -r 1 -d 10000 192.168.1.21:5080 -rtp_echo

其中，-r 表示每秒发一个请求，-d 10000 表示每个呼叫持续10000毫秒（即10秒）192.168.1.21:5080对FreeSWITCH的IP和端口，-rtp_echo表示我们把收到的RTP信息原样送回去，跟FreeSWITCH中的echo()类似。


最初会收到好多404，那是因为还没有路由。看一下 FreeSWITCH 的 LOG，在FreeSWITCH public那个 context 里加个到 service的路由就好了：

    <extension name="200">
      <condition field="destination_number" expression="^service$">
        <action application="answer"/>
        <action application="playback" data ="local_stream://moh"/>
      </condition>
    </extension>

当然 SIP 还有好多选项，用起来也很灵活，抛砖引玉，剩下的就靠你慢慢琢磨了。祝玩得开心！
