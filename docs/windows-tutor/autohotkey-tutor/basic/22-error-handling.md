---
order: 22
---

# 22 - 错误处理与调试

## try / catch / finally

AHK v2 提供完整的异常处理机制：

```ahk
#Requires AutoHotkey v2.0

; 基本 try-catch
try {
    result := 10 / 0    ; 除零错误
} catch Error as e {
    MsgBox "捕获错误: " e.Message
}

; try-catch-finally
try {
    f := FileOpen("C:\nonexist.txt", "r")
    content := f.Read()
    f.Close()
} catch Error as e {
    MsgBox "文件读取失败: " e.Message
} finally {
    MsgBox "无论如何都会执行"
}
```

### Error 对象属性

```ahk
try {
    SomeFunction()
} catch Error as e {
    MsgBox "类型: " Type(e)      ; "Error" 或子类名
    MsgBox "消息: " e.Message     ; 错误描述
    MsgBox "文件: " e.File        ; 出错的脚本文件
    MsgBox "行号: " e.Line        ; 出错的行号
    MsgBox "堆栈: " e.Stack       ; 调用堆栈
}
```

### 捕获特定错误类型

```ahk
try {
    result := SomeOperation()
} catch TypeError as e {
    MsgBox "类型错误: " e.Message
} catch ValueError as e {
    MsgBox "值错误: " e.Message
} catch Error as e {
    MsgBox "其他错误: " e.Message
}
```

### 错误类型层级

| 类型 | 说明 |
|------|------|
| `Error` | 所有错误的基类 |
| `TypeError` | 类型相关错误 |
| `ValueError` | 值相关错误 |
| `RangeError` | 范围超出错误 |
| `IndexError` | 索引越界错误 |
| `TargetError` | 目标（窗口/控件）找不到 |
| `FileError` | 文件操作错误 |
| `OSError` | 操作系统相关错误 |
| `MemoryError` | 内存分配失败 |
| `ZeroDivisionError` | 除零错误 |
| `PropertyError` | 属性访问错误 |

### 抛出错误

```ahk
; throw 抛出错误
CheckAge(age) {
    if (age < 0)
        throw ValueError("年龄不能为负数: " age, -1)
    if (age > 150)
        throw RangeError("年龄超出范围: " age, -1)
    return true
}

try {
    CheckAge(-5)
} catch ValueError as e {
    MsgBox e.Message    ; "年龄不能为负数: -5"
}

; throw 也可以抛出自定义值
throw "自定义错误消息"

; throw Error 对象
throw Error("出错了", A_LineNumber, A_ScriptName)
```

## 调试技巧

### MsgBox 调试

最简单直接的调试方式：

```ahk
; 在关键位置插入 MsgBox
x := CalculateSomething()
MsgBox "x 的值: " x    ; 检查中间结果

; 调试变量类型
MsgBox "type: " Type(x) " value: " x

; 调试数组
for i, v in arr
    MsgBox i ": " v
```

### ToolTip 调试

ToolTip 更轻量，不会阻塞脚本：

```ahk
; 显示调试信息但不阻塞
result := SomeFunc()
ToolTip "result: " result
SetTimer () => ToolTip(), -3000    ; 3秒后清除
```

### OutputDebug

OutputDebug 输出到调试器，不阻塞脚本：

```ahk
; OutputDebugString — 输出到调试器（如 DebugView）
OutputDebug "函数开始执行"
OutputDebug "变量值: " x
OutputDebug "函数结束"

; 用 DebugView (Sysinternals) 工具查看输出
; 下载: https://learn.microsoft.com/en-us/sysinternals/downloads/debugview
```

### A_ 调试变量

| 变量 | 说明 |
|------|------|
| `A_LineNumber` | 当前执行的行号 |
| `A_LineFile` | 当前执行的文件路径 |
| `A_ThisFunc` | 当前执行的函数名 |
| `A_ThisHotkey` | 最近触发的热键名 |
| `A_PriorHotkey` | 上一次触发的热键名 |
| `A_TimeSinceThisHotkey` | 当前热键触发后经过的毫秒数 |
| `A_TimeSincePriorHotkey` | 上次热键触发后经过的毫秒数 |

```ahk
; 在函数中获取调试信息
MyFunc() {
    OutputDebug "进入 " A_ThisFunc " 行 " A_LineNumber
    ; ...
    OutputDebug "退出 " A_ThisFunc
}
```

## #Warn 警告指令

```ahk
; #Warn — 开启警告检测
#Warn All, StdOut        ; 所有警告输出到标准输出
#Warn All, MsgBox        ; 所有警告弹窗显示
#Warn UseUnsetGlobal     ; 使用未设置的全局变量警告
#Warn UseUnsetLocal      ; 使用未设置的局部变量警告
#Warn LocalSameAsGlobal  ; 局部变量与全局同名警告
```

### 常用警告选项

| 选项 | 说明 |
|------|------|
| `All` | 所有警告 |
| `UseUnsetGlobal` | 使用未设置全局变量 |
| `UseUnsetLocal` | 使用未设置局部变量 |
| `LocalSameAsGlobal` | 局部变量与全局同名 |
| `ClassOverwrite` | 类名覆盖全局变量 |

## 调试最佳实践

### 1. 使用 try-catch 保护关键操作

```ahk
SafeFileRead(path) {
    try {
        return FileRead(path)
    } catch FileError as e {
        MsgBox "无法读取文件: " path "`n错误: " e.Message
        return ""
    }
}
```

### 2. 验证输入参数

```ahk
ProcessData(data) {
    if !IsObject(data)
        throw TypeError("data 必须是对象")
    if data.Length = 0
        throw ValueError("data 不能为空")

    ; 安全处理...
}
```

### 3. 热键调试模式

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

global debugMode := false

; Ctrl+D 切换调试模式
^d:: {
    debugMode := !debugMode
    ToolTip debugMode ? "调试模式 ON" : "调试模式 OFF"
    SetTimer () => ToolTip(), -2000
}

; 调试输出函数
DebugLog(msg) {
    if debugMode
        OutputDebug msg
}

; 使用
MyFunc() {
    DebugLog "进入 MyFunc"
    ; ...
    DebugLog "退出 MyFunc"
}
```

### 4. 错误日志记录

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

logFile := A_ScriptDir "\error.log"

LogError(e) {
    timestamp := A_Now
    entry := timestamp . " | " . Type(e) . " | " . e.Message
        . " | File: " . e.File . " Line: " . e.Line . "`n"
    FileAppend entry, logFile
}

; 全局错误捕获
OnError GlobalErrorHandler

GlobalErrorHandler(e) {
    LogError(e)
    MsgBox "发生错误: " e.Message, "错误", 16
    return -1   ; 继续执行脚本（-1=继续，0=退出）
}

; 测试
^t:: {
    throw Error("测试错误")
}
```

## 常见错误与解决

### 变量未定义

```ahk
; 错误: 使用未赋值的变量
MsgBox unknownVar    ; 可能报错或输出空值

; 解决: 用 IsSet 检查
if IsSet(unknownVar)
    MsgBox unknownVar
else
    MsgBox "变量未定义"
```

### 窗口找不到

```ahk
; 错误: 操作不存在的窗口
WinActivate "不存在的窗口"   ; TargetError

; 解决: 先检查
if WinExist("目标窗口")
    WinActivate "目标窗口"
else
    MsgBox "窗口不存在"
```

### 数组索引越界

```ahk
arr := [1, 2, 3]
; MsgBox arr[5]   ; 越界访问，返回空字符串（不是报错）

; 但 Map 越界会报错
m := Map("a", 1)
; MsgBox m["b"]   ; IndexError!

; 解决: 用 Has 检查
if m.Has("b")
    MsgBox m["b"]
```

---

**下一步**: [23-脚本管理与组织](23-script-organization.md)
