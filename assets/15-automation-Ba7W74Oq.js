import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/mc-tutor/basic/15-automation.html","title":"自动化农场与刷资源","lang":"zh-CN","frontmatter":{"order":15,"description":"自动化农场与刷资源 从手动到全自动，覆盖 Minecraft 中最实用的自动农场和资源刷取方案。 漏斗 活塞 观察者 中继器 比较器 基础原理 自动化的核心要素 常用收集机制 作物自动农场 简易水流农田 甘蔗农场 竹子农场 同甘蔗农场原理，使用观察者 + 活塞检测竹子生长。 怪物农场 简易刷怪塔 怪物农场的选址 常用怪物农场 经验农场 利用刷怪笼（地下...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"自动化农场与刷资源\\",\\"image\\":[\\"https://minecraft.wiki/images/Invicon_Hopper.png\\",\\"https://minecraft.wiki/images/Invicon_Piston.png\\",\\"https://minecraft.wiki/images/Invicon_Observer.png\\",\\"https://minecraft.wiki/images/Invicon_Redstone_Repeater.png\\",\\"https://minecraft.wiki/images/Invicon_Redstone_Comparator.png\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/mc-tutor/basic/15-automation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"自动化农场与刷资源"}],["meta",{"property":"og:description","content":"自动化农场与刷资源 从手动到全自动，覆盖 Minecraft 中最实用的自动农场和资源刷取方案。 漏斗 活塞 观察者 中继器 比较器 基础原理 自动化的核心要素 常用收集机制 作物自动农场 简易水流农田 甘蔗农场 竹子农场 同甘蔗农场原理，使用观察者 + 活塞检测竹子生长。 怪物农场 简易刷怪塔 怪物农场的选址 常用怪物农场 经验农场 利用刷怪笼（地下..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://minecraft.wiki/images/Invicon_Hopper.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1783945271000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":6.16,"words":1849},"filePathRelative":"mc-tutor/basic/15-automation.md","autoDesc":true}`),a={name:`15-automation.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="自动化农场与刷资源" tabindex="-1"><a class="header-anchor" href="#自动化农场与刷资源"><span>自动化农场与刷资源</span></a></h1><blockquote><p>从手动到全自动，覆盖 Minecraft 中最实用的自动农场和资源刷取方案。</p></blockquote><p><img src="https://minecraft.wiki/images/Invicon_Hopper.png" alt="漏斗"> <img src="https://minecraft.wiki/images/Invicon_Piston.png" alt="活塞"> <img src="https://minecraft.wiki/images/Invicon_Observer.png" alt="观察者"> <img src="https://minecraft.wiki/images/Invicon_Redstone_Repeater.png" alt="中继器"> <img src="https://minecraft.wiki/images/Invicon_Redstone_Comparator.png" alt="比较器"></p><hr><h2 id="基础原理" tabindex="-1"><a class="header-anchor" href="#基础原理"><span>基础原理</span></a></h2><h3 id="自动化的核心要素" tabindex="-1"><a class="header-anchor" href="#自动化的核心要素"><span>自动化的核心要素</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1. 生成/来源     → 怪物、作物、村民等</span>
<span class="line">2. 收集/运输     → 水流、漏斗、气泡柱</span>
<span class="line">3. 处理/击杀     → 掉落伤害、火焰、改名</span>
<span class="line">4. 存储          → 箱子 + 漏斗链</span>
<span class="line"></span></code></pre></div><h3 id="常用收集机制" tabindex="-1"><a class="header-anchor" href="#常用收集机制"><span>常用收集机制</span></a></h3><table><thead><tr><th>方式</th><th>速度</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td><strong>水流</strong></td><td>极快</td><td>无消耗、可定向</td><td>需要等高差</td></tr><tr><td><strong>漏斗 (hopper)</strong></td><td>2.5 物品/秒</td><td>精准收集、可分类</td><td>较贵（5 铁）</td></tr><tr><td><strong>气泡柱 (bubble_column)</strong></td><td>极快</td><td>垂直运输</td><td>需要海草(kelp) + 水源</td></tr><tr><td><strong>漏斗矿车 (hopper_minecart)</strong></td><td>快</td><td>可穿越长距离</td><td>铁轨成本高</td></tr></tbody></table><hr><h2 id="作物自动农场" tabindex="-1"><a class="header-anchor" href="#作物自动农场"><span>作物自动农场</span></a></h2><h3 id="简易水流农田" tabindex="-1"><a class="header-anchor" href="#简易水流农田"><span>简易水流农田</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 布局（8×8 农场）</span>
<span class="line">[水源]                          [收集]</span>
<span class="line">  ↓                               ↓</span>
<span class="line"> 田 田 田 田 田 田 田 田    → 水流</span>
<span class="line"> 田 田 田 田 田 田 田 田    → 水流</span>
<span class="line"> 田 田 田 田 田 田 田 田    → 水流</span>
<span class="line"> ...</span>
<span class="line">                              ↓</span>
<span class="line">                          [漏斗+箱子]</span>
<span class="line"></span>
<span class="line"># 工作方式</span>
<span class="line">1. 手动或村民种地</span>
<span class="line">2. 成熟后放水 → 冲走作物</span>
<span class="line">3. 水流汇集到收集点</span>
<span class="line">4. 漏斗收集进箱子</span>
<span class="line"></span>
<span class="line"># 半自动（村民辅助）</span>
<span class="line">- 农民村民会种地 + 收菜</span>
<span class="line">- 村民会自动丢出多余食物</span>
<span class="line">- 漏斗收集村民丢出的食物</span>
<span class="line">- 完全不需要玩家动手！</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="甘蔗农场" tabindex="-1"><a class="header-anchor" href="#甘蔗农场"><span>甘蔗农场</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 自动甘蔗机</span>
<span class="line"></span>
<span class="line">   [观察者(observer)]          [活塞(piston)]</span>
<span class="line">    │                  │</span>
<span class="line">    ├──→ 检测甘蔗(sugar_cane) → 推动 → 收集</span>
<span class="line">    │</span>
<span class="line">   [甘蔗] ← 旁边放水</span>
<span class="line">    │</span>
<span class="line">   [沙子(sand)/泥土(dirt)]</span>
<span class="line"></span>
<span class="line"># 每棵甘蔗放一个观察者 + 活塞</span>
<span class="line"># 甘蔗长到 3 格高 → 观察者检测 → 活塞打掉上面 2 格 → 掉落物被水冲走</span>
<span class="line"></span>
<span class="line"># 优点</span>
<span class="line">- 完全自动（不需要玩家）</span>
<span class="line">- 甘蔗可用来做纸（附魔 + 烟火）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="竹子农场" tabindex="-1"><a class="header-anchor" href="#竹子农场"><span>竹子农场</span></a></h3><p>同甘蔗农场原理，使用观察者 + 活塞检测竹子生长。</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 特点</span>
<span class="line">- 竹子是所有作物中生长最快的</span>
<span class="line">- 很好的燃料（烧炼材料）</span>
<span class="line">- 制作脚手架（建筑利器）</span>
<span class="line"></span></code></pre></div><hr><h2 id="怪物农场" tabindex="-1"><a class="header-anchor" href="#怪物农场"><span>怪物农场</span></a></h2><h3 id="简易刷怪塔" tabindex="-1"><a class="header-anchor" href="#简易刷怪塔"><span>简易刷怪塔</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 原理</span>
<span class="line">怪物在黑暗处生成 → 掉落到击杀平台 → 收集掉落物</span>
<span class="line"></span>
<span class="line"># 基本结构</span>
<span class="line">          [刷怪层]</span>
<span class="line">     ┌─────┬─┬─────┐</span>
<span class="line">     │ █████ █████ │  ← 暗室（亮度 0）</span>
<span class="line">     │ █   █ █   █ │</span>
<span class="line">     │ █   █ █   █ │  ← 2 格高空间</span>
<span class="line">     │ █   █ █   █ │</span>
<span class="line">     └─────┴─┴─────┘</span>
<span class="line">           │</span>
<span class="line">           │ 水流 + 掉落</span>
<span class="line">           │</span>
<span class="line">     ┌─────┴─────┐</span>
<span class="line">     │  击杀区    │ ← 玩家站这里（或岩浆块）</span>
<span class="line">     └─────┬─────┘</span>
<span class="line">           │ 漏斗</span>
<span class="line">         [箱子]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="怪物农场的选址" tabindex="-1"><a class="header-anchor" href="#怪物农场的选址"><span>怪物农场的选址</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 最佳位置：高空（Y=200+）</span>
<span class="line">- 周围洞穴不会生成怪物（全部在刷怪塔生成）</span>
<span class="line">- 效率最高</span>
<span class="line"></span>
<span class="line"># 其次：海上</span>
<span class="line">- 周围没有陆地 → 不会生成地面怪物</span>
<span class="line">- 需要平台</span>
<span class="line"></span>
<span class="line"># 最差：地下</span>
<span class="line">- 周围大量洞穴 → 怪物生成被分散</span>
<span class="line">- 需要大面积挖空</span>
<span class="line"></span></code></pre></div><h3 id="常用怪物农场" tabindex="-1"><a class="header-anchor" href="#常用怪物农场"><span>常用怪物农场</span></a></h3><table><thead><tr><th>农场类型</th><th>主要产出</th><th>难度</th><th>说明</th></tr></thead><tbody><tr><td><strong>通用刷怪塔</strong></td><td>火药(gunpowder)、骨头(bone)、线(string)、箭(arrow)</td><td>⭐⭐</td><td>基础且实用</td></tr><tr><td><strong>苦力怕农场</strong></td><td>大量火药</td><td>⭐⭐⭐</td><td>苦力怕(creeper)是唯一掉落火药的怪物</td></tr><tr><td><strong>骷髅农场</strong></td><td>骨头、箭</td><td>⭐⭐</td><td>用刷怪笼(spawner)改造</td></tr><tr><td><strong>蜘蛛农场</strong></td><td>线</td><td>⭐⭐</td><td>用刷怪笼改造</td></tr><tr><td><strong>烈焰人农场</strong></td><td>烈焰棒(blaze_rod)</td><td>⭐⭐⭐</td><td>下界要塞刷怪笼改造</td></tr><tr><td><strong>凋灵骷髅农场</strong></td><td>下界之星(nether_star)</td><td>⭐⭐⭐⭐</td><td>获得信标(beacon)必需</td></tr><tr><td><strong>猪灵金农场</strong></td><td>金粒(gold_nugget)、金锭(gold_ingot)</td><td>⭐⭐⭐</td><td>下界堡垒，大量经验</td></tr></tbody></table><h3 id="经验农场" tabindex="-1"><a class="header-anchor" href="#经验农场"><span>经验农场</span></a></h3><p>利用刷怪笼（地下的刷怪笼房间）改造：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 改造步骤</span>
<span class="line">1. 找到刷怪笼（洞穴蜘蛛/普通蜘蛛/僵尸/骷髅）</span>
<span class="line">2. 在刷怪笼周围点亮所有洞穴（火把）</span>
<span class="line">3. 建造掉落通道（24 格高 → 摔到 1 心）</span>
<span class="line">4. 玩家在底部击打怪物获得经验</span>
<span class="line"></span>
<span class="line"># 产出</span>
<span class="line">高级经验农场：30 级 → 1-2 分钟（满级附魔速度）</span>
<span class="line"></span></code></pre></div><hr><h2 id="村民自动化农场" tabindex="-1"><a class="header-anchor" href="#村民自动化农场"><span>村民自动化农场</span></a></h2><h3 id="自动胡萝卜-马铃薯农场" tabindex="-1"><a class="header-anchor" href="#自动胡萝卜-马铃薯农场"><span>自动胡萝卜/马铃薯农场</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 只需要：</span>
<span class="line">1. 农民村民 × 1</span>
<span class="line">2. 农田 × 1</span>
<span class="line">3. 漏斗 × 1（或水流收集）</span>
<span class="line"></span>
<span class="line"># 农民的工作流程</span>
<span class="line">1. 种地 → 收获 → 丢给其他村民</span>
<span class="line">2. 其他村民捡起 → 食物槽位满 → 丢地上</span>
<span class="line">3. 漏斗收集地上的食物</span>
<span class="line">4. 或水流冲到收集点</span>
<span class="line"></span>
<span class="line"># 产出效率</span>
<span class="line">一个农民：约 2 组/小时</span>
<span class="line"></span></code></pre></div><h3 id="自动烤鸡机" tabindex="-1"><a class="header-anchor" href="#自动烤鸡机"><span>自动烤鸡机</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 原理</span>
<span class="line">1. 鸡蛋 → 投掷器 → 小鸡 → 长大</span>
<span class="line">2. 成年鸡 → 火焰/岩浆杀死 → 熟鸡肉</span>
<span class="line"></span>
<span class="line"># 简化版（半自动）</span>
<span class="line">1. 在箱子放鸡蛋</span>
<span class="line">2. 投掷器朝一个 1×1 空间投鸡蛋</span>
<span class="line">3. 小鸡长大 → 掉入岩浆块 → 熟鸡肉</span>
<span class="line">4. 漏斗收集</span>
<span class="line"></span></code></pre></div><hr><h2 id="村民繁殖机" tabindex="-1"><a class="header-anchor" href="#村民繁殖机"><span>村民繁殖机</span></a></h2><p>参考 <a href="./minecraft-villagers">村民机制</a> 中的繁殖章节，这里提供一个紧凑设计：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 核心</span>
<span class="line">- 2 个村民 + 大量床</span>
<span class="line">- 农民种地丢食物</span>
<span class="line">- 幼年村民通过水流运出</span>
<span class="line"></span>
<span class="line"># 实用的配置</span>
<span class="line">┌──────────────────┐</span>
<span class="line">│  床 床 床 床 床    │ ← 顶楼（繁殖区）</span>
<span class="line">│  村民 A 村民 B    │</span>
<span class="line">├──────────────────┤</span>
<span class="line">│  农田 + 农民      │ ← 一楼（食物来源）</span>
<span class="line">│  漏斗收集多余食物  │</span>
<span class="line">├──────────────────┤</span>
<span class="line">│  漏斗 + 箱子      │ ← 收集区（村民产出）</span>
<span class="line">└──────────────────┘</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="树场" tabindex="-1"><a class="header-anchor" href="#树场"><span>树场</span></a></h2><h3 id="手动树场" tabindex="-1"><a class="header-anchor" href="#手动树场"><span>手动树场</span></a></h3><p>种一大片树苗，用斧头砍——适合早期。</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 高效率种植</span>
<span class="line">- 间隔 4×4 种一棵（大树冠）</span>
<span class="line">- 用骨粉催熟</span>
<span class="line">- 用带效率 V 的下界合金斧</span>
<span class="line"></span>
<span class="line"># 树苗搭配</span>
<span class="line">橡树：产出苹果</span>
<span class="line">云杉：最直、成长快</span>
<span class="line">从林木：4 格高树苗 → 巨树</span>
<span class="line"></span></code></pre></div><h3 id="自动树场-简单版" tabindex="-1"><a class="header-anchor" href="#自动树场-简单版"><span>自动树场（简单版）</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 需要</span>
<span class="line">1. 观察者检测树生长</span>
<span class="line">2. 活塞/TNT 破坏树木</span>
<span class="line">3. 水流收集掉落物</span>
<span class="line"></span>
<span class="line"># 注意</span>
<span class="line">- 自动树场结构较复杂</span>
<span class="line">- 需要配合 TNT 复制</span>
<span class="line">- 适合云杉（单一高度）</span>
<span class="line"></span></code></pre></div><hr><h2 id="守卫者农场" tabindex="-1"><a class="header-anchor" href="#守卫者农场"><span>守卫者农场</span></a></h2><p>这是 Minecraft 中最优秀的经验农场之一。</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 选址</span>
<span class="line">- 海底神殿</span>
<span class="line">- 排水 → 建立刷怪层</span>
<span class="line"></span>
<span class="line"># 核心设计</span>
<span class="line">1. 保留守卫者生成区域</span>
<span class="line">2. 水流将守卫者集中</span>
<span class="line">3. 掉落 24 格 → 残血</span>
<span class="line">4. 一下 + 经验 + 掉落物</span>
<span class="line"></span>
<span class="line"># 产出</span>
<span class="line">- 经验：30 级 / 分钟</span>
<span class="line">- 海晶砂粒 + 鱼</span>
<span class="line">- 后期最稳定的经验来源</span>
<span class="line"></span></code></pre></div><hr><h2 id="物品分类系统" tabindex="-1"><a class="header-anchor" href="#物品分类系统"><span>物品分类系统</span></a></h2><h3 id="简易分类机" tabindex="-1"><a class="header-anchor" href="#简易分类机"><span>简易分类机</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 核心原理：漏斗 + 比较器 + 红石火把</span>
<span class="line"></span>
<span class="line">           [漏斗] ← 物品流入</span>
<span class="line">            │</span>
<span class="line">           [漏斗] ← 分类漏斗（内有 42 个过滤物品）</span>
<span class="line">            │</span>
<span class="line">    ┌───────┴───────┐</span>
<span class="line">    │ [比较器] → [红石火把] → 锁定上方漏斗</span>
<span class="line">    │ [箱子]        │</span>
<span class="line">    └───────────────┘</span>
<span class="line"></span>
<span class="line"># 工作原理</span>
<span class="line">1. 每个分类漏斗放 42 个同类物品</span>
<span class="line">2. 第 43 个物品触发比较器信号</span>
<span class="line">3. 信号激活红石火把 → 锁定漏斗</span>
<span class="line">4. 其他物品流向下一个分类槽</span>
<span class="line"></span>
<span class="line"># 分类容量</span>
<span class="line">每个分类单元 = 1 种物品</span>
<span class="line">N 个单元 = N 种物品</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实用分类方案" tabindex="-1"><a class="header-anchor" href="#实用分类方案"><span>实用分类方案</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 推荐分类组</span>
<span class="line">第一组：常用建筑材料（石头、木头、泥土）</span>
<span class="line">第二组：矿石与金属（铁、金、钻石、下界合金）</span>
<span class="line">第三组：食物（面包、肉、蔬菜）</span>
<span class="line">第四组：怪物掉落物（火药、骨头、线、箭）</span>
<span class="line">第五组：红石与工具（红石、活塞、漏斗）</span>
<span class="line">第六组：杂项（末影珍珠、烈焰粉、书）</span>
<span class="line"></span>
<span class="line"># 在漏斗入口前放一个岩浆块（销毁不可堆叠物）</span>
<span class="line"># 避免垃圾堵塞分类系统</span>
<span class="line"></span></code></pre></div><hr><h2 id="快速参考" tabindex="-1"><a class="header-anchor" href="#快速参考"><span>快速参考</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 前期优先建设的农场（按顺序）</span>
<span class="line">1. 简易作物农场（食物保障）</span>
<span class="line">2. 甘蔗农场（纸→书📖→附魔）</span>
<span class="line">3. 简易刷怪塔（火药(gunpowder)→烟花(firework)→鞘翅(elytra)飞行 + 经验）</span>
<span class="line"></span>
<span class="line"># 中期目标</span>
<span class="line">4. 村民交易所（附魔书 + 钻石装备）</span>
<span class="line">5. 自动村民农场（胡萝卜/马铃薯无限）</span>
<span class="line">6. 烈焰人农场（烈焰棒(blaze_rod)→末影珍珠(ender_pearl)→末地）</span>
<span class="line"></span>
<span class="line"># 后期目标</span>
<span class="line">7. 守卫者农场（满级经验）</span>
<span class="line">8. 物品分类系统（全自动存储）</span>
<span class="line">9. 凋灵骷髅农场（信标 beacon）</span>
<span class="line">10. 猪灵金农场（大量金 + 金苹果 golden_apple）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,59)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};