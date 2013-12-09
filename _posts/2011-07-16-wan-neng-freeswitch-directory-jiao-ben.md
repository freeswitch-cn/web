---
layout: post
title: "万能 FreeSWITCH directory 脚本"
tags:
  - "php"
  - "mod_xml_curl"
---

# {{ page.title }}

<div class="tags">
{% for tag in page.tags %}[<a class="tag" href="/tags.html#{{ tag }}">{{ tag }}</a>] {% endfor %}
</div>


好多人问我如何使用 mod_xml_curl 进行用户验证，每次回答指导都很费劲。今天用 PHP 写了一个万能脚本，希望对大家有帮助。

FreeSWITCH 默认使用静态的 XML 文件配置用户，但如果需要动态认证，就需要跟数据库关联。FreeSWITCH 通过使用　[mod_xml_curl](http://wiki.freeswitch.org/wiki/Mod_xml_curl) 模块完美解决了这个问题。实现思路是你自己提供一个 WEB 服务器，当有用户注册（或 INVITE）请求时，FreeSWITCH　向你的WEB服务器发送请求，你查询数据库生成一个标准的XML文件，FreeSWITCH 进而通过这一文件对用户进行认证。

好了，别的不多说了，看脚本(用PHP实现)：

  <?php
    $user =  $_POST['user'];
    $domain = $_POST['domain'];
    $password = "1234";
  ?>
  <document type="freeswitch/xml">
    <section name="directory">
      <domain name="<?php echo $domain;?>">
        <params>
          <param name="dial-string" value="{presence_id=${dialed_user}@${dialed_domain}}${sofia_contact(${dialed_user}@${dialed_domain})}"/>
        </params>
        <groups>
          <group name="default">
            <users>
              <user id="<?php echo $user; ?>">
                <params>
                  <param name="password" value="<?php echo $password; ?>"/>
                  <param name="vm-password" value="<?php echo $password; ?>"/>
                  </params>
                <variables>
                  <variable name="toll_allow" value="domestic,international,local"/>
                  <variable name="accountcode" value="<?php echo $user; ?>"/>
                  <variable name="user_context" value="default"/>
                  <variable name="effective_caller_id_name" value="FreeSWITCH-CN"/>
                  <variable name="effective_caller_id_number" value="<?php echo $user;?>"/>
                  <!-- <variable name="outbound_caller_id_name" value="$${outbound_caller_name}"/> -->
                  <!-- <variable name="outbound_caller_id_number" value="$${outbound_caller_id}"/> -->
                  <variable name="callgroup" value="default"/>
                  <variable name="sip-force-contact" value="NDLB-connectile-dysfunction"/>
                  <variable name="x-powered-by" value="http://www.freeswitch.org.cn"/>
                </variables>
              </user>
            </users>
          </group>
        </groups>
      </domain>
    </section>
  </document>


之所以称这是万能脚本，是因为它根本不查询数据库，任何注册请求只要密码是 1234 就都能通过注册。

好了，把上述PHP文件放到你的服务器上，确保它能正确执行。

接下来配置你的 FreeSWITCH,　conf/autoload_configs/xml_curl.conf.xml

<code>
<configuration name="xml_curl.conf" description="cURL XML Gateway">
  <bindings>
    <binding name="directory">
      <param name="gateway-url" value="http://localhost/~seven/freeswitch/directory.php" bindings="directory"/>
    </binding>
  </bindings>
</configuration>
</code>

然后

    reloadxml
    reload mod_xml_curl

拿起你的SIP电话注册试试吧，别忘了万能密码是 1234。

然后怎么办？把最开头的几行换能你的业务逻辑（查询数据库等），就实现你自己的认证了。

上面的 php 脚本也放到 github 上了：<https://gist.github.com/1086122>


调试：

* load mod_xml_curl 错误

mod_xml_curl 默认是不编译的，到你的源代码目录中执行 make mod_xml_curl-install

* 还是不行

哥们，别告诉我不行，你要告诉我哪里出错了。在 FS 中执行　xml_curl debug_on ，FS　会把每次请求生成的　XML　存到类似 /tmp/xxx.xml 的一个文件里，看看里面有什么。

