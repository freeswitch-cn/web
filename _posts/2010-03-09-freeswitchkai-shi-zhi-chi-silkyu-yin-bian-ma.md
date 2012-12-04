---
layout: default
title: "FreeSWITCH开始支持SILK语音编码"
---

# {{ page.title }}

SILK编码是由Skype开发的高质量语音编码。它支持8, 12, 16 or 24 kHz 的抽样频率以及 6 到 40 kbit/s的比特率。SILK编在2009年7月最先应用于Skype 4.0 Beta 3 for Windows版本中。

作为eBay旗下的子公司，Skype表示该编码器即使在低带宽的环境中也能提供优化的通话质量。Skype说Silk可以提供实时的伸缩性以适应网络质量的下降，并且可以在比以前网络占用量小50%的情况下提供超宽带的音频信号。

Skype投入了数百万美元，耗时三年多开发了Silk，他们表示Silk可以使VoIP通话听起来好像你和对话的人在同一间房子里一样。大部分电话只能传输3.4kHz(码率)的信号，而Silk可以让Skype传输高达12kHz的信号。

2009年3月，Skype开始向第三方开发人员和硬件制造商提供免版税认证(RF)的Silk宽带音频编码器。

SILK虽然有免费的License，但不提供源代码，并且其提供的二进制版本也只有32位的。FreeSWITCH的开发者曾向Skype索要64位的版本却一直未得到答复，所以SILK编码支持也一直未进入FreeSWITCH。

今天，IETF刚刚发布了IETF草案。而仅在草案发布一小时20分钟后，FreeSWITCH开发者Brian West就写了Perl一个脚本从草案中取出了源代码，并集成到FreeSWITCH中。

Brian在邮件列表中说到：


We now have mod_silk in tree it has only been tested on Linux so far.  The silk library itself was released in the IETF draft only an hour and twenty minutes ago.  I wrote a perl script to extract the source from the draft.  Checked in the lib and the codec module which I had written to the binary lib I had a few months ago.

It has more work to do... but its there if anyone wants to chip in and libtoolize the library, revamp the build system and assist in testing the codec on multiple platforms.

