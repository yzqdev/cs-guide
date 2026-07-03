---
order: 5
---

# 文本编辑器与编码指南

> 好的文本编辑器能让开发效率翻倍。本文汇总了 EverEdit、Geany、Kate、EmEditor 等编辑器的配置技巧，以及文本编码相关的基础知识。

---

## 编辑器推荐速查

| 编辑器 | 特点 | 平台 | 包管理安装 | 推荐场景 |
|--------|------|------|-----------|---------|
| **EverEdit** | 国产轻量、启动快、支持宏和脚本 | Windows | 官网下载 | 日常文本编辑、日志查看 |
| **Kate** | KDE 默认编辑器，功能全面 | Linux / Windows | `scoop install kate` | 全平台开发、大文件编辑 |
| **Geany** | 轻量级 IDE，支持多种语言 | 全平台 | `scoop install geany` | 轻量开发、代码编辑 |
| **EmEditor** | 极速大文件支持（GB级）、宏录制 | Windows | 官网下载 | 超大文件编辑（GB级日志） |
| **CudaText** | 类 Sublime 的跨平台编辑器 | 全平台 | `scoop install cudatext` | 轻量代码编辑、Python 扩展 |
| **Notepad3** | Notepad 替代品，轻量安全 | Windows | `scoop install notepad3` | 替代记事本 |
| **VS Code** | 微软王牌编辑器，插件生态最强 | 全平台 | `scoop install vscode` | 日常开发 |
| **Sublime Text** | 极致性能、多光标编辑 | 全平台 | `scoop install sublime-text` | 快速编辑、免配置 |

---

## 右键添加"使用 EverEdit 打开"

EverEdit 是一款国产 Windows 文本编辑器，启动速度快、资源占用低、支持语法高亮、宏录制和脚本扩展，很适合替代系统记事本。

下面的注册表脚本可以在右键菜单中添加"用 EverEdit 打开"的选项。

新建 `add_everedit.reg` 文件，内容如下：

> 注意：将路径中的 `D:\\programs\\EverEdit\\EverEdit.exe` 替换为你的实际安装路径。

```reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\*\shell\everedit]
"Icon"="D:\\programs\\EverEdit\\EverEdit.exe"
@="用EverEdit打开"

[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\*\shell\everedit\command]
@="\"D:\\programs\\EverEdit\\EverEdit.exe\" \"%1\""
```

### 操作步骤

1. 复制上面的内容到记事本
2. 将路径改为你自己的 EverEdit 安装路径
3. 另存为 `add_everedit.reg`（编码选择 **ANSI** 或 **UTF-16 LE**，否则中文会乱码）
4. 双击运行，确认导入
5. 右键任意文件即可看到"用 EverEdit 打开"

---

## 使用 Kate 代替记事本

:::tip 推荐编辑器列表

以下是值得尝试的文本编辑器（按推荐程度排序）：

- **Geany** (推荐) — 轻量级 IDE，适合编程
- **Kate** (推荐) — KDE 默认编辑器，功能强大
- **EmEditor** — 极速大文件编辑器
- **Notepad++** — 经典替代品，插件丰富
- **EverEdit** — 国产轻量编辑器
- **UltraEdit** — 老牌编辑器，功能全面
- **VS Code** — 现代全能编辑器
- **Sublime Text** — 极致性能
- **CudaText** — 跨平台轻量编辑器
- **Notepad3** — 记事本轻量替代

:::

