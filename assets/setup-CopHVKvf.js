import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/mc-tutor/basic/datapack/setup.html","title":"Minecraft 数据包基础","lang":"zh-CN","frontmatter":{"description":"Minecraft 数据包基础 官方文档 什么是数据包 数据包（Datapack）是 Minecraft 1.13+ 引入的机制，允许在不安装 MOD 的情况下修改游戏内容，包括： 自定义合成配方和战利品表 自定义进度和成就 自定义函数（命令组） 自定义世界生成 自定义谓词和物品修饰器 数据包结构 命名空间 每个数据包使用命名空间来避免冲突： 建议使用...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Minecraft 数据包基础\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T05:16:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/mc-tutor/basic/datapack/setup.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Minecraft 数据包基础"}],["meta",{"property":"og:description","content":"Minecraft 数据包基础 官方文档 什么是数据包 数据包（Datapack）是 Minecraft 1.13+ 引入的机制，允许在不安装 MOD 的情况下修改游戏内容，包括： 自定义合成配方和战利品表 自定义进度和成就 自定义函数（命令组） 自定义世界生成 自定义谓词和物品修饰器 数据包结构 命名空间 每个数据包使用命名空间来避免冲突： 建议使用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T05:16:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T05:16:15.000Z"}]]},"git":{"createdTime":1783919775000,"updatedTime":1783919775000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.35,"words":704},"filePathRelative":"mc-tutor/basic/datapack/setup.md","autoDesc":true}`),a={name:`setup.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="minecraft-数据包基础" tabindex="-1"><a class="header-anchor" href="#minecraft-数据包基础"><span>Minecraft 数据包基础</span></a></h1><p><a href="https://minecraft.wiki/w/Data_pack" target="_blank" rel="noopener noreferrer">官方文档</a></p><h2 id="什么是数据包" tabindex="-1"><a class="header-anchor" href="#什么是数据包"><span>什么是数据包</span></a></h2><p>数据包（Datapack）是 Minecraft 1.13+ 引入的机制，允许在不安装 MOD 的情况下修改游戏内容，包括：</p><ul><li>自定义合成配方和战利品表</li><li>自定义进度和成就</li><li>自定义函数（命令组）</li><li>自定义世界生成</li><li>自定义谓词和物品修饰器</li></ul><h2 id="数据包结构" tabindex="-1"><a class="header-anchor" href="#数据包结构"><span>数据包结构</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">datapack_name/</span>
<span class="line">├── pack.mcmeta                  # 数据包描述文件</span>
<span class="line">├── pack.png                     # 数据包图标（可选）</span>
<span class="line">└── data/</span>
<span class="line">    ├── &lt;命名空间&gt;/</span>
<span class="line">    │   ├── functions/           # 函数文件</span>
<span class="line">    │   │   └── example.mcfunction</span>
<span class="line">    │   ├── advancements/        # 进度文件</span>
<span class="line">    │   │   └── example.json</span>
<span class="line">    │   ├── recipes/             # 合成配方</span>
<span class="line">    │   │   └── example.json</span>
<span class="line">    │   ├── loot_tables/         # 战利品表</span>
<span class="line">    │   │   └── blocks/</span>
<span class="line">    │   │       └── example.json</span>
<span class="line">    │   ├── predicates/          # 谓词</span>
<span class="line">    │   │   └── example.json</span>
<span class="line">    │   ├── item_modifiers/      # 物品修饰器</span>
<span class="line">    │   ├── tags/                # 标签</span>
<span class="line">    │   │   ├── blocks/</span>
<span class="line">    │   │   ├── items/</span>
<span class="line">    │   │   └── entity_types/</span>
<span class="line">    │   ├── worldgen/            # 世界生成</span>
<span class="line">    │   │   ├── biome/</span>
<span class="line">    │   │   ├── configured_feature/</span>
<span class="line">    │   │   ├── placed_feature/</span>
<span class="line">    │   │   ├── structure/</span>
<span class="line">    │   │   └── dimension/</span>
<span class="line">    │   └── dimension_type/      # 维度类型</span>
<span class="line">    └── minecraft/               # 覆盖原版命名空间</span>
<span class="line">        └── tags/</span>
<span class="line">            └── functions/</span>
<span class="line">                └── tick.json    # 每 tick 执行的函数</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="命名空间" tabindex="-1"><a class="header-anchor" href="#命名空间"><span>命名空间</span></a></h3><p>每个数据包使用<strong>命名空间</strong>来避免冲突：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">data/&lt;namespace&gt;/&lt;type&gt;/&lt;path&gt;.json</span>
<span class="line"></span></code></pre></div><ul><li>建议使用小写字母和下划线</li><li>你的数据包通常使用自定义命名空间，例如 <code>my_pack</code></li><li>使用 <code>minecraft</code> 命名空间可以覆盖原版内容</li></ul><h2 id="pack-mcmeta" tabindex="-1"><a class="header-anchor" href="#pack-mcmeta"><span>pack.mcmeta</span></a></h2><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;pack&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;pack_format&quot;</span><span class="token operator">:</span> <span class="token number">48</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;§b我的第一个数据包\\n§7版本 1.0&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="pack-format-版本对照" tabindex="-1"><a class="header-anchor" href="#pack-format-版本对照"><span>pack_format 版本对照</span></a></h3><table><thead><tr><th>版本</th><th>pack_format</th></tr></thead><tbody><tr><td>1.21.4</td><td>48</td></tr><tr><td>1.21</td><td>42</td></tr><tr><td>1.20.5</td><td>41</td></tr><tr><td>1.20.2</td><td>18</td></tr><tr><td>1.19.4</td><td>13</td></tr><tr><td>1.18.2</td><td>10</td></tr><tr><td>1.17</td><td>7</td></tr><tr><td>1.16.2</td><td>6</td></tr><tr><td>1.15</td><td>5</td></tr><tr><td>1.14</td><td>4</td></tr><tr><td>1.13</td><td>3</td></tr></tbody></table><h2 id="安装数据包" tabindex="-1"><a class="header-anchor" href="#安装数据包"><span>安装数据包</span></a></h2><h3 id="单机世界" tabindex="-1"><a class="header-anchor" href="#单机世界"><span>单机世界</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1. 打开世界文件夹</span>
<span class="line">   .minecraft/saves/&lt;世界名称&gt;/datapacks/</span>
<span class="line"></span>
<span class="line">2. 将数据包文件夹或.zip 文件放入该目录</span>
<span class="line"></span>
<span class="line">3. 进入世界后使用命令：</span>
<span class="line">   /datapack list       # 查看已加载的数据包</span>
<span class="line">   /datapack enable &lt;名称&gt;  # 启用数据包</span>
<span class="line">   /datapack disable &lt;名称&gt; # 禁用数据包</span>
<span class="line"></span>
<span class="line">4. 重载数据包：</span>
<span class="line">   /reload</span>
<span class="line"></span></code></pre></div><h3 id="服务器" tabindex="-1"><a class="header-anchor" href="#服务器"><span>服务器</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1. 将数据包放入服务器目录：</span>
<span class="line">   /world/datapacks/</span>
<span class="line"></span>
<span class="line">2. 在 server console 中：</span>
<span class="line">   /reload</span>
<span class="line"></span>
<span class="line">3. 查看所有数据包：</span>
<span class="line">   /datapack list</span>
<span class="line">   /datapack list available  # 查看可用的</span>
<span class="line"></span></code></pre></div><h2 id="第一个数据包" tabindex="-1"><a class="header-anchor" href="#第一个数据包"><span>第一个数据包</span></a></h2><h3 id="示例-自定义欢迎消息" tabindex="-1"><a class="header-anchor" href="#示例-自定义欢迎消息"><span>示例：自定义欢迎消息</span></a></h3><p>创建以下文件结构：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">welcome_pack/</span>
<span class="line">├── pack.mcmeta</span>
<span class="line">└── data/</span>
<span class="line">    └── my_pack/</span>
<span class="line">        └── functions/</span>
<span class="line">            └── welcome.mcfunction</span>
<span class="line"></span></code></pre></div><h3 id="pack-mcmeta-1" tabindex="-1"><a class="header-anchor" href="#pack-mcmeta-1"><span>pack.mcmeta</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;pack&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;pack_format&quot;</span><span class="token operator">:</span> <span class="token number">48</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;§a欢迎数据包&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="functions-welcome-mcfunction" tabindex="-1"><a class="header-anchor" href="#functions-welcome-mcfunction"><span>functions/welcome.mcfunction</span></a></h3><div class="language-mcfunction" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># 欢迎消息</span>
<span class="line">say §a欢迎使用我的数据包！</span>
<span class="line">say §e这是一个自定义函数</span>
<span class="line"></span></code></pre></div><h3 id="测试数据包" tabindex="-1"><a class="header-anchor" href="#测试数据包"><span>测试数据包</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1. 将 welcome_pack 文件夹放入 datapacks 目录</span>
<span class="line">2. 进入游戏执行 /reload</span>
<span class="line">3. 执行 /function my_pack:welcome</span>
<span class="line">4. 控制台显示欢迎消息</span>
<span class="line"></span></code></pre></div><h2 id="常用调试命令" tabindex="-1"><a class="header-anchor" href="#常用调试命令"><span>常用调试命令</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/reload               # 重载所有数据包</span>
<span class="line">/datapack list        # 列出现已加载</span>
<span class="line">/function &lt;命名空间:路径&gt;  # 执行函数</span>
<span class="line">/schedule function &lt;函数&gt; &lt;时间&gt;  # 延迟执行</span>
<span class="line">/gamerule doLimitedCrafting false  # 显示所有配方</span>
<span class="line"></span>
<span class="line"># 数据包诊断</span>
<span class="line">/datapack disable &quot;welcome_pack&quot;  # 禁用</span>
<span class="line">/datapack enable &quot;welcome_pack&quot;   # 启用</span>
<span class="line"></span></code></pre></div><h2 id="数据包-vs-插件-vs-mod" tabindex="-1"><a class="header-anchor" href="#数据包-vs-插件-vs-mod"><span>数据包 vs 插件 vs MOD</span></a></h2><table><thead><tr><th>特性</th><th>数据包</th><th>插件 (Spigot)</th><th>MOD (Forge/Fabric)</th></tr></thead><tbody><tr><td>安装难度</td><td>⭐ 极简</td><td>⭐⭐ 简单</td><td>⭐⭐⭐ 复杂</td></tr><tr><td>需要服务端</td><td>任何</td><td>Spigot/Paper</td><td>Forge/Fabric</td></tr><tr><td>可修改内容</td><td>数据逻辑</td><td>全部</td><td>全部</td></tr><tr><td>自定义代码</td><td>❌</td><td>✅ Java</td><td>✅ Java</td></tr><tr><td>客户端要求</td><td>无</td><td>无</td><td>需安装</td></tr><tr><td>性能消耗</td><td>极低</td><td>低</td><td>中等</td></tr></tbody></table>`,34)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};