import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/mc-tutor/basic/datapack/advancements.html","title":"进度系统","lang":"zh-CN","frontmatter":{"description":"进度系统 官方文档 进度基础 进度系统可以追踪玩家行为，触发奖励，显示自定义提示。 进度 JSON 格式 进度显示选项 frame 类型 触发器类型 常用触发器 多条件触发器 进度树结构 父子进度 奖励系统 多种奖励 命令触发器 使用命令授予/撤销进度 进度奖励函数 完成示例：全成就挑战","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"进度系统\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T05:16:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/mc-tutor/basic/datapack/advancements.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"进度系统"}],["meta",{"property":"og:description","content":"进度系统 官方文档 进度基础 进度系统可以追踪玩家行为，触发奖励，显示自定义提示。 进度 JSON 格式 进度显示选项 frame 类型 触发器类型 常用触发器 多条件触发器 进度树结构 父子进度 奖励系统 多种奖励 命令触发器 使用命令授予/撤销进度 进度奖励函数 完成示例：全成就挑战"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T05:16:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T05:16:15.000Z"}]]},"git":{"createdTime":1783919775000,"updatedTime":1783919775000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.04,"words":612},"filePathRelative":"mc-tutor/basic/datapack/advancements.md","autoDesc":true}`),a={name:`advancements.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="进度系统" tabindex="-1"><a class="header-anchor" href="#进度系统"><span>进度系统</span></a></h1><p><a href="https://minecraft.wiki/w/Advancement" target="_blank" rel="noopener noreferrer">官方文档</a></p><h2 id="进度基础" tabindex="-1"><a class="header-anchor" href="#进度基础"><span>进度基础</span></a></h2><p>进度系统可以追踪玩家行为，触发奖励，显示自定义提示。</p><h3 id="进度-json-格式" tabindex="-1"><a class="header-anchor" href="#进度-json-格式"><span>进度 JSON 格式</span></a></h3><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// data/my_pack/advancements/first_diamond.json</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;display&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;获得钻石！&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;第一次获得钻石&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;icon&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;item&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:diamond&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;frame&quot;</span><span class="token operator">:</span> <span class="token string">&quot;task&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;show_toast&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;announce_to_chat&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;hidden&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;background&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:textures/block/stone.png&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;criteria&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;get_diamond&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:inventory_changed&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                    <span class="token punctuation">{</span></span>
<span class="line">                        <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                            <span class="token string">&quot;minecraft:diamond&quot;</span></span>
<span class="line">                        <span class="token punctuation">]</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">]</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;rewards&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;experience&quot;</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;loot&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">            <span class="token string">&quot;minecraft:chests/spawn_bonus_chest&quot;</span></span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="进度显示选项" tabindex="-1"><a class="header-anchor" href="#进度显示选项"><span>进度显示选项</span></a></h2><h3 id="frame-类型" tabindex="-1"><a class="header-anchor" href="#frame-类型"><span>frame 类型</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// frame 取值：</span></span>
<span class="line"><span class="token property">&quot;frame&quot;</span><span class="token operator">:</span> <span class="token string">&quot;task&quot;</span>        <span class="token comment">// 任务（方形，棕褐色）</span></span>
<span class="line"><span class="token property">&quot;frame&quot;</span><span class="token operator">:</span> <span class="token string">&quot;goal&quot;</span>        <span class="token comment">// 目标（星形，蓝色）</span></span>
<span class="line"><span class="token property">&quot;frame&quot;</span><span class="token operator">:</span> <span class="token string">&quot;challenge&quot;</span>   <span class="token comment">// 挑战（多边形，紫色）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 隐式显示</span></span>
<span class="line"><span class="token property">&quot;hidden&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>   <span class="token comment">// 达成前不可见</span></span>
<span class="line"></span></code></pre></div><h2 id="触发器类型" tabindex="-1"><a class="header-anchor" href="#触发器类型"><span>触发器类型</span></a></h2><h3 id="常用触发器" tabindex="-1"><a class="header-anchor" href="#常用触发器"><span>常用触发器</span></a></h3><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// inventory_changed — 背包变化</span></span>
<span class="line"><span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:inventory_changed&quot;</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;minecraft:diamond&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;count&quot;</span><span class="token operator">:</span> <span class="token number">10</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// minecraft:impossible — 只能通过命令达成</span></span>
<span class="line"><span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:impossible&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// bred_animals — 繁殖动物</span></span>
<span class="line"><span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:bred_animals&quot;</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;parent&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:horse&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;partner&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:horse&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// killed_by_crossbow — 弩击杀</span></span>
<span class="line"><span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:killed_by_crossbow&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// player_killed_entity — 击杀生物</span></span>
<span class="line"><span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:player_killed_entity&quot;</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;entity&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:ender_dragon&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// location — 到达位置</span></span>
<span class="line"><span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:location&quot;</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;player&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;biome&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:plains&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;dimension&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:overworld&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// tick — 每 tick 检测</span></span>
<span class="line"><span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:tick&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// used_item — 使用物品</span></span>
<span class="line"><span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:used_item&quot;</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;item&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;minecraft:ender_pearl&quot;</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// construct_beacon — 建造信标</span></span>
<span class="line"><span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:construct_beacon&quot;</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">4</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// consume_item — 吃东西</span></span>
<span class="line"><span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:consume_item&quot;</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;item&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;minecraft:golden_apple&quot;</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// effects_changed — 获得效果</span></span>
<span class="line"><span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:effects_changed&quot;</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;effects&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;minecraft:regeneration&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多条件触发器" tabindex="-1"><a class="header-anchor" href="#多条件触发器"><span>多条件触发器</span></a></h3><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;criteria&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;has_diamond_sword&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:inventory_changed&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                    <span class="token punctuation">{</span></span>
<span class="line">                        <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;minecraft:diamond_sword&quot;</span><span class="token punctuation">]</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">]</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;has_diamond_pickaxe&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:inventory_changed&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                    <span class="token punctuation">{</span></span>
<span class="line">                        <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;minecraft:diamond_pickaxe&quot;</span><span class="token punctuation">]</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">]</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;requirements&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">[</span><span class="token string">&quot;has_diamond_sword&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;has_diamond_pickaxe&quot;</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="进度树结构" tabindex="-1"><a class="header-anchor" href="#进度树结构"><span>进度树结构</span></a></h2><h3 id="父子进度" tabindex="-1"><a class="header-anchor" href="#父子进度"><span>父子进度</span></a></h3><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// data/my_pack/advancements/root.json</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;display&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;我的数据包&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;开始冒险&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;icon&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;item&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:book&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;frame&quot;</span><span class="token operator">:</span> <span class="token string">&quot;task&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;background&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:textures/block/stone.png&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;show_toast&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;announce_to_chat&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;criteria&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;tick&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:tick&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// data/my_pack/advancements/first_diamond.json</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;display&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;闪闪发光&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;获得钻石&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;icon&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;item&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:diamond&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;frame&quot;</span><span class="token operator">:</span> <span class="token string">&quot;goal&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;show_toast&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;announce_to_chat&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;parent&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my_pack:root&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;criteria&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;get_diamond&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:inventory_changed&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                    <span class="token punctuation">{</span> <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;minecraft:diamond&quot;</span><span class="token punctuation">]</span> <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">]</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="奖励系统" tabindex="-1"><a class="header-anchor" href="#奖励系统"><span>奖励系统</span></a></h2><h3 id="多种奖励" tabindex="-1"><a class="header-anchor" href="#多种奖励"><span>多种奖励</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;rewards&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;experience&quot;</span><span class="token operator">:</span> <span class="token number">500</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;loot&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">            <span class="token string">&quot;minecraft:chests/end_city_treasure&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;my_pack:reward_items&quot;</span></span>
<span class="line">        <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;recipes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">            <span class="token string">&quot;minecraft:diamond_sword&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;my_pack:custom_sword&quot;</span></span>
<span class="line">        <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;function&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my_pack:advancement_reward&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h2 id="命令触发器" tabindex="-1"><a class="header-anchor" href="#命令触发器"><span>命令触发器</span></a></h2><h3 id="使用命令授予-撤销进度" tabindex="-1"><a class="header-anchor" href="#使用命令授予-撤销进度"><span>使用命令授予/撤销进度</span></a></h3><div class="language-mcfunction" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># 授予进度</span>
<span class="line">advancement grant @p only my_pack:root</span>
<span class="line">advancement grant @p everything from my_pack:root</span>
<span class="line">advancement grant @a everything      # 授予所有</span>
<span class="line"></span>
<span class="line"># 撤销进度</span>
<span class="line">advancement revoke @p only my_pack:first_diamond</span>
<span class="line">advancement revoke @p everything from my_pack:root</span>
<span class="line"></span>
<span class="line"># 检测进度</span>
<span class="line">execute if entity @p[advancements={my_pack:first_diamond=true}] run give @p diamond 16</span>
<span class="line"></span></code></pre></div><h2 id="进度奖励函数" tabindex="-1"><a class="header-anchor" href="#进度奖励函数"><span>进度奖励函数</span></a></h2><div class="language-mcfunction" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># data/my_pack/functions/advancement_reward.mcfunction</span>
<span class="line"># 达成进度时触发的奖励</span>
<span class="line">give @p diamond 5</span>
<span class="line">give @p experience_bottle 3</span>
<span class="line">say §a恭喜达成进度！</span>
<span class="line">effect give @p regeneration 30 1</span>
<span class="line"></span></code></pre></div><h2 id="完成示例-全成就挑战" tabindex="-1"><a class="header-anchor" href="#完成示例-全成就挑战"><span>完成示例：全成就挑战</span></a></h2><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;display&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;§6钻石大师&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;§e收集 100 颗钻石&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;icon&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;item&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:diamond_block&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;frame&quot;</span><span class="token operator">:</span> <span class="token string">&quot;challenge&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;show_toast&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;announce_to_chat&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;hidden&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;parent&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my_pack:first_diamond&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;criteria&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;collect_diamonds&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:inventory_changed&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                    <span class="token punctuation">{</span></span>
<span class="line">                        <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;minecraft:diamond&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">                        <span class="token property">&quot;count&quot;</span><span class="token operator">:</span> <span class="token number">100</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">]</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;rewards&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;experience&quot;</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;function&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my_pack:diamond_master_reward&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};