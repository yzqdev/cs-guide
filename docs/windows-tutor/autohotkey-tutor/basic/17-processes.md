---
order: 17
---

# 17 - 进程管理

## Run / RunWait

### Run — 运行程序

```ahk
#Requires AutoHotkey v2.0

; Run(目标, 工作目录, 选项)
Run "notepad.exe"                    ; 打开记事本
Run "calc.exe"                       ; 打开计算器
Run "C:\Program Files\App\app.exe"  ; 运行指定路径程序

; 打开网页
Run "https://www.autohotkey.com"

; 打开文件（用默认程序）
Run "C:\Users\test\document.pdf"

; 指定工作目录
Run "myapp.exe", "C:\MyApp"

; 运行选项
Run "notepad.exe", , "Max"           ; 最大化运行
Run "notepad.exe", , "Min"           ; 最小化运行
Run "notepad.exe", , "Hide"          ; 隐藏运行（不显示窗口）

; 用管理员权限运行
Run "*RunAs notepad.exe"             ; 以管理员身份运行
```

### RunWait — 运行并等待结束

```ahk
; RunWait 会等到程序退出后才继续执行脚本
RunWait "notepad.exe"
MsgBox "记事本已关闭"               ; 记事本关闭后才弹出

; 获取退出码
exitCode := RunWait("ping 127.0.0.1 -n 4")
MsgBox "ping 退出码: " exitCode      ; 0=成功
```

### Run 的选项汇总

| 选项 | 说明 |
|------|------|
| `Max` | 最大化窗口启动 |
| `Min` | 最小化窗口启动 |
| `Hide` | 隐藏窗口启动 |
| `*RunAs` | 以管理员权限运行 |

## 命令行参数

### 向脚本传递参数

```ahk
; 命令行运行: AutoHotkey64.exe script.ahk param1 param2 "long param"

; A_Args 数组接收参数
MsgBox "参数数量: " A_Args.Length
for i, arg in A_Args {
    MsgBox i ": " arg
}
```

### 向程序传递参数

```ahk
; 传递命令行参数
Run "notepad.exe C:\test.txt"           ; 打开文件
Run "cmd.exe /c dir C:\ /s"             ; CMD命令
Run "powershell -Command Get-Process"    ; PowerShell命令

; 传递多个参数
Run "myapp.exe --config config.json --verbose"
```

## 进程检测与管理

### Process 函数

```ahk
; ProcessExist — 检查进程是否存在（返回PID或0）
pid := ProcessExist("notepad.exe")
if pid
    MsgBox "记事本正在运行，PID: " pid
else
    MsgBox "记事本未运行"

; ProcessClose — 关闭进程
ProcessClose "notepad.exe"

; ProcessSetPriority — 设置优先级
ProcessSetPriority "High", "notepad.exe"    ; 高优先级
ProcessSetPriority "Low", "notepad.exe"     ; 低优先级
; 优先级: Low, BelowNormal, Normal, AboveNormal, High, RealTime

; ProcessWait — 等待进程出现
ProcessWait "notepad.exe", 10    ; 等最多10秒

; ProcessWaitClose — 等待进程退出
ProcessWaitClose "notepad.exe"
MsgBox "记事本已退出"
```

### 获取进程列表

```ahk
; 获取所有进程PID
pids := ProcessExist()    ; 返回所有进程
for i, pid in pids {
    name := ProcessGetName(pid)
    MsgBox pid ": " name
}

; 获取进程名
name := ProcessGetName(ProcessExist("notepad.exe"))
MsgBox name    ; "notepad.exe"
```

## 环境变量

```ahk
; 读取环境变量
MsgBox EnvGet("PATH")
MsgBox EnvGet("USERPROFILE")
MsgBox EnvGet("COMPUTERNAME")

; 设置环境变量（仅影响当前脚本及其子进程）
EnvSet "MY_VAR", "my_value"

; 扩展环境变量路径
MsgBox ExpandEnvStrings("%USERPROFILE%\Documents")
; → "C:\Users\yanni\Documents"
```

## Shell 操作

```ahk
; 用 Shell 执行操作
Run "explorer.exe C:\MyFolder"                    ; 打开文件夹
Run "explorer.exe /select,C:\test.txt"            ; 定位到文件

; 系统操作
Run "rundll32.exe shell32.dll,Control_RunDLL"     ; 打开控制面板
Run "sndvol.exe"                                   ; 打开音量控制

; CMD 命令
Run "cmd.exe /c ipconfig"                          ; 运行CMD命令
Run "cmd.exe /c tasklist"                          ; 查看进程列表

; PowerShell
Run "powershell -Command Get-Process | Sort-Object CPU -Descending | Select-Object -First 5"
```

## 管道与临时文件

当需要获取命令行输出时，可以用临时文件：

```ahk
; 执行命令并将输出保存到临时文件
tmpFile := A_Temp "\ahk_output.txt"
RunWait "cmd.exe /c dir C:\ > " tmpFile, , "Hide"
content := FileRead(tmpFile)
MsgBox content
FileDelete tmpFile

; 或者用 PowerShell 获取输出
RunWait 'powershell -Command "Get-Process | Out-File ' tmpFile '"', , "Hide"
content := FileRead(tmpFile)
MsgBox content
FileDelete tmpFile
```

## A_ 相关进程变量

| 变量 | 说明 |
|------|------|
| `A_Args` | 命令行参数数组 |
| `A_IsAdmin` | 是否以管理员权限运行 |
| `A_Temp` | 临时文件夹路径 |
| `A_ComSpec` | CMD 路径（通常 `C:\Windows\system32\cmd.exe`） |
| `A_WinDir` | Windows 目录路径 |
| `A_AppData` | AppData 路径 |
| `A_AppDataCommon` | 公共 AppData 路径 |
| `A_Desktop` | 桌面路径 |
| `A_DesktopCommon` | 公共桌面路径 |
| `A_Programs` | 开始菜单程序路径 |
| `A_Startup` | 启动文件夹路径 |
| `A_MyDocuments` | 我的文档路径 |

## 实用进程脚本

### 程序快速启动器

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; Alt+1~5 快速启动程序
!1:: Run "notepad.exe"
!2:: Run "calc.exe"
!3:: Run "explorer.exe C:\MyFolder"
!4:: Run "chrome.exe"
!5:: Run "C:\Program Files\VSCode\Code.exe"

; Ctrl+Alt+N — 新建记事本并写入内容
^!n:: {
    Run "notepad.exe"
    WinWait "无标题", , 3
    if WinExist("记事本") {
        Send "AutoHotkey 自动生成的文本"
    }
}
```

### 进程监控

```ahk
#Requires AutoHotkey v2.0
#SingleInstance Force

; 每5秒检查目标进程是否还在运行
SetTimer CheckProcess, 5000

CheckProcess() {
    if !ProcessExist("myapp.exe") {
        MsgBox "myapp.exe 已停止运行！"
        Run "myapp.exe"              ; 自动重启
    }
}
```

### 管理员权限检查

```ahk
#Requires AutoHotkey v2.0

if !A_IsAdmin {
    MsgBox "当前不是管理员权限，正在重新以管理员运行..."
    Run "*RunAs " A_ScriptFullPath
    ExitApp
}

MsgBox "已获取管理员权限"
```

---

**下一步**: [18-定时器与回调](18-timers.md)
