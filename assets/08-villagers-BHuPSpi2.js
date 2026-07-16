import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/mc-tutor/basic/08-villagers.html","title":"村民机制与交易","lang":"zh-CN","frontmatter":{"order":8,"description":"村民机制与交易 村民 铁傀儡 村民是 Minecraft 中最强大的资源系统——提供附魔书、钻石装备、绿宝石、经验，是一切高级玩法的经济基础。 村民基础 村民职业 村民的职业由 工作站点方块 决定。一个失业村民靠近工作站点后自动获得对应职业。 锁定交易与重刷 交易机制详解 村民等级 村民有 5 个等级，交易次数越多等级越高： 打折机制 交易锁定技巧 村...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"村民机制与交易\\",\\"image\\":[\\"https://mcasset.cloud/1.21/assets/minecraft/textures/entity/villager/villager.png\\",\\"https://mcasset.cloud/1.21/assets/minecraft/textures/entity/iron_golem/iron_golem.png\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/mc-tutor/basic/08-villagers.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"村民机制与交易"}],["meta",{"property":"og:description","content":"村民机制与交易 村民 铁傀儡 村民是 Minecraft 中最强大的资源系统——提供附魔书、钻石装备、绿宝石、经验，是一切高级玩法的经济基础。 村民基础 村民职业 村民的职业由 工作站点方块 决定。一个失业村民靠近工作站点后自动获得对应职业。 锁定交易与重刷 交易机制详解 村民等级 村民有 5 个等级，交易次数越多等级越高： 打折机制 交易锁定技巧 村..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://mcasset.cloud/1.21/assets/minecraft/textures/entity/villager/villager.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1783945271000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":5.4,"words":1621},"filePathRelative":"mc-tutor/basic/08-villagers.md","autoDesc":true}`),a={name:`08-villagers.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="村民机制与交易" tabindex="-1"><a class="header-anchor" href="#村民机制与交易"><span>村民机制与交易</span></a></h1><p><img src="https://mcasset.cloud/1.21/assets/minecraft/textures/entity/villager/villager.png" alt="村民"> <img src="https://mcasset.cloud/1.21/assets/minecraft/textures/entity/iron_golem/iron_golem.png" alt="铁傀儡"></p><blockquote><p>村民是 Minecraft 中最强大的资源系统——提供附魔书、钻石装备、绿宝石、经验，是一切高级玩法的经济基础。</p></blockquote><hr><h2 id="村民基础" tabindex="-1"><a class="header-anchor" href="#村民基础"><span>村民基础</span></a></h2><h3 id="村民职业" tabindex="-1"><a class="header-anchor" href="#村民职业"><span>村民职业</span></a></h3><p>村民的职业由 <strong>工作站点方块</strong> 决定。一个失业村民靠近工作站点后自动获得对应职业。</p><table><thead><tr><th>职业</th><th>工作站点方块(ID)</th><th>主要交易物</th><th>推荐指数</th></tr></thead><tbody><tr><td>盔甲匠</td><td>高炉 (<code>blast_furnace</code>)</td><td>钻石护甲、附魔钻石护甲</td><td>⭐⭐⭐⭐⭐</td></tr><tr><td>图书管理员</td><td>讲台 (<code>lectern</code>)</td><td>附魔书、书架(bookshelf)、玻璃</td><td>⭐⭐⭐⭐⭐</td></tr><tr><td>工具匠</td><td>锻造台 (<code>smithing_table</code>)</td><td>钻石工具、附魔工具</td><td>⭐⭐⭐⭐</td></tr><tr><td>武器匠</td><td>磨石 (<code>grindstone</code>)</td><td>钻石剑、附魔剑</td><td>⭐⭐⭐⭐</td></tr><tr><td>牧师</td><td>酿造台 (<code>brewing_stand</code>)</td><td>红石粉、萤石、末影珍珠</td><td>⭐⭐⭐</td></tr><tr><td>渔夫</td><td>木桶 (<code>barrel</code>)</td><td>熟鱼、附魔鱼竿</td><td>⭐⭐</td></tr><tr><td>制箭师</td><td>制箭台 (<code>fletching_table</code>)</td><td>箭(arrow)、附魔弓(bow)</td><td>⭐⭐⭐</td></tr><tr><td>屠夫</td><td>烟熏炉 (<code>smoker</code>)</td><td>熟肉</td><td>⭐⭐</td></tr><tr><td>皮匠</td><td>锅釜 (<code>cauldron</code>)</td><td>皮革裤、皮革帽</td><td>⭐</td></tr><tr><td>石匠</td><td>切石机 (<code>stonecutter</code>)</td><td>石英块、陶瓦</td><td>⭐⭐</td></tr><tr><td>农民</td><td>堆肥桶 (<code>composter</code>)</td><td>食物、南瓜派、蛋糕</td><td>⭐⭐⭐</td></tr><tr><td>制图师</td><td>制图台 (<code>cartography_table</code>)</td><td>空地图、海洋探险地图</td><td>⭐⭐</td></tr><tr><td>牧羊人</td><td>织布机 (<code>loom</code>)</td><td>羊毛、床、地毯</td><td>⭐⭐</td></tr></tbody></table><h3 id="锁定交易与重刷" tabindex="-1"><a class="header-anchor" href="#锁定交易与重刷"><span>锁定交易与重刷</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 交易锁定</span>
<span class="line">- 每位村民每个交易项有固定的使用次数</span>
<span class="line">- 用完后需要等待补货（每天补货 2 次）</span>
<span class="line">- 补货条件：村民有床且有工作站点</span>
<span class="line"></span>
<span class="line"># 如果第一次交易不满意</span>
<span class="line">- 拆除工作站点 → 村民失业 → 重新放置工作站点 → 新职业/新交易</span>
<span class="line"></span></code></pre></div><hr><h2 id="交易机制详解" tabindex="-1"><a class="header-anchor" href="#交易机制详解"><span>交易机制详解</span></a></h2><h3 id="村民等级" tabindex="-1"><a class="header-anchor" href="#村民等级"><span>村民等级</span></a></h3><p>村民有 5 个等级，交易次数越多等级越高：</p><table><thead><tr><th>等级</th><th>名称</th><th>所需交易次数</th><th>解锁</th></tr></thead><tbody><tr><td>新手</td><td>新手</td><td>-</td><td>初始 2-4 个交易</td></tr><tr><td>学徒</td><td>学徒</td><td>10 次</td><td>新交易项</td></tr><tr><td>熟练工</td><td>熟练工</td><td>20 次</td><td>新交易项</td></tr><tr><td>专家</td><td>专家</td><td>30 次</td><td>新交易项</td></tr><tr><td>大师</td><td>大师</td><td>40 次</td><td>最终交易项</td></tr></tbody></table><h3 id="打折机制" tabindex="-1"><a class="header-anchor" href="#打折机制"><span>打折机制</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 打折条件</span>
<span class="line">- 玩家获得「村庄英雄」效果（击败袭击）</span>
<span class="line">- 玩家与村民的好感度 ≥ 15（交易 + 绿宝石块打折）</span>
<span class="line"></span>
<span class="line"># 僵尸村民治疗</span>
<span class="line">1. 用喷溅虚弱药水 + 金苹果治疗僵尸村民</span>
<span class="line">2. 治疗后永久大幅打折（1 绿宝石 = 1 本附魔书！）</span>
<span class="line">3. 这是获取附魔书最划算的方式</span>
<span class="line"></span></code></pre></div><h3 id="交易锁定技巧" tabindex="-1"><a class="header-anchor" href="#交易锁定技巧"><span>交易锁定技巧</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 保留好交易</span>
<span class="line">- 某个交易很划算 → 不要最后一次交易 → 保留它</span>
<span class="line">- 例如：图书管理员卖 1 绿宝石 = 1 本经验修补</span>
<span class="line">- 交易到还剩 1 次后停止，等待补货</span>
<span class="line"></span>
<span class="line"># 刷掉差交易</span>
<span class="line">- 新手村民可以拆工作站重刷</span>
<span class="line">- 升级后的村民不能重刷职业</span>
<span class="line"></span></code></pre></div><hr><h2 id="村民繁殖" tabindex="-1"><a class="header-anchor" href="#村民繁殖"><span>村民繁殖</span></a></h2><h3 id="繁殖条件" tabindex="-1"><a class="header-anchor" href="#繁殖条件"><span>繁殖条件</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 村民繁殖三要素</span>
<span class="line">1. 两个自愿村民（非幼年）</span>
<span class="line">2. 足够的床（床数 &gt; 村民数）</span>
<span class="line">3. 食物（面包、胡萝卜、马铃薯或甜菜根）</span>
<span class="line"></span>
<span class="line"># 食物消耗</span>
<span class="line">每个村民在繁殖时需要消耗：</span>
<span class="line">- 12 个面包，或</span>
<span class="line">- 12 个胡萝卜，或</span>
<span class="line">- 12 个马铃薯，或</span>
<span class="line">- 12 个甜菜根</span>
<span class="line"></span></code></pre></div><h3 id="自动繁殖机" tabindex="-1"><a class="header-anchor" href="#自动繁殖机"><span>自动繁殖机</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    [床] [床] [床] [床]   ← 3 格高房间</span>
<span class="line">      ↑ 村民跳起来丢食物</span>
<span class="line">    [农民]      [农民]    ← 2 格高房间，丢食物给村民</span>
<span class="line">      ↑ 收集农作物</span>
<span class="line">      [农田]</span>
<span class="line"></span></code></pre></div><blockquote><p>最简单的自动繁殖机：农民种地 → 收菜 → 丢给其他村民 → 村民捡起后繁殖。</p></blockquote><h3 id="村民运输" tabindex="-1"><a class="header-anchor" href="#村民运输"><span>村民运输</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 用矿车运输（最安全）</span>
<span class="line">1. 放置铁轨 + 矿车</span>
<span class="line">2. 右键村民上矿车</span>
<span class="line">3. 推到目标位置</span>
<span class="line"></span>
<span class="line"># 用水流运输</span>
<span class="line">1. 挖一条 1×1 水渠</span>
<span class="line">2. 村民掉入后自动顺流移动</span>
<span class="line"></span>
<span class="line"># 用船运输（水域效率最高）</span>
<span class="line">1. 在陆地上放船</span>
<span class="line">2. 村民会自动上船</span>
<span class="line"></span></code></pre></div><hr><h2 id="交易大厅工程" tabindex="-1"><a class="header-anchor" href="#交易大厅工程"><span>交易大厅工程</span></a></h2><blockquote><p>将多个村民集中管理，最大化利用交易系统。</p></blockquote><h3 id="简单交易大厅设计" tabindex="-1"><a class="header-anchor" href="#简单交易大厅设计"><span>简单交易大厅设计</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 单人小档设计</span>
<span class="line">房间布局：</span>
<span class="line">  [讲台] [村民] [栅栏/玻璃] → 玩家站在外面交易</span>
<span class="line"></span>
<span class="line">每个村民一格空间，前面放工作站点方块</span>
<span class="line">玩家在外面能看到村民并交易</span>
<span class="line"></span>
<span class="line"># 推荐配置（8 位村民）</span>
<span class="line">1. 图书管理员 × 3   → 经验修补、锋利 V、效率 V 附魔书</span>
<span class="line">2. 盔甲匠 × 2       → 全套钻石护甲</span>
<span class="line">3. 工具匠 × 1       → 钻石镐/钻石斧</span>
<span class="line">4. 武器匠 × 1       → 钻石剑</span>
<span class="line">5. 牧师 × 1         → 末影珍珠、红石</span>
<span class="line"></span></code></pre></div><h3 id="僵尸村民打折机" tabindex="-1"><a class="header-anchor" href="#僵尸村民打折机"><span>僵尸村民打折机</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 原理</span>
<span class="line">1. 将村民僵尸化</span>
<span class="line">2. 再治疗（喷溅虚弱药水 + 金苹果）</span>
<span class="line">3. 治疗后永久大幅打折</span>
<span class="line">4. 可以反复操作直到获得极低的交易价格</span>
<span class="line"></span>
<span class="line"># 关键</span>
<span class="line">- 困难模式下僵尸转化率 100%</span>
<span class="line">- 简单/普通模式下概率较低</span>
<span class="line">- 注意保护好村民，防止被完全杀死</span>
<span class="line"></span></code></pre></div><hr><h2 id="铁傀儡机制" tabindex="-1"><a class="header-anchor" href="#铁傀儡机制"><span>铁傀儡机制</span></a></h2><h3 id="生成条件" tabindex="-1"><a class="header-anchor" href="#生成条件"><span>生成条件</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 村民生成铁傀儡</span>
<span class="line">- 至少有 3 个村民</span>
<span class="line">- 至少 75% 的村民工作过（最近一天内）</span>
<span class="line">- 村民必须能看到铁傀儡生成位置</span>
<span class="line"></span>
<span class="line"># 自然生成</span>
<span class="line">- 村庄范围内有 ≥10 个村民 + ≥21 个门（旧版本）</span>
<span class="line">- 新版本：村民恐慌时概率生成</span>
<span class="line"></span></code></pre></div><h3 id="铁农场" tabindex="-1"><a class="header-anchor" href="#铁农场"><span>铁农场</span></a></h3><p>利用村民生成铁傀儡来获取铁锭：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 核心设计思路</span>
<span class="line">1. 至少 3 个村民（带床和工作站）</span>
<span class="line">2. 村民上方有生成平台</span>
<span class="line">3. 铁傀儡生成后 → 水流收集 → 击杀</span>
<span class="line"></span>
<span class="line"># 产出效率</span>
<span class="line">- 简单设计：约 40 铁/小时</span>
<span class="line">- 优化设计：约 200+ 铁/小时</span>
<span class="line"></span></code></pre></div><hr><h2 id="袭击机制" tabindex="-1"><a class="header-anchor" href="#袭击机制"><span>袭击机制</span></a></h2><h3 id="触发袭击" tabindex="-1"><a class="header-anchor" href="#触发袭击"><span>触发袭击</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 获得不祥之兆</span>
<span class="line">- 击杀袭击队队长（头顶灾厄旗帜的掠夺兽/卫道士）</span>
<span class="line">- 获得不祥之兆效果</span>
<span class="line"></span>
<span class="line"># 进入村庄</span>
<span class="line">- 带不祥之兆效果进入有村民的村庄</span>
<span class="line">- 触发袭击（头顶出现血条进度）</span>
<span class="line"></span></code></pre></div><h3 id="袭击奖励" tabindex="-1"><a class="header-anchor" href="#袭击奖励"><span>袭击奖励</span></a></h3><table><thead><tr><th>波数</th><th>敌人强度</th><th>主要奖励</th></tr></thead><tbody><tr><td>1-3</td><td>掠夺兽、卫道士</td><td>绿宝石、箭</td></tr><tr><td>4-5</td><td>唤魔者加入</td><td>绿宝石、不死图腾</td></tr><tr><td>6-7</td><td>女巫</td><td>药水、红石</td></tr><tr><td>胜利</td><td>-</td><td><strong>村庄英雄</strong> 效果（村民打折）</td></tr></tbody></table><blockquote><p>村庄英雄期间（40分钟）所有村民交易大幅打折，是大量囤货的最佳时机。</p></blockquote><hr><h2 id="快速参考" tabindex="-1"><a class="header-anchor" href="#快速参考"><span>快速参考</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 村民繁殖材料</span>
<span class="line">面包：1 小麦 → 6 面包（每 12 面包繁殖一次）</span>
<span class="line">胡萝卜/马铃薯：9 个繁殖一次</span>
<span class="line"></span>
<span class="line"># 首选图书管理员交易</span>
<span class="line">经验修补 → 必需品（附魔到所有工具上）</span>
<span class="line">锋利 V → 武器附魔</span>
<span class="line">效率 V → 挖掘附魔</span>
<span class="line">保护 IV → 护甲附魔</span>
<span class="line"></span>
<span class="line"># 村民工程三原则</span>
<span class="line">1. 给每个村民配床</span>
<span class="line">2. 给每个村民配工作站点</span>
<span class="line">3. 村民与僵尸要隔开保护</span>
<span class="line"></span></code></pre></div>`,52)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};