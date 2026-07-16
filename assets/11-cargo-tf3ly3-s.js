import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/go-tutor/rust-tutor/11-cargo.html","title":"Cargo 深入","lang":"zh-CN","frontmatter":{"description":"Cargo 深入 Cargo 是 Rust 的构建系统和包管理器。项目管理、依赖管理、构建配置都由 Cargo 完成。 一、Cargo 基础 1. 创建项目 2. 常用命令 二、Cargo.toml 配置 1. 基本配置 2. 依赖管理 3. 开发依赖 三、构建配置（Profile） 四、工作空间（Workspace） 五、Cargo 配置（.carg...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Cargo 深入\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T05:51:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/rust-tutor/11-cargo.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Cargo 深入"}],["meta",{"property":"og:description","content":"Cargo 深入 Cargo 是 Rust 的构建系统和包管理器。项目管理、依赖管理、构建配置都由 Cargo 完成。 一、Cargo 基础 1. 创建项目 2. 常用命令 二、Cargo.toml 配置 1. 基本配置 2. 依赖管理 3. 开发依赖 三、构建配置（Profile） 四、工作空间（Workspace） 五、Cargo 配置（.carg..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T05:51:09.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T05:51:09.000Z"}]]},"git":{"createdTime":1783921869000,"updatedTime":1783921869000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.23,"words":969},"filePathRelative":"go-tutor/rust-tutor/11-cargo.md","autoDesc":true}`),a={name:`11-cargo.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="cargo-深入" tabindex="-1"><a class="header-anchor" href="#cargo-深入"><span>Cargo 深入</span></a></h1><p>Cargo 是 Rust 的构建系统和包管理器。项目管理、依赖管理、构建配置都由 Cargo 完成。</p><h2 id="一、cargo-基础" tabindex="-1"><a class="header-anchor" href="#一、cargo-基础"><span>一、Cargo 基础</span></a></h2><h3 id="_1-创建项目" tabindex="-1"><a class="header-anchor" href="#_1-创建项目"><span>1. 创建项目</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 创建二进制项目</span></span>
<span class="line"><span class="token function">cargo</span> new my-project</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建库项目</span></span>
<span class="line"><span class="token function">cargo</span> new my-lib <span class="token parameter variable">--lib</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 目录结构</span></span>
<span class="line">my-project/</span>
<span class="line">├── Cargo.toml    <span class="token comment"># 项目配置文件</span></span>
<span class="line">├── src/</span>
<span class="line">│   └── main.rs   <span class="token comment"># 入口文件</span></span>
<span class="line">└── .gitignore</span>
<span class="line"></span></code></pre></div><h3 id="_2-常用命令" tabindex="-1"><a class="header-anchor" href="#_2-常用命令"><span>2. 常用命令</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">cargo</span> build           <span class="token comment"># 调试构建</span></span>
<span class="line"><span class="token function">cargo</span> build <span class="token parameter variable">--release</span> <span class="token comment"># 发布构建（优化）</span></span>
<span class="line"><span class="token function">cargo</span> run             <span class="token comment"># 构建并运行</span></span>
<span class="line"><span class="token function">cargo</span> check           <span class="token comment"># 快速检查（不生成二进制文件）</span></span>
<span class="line"><span class="token function">cargo</span> <span class="token builtin class-name">test</span>            <span class="token comment"># 运行测试</span></span>
<span class="line"><span class="token function">cargo</span> doc             <span class="token comment"># 生成文档</span></span>
<span class="line"><span class="token function">cargo</span> doc <span class="token parameter variable">--open</span>      <span class="token comment"># 生成文档并打开</span></span>
<span class="line"><span class="token function">cargo</span> clean           <span class="token comment"># 清理构建产物</span></span>
<span class="line"><span class="token function">cargo</span> update          <span class="token comment"># 更新依赖</span></span>
<span class="line"></span></code></pre></div><h2 id="二、cargo-toml-配置" tabindex="-1"><a class="header-anchor" href="#二、cargo-toml-配置"><span>二、Cargo.toml 配置</span></a></h2><h3 id="_1-基本配置" tabindex="-1"><a class="header-anchor" href="#_1-基本配置"><span>1. 基本配置</span></a></h3><div class="language-toml" data-highlighter="prismjs" data-ext="toml"><pre><code class="language-toml"><span class="line"><span class="token punctuation">[</span><span class="token table class-name">package</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;my-app&quot;</span></span>
<span class="line"><span class="token key property">version</span> <span class="token punctuation">=</span> <span class="token string">&quot;0.1.0&quot;</span></span>
<span class="line"><span class="token key property">edition</span> <span class="token punctuation">=</span> <span class="token string">&quot;2021&quot;</span></span>
<span class="line"><span class="token key property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;一个示例 Rust 项目&quot;</span></span>
<span class="line"><span class="token key property">authors</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;Your Name &lt;you@example.com&gt;&quot;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">license</span> <span class="token punctuation">=</span> <span class="token string">&quot;MIT&quot;</span></span>
<span class="line"><span class="token key property">repository</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://github.com/yourname/my-app&quot;</span></span>
<span class="line"><span class="token key property">readme</span> <span class="token punctuation">=</span> <span class="token string">&quot;README.md&quot;</span></span>
<span class="line"><span class="token key property">keywords</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;rust&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;example&quot;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">categories</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;command-line-utilities&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-依赖管理" tabindex="-1"><a class="header-anchor" href="#_2-依赖管理"><span>2. 依赖管理</span></a></h3><div class="language-toml line-numbers-mode" data-highlighter="prismjs" data-ext="toml"><pre><code class="language-toml"><span class="line"><span class="token punctuation">[</span><span class="token table class-name">dependencies</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token comment"># 从 crates.io 获取</span></span>
<span class="line"><span class="token key property">serde</span> <span class="token punctuation">=</span> <span class="token string">&quot;1.0&quot;</span></span>
<span class="line"><span class="token key property">serde_json</span> <span class="token punctuation">=</span> <span class="token string">&quot;1.0&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定版本范围</span></span>
<span class="line"><span class="token key property">tokio</span> <span class="token punctuation">=</span> <span class="token string">&quot;1&quot;</span>           <span class="token comment"># &gt;=1.0.0, &lt;2.0.0</span></span>
<span class="line"><span class="token key property">tokio</span> <span class="token punctuation">=</span> <span class="token string">&quot;^1.25&quot;</span>       <span class="token comment"># &gt;=1.25.0, &lt;2.0.0</span></span>
<span class="line"><span class="token key property">tokio</span> <span class="token punctuation">=</span> <span class="token string">&quot;~1.25.0&quot;</span>     <span class="token comment"># &gt;=1.25.0, &lt;1.26.0</span></span>
<span class="line"><span class="token key property">tokio</span> <span class="token punctuation">=</span> <span class="token string">&quot;=1.25.0&quot;</span>     <span class="token comment"># 精确版本</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Git 仓库依赖</span></span>
<span class="line"><span class="token key property">regex</span> <span class="token punctuation">=</span> <span class="token punctuation">{</span> <span class="token key property">git</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://github.com/rust-lang/regex&quot;</span><span class="token punctuation">,</span> <span class="token key property">branch</span> <span class="token punctuation">=</span> <span class="token string">&quot;master&quot;</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 本地路径依赖</span></span>
<span class="line"><span class="token key property">my-lib</span> <span class="token punctuation">=</span> <span class="token punctuation">{</span> <span class="token key property">path</span> <span class="token punctuation">=</span> <span class="token string">&quot;../my-lib&quot;</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 可选依赖</span></span>
<span class="line"><span class="token punctuation">[</span><span class="token table class-name">features</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">default</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;serde&quot;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">json</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;serde_json&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">[</span><span class="token table class-name">dependencies.serde</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">version</span> <span class="token punctuation">=</span> <span class="token string">&quot;1.0&quot;</span></span>
<span class="line"><span class="token key property">optional</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-开发依赖" tabindex="-1"><a class="header-anchor" href="#_3-开发依赖"><span>3. 开发依赖</span></a></h3><div class="language-toml" data-highlighter="prismjs" data-ext="toml"><pre><code class="language-toml"><span class="line"><span class="token comment"># 只在测试和开发时使用</span></span>
<span class="line"><span class="token punctuation">[</span><span class="token table class-name">dev-dependencies</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">pretty_assertions</span> <span class="token punctuation">=</span> <span class="token string">&quot;1.4&quot;</span></span>
<span class="line"><span class="token key property">criterion</span> <span class="token punctuation">=</span> <span class="token string">&quot;0.5&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 构建依赖（build.rs 中使用）</span></span>
<span class="line"><span class="token punctuation">[</span><span class="token table class-name">build-dependencies</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">cc</span> <span class="token punctuation">=</span> <span class="token string">&quot;1.0&quot;</span></span>
<span class="line"></span></code></pre></div><h2 id="三、构建配置-profile" tabindex="-1"><a class="header-anchor" href="#三、构建配置-profile"><span>三、构建配置（Profile）</span></a></h2><div class="language-toml" data-highlighter="prismjs" data-ext="toml"><pre><code class="language-toml"><span class="line"><span class="token punctuation">[</span><span class="token table class-name">profile.dev</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">opt-level</span> <span class="token punctuation">=</span> <span class="token number">0</span>          <span class="token comment"># 优化级别 0-3</span></span>
<span class="line"><span class="token key property">debug</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>           <span class="token comment"># 包含调试信息</span></span>
<span class="line"><span class="token key property">overflow-checks</span> <span class="token punctuation">=</span> <span class="token boolean">true</span> <span class="token comment"># 算术溢出检查</span></span>
<span class="line"><span class="token key property">lto</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>            <span class="token comment"># 链接时优化</span></span>
<span class="line"><span class="token key property">incremental</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>     <span class="token comment"># 增量编译</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">[</span><span class="token table class-name">profile.release</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">opt-level</span> <span class="token punctuation">=</span> <span class="token number">3</span>          <span class="token comment"># 最高优化</span></span>
<span class="line"><span class="token key property">debug</span> <span class="token punctuation">=</span> <span class="token boolean">false</span></span>
<span class="line"><span class="token key property">lto</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>             <span class="token comment"># 链接时优化</span></span>
<span class="line"><span class="token key property">codegen-units</span> <span class="token punctuation">=</span> <span class="token number">1</span>      <span class="token comment"># 单代单元（更好的优化）</span></span>
<span class="line"><span class="token key property">strip</span> <span class="token punctuation">=</span> <span class="token string">&quot;symbols&quot;</span>      <span class="token comment"># 去除符号表（减小体积）</span></span>
<span class="line"></span></code></pre></div><h2 id="四、工作空间-workspace" tabindex="-1"><a class="header-anchor" href="#四、工作空间-workspace"><span>四、工作空间（Workspace）</span></a></h2><div class="language-toml" data-highlighter="prismjs" data-ext="toml"><pre><code class="language-toml"><span class="line"><span class="token comment"># Cargo.toml（根目录）</span></span>
<span class="line"><span class="token punctuation">[</span><span class="token table class-name">workspace</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">members</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;crates/core&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;crates/cli&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;crates/server&quot;</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 依赖同一工作空间中的 crate</span></span>
<span class="line"><span class="token punctuation">[</span><span class="token table class-name">dependencies</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">core</span> <span class="token punctuation">=</span> <span class="token punctuation">{</span> <span class="token key property">path</span> <span class="token punctuation">=</span> <span class="token string">&quot;crates/core&quot;</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 工作空间命令</span></span>
<span class="line"><span class="token function">cargo</span> build <span class="token parameter variable">--workspace</span></span>
<span class="line"><span class="token function">cargo</span> <span class="token builtin class-name">test</span> <span class="token parameter variable">--workspace</span></span>
<span class="line"><span class="token function">cargo</span> run <span class="token parameter variable">-p</span> cli       <span class="token comment"># 运行工作空间中指定的 crate</span></span>
<span class="line"></span></code></pre></div><h2 id="五、cargo-配置-cargo-config-toml" tabindex="-1"><a class="header-anchor" href="#五、cargo-配置-cargo-config-toml"><span>五、Cargo 配置（.cargo/config.toml）</span></a></h2><div class="language-toml line-numbers-mode" data-highlighter="prismjs" data-ext="toml"><pre><code class="language-toml"><span class="line"><span class="token comment"># $HOME/.cargo/config.toml 或项目下的 .cargo/config.toml</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 镜像源（国内加速）</span></span>
<span class="line"><span class="token punctuation">[</span><span class="token table class-name">source.crates-io</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">replace-with</span> <span class="token punctuation">=</span> <span class="token string">&quot;rsproxy&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">[</span><span class="token table class-name">source.rsproxy</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">registry</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://rsproxy.cn/crates.io-index&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 别名</span></span>
<span class="line"><span class="token punctuation">[</span><span class="token table class-name">alias</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">b</span> <span class="token punctuation">=</span> <span class="token string">&quot;build&quot;</span></span>
<span class="line"><span class="token key property">c</span> <span class="token punctuation">=</span> <span class="token string">&quot;check&quot;</span></span>
<span class="line"><span class="token key property">t</span> <span class="token punctuation">=</span> <span class="token string">&quot;test&quot;</span></span>
<span class="line"><span class="token key property">r</span> <span class="token punctuation">=</span> <span class="token string">&quot;run&quot;</span></span>
<span class="line"><span class="token key property">rr</span> <span class="token punctuation">=</span> <span class="token string">&quot;run --release&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、条件编译" tabindex="-1"><a class="header-anchor" href="#六、条件编译"><span>六、条件编译</span></a></h2><div class="language-rust line-numbers-mode" data-highlighter="prismjs" data-ext="rs"><pre><code class="language-rust"><span class="line"><span class="token comment">// main.rs</span></span>
<span class="line"><span class="token attribute attr-name">#[cfg(target_os = <span class="token string">&quot;linux&quot;</span>)]</span></span>
<span class="line"><span class="token keyword">fn</span> <span class="token function-definition function">get_os</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">&#39;static</span> <span class="token keyword">str</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token string">&quot;Linux&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token attribute attr-name">#[cfg(target_os = <span class="token string">&quot;windows&quot;</span>)]</span></span>
<span class="line"><span class="token keyword">fn</span> <span class="token function-definition function">get_os</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">&#39;static</span> <span class="token keyword">str</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token string">&quot;Windows&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token attribute attr-name">#[cfg(target_os = <span class="token string">&quot;macos&quot;</span>)]</span></span>
<span class="line"><span class="token keyword">fn</span> <span class="token function-definition function">get_os</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">&#39;static</span> <span class="token keyword">str</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token string">&quot;macOS&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token attribute attr-name">#[cfg(not(target_os = <span class="token string">&quot;windows&quot;</span>))]</span></span>
<span class="line"><span class="token keyword">fn</span> <span class="token function-definition function">unix_only</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;只在类 Unix 系统运行&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token attribute attr-name">#[cfg(feature = <span class="token string">&quot;json&quot;</span>)]</span></span>
<span class="line"><span class="token keyword">fn</span> <span class="token function-definition function">process_json</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 需要 json feature 开启</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;当前操作系统：{}&quot;</span><span class="token punctuation">,</span> <span class="token function">get_os</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="七、功能特性-features" tabindex="-1"><a class="header-anchor" href="#七、功能特性-features"><span>七、功能特性（Features）</span></a></h2><div class="language-toml" data-highlighter="prismjs" data-ext="toml"><pre><code class="language-toml"><span class="line"><span class="token punctuation">[</span><span class="token table class-name">features</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">default</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;std&quot;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">std</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>                  <span class="token comment"># 标准库支持</span></span>
<span class="line"><span class="token key property">full</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;json&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http&quot;</span><span class="token punctuation">]</span>   <span class="token comment"># 完整功能</span></span>
<span class="line"><span class="token key property">json</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;serde&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;serde_json&quot;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">http</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;reqwest&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre></div><div class="language-rust" data-highlighter="prismjs" data-ext="rs"><pre><code class="language-rust"><span class="line"><span class="token comment">// lib.rs</span></span>
<span class="line"><span class="token attribute attr-name">#[cfg(feature = <span class="token string">&quot;json&quot;</span>)]</span></span>
<span class="line"><span class="token keyword">pub</span> <span class="token keyword">mod</span> <span class="token module-declaration namespace">json_utils</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token attribute attr-name">#[cfg(not(feature = <span class="token string">&quot;std&quot;</span>))]</span></span>
<span class="line"><span class="token keyword">extern</span> <span class="token keyword">crate</span> <span class="token module-declaration namespace">alloc</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 使用特定功能</span></span>
<span class="line"><span class="token function">cargo</span> build <span class="token parameter variable">--features</span> <span class="token string">&quot;json,http&quot;</span></span>
<span class="line"><span class="token function">cargo</span> build --no-default-features  <span class="token comment"># 禁用默认功能</span></span>
<span class="line"></span></code></pre></div><h2 id="八、构建脚本-build-rs" tabindex="-1"><a class="header-anchor" href="#八、构建脚本-build-rs"><span>八、构建脚本（build.rs）</span></a></h2><div class="language-rust line-numbers-mode" data-highlighter="prismjs" data-ext="rs"><pre><code class="language-rust"><span class="line"><span class="token comment">// build.rs（在项目根目录）</span></span>
<span class="line"><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 编译 C 代码</span></span>
<span class="line">    <span class="token comment">// cc::Build::new()</span></span>
<span class="line">    <span class="token comment">//     .file(&quot;src/native/helper.c&quot;)</span></span>
<span class="line">    <span class="token comment">//     .compile(&quot;helper&quot;);</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 生成代码</span></span>
<span class="line">    <span class="token comment">// println!(&quot;cargo:rerun-if-changed=build.rs&quot;);</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 设置环境变量</span></span>
<span class="line">    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;cargo:rustc-env=BUILD_DATE={}&quot;</span><span class="token punctuation">,</span> <span class="token namespace">chrono<span class="token punctuation">::</span></span><span class="token class-name">Utc</span><span class="token punctuation">::</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">to_rfc3339</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 传递链接参数</span></span>
<span class="line">    <span class="token comment">// println!(&quot;cargo:rustc-link-lib=static=foo&quot;);</span></span>
<span class="line">    <span class="token comment">// println!(&quot;cargo:rustc-link-search=/path/to/lib&quot;);</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="九、测试配置" tabindex="-1"><a class="header-anchor" href="#九、测试配置"><span>九、测试配置</span></a></h2><div class="language-rust line-numbers-mode" data-highlighter="prismjs" data-ext="rs"><pre><code class="language-rust"><span class="line"><span class="token comment">// src/lib.rs</span></span>
<span class="line"><span class="token keyword">pub</span> <span class="token keyword">fn</span> <span class="token function-definition function">add</span><span class="token punctuation">(</span>a<span class="token punctuation">:</span> <span class="token keyword">i32</span><span class="token punctuation">,</span> b<span class="token punctuation">:</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token keyword">i32</span> <span class="token punctuation">{</span></span>
<span class="line">    a <span class="token operator">+</span> b</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token attribute attr-name">#[cfg(test)]</span></span>
<span class="line"><span class="token keyword">mod</span> <span class="token module-declaration namespace">tests</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">use</span> <span class="token keyword">super</span><span class="token punctuation">::</span><span class="token operator">*</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token attribute attr-name">#[test]</span></span>
<span class="line">    <span class="token keyword">fn</span> <span class="token function-definition function">test_add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token macro property">assert_eq!</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token attribute attr-name">#[test]</span></span>
<span class="line">    <span class="token attribute attr-name">#[should_panic(expected = <span class="token string">&quot;除数为零&quot;</span>)]</span></span>
<span class="line">    <span class="token keyword">fn</span> <span class="token function-definition function">test_divide_by_zero</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token macro property">panic!</span><span class="token punctuation">(</span><span class="token string">&quot;除数为零&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token attribute attr-name">#[test]</span></span>
<span class="line">    <span class="token attribute attr-name">#[ignore]</span>  <span class="token comment">// 默认忽略，用 cargo test --ignored 运行</span></span>
<span class="line">    <span class="token keyword">fn</span> <span class="token function-definition function">expensive_test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 耗时的测试</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 运行测试</span></span>
<span class="line"><span class="token function">cargo</span> <span class="token builtin class-name">test</span>                     <span class="token comment"># 所有测试</span></span>
<span class="line"><span class="token function">cargo</span> <span class="token builtin class-name">test</span> test_add            <span class="token comment"># 运行名字匹配的测试</span></span>
<span class="line"><span class="token function">cargo</span> <span class="token builtin class-name">test</span> -- <span class="token parameter variable">--nocapture</span>      <span class="token comment"># 显示 println 输出</span></span>
<span class="line"><span class="token function">cargo</span> <span class="token builtin class-name">test</span> -- --test-threads<span class="token operator">=</span><span class="token number">1</span> <span class="token comment"># 单线程运行</span></span>
<span class="line"><span class="token function">cargo</span> <span class="token builtin class-name">test</span> <span class="token parameter variable">--ignored</span>           <span class="token comment"># 运行被忽略的测试</span></span>
<span class="line"><span class="token function">cargo</span> <span class="token builtin class-name">test</span> <span class="token parameter variable">--release</span>           <span class="token comment"># 发布模式运行测试</span></span>
<span class="line"></span></code></pre></div><h2 id="十、发布到-crates-io" tabindex="-1"><a class="header-anchor" href="#十、发布到-crates-io"><span>十、发布到 crates.io</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 登录</span></span>
<span class="line"><span class="token function">cargo</span> login <span class="token operator">&lt;</span>your-api-token<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 检查包是否正确</span></span>
<span class="line"><span class="token function">cargo</span> package</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 发布</span></span>
<span class="line"><span class="token function">cargo</span> publish</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 版本管理</span></span>
<span class="line"><span class="token function">cargo</span> version patch   <span class="token comment"># 0.1.0 → 0.1.1</span></span>
<span class="line"><span class="token function">cargo</span> version minor   <span class="token comment"># 0.1.0 → 0.2.0</span></span>
<span class="line"><span class="token function">cargo</span> version major   <span class="token comment"># 0.1.0 → 1.0.0</span></span>
<span class="line"></span></code></pre></div><h2 id="十一、练习" tabindex="-1"><a class="header-anchor" href="#十一、练习"><span>十一、练习</span></a></h2><ol><li>创建一个包含两个 crate 的工作空间（一个库 crate 和一个二进制 crate）</li><li>为你的库 crate 添加测试，覆盖正常情况和边界情况</li><li>配置 release profile，设置 <code>opt-level = 3</code> 和 <code>lto = true</code></li></ol>`,36)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};