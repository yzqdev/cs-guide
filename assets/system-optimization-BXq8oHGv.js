import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/windows-tutor/windows-tips/system-optimization.html","title":"Windows 系统优化技巧","lang":"zh-CN","frontmatter":{"description":"Windows 系统优化技巧 不装第三方软件，从系统层面让 Windows 运行更流畅。 启动项管理 很多软件安装时会自动添加到开机启动项，拖慢开机速度。 方法一：任务管理器 Ctrl + Shift + Esc 打开任务管理器 切换到 启动 标签页 右键 → 禁用不必要的程序 方法二：设置 常见可禁用的启动项 关闭视觉效果 Windows 的动画和特...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Windows 系统优化技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/windows-tips/system-optimization.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Windows 系统优化技巧"}],["meta",{"property":"og:description","content":"Windows 系统优化技巧 不装第三方软件，从系统层面让 Windows 运行更流畅。 启动项管理 很多软件安装时会自动添加到开机启动项，拖慢开机速度。 方法一：任务管理器 Ctrl + Shift + Esc 打开任务管理器 切换到 启动 标签页 右键 → 禁用不必要的程序 方法二：设置 常见可禁用的启动项 关闭视觉效果 Windows 的动画和特..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":4.44,"words":1333},"filePathRelative":"windows-tutor/windows-tips/system-optimization.md","autoDesc":true}`),a={name:`system-optimization.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="windows-系统优化技巧" tabindex="-1"><a class="header-anchor" href="#windows-系统优化技巧"><span>Windows 系统优化技巧</span></a></h1><blockquote><p>不装第三方软件，从系统层面让 Windows 运行更流畅。</p></blockquote><h2 id="启动项管理" tabindex="-1"><a class="header-anchor" href="#启动项管理"><span>启动项管理</span></a></h2><p>很多软件安装时会自动添加到开机启动项，拖慢开机速度。</p><h3 id="方法一-任务管理器" tabindex="-1"><a class="header-anchor" href="#方法一-任务管理器"><span>方法一：任务管理器</span></a></h3><ol><li><code>Ctrl + Shift + Esc</code> 打开任务管理器</li><li>切换到 <strong>启动</strong> 标签页</li><li>右键 → 禁用不必要的程序</li></ol><h3 id="方法二-设置" tabindex="-1"><a class="header-anchor" href="#方法二-设置"><span>方法二：设置</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">设置 → 应用 → 启动</span>
<span class="line"></span></code></pre></div><h3 id="常见可禁用的启动项" tabindex="-1"><a class="header-anchor" href="#常见可禁用的启动项"><span>常见可禁用的启动项</span></a></h3><table><thead><tr><th>程序</th><th>建议</th><th>说明</th></tr></thead><tbody><tr><td>微信/QQ</td><td>按需</td><td>需要即时消息可保留</td></tr><tr><td>迅雷/百度网盘</td><td>禁用</td><td>下载时才打开</td></tr><tr><td>打印机驱动</td><td>保留</td><td>打印需要</td></tr><tr><td>云盘同步</td><td>按需</td><td>OneDrive、Dropbox 等</td></tr><tr><td>更新程序</td><td>禁用</td><td>如 Adobe Updater</td></tr></tbody></table><h2 id="关闭视觉效果" tabindex="-1"><a class="header-anchor" href="#关闭视觉效果"><span>关闭视觉效果</span></a></h2><p>Windows 的动画和特效会消耗一定的系统资源，对于低配机器尤为明显。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 快速打开性能选项</span></span>
<span class="line">sysdm.cpl</span>
<span class="line"><span class="token comment"># → 高级 → 性能 → 设置</span></span>
<span class="line"></span></code></pre></div><p>推荐设置：</p><ul><li>勾选：<strong>平滑屏幕字体边缘</strong></li><li>勾选：<strong>显示缩略图，而不是显示图标</strong></li><li>取消勾选：<strong>动画任务栏</strong>、<strong>淡入淡出效果</strong>、<strong>在窗口下显示阴影</strong></li></ul><h2 id="存储感知-自动清理" tabindex="-1"><a class="header-anchor" href="#存储感知-自动清理"><span>存储感知（自动清理）</span></a></h2><p>Windows 内置的自动清理功能：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">设置 → 系统 → 存储 → 存储感知 → 开启</span>
<span class="line"></span></code></pre></div><p>可以自动清理：</p><ul><li>临时文件</li><li>回收站文件（超过指定天数）</li><li>下载文件夹（超过指定天数未打开的文件）</li></ul><h3 id="手动清理" tabindex="-1"><a class="header-anchor" href="#手动清理"><span>手动清理</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 打开磁盘清理工具</span></span>
<span class="line">cleanmgr</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清理系统文件（包括 Windows 更新缓存）</span></span>
<span class="line">cleanmgr /sageset:1</span>
<span class="line"></span></code></pre></div><h2 id="关闭后台应用" tabindex="-1"><a class="header-anchor" href="#关闭后台应用"><span>关闭后台应用</span></a></h2><p>很多应用在后台运行消耗 CPU 和内存：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">设置 → 隐私和安全 → 后台应用</span>
<span class="line">→ 关闭不需要的后台应用</span>
<span class="line"></span></code></pre></div><p>或直接关闭所有后台应用，只保留需要的。</p><h2 id="传递优化-p2p-更新" tabindex="-1"><a class="header-anchor" href="#传递优化-p2p-更新"><span>传递优化（P2P 更新）</span></a></h2><p>Windows 更新默认启用 P2P 分发，会占用上传带宽：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">设置 → Windows 更新 → 高级选项 → 传递优化</span>
<span class="line">→ 关闭&quot;允许从其他电脑下载&quot;</span>
<span class="line"></span></code></pre></div><h2 id="快速启动-vs-完整关机" tabindex="-1"><a class="header-anchor" href="#快速启动-vs-完整关机"><span>快速启动 vs 完整关机</span></a></h2><h3 id="快速启动-默认" tabindex="-1"><a class="header-anchor" href="#快速启动-默认"><span>快速启动（默认）</span></a></h3><ul><li>优点：开机速度快</li><li>缺点：不彻底关机，某些更新需要&quot;重启&quot;而不是&quot;关机&quot;</li><li>缺点：偶尔会导致驱动问题</li></ul><h3 id="完全关机" tabindex="-1"><a class="header-anchor" href="#完全关机"><span>完全关机</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 完全关机（跳过快速启动）</span></span>
<span class="line"><span class="token function">shutdown</span> /s /t <span class="token number">0</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或关闭快速启动</span></span>
<span class="line"><span class="token comment"># 控制面板 → 电源选项 → 选择电源按钮功能 → 更改当前不可用的设置</span></span>
<span class="line"><span class="token comment"># → 取消勾选&quot;启用快速启动&quot;</span></span>
<span class="line"></span></code></pre></div><h2 id="电源计划" tabindex="-1"><a class="header-anchor" href="#电源计划"><span>电源计划</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">控制面板 → 电源选项</span>
<span class="line"></span></code></pre></div><table><thead><tr><th>计划</th><th>适用场景</th></tr></thead><tbody><tr><td>平衡（推荐）</td><td>日常使用</td></tr><tr><td>高性能</td><td>游戏、渲染（耗电增加）</td></tr><tr><td>节能</td><td>笔记本省电</td></tr></tbody></table><h3 id="高性能计划隐藏设置" tabindex="-1"><a class="header-anchor" href="#高性能计划隐藏设置"><span>高性能计划隐藏设置</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 显示隐藏的&quot;卓越性能&quot;计划（仅 Win10/11 专业版/工作站版）</span></span>
<span class="line">powercfg <span class="token parameter variable">-duplicatescheme</span> e9a42b02-d5df-448d-aa00-03f14749eb61</span>
<span class="line"></span></code></pre></div><h2 id="卸载预装应用" tabindex="-1"><a class="header-anchor" href="#卸载预装应用"><span>卸载预装应用</span></a></h2><p>Windows 预装了很多可能用不到的应用：</p><h3 id="使用-powershell-卸载" tabindex="-1"><a class="header-anchor" href="#使用-powershell-卸载"><span>使用 PowerShell 卸载</span></a></h3><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token comment"># 查看所有预装应用</span></span>
<span class="line"><span class="token function">Get-AppxPackage</span> <span class="token punctuation">|</span> <span class="token function">Select</span> Name<span class="token punctuation">,</span> PackageFullName</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 卸载特定应用（以 Xbox 为例）</span></span>
<span class="line"><span class="token function">Get-AppxPackage</span> <span class="token operator">*</span>xbox* <span class="token punctuation">|</span> <span class="token function">Remove-AppxPackage</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 卸载所有预装应用（谨慎！）</span></span>
<span class="line"><span class="token function">Get-AppxPackage</span> <span class="token punctuation">|</span> <span class="token function">Remove-AppxPackage</span></span>
<span class="line"></span></code></pre></div><h3 id="常见可卸载的预装应用" tabindex="-1"><a class="header-anchor" href="#常见可卸载的预装应用"><span>常见可卸载的预装应用</span></a></h3><table><thead><tr><th>应用</th><th>命令</th></tr></thead><tbody><tr><td>Xbox</td><td>\`Get-AppxPackage <em>xbox</em></td></tr><tr><td>OneNote</td><td>\`Get-AppxPackage <em>onenote</em></td></tr><tr><td>3D Builder</td><td>\`Get-AppxPackage <em>3dbuilder</em></td></tr><tr><td>纸牌游戏</td><td>\`Get-AppxPackage <em>solitaire</em></td></tr><tr><td>Skype</td><td>\`Get-AppxPackage <em>skype</em></td></tr><tr><td>新闻</td><td>\`Get-AppxPackage <em>bingnews</em></td></tr><tr><td>天气</td><td>\`Get-AppxPackage <em>bingweather</em></td></tr></tbody></table><h2 id="磁盘碎片整理" tabindex="-1"><a class="header-anchor" href="#磁盘碎片整理"><span>磁盘碎片整理</span></a></h2><p>对于 HDD（机械硬盘）定期整理碎片，SSD 不需要（系统会自动优化）。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 打开碎片整理工具</span></span>
<span class="line">dfrgui</span>
<span class="line"></span></code></pre></div><p>SSD 用户请确保开启了 <strong>TRIM</strong>：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 检查 TRIM 状态</span></span>
<span class="line">fsutil behavior query DisableDeleteNotify</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 结果为 0 表示已启用（正常）</span></span>
<span class="line"><span class="token comment"># 结果为 1 表示未启用</span></span>
<span class="line"></span></code></pre></div><h2 id="索引优化" tabindex="-1"><a class="header-anchor" href="#索引优化"><span>索引优化</span></a></h2><p>Windows 搜索索引会占用 CPU 和磁盘：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">控制面板 → 索引选项 → 修改</span>
<span class="line">→ 只保留需要搜索的路径（如文档、桌面）</span>
<span class="line">→ 移除不需要的路径（如 C:\\Windows）</span>
<span class="line"></span></code></pre></div><h2 id="服务优化" tabindex="-1"><a class="header-anchor" href="#服务优化"><span>服务优化</span></a></h2><p><strong>注意：修改服务可能影响系统功能，请谨慎操作。</strong></p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 打开服务管理器</span></span>
<span class="line">services.msc</span>
<span class="line"></span></code></pre></div><h3 id="可安全禁用的服务" tabindex="-1"><a class="header-anchor" href="#可安全禁用的服务"><span>可安全禁用的服务</span></a></h3><table><thead><tr><th>服务名称</th><th>说明</th></tr></thead><tbody><tr><td>Windows Search</td><td>不使用搜索功能可禁用</td></tr><tr><td>Print Spooler</td><td>没有打印机可禁用</td></tr><tr><td>Xbox Live 相关服务</td><td>不玩 Xbox 游戏可禁用</td></tr><tr><td>Windows Error Reporting</td><td>错误报告，可禁用</td></tr><tr><td>Diagnostic Tracking</td><td>诊断跟踪，可禁用</td></tr><tr><td>Touch Keyboard 服务</td><td>没有触摸屏可禁用</td></tr></tbody></table><h2 id="关闭休眠" tabindex="-1"><a class="header-anchor" href="#关闭休眠"><span>关闭休眠</span></a></h2><p>如果你不需要休眠功能（注意：是休眠，不是睡眠），可以关闭来释放磁盘空间：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看休眠文件大小</span></span>
<span class="line">powercfg /h /size</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 关闭休眠（释放 C 盘空间，通常 4-16GB）</span></span>
<span class="line">powercfg /h off</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重新开启</span></span>
<span class="line">powercfg /h on</span>
<span class="line"></span></code></pre></div><h2 id="临时文件清理" tabindex="-1"><a class="header-anchor" href="#临时文件清理"><span>临时文件清理</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 打开临时文件夹</span></span>
<span class="line">%temp%</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 也可以打开</span></span>
<span class="line">temp</span>
<span class="line"><span class="token comment"># 和</span></span>
<span class="line">prefetch</span>
<span class="line"></span></code></pre></div><p>定期清理这些文件夹中的文件可以释放磁盘空间。</p><h2 id="减少开机等待时间" tabindex="-1"><a class="header-anchor" href="#减少开机等待时间"><span>减少开机等待时间</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 打开系统配置</span></span>
<span class="line">msconfig</span>
<span class="line"><span class="token comment"># → 引导 → 超时 → 改为 3 秒（默认 30 秒）</span></span>
<span class="line"></span></code></pre></div><h2 id="查看系统健康状态" tabindex="-1"><a class="header-anchor" href="#查看系统健康状态"><span>查看系统健康状态</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 系统文件检查（修复系统文件）</span></span>
<span class="line">sfc /scannow</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 部署映像服务和管理（修复系统映像）</span></span>
<span class="line">DISM /Online /Cleanup-Image /RestoreHealth</span>
<span class="line"></span></code></pre></div><h2 id="推荐操作顺序" tabindex="-1"><a class="header-anchor" href="#推荐操作顺序"><span>推荐操作顺序</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1. 关闭不必要的启动项</span>
<span class="line">2. 关闭视觉效果</span>
<span class="line">3. 开启存储感知</span>
<span class="line">4. 关闭后台应用</span>
<span class="line">5. 关闭 P2P 传递优化</span>
<span class="line">6. 选择合适的电源计划</span>
<span class="line">7. 卸载不需要的预装应用</span>
<span class="line">8. 关闭不需要的 Windows 功能</span>
<span class="line">9. 关闭休眠（如果不需要）</span>
<span class="line">10. 清理临时文件</span>
<span class="line"></span></code></pre></div>`,70)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};