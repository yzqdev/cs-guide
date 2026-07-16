import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/frontend/bun/commands.html","title":"Bun 常用命令与包管理","lang":"zh-CN","frontmatter":{"description":"Bun 常用命令与包管理 Bun 内置包管理器、脚本运行器和 CLI 工具，完全兼容 npm 生态。 包管理命令 Bun 的包管理器比 npm 快 10-30 倍。 安装依赖 移除依赖 更新依赖 管理锁文件 运行脚本 运行文件 热重载 传递参数 打包 bun build — 打包器 Bun 内置了高效的打包器（基于 esbuild API）。 配置选项...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Bun 常用命令与包管理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T12:21:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/bun/commands.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Bun 常用命令与包管理"}],["meta",{"property":"og:description","content":"Bun 常用命令与包管理 Bun 内置包管理器、脚本运行器和 CLI 工具，完全兼容 npm 生态。 包管理命令 Bun 的包管理器比 npm 快 10-30 倍。 安装依赖 移除依赖 更新依赖 管理锁文件 运行脚本 运行文件 热重载 传递参数 打包 bun build — 打包器 Bun 内置了高效的打包器（基于 esbuild API）。 配置选项..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T12:21:11.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T12:21:11.000Z"}]]},"git":{"createdTime":1783945271000,"updatedTime":1783945271000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.82,"words":1146},"filePathRelative":"frontend/bun/commands.md","autoDesc":true}`),a={name:`commands.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="bun-常用命令与包管理" tabindex="-1"><a class="header-anchor" href="#bun-常用命令与包管理"><span>Bun 常用命令与包管理</span></a></h1><blockquote><p>Bun 内置包管理器、脚本运行器和 CLI 工具，完全兼容 npm 生态。</p></blockquote><hr><h2 id="包管理命令" tabindex="-1"><a class="header-anchor" href="#包管理命令"><span>包管理命令</span></a></h2><p>Bun 的包管理器比 npm 快 10-30 倍。</p><h3 id="安装依赖" tabindex="-1"><a class="header-anchor" href="#安装依赖"><span>安装依赖</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装 package.json 中的所有依赖</span></span>
<span class="line">bun <span class="token function">install</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装指定包</span></span>
<span class="line">bun <span class="token function">add</span> express</span>
<span class="line">bun <span class="token function">add</span> react react-dom</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装开发依赖</span></span>
<span class="line">bun <span class="token function">add</span> <span class="token parameter variable">-d</span> typescript @types/bun</span>
<span class="line">bun <span class="token function">add</span> <span class="token parameter variable">--dev</span> eslint</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装全局包</span></span>
<span class="line">bun <span class="token function">add</span> <span class="token parameter variable">-g</span> bun</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装特定版本</span></span>
<span class="line">bun <span class="token function">add</span> lodash@4.17.21</span>
<span class="line">bun <span class="token function">add</span> zod@latest</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 根据 package.json 锁版本安装</span></span>
<span class="line">bun <span class="token function">install</span> --frozen-lockfile</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="移除依赖" tabindex="-1"><a class="header-anchor" href="#移除依赖"><span>移除依赖</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">bun remove lodash</span>
<span class="line">bun remove react react-dom</span>
<span class="line"></span></code></pre></div><h3 id="更新依赖" tabindex="-1"><a class="header-anchor" href="#更新依赖"><span>更新依赖</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 更新所有依赖</span></span>
<span class="line">bun update</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 更新指定包</span></span>
<span class="line">bun update express</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查过时包</span></span>
<span class="line">bun outdated</span>
<span class="line"></span></code></pre></div><h3 id="管理锁文件" tabindex="-1"><a class="header-anchor" href="#管理锁文件"><span>管理锁文件</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># bun.lock — Bun 的锁文件（二进制格式）</span></span>
<span class="line"><span class="token comment"># 比 package-lock.json 小 10x，生成快 100x</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 生成/更新 bun.lock</span></span>
<span class="line">bun <span class="token function">install</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 从 package-lock.json 迁移</span></span>
<span class="line"><span class="token comment"># 删除 node_modules 和 package-lock.json</span></span>
<span class="line"><span class="token function">rm</span> <span class="token parameter variable">-rf</span> node_modules package-lock.json</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 然后运行 bun install 生成 bun.lock</span></span>
<span class="line">bun <span class="token function">install</span></span>
<span class="line"></span></code></pre></div><hr><h2 id="运行脚本" tabindex="-1"><a class="header-anchor" href="#运行脚本"><span>运行脚本</span></a></h2><h3 id="运行文件" tabindex="-1"><a class="header-anchor" href="#运行文件"><span>运行文件</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 运行 TypeScript/JavaScript 文件</span></span>
<span class="line">bun run index.ts</span>
<span class="line">bun run app.js</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 不指定 run 也可以（简写）</span></span>
<span class="line">bun index.ts</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行 package.json 中的脚本</span></span>
<span class="line">bun run dev</span>
<span class="line">bun run build</span>
<span class="line">bun run <span class="token builtin class-name">test</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 简写形式</span></span>
<span class="line">bun dev</span>
<span class="line">bun build</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="热重载" tabindex="-1"><a class="header-anchor" href="#热重载"><span>热重载</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># --watch 模式：文件变动自动重启</span></span>
<span class="line">bun run <span class="token parameter variable">--watch</span> server.ts</span>
<span class="line"></span>
<span class="line"><span class="token comment"># --hot 模式：实时重载（不重启进程，仅替换模块）</span></span>
<span class="line">bun run <span class="token parameter variable">--hot</span> server.ts</span>
<span class="line"></span></code></pre></div><h3 id="传递参数" tabindex="-1"><a class="header-anchor" href="#传递参数"><span>传递参数</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">bun run script.ts -- <span class="token parameter variable">--port</span> <span class="token number">3000</span> <span class="token parameter variable">--debug</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># script.ts 中通过 process.argv 获取</span></span>
<span class="line">console.log<span class="token punctuation">(</span>process.argv<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">// <span class="token punctuation">[</span><span class="token string">&#39;bun&#39;</span>, <span class="token string">&#39;script.ts&#39;</span>, <span class="token string">&#39;--port&#39;</span>, <span class="token string">&#39;3000&#39;</span>, <span class="token string">&#39;--debug&#39;</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre></div><hr><h2 id="打包" tabindex="-1"><a class="header-anchor" href="#打包"><span>打包</span></a></h2><h3 id="bun-build-—-打包器" tabindex="-1"><a class="header-anchor" href="#bun-build-—-打包器"><span>bun build — 打包器</span></a></h3><p>Bun 内置了高效的打包器（基于 esbuild API）。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 基本用法</span></span>
<span class="line">bun build ./src/index.ts <span class="token parameter variable">--outdir</span> ./dist</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定入口和输出</span></span>
<span class="line">bun build ./src/index.ts <span class="token parameter variable">--outfile</span> ./dist/bundle.js</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 支持多个入口</span></span>
<span class="line">bun build ./src/index.ts ./src/worker.ts <span class="token parameter variable">--outdir</span> ./dist</span>
<span class="line"></span></code></pre></div><h3 id="配置选项" tabindex="-1"><a class="header-anchor" href="#配置选项"><span>配置选项</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 生成 sourcemap</span></span>
<span class="line">bun build ./src/index.ts <span class="token parameter variable">--outdir</span> ./dist <span class="token parameter variable">--sourcemap</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 压缩输出</span></span>
<span class="line">bun build ./src/index.ts <span class="token parameter variable">--outdir</span> ./dist <span class="token parameter variable">--minify</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定目标平台</span></span>
<span class="line">bun build ./src/index.ts <span class="token parameter variable">--outdir</span> ./dist <span class="token parameter variable">--target</span> browser</span>
<span class="line">bun build ./src/index.ts <span class="token parameter variable">--outdir</span> ./dist <span class="token parameter variable">--target</span> bun</span>
<span class="line">bun build ./src/index.ts <span class="token parameter variable">--outdir</span> ./dist <span class="token parameter variable">--target</span> <span class="token function">node</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 代码分割</span></span>
<span class="line">bun build ./src/index.ts <span class="token parameter variable">--outdir</span> ./dist <span class="token parameter variable">--splitting</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 外部依赖（不打包进输出）</span></span>
<span class="line">bun build ./src/index.ts <span class="token parameter variable">--outdir</span> ./dist <span class="token parameter variable">--external</span> react</span>
<span class="line">bun build ./src/index.ts <span class="token parameter variable">--outdir</span> ./dist <span class="token parameter variable">--external</span> <span class="token string">&#39;*&#39;</span>  <span class="token comment"># 所有依赖外部化</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 环境变量注入</span></span>
<span class="line">bun build ./src/index.ts <span class="token parameter variable">--outdir</span> ./dist <span class="token parameter variable">--define</span> <span class="token assign-left variable">API_URL</span><span class="token operator">=</span>https://api.example.com</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 加载器</span></span>
<span class="line">bun build ./src/index.ts <span class="token parameter variable">--outdir</span> ./dist <span class="token parameter variable">--loader</span> .png:file</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="完整构建示例" tabindex="-1"><a class="header-anchor" href="#完整构建示例"><span>完整构建示例</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 生产构建</span></span>
<span class="line">bun build ./src/index.ts <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--outdir</span> ./dist <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--minify</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--sourcemap</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--target</span> browser <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--splitting</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--external</span> react <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--external</span> react-dom</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 构建输出</span></span>
<span class="line"><span class="token comment"># dist/</span></span>
<span class="line"><span class="token comment"># ├── index.js      # 打包后的文件</span></span>
<span class="line"><span class="token comment"># ├── index.js.map  # sourcemap</span></span>
<span class="line"><span class="token comment"># └── chunk-xxx.js  # 代码分割的 chunk</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="测试" tabindex="-1"><a class="header-anchor" href="#测试"><span>测试</span></a></h2><h3 id="bun-test-—-测试运行器" tabindex="-1"><a class="header-anchor" href="#bun-test-—-测试运行器"><span>bun test — 测试运行器</span></a></h3><p>Bun 内置测试框架，兼容 Jest API。</p><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre><code class="language-typescript"><span class="line"><span class="token comment">// math.test.ts</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> describe<span class="token punctuation">,</span> expect<span class="token punctuation">,</span> test<span class="token punctuation">,</span> beforeAll<span class="token punctuation">,</span> afterAll<span class="token punctuation">,</span> mock <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;bun:test&quot;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 基础测试</span></span>
<span class="line"><span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;Math operations&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&quot;1 + 1 = 2&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&quot;2 * 3 = 6&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 异步测试</span></span>
<span class="line"><span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;Async&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&quot;async function&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token function">expect</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Mock 函数</span></span>
<span class="line"><span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;Mock&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&quot;mock function&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> fn <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token function">expect</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledTimes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 生命周期</span></span>
<span class="line"><span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;Lifecycle&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">beforeAll</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;在所有测试之前执行&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token function">afterAll</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;在所有测试之后执行&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&quot;test with lifecycle&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运行测试" tabindex="-1"><a class="header-anchor" href="#运行测试"><span>运行测试</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 运行所有测试（匹配 *.test.ts / *_test.ts / *.spec.ts）</span></span>
<span class="line">bun <span class="token builtin class-name">test</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行特定文件</span></span>
<span class="line">bun <span class="token builtin class-name">test</span> math.test.ts</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用过滤</span></span>
<span class="line">bun <span class="token builtin class-name">test</span> <span class="token parameter variable">--filter</span> <span class="token string">&quot;math&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行测试并监听</span></span>
<span class="line">bun <span class="token builtin class-name">test</span> <span class="token parameter variable">--watch</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 生成覆盖率报告</span></span>
<span class="line">bun <span class="token builtin class-name">test</span> <span class="token parameter variable">--coverage</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 更新 snapshot</span></span>
<span class="line">bun <span class="token builtin class-name">test</span> --update-snapshots</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试配置" tabindex="-1"><a class="header-anchor" href="#测试配置"><span>测试配置</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// package.json</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bun test&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;test:watch&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bun test --watch&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;test:coverage&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bun test --coverage&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><hr><h2 id="工作区-monorepo" tabindex="-1"><a class="header-anchor" href="#工作区-monorepo"><span>工作区（Monorepo）</span></a></h2><p>Bun 支持 npm/yarn/pnpm 风格的工作区：</p><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// 根目录 package.json</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my-monorepo&quot;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;private&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">&quot;workspaces&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;packages/*&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;apps/*&quot;</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="工作区命令" tabindex="-1"><a class="header-anchor" href="#工作区命令"><span>工作区命令</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装所有工作区依赖</span></span>
<span class="line">bun <span class="token function">install</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 向特定工作区添加依赖</span></span>
<span class="line">bun <span class="token function">add</span> lodash <span class="token parameter variable">--workspace</span> packages/utils</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行工作区脚本</span></span>
<span class="line">bun run <span class="token parameter variable">--filter</span> @my-app/server dev</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看工作区依赖关系</span></span>
<span class="line">bun pm <span class="token function">ls</span></span>
<span class="line"></span></code></pre></div><hr><h2 id="bun-特有命令" tabindex="-1"><a class="header-anchor" href="#bun-特有命令"><span>Bun 特有命令</span></a></h2><table><thead><tr><th>命令</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td><code>bun run</code></td><td>运行文件或脚本</td><td><code>bun run index.ts</code></td></tr><tr><td><code>bun add</code></td><td>添加依赖</td><td><code>bun add express</code></td></tr><tr><td><code>bun remove</code></td><td>移除依赖</td><td><code>bun remove lodash</code></td></tr><tr><td><code>bun install</code></td><td>安装所有依赖</td><td><code>bun install</code></td></tr><tr><td><code>bun update</code></td><td>更新依赖</td><td><code>bun update</code></td></tr><tr><td><code>bun build</code></td><td>打包代码</td><td><code>bun build ./src/index.ts</code></td></tr><tr><td><code>bun test</code></td><td>运行测试</td><td><code>bun test</code></td></tr><tr><td><code>bun create</code></td><td>创建项目模板</td><td><code>bun create elysia my-app</code></td></tr><tr><td><code>bun init</code></td><td>初始化项目</td><td><code>bun init -y</code></td></tr><tr><td><code>bun upgrade</code></td><td>升级 Bun 版本</td><td><code>bun upgrade</code></td></tr><tr><td><code>bun pm ls</code></td><td>查看已安装包</td><td><code>bun pm ls</code></td></tr><tr><td><code>bun pm cache</code></td><td>管理缓存</td><td><code>bun pm cache rm</code></td></tr><tr><td><code>bun x</code></td><td>直接运行 npm 包（类似 npx）</td><td><code>bun x cowsay &quot;Hello&quot;</code></td></tr></tbody></table><hr><h2 id="与-npm-pnpm-yarn-兼容的命令" tabindex="-1"><a class="header-anchor" href="#与-npm-pnpm-yarn-兼容的命令"><span>与 npm/pnpm/yarn 兼容的命令</span></a></h2><table><thead><tr><th>npm 命令</th><th>Bun 等价</th><th>说明</th></tr></thead><tbody><tr><td><code>npm install</code></td><td><code>bun install</code></td><td>安装依赖</td></tr><tr><td><code>npm add &lt;pkg&gt;</code></td><td><code>bun add &lt;pkg&gt;</code></td><td>添加依赖</td></tr><tr><td><code>npm remove &lt;pkg&gt;</code></td><td><code>bun remove &lt;pkg&gt;</code></td><td>移除依赖</td></tr><tr><td><code>npm run &lt;script&gt;</code></td><td><code>bun run &lt;script&gt;</code></td><td>运行脚本</td></tr><tr><td><code>npm test</code></td><td><code>bun test</code></td><td>运行测试</td></tr><tr><td><code>npx &lt;pkg&gt;</code></td><td><code>bun x &lt;pkg&gt;</code></td><td>直接运行包</td></tr><tr><td><code>npm init</code></td><td><code>bun init</code></td><td>初始化项目</td></tr><tr><td><code>npm publish</code></td><td><code>bun publish</code></td><td>发布包</td></tr><tr><td><code>npm link</code></td><td><code>bun link</code></td><td>链接本地包</td></tr><tr><td><code>npm outdated</code></td><td><code>bun outdated</code></td><td>检查过时包</td></tr><tr><td><code>npm update</code></td><td><code>bun update</code></td><td>更新依赖</td></tr><tr><td><code>npm cache clean</code></td><td><code>bun pm cache rm</code></td><td>清理缓存</td></tr></tbody></table>`,51)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};