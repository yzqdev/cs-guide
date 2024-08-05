import{_ as t,c as n,o as e,d as o}from"./app-CbULZrmi.js";const i={},a=o(`<h1 id="我的一些ahk脚本" tabindex="-1"><a class="header-anchor" href="#我的一些ahk脚本"><span>我的一些ahk脚本</span></a></h1><h2 id="原神自动点击剧情" tabindex="-1"><a class="header-anchor" href="#原神自动点击剧情"><span>原神自动点击剧情</span></a></h2><pre><code class="language-autohotkey">

UAC() 

SwitchIME(dwLayout){
    HKL:=DllCall(&quot;LoadKeyboardLayout&quot;, Str, dwLayout, UInt, 1)
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
    genshinHwnd := WinExist(&quot;ahk_exe GenshinImpact.exe&quot;)
    if not genshinHwnd
    {
        genshinHwnd := WinExist(&quot;ahk_exe YuanShen.exe&quot;)
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
    if(WinExist(&quot;A&quot;) != genshin_hwnd)
    {

        SetTimer, main, -500
        Return
    }Else{
        genshin_id :=WinActive(&quot;ahk_exe YuanShen.exe&quot;)
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
        full_command_line := DllCall(&quot;GetCommandLine&quot;, &quot;str&quot;)
        if not (A_IsAdmin or RegExMatch(full_command_line, &quot; /restart(?!\\S)&quot;))
        {
            try
            {
                if A_IsCompiled
                    Run *RunAs &quot;%A_ScriptFullPath%&quot; /restart
                else
                    Run *RunAs &quot;%A_AhkPath%&quot; /restart &quot;%A_ScriptFullPath%&quot;
            }
            ExitApp
        }
    }

</code></pre>`,3),r=[a];function s(l,c){return e(),n("div",null,r)}const u=t(i,[["render",s],["__file","my-ahk.html.vue"]]),d=JSON.parse('{"path":"/windows-tutor/autohotkey-tutor/my-ahk.html","title":"我的一些ahk脚本","lang":"zh-CN","frontmatter":{"description":"我的一些ahk脚本 原神自动点击剧情","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/my-ahk.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"我的一些ahk脚本"}],["meta",{"property":"og:description","content":"我的一些ahk脚本 原神自动点击剧情"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-29T17:54:12.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-29T17:54:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"我的一些ahk脚本\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-29T17:54:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"原神自动点击剧情","slug":"原神自动点击剧情","link":"#原神自动点击剧情","children":[]}],"git":{"createdTime":1649778835000,"updatedTime":1651254852000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.44,"words":132},"filePathRelative":"windows-tutor/autohotkey-tutor/my-ahk.md","localizedDate":"2022年4月12日","autoDesc":true}');export{u as comp,d as data};
