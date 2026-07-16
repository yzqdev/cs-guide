import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/mc-tutor/basic/datapack/tools/mecha.html","title":"Mecha — Minecraft 命令验证器","lang":"zh-CN","frontmatter":{"description":"Mecha — Minecraft 命令验证器 GitHub PyPI 仓库：https://github.com/mcbeet/mecha 注意：Mecha 现已合并到 Beet 单仓库中，位于 packages/mecha Mecha 是一个强大的 Minecraft 命令解析与验证库，支持： 解析 .mcfunction 命令文件 验证命令语法是...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mecha — Minecraft 命令验证器\\",\\"image\\":[\\"https://img.shields.io/github/stars/mcbeet/mecha\\",\\"https://img.shields.io/pypi/v/mecha\\"],\\"dateModified\\":\\"2026-07-15T09:24:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/mc-tutor/basic/datapack/tools/mecha.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Mecha — Minecraft 命令验证器"}],["meta",{"property":"og:description","content":"Mecha — Minecraft 命令验证器 GitHub PyPI 仓库：https://github.com/mcbeet/mecha 注意：Mecha 现已合并到 Beet 单仓库中，位于 packages/mecha Mecha 是一个强大的 Minecraft 命令解析与验证库，支持： 解析 .mcfunction 命令文件 验证命令语法是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://img.shields.io/github/stars/mcbeet/mecha"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T09:24:45.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T09:24:45.000Z"}]]},"git":{"createdTime":1784107485000,"updatedTime":1784107485000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.25,"words":674},"filePathRelative":"mc-tutor/basic/datapack/tools/mecha.md","autoDesc":true}`),a={name:`mecha.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="mecha-—-minecraft-命令验证器" tabindex="-1"><a class="header-anchor" href="#mecha-—-minecraft-命令验证器"><span>Mecha — Minecraft 命令验证器</span></a></h1><p><a href="https://github.com/mcbeet/mecha" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/github/stars/mcbeet/mecha" alt="GitHub"></a><a href="https://pypi.org/project/mecha/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/pypi/v/mecha" alt="PyPI"></a></p><blockquote><p>仓库：<a href="https://github.com/mcbeet/mecha" target="_blank" rel="noopener noreferrer">https://github.com/mcbeet/mecha</a> 注意：Mecha 现已合并到 Beet 单仓库中，位于 <code>packages/mecha</code></p></blockquote><p>Mecha 是一个强大的 Minecraft 命令解析与验证库，支持：</p><ul><li>解析 <code>.mcfunction</code> 命令文件</li><li>验证命令语法是否正确</li><li>统计命令使用情况</li><li>作为 CI 检查工具</li><li>作为 Python 库集成到 Beet 构建管道</li></ul><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">pip <span class="token function">install</span> mecha</span>
<span class="line"></span></code></pre></div><h2 id="命令行使用" tabindex="-1"><a class="header-anchor" href="#命令行使用"><span>命令行使用</span></a></h2><h3 id="基础验证" tabindex="-1"><a class="header-anchor" href="#基础验证"><span>基础验证</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 验证整个数据包</span></span>
<span class="line">mecha path/to/my_data_pack</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 验证单个函数文件</span></span>
<span class="line">mecha path/to/function.mcfunction</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 验证当前目录下的所有 .mcfunction 文件</span></span>
<span class="line">mecha <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定 Minecraft 版本</span></span>
<span class="line">mecha <span class="token parameter variable">-m</span> <span class="token number">1.21</span>.4 path/to/my_data_pack</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置日志级别</span></span>
<span class="line">mecha <span class="token parameter variable">-l</span> DEBUG path/to/my_data_pack</span>
<span class="line"></span></code></pre></div><h3 id="输出示例" tabindex="-1"><a class="header-anchor" href="#输出示例"><span>输出示例</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">$ mecha my_data_pack</span>
<span class="line">Validating with mecha v0.104.1</span>
<span class="line"></span>
<span class="line">ERROR  <span class="token operator">|</span> mecha  Expected curly <span class="token string">&#39;}&#39;</span> but got bracket <span class="token string">&#39;]&#39;</span><span class="token builtin class-name">.</span></span>
<span class="line">       <span class="token operator">|</span> my_data_pack/data/demo/functions/foo.mcfunction:5:34</span>
<span class="line">       <span class="token operator">|</span>      <span class="token number">4</span> <span class="token operator">|</span></span>
<span class="line">       <span class="token operator">|</span>      <span class="token number">5</span> <span class="token operator">|</span>  say hello @a<span class="token punctuation">[</span>scores<span class="token operator">=</span><span class="token punctuation">{</span>foo<span class="token operator">=</span><span class="token number">1</span>, <span class="token assign-left variable">bar</span><span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">]</span></span>
<span class="line">       <span class="token operator">|</span>        <span class="token builtin class-name">:</span>                                   ^</span>
<span class="line"></span>
<span class="line">Error: Reported <span class="token number">1</span> error.</span>
<span class="line"></span></code></pre></div><h3 id="命令统计" tabindex="-1"><a class="header-anchor" href="#命令统计"><span>命令统计</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 收集统计信息</span></span>
<span class="line">mecha <span class="token parameter variable">-s</span> path/to/my_data_pack</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 输出到 JSON 文件</span></span>
<span class="line">mecha <span class="token parameter variable">-s</span> <span class="token parameter variable">-j</span> stats.json path/to/my_data_pack</span>
<span class="line"></span></code></pre></div><p>统计输出示例：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">INFO   | stats  Analyzed 1 function</span>
<span class="line">       | -------------------------------------------------------------------------------</span>
<span class="line">       | Total commands (1 behind execute)                                      |      4</span>
<span class="line">       | -------------------------------------------------------------------------------</span>
<span class="line">       |        /scoreboard                                                     |      3</span>
<span class="line">       |                    objectives add &lt;objective&gt; &lt;criteria&gt;               |      1</span>
<span class="line">       |                    players set &lt;targets&gt; &lt;objective&gt; &lt;score&gt;           |      1</span>
<span class="line">       |                    players operation &lt;targets&gt; &lt;targetObjective&gt; &lt;o... |      1</span>
<span class="line">       |        /setblock (1 behind execute)                                    |      1</span>
<span class="line">       |        /execute                                                        |      1</span>
<span class="line">       |                 if score &lt;target&gt; &lt;targetObjective&gt; matches &lt;range&gt;... |      1</span>
<span class="line">       |                 as &lt;targets&gt; &lt;subcommand&gt;                              |      1</span>
<span class="line">       |                 run &lt;subcommand&gt;                                       |      1</span>
<span class="line">       | -------------------------------------------------------------------------------</span>
<span class="line">       | Total selectors                                                        |      3</span>
<span class="line">       | -------------------------------------------------------------------------------</span>
<span class="line">       |        @e                                                              |      2</span>
<span class="line">       |           [tag]                                                        |      2</span>
<span class="line">       |           [scores]                                                     |      1</span>
<span class="line">       |        @s                                                              |      1</span>
<span class="line">       |        @e with missing or inverted type                                |      2</span>
<span class="line">       | -------------------------------------------------------------------------------</span>
<span class="line">       | Scoreboard objectives                                                  |      2</span>
<span class="line">       | -------------------------------------------------------------------------------</span>
<span class="line">       |        my_consts (dummy)                                               |      3</span>
<span class="line">       |                  10                                                    |      2</span>
<span class="line">       |        foo                                                             |      3</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="命令行选项" tabindex="-1"><a class="header-anchor" href="#命令行选项"><span>命令行选项</span></a></h2><table><thead><tr><th>选项</th><th>说明</th></tr></thead><tbody><tr><td><code>-m, --minecraft VERSION</code></td><td>指定 Minecraft 版本</td></tr><tr><td><code>-l, --log LEVEL</code></td><td>日志级别（DEBUG/INFO/WARNING/ERROR）</td></tr><tr><td><code>-s, --stats</code></td><td>收集统计信息</td></tr><tr><td><code>-j, --json FILENAME</code></td><td>输出统计结果为 JSON 文件</td></tr><tr><td><code>-v, --version</code></td><td>显示版本号</td></tr><tr><td><code>-h, --help</code></td><td>显示帮助</td></tr></tbody></table><h2 id="作为-python-库使用" tabindex="-1"><a class="header-anchor" href="#作为-python-库使用"><span>作为 Python 库使用</span></a></h2><h3 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法"><span>基本用法</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> mecha <span class="token keyword">import</span> Mecha</span>
<span class="line"></span>
<span class="line">mc <span class="token operator">=</span> Mecha<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 解析命令</span></span>
<span class="line">function <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;</span>
<span class="line">    execute</span>
<span class="line">        as @a</span>
<span class="line">        at @s</span>
<span class="line">        run</span>
<span class="line">            say Hello!</span>
<span class="line">&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">ast <span class="token operator">=</span> mc<span class="token punctuation">.</span>parse<span class="token punctuation">(</span>function<span class="token punctuation">,</span> multiline<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>mc<span class="token punctuation">.</span>serialize<span class="token punctuation">(</span>ast<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment"># 输出: execute as @a at @s run say Hello!</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="指定版本" tabindex="-1"><a class="header-anchor" href="#指定版本"><span>指定版本</span></a></h3><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> mecha <span class="token keyword">import</span> Mecha</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定 Minecraft 1.21.4</span></span>
<span class="line">mc <span class="token operator">=</span> Mecha<span class="token punctuation">(</span>minecraft_version<span class="token operator">=</span><span class="token string">&quot;1.21.4&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 解析并验证</span></span>
<span class="line">result <span class="token operator">=</span> mc<span class="token punctuation">.</span>parse<span class="token punctuation">(</span><span class="token string">&quot;say Hello World&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><h3 id="错误处理" tabindex="-1"><a class="header-anchor" href="#错误处理"><span>错误处理</span></a></h3><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> mecha <span class="token keyword">import</span> Mecha<span class="token punctuation">,</span> DiagnosticError</span>
<span class="line"></span>
<span class="line">mc <span class="token operator">=</span> Mecha<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">try</span><span class="token punctuation">:</span></span>
<span class="line">    mc<span class="token punctuation">.</span>parse<span class="token punctuation">(</span><span class="token string">&quot;say Hello @a[scores={foo=1, bar=2]&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">except</span> DiagnosticError <span class="token keyword">as</span> e<span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;错误: </span><span class="token interpolation"><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment"># 输出: 错误: Expected curly &#39;}&#39; but got bracket &#39;]&#39;.</span></span>
<span class="line"></span></code></pre></div><h3 id="自定义规则" tabindex="-1"><a class="header-anchor" href="#自定义规则"><span>自定义规则</span></a></h3><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> mecha <span class="token keyword">import</span> Mecha<span class="token punctuation">,</span> Visitor</span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyVisitor</span><span class="token punctuation">(</span>Visitor<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token triple-quoted-string string">&quot;&quot;&quot;自定义 AST 访问器&quot;&quot;&quot;</span></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">visit_call</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;发现命令调用: </span><span class="token interpolation"><span class="token punctuation">{</span>node<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span> node</span>
<span class="line"></span>
<span class="line">mc <span class="token operator">=</span> Mecha<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">mc<span class="token punctuation">.</span>visit<span class="token punctuation">(</span>MyVisitor<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><h2 id="与-beet-集成" tabindex="-1"><a class="header-anchor" href="#与-beet-集成"><span>与 Beet 集成</span></a></h2><p>Mecha 可以作为 Beet 的插件在构建时自动验证命令：</p><div class="language-yaml" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token comment"># beet.yaml</span></span>
<span class="line"><span class="token key atrule">pipeline</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> beet.contrib.mecha</span>
<span class="line"></span></code></pre></div><p>这样在运行 <code>beet build</code> 时，Mecha 会自动验证所有 <code>.mcfunction</code> 文件。</p><h2 id="ci-cd-集成-github-actions" tabindex="-1"><a class="header-anchor" href="#ci-cd-集成-github-actions"><span>CI/CD 集成（GitHub Actions）</span></a></h2><p>Mecha 提供了 GitHub Action，可以在每次推送时自动验证数据包：</p><div class="language-yaml" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token comment"># .github/workflows/check-commands.yml</span></span>
<span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> Check commands</span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>push<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">check</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2</span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> mcbeet/check<span class="token punctuation">-</span>commands@v1</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">source</span><span class="token punctuation">:</span> .</span>
<span class="line"></span></code></pre></div><p>这样每次推送到 GitHub 都会自动运行验证，确保命令没有语法错误。</p><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接"><span>参考链接</span></a></h2><ul><li><a href="https://github.com/mcbeet/mecha" target="_blank" rel="noopener noreferrer">GitHub 仓库</a></li><li><a href="https://github.com/mcbeet/beet" target="_blank" rel="noopener noreferrer">Beet 单仓库</a></li><li><a href="https://pypi.org/project/mecha/" target="_blank" rel="noopener noreferrer">PyPI</a></li><li><a href="https://discord.gg/98MdSGMm8j" target="_blank" rel="noopener noreferrer">Discord 社区</a></li></ul>`,37)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};