import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/mc-tutor/basic/datapack/predicates.html","title":"谓词与物品修饰器","lang":"zh-CN","frontmatter":{"description":"谓词与物品修饰器 官方文档 谓词基础 谓词（Predicate）是 Minecraft 1.15+ 引入的条件检测系统，返回 true/false。 常用谓词 随机概率 带抢夺等级的随机 检测玩家属性 检测天气 检测玩家经验 检测物品 检测实体类型 时间检测 组合谓词 AND（所有条件成立） OR（任一条件成立） NOT（取反） 在战利品表中使用谓词 ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"谓词与物品修饰器\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T05:16:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/mc-tutor/basic/datapack/predicates.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"谓词与物品修饰器"}],["meta",{"property":"og:description","content":"谓词与物品修饰器 官方文档 谓词基础 谓词（Predicate）是 Minecraft 1.15+ 引入的条件检测系统，返回 true/false。 常用谓词 随机概率 带抢夺等级的随机 检测玩家属性 检测天气 检测玩家经验 检测物品 检测实体类型 时间检测 组合谓词 AND（所有条件成立） OR（任一条件成立） NOT（取反） 在战利品表中使用谓词 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T05:16:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T05:16:15.000Z"}]]},"git":{"createdTime":1783919775000,"updatedTime":1783919775000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.85,"words":555},"filePathRelative":"mc-tutor/basic/datapack/predicates.md","autoDesc":true}`),a={name:`predicates.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="谓词与物品修饰器" tabindex="-1"><a class="header-anchor" href="#谓词与物品修饰器"><span>谓词与物品修饰器</span></a></h1><p><a href="https://minecraft.wiki/w/Predicate" target="_blank" rel="noopener noreferrer">官方文档</a></p><h2 id="谓词基础" tabindex="-1"><a class="header-anchor" href="#谓词基础"><span>谓词基础</span></a></h2><p>谓词（Predicate）是 Minecraft 1.15+ 引入的条件检测系统，返回 true/false。</p><h2 id="常用谓词" tabindex="-1"><a class="header-anchor" href="#常用谓词"><span>常用谓词</span></a></h2><h3 id="随机概率" tabindex="-1"><a class="header-anchor" href="#随机概率"><span>随机概率</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// data/my_pack/predicates/chance.json</span></span>
<span class="line"><span class="token comment">// 50% 概率为 true</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:random_chance&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;chance&quot;</span><span class="token operator">:</span> <span class="token number">0.5</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="带抢夺等级的随机" tabindex="-1"><a class="header-anchor" href="#带抢夺等级的随机"><span>带抢夺等级的随机</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:random_chance_with_looting&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;chance&quot;</span><span class="token operator">:</span> <span class="token number">0.1</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;looting_multiplier&quot;</span><span class="token operator">:</span> <span class="token number">0.02</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="检测玩家属性" tabindex="-1"><a class="header-anchor" href="#检测玩家属性"><span>检测玩家属性</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// data/my_pack/predicates/sneaking.json</span></span>
<span class="line"><span class="token comment">// 检测玩家是否潜行</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:entity_properties&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;entity&quot;</span><span class="token operator">:</span> <span class="token string">&quot;this&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;predicate&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;flags&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;is_sneaking&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="检测天气" tabindex="-1"><a class="header-anchor" href="#检测天气"><span>检测天气</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// data/my_pack/predicates/weather_check.json</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:weather_check&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;raining&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;thundering&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="检测玩家经验" tabindex="-1"><a class="header-anchor" href="#检测玩家经验"><span>检测玩家经验</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:entity_scores&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;entity&quot;</span><span class="token operator">:</span> <span class="token string">&quot;this&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;scores&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;kills&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;min&quot;</span><span class="token operator">:</span> <span class="token number">10</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="检测物品" tabindex="-1"><a class="header-anchor" href="#检测物品"><span>检测物品</span></a></h3><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// data/my_pack/predicates/holding_sword.json</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:entity_properties&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;entity&quot;</span><span class="token operator">:</span> <span class="token string">&quot;this&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;predicate&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;equipment&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;mainhand&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                    <span class="token string">&quot;minecraft:diamond_sword&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                    <span class="token string">&quot;minecraft:netherite_sword&quot;</span></span>
<span class="line">                <span class="token punctuation">]</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="检测实体类型" tabindex="-1"><a class="header-anchor" href="#检测实体类型"><span>检测实体类型</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:entity_properties&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;entity&quot;</span><span class="token operator">:</span> <span class="token string">&quot;killer&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;predicate&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:player&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="时间检测" tabindex="-1"><a class="header-anchor" href="#时间检测"><span>时间检测</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:time_check&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;min&quot;</span><span class="token operator">:</span> <span class="token number">13000</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;max&quot;</span><span class="token operator">:</span> <span class="token number">23000</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h2 id="组合谓词" tabindex="-1"><a class="header-anchor" href="#组合谓词"><span>组合谓词</span></a></h2><h3 id="and-所有条件成立" tabindex="-1"><a class="header-anchor" href="#and-所有条件成立"><span>AND（所有条件成立）</span></a></h3><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// data/my_pack/predicates/night_and_sneaking.json</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:all_of&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:time_check&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token property">&quot;min&quot;</span><span class="token operator">:</span> <span class="token number">13000</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token property">&quot;max&quot;</span><span class="token operator">:</span> <span class="token number">23000</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:entity_properties&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;entity&quot;</span><span class="token operator">:</span> <span class="token string">&quot;this&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;predicate&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token property">&quot;flags&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token property">&quot;is_sneaking&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="or-任一条件成立" tabindex="-1"><a class="header-anchor" href="#or-任一条件成立"><span>OR（任一条件成立）</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:any_of&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">{</span> <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:random_chance&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;chance&quot;</span><span class="token operator">:</span> <span class="token number">0.1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span> <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:weather_check&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;thundering&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="not-取反" tabindex="-1"><a class="header-anchor" href="#not-取反"><span>NOT（取反）</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:inverted&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:entity_properties&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;entity&quot;</span><span class="token operator">:</span> <span class="token string">&quot;this&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;predicate&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;flags&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token property">&quot;is_sneaking&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h2 id="在战利品表中使用谓词" tabindex="-1"><a class="header-anchor" href="#在战利品表中使用谓词"><span>在战利品表中使用谓词</span></a></h2><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// 实体掉落条件</span></span>
<span class="line"><span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:killed_by_player&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:random_chance_with_looting&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;chance&quot;</span><span class="token operator">:</span> <span class="token number">0.05</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;looting_multiplier&quot;</span><span class="token operator">:</span> <span class="token number">0.01</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre></div><h2 id="物品修饰器" tabindex="-1"><a class="header-anchor" href="#物品修饰器"><span>物品修饰器</span></a></h2><p>物品修饰器用于修改将要生成的物品。</p><h3 id="set-count-—-设置数量" tabindex="-1"><a class="header-anchor" href="#set-count-—-设置数量"><span>set_count — 设置数量</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;function&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:set_count&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;count&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;min&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;max&quot;</span><span class="token operator">:</span> <span class="token number">3</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;add&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="set-damage-—-设置耐久" tabindex="-1"><a class="header-anchor" href="#set-damage-—-设置耐久"><span>set_damage — 设置耐久</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;function&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:set_damage&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;damage&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;min&quot;</span><span class="token operator">:</span> <span class="token number">0.15</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;max&quot;</span><span class="token operator">:</span> <span class="token number">0.25</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="enchant-randomly-—-随机附魔" tabindex="-1"><a class="header-anchor" href="#enchant-randomly-—-随机附魔"><span>enchant_randomly — 随机附魔</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;function&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:enchant_randomly&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;treasure&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="enchant-with-levels-—-等级附魔" tabindex="-1"><a class="header-anchor" href="#enchant-with-levels-—-等级附魔"><span>enchant_with_levels — 等级附魔</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;function&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:enchant_with_levels&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;levels&quot;</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;treasure&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="物品名称和-lore" tabindex="-1"><a class="header-anchor" href="#物品名称和-lore"><span>物品名称和 Lore</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;function&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:set_name&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;§6§l传说之剑&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;italic&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="组合多个修饰" tabindex="-1"><a class="header-anchor" href="#组合多个修饰"><span>组合多个修饰</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;function&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:set_name&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;§b§l冰霜之剑&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;italic&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h2 id="自定义物品修饰器文件" tabindex="-1"><a class="header-anchor" href="#自定义物品修饰器文件"><span>自定义物品修饰器文件</span></a></h2><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// data/my_pack/item_modifiers/ruby_upgrade.json</span></span>
<span class="line"><span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;function&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:set_name&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;§6§l红宝石升级&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;italic&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;function&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:set_lore&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;lore&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">            <span class="token string">&quot;§7由红宝石强化&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;§a攻击力 +5&quot;</span></span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在命令中使用" tabindex="-1"><a class="header-anchor" href="#在命令中使用"><span>在命令中使用</span></a></h3><div class="language-mcfunction" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># 应用物品修饰器</span>
<span class="line">give @p minecraft:diamond_sword 1</span>
<span class="line">/item modify entity @p weapon.mainhand my_pack:ruby_upgrade</span>
<span class="line"></span></code></pre></div><h2 id="谓词在进度中的使用" tabindex="-1"><a class="header-anchor" href="#谓词在进度中的使用"><span>谓词在进度中的使用</span></a></h2><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;criteria&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;in_desert&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;trigger&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:location&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token property">&quot;player&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                    <span class="token punctuation">{</span></span>
<span class="line">                        <span class="token property">&quot;condition&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:entity_properties&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                        <span class="token property">&quot;entity&quot;</span><span class="token operator">:</span> <span class="token string">&quot;this&quot;</span><span class="token punctuation">,</span></span>
<span class="line">                        <span class="token property">&quot;predicate&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                            <span class="token property">&quot;location&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                                <span class="token property">&quot;biome&quot;</span><span class="token operator">:</span> <span class="token string">&quot;minecraft:desert&quot;</span></span>
<span class="line">                            <span class="token punctuation">}</span></span>
<span class="line">                        <span class="token punctuation">}</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">]</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="谓词在函数中的使用" tabindex="-1"><a class="header-anchor" href="#谓词在函数中的使用"><span>谓词在函数中的使用</span></a></h2><div class="language-mcfunction" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># 使用谓词执行命令</span>
<span class="line">execute if predicate my_pack:sneaking run give @s diamond 1</span>
<span class="line">execute if predicate my_pack:night_and_sneaking run give @s netherite_ingot 1</span>
<span class="line"></span>
<span class="line"># 加载数据包后测试谓词</span>
<span class="line">reload</span>
<span class="line">execute if predicate my_pack:chance run say 50% 概率触发！</span>
<span class="line"></span></code></pre></div>`,52)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};