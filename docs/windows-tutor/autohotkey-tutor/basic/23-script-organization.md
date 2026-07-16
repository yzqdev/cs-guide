---
order: 23
---

# 23 - 脚本管理与组织

## #Include

`#Include` 用于将其他脚本文件包含进来，实现模块化：

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 包含相对路径文件
#Include lib\utils.ahk

; 包含绝对路径文件
#Include C:\AHK\Lib\mylib.ahk

; 包含目录下所有文件
#Include *i lib\optional.ahk   ; *i = 忽略错误（文件不存在不报错）
```

### #Include 的规则

- `#Include` 在脚本加载时处理（不是运行时）
- 被包含的文件可以定义函数、变量、热键
- 同一文件不会重复包含
- 包含路径相对于**当前文件**（不是主脚本）

```ahk
; 主脚本: main.ahk
#Requires AutoHotkey v2.0
#SingleInstance Force
#Include lib\strings.ahk       ; 包含字符串工具
#Include lib\windows.ahk       ; 包含窗口工具
#Include lib\hotkeys.ahk       ; 包含热键定义

; 现在可以使用所有包含文件中的函数和热键
```

## 库函数目录

AHK 有标准的库函数机制：

### 标准库路径

```
%A_MyDocuments%\AutoHotkey\Lib\     ; 用户库
%A_AhkPath%\Lib\                    ; 系统库（AHK 安装目录下）
```

放在这些目录下的 `.ahk` 文件会被自动搜索：

```ahk
; 如果调用了一个未定义的函数 MyFunc
; AHK 会自动搜索:
; %A_MyDocuments%\AutoHotkey\Lib\MyFunc.ahk
; %A_AhkPath%\Lib\MyFunc.ahk

; 只需将函数文件放到 Lib 目录，无需 #Include
```

### 函数文件命名

```
; 文件名必须与函数名一致
; MyFunc.ahk → 包含 MyFunc() 函数
; StringUtils.ahk → 包含 StringUtils 类或函数
```

## 脚本结构模板

### 推荐的项目结构

```
MyProject/
├── main.ahk              ; 主脚本入口
├── config.ahk            ; 配置和全局变量
├── lib/
│   ├── utils.ahk         ; 通用工具函数
│   ├── windows.ahk       ; 窗口操作函数
│   ├── strings.ahk       ; 字符串处理函数
│   └── hotkeys.ahk       ; 热键定义
└── data/
│   ├── config.ini        ; 配置文件
│   └── templates/        ; 模板文件
```

### 主脚本模板

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force
#Warn All, StdOut

; ===== 配置 =====
CoordMode "Mouse", "Screen"
CoordMode "Pixel", "Screen"
SetWorkingDir A_ScriptDir

; ===== 包含 =====
#Include lib\utils.ahk
#Include lib\hotkeys.ahk

; ===== 全局变量 =====
APP_NAME := "MyTool"
APP_VERSION := "1.0"
debugMode := false

; ===== 初始化 =====
Init()

Init() {
    ; 加载配置
    LoadConfig()
    ; 设置定时器
    SetTimer CheckIdle, 60000
    ; 显示托盘菜单
    SetupTray()
}

LoadConfig() {
    global
    configPath := A_ScriptDir "\data\config.ini"
    if FileExist(configPath) {
        fontSize := IniRead(configPath, "Editor", "FontSize", 12)
        autoSave := IniRead(configPath, "Editor", "AutoSave", 0)
    }
}

SetupTray() {
    A_TrayMenu.Delete()              ; 清空默认菜单
    A_TrayMenu.Add("设置", ShowSettings)
    A_TrayMenu.Add("关于", ShowAbout)
    A_TrayMenu.Add()                 ; 分隔线
    A_TrayMenu.Add("退出", (*) => ExitApp())
}

ShowSettings(*) {
    MsgBox "设置界面"
}

ShowAbout(*) {
    MsgBox APP_NAME " v" APP_VERSION
}

; ===== 热键 =====
Esc:: ExitApp
```

### 工具函数库模板

```ahk
; lib/utils.ahk — 通用工具函数

; 日志函数
LogWrite(msg) {
    timestamp := FormatTime(A_Now, "yyyy/MM/dd HH:mm:ss")
    FileAppend timestamp " — " msg "`n", A_ScriptDir "\log.txt"
}

