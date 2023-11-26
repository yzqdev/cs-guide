# linux环境变量

> 来自[lvmenghui001](https://www.cnblogs.com/lmh001/p/9999859.html)  ,  侵删

Shell变量有局部变量、环境变量之分。局部变量就是指在某个Shell中生效的变量，只在此次登录中有效。环境变量通常又称“全局变量”，虽然在Shell中变量默认就是全局的，但是为了让子Shall继承当前Shell的变量，需要使用export内建命令将其导出为环境变量。

## 一、linux系统变量的类型

按变量的生存周期划分：

永久的：需要修改配置文件，变量永久生效。
临时的：使用export命令声明即可，变量在关闭shell时失效。

在配置永久的环境变量时，又可以按照作用范围分为：

用户环境变量
系统环境变量。
系统环境变量对所有系统用户都有效，用户环境变量仅仅对当前的用户有效。

## 二、设置环境变量

1. 直接运行export命令定义变量
在shell的命令行下直接使用[export 变量名=变量值] 定义变量。该变量只在当前的shell（BASH）或其子shell（BASH）下是有效的，shell关闭了，变量也就失效了，再打开新shell时就没有这个变量，需要使用的话还需要重新定义。
1. 修改系统环境变量
系统环境变量一般保存在下面的文件中

```bash
/etc/profile
```

全局（公有）配置，不管是哪个用户，登录时都会读取该文件。

```bash
/etc/bash.bashrc
```

它也是全局（公有）的 bash执行时，不管是何种方式，都会读取此文件。

```bash
/etc/environment
```

不要轻易修改此文件

## 3. 修改用户环境变量

用户环境变量通常被存储在下面的文件中：

```bash
~/.profile
```

若bash是以login方式执行时，读取`~/.bash_profile`，若它不存在，则读取`~/.bash_login`，若前两者不存在，读取`~/.profile`。

```bash
~/.bash_profile 或者~./bash_login
```

若bash是以login方式执行时，读取`~/.bash_profile`，若它不存,则读取`~/.bash_login`，若前两者不存在，读取 `~/.profile`。
只有bash是以login形式执行时，才会读取.bash_profile，Unbutu默认没有此文件，可新建。 通常该配置文件还会配置成去读取`~/.bashrc`。

```bash
~/.bashrc
```

当bash是以non-login形式执行时，读取此文件。若是以login形式执行，则不会读取此文件。

`~/.bash_profile`是交互式、login 方式进入 bash 运行的
`~/.bashrc`是交互式 non-login 方式进入 bash 运行的通常二者设置大致相同，所以通常前者会调用后者。

## 4. 修改环境变量配置文件

如想将一个路径加入到环境变量（例如$PATH）中，可以像下面这样做（修改/etc/profile）：

```bash
sudo vi /etc/profile
```

```bash
PATH=$PATH:PATH_1:PATH_2:PATH_3:------:PATH_N 
export PATH
```

你可以自己加上指定的路径，中间用冒号隔开。环境变量更改后，在用户下次登陆时生效，如果想立刻生效，则可执行下面的语句：

```bash
source /etc/profile
```

## 三、环境配置文件的区别

## 1. profile、 bashrc、.bash_profile、 .bashrc介绍

bash会在用户登录时，读取下列四个环境配置文件：

全局环境变量设置文件：`/etc/profile`、`/etc/bashrc`。 用户环境变量设置文件：`~/.bash_profile`、`~/.bashrc`。

读取顺序：① `/etc/profile`、② `~/.bash_profile`、③ `~/.bashrc`、④ `/etc/bashrc`。

```
①` /etc/profile`：此文件为系统的每个用户设置环境信息，系统中每个用户登录时都要执行这个脚本，如果系统管理员希望某个设置对所有用户都生效，可以写在这个脚本里，该文件也会从`/etc/profile.d`目录中的配置文件中搜集shell的设置。 
②` ~/.bash_profile`：每个用户都可使用该文件设置专用于自己的shell信息，当用户登录时，该文件仅执行一次。默认情况下，他设置一些环境变量，执行用户的`.bashrc`文件。 
③` ~/.bashrc`：该文件包含专用于自己的shell信息，当登录时以及每次打开新shell时，该文件被读取。 
④` /etc/bashrc`：为每一个运行bash shell的用户执行此文件，当bash shell被打开时，该文件被读取。
```

2 `.bashrc`和`.bash_profile`的区别

`.bash_profile`会用在登陆shell， `.bashrc`使用在交互式非登陆 shell 。简单说来，它们的区别主要是`.bash_profile`是在你每次登录的时候执行的；`.bashrc`是在你新开了一个命令行窗口时执行的。
当通过控制台进行登录（输入用户名和密码）：在初始化命令行提示符的时候会执行.bash_profile 来配置你的shell环境。但是如果已经登录到机器，在Gnome或者是KDE也开了一个新的终端窗口（xterm），这时，.bashrc会在窗口命令行提示符出现前被执行。当你在终端敲入/bin/bash时.bashrc也会在这个新的bash实例启动的时候执行。

3. 建议
大多数的时候你不想维护两个独立的配置文件，一个登录的一个非登录的shell。当你设置PATH时，你想在两个文件都适用。可以在.bash_profile中调用.bashrc，然后将PATH和其他通用的设置放到.bashrc中。
要做到这几点，添加以下几行到.bash_profile中：

```bash
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
```

所以对于我自己,我写了一个`.pathrc`文件
然后在`.bashrc`,`.zshrc`,`.bash_profile`,`/etc/profile`中都加了

```bash
if [ -f ~/.pathrc ]; then
    . ~/.pathrc
fi
```

下面是`.pathrc`文件

```bash
export DENO_INSTALL="/home/yzqdev/.deno"
export JAVA_HOME=/home/yzqdev/.jdks/jdk-17.0.2+8
export NODEPATH=/opt/nodejs
export GOMODPATH=/opt/go
export OPENPATH=/usr/local/openresty/nginx
export PATH="$GOMODPATH/bin:$GOMODPATH/golangmod/bin:$OPENPATH/sbin:$NODEPATH/bin:$JAVA_HOME/bin:$DENO_INSTALL/bin:$PATH"
```

现在，当你从控制台登录机器的时候，.bashrc就会被执行。

四、常用的环境变量

```text
BASH Bash Shell的全路径
CDPATH       用于快速进入某个目录。
PATH       决定了shell将到哪些目录中寻找命令或程序
HOME       当前用户主目录
HISTSIZE       历史记录数
LOGNAME       当前用户的登录名
HOSTNAME       指主机的名称
SHELL       当前用户Shell类型
LANGUGE       语言相关的环境变量，多语言可以修改此环境变量
MAIL       当前用户的邮件存放目录
PS1       基本提示符，对于root用户是#，对于普通用户是$
```

Reference
[1] /etc/profile、/etc/bashrc、~~/.bash_profile、~~/.bashrc
[http://blog.chinaunix.net/uid-26435987-id-3400127.html](http://blog.chinaunix.net/uid-26435987-id-3400127.html)
[2] Linux如何修改env看到的环境变量？ .bashrc和.bash_profile区别
[http://blog.csdn.net/xifeijian/article/details/13355031](http://blog.csdn.net/xifeijian/article/details/13355031)
[3] linux环境变量，bashrc与bashprofile
[http://blog.sina.com.cn/s/blog_43e5ad4e0101ei43.html](http://blog.sina.com.cn/s/blog_43e5ad4e0101ei43.html)
