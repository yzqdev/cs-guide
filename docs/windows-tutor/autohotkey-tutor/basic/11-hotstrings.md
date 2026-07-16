---
order: 11
---

# 11 - 热字符串

## 热字符串基础

热字符串（Hotstrings）是输入特定文字后自动触发替换或动作的功能：

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 自动替换 — 输入 btw 后按空格/回车等触发，自动替换为 by the way
:btw::by the way

; 自动展开邮箱
:em::myemail@example.com

; 自动展开日期
:ds::
{
    Send A_YYYY "/" A_MM "/" A_DD
}
```

## 热字符串格式

```
:选项:触发文本::替换文本
```

### 触发文本

- 必须是字母、数字或符号组成的序列
- 触发条件：输入触发文本后按**结束字符**（空格、回车、Tab、标点等）

```ahk
; 输入 "btw" 然后按空格 → 自动变为 "by the way"
:btw::by the way

; 输入 "btw" 然后按回车 → 同样触发
; 输入 "btw" 然后按逗号 → 同样触发
```

### 结束字符表

| 字符 | 说明 |
|------|------|
| 空格 | 最常见触发字符 |
| `Enter` | 回车 |
| `Tab` | Tab键 |
| `, . ? ! : ;` | 标点 |
| `(` `)` | 括号 |
| `/ \` | 斜杠 |
| `-` | 连字符 |

## 热字符串选项

选项写在第一个冒号后面，控制触发行为：

### 常用选项

| 选项 | 含义 | 说明 |
|------|------|------|
| `*` | 无需结束字符 | 输入完立即触发，不用按空格等 |
| `B` | 自动退格 | 删除触发文本后再插入替换文本 |
| `C` | 区分大小写 | 触发文本必须精确匹配大小写 |
| `C1` | 不区分大小写 | 明确声明不区分（默认行为） |
| `K` | 不退格 | 不删除触发文本，直接追加替换文本 |
| `O` | 不发送替换 | 触发但只执行代码，不发送文字 |
| `R` | 发送原始文本 | 不解释 `{Enter}` 等特殊键名 |
| `S` | 不触发其他热字符串 | 防止替换文本再次触发热字符串 |
| `Z` | 重置 | 匹配失败后重置匹配状态 |

```ahk
; * 选项 — 无需结束字符，输入完立刻触发
:*:jk::just kidding        ; 输入jk立即替换

; B 选项 — 自动退格（默认行为）
::btw::by the way          ; 先删除btw，再输入by the way

; K 选项 — 不退格，追加
:K:ahk::AutoHotkey         ; 输入ahk空格 → ahkAutoHotkey

; C 选项 — 区分大小写
:C:BTW::by the way         ; 只匹配大写BTW，btw不触发

; O 选项 — 只执行代码，不发送文字
:O:log::
{
    MsgBox "log 被触发"
}

; * + O — 立即触发 + 只执行代码
:*O:exit::ExitApp           ; 输入exit立即退出
```

### 组合选项

```ahk
; *C — 无需结束字符 + 区分大小写
:*C:JK::Just Kidding

; *B0 — 无需结束字符 + 不退格（追加模式）
:*B0:sign::→signature      ; 输入sign后追加→signature

; C1 — 明确不区分大小写
:C1:btw::by the way        ; 和默认行为相同
```

## 热字符串执行代码

当替换内容不止简单文字时，用花括号写代码块：

```ahk
; 发送当前时间
:ts::
{
    Send A_Hour ":" A_Min ":" A_Sec
}

; 发送多行文本
:addr::
{
    Send "123 Main Street{Enter}Springfield, IL 62704"
}

; 执行复杂操作
:calc::
{
    WinActivate "计算器"
    if !WinExist("计算器")
        Run "calc.exe"
}
```

> 代码块的热字符串默认带 `B`（退格），会先删除触发文本。

## 热字符串上下文

```ahk
; #HotIf — 限制热字符串只在特定窗口生效
#HotIf WinActive("ahk_exe notepad.exe")
:np::Notepad Hotstring     ; 只在记事本中生效

#HotIf WinActive("ahk_exe chrome.exe")
:em::myemail@example.com   ; 只在浏览器中生效

#HotIf                      ; 恢复全局
:btw::by the way
```

## 热字符串的自动文本功能

### 快速输入常用短语

```ahk
::brb::be right back
::omg::oh my god
::imo::in my opinion
::ttyl::talk to you later
::fyi::for your information
::afaik::as far as I know
::iirc::if I recall correctly
```

### 快速输入符号

```ahk
::->::→
::<-::←
::>=::≥
::<=::≤
::!=::≠
::(::【
::)::】
```

### 快速输入代码片段

```ahk
; 快速输入 HTML 标签
::<b::<b>{Enter}</b>{Up}{End}

; 快速输入 AHK 函数定义
::fn::
{
    Send "MyFunc(param) {{`n    `n}}"
    Send "{Up}{End}"
}

; 快速输入注释
::cc::// TODO: comment here
```

## Hotstring 函数动态管理

```ahk
; 动态创建热字符串
Hotstring(":*:jk", "just kidding")    ; 创建
Hotstring(":*:jk", "Off")             ; 禁用
Hotstring(":*:jk", "On")              ; 启用
Hotstring(":*:jk")                    ; 删除

; 批量管理
Hotstring("Reset")                    ; 重置所有热字符串状态
```

## 热字符串注意事项

### 触发文本不要太短

```ahk
; 不推荐：单个字母可能导致意外触发
::a::apple              ; 输入任何包含a的单词都会匹配前缀

; 推荐：至少3个字符
::apl::apple             ; 不会意外触发

; * 选项更要小心
:*:j::just              ; 每次输入j就触发，非常危险
:*:jk::just kidding     ; 至少2个字符
```

### 避免循环触发

```ahk
; 如果替换文本包含触发文本，可能无限循环
::btw::btw, I mean...   ; 替换后的btw会再次触发！

; 使用 S 选项防止
:S:btw::by the way       ; 替换文本不会再次触发热字符串
```

### 热字符串与 Send 模式

```ahk
; 热字符串默认使用 SendInput 模式
; 如果需要改变发送模式
SetSendLevel 1            ; 提高发送级别
::btw::by the way

; R 选项 — 发送原始文本，不解释特殊键
:R:keys::{Enter}{Tab}     ; 发送字面文字 "{Enter}{Tab}" 而不是按回车和Tab
```

---

**下一步**: [12-窗口操作](12-windows.md)
