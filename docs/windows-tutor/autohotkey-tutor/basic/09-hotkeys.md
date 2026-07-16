---
order: 9
---

# 09 - 键盘热键

## 热键基础

热键是 AutoHotkey 最核心的功能。按下指定按键组合，触发一段代码：

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 格式: 修饰符+键名:: 代码块

; Ctrl+J — 输出文字
^j:: {
    Send "Hello from AHK!"
}

; Alt+F1 — 弹出消息
!F1:: MsgBox "Alt+F1 被按下"

; Win+Q — 退出脚本
#q:: ExitApp

; Esc — 退出脚本
Esc:: ExitApp
```

## 修饰符符号

| 符号 | 修饰键 | 英文名 |
|------|--------|--------|
| `^` | Ctrl | Control |
| `!` | Alt | Alt |
| `#` | Win | Windows |
| `+` | Shift | Shift |
| `<` | 左侧修饰键 | Left |
| `>` | 右侧修饰键 | Right |

```ahk
; 组合多个修饰键
^!s:: MsgBox "Ctrl+Alt+S"    ; Ctrl+Alt+S
^+c:: MsgBox "Ctrl+Shift+C"  ; Ctrl+Shift+C
^!#f:: MsgBox "Ctrl+Alt+Win+F" ; Ctrl+Alt+Win+F

; 指定左右修饰键
<^a:: MsgBox "左Ctrl+A"      ; 只有左Ctrl+A才触发
>!a:: MsgBox "右Alt+A"       ; 只有右Alt+A才触发
```

## 键名表

### 特殊键

| 键名 | 按键 |
|------|------|
| `F1` - `F12` | F1 到 F12 |
| `Enter` / `Return` | 回车 |
| `Esc` / `Escape` | Esc |
| `Tab` | Tab |
| `Space` | 空格 |
| `Backspace` / `BS` | 退格 |
| `Delete` / `Del` | Delete |
| `Insert` / `Ins` | Insert |
| `Home` | Home |
| `End` | End |
| `PgUp` / `PageUp` | Page Up |
| `PgDn` / `PageDown` | Page Down |
| `Up` | 上箭头 |
| `Down` | 下箭头 |
| `Left` | 左箭头 |
| `Right` | 右箭头 |
| `CapsLock` | 大写锁定 |
| `ScrollLock` | 滚动锁定 |
| `NumLock` | 数字锁定 |

### 数字键盘键

| 键名 | 按键 |
|------|------|
| `Numpad0` - `Numpad9` | 数字键盘 0-9 |
| `NumpadDot` | 数字键盘小数点 |
| `NumpadEnter` | 数字键盘回车 |
| `NumpadAdd` | 数字键盘加号 |
| `NumpadSub` | 数字键盘减号 |
| `NumpadMult` | 数字键盘乘号 |
| `NumpadDiv` | 数字键盘除号 |

### 鼠标键（也可用作热键）

| 键名 | 说明 |
|------|------|
| `LButton` | 鼠标左键 |
| `RButton` | 鼠标右键 |
| `MButton` | 鼠标中键 |

## 多键组合（序列热键）

```ahk
; 按键序列 — 不是同时按，而是依次按
; q 然后按 b 然后按 p 触发
q & b & p:: MsgBox "依次按了 Q → B → P"

; 更常用的方式：自定义组合键
; Numpad0 + Numpad1 同时按下触发
Numpad0 & Numpad1:: MsgBox "0和1同时按"

; 单独按 Numpad0 不再发送原始按键（被热键覆盖了）
; 如果想保留原始功能：
Numpad0:: Send "{Numpad0}"  ; 恢复原始行为
```

## 上下文热键

热键只在特定窗口生效：

```ahk
; #HotIf 指令 — 后续热键只在条件满足时生效
#HotIf WinActive("计算器")
^c:: MsgBox "在计算器中按了 Ctrl+C"     ; 只在计算器窗口生效
^v:: MsgBox "在计算器中按了 Ctrl+V"

#HotIf WinActive("ahk_exe notepad.exe")
^s:: MsgBox "在记事本中按了 Ctrl+S"     ; 只在记事本生效

#HotIf                                     ; 恢复为全局热键
^j:: MsgBox "任何窗口都生效"
```

### 常用上下文条件

