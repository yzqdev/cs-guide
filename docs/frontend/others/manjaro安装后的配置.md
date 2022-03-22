---
title: 配置manjaro
category: linux
tag:
  - 编程
translate_title: manjaro config
abbrlink: 28633
date: 2022-03-15 19:17:00
description:
---


# 配置manjaro

:::tip
 记得进入设置>工作空间行为>锁屏>关闭自动锁屏，不然会卡死在登陆
:::

> ## 分区工具的使用 partitionmanager

```bash
sudo yay -S partitionmanager
```

> ## pacman 的日常使用

安装todesk远程控制

```javascript
yay -Ss todesk
找到todesk  
yay -S todesk-bin
# 需要开启u服务
systemctl start todeskd.service 
```

```bash
pacman -S xx1 xx2   # 安装或升级软件包，或者一列软件包（包含依赖包）
pacman -Sy          # 更新软件源
pacman -Syy         # 强制更新软件源
pacman -Su          # 更新软件包
pacman -Syu         # 更新软件源并更新软件包（-Syyu）
pacman -Sc          # 清除软件包缓存
pacman -Ss  xxx     # 搜索名字含 xxx 的软件
pacman -Ss ^xxx     # 搜索名字以 xxx 开头的软件
pacman -R xxx       # 删除单个软件包，保留其安装的依赖关系
pacman -Rs xxx      # 删除指定软件包，及其没有被其他已安装软件包使用的依赖关系
pacman -Rn xxx      # 一并删除全局配置文件
pacman -Rns xxx     # 删除一个软件的推荐命令
pacman -Rns $(pacman -Qdtq) # 删除没有依赖的包
pacman -Q           # 查询本地软件包数据库
pacman -Qq          # 查询本地软件包数据库，但不显示版本信息
pacman -Qe          # 查询非系统自带软件包数据库
pacman -Q | wc -l   # 查看有多少本地软件包
pacman -Qs regex    # 按正则表达式查询软件包
pacman -Qdt         # 查看没有依赖的包
```

## 更换源

```bash
//1.配置镜像源:
sudo pacman-mirrors -i -c China -m rank
//2.设置 archlinuxcn 源,
#使用方法：在 /etc/pacman.conf 文件末尾添加以下两行：

[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch

# 之后安装 archlinuxcn-keyring 包导入 GPG key。
//3.更新源列表
sudo pacman-mirrors -g
//4.更新pacman数据库并全面更新系统
sudo pacman -Syyu
//5.更新签名
sudo pacman -S archlinuxcn-keyring
//6.安装yay,e更换aur的源
sudo pacman -S yay git net-tools tree vim
//7.执行以下命令修改 aururl :
yay --aururl "https://aur.tuna.tsinghua.edu.cn" --save
//8.修改的配置文件位于 `~/.config/yay/config.json` ，还可通过以下命令查看修改过的配置：
yay -P -g
以后就可以直接执行yay -S 你要安装的软件名字，比如
yay -S netease-cloud-music
```

## 更新文件夹语言

```
export LANG=en_US
xdg-user-dirs-gtk-update  //弹出对话框，问是否改成英文，点是，并且选“不再提示”
export LANG=zh_CN
```

## 安装常用的软件

```bash
yay -S net-tools base-devel
浏览器我推荐brave浏览器
yay -S brave
chrome浏览器： yay -S google-chrome 
Microsoft-edge浏览器：yay -S microsoft-edge-dev-bin
Git软件： yay -S git 
Uget配合aria2： yay -S aria2 
下载工具： yay -S uget 
解压工具： yay -S p7zip file-roller unrar 
图像编辑器： yay -S gimp （开源版PS）
WPS办公： yay -S wps-office 
WPS缺少的字体： yay -S ttf-wps-fonts 
WPS安装中文： sudo pacman -S wps-office-mui-zh-cn 
Vscode开发工具： yay -S visual-studio-code-bin 
Markdown编辑器： yay -S typora 
强大的Web内容（视频，音频，图片）下载工具：  yay -S you-get 
火焰截图： yay -S flameshot  (超好用,系统设置里面添加快捷键即可)
云笔记软件： yay -S joplin (开源免费，云服务需要飞天服务)
chm文件阅读器： yay -S kchmviewer 
有道词典： yay -S youdao-dict 
开源电子书阅读器： yay -S calibre 
MD文件编辑器： yay -S typora 
Gif录制软件： yay -S peek 
sudo pacman -S filezilla
# 关闭电子钱包
用了kde以后，每次打开浏览器都会跳出电子钱包什么的，十分烦人，也可能是我自己不习惯
于是就想办法把他关掉！
搜索Kwallet， 不是KwalletManager
然后把启用的勾勾去掉就好啦
```

