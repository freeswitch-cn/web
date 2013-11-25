---
layout: post
title: "[投稿]如何向通话中的另一方发送DTMF"
tags:
  - "FreeSWITCH技巧"
  - "默言"
  - "投稿"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


注：这里的文章都是本人的日常总结，请尊重下个人的劳动成果，转载的童鞋请注明出处，谢谢。
如您转载的文章发生格式错乱等问题而影响阅读，可与本人联系，无偿提供本文的markdown源代码。
联系邮箱：jizhask@gmail.com.

##需求描述##

在实际的应用中，经常有这样的需求，比如一个号码拨打外线，需要送dtmf出去（如拨打10086，根据提示按1按2等），在这种情况下，如果处理呢？

##需求分析##
其实该问题可以分解为下面两个子问题：
1、如何根据一方号码，获取与之通话的另一方号码？ 比如66903 拨打 66904，那如何根据66903来获取到66904呢？

**解决方法：**

通过执行FreeSWITC的API命令，可以获取另一条信道的信息，如下：

     show channels like 66903@ as xml

在该命令的返回值中抽取sent\_callee\_num，即为另一方的号码。
下面是具体的实现方法：

    --根据一方号码获取另一条腿的UUID
    function getOtherLegUUID(api,num)
        local uuid;
        local res=api:executeString("show channels like "..num.."@ as xml")

        ----判断获取的channel信息是否为空
        --fslog("debug","show channels res",res);
        --如果channel信息不为空
        if res and string.len(res) >0 then
            local _,_, sendCalleeNum = string.find(res,"<sent_callee_num>(.-)<%/sent_callee_num>");

            if sendCalleeNum then
                uuid = getUUIDByNum(api,sendCalleeNum);
            end
        end

        return uuid;
    end

2、如何向另一方号码发送dtmf？

**解决方法：**

该问题比较容易处理，只需要调用uuid\_send\_dtmf方法即可。前提条件是获取到那个信道的UUID。


##具体代码##

下面是完整的脚本代码，仅供参考：

    --/****************************************************/
    --脚本名称：send_dtmf_toleg.lua
    --脚本参数：
    --          argv[1]  当前通话的号码
    --          argv[2]  待发送的dtmf信息
    --脚本功能：
    --          根据当前通话的号码，查出另一条腿的uuid，然后向该uuid发送dtmf
    --作者：     默言 2013-11-24
    --/****************************************************/

    --输出freeeswitch日志
    function fslog(loglevel,logtitle, logbody)
        loglevel = loglevel or "debug";
        logtitle = logtitle or "";
        logbody = logbody or "";
        freeswitch.consoleLog(loglevel, "\n" .. argv[0] .. " : " .. logtitle .. "{" .. logbody .. "}\n");
    end

    --获取号码对应的uuid
    --参数：num， 待查询号码
    --返回：号码对应的通道的uuid
    function getUUIDByNum(api, num)
        local uuid;

        local res=api:executeString("show channels like "..num.."@ as xml")
        if res then
            --使用正则表达式从字符串中截取uuid
            --'-'代表最短匹配
            _,_,uuid = string.find(res,"<uuid>(.-)<%/uuid>")
        end

        fslog("debug","getUUID:" .. num, uuid);
        return uuid;
    end

    --根据一方号码获取另一条腿的UUID
    function getOtherLegUUID(api,num)
        local uuid;
        local res=api:executeString("show channels like "..num.."@ as xml")

        ----判断获取的channel信息是否为空
        --fslog("debug","show channels res",res);
        --如果channel信息不为空
        if res and string.len(res) >0 then
            local _,_, sendCalleeNum = string.find(res,"<sent_callee_num>(.-)<%/sent_callee_num>");

            if sendCalleeNum then
                uuid = getUUIDByNum(api,sendCalleeNum);
            end
        end

        return uuid;
    end


    do
        local legNum=argv[1];
        --待发送的dtmf信息
        local dtmfs = argv[2];

        fslog("debug","start to send dtmf, legnum",legNum);
        fslog("debug","need send dtmfs", dtmfs);

        if legNum and tonumber(legNum) then
            api=freeswitch.API();
            uuid=getOtherLegUUID(api, legNum);
            if uuid then
                local cmd = "uuid_send_dtmf " .. uuid .. " " .. dtmfs;
                fslog("debug","send_dtmf cmd", cmd);
                api:executeString(cmd);
            else
                fslog("warning","cannot get another leg uuid","");
            end
        else
            fslog("warning","invalid parameters","");
        end
    end
