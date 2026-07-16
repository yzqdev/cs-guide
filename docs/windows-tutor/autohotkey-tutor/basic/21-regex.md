---
order: 21
---

# 21 - 正则表达式

## RegExMatch

RegExMatch 搜索字符串中匹配正则表达式的位置和内容：

```ahk
#Requires AutoHotkey v2.0

; RegExMatch(字符串, 正则表达式, 输出变量, 起始位置)
; 返回匹配位置（1开始），0表示未找到

; 基本匹配
pos := RegExMatch("Hello World 123", "\d+")
MsgBox pos   ; 13（数字"123"从第13个字符开始）

; 获取匹配内容
found := ""
pos := RegExMatch("Hello World 123", "\d+", &found)
MsgBox found   ; "123"

; 邮箱匹配
email := "Contact: user@example.com for info"
if RegExMatch(email, "[\w.]+@[\w.]+\.\w+", &match) {
    MsgBox "邮箱: " match
}
```

### 捕获组

```ahk
; 用 () 创建捕获组
text := "2024-07-16"
RegExMatch(text, "(\d{4})-(\d{2})-(\d{2})", &m)
MsgBox m[0]    ; "2024-07-16" — 整体匹配
MsgBox m[1]    ; "2024" — 第1组
MsgBox m[2]    ; "07" — 第2组
MsgBox m[3]    ; "16" — 第3组

; 提取域名
url := "https://www.autohotkey.com/docs"
RegExMatch(url, "https?://([\w.]+)", &m)
MsgBox m[1]    ; "www.autohotkey.com"

; 命名捕获组（AHK 不支持命名组，用索引代替）
```

### RegExMatch 选项

```ahk
; 第三个参数后的选项
; "i" — 不区分大小写
pos := RegExMatch("HELLO", "hello", , 1)           ; 不匹配
pos := RegExMatch("HELLO", "hello", , 1, "i")       ; 匹配（不区分大小写）

; "m" — 多行模式（^和$匹配每行的开头结尾）
; "s" — dotAll模式（.匹配换行符）
; "x" — 忽略空白和#注释
```

## RegExReplace

RegExReplace 用正则表达式替换字符串内容：

```ahk
; RegExReplace(字符串, 正则表达式, 替换文本, 替换次数, 起始位置)
; 返回替换后的字符串

; 基本替换
result := RegExReplace("Hello 123 World 456", "\d+", "NUM")
MsgBox result   ; "Hello NUM World NUM"

; 只替换1次
result := RegExReplace("Hello 123 World 456", "\d+", "NUM", 1)
MsgBox result   ; "Hello NUM World 456"

; 使用捕获组替换
result := RegExReplace("2024-07-16", "(\d{4})-(\d{2})-(\d{2})", "$2/$3/$1")
MsgBox result   ; "07/16/2024"

; 删除所有数字
result := RegExReplace("abc123def456", "\d+")
MsgBox result   ; "abcdef"

; 不区分大小写替换
result := RegExReplace("Hello HELLO hello", "hello", "Hi", , , "i")
MsgBox result   ; "Hi Hi Hi"

; 删除首尾空白
text := "  Hello World  "
result := RegExReplace(text, "^[\s]+|[\s]+$")
MsgBox result   ; "Hello World"
```

### 替换中的反向引用

```ahk
; $0 — 整体匹配
; $1 ~ $9 — 第1到9个捕获组

; 交换两个单词
result := RegExReplace("Hello World", "(\w+) (\w+)", "$2 $1")
MsgBox result   ; "World Hello"

; 给数字加括号
result := RegExReplace("Score: 95", "(\d+)", "($1)")
MsgBox result   ; "Score: (95)"
```

## 常用正则模式

### 数字

```ahk
\d          ; 任意一个数字 [0-9]
\d+         ; 一个或多个数字
\d{3}       ; 恰好3个数字
\d{2,4}     ; 2到4个数字
-?\d+       ; 可能带负号的整数
\d+\.\d+    ; 简单浮点数
```

### 字符

```ahk
\w          ; 单词字符 [a-zA-Z0-9_]
\w+         ; 一个或多个单词字符
\s          ; 空白字符（空格、Tab、换行等）
\S          ; 非空白字符
.           ; 任意字符（不含换行）
[a-z]       ; 小写字母
[A-Z]       ; 大写字母
[0-9a-fA-F] ; 十六进制字符
```

### 量词

```ahk
x?          ; 0或1个x
x*          ; 0或多个x
x+          ; 1或多个x
x{3}        ; 恰好3个x
x{3,}       ; 至少3个x
x{3,5}      ; 3到5个x
```

### 位置

```ahk
^           ; 字符串开头（或多行模式下行首）
$           ; 字符串结尾（或多行模式下行尾）
\b          ; 单词边界
\B          ; 非单词边界
```

### 常用匹配模式

```ahk
; 邮箱
pattern := "[\w.+-]+@[\w.-]+\.\w+"

; URL
pattern := "https?://[\w./-]+"

; IP 地址
pattern := "\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"

; 日期 YYYY-MM-DD
pattern := "\d{4}-\d{2}-\d{2}"

; 时间 HH:MM:SS
pattern := "\d{2}:\d{2}:\d{2}"

; 中文字符
pattern := "[\x{4e00}-\x{9fff}]"

; HTML 标签
pattern := "<[^>]+>"
```

## AHK 中正则表达式的注意事项

### AHK 使用 PCRE 库

AHK 的正则基于 PCRE（Perl Compatible Regular Expressions），支持大多数 Perl 正则特性。

### 转义字符

```ahk
; AHK 字符串中的反斜杠需要双重转义
; 正则中的 \d 在 AHK 字符串中写作 "\d"
; 正则中的 \. 在 AHK 字符串中写作 "\."

; 如果正则中有大量反斜杠，可用 `` (反引号) 字面字符串
; AHK 中没有原始字符串语法，必须手动处理转义

; 示例：匹配文件路径中的 .ahk 扩展名
RegExMatch(path, "\.ahk$")    ; 注意: \. 在AHK字符串中是 \.

; 匹配反斜杠本身
RegExMatch(path, "\\")        ; 正则中 \\ 匹配一个 \ 字符
```

### ~ 运算符

```ahk
; ~= 是正则匹配运算符（简化写法）
if (str ~= "\d+")
    MsgBox "包含数字"

; 等价于
if RegExMatch(str, "\d+")
    MsgBox "包含数字"
```

## 实用正则脚本

### 文本提取

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 从剪贴板提取所有邮箱
^!e:: {
    A_Clipboard := ""
    Send "^c"
    ClipWait 2
    emails := []
    pos := 1
    while RegExMatch(A_Clipboard, "[\w.+-]+@[\w.-]+\.\w+", &m, pos) {
        emails.Push(m[])
        pos := m.Pos + m.Len
    }
    MsgBox "找到 " emails.Length " 个邮箱"
    for i, e in emails
        MsgBox e
}
```

### 文本清理

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+Shift+C 清理选中文字的多余空白
^+c:: {
    A_Clipboard := ""
    Send "^c"
    ClipWait 2
    text := A_Clipboard
    ; 去除每行首尾空白
    text := RegExReplace(text, "^[\s]+|[\s]+$", "")
    ; 多个空格合并为一个
    text := RegExReplace(text, "[ ]{2,}", " ")
    ; 多个空行合并为一个
    text := RegExReplace(text, "(\r?\n){3,}", "$1$1")
    A_Clipboard := text
    Send "^v"
}
```

### 数据格式化

```ahk
; 格式化日期
raw := "20240716"
formatted := RegExReplace(raw, "(\d{4})(\d{2})(\d{2})", "$1-$2-$3")
MsgBox formatted   ; "2024-07-16"

; 格式化电话号码
phone := "13812345678"
formatted := RegExReplace(phone, "(\d{3})(\d{4})(\d{4})", "$1-$2-$3")
MsgBox formatted   ; "138-1234-5678"
```

---

**下一步**: [22-错误处理与调试](22-error-handling.md)
