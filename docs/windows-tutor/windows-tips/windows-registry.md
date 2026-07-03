# Windows注册表完全指南

## 什么是注册表

Windows 注册表（Registry）是一个 **层次化的中央数据库**，用于存储 Windows 操作系统和应用程序的配置信息。从 Windows 95 开始引入，取代了早期 Windows 中的 INI 配置文件、AUTOEXEC.BAT 和 CONFIG.SYS。

简单理解：**注册表就是 Windows 的大脑**——它告诉系统：

- 桌面背景应该是什么颜色
- 双击 `.txt` 文件时用哪个程序打开
- 系统启动时加载哪些服务
- 用户账户有哪些权限
- 硬件设备使用什么驱动程序
- ……

### 什么信息存在注册表？

| 类别 | 示例 |
|------|------|
| 系统设置 | 启动项、服务状态、安全策略 |
| 硬件配置 | 驱动程序信息、设备参数、已安装硬件 |
| 用户设置 | 桌面主题、壁纸、任务栏布局 |
| 软件配置 | 安装路径、许可证信息、用户偏好 |
| 文件关联 | `.txt`→记事本、`.html`→浏览器 |
| 网络设置 | IP配置、代理设置、网络协议 |

---

## 注册表的结构

注册表的结构像一个 **文件系统**，用树形层次组织：

```
注册表                    → 类似 硬盘根目录
├── 项 (Key)              → 类似 文件夹
│   ├── 子项 (Subkey)     → 类似 子文件夹
│   └── 值 (Value)        → 类似 文件
│       ├── 名称 (Name)   → 类似 文件名
│       └── 数据 (Data)   → 类似 文件内容
```

### 具体示例

```
HKEY_CURRENT_USER
└── Control Panel
    └── Desktop
        └── Wallpaper  →  "C:\Users\Alice\Pictures\bg.jpg"
        └── ScreenSaveActive →  1
```

拆解：
- `HKEY_CURRENT_USER\Control Panel\Desktop` → **项（Key）**
- `Wallpaper` → **值名称（Value Name）**
- `"C:\Users\Alice\Pictures\bg.jpg"` → **值数据（Value Data）**

---

## 五大根键（Root Keys）

打开注册表编辑器（`regedit`），左侧会看到五个顶层项，称为**根键**或**蜂巢（Hive）**：

### 1. HKEY_CLASSES_ROOT (HKCR)

| 项目 | 说明 |
|------|------|
| 用途 | 存储文件关联、COM 组件注册信息 |
| 实际来源 | HKEY_LOCAL_MACHINE\Software\Classes + HKEY_CURRENT_USER\Software\Classes 合并视图 |
| 典型路径 | `HKCR\.txt`、`HKCR\txtfile\shell\open\command` |

**作用**：双击文件时用哪个程序打开、右键菜单有哪些选项。

### 2. HKEY_CURRENT_USER (HKCU)

| 项目 | 说明 |
|------|------|
| 用途 | 存储当前登录用户的个性化设置 |
| 实际来源 | 对应 `C:\Users\用户名\NTUSER.DAT` |
| 典型路径 | `HKCU\Control Panel\Desktop`、`HKCU\Software\Microsoft\Windows\CurrentVersion\Run` |

**作用**：每个用户独立的配置——壁纸、快捷键、软件偏好。

### 3. HKEY_LOCAL_MACHINE (HKLM)

