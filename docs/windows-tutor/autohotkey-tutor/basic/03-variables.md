---
order: 3
---

# 03 - 变量与数据类型

## 变量基础

AHK v2 中所有赋值使用 `:=`：

```ahk
#Requires AutoHotkey v2.0

name := "AutoHotkey"       ; 字符串
age := 25                  ; 整数
score := 98.5              ; 浮点数
active := true             ; 布尔值
empty := ""                ; 空字符串
nothing := ""              ; 未初始化变量默认值为空字符串

; 多变量赋值
a := 1, b := 2, c := 3    ; 用逗号分隔
```

### 变量命名规则

- 以字母或 `#`、`@`、`$`、`_` 开头
- 后续字符可以是字母、数字或 `_`
- 不区分大小写（`myVar` 和 `MYVAR` 是同一个变量）
- 最长 253 个字符

```ahk
; 合法的变量名
myVar := 1
_MyVar := 2
$special := 3

; 不合法
; 2var := 1    （数字开头）
; my-var := 2  （包含连字符）
```

## 数据类型

AHK v2 是动态类型语言，变量没有固定类型，值决定类型：

### 字符串

```ahk
s := "Hello World"
s := ""                   ; 空字符串
s := "He said \"Hi\""     ; 包含引号
s := "Line1`nLine2"       ; 包含换行

; 字符串长度
len := StrLen(s)

; 字符串类型判断
if IsString(s)
    MsgBox "这是字符串"
```

### 整数与浮点数

```ahk
i := 42                   ; 整数
f := 3.14                 ; 浮点数
neg := -10                ; 负数
hex := 0xFF               ; 十六进制（255）
sci := 1.5e6              ; 科学计数法（1500000）

; 类型判断
if IsInteger(i)
    MsgBox "这是整数"

if IsFloat(f)
    MsgBox "这是浮点数"

if IsNumber(i) || IsNumber(f)
    MsgBox "这是数字"

; 类型转换
s := String(42)           ; 数字转字符串 "42"
n := Number("3.14")       ; 字符串转数字 3.14
i := Integer("42")        ; 字符串转整数 42
f := Float("3.14")        ; 字符串转浮点数 3.14
```

### 布尔值

```ahk
flag := true              ; 真
flag := false             ; 假

; 布尔转换规则
; 这些值被视为 false:
;   0, 0.0, "" (空字符串), false
; 其他值都视为 true:
;   非零数字, 非空字符串, true, 对象

if (flag)
    MsgBox "条件为真"

; 数字与布尔的关系
n := 0
if !n                     ; true（0 被视为 false）
    MsgBox "0 就是 false"

n := 1
if n                      ; true（1 被视为 true）
    MsgBox "1 就是 true"
```

## 变量的作用域

### 全局变量

在函数外部定义的变量是全局的。函数内部要访问全局变量需要声明：

```ahk
#Requires AutoHotkey v2.0

globalVar := "我是全局的"

ShowGlobal() {
    global globalVar       ; 声明使用全局变量
    MsgBox globalVar
}

ShowGlobal()
```

### 局部变量

函数内部未声明为 global 的变量是局部的：

```ahk
x := 10                   ; 全局 x

MyFunc() {
    x := 20               ; 局部 x，不影响全局
    MsgBox "局部 x = " x   ; 显示 20
}

MyFunc()
MsgBox "全局 x = " x       ; 显示 10
```

### 强制全局声明

```ahk
counter := 0

Increment() {
    global counter         ; 使用全局 counter
    counter += 1
    return counter
}

Increment()  ; 1
Increment()  ; 2
MsgBox counter             ; 2
```

## 空值与默认值

```ahk
; 未赋值的变量是空字符串 ""
x ; 等价于 ""

; 在数值运算中，空字符串被视为 0
result := "" + 5          ; 5

; 在字符串拼接中，空字符串就是空
msg := "Value: " ""       ; "Value: "

; 判断变量是否为空
if (name = "")
    MsgBox "名字为空"

; 判断变量是否有值
if name
    MsgBox "名字不为空"

; 设置默认值
name := name || "匿名"    ; 如果 name 为空，使用 "匿名"
```

## 常量与命名惯例

AHK v2 没有真正的常量声明，但可以通过命名惯例约定：

```ahk
; 用全大写表示常量（惯例，非强制）
APP_NAME := "MyTool"
APP_VERSION := "1.0"
MAX_RETRY := 3
```

> 注意：这些变量仍然可以被修改，全大写只是提醒开发者"不应修改"。

## 内置变量（A_ 变量）

AHK 提供了大量以 `A_` 开头的内置变量：

### 系统信息

```ahk
MsgBox "AHK 版本: " A_AhkVersion
MsgBox "AHK 路径: " A_AhkPath
MsgBox "操作系统: " A_OsVersion
MsgBox "64位系统: " A_Is64bitOS
MsgBox "指针大小: " A_PtrSize
MsgBox "管理员权限: " A_IsAdmin
```

### 脚本信息

```ahk
MsgBox "脚本路径: " A_ScriptFullPath
MsgBox "脚本目录: " A_ScriptDir
MsgBox "脚本名称: " A_ScriptName
MsgBox "工作目录: " A_WorkingDir
```

### 时间

```ahk
MsgBox "当前时间: " A_Now          ; YYYYMMDDHHMMSS
MsgBox "当前日期: " A_YYYY "-" A_MM "-" A_DD
MsgBox "时区偏移: " A_TimeZoneUTC  ; 分钟偏移
```

### 键盘/鼠标状态

```ahk
MsgBox "光标类型: " A_Cursor       ; Arrow, IBeam, Wait 等
MsgBox "CapsLock: " A_CapsLockState  ; On/Off
MsgBox "Shift: " GetKeyState("Shift") ; 1/0
```

### 窗口信息

```ahk
MsgBox "活动窗口: " A_ActiveWindowId  ; 当前活动窗口的 ID
MsgBox "窗口标题: " WinGetTitle("A")  ; "A" 表示活动窗口
```

## 类型判断函数

```ahk
#Requires AutoHotkey v2.0

v := "42"

IsString(v)     ; true
IsInteger(v)    ; false（它是字符串 "42"，不是数字 42）
IsNumber(v)     ; false
IsObject(v)     ; false
IsFloat(v)      ; false

; 但 "42" 可以被隐式转换为数字
result := v + 8  ; 50（字符串 "42" 在运算时自动转换）

v2 := 42
IsInteger(v2)   ; true
IsString(v2)    ; false
```

| 函数 | 判断类型 |
|------|----------|
| `IsString()` | 字符串 |
| `IsInteger()` | 整数 |
| `IsFloat()` | 浮点数 |
| `IsNumber()` | 数字（整数或浮点数） |
| `IsObject()` | 对象（Array/Map/Object 等） |
| `IsSet()` | 变量是否已赋值 |
| `Type()` | 返回类型名称字符串 |

```ahk
; Type() 返回类型名称
MsgBox Type("hello")    ; "String"
MsgBox Type(42)         ; "Integer"
MsgBox Type(3.14)       ; "Float"
MsgBox Type(true)       ; "Integer"（注意！true 在 AHK 中是整数 1）
MsgBox Type([])         ; "Array"
MsgBox Type(Map())      ; "Map"
```

> **注意**：AHK 中 `true` 是整数 1，`false` 是整数 0。布尔值本质上是整数。

---

**下一步**: [04-运算符](04-operators.md)