## 安装docker

```bash
sudo pacman -S docker
sudo pacman -S docker-compose
```

## 安装java

（[https://wiki.archlinux.org/index.php/Java#Installation](https://wiki.archlinux.org/index.php/Java#Installation)）

```bash

sudo pacman -S java-runtime-common java-environment-common
yay jdk8  # Select extra/jdk8-openjdk
使用 archlinux-java 命令来管理 Java 环境。
列举 Java 环境：
archlinux-java status
选择 Java 环境：
sudo archlinux-java set java-8-openjdk

打开.bashrc
# 在后面加上， 地址根据你jdk修改
export JAVA_HOME=/home/hxy/java/jdk-13
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH

# 启用配置，不过我这边不知道怎么退出（我是强制关掉）
source  .bashrc

# 查看是否配置成功
java -version
```

## 安装node,nvm，yarn

注意区别

```java
/etc/profile: 此文件为系统的每个用户设置环境信息,当用户第一次登录时,该文件被执行.并从/etc/profile.d目录的配置文件中搜集shell的设置.
/etc/bashrc:  为每一个运行bash shell的用户执行此文件.当bash shell被打开时,该文件被读取.
~/.bash_profile: 每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!默认情况下,他设置一些环境变量,执行用户的.bashrc文件.
~/.bashrc: 该文件包含专用于你的bash shell的bash信息,当登录时以及每次打开新的shell时,该该文件被读取.
~/.bash_logout: 当每次退出系统(退出bash shell)时,执行该文件.
  
另外,/etc/profile中设定的变量(全局)的可以作用于任何用户,而~/.bashrc等中设定的变量(局部)只能继承/etc/profile中的变量,他们是"父子"关系.

```

```bash
先配置下载github太慢
 kate /etc/hosts
在最后添加 
199.232.68.133  raw.githubusercontent.com
# 1.下载nvm脚本文件
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
# 2. 或者：
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node
# 注：如果只是在终端输入了上面的代码只能在本次窗口没有关闭的时候生效，下次打开还是会还原成默认的源
# 如果需要长久的使用淘宝源则需要如下操作
# 确认你的sh是什么，一般bash或者zsh
# 如果是 bash 则键入 
echo "export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node" >> ~/.bash_profile

# 如果是 zsh 则输入 
echo "export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node" >> ~/.zshrc

# 最后再分别执行命令

# bash 为 ：source ~/.bash_profile

# zsh 为 ：source ~/.zshrc
等同于
在.bashrc中添加下面的内容
export NVM_NODEJS_ORG_MIRROR=http://npmmirror.com/mirrors/node
3.下载node,配置国内镜像
nvm install node
设置npm国内镜像
npm config set registry https://registry.npmmirror.com
安装镜像服务
# npm i -g mirror-config-china #不需要了
npm i -g yarn
设置yarn镜像（可以做成一个a.sh脚本执行）
yarn config set registry https://registry.npmmirror.com -g
yarn config set disturl https://npmmirror.com/dist -g
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/ -g
yarn config set sass_binary_site https://npmmirror.com/mirrors/node-sass/ -g
yarn config set phantomjs_cdnurl https://npmmirror.com/mirrors/phantomjs/ -g
yarn config set chromedriver_cdnurl https://npmmirror.com/dist/chromedriver -g
yarn config set operadriver_cdnurl https://npmmirror.com/dist/operadriver -g
yarn config set fse_binary_host_mirror https://npmmirror.com/mirrors/fsevents -g

```

## 安装miniconda

```bash
从清华镜像下载miniconda执行的sh
 https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/ 

 配置conda国内镜像
 i在.condarc中加入下面的：
 channels:
  - defaults
show_channel_urls: true
channel_alias: https://mirrors.tuna.tsinghua.edu.cn/anaconda
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/pro
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
```

 安装Anaconda后终端出现的(base)字样去除方法：

```bash
conda config --set auto_activate_base False
```

## 安装输入法

设置小键盘开机自动启动方法
打开设置 找到输入设备->键盘 -> plasma启动时numlock状态->开启即可
关闭触控板也是输入设备->触摸板

```bash
下载fcitx5并安装
sudo yay -S fcitx5 fcitx5-chinese-addons  fcitx5-rime fcitx5-chewing  fcitx5-configtool
1、在用户文件夹下创建.xprofile配置文件

输入命令
sudo vim ~/.xprofile 

然后插入如下内容
export GTK_IM_MODULE=fcitx5
export QT_IM_MODULE=fcitx5
export XMODIFIERS=@im=fcitx
2、设置fcitx5为开机启动
①: 直接在~/.xprofile中插入下面这行
fcitx5 &
②: 如果是KDE用户，可在系统设置-启动和关闭-自启动中填加fcitx5为开机自启动项
编辑~`/.pam_environment`
INPUT_METHOD  DEFAULT=fcitx5
GTK_IM_MODULE DEFAULT=fcitx5
QT_IM_MODULE  DEFAULT=fcitx5
XMODIFIERS    DEFAULT=\@im=fcitx5
```

## 安装golang

### 1.使用pacman/yay

```bash
sudo pacman -S go go-tools
```

> 可选用 `gcc-go` ，但若需要使用 JetBrains 的 IDE 则必须使用 `go` ，否则 IDE 无法在 `/usr/lib/go` 下找到 Go SDK。

### 2.从官网下载

```bash
在golang官网下载go的安装包，go1.16.linux-amd64.tar.gz 然后
# 1.解压到local目录
wget  https://go.dev/dl/go1.17.7.linux-amd64.tar.gz
sudo tar -C /opt -xzf go1.17.7.linux-amd64.tar.gz
# 2.编辑环境变量，在/etc/profile和.bashrc添加
#vim ~/.zshrc  # OR ~/.bashrc OR ~/.profile
cp -r ~/.bashrc ~/bashrcbak
# 添加a环境变量
export GOMODPATH=/opt/go
export PATH="$GOMODPATH/bin:$GOMODPATH/golangmod/bin:$PATH"
# 修改/opt的权限
sudo chmod -R 777 /opt/go



echo 'export GOMODPATH=/opt/go
export PATH="$GOMODPATH/bin:$GOMODPATH/golangmod/bin:$PATH"' >>~/.bashrc
source ~/.bashrc
# 3.输入go version检查是否有安装成功
# 4.配置go代理
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GOPATH=/opt/go/golangmod
```

## 安装teamviewer

```bash
yay -S teamviewer
提示：TeamViewer Daemon is not running，解决方法：
sudo teamviewer --daemon enable
```

## 安装myql：（已经被替换为mariadb,请使用下面的方法）

如果要使用mysql8,需要设置aur！！！！！！！

```bash
//下载Mysql
pacman -S mysql
//初始化Mysql，记住生成的密码，方便修改
sudo mysqld --initialize --user=mysql --basedir=/usr --datadir=/var/lib/mysql
//设置开机启动
systemctl enable mysqld.service
//启动Mysql
sudo systemctl start mysqld.service
//修改密码
mysql -u root -p
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
```

如果忘记密码，直接百度mysql8忘记密码怎么办

### manjaro 。忘记密码解决办法

```bash
# 1.先编辑mysql配置文件
kate /etc/mysql/my.cnf
# 2.添加一个     skip-grant-tables
# 3.  重启mysql服务
sudo systemctl restart mysqld
# 4.进入mysql 直接在命令行进入lmysql
# 5 设置 root密码为空
mysql>use mysql;  
mysql>update user set authentication_string='' where user='root';   #将密码置空 
mysql>exit
#6 去掉mysql配置文件里的     skip-grant-tables 重新登陆mysql使用
mysql -uroot -p  #两次确定就可进去
#7. ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';# 然后退出mysql登陆就可以了
```

## 如果出现

```
ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

命令行进入mysql输入

```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456'
```

就可以连上了

## 安装mariadb

## 1. 安装 与Ubuntu不同，arch默认已经不再支持MySQL，但是可以安装MariaDB，其比MySQL的性能更好且操作基本相同。 输入下面命令安装

```bash
systemctl stop mysqld    //停止mysql服务
sudo pacman -S mariadb libmariadbclient mariadb-clients    //安装mariadb
sudo mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
复制代码
```

## 2. 启动

```bash
systemctl start mariadb
mysql_secure_installation    //设置密码等管理操作
systemctl restart mariadb
复制代码
```

登录：

```
mysql -u root -p
```

## 安装postgressql

安装：

```bash
sudo pacman -S  postgresql
```

初始化(必须)：

```swift
sudo su - postgres -c "initdb --locale zh_CN.UTF-8 -E UTF8 -D '/var/lib/postgres/data'"
```

其中，我将原本的en_US改为了zh_CN，未见异常。想要撤销的话，只需要把`'/var/lib/postgres/data'`下面的内容清空。
启动/开机启动 PostgreSQL：

```css
systemctl start postgresql.service
systemctl enable postgresql.service
```

切换到postgres用户，然后登录（初始无密码）：

```undefined
sudo -i -u postgres
psql
```

要退出psql或返回原用户，都是用`exit`命令。
PostgreSQL的用户跟系统用户有些关联，前者必须也是后者。在初始化过程中会在系统中创建postgres用户，同时也是数据库的超级权限用户，postgres用户可以创建其他数据库用户。
> 提示： 如果创建一个与你的系统用户同名的数据库用户，并允许其访问 PostgreSQL 数据库，那么在登录PostgreSQL 数据库 shell 的时候无需切换用户（这样做会比较方便）。

### 通用基本操作[[1]](#fn1)

#### 数据库shell外

添加数据库（须在原用户操作）：

```bash
createdb myDatabaseName
```

连接数据库shell（须用postgres用户，所以先切一下用户）：

```bash
sudo -i -u postgres
psql -d myDatabaseName
```

也可以一步进入postgres用户的myDatabaseName数据库，与上面效果一样：

```bash
psql -U postgres -d myDatabaseName
```

若要创建用户，要在数据库程序外，用postgres用户执行：

```undefined
createuser --interactive myUserName
```

#### 数据库shell内

注意：数据库内的SQL语句，建议大写，必须分号结尾。
进入数据库后可修改密码：

```dart
alter user postgres with password ' *** 密码 *** ';
```

如果有其他用户，可以把postgres换成其他用户的名。
一些常用的命令：

```bash
\c myDatabaseName     # 连接到数据库myDatabaseName
\du    # 列出所有用户以及他们的权限
\dt    # 展示当前数据库中所有的表相关的汇总信息
\q    # 退出psql
```

## 开启ssh服务

```bash
systemctl enable sshd.service 开机启动
systemctl start sshd.service 立即启动
systemctl restart sshd.service 立即重启
```

## 安装nginx

```bash
yay -S nginx-mainline
```

## 安装redis

```bash
yay -S redis

1 启动服务端
sudo redis-server
启动redis
2 启动客户端
sudo redis-cli
systemctl redis start
# 关闭redis
systemctl redis stop
# 开机自启动
systemctl enable redis
```

配置redis密码：在`/etc/redis.conf`中找到requirepass,去掉h注释并更换为自己的密码；
出现

### System limit for number of file watchers reached

```bash
echo fs.inotify.max_user_watches = 524288 | sudo tee -a /etc/sysctl.conf 
sudo sysctl -p
```

## 安装php和composer

安装php：

```bash
yay -S php
```

第一步，下载composer。（切换到项目的根目录，再执行）

```bash
php -r "readfile('https://getcomposer.org/installer');" | php
```

下载之后后自动安装，执行 php composer.phar。查看composer是否安装成功。
第二步，将composer.phar文件移动到bin目录以便全局使用composer命令

```bash
cp -r composer.phar /usr/local/bin/composer
```

（如果只是针对某个项目使用composer,可忽略此步）
第三步，切换国内源（如果第一步下载成功，可忽略此步）

```bash
composer config -g repo.packagist composer https://packagist.phpcomposer.com
```

第四步，安装phpcgi

```bash
yay -S php-apache php-cgi php-fpm php-gd  php-embed php-intl php-imap  php-redis php-snmp
```

第五步，安装pecl

```bash
wget http://pear.php.net/go-pear.phar
php go-pear.phar
```

第六步，安装xdebug

```bash
sudo pecl install xdebug

//为php.ini 添加 extension=xdebug.so
sudo vim /etc/php/php.ini
sudo systemctl reload php-fpm
```
