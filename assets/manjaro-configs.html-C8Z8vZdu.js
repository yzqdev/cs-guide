import{_ as a,c as e,o as n,d as s}from"./app-CbULZrmi.js";const r={},o=s(`<h1 id="配置manjaro" tabindex="-1"><a class="header-anchor" href="#配置manjaro"><span>配置manjaro</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>记得进入设置&gt;工作空间行为&gt;锁屏&gt;关闭自动锁屏，不然会卡死在登陆</p></div><blockquote><h2 id="分区工具的使用-partitionmanager" tabindex="-1"><a class="header-anchor" href="#分区工具的使用-partitionmanager"><span>分区工具的使用 partitionmanager</span></a></h2></blockquote><pre><code class="language-bash">sudo yay -S partitionmanager
</code></pre><blockquote><h2 id="pacman-的日常使用" tabindex="-1"><a class="header-anchor" href="#pacman-的日常使用"><span>pacman 的日常使用</span></a></h2></blockquote><p>安装todesk远程控制</p><pre><code class="language-javascript">yay -Ss todesk
找到todesk  
yay -S todesk-bin
# 需要开启u服务
systemctl start todeskd.service 
</code></pre><pre><code class="language-bash">pacman -S xx1 xx2   # 安装或升级软件包，或者一列软件包（包含依赖包）
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
</code></pre><h2 id="更换源" tabindex="-1"><a class="header-anchor" href="#更换源"><span>更换源</span></a></h2><pre><code class="language-bash">//1.配置镜像源:
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
yay --aururl &quot;https://aur.tuna.tsinghua.edu.cn&quot; --save
//8.修改的配置文件位于 \`~/.config/yay/config.json\` ，还可通过以下命令查看修改过的配置：
yay -P -g
以后就可以直接执行yay -S 你要安装的软件名字，比如
yay -S netease-cloud-music
</code></pre><h2 id="更新文件夹语言" tabindex="-1"><a class="header-anchor" href="#更新文件夹语言"><span>更新文件夹语言</span></a></h2><pre><code>export LANG=en_US
xdg-user-dirs-gtk-update  //弹出对话框，问是否改成英文，点是，并且选“不再提示”
export LANG=zh_CN
</code></pre><h2 id="安装常用的软件" tabindex="-1"><a class="header-anchor" href="#安装常用的软件"><span>安装常用的软件</span></a></h2><pre><code class="language-bash">yay -S net-tools base-devel
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
</code></pre><h2 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker"><span>安装docker</span></a></h2><pre><code class="language-bash">sudo pacman -S docker
sudo pacman -S docker-compose
</code></pre><h2 id="安装java" tabindex="-1"><a class="header-anchor" href="#安装java"><span>安装java</span></a></h2><p>（<a href="https://wiki.archlinux.org/index.php/Java#Installation" target="_blank" rel="noopener noreferrer">https://wiki.archlinux.org/index.php/Java#Installation</a>）</p><pre><code class="language-bash">
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
export JRE_HOME=\${JAVA_HOME}/jre
export CLASSPATH=.:\${JAVA_HOME}/lib:\${JRE_HOME}/lib
export PATH=\${JAVA_HOME}/bin:$PATH

# 启用配置，不过我这边不知道怎么退出（我是强制关掉）
source  .bashrc

# 查看是否配置成功
java -version
</code></pre><h2 id="安装node-nvm-yarn" tabindex="-1"><a class="header-anchor" href="#安装node-nvm-yarn"><span>安装node,nvm，yarn</span></a></h2><p>注意区别</p><pre><code class="language-java">/etc/profile: 此文件为系统的每个用户设置环境信息,当用户第一次登录时,该文件被执行.并从/etc/profile.d目录的配置文件中搜集shell的设置.
/etc/bashrc:  为每一个运行bash shell的用户执行此文件.当bash shell被打开时,该文件被读取.
~/.bash_profile: 每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!默认情况下,他设置一些环境变量,执行用户的.bashrc文件.
~/.bashrc: 该文件包含专用于你的bash shell的bash信息,当登录时以及每次打开新的shell时,该该文件被读取.
~/.bash_logout: 当每次退出系统(退出bash shell)时,执行该文件.
  
另外,/etc/profile中设定的变量(全局)的可以作用于任何用户,而~/.bashrc等中设定的变量(局部)只能继承/etc/profile中的变量,他们是&quot;父子&quot;关系.

</code></pre><pre><code class="language-bash">先配置下载github太慢
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
echo &quot;export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node&quot; &gt;&gt; ~/.bash_profile

# 如果是 zsh 则输入 
echo &quot;export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node&quot; &gt;&gt; ~/.zshrc

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

</code></pre><h2 id="安装miniconda" tabindex="-1"><a class="header-anchor" href="#安装miniconda"><span>安装miniconda</span></a></h2><pre><code class="language-bash">从清华镜像下载miniconda执行的sh
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
</code></pre><p>安装Anaconda后终端出现的(base)字样去除方法：</p><pre><code class="language-bash">conda config --set auto_activate_base False
</code></pre><h2 id="安装输入法" tabindex="-1"><a class="header-anchor" href="#安装输入法"><span>安装输入法</span></a></h2><p>设置小键盘开机自动启动方法 打开设置 找到输入设备-&gt;键盘 -&gt; plasma启动时numlock状态-&gt;开启即可 关闭触控板也是输入设备-&gt;触摸板</p><pre><code class="language-bash">下载fcitx5并安装
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
fcitx5 &amp;
②: 如果是KDE用户，可在系统设置-启动和关闭-自启动中填加fcitx5为开机自启动项
编辑~\`/.pam_environment\`
INPUT_METHOD  DEFAULT=fcitx5
GTK_IM_MODULE DEFAULT=fcitx5
QT_IM_MODULE  DEFAULT=fcitx5
XMODIFIERS    DEFAULT=\\@im=fcitx5
</code></pre><h2 id="安装golang" tabindex="-1"><a class="header-anchor" href="#安装golang"><span>安装golang</span></a></h2><h3 id="_1-使用pacman-yay" tabindex="-1"><a class="header-anchor" href="#_1-使用pacman-yay"><span>1.使用pacman/yay</span></a></h3><pre><code class="language-bash">sudo pacman -S go go-tools
</code></pre><blockquote><p>可选用 <code>gcc-go</code> ，但若需要使用 JetBrains 的 IDE 则必须使用 <code>go</code> ，否则 IDE 无法在 <code>/usr/lib/go</code> 下找到 Go SDK。</p></blockquote><h3 id="_2-从官网下载" tabindex="-1"><a class="header-anchor" href="#_2-从官网下载"><span>2.从官网下载</span></a></h3><pre><code class="language-bash">在golang官网下载go的安装包，go1.16.linux-amd64.tar.gz 然后
# 1.解压到local目录
wget  https://go.dev/dl/go1.17.7.linux-amd64.tar.gz
sudo tar -C /opt -xzf go1.17.7.linux-amd64.tar.gz
# 2.编辑环境变量，在/etc/profile和.bashrc添加
#vim ~/.zshrc  # OR ~/.bashrc OR ~/.profile
cp -r ~/.bashrc ~/bashrcbak
# 添加a环境变量
export GOMODPATH=/opt/go
export PATH=&quot;$GOMODPATH/bin:$GOMODPATH/golangmod/bin:$PATH&quot;
# 修改/opt的权限
sudo chmod -R 777 /opt/go



echo &#39;export GOMODPATH=/opt/go
export PATH=&quot;$GOMODPATH/bin:$GOMODPATH/golangmod/bin:$PATH&quot;&#39; &gt;&gt;~/.bashrc
source ~/.bashrc
# 3.输入go version检查是否有安装成功
# 4.配置go代理
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GOPATH=/opt/go/golangmod
</code></pre><h2 id="安装teamviewer" tabindex="-1"><a class="header-anchor" href="#安装teamviewer"><span>安装teamviewer</span></a></h2><pre><code class="language-bash">yay -S teamviewer
提示：TeamViewer Daemon is not running，解决方法：
sudo teamviewer --daemon enable
</code></pre><h2 id="安装myql-已经被替换为mariadb-请使用下面的方法" tabindex="-1"><a class="header-anchor" href="#安装myql-已经被替换为mariadb-请使用下面的方法"><span>安装myql：（已经被替换为mariadb,请使用下面的方法）</span></a></h2><p>如果要使用mysql8,需要设置aur！！！！！！！</p><pre><code class="language-bash">//下载Mysql
pacman -S mysql
//初始化Mysql，记住生成的密码，方便修改
sudo mysqld --initialize --user=mysql --basedir=/usr --datadir=/var/lib/mysql
//设置开机启动
systemctl enable mysqld.service
//启动Mysql
sudo systemctl start mysqld.service
//修改密码
mysql -u root -p
mysql&gt; ALTER USER &#39;root&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;新密码&#39;;
</code></pre><p>如果忘记密码，直接百度mysql8忘记密码怎么办</p><h3 id="manjaro-。忘记密码解决办法" tabindex="-1"><a class="header-anchor" href="#manjaro-。忘记密码解决办法"><span>manjaro 。忘记密码解决办法</span></a></h3><pre><code class="language-bash"># 1.先编辑mysql配置文件
kate /etc/mysql/my.cnf
# 2.添加一个     skip-grant-tables
# 3.  重启mysql服务
sudo systemctl restart mysqld
# 4.进入mysql 直接在命令行进入lmysql
# 5 设置 root密码为空
mysql&gt;use mysql;  
mysql&gt;update user set authentication_string=&#39;&#39; where user=&#39;root&#39;;   #将密码置空 
mysql&gt;exit
#6 去掉mysql配置文件里的     skip-grant-tables 重新登陆mysql使用
mysql -uroot -p  #两次确定就可进去
#7. ALTER USER &#39;root&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;123456&#39;;# 然后退出mysql登陆就可以了
</code></pre><h2 id="如果出现" tabindex="-1"><a class="header-anchor" href="#如果出现"><span>如果出现</span></a></h2><pre><code>ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
</code></pre><p>命令行进入mysql输入</p><pre><code class="language-bash">ALTER USER &#39;root&#39;@&#39;localhost&#39; IDENTIFIED WITH mysql_native_password BY &#39;123456&#39;
</code></pre><p>就可以连上了</p><h2 id="安装mariadb" tabindex="-1"><a class="header-anchor" href="#安装mariadb"><span>安装mariadb</span></a></h2><h2 id="_1-安装-与ubuntu不同-arch默认已经不再支持mysql-但是可以安装mariadb-其比mysql的性能更好且操作基本相同。-输入下面命令安装" tabindex="-1"><a class="header-anchor" href="#_1-安装-与ubuntu不同-arch默认已经不再支持mysql-但是可以安装mariadb-其比mysql的性能更好且操作基本相同。-输入下面命令安装"><span>1. 安装 与Ubuntu不同，arch默认已经不再支持MySQL，但是可以安装MariaDB，其比MySQL的性能更好且操作基本相同。 输入下面命令安装</span></a></h2><pre><code class="language-bash">systemctl stop mysqld    //停止mysql服务
sudo pacman -S mariadb libmariadbclient mariadb-clients    //安装mariadb
sudo mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
复制代码
</code></pre><h2 id="_2-启动" tabindex="-1"><a class="header-anchor" href="#_2-启动"><span>2. 启动</span></a></h2><pre><code class="language-bash">systemctl start mariadb
mysql_secure_installation    //设置密码等管理操作
systemctl restart mariadb
复制代码
</code></pre><p>登录：</p><pre><code>mysql -u root -p
</code></pre><h2 id="安装postgressql" tabindex="-1"><a class="header-anchor" href="#安装postgressql"><span>安装postgressql</span></a></h2><p>安装：</p><pre><code class="language-bash">sudo pacman -S  postgresql
</code></pre><p>初始化(必须)：</p><pre><code class="language-swift">sudo su - postgres -c &quot;initdb --locale zh_CN.UTF-8 -E UTF8 -D &#39;/var/lib/postgres/data&#39;&quot;
</code></pre><p>其中，我将原本的en_US改为了zh_CN，未见异常。想要撤销的话，只需要把<code>&#39;/var/lib/postgres/data&#39;</code>下面的内容清空。 启动/开机启动 PostgreSQL：</p><pre><code class="language-css">systemctl start postgresql.service
systemctl enable postgresql.service
</code></pre><p>切换到postgres用户，然后登录（初始无密码）：</p><pre><code class="language-undefined">sudo -i -u postgres
psql
</code></pre><p>要退出psql或返回原用户，都是用<code>exit</code>命令。 PostgreSQL的用户跟系统用户有些关联，前者必须也是后者。在初始化过程中会在系统中创建postgres用户，同时也是数据库的超级权限用户，postgres用户可以创建其他数据库用户。</p><blockquote><p>提示： 如果创建一个与你的系统用户同名的数据库用户，并允许其访问 PostgreSQL 数据库，那么在登录PostgreSQL 数据库 shell 的时候无需切换用户（这样做会比较方便）。</p></blockquote><h3 id="通用基本操作-1" tabindex="-1"><a class="header-anchor" href="#通用基本操作-1"><span>通用基本操作<a href="#fn1">[1]</a></span></a></h3><h4 id="数据库shell外" tabindex="-1"><a class="header-anchor" href="#数据库shell外"><span>数据库shell外</span></a></h4><p>添加数据库（须在原用户操作）：</p><pre><code class="language-bash">createdb myDatabaseName
</code></pre><p>连接数据库shell（须用postgres用户，所以先切一下用户）：</p><pre><code class="language-bash">sudo -i -u postgres
psql -d myDatabaseName
</code></pre><p>也可以一步进入postgres用户的myDatabaseName数据库，与上面效果一样：</p><pre><code class="language-bash">psql -U postgres -d myDatabaseName
</code></pre><p>若要创建用户，要在数据库程序外，用postgres用户执行：</p><pre><code class="language-undefined">createuser --interactive myUserName
</code></pre><h4 id="数据库shell内" tabindex="-1"><a class="header-anchor" href="#数据库shell内"><span>数据库shell内</span></a></h4><p>注意：数据库内的SQL语句，建议大写，必须分号结尾。 进入数据库后可修改密码：</p><pre><code class="language-dart">alter user postgres with password &#39; *** 密码 *** &#39;;
</code></pre><p>如果有其他用户，可以把postgres换成其他用户的名。 一些常用的命令：</p><pre><code class="language-bash">\\c myDatabaseName     # 连接到数据库myDatabaseName
\\du    # 列出所有用户以及他们的权限
\\dt    # 展示当前数据库中所有的表相关的汇总信息
\\q    # 退出psql
</code></pre><h2 id="开启ssh服务" tabindex="-1"><a class="header-anchor" href="#开启ssh服务"><span>开启ssh服务</span></a></h2><pre><code class="language-bash">systemctl enable sshd.service 开机启动
systemctl start sshd.service 立即启动
systemctl restart sshd.service 立即重启
</code></pre><h2 id="安装nginx" tabindex="-1"><a class="header-anchor" href="#安装nginx"><span>安装nginx</span></a></h2><pre><code class="language-bash">yay -S nginx-mainline
</code></pre><h2 id="安装redis" tabindex="-1"><a class="header-anchor" href="#安装redis"><span>安装redis</span></a></h2><pre><code class="language-bash">yay -S redis

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
</code></pre><p>配置redis密码：在<code>/etc/redis.conf</code>中找到requirepass,去掉h注释并更换为自己的密码； 出现</p><h3 id="system-limit-for-number-of-file-watchers-reached" tabindex="-1"><a class="header-anchor" href="#system-limit-for-number-of-file-watchers-reached"><span>System limit for number of file watchers reached</span></a></h3><pre><code class="language-bash">echo fs.inotify.max_user_watches = 524288 | sudo tee -a /etc/sysctl.conf 
sudo sysctl -p
</code></pre><h2 id="安装php和composer" tabindex="-1"><a class="header-anchor" href="#安装php和composer"><span>安装php和composer</span></a></h2><p>安装php：</p><pre><code class="language-bash">yay -S php
</code></pre><p>第一步，下载composer。（切换到项目的根目录，再执行）</p><pre><code class="language-bash">php -r &quot;readfile(&#39;https://getcomposer.org/installer&#39;);&quot; | php
</code></pre><p>下载之后后自动安装，执行 php composer.phar。查看composer是否安装成功。 第二步，将composer.phar文件移动到bin目录以便全局使用composer命令</p><pre><code class="language-bash">cp -r composer.phar /usr/local/bin/composer
</code></pre><p>（如果只是针对某个项目使用composer,可忽略此步） 第三步，切换国内源（如果第一步下载成功，可忽略此步）</p><pre><code class="language-bash">composer config -g repo.packagist composer https://packagist.phpcomposer.com
</code></pre><p>第四步，安装phpcgi</p><pre><code class="language-bash">yay -S php-apache php-cgi php-fpm php-gd  php-embed php-intl php-imap  php-redis php-snmp
</code></pre><p>第五步，安装pecl</p><pre><code class="language-bash">wget http://pear.php.net/go-pear.phar
php go-pear.phar
</code></pre><p>第六步，安装xdebug</p><pre><code class="language-bash">sudo pecl install xdebug

//为php.ini 添加 extension=xdebug.so
sudo vim /etc/php/php.ini
sudo systemctl reload php-fpm
</code></pre>`,106),t=[o];function c(l,i){return n(),e("div",null,t)}const d=a(r,[["render",c],["__file","manjaro-configs.html.vue"]]),h=JSON.parse('{"path":"/linux-tutor/linux-tips/manjaro-configs.html","title":"配置manjaro","lang":"zh-CN","frontmatter":{"description":"配置manjaro 提示 记得进入设置>工作空间行为>锁屏>关闭自动锁屏，不然会卡死在登陆 分区工具的使用 partitionmanager pacman 的日常使用 安装todesk远程控制 更换源 更新文件夹语言 安装常用的软件 安装docker 安装java （https://wiki.archlinux.org/index.php/Java#I...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/linux-tips/manjaro-configs.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"配置manjaro"}],["meta",{"property":"og:description","content":"配置manjaro 提示 记得进入设置>工作空间行为>锁屏>关闭自动锁屏，不然会卡死在登陆 分区工具的使用 partitionmanager pacman 的日常使用 安装todesk远程控制 更换源 更新文件夹语言 安装常用的软件 安装docker 安装java （https://wiki.archlinux.org/index.php/Java#I..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T13:45:58.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T13:45:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"配置manjaro\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T13:45:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"更换源","slug":"更换源","link":"#更换源","children":[]},{"level":2,"title":"更新文件夹语言","slug":"更新文件夹语言","link":"#更新文件夹语言","children":[]},{"level":2,"title":"安装常用的软件","slug":"安装常用的软件","link":"#安装常用的软件","children":[]},{"level":2,"title":"安装docker","slug":"安装docker","link":"#安装docker","children":[]},{"level":2,"title":"安装java","slug":"安装java","link":"#安装java","children":[]},{"level":2,"title":"安装node,nvm，yarn","slug":"安装node-nvm-yarn","link":"#安装node-nvm-yarn","children":[]},{"level":2,"title":"安装miniconda","slug":"安装miniconda","link":"#安装miniconda","children":[]},{"level":2,"title":"安装输入法","slug":"安装输入法","link":"#安装输入法","children":[]},{"level":2,"title":"安装golang","slug":"安装golang","link":"#安装golang","children":[{"level":3,"title":"1.使用pacman/yay","slug":"_1-使用pacman-yay","link":"#_1-使用pacman-yay","children":[]},{"level":3,"title":"2.从官网下载","slug":"_2-从官网下载","link":"#_2-从官网下载","children":[]}]},{"level":2,"title":"安装teamviewer","slug":"安装teamviewer","link":"#安装teamviewer","children":[]},{"level":2,"title":"安装myql：（已经被替换为mariadb,请使用下面的方法）","slug":"安装myql-已经被替换为mariadb-请使用下面的方法","link":"#安装myql-已经被替换为mariadb-请使用下面的方法","children":[{"level":3,"title":"manjaro 。忘记密码解决办法","slug":"manjaro-。忘记密码解决办法","link":"#manjaro-。忘记密码解决办法","children":[]}]},{"level":2,"title":"如果出现","slug":"如果出现","link":"#如果出现","children":[]},{"level":2,"title":"安装mariadb","slug":"安装mariadb","link":"#安装mariadb","children":[]},{"level":2,"title":"1. 安装 与Ubuntu不同，arch默认已经不再支持MySQL，但是可以安装MariaDB，其比MySQL的性能更好且操作基本相同。 输入下面命令安装","slug":"_1-安装-与ubuntu不同-arch默认已经不再支持mysql-但是可以安装mariadb-其比mysql的性能更好且操作基本相同。-输入下面命令安装","link":"#_1-安装-与ubuntu不同-arch默认已经不再支持mysql-但是可以安装mariadb-其比mysql的性能更好且操作基本相同。-输入下面命令安装","children":[]},{"level":2,"title":"2. 启动","slug":"_2-启动","link":"#_2-启动","children":[]},{"level":2,"title":"安装postgressql","slug":"安装postgressql","link":"#安装postgressql","children":[{"level":3,"title":"通用基本操作[1]","slug":"通用基本操作-1","link":"#通用基本操作-1","children":[{"level":4,"title":"数据库shell外","slug":"数据库shell外","link":"#数据库shell外","children":[]},{"level":4,"title":"数据库shell内","slug":"数据库shell内","link":"#数据库shell内","children":[]}]}]},{"level":2,"title":"开启ssh服务","slug":"开启ssh服务","link":"#开启ssh服务","children":[]},{"level":2,"title":"安装nginx","slug":"安装nginx","link":"#安装nginx","children":[]},{"level":2,"title":"安装redis","slug":"安装redis","link":"#安装redis","children":[{"level":3,"title":"System limit for number of file watchers reached","slug":"system-limit-for-number-of-file-watchers-reached","link":"#system-limit-for-number-of-file-watchers-reached","children":[]}]},{"level":2,"title":"安装php和composer","slug":"安装php和composer","link":"#安装php和composer","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1649166358000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":10.91,"words":3274},"filePathRelative":"linux-tutor/linux-tips/manjaro-configs.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,h as data};
