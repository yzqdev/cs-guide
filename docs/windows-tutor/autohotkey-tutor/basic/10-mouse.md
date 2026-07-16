---
order: 10
---

# 10 - 鼠标热键与操作

## 鼠标热键

### 基本鼠标热键

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 鼠标左键
LButton:: MsgBox "左键"

; 鼠标右键
RButton:: MsgBox "右键"

; 鼠标中键
MButton:: MsgBox "中键"

; 鼠标额外键（X1/X2）
XButton1:: MsgBox "X1键"
XButton2:: MsgBox "X2键"

; 滚轮
WheelUp:: MsgBox "向上滚"
WheelDown:: MsgBox "向下滚"
WheelLeft:: MsgBox "左滚"
WheelRight:: MsgBox "右滚"
```

### 组合鼠标热键

```ahk
; Ctrl + 鼠标左键
^LButton:: MsgBox "Ctrl+左键"

; Shift + 鼠标右键
+RButton:: MsgBox "Shift+右键"

; Alt + 滚轮
!WheelUp:: MsgBox "Alt+上滚"

; Win + 中键
#MButton:: MsgBox "Win+中键"

; 自定义组合：鼠标键 & 键盘键
RButton & a:: MsgBox "右键+A同时按"
```

> 注意：当 `RButton` 被用于组合键时，单独按右键不再弹出菜单。需要恢复功能：`~RButton:: return` 或 `RButton:: Send "{RButton}"`。

### ~ 前缀保留原始功能

```ahk
; 不屏蔽鼠标原始功能
~WheelUp:: ToolTip "向上滚（原始滚动仍生效)"
SetTimer () => ToolTip(), -2000

~LButton:: ToolTip "左键点击（原始点击仍生效)"
SetTimer () => ToolTip(), -2000
```

## Click 函数

### 基本点击

```ahk
; Click "x, y" — 在指定坐标点击
Click 100, 200           ; 在 (100,200) 左键单击
Click 500, 300, 2        ; 在 (500,300) 双击
Click 100, 200, 0        ; 在 (100,200) 移动但不点击

; Click "Relative" — 相对当前位置偏移
Click 10, -5, 0, "Rel"   ; 右移10，上移5，只移动不点击

; 相对活动窗口
Click 50, 50             ; 如果CoordMode设为Window，则相对窗口
```

### 点击模式

```ahk
; 左键单击（默认）
Click 100, 200

; 右键点击
Click 100, 200, "R"

; 中键点击
Click 100, 200, "M"

; 双击
Click 100, 200, 2        ; 左键双击

; 按下和释放分开
Click 100, 200, "D"      ; 在(100,200)按下左键
Sleep 100
Click 100, 200, "U"      ; 在(100,200)释放左键

; 拖拽：按下 → 移动 → 释放
Click 100, 200, "D"      ; 按下
Click 300, 400, 0        ; 移动（0表示不点击）
Click 300, 400, "U"      ; 释放
```

### Click 参数汇总

| 参数 | 说明 |
|------|------|
| `x, y` | 坐标位置 |
| `2` | 双击 |
| `0` | 只移动不点击 |
| `"R"` | 右键 |
| `"M"` | 中键 |
| `"D"` | 按下（Down） |
| `"U"` | 释放（Up） |
| `"Rel"` | 相对当前位置偏移 |

## MouseMove

```ahk
; 移动鼠标到指定位置
MouseMove 100, 200         ; 移动到 (100, 200)

; 相对移动
MouseMove 10, 20, 0, "R"   ; 右移10，下移20（"R" = 相对模式）

; 指定移动速度（0=瞬间，1=最慢，100=最快）
MouseMove 500, 300, 50     ; 以速度50移动到(500,300)
```

## MouseGetPos

```ahk
; 获取鼠标当前位置和窗口信息
MouseGetPos &x, &y        ; 获取坐标
MsgBox "鼠标位置: " x ", " y

; 获取鼠标下的窗口 ID
MouseGetPos &x, &y, &winID
MsgBox "窗口ID: " winID
MsgBox "窗口标题: " WinGetTitle(winID)

; 获取鼠标下的控件
MouseGetPos &x, &y, &winID, &ctrlID
MsgBox "控件: " ctrlID

; CoordMode 影响坐标模式
CoordMode "Mouse", "Screen"    ; 屏幕坐标
MouseGetPos &x, &y
MsgBox "屏幕坐标: " x ", " y

CoordMode "Mouse", "Window"    ; 窗口坐标
MouseGetPos &x, &y
MsgBox "窗口坐标: " x ", " y
```

## CoordMode 坐标模式

坐标模式决定 Click、MouseMove、MouseGetPos 等函数的坐标参照：

```ahk
CoordMode "Mouse", "Screen"     ; 相对屏幕左上角
CoordMode "Mouse", "Window"     ; 相对活动窗口左上角
CoordMode "Mouse", "Client"     ; 相对活动窗口客户区左上角（不含标题栏）
CoordMode "Pixel", "Screen"     ; PixelSearch 等用屏幕坐标
CoordMode "ToolTip", "Screen"   ; ToolTip 定位用屏幕坐标
CoordMode "Caret", "Window"     ; 光标位置用窗口坐标
```

> **建议**：脚本开头统一设置 `CoordMode "Mouse", "Screen"`，避免坐标混乱。

## 滚轮操作

```ahk
; 鼠标滚轮热键
WheelUp:: {
    ToolTip "上滚"
    SetTimer () => ToolTip(), -1000
}

WheelDown:: {
    ToolTip "下滚"
    SetTimer () => ToolTip(), -1000
}

; Ctrl+滚轮 — 调整音量
^WheelUp:: Send "{Volume_Up}"
^WheelDown:: Send "{Volume_Down}"

; Shift+滚轮 — 水平滚动
+WheelUp:: Click "WheelLeft"    ; 向左滚
+WheelDown:: Click "WheelRight" ; 向右滚
```

## MouseClickDrag

```ahk
; 拖拽操作（按下 → 移动 → 释放）
; MouseClickDrag(按键, 起始x, 起始y, 结束x, 结束y, 速度)

; 左键拖拽
MouseClickDrag "L", 100, 200, 500, 600   ; 从(100,200)拖到(500,600)

; 右键拖拽
MouseClickDrag "R", 100, 200, 500, 600

; 指定速度（0=瞬间）
MouseClickDrag "L", 100, 200, 500, 600, 50
```

## 实用鼠标脚本示例

### 鼠标位置记录器

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force
CoordMode "Mouse", "Screen"

^!m:: {    ; Ctrl+Alt+M 记录鼠标位置
    MouseGetPos &x, &y, &winID
    MsgBox "位置: (" x ", " y ")`n窗口: " WinGetTitle(winID)
}
```

### 快速点击器

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

^!c:: {    ; Ctrl+Alt+C 连续点击
    Loop 10 {
        Click
        Sleep 100
    }
}
```

### 鼠标抖动检测

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force
CoordMode "Mouse", "Screen"

lastX := 0, lastY := 0

SetTimer CheckMouse, 100

CheckMouse() {
    MouseGetPos &x, &y
    if (Abs(x - lastX) > 5 || Abs(y - lastY) > 5)
        ToolTip "鼠标移动中"
    else
        ToolTip "鼠标静止"
    lastX := x
    lastY := y
}
```

---

**下一步**: [11-热字符串](11-hotstrings.md)
