import{_ as e,c as t,o,d as n}from"./app-CbULZrmi.js";const a={},i=n(`<h1 id="常用的函数" tabindex="-1"><a class="header-anchor" href="#常用的函数"><span>常用的函数</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>单例模式</p><pre><code class="language-autohotkey"># SingleInstance, Force
SendMode Input
SetWorkingDir, %A_ScriptDir%
</code></pre></div><h2 id="判断窗口是否存在" tabindex="-1"><a class="header-anchor" href="#判断窗口是否存在"><span>判断窗口是否存在</span></a></h2><pre><code class="language-autohotkey">if WinActive(&quot;ahk_class Notepad&quot;) or WinActive(&quot;ahk_class&quot; ClassName)
    WinClose ; 使用 WinActive 找到的窗口.
</code></pre><h2 id="等待窗口激活" tabindex="-1"><a class="header-anchor" href="#等待窗口激活"><span>等待窗口激活</span></a></h2><pre><code class="language-autohotkey">#SingleInstance, Force
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
</code></pre>`,6),r=[i];function c(s,d){return o(),t("div",null,r)}const l=e(a,[["render",c],["__file","common-ahk.html.vue"]]),h=JSON.parse('{"path":"/windows-tutor/autohotkey-tutor/common-ahk.html","title":"常用的函数","lang":"zh-CN","frontmatter":{"description":"常用的函数 提示 单例模式 判断窗口是否存在 等待窗口激活","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/common-ahk.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"常用的函数"}],["meta",{"property":"og:description","content":"常用的函数 提示 单例模式 判断窗口是否存在 等待窗口激活"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-29T17:54:12.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-29T17:54:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常用的函数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-29T17:54:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"判断窗口是否存在","slug":"判断窗口是否存在","link":"#判断窗口是否存在","children":[]},{"level":2,"title":"等待窗口激活","slug":"等待窗口激活","link":"#等待窗口激活","children":[]}],"git":{"createdTime":1649778835000,"updatedTime":1651254852000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.25,"words":74},"filePathRelative":"windows-tutor/autohotkey-tutor/common-ahk.md","localizedDate":"2022年4月12日","autoDesc":true}');export{l as comp,h as data};
