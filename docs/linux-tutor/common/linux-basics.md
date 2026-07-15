---
title: linux基本知识
---

# Linux 基本知识

## 一、Linux 桌面环境安装

### 1. 安装桌面环境基础

```bash
# 安装 X Window 系统（图形界面基础）
sudo apt-get install xinit

# 安装显示管理器（登录界面）
sudo apt-get install gdm          # GNOME 显示管理器
# 或者
sudo apt-get install lightdm       # LightDM 显示管理器
```

### 2. 安装桌面环境

```bash
# GNOME 桌面（最常用）
sudo apt-get install gnome-session-fallback
sudo apt-get install gnome-panel
sudo apt-get install gnome-tweaks   # GNOME 优化工具

# KDE Plasma 桌面
sudo apt-get install kubuntu-desktop

# Cinnamon 桌面（Linux Mint 默认）
sudo apt-get install cinnamon

# XFCE 桌面（轻量级）
sudo apt-get install xfce4

# MATE 桌面
sudo apt-get install mate-desktop-environment

# Unity 桌面（Ubuntu 经典）
sudo apt-get install unity
```

### 3. 安装中文语言支持

```bash
# 安装中文语言包
sudo apt-get install language-pack-zh-hans*
sudo apt-get install language-pack-gnome-zh-hans*
sudo apt-get install language-pack-kde-zh-hans*

# 安装中文输入法
sudo apt-get install fcitx fcitx-googlepinyin   # 谷歌拼音
sudo apt-get install fcitx fcitx-sunpinyin       # 搜狗拼音
# 或 ibus 输入法
sudo apt-get install ibus ibus-pinyin

# 运行语言支持检查
sudo apt install $(check-language-support)
```

### 4. 切换系统语言

**改为英文**：
```bash
# 编辑 locale 配置文件
sudo vi /etc/default/locale
# 修改为：
# LANG="en_US.UTF-8"
# LANGUAGE="en_US:en"

# 生成本地化设置
sudo locale-gen en_US.UTF-8

# 重启或注销后生效
```

**改为中文**：
```bash
# 编辑 locale 配置文件
sudo vi /etc/default/locale
# 修改为：
# LANG="zh_CN.UTF-8"
# LANGUAGE="zh_CN:zh"

# 生成本地化设置
sudo locale-gen zh_CN.UTF-8
```

### 5. 查看当前语言设置

```bash
locale              # 列出所有语言设置
locale -a           # 列出所有可用的语言环境
echo $LANG          # 查看当前语言
```

---

## 二、APT 包管理器详解

### 基本语法

```bash
apt [选项] 命令
```

### 常用命令

| 命令 | 说明 |
|------|------|
| `apt update` | 更新软件包列表 |
| `apt upgrade` | 升级所有可升级的包 |
| `apt install 包名` | 安装软件包 |
| `apt reinstall 包名` | 重新安装软件包 |
| `apt remove 包名` | 移除软件包（保留配置）|
| `apt purge 包名` | 彻底移除（删除配置）|
| `apt autoremove` | 自动移除无用的依赖包 |
| `apt search 关键字` | 搜索软件包 |
| `apt show 包名` | 显示软件包详细信息 |
| `apt list --installed` | 列出已安装的包 |
| `apt list --upgradable` | 列出可升级的包 |
| `apt edit-sources` | 编辑软件源 |
| `apt satisfy 依赖` | 满足依赖关系 |

### 安装常用软件包

```bash
# 系统工具
sudo apt install tree               # 目录树显示
sudo apt install neofetch           # 系统信息展示
sudo apt install htop               # 进程管理增强版
sudo apt install screenfetch        # 系统信息展示
sudo apt install file-roller        # 压缩包管理器
sudo apt install gnome-software     # 软件商店
sudo apt install gnome-system-monitor  # 任务管理器
sudo apt install software-properties-gtk  # 软件源管理

# 开发工具
sudo apt install build-essential    # 编译工具链
sudo apt install git                # 版本控制
sudo apt install vim                # 编辑器

# 网络工具
sudo apt install curl wget          # 下载工具
sudo apt install net-tools          # 网络工具集
sudo apt install openssh-server     # SSH 服务

# 多媒体
sudo apt install vlc                # 视频播放器
sudo apt install audacity           # 音频编辑
sudo apt install gimp               # 图片编辑
sudo apt install shutter            # 截图工具
```

---

## 三、Linux 文件系统

### 目录结构

```
/                    # 根目录
├── bin -> usr/bin   # 用户命令（二进制文件）
├── boot             # 引导加载程序文件
├── dev              # 设备文件
├── etc              # 配置文件
├── home             # 用户家目录
│   ├── user1/
│   └── user2/
├── lib -> usr/lib   # 系统库文件（类似 Windows 的 DLL）
├── media            # 可移动媒体挂载点
├── mnt              # 临时挂载点
├── opt              # 可选软件包
├── proc             # 进程和内核信息（虚拟文件系统）
├── root             # root 用户家目录
├── run              # 运行时变量数据
├── sbin -> usr/sbin # 系统管理命令
├── srv              # 服务数据
├── sys              # 系统设备信息（虚拟文件系统）
├── tmp              # 临时文件
├── usr              # 用户程序和数据
│   ├── bin/         # 用户命令
│   ├── lib/         # 库文件
│   ├── local/       # 本地安装的软件
│   └── share/       # 共享数据
└── var              # 可变数据
    ├── log/         # 日志文件
    ├── cache/       # 缓存
    ├── lib/         # 状态信息
    └── tmp/         # 重启后保留的临时文件
```

