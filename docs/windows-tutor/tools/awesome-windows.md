---
order: 3
---
# Windows 好用的软件

> 一份精心整理的 Windows 软件清单，涵盖看图、音视频、剪辑、截图、录屏、下载、系统优化等方方面面。

---

## 目录

- [包管理器](#包管理器)
- [看图软件](#看图软件)
- [音视频软件](#音视频软件)
- [截屏软件](#截屏软件)
- [录屏软件](#录屏软件)
- [剪辑软件](#剪辑软件)
- [下载工具](#下载工具)
- [鼠标手势软件](#鼠标手势软件)
- [图标工具](#图标工具)
- [文件管理](#文件管理)
- [系统优化](#系统优化)
- [浏览器推荐](#浏览器推荐)
- [SSH 软件](#ssh-软件)
- [辅助工具](#辅助工具)
- [下载站与资源](#下载站与资源)
- [其他推荐](#其他推荐)

---

## 包管理器

> 统一管理 Windows 上的软件安装、更新和卸载，告别手动下载安装包。

### UniGetUI（推荐）

[UniGetUI](https://github.com/marticliment/UniGetUI)（原名 WingetUI）是一个图形化界面，统一管理 **winget、scoop、chocolatey、pip、npm** 等包管理器。可以批量查看更新、一键升级所有软件。

```powershell
# 也可以用 scoop 安装
scoop install unigetui
```

---

## 看图软件

> 日常看图、图片管理、简单编辑，以下都是精品。

### JPEGView

[JPEGView](https://github.com/sylikc/jpegview/) — 极致轻量的图片查看器，启动极快，支持基本编辑（裁剪、调色）。只有一个 exe 文件，绿色免安装。

### ImageGlass

[ImageGlass](https://imageglass.org/) — 开源、美观、轻量的图片查看器，支持 80+ 图片格式，支持 SVG、WebP、HEIC 等现代格式。

```powershell
scoop install imageglass
```

### PicView

[PicView](https://picview.org/) | [GitHub](https://github.com/Ruben2776/PicView) — 基于 WPF 的现代图片查看器，界面美观，支持深色/浅色主题，支持画廊模式和 GIF 播放。

![预览](https://picview.org/assets/screenshots/UI-Theme/UI-Dark-Theme-Magenta%20935w.webp)

### IrfanView

[IrfanView](https://www.irfanview.com/) — 老牌经典看图软件，体积极小、启动极快，支持批量转换和丰富的插件扩展。堪称"大年龄、高性能"的代表。

### XnView MP

[XnView MP](https://www.xnview.com/en/xnviewmp/) — 强大的图片管理和浏览器，支持 500+ 图片格式，内置批量转换、元数据编辑、截图等功能，非常适合大量图片管理。

### Honeyview

[Honeyview](https://www.bandisoft.com/honeyview/) — Bandisoft 出品的轻量看图软件，界面简洁，支持压缩包内直接浏览图片（ZIP/RAR），已停止更新但依然好用。

### ACDSee

[ACDSee Free](https://www.acdsee.com/en/products/acdsee-free/) — 经典看图软件的老牌选手，免费版即可满足日常看图需求，专业版支持 RAW 编辑和数字资产管理。

### nomacs

[nomacs](https://github.com/nomacs/nomacs) — 开源跨平台图片查看器，支持 RAW 格式、同步预览（双图对比），适合摄影爱好者。

### WPS 图片

WPS 图片，现在已经被整合进 WPS 里面了，如果只装 WPS 而不需要办公套件可以考虑其他方案。

### 2345 看图

[2345看图王](https://pic.2345.cc/) — 功能全面的图片查看器，但注意安装时取消勾选捆绑软件。

### MassiGra

极简图片查看器，支持快速缩放、旋转、全屏浏览。

### GifCam

GIF 录制工具，可以将屏幕区域录制成 GIF 动图，轻量好用。

### Okular

KDE 的文档查看器，支持 PDF、EPUB、DjVu、图片等多种格式，Windows 版本可用。

### Calibre

[Calibre](https://calibre-ebook.com/) — 开源电子书管理软件，支持格式转换（EPUB、MOBI、PDF 等）和设备同步。

---

## 音视频软件

> 音乐播放、视频播放、音视频格式转换。

### 视频播放器

#### PotPlayer（推荐）

[PotPlayer](http://potplayer.tv/?lang=zh_CN) — 全球范围内公认最强的 Windows 视频播放器，支持几乎所有格式，启动快、功能全、可定制性强。

**PotPlayer 不显示缩略图**：下载安装 [K-Lite Codec Pack](https://www.codecguide.com/download_k-lite_codec_pack_standard.htm) 即可解决。

#### VLC

[VLC](https://www.videolan.org/vlc/) — 开源跨平台的多媒体播放器，几乎能播放所有格式，内置解码器无需额外安装，Linux / Windows / macOS 通用。

### 音乐播放器

#### MusicBee

[MusicBee](https://getmusicbee.com/) — 功能丰富的本地音乐管理播放器，支持专辑管理、标签编辑、自动分类、均衡器等，Windows 上最好的本地音乐播放器之一。

#### AIMP

[AIMP](https://www.aimp.ru/) — 俄罗斯出品的优秀音乐播放器，音质出色、资源占用低，支持皮肤更换和 18 段均衡器。

#### Dopamine

[Dopamine](https://github.com/digimezzo/Dopamine) — 界面极简现代的音乐播放器，专注于音乐本身，支持深色主题，管理本地音乐库。

#### Foobar2000

[foobar2000](https://www.foobar2000.org/) — 老牌音乐播放器，以高度可定制著称，功能全靠插件扩展，音频发烧友的最爱。

### 视频格式转换

#### HandBrake

[HandBrake](https://github.com/HandBrake/HandBrake) — 开源免费的视频格式转换工具，支持批量转换，内置多种设备预设（iPhone、Android 等），支持 GPU 加速编码。

---

## 截屏软件

> 截图 + 贴图 + 标注 + OCR，选一个你就用。

### PixPin（推荐）

[PixPin](https://pixpinapp.com/) — 新一代截图工具，集截图、贴图、长截图、OCR 文字识别于一身，设计精美且免费。

### eSearch

[eSearch](https://github.com/xushengfeng/eSearch) — 开源跨平台截图工具，内置 OCR 文字识别、以图搜图、翻译功能。

### Snipaste

[Snipaste](https://www.snipaste.com/) — 截图 + 贴图的经典组合。截图后可以贴到屏幕上（置顶），非常适合设计师和开发者对照参考。微软商店可下载。

### ShareX

[ShareX](https://github.com/ShareX/ShareX) — 开源免费的全能截图工具，支持截图、录屏、OCR、颜色拾取、上传到图床等功能。可在微软商店/Steam 商店下载。

### PickPick

[PickPick](https://picpick.app/zh/) — 功能全面的截图工具，支持滚动截图、图片编辑、颜色拾取、标尺、量角器等，挺好用的。

### FastStone Capture

老牌截图软件，支持滚动截图、屏幕录像、图片编辑，小巧且功能强大（非开源，免费版有水印）。

### Snagit

TechSmith 出品的专业录屏+截图工具，功能极其丰富，适合做教程录屏和软件文档（收费）。

### VeryCapture

[VeryCapture](https://verycapture.com/cn/index.html) — 国产截图工具，支持截图、录屏、长截图、OCR、标注，功能全面。

---

## 录屏软件

> 录制屏幕、制作教程、直播推流。

### OBS Studio（推荐）

[OBS](https://obsproject.com/) — 开源免费的专业录屏和直播软件，支持多场景切换、各种滤镜、推流到主流平台。Steam 商店也可以下载。

### Bandicam

[Bandicam](https://www.bandicam.com/) — 简单好用的录屏工具，支持游戏录制、鼠标点击效果、画中画，录制体积小画质好（收费软件，网上找）。

### Captura

[Captura](https://github.com/MathewSachin/Captura) — 开源免费录屏工具，支持 FFmpeg、可设置帧率、可录音频，轻量好用（已停止维护）。

### EV 录屏

[EV录屏](https://www.ieway.cn/) — 国产免费录屏软件，支持录屏+直播推流，无水印，操作简单。

### 迅捷屏幕录像工具

[迅捷屏幕录像工具](https://www.xunjieshipin.com/luping) — 国产录屏软件，功能包括画笔标注、画中画、定时录制等。

### BB FlashBack

英国 Blueberry 出品的录屏工具，支持录制后编辑，适合做教程（网上找）。

### Apowersoft 录屏

[Apowersoft 在线录屏](https://www.apowersoft.cn/free-online-screen-recorder) | [桌面版](https://www.apowersoft.cn/record-all-screen) — 支持在线录屏和桌面客户端，操作简单。

### GifCapture

[GifCapture](https://github.com/chenjing1294/GifCapture) — 开源的 GIF 录制工具，可录制屏幕区域为 GIF 动图。

### ScreenToGif

[ScreenToGif](https://github.com/NickeManarin/ScreenToGif) — 最流行的开源 GIF 录制编辑器，支持录屏、摄像头录制、白板绘图，内置简单的编辑功能（裁剪、删帧、添加字幕）。

### Honeycam

Bandisoft 出品的 GIF/WebP 录制工具，支持从视频提取帧、编辑帧、导出高质量动图（免费版有水印）。

---

## 剪辑软件

> 视频剪辑、专业调色、日常短视频。

### 剪映（推荐）

[剪映](https://www.capcut.cn/) — 抖音出品的免费视频剪辑工具，专业版功能强大：自动字幕、语音转文字、海量素材库、模板一键套用。上手门槛最低。

### 必剪

[必剪](https://bcut.bilibili.cn/) — B 站出品的免费视频剪辑工具，与 B 站生态整合良好，支持一键投稿、AI 字幕、素材推荐。

### Shotcut

[Shotcut](https://www.shotcut.org/) — 开源跨平台的视频编辑器，功能专业（多轨道、滤镜、关键帧），插件系统完善，值得推荐。

### 达芬奇软件（DaVinci Resolve）

[DaVinci Resolve](https://www.blackmagicdesign.com/cn/products/davinciresolve/studio) — 好莱坞级别的专业视频调色和编辑软件，免费版已包含绝大多数功能。学习曲线较为陡峭。

![预览](https://images.blackmagicdesign.com/images/products/davinciresolve/studio/hero/hero-xl.jpg?_v=1603923503)

### Vegas Pro

[Vegas Pro](https://www.vegascreativesoftware.com/int/vegas-pro/) — 老牌非线性视频编辑软件，操作直观、入门相对容易，适合 Vlog 和视频创作者（收费）。

### 福听视频剪辑

[福听视频剪辑](https://www.pdf365.cn/foxit-clip/) — 福昕出品，简单易用的剪辑工具。

### 蜜蜂剪辑

[蜜蜂剪辑](https://beecut.cn/?apptype=octopus) — 国产剪辑软件，支持多平台，界面友好。

### 迅捷视频剪辑

[迅捷视频剪辑](https://www.xunjieshipin.com/video-clip?zhczk) — 迅捷系列的剪辑工具。

### 万兴喵影

[万兴喵影](https://miao.wondershare.cn/.html) — 万兴科技出品的视频剪辑软件，支持多轨道、特效模板、画中画等功能。

---

## 下载工具

> 让下载更快的工具。

### Neat Download Manager (NDM)

[NDM](https://www.neatdownloadmanager.com/index.php/en/) — 轻量级下载管理器，支持多线程下载、浏览器集成和视频嗅探。

### Free Download Manager (FDM)

[FDM](https://www.freedownloadmanager.org/zh/) — 开源免费的多线程下载管理器，支持 BT 下载、视频抓取、浏览器扩展，NDM 的免费替代品。

---

## 文件管理

> 替代资源管理器，多标签、双面板，效率翻倍。

### One Commander

[One Commander](https://onecommander.com/) — 现代双面板文件管理器，支持多标签、列视图、文件预览、云存储集成（OneDrive、Google Drive），界面颜值高。

### Q-Dir

[Q-Dir](http://www.q-dir.com/) — 四面板文件管理器，最多同时显示 4 个目录，适合频繁在多个文件夹之间操作的用户。

### Allen Explorer

[Allen Explorer](https://www.allenxiang.com/index.html) — 国产多标签文件管理器，类似 macOS Finder 风格，支持标签页、收藏夹、双面板。

### Total Commander（未列出但经典）

这里虽然没有列出，但它也是老牌文件管理器的代表。

### Everything

[Everything](https://www.voidtools.com/zh-cn/) — Windows 上最快的文件搜索工具，基于 NTFS 索引，输入即出结果。

教程：[https://zhuanlan.zhihu.com/p/61334612](https://zhuanlan.zhihu.com/p/61334612)

### Everything Toolbar

[Everything Toolbar](https://github.com/srwi/EverythingToolbar) — 将 Everything 搜索框集成到任务栏上，谁用都说好，超方便。

### WizTree

[WizTree](https://diskanalyzer.com/?ref=wiztree) — 磁盘空间分析工具，查看文件夹大小又快又好，比同类工具快很多。

从官网：[https://www.diskanalyzer.com/](https://www.diskanalyzer.com/) 也可以下载，以树结构直观展示文件和文件夹大小分布。

---

## 鼠标手势软件

> 用鼠标画个符号就执行操作，效率党的最爱。

### StrokesPlus.net（推荐）

[StrokesPlus.net](https://www.strokesplus.net/) — 开源的鼠标手势软件，支持多显示器，可以设置任意手势触发任意操作（快捷键、打开文件、运行脚本等）。

### Stroke

[Stroke](https://github.com/poerin/Stroke) — 国产鼠标手势软件，轻量、开源。

---

## 图标工具

> 制作图标、转换格式。

### Greenfish Icon Editor Pro

[Greenfish Icon Editor Pro](http://greenfishsoftware.org/gfie.php) — PNG 转 ICO 图标，也可以制作和编辑图标，支持 BMP、PNG、ICO 等格式。

### IcoFX

[IcoFX](https://icofx.ro/) — 专业图标制作工具，支持图标提取、批量转换、图标库管理（收费）。

### spacedesk

[spacedesk](https://www.spacedesk.net/) — 将平板或手机变成 Windows 的扩展屏幕，好玩又实用。

---

## 系统优化

> 系统清理、右键管理、硬件信息。

### AutoHotkey（强烈推荐）

[下载地址](https://www.autohotkey.com/) | [中文社区](https://www.autoahk.com/)

怎么说呢，不用这个，你就相当于没用过 Windows。AutoHotkey 是一款免费、开源的脚本语言，可以让你：

- 自定义快捷键（比如用 <kbd>Win</kbd> + <kbd>C</kbd> 打开计算器）
- 自动打字、文本替换（输入 `@email` 自动展开为你的邮箱）
- 窗口管理（窗口置顶、快速调整大小）
- 自动化重复操作

> 它几乎可以重新定义你使用 Windows 的方式。

### Dism++（推荐）

[Dism++](https://github.com/Chuyu-Team/Dism-Multi-language) — Windows 优化和系统管理工具，你值得拥有。

```
Dism++无需任何Dism组件，即可兼容高低版本所有系统！而微软Dism则需要3个版本。
Dism++是Dism的交集，提供完全的图形化操作，几乎支持Dism的所有功能以及大量Dism原本所不支持的功能。管理更新、驱动、功能、Appx、可选功能、服务、Compact/WIMboot、系统修复等……放马过来吧。
Dism++提供了完整的WIM支持（包括ESD捕获、ESD转ISO、释放分段ESD以及直接ISO支持），值得一提的是，ESD转ISO，Dism++可以直接在内存中解密无需修改硬盘数据。这极大的满足了强迫症患者。
Dism++提供了开放的清理以及优化功能，用户可以自定义Dism++规则，来打造专属系统工具。
```

### 右键管理

[ContextMenuManager](https://gitee.com/BluePointLilac/ContextMenuManager/releases) — 开源右键菜单管理器，可以自由开关、删除、添加右键菜单项，尤其适合清理"发送到"、显卡驱动、压缩软件等带来的过多菜单项。

### 必应壁纸

[必应壁纸](https://www.microsoft.com/zh-cn/bing/bing-wallpaper?pc=W037&rtc=1) — 微软官方出品，每天自动更换为必应搜索首页的高清壁纸，好看死了。

### PowerToys（微软商店）

[PowerToys](https://github.com/microsoft/PowerToys) — 微软官方出品的 Windows 增强工具集，包括：

- **FancyZones** — 窗口布局管理器，拖拽自动排列
- **PowerRename** — 批量重命名
- **PowerToys Run** — 快速启动器（Alt+Space）
- **Color Picker** — 屏幕取色器（Win+Shift+C）
- **Image Resizer** — 批量修改图片尺寸
- **Keyboard Manager** — 键盘按键重映射
- **File Explorer add-ons** — 文件预览（SVG、Markdown、PDF 等）

> 每一个功能都是精品，强烈推荐从微软商店下载。

### Windows Terminal（微软商店）

[Windows Terminal](https://github.com/microsoft/terminal) — 微软官方出品的新一代终端，支持多标签、GPU 加速、自定义主题、支持 PowerShell/Cmd/WSL 等配置文件。从此告别黄绿色的旧版控制台。

### PowerShell（微软商店）

可以不用去 GitHub 下载 PowerShell 了，在微软商店可以自动更新了。

---

## 浏览器推荐

### Chromium 系列

- **Chrome** — 全球份额最高的浏览器，最快的 V8 引擎
- **Edge** — 微软出品，基于 Chromium，内置 AI 和 Drop 同步
- **Brave** — 内置广告拦截和 Tor 支持，隐私优先
- **Cent Browser** — 国产 Chrome 魔改版，保留了旧版 UI，自带鼠标手势、超级拖拽
- **Vivaldi** — 高度可定制，内置笔记、截图、侧边栏
- **Run Cheese Chrome** — 便携版 Chrome
- **[Chrome Portable](https://github.com/zzp198/Google-Chrome-Portable)** — 谷歌浏览器的便携版
- **Opera** — 老牌浏览器，内置免费 VPN 和广告拦截
- **Thorium** — 基于 Chromium 的优化版，针对性能做了大量编译优化
- **Ungoogled-Chromium** — 去除 Google 服务的 Chromium，隐私保护
- **Slimjet** — 基于 Chromium 的轻量浏览器
- **Tor Browser** — 基于 Firefox 的匿名浏览器，洋葱路由
- **Chrome Go** — 手机端 Chrome 替代品
- **[Catxp](https://www.catsxp.com/)** — 国产 Chrome 内核浏览器
- **[Zen Browser](https://zen-browser.app/download/)** — 极简现代风格浏览器

### Firefox 系列

- **Firefox** — 唯一非 Chromium 核心的主流浏览器，隐私保护出色
- **Waterfox** — Firefox 的分支，支持旧版扩展
- **Floorp** — 日本开发的 Firefox 增强版，内置侧边栏、工作区

---

## SSH 软件

> 连接远程服务器，管理 Linux 主机。

### Termius（微软商店）

[Termius](https://termius.com/) — 跨平台 SSH 客户端，界面美观，支持同步配置到云端，免费版满足日常使用。

### Xterminal

[Xterminal](https://www.terminal.icu/) — 国产新一代 SSH 工具，界面漂亮，内置文件管理、端口转发、热键切换，支持 AI 辅助命令。

### 其他 SSH 工具

- **PuTTY** — 经典小体积 SSH/Telnet 客户端
- **MobaXterm** — 功能强大的多合一终端

---

## 辅助工具

### Rufus

[Rufus](https://rufus.ie/zh_CN.html) — USB 系统启动/安装盘制作工具，开源、免费、纯净，制作 Windows/Linux 启动盘的首选。

### PicGo

[PicGo](https://molunerfinn.com/PicGo/) — 自定义图床客户端，支持微博图床、七牛云、腾讯云、Imgur、GitHub 等图床，写 Markdown 必备。

### f.lux

[f.lux](https://justgetflux.com/) — 屏幕色温自动调节，过滤蓝光保护眼睛，觉得效果比系统自带的夜间模式要好些。

### Splash! - Unsplash Wallpaper（UWP 版）

Unsplash 高清壁纸自动更换应用。

### Inpaint

[Inpaint](https://www.theinpaint.com/) — 图片去瑕，去除图片中不需要的内容（水印、路人、杂物）。

### ArcTime

[ArcTime](https://arctime.org/download.html) — 字幕制作软件，支持拖拽式字幕编辑、支持 SRT/ASS 格式，适合视频创作者。

### DropIt

[DropIt](https://www.dropitproject.com/) — 文件自动分类工具，把文件拖到悬浮图标上，自动按规则归类到不同文件夹，你值得拥有。

### miniserve

[miniserve](https://github.com/svenstaro/miniserve) — 文件共享服务器，一条命令即可将本地目录通过 HTTP 分享出去。

### spacedesk

[spacedesk](https://www.spacedesk.net/) — 把平板、旧手机或另一台电脑变成 Windows 的扩展屏幕。

---

## 下载站与资源

- [MacXF 软件分享](https://soft.macxf.com/) — Mac 和 Windows 软件资源分享站

---

## 其他推荐

- [超全面的 Windows 软件推荐（小众软件）](https://www.iplaysoft.com/best-windows-apps-2022.html)
