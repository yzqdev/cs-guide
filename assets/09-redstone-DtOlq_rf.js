import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/mc-tutor/basic/09-redstone.html","title":"Minecraft 红石基础","lang":"zh-CN","frontmatter":{"order":9,"description":"Minecraft 红石基础 红石 红石基本概念 红石是 Minecraft 中的&quot;电路&quot;系统，可以模拟数字逻辑。 基础元件 红石粉 红石火把 红石中继器 红石比较器 逻辑门 非门（NOT） 与门（AND） 或门（OR） RS 触发器 实用元件 活塞 (piston) 发射器 (dispenser) vs 投掷器 (dropper)...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Minecraft 红石基础\\",\\"image\\":[\\"https://minecraft.wiki/images/Invicon_Redstone.png\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/mc-tutor/basic/09-redstone.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Minecraft 红石基础"}],["meta",{"property":"og:description","content":"Minecraft 红石基础 红石 红石基本概念 红石是 Minecraft 中的&quot;电路&quot;系统，可以模拟数字逻辑。 基础元件 红石粉 红石火把 红石中继器 红石比较器 逻辑门 非门（NOT） 与门（AND） 或门（OR） RS 触发器 实用元件 活塞 (piston) 发射器 (dispenser) vs 投掷器 (dropper)..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://minecraft.wiki/images/Invicon_Redstone.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1783919775000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.13,"words":939},"filePathRelative":"mc-tutor/basic/09-redstone.md","autoDesc":true}`),a={name:`09-redstone.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="minecraft-红石基础" tabindex="-1"><a class="header-anchor" href="#minecraft-红石基础"><span>Minecraft 红石基础</span></a></h1><p><img src="https://minecraft.wiki/images/Invicon_Redstone.png" alt="红石"></p><h2 id="红石基本概念" tabindex="-1"><a class="header-anchor" href="#红石基本概念"><span>红石基本概念</span></a></h2><p>红石是 Minecraft 中的&quot;电路&quot;系统，可以模拟数字逻辑。</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">红石信号 = 电流</span>
<span class="line">红石粉 (redstone) = 导线</span>
<span class="line">红石火把 (redstone_torch) = 信号源/非门</span>
<span class="line">中继器 (repeater) = 信号增强/延时</span>
<span class="line">比较器 (comparator) = 信号比较/减法</span>
<span class="line"></span></code></pre></div><h2 id="基础元件" tabindex="-1"><a class="header-anchor" href="#基础元件"><span>基础元件</span></a></h2><h3 id="红石粉" tabindex="-1"><a class="header-anchor" href="#红石粉"><span>红石粉</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">放置方式：地面平铺</span>
<span class="line">信号强度：0–15（逐格衰减）</span>
<span class="line">最大传输距离：15格</span>
<span class="line"></span></code></pre></div><h3 id="红石火把" tabindex="-1"><a class="header-anchor" href="#红石火把"><span>红石火把</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">特性：持续输出15级信号</span>
<span class="line">行为：当附着的方块被激活时熄灭（非门）</span>
<span class="line"></span></code></pre></div><h3 id="红石中继器" tabindex="-1"><a class="header-anchor" href="#红石中继器"><span>红石中继器</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">功能：1. 增强信号（到满格15）</span>
<span class="line">      2. 单向传输（防止回流）</span>
<span class="line">      3. 延迟（1-4 tick可调）</span>
<span class="line"></span></code></pre></div><h3 id="红石比较器" tabindex="-1"><a class="header-anchor" href="#红石比较器"><span>红石比较器</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">模式1（比较模式）：A ≥ B 输出A，否则0</span>
<span class="line">模式2（减法模式）：输出 A - B</span>
<span class="line"></span>
<span class="line">右键切换模式</span>
<span class="line"></span></code></pre></div><h2 id="逻辑门" tabindex="-1"><a class="header-anchor" href="#逻辑门"><span>逻辑门</span></a></h2><h3 id="非门-not" tabindex="-1"><a class="header-anchor" href="#非门-not"><span>非门（NOT）</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">输入 →[红石火把]→ 输出（取反）</span>
<span class="line"></span>
<span class="line">输入1 → 输出0</span>
<span class="line">输入0 → 输出1</span>
<span class="line"></span></code></pre></div><h3 id="与门-and" tabindex="-1"><a class="header-anchor" href="#与门-and"><span>与门（AND）</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">输入A ──┐</span>
<span class="line">         ├→[输出]</span>
<span class="line">输入B ──┘</span>
<span class="line"></span>
<span class="line">两个输入都是1时输出1</span>
<span class="line"></span></code></pre></div><h3 id="或门-or" tabindex="-1"><a class="header-anchor" href="#或门-or"><span>或门（OR）</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">输入A ──┐</span>
<span class="line">         ├→[输出]</span>
<span class="line">输入B ──┘</span>
<span class="line"></span>
<span class="line">任意输入为1时输出1</span>
<span class="line"></span></code></pre></div><h3 id="rs-触发器" tabindex="-1"><a class="header-anchor" href="#rs-触发器"><span>RS 触发器</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">  ┌─[非门]←┐</span>
<span class="line">  │         │</span>
<span class="line">设置→→→ 输出 ←←←重置</span>
<span class="line">  │         │</span>
<span class="line">  └→[非门]─┘</span>
<span class="line"></span>
<span class="line">特点：保持状态</span>
<span class="line">设置=ON → 输出=ON</span>
<span class="line">重置=ON → 输出=OFF</span>
<span class="line"></span></code></pre></div><h2 id="实用元件" tabindex="-1"><a class="header-anchor" href="#实用元件"><span>实用元件</span></a></h2><h3 id="活塞-piston" tabindex="-1"><a class="header-anchor" href="#活塞-piston"><span>活塞 (piston)</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">普通活塞 (piston)：推动最多12个方块</span>
<span class="line">黏性活塞 (sticky_piston)：推动+拉回方块</span>
<span class="line"></span></code></pre></div><h3 id="发射器-dispenser-vs-投掷器-dropper" tabindex="-1"><a class="header-anchor" href="#发射器-dispenser-vs-投掷器-dropper"><span>发射器 (dispenser) vs 投掷器 (dropper)</span></a></h3><table><thead><tr><th>元件</th><th>ID</th><th>行为</th><th>用途</th></tr></thead><tbody><tr><td>发射器</td><td><code>dispenser</code></td><td>激活时发射物品</td><td>射箭、喷水、放TNT</td></tr><tr><td>投掷器</td><td><code>dropper</code></td><td>激活时投出物品</td><td>物品运输</td></tr></tbody></table><h3 id="漏斗-hopper" tabindex="-1"><a class="header-anchor" href="#漏斗-hopper"><span>漏斗 (hopper)</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">漏斗 (hopper)：收集/传输物品</span>
<span class="line">方向：指向的方向输出物品</span>
<span class="line">特性：每 4 tick 传输1个物品</span>
<span class="line"></span></code></pre></div><h3 id="侦测器-observer" tabindex="-1"><a class="header-anchor" href="#侦测器-observer"><span>侦测器 (observer)</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">功能：检测方块状态变化</span>
<span class="line">输出：单次脉冲（1 tick）</span>
<span class="line">方向：正面为检测面</span>
<span class="line"></span></code></pre></div><h3 id="音符盒-note-block" tabindex="-1"><a class="header-anchor" href="#音符盒-note-block"><span>音符盒 (note_block)</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">用途：播放音效</span>
<span class="line">音高：右键调整（下方方块决定音色）</span>
<span class="line">红石信号触发</span>
<span class="line"></span></code></pre></div><h3 id="钟-bell" tabindex="-1"><a class="header-anchor" href="#钟-bell"><span>钟 (bell)</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">功能：被红石激活或右键时发声</span>
<span class="line">范围：32格内的村民回到房屋</span>
<span class="line"></span></code></pre></div><h2 id="常见红石装置" tabindex="-1"><a class="header-anchor" href="#常见红石装置"><span>常见红石装置</span></a></h2><h3 id="自动农场" tabindex="-1"><a class="header-anchor" href="#自动农场"><span>自动农场</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[水]          [水]          [水]</span>
<span class="line">  ↓            ↓            ↓</span>
<span class="line">[耕地]→[漏斗]→[箱子]</span>
<span class="line"></span>
<span class="line">水流收集作物到漏斗中</span>
<span class="line">红石时钟控制活塞/发射器</span>
<span class="line"></span></code></pre></div><h3 id="物品分类机" tabindex="-1"><a class="header-anchor" href="#物品分类机"><span>物品分类机</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[漏斗] → [比较器]</span>
<span class="line">   ↓</span>
<span class="line">[装物品的漏斗]</span>
<span class="line">   ↓</span>
<span class="line">[箱子]</span>
<span class="line"></span>
<span class="line">原理：比较器检测漏斗内物品数量</span>
<span class="line">满45个时输出信号锁定漏斗</span>
<span class="line"></span></code></pre></div><h3 id="简易陷阱" tabindex="-1"><a class="header-anchor" href="#简易陷阱"><span>简易陷阱</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">压力板 → [红石粉] → [活塞/发射器]</span>
<span class="line"></span>
<span class="line">或：</span>
<span class="line">绊线钩 + 线 → 绊线 → [TNT/箭]</span>
<span class="line"></span></code></pre></div><h3 id="密码锁" tabindex="-1"><a class="header-anchor" href="#密码锁"><span>密码锁</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">多个拉杆 → [与门/或门] → [输出]</span>
<span class="line">每个拉杆对应一个二进制位</span>
<span class="line">组合正确时开门</span>
<span class="line"></span></code></pre></div><h3 id="电梯-黏液块方案" tabindex="-1"><a class="header-anchor" href="#电梯-黏液块方案"><span>电梯（黏液块方案）</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">黏性活塞 → 黏液块 → 上升平台</span>
<span class="line">红石中继器 + 火把 → 时序控制</span>
<span class="line"></span></code></pre></div><h2 id="进阶技巧" tabindex="-1"><a class="header-anchor" href="#进阶技巧"><span>进阶技巧</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1. 红石火把每1 tick恢复，可做高频脉冲</span>
<span class="line">2. 两个中继器对放可制作循环电路</span>
<span class="line">3. 漏斗矿车 = 移动漏斗</span>
<span class="line">4. 观察者 + 活塞 = 即时信号传输</span>
<span class="line">5. 讲台 + 比较器 = 可调节信号强度</span>
<span class="line">6. 阳光传感器可检测白天/夜晚</span>
<span class="line">7. 陷阱箱被打开时输出信号</span>
<span class="line">8. 红石块既可作为电源也可作为导线</span>
<span class="line"></span></code></pre></div><h2 id="常用电路图" tabindex="-1"><a class="header-anchor" href="#常用电路图"><span>常用电路图</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">高频时钟：</span>
<span class="line">[中继器] → [红石粉] → [中继器]</span>
<span class="line">                                          ↑          |</span>
<span class="line">                                          |          |</span>
<span class="line">                                          └──────────┘</span>
<span class="line"></span>
<span class="line">脉冲发生器（按一次出一次）：</span>
<span class="line">按钮 → [中继器] → [红石粉] → 输出</span>
<span class="line"></span></code></pre></div><h2 id="实际案例-简易西瓜-南瓜机" tabindex="-1"><a class="header-anchor" href="#实际案例-简易西瓜-南瓜机"><span>实际案例：简易西瓜/南瓜机</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1. 耕地一行，种西瓜/南瓜种子</span>
<span class="line">2. 第一个方块旁放活塞</span>
<span class="line">3. 活塞后放红石粉 + 中继器 + 观察者</span>
<span class="line">4. 观察者检测西瓜长大 → 触发活塞 → 破坏西瓜</span>
<span class="line">5. 水流收集掉落物到箱子</span>
<span class="line"></span></code></pre></div>`,53)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};