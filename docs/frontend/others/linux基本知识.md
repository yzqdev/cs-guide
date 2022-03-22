---
title: linux基本知识
category: Configuration
tag:
  - linux
  - Config
translate_title: basic-knowledge-of-linux
date: 2017-12-18 09:17:00
description:
---

标签： linux

Linux 的命令行

## 第一章

安装桌面环境: login 进入系统之后，开始进行用户界面的安装。首先输入如下命令：
`sudo apt-get install xinit`
上述安装完毕之后，再安装环境管理器。本人亲测安装的是 GNOME。使用如下命令安装：
`sudo apt-get install gdm`
然后，安装桌面环境。
<!--more-->
本人亲测安装的是 KUbuntu。安装命令如下：

`sudo apt-get install kubuntu-desktop`
`sudo apt-get install gnome-session-fallback`

或者：

`sudo apt-get install gnome-panel`
。安装时的界面如下所示

安装中文语言包
`sudo apt-get install language-pack-zh-han*`

安装 gnome 包
`sudo apt-get install language-pack-gnome-zh-han*`

安装 kde 包
`sudo apt-get install language-pack-kde-zh-han*`
到这里就能够查看目录下面的中文字符了。

最后运行语言支持检查
`sudo apt install $(check-language-support)`
会更新最新的语言支持包设置语言:改英文: 用 vi(或 nano 等文本编辑器)打开 /etc/default/locale 文件将原来的配置内容修改为
LANG=”en_US.UTF-8″
LANGUAGE=”en_US:en”
再在终端下运行：
`locale-gen -en_US:en`
注销或重启后，即可恢复为英文的语言环境。改为中文:
1、修改／etc/default/locale
如不存在则新建一个如下：

> LANG='en_US' #中文可以用 zh_CN
> LANGUAGE='en_US:en' #中文可以用 zh_CN:zh

2、reboot 即可
locale 命令可以列出当前系统所用的所有语言设置
```
Sudo apt install
Sudo apt install
sudo apt
```
apt 1.4 (amd64)
用法： apt [选项] 命令

命令行软件包管理器 apt 提供软件包搜索，管理和信息查询等功能。它提供的功能与其他 APT 工具相同（像 apt-get 和 apt-cache），但是默认情况下被设置得更适合交互。

常用命令：

```
  list - 根据名称列出软件包
  search - 搜索软件包描述
  show - 显示软件包细节
  install - 安装软件包
  remove - 移除软件包
  autoremove - 卸载所有自动安装且不再使用的软件包
  update - 更新可用软件包列表
  upgrade - 通过 安装/升级 软件来更新系统
  full-upgrade - 通过 卸载/安装/升级 来更新系统
  edit-sources - 编辑软件源信息文件
```

参见 apt(8) 以获取更多关于可用命令的信息。程序配置选项及语法都已经在 apt.conf(5) 中阐明。欲知如何配置软件源，请参阅 sources.list(5)。软件包及其版本偏好可以通过 apt_preferences(5) 来设置。关于安全方面的细节可以参考 apt-secure(8).
本 APT 具有超级牛力。

![](https://i.imgur.com/Ns68ca3.png)
好玩的软件 oneko,cmatrix,

软件安装,
```
gdebi ,gedit ,cinnamon ,mate,xfce,unity,gnome-fontviewer,或者 font-manager,gnome-ternimal,firefox,screefetch,file-roller(压缩包管理器),tree,transmission(迅雷),gnome-software 软件更新器,gnome-packagekit 软件包 unbuntu-desktop, Software-properties-gtk(软件源,ppa 更新) Gnome-software (软件商店) Gnome-systemmoniter(任务管理器) FTP/SFTP 客户端: 声音视频:audacity,vlc,rhythmbox 图像处理:gimp 抓图工具:shutter gnome-web-photo Mypaint,darktable,inkscape,dia,shotwell, 录屏工具:gek-recordmydesktop 视频后期处理:openshot
```

搜狗输入法安装,安装 gdebi
进入搜狗输入法目录输入命令行: `sudo gdebi sogoupinyin_2.1.0.0086_amd64.deb`
安装 cinnamon :`sudo apt install cinnamon`
然后运行` cinnamon –replace`
运行图形化命令,gksu
Filezilla:`sudo aptitude install –y filezilla`

安装主题:
1. elementary os 的主题

```
sudo add-apt-repository ppa:elementary-os/daily
sudo apt-get update
sudo apt-get install elementary-icon-theme
```

2. ubuntukylin ukui 主题, www.ukui.org 官网教程安装这个就好
3. zorinos 主题安装方法，首先打开终端输入以下命令安装主题：

```
sudo add-apt-repository ppa:noobslab/themes
sudo apt-get update
sudo apt-get install zorinos-themes
```

在终端输入以下命令安装图标主题：
```
sudo add-apt-repository ppa:noobslab/icons2
sudo apt-get update
sudo apt-get install zorinos-icons
```
安装或使用调节工具：如 Unity Tweak Tool、Gnome-tweak-tool 或者 Ubuntu-Tweak 来启用主题和图标。

## 第二章 linux 的文件系统

Lib 各种动态链接库存放的位置,类似 windows 的 dll 文件,只不过 linux 的是.so 文件,
![](https://i.imgur.com/lWVyBIM.png)

````
```

```
````
