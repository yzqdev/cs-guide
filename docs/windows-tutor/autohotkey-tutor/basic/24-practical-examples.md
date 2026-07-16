---
order: 24
---

# 24 - 实用脚本实例

## 1. 窗口快速切换器

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Alt+1~5 快速切换到指定窗口
!1:: ActivateWindow("ahk_exe chrome.exe", "Chrome")
!2:: ActivateWindow("ahk_exe code.exe", "VSCode")
!3:: ActivateWindow("ahk_exe notepad.exe", "记事本")
!4:: ActivateWindow("ahk_exe explorer.exe", "资源管理器")
!5:: ActivateWindow("ahk_exe Telegram.exe", "Telegram")

ActivateWindow(identifier, name) {
    if WinExist(identifier) {
        WinActivate identifier
    } else {
        MsgBox name " 未运行"
    }
}

; Alt+0 切换到上一个活动窗口
!0:: WinActivate "ahk_id " A_PriorWindowId
```

## 2. 文本转换工具集

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+Shift+U — 选中文字转大写
^+u:: TransformSelection(StrUpper)

; Ctrl+Shift+L — 选中文字转小写
^+l:: TransformSelection(StrLower)

; Ctrl+Shift+T — 选中文字首字母大写
^+t:: TransformSelection(StrTitle)

; Ctrl+Shift+R — 选中文字去除多余空白
^+r:: TransformSelection(Trim)

TransformSelection(func) {
    saved := A_Clipboard
    A_Clipboard := ""
    Send "^c"
    ClipWait 2
    A_Clipboard := func(A_Clipboard)
    Send "^v"
    Sleep 100
    A_Clipboard := saved
}
```

## 3. 快速搜索选中文字

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+Shift+G — Google搜索选中文字
^+g:: SearchSelected("https://www.google.com/search?q=")

; Ctrl+Shift+B — 百度搜索选中文字
^+b:: SearchSelected("https://www.baidu.com/s?wd=")

; Ctrl+Shift+D — 在文档中搜索
^+d:: SearchSelected("https://devdocs.io/#q=")

SearchSelected(baseUrl) {
    saved := A_Clipboard
    A_Clipboard := ""
    Send "^c"
    ClipWait 2
    if (A_Clipboard != "") {
        Run baseUrl A_Clipboard
    }
    A_Clipboard := saved
}
```

## 4. 自动重复按键

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 按住 F1 自动重复按键
*$1:: AutoRepeat("1")
*$2:: AutoRepeat("2")
*$3:: AutoRepeat("3")
*$4:: AutoRepeat("4")
*$5:: AutoRepeat("5")

AutoRepeat(key) {
    Loop {
        Send key
        KeyWait key, "U T0.1"    ; 等按键释放（最多0.1秒）
        if !GetKeyState(key, "P")
            break                 ; 按键已释放，退出循环
    }
}
```

## 5. 窗口布局管理

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+Alt+Left — 窗口移到左半屏
^!Left:: MoveWindow("Left")

; Ctrl+Alt+Right — 窗口移到右半屏
^!Right:: MoveWindow("Right")

; Ctrl+Alt+Up — 窗口最大化
^!Up:: WinMaximize "A"

; Ctrl+Alt+Down — 窗口还原
^!Down:: WinRestore "A"

; Ctrl+Alt+1 — 窗口移到左上四分之一
^!1:: MoveWindow("TopLeft")

; Ctrl+Alt+2 — 窗口移到右上四分之一
^!2:: MoveWindow("TopRight")

; Ctrl+Alt+3 — 窗口移到左下四分之一
^!3:: MoveWindow("BottomLeft")

; Ctrl+Alt+4 — 窗口移到右下四分之一
^!4:: MoveWindow("BottomRight")

MoveWindow(position) {
    WinGetPos &x, &y, &w, &h, "A"
    sw := A_ScreenWidth
    sh := A_ScreenHeight
    halfW := sw // 2
    halfH := sh // 2

    switch position {
        case "Left":
            WinMove "A", , 0, 0, halfW, sh
        case "Right":
            WinMove "A", , halfW, 0, halfW, sh
        case "TopLeft":
            WinMove "A", , 0, 0, halfW, halfH
        case "TopRight":
            WinMove "A", , halfW, 0, halfW, halfH
        case "BottomLeft":
            WinMove "A", , 0, halfH, halfW, halfH
        case "BottomRight":
            WinMove "A", , halfW, halfH, halfW, halfH
    }
}
```

## 6. 快速输入模板

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+Alt+E — 稍后插入邮箱
^!e:: QuickPaste("myemail@example.com")

; Ctrl+Alt+S — 稍后插入签名
^!s:: QuickPaste("Best regards,`nJohn Doe")

; Ctrl+Alt+D — 稍后插入日期
^!d:: QuickPaste(A_YYYY "-" A_MM "-" A_DD)

; Ctrl+Alt+T — 稍后插入时间
^!t:: QuickPaste(A_Hour ":" A_Min)

QuickPaste(text) {
    saved := A_Clipboard
    A_Clipboard := text
    ClipWait 1
    Send "^v"
    Sleep 100
    A_Clipboard := saved
}
```

## 7. 鼠标抖动防空闲

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+Alt+I — 启用/禁用防空闲
^!i:: {
    global antiIdle := !antiIdle
    if antiIdle {
        SetTimer AntiIdle, 240000    ; 每4分钟
        ToolTip "防空闲已启用"
    } else {
        SetTimer AntiIdle, 0
        ToolTip "防空闲已禁用"
    }
    SetTimer () => ToolTip(), -2000
}

AntiIdle() {
    MouseMove 1, 0, 0, "R"
    Sleep 50
    MouseMove -1, 0, 0, "R"
}
```

## 8. 批量文件重命名

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+Alt+R — 批量重命名当前目录下 .txt 文件
^!r:: {
    folder := FileSelectFolder("", "选择文件夹")
    if (folder = "")
        return

    prefix := InputBox("输入新文件前缀", "批量重命名")
    if (prefix = "")
        return

    count := 0
    Loop Files folder "\*.txt" {
        newName := prefix "_" count + 1 ".txt"
        FileMove A_LoopFileFullPath, folder "\" newName
        count++
    }
    MsgBox "重命名了 " count " 个文件"
}
```

## 9. 剪贴板历史管理器

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

global clipHistory := []
global maxHistory := 10

OnClipboardChange RecordClip

RecordClip(dataType) {
    global clipHistory
    if (dataType = 1 && A_Clipboard != "") {
        ; 不重复记录相同内容
        if (clipHistory.Length > 0 && clipHistory[clipHistory.Length] = A_Clipboard)
            return
        clipHistory.Push(A_Clipboard)
        if (clipHistory.Length > maxHistory)
            clipHistory.RemoveAt(1)
    }
}

; Win+V — 显示剪贴板历史
#v:: {
    if (clipHistory.Length = 0) {
        MsgBox "剪贴板历史为空"
        return
    }

    list := ""
    for i, clip in clipHistory {
        preview := StrLen(clip) > 60 ? SubStr(clip, 1, 60) . "..." : clip
        list .= i ". " preview "`n"
    }

    result := InputBox(list, "剪贴板历史 — 输入序号粘贴", , 1)
    if (result != "" && IsInteger(result)) {
        idx := Integer(result)
        if (idx >= 1 && idx <= clipHistory.Length) {
            A_Clipboard := clipHistory[idx]
            Send "^v"
        }
    }
}
```

## 10. 简单计时器/番茄钟

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

global pomodoroActive := false
global pomodoroCount := 0

; Ctrl+Alt+P — 开始25分钟番茄钟
^!p:: {
    if pomodoroActive {
        MsgBox "番茄钟正在进行中"
        return
    }
    pomodoroActive := true
    SetTimer PomodoroEnd, -1500000    ; 25分钟 = 1500000毫秒
    ToolTip "番茄钟开始 (25分钟)"
    SetTimer () => ToolTip(), -5000
}

PomodoroEnd() {
    global pomodoroActive, pomodoroCount
    pomodoroActive := false
    pomodoroCount++
    MsgBox "番茄钟结束！已完成 " pomodoroCount " 个`n休息5分钟", "番茄钟", 64
}

; Ctrl+Alt+S — 查看番茄钟状态
^!s:: {
    MsgBox "番茄钟: " (pomodoroActive ? "进行中" : "未开始")
        . "`n已完成: " pomodoroCount " 个"
}
```

## 11. 自动填写表单

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+Alt+F — 自动填写登录表单
^!f:: AutoFillForm("MyUsername", "MyPassword")

AutoFillForm(user, pass) {
    saved := A_Clipboard

    ; 复制用户名
    A_Clipboard := user
    ClipWait 1
    Send "^v"
    Send "{Tab}"

    Sleep 100

    ; 复制密码
    A_Clipboard := pass
    ClipWait 1
    Send "^v"
    Send "{Enter}"

    A_Clipboard := saved
}
```

## 12. 系统信息快捷查看

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+Alt+I — 显示系统信息
^!i:: {
    info := "系统信息`n"
        . "================`n"
        . "计算机名: " A_ComputerName "`n"
        . "用户名: " A_UserName "`n"
        . "操作系统: " A_OsVersion "`n"
        . "64位系统: " (A_Is64bitOS ? "是" : "否") "`n"
        . "屏幕: " A_ScreenWidth " x " A_ScreenHeight "`n"
        . "管理员: " (A_IsAdmin ? "是" : "否") "`n"
        . "AHK版本: " A_AhkVersion "`n"
        . "脚本路径: " A_ScriptFullPath "`n"
        . "工作时间: " A_WorkingDir "`n"
        . "当前时间: " A_Now

    MsgBox info, "系统信息", 64
}
```

---

**下一步**: [25-AHK v1与v2差异](25-v1-vs-v2.md)
