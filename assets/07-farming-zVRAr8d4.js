import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/mc-tutor/basic/07-farming.html","title":"Minecraft 种植与养殖","lang":"zh-CN","frontmatter":{"order":7,"description":"Minecraft 种植与养殖 钻石 种植系统 基础种植 作物对比 骨粉机制 自动农场设计 养殖系统 动物繁殖 动物食物 牧场布局 村民繁殖与交易 村民繁殖条件 职业与工作站 蜜蜂养殖 实用小技巧","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Minecraft 种植与养殖\\",\\"image\\":[\\"https://minecraft.wiki/images/Invicon_Diamond.png\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/mc-tutor/basic/07-farming.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Minecraft 种植与养殖"}],["meta",{"property":"og:description","content":"Minecraft 种植与养殖 钻石 种植系统 基础种植 作物对比 骨粉机制 自动农场设计 养殖系统 动物繁殖 动物食物 牧场布局 村民繁殖与交易 村民繁殖条件 职业与工作站 蜜蜂养殖 实用小技巧"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://minecraft.wiki/images/Invicon_Diamond.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1783919775000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.74,"words":1121},"filePathRelative":"mc-tutor/basic/07-farming.md","autoDesc":true}`),a={name:`07-farming.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="minecraft-种植与养殖" tabindex="-1"><a class="header-anchor" href="#minecraft-种植与养殖"><span>Minecraft 种植与养殖</span></a></h1><p><img src="https://minecraft.wiki/images/Invicon_Diamond.png" alt="钻石"></p><h2 id="种植系统" tabindex="-1"><a class="header-anchor" href="#种植系统"><span>种植系统</span></a></h2><h3 id="基础种植" tabindex="-1"><a class="header-anchor" href="#基础种植"><span>基础种植</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">种植步骤：</span>
<span class="line">1. 用锄头右键耕地</span>
<span class="line">2. 水源在4格范围内（湿润耕地）</span>
<span class="line">3. 播种</span>
<span class="line">4. 等待生长（光照和水分充足）</span>
<span class="line">5. 收获</span>
<span class="line"></span></code></pre></div><h3 id="作物对比" tabindex="-1"><a class="header-anchor" href="#作物对比"><span>作物对比</span></a></h3><table><thead><tr><th>作物</th><th>ID</th><th>种子来源</th><th>成熟时间</th><th>用途</th><th>生长条件</th></tr></thead><tbody><tr><td>小麦</td><td><code>wheat</code></td><td>草方块</td><td>中等</td><td>面包(bread)、动物繁殖</td><td>水+光照</td></tr><tr><td>胡萝卜</td><td><code>carrot</code></td><td>自然生成/僵尸掉落</td><td>中等</td><td>食物、猪繁殖</td><td>水+光照</td></tr><tr><td>马铃薯</td><td><code>potato</code></td><td>自然生成/僵尸掉落</td><td>中等</td><td>食物</td><td>水+光照</td></tr><tr><td>甜菜</td><td><code>beetroot</code></td><td>村庄</td><td>中等</td><td>食物、染料</td><td>水+光照</td></tr><tr><td>南瓜</td><td><code>pumpkin</code></td><td>自然生成/种子</td><td>快</td><td>铁傀儡、装饰</td><td>水+光照+1格空间</td></tr><tr><td>西瓜</td><td><code>melon</code></td><td>自然生成/种子</td><td>快</td><td>食物、交易</td><td>水+光照+1格空间</td></tr><tr><td>甘蔗</td><td><code>sugar_cane</code></td><td>水边自然生成</td><td>快</td><td>纸(paper)、糖(sugar)</td><td>水边</td></tr><tr><td>仙人掌</td><td><code>cactus</code></td><td>沙漠</td><td>慢</td><td>陷阱、染料</td><td>沙子上</td></tr><tr><td>地狱疣</td><td><code>nether_wart</code></td><td>下界要塞</td><td>中等</td><td>药水</td><td>灵魂沙(soul_sand)上</td></tr><tr><td>可可豆</td><td><code>cocoa_beans</code></td><td>丛林</td><td>中等</td><td>饼干、染料</td><td>丛林木上</td></tr><tr><td>竹子</td><td><code>bamboo</code></td><td>丛林/钓鱼</td><td>最快</td><td>脚手架(scaffolding)、燃料</td><td>任意</td></tr></tbody></table><h3 id="骨粉机制" tabindex="-1"><a class="header-anchor" href="#骨粉机制"><span>骨粉机制</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">骨粉 = 骨粉催熟</span>
<span class="line">来源：骷髅掉落 → 合成骨粉</span>
<span class="line"></span>
<span class="line">效果：</span>
<span class="line">- 可催熟大部分作物</span>
<span class="line">- 可催树苗生长</span>
<span class="line">- 可催花和草</span>
<span class="line">- 对地狱疣无效</span>
<span class="line"></span></code></pre></div><h3 id="自动农场设计" tabindex="-1"><a class="header-anchor" href="#自动农场设计"><span>自动农场设计</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">基础电路：</span>
<span class="line">观察者 检测作物成熟</span>
<span class="line">→ 触发红石信号</span>
<span class="line">→ 激活活塞/发射器收获</span>
<span class="line">→ 水流收集到漏斗</span>
<span class="line"></span>
<span class="line">进阶：</span>
<span class="line">漏斗矿车 收集掉落物</span>
<span class="line">箱子车 站点卸货</span>
<span class="line">时运附魔锄 增加作物掉落</span>
<span class="line"></span></code></pre></div><h2 id="养殖系统" tabindex="-1"><a class="header-anchor" href="#养殖系统"><span>养殖系统</span></a></h2><h3 id="动物繁殖" tabindex="-1"><a class="header-anchor" href="#动物繁殖"><span>动物繁殖</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">繁殖条件：</span>
<span class="line">1. 两只同种动物</span>
<span class="line">2. 手持对应食物</span>
<span class="line">3. 右键喂食</span>
<span class="line">4. 5分钟冷却</span>
<span class="line"></span>
<span class="line">幼崽生长：20分钟（可喂食加速）</span>
<span class="line"></span></code></pre></div><h3 id="动物食物" tabindex="-1"><a class="header-anchor" href="#动物食物"><span>动物食物</span></a></h3><table><thead><tr><th>动物</th><th>ID</th><th>繁殖食物</th><th>吸引食物</th><th>产物</th></tr></thead><tbody><tr><td>牛</td><td><code>cow</code></td><td>小麦(wheat)</td><td>小麦</td><td>牛肉(beef)、皮革(leather)、牛奶(milk_bucket)</td></tr><tr><td>羊</td><td><code>sheep</code></td><td>小麦</td><td>小麦</td><td>羊肉(mutton)、羊毛(white_wool)</td></tr><tr><td>猪</td><td><code>pig</code></td><td>胡萝卜/马铃薯/甜菜</td><td>胡萝卜</td><td>猪排(porkchop)</td></tr><tr><td>鸡</td><td><code>chicken</code></td><td>小麦种子(wheat_seeds)</td><td>小麦种子</td><td>鸡肉(chicken)、羽毛(feather)、蛋(egg)</td></tr><tr><td>兔子</td><td><code>rabbit</code></td><td>蒲公英/胡萝卜</td><td>胡萝卜</td><td>兔肉(rabbit)、兔皮(rabbit_hide)、兔脚(rabbit_foot)</td></tr><tr><td>马</td><td><code>horse</code></td><td>金苹果/金胡萝卜</td><td>金苹果</td><td>骑行</td></tr><tr><td>驴</td><td><code>donkey</code></td><td>金苹果/金胡萝卜</td><td>金苹果</td><td>骑行+箱子</td></tr><tr><td>狐狸</td><td><code>fox</code></td><td>甜浆果(sweet_berries)</td><td>甜浆果</td><td>—</td></tr><tr><td>猫</td><td><code>cat</code></td><td>生鳕鱼(cod)/生鲑鱼(salmon)</td><td>—</td><td>吓退苦力怕(creeper)</td></tr><tr><td>狼</td><td><code>wolf</code></td><td>肉（任何）</td><td>骨头(bone)</td><td>战斗助手</td></tr><tr><td>熊猫</td><td><code>panda</code></td><td>竹子(bamboo)</td><td>竹子</td><td>—</td></tr><tr><td>蜜蜂</td><td><code>bee</code></td><td>花</td><td>花</td><td>蜂蜜(honey_bottle)</td></tr></tbody></table><h3 id="牧场布局" tabindex="-1"><a class="header-anchor" href="#牧场布局"><span>牧场布局</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">推荐设计：</span>
<span class="line">[草方块] → [栅栏围起来]</span>
<span class="line">  ↓</span>
<span class="line">[漏斗 + 箱子] ← [收集掉落物]</span>
<span class="line">  ↓</span>
<span class="line">繁殖时丢食物 → 动物跟随 → 限制在区域内</span>
<span class="line"></span></code></pre></div><h2 id="村民繁殖与交易" tabindex="-1"><a class="header-anchor" href="#村民繁殖与交易"><span>村民繁殖与交易</span></a></h2><h3 id="村民繁殖条件" tabindex="-1"><a class="header-anchor" href="#村民繁殖条件"><span>村民繁殖条件</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1. 至少有两名村民</span>
<span class="line">2. 有效床（每个村民一个床）</span>
<span class="line">3. 有工作站</span>
<span class="line">4. 有食物（面包/胡萝卜/马铃薯/甜菜根）</span>
<span class="line">5. 村民愿意繁殖（有食物且2分钟内交易过）</span>
<span class="line"></span></code></pre></div><h3 id="职业与工作站" tabindex="-1"><a class="header-anchor" href="#职业与工作站"><span>职业与工作站</span></a></h3><table><thead><tr><th>职业</th><th>工作站方块(ID)</th><th>交易物品</th></tr></thead><tbody><tr><td>农民</td><td>堆肥桶 (<code>composter</code>)</td><td>食物、绿宝石</td></tr><tr><td>渔夫</td><td>木桶 (<code>barrel</code>)</td><td>鱼、附魔书</td></tr><tr><td>牧羊人</td><td>织布机 (<code>loom</code>)</td><td>羊毛、床</td></tr><tr><td>图书管理员</td><td>讲台 (<code>lectern</code>)</td><td>附魔书、书架(bookshelf)</td></tr><tr><td>盔甲匠</td><td>高炉 (<code>blast_furnace</code>)</td><td>铁/钻石装备</td></tr><tr><td>武器匠</td><td>磨石 (<code>grindstone</code>)</td><td>剑、斧</td></tr><tr><td>工具匠</td><td>锻造台 (<code>smithing_table</code>)</td><td>镐、锹、斧</td></tr><tr><td>制箭师</td><td>制箭台 (<code>fletching_table</code>)</td><td>箭、弓、弩</td></tr><tr><td>屠夫</td><td>烟熏炉 (<code>smoker</code>)</td><td>肉类</td></tr><tr><td>神父</td><td>酿造台 (<code>brewing_stand</code>)</td><td>药水材料</td></tr><tr><td>石匠</td><td>切石机 (<code>stonecutter</code>)</td><td>石制品</td></tr><tr><td>皮匠</td><td>锅釜 (<code>cauldron</code>)</td><td>皮革装备</td></tr></tbody></table><h2 id="蜜蜂养殖" tabindex="-1"><a class="header-anchor" href="#蜜蜂养殖"><span>蜜蜂养殖</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">蜜蜂养殖步骤：</span>
<span class="line">1. 找到蜂巢（盛开的杜鹃树附近）</span>
<span class="line">2. 用附有精准采集的工具采集蜂巢</span>
<span class="line">3. 放置蜂巢到农场</span>
<span class="line">4. 在旁边种花</span>
<span class="line">5. 蜜蜂采蜜 → 蜂巢蜜汁满 → 用玻璃瓶收集蜂蜜</span>
<span class="line">6. 用剪刀收集蜜脾</span>
<span class="line"></span>
<span class="line">注意：采蜜时蜂巢会激怒蜜蜂</span>
<span class="line">方案A：下方放营火（不激怒蜜蜂）</span>
<span class="line">方案B：用发射器采蜜</span>
<span class="line"></span></code></pre></div><h2 id="实用小技巧" tabindex="-1"><a class="header-anchor" href="#实用小技巧"><span>实用小技巧</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1. 耕地湿润范围：水源4格内</span>
<span class="line">2. 耕地会因踩踏变回泥土（跳跃）</span>
<span class="line">3. 半砖和楼梯上方不会踩踏耕地</span>
<span class="line">4. 火把提供光照促进夜间生长</span>
<span class="line">5. 海龟蛋吸引僵尸和骷髅</span>
<span class="line">6. 用命名牌命名动物防止消失</span>
<span class="line">7. 拴绳可以捆绑和移动动物</span>
<span class="line">8. 动物会跟随手持食物的玩家</span>
<span class="line"></span></code></pre></div>`,27)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};