; 安全的文件读取
SafeFileRead(path) {
    try {
        return FileRead(path)
    } catch {
        return ""
    }
}

; 数组求和
ArraySum(arr) {
    total := 0
    for i, v in arr
        total += v
    return total
}

; 字符串首字母大写
Capitalize(s) {
    if StrLen(s) = 0
        return s
    return StrUpper(SubStr(s, 1, 1)) . SubStr(s, 2)
}

; 剪贴板操作（保存-修改-恢复）
PasteText(text) {
    saved := A_Clipboard
    A_Clipboard := text
    ClipWait 2
    Send "^v"
    Sleep 100
    A_Clipboard := saved
}
```

## 托盘菜单定制

```ahk
; 自定义托盘菜单
A_TrayMenu.Delete()                     ; 删除所有默认项

A_TrayMenu.Add("功能1", Func1)
A_TrayMenu.Add("功能2", Func2)
A_TrayMenu.Add("功能3", Func3)

A_TrayMenu.Add()                        ; 分隔线
A_TrayMenu.Add("帮助", ShowHelp)
A_TrayMenu.Add("关于", ShowAbout)
A_TrayMenu.Add()                        ; 分隔线
A_TrayMenu.Add("暂停脚本", PauseToggle)
A_TrayMenu.Add("退出", (*) => ExitApp())

; 设置默认项（双击托盘图标触发）
A_TrayMenu.DefaultAction := "功能1"

Func1(*) { MsgBox "功能1" }
Func2(*) { MsgBox "功能2" }
Func3(*) { MsgBox "功能3" }
ShowHelp(*) { Run "https://www.autohotkey.com/docs/" }
ShowAbout(*) { MsgBox "MyTool v1.0" }
PauseToggle(*) {
    if A_IsPaused {
        Pause -1   ; 恢复
        ToolTip "脚本已恢复"
    } else {
        Pause 1    ; 暂停
        ToolTip "脚本已暂停"
    }
    SetTimer () => ToolTip(), -2000
}

; 修改托盘图标提示文字
A_IconTip := "MyTool v1.0 — 右键查看菜单"
```

## 编译为 EXE

使用 Ahk2Exe 编译器可以将 `.ahk` 脚本编译为独立的 `.exe` 文件：

```ahk
; 方式1: 使用 AHK 自带的 Ahk2Exe 工具
; 位于 AHK 安装目录下的 Compiler\Ahk2Exe.exe

; 方式2: 命令行编译
Run "Ahk2Exe.exe /in main.ahk /out MyTool.exe"

; 方式3: 在脚本中使用
; CompileScript() {
;     compiler := A_AhkPath "\..\Compiler\Ahk2Exe.exe"
;     Run compiler ' /in "' A_ScriptFullPath '" /out "' A_ScriptDir '\MyTool.exe"'
; }
```

### 编译选项

| 选项 | 说明 |
|------|------|
| `/in` | 输入脚本路径 |
| `/out` | 输出 EXE 路径 |
| `/icon` | 图标文件路径 |
| `/compress` | 压缩级别 (0-2) |
| `/mpress` | 使用 mpress 压缩 |
| `/gui` | 以 GUI 模式运行编译器 |

## 常见脚本管理问题

### 脚本冲突

```ahk
; #SingleInstance 解决同一脚本多次运行的冲突
#SingleInstance Force      ; 强制替换旧实例（推荐）
#SingleInstance Ignore     ; 忽略新实例
#SingleInstance Prompt     ; 弹窗询问是否替换
```

### 热键冲突

```ahk
; 多个脚本定义同一热键 → 最后激活的脚本捕获热键
; 解决: 用 #HotIf 限制热键范围

; 或检查热键是否已注册
try {
    Hotkey "^j", On    ; 尝试注册
} catch {
    MsgBox "^j 热键已被其他脚本占用"
}
```

### 脚本自动启动

```ahk
; 将脚本放到启动文件夹
startupFolder := A_Startup
FileCopy A_ScriptFullPath, startupFolder "\" A_ScriptName

; 或者创建快捷方式到启动文件夹
; FileCreateShortcut 更灵活
FileCreateShortcut A_ScriptFullPath, A_Startup "\MyTool.lnk"
```

---

**下一步**: [24-实用脚本实例](24-practical-examples.md)
