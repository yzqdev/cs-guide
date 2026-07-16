---
order: 20
---

# 20 - DLL 调用与 COM

## DllCall

DllCall 允许 AHK 直接调用 Windows DLL 中的函数，扩展 AHK 能力到系统 API 级别：

### 基本格式

```ahk
; DllCall(函数, 类型1, 参数1, 类型2, 参数2, ..., 返回类型)
; 类型: Int, UInt, Long, ULong, Float, Double, Str, WStr, Ptr, UPtr, Int64, UInt64, Short, UShort, Char, UChar
```

### 常用 DllCall 示例

#### MessageBox（WinAPI）

```ahk
#Requires AutoHotkey v2.0

; 直接调用 MessageBoxA
result := DllCall("MessageBoxA", "Ptr", 0, "Str", "Hello from DllCall!", "Str", "标题", "UInt", 0)
MsgBox "返回值: " result   ; 1=OK
```

#### 获取系统信息

```ahk
; 获取计算机名
buf := Buffer(256)
DllCall("GetComputerNameA", "Ptr", buf, "UInt*", 256)
MsgBox "计算机名: " StrGet(buf)

; 获取用户名
buf := Buffer(256)
DllCall("GetUserNameA", "Ptr", buf, "UInt*", 256)
MsgBox "用户名: " StrGet(buf)

; 获取系统启动时间
DllCall("GetTickCount64", "Int64*", &tick)
MsgBox "系统启动 " tick / 1000 " 秒"
```

#### 窗口操作

```ahk
; 获取窗口句柄
hwnd := WinGetID("计算器")

; 设置窗口标题
DllCall("SetWindowTextA", "Ptr", hwnd, "Str", "新标题")

; 获取窗口标题长度
len := DllCall("GetWindowTextLengthA", "Ptr", hwnd)
MsgBox "标题长度: " len

; 判断窗口是否可见
visible := DllCall("IsWindowVisible", "Ptr", hwnd)
MsgBox "可见: " visible
```

#### 鼠标操作

```ahk
; 设置鼠标位置
DllCall("SetCursorPos", "Int", 500, "Int", 300)

; 获取鼠标位置
DllCall("GetCursorPos", "Int*", &x, "Int*", &y)
MsgBox "鼠标: (" x ", " y ")"
```

#### 文件操作

```ahk
; 复制文件（用 WinAPI）
DllCall("CopyFileA", "Str", "C:\src.txt", "Str", "C:\dst.txt", "UInt", 0)
; 第三个参数: 0=允许覆盖, 1=不覆盖

; 删除文件
DllCall("DeleteFileA", "Str", "C:\temp.txt")
```

### 类型对照表

| AHK 类型 | C 类型 | 说明 |
|----------|--------|------|
| `Int` | `int` | 32位有符号整数 |
| `UInt` | `unsigned int` | 32位无符号整数 |
| `Short` | `short` | 16位有符号 |
| `UShort` | `unsigned short` | 16位无符号 |
| `Char` | `char` | 8位有符号 |
| `UChar` | `unsigned char` | 8位无符号 |
| `Long` | `long` | 32位有符号 |
| `ULong` | `unsigned long` | 32位无符号 |
| `Int64` | `__int64` | 64位有符号 |
| `UInt64` | `unsigned __int64` | 64位无符号 |
| `Float` | `float` | 32位浮点 |
| `Double` | `double` | 64位浮点 |
| `Str` | `char*` | ANSI字符串 |
| `WStr` | `wchar_t*` | Unicode字符串 |
| `Ptr` | `void*` / `HWND` 等 | 指针（32/64位） |
| `UPtr` | `unsigned void*` | 无符号指针 |

### Buffer — 内存缓冲区

```ahk
; 创建内存缓冲区
buf := Buffer(256)          ; 256字节
buf := Buffer(256, 0)       ; 256字节，初始值0

; 读写缓冲区
NumPut(42, buf, 0, "Int")   ; 在偏移0写入整数42
value := NumGet(buf, 0, "Int")  ; 从偏移0读取整数
MsgBox value                 ; 42

; 字符串读写
StrPut("Hello", buf, "UTF-8")
MsgBox StrGet(buf, "UTF-8")   ; "Hello"

; 指针大小
MsgBox A_PtrSize  ; 4(32位AHK) 或 8(64位AHK)
```

### NumPut / NumGet

```ahk
buf := Buffer(32)

; NumPut(值, 缓冲区, 偏移, 类型)
NumPut(100, buf, 0, "Int")         ; 偏移0: 整数100
NumPut(3.14, buf, 4, "Float")      ; 偏移4: 浮点3.14
NumPut(99999, buf, 8, "UInt")      ; 偏移8: 无符号整数

; NumGet(缓冲区, 偏移, 类型)
MsgBox NumGet(buf, 0, "Int")       ; 100
MsgBox NumGet(buf, 4, "Float")     ; 3.14
MsgBox NumGet(buf, 8, "UInt")      ; 99999
```

## COM 对象

COM (Component Object Model) 是 Windows 的组件对象模型，AHK 可以通过 `ComObject` 创建和操控 COM 对象：

### 创建 COM 对象

```ahk
; ComObject(ProgID 或 CLSID)
; ProgID 是 COM 对象的程序标识符

; 创建 Excel 对象
excel := ComObject("Excel.Application")

; 创建 Word 对象
word := ComObject("Word.Application")

; 创建 Shell 对象
shell := ComObject("Shell.Application")

; 创建 WScript.Shell 对象
wsh := ComObject("WScript.Shell")

; 创建 FileSystemObject
fso := ComObject("Scripting.FileSystemObject")

; 创建 InternetExplorer 对象
ie := ComObject("InternetExplorer.Application")
```

### Shell 操作

```ahk
; WScript.Shell — 最常用的 COM 对象
wsh := ComObject("WScript.Shell")

; 运行程序
wsh.Run("notepad.exe")
wsh.Run("calc.exe", 1, true)   ; 1=正常窗口, true=等待

; 弹窗
wsh.Popup("Hello from COM!", 5, "标题", 64)  ; 5秒自动关闭

; 注册表读写
val := wsh.RegRead("HKCU\Software\MyApp\Setting")
wsh.RegWrite("REG_SZ", "HKCU\Software\MyApp\Setting", "NewValue")

; 环境变量
wsh.ExpandEnvironmentStrings("%USERPROFILE%")   ; 展开环境变量

; 特殊文件夹
MsgBox wsh.SpecialFolders("Desktop")             ; 桌面路径
MsgBox wsh.SpecialFolders("MyDocuments")         ; 文档路径
```

### Excel 自动化

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 创建 Excel 实例
excel := ComObject("Excel.Application")
excel.Visible := true                    ; 显示 Excel 窗口

; 新建工作簿
wb := excel.Workbooks.Add()

; 写入数据
ws := wb.ActiveSheet
ws.Cells(1, 1).Value := "姓名"
ws.Cells(1, 2).Value := "分数"
ws.Cells(2, 1).Value := "Alice"
ws.Cells(2, 2).Value := 95
ws.Cells(3, 1).Value := "Bob"
ws.Cells(3, 2).Value := 87

; 保存
wb.SaveAs(A_ScriptDir "\test.xlsx")

; 读取数据
MsgBox ws.Cells(2, 2).Value   ; 95

; 关闭（可选）
; wb.Close()
; excel.Quit()
```

### FileSystemObject

```ahk
fso := ComObject("Scripting.FileSystemObject")

; 检查文件是否存在
if fso.FileExists("C:\test.txt")
    MsgBox "文件存在"

; 检查文件夹
if fso.FolderExists("C:\MyFolder")
    MsgBox "文件夹存在"

; 获取文件信息
file := fso.GetFile("C:\test.txt")
MsgBox "文件名: " file.Name
MsgBox "大小: " file.Size " 字节"
MsgBox "路径: " file.Path

; 创建文件夹
fso.CreateFolder("C:\NewFolder")

; 复制文件
fso.CopyFile("C:\src.txt", "C:\dst.txt")

; 删除文件
fso.DeleteFile("C:\temp.txt")

; 驱动器信息
drive := fso.GetDrive("C:")
MsgBox "可用空间: " drive.AvailableSpace " 字节"
```

### Shell.Application — 窗口管理

```ahk
shell := ComObject("Shell.Application")

; 最小化所有窗口
shell.MinimizeAll()

; 撤消最小化所有窗口
shell.UndoMinimizeAll()

; 打开文件夹
shell.Explore("C:\MyFolder")

; 打开运行对话框
shell.FileRun()

; 查找文件
shell.FindFiles()

; 关闭Windows
; shell.ShutdownWindows()    ; 会弹出关机对话框
```

## COM 事件绑定

```ahk
; 创建带事件的 COM 对象
ie := ComObject("InternetExplorer.Application")

; 绑定事件
; ComObjConnect(com对象, 事件处理前缀)
; 或者用对象方式处理事件
```

## 实用 COM/DllCall 脚本

### 系统音量控制

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 获取当前音量
GetVolume() {
    ; 通过 DllCall 操作音量 API
    ; 简单方式：用 Send 发送音量键
    return 0  ; 精确获取需要更复杂的 COM 操作
}

; 增加音量
^Up:: Send "{Volume_Up}"

; 减少音量
^Down:: Send "{Volume_Down}"

; 静音切换
^M:: Send "{Volume_Mute}"
```

### 屏幕分辨率获取

```ahk
#Requires AutoHotkey v2.0

; 用 DllCall 获取精确分辨率
DllCall("GetSystemMetrics", "Int", 0, "Int")  ; SM_CXSCREEN = 0
width := DllCall("GetSystemMetrics", "Int", 0, "Int")
height := DllCall("GetSystemMetrics", "Int", 1, "Int")
MsgBox "屏幕分辨率: " width " x " height
```

### 系统空闲时间检测

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

GetIdleTime() {
    ; LASTINPUTINFO 结构
    lii := Buffer(A_PtrSize + 4)
    NumPut(A_PtrSize + 4, lii, 0, "UInt")
    DllCall("GetLastInputInfo", "Ptr", lii)
    lastInput := NumGet(lii, A_PtrSize, "UInt")
    tick := DllCall("GetTickCount", "UInt")
    return (tick - lastInput) // 1000   ; 返回秒数
}

SetTimer CheckIdle, 1000

CheckIdle() {
    idle := GetIdleTime()
    if (idle > 300)    ; 5分钟无操作
        ToolTip "空闲 " idle " 秒"
    else
        ToolTip ""
}

Esc:: ExitApp
```

---

**下一步**: [21-正则表达式](21-regex.md)
