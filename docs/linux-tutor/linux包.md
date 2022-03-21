# linux常用包

我第一次使用 Linux 服务器是漆黑的界面上只有一行白色字母，末尾还有一个孤独闪烁的光标。我小心翼翼地输入第一个命令 `ls`，然后重复输入了好几遍界面依旧是漆黑一片。这种感觉就像在漆黑的夜空，天上连一颗星星都没有。伸手不见五指，感觉孤独和无力...后来在漫长学习命令行操作的过程中，遇到了一些让我相见恨晚的命令行工具。第一次相遇，它们就像雨夜的一道闪电，瞬间照亮了整个夜空（命令行），最后这些命令行开源项目变成了漆黑夜空中一颗颗闪耀的星星，一闪一闪亮晶晶...我差点唱出来✨

下面我将逐一分享这些照亮漆黑命令行的开源项目，它们包含但不限于：**增加色彩**、**代替系统自带命令**、**提高开发效率**。

## 一、忘记那些 Linux 命令吧

那些年我们一起用过的 Linux 命令：cat、curl、top...忘记他们吧！

### 1、neofetch（代替 uname、hostname 等）

**Star 数**：11.6k｜**语言**：Shell

支持将近 150 种操作系统，展示操作系统信息的命令行工具。首先一条命令安装，然后一条命令启动。展示的信息包含：操作系统、发行版本、内核、Host、CPU、GPU 等。

