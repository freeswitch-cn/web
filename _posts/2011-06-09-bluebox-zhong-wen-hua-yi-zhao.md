---
layout: default
title: "BlueBox 中文化一招"
---

# {{ page.title }}

前段时间有好多网友在讨论 BlueBox 的中文化一事。BlueBox 在切换到中文后就跟死了一样。查看以前的bug list有人也讨论过这个问题，有人回答说是 Rosetta 的问题，很快就能修好，不过我看都过了一年了也没人修。

另外，我前一阵又向邮件列表发了一个邮件，可是没人回应。不知道目前这个项目状态怎么样。

不过前两天我确实研究了一下这个东东，想了个歪招汉化了一下，有兴趣的朋友不妨试试。

找到 bluebox/modules/rosetta-1.0/libraries/RosettaManager.php

注释掉两个 

  $translation->save();

然后把

        public function lookup($string)
        {

后面加上
               $a = array('Logout' => '注销',
                       'Language' => '语言',
                       'System' => '系统',
                       'Connectivity' => '连接',
                       'Applications' => '应用',
                       'Routing' => '路由',
                       'Status' => '状态',
                       'Organization' => '组织',
                       'Media' => '媒体',
                       'Account Manager' => '账户管理');

               if(array_key_exists($string, $a)) return $a[$string];
               return $string;


好了，存盘试试吧。

记着把文件编码格式存成  UTF8 的。以上在  linux 上测试通过。

在我的 mac  上，发现还是有乱码，我改了一下  /bluebox/skins/bluebox/layout.php，把两处 ucfirst($branch)  改成  $branch 搞定。

当然以上翻译还不全，有兴趣的照上面自己翻译吧。

希望对各位有所帮助。
