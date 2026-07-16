---
order: 5
---

# 05 - 控制流

## if / else

```ahk
#Requires AutoHotkey v2.0

; 基本 if
if (age >= 18) {
    MsgBox "成年人"
}

; if-else
if (score >= 60) {
    MsgBox "及格"
} else {
    MsgBox "不及格"
}

; if-else 链
if (score >= 90) {
    MsgBox "优秀"
} else if (score >= 60) {
    MsgBox "及格"
} else {
    MsgBox "不及格"
}
```

### if 的条件写法

```ahk
; 括号内的表达式
if (x > 0 && y > 0) {
    MsgBox "正坐标"
}

; AHK v2 中 if 条件必须用括号
if x > 0 {    ; 也可以不加外层括号，但建议加上
    MsgBox "正数"
}

; 单行 if
if (flag)
    MsgBox "已启用"

; 否定条件
if !(loggedIn) {
    MsgBox "请先登录"
}
```

## 三元运算符

```ahk
; 快速的条件判断赋值
label := age >= 18 ? "成年" : "未成年"

MsgBox score >= 60 ? "通过" : "失败"

; 可以用于函数参数
MsgBox(found ? "找到了！" : "没找到！")
```

## Loop 循环

### 计数循环

```ahk
; Loop n — 执行 n 次
Loop 5 {
    MsgBox "这是第 " A_Index " 次循环"
}
; A_Index 是内置变量，表示当前循环次数（从 1 开始）
```

### 条件循环

```ahk
; Loop { ... } Until 条件 — 执行直到条件满足
Loop {
    x := Random(1, 100)
    if (x > 90)
        break
} Until (x > 90)

; 注意：上面是先执行再判断。Until 至少执行一次循环体。
```

### 无限循环 + break

```ahk
Loop {
    if (GetKeyState("Esc", "P"))   ; 检查 Esc 是否被按下
        break
    Sleep 100
}
MsgBox "循环结束"
```

### 循环控制: break / continue

```ahk
; break — 立即退出整个循环
Loop 10 {
    if (A_Index = 5)
        break         ; 第5次时退出，不会继续到6-10
    MsgBox A_Index
}

; continue — 跳过当前迭代，继续下一次
Loop 10 {
    if (A_Index = 5)
        continue      ; 第5次跳过，继续第6次
    MsgBox A_Index    ; 不会显示 5
}
```

## For-In 循环（遍历对象）

```ahk
; 遍历 Array
arr := [10, 20, 30, 40]
for index, value in arr {
    MsgBox "索引 " index " = " value
}

; 遍历 Map
m := Map("name", "AHK", "version", 2)
for key, value in m {
    MsgBox key ": " value
}

; A_Index 在 for 循环中也可用
arr := ["a", "b", "c"]
for index, value in arr {
    MsgBox "迭代次数: " A_Index  ; 1, 2, 3
}
```

## While 循环

```ahk
; while 条件 — 条件为真时反复执行
i := 0
while (i < 10) {
    i++
    MsgBox "i = " i
}

; while 也可以不加括号
while i < 10
    i++
```

> `while` 先检查条件再执行；`Loop {...} Until` 先执行再检查条件。

## Switch（AHK v2 新增）

```ahk
day := "Wednesday"

switch day {
    case "Monday":
        MsgBox "周一"
    case "Tuesday", "Wednesday":
        MsgBox "周二或周三"   ; 多值用逗号
    case "Thursday":
        MsgBox "周四"
    case "Friday":
        MsgBox "周五"
    default:
        MsgBox "周末或其他"
}
```

### Switch 的数值匹配

```ahk
score := 85

switch true {              ; switch true 可以用条件表达式
    case score >= 90:
        MsgBox "优秀"
    case score >= 80:
        MsgBox "良好"
    case score >= 60:
        MsgBox "及格"
    default:
        MsgBox "不及格"
}
```

> `switch` 每个 case 后自动 break，不需要手动写 break。

## 循环嵌套

```ahk
; 嵌套循环 — 用 A_Index 区分层级
Loop 3 {
    outer := A_Index       ; 保存外层 A_Index
    Loop 3 {
        MsgBox "外: " outer " 内: " A_Index
    }
}
```

> `A_Index` 总是表示**当前层**的循环索引。嵌套时需要保存外层的值。

## 循环变量 A_Index

```ahk
Loop 5 {
    MsgBox A_Index     ; 依次显示 1, 2, 3, 4, 5
}

; A_Index 在循环结束后自动恢复为 0
MsgBox A_Index          ; 0（循环外）
```

| 循环类型 | A_Index | 说明 |
|----------|---------|------|
| `Loop n` | 1 到 n | 计数循环 |
| `Loop { } Until` | 递增 | 条件循环 |
| `for k,v in obj` | 递增 | 遍历循环 |
| `while` | 递增 | 条件循环 |

## 常见循环模式

### 等待某个条件

```ahk
; 等待窗口出现
WinWait "计算器", , 10    ; 最多等10秒
if WinExist("计算器")
    MsgBox "计算器已出现"
else
    MsgBox "等待超时"

; 自定义等待循环
Loop {
    if WinExist("目标窗口") {
        WinActivate "目标窗口"
        break
    }
    Sleep 500
} Until (A_Index > 20)    ; 最多等 20*500ms = 10秒
```

### 重试模式

```ahk
maxRetry := 3
Loop maxRetry {
    try {
        result := DoSomething()
        break               ; 成功则退出
    } catch Error as e {
        if (A_Index = maxRetry)
            MsgBox "重试 " maxRetry " 次后仍失败: " e.Message
        else
            Sleep 1000      ; 重试前等待
    }
}
```

---

**下一步**: [06-函数](06-functions.md)
