import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/mc-tutor/basic/04-combat.html","title":"Minecraft 战斗与装备","lang":"zh-CN","frontmatter":{"order":4,"description":"Minecraft 战斗与装备 钻石剑 战斗机制 攻击冷却 1.9+ 版本引入了攻击冷却机制： 暴击 横扫攻击 武器对比 盾牌使用 箭矢类型 药水系统 酿造基础 常用药水 实战策略 PVE（对抗怪物） 下界生存 末地战斗 装备进阶 下界合金装备获取 鞘翅使用 图腾效果","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Minecraft 战斗与装备\\",\\"image\\":[\\"https://minecraft.wiki/images/Invicon_Diamond_Sword.png\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/mc-tutor/basic/04-combat.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Minecraft 战斗与装备"}],["meta",{"property":"og:description","content":"Minecraft 战斗与装备 钻石剑 战斗机制 攻击冷却 1.9+ 版本引入了攻击冷却机制： 暴击 横扫攻击 武器对比 盾牌使用 箭矢类型 药水系统 酿造基础 常用药水 实战策略 PVE（对抗怪物） 下界生存 末地战斗 装备进阶 下界合金装备获取 鞘翅使用 图腾效果"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://minecraft.wiki/images/Invicon_Diamond_Sword.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1783919775000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.45,"words":1036},"filePathRelative":"mc-tutor/basic/04-combat.md","autoDesc":true}`),a={name:`04-combat.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="minecraft-战斗与装备" tabindex="-1"><a class="header-anchor" href="#minecraft-战斗与装备"><span>Minecraft 战斗与装备</span></a></h1><p><img src="https://minecraft.wiki/images/Invicon_Diamond_Sword.png" alt="钻石剑"></p><h2 id="战斗机制" tabindex="-1"><a class="header-anchor" href="#战斗机制"><span>战斗机制</span></a></h2><h3 id="攻击冷却" tabindex="-1"><a class="header-anchor" href="#攻击冷却"><span>攻击冷却</span></a></h3><p>1.9+ 版本引入了攻击冷却机制：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">攻击冷却指示器：武器下方的刻度条</span>
<span class="line">满冷却时攻击 = 最大伤害（暴击）</span>
<span class="line">冷却不足时攻击 = 伤害降低</span>
<span class="line"></span></code></pre></div><h3 id="暴击" tabindex="-1"><a class="header-anchor" href="#暴击"><span>暴击</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">暴击条件：</span>
<span class="line">1. 玩家在下落过程中攻击</span>
<span class="line">2. 非空中/水中状态</span>
<span class="line">3. 攻击冷却满</span>
<span class="line"></span>
<span class="line">暴击效果：伤害 × 1.5，★粒子效果</span>
<span class="line">触发方式：跳跃 → 下落 → 攻击</span>
<span class="line"></span></code></pre></div><h3 id="横扫攻击" tabindex="-1"><a class="header-anchor" href="#横扫攻击"><span>横扫攻击</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">剑可以同时攻击多个目标</span>
<span class="line">武器冷却满时有横扫效果</span>
<span class="line">横扫之刃附魔增加横扫伤害</span>
<span class="line"></span></code></pre></div><h2 id="武器对比" tabindex="-1"><a class="header-anchor" href="#武器对比"><span>武器对比</span></a></h2><table><thead><tr><th>武器</th><th>ID</th><th>攻击速度</th><th>基础伤害</th><th>特点</th></tr></thead><tbody><tr><td>木剑</td><td><code>wooden_sword</code></td><td>1.6</td><td>4</td><td>初期</td></tr><tr><td>石剑</td><td><code>stone_sword</code></td><td>1.6</td><td>5</td><td>早期</td></tr><tr><td>铁剑</td><td><code>iron_sword</code></td><td>1.6</td><td>6</td><td>中期</td></tr><tr><td>钻石剑</td><td><code>diamond_sword</code></td><td>1.6</td><td>7</td><td>后期</td></tr><tr><td>下界合金剑</td><td><code>netherite_sword</code></td><td>1.6</td><td>8</td><td>最终</td></tr><tr><td>木斧</td><td><code>wooden_axe</code></td><td>0.8</td><td>7</td><td>伤害高但攻速慢</td></tr><tr><td>钻石斧</td><td><code>diamond_axe</code></td><td>1.0</td><td>9</td><td>高伤害武器</td></tr><tr><td>下界合金斧</td><td><code>netherite_axe</code></td><td>1.0</td><td>10</td><td>最高近战伤害</td></tr><tr><td>弓</td><td><code>bow</code>（满蓄力）</td><td>—</td><td>9</td><td>远程</td></tr><tr><td>弩</td><td><code>crossbow</code></td><td>—</td><td>9</td><td>可穿透/多重射击</td></tr><tr><td>三叉戟</td><td><code>trident</code></td><td>1.1</td><td>9</td><td>近战+远程</td></tr></tbody></table><h2 id="盾牌使用" tabindex="-1"><a class="header-anchor" href="#盾牌使用"><span>盾牌使用</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">盾牌合成 (shield)：</span>
<span class="line">IWI</span>
<span class="line">III</span>
<span class="line"> I</span>
<span class="line">W=木板(oak_planks) I=铁锭(iron_ingot)</span>
<span class="line"></span>
<span class="line">使用：右键举盾</span>
<span class="line">功能：格挡正面攻击（减伤）</span>
<span class="line">反噬：成功格挡后敌人会后退</span>
<span class="line">弱点：斧头攻击可使盾牌失效5秒</span>
<span class="line"></span></code></pre></div><h2 id="箭矢类型" tabindex="-1"><a class="header-anchor" href="#箭矢类型"><span>箭矢类型</span></a></h2><table><thead><tr><th>箭矢</th><th>ID</th><th>效果</th><th>获取</th></tr></thead><tbody><tr><td>普通箭</td><td><code>arrow</code></td><td>基础伤害</td><td>合成/骷髅掉落</td></tr><tr><td>光灵箭</td><td><code>spectral_arrow</code></td><td>目标发光10秒</td><td>萤石粉+箭</td></tr><tr><td>药箭</td><td><code>tipped_arrow</code></td><td>附加药水效果</td><td>对应药水+箭</td></tr></tbody></table><h2 id="药水系统" tabindex="-1"><a class="header-anchor" href="#药水系统"><span>药水系统</span></a></h2><h3 id="酿造基础" tabindex="-1"><a class="header-anchor" href="#酿造基础"><span>酿造基础</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">酿造台合成：</span>
<span class="line">  BLB</span>
<span class="line"> CBC</span>
<span class="line">B=烈焰棒 L=岩浆膏 C=圆石</span>
<span class="line"></span>
<span class="line">基础材料：</span>
<span class="line">- 粗制的药水：下界疣 + 水瓶</span>
<span class="line">- 红石粉：延长持续时间</span>
<span class="line">- 萤石粉：加强效果等级</span>
<span class="line">- 火药：变成喷溅药水</span>
<span class="line">- 龙息：变成滞留药水</span>
<span class="line"></span></code></pre></div><h3 id="常用药水" tabindex="-1"><a class="header-anchor" href="#常用药水"><span>常用药水</span></a></h3><table><thead><tr><th>药水</th><th>酿造材料</th><th>效果</th></tr></thead><tbody><tr><td>治疗药水</td><td>闪烁的西瓜</td><td>瞬间回血</td></tr><tr><td>再生药水</td><td>恶魂之泪</td><td>持续回血</td></tr><tr><td>力量药水</td><td>烈焰粉</td><td>增加攻击力</td></tr><tr><td>迅捷药水</td><td>糖</td><td>增加移动速度</td></tr><tr><td>抗火药水</td><td>岩浆膏</td><td>免疫火焰</td></tr><tr><td>夜视药水</td><td>金胡萝卜</td><td>水下/黑夜视物</td></tr><tr><td>水肺药水</td><td>河豚</td><td>水下呼吸</td></tr><tr><td>隐身药水</td><td>发酵蛛眼+夜视</td><td>隐身（装备发光）</td></tr><tr><td>跳跃药水</td><td>兔子脚</td><td>提高跳跃</td></tr><tr><td>缓慢药水</td><td>发酵蛛眼+迅捷</td><td>减速</td></tr></tbody></table><h2 id="实战策略" tabindex="-1"><a class="header-anchor" href="#实战策略"><span>实战策略</span></a></h2><h3 id="pve-对抗怪物" tabindex="-1"><a class="header-anchor" href="#pve-对抗怪物"><span>PVE（对抗怪物）</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1. 骷髅射手：举盾靠近，近战解决</span>
<span class="line">2. 苦力怕：剑击退后拉开距离</span>
<span class="line">3. 蜘蛛：原地攻击（蜘蛛需要助跑才能跳）</span>
<span class="line">4. 末影人：不要直视，用水隔离</span>
<span class="line">5. 女巫：优先击杀，喝抗火药水应对中毒</span>
<span class="line">6. 掠夺者：盾牌格挡箭矢</span>
<span class="line">7. 卫道士：斧头伤害高，注意格挡</span>
<span class="line"></span></code></pre></div><h3 id="下界生存" tabindex="-1"><a class="header-anchor" href="#下界生存"><span>下界生存</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">必备准备：</span>
<span class="line">✅ 下界合金/钻石装备</span>
<span class="line">✅ 抗火药水（对岩浆怪和火焰环境）</span>
<span class="line">✅ 足够的食物</span>
<span class="line">✅ 床位（在下床会爆炸！用重生锚替代）</span>
<span class="line">✅ 金锭（与猪灵交易）</span>
<span class="line"></span>
<span class="line">猪灵交易：丢金锭给猪灵，随机回馈物品</span>
<span class="line">猪灵蛮兵：不可交易，主动攻击</span>
<span class="line"></span></code></pre></div><h3 id="末地战斗" tabindex="-1"><a class="header-anchor" href="#末地战斗"><span>末地战斗</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">对抗末影龙：</span>
<span class="line">1. 破坏治疗水晶（黑曜石柱顶端）</span>
<span class="line">2. 射箭攻击龙</span>
<span class="line">3. 末影珍珠可传送到末地岛</span>
<span class="line">4. 准备大量箭矢</span>
<span class="line">5. 慢落药水防止摔死</span>
<span class="line">6. 床爆炸对龙有伤害（末地可用）</span>
<span class="line"></span>
<span class="line">寻找末地城：</span>
<span class="line">1. 杀死龙后跳入传送门</span>
<span class="line">2. 在末地外岛探索</span>
<span class="line">3. 获得鞘翅和潜影壳</span>
<span class="line"></span></code></pre></div><h2 id="装备进阶" tabindex="-1"><a class="header-anchor" href="#装备进阶"><span>装备进阶</span></a></h2><h3 id="下界合金装备获取" tabindex="-1"><a class="header-anchor" href="#下界合金装备获取"><span>下界合金装备获取</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1. 进入下界挖远古残骸（Y=15左右）</span>
<span class="line">2. 用4个远古残骸+4个金锭合成下界合金锭</span>
<span class="line">3. 用锻造台将钻石装备升级</span>
<span class="line"></span></code></pre></div><h3 id="鞘翅使用" tabindex="-1"><a class="header-anchor" href="#鞘翅使用"><span>鞘翅使用</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">鞘翅获取：末地船中</span>
<span class="line">使用：按跳跃键飞行</span>
<span class="line">加速：烟花火箭（可用）</span>
<span class="line">耐久：经验修补修复</span>
<span class="line"></span></code></pre></div><h3 id="图腾效果" tabindex="-1"><a class="header-anchor" href="#图腾效果"><span>图腾效果</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">不死图腾：死亡时复活（给予生命恢复II）</span>
<span class="line">获取：杀死唤魔者</span>
<span class="line">建议：主手或副手持拿</span>
<span class="line"></span></code></pre></div>`,35)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};