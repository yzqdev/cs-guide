import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/java-tutor/orm-tutor/mongodb/installation.html","title":"MongoDB 安装与启动","lang":"zh-CN","frontmatter":{"description":"MongoDB 安装与启动 MongoDB 是一个文档型 NoSQL 数据库，以 JSON 风格的文档存储数据。 安装 MongoDB Windows 安装 从 MongoDB 官网 下载 MSI 安装包 运行安装程序，选择 Complete 安装 安装完成后，MongoDB 会作为 Windows 服务自动运行 macOS 安装 Linux 安装（U...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MongoDB 安装与启动\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T07:23:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/mongodb/installation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"MongoDB 安装与启动"}],["meta",{"property":"og:description","content":"MongoDB 安装与启动 MongoDB 是一个文档型 NoSQL 数据库，以 JSON 风格的文档存储数据。 安装 MongoDB Windows 安装 从 MongoDB 官网 下载 MSI 安装包 运行安装程序，选择 Complete 安装 安装完成后，MongoDB 会作为 Windows 服务自动运行 macOS 安装 Linux 安装（U..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T07:23:11.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T07:23:11.000Z"}]]},"git":{"createdTime":1783927391000,"updatedTime":1783927391000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.88,"words":565},"filePathRelative":"java-tutor/orm-tutor/mongodb/installation.md","autoDesc":true}`),a={name:`installation.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="mongodb-安装与启动" tabindex="-1"><a class="header-anchor" href="#mongodb-安装与启动"><span>MongoDB 安装与启动</span></a></h1><blockquote><p>MongoDB 是一个文档型 NoSQL 数据库，以 JSON 风格的文档存储数据。</p></blockquote><h2 id="安装-mongodb" tabindex="-1"><a class="header-anchor" href="#安装-mongodb"><span>安装 MongoDB</span></a></h2><h3 id="windows-安装" tabindex="-1"><a class="header-anchor" href="#windows-安装"><span>Windows 安装</span></a></h3><ol><li>从 <a href="https://www.mongodb.com/try/download/community" target="_blank" rel="noopener noreferrer">MongoDB 官网</a> 下载 MSI 安装包</li><li>运行安装程序，选择 Complete 安装</li><li>安装完成后，MongoDB 会作为 Windows 服务自动运行</li></ol><h3 id="macos-安装" tabindex="-1"><a class="header-anchor" href="#macos-安装"><span>macOS 安装</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 使用 Homebrew</span></span>
<span class="line">brew tap mongodb/brew</span>
<span class="line">brew <span class="token function">install</span> mongodb-community@7.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动</span></span>
<span class="line">brew services start mongodb-community@7.0</span>
<span class="line"></span></code></pre></div><h3 id="linux-安装-ubuntu" tabindex="-1"><a class="header-anchor" href="#linux-安装-ubuntu"><span>Linux 安装（Ubuntu）</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 导入 MongoDB 公钥</span></span>
<span class="line"><span class="token function">wget</span> <span class="token parameter variable">-qO</span> - https://www.mongodb.org/static/pgp/server-7.0.asc <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加源</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse&quot;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/apt/sources.list.d/mongodb-org-7.0.list</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> update</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> mongodb-org</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动</span></span>
<span class="line"><span class="token function">sudo</span> systemctl start mongod</span>
<span class="line"><span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> mongod</span>
<span class="line"></span></code></pre></div><h2 id="启动-mongodb" tabindex="-1"><a class="header-anchor" href="#启动-mongodb"><span>启动 MongoDB</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 启动 MongoDB 服务</span></span>
<span class="line">mongod <span class="token parameter variable">--dbpath</span> /data/db</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定端口（默认 27017）</span></span>
<span class="line">mongod <span class="token parameter variable">--port</span> <span class="token number">27017</span> <span class="token parameter variable">--dbpath</span> /data/db</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 后台运行</span></span>
<span class="line">mongod <span class="token parameter variable">--fork</span> <span class="token parameter variable">--logpath</span> /var/log/mongodb/mongod.log <span class="token parameter variable">--dbpath</span> /data/db</span>
<span class="line"></span></code></pre></div><h2 id="连接-mongodb" tabindex="-1"><a class="header-anchor" href="#连接-mongodb"><span>连接 MongoDB</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 使用 mongosh（MongoDB Shell，需要单独安装）</span></span>
<span class="line">mongosh</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定连接参数</span></span>
<span class="line">mongosh <span class="token string">&quot;mongodb://localhost:27017/mydb&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 带用户名密码</span></span>
<span class="line">mongosh <span class="token string">&quot;mongodb://admin:password@localhost:27017/admin&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 连接 Atlas 云数据库</span></span>
<span class="line">mongosh <span class="token string">&quot;mongodb+srv://cluster0.xxxxx.mongodb.net/myFirstDatabase&quot;</span> <span class="token parameter variable">--username</span> admin</span>
<span class="line"></span></code></pre></div><h2 id="mongodb-compass-图形化工具" tabindex="-1"><a class="header-anchor" href="#mongodb-compass-图形化工具"><span>MongoDB Compass（图形化工具）</span></a></h2><p>从 <a href="https://www.mongodb.com/products/compass" target="_blank" rel="noopener noreferrer">MongoDB Compass 下载页</a> 下载安装，输入连接字符串即可可视化管理。</p><h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h2><table><thead><tr><th>RDBMS (MySQL)</th><th>MongoDB</th><th>说明</th></tr></thead><tbody><tr><td>数据库 (Database)</td><td>数据库 (Database)</td><td>名称相同</td></tr><tr><td>表 (Table)</td><td>集合 (Collection)</td><td>MongoDB 存储文档的容器</td></tr><tr><td>行 (Row)</td><td>文档 (Document)</td><td>一条数据记录</td></tr><tr><td>列 (Column)</td><td>字段 (Field)</td><td>数据属性</td></tr><tr><td>主键 (Primary Key)</td><td><strong>_id</strong></td><td>MongoDB 自动生成的唯一标识</td></tr><tr><td>索引 (Index)</td><td>索引 (Index)</td><td>提升查询性能</td></tr><tr><td>JOIN</td><td>$lookup / 嵌入文档</td><td>MongoDB 通过嵌入或引用关联数据</td></tr></tbody></table><h2 id="数据库和集合操作" tabindex="-1"><a class="header-anchor" href="#数据库和集合操作"><span>数据库和集合操作</span></a></h2><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">// 切换/创建数据库（use 后自动创建）</span></span>
<span class="line">use myblog</span>
<span class="line"></span>
<span class="line"><span class="token comment">// 查看所有数据库</span></span>
<span class="line">show dbs</span>
<span class="line"></span>
<span class="line"><span class="token comment">// 查看当前数据库</span></span>
<span class="line">db</span>
<span class="line"></span>
<span class="line"><span class="token comment">// 删除数据库</span></span>
<span class="line">db<span class="token punctuation">.</span><span class="token function">dropDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 查看所有集合</span></span>
<span class="line">show collections</span>
<span class="line"></span>
<span class="line"><span class="token comment">// 创建集合（也可以插入文档时隐式创建）</span></span>
<span class="line">db<span class="token punctuation">.</span><span class="token function">createCollection</span><span class="token punctuation">(</span><span class="token string">&quot;users&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 删除集合</span></span>
<span class="line">db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">drop</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据库工具" tabindex="-1"><a class="header-anchor" href="#数据库工具"><span>数据库工具</span></a></h2><h3 id="mongosh-常用命令" tabindex="-1"><a class="header-anchor" href="#mongosh-常用命令"><span>mongosh 常用命令</span></a></h3><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">// 查看帮助</span></span>
<span class="line">help</span>
<span class="line">db<span class="token punctuation">.</span><span class="token function">help</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 查看数据库统计</span></span>
<span class="line">db<span class="token punctuation">.</span><span class="token function">stats</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 查看集合统计</span></span>
<span class="line">db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">stats</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 查看集合中的所有索引</span></span>
<span class="line">db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">getIndexes</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><h3 id="mongodb-database-tools" tabindex="-1"><a class="header-anchor" href="#mongodb-database-tools"><span>MongoDB Database Tools</span></a></h3><p>从 <a href="https://www.mongodb.com/try/download/database-tools" target="_blank" rel="noopener noreferrer">MongoDB Database Tools</a> 下载：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 导出集合</span></span>
<span class="line">mongoexport <span class="token parameter variable">--db</span> myblog <span class="token parameter variable">--collection</span> posts <span class="token parameter variable">--out</span> posts.json</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 导入集合</span></span>
<span class="line">mongoimport <span class="token parameter variable">--db</span> myblog <span class="token parameter variable">--collection</span> posts <span class="token parameter variable">--file</span> posts.json</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 导出整个数据库</span></span>
<span class="line">mongodump <span class="token parameter variable">--db</span> myblog <span class="token parameter variable">--out</span> ./backup/</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 恢复整个数据库</span></span>
<span class="line">mongorestore <span class="token parameter variable">--db</span> myblog ./backup/myblog/</span>
<span class="line"></span></code></pre></div>`,25)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};