| 项目 | 说明 |
|------|------|
| 用途 | 存储本机系统的全局配置 |
| 实际来源 | `C:\Windows\System32\config\` 下的多个文件（SAM、SOFTWARE、SYSTEM 等） |
| 典型路径 | `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall`、`HKLM\SYSTEM\CurrentControlSet\Services` |

**作用**：影响所有用户的系统级设置——硬件、驱动、系统服务、已安装程序列表。

### 4. HKEY_USERS (HKU)

| 项目 | 说明 |
|------|------|
| 用途 | 存储所有用户账户的配置 |
| 典型结构 | 每个用户对应一个 SID（安全标识符）子项 |
| 默认项 | `.DEFAULT` — 新用户创建时使用的默认配置 |

**作用**：管理员可以在这里修改其他用户的配置。

### 5. HKEY_CURRENT_CONFIG (HKCC)

| 项目 | 说明 |
|------|------|
| 用途 | 存储当前硬件配置文件的信息 |
| 实际来源 | `HKLM\SYSTEM\CurrentControlSet\Hardware Profiles\Current` 的镜像 |
| 典型路径 | `HKCC\Software\Fonts` |

**作用**：主要用于硬件配置文件切换（笔记本插电/电池不同配置时有用）。

> 注意：在 64 位 Windows 上运行 32 位应用程序时，还会有一个额外的**注册表重定向**——32 位程序读取 `HKLM\SOFTWARE` 会被自动重定向到 `HKLM\SOFTWARE\WOW6432Node`。

---

## 数据类型（Data Types）

注册表中的每个值都有特定的数据类型，告诉系统如何解释数据：

| 类型 | 名称 | 说明 | 示例 |
|------|------|------|------|
| `REG_SZ` | 字符串 | 最常用的文本值，单个字符串 | `"C:\Windows\notepad.exe"` |
| `REG_EXPAND_SZ` | 可扩展字符串 | 包含环境变量的字符串（用 `%` 包裹） | `"%SystemRoot%\notepad.exe"` |
| `REG_MULTI_SZ` | 多字符串 | 多个字符串，用空字符分隔 | `"val1\0val2\0val3\0"` |
| `REG_DWORD` | 32位整数 | 4 字节数字，常表示开关（0/1） | `0x00000001 (1)` |
| `REG_QWORD` | 64位整数 | 8 字节数字，用于大数值 | `0x0000000000000001` |
| `REG_BINARY` | 二进制 | 原始二进制数据，十六进制显示 | `00 01 02 03 ...` |
| `REG_NONE` | 无类型 | 未分类的原始数据 | — |
| `REG_RESOURCE_LIST` | 资源列表 | 硬件设备资源 | — |

### 快速记忆

```
REG_SZ      文本
REG_DWORD   开关/数字（0=关，1=开）
REG_BINARY  硬件/加密数据
REG_MULTI_SZ  列表
```

---

## 如何操作注册表

### 1. 注册表编辑器（regedit）

最直观的图形化工具。

```batch
# 打开注册表编辑器
regedit

# 以管理员身份运行（修改 HKLM 需要）
regedit
```

**快捷操作：**
- `Ctrl+F` — 查找（F3 查找下一个）
- 右键 → 导出 — 备份指定项
- 右键 → 权限 — 设置访问权限
- 文件 → 加载配置单元 — 编辑其他电脑的注册表

### 2. .reg 文件（注册表脚本）

reg 文件是纯文本，双击即可导入，也常用于分发设置。

**reg 文件格式：**
```reg
Windows Registry Editor Version 5.00

; 这是注释（分号开头）

; 添加/修改字符串值 REG_SZ
[HKEY_CURRENT_USER\Control Panel\Desktop]
"Wallpaper"="C:\\Wallpaper.jpg"

; 添加/修改 DWORD 值
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System]
"EnableLUA"=dword:00000000

; 添加/修改二进制值
[HKEY_CURRENT_USER\Software\MyApp]
"BinaryData"=hex:00,01,02,03

; 添加/修改多字符串值
[HKEY_CURRENT_USER\Software\MyApp]
"MultiString"=hex(7):65,00,6e,00,00,00

; 删除一个值（等号后面不写数据）
[HKEY_CURRENT_USER\Software\MyApp]
"ToDelete"=-

; 删除整个项（前面加减号）
[-HKEY_CURRENT_USER\Software\MyApp]
```

**reg 文件中的特殊转义：**
| 输入 | 含义 |
|------|------|
| `\\` | 反斜杠 `\`（Windows路径中的分隔符） |
| `\"` | 双引号 `"` |
| `\0` | 空字符（用于 REG_MULTI_SZ） |

### 3. 命令行操作（reg.exe）

比 regedit 更适合脚本化和远程操作。

```batch
; 查询注册表值
reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /v ProductName

