import{_ as n,c as a,a as e,o as p}from"./app-B6vXTniy.js";const t={};function l(i,s){return p(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="poetry使用" tabindex="-1"><a class="header-anchor" href="#poetry使用"><span>poetry使用</span></a></h1><h2 id="安装poetry" tabindex="-1"><a class="header-anchor" href="#安装poetry"><span>安装poetry</span></a></h2><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">pip install poetry</span>
<span class="line"></span></code></pre></div><h2 id="使用命令" tabindex="-1"><a class="header-anchor" href="#使用命令"><span>使用命令</span></a></h2><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">poetry self update</span>
<span class="line"><span class="token comment"># 查看所有配置</span></span>
<span class="line">poetry config <span class="token operator">--</span>list </span>
<span class="line"><span class="token comment"># 查看单个配置</span></span>
<span class="line">poetry config virtualenvs<span class="token punctuation">.</span>path </span>
<span class="line"><span class="token comment"># 更新配置</span></span>
<span class="line">poetry config virtualenvs<span class="token punctuation">.</span>in-project true </span>
<span class="line"><span class="token comment"># 重置配置</span></span>
<span class="line">poetry config virtualenvs<span class="token punctuation">.</span>path <span class="token operator">--</span>unset </span>
<span class="line"><span class="token comment"># 添加poetry,会在项目目录生成一个pyproject.toml,他是一个非常重要的文件，包含了工程的配置和依赖库信息</span></span>
<span class="line">poetry init </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将依赖包导出为 requirements.txt 格式，导出文件名为 requirements.txt </span></span>
<span class="line">poetry export <span class="token operator">-</span>f requirements<span class="token punctuation">.</span>txt <span class="token operator">--</span>output requirements<span class="token punctuation">.</span>txt </span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="config-toml文件" tabindex="-1"><a class="header-anchor" href="#config-toml文件"><span>config.toml文件</span></a></h2><p>poetry提供了全局config配置和特定项目的config配置。 windows下的全局config配置文件：<code>%APPDATA%\\pypoetry/config.yoml</code></p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token function">start</span> <span class="token variable">$env</span>:APPDATA/pypoetry\\</span>
<span class="line"></span></code></pre></div><p>我的配置</p><div class="language-toml" data-highlighter="prismjs" data-ext="toml"><pre><code class="language-toml"><span class="line"><span class="token punctuation">[</span><span class="token table class-name">virtualenvs</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">in-project</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token key property">prompt</span> <span class="token punctuation">=</span> <span class="token string">&quot;{project_name}&quot;</span></span>
<span class="line"></span>
<span class="line"> </span>
<span class="line"><span class="token punctuation">[</span><span class="token table class-name">repositories.pypi</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">url</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://pypi.tuna.tsinghua.edu.cn/simple&quot;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="指定pip源" tabindex="-1"><a class="header-anchor" href="#指定pip源"><span>指定pip源</span></a></h3><p>这是全局的</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">poetry config repositories<span class="token punctuation">.</span>pypi https:<span class="token operator">/</span><span class="token operator">/</span>pypi<span class="token punctuation">.</span>tuna<span class="token punctuation">.</span>tsinghua<span class="token punctuation">.</span>edu<span class="token punctuation">.</span>cn/simple</span>
<span class="line"></span></code></pre></div><p>下面这个每个项目都要指定</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[[tool.poetry.source]]</span>
<span class="line">name = &quot;custom&quot;</span>
<span class="line">url = &quot;https://pypi.tuna.tsinghua.edu.cn/simple&quot;</span>
<span class="line">default = true</span>
<span class="line"></span></code></pre></div><h3 id="add命令" tabindex="-1"><a class="header-anchor" href="#add命令"><span>add命令</span></a></h3><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">poetry add requests  <span class="token comment"># ==&gt; pip install requests </span></span>
<span class="line">poetry add requests@^2<span class="token punctuation">.</span>20<span class="token punctuation">.</span>0 <span class="token comment"># 安装大于2.20.0版本的包 </span></span>
<span class="line">poetry add <span class="token string">&quot;requests=2.20.0&quot;</span> <span class="token comment"># ==&gt; pip install requests==2.20.0 </span></span>
<span class="line">poetry add <span class="token string">&quot;uvicorn[standard]&quot;</span> <span class="token comment"># ==&gt; pip install uvicorn[standard] </span></span>
<span class="line"> </span>
<span class="line"><span class="token comment"># 从 git 仓库安装 </span></span>
<span class="line">poetry add git+https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/sdispater/pendulum<span class="token punctuation">.</span>git </span>
<span class="line">poetry add git+ssh:<span class="token operator">/</span><span class="token operator">/</span>git@github<span class="token punctuation">.</span>com/sdispater/pendulum<span class="token punctuation">.</span>git </span>
<span class="line">poetry add git+https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/sdispater/pendulum<span class="token punctuation">.</span>git<span class="token comment">#develop </span></span>
<span class="line">poetry add git+https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/sdispater/pendulum<span class="token punctuation">.</span>git<span class="token comment">#2.0.5 </span></span>
<span class="line"> </span>
<span class="line"><span class="token comment"># 从本地文件安装 </span></span>
<span class="line">poetry add <span class="token punctuation">.</span><span class="token operator">/</span>my-package/ </span>
<span class="line">poetry add <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">/</span>my-package/dist/my-package-0<span class="token punctuation">.</span>1<span class="token punctuation">.</span>0<span class="token punctuation">.</span>tar<span class="token punctuation">.</span>gz </span>
<span class="line">poetry add <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">/</span>my-package/dist/my_package-0<span class="token punctuation">.</span>1<span class="token punctuation">.</span>0<span class="token punctuation">.</span>whl </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="run命令" tabindex="-1"><a class="header-anchor" href="#run命令"><span>run命令</span></a></h3><p>这个命令也是一个比较重要的命令，可以让我们不进入虚拟环境就执行虚拟环境内的命令</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 查询虚拟环境内的 Python 版本 </span>
<span class="line">poetry run python -V </span>
<span class="line"> </span>
<span class="line"># 执行虚拟环境内的脚本 </span>
<span class="line">poetry run python test.py </span>
<span class="line"></span></code></pre></div><h3 id="env命令" tabindex="-1"><a class="header-anchor" href="#env命令"><span>env命令</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 使用指定环境的python </span>
<span class="line">poetry env use /full/path/to/python </span>
<span class="line"> </span>
<span class="line"># 如果python在环境变量中，可以使用一下方式指定 </span>
<span class="line">poetry env use python3.7 </span>
<span class="line"> </span>
<span class="line"># 显示当前虚拟环境信息 </span>
<span class="line">poetry env info </span>
<span class="line"> </span>
<span class="line"># 仅显示虚拟环境的路径 </span>
<span class="line">poetry env info --path </span>
<span class="line"> </span>
<span class="line"># 显示当前工程的所有虚拟环境列表 </span>
<span class="line">poetry env list </span>
<span class="line"> </span>
<span class="line"># 显示当前工程的虚拟环境绝对路径 </span>
<span class="line">poetry env list --full-path </span>
<span class="line"> </span>
<span class="line"># 删除虚拟环境 </span>
<span class="line">poetry env remove /full/path/to/python </span>
<span class="line">poetry env remove python3.7 </span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>cache-dir Type: string</p><p>缓存目录配置，使用 poetry 安装的包源文件都会缓存到这个目录。以下是系统默认目录：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">macOS: ~/Library/Caches/pypoetry</span>
<span class="line">Windows: C:\\Users\\AppData\\Local\\pypoetry\\Cache</span>
<span class="line">Unix: ~/.cache/pypoetry</span>
<span class="line"></span></code></pre></div><p>virtualenvs.path Type: string</p><p>默认是{cache-dir}/virtualenvs，虚拟环境创建的目录，如果上面的 in-project 为 true，此配置就无效</p>`,27)])])}const c=n(t,[["render",l]]),r=JSON.parse('{"path":"/python-tutor/python-config/poetry.html","title":"poetry使用","lang":"zh-CN","frontmatter":{"description":"poetry使用 安装poetry 使用命令 config.toml文件 poetry提供了全局config配置和特定项目的config配置。 windows下的全局config配置文件：%APPDATA%\\\\pypoetry/config.yoml 我的配置 指定pip源 这是全局的 下面这个每个项目都要指定 add命令 run命令 这个命令也是一个比...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"poetry使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-02-20T12:46:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/python-config/poetry.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"poetry使用"}],["meta",{"property":"og:description","content":"poetry使用 安装poetry 使用命令 config.toml文件 poetry提供了全局config配置和特定项目的config配置。 windows下的全局config配置文件：%APPDATA%\\\\pypoetry/config.yoml 我的配置 指定pip源 这是全局的 下面这个每个项目都要指定 add命令 run命令 这个命令也是一个比..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-20T12:46:22.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-20T12:46:22.000Z"}]]},"git":{"createdTime":1658761077000,"updatedTime":1740055582000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":4,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.87,"words":562},"filePathRelative":"python-tutor/python-config/poetry.md","autoDesc":true}');export{c as comp,r as data};
