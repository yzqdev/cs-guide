---
order: 18
---

# 18 - 定时器与回调

## SetTimer

SetTimer 是 AHK 的定时执行机制，每隔一段时间自动调用一个函数：

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; SetTimer(函数, 间隔毫秒)
; 间隔 > 0: 重复执行
; 间隔 < 0: 只执行一次（单次定时器）

; 每1秒执行一次
SetTimer MyTimer, 1000

MyTimer() {
    ToolTip A_Hour ":" A_Min ":" A_Sec
}

; 5秒后执行一次（单次）
SetTimer OneShot, -5000

OneShot() {
    MsgBox "5秒到了！"
}

; 立即执行一次（间隔0）
SetTimer Immediate, 0

Immediate() {
    MsgBox "立即执行"
}
```

## 定时器管理

### 关闭定时器

```ahk
; 关闭定时器
SetTimer MyTimer, 0       ; 0 = 关闭

; 或者用函数引用
SetTimer MyTimer, "Off"
```

### 修改定时器间隔

```ahk
; 改变间隔
SetTimer MyTimer, 500     ; 改为500毫秒

; 切换定时器开关
SetTimer MyTimer, "Toggle"   ; 开→关 或 关→开
```

### 检查定时器状态

```ahk
; 定时器是否启用
MsgBox A_TickCount   ; 获取脚本启动后的毫秒数
```

## 定时器与热键配合

### 热键控制定时器

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

global timerActive := false

; Ctrl+T 启动/停止定时器
^t:: {
    timerActive := !timerActive
    if timerActive {
        SetTimer CheckWindow, 1000
        ToolTip "定时器已启动"
    } else {
        SetTimer CheckWindow, 0
        ToolTip "定时器已停止"
    }
    SetTimer () => ToolTip(), -2000
}

CheckWindow() {
    title := WinGetTitle("A")
    ToolTip "当前窗口: " title
}
```

### 定时器自毁

```ahk
; 3秒后显示消息并自动关闭定时器
SetTimer SelfDestruct, 3000

SelfDestruct() {
    MsgBox "定时器执行完毕"
    SetTimer SelfDestruct, 0    ; 关闭自己
}
```

## 回调函数

回调函数是作为参数传递给其他函数、在特定时机被调用的函数：

### OnClipboardChange

```ahk
; 剪贴板变化回调
OnClipboardChange ClipHandler

ClipHandler(dataType) {
    ToolTip "剪贴板变化，类型: " dataType
    SetTimer () => ToolTip(), -3000
}
```

### OnExit

```ahk
; 脚本退出回调
OnExit ExitHandler

ExitHandler(exitReason) {
    ; exitReason: "Logoff", "Shutdown", "Close", "Error", "Single", "Reload"
    if (exitReason != "Reload" && exitReason != "Single") {
        MsgBox "脚本即将退出，原因: " exitReason
    }
    return false   ; false=允许退出，true=阻止退出
}
```

### OnMessage

```ahk
; 监听 Windows 消息
OnMessage 0x100, KeyHandler    ; WM_KEYDOWN = 0x100

KeyHandler(wParam, lParam, msg, hwnd) {
    ToolTip "按键消息: " wParam
    SetTimer () => ToolTip(), -1000
    return 0
}
```

## 定时器高级模式

### 动态间隔定时器

```ahk
; 根据条件改变定时器间隔
SetTimer AdaptiveTimer, 1000

AdaptiveTimer() {
    title := WinGetTitle("A")
    if InStr(title, "Chrome") {
        SetTimer AdaptiveTimer, 200   ; Chrome窗口时更频繁
    } else {
        SetTimer AdaptiveTimer, 1000  ; 其他窗口时正常频率
    }
    ToolTip title
}
```

### 定时器队列

```ahk
; 多个定时器同时运行
SetTimer Timer1, 1000
SetTimer Timer2, 2000
SetTimer Timer3, 5000

Timer1() {
    ToolTip "Timer1: " A_Sec
}

Timer2() {
    ToolTip "Timer2: " A_Min
}

Timer3() {
    MsgBox "Timer5秒触发"
}
```

### 精确计时

```ahk
; A_TickCount — 系统启动后的毫秒数，用于精确计时
startTime := A_TickCount

Sleep 1500

elapsed := A_TickCount - startTime
MsgBox "经过 " elapsed " 毫秒"   ; 约1500

; 测量函数执行时间
MeasureTime() {
    start := A_TickCount
    ; ... 执行一些操作 ...
    Loop 1000 {
        x := Random(1, 1000)
    }
    elapsed := A_TickCount - start
    MsgBox "耗时 " elapsed " 毫秒"
}
```

## 定时器注意事项

### 定时器精度

```ahk
; 定时器精度大约是 10-15ms（受系统时钟精度影响）
; 不能依赖定时器做精确计时

; 如果需要精确等待，用 Sleep
Sleep 100   ; 精确等待100ms

; 定时器间隔最短约 15ms
SetTimer FastTimer, 15    ; 接近最短间隔
```

### 定时器与阻塞操作

```ahk
; 定时器回调中不要有长时间阻塞操作
; 如 MsgBox、InputBox 等（它们会暂停脚本）

BadTimer() {
    MsgBox "这会阻塞其他定时器！"   ; 不推荐
}

GoodTimer() {
    ToolTip "不阻塞"                ; 推荐
    SetTimer () => ToolTip(), -2000
}
```

### 定时器优先级

```ahk
; 设置定时器优先级（数值越小优先级越高）
SetTimer HighPriority, 1000, -1    ; 优先级-1（高）
SetTimer LowPriority, 1000, 10     ; 优先级10（低）
```

## 实用定时器脚本

### 自动保存提醒

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 每5分钟提醒保存
SetTimer SaveReminder, 300000

SaveReminder() {
    if WinActive("ahk_exe notepad.exe") {
        ToolTip "别忘了保存文件！Ctrl+S"
        SetTimer () => ToolTip(), -5000
    }
}
```

### 窗口切换提示

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

global lastWindow := ""

SetTimer WindowWatcher, 500

WindowWatcher() {
    current := WinGetTitle("A")
    if (current != lastWindow && current != "") {
        ToolTip "切换到: " current
        SetTimer () => ToolTip(), -3000
        lastWindow := current
    }
}
```

### 防空闲自动操作

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 每4分钟移动鼠标，防止系统判定为空闲
SetTimer AntiIdle, 240000

AntiIdle() {
    MouseMove 1, 0, 0, "R"    ; 向右移动1像素
    Sleep 100
    MouseMove -1, 0, 0, "R"  ; 向左移回
}
```

---

**下一步**: [19-GUI图形界面](19-gui.md)
