import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/node-tutor/build-system/01-vite.html","title":"Vite","lang":"zh-CN","frontmatter":{"description":"Vite Vite 是一种新型前端构建工具，开发环境下利用浏览器原生 ES Module 进行极速冷启动，生产环境基于 Rollup 打包。 核心特性 快速创建项目 可用模板：vanilla, vanilla-ts, vue, vue-ts, react, react-ts, svelte, svelte-ts, preact, preact-ts。 ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Vite\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/build-system/01-vite.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Vite"}],["meta",{"property":"og:description","content":"Vite Vite 是一种新型前端构建工具，开发环境下利用浏览器原生 ES Module 进行极速冷启动，生产环境基于 Rollup 打包。 核心特性 快速创建项目 可用模板：vanilla, vanilla-ts, vue, vue-ts, react, react-ts, svelte, svelte-ts, preact, preact-ts。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.2,"words":661},"filePathRelative":"node-tutor/build-system/01-vite.md","autoDesc":true}`),a={name:`01-vite.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="vite" tabindex="-1"><a class="header-anchor" href="#vite"><span>Vite</span></a></h1><blockquote><p>Vite 是一种新型前端构建工具，开发环境下利用浏览器原生 ES Module 进行极速冷启动，生产环境基于 Rollup 打包。</p></blockquote><h2 id="核心特性" tabindex="-1"><a class="header-anchor" href="#核心特性"><span>核心特性</span></a></h2><table><thead><tr><th>特性</th><th>说明</th></tr></thead><tbody><tr><td>极速启动</td><td>开发服务器秒级启动，无需等待打包</td></tr><tr><td>热更新（HMR）</td><td>文件变动毫秒级更新，保持应用状态</td></tr><tr><td>TypeScript 原生支持</td><td>开箱即用，无需额外配置</td></tr><tr><td>CSS 预处理器</td><td>内置 Less / Sass / Stylus 支持</td></tr><tr><td>静态资源处理</td><td>图片、字体等自动处理为构建产物 URL</td></tr></tbody></table><h2 id="快速创建项目" tabindex="-1"><a class="header-anchor" href="#快速创建项目"><span>快速创建项目</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 使用 npm</span></span>
<span class="line"><span class="token function">npm</span> create vite@latest</span>
<span class="line"><span class="token comment"># 使用 pnpm</span></span>
<span class="line"><span class="token function">pnpm</span> create vite</span>
<span class="line"><span class="token comment"># 指定模板</span></span>
<span class="line"><span class="token function">pnpm</span> create vite my-app <span class="token parameter variable">--template</span> vue-ts</span>
<span class="line"></span></code></pre></div><p>可用模板：<code>vanilla</code>, <code>vanilla-ts</code>, <code>vue</code>, <code>vue-ts</code>, <code>react</code>, <code>react-ts</code>, <code>svelte</code>, <code>svelte-ts</code>, <code>preact</code>, <code>preact-ts</code>。</p><h2 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构"><span>项目结构</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">my-app/</span>
<span class="line">├── index.html              # 入口 HTML（不在 public 内）</span>
<span class="line">├── vite.config.ts          # Vite 配置文件</span>
<span class="line">├── tsconfig.json</span>
<span class="line">├── package.json</span>
<span class="line">├── public/                 # 静态资源，直接复制到构建产物</span>
<span class="line">│   └── favicon.ico</span>
<span class="line">├── src/</span>
<span class="line">│   ├── main.ts             # 应用入口</span>
<span class="line">│   ├── App.vue</span>
<span class="line">│   ├── style.css</span>
<span class="line">│   ├── assets/             # 资源文件，会经过构建处理</span>
<span class="line">│   └── components/</span>
<span class="line">└── env.d.ts</span>
<span class="line"></span></code></pre></div><h2 id="vite-config-ts-配置" tabindex="-1"><a class="header-anchor" href="#vite-config-ts-配置"><span>vite.config.ts 配置</span></a></h2><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre><code class="language-typescript"><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span></span>
<span class="line"><span class="token keyword">import</span> vue <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-vue&#39;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> resolve <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;path&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 插件</span></span>
<span class="line">  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 开发服务器</span></span>
<span class="line">  server<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    port<span class="token operator">:</span> <span class="token number">3000</span><span class="token punctuation">,</span></span>
<span class="line">    host<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>           <span class="token comment">// 局域网可访问</span></span>
<span class="line">    proxy<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string-property property">&#39;/api&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        target<span class="token operator">:</span> <span class="token string">&#39;http://localhost:8080&#39;</span><span class="token punctuation">,</span></span>
<span class="line">        changeOrigin<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token function-variable function">rewrite</span><span class="token operator">:</span> path <span class="token operator">=&gt;</span> path<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\/api</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 构建配置</span></span>
<span class="line">  build<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    outDir<span class="token operator">:</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    sourcemap<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">    minify<span class="token operator">:</span> <span class="token string">&#39;esbuild&#39;</span><span class="token punctuation">,</span>    <span class="token comment">// &#39;esbuild&#39; | &#39;terser&#39;</span></span>
<span class="line">    target<span class="token operator">:</span> <span class="token string">&#39;es2015&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    rollupOptions<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      output<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        manualChunks<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">          vendor<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;vue&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;vue-router&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;pinia&#39;</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 路径别名</span></span>
<span class="line">  resolve<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    alias<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string-property property">&#39;@&#39;</span><span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 环境变量前缀</span></span>
<span class="line">  envPrefix<span class="token operator">:</span> <span class="token string">&#39;VITE_&#39;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量"><span>环境变量</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># .env                所有环境加载</span></span>
<span class="line"><span class="token comment"># .env.local          所有环境加载（git 忽略）</span></span>
<span class="line"><span class="token comment"># .env.development    开发环境</span></span>
<span class="line"><span class="token comment"># .env.production     生产环境</span></span>
<span class="line"><span class="token comment"># .env.development.local  开发环境覆盖（git 忽略）</span></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token assign-left variable">VITE_APP_TITLE</span><span class="token operator">=</span>My App</span>
<span class="line"><span class="token assign-left variable">VITE_API_BASE_URL</span><span class="token operator">=</span>https://api.example.com</span>
<span class="line"></span></code></pre></div><div class="language-typescript" data-highlighter="prismjs" data-ext="ts"><pre><code class="language-typescript"><span class="line"><span class="token comment">// 在代码中使用</span></span>
<span class="line"><span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VITE_APP_TITLE</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">MODE</span><span class="token punctuation">)</span>    <span class="token comment">// development | production</span></span>
<span class="line"><span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">DEV</span><span class="token punctuation">)</span>     <span class="token comment">// true/false</span></span>
<span class="line"><span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">PROD</span><span class="token punctuation">)</span>    <span class="token comment">// true/false</span></span>
<span class="line"></span></code></pre></div><h2 id="静态资源处理" tabindex="-1"><a class="header-anchor" href="#静态资源处理"><span>静态资源处理</span></a></h2><div class="language-typescript" data-highlighter="prismjs" data-ext="ts"><pre><code class="language-typescript"><span class="line"><span class="token comment">// 导入资源文件</span></span>
<span class="line"><span class="token keyword">import</span> logo <span class="token keyword">from</span> <span class="token string">&#39;./assets/logo.png&#39;</span></span>
<span class="line"><span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>logo<span class="token punctuation">)</span> <span class="token comment">// 输出构建后的 URL</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 作为字符串导入</span></span>
<span class="line"><span class="token keyword">import</span> svgContent <span class="token keyword">from</span> <span class="token string">&#39;./assets/icon.svg?raw&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 作为 URL 导入</span></span>
<span class="line"><span class="token keyword">import</span> workerUrl <span class="token keyword">from</span> <span class="token string">&#39;./worker?worker&amp;url&#39;</span></span>
<span class="line"></span></code></pre></div><p>CSS 中的 <code>url()</code> 和 <code>@import</code> 也支持别名和路径解析。</p><h2 id="构建库-插件" tabindex="-1"><a class="header-anchor" href="#构建库-插件"><span>构建库/插件</span></a></h2><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre><code class="language-typescript"><span class="line"><span class="token comment">// vite.config.ts - library mode</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> resolve <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;path&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  build<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    lib<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      entry<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;src/index.ts&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">      name<span class="token operator">:</span> <span class="token string">&#39;MyLib&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      formats<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;es&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;cjs&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;umd&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token function-variable function">fileName</span><span class="token operator">:</span> format <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">my-lib.</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>format<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.js</span><span class="token template-punctuation string">\`</span></span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    rollupOptions<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      external<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;vue&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">      output<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        globals<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">          vue<span class="token operator">:</span> <span class="token string">&#39;Vue&#39;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="插件开发" tabindex="-1"><a class="header-anchor" href="#插件开发"><span>插件开发</span></a></h2><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre><code class="language-typescript"><span class="line"><span class="token comment">// 一个简单的 Vite 插件</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">myPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Plugin <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">    name<span class="token operator">:</span> <span class="token string">&#39;vite:my-plugin&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    </span>
<span class="line">    <span class="token comment">// 转换前钩子</span></span>
<span class="line">    <span class="token function">config</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">        define<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">          __CUSTOM__<span class="token operator">:</span> <span class="token string">&#39;&quot;hello&quot;&#39;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 转换模块</span></span>
<span class="line">    <span class="token function">transform</span><span class="token punctuation">(</span>code<span class="token punctuation">,</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span>id<span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span><span class="token string">&#39;.vue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 对 .vue 文件做特殊处理</span></span>
<span class="line">        <span class="token keyword">return</span> code<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">__VERSION__</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;1.0.0&#39;</span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="生产构建优化" tabindex="-1"><a class="header-anchor" href="#生产构建优化"><span>生产构建优化</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">pnpm</span> create vite my-app <span class="token parameter variable">--template</span> react-ts</span>
<span class="line"><span class="token builtin class-name">cd</span> my-app</span>
<span class="line"><span class="token function">pnpm</span> build</span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">vite build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 输出</span></span>
<span class="line">dist/</span>
<span class="line">├── index.html</span>
<span class="line">├── assets/</span>
<span class="line">│   ├── index.abc123.js     <span class="token comment"># 应用代码</span></span>
<span class="line">│   ├── vendor.def456.js    <span class="token comment"># 第三方库</span></span>
<span class="line">│   └── index.789xyz.css    <span class="token comment"># 样式</span></span>
<span class="line"></span></code></pre></div><p>使用 <code>vite preview</code> 预览构建产物。</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><ul><li><a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">Vite 官方文档</a></li><li><a href="https://github.com/vitejs/awesome-vite" target="_blank" rel="noopener noreferrer">Awesome Vite</a></li></ul>`,28)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};