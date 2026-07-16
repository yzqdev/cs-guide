---
order: 7
---

# 07 - 字符串处理

## 字符串拼接

```ahk
#Requires AutoHotkey v2.0

; 隐式拼接 — 表达式中相邻项自动拼接
msg := "Hello" " " "World"        ; "Hello World"
msg := "Name: " name " Age: " age ; 变量自动拼接

; 拼接运算符 .
msg := "Hello" . " " . "World"    ; 同上

; .= 拼接赋值
text := "Hello"
text .= " "
text .= "World"                    ; text = "Hello World"

; 注意运算优先级 — 用括号
msg := "Result: " (1 + 2)          ; "Result: 3"
msg := "Value: " func()            ; "Value: 返回值"
```

## 字符串长度

```ahk
s := "AutoHotkey"
MsgBox StrLen(s)              ; 10

; 空字符串
MsgBox StrLen("")             ; 0

; 包含中文（AHK 支持 Unicode）
MsgBox StrLen("你好")          ; 2
```

## 截取子串

```ahk
s := "AutoHotkey"

; SubStr(字符串, 起始位置, 长度)
; 起始位置：1 为第一个字符，-1 为最后一个字符

MsgBox SubStr(s, 1, 4)        ; "Auto"  — 从第1个取4个
MsgBox SubStr(s, 5)           ; "Hotkey" — 从第5个取到末尾
MsgBox SubStr(s, -3)          ; "key"    — 从倒数第3个取到末尾
MsgBox SubStr(s, -6, 3)       ; "Hot"    — 从倒数第6个取3个
```

> AHK 字符串索引从 **1** 开始（不像 Python/C 从 0 开始）。

## 查找子串

```ahk
s := "AutoHotkey"

; InStr(字符串, 搜索内容, 是否区分大小写, 起始位置)
MsgBox InStr(s, "Hot")        ; 5  — 找到"Hot"在第5个位置
MsgBox InStr(s, "hot")        ; 5  — 默认不区分大小写
MsgBox InStr(s, "hot", true)  ; 0  — 区分大小写，找不到

; 从右边搜索
MsgBox InStr(s, "o")          ; 4  — 第一个"o"
MsgBox InStr(s, "o", , -1)    ; 6  — 从右边搜索第一个"o"

; 是否包含某子串
if InStr(s, "Hot")
    MsgBox "包含 Hot"

; 判断不包含
if !InStr(s, "xyz")
    MsgBox "不包含 xyz"
```

## 替换字符串

```ahk
s := "Hello World World"

; StrReplace(字符串, 搜索内容, 替换内容, 区分大小写, 替换次数)
MsgBox StrReplace(s, "World", "AHK")       ; "Hello AHK AHK"
MsgBox StrReplace(s, "World", "AHK", , 1)  ; "Hello AHK World" — 只替换1次

; 区分大小写
MsgBox StrReplace(s, "world", "AHK", true)  ; 不替换（大小写不匹配）

; 删除子串（替换为空）
MsgBox StrReplace(s, "World")               ; "Hello  "

; 获取替换次数
count := 0
result := StrReplace(s, "World", "AHK", , , &count)
MsgBox "替换了 " count " 次"                ; 替换了 2 次
```

## 拆分字符串

```ahk
csv := "apple,banana,cherry,date"

; StrSplit(字符串, 分隔符, 引号字符, 保留分隔符)
arr := StrSplit(csv, ",")

for i, fruit in arr {
    MsgBox i ": " fruit
}
; 1: apple, 2: banana, 3: cherry, 4: date

; 拆分到指定数量
arr := StrSplit(csv, ",", , 2)    ; 只拆成2部分
MsgBox arr[1]                      ; "apple"
MsgBox arr[2]                      ; "banana,cherry,date"

; 用空格拆分
text := "Hello  World   AHK"
arr := StrSplit(text, " ")
; ["Hello", "World", "AHK"]

; 按多个字符拆分
s := "a,b;c.d"
arr := StrSplit(s, [",", ";", "."])
; ["a", "b", "c", "d"]
```

## 大小写转换

```ahk
s := "AutoHotkey v2"

MsgBox StrLower(s)      ; "autohotkey v2"
MsgBox StrUpper(s)      ; "AUTOHOTKEY V2"

; 首字母大写
MsgBox StrTitle(s)      ; "Autohotkey V2"
```

## 去空白

```ahk
s := "  Hello World  "

MsgBox Trim(s)          ; "Hello World" — 去首尾空白
MsgBox LTrim(s)         ; "Hello World  " — 去左边空白
MsgBox RTrim(s)         ; "  Hello World" — 去右边空白

; 去指定字符
MsgBox Trim("xxHelloxx", "x")   ; "Hello"
MsgBox LTrim("000123", "0")     ; "123"
```

## 字符串格式化

```ahk
; Format(格式串, 参数...)
MsgBox Format("Hello, {}!", "World")          ; "Hello, World!"
MsgBox Format("{} + {} = {}", 1, 2, 3)        ; "1 + 2 = 3"

; 位置参数
MsgBox Format("{2} before {1}", "A", "B")     ; "B before A"

; 数字格式化
MsgBox Format("{:.2f}", 3.14159)              ; "3.14"
MsgBox Format("{:d}", 42)                     ; "42"
MsgBox Format("{:08d}", 42)                   ; "00000042"
MsgBox Format("{:x}", 255)                    ; "ff"

; 宽度和对齐
MsgBox Format("{:10}", "left")                ; "left      "（左对齐，宽10）
MsgBox Format("{:>10}", "right")              ; "     right"（右对齐）
MsgBox Format("{:^10}", "center")             ; "  center  "（居中）
```

## 字符串比较

```ahk
; 不区分大小写（默认）
if ("abc" = "ABC")
    MsgBox "相等"              ; 显示

; 区分大小写
if ("abc" == "ABC")
    MsgBox "相等"              ; 不显示

; Compare 函数 — 返回 -1/0/1
MsgBox StrCompare("abc", "abc")     ; 0  — 相等
MsgBox StrCompare("abc", "abd")     ; -1 — abc < abd
MsgBox StrCompare("abd", "abc")     ; 1  — abd > abc
MsgBox StrCompare("abc", "ABC", true) ; 1 — 区分大小写，abc > ABC
```

## 字符串与数字转换

```ahk
; 数字转字符串
s := String(42)           ; "42"
s := String(3.14)         ; "3.14"

; 字符串转数字
n := Number("42")         ; 42
n := Integer("42")        ; 42
n := Float("3.14")        ; 3.14

; 隐式转换
MsgBox "3" + 4            ; 7（字符串"3"在运算时自动转为数字3）
MsgBox "3" . 4            ; "34"（. 运算符是拼接）
MsgBox "3" + "4"          ; 7
```

## 重复字符串

```ahk
; StrRepeat(字符串, 重复次数)
MsgBox StrRepeat("=", 20)           ; "===================="
MsgBox StrRepeat("Ha", 3)           ; "HaHaHa"

; AHK v2 之前的替代方案（如果没有 StrRepeat）
StrRepeatOld(s, n) {
    result := ""
    Loop n
        result .= s
    return result
}
```

## 反转字符串

```ahk
ReverseStr(s) {
    result := ""
    Loop StrLen(s) {
        result .= SubStr(s, StrLen(s) - A_Index + 1, 1)
    }
    return result
}

MsgBox ReverseStr("Hello")     ; "olleH"
```

## 多行字符串

```ahk
; 用 ( ) 延续区域创建多行字符串
longText := (
    "这是一段很长的文字，`n"
    "可以分多行书写，`n"
    "每行末尾的引号后加 `n 换行。"
)

MsgBox longText

; 用转义换行符
text := "第一行`n第二行`n第三行"
MsgBox text
```

## 字符串包含判断的常见模式

```ahk
; 方式1: InStr
if InStr(path, ".ahk")
    MsgBox "这是 AHK 脚本"

; 方式2: InStr 区分大小写
if InStr(path, ".AHK", true)
    MsgBox "扩展名是大写 AHK"

; 方式3: 正则表达式（更灵活）
if path ~= "\.ahk$"
    MsgBox "文件名以 .ahk 结尾"

; 前缀判断
if SubStr(str, 1, 5) = "Hello"
    MsgBox "以 Hello 开头"

; 后缀判断
suffix := SubStr(str, -4)
if suffix = ".ahk"
    MsgBox "以 .ahk 结尾"
```

---

**下一步**: [08-数组与对象](08-arrays-and-objects.md)
