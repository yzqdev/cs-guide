---
order: 14
---

# 14 - Send 与键盘模拟

## Send 函数

`Send` 是 AHK 最基础的键盘模拟函数：

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 发送文字
Send "Hello World"

; 发送按键
Send "{Enter}"
Send "{Tab}"

; 发送组合键
Send "^a"         ; Ctrl+A
Send "^c"         ; Ctrl+C
Send "^v"         ; Ctrl+V
Send "^s"         ; Ctrl+S
Send "!{F4}"      ; Alt+F4
```

## 特殊键名

所有特殊键用 `{}` 包围：

### 常用特殊键

| 键名 | 按键 | 说明 |
|------|------|------|
| `{Enter}` / `{Return}` | 回车 | |
| `{Tab}` | Tab | |
| `{Space}` | 空格 | |
| `{Backspace}` / `{BS}` | 退格 | |
| `{Delete}` / `{Del}` | 删除 | |
| `{Insert}` / `{Ins}` | Insert | |
| `{Escape}` / `{Esc}` | Esc | |
| `{Home}` | Home | |
| `{End}` | End | |
| `{PgUp}` | Page Up | |
| `{PgDn}` | Page Down | |
| `{Up}` | 上箭头 | |
| `{Down}` | 下箭头 | |
| `{Left}` | 左箭头 | |
| `{Right}` | 右箭头 | |
| `{F1}` - `{F12}` | F1-F12 | |
| `{CapsLock}` | 大写锁定 | |

### 修饰键（按下/释放）

| 键名 | 说明 |
|------|------|
| `{Ctrl}` / `{Control}` | Ctrl |
| `{Alt}` | Alt |
| `{Shift}` | Shift |
| `{Win}` / `{LWin}` / `{RWin}` | Win键 |

### 其他

| 键名 | 说明 |
|------|------|
| `{PrintScreen}` | 截屏键 |
| `{ScrollLock}` | 滚动锁定 |
| `{NumLock}` | 数字锁定 |
| `{Pause}` / `{Break}` | Pause/Break |
| `{Sleep}` | Sleep键 |
| `{AppsKey}` | 右键菜单键 |
| `{Numpad0}` - `{Numpad9}` | 数字键盘 |
| `{NumpadDot}` | 数字键盘小数点 |
| `{NumpadEnter}` | 数字键盘回车 |
| `{NumpadAdd}` | 数字键盘加号 |
| `{NumpadSub}` | 数字键盘减号 |
| `{NumpadMult}` | 数字键盘乘号 |
| `{NumpadDiv}` | 数字键盘除号 |

### 按下与释放

```ahk
; 按下修饰键 → 发送按键 → 释放修饰键
Send "{Ctrl down}a{Ctrl up}"    ; 按住Ctrl → A → 释放Ctrl

; 持续按住
Send "{Shift down}"             ; 按住Shift
Send "abcdef"                   ; 输出 ABCDEF（Shift被按住）
Send "{Shift up}"               ; 释放Shift

; 按住后执行多个操作
Send "{Ctrl down}"
Send "a"                        ; Ctrl+A
Send "c"                        ; Ctrl+C
Send "{Ctrl up}"                 ; 释放Ctrl
```

### 重复按键

```ahk
; {键名 次数} — 重复发送
Send "{Tab 3}"           ; 发送3次Tab
Send "{Down 5}"          ; 发送5次下箭头
Send "{Delete 10}"       ; 发送10次Delete
```

## 发送模式

AHK 提供三种发送模式，各有特点：

### SendInput（默认，最推荐）

```ahk
; SendInput — 最快最可靠
SendInput "Hello World"
Send "Hello World"       ; 默认就是 SendInput

; 特点：
; - 速度极快（几乎瞬间完成）
; - 不会被其他程序拦截
; - 不会触发 AHK 热键（自动保护）
; - 大多数情况下的最佳选择
```

### SendPlay

```ahk
; SendPlay — 在某些游戏和远程桌面中有效
SendPlay "Hello"

