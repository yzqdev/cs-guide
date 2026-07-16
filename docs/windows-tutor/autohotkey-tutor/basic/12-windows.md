---
order: 12
---

# 12 - 窗口操作

## 窗口匹配规则

AHK 操作窗口前需要识别目标窗口，有多种匹配方式：

```ahk
; 按窗口标题匹配
WinActivate "计算器"

; 按部分标题匹配（默认：包含即可）
WinActivate "Chrome"       ; 任何标题包含"Chrome"的窗口

; 按进程名匹配
WinActivate "ahk_exe notepad.exe"

; 按窗口类名匹配
WinActivate "ahk_class Notepad"

; 组合匹配
WinActivate "ahk_exe chrome.exe Chrome"

; "A" 表示当前活动窗口
WinClose "A"              ; 关闭当前活动窗口
```

### 窗口标题匹配模式

```ahk
; SetTitleMatchMode 控制标题匹配方式
; 模式1: 包含匹配（默认） — 标题包含指定文字就匹配
SetTitleMatchMode 1
WinActivate "Chrome"       ; 标题包含"Chrome"即匹配

; 模式2: 从头匹配 — 标题以指定文字开头
SetTitleMatchMode 2
WinActivate "Google"       ; 标题以"Google"开头

; 模式3: 精确匹配 — 标题完全等于指定文字
SetTitleMatchMode 3
WinActivate "计算器"        ; 标题必须完全等于"计算器"

; RegEx 模式 — 正则表达式匹配
SetTitleMatchMode "RegEx"
WinActivate "^Google.*Chrome"  ; 标题匹配正则
```

## 窗口激活与等待

### WinActivate / WinActivateBottom

```ahk
; 激活窗口（将窗口带到前台）
WinActivate "计算器"

; 如果有多个匹配窗口，WinActivate 激活最近的
; WinActivateBottom 激活最老的
WinActivateBottom "Chrome"
```

### WinWait / WinWaitActive / WinWaitClose

```ahk
; WinWait — 等待窗口出现
WinWait "计算器", , 10       ; 等最多10秒
MsgBox "计算器已出现"

; WinWaitActive — 等待窗口变为活动
WinWaitActive "计算器", , 5  ; 等最多5秒

; WinWaitClose — 等待窗口关闭
WinWaitClose "计算器"
MsgBox "计算器已关闭"

; 超时检查
if !WinWait("计算器", , 5)
    MsgBox "5秒内计算器未出现"
```

## 窗口信息获取

```ahk
; WinExist — 检查窗口是否存在（返回窗口ID或0）
if WinExist("计算器")
    MsgBox "计算器正在运行"

; WinActive — 检查窗口是否活动
if WinActive("计算器")
    MsgBox "计算器是活动窗口"

; WinGetTitle — 获取窗口标题
title := WinGetTitle("A")        ; 当前活动窗口标题
MsgBox title

; WinGetClass — 获取窗口类名
cls := WinGetClass("A")
MsgBox cls

; WinGetID — 获取窗口ID
id := WinGetID("计算器")

; WinGetPos — 获取窗口位置和大小
WinGetPos &x, &y, &w, &h, "计算器"
MsgBox "位置: (" x "," y ") 大小: " w "x" h

; WinGetProcessName — 获取进程名
proc := WinGetProcessName("A")
MsgBox "进程: " proc

; WinGetText — 获取窗口文本
text := WinGetText("计算器")
MsgBox text
```

## 窗口列表

```ahk
; WinGetList — 获取所有匹配窗口ID列表
ids := WinGetList("Chrome")
for i, id in ids {
    title := WinGetTitle(id)
    MsgBox "Chrome窗口: " title
}

; 获取所有窗口
ids := WinGetList()
for i, id in ids {
    MsgBox WinGetTitle(id)
}
```

## 端口操作

### WinClose / WinKill

```ahk
; WinClose — 优雅关闭（发送WM_CLOSE消息）
WinClose "计算器"

; WinKill — 强制关闭（3秒后如果还没关就强制终止进程）
WinKill "顽固窗口"

; 等待关闭
WinClose "计算器"
WinWaitClose "计算器", , 5    ; 等最多5秒
```

### WinMove

