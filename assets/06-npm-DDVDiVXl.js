import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/node-tutor/nodejs/06-npm.html","title":"npm 包管理","lang":"zh-CN","frontmatter":{"order":6,"description":"npm 包管理 npm（Node Package Manager）是 Node.js 默认的包管理工具，用于安装、管理和发布 JavaScript 包。 一、package.json package.json 是项目的配置文件，记录项目信息和依赖。 1. 初始化 生成的 package.json： 2. 常用字段说明 二、安装包 1. 安装命令 2. ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"npm 包管理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/nodejs/06-npm.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"npm 包管理"}],["meta",{"property":"og:description","content":"npm 包管理 npm（Node Package Manager）是 Node.js 默认的包管理工具，用于安装、管理和发布 JavaScript 包。 一、package.json package.json 是项目的配置文件，记录项目信息和依赖。 1. 初始化 生成的 package.json： 2. 常用字段说明 二、安装包 1. 安装命令 2. ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1783919775000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":4,"words":1201},"filePathRelative":"node-tutor/nodejs/06-npm.md","autoDesc":true}`),a={name:`06-npm.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="npm-包管理" tabindex="-1"><a class="header-anchor" href="#npm-包管理"><span>npm 包管理</span></a></h1><p>npm（Node Package Manager）是 Node.js 默认的包管理工具，用于安装、管理和发布 JavaScript 包。</p><h2 id="一、package-json" tabindex="-1"><a class="header-anchor" href="#一、package-json"><span>一、package.json</span></a></h2><p><code>package.json</code> 是项目的配置文件，记录项目信息和依赖。</p><h3 id="_1-初始化" tabindex="-1"><a class="header-anchor" href="#_1-初始化"><span>1. 初始化</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 交互式创建</span></span>
<span class="line"><span class="token function">npm</span> init</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用默认值快速创建</span></span>
<span class="line"><span class="token function">npm</span> init <span class="token parameter variable">-y</span></span>
<span class="line"></span></code></pre></div><p>生成的 <code>package.json</code>：</p><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my-project&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;项目描述&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;main&quot;</span><span class="token operator">:</span> <span class="token string">&quot;index.js&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;echo \\&quot;Error: no test specified\\&quot; &amp;&amp; exit 1&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;keywords&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;author&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;license&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ISC&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-常用字段说明" tabindex="-1"><a class="header-anchor" href="#_2-常用字段说明"><span>2. 常用字段说明</span></a></h3><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my-app&quot;</span><span class="token punctuation">,</span>           <span class="token comment">// 包名（必填，小写、无空格）</span></span>
<span class="line">    <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">,</span>         <span class="token comment">// 版本号（必填，遵循 semver）</span></span>
<span class="line">    <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;一个示例项目&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;main&quot;</span><span class="token operator">:</span> <span class="token string">&quot;src/index.js&quot;</span><span class="token punctuation">,</span>     <span class="token comment">// 入口文件</span></span>
<span class="line">    <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                <span class="token comment">// 可执行的脚本命令</span></span>
<span class="line">        <span class="token property">&quot;start&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node src/index.js&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node --watch src/index.js&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node build.js&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>           <span class="token comment">// 生产环境依赖</span></span>
<span class="line">        <span class="token property">&quot;express&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.18.0&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>        <span class="token comment">// 开发环境依赖</span></span>
<span class="line">        <span class="token property">&quot;nodemon&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.0.0&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;peerDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>       <span class="token comment">// 对等依赖</span></span>
<span class="line">        <span class="token property">&quot;react&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^18.0.0&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;engines&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>                <span class="token comment">// 引擎版本要求</span></span>
<span class="line">        <span class="token property">&quot;node&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&gt;=18.0.0&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;module&quot;</span><span class="token punctuation">,</span>           <span class="token comment">// 使用 ES Modules</span></span>
<span class="line">    <span class="token property">&quot;private&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>             <span class="token comment">// 防止误发布</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、安装包" tabindex="-1"><a class="header-anchor" href="#二、安装包"><span>二、安装包</span></a></h2><h3 id="_1-安装命令" tabindex="-1"><a class="header-anchor" href="#_1-安装命令"><span>1. 安装命令</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装到 dependencies（生产环境）</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> express</span>
<span class="line"><span class="token function">npm</span> i express          <span class="token comment"># 简写</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装指定版本</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> express@4.18.2</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装到 devDependencies（开发环境）</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> --save-dev nodemon</span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> nodemon  <span class="token comment"># 简写</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 全局安装</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> nodemon</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 根据 package.json 安装所有依赖</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="line"><span class="token function">npm</span> i  <span class="token comment"># 简写</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-版本号语义-semver" tabindex="-1"><a class="header-anchor" href="#_2-版本号语义-semver"><span>2. 版本号语义（SemVer）</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">主版本号.次版本号.补丁号</span>
<span class="line">  ^1.2.3  → 兼容 1.x.x（主版本不变即可更新）</span>
<span class="line">  ~1.2.3  → 兼容 1.2.x（只更新补丁号）</span>
<span class="line">  1.2.3   → 锁定精确版本</span>
<span class="line">  *       → 任意版本（不推荐）</span>
<span class="line">  &gt;=1.2.3 → 大于等于指定版本</span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看包的版本信息</span></span>
<span class="line"><span class="token function">npm</span> view express versions   <span class="token comment"># 所有可用版本</span></span>
<span class="line"><span class="token function">npm</span> view express version    <span class="token comment"># 最新版本</span></span>
<span class="line"><span class="token function">npm</span> outdated                <span class="token comment"># 查看过期依赖</span></span>
<span class="line"></span></code></pre></div><h2 id="三、node-modules-与锁文件" tabindex="-1"><a class="header-anchor" href="#三、node-modules-与锁文件"><span>三、node_modules 与锁文件</span></a></h2><h3 id="node-modules-目录" tabindex="-1"><a class="header-anchor" href="#node-modules-目录"><span>node_modules 目录</span></a></h3><p><code>node_modules</code> 存放所有已安装的包，<strong>不应提交到版本控制</strong>。</p><h3 id="package-lock-json" tabindex="-1"><a class="header-anchor" href="#package-lock-json"><span>package-lock.json</span></a></h3><p><code>package-lock.json</code> 自动生成，锁定每个依赖的精确版本号，确保团队和部署环境安装一致的依赖。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 应该提交 package-lock.json 到 Git</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> package-lock.json</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 忽略 node_modules</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;node_modules/&quot;</span> <span class="token operator">&gt;&gt;</span> .gitignore</span>
<span class="line"></span></code></pre></div><h2 id="四、npm-scripts" tabindex="-1"><a class="header-anchor" href="#四、npm-scripts"><span>四、npm scripts</span></a></h2><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;start&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node server.js&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;nodemon server.js&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;jest&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack --mode production&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;lint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eslint src/&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;format&quot;</span><span class="token operator">:</span> <span class="token string">&quot;prettier --write src/&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;preview&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite preview&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;deploy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;npm run build &amp;&amp; rsync -avz dist/ user@server:/app/&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 运行脚本</span></span>
<span class="line"><span class="token function">npm</span> start          <span class="token comment"># start/test 可以省略 run</span></span>
<span class="line"><span class="token function">npm</span> run dev</span>
<span class="line"><span class="token function">npm</span> run build</span>
<span class="line"><span class="token function">npm</span> run lint</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 生命周期钩子</span></span>
<span class="line"><span class="token comment"># prestart → start → poststart（自动运行）</span></span>
<span class="line"><span class="token function">npm</span> run lint:fix   <span class="token comment"># 自定义脚本名</span></span>
<span class="line"></span></code></pre></div><h2 id="五、更新与卸载" tabindex="-1"><a class="header-anchor" href="#五、更新与卸载"><span>五、更新与卸载</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 更新包</span></span>
<span class="line"><span class="token function">npm</span> update express          <span class="token comment"># 按 semver 更新</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> express@latest  <span class="token comment"># 更新到最新版</span></span>
<span class="line"><span class="token function">npm</span> outdated                <span class="token comment"># 查看可更新的包</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 卸载包</span></span>
<span class="line"><span class="token function">npm</span> uninstall express</span>
<span class="line"><span class="token function">npm</span> un express         <span class="token comment"># 简写</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 从 devDependencies 卸载</span></span>
<span class="line"><span class="token function">npm</span> uninstall <span class="token parameter variable">-D</span> nodemon</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 全局卸载</span></span>
<span class="line"><span class="token function">npm</span> uninstall <span class="token parameter variable">-g</span> nodemon</span>
<span class="line"></span></code></pre></div><h2 id="六、npx-——-直接运行包" tabindex="-1"><a class="header-anchor" href="#六、npx-——-直接运行包"><span>六、npx —— 直接运行包</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 无需安装，直接运行</span></span>
<span class="line">npx create-react-app my-app</span>
<span class="line">npx cowsay <span class="token string">&quot;Hello Node.js&quot;</span></span>
<span class="line">npx http-server</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行项目本地安装的包</span></span>
<span class="line">npx eslint src/</span>
<span class="line">npx prettier <span class="token parameter variable">--write</span> <span class="token builtin class-name">.</span></span>
<span class="line"></span></code></pre></div><h2 id="七、常用-npm-命令速查" tabindex="-1"><a class="header-anchor" href="#七、常用-npm-命令速查"><span>七、常用 npm 命令速查</span></a></h2><table><thead><tr><th>命令</th><th>作用</th></tr></thead><tbody><tr><td><code>npm init -y</code></td><td>快速初始化项目</td></tr><tr><td><code>npm install</code></td><td>安装所有依赖</td></tr><tr><td><code>npm i express</code></td><td>安装包到 dependencies</td></tr><tr><td><code>npm i -D nodemon</code></td><td>安装包到 devDependencies</td></tr><tr><td><code>npm un express</code></td><td>卸载包</td></tr><tr><td><code>npm update</code></td><td>更新所有包</td></tr><tr><td><code>npm outdated</code></td><td>查看可更新包</td></tr><tr><td><code>npm ls --depth=0</code></td><td>查看顶层依赖</td></tr><tr><td><code>npm cache clean --force</code></td><td>清除缓存</td></tr><tr><td><code>npm audit</code></td><td>安全审计</td></tr><tr><td><code>npm audit fix</code></td><td>自动修复安全漏洞</td></tr><tr><td><code>npm run</code></td><td>列出所有可用脚本</td></tr><tr><td><code>npx cowsay hi</code></td><td>直接运行命令</td></tr></tbody></table><h2 id="八、package-json-完整示例" tabindex="-1"><a class="header-anchor" href="#八、package-json-完整示例"><span>八、package.json 完整示例</span></a></h2><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node-api-server&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Node.js RESTful API 服务&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;main&quot;</span><span class="token operator">:</span> <span class="token string">&quot;src/index.js&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;module&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;start&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node src/index.js&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node --watch src/index.js&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node --experimental-vm-modules node_modules/.bin/jest&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;lint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eslint src/&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;format&quot;</span><span class="token operator">:</span> <span class="token string">&quot;prettier --write &#39;src/**/*.js&#39;&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;express&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.18.2&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;cors&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.8.5&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;helmet&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^7.0.0&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;morgan&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^1.10.0&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;nodemon&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.0.0&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;eslint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^8.50.0&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;prettier&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.0.0&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;jest&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^29.0.0&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;engines&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;node&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&gt;=18.0.0&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;private&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="九、使用-npmrc-配置" tabindex="-1"><a class="header-anchor" href="#九、使用-npmrc-配置"><span>九、使用 <code>.npmrc</code> 配置</span></a></h2><p><code>.npmrc</code> 文件可以配置 npm 的行为：</p><div class="language-ini" data-highlighter="prismjs" data-ext="ini"><pre><code class="language-ini"><span class="line"><span class="token comment"># 设置镜像源（国内加速）</span></span>
<span class="line"><span class="token key attr-name">registry</span><span class="token punctuation">=</span><span class="token value attr-value">https://registry.npmmirror.com</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或者使用淘宝镜像</span></span>
<span class="line"><span class="token comment"># registry=https://registry.npm.taobao.org</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 保存精确版本号</span></span>
<span class="line"><span class="token key attr-name">save-exact</span><span class="token punctuation">=</span><span class="token value attr-value">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 禁止运行 install 脚本（安全性）</span></span>
<span class="line"><span class="token key attr-name">ignore-scripts</span><span class="token punctuation">=</span><span class="token value attr-value">false</span></span>
<span class="line"></span></code></pre></div><p>也可以在命令行临时切换源：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看当前源</span></span>
<span class="line"><span class="token function">npm</span> config get registry</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置镜像源</span></span>
<span class="line"><span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry https://registry.npmmirror.com</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 临时使用不同源安装</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> express <span class="token parameter variable">--registry</span><span class="token operator">=</span>https://registry.npmjs.org</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用 nrm 管理源</span></span>
<span class="line">npx nrm use taobao</span>
<span class="line">npx nrm <span class="token function">ls</span></span>
<span class="line"></span></code></pre></div><h2 id="十、yarn-与-pnpm-对比" tabindex="-1"><a class="header-anchor" href="#十、yarn-与-pnpm-对比"><span>十、yarn 与 pnpm 对比</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># Yarn（Facebook）</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> <span class="token function">yarn</span></span>
<span class="line"><span class="token function">yarn</span> init</span>
<span class="line"><span class="token function">yarn</span> <span class="token function">add</span> express</span>
<span class="line"><span class="token function">yarn</span> remove express</span>
<span class="line"></span>
<span class="line"><span class="token comment"># pnpm（磁盘效率更高）</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> <span class="token function">pnpm</span></span>
<span class="line"><span class="token function">pnpm</span> init</span>
<span class="line"><span class="token function">pnpm</span> <span class="token function">add</span> express</span>
<span class="line"><span class="token function">pnpm</span> remove express</span>
<span class="line"></span></code></pre></div><h2 id="十一、发布自己的包" tabindex="-1"><a class="header-anchor" href="#十一、发布自己的包"><span>十一、发布自己的包</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 登录 npm</span></span>
<span class="line"><span class="token function">npm</span> login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 准备包</span></span>
<span class="line"><span class="token comment">#    确保 package.json 有 name、version、main 字段</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 发布</span></span>
<span class="line"><span class="token function">npm</span> publish</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 更新版本</span></span>
<span class="line"><span class="token function">npm</span> version patch  <span class="token comment"># 1.0.0 → 1.0.1</span></span>
<span class="line"><span class="token function">npm</span> version minor  <span class="token comment"># 1.0.0 → 1.1.0</span></span>
<span class="line"><span class="token function">npm</span> version major  <span class="token comment"># 1.0.0 → 2.0.0</span></span>
<span class="line"><span class="token function">npm</span> publish</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 取消发布（72小时内）</span></span>
<span class="line"><span class="token function">npm</span> unpublish my-package@1.0.0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十二、常见问题" tabindex="-1"><a class="header-anchor" href="#十二、常见问题"><span>十二、常见问题</span></a></h2><h3 id="_1-权限错误-mac-linux" tabindex="-1"><a class="header-anchor" href="#_1-权限错误-mac-linux"><span>1. 权限错误（Mac/Linux）</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 不要使用 sudo npm install</span></span>
<span class="line"><span class="token comment"># 推荐配置前缀</span></span>
<span class="line"><span class="token function">npm</span> config <span class="token builtin class-name">set</span> prefix ~/.npm-global</span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&#39;export PATH=~/.npm-global/bin:$PATH&#39;</span> <span class="token operator">&gt;&gt;</span> ~/.zshrc</span>
<span class="line"></span></code></pre></div><h3 id="_2-依赖冲突" tabindex="-1"><a class="header-anchor" href="#_2-依赖冲突"><span>2. 依赖冲突</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 使用 --legacy-peer-deps 解决冲突</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> --legacy-peer-deps</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或者清除重装</span></span>
<span class="line"><span class="token function">rm</span> <span class="token parameter variable">-rf</span> node_modules package-lock.json</span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="line"></span></code></pre></div><h3 id="_3-安全审计" tabindex="-1"><a class="header-anchor" href="#_3-安全审计"><span>3. 安全审计</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 检查安全漏洞</span></span>
<span class="line"><span class="token function">npm</span> audit</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 自动修复</span></span>
<span class="line"><span class="token function">npm</span> audit fix</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看详细报告</span></span>
<span class="line"><span class="token function">npm</span> audit <span class="token parameter variable">--json</span></span>
<span class="line"></span></code></pre></div>`,49)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};