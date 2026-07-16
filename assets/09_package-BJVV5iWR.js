import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/linux-tutor/basic/09_package.html","title":"软件包管理","lang":"zh-CN","frontmatter":{"order":9,"description":"软件包管理 Linux 发行版通过包管理器来安装、更新和卸载软件。 包管理器概览 本章以 Ubuntu/Debian 的 apt 为主。 apt — Debian 系包管理 更新软件源 搜索与安装 卸载 其他操作 dpkg — 底层工具 当 dpkg -i 报依赖错误时，用以下命令修复： 安装策略实战 其他发行版速查 RHEL/Fedora (dnf)...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"软件包管理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/basic/09_package.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"软件包管理"}],["meta",{"property":"og:description","content":"软件包管理 Linux 发行版通过包管理器来安装、更新和卸载软件。 包管理器概览 本章以 Ubuntu/Debian 的 apt 为主。 apt — Debian 系包管理 更新软件源 搜索与安装 卸载 其他操作 dpkg — 底层工具 当 dpkg -i 报依赖错误时，用以下命令修复： 安装策略实战 其他发行版速查 RHEL/Fedora (dnf)..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1784119030000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.26,"words":678},"filePathRelative":"linux-tutor/basic/09_package.md","autoDesc":true}`),a={name:`09_package.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="软件包管理" tabindex="-1"><a class="header-anchor" href="#软件包管理"><span>软件包管理</span></a></h1><p>Linux 发行版通过包管理器来安装、更新和卸载软件。</p><h2 id="包管理器概览" tabindex="-1"><a class="header-anchor" href="#包管理器概览"><span>包管理器概览</span></a></h2><table><thead><tr><th>发行版</th><th>包格式</th><th>底层工具</th><th>高层工具</th></tr></thead><tbody><tr><td>Debian/Ubuntu</td><td><code>.deb</code></td><td><code>dpkg</code></td><td><code>apt</code></td></tr><tr><td>RHEL/CentOS/Fedora</td><td><code>.rpm</code></td><td><code>rpm</code></td><td><code>dnf</code> / <code>yum</code></td></tr><tr><td>Arch Linux</td><td>—</td><td><code>pacman</code></td><td><code>pacman</code></td></tr><tr><td>openSUSE</td><td><code>.rpm</code></td><td><code>rpm</code></td><td><code>zypper</code></td></tr></tbody></table><p>本章以 <strong>Ubuntu/Debian</strong> 的 <code>apt</code> 为主。</p><h2 id="apt-—-debian-系包管理" tabindex="-1"><a class="header-anchor" href="#apt-—-debian-系包管理"><span>apt — Debian 系包管理</span></a></h2><h3 id="更新软件源" tabindex="-1"><a class="header-anchor" href="#更新软件源"><span>更新软件源</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 更新软件包索引（从源服务器获取最新列表）</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> update</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 升级所有可升级的包</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> upgrade</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 更彻底的升级（可能安装/删除依赖）</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> full-upgrade</span>
<span class="line"></span></code></pre></div><h3 id="搜索与安装" tabindex="-1"><a class="header-anchor" href="#搜索与安装"><span>搜索与安装</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 搜索软件包</span></span>
<span class="line"><span class="token function">apt</span> search nginx</span>
<span class="line"><span class="token function">apt</span> search python <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;^python3&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看包信息</span></span>
<span class="line"><span class="token function">apt</span> show nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> nginx</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> nginx    <span class="token comment"># 自动确认（脚本中使用）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装多个包</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">git</span> <span class="token function">curl</span> <span class="token function">vim</span> <span class="token function">htop</span></span>
<span class="line"></span></code></pre></div><h3 id="卸载" tabindex="-1"><a class="header-anchor" href="#卸载"><span>卸载</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 保留配置文件</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> remove nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 完全移除（包括配置文件）</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> purge nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 自动移除不再需要的依赖</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> autoremove</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清除下载的 .deb 缓存</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> clean</span>
<span class="line"></span></code></pre></div><h3 id="其他操作" tabindex="-1"><a class="header-anchor" href="#其他操作"><span>其他操作</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看已安装的包</span></span>
<span class="line"><span class="token function">apt</span> list <span class="token parameter variable">--installed</span></span>
<span class="line"><span class="token function">apt</span> list <span class="token parameter variable">--installed</span> <span class="token operator">|</span> <span class="token function">grep</span> python</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看哪些包可升级</span></span>
<span class="line"><span class="token function">apt</span> list <span class="token parameter variable">--upgradable</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查依赖</span></span>
<span class="line"><span class="token function">apt</span> depends nginx</span>
<span class="line"><span class="token function">apt</span> rdepends nginx</span>
<span class="line"></span></code></pre></div><h2 id="dpkg-—-底层工具" tabindex="-1"><a class="header-anchor" href="#dpkg-—-底层工具"><span>dpkg — 底层工具</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装本地 .deb 文件</span></span>
<span class="line"><span class="token function">sudo</span> dpkg <span class="token parameter variable">-i</span> package.deb</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 卸载</span></span>
<span class="line"><span class="token function">sudo</span> dpkg <span class="token parameter variable">-r</span> package</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看已安装</span></span>
<span class="line">dpkg <span class="token parameter variable">-l</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看文件属于哪个包</span></span>
<span class="line">dpkg <span class="token parameter variable">-S</span> /bin/ls</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 列出包安装的文件</span></span>
<span class="line">dpkg <span class="token parameter variable">-L</span> nginx</span>
<span class="line"></span></code></pre></div><p>当 <code>dpkg -i</code> 报依赖错误时，用以下命令修复：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-f</span></span>
<span class="line"></span></code></pre></div><h2 id="安装策略实战" tabindex="-1"><a class="header-anchor" href="#安装策略实战"><span>安装策略实战</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 优先 apt 安装（自动处理依赖）</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> redis-server</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 官方仓库没有，添加 PPA</span></span>
<span class="line"><span class="token function">sudo</span> add-apt-repository ppa:deadsnakes/ppa</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> update</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> python3.12</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 下载 .deb 手动安装</span></span>
<span class="line"><span class="token function">wget</span> https://example.com/package.deb</span>
<span class="line"><span class="token function">sudo</span> dpkg <span class="token parameter variable">-i</span> package.deb</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-f</span>           <span class="token comment"># 处理缺失依赖</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 源码编译安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> build-essential</span>
<span class="line">./configure</span>
<span class="line"><span class="token function">make</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他发行版速查" tabindex="-1"><a class="header-anchor" href="#其他发行版速查"><span>其他发行版速查</span></a></h2><h3 id="rhel-fedora-dnf" tabindex="-1"><a class="header-anchor" href="#rhel-fedora-dnf"><span>RHEL/Fedora (dnf)</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sudo</span> dnf <span class="token function">install</span> nginx        <span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> dnf remove nginx         <span class="token comment"># 卸载</span></span>
<span class="line"><span class="token function">sudo</span> dnf search nginx         <span class="token comment"># 搜索</span></span>
<span class="line"><span class="token function">sudo</span> dnf update               <span class="token comment"># 更新</span></span>
<span class="line"></span></code></pre></div><h3 id="arch-linux-pacman" tabindex="-1"><a class="header-anchor" href="#arch-linux-pacman"><span>Arch Linux (pacman)</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> nginx          <span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> pacman <span class="token parameter variable">-R</span> nginx          <span class="token comment"># 卸载</span></span>
<span class="line"><span class="token function">sudo</span> pacman <span class="token parameter variable">-Ss</span> nginx         <span class="token comment"># 搜索</span></span>
<span class="line"><span class="token function">sudo</span> pacman <span class="token parameter variable">-Syu</span>              <span class="token comment"># 全面更新</span></span>
<span class="line"></span></code></pre></div><h2 id="本章小结" tabindex="-1"><a class="header-anchor" href="#本章小结"><span>本章小结</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 日常三连</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> update          <span class="token comment"># 1. 更新索引</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> upgrade         <span class="token comment"># 2. 升级软件</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> pkg     <span class="token comment"># 3. 安装新软件</span></span>
<span class="line"></span></code></pre></div><table><thead><tr><th>操作</th><th>apt 命令</th></tr></thead><tbody><tr><td>更新索引</td><td><code>sudo apt update</code></td></tr><tr><td>安装</td><td><code>sudo apt install pkg</code></td></tr><tr><td>卸载</td><td><code>sudo apt remove pkg</code></td></tr><tr><td>搜索</td><td><code>apt search keyword</code></td></tr><tr><td>查看信息</td><td><code>apt show pkg</code></td></tr><tr><td>修复依赖</td><td><code>sudo apt install -f</code></td></tr></tbody></table><h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习"><span>练习</span></a></h2><ol><li>用 <code>apt search</code> 找到一个有趣的小工具（如 <code>cowsay</code> 或 <code>figlet</code>），安装它</li><li>用 <code>apt show</code> 查看已安装的某个包的详细信息</li><li>用 <code>dpkg -L</code> 查看 <code>ls</code> 命令属于哪个包</li><li>安装 <code>htop</code> 并用它替代 <code>top</code> 来查看进程</li><li>练习卸载一个包并自动清理依赖</li></ol>`,30)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};