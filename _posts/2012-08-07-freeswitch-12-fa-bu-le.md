---
layout: default
title: "FreeSWITCH 1.2 发布了"
---

# {{ page.title }}

根据Anthony 在 ClueCon 上的演讲, FreeSWITCH 1.2 在一分钟前发布了。


下载：<http://files.freeswitch.org/freeswitch-1.2.0.tar.bz2>


详见<http://www.freeswitch.org/node/410>。

更新：最新的版本里 windows 上编译不过去，在最新的 git Master 分支里应该已经修好，相信应该很快会 merge 到最新分支里去。

顺便科普一下 git 用法：

即使稳定版本也需要 git，稳定版的意思不是没有 bug，而是作为一个稳定的分支，以后不再追加新的功能，只会增加 bug fix。

更新

    git pull

基于远程分支生成一个本地分支

    git checkout origin/v1.2.stable -b v1.2.stable

    Branch v1.2.stable set up to track remote branch v1.2.stable from origin.
    Switched to a new branch 'v1.2.stable'

查看

    git branch -v

      master      72f1d39 FS-4504 --resolve
    * v1.2.stable 9c843d4 bump version

喜欢稳定版的同学以后呆在这里就好了，以后有了更新 git pull 一下就行。

任何时间都可以切换到 Master 分支：

    git checkout master

值得一提的是，FS核心团队现在正准备在master分支上更新 apr 库，未来的几个周可能会不大稳定，请注意。


更新 20120815:

<http://files.freeswitch.org/freeswitch-1.2.1.tar.bz2>
