# 常用的函数

:::tip
单例模式

```autohotkey
# SingleInstance, Force
SendMode Input
SetWorkingDir, %A_ScriptDir%
```

:::

## 判断窗口是否存在

```autohotkey
if WinActive("ahk_class Notepad") or WinActive("ahk_class" ClassName)
    WinClose ; 使用 WinActive 找到的窗口.
```

## 等待窗口激活

```autohotkey
#SingleInstance, Force
SendMode Input
SetWorkingDir, %A_ScriptDir%

Run, notepad.exe
WinWaitActive, ahk_exe Notepad3.exe, , 5
if ErrorLevel
{
    MsgBox, WinWait timed out.
    return
}
else {
    MsgBox, notepad actived!
}
```