```ahk
; 按窗口标题匹配
#HotIf WinActive("计算器")

; 按进程名匹配
#HotIf WinActive("ahk_exe chrome.exe")

; 按窗口类名匹配
#HotIf WinActive("ahk_class Notepad")

; 自定义条件函数
#HotIf IsInEditor()

IsInEditor() {
    return WinActive("ahk_exe code.exe") || WinActive("ahk_exe notepad.exe")
}

#HotIf IsInEditor()
^d:: Send "delete"    ; 只在编辑器中生效

#HotIf
```

## 禁用和启用热键

```ahk
; 禁用热键 — 按键不再有原始功能（也不触发任何代码）
^c:: MsgBox "Ctrl+C 被拦截"  ; Ctrl+C 不再复制

; 让热键什么都不做（完全屏蔽按键）
XButton1:: return    ; 鼠标X1键被屏蔽

; 启用/禁用热键动态切换
global hotkeysEnabled := true

^j:: {
    if hotkeysEnabled
        Send "Hello"
}

; 切换函数
ToggleHotkeys() {
    global hotkeysEnabled
    hotkeysEnabled := !hotkeysEnabled
    if hotkeysEnabled {
        Hotkey "^j", On    ; 启用
        ToolTip "热键已启用"
    } else {
        Hotkey "^j", Off   ; 禁用
        ToolTip "热键已禁用"
    }
    SetTimer () => ToolTip(), -2000
}

^t:: ToggleHotkeys()
```

### Hotkey 函数

```ahk
; Hotkey 命令 — 动态创建/管理热键
Hotkey "^!s", MyFunction        ; 动态创建 Ctrl+Alt+S 热键
Hotkey "^!s", "Off"             ; 禁用
Hotkey "^!s", "On"              ; 启用
Hotkey "^!s", "AltTab"          ; 改为系统功能

MyFunction() {
    MsgBox "动态热键触发"
}
```

## 热键选项

```ahk
; $ 前缀 — 防止 Send 触发热键（只响应物理按键）
$^c:: Send "^c"   ; Send 发出的 Ctrl+C 不会再次触发此热键

; ~ 前缀 — 不屏蔽按键原始功能
~^s:: MsgBox "Ctrl+S 被按下（仍执行保存）"   ; Ctrl+S 原始功能保留

; * 前缀 — 任意附加修饰键都可触发
*c:: MsgBox "C被按"    ; 单按C、Ctrl+C、Alt+C等都能触发

; 组合使用
~$^c:: Send "^c"  ; 不屏蔽 + 不被 Send 触发
```

| 前缀 | 作用 |
|------|------|
| `$` | 只响应物理按键，Send 发出的不触发 |
| `~` | 不屏蔽原始按键功能 |
| `*` | 附加修饰键不影响触发 |

## 热键的 Pass-through

```ahk
; 默认：热键会"吃掉"按键，系统收不到
^c:: MsgBox "拦截Ctrl+C"  ; Ctrl+C不再复制

; ~ 前缀：按键传给系统，同时触发热键
~^c:: MsgBox "Ctrl+C触发，但仍会复制"  ; 复制仍然生效

; 如果热键内用了 Send，可能需要 $ 防止递归
$^c:: {
    Send "^c"   ; 发送Ctrl+C
    MsgBox "自定义Ctrl+C"   ; Send的^c不会再触发此热键（$保护）
}
```

## 长按热键（持续触发）

```ahk
; 默认行为：按住时反复触发（受 #HotkeyInterval 控制）
a:: Send "x"   ; 持续按a会反复发送x

; 阻止反复触发
a:: {
    KeyWait "a"           ; 等待按键释放
    Send "x"              ; 只触发一次
}
```

## 按键释放热键

```ahk
; 按下触发 + 释放触发
^a:: {
    ToolTip "Ctrl+A 按下"
    KeyWait "a"            ; 等待释放
    ToolTip "Ctrl+A 释放"
    SetTimer () => ToolTip(), -1000
}
```

## 热键调试技巧

```ahk
; 列出所有热键
ListHotkeys() {
    for i, hk in A_HotkeyList
        MsgBox hk
}

; 查看按键状态
MsgBox GetKeyState("Ctrl")       ; 1=按下, 0=未按
MsgBox GetKeyState("CapsLock", "T")  ; T=切换状态 On/Off
MsgBox GetKeyState("a", "P")     ; P=物理状态（不被Send影响）
```

---

**下一步**: [10-鼠标热键与操作](10-mouse.md)