> 安装：[github.com/dylanaraps/…](https://github.com/dylanaraps/neofetch/wiki/Installation)
>
> 命令：neofetch
>
> 地址：[github.com/dylanaraps/…](https://github.com/dylanaraps/neofetch)

### 2、httpie（代替 cURL）

**Star 数**：50.8k｜**语言**：Python

cURL 的替代者，一款非常人性化的 HTTP 命令行客户端。安装简单使用方便，返回的结果还是高亮显示提高了可读性。适用于调试接口、查看服务器返回的 HTTP 协议的信息。下面的是 cURL 和 httpie 的请求命令和结果对比图：

> 安装：[github.com/httpie/http…](https://github.com/httpie/httpie#installation)
>
> 命令：http [flags] [METHOD] URL [ITEM [ITEM]]
>
> 地址：[github.com/httpie/http…](https://github.com/httpie/httpie)

### 3、htop（代替 top）

**Star 数**：2.4k｜**语言**：C

可代替 top 的交互式管理进程的命令行工具。就像这个项目名字一样，h 代表 for human，有了它就可以忘记 top 命令的各种参数了！

> 安装：[htop.dev/downloads.h…](https://htop.dev/downloads.html)
>
> 命令：htop
>
> 地址：[github.com/htop-dev/ht…](https://github.com/htop-dev/htop)

### 4、bat（代替 cat）

**Star 数**：27k｜**语言**：Rust

替代 cat 的命令行工具。你还在命令行用 cat 查看文件吗？那你就 out 啦！今天推荐的 bat 它不仅支持语法高亮，还能展示 Git 的改动。macOS 下安装命令：`brew install bat` 相信你用过 bat 后就不会再想用回 cat 了。

> 安装：[github.com/sharkdp/bat…](https://github.com/sharkdp/bat#installation)
>
> 命令：bat README.md
>
> 项目地址：[github.com/sharkdp/bat](https://github.com/sharkdp/bat)

### 5、fsql（代替 find）

**Star 数**：3.8k｜**语言**：Go

用 SQL 的语法搜索文件。

> 安装：[github.com/kashav/fsql…](https://github.com/kashav/fsql#installation)
>
> 命令：fsql [options] [query]
>
> 地址：[github.com/kashav/fsql](https://github.com/kashav/fsql)

## 中部：利刃出鞘+探囊取物

优秀的工具可以让你事半功倍，一个命令犹如利剑出鞘：斩杀 BUG、查数据如探囊取物。

### 6、ctop

**Star 数**：11.6k｜**语言**：Go

实现了类 top 命令展示效果的 docker 容器监控工具。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3809f94778ec448584efb3cd95787c6c~tplv-k3u1fbpfcp-zoom-1.image#id=I0q8Y&originalType=binary&status=done&style=none)

> 安装：[github.com/bcicen/ctop…](https://github.com/bcicen/ctop#install)
>
> 命令：ctop
>
> 地址：[github.com/bcicen/ctop](https://github.com/bcicen/ctop)

### 7、mycli

**Star 数**：9.6k｜**语言**：Python

一个带语法高亮、自动补全的 MySQL 命令行客户端工具。用熟悉的命令，享受不一样的快感。另外还有：

- Postgres 数据库：项目名 pgcli
- Redis：项目名 iredis
- 篇幅问题不赘述了，可以用 HelloGitHub 小程序搜这些项目名

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a24bb42e3e91467abc644c80f4a8d427~tplv-k3u1fbpfcp-zoom-1.image#id=Wajex&originalType=binary&status=done&style=none)

> 安装：[github.com/dbcli/mycli…](https://github.com/dbcli/mycli#detailed-install-instructions)
>
> 命令：mycli [OPTIONS] [DATABASE]
>
> 地址：[github.com/dbcli/mycli](https://github.com/dbcli/mycli)

### 8、gpustat

**Star 数**：2.4k｜**语言**：Python

一个方便查询 GPU 状态的命令行工具。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38632dda3c00424e974d47445d4c0168~tplv-k3u1fbpfcp-zoom-1.image#id=ntnew&originalType=binary&status=done&style=none)

> 安装：pip install gpustat
>
> 命令：gpustat [OPTIONS]
>
> 地址：[github.com/wookayin/gp…](https://github.com/wookayin/gpustat)

### 9、lazydocker

**Star 数**：17.7k｜**语言**：Go

带命令行 UI 的 docker 命令行管理工具，可以通过点点点来管理 docker。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8078a0e552e34444bf7d7e382a9404f5~tplv-k3u1fbpfcp-zoom-1.image#id=wtpNY&originalType=binary&status=done&style=none)

> 安装：[github.com/jesseduffie…](https://github.com/jesseduffield/lazydocker#installation)
>
> 使用：[github.com/jesseduffie…](https://github.com/jesseduffield/lazydocker#usage)
>
> 地址：[github.com/jesseduffie…](https://github.com/jesseduffield/lazydocker)

### 10、ali

**Star 数**：2.5k｜**语言**：Go

能够实时展示分析的压力测试工具。这款命令行的压测工具可以在终端实时展示压测耗时曲线，很动感很酷。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1809490464214c98a50bc23fa52aa2af~tplv-k3u1fbpfcp-zoom-1.image#id=h6dzE&originalType=binary&status=done&style=none)

> 安装：[github.com/nakabonne/a…](https://github.com/nakabonne/ali#installation)
>
> 命令：ali 地址
>
> 地址：[github.com/nakabonne/a…](https://github.com/nakabonne/ali)

### 11、lazygit

**Star 数**：19.9k｜**语言**：Go

Git 命令行客户端。它充分的体现出了命令行工具的高效，在拥有相同功能的前提下启动速度比各种 GUI 客户端快 N 倍，再配上快捷键速度加倍。Ready？Go！

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ef1c81b8dfd4b77a0c40441fd684c59~tplv-k3u1fbpfcp-zoom-1.image#id=wCbyS&originalType=binary&status=done&style=none)

> 安装：[github.com/jesseduffie…](https://github.com/jesseduffield/lazygit#installation)
>
> 命令：lazygit
>
> 地址：[github.com/jesseduffie…](https://github.com/jesseduffield/lazygit)

## 下部：平地起惊雷

有了它...世界貌似变得有一点点地不一样。

不对...是很不一样。

错...这明明是王炸！

### 12、ohmyzsh

**Star 数**：128k｜**语言**：Shell

史称“终极 Shell”——ZSH 的工具，让你发现命令行前所未有的好用。开箱即用、海量主题，一声真香永远不会迟到。。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f5d2db3358c4f12a3782dec605325b4~tplv-k3u1fbpfcp-zoom-1.image#id=KYbkl&originalType=binary&status=done&style=none)

> 安装：[github.com/ohmyzsh/ohm…](https://github.com/ohmyzsh/ohmyzsh#basic-installation)
>
> 使用：[github.com/ohmyzsh/ohm…](https://github.com/ohmyzsh/ohmyzsh#using-oh-my-zsh)
>
> 地址：[github.com/ohmyzsh/ohm…](https://github.com/ohmyzsh/ohmyzsh)

## 最后

本期共推荐了 **12 个命令行开源项目**，它们加起来有 **287300+ 星🌟** 足以点亮漆黑的命令行。

作者：HelloGitHub
链接：[https://juejin.cn/post/6964166220983566367](https://juejin.cn/post/6964166220983566367)
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
