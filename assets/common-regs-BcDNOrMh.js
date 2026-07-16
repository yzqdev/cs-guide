import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/windows-tutor/windows-tips/common-regs.html","title":"windows常用注册表","lang":"zh-CN","frontmatter":{"description":"windows常用注册表 提示 常用注册表管理工具 regedit https://registry-finder.com/ registry workshop(收费) 常见问题 在使用电脑过程中，很多时候为了设置系统会使用注册表导入操作，但是有时用户会发现，如我们导入一些添加右键菜单功能的注册表，左导入之后菜单、选项变成乱码的问题，那么这是怎么回事，...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"windows常用注册表\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-03T01:01:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/windows-tips/common-regs.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"windows常用注册表"}],["meta",{"property":"og:description","content":"windows常用注册表 提示 常用注册表管理工具 regedit https://registry-finder.com/ registry workshop(收费) 常见问题 在使用电脑过程中，很多时候为了设置系统会使用注册表导入操作，但是有时用户会发现，如我们导入一些添加右键菜单功能的注册表，左导入之后菜单、选项变成乱码的问题，那么这是怎么回事，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-03T01:01:21.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-03T01:01:21.000Z"}]]},"git":{"createdTime":1647861419000,"updatedTime":1783040481000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":7,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":6.16,"words":1849},"filePathRelative":"windows-tutor/windows-tips/common-regs.md","autoDesc":true}`),a={name:`common-regs.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="windows常用注册表" tabindex="-1"><a class="header-anchor" href="#windows常用注册表"><span>windows常用注册表</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>常用注册表管理工具 regedit <a href="https://registry-finder.com/" target="_blank" rel="noopener noreferrer">https://registry-finder.com/</a> registry workshop(收费)</p></div><h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题"><span>常见问题</span></a></h2><p>在使用电脑过程中，很多时候为了设置系统会使用注册表导入操作，但是有时用户会发现，如我们导入一些添加右键菜单功能的注册表，左导入之后菜单、选项变成乱码的问题，那么这是怎么回事，如何解决呢。</p><p><img src="/cs-guide/assets/pic3-YX68-Xqf.jpg" alt="pic"></p><p>解决方法： 1、Windows 10的记事本不断升级有了更多功能，但它也改变了默认保存文件的编码，以前默认的编码是ANSI，但现在默认保存文件的编码是UTF-8。</p><p><img src="/cs-guide/assets/pic2-DCbyAWYN.jpg" alt="pic"></p><p>记事本非常的轻巧，但使用它编辑保存reg文件需要注意编码问题，将使用UTF-8保存的reg文件导入注册表会出现中文乱码。</p><p>2、避免中文乱码的方法也很简单，在记事本中将reg文件另存为，使用ANSI或UTF-16 LE编码保存即可，其中UTF-16 LE是系统导出注册表文件的默认编码。</p><p><img src="/cs-guide/assets/pic1-mFw-Hs39.jpg" alt="pic"></p><p>3、保存后重新导入，可以看到添加的中文菜单已正常显示。</p><h2 id="右键菜单增强" tabindex="-1"><a class="header-anchor" href="#右键菜单增强"><span>右键菜单增强</span></a></h2><h3 id="添加-用vs-code打开" tabindex="-1"><a class="header-anchor" href="#添加-用vs-code打开"><span>添加&quot;用VS Code打开&quot;</span></a></h3><div class="language-reg line-numbers-mode" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[HKEY_CLASSES_ROOT\\*\\shell\\VSCode]</span>
<span class="line">@=&quot;用 VS Code 打开&quot;</span>
<span class="line">&quot;Icon&quot;=&quot;D:\\\\Program Files\\\\Microsoft VS Code\\\\Code.exe&quot;</span>
<span class="line"></span>
<span class="line">[HKEY_CLASSES_ROOT\\*\\shell\\VSCode\\command]</span>
<span class="line">@=&quot;\\&quot;D:\\\\Program Files\\\\Microsoft VS Code\\\\Code.exe\\&quot; \\&quot;%1\\&quot;&quot;</span>
<span class="line"></span>
<span class="line">[HKEY_CLASSES_ROOT\\Directory\\shell\\VSCode]</span>
<span class="line">@=&quot;用 VS Code 打开文件夹&quot;</span>
<span class="line">&quot;Icon&quot;=&quot;D:\\\\Program Files\\\\Microsoft VS Code\\\\Code.exe&quot;</span>
<span class="line"></span>
<span class="line">[HKEY_CLASSES_ROOT\\Directory\\shell\\VSCode\\command]</span>
<span class="line">@=&quot;\\&quot;D:\\\\Program Files\\\\Microsoft VS Code\\\\Code.exe\\&quot; \\&quot;%1\\&quot;&quot;</span>
<span class="line"></span>
<span class="line">[HKEY_CLASSES_ROOT\\Directory\\Background\\shell\\VSCode]</span>
<span class="line">@=&quot;用 VS Code 打开&quot;</span>
<span class="line">&quot;Icon&quot;=&quot;D:\\\\Program Files\\\\Microsoft VS Code\\\\Code.exe&quot;</span>
<span class="line"></span>
<span class="line">[HKEY_CLASSES_ROOT\\Directory\\Background\\shell\\VSCode\\command]</span>
<span class="line">@=&quot;\\&quot;D:\\\\Program Files\\\\Microsoft VS Code\\\\Code.exe\\&quot; \\&quot;%V\\&quot;&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：将 <code>D:\\\\Program Files\\\\Microsoft VS Code\\\\Code.exe</code> 替换为你的 VS Code 实际安装路径。</p></blockquote><h3 id="添加-open-terminal-here-在当前目录打开终端" tabindex="-1"><a class="header-anchor" href="#添加-open-terminal-here-在当前目录打开终端"><span>添加&quot;Open Terminal Here&quot;（在当前目录打开终端）</span></a></h3><div class="language-reg line-numbers-mode" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[HKEY_CLASSES_ROOT\\Directory\\Background\\shell\\wt]</span>
<span class="line">@=&quot;在此处打开终端&quot;</span>
<span class="line">&quot;Icon&quot;=&quot;C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.WindowsTerminal_*\\\\WindowsTerminal.exe&quot;</span>
<span class="line"></span>
<span class="line">[HKEY_CLASSES_ROOT\\Directory\\Background\\shell\\wt\\command]</span>
<span class="line">@=&quot;\\&quot;C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.WindowsTerminal_*\\\\WindowsTerminal.exe\\&quot; -d \\&quot;%V\\&quot;&quot;</span>
<span class="line"></span>
<span class="line">[HKEY_CLASSES_ROOT\\Directory\\shell\\wt]</span>
<span class="line">@=&quot;在此处打开终端&quot;</span>
<span class="line">&quot;Icon&quot;=&quot;C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.WindowsTerminal_*\\\\WindowsTerminal.exe&quot;</span>
<span class="line"></span>
<span class="line">[HKEY_CLASSES_ROOT\\Directory\\shell\\wt\\command]</span>
<span class="line">@=&quot;\\&quot;C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.WindowsTerminal_*\\\\WindowsTerminal.exe\\&quot; -d \\&quot;%1\\&quot;&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：路径中的星号 <code>*</code> 请替换为实际版本号，可在 <code>C:\\Program Files\\WindowsApps\\</code> 下查看。</p></blockquote><h3 id="添加-复制文件路径-到右键菜单" tabindex="-1"><a class="header-anchor" href="#添加-复制文件路径-到右键菜单"><span>添加&quot;复制文件路径&quot;到右键菜单</span></a></h3><div class="language-reg line-numbers-mode" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[HKEY_CLASSES_ROOT\\*\\shell\\copypath]</span>
<span class="line">@=&quot;复制文件路径&quot;</span>
<span class="line">&quot;Icon&quot;=&quot;imageres.dll,19&quot;</span>
<span class="line"></span>
<span class="line">[HKEY_CLASSES_ROOT\\*\\shell\\copypath\\command]</span>
<span class="line">@=&quot;mshta VBScript:ClipboardData.SetData(\\&quot;text\\&quot;,\\&quot;%1\\&quot;)(close)&quot;</span>
<span class="line"></span>
<span class="line">[HKEY_CLASSES_ROOT\\Directory\\shell\\copypath]</span>
<span class="line">@=&quot;复制文件夹路径&quot;</span>
<span class="line">&quot;Icon&quot;=&quot;imageres.dll,19&quot;</span>
<span class="line"></span>
<span class="line">[HKEY_CLASSES_ROOT\\Directory\\shell\\copypath\\command]</span>
<span class="line">@=&quot;mshta VBScript:ClipboardData.SetData(\\&quot;text\\&quot;,\\&quot;%1\\&quot;)(close)&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除-用画图3d编辑-删除无用右键菜单项" tabindex="-1"><a class="header-anchor" href="#删除-用画图3d编辑-删除无用右键菜单项"><span>删除&quot;用画图3D编辑&quot;（删除无用右键菜单项）</span></a></h3><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">; 删除&quot;用画图3D编辑&quot;</span>
<span class="line">[-HKEY_CLASSES_ROOT\\SystemFileAssociatives\\.bmp\\Shell\\3D Edit]</span>
<span class="line">[-HKEY_CLASSES_ROOT\\SystemFileAssociatives\\.gif\\Shell\\3D Edit]</span>
<span class="line">[-HKEY_CLASSES_ROOT\\SystemFileAssociatives\\.jpg\\Shell\\3D Edit]</span>
<span class="line">[-HKEY_CLASSES_ROOT\\SystemFileAssociatives\\.jpeg\\Shell\\3D Edit]</span>
<span class="line">[-HKEY_CLASSES_ROOT\\SystemFileAssociatives\\.png\\Shell\\3D Edit]</span>
<span class="line">[-HKEY_CLASSES_ROOT\\SystemFileAssociatives\\.tif\\Shell\\3D Edit]</span>
<span class="line">[-HKEY_CLASSES_ROOT\\SystemFileAssociatives\\.tiff\\Shell\\3D Edit]</span>
<span class="line"></span></code></pre></div><h3 id="删除-使用windows-defender扫描" tabindex="-1"><a class="header-anchor" href="#删除-使用windows-defender扫描"><span>删除&quot;使用Windows Defender扫描&quot;</span></a></h3><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[-HKEY_CLASSES_ROOT\\*\\shellex\\ContextMenuHandlers\\EPP]</span>
<span class="line">[-HKEY_CLASSES_ROOT\\Directory\\shellex\\ContextMenuHandlers\\EPP]</span>
<span class="line">[-HKEY_CLASSES_ROOT\\Drive\\shellex\\ContextMenuHandlers\\EPP]</span>
<span class="line"></span></code></pre></div><h3 id="删除-包含到库-右键菜单" tabindex="-1"><a class="header-anchor" href="#删除-包含到库-右键菜单"><span>删除&quot;包含到库&quot;右键菜单</span></a></h3><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[-HKEY_CLASSES_ROOT\\Folder\\shellex\\ContextMenuHandlers\\LibraryLocation]</span>
<span class="line"></span></code></pre></div><h3 id="删除-还原以前的版本-右键菜单" tabindex="-1"><a class="header-anchor" href="#删除-还原以前的版本-右键菜单"><span>删除&quot;还原以前的版本&quot;右键菜单</span></a></h3><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[-HKEY_CLASSES_ROOT\\AllFilesystemObjects\\shellex\\ContextMenuHandlers\\{596AB062-B4D2-4215-9F74-E9109B0A8153}]</span>
<span class="line"></span></code></pre></div><h3 id="删除-授予访问权限-右键菜单" tabindex="-1"><a class="header-anchor" href="#删除-授予访问权限-右键菜单"><span>删除&quot;授予访问权限&quot;右键菜单</span></a></h3><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[-HKEY_CLASSES_ROOT\\AllFilesystemObjects\\shellex\\ContextMenuHandlers\\Sharing]</span>
<span class="line"></span></code></pre></div><h3 id="禁用windows自动重启" tabindex="-1"><a class="header-anchor" href="#禁用windows自动重启"><span>禁用Windows自动重启</span></a></h3><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU]</span>
<span class="line">&quot;NoAutoRebootWithLoggedOnUsers&quot;=dword:00000001</span>
<span class="line">&quot;AUOptions&quot;=dword:00000002</span>
<span class="line">&quot;ScheduledInstallDay&quot;=dword:00000000</span>
<span class="line">&quot;ScheduledInstallTime&quot;=dword:00000003</span>
<span class="line"></span></code></pre></div><h3 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化"><span>性能优化</span></a></h3><h3 id="禁用透明效果" tabindex="-1"><a class="header-anchor" href="#禁用透明效果"><span>禁用透明效果</span></a></h3><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize]</span>
<span class="line">&quot;EnableTransparency&quot;=dword:00000000</span>
<span class="line"></span></code></pre></div><h3 id="禁用动画效果" tabindex="-1"><a class="header-anchor" href="#禁用动画效果"><span>禁用动画效果</span></a></h3><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[HKEY_CURRENT_USER\\Control Panel\\Desktop]</span>
<span class="line">&quot;MenuShowDelay&quot;=&quot;0&quot;</span>
<span class="line">&quot;WaitToKillAppTimeout&quot;=&quot;2000&quot;</span>
<span class="line">&quot;HungAppTimeout&quot;=&quot;2000&quot;</span>
<span class="line">&quot;AutoEndTasks&quot;=&quot;1&quot;</span>
<span class="line"></span>
<span class="line">[HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced]</span>
<span class="line">&quot;DisallowShaking&quot;=dword:00000001</span>
<span class="line"></span></code></pre></div><h3 id="禁用windows-search索引-节省cpu" tabindex="-1"><a class="header-anchor" href="#禁用windows-search索引-节省cpu"><span>禁用Windows Search索引（节省CPU）</span></a></h3><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search]</span>
<span class="line">&quot;AllowIndexingEncryptedStoresOrItems&quot;=dword:00000000</span>
<span class="line">&quot;PreventIndexOnBattery&quot;=dword:00000001</span>
<span class="line">&quot;PreventIndexingLowDiskSpaceMB&quot;=dword:00000005</span>
<span class="line"></span></code></pre></div><h3 id="禁用windows-ink工作区" tabindex="-1"><a class="header-anchor" href="#禁用windows-ink工作区"><span>禁用Windows Ink工作区</span></a></h3><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[HKEY_CURRENT_USER\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsInkWorkspace]</span>
<span class="line">&quot;AllowWindowsInkWorkspace&quot;=dword:00000000</span>
<span class="line">&quot;AllowSuggestedAppsInWindowsInkWorkspace&quot;=dword:00000000</span>
<span class="line"></span></code></pre></div><h2 id="高级功能" tabindex="-1"><a class="header-anchor" href="#高级功能"><span>高级功能</span></a></h2><h3 id="启用windows上帝模式-god-mode" tabindex="-1"><a class="header-anchor" href="#启用windows上帝模式-god-mode"><span>启用Windows上帝模式（God Mode）</span></a></h3><p>创建一个新文件夹，重命名为（包括花括号）：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">GodMode.{ED7BA470-8E54-465E-825C-99712043E01C}</span>
<span class="line"></span></code></pre></div><p>这不是注册表操作，但效果类似，会在文件夹中显示所有系统设置。</p><h3 id="禁用uac-用户账户控制" tabindex="-1"><a class="header-anchor" href="#禁用uac-用户账户控制"><span>禁用UAC（用户账户控制）</span></a></h3><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System]</span>
<span class="line">&quot;EnableLUA&quot;=dword:00000000</span>
<span class="line">&quot;ConsentPromptBehaviorAdmin&quot;=dword:00000000</span>
<span class="line">&quot;PromptOnSecureDesktop&quot;=dword:00000000</span>
<span class="line"></span></code></pre></div><blockquote><p>警告：禁用UAC会降低系统安全性，请谨慎操作。</p></blockquote><h3 id="加快关机速度" tabindex="-1"><a class="header-anchor" href="#加快关机速度"><span>加快关机速度</span></a></h3><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control]</span>
<span class="line">&quot;WaitToKillServiceTimeout&quot;=&quot;2000&quot;</span>
<span class="line"></span>
<span class="line">[HKEY_CURRENT_USER\\Control Panel\\Desktop]</span>
<span class="line">&quot;HungAppTimeout&quot;=&quot;2000&quot;</span>
<span class="line">&quot;WaitToKillAppTimeout&quot;=&quot;2000&quot;</span>
<span class="line">&quot;AutoEndTasks&quot;=&quot;1&quot;</span>
<span class="line"></span></code></pre></div><h3 id="网络优化" tabindex="-1"><a class="header-anchor" href="#网络优化"><span>网络优化</span></a></h3><h3 id="禁用ipv6-部分场景需要" tabindex="-1"><a class="header-anchor" href="#禁用ipv6-部分场景需要"><span>禁用IPv6（部分场景需要）</span></a></h3><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip6\\Parameters]</span>
<span class="line">&quot;DisabledComponents&quot;=dword:000000ff</span>
<span class="line"></span></code></pre></div><h3 id="禁用tcp自动调优" tabindex="-1"><a class="header-anchor" href="#禁用tcp自动调优"><span>禁用TCP自动调优</span></a></h3><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters]</span>
<span class="line">&quot;EnableTCPA&quot;=dword:00000000</span>
<span class="line">&quot;TCPWindowSize&quot;=dword:0000ffff</span>
<span class="line"></span></code></pre></div><h3 id="禁用windows更新p2p分发-节省带宽" tabindex="-1"><a class="header-anchor" href="#禁用windows更新p2p分发-节省带宽"><span>禁用Windows更新P2P分发（节省带宽）</span></a></h3><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line"></span>
<span class="line">[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeliveryOptimization\\Config]</span>
<span class="line">&quot;DODownloadMode&quot;=dword:00000000</span>
<span class="line">&quot;DOAbsoluteMaxCacheSize&quot;=dword:00000000</span>
<span class="line">&quot;DOMaxCacheAge&quot;=dword:00000000</span>
<span class="line"></span></code></pre></div><h2 id="常用网络命令对应的注册表路径" tabindex="-1"><a class="header-anchor" href="#常用网络命令对应的注册表路径"><span>常用网络命令对应的注册表路径</span></a></h2><h3 id="修改hosts文件" tabindex="-1"><a class="header-anchor" href="#修改hosts文件"><span>修改Hosts文件</span></a></h3><p>路径：<code>C:\\Windows\\System32\\drivers\\etc\\hosts</code></p><p>（Hosts文件不是注册表，但作用类似，用于域名解析覆盖）</p><h3 id="重置网络配置-等效于cmd命令" tabindex="-1"><a class="header-anchor" href="#重置网络配置-等效于cmd命令"><span>重置网络配置（等效于cmd命令）</span></a></h3><div class="language-bat" data-highlighter="prismjs" data-ext="bat"><pre><code class="language-bat"><span class="line">netsh int ip reset</span>
<span class="line">netsh winsock reset</span>
<span class="line">ipconfig /flushdns</span>
<span class="line"></span></code></pre></div><p>对应的注册表项：</p><ul><li><code>HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters</code></li><li><code>HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Winsock</code></li><li><code>HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Winsock2</code></li></ul><h2 id="常用的注册表" tabindex="-1"><a class="header-anchor" href="#常用的注册表"><span>常用的注册表</span></a></h2><p>添加用记事本打开</p><div class="language-regex" data-highlighter="prismjs" data-ext="regex"><pre><code class="language-regex"><span class="line">Windows Registry Editor Version 5<span class="token char-set class-name">.</span>00</span>
<span class="line"><span class="token char-class"><span class="token char-class-punctuation punctuation">[</span>HKEY_LOCAL_MACHINE<span class="token char-set class-name">\\S</span>OFTWARE<span class="token escape">\\M</span>icrosoft<span class="token char-set class-name">\\W</span>indows NT<span class="token escape">\\C</span>urrentVersion<span class="token escape">\\I</span>mage File Execution Options<span class="token escape">\\n</span>otepad.exe<span class="token char-class-punctuation punctuation">]</span></span></span>
<span class="line">&quot;Debugger&quot;=&quot;<span class="token escape">\\&quot;</span>D:<span class="token special-escape escape">\\\\</span><span class="token special-escape escape">\\\\</span>Program Files<span class="token special-escape escape">\\\\</span><span class="token special-escape escape">\\\\</span>Notepad3<span class="token special-escape escape">\\\\</span><span class="token special-escape escape">\\\\</span>Notepad3<span class="token char-set class-name">.</span>exe<span class="token escape">\\&quot;</span> /z&quot;</span>
<span class="line"><span class="token char-class"><span class="token char-class-punctuation punctuation">[</span>HKEY_CLASSES_ROOT<span class="token special-escape escape">\\*</span><span class="token char-set class-name">\\s</span>hell<span class="token escape">\\用</span>记事本打开<span class="token char-class-punctuation punctuation">]</span></span></span>
<span class="line">&quot;Icon&quot;=&quot;D:<span class="token special-escape escape">\\\\</span>Program Files<span class="token special-escape escape">\\\\</span>Notepad3<span class="token special-escape escape">\\\\</span>Notepad3<span class="token char-set class-name">.</span>exe&quot;</span>
<span class="line">@=&quot;用记事本打开&quot;</span>
<span class="line"><span class="token char-class"><span class="token char-class-punctuation punctuation">[</span>HKEY_CLASSES_ROOT<span class="token special-escape escape">\\*</span><span class="token char-set class-name">\\s</span>hell<span class="token escape">\\用</span>记事本打开<span class="token escape">\\co</span>mmand<span class="token char-class-punctuation punctuation">]</span></span></span>
<span class="line">@=&quot;notepad %1 &quot;</span>
<span class="line"></span></code></pre></div><p>txt拓展无法用记事本打开</p><div class="language-reg" data-highlighter="prismjs" data-ext="reg"><pre><code class="language-reg"><span class="line">Windows Registry Editor Version 5.00</span>
<span class="line">[HKEY_CLASSES_ROOT\\.txt]</span>
<span class="line">@=&quot;txtfile&quot;</span>
<span class="line">&quot;Content Type&quot;=&quot;text/plain&quot;</span>
<span class="line">[HKEY_CLASSES_ROOT\\.txt\\ShellNew]</span>
<span class="line">&quot;NullFile&quot;=&quot;&quot; [HKEY_CLASSES_ROOT\\txtfile]</span>
<span class="line">@=&quot;文本文档&quot;</span>
<span class="line">[HKEY_CLASSES_ROOT\\txtfile\\shell]</span>
<span class="line">[HKEY_CLASSES_ROOT\\txtfile\\shell\\open]</span>
<span class="line">[HKEY_CLASSES_ROOT\\txtfile\\shell\\open\\command]</span>
<span class="line">@=&quot;NOTEPAD.EXE %1&quot;</span>
<span class="line"></span></code></pre></div><h2 id="注册表相关" tabindex="-1"><a class="header-anchor" href="#注册表相关"><span>注册表相关</span></a></h2><p>1.打开注册表键：<code>HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FileExts\\.extension\\OpenWithList .extension</code>指你所要修改的文件扩展名。删除值和你所要去掉的程序名称相同的键就可以了。</p><p>2.在工具---文件夹选项---文件类型---把不要的文件类型删除</p><p>3.打开注册表编辑器，在<code>[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FileExts]</code>和<code>[HKEY_CLASSES_ROOT＼SystemFileAssociations]</code>分支下中找到相应扩展名分支，然后在“OpenWithList”项中删除不需要的键值或项即可。</p><p>以上三种方法全是删除“打开方式”中的图标的。</p><p>在<code>HKEY_CLASSES_ROOT\\Applications</code>里可以删除“打开方式－选择程序－其他程序”中的无用的程序的。打开<code>HKEY_CLASSES_ROOT\\Applications</code>，找到你要删除的打开方式的程序，再找到你不想让它支持的扩展名并删除。 通过在我机子上对.mp3,.wma,.wmv等格式文件的试验，我发现对于不同的软件写入注册表的位置和方式是不同的，所以解决方法也不同，上面三种方法你都试一下。不懂注册表的话先了解一下，修改注册表前先备份，以防万一。</p><h2 id="notepad镜像" tabindex="-1"><a class="header-anchor" href="#notepad镜像"><span>notepad镜像</span></a></h2><p><code>HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\notepad.exe</code> 修改这个可以通过notepad命令执行你添加的程序</p><h2 id="修改拓展名对应打开的软件" tabindex="-1"><a class="header-anchor" href="#修改拓展名对应打开的软件"><span>修改拓展名对应打开的软件</span></a></h2><p><code>HKEY_CLASSES_ROOT\\txtfile\\shell\\open\\command</code>类似这样的,可以自行查看 <code>HKEY_CLASSES_ROOT\\.yml</code>查看拓展名 <code>HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FileExts\\.json\\OpenWithList</code> 这里显示openwithlist</p><h3 id="修改文件默认打开方式" tabindex="-1"><a class="header-anchor" href="#修改文件默认打开方式"><span>修改文件默认打开方式</span></a></h3><p>推荐使用filetypes manager 请百度搜索<code>修改注册表实现文件默认打开方式</code> 例如<a href="https://blog.csdn.net/a302549450/article/details/84308175" target="_blank" rel="noopener noreferrer">链接</a><code>HKEY_CLASSES_ROOT\\xmlfile\\shell\\Open\\command</code>,把里面的<code>默认</code>的值改为<code>&quot;C:\\Program Files\\Kate\\bin\\kate.exe&quot; %1</code></p>`,83)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};