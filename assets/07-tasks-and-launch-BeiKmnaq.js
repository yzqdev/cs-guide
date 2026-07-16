import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/tools/vscode/07-tasks-and-launch.html","title":"07 — 任务自动化与调试","lang":"zh-CN","frontmatter":{"description":"07 — 任务自动化与调试 通过 tasks.json 和 launch.json，VS Code 可以替代终端脚本和外部调试器，一站式完成构建、测试、调试。 第一部分：任务自动化（Tasks） Tasks 是 VS Code 的&quot;内部脚本引擎&quot;，允许你在编辑器内直接运行构建、测试、打包等命令。 7.1 快速创建任务 命令面板 → ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"07 — 任务自动化与调试\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/tools/vscode/07-tasks-and-launch.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"07 — 任务自动化与调试"}],["meta",{"property":"og:description","content":"07 — 任务自动化与调试 通过 tasks.json 和 launch.json，VS Code 可以替代终端脚本和外部调试器，一站式完成构建、测试、调试。 第一部分：任务自动化（Tasks） Tasks 是 VS Code 的&quot;内部脚本引擎&quot;，允许你在编辑器内直接运行构建、测试、打包等命令。 7.1 快速创建任务 命令面板 → ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":4.14,"words":1242},"filePathRelative":"windows-tutor/tools/vscode/07-tasks-and-launch.md","autoDesc":true}`),u={name:`07-tasks-and-launch.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_07-—-任务自动化与调试" tabindex="-1"><a class="header-anchor" href="#_07-—-任务自动化与调试"><span>07 — 任务自动化与调试</span></a></h1><blockquote><p>通过 <code>tasks.json</code> 和 <code>launch.json</code>，VS Code 可以替代终端脚本和外部调试器，一站式完成构建、测试、调试。</p></blockquote><hr><h2 id="第一部分-任务自动化-tasks" tabindex="-1"><a class="header-anchor" href="#第一部分-任务自动化-tasks"><span>第一部分：任务自动化（Tasks）</span></a></h2><p>Tasks 是 VS Code 的&quot;内部脚本引擎&quot;，允许你在编辑器内直接运行构建、测试、打包等命令。</p><hr><h3 id="_7-1-快速创建任务" tabindex="-1"><a class="header-anchor" href="#_7-1-快速创建任务"><span>7.1 快速创建任务</span></a></h3><ol><li>命令面板 → <code>&gt; Tasks: Configure Task</code></li><li>VS Code 自动检测项目文件（如 <code>package.json</code>、<code>Makefile</code>、<code>Cargo.toml</code>）</li><li>选择模板（如 <code>npm: build</code>、<code>npm: test</code>）</li><li>自动生成 <code>.vscode/tasks.json</code></li></ol><h3 id="_7-2-tasks-json-完全解析" tabindex="-1"><a class="header-anchor" href="#_7-2-tasks-json-完全解析"><span>7.2 tasks.json 完全解析</span></a></h3><div class="language-jsonc line-numbers-mode" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;version&quot;: &quot;2.0.0&quot;, // 版本号，固定</span>
<span class="line">  &quot;tasks&quot;: [</span>
<span class="line">    {</span>
<span class="line">      &quot;label&quot;: &quot;Build&quot;, // 任务名称，显示在命令面板中</span>
<span class="line">      &quot;type&quot;: &quot;shell&quot;, // 类型：shell 或 process</span>
<span class="line">      &quot;command&quot;: &quot;npm run build&quot;, // 要执行的命令</span>
<span class="line">      &quot;group&quot;: {</span>
<span class="line">        &quot;kind&quot;: &quot;build&quot;, // build 或 test</span>
<span class="line">        &quot;isDefault&quot;: true, // 设为默认构建任务</span>
<span class="line">      },</span>
<span class="line">      &quot;presentation&quot;: {</span>
<span class="line">        &quot;reveal&quot;: &quot;always&quot;, // 何时显示终端：always / never / silent</span>
<span class="line">        &quot;panel&quot;: &quot;dedicated&quot;, // 使用专用面板</span>
<span class="line">        &quot;echo&quot;: true, // 显示执行的命令</span>
<span class="line">        &quot;focus&quot;: false, // 自动聚焦到终端</span>
<span class="line">        &quot;clear&quot;: true, // 运行前清空终端</span>
<span class="line">      },</span>
<span class="line">      &quot;problemMatcher&quot;: [</span>
<span class="line">        // 错误匹配器，从输出中提取错误</span>
<span class="line">        &quot;$eslint-stylish&quot;,</span>
<span class="line">        &quot;$tsc&quot;,</span>
<span class="line">      ],</span>
<span class="line">      &quot;options&quot;: {</span>
<span class="line">        &quot;cwd&quot;: &quot;\${workspaceFolder}/packages/frontend&quot;, // 工作目录</span>
<span class="line">        &quot;env&quot;: { &quot;NODE_ENV&quot;: &quot;production&quot; }, // 环境变量</span>
<span class="line">      },</span>
<span class="line">    },</span>
<span class="line">  ],</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-常用任务类型" tabindex="-1"><a class="header-anchor" href="#_7-3-常用任务类型"><span>7.3 常用任务类型</span></a></h3><p><strong>① 运行 npm 脚本</strong></p><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;label&quot;: &quot;Dev Server&quot;,</span>
<span class="line">  &quot;type&quot;: &quot;npm&quot;,</span>
<span class="line">  &quot;script&quot;: &quot;dev&quot;,</span>
<span class="line">  &quot;isBackground&quot;: true, // 后台长期运行</span>
<span class="line">  &quot;presentation&quot;: {</span>
<span class="line">    &quot;panel&quot;: &quot;dedicated&quot;,</span>
<span class="line">    &quot;reveal&quot;: &quot;always&quot;,</span>
<span class="line">  },</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p><strong>② 运行 Makefile</strong></p><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;label&quot;: &quot;Make Build&quot;,</span>
<span class="line">  &quot;type&quot;: &quot;shell&quot;,</span>
<span class="line">  &quot;command&quot;: &quot;make&quot;,</span>
<span class="line">  &quot;args&quot;: [&quot;build&quot;],</span>
<span class="line">  &quot;group&quot;: &quot;build&quot;,</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p><strong>③ 编译 TypeScript</strong></p><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;label&quot;: &quot;tsc watch&quot;,</span>
<span class="line">  &quot;type&quot;: &quot;shell&quot;,</span>
<span class="line">  &quot;command&quot;: &quot;npx tsc --watch&quot;,</span>
<span class="line">  &quot;isBackground&quot;: true,</span>
<span class="line">  &quot;problemMatcher&quot;: &quot;$tsc-watch&quot;,</span>
<span class="line">  &quot;presentation&quot;: {</span>
<span class="line">    &quot;panel&quot;: &quot;dedicated&quot;,</span>
<span class="line">    &quot;reveal&quot;: &quot;silent&quot;, // 只在有错误时显示</span>
<span class="line">  },</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p><strong>④ 多任务组合（复合任务）</strong></p><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;label&quot;: &quot;Full Build&quot;,</span>
<span class="line">  &quot;dependsOn&quot;: [&quot;Lint&quot;, &quot;Type Check&quot;, &quot;Build&quot;],</span>
<span class="line">  &quot;dependsOrder&quot;: &quot;sequence&quot;, // sequence 或 parallel</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="_7-4-运行任务" tabindex="-1"><a class="header-anchor" href="#_7-4-运行任务"><span>7.4 运行任务</span></a></h3><table><thead><tr><th>操作</th><th>方式</th></tr></thead><tbody><tr><td>运行默认构建任务</td><td><code>Ctrl+Shift+B</code></td></tr><tr><td>运行任意任务</td><td>命令面板 → <code>&gt; Tasks: Run Task</code></td></tr><tr><td>重新运行上一次任务</td><td>命令面板 → <code>&gt; Tasks: Rerun Last Task</code></td></tr><tr><td>终止任务</td><td>命令面板 → <code>&gt; Tasks: Terminate Task</code></td></tr><tr><td>查看运行中的任务</td><td>状态栏右侧的终端图标</td></tr></tbody></table><h3 id="_7-5-实战-前端项目完整任务链" tabindex="-1"><a class="header-anchor" href="#_7-5-实战-前端项目完整任务链"><span>7.5 实战：前端项目完整任务链</span></a></h3><div class="language-jsonc line-numbers-mode" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;version&quot;: &quot;2.0.0&quot;,</span>
<span class="line">  &quot;tasks&quot;: [</span>
<span class="line">    {</span>
<span class="line">      &quot;label&quot;: &quot;Lint&quot;,</span>
<span class="line">      &quot;type&quot;: &quot;npm&quot;,</span>
<span class="line">      &quot;script&quot;: &quot;lint&quot;,</span>
<span class="line">      &quot;problemMatcher&quot;: [&quot;$eslint-stylish&quot;],</span>
<span class="line">      &quot;group&quot;: &quot;build&quot;,</span>
<span class="line">    },</span>
<span class="line">    {</span>
<span class="line">      &quot;label&quot;: &quot;Type Check&quot;,</span>
<span class="line">      &quot;type&quot;: &quot;shell&quot;,</span>
<span class="line">      &quot;command&quot;: &quot;npx tsc --noEmit&quot;,</span>
<span class="line">      &quot;problemMatcher&quot;: &quot;$tsc&quot;,</span>
<span class="line">      &quot;group&quot;: &quot;build&quot;,</span>
<span class="line">    },</span>
<span class="line">    {</span>
<span class="line">      &quot;label&quot;: &quot;Build&quot;,</span>
<span class="line">      &quot;type&quot;: &quot;npm&quot;,</span>
<span class="line">      &quot;script&quot;: &quot;build&quot;,</span>
<span class="line">      &quot;group&quot;: {</span>
<span class="line">        &quot;kind&quot;: &quot;build&quot;,</span>
<span class="line">        &quot;isDefault&quot;: true,</span>
<span class="line">      },</span>
<span class="line">    },</span>
<span class="line">    {</span>
<span class="line">      &quot;label&quot;: &quot;Test&quot;,</span>
<span class="line">      &quot;type&quot;: &quot;npm&quot;,</span>
<span class="line">      &quot;script&quot;: &quot;test&quot;,</span>
<span class="line">      &quot;group&quot;: &quot;test&quot;,</span>
<span class="line">      &quot;presentation&quot;: {</span>
<span class="line">        &quot;panel&quot;: &quot;dedicated&quot;,</span>
<span class="line">        &quot;reveal&quot;: &quot;always&quot;,</span>
<span class="line">      },</span>
<span class="line">    },</span>
<span class="line">    {</span>
<span class="line">      &quot;label&quot;: &quot;CI Check&quot;,</span>
<span class="line">      &quot;dependsOn&quot;: [&quot;Lint&quot;, &quot;Type Check&quot;, &quot;Build&quot;, &quot;Test&quot;],</span>
<span class="line">      &quot;dependsOrder&quot;: &quot;sequence&quot;,</span>
<span class="line">    },</span>
<span class="line">  ],</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="第二部分-调试配置-launch" tabindex="-1"><a class="header-anchor" href="#第二部分-调试配置-launch"><span>第二部分：调试配置（Launch）</span></a></h2><hr><h3 id="_7-6-调试入门" tabindex="-1"><a class="header-anchor" href="#_7-6-调试入门"><span>7.6 调试入门</span></a></h3><p>在 VS Code 中调试只需三步：</p><ol><li><strong>设置断点</strong>：在行号左侧点击（或按 <code>F9</code>）</li><li><strong>启动调试</strong>：按 <code>F5</code></li><li><strong>单步执行</strong>：使用 <code>F10</code>、<code>F11</code>、<code>Shift+F11</code></li></ol><h3 id="_7-7-launch-json-完全解析" tabindex="-1"><a class="header-anchor" href="#_7-7-launch-json-完全解析"><span>7.7 launch.json 完全解析</span></a></h3><div class="language-jsonc line-numbers-mode" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;version&quot;: &quot;0.2.0&quot;,</span>
<span class="line">  &quot;configurations&quot;: [</span>
<span class="line">    {</span>
<span class="line">      &quot;name&quot;: &quot;Debug App&quot;, // 配置名称，显示在调试下拉菜单</span>
<span class="line">      &quot;type&quot;: &quot;node&quot;, // 调试器类型</span>
<span class="line">      &quot;request&quot;: &quot;launch&quot;, // launch（启动）或 attach（附加）</span>
<span class="line">      &quot;program&quot;: &quot;\${workspaceFolder}/src/index.js&quot;, // 入口文件</span>
<span class="line">      &quot;args&quot;: [&quot;--port&quot;, &quot;3000&quot;], // 命令行参数</span>
<span class="line">      &quot;env&quot;: {</span>
<span class="line">        // 环境变量</span>
<span class="line">        &quot;NODE_ENV&quot;: &quot;development&quot;,</span>
<span class="line">      },</span>
<span class="line">      &quot;envFile&quot;: &quot;\${workspaceFolder}/.env&quot;, // 从 .env 文件加载</span>
<span class="line">      &quot;cwd&quot;: &quot;\${workspaceFolder}&quot;, // 工作目录</span>
<span class="line">      &quot;console&quot;: &quot;integratedTerminal&quot;, // 输出到集成终端</span>
<span class="line">      &quot;skipFiles&quot;: [</span>
<span class="line">        // 跳过不需要调试的文件</span>
<span class="line">        &quot;&lt;node_internals&gt;/**&quot;,</span>
<span class="line">        &quot;\${workspaceFolder}/node_modules/**&quot;,</span>
<span class="line">      ],</span>
<span class="line">      &quot;preLaunchTask&quot;: &quot;Build&quot;, // 调试前先运行 Build 任务</span>
<span class="line">      &quot;postDebugTask&quot;: &quot;&quot;, // 调试结束后运行的任务</span>
<span class="line">    },</span>
<span class="line">  ],</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-8-各语言调试实战" tabindex="-1"><a class="header-anchor" href="#_7-8-各语言调试实战"><span>7.8 各语言调试实战</span></a></h3><p><strong>Node.js 调试</strong></p><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;Launch via NPM&quot;,</span>
<span class="line">  &quot;type&quot;: &quot;node&quot;,</span>
<span class="line">  &quot;request&quot;: &quot;launch&quot;,</span>
<span class="line">  &quot;runtimeExecutable&quot;: &quot;npm&quot;,</span>
<span class="line">  &quot;runtimeArgs&quot;: [&quot;run&quot;, &quot;dev&quot;],</span>
<span class="line">  &quot;console&quot;: &quot;integratedTerminal&quot;,</span>
<span class="line">  &quot;skipFiles&quot;: [&quot;&lt;node_internals&gt;/**&quot;],</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p><strong>附加到已运行的 Node 进程</strong></p><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;Attach to Process&quot;,</span>
<span class="line">  &quot;type&quot;: &quot;node&quot;,</span>
<span class="line">  &quot;request&quot;: &quot;attach&quot;,</span>
<span class="line">  &quot;port&quot;: 9229, // 先启动 node --inspect</span>
<span class="line">  &quot;restart&quot;: true,</span>
<span class="line">  &quot;localRoot&quot;: &quot;\${workspaceFolder}&quot;,</span>
<span class="line">  &quot;remoteRoot&quot;: &quot;/app&quot;, // 远程调试时用</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p><strong>Python 调试</strong></p><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;Python: Current File&quot;,</span>
<span class="line">  &quot;type&quot;: &quot;python&quot;,</span>
<span class="line">  &quot;request&quot;: &quot;launch&quot;,</span>
<span class="line">  &quot;program&quot;: &quot;\${file}&quot;,</span>
<span class="line">  &quot;console&quot;: &quot;integratedTerminal&quot;,</span>
<span class="line">  &quot;args&quot;: [&quot;--input&quot;, &quot;data.txt&quot;],</span>
<span class="line">  &quot;env&quot;: {</span>
<span class="line">    &quot;PYTHONPATH&quot;: &quot;\${workspaceFolder}&quot;,</span>
<span class="line">  },</span>
<span class="line">  &quot;justMyCode&quot;: true,</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p><strong>Python: Django</strong></p><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;Django&quot;,</span>
<span class="line">  &quot;type&quot;: &quot;python&quot;,</span>
<span class="line">  &quot;request&quot;: &quot;launch&quot;,</span>
<span class="line">  &quot;program&quot;: &quot;\${workspaceFolder}/manage.py&quot;,</span>
<span class="line">  &quot;args&quot;: [&quot;runserver&quot;, &quot;0.0.0.0:8000&quot;],</span>
<span class="line">  &quot;django&quot;: true,</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p><strong>Go 调试</strong></p><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;Launch Go Program&quot;,</span>
<span class="line">  &quot;type&quot;: &quot;go&quot;,</span>
<span class="line">  &quot;request&quot;: &quot;launch&quot;,</span>
<span class="line">  &quot;mode&quot;: &quot;auto&quot;,</span>
<span class="line">  &quot;program&quot;: &quot;\${fileDirname}&quot;,</span>
<span class="line">  &quot;args&quot;: [],</span>
<span class="line">  &quot;env&quot;: {},</span>
<span class="line">  &quot;cwd&quot;: &quot;\${workspaceFolder}&quot;,</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="_7-9-断点高级技巧" tabindex="-1"><a class="header-anchor" href="#_7-9-断点高级技巧"><span>7.9 断点高级技巧</span></a></h3><p><strong>条件断点</strong></p><p>右键断点 → <code>Edit Breakpoint</code> → 输入条件表达式：</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">// 只有 i 等于 5 时才中断</span></span>
<span class="line">i <span class="token operator">===</span> <span class="token number">5</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 只有在特定用户时才中断</span></span>
<span class="line">user<span class="token punctuation">.</span>id <span class="token operator">===</span> <span class="token string">&#39;admin&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 每 3 次命中后中断</span></span>
<span class="line">hitCount <span class="token operator">%</span> <span class="token number">3</span> <span class="token operator">===</span> <span class="token number">0</span></span>
<span class="line"></span></code></pre></div><p><strong>日志点（Logpoint）</strong></p><p>右键断点 → <code>Logpoint</code> → 输入日志消息（不中断执行，只输出日志）：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">user logged in: {user.name} at {new Date().toISOString()}</span>
<span class="line"></span></code></pre></div><p><strong>内联断点</strong></p><p>在行内按 <code>Shift+F9</code>，仅在该行的特定列触发。</p><p><strong>函数断点</strong></p><p>在调试控制台（DEBUG CONSOLE）中设置：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">debug.setBreakpoint(&#39;someFunction&#39;)</span>
<span class="line"></span></code></pre></div><h3 id="_7-10-调试控制台" tabindex="-1"><a class="header-anchor" href="#_7-10-调试控制台"><span>7.10 调试控制台</span></a></h3><p>调试控制台（<code>Ctrl+Shift+Y</code>）可以在调试时实时求值表达式：</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">// 在调试控制台中输入</span></span>
<span class="line">myVariable</span>
<span class="line">document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;.app&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">typeof</span> someFunction</span>
<span class="line"></span>
<span class="line"><span class="token comment">// 直接在调试控制台中修改变量</span></span>
<span class="line">myVariable <span class="token operator">=</span> <span class="token string">&#39;new value&#39;</span></span>
<span class="line"></span></code></pre></div><h3 id="_7-11-多配置与复合调试" tabindex="-1"><a class="header-anchor" href="#_7-11-多配置与复合调试"><span>7.11 多配置与复合调试</span></a></h3><div class="language-jsonc line-numbers-mode" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;version&quot;: &quot;0.2.0&quot;,</span>
<span class="line">  &quot;configurations&quot;: [</span>
<span class="line">    {</span>
<span class="line">      &quot;name&quot;: &quot;Frontend&quot;,</span>
<span class="line">      &quot;type&quot;: &quot;node&quot;,</span>
<span class="line">      &quot;request&quot;: &quot;launch&quot;,</span>
<span class="line">      &quot;runtimeExecutable&quot;: &quot;npm&quot;,</span>
<span class="line">      &quot;runtimeArgs&quot;: [&quot;run&quot;, &quot;dev:frontend&quot;],</span>
<span class="line">      &quot;console&quot;: &quot;integratedTerminal&quot;,</span>
<span class="line">    },</span>
<span class="line">    {</span>
<span class="line">      &quot;name&quot;: &quot;Backend&quot;,</span>
<span class="line">      &quot;type&quot;: &quot;node&quot;,</span>
<span class="line">      &quot;request&quot;: &quot;launch&quot;,</span>
<span class="line">      &quot;runtimeExecutable&quot;: &quot;npm&quot;,</span>
<span class="line">      &quot;runtimeArgs&quot;: [&quot;run&quot;, &quot;dev:backend&quot;],</span>
<span class="line">      &quot;console&quot;: &quot;integratedTerminal&quot;,</span>
<span class="line">    },</span>
<span class="line">  ],</span>
<span class="line">  &quot;compounds&quot;: [</span>
<span class="line">    {</span>
<span class="line">      &quot;name&quot;: &quot;Full Stack&quot;,</span>
<span class="line">      &quot;configurations&quot;: [&quot;Frontend&quot;, &quot;Backend&quot;],</span>
<span class="line">      &quot;preLaunchTask&quot;: &quot;Build&quot;,</span>
<span class="line">      &quot;stopAll&quot;: true, // 停止一个时全部停止</span>
<span class="line">    },</span>
<span class="line">  ],</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_7-12-调试快捷键速查" tabindex="-1"><a class="header-anchor" href="#_7-12-调试快捷键速查"><span>7.12 调试快捷键速查</span></a></h2><table><thead><tr><th>快捷键</th><th>功能</th></tr></thead><tbody><tr><td><code>F5</code></td><td>启动调试 / 继续</td></tr><tr><td><code>Shift+F5</code></td><td>停止调试</td></tr><tr><td><code>Ctrl+Shift+F5</code></td><td>重启调试</td></tr><tr><td><code>F9</code></td><td>切换断点</td></tr><tr><td><code>F10</code></td><td>单步跳过</td></tr><tr><td><code>F11</code></td><td>单步进入</td></tr><tr><td><code>Shift+F11</code></td><td>单步跳出</td></tr><tr><td><code>Ctrl+K Ctrl+I</code></td><td>显示悬停信息</td></tr><tr><td><code>Ctrl+Shift+Y</code></td><td>调试控制台</td></tr><tr><td><code>Ctrl+Shift+D</code></td><td>打开调试视图</td></tr></tbody></table><hr><h2 id="下一步" tabindex="-1"><a class="header-anchor" href="#下一步"><span>下一步</span></a></h2>`,64),i(`p`,null,[l[1]||=e(`进入 `,-1),a(m,{to:`/windows-tutor/tools/vscode/08-remote-development.html`},{default:r(()=>[...l[0]||=[e(`08 — 远程开发`,-1)]]),_:1}),l[2]||=e(` 学习如何远程连接服务器、WSL 和 Docker 容器开发。`,-1)])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};