```ahk
; 移动和调整窗口大小
; WinMove 标题, 文本, x, y, 宽, 高
WinMove "计算器", , 100, 100, 500, 400

; 只移动不调整大小
WinMove "计算器", , 100, 100

; 只调整大小不移动
WinMove "计算器", , , , 800, 600

; 居中窗口
CenterWindow(title) {
    WinGetPos &x, &y, &w, &h, title
    newX := (A_ScreenWidth - w) // 2
    newY := (A_ScreenHeight - h) // 2
    WinMove title, , newX, newY
}
CenterWindow("计算器")
```

### WinMinimize / WinMaximize / WinRestore

```ahk
; 最小化
WinMinimize "计算器"

; 最大化
WinMaximize "计算器"

; 还原
WinRestore "计算器"

; 切换最大化/还原
WinMaximize "A"   ; 如果已最大化则还原，否则最大化
```

### WinSetStyle / WinSetAlwaysOnTop / WinSetTransparent

```ahk
; 置顶/取消置顶
WinSetAlwaysOnTop 1, "计算器"    ; 置顶
WinSetAlwaysOnTop -1, "计算器"   ; 切换置顶
WinSetAlwaysOnTop 0, "计算器"    ; 取消置顶

; 透明度（0=完全透明，255=完全不透明）
WinSetTransparent 200, "计算器"  ; 半透明
WinSetTransparent 0, "计算器"    ; 完全透明（但仍然可见和可交互）
WinSetTransparent "Off", "计算器" ; 关闭透明效果

; 隐藏/显示窗口
WinHide "计算器"
WinShow "计算器"

; 禁用/启用窗口（不能/可以交互）
WinSetEnabled 0, "计算器"  ; 禁用
WinSetEnabled 1, "计算器"  ; 启用

; 修改窗口样式
WinSetStyle "-0xC00000", "计算器"  ; 移除标题栏
WinSetStyle "+0xC00000", "计算器"  ; 添加标题栏
```

## 等待窗口示例

### 等待并操作

```ahk
; 打开计算器，等待出现后操作
Run "calc.exe"
WinWait "计算器", , 5
if WinExist("计算器") {
    WinActivate "计算器"
    WinMove "计算器", , 100, 100
}
```

### 等待对话框

```ahk
; 等待保存对话框
WinWait "另存为", , 10
if WinExist("另存为") {
    ControlSetText "Edit1", "C:\MyFolder\file.txt", "另存为"
    ControlClick "Button2", "另存为"   ; 点击保存
}
```

## 窗口组操作

```ahk
; GroupAdd — 将窗口加入组，方便批量操作
GroupAdd "Browsers", "ahk_exe chrome.exe"
GroupAdd "Browsers", "ahk_exe firefox.exe"
GroupAdd "Browsers", "ahk_exe msedge.exe"

; 关闭组中所有窗口
WinClose "ahk_group Browsers"

; 激活组中下一个窗口（循环切换）
WinActivate "ahk_group Browsers"
```

## 实用窗口脚本

### 快速窗口切换

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+` 切换到上一个活动窗口
^`:: {
    WinActivate "ahk_id " A_PriorWindowId
}

; Alt+1~5 切换到指定窗口
!1:: WinActivate "Chrome"
!2:: WinActivate "VSCode"
!3:: WinActivate "计算器"
```

### 窗口信息显示

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

^!w:: {    ; Ctrl+Alt+W 显示当前窗口信息
    title := WinGetTitle("A")
    cls := WinGetClass("A")
    proc := WinGetProcessName("A")
    WinGetPos &x, &y, &w, &h, "A"
    MsgBox "标题: " title
        . "`n类名: " cls
        . "`n进程: " proc
        . "`n位置: (" x "," y ")"
        . "`n大小: " w "x" h
}
```

### 批量窗口管理

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+Alt+M 最小化所有Chrome窗口
^!m:: {
    ids := WinGetList("ahk_exe chrome.exe")
    for i, id in ids
        WinMinimize "ahk_id " id
}

; Ctrl+Alt+C 关闭所有Chrome窗口
^!c:: {
    ids := WinGetList("ahk_exe chrome.exe")
    for i, id in ids
        WinClose "ahk_id " id
}
```

---

**下一步**: [13-控件操作](13-controls.md)