; 添加/修改值
reg add "HKCU\Control Panel\Desktop" /v Wallpaper /t REG_SZ /d "C:\bg.jpg" /f

; 删除值
reg delete "HKCU\Software\MyApp" /v OldValue /f

; 删除整个项
reg delete "HKCU\Software\MyApp" /f

; 导出项到 reg 文件
reg export "HKCU\Software\MyApp" backup.reg

; 导入 reg 文件
reg import settings.reg

; 比较两个项
reg compare "HKLM\Software\MyApp" "HKCU\Software\MyApp"

; 复制一个项到另一个位置
reg copy "HKLM\Software\MyApp" "HKCU\Software\MyApp" /s
```

### 4. PowerShell 操作

PowerShell 把注册表当作 **文件系统驱动器** 一样操作：

```powershell
# 注册表有两个 PowerShell 驱动器
# HKLM:  — 对应 HKEY_LOCAL_MACHINE
# HKCU:  — 对应 HKEY_CURRENT_USER

# 导航到注册表
cd HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion

# 列出子项（类似 dir）
Get-ChildItem

# 读取值
Get-ItemProperty -Path "HKCU:\Control Panel\Desktop" -Name Wallpaper

# 设置值
Set-ItemProperty -Path "HKCU:\Control Panel\Desktop" -Name Wallpaper -Value "C:\new.jpg"

# 创建项
New-Item -Path "HKCU:\Software\MyApp"

# 创建值
New-ItemProperty -Path "HKCU:\Software\MyApp" -Name "Version" -Value "1.0" -PropertyType String

# 删除项
Remove-Item -Path "HKCU:\Software\MyApp" -Recurse

# 查找（递归搜索）
Get-ChildItem -Path "HKLM:\SOFTWARE" -Recurse | Where-Object { $_.GetValue("DisplayName") -like "*Python*" }
```

**PowerShell 数据类型对照：**

| .reg 类型 | PowerShell PropertyType |
|-----------|------------------------|
| REG_SZ | String |
| REG_EXPAND_SZ | ExpandString |
| REG_DWORD | DWord |
| REG_QWORD | QWord |
| REG_BINARY | Binary |
| REG_MULTI_SZ | MultiString |

---

## 注册表的物理存储

注册表在硬盘上并不是一个单独的文件，而是分散存储在多个文件中：

| 蜂巢（Hive） | 硬盘文件（无扩展名） |
|-------------|-------------------|
| HKLM\SAM | `%SystemRoot%\System32\config\SAM` |
| HKLM\SECURITY | `%SystemRoot%\System32\config\SECURITY` |
| HKLM\SOFTWARE | `%SystemRoot%\System32\config\SOFTWARE` |
| HKLM\SYSTEM | `%SystemRoot%\System32\config\SYSTEM` |
| HKU\.DEFAULT | `%SystemRoot%\System32\config\DEFAULT` |
| HKCU | `%UserProfile%\NTUSER.DAT` |
| HKCU\Software\Classes | `%UserProfile%\AppData\Local\Microsoft\Windows\UsrClass.dat` |

> 这些文件没有后缀名，本质上是 **Registry Hive** 格式的二进制文件。系统启动时加载它们，关机前写回磁盘。

---

## 注册表 VS 其他配置方式

| 配置方式 | 年代 | 特点 |
|---------|------|------|
| INI 文件 | Win 3.x 时代 | 分散在各处，无层次结构 |
| **注册表** | **Win95+** | **集中、层次化、支持权限、支持远程管理** |
| XML/JSON 配置文件 | 现代应用 | 可移植、易于版本管理，应用自带 |
| 组策略 (GPO) | 企业域环境 | 通过 AD 集中管理，底层改的就是注册表 |
| 设置应用 (Settings) | Win 8+ | 图形化，只暴露常用设置 |

**关键点：** 组策略、设置应用、系统策略最终都 **翻译成注册表修改**。直接改注册表就是绕过 UI 的"快捷方式"。

---

## 注册表的关键路径速查

### 系统信息

```reg
; 查看 Windows 版本
HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion
  ProductName, ReleaseId, CurrentBuild, InstallDate

