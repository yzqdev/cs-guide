---
order: 15
---

# 15 - 剪贴板操作

## A_Clipboard 变量

AHK v2 使用 `A_Clipboard` 内置变量读写剪贴板：

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 读取剪贴板内容
text := A_Clipboard
MsgBox "剪贴板内容: " text

; 写入剪贴板
A_Clipboard := "Hello from AHK!"

; 清空剪贴板
A_Clipboard := ""
```

## 等待剪贴板变化

剪贴板操作可能需要等待系统完成：

```ahk
; ClipWait — 等剪贴板出现内容
A_Clipboard := ""
Send "^c"              ; Ctrl+C 复制
ClipWait 2             ; 等最多2秒
MsgBox "复制的内容: " A_Clipboard

; ClipWait(秒, 等待任意内容)
; 第二个参数为true时，等待任意类型（包括文件等）
A_Clipboard := ""
Send "^c"
ClipWait 2, true       ; 等文件或文本
```

## 剪贴板实用操作

### 复制并处理

```ahk
; 复制选中文本并处理
^!u:: {    ; Ctrl+Alt+U 将选中文字转为大写
    A_Clipboard := ""
    Send "^c"           ; 复制
    ClipWait 2
    A_Clipboard := StrUpper(A_Clipboard)
    Send "^v"           ; 粘贴结果
}
```

### 快速粘贴模板文字

```ahk
; Ctrl+Alt+E 粘贴邮箱
^!e:: {
    A_Clipboard := "myemail@example.com"
    Send "^v"
}

; Ctrl+Alt+D 粘贴当前日期
^!d:: {
    A_Clipboard := A_YYYY "-" A_MM "-" A_DD
    Send "^v"
}

; Ctrl+Alt+T 粘贴当前时间
^!t:: {
    A_Clipboard := A_Hour ":" A_Min ":" A_Sec
    Send "^v"
}
```

### 保存和恢复剪贴板

```ahk
; 保存当前剪贴板内容，使用后恢复
savedClip := ""

PasteAndRestore(text) {
    global savedClip
    savedClip := A_Clipboard          ; 保存
    A_Clipboard := text               ; 设置新内容
    Send "^v"                          ; 粘贴
    Sleep 100
    A_Clipboard := savedClip           ; 恢复
}

^j:: PasteAndRestore("插入的文字")
```

### 多行剪贴板处理

```ahk
; 将剪贴板中的多行文字逐行处理
^!p:: {
    A_Clipboard := ""
    Send "^c"
    ClipWait 2
    lines := StrSplit(A_Clipboard, "`n")
    result := ""
    for i, line in lines {
        result .= ">" line "`n"    ; 每行前面加 >
    }
    A_Clipboard := result
    Send "^v"
}
```

## 剪贴板监控

使用 `OnClipboardChange` 回调函数监控剪贴板变化：

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 注册剪贴板变化回调
OnClipboardChange ClipChanged

ClipChanged(dataType) {
    ; dataType: 0=空, 1=文本, 2=非文本(如文件), 4=图像
    if (dataType = 1) {
        ToolTip "剪贴板更新: " SubStr(A_Clipboard, 1, 50)
        SetTimer () => ToolTip(), -3000
    } else if (dataType = 2) {
        ToolTip "剪贴板: 文件/非文本内容"
        SetTimer () => ToolTip(), -3000
    }
}
```

### dataType 值

| 值 | 说明 |
|-----|------|
| 0 | 剪贴板为空 |
| 1 | 文本内容 |
| 2 | 非文本内容（文件列表、自定义格式等） |
| 4 | 含有图像 |

### 剪贴板历史记录

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

clipHistory := []
maxHistory := 20

OnClipboardChange RecordClip

RecordClip(dataType) {
    global clipHistory
    if (dataType = 1 && A_Clipboard != "") {
        clipHistory.Push(A_Clipboard)
        if (clipHistory.Length > maxHistory)
            clipHistory.RemoveAt(1)    ; 移除最老的
    }
}

; Ctrl+Shift+V — 查看剪贴板历史
^+v:: {
    if (clipHistory.Length = 0) {
        MsgBox "剪贴板历史为空"
        return
    }
    items := ""
    for i, clip in clipHistory {
        items .= i ". " SubStr(clip, 1, 40) "`n"
    }
    result := MsgBox(items, "剪贴板历史", 4)
    ; 用户可以进一步选择粘贴哪条
}
```

## 剪贴板格式操作

```ahk
; 检查剪贴板是否包含特定格式
if DllCall("IsClipboardFormatAvailable", "UInt", 1)  ; CF_TEXT = 1
    MsgBox "剪贴板有文本格式"

; 获取剪贴板所有格式
formats := ClipboardFormats()
for i, fmt in formats {
    MsgBox "格式ID: " fmt
}

; ClipboardFormats 是 AHK v2 内置函数
```

## 剪贴板注意事项

### 延迟问题

```ahk
; 剪贴板操作后需要等待
A_Clipboard := "Hello"
ClipWait 1                ; 等待系统将内容放入剪贴板
Send "^v"

; 不等待可能导致粘贴的是旧内容
A_Clipboard := "New text"
; 如果不 ClipWait，^v 可能粘贴的还是之前的 "Hello"
```

### 特殊字符

```ahk
; 剪贴板中的换行符
A_Clipboard := "Line1`r`nLine2"  ; Windows 换行是 `r`n
; 但 A_Clipboard 读取时自动处理

; 检查换行格式
if InStr(A_Clipboard, "`r`n")
    MsgBox "Windows换行格式"
else if InStr(A_Clipboard, "`n")
    MsgBox "Unix换行格式"
```

### 大文件操作

```ahk
; 复制大文件时剪贴板可能很大
; 使用 Sleep 确保操作完成
Send "^c"
Sleep 500           ; 大内容可能需要更长时间
ClipWait 5           ; 等最多5秒
```

## 实用剪贴板脚本

### 文本转换工具集

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+Shift+U — 选中文本转大写
^+u:: {
    A_Clipboard := ""
    Send "^c"
    ClipWait 2
    A_Clipboard := StrUpper(A_Clipboard)
    Send "^v"
}

; Ctrl+Shift+L — 选中文本转小写
^+l:: {
    A_Clipboard := ""
    Send "^c"
    ClipWait 2
    A_Clipboard := StrLower(A_Clipboard)
    Send "^v"
}

; Ctrl+Shift+T — 选中文本首字母大写
^+t:: {
    A_Clipboard := ""
    Send "^c"
    ClipWait 2
    A_Clipboard := StrTitle(A_Clipboard)
    Send "^v"
}

; Ctrl+Shift+R — 选中文字去首尾空白
^+r:: {
    A_Clipboard := ""
    Send "^c"
    ClipWait 2
    A_Clipboard := Trim(A_Clipboard)
    Send "^v"
}
```

### 搜索选中文字

```ahk
; Ctrl+Shift+G — 用Google搜索选中文字
^+g:: {
    A_Clipboard := ""
    Send "^c"
    ClipWait 2
    query := A_Clipboard
    Run "https://www.google.com/search?q=" query
}
```

---

**下一步**: [16-文件操作](16-files.md)
