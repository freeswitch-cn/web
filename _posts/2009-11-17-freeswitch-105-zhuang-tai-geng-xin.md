---
layout: default
title: "FreeSWITCH 1.0.5 状态更新"
---

# {{ page.title }}

FreeSWITCH version 1.0.5 没有如期发布，根据[官方的说法](http://www.freeswitch.org/node/218)，因为有好多的Jira Issue需要处理。 但这其实影响也不大，因为我们大多数人都是生活在trunk上。

Brian West，核心的开发者，在邮件列表上如是说：


>    1.0.5 is coming soon... We were ready to release on the tuesday
> morning we said but we woke up and Jira was flooded with tons of new
> issues half of which we asked for more info on and the reporters
> aren't responding.  So the key is if you open a jira be ready to
> respond because I'm not going to chase people down anymore.  On that
> note we need more people to help out on Jira... All it takes is asking
> questions and trying to reproduce things that are reported thats the
> hard part... Once something can be reproduced reliably we can fix it
> faster.

大致是说在临发布之际忽然出现了很多Jira报告，并且当他们跟踪时又有一半的报告者失去了联系。所以，如果有人汇报了Bug还是需要及时跟踪，以便于开发者及时修复问题。

另外，很高兴地看到FreeSWITCH的CoreDB支持ODBC了，这样，其它应用程序就可以更方便的查询这些数据。在此之前，只有mod_sofia等少数几个模块支持ODBC，而核心DB是SQLite。SQLite作为单机版数据库，无法在网络环境下访问，而且，在与FreeSWITCH并行访问时会遇到Lock。不过，把SQLite作为内存数据库应该还是最好地选择。
