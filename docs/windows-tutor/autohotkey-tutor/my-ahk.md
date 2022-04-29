# 我的一些ahk脚本

## 原神自动点击剧情

```autohotkey


UAC() 

SwitchIME(dwLayout){
    HKL:=DllCall("LoadKeyboardLayout", Str, dwLayout, UInt, 1)
    ControlGetFocus,ctl,A
    SendMessage,0x50,0,HKL,%ctl%,A
}
SwitchIME(0x04090409)
autoClick( ){

    Send {Click,1492 802}

}
setClick(){
    SetTimer, autoClick, 1000
}
killClick( ){

    SetTimer, autoClick, Off

}
genshin_window_exist()
{
    genshinHwnd := WinExist("ahk_exe GenshinImpact.exe")
    if not genshinHwnd
    {
        genshinHwnd := WinExist("ahk_exe YuanShen.exe")
    }
    return genshinHwnd
}
SetTimer, main, -100
;如果窗口存在
main:
    genshin_hwnd := genshin_window_exist()

    if(!genshin_hwnd){
        SetTimer, main, -800
        Return
    }
    if(WinExist("A") != genshin_hwnd)
    {

        SetTimer, main, -500
        Return
    }Else{
        genshin_id :=WinActive("ahk_exe YuanShen.exe")
        if genshin_id{
            F11:: setClick()

            F12:: killClick( )
        }

        else{ 

            SetTimer, autoClick, Off

        }
    }
    UAC()
    {
        full_command_line := DllCall("GetCommandLine", "str")
        if not (A_IsAdmin or RegExMatch(full_command_line, " /restart(?!\S)"))
        {
            try
            {
                if A_IsCompiled
                    Run *RunAs "%A_ScriptFullPath%" /restart
                else
                    Run *RunAs "%A_AhkPath%" /restart "%A_ScriptFullPath%"
            }
            ExitApp
        }
    }

```
