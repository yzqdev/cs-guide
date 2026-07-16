---
order: 13
---

# 13 - 控件操作

## 控件操作概述

控件操作允许你直接与窗口内的 UI 元素交互，无需模拟键盘/鼠标操作。这种方式更稳定、更可靠。

## 控件识别

### 控件的 ClassNN

每个控件都有一个 ClassNN（类名+序号），如 `Edit1`、`Button2`、`Listbox1`：

```ahk
; 查看控件的 ClassNN — 用 Window Spy 工具
; 右键 AHK 托盘图标 → Window Spy

; 或者用代码获取
ctrlList := WinGetControls("计算器")
for i, ctrl in ctrlList {
    MsgBox ctrl   ; 显示所有控件的 ClassNN
}
```

### 控件文本

有些控件可以通过文本匹配（按钮上的文字等）：

```ahk
; 用按钮文字识别
ControlClick "确定", "对话框"
ControlClick "Cancel", "Save As"

; 用 ClassNN
ControlClick "Button1", "对话框"
```

## ControlSend — 向控件发送按键

```ahk
; ControlSend(按键, 控件, 窗口)
ControlSend "Hello World", "Edit1", "记事本"

; 发送特殊键
ControlSend "{Enter}", "Edit1", "记事本"

; 发送到控件，即使窗口不活动
; 这是最稳定的输入方式——不需要窗口在前台
WinActivate "记事本"       ; 不需要激活！
ControlSend "Hello", "Edit1", "记事本"  ; 即使窗口在后台也能发送

; 向整个窗口发送（不指定控件）
ControlSend "^a",, "记事本"   ; Ctrl+A 发送到记事本主窗口
```

### ControlSend vs Send

| 方式 | 需要窗口活动 | 可后台操作 | 稳定性 |
|------|-------------|-----------|--------|
| `Send` | 是 | 否 | 中 |
| `ControlSend` | 否 | 是 | 高 |
| `SendInput` | 是 | 否 | 高 |

> `ControlSend` 是最推荐的输入方式，因为它不依赖窗口状态。

## ControlClick — 点击控件

```ahk
; ControlClick(控件, 窗口, 按钮类型, 点击次数, 模式)
ControlClick "Button1", "对话框"              ; 左键单击
ControlClick "Button1", "对话框", "R"          ; 右键单击
ControlClick "Button1", "对话框", , 2          ; 双击

; 用按钮文字匹配
ControlClick "确定", "对话框"
ControlClick "Cancel", "另存为"

; 用坐标点击（相对控件）
ControlClick "x50 y20", "Static1", "对话框"

; 后台点击 — 窗口不需要活动
ControlClick "Button1", "对话框", , , "NA"    ; NA = 不激活窗口
```

## ControlGetText — 获取控件文本

```ahk
; ControlGetText(控件, 窗口)
text := ControlGetText("Edit1", "记事本")
MsgBox "记事本内容: " text

; 获取下拉框选中项
selection := ControlGetText("ComboBox1", "设置")

; 获取按钮文字
btnText := ControlGetText("Button1", "对话框")
MsgBox btnText    ; "确定" 或 "Cancel"
```

## ControlSetText — 设置控件文本

```ahk
; ControlSetText(控件, 文本, 窗口)
ControlSetText "Edit1", "Hello AHK v2!", "记事本"

; 设置文件路径（另存为对话框）
WinWait "另存为"
ControlSetText "Edit1", "C:\MyFolder\file.txt", "另存为"
ControlClick "Button2", "另存为"   ; 点击保存
```

## ControlChoose — 选择控件项

```ahk
; 选择下拉框的指定项（按索引，从1开始）
ControlChoose 3, "ComboBox1", "设置"    ; 选择第3项

; 选择列表框的指定项
ControlChoose 2, "ListBox1", "对话框"

; 选择 Tab 控件的指定页
ControlChoose 1, "SysTabControl321", "属性"
```

### ControlChooseString — 按文字选择

```ahk
; 选择下拉框中文字匹配的项
ControlChooseString "English", "ComboBox1", "语言设置"
```

## 其他控件函数

### ControlGet / ControlSet

```ahk
; 获取控件的各种属性
; ControlGet(命令, 值, 控件, 窗口)

; 检查控件是否可见
visible := ControlGetVisible("Button1", "对话框")

; 检查控件是否启用
enabled := ControlGetEnabled("Edit1", "记事本")

; 获取控件位置
ControlGetPos &x, &y, &w, &h, "Button1", "对话框"
MsgBox "控件位置: (" x "," y ") 大小: " w "x" h

; 获取列表框项目数
count := ControlGetItems("ListBox1", "对话框").Length

; 获取当前选中行号
line := ControlGetCurrentCol("Edit1", "记事本")
```

### ControlFocus / ControlMove / ControlHide / ControlShow

```ahk
; 聚焦控件
ControlFocus "Edit1", "记事本"

; 移动控件
ControlMove "Button1", 10, 20, 100, 30, "对话框"

; 隐藏/显示控件
ControlHide "Button1", "对话框"
ControlShow "Button1", "对话框"
```

## 控件列表获取

```ahk
; 获取窗口所有控件 ClassNN
ctrls := WinGetControls("计算器")
for i, ctrl in ctrls {
    MsgBox ctrl
}

; 获取控件类名列表
ctrlsH := WinGetControlsHwnd("计算器")
for i, hwnd in ctrlsH {
    MsgBox "控件句柄: " hwnd
}

; 获取控件数量
count := WinGetControls("计算器").Length
MsgBox count
```

## 实用控件脚本

### 自动填写表单

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+Alt+F 自动填写登录表单
^!f:: {
    WinWait "登录", , 5
    if WinExist("登录") {
        ControlSetText "Edit1", "myusername", "登录"
        ControlSetText "Edit2", "mypassword", "登录"
        ControlClick "Button1", "登录"     ; 点击登录按钮
    }
}
```

### 记事本自动化

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+Alt+N 在记事本中输入文字
^!n:: {
    Run "notepad.exe"
    WinWait "无标题 - 记事本", , 3
    if WinExist("记事本") {
        ControlSetText "Edit1", "AutoHotkey 自动输入的文本`n第二行`n第三行", "记事本"
    }
}
```

### TreeView / ListView 操作

```ahk
; 获取 ListView 选中项
selected := ControlGetItems("SysListView321", "文件夹选项")

; TreeView 操作
ControlGetTree tmp, "SysTreeView321", "资源管理器"
```

> TreeView 和 ListView 操作较复杂，建议参考 AHK 官方文档的 GUI 控件部分。

## 窗口 Spy 工具

Window Spy 是 AHK 内置的窗口信息查看工具，是控件操作的必备辅助：

1. 右键 AHK 托盘图标 → Window Spy
2. 鼠标移到目标控件上，Window Spy 会显示：
   - 窗口标题、类名、进程名
   - 控件的 ClassNN
   - 鼠标坐标（Screen/Window/Client）
   - 控件文字

> **建议**：操作控件前，先用 Window Spy 确认控件的 ClassNN 和窗口标题。

---

**下一步**: [14-Send与键盘模拟](14-send.md)
