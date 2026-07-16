import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/tools/vscode/05-terminal.html","title":"05 — 集成终端","lang":"zh-CN","frontmatter":{"description":"05 — 集成终端 VS Code 的集成终端让你无需在编辑器与外部终端之间切换，还支持多 Tab、分屏、自定义 Shell 等高级功能。 5.1 基本操作 5.2 多 Shell 配置 你可以在 VS Code 中同时使用多个不同的 Shell（如 Git Bash、PowerShell、CMD、WSL），并根据需要切换。 配置方案 切换 Shell...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"05 — 集成终端\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/tools/vscode/05-terminal.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"05 — 集成终端"}],["meta",{"property":"og:description","content":"05 — 集成终端 VS Code 的集成终端让你无需在编辑器与外部终端之间切换，还支持多 Tab、分屏、自定义 Shell 等高级功能。 5.1 基本操作 5.2 多 Shell 配置 你可以在 VS Code 中同时使用多个不同的 Shell（如 Git Bash、PowerShell、CMD、WSL），并根据需要切换。 配置方案 切换 Shell..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.72,"words":817},"filePathRelative":"windows-tutor/tools/vscode/05-terminal.md","autoDesc":true}`),u={name:`05-terminal.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[6]||=n(`<h1 id="_05-—-集成终端" tabindex="-1"><a class="header-anchor" href="#_05-—-集成终端"><span>05 — 集成终端</span></a></h1><blockquote><p>VS Code 的集成终端让你无需在编辑器与外部终端之间切换，还支持多 Tab、分屏、自定义 Shell 等高级功能。</p></blockquote><hr><h2 id="_5-1-基本操作" tabindex="-1"><a class="header-anchor" href="#_5-1-基本操作"><span>5.1 基本操作</span></a></h2><table><thead><tr><th>操作</th><th>快捷键 / 方式</th></tr></thead><tbody><tr><td>打开/切换终端</td><td><code>Ctrl+\`</code></td></tr><tr><td>新建终端</td><td><code>Ctrl+Shift+</code> \`</td></tr><tr><td>关闭当前终端</td><td><code>Ctrl+W</code>（在终端聚焦时）</td></tr><tr><td>切换终端 Tab</td><td><code>Ctrl+Tab</code> / <code>Ctrl+Shift+Tab</code></td></tr><tr><td>清屏</td><td><code>Ctrl+L</code> 或输入 <code>clear</code></td></tr><tr><td>复制选中</td><td><code>Ctrl+Shift+C</code></td></tr><tr><td>粘贴</td><td><code>Ctrl+Shift+V</code></td></tr><tr><td>滚动</td><td><code>Ctrl+↑/↓</code></td></tr><tr><td>搜索终端内容</td><td><code>Ctrl+Shift+F</code>（在终端聚焦时）</td></tr><tr><td>终端分屏</td><td>点击 Tab 右侧的 <strong>Split</strong> 按钮 或 <code>Ctrl+Shift+5</code></td></tr></tbody></table><hr><h2 id="_5-2-多-shell-配置" tabindex="-1"><a class="header-anchor" href="#_5-2-多-shell-配置"><span>5.2 多 Shell 配置</span></a></h2><p>你可以在 VS Code 中同时使用多个不同的 Shell（如 Git Bash、PowerShell、CMD、WSL），并根据需要切换。</p><h3 id="配置方案" tabindex="-1"><a class="header-anchor" href="#配置方案"><span>配置方案</span></a></h3><div class="language-jsonc line-numbers-mode" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">// settings.json</span>
<span class="line">{</span>
<span class="line">  &quot;terminal.integrated.defaultProfile.windows&quot;: &quot;Git Bash&quot;,</span>
<span class="line">  &quot;terminal.integrated.profiles.windows&quot;: {</span>
<span class="line">    &quot;Git Bash&quot;: {</span>
<span class="line">      &quot;path&quot;: &quot;C:\\\\Program Files\\\\Git\\\\bin\\\\bash.exe&quot;,</span>
<span class="line">      &quot;icon&quot;: &quot;terminal-bash&quot;,</span>
<span class="line">      &quot;color&quot;: &quot;terminal.ansiGreen&quot;,</span>
<span class="line">    },</span>
<span class="line">    &quot;PowerShell&quot;: {</span>
<span class="line">      &quot;source&quot;: &quot;PowerShell&quot;,</span>
<span class="line">      &quot;icon&quot;: &quot;terminal-powershell&quot;,</span>
<span class="line">      &quot;color&quot;: &quot;terminal.ansiBlue&quot;,</span>
<span class="line">    },</span>
<span class="line">    &quot;Command Prompt&quot;: {</span>
<span class="line">      &quot;path&quot;: &quot;C:\\\\Windows\\\\System32\\\\cmd.exe&quot;,</span>
<span class="line">      &quot;icon&quot;: &quot;terminal-cmd&quot;,</span>
<span class="line">      &quot;color&quot;: &quot;terminal.ansiCyan&quot;,</span>
<span class="line">    },</span>
<span class="line">    &quot;Windows PowerShell&quot;: {</span>
<span class="line">      &quot;path&quot;: &quot;C:\\\\Windows\\\\System32\\\\WindowsPowerShell\\\\v1.0\\\\powershell.exe&quot;,</span>
<span class="line">      &quot;icon&quot;: &quot;terminal-powershell&quot;,</span>
<span class="line">    },</span>
<span class="line">  },</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="切换-shell" tabindex="-1"><a class="header-anchor" href="#切换-shell"><span>切换 Shell</span></a></h3><p>点击终端 Tab 右侧的 <strong>下拉箭头</strong> → 选择要使用的 Shell。</p><hr><h2 id="_5-3-终端分屏" tabindex="-1"><a class="header-anchor" href="#_5-3-终端分屏"><span>5.3 终端分屏</span></a></h2><p>当需要同时看两个终端输出时（如一个运行 dev server，一个运行测试），分屏非常有用。</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">┌──────────────────────┬──────────────────────┐</span>
<span class="line">│                      │                      │</span>
<span class="line">│  终端 1 (npm run dev) │  终端 2 (npm test)    │</span>
<span class="line">│                      │                      │</span>
<span class="line">├──────────────────────┴──────────────────────┤</span>
<span class="line">│  终端 3 (git status)                         │</span>
<span class="line">└─────────────────────────────────────────────┘</span>
<span class="line"></span></code></pre></div><p><strong>操作方式</strong>：</p><ol><li>点击终端 Tab 右侧的 <strong>Split Terminal</strong> 按钮（或 <code>Ctrl+Shift+5</code>）</li><li>拖动分屏之间的分隔线调整大小</li><li>关闭分屏：点击分屏 Tab 上的 <strong>X</strong> 按钮</li></ol><hr><h2 id="_5-4-终端内交互技巧" tabindex="-1"><a class="header-anchor" href="#_5-4-终端内交互技巧"><span>5.4 终端内交互技巧</span></a></h2><h3 id="_1-ctrl-click-打开文件-链接" tabindex="-1"><a class="header-anchor" href="#_1-ctrl-click-打开文件-链接"><span>① Ctrl+Click 打开文件/链接</span></a></h3><p>在终端中按住 <code>Ctrl</code> 点击：</p><ul><li><strong>文件路径</strong> → 在编辑器中打开该文件</li><li><strong>URL</strong>（如 <code>http://localhost:5173</code>）→ 在浏览器中打开</li><li><strong>错误堆栈</strong> → 跳转到对应代码行</li></ul><h3 id="_2-在终端中打开当前文件目录" tabindex="-1"><a class="header-anchor" href="#_2-在终端中打开当前文件目录"><span>② 在终端中打开当前文件目录</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 在终端中执行</span></span>
<span class="line">code <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token comment"># 或在 VS Code 中右键文件 → Reveal in Explorer</span></span>
<span class="line"></span></code></pre></div><h3 id="_3-自定义终端提示符样式" tabindex="-1"><a class="header-anchor" href="#_3-自定义终端提示符样式"><span>③ 自定义终端提示符样式</span></a></h3><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">// settings.json</span>
<span class="line">{</span>
<span class="line">  &quot;terminal.integrated.fontFamily&quot;: &quot;&#39;Cascadia Code&#39;, &#39;Fira Code&#39;, monospace&quot;,</span>
<span class="line">  &quot;terminal.integrated.fontSize&quot;: 13,</span>
<span class="line">  &quot;terminal.integrated.lineHeight&quot;: 1.3,</span>
<span class="line">  &quot;terminal.integrated.cursorStyle&quot;: &quot;line&quot;,</span>
<span class="line">  &quot;terminal.integrated.cursorBlinking&quot;: true,</span>
<span class="line">  &quot;terminal.integrated.smoothScrolling&quot;: true,</span>
<span class="line">  &quot;terminal.integrated.enableMultiLinePasteWarning&quot;: true,</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><hr><h2 id="_5-5-终端环境变量" tabindex="-1"><a class="header-anchor" href="#_5-5-终端环境变量"><span>5.5 终端环境变量</span></a></h2><p>有时终端运行时找不到某些命令或模块，需要配置环境变量。</p><h3 id="设置终端环境变量" tabindex="-1"><a class="header-anchor" href="#设置终端环境变量"><span>设置终端环境变量</span></a></h3><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">// settings.json</span>
<span class="line">{</span>
<span class="line">  &quot;terminal.integrated.env.windows&quot;: {</span>
<span class="line">    &quot;PYTHONPATH&quot;: &quot;\${workspaceFolder}&quot;,</span>
<span class="line">    &quot;NODE_ENV&quot;: &quot;development&quot;,</span>
<span class="line">    &quot;PATH&quot;: &quot;\${env:PATH};\${workspaceFolder}/node_modules/.bin&quot;,</span>
<span class="line">  },</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="变量引用" tabindex="-1"><a class="header-anchor" href="#变量引用"><span>变量引用</span></a></h3><table><thead><tr><th>变量</th><th>说明</th></tr></thead><tbody><tr><td><code>\${workspaceFolder}</code></td><td>当前工作区根目录</td></tr><tr><td><code>\${workspaceFolderBasename}</code></td><td>根目录名</td></tr><tr><td><code>\${env:PATH}</code></td><td>系统的 PATH 变量</td></tr><tr><td><code>\${env:HOME}</code></td><td>用户主目录</td></tr><tr><td><code>\${userHome}</code></td><td>用户主目录的另一种写法</td></tr></tbody></table><hr><h2 id="_5-6-终端自动化" tabindex="-1"><a class="header-anchor" href="#_5-6-终端自动化"><span>5.6 终端自动化</span></a></h2><h3 id="自动打开终端" tabindex="-1"><a class="header-anchor" href="#自动打开终端"><span>自动打开终端</span></a></h3>`,37),i(`p`,null,[l[1]||=e(`结合 `,-1),a(m,{to:`/windows-tutor/tools/vscode/07-tasks-and-launch.html`},{default:r(()=>[...l[0]||=[e(`Tasks`,-1)]]),_:1}),l[2]||=e(`，可以在打开项目时自动启动终端：`,-1)]),l[7]||=n(`<div class="language-jsonc line-numbers-mode" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">// .vscode/tasks.json</span>
<span class="line">{</span>
<span class="line">  &quot;version&quot;: &quot;2.0.0&quot;,</span>
<span class="line">  &quot;tasks&quot;: [</span>
<span class="line">    {</span>
<span class="line">      &quot;label&quot;: &quot;Start Dev Server&quot;,</span>
<span class="line">      &quot;type&quot;: &quot;npm&quot;,</span>
<span class="line">      &quot;script&quot;: &quot;dev&quot;,</span>
<span class="line">      &quot;isBackground&quot;: true,</span>
<span class="line">      &quot;problemMatcher&quot;: [],</span>
<span class="line">      &quot;presentation&quot;: {</span>
<span class="line">        &quot;panel&quot;: &quot;dedicated&quot;,</span>
<span class="line">        &quot;reveal&quot;: &quot;always&quot;,</span>
<span class="line">        &quot;group&quot;: &quot;dev&quot;,</span>
<span class="line">      },</span>
<span class="line">    },</span>
<span class="line">  ],</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="终端快捷键绑定" tabindex="-1"><a class="header-anchor" href="#终端快捷键绑定"><span>终端快捷键绑定</span></a></h3><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">// keybindings.json</span>
<span class="line">{</span>
<span class="line">  &quot;key&quot;: &quot;ctrl+shift+t&quot;,</span>
<span class="line">  &quot;command&quot;: &quot;workbench.action.terminal.newWithProfile&quot;,</span>
<span class="line">  &quot;args&quot;: { &quot;profileName&quot;: &quot;Git Bash&quot; },</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><hr><h2 id="_5-7-常见问题" tabindex="-1"><a class="header-anchor" href="#_5-7-常见问题"><span>5.7 常见问题</span></a></h2><h3 id="终端输入-cls-不生效" tabindex="-1"><a class="header-anchor" href="#终端输入-cls-不生效"><span>终端输入 <code>cls</code> 不生效</span></a></h3><p><strong>原因</strong>：<code>cls</code> 是 Windows CMD 的清屏命令，VS Code 的集成终端默认使用 PowerShell 或 Git Bash。</p><p><strong>解决</strong>：</p><ul><li>使用 <code>Clear</code> 或 <code>Ctrl+L</code> 清屏</li><li>或绑定快捷键：</li></ul><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">// keybindings.json</span>
<span class="line">{</span>
<span class="line">  &quot;key&quot;: &quot;ctrl+q&quot;,</span>
<span class="line">  &quot;command&quot;: &quot;workbench.action.terminal.clear&quot;,</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="终端字体乱码-图标不显示" tabindex="-1"><a class="header-anchor" href="#终端字体乱码-图标不显示"><span>终端字体乱码/图标不显示</span></a></h3><p><strong>解决</strong>：安装 Nerd Font 并指定字体：</p><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;terminal.integrated.fontFamily&quot;: &quot;MesloLGL NF&quot;,</span>
<span class="line">  &quot;terminal.integrated.fontSize&quot;: 14,</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="终端无法运行-code" tabindex="-1"><a class="header-anchor" href="#终端无法运行-code"><span>终端无法运行 <code>code .</code></span></a></h3><p><strong>解决</strong>：命令面板 → <code>&gt; Shell Command: Install &#39;code&#39; command in PATH</code></p><hr><h2 id="下一步" tabindex="-1"><a class="header-anchor" href="#下一步"><span>下一步</span></a></h2>`,17),i(`p`,null,[l[4]||=e(`终端配置好后，进入 `,-1),a(m,{to:`/windows-tutor/tools/vscode/06-git-integration.html`},{default:r(()=>[...l[3]||=[e(`06 — Git 集成`,-1)]]),_:1}),l[5]||=e(` 学习 VS Code 的 Git 工具。`,-1)])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};