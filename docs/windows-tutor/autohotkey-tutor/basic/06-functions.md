---
order: 6
---

# 06 - 函数

## 函数定义

```ahk
#Requires AutoHotkey v2.0

; 基本函数
Greet(name) {
    MsgBox "Hello, " name "!"
}

; 调用
Greet("AutoHotkey")
```

### 返回值

```ahk
Add(a, b) {
    return a + b
}

result := Add(3, 4)     ; result = 7

; return 可以省略，函数默认返回空字符串
NoReturn() {
    MsgBox "没有返回值"
}
x := NoReturn()          ; x = ""（空字符串）
```

### 默认参数

```ahk
Power(base, exp := 2) {    ; exp 默认为 2
    return base ** exp
}

MsgBox Power(3)           ; 9（3 的 2 次方）
MsgBox Power(3, 3)        ; 27（3 的 3 次方）
```

> 默认参数必须是常量表达式，不能是变量。

### 可变参数

```ahk
; 用 * 接收任意数量的参数
Sum(nums*) {
    total := 0
    for i, n in nums {
        total += n
    }
    return total
}

MsgBox Sum(1, 2, 3)       ; 6
MsgBox Sum(1, 2, 3, 4, 5) ; 15
MsgBox Sum()              ; 0

; 可变参数也可以有前缀的固定参数
Join(sep, parts*) {
    result := ""
    for i, p in parts {
        if (i > 1)
            result .= sep
        result .= p
    }
    return result
}

MsgBox Join(", ", "a", "b", "c")  ; "a, b, c"
```

## 函数调用方式

```ahk
; 括号调用（推荐、标准方式）
MsgBox("Hello")
result := Add(3, 4)

; 空括号可以省略
ExitApp()     ; 等价于
ExitApp       ; 无参数时可以省略括号

; 单参数可以省略括号
MsgBox "Hello"    ; 等价于 MsgBox("Hello")
Sleep 1000        ; 等价于 Sleep(1000)

; 多参数必须用括号
MsgBox("确认？", "标题", 4)
```

> **推荐**：始终使用括号调用函数，更清晰且不容易出错。

## 局部变量与全局变量

```ahk
x := 10               ; 全局变量

MyFunc() {
    x := 20            ; 局部变量（默认），不影响全局
    y := 30            ; 局部变量
    MsgBox "局部 x=" x " y=" y
}

MyFunc()               ; 显示局部 x=20 y=30
MsgBox "全局 x=" x     ; 显示全局 x=10
```

### global 声明

```ahk
counter := 0

Increment() {
    global counter     ; 引用全局变量
    counter += 1
    return counter
}

Increment()            ; 1
Increment()            ; 2
MsgBox counter         ; 2
```

### static 声明（函数内静态变量）

```ahk
Count() {
    static count := 0   ; 静态变量，只在首次调用时初始化
    count += 1
    return count
}

MsgBox Count()         ; 1
MsgBox Count()         ; 2
MsgBox Count()         ; 3
```

> `static` 变量在函数调用之间保持值，但只在该函数内可见。

## 闭包

AHK v2 支持**闭包** — 函数可以捕获外部变量：

```ahk
MakeCounter(start := 0) {
    count := start           ; 局部变量
    Counter() {
        count += 1           ; 捕获并修改外部的 count
        return count
    }
    return Counter           ; 返回内部函数
}

c := MakeCounter(10)
MsgBox c()                   ; 11
MsgBox c()                   ; 12
MsgBox c()                   ; 13

; 每次调用 MakeCounter 创建独立的闭包
c2 := MakeCounter()
MsgBox c2()                  ; 1（独立计数）
```

## 递归

```ahk
; 递归计算阶乘
Factorial(n) {
    if (n <= 1)
        return 1
    return n * Factorial(n - 1)
}

MsgBox Factorial(5)       ; 120（5! = 120）

; 递归遍历目录
ListFiles(dir, indent := 0) {
    prefix := StrRepeat("  ", indent)
    Loop Files dir "\*.*" {
        if A_LoopFileAttrib ~= "D" {    ; 是目录
            MsgBox prefix "[DIR] " A_LoopFileName
            ListFiles(A_LoopFileFullPath, indent + 1)
        } else {
            MsgBox prefix A_LoopFileName
        }
    }
}
```

## 函数作为参数（回调）

```ahk
; 传递函数作为参数
Apply(arr, func) {
    result := []
    for i, v in arr {
        result.Push(func(v))
    }
    return result
}

Double(n) {
    return n * 2
}

arr := [1, 2, 3, 4]
doubled := Apply(arr, Double)
MsgBox doubled[1]  ; 2
MsgBox doubled[2]  ; 4
MsgBox doubled[3]  ; 6
MsgBox doubled[4]  ; 8
```

## 函数引用

```ahk
; 用 Func() 获取函数引用
fn := Func("MsgBox")
fn("Hello")          ; 等价于 MsgBox("Hello")

; 函数引用可以存储和传递
fn := Double
MsgBox fn(5)         ; 10

; 函数名作为字符串
fn := "Double"
MsgBox %fn%(5)       ; 不推荐，v2 中尽量避免这种写法
```

## 内置常用函数

### 消息与输入

| 函数 | 说明 | 示例 |
|------|------|------|
| `MsgBox` | 弹出消息框 | `MsgBox("提示", "标题", 64)` |
| `InputBox` | 输入对话框 | `InputBox("请输入", "标题")` |
| `ToolTip` | 鼠标旁提示 | `ToolTip("提示文字")` |
| `SplashTextOn` | 持久提示窗口 | `SplashTextOn("标题", "内容")` |

### 数学

| 函数 | 说明 | 示例 |
|------|------|------|
| `Abs` | 绝对值 | `Abs(-5)` → 5 |
| `Ceil` | 向上取整 | `Ceil(3.2)` → 4 |
| `Floor` | 向下取整 | `Floor(3.8)` → 3 |
| `Round` | 四舍五入 | `Round(3.5)` → 4 |
| `Sqrt` | 平方根 | `Sqrt(9)` → 3 |
| `Max` | 最大值 | `Max(1, 5, 3)` → 5 |
| `Min` | 最小值 | `Min(1, 5, 3)` → 1 |
| `Random` | 随机数 | `Random(1, 100)` → 随机1-100 |
| `Mod` | 取模 | `Mod(10, 3)` → 1 |

### 字符串

| 函数 | 说明 |
|------|------|
| `StrLen` | 字符串长度 |
| `SubStr` | 截取子串 |
| `InStr` | 查找子串位置 |
| `StrReplace` | 替换子串 |
| `StrSplit` | 按分隔符拆分 |
| `StrLower` | 转小写 |
| `StrUpper` | 转大写 |
| `Trim` | 去首尾空白 |
| `LTrim / RTrim` | 去左/右空白 |
| `Format` | 格式化字符串 |

### 文件

| 函数 | 说明 |
|------|------|
| `FileRead` | 读文件 |
| `FileWrite` | 写文件 |
| `FileAppend` | 追加内容 |
| `FileExist` | 检查文件是否存在 |
| `FileGetSize` | 文件大小 |
| `FileDelete` | 删除文件 |
| `FileCopy` | 复制文件 |
| `FileMove` | 移动文件 |
| `DirExist` | 检查目录是否存在 |
| `DirCopy` | 复制目录 |
| `DirDelete` | 删除目录 |

---

**下一步**: [07-字符串处理](07-strings.md)
