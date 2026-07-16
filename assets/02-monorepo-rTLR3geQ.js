import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/node-tutor/build-system/02-monorepo.html","title":"Monorepo 构建与管理","lang":"zh-CN","frontmatter":{"description":"Monorepo 构建与管理 Monorepo（单一仓库）将多个项目放在同一个仓库中管理，配合构建工具实现依赖共享、统一构建和发布。 为什么用 Monorepo 主流 Monorepo 方案对比 pnpm workspace 配置 目录结构 常用命令 Turborepo 安装 turbo.json package.json 增量构建与缓存 Turbor...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Monorepo 构建与管理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/build-system/02-monorepo.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Monorepo 构建与管理"}],["meta",{"property":"og:description","content":"Monorepo 构建与管理 Monorepo（单一仓库）将多个项目放在同一个仓库中管理，配合构建工具实现依赖共享、统一构建和发布。 为什么用 Monorepo 主流 Monorepo 方案对比 pnpm workspace 配置 目录结构 常用命令 Turborepo 安装 turbo.json package.json 增量构建与缓存 Turbor..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.53,"words":758},"filePathRelative":"node-tutor/build-system/02-monorepo.md","autoDesc":true}`),a={name:`02-monorepo.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="monorepo-构建与管理" tabindex="-1"><a class="header-anchor" href="#monorepo-构建与管理"><span>Monorepo 构建与管理</span></a></h1><blockquote><p>Monorepo（单一仓库）将多个项目放在同一个仓库中管理，配合构建工具实现依赖共享、统一构建和发布。</p></blockquote><h2 id="为什么用-monorepo" tabindex="-1"><a class="header-anchor" href="#为什么用-monorepo"><span>为什么用 Monorepo</span></a></h2><table><thead><tr><th>优势</th><th>说明</th></tr></thead><tbody><tr><td>代码共享</td><td>多个项目共享组件、工具函数、类型定义</td></tr><tr><td>统一构建</td><td>一次配置，所有项目共享构建规则</td></tr><tr><td>原子提交</td><td>跨项目的修改可以在一个 PR 中完成</td></tr><tr><td>依赖管理</td><td>公共依赖提升到根目录，减少重复安装</td></tr><tr><td>统一发布</td><td>批量管理版本和发布流程</td></tr></tbody></table><h2 id="主流-monorepo-方案对比" tabindex="-1"><a class="header-anchor" href="#主流-monorepo-方案对比"><span>主流 Monorepo 方案对比</span></a></h2><table><thead><tr><th>方案</th><th>特点</th><th>适用场景</th></tr></thead><tbody><tr><td>pnpm workspace</td><td>原生支持，软链接管理依赖</td><td>中小型项目</td></tr><tr><td>Turborepo</td><td>Vercel 出品，增量构建 + 缓存</td><td>中大型项目</td></tr><tr><td>Nx</td><td>强大，支持多种技术栈</td><td>大型企业级项目</td></tr><tr><td>Rush</td><td>微软出品，严格的管理流程</td><td>超大型团队</td></tr><tr><td>Lerna</td><td>经典方案，生态成熟</td><td>传统 monorepo</td></tr><tr><td>Yarn Workspaces</td><td>Yarn 原生支持</td><td>Yarn 用户</td></tr></tbody></table><h2 id="pnpm-workspace" tabindex="-1"><a class="header-anchor" href="#pnpm-workspace"><span>pnpm workspace</span></a></h2><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h3><div class="language-yaml" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token comment"># pnpm-workspace.yaml</span></span>
<span class="line"><span class="token key atrule">packages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token string">&#39;packages/*&#39;</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token string">&#39;apps/*&#39;</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token string">&#39;!**/test/**&#39;</span></span>
<span class="line"></span></code></pre></div><h3 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构"><span>目录结构</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">monorepo/</span>
<span class="line">├── pnpm-workspace.yaml</span>
<span class="line">├── package.json</span>
<span class="line">├── packages/</span>
<span class="line">│   ├── utils/              # 工具库</span>
<span class="line">│   │   ├── package.json    # name: @my/utils</span>
<span class="line">│   │   └── src/</span>
<span class="line">│   ├── ui/                 # UI 组件库</span>
<span class="line">│   │   ├── package.json    # name: @my/ui</span>
<span class="line">│   │   └── src/</span>
<span class="line">│   └── config/             # 共享配置</span>
<span class="line">│       └── package.json    # name: @my/config</span>
<span class="line">└── apps/</span>
<span class="line">    ├── web/                # Web 应用</span>
<span class="line">    │   └── package.json    # dependencies: { &quot;@my/utils&quot;: &quot;workspace:*&quot; }</span>
<span class="line">    └── admin/              # 管理后台</span>
<span class="line">        └── package.json</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 在根目录安装所有包</span></span>
<span class="line"><span class="token function">pnpm</span> <span class="token function">install</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 给特定包添加依赖</span></span>
<span class="line"><span class="token function">pnpm</span> <span class="token parameter variable">--filter</span> @my/web <span class="token function">add</span> react</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 给所有包添加依赖</span></span>
<span class="line"><span class="token function">pnpm</span> <span class="token parameter variable">-r</span> <span class="token function">add</span> lodash</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行所有包的 test 脚本</span></span>
<span class="line"><span class="token function">pnpm</span> <span class="token parameter variable">-r</span> run <span class="token builtin class-name">test</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行特定包的脚本</span></span>
<span class="line"><span class="token function">pnpm</span> <span class="token parameter variable">--filter</span> @my/web run dev</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清理 node_modules</span></span>
<span class="line"><span class="token function">pnpm</span> recursive <span class="token builtin class-name">exec</span> -- <span class="token function">rm</span> <span class="token parameter variable">-rf</span> node_modules</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="turborepo" tabindex="-1"><a class="header-anchor" href="#turborepo"><span>Turborepo</span></a></h2><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> turbo</span>
<span class="line"></span></code></pre></div><h3 id="turbo-json" tabindex="-1"><a class="header-anchor" href="#turbo-json"><span><code>turbo.json</code></span></a></h3><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;$schema&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://turbo.build/schema.json&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;globalDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;**/.env.*local&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;pipeline&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;dependsOn&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;^build&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;outputs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;.next/**&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;dist/**&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;cache&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;dependsOn&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;build&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;inputs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;src/**/*.tsx&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;src/**/*.ts&quot;</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;lint&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;cache&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;persistent&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="package-json" tabindex="-1"><a class="header-anchor" href="#package-json"><span>package.json</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;turbo dev&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;turbo build&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;turbo test&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;lint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;turbo lint&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;clean&quot;</span><span class="token operator">:</span> <span class="token string">&quot;turbo clean&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="增量构建与缓存" tabindex="-1"><a class="header-anchor" href="#增量构建与缓存"><span>增量构建与缓存</span></a></h3><p>Turborepo 默认启用缓存，会跳过未变更的任务：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">turbo build</span>
<span class="line"><span class="token comment"># 第二次运行将使用缓存，瞬间完成 ✅</span></span>
<span class="line">turbo build</span>
<span class="line"></span></code></pre></div><p>远程缓存（在 CI 中共享）：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">turbo login</span>
<span class="line">turbo <span class="token function">link</span></span>
<span class="line">turbo build</span>
<span class="line"></span></code></pre></div><h2 id="nx" tabindex="-1"><a class="header-anchor" href="#nx"><span>Nx</span></a></h2><h3 id="安装-1" tabindex="-1"><a class="header-anchor" href="#安装-1"><span>安装</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> nx</span>
<span class="line"></span></code></pre></div><h3 id="nx-json" tabindex="-1"><a class="header-anchor" href="#nx-json"><span><code>nx.json</code></span></a></h3><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;extends&quot;</span><span class="token operator">:</span> <span class="token string">&quot;nx/presets/npm.json&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;tasksRunnerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;default&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;runner&quot;</span><span class="token operator">:</span> <span class="token string">&quot;nx/tasks-runners/default&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;options&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;cacheableOperations&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;build&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;lint&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;parallel&quot;</span><span class="token operator">:</span> <span class="token number">5</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;targetDefaults&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;dependsOn&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;^build&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;inputs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;production&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;^production&quot;</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;inputs&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;default&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;^production&quot;</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常用命令-1" tabindex="-1"><a class="header-anchor" href="#常用命令-1"><span>常用命令</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 构建受影响的包</span></span>
<span class="line">nx affected:build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行测试</span></span>
<span class="line">nx run @my/web:test</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 生成项目依赖图</span></span>
<span class="line">nx graph</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 缓存清理</span></span>
<span class="line">nx reset</span>
<span class="line"></span></code></pre></div><h2 id="lerna" tabindex="-1"><a class="header-anchor" href="#lerna"><span>Lerna</span></a></h2><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;independent&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;npmClient&quot;</span><span class="token operator">:</span> <span class="token string">&quot;pnpm&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;command&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;publish&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;ignoreChanges&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;*.md&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;chore(release): publish&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;bootstrap&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">&quot;ignore&quot;</span><span class="token operator">:</span> <span class="token string">&quot;component-*&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 初始化</span></span>
<span class="line">npx lerna init</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建包</span></span>
<span class="line">npx lerna create @my/package</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 为所有包安装依赖</span></span>
<span class="line">npx lerna bootstrap</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 列出变更</span></span>
<span class="line">npx lerna changed</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 发布</span></span>
<span class="line">npx lerna publish</span>
<span class="line"></span></code></pre></div><h2 id="构建最佳实践" tabindex="-1"><a class="header-anchor" href="#构建最佳实践"><span>构建最佳实践</span></a></h2><h3 id="统一的-typescript-配置" tabindex="-1"><a class="header-anchor" href="#统一的-typescript-配置"><span>统一的 TypeScript 配置</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// packages/config/tsconfig/base.json</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;target&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ES2020&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;module&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ESNext&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;moduleResolution&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bundler&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;strict&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;esModuleInterop&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;skipLibCheck&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;declaration&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;declarationMap&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;sourceMap&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="共享-eslint-配置" tabindex="-1"><a class="header-anchor" href="#共享-eslint-配置"><span>共享 ESLint 配置</span></a></h3><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">// packages/config/eslint/index.js</span></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;@my/eslint-config-base&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token string-property property">&#39;no-console&#39;</span><span class="token operator">:</span> <span class="token string">&#39;warn&#39;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="构建脚本示例" tabindex="-1"><a class="header-anchor" href="#构建脚本示例"><span>构建脚本示例</span></a></h3><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// 根 package.json</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;turbo run dev --parallel&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;turbo run build&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;turbo run test&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;lint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;turbo run lint&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;clean&quot;</span><span class="token operator">:</span> <span class="token string">&quot;turbo run clean&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;format&quot;</span><span class="token operator">:</span> <span class="token string">&quot;prettier --write \\&quot;**/*.{ts,tsx,js,jsx,json,md}\\&quot;&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;changeset&quot;</span><span class="token operator">:</span> <span class="token string">&quot;changeset&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;release&quot;</span><span class="token operator">:</span> <span class="token string">&quot;turbo run build &amp;&amp; changeset publish&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;turbo&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^1.13.0&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;@changesets/cli&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.27.0&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;prettier&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.2.0&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><ul><li><a href="https://turbo.build/repo/docs" target="_blank" rel="noopener noreferrer">Turborepo 文档</a></li><li><a href="https://nx.dev/" target="_blank" rel="noopener noreferrer">Nx 文档</a></li><li><a href="https://pnpm.io/workspaces" target="_blank" rel="noopener noreferrer">pnpm Workspace</a></li><li><a href="https://rushjs.io/" target="_blank" rel="noopener noreferrer">Rush.js</a></li></ul>`,44)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};