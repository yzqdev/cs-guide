import{_ as n,o as e,c as s,a}from"./app-BO2oONDQ.js";const t={},i=a(`<h1 id="poetry使用" tabindex="-1"><a class="header-anchor" href="#poetry使用"><span>poetry使用</span></a></h1><h2 id="安装poetry" tabindex="-1"><a class="header-anchor" href="#安装poetry"><span>安装poetry</span></a></h2><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code>pip install poetry
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="使用命令" tabindex="-1"><a class="header-anchor" href="#使用命令"><span>使用命令</span></a></h2><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code>poetry self update
<span class="token comment"># 查看所有配置</span>
poetry config <span class="token operator">--</span>list 
<span class="token comment"># 查看单个配置</span>
poetry config virtualenvs<span class="token punctuation">.</span>path 
<span class="token comment"># 更新配置</span>
poetry config virtualenvs<span class="token punctuation">.</span>in-project true 
<span class="token comment"># 重置配置</span>
poetry config virtualenvs<span class="token punctuation">.</span>path <span class="token operator">--</span>unset 
<span class="token comment"># 添加poetry,会在项目目录生成一个pyproject.toml,他是一个非常重要的文件，包含了工程的配置和依赖库信息</span>
poetry init 

<span class="token comment"># 将依赖包导出为 requirements.txt 格式，导出文件名为 requirements.txt </span>
poetry export <span class="token operator">-</span>f requirements<span class="token punctuation">.</span>txt <span class="token operator">--</span>output requirements<span class="token punctuation">.</span>txt 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="config-toml文件" tabindex="-1"><a class="header-anchor" href="#config-toml文件"><span>config.toml文件</span></a></h2><p>poetry提供了全局config配置和特定项目的config配置。 windows下的全局config配置文件：<code>%APPDATA%\\pypoetry/config.yoml</code></p><h3 id="指定pip源" tabindex="-1"><a class="header-anchor" href="#指定pip源"><span>指定pip源</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[[tool.poetry.source]]
name = &quot;custom&quot;
url = &quot;https://pypi.tuna.tsinghua.edu.cn/simple&quot;
default = true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="add命令" tabindex="-1"><a class="header-anchor" href="#add命令"><span>add命令</span></a></h3><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code>poetry add requests  <span class="token comment"># ==&gt; pip install requests </span>
poetry add requests@^2<span class="token punctuation">.</span>20<span class="token punctuation">.</span>0 <span class="token comment"># 安装大于2.20.0版本的包 </span>
poetry add <span class="token string">&quot;requests=2.20.0&quot;</span> <span class="token comment"># ==&gt; pip install requests==2.20.0 </span>
poetry add <span class="token string">&quot;uvicorn[standard]&quot;</span> <span class="token comment"># ==&gt; pip install uvicorn[standard] </span>
 
<span class="token comment"># 从 git 仓库安装 </span>
poetry add git+https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/sdispater/pendulum<span class="token punctuation">.</span>git 
poetry add git+ssh:<span class="token operator">/</span><span class="token operator">/</span>git@github<span class="token punctuation">.</span>com/sdispater/pendulum<span class="token punctuation">.</span>git 
poetry add git+https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/sdispater/pendulum<span class="token punctuation">.</span>git<span class="token comment">#develop </span>
poetry add git+https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/sdispater/pendulum<span class="token punctuation">.</span>git<span class="token comment">#2.0.5 </span>
 
<span class="token comment"># 从本地文件安装 </span>
poetry add <span class="token punctuation">.</span><span class="token operator">/</span>my-package/ 
poetry add <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">/</span>my-package/dist/my-package-0<span class="token punctuation">.</span>1<span class="token punctuation">.</span>0<span class="token punctuation">.</span>tar<span class="token punctuation">.</span>gz 
poetry add <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">/</span>my-package/dist/my_package-0<span class="token punctuation">.</span>1<span class="token punctuation">.</span>0<span class="token punctuation">.</span>whl 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="run命令" tabindex="-1"><a class="header-anchor" href="#run命令"><span>run命令</span></a></h3><p>这个命令也是一个比较重要的命令，可以让我们不进入虚拟环境就执行虚拟环境内的命令</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># 查询虚拟环境内的 Python 版本 
poetry run python -V 
 
# 执行虚拟环境内的脚本 
poetry run python test.py 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="env命令" tabindex="-1"><a class="header-anchor" href="#env命令"><span>env命令</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># 使用指定环境的python 
poetry env use /full/path/to/python 
 
# 如果python在环境变量中，可以使用一下方式指定 
poetry env use python3.7 
 
# 显示当前虚拟环境信息 
poetry env info 
 
# 仅显示虚拟环境的路径 
poetry env info --path 
 
# 显示当前工程的所有虚拟环境列表 
poetry env list 
 
# 显示当前工程的虚拟环境绝对路径 
poetry env list --full-path 
 
# 删除虚拟环境 
poetry env remove /full/path/to/python 
poetry env remove python3.7 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>cache-dir Type: string</p><p>缓存目录配置，使用 poetry 安装的包源文件都会缓存到这个目录。以下是系统默认目录：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>macOS: ~/Library/Caches/pypoetry
Windows: C:\\Users\\AppData\\Local\\pypoetry\\Cache
Unix: ~/.cache/pypoetry
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>virtualenvs.path Type: string</p><p>默认是{cache-dir}/virtualenvs，虚拟环境创建的目录，如果上面的 in-project 为 true，此配置就无效</p>`,21),p=[i];function l(o,r){return e(),s("div",null,p)}const c=n(t,[["render",l],["__file","poetry.html.vue"]]),u=JSON.parse('{"path":"/python-tutor/python-config/poetry.html","title":"poetry使用","lang":"zh-CN","frontmatter":{"description":"poetry使用 安装poetry 使用命令 config.toml文件 poetry提供了全局config配置和特定项目的config配置。 windows下的全局config配置文件：%APPDATA%\\\\pypoetry/config.yoml 指定pip源 add命令 run命令 这个命令也是一个比较重要的命令，可以让我们不进入虚拟环境就执行虚拟...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/python-config/poetry.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"poetry使用"}],["meta",{"property":"og:description","content":"poetry使用 安装poetry 使用命令 config.toml文件 poetry提供了全局config配置和特定项目的config配置。 windows下的全局config配置文件：%APPDATA%\\\\pypoetry/config.yoml 指定pip源 add命令 run命令 这个命令也是一个比较重要的命令，可以让我们不进入虚拟环境就执行虚拟..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-20T18:32:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-09-20T18:32:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"poetry使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-20T18:32:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安装poetry","slug":"安装poetry","link":"#安装poetry","children":[]},{"level":2,"title":"使用命令","slug":"使用命令","link":"#使用命令","children":[]},{"level":2,"title":"config.toml文件","slug":"config-toml文件","link":"#config-toml文件","children":[{"level":3,"title":"指定pip源","slug":"指定pip源","link":"#指定pip源","children":[]},{"level":3,"title":"add命令","slug":"add命令","link":"#add命令","children":[]},{"level":3,"title":"run命令","slug":"run命令","link":"#run命令","children":[]},{"level":3,"title":"env命令","slug":"env命令","link":"#env命令","children":[]}]}],"git":{"createdTime":1658761077000,"updatedTime":1695234758000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":1.73,"words":520},"filePathRelative":"python-tutor/python-config/poetry.md","localizedDate":"2022年7月25日","autoDesc":true}');export{c as comp,u as data};