; 查看系统制造商
HKLM\HARDWARE\DESCRIPTION\System\BIOS
  SystemManufacturer, SystemProductName
```

### 启动项

```reg
; 当前用户启动项
HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Run

; 所有用户启动项
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run

; 一次性启动项（运行后自动删除）
HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce
```

### 已安装程序

```reg
; 64位程序
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall

; 32位程序（在64位系统上）
HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall

; 当前用户安装的程序
HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall
```

### 文件关联

```reg
; 扩展名定义 → 指向 ProgID
HKCR\.txt       → 默认值 = "txtfile"

; ProgID 定义 → 指定打开命令
HKCR\txtfile\shell\open\command  → 默认值 = "NOTEPAD.EXE %1"

; 打开方式建议列表
HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\FileExts\.txt\OpenWithList
```

### 网络设置

```reg
; 当前网络适配器设置
HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\{GUID}

; Internet Explorer / Edge 代理设置
HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Internet Settings
  ProxyEnable, ProxyServer, ProxyOverride
```

### 服务和驱动

```reg
; 所有系统服务
HKLM\SYSTEM\CurrentControlSet\Services
  每个服务子项下：
  Start: 2=自动, 3=手动, 4=禁用
  Type: 1=驱动, 2=文件系统, 16=服务, 32=交互
  ImagePath: 可执行文件路径
```

### 安全策略

```reg
; UAC 设置
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System
  EnableLUA: 1=启用UAC, 0=禁用
  ConsentPromptBehaviorAdmin: 管理员提权行为
  PromptOnSecureDesktop: 是否在安全桌面提示

; 密码策略
HKLM\SAM\SAM\Domains\Account\Users（需要 SYSTEM 权限查看）
```

### 历史和最近文件

```reg
; 最近打开的文件
HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\RecentDocs

; 运行历史
HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\RunMRU

; 搜索历史
HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\WordWheelQuery
```

---

## 注册表的权限和安全

注册表像文件系统一样支持 **ACL（访问控制列表）**：

```
Key
├── 所有者 (Owner)
├── 管理员 (Administrators)
│   └── 完全控制 (Full Control)
├── SYSTEM
│   └── 完全控制 (Full Control)
├── 当前用户 (Current User)
│   └── 读取 (Read)
└── Users (所有用户)
    └── 读取 (Read)
```

### 常见权限问题

| 现象 | 原因 | 解决 |
|------|------|------|
| "无法导入：访问被拒绝" | 当前用户没有该项的写入权限 | 以管理员身份运行 regedit |
| "无法创建项：权限不足" | 该项受系统保护 | 获取所有权 → 修改权限 → 修改 |
| 修改不生效 | 修改了错误的位/架构 | 32位 vs 64位重定向（WOW6432Node） |
| 修改后又还原 | 组策略自动回写 | 先修改组策略，或直接改策略文件 |

---

## 备份与还原

### 方法一：导出 .reg 文件

```batch
; 导出单个项（含子项）
reg export "HKCU\Software\MyApp" backup.reg

; regedit 图形导出：右键项 → 导出
```

还原时双击 .reg 文件，或：
```batch
reg import backup.reg
```

### 方法二：系统还原点

修改系统关键配置前创建还原点：
```
控制面板 → 系统 → 系统保护 → 创建
```

### 方法三：备份蜂巢文件

```batch
; 用命令行备份整个注册表到文件
reg save HKLM\SOFTWARE software.hive

