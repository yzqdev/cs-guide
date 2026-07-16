---
order: 2
---

# 02 - 基本语法

## 注释

```ahk
; 单行注释 — 分号开头，整行都是注释
x := 42  ; 行尾注释 — 分号后是注释

/*
  多行注释 — 用 /* 和 */ 包围
  可以写很多行
  适合写较长的说明
*/
```

> 多行注释 `/* */` 不能放在行尾，只能独立出现。

## 表达式与赋值

AHK v2 统一使用**表达式语法**，赋值用 `:=`：

```ahk
#Requires AutoHotkey v2.0

name := "AutoHotkey"    ; 字符串赋值
age := 25               ; 数字赋值
flag := true            ; 布尔赋值
result := 3 + 4 * 2     ; 表达式赋值，result = 11
msg := "Hello, " name   ; 字符串拼接（表达式内自动拼接）
```

**关键规则**：

- `:=` 是赋值运算符（表达式赋值）
- `=` 在 v2 中不再用于赋值（只在比较时用）
- 字符串用双引号 `"..."`
- 数字不需要引号
- 表达式中变量直接写名字，不需要 `%var%`

## 行延续

长行可以拆分书写：

```ahk
; 方式1: 在行首用小括号包围（延续区域）
longString := (
    "这是一段很长的文字，"
    "可以分多行书写，"
    "它们会被自动拼接在一起。"
)

; 方式2: 续行符 — 行尾的逗号或运算符自动续行
result := 1 + 2 + 3
    + 4 + 5 + 6    ; 以 + 开头，自动续行

; 方式3: 数组/对象的多行书写
arr := [
    10,
    20,
    30
]
```

## 代码块

AHK v2 中代码块用花括号 `{}`：

```ahk
; 热键代码块
^j:: {
    Send "Hello"
    MsgBox "热键已触发"
}

; if 代码块
if (age > 18) {
    MsgBox "成年人"
}

; 单行简写（不需要花括号）
^k:: Send "快捷发送"

if (x > 0)
    MsgBox "正数"
```

> **推荐**：始终使用花括号，即使只有一行代码。这样更清晰、更不容易出错。

## 字符串

```ahk
#Requires AutoHotkey v2.0

; 双引号字符串
s1 := "Hello World"

; 字符串中的引号用转义
s2 := "He said \"Hi\""

; 字符串拼接
s3 := "Hello" " " "World"     ; 表达式拼接
s4 := "Hello" name             ; 变量自动拼接

; 用括号确保拼接顺序
s5 := "Age: " (age + 1)       ; 先计算，再拼接
s6 := "Age: " age + 1         ; 注意优先级！这可能不是你想要的
```

### 字符串中的特殊字符

| 转义 | 含义 | 示例 |
|------|------|------|
| `` `n `` | 换行 | `"Line1`nLine2"` |
| `` `r `` | 回车 | `"Text`r"` |
| `` `t `` | Tab | `"Col1`tCol2"` |
| `` `b `` | 退格 | `"Back`b"` |
| `` `" `` | 双引号 | `"He`"said`""` |
| `` `` `` | 反引号本身 | `` "A``B" `` |
| `` `, `` | 逗号（在命令参数中） | `"a`, `"b`" ` |
| `` `; `` | 分号（行尾注释的;） | `"end`;not comment`" |

> AHK 用**反引号** `` ` `` 作为转义字符，不同于 C 语言的反斜杠 `\`。

## 数字

```ahk
; 整数
i := 42
i2 := -10

; 十六进制
hex := 0xFF        ; 255

; 浮点数
f := 3.14
f2 := 1.0e3        ; 1000.0（科学计数法）
```

## 命令 vs 函数

AHK v2 统一使用**函数调用语法**，所有命令都变成了函数：

```ahk
; v1 命令式语法（v2 不支持）
; MsgBox, Hello World

; v2 函数式语法（唯一方式）
MsgBox "Hello World"

; 多参数函数
MsgBox("确认删除？", "警告", 4)  ; 标题、文本、图标类型
```

### 常用函数一览

| 函数 | 用途 | 示例 |
|------|------|------|
| `MsgBox` | 弹出消息框 | `MsgBox "Hello"` |
| `InputBox` | 输入对话框 | `InputBox("请输入名字")` |
| `ToolTip` | 提示浮窗 | `ToolTip "提示文字"` |
| `Sleep` | 等待毫秒 | `Sleep 1000` |
| `Send` | 发送按键 | `Send "Hello"` |
| `Run` | 运行程序 | `Run "notepad.exe"` |
| `FileExist` | 检查文件 | `FileExist("C:\test.txt")` |
| `StrLen` | 字符串长度 | `StrLen("Hello")` |

## #指令（预处理指令）

`#` 开头的指令在脚本加载时生效，不是运行时：

```ahk
#Requires AutoHotkey v2.0     ; 指定所需版本
#SingleInstance Force          ; 只允许一个脚本实例（强制替换旧的）
#Warn All, StdOut              ; 开启所有警告输出
#Include lib.ahk               ; 包含外部脚本
```

| 指令 | 用途 |
|------|------|
| `#Requires` | 指定 AHK 版本 |
| `#SingleInstance` | 单实例模式（Force/Ignore/Prompt） |
| `#Include` | 包含其他脚本文件 |
| `#Warn` | 开启警告提示 |
| `#HotkeyInterval` | 热键频率限制 |
| `#MaxHotkeysPerInterval` | 最大热键数 |

## 代码组织结构

一个完整的 AHK v2 脚本通常按以下顺序组织：

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; ===== 设置区 =====
CoordMode "Mouse", "Screen"   ; 鼠标坐标模式
SetWorkingDir A_ScriptDir     ; 工作目录

; ===== 全局变量区 =====
appVersion := "1.0"
appName := "MyTool"

; ===== 热键区 =====
^j:: Send "Hello"
Esc:: ExitApp

; ===== 热字符串区 =====
:btw::by the way

; ===== 函数区 =====
MyFunc(param) {
    return param * 2
}

; ===== 定时器区 =====
SetTimer CheckWindow, 1000
```

---

**下一步**: [03-变量与数据类型](03-variables.md)