### 重要目录说明

| 目录 | 说明 |
|------|------|
| `/bin` | 基本用户命令，所有用户都可执行 |
| `/sbin` | 系统管理命令，通常需要 root 权限 |
| `/etc` | 系统配置文件，类似 Windows 注册表 |
| `/home` | 普通用户家目录 |
| `/root` | 超级用户家目录 |
| `/var` | 经常变化的文件（日志、缓存、数据库）|
| `/tmp` | 临时文件，重启后清空 |
| `/dev` | 设备文件，Linux 中一切皆文件 |
| `/proc` | 内核和进程信息虚拟文件系统 |
| `/usr` | 用户安装的软件和共享数据 |

### 查看目录结构

```bash
tree -d -L 1 /        # 显示根目录下的一级子目录（仅目录）
tree -d -L 2 /usr     # 显示 /usr 下两级子目录
tree /home            # 显示家目录完整结构
```

---

## 四、有趣的 Linux 命令

### 终端小游戏/彩蛋

```bash
# 安装
sudo apt install oneko         # 小猫追鼠标
sudo apt install cmatrix       # 黑客帝国字符雨
sudo apt install sl            # 小火车跑过终端
sudo apt install cowsay        # 奶牛说话
sudo apt install fortune       # 随机名言
sudo apt install figlet        # ASCII 艺术字
sudo apt install lolcat        # 彩虹色输出

# 使用
oneko                          # 一只小猫追着鼠标跑
cmatrix                        # 黑客帝国绿色字符雨（按 Ctrl+C 退出）
sl                             # 一辆小火车跑过终端
cowsay "Hello Linux"           # 奶牛说话
fortune                        # 显示随机名言
fortune | cowsay               # 奶牛说名言
figlet "Linux"                 # 大号 ASCII 艺术字
echo "Hello" | lolcat          # 彩虹色输出
```

### 有趣的系统命令

```bash
# 系统信息
neofetch                       # 漂亮的系统信息展示
screenfetch                    # 另一种系统信息展示
archey3                        # 类似 neofetch

# 其他
yes "Hello"                    # 不断输出 Hello（按 Ctrl+C 停止）
banner "Hello"                 # 打印横幅
rev                            # 反转输入文本（输入后 Ctrl+D）
```

---

## 五、搜狗输入法安装

```bash
# 1. 下载搜狗输入法 .deb 包
# 从官网下载：https://pinyin.sogou.com/linux/

# 2. 安装 gdebi（用于安装 .deb 包）
sudo apt install gdebi

# 3. 安装搜狗输入法
sudo gdebi sogoupinyin_2.4.0.3469_amd64.deb

# 4. 重启系统或注销后重新登录
# 5. 配置输入法：在系统设置 → 区域与语言 → 输入源中添加搜狗输入法
```

---

## 六、安装主题

### 1. Elementary OS 主题

```bash
sudo add-apt-repository ppa:elementary-os/daily
sudo apt-get update
sudo apt-get install elementary-icon-theme
```

### 2. UKUI 主题（优麒麟）

访问 [www.ukui.org](https://www.ukui.org/) 查看官方安装教程。

### 3. Zorin OS 主题

```bash
# 安装主题
sudo add-apt-repository ppa:noobslab/themes
sudo apt-get update
sudo apt-get install zorinos-themes

# 安装图标
sudo add-apt-repository ppa:noobslab/icons2
sudo apt-get update
sudo apt-get install zorinos-icons
```

### 4. 启用主题

安装后使用以下工具来切换主题：

```bash
sudo apt install gnome-tweak-tool          # GNOME 调整工具
sudo apt install unity-tweak-tool          # Unity 调整工具
sudo apt install ubuntu-tweak              # Ubuntu 调整工具
```

---

## 七、常用软件推荐

### 系统工具

| 软件 | 安装命令 | 说明 |
|------|----------|------|
| GNOME 软件中心 | `sudo apt install gnome-software` | 软件商店 |
| 系统监视器 | `sudo apt install gnome-system-monitor` | 任务管理器 |
| 软件源管理 | `sudo apt install software-properties-gtk` | 管理 PPA 源 |

### 网络工具

| 软件 | 安装命令 | 说明 |
|------|----------|------|
| FileZilla | `sudo apt install filezilla` | FTP/SFTP 客户端 |
| Transmission | `sudo apt install transmission` | BT 下载工具 |

### 多媒体

| 软件 | 安装命令 | 说明 |
|------|----------|------|
| VLC | `sudo apt install vlc` | 视频播放器 |
| Audacity | `sudo apt install audacity` | 音频编辑 |
| Rhythmbox | `sudo apt install rhythmbox` | 音乐播放器 |
| GIMP | `sudo apt install gimp` | 图片编辑 |
| Shutter | `sudo apt install shutter` | 截图工具 |
| OpenShot | `sudo apt install openshot` | 视频编辑 |
| Kdenlive | `sudo apt install kdenlive` | 视频编辑 |

### 字体管理

```bash
sudo apt install gnome-font-viewer    # GNOME 字体查看器
sudo apt install font-manager         # 字体管理器
```