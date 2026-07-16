---
order: 16
---

# 16 - 文件操作

## 文件读写

### FileRead — 读取整个文件

```ahk
#Requires AutoHotkey v2.0

; FileRead(文件路径, 选项)
content := FileRead("C:\test.txt")
MsgBox content

; 读取选项
content := FileRead("C:\test.txt", "RAW")   ; 原始二进制读取
content := FileRead("C:\test.txt", "`n")    ; 指定换行符
```

### FileWrite — 写入文件（覆盖）

```ahk
; FileWrite(内容, 文件路径)
FileWrite "Hello World`n", "C:\output.txt"

; 写入多行
text := "第一行`n第二行`n第三行`n"
FileWrite text, "C:\output.txt"
```

### FileAppend — 追加内容

```ahk
; FileAppend(内容, 文件路径)
FileAppend "追加的一行`n", "C:\log.txt"

; 追加多行
Loop 5 {
    FileAppend "第 " A_Index " 次追加`n", "C:\log.txt"
}
```

### 文件打开读写（FileObj）

```ahk
; 打开文件对象 — 更灵活的读写方式
f := FileOpen("C:\test.txt", "w")    ; "w" = 写模式
f.Write("Hello World`n")
f.Write("第二行`n")
f.Close()                            ; 必须关闭！

; 读取
f := FileOpen("C:\test.txt", "r")    ; "r" = 读模式
content := f.Read()
f.Close()

; 模式说明
; "r"  — 只读
; "w"  — 只写（覆盖）
; "a"  — 追加
; "rw" — 读写
; "h"  — 用句柄打开
```

## FileSelect 文件选择对话框

```ahk
; FileSelectFile — 选择文件
selected := FileSelect("S", "C:\", "选择文件", "文本文件 (*.txt)")
if (selected != "")
    MsgBox "选择了: " selected

; 多选模式
selected := FileSelect("M", "C:\", "选择多个文件", "所有文件 (*.*)")
for i, file in selected {
    MsgBox file
}

; FileSelectFolder — 选择文件夹
folder := FileSelectFolder("C:\", "选择文件夹")
if (folder != "")
    MsgBox "选择了: " folder
```

## 文件信息与检查

```ahk
; FileExist — 检查文件/目录是否存在
result := FileExist("C:\test.txt")
MsgBox result    ; 返回属性字符串如 "A"（归档），""表示不存在

; DirExist — 检查目录是否存在
if DirExist("C:\MyFolder")
    MsgBox "目录存在"

; FileGetSize — 文件大小
size := FileGetSize("C:\test.txt")
MsgBox "大小: " size " 字节"

; FileGetTime — 文件时间
modTime := FileGetTime("C:\test.txt", "M")   ; M=修改时间
MsgBox "修改时间: " modTime

; FileGetAttrib — 文件属性
attr := FileGetAttrib("C:\test.txt")
MsgBox "属性: " attr

; 属性字符含义:
; R = 只读, A = 归档, S = 系统, H = 隐藏, N = 普通
; D = 目录, O = 离线, T = 临时
```

## 文件操作

```ahk
; FileCopy — 复制文件
FileCopy "C:\src.txt", "C:\dst.txt", true   ; true=覆盖已存在的

; FileMove — 移动/重命名文件
FileMove "C:\old.txt", "C:\new.txt", true

; FileDelete — 删除文件
FileDelete "C:\temp.txt"

; DirCopy — 复制目录
DirCopy "C:\SrcFolder", "C:\DstFolder", true

; DirMove — 移动/重命名目录
DirMove "C:\OldFolder", "C:\NewFolder"

; DirDelete — 删除目录
DirDelete "C:\TempFolder", true   ; true=递归删除（含子目录）
```

## 文件遍历

### Loop Files

```ahk
; 遍历目录中的文件
Loop Files "C:\MyFolder\*.*" {
    MsgBox A_LoopFileName            ; 文件名
    MsgBox A_LoopFileFullPath        ; 完整路径
    MsgBox A_LoopFileExt             ; 扩展名
    MsgBox A_LoopFileSize            ; 文件大小
    MsgBox A_LoopFileAttrib          ; 属性
}

; 只遍历 .txt 文件
Loop Files "C:\MyFolder\*.txt" {
    MsgBox A_LoopFileName
}

; 递归遍历（含子目录）— 加 "R" 选项
Loop Files "C:\MyFolder\*.*", "R" {
    MsgBox A_LoopFileFullPath
}

; 只遍历目录（不含文件）— 加 "D" 选项
Loop Files "C:\MyFolder\*", "D" {
    MsgBox "[DIR] " A_LoopFileName
}

; 递历遍历目录
Loop Files "C:\MyFolder\*", "DR" {
    MsgBox "[DIR] " A_LoopFileFullPath
}
```

### Loop Files 内置变量

| 变量 | 说明 |
|------|------|
| `A_LoopFileName` | 文件名（含扩展名） |
| `A_LoopFileExt` | 扩展名（不含点） |
| `A_LoopFileFullPath` | 完整路径 |
| `A_LoopFileDir` | 文件所在目录 |
| `A_LoopFileSize` | 文件大小（字节） |
| `A_LoopFileAttrib` | 文件属性 |
| `A_LoopFileTimeModified` | 修改时间 |
| `A_LoopFileTimeCreated` | 创建时间 |
| `A_LoopFileTimeAccessed` | 访问时间 |

## INI 文件操作

INI 文件是 Windows 常用的配置文件格式：

```ini
[Section]
Key=Value
```

### INI 读写

```ahk
; IniRead(文件, 节, 键, 默认值)
value := IniRead("C:\config.ini", "Settings", "Font", "Arial")
MsgBox "字体设置: " value

; IniWrite(值, 文件, 节, 键)
IniWrite "Consolas", "C:\config.ini", "Settings", "Font"

; IniDelete(文件, 节, 键)
IniDelete "C:\config.ini", "Settings", "Font"

; 删除整个节
IniDelete "C:\config.ini", "Settings"
```

### INI 实例

```ahk
; 读取配置
configPath := A_ScriptDir "\config.ini"

fontName := IniRead(configPath, "Editor", "Font", "Consolas")
fontSize := IniRead(configPath, "Editor", "Size", 12)
autoSave := IniRead(configPath, "Editor", "AutoSave", 0)

MsgBox "Font: " fontName " Size: " fontSize " AutoSave: " autoSave

; 写入配置
IniWrite fontName, configPath, "Editor", "Font"
IniWrite fontSize, configPath, "Editor", "Size"
IniWrite autoSave, configPath, "Editor", "AutoSave"
```

## 文件编码

```ahk
; AHK v2 默认 UTF-8 编码
; FileOpen 可以指定编码
f := FileOpen("C:\test.txt", "w", "UTF-8")
f.Write("中文内容")
f.Close()

; 读取时自动检测编码
f := FileOpen("C:\test.txt", "r")
content := f.Read()
f.Close()

; 常见编码
; "UTF-8"     — UTF-8（推荐）
; "UTF-8-RAW" — UTF-8 无BOM
; "CP0"       — 系统默认编码（中文Windows = GBK）
```

## 文件路径操作

```ahk
; A_ScriptDir — 脚本所在目录（最常用）
path := A_ScriptDir "\data\config.ini"

; A_WorkingDir — 当前工作目录
MsgBox A_WorkingDir

; SetWorkingDir — 设置工作目录
SetWorkingDir "C:\MyProject"

; 路径拼接 — 用 \ 连接
fullPath := A_ScriptDir "\output\result.txt"

; 获取路径各部分
SplitPath "C:\Users\test\file.txt", &name, &dir, &ext, &nameNoExt, &drive
MsgBox "文件名: " name          ; "file.txt"
MsgBox "目录: " dir              ; "C:\Users\test"
MsgBox "扩展名: " ext            ; "txt"
MsgBox "无扩展名: " nameNoExt   ; "file"
MsgBox "驱动器: " drive          ; "C:"
```

## 实用文件脚本

### 文件搜索器

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Ctrl+Alt+F 搜索文件
^!f:: {
    folder := FileSelectFolder("", "选择搜索目录")
    if (folder = "")
        return

    pattern := InputBox("输入搜索模式 (如 *.txt)", "文件搜索")
    if (pattern = "")
        return

    results := ""
    Loop Files folder "\" pattern, "R" {
        results .= A_LoopFileFullPath "`n"
    }

    if (results = "")
        MsgBox "没有找到匹配文件"
    else
        MsgBox "找到的文件:`n" results
}
```

### 日志记录

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

logFile := A_ScriptDir "\log.txt"

LogWrite(msg) {
    timestamp := A_Now
    formatted := SubStr(timestamp, 1, 4) "/" SubStr(timestamp, 5, 2) "/" SubStr(timestamp, 7, 2)
        . " " SubStr(timestamp, 9, 2) ":" SubStr(timestamp, 11, 2) ":" SubStr(timestamp, 13, 2)
    FileAppend formatted " — " msg "`n", logFile
}

; 使用
^j:: {
    LogWrite("热键 ^j 被触发")
}

; 查看日志
^!l:: MsgBox FileRead(logFile)
```

---

**下一步**: [17-进程管理](17-processes.md)
