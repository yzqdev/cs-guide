---
order: 1
---

# 01 - 环境搭建与入门

## 什么是 AutoHotkey？

AutoHotkey（简称 AHK）是一款 Windows 平台上的免费自动化脚本工具。它可以：

- 定义键盘/鼠标热键和热字符串
- 自动化窗口操作（激活、关闭、移动、调整大小）
- 模拟键盘输入和鼠标点击
- 创建图形界面（GUI）
- 调用 Windows API 和 COM 对象
- 处理文件、字符串、正则表达式

AHK v2 是当前官方推荐版本，语法更一致、更现代。**本教程全程基于 v2**。

## 安装 AHK v2

### 方式一：官方安装包（推荐）

1. 访问 [AutoHotkey 官网](https://www.autohotkey.com/)
2. 点击下载 **AutoHotkey v2**（当前最新版本）
3. 运行安装程序，选择默认安装即可
4. 安装完成后双击任意 `.ahk` 文件即可运行

### 方式二：便携版（免安装）

1. 从 GitHub Releases 下载 [AHK v2 便携版](https://github.com/AutoHotkey/AutoHotkey/releases)
2. 解压到任意目录
3. 直接运行 `AutoHotkey64.exe` 加载脚本

### 验证安装

创建一个测试脚本 `test.ahk`：

```ahk
#Requires AutoHotkey v2.0
MsgBox "AutoHotkey v2 已安装成功！"
```

双击运行，弹出对话框即表示安装成功。

## 编辑器配置

### VS Code（推荐）

1. 安装扩展 **AutoHotkey Plus Plus**（作者：cweijan）
   - 提供语法高亮、智能补全、调试支持、代码片段
2. 设置 AHK v2 为默认解释器：
   - 在 VS Code 设置中搜索 `autohotkey`
   - 将 Interpreter Path 设为 AHK v2 的安装路径

### 其他编辑器

| 编辑器 | 扩展 | 说明 |
|---------|------|------|
| VS Code | AutoHotkey Plus Plus | 最完善，强烈推荐 |
| Sublime Text | AutoHotkey 包 | 语法高亮 |
| Notepad++ | AHK 语法文件 | 基本高亮 |
| SciTE4AutoHotkey | 内置编辑器 | AHK 官方定制版，调试功能强大 |

## 第一个脚本

### Hello World

创建文件 `hello.ahk`：

```ahk
#Requires AutoHotkey v2.0

; 这是一个简单的 Hello World 脚本
MsgBox "Hello, AutoHotkey v2!"
```

运行方式：
- 双击 `.ahk` 文件
- 命令行：`AutoHotkey64.exe hello.ahk`

### 第一个热键脚本

```ahk
#Requires AutoHotkey v2.0

; 按 Ctrl+J 输出一段文字
^j:: {
    Send "AutoHotkey v2 真是太棒了！"
}

; 按 Esc 退出脚本
Esc:: ExitApp
```

> `^` 表示 Ctrl 键，`j` 表示字母 J。`^j::` 定义了 Ctrl+J 热键。

### 脚本运行方式

| 方式 | 命令/操作 |
|------|-----------|
| 双击 | 直接双击 `.ahk` 文件 |
| 命令行 | `AutoHotkey64.exe script.ahk` |
| 带参数 | `AutoHotkey64.exe script.ahk param1 param2` |
| 编译为 EXE | 使用 Ahk2Exe 工具将脚本编译为独立可执行文件 |

### 脚本管理

运行中的脚本会在系统托盘显示一个 **H** 图标：

- 右键托盘图标 → 暂停/继续脚本
- 右键托盘图标 → 退出脚本
- `ExitApp` 命令可随时终止脚本

## AHK v2 vs v1 快速认知

| 特性 | v1 | v2 |
|------|----|----|
| 语法风格 | 命令式为主 | 表达式为主，更一致 |
| 变量赋值 | `var = value`（传统）和 `var := value`（表达式） | 统一用 `var := value` |
| 函数调用 | `Func("arg")` 或 `Func, arg` | 统一 `Func("arg")` |
| 字符串 | 百分号变量 `%var%` | 直接表达式 `"Hello " name` |
| 热键块 | 可省略花括号（单行） | 推荐花括号 `{}` |
| 错误处理 | 有限 | 完整 try/catch/finally |
| 对象系统 | 旧式 Object | Array、Map、Object 更规范 |

> v1 仍然可用但不再推荐新项目使用。迁移相关内容请看第 25 章。

## 常用内置变量

```ahk
#Requires AutoHotkey v2.0

MsgBox "脚本路径: " A_ScriptFullPath
MsgBox "脚本目录: " A_ScriptDir
MsgBox "操作系统: " A_OsVersion
MsgBox "屏幕分辨率: " A_ScreenWidth " x " A_ScreenHeight
MsgBox "AHK 版本: " A_AhkVersion
MsgBox "当前时间: " A_Now
```

| 变量 | 说明 |
|------|------|
| `A_ScriptDir` | 脚本所在目录 |
| `A_ScriptFullPath` | 脚本完整路径 |
| `A_ScriptName` | 脚本文件名 |
| `A_AhkVersion` | AHK 版本号 |
| `A_OsVersion` | 操作系统版本 |
| `A_ScreenWidth/Height` | 屏幕分辨率 |
| `A_Now` | 当前本地时间（YYYYMMDDHHMMSS） |
| `A_WorkingDir` | 当前工作目录 |
| `A_PtrSize` | 指针大小（4=32位，8=64位） |
| `A_Is64bitOS` | 是否64位系统 |

---

**下一步**: [02-基本语法](02-syntax.md)
