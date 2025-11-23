import{_ as s,c as a,a as p,o as e}from"./app-B6vXTniy.js";const t={};function l(c,n){return e(),a("div",null,[...n[0]||(n[0]=[p(`<h1 id="我的一些ahk脚本" tabindex="-1"><a class="header-anchor" href="#我的一些ahk脚本"><span>我的一些ahk脚本</span></a></h1><h2 id="原神自动点击剧情" tabindex="-1"><a class="header-anchor" href="#原神自动点击剧情"><span>原神自动点击剧情</span></a></h2><div class="language-autohotkey line-numbers-mode" data-highlighter="prismjs" data-ext="autohotkey"><pre><code class="language-autohotkey"><span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token function">UAC</span><span class="token punctuation">(</span><span class="token punctuation">)</span> </span>
<span class="line"></span>
<span class="line"><span class="token function">SwitchIME</span><span class="token punctuation">(</span>dwLayout<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    HKL<span class="token operator">:=</span><span class="token builtin">DllCall</span><span class="token punctuation">(</span><span class="token string">&quot;LoadKeyboardLayout&quot;</span><span class="token punctuation">,</span> Str<span class="token punctuation">,</span> dwLayout<span class="token punctuation">,</span> UInt<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token command selector">ControlGetFocus</span><span class="token punctuation">,</span>ctl<span class="token punctuation">,</span>A</span>
<span class="line">    <span class="token command selector">SendMessage</span><span class="token punctuation">,</span><span class="token number">0x50</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>HKL<span class="token punctuation">,</span><span class="token variable">%ctl%</span><span class="token punctuation">,</span>A</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token function">SwitchIME</span><span class="token punctuation">(</span><span class="token number">0x04090409</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">autoClick</span><span class="token punctuation">(</span> <span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token command selector">Send</span> <span class="token punctuation">{</span><span class="token command selector">Click</span><span class="token punctuation">,</span><span class="token number">1492</span> <span class="token number">802</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token function">setClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token command selector">SetTimer</span><span class="token punctuation">,</span> autoClick<span class="token punctuation">,</span> <span class="token number">1000</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token function">killClick</span><span class="token punctuation">(</span> <span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token command selector">SetTimer</span><span class="token punctuation">,</span> autoClick<span class="token punctuation">,</span> <span class="token keyword">Off</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token function">genshin_window_exist</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    genshinHwnd <span class="token operator">:=</span> <span class="token builtin">WinExist</span><span class="token punctuation">(</span><span class="token string">&quot;ahk_exe GenshinImpact.exe&quot;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token keyword">not</span> genshinHwnd</span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        genshinHwnd <span class="token operator">:=</span> <span class="token builtin">WinExist</span><span class="token punctuation">(</span><span class="token string">&quot;ahk_exe YuanShen.exe&quot;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token command selector">return</span> genshinHwnd</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token command selector">SetTimer</span><span class="token punctuation">,</span> main<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">100</span></span>
<span class="line"><span class="token comment">;如果窗口存在</span></span>
<span class="line"><span class="token tag">main</span><span class="token punctuation">:</span></span>
<span class="line">    genshin_hwnd <span class="token operator">:=</span> <span class="token function">genshin_window_exist</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>genshin_hwnd<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token command selector">SetTimer</span><span class="token punctuation">,</span> main<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">800</span></span>
<span class="line">        <span class="token command selector">Return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token builtin">WinExist</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span> <span class="token operator">!=</span> genshin_hwnd<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">        <span class="token command selector">SetTimer</span><span class="token punctuation">,</span> main<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">500</span></span>
<span class="line">        <span class="token command selector">Return</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token keyword">Else</span><span class="token punctuation">{</span></span>
<span class="line">        genshin_id <span class="token operator">:=</span><span class="token builtin">WinActive</span><span class="token punctuation">(</span><span class="token string">&quot;ahk_exe YuanShen.exe&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">if</span> genshin_id<span class="token punctuation">{</span></span>
<span class="line">            <span class="token symbol">F11</span><span class="token punctuation">:</span><span class="token punctuation">:</span> <span class="token function">setClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">            <span class="token symbol">F12</span><span class="token punctuation">:</span><span class="token punctuation">:</span> <span class="token function">killClick</span><span class="token punctuation">(</span> <span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">else</span><span class="token punctuation">{</span> </span>
<span class="line"></span>
<span class="line">            <span class="token command selector">SetTimer</span><span class="token punctuation">,</span> autoClick<span class="token punctuation">,</span> <span class="token keyword">Off</span></span>
<span class="line"></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token function">UAC</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        full_command_line <span class="token operator">:=</span> <span class="token builtin">DllCall</span><span class="token punctuation">(</span><span class="token string">&quot;GetCommandLine&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;str&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token punctuation">(</span><span class="token constant">A_IsAdmin</span> or <span class="token builtin">RegExMatch</span><span class="token punctuation">(</span>full_command_line<span class="token punctuation">,</span> <span class="token string">&quot; /restart(?!\\S)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">try</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">if</span> <span class="token constant">A_IsCompiled</span></span>
<span class="line">                    <span class="token command selector">Run</span> <span class="token operator">*</span><span class="token command selector">RunAs</span> <span class="token string">&quot;%A_ScriptFullPath%&quot;</span> <span class="token operator">/</span>restart</span>
<span class="line">                <span class="token keyword">else</span></span>
<span class="line">                    <span class="token command selector">Run</span> <span class="token operator">*</span><span class="token command selector">RunAs</span> <span class="token string">&quot;%A_AhkPath%&quot;</span> <span class="token operator">/</span>restart <span class="token string">&quot;%A_ScriptFullPath%&quot;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            <span class="token command selector">ExitApp</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)])])}const o=s(t,[["render",l]]),u=JSON.parse('{"path":"/windows-tutor/autohotkey-tutor/my-ahk.html","title":"我的一些ahk脚本","lang":"zh-CN","frontmatter":{"description":"我的一些ahk脚本 原神自动点击剧情","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"我的一些ahk脚本\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-29T17:54:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/my-ahk.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"我的一些ahk脚本"}],["meta",{"property":"og:description","content":"我的一些ahk脚本 原神自动点击剧情"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-29T17:54:12.000Z"}],["meta",{"property":"article:modified_time","content":"2022-04-29T17:54:12.000Z"}]]},"git":{"createdTime":1649778835000,"updatedTime":1651254852000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.44,"words":132},"filePathRelative":"windows-tutor/autohotkey-tutor/my-ahk.md","autoDesc":true}');export{o as comp,u as data};