现在推荐使用 [Kate (KDE 默认编辑器)](https://kate-editor.org/zh-cn)

Kate 是 KDE 桌面环境的默认文本编辑器，现已支持 Windows 平台。它拥有多标签、MDI（多文档界面）、内置终端、代码折叠、语法高亮等丰富功能。

[KDE 应用全家桶](https://apps.kde.org/zh-cn)：Kate（编辑器）、Okular（文档查看器）、Kile（LaTeX 编辑器）、Filelight（磁盘分析器）等。

### 安装 Kate

```powershell
# 使用 scoop 安装
scoop bucket add extras
scoop install kate
```

安装后可以使用 `kate $PROFILE` 之类的命令快速编辑配置文件。

---

## 使用 Geany 打开文件（注册表）

Geany 是一个轻量级的跨平台 IDE，支持多种编程语言的语法高亮和代码折叠。它启动快、资源占用低，非常适合作为轻量开发环境。

### 安装 Geany

```powershell
scoop install geany
```

或者从官网 <https://www.geany.org/> 下载安装包。

### Geany 特点
- **轻量快速**：启动速度媲美记事本
- **多语言支持**：C、Java、Python、PHP、HTML 等 50+ 种语言
- **内置工具**：编译运行按钮、终端嵌入、符号浏览器
- **可扩展**：通过插件增强功能（文件浏览器、拼写检查等）

### 添加右键菜单

通过注册表在右键菜单添加"用 Geany 打开"。

**图形化操作：**

1. 打开注册表编辑器（`regedit`）
2. 导航到 `HKEY_CLASSES_ROOT\*\shell`
3. 新建项，命名为 `用geany打开`
4. 在下面新建子项 `command`
5. 修改 `command` 的默认值为 `D:\scoop\apps\geany\2.0\bin\geany.exe %1`
6. 在 `用geany打开` 项中新建字符串值 `Icon`，内容设为 `D:\scoop\apps\geany\2.0\bin\geany.exe`

**或使用 reg 文件：**

```reg
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\*\shell\geany打开]
"Icon"="D:\\scoop\\apps\\geany\\2.0\\bin\\geany.exe"

[HKEY_CLASSES_ROOT\*\shell\geany打开\command]
@="D:\\scoop\\apps\\geany\\2.0\\bin\\geany.exe %1"
```

> 注意：路径中的 `%1` 建议用双引号包裹，即 `"\"%1\""`，以支持带空格的文件名。
> 修正后的 command 值应为：`@="\"D:\\scoop\\apps\\geany\\2.0\\bin\\geany.exe\" \"%1\""`

---

## 使用 EmEditor 打开文件

EmEditor 是一款高性能的 Windows 文本编辑器，以**极速打开超大文件**著称（支持打开 GB 级别的文件而不会卡死）。它拥有强大的宏录制、列编辑模式、代码片段等功能。

### 安装 EmEditor

从官网下载：<https://www.emeditor.com/>

EmEditor 有两个版本：
- **Standard（标准版）** — 免费，功能基本够用
- **Professional（专业版）** — 付费，支持宏、插件、CSV 编辑等高级功能

### 右键添加"用 EmEditor 打开"

新建 `add_emeditor.reg`，注意路径中的 `%1` 必须用双引号包裹。

```reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\*\shell\用EmEditor打开]
"Icon"="D:\\programs\\EmEditor\\EmEditor.exe"
@="用EmEditor打开"

[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\*\shell\用EmEditor打开\command]
@="\"D:\\programs\\EmEditor\\EmEditor.exe\"  \"%1\""
```

### 劫持默认记事本（notepad.exe 镜像劫持）

除了添加右键菜单，还可以通过注册表将系统默认的 `notepad` 命令指向 EmEditor，这样无论在哪里调用记事本都会打开 EmEditor。

**方法一：修改 txt 文件关联**

1. <kbd>Win</kbd> + <kbd>R</kbd> 输入 `regedit` 打开注册表
2. 导航到 `HKEY_CLASSES_ROOT\txtfile\shell\open\command`
3. 修改默认值，将 `%SystemRoot%\system32\NOTEPAD.EXE %1` 改为你的编辑器路径
4. 例如：`D:\programs\EmEditor\EmEditor.exe %1`

**方法二：Image File Execution Options（镜像劫持）**

这种方法可以劫持所有对 `notepad.exe` 的调用，不只是 `.txt` 文件。

导航到 `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options`，创建一个名为 `notepad.exe` 的子项，将默认值设为你的编辑器路径。

```reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe]
"Debugger"="\"D:\\programs\\EmEditor\\EmEditor.exe\""
```

之后无论通过什么方式调用 `notepad`（比如在命令行输 `notepad`），都会自动打开 EmEditor。

> ⚠️ 注意：此方法会完全禁用系统记事本，请确认你的编辑器能完全替代记事本功能后再操作。

---

## CudaText 设置中文

CudaText 是一款跨平台的开源文本编辑器，界面类似 Sublime Text，使用 Python 作为扩展语言。它启动快速、支持多种编程语言的语法高亮和代码折叠。

![cudatext](https://cudatext.github.io/img/cudatext-main.png)

### 安装 CudaText

```powershell
scoop install cudatext
```

或从官网下载：<https://cudatext.github.io/>

### 设置为中文

1. 打开 <https://sourceforge.net/projects/cudatext/files/addons/>
2. 找到 **translations** 文件夹
3. 下载 `translation.zh_CN.zip`
4. 将 `install.inf`、`zh_CN.ini` 以及其他文件解压到 CudaText 的 `data\lang` 文件夹下
5. 重新启动 CudaText
6. 点击菜单 **Options → translations → zh_CN** 即可切换为中文界面

### 安装插件

全部插件下载地址：<https://sourceforge.net/projects/cudatext/files/addons_all/>

常用插件推荐：
- **Color Picker** — 颜色选择器
- **File Browser** — 文件浏览器侧边栏
- **HTML Preview** — HTML 预览
- **Project Manager** — 项目管理器
- **Snippet** — 代码片段

---

## 文本编码知识

> 编码问题是文本编辑中最常见也最容易踩坑的问题，理解清楚可以避免"乱码噩梦"。

### ANSI ≠ GB2312？—— 编码扫盲

在 Windows 命令行里敲 `notepad` 进入文本编辑页面，保存时看到编码选项中有 **ANSI**、**Unicode**、**UTF-8**，却没有"GB2312"或"GBK"。其实：**在简体中文系统下，ANSI 编码代表 GB2312 编码。**

计算机最初只支持英文（ASCII，单字节），为了支持更多语言，各个国家和地区制定了各自的编码标准：
- **GB2312 / GBK** — 中国大陆中文编码（2 字节表示一个汉字）
- **BIG5** — 繁体中文编码
- **Shift-JIS** — 日文编码
- **EUC-KR** — 韩文编码

这些使用 2 个字节来代表一个字符的本地编码方式，在 Windows 上统称为 **ANSI 编码**。在简体中文系统下，ANSI 编码代表 GB2312/GBK 编码；在日文操作系统下，ANSI 编码代表 JIS 编码。

**问题在于**：不同 ANSI 编码之间互不兼容。比如一个用 GBK 保存的文件在日文系统中打开就会显示乱码。当信息在国际间交流时，无法将属于两种语言的文字存储在同一个 ANSI 编码的文本中。

### 常用编码对比

| 编码 | 字节数 | 字符集 | 特点 |
|------|--------|--------|------|
| **ASCII** | 1 字节 | 英文字母、数字、符号 | 最基础的编码，所有编码都兼容 ASCII |
| **ANSI (GBK)** | 1~2 字节 | 简体中文 + ASCII | Windows 简体中文系统默认，不跨平台 |
| **BIG5** | 1~2 字节 | 繁体中文 + ASCII | 港台地区使用 |
| **Unicode (UTF-16 LE)** | 2 字节 | 全球所有字符 | Windows 内部使用，记事本的"Unicode"就是它 |
| **UTF-8** | 1~4 字节 | 全球所有字符 | 互联网标准，跨平台兼容性最好 |

### &#34;记事本乱码&#34;的根源

| 你用什么编码保存 | 别人用什么编码打开 | 结果 |
|-----------------|-------------------|------|
| UTF-8 | ANSI (GBK) | 中文乱码（常见！） |
| ANSI (GBK) | UTF-8 | 中文乱码 |
| UTF-16 LE | ANSI (GBK) | 能正常显示（有 BOM 标记） |
| UTF-8 with BOM | UTF-8 without BOM | 头部多出 3 个字节 |

**最佳实践：** 现代项目统一使用 **UTF-8 without BOM** 编码。所有现代编辑器（VS Code、Sublime、Geany、Kate 等）都默认使用 UTF-8，可以避免跨平台、跨系统的编码问题。

### 在 PowerShell 中检测文件编码

```powershell
# 检测文件的编码方式
[System.Text.Encoding]::Default.GetString([System.IO.File]::ReadAllBytes("文件路径.txt"))

# 批量检测当前目录下所有 txt 文件的编码
Get-ChildItem *.txt | ForEach-Object {
    $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
    $encoding = [System.Text.Encoding]::Default
    [PSCustomObject]@{
        File = $_.Name
        Encoding = $encoding.EncodingName
    }
}

# 转换文件编码为 UTF-8
Get-Content "input.txt" -Encoding Default | Set-Content "output.txt" -Encoding UTF8
```