; 特点：
; - 比 SendInput 慢
; - 在某些 SendInput 无效的场合可用
; - 适合游戏和远程桌面
; - 不会触发 AHK 热键
```

### SendText / SendEvent

```ahk
; SendText — 只发送纯文本，不解释特殊键名
SendText "{Enter}"       ; 发送字面文字 "{Enter}"，不是按回车！

; 特点：
; - 只发送文字，不解释 {} 键名
; - 适合发送包含特殊字符的文本
; - 不触发热键

; SendEvent — 逐键发送，速度慢
SendEvent "Hello"

; 特点：
; - 每个键独立发送，速度慢
; - 可以被其他程序拦截
; - 会触发 AHK 热键（需要 $ 前缀保护）
```

### 模式对比

| 模式 | 速度 | 稳定性 | 解释特殊键 | 触发AHK热键 | 适用场景 |
|------|------|--------|-----------|-------------|----------|
| SendInput | 极快 | 高 | 是 | 否 | 大多数场景 |
| SendPlay | 中 | 中 | 是 | 否 | 游戏/远程桌面 |
| SendText | 快 | 高 | 否 | 否 | 纯文本 |
| SendEvent | 慢 | 低 | 是 | 是 | 需要逐键发送 |

## SetKeyDelay

控制发送按键之间的延迟：

```ahk
; SetKeyDelay(延迟毫秒, 按下持续时间毫秒)
SetKeyDelay 50          ; 每键间隔50ms
SetKeyDelay 10, 10      ; 间隔10ms，按下10ms

; 对 SendEvent 和 ControlSend 有效
; SendInput 不受 SetKeyDelay 影响

; 游戏中可能需要增加延迟
SetKeyDelay 50, 50
SendEvent "w w w w"     ; 每个按键间隔50ms

; 快速操作时减少延迟
SetKeyDelay 0, 0
```

## 实用 Send 模式

### 快速输入文字

```ahk
^j:: SendInput "Hello World, this is AutoHotkey v2!"
```

### 发送多行文本

```ahk
^m:: {
    SendInput "第一行{Enter}第二行{Enter}第三行"
}

; 或用多行字符串
^l:: {
    text := "Line 1`nLine 2`nLine 3"
    for line in StrSplit(text, "`n") {
        SendInput line
        SendInput "{Enter}"
    }
}
```

### 复制粘贴操作

```ahk
; Ctrl+A → Ctrl+C → 在别处 Ctrl+V
^!c:: {
    SendInput "^a"      ; 全选
    Sleep 100
    SendInput "^c"      ; 复制
    Sleep 100
    WinActivate "目标窗口"
    SendInput "^v"      ; 粘贴
}
```

### 游戏中的按键发送

```ahk
; 游戏中可能需要 SendPlay 或 SendEvent
; 且需要增加延迟

SetKeyDelay 50, 50

; 按住W键5秒（前进）
#HotIf WinActive("ahk_exe game.exe")
^w:: {
    SendEvent "{w down}"
    Sleep 5000
    SendEvent "{w up}"
}
#HotIf
```

## SendLevel 与 SendWait

```ahk
; SendLevel — 控制发送级别，防止热键递归触发
; 默认级别0，Send发送的键不会触发级别>=1的热键

SetSendLevel 1          ; 设置发送级别为1

; SendWait — 发送并等待所有键被处理
SendWait "^a^c"         ; 发送Ctrl+A和Ctrl+C，等待完成
```

## 文字发送的最佳实践

```ahk
; 1. 优先使用 SendInput（默认）
Send "Hello"             ; 即 SendInput

; 2. 如果发送大量文字，用 A_Clipboard 更稳定
^j:: {
    A_Clipboard := "这是一段很长的文字..."
    Send "^v"            ; 粘贴，比逐字Send快且稳定
}

; 3. 后台窗口用 ControlSend
ControlSend "Hello", "Edit1", "记事本"

; 4. 避免在热键中直接Send可能触发其他热键的内容
; 使用 $ 前缀保护
$^c:: Send "^c{Enter}"  ; $防止Send的^c再次触发此热键

; 5. 纯文本用 SendText
SendText "{Hello}"       ; 发送字面文字，不解释{}
```

---

**下一步**: [15-剪贴板操作](15-clipboard.md)
