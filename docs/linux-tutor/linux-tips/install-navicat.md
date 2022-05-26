# linux使用navicat

工作环境：服务器CentOS7 64位 或 Deepin 15.8（桌面版）
①先老实选择官方试用版安装（不推荐在各个下载平台去下载）
中文版：[http://www.navicat.com.cn/download/navicat-for-mysql](http://www.navicat.com.cn/download/navicat-for-mysql)
或英文版：[https://www.navicat.com/en/download/navicat-for-mysql](https://www.navicat.com/en/download/navicat-for-mysql)
免费试用14天。

浏览器直接下载速度可能比较慢，可以选择复制下载链接到迅雷或者QQ旋风等p2p工具下载（亲测速度还是明显快一些）下载对应版本的，我的是64位的所以下载：navicat120_mysql_cs_x64.tar.gz

②直接复制下载的包到linux桌面或者用XFTP传到/home/目录下

③再把安装包挪到你要安装的位置，比如/usr/local/

④打开终端命令，运行解压命令：tar -zxvf  /usr/local/navicat120_mysql_cs_x64.tar.gz

提示：你会在解压后的目录看到一个文件：**start_navicat**。记住了！这是非常重要的文件，启动navicat、改navicat一些配置参数都靠它。此文件可双击用文件编辑器打开。

⑤解压后  cd进入解压后的目录运行命令：

./start_navicat

会弹出对话框，要安装wine，你要很高兴很爽快的确定，没它你的navicat没法在linux里运行。

解释一下，这个wine是专为运行此navicat而附带在安装包里的，不是真正的为系统里所有软件安装的wine。

注意：此处能启动，说明此安装包里自带的**wine**可用（wine是在linux系统里启动windows系统的exe等可执行文件的中间工具），否则你得去安装wine了，这个工具很麻烦不好安装，安装它需要附带安装好多工具（文件多且大，而linux下载网速又慢）配置很多东西（这个坑很大）。
> 这就是为什么文章开头不推荐去别的软件平台去下，这些平台的navicat版本混乱，质量难以保证，好多没有集成wine，更别说可用的wine。用官方的navicat，里面有集成的wine解压安装包即可直接运行使用，省去很多麻烦。没wine的不能运行navicat，除非你linux里已经安装好了可用的wine。

⑥安装好wine后，运行navicat，胡天厨对话框，可选择使用或输入注册码注册。不要去找注册码，选“试用”，除非你有可用的注册码。

⑦打开navicat窗口界面一般会乱码。关闭navicat，然后双击安装目录下的start_navicat 文件默认用文本编辑器gedit打开，在文本开头大概第8行找到配置项 `export LANG="en_US.UTF-8"`,此编码只识别UTF-8中的英文编码，把他改成`export LANG="zh_CN.UTF-8"`，可识别中文。保存，关闭即可。

## 试用过期处理办法

```
navicat试用过期处理办法[deepin亲测可用]
1、管理员进入路径：/home/avey/.navicat64
2、删除system.reg文件
```

①运行navicat的时候会在/root/.navicat64/和/root/.wine/（这两个文件不记得是哪个了，如果不先删.navicat64目录下的system.reg，如果不行的话两个目录下的system.reg都删）目录下生成system.reg文件，这个文件可用文本编辑器打开，是来记录navicat是否注册及注册时间过期时间等等信息的。
解释一下，是root目录（也是系统管理员root用户的目录）下的system.reg文件。
.navicat64和.wine都是隐藏的。你打开这个目录是看不到的但是可以使用ls -a命令使所有隐藏目录都显示，也可以使用
`sudo find /root -name 'system.reg'`命令在root目录下找到它。
②navicat到期时删除这个`system.reg`文件，navicat会重新计算过期时间，亲测可用
