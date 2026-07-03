---
order: 1
---
# 好用的编程软件

> 程序员日常开发中离不开的利器——从编译工具、数据库客户端到编辑器、虚拟机、系统实用工具，一网打尽。

---

## 目录

- [UPX（可执行文件压缩）](#upx)
- [数据库软件](#数据库软件)
- [Scoop（包管理器）](#scoop)
- [Sysinternals（系统内部工具套件）](#sysinternals)
- [虚拟机软件](#虚拟机软件)
- [注册表工具](#注册表工具)
- [开源软件推荐](#开源软件)
- [GitHub 实用项目](#github好用的软件)
- [Python 工具](#python-tool)
- [编辑器推荐](#编辑器)

---

## UPX

[UPX](https://upx.github.io/)（Ultimate Packer for eXecutables）是一款免费、开源的**可执行文件压缩工具**，可以快速将二进制文件压缩变小，特别适合压缩 Go 编译后的体积较大的单文件。

### 安装

```powershell
scoop install upx
```

### 常见用法

配合 Go build 使用，先去掉调试信息再压缩：

```shell
go build -ldflags="-s -w"
upx -9 gva.exe
```

| 参数 | 含义 |
|------|------|
| `-1` | 快速压缩，速度最快但压缩率最低 |
| `-9` | 最佳压缩，压缩率最高但速度最慢 |
| `--best` | 同 `-9` |
| `--lzma` | 使用 LZMA 算法，压缩率更高 |
| `-d` | 解压（解压缩回原始大小） |

### 压缩效果参考

| 场景 | 原始体积 | 压缩后 | 压缩率 |
|------|---------|--------|--------|
| Go 编译的 CLI 工具 | ~10 MB | ~3 MB | ~70% |
| Go 编译的 Web 服务 | ~25 MB | ~7 MB | ~72% |
| C/C++ 小程序 | ~500 KB | ~200 KB | ~60% |

> 注意：UPX 压缩后的程序启动时会先解压到内存再运行，对于需要频繁启动的小工具影响不大。

---

## 数据库软件

> 图形化管理 MySQL、PostgreSQL、SQLite、SQL Server 等数据库。

### HeidiSQL（推荐）

[HeidiSQL](https://www.heidisql.com/download.php?download=portable-64) — 免费、轻量、开源的数据库管理工具，支持 MySQL / MariaDB / PostgreSQL / SQL Server / SQLite。单文件便携版，启动极快，适合日常快速操作。

### Navicat

[Navicat](https://navicat.com.cn/) — 商业级数据库管理工具，功能极其强大：数据同步、结构同步、数据建模、导入导出、SSH 隧道等。支持几乎所有主流数据库（MySQL、PostgreSQL、SQL Server、Oracle、SQLite、MariaDB、MongoDB 等）。国产软件，简体中文支持好（收费，有试用期）。

### DBeaver

[DBeaver](https://dbeaver.io/) — 开源跨平台的通用数据库工具，基于 Eclipse 平台，插件生态丰富。支持几乎所有数据库，社区版免费，企业版支持 NoSQL 和更多高级功能。

### DataGrip

[DataGrip](https://www.jetbrains.com/datagrip/) — JetBrains 出品的专业数据库 IDE，与 IntelliJ 系列深度整合，SQL 补全极强，内置版本管理集成（收费，有试用期）。

### Beekeeper Studio

[Beekeeper Studio](https://www.beekeeperstudio.io/) — 现代、简洁、跨平台的 SQL 编辑器和管理工具，界面清爽，适合前端和全栈开发者。社区版开源免费。

### SQLyog

[SQLyog](https://webyog.com/product/sqlyog/) — 专注于 MySQL 的老牌图形化管理工具，功能全面，支持数据同步、自动备份、Schema 比较等（收费，有社区版）。

---

## Scoop

[Scoop](https://scoop.sh/) — Windows 下的命令行包管理器，一条命令即可安装、更新、卸载软件，告别手动下载安装包。

### 安装

```powershell
# 设置执行策略
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# 安装 Scoop
irm get.scoop.sh | iex
```

### 常用命令

```powershell
scoop search 软件名      # 搜索
scoop install 软件名     # 安装
scoop update 软件名      # 更新
scoop update *           # 更新所有
scoop uninstall 软件名   # 卸载
scoop status             # 查看可更新的软件
scoop bucket add extras  # 添加 extra 仓库（更多软件）
```

### 安装 sudo（Windows 上的 sudo）

```powershell
scoop install sudo
```

安装后可以用 `sudo` 命令以管理员身份运行程序，和 Linux 上的 sudo 类似。

---

## Sysinternals

[Microsoft Sysinternals](https://docs.microsoft.com/zh-cn/sysinternals/downloads/) — 微软官方出品的一套**系统内部工具**，是 Windows 高级用户和程序员的瑞士军刀。每一个工具都是精品。

### 常用工具推荐

Sysinternals 套件包含以下精选实用工具：

#### 进程与安全

| 工具 | 说明 |
|------|------|
| **Process Explorer** | 增强版任务管理器，查看进程树、DLL 依赖、句柄详情 |
| **Process Monitor** | 实时监控文件系统、注册表、进程活动 |
| **Autoruns** | 查看和管理所有开机自启动项 |
| **PsExec** | 远程执行命令，功能类似 SSH |
| **ShellRunas** | 右键菜单添加"以其他用户运行" |

#### 磁盘与文件

| 工具 | 说明 |
|------|------|
| **Disk2vhd** | 将物理磁盘转换为 VHD 虚拟磁盘 |
| **DU (Disk Usage)** | 命令行磁盘使用情况分析 |
| **Contig** | 磁盘碎片整理 |
| **Sync** | 强制刷新文件缓存到磁盘 |
| **SDelete** | 安全删除文件（无法恢复） |

#### 调试与诊断

| 工具 | 说明 |
|------|------|
| **ProcDump** | 进程崩溃转储（抓取 Dump 文件） |
| **DebugView** | 捕获和查看调试输出 |
| **LiveKd** | 在运行的系统中使用内核调试器 |
| **VMMap** | 查看进程虚拟内存分布 |

#### 网络

| 工具 | 说明 |
|------|------|
| **TCPView** | 查看所有 TCP/UDP 连接和所属进程 |
| **WhoIs** | 域名/IP 查询 |
| **PsPing** | ICMP/TCP ping 工具 |

#### 其他实用工具

| 工具 | 说明 |
|------|------|
| **ZoomIt** | 屏幕放大和标注（演示利器） |
| **BgInfo** | 桌面显示系统信息（IP、磁盘、内存等） |
| **Strings** | 从二进制文件中提取字符串 |
| **Streams** | 查看和删除 NTFS 数据流 |
| **Handle** | 查看进程打开的句柄 |
| **RegJump** | 在注册表编辑器中跳转到指定路径 |
| **AccessChk** | 查看文件/注册表的访问权限 |
| **PageDefrag** | 查看和整理页面文件碎片 |

> 官方下载：<https://docs.microsoft.com/zh-cn/sysinternals/downloads/>

---

## 虚拟机软件

> 快速创建和管理虚拟机，用于开发测试或运行多系统。

### Multipass（推荐）

[Multipass](https://multipass.run/) — Canonical（Ubuntu 官方）出品的轻量级 Linux 虚拟机管理器，一条命令启动 Ubuntu 实例，适合开发者快速搭建 Linux 开发环境。

```powershell
# 安装 Multipass
scoop install multipass

# 启动 Ubuntu 实例
multipass launch --name dev

# 进入虚拟机
multipass shell dev
```

### FastCopy

[FastCopy](https://fastcopy.jp/) — Windows 上最快的文件复制工具，不是虚拟机相关，但在软件开发中常用于快速备份和部署文件。

### 其他推荐

- **VirtualBox** — 开源免费，支持快照和共享文件夹
- **VMware Workstation Pro** — 功能最强大的桌面虚拟机（个人版免费）
- **WSL 2** — Windows 自带，轻量级 Linux 子系统，无需单独虚拟化

---

## 注册表工具

> 深入编辑和管理 Windows 注册表。

### Registry Finder

[Registry Finder](https://registry-finder.com/) — 免费注册表查找工具，支持正则表达式搜索、多结果预览、Favorites 收藏，比 regedit 自带的搜索快得多。

### Registry Workshop

[Registry Workshop](https://www.torchsoft.com/en/regworkshop.html) — 高级注册表编辑器，支持多级撤销、注册表比较、收藏夹、搜索替换等。比 regedit 好用得多（收费，有试用版）。

### Registrar Registry Manager

[Registrar Registry Manager](https://www.resplendence.com/registrar) — 专业的注册表管理套件，支持远程注册表编辑、高级搜索替换、注册表快照对比。适合系统管理员（收费）。

---

## 开源软件

> 日常开发中好用的开源工具。

### 编辑器与文档

- **Markdown（微软商店）** — 微软商店搜索 "Markdown" 可以找到不少好用的 Markdown 编辑器
- **[Mark Text](https://github.com/marktext/marktext)** — 开源 Markdown 编辑器，所见即所得，界面极简美观
- **[Calibre](https://calibre-ebook.com/)** — 开源电子书管理工具，支持格式转换和阅读

### 设计 & CAD

- **FreeCAD** — 开源参数化 3D CAD 建模工具
- **[Dia](http://dia-installer.de/download/)** — 开源流程图/图表绘制工具，类似 Visio 的轻量替代

### 文件压缩

- **[PeaZip](https://peazip.github.io/)** — 开源压缩软件，支持 200+ 格式，界面美观，支持批量压缩和加密

### 音视频

- **VLC** — 开源跨平台多媒体播放器，几乎能播所有格式
- **[HandBrake](https://github.com/HandBrake/HandBrake)** — 开源视频格式转换工具
- **[Shotcut](https://www.shotcut.org/)** — 开源视频剪辑软件
- **[ShanaEncoder](https://github.com/1265578519/ShanaEncoder)** — 基于 FFmpeg 的 GUI 视频编码工具

### 下载工具

- **[you-get](https://github.com/soimort/you-get)** — Python 视频下载工具，支持 B站、YouTube 等 80+ 网站
- **[uGet](https://ugetdm.com/)** — 开源下载管理器，支持多线程和剪贴板监控
- **[PicGo](https://github.com/Molunerfinn/PicGo)** — 图床客户端，写 Markdown 博客必备

---

## GitHub 好用的软件

> 从 GitHub 上发现的实用项目。

### Office 激活工具

[**KMS 激活脚本**](https://github.com/netnr/kms) — 在线 KMS 激活 Windows / Office，无需下载软件，一条命令即可。

### 原神相关工具

- [**原神抽卡导出**](https://github.com/biuuu/genshin-wish-export) — 导出原神抽卡记录，支持多语言
- [**命令行版本**](https://github.com/sunfkny/genshin-gacha-export) — 原神抽卡导出的命令行版

### 其他

- [**TopList**](https://github.com/tophubs/TopList) — 各大网站热榜聚合，一个页面看遍全网热门内容

---

## Python 工具

> Python 开发者常用工具。

### Conda

[Conda](https://docs.conda.io/) — 快速管理 Python 包和环境，比 pip 更适合科学计算和数据科学场景。

```powershell
# 安装 Miniconda
scoop install miniconda3

# 常用命令
conda create -n myenv python=3.12  # 创建环境
conda activate myenv                # 激活环境
conda install numpy pandas          # 安装包
```

### Airtest

[Airtest](http://airtest.netease.com/index.html) — 网易出品的 Python 跨平台 UI 自动化测试框架，支持 Android / iOS / Windows 应用自动化。

```python
# Airtest 示例：自动打开微信
from airtest.core.api import *
connect_device("Android:///")
start_app("com.tencent.mm")
```

### 其他推荐

- **pip** — Python 官方包管理器
- **Poetry** — 现代 Python 依赖管理和打包工具
- **Black** — 代码格式化
- **Pylint / Ruff** — 代码检查

---

## 编辑器

> 精选文本编辑器，适合编程和日常编辑。

| 编辑器 | 特点 | 平台 | 推荐场景 |
|--------|------|------|---------|
| **Kate** (推荐) | KDE 默认编辑器，多标签、内置终端、代码折叠 | Linux / Windows | 全场景开发 |
| **VS Code** | 微软王牌，插件生态最强，Git 深度集成 | 全平台 | 日常开发首选 |
| **Sublime Text** | 极致性能、多光标编辑、Goto Anything | 全平台 | 快速编辑、免配置 |
| **EmEditor** | 极速大文件支持（GB 级不卡） | Windows | 超大文本处理 |
| **Notepad++** | 经典替代品，插件丰富 | Windows | 日常编辑 |
| **EverEdit** | 国产轻量，支持宏和脚本 | Windows | 日常文本编辑 |
| **Notepad3** | 记事本轻量替代，安全性好 | Windows | 替代记事本 |
| **CudaText** | 类 Sublime，跨平台，Python 扩展 | 全平台 | 轻量代码编辑 |
| **EditorPlus** | 国产编辑器，界面美观 | Windows | 替代记事本 |

### 详细说明

- **Kate** — KDE 桌面环境的默认文本编辑器，现已支持 Windows。拥有多标签、MDI 界面、内置终端、代码折叠、语法高亮等功能，推荐日常编程使用。
- **EmEditor** — 以极速打开超大文件著称（支持 GB 级别的日志文件而不卡死），支持宏录制、列编辑模式、代码片段。
- **EverEdit** — 国产 Windows 文本编辑器，启动快、资源占用低，支持语法高亮、宏录制和脚本扩展。
- **VS Code** — 现代编辑器标杆，通过扩展支持几乎所有编程语言，内置 Git、终端、调试器。
- **Sublime Text** — 极致的响应速度和流畅度，多光标编辑是杀手锏，Goto Anything 快速跳转功能无出其右。
- **CudaText** — 跨平台开源编辑器，界面类似 Sublime Text，使用 Python 作为扩展语言，启动快速。
- **Notepad3** — Notepad 的现代化替代，轻量安全，支持语法高亮和编码转换。
