# Ubuntu 介绍

- Ubuntu 母公司 Canonical：<http://www.canonical.com/>
- Ubuntu 百科：<http://baike.baidu.com/item/ubuntu>
- Ubuntu Wiki：<http://zh.wikipedia.org/zh/Ubuntu>
- Ubuntu 英文官网：<http://www.ubuntu.com>
- Ubuntu 中文官网：<http://www.ubuntu.org.cn>
- Ubuntu kylin 官网：<http://cn.Ubuntu.com/desktop>
- Ubuntu 标准桌面版下载：<http://www.ubuntu.org.cn/download/desktop>
- Ubuntu 官网回答社区：<http://askubuntu.com/>
- Ubuntu 正式衍生版本：<https://zh.wikipedia.org/zh/Ubuntu#.E5.88.86.E6.94.AF.E7.89.88.E6.9C.AC>
- Ubuntu 非正式衍生版本：<https://zh.wikipedia.org/zh/Ubuntu#.E9.9D.9E.E6.AD.A3.E5.BC.8F.E8.A1.8D.E7.94.9F.E7.89.88.E6.9C.AC>
- Unity 桌面介绍：<https://zh.wikipedia.org/wiki/Unity_(使用者介面)>
- GNOME 桌面介绍：<https://zh.wikipedia.org/wiki/GNOME>
- KDE 桌面介绍：<https://zh.wikipedia.org/wiki/KDE>

# Ubuntu 原型系统：Debian

- Debian Wiki：<http://zh.wikipedia.org/zh/Debian>
- Debian 百科：<http://baike.baidu.com/view/40687.htm>
- Debian 官网：<http://www.debian.org/index.zh-cn.html>
- Debian 自我介绍：<https://www.debian.org/intro/about>
    - 关键字：
        - [Debian 社群契约](https://www.debian.org/social_contract)
        - [何谓自由 (Free)？ 或者说，何谓自由软件 (Free Software)？](https://www.debian.org/intro/free)
        - [什么是自由软件？](http://www.gnu.org/philosophy/free-sw)
        - [Debian 历史](https://www.debian.org/doc/manuals/project-history/)
- Debian 的发行版介绍：<https://www.debian.org/releases/>
- Debian 官网稳定版下载 1：<https://www.debian.org/distrib/>
- Debian 官网稳定版下载 2：<https://www.debian.org/CD/http-ftp/#stable>
- Debian 中国镜像 1：<http://mirrors.hust.edu.cn/debian-cd/>
- Debian 中国镜像 2：<ftp://mirrors.sohu.com/debian-cd/>
- Debian 中国镜像 3：<ftp://debian.ustc.edu.cn/debian-cd/>
- Debian 中文安装手册：<https://www.debian.org/releases/stable/amd64/>
- Debian 软件列表：<https://packages.debian.org/stable/>


# Ubuntu 特殊命令

 
- `lsb_release -a`，查看发行代号 
- `cat /etc/issue`，查看 Ubuntu 发行版本
- `sudo ufw disable`，禁用防火墙
- `sudo ufw enable`，开启防火墙
- `apt-get remove iptables`，卸载防火墙
- ``
- ``
- ``
- ``
- ``
- ``
# Ubuntu 常用的软件

## 安装软件基础

- 取回更新的软件包列表信息：`sudo apt-get update`，如果安装某个软件报：`Unable to locate package`，就得这样 update 下。
- 安装本地 deb 文件：`sudo dpkg -i 文件名`
	- 安装过程提示缺依赖：`sudo apt-get --fix-broken install -y`
- 查看已经安装了哪些包：`sudo dpkg -l`
- 查看已安装列表中是否有 Vim 软件，没有安装则没有数据显示：`sudo dpkg -l | grep vim`
- 查看 Vim 软件安装位置：`sudo dpkg -L vim`
- 安装名为 Vim 的软件：`sudo apt-get install vim`
- 升级系统所有有新版本的软件：`sudo apt-get upgrade`

## 卸载

- 卸载名为 Vim 的软件（保留配置文档）：`sudo apt-get remove vim`（在输入软件的名的时候，可以输入部分，按 Tab 进行提示）
- 卸载名为 Vim 的软件（并删除配置文档）：`sudo apt-get –purge remove vim`
- 卸载名为 Vim 的软件（并删除包及其依赖的软件包、配置文件）：`sudo apt-get autoremove --purge vim`
- 卸载名为 Vim 的软件（dpkg 方式）：`sudo dpkg -r vim`（在输入软件的名的时候，可以输入部分，按 Tab 进行提示）
- 卸载名为 Vim 的软件（dpkg 方式，并删除配置文档）：`sudo dpkg -P vim`
- 删除已下载的旧包文件：`sudo apt-get autoclean`
- 删除所有已下载的包文件：`sudo apt-get clean`
- 卸载所有自动安装且不再使用的软件包：`sudo apt-get autoremove`


## 安装常用系统软件

- sysv-rc-conf
    - 介绍：管理启动项，一般是用在 Ubuntu 系统上的，CentOS 一般用的 chkconfig，两者用法差不多
    - 安装：`sudo apt-get install -y sysv-rc-conf`
    - 资料：
        - 图文资料：<http://blog.csdn.net/gatieme/article/details/45251389>
        - 图文资料：<http://gm100861.blog.51cto.com/1930562/950066>
 