; 还原
reg restore HKLM\SOFTWARE software.hive
```

### 方法四：全量备份（第三方工具）

推荐工具：
- ERUNT（免费，适合快速备份/还原整个注册表）
- Registry Workshop（收费，功能强大的注册表编辑器，带多级撤销）

---

## 常见误区与避坑指南

### ❌ 误区 1：删除某个键就能彻底卸载软件

很多软件除了 `Uninstall` 路径下的键，还在 `HKLM\SOFTWARE`、`HKCU\SOFTWARE` 下有配置，必须全部清理。推荐使用 Geek Uninstaller 等工具。

### ❌ 误区 2：禁用 UAC 让系统更快

UAC 只是权限提升确认机制，不消耗性能。禁用 UAC 反而让恶意软件可以随意修改系统。

### ❌ 误区 3：从网上下载的 .reg 文件可以随便双击导入

**危险！** reg 文件可以执行任意注册表修改——包括添加开机启动项、禁用安全软件、修改系统关键设置。**导入前务必用记事本打开查看内容。**

### ❌ 误区 4：注册表清理能让电脑变快

Windows 注册表的大小即使有几十 MB，对现代计算机的性能影响可以忽略不计。**所谓的"注册表清理"工具弊大于利**——可能导致软件配置丢失、系统不稳定。微软官方也不推荐使用注册表清理工具。

### ❌ 误区 5：修改注册表后必须重启

取决于修改的内容：
- **立即生效：** 桌面设置、资源管理器选项（可能需要重启 Explorer）
- **重启后生效：** 系统服务、驱动、启动项
- **注销后生效：** 用户专用设置

---

## 实战：从零理解一个 .reg 文件

假设我们想实现：**在桌面右键菜单中添加"记事本打开当前目录下的文件列表"**

```reg
Windows Registry Editor Version 5.00

; 第一步：在 HKEY_CLASSES_ROOT\Directory\Background\shell 下创建一个项
; 这就是右键菜单的顶层入口
[HKEY_CLASSES_ROOT\Directory\Background\shell\ListFiles]
@="列出文件到记事本"                      ; 菜单显示的文字
"Icon"="notepad.exe,0"                   ; 菜单图标

; 第二步：在它下面创建 command 子项
; 这个项告诉系统点击菜单时要运行什么程序
[HKEY_CLASSES_ROOT\Directory\Background\shell\ListFiles\command]
@="cmd.exe /c \"dir /b > %TEMP%\\filelist.txt && notepad %TEMP%\\filelist.txt\""
```

**逐行解读：**

| 内容 | 含义 |
|------|------|
| `Windows Registry Editor Version 5.00` | 文件头，告诉系统这是注册表脚本 |
| `[HKEY_CLASSES_ROOT\Directory\Background\shell\ListFiles]` | 在桌面背景右键菜单中新增一个项 |
| `@="列出文件到记事本"` | `@` 是项默认值的缩写，这里设菜单文本 |
| `"Icon"="notepad.exe,0"` | 指定图标（`notepad.exe,0` 表示用 notepad 的第一个图标） |
| `[……\command]` | command 子项是标准结构，指定执行命令 |
| `"……"="cmd.exe /c ……"` | 实际执行的命令 |

---

## 注册表操作的最佳实践

1. **先备份，后修改** — 每次修改前导出目标项
2. **一次只改一处** — 改完后验证效果，再改下一处
3. **用 .reg 文件而不是 regedit 直接改** — 可以 review 内容，方便回滚
4. **不要删除未知项** — 不确定用途的键先重命名（加个 `.bak` 后缀）
5. **注意 32/64 位重定向** — 32 位程序在 64 位系统上读写 `HKLM\SOFTWARE` 会被重定向到 `HKLM\SOFTWARE\WOW6432Node`
6. **关闭 regedit 再修改 .reg 文件** — regedit 会缓存视图，不会自动刷新
7. **重启资源管理器测试 UI 修改** — 很多 UI 修改需要重启 Explorer 才能看到效果

---

## 总结

```
注册表 = Windows 配置的"操作系统"
  ├── 树形结构（项 → 子项 → 值）
  ├── 5 大根键（HKCR / HKCU / HKLM / HKU / HKCC）
  ├── 8 种数据类型（最常用：REG_SZ, REG_DWORD）
  ├── 4 种操作方式（regedit / .reg / reg.exe / PowerShell）
  ├── 物理存储在多个 hive 文件中
  └── 权限系统类似 NTFS
    
核心原则：先备份，后修改；不确认，别乱删！
```

> 有了本篇的基础知识，再去看 `common-regs.md` 中的具体注册表示例，就能明白每一条在做什么、为什么这样写了。
