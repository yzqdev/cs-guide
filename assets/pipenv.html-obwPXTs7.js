import{_ as s,c as a,a as e,o as p}from"./app-B6vXTniy.js";const i={};function l(t,n){return p(),a("div",null,[...n[0]||(n[0]=[e(`<h1 id="pipenv使用" tabindex="-1"><a class="header-anchor" href="#pipenv使用"><span>pipenv使用</span></a></h1><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p>安装python <a href="https://registry.npmmirror.com/binary.html?path=python/" target="_blank" rel="noopener noreferrer">安装包</a><br> windows安装后会自动吧pip和python加入到环境变量</p><h2 id="安装pipenv" tabindex="-1"><a class="header-anchor" href="#安装pipenv"><span>安装pipenv</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">pip <span class="token function">install</span> pipenv </span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="使用pipenv" tabindex="-1"><a class="header-anchor" href="#使用pipenv"><span>使用pipenv</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">添加镜像</span>
<span class="line"></span>
<span class="line">「清华源」：&quot;https://pypi.tuna.tsinghua.edu.cn/simple/&quot;</span>
<span class="line">「阿里源」：&quot;http://mirrors.aliyun.com/pypi/simple/&quot;</span>
<span class="line">「豆瓣源」：&quot;http://pypi.douban.com/simple&quot;</span>
<span class="line">华为也有镜像源 [华为](https://mirrors.huaweicloud.com/home)</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">配置镜像</span>
<span class="line">export PIPENV_DEFAULT_PYTHON_VERSION=3.7 </span>
<span class="line">export PIPENV_PYPI_MIRROR=https://pypi.tuna.tsinghua.edu.cn/simple</span>
<span class="line"></span></code></pre></div><div class="language-toml" data-highlighter="prismjs" data-ext="toml"><pre><code class="language-toml"><span class="line"><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token table class-name">source</span><span class="token punctuation">]</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">url</span> <span class="token punctuation">=</span> <span class="token string">&quot;https://pypi.tuna.tsinghua.edu.cn/simple&quot;</span></span>
<span class="line"><span class="token key property">verify_ssl</span> <span class="token punctuation">=</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token key property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;pypi&quot;</span></span>
<span class="line"></span></code></pre></div><p>配置在:Windows路径为：<code>C:\\Users\\&lt;UserName&gt;\\pip\\pip.ini</code></p><div class="language-toml" data-highlighter="prismjs" data-ext="toml"><pre><code class="language-toml"><span class="line"><span class="token punctuation">[</span><span class="token table class-name">global</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token key property">index-url</span> <span class="token punctuation">=</span> https://repo<span class="token punctuation">.</span>huaweicloud<span class="token punctuation">.</span>com/repository/pypi/simple</span>
<span class="line"><span class="token key property">trusted-host</span> <span class="token punctuation">=</span> repo<span class="token punctuation">.</span>huaweicloud<span class="token punctuation">.</span>com</span>
<span class="line"><span class="token key property">timeout</span> <span class="token punctuation">=</span> <span class="token number">120</span></span>
<span class="line"></span></code></pre></div><p>默认安装的虚拟环境都在c盘<code>%userprofile%的.virtualenvs</code>文件夹下面,如果想更换,可以添加<code>PIPENV_VENV_IN_PROJECT</code>环境变量,并设置值为<code>1</code>,就是在项目下面创建虚拟环境</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 创建一个env环境</span></span>
<span class="line">pipenv <span class="token function">install</span></span>
<span class="line"><span class="token comment"># 删除env</span></span>
<span class="line">pipenv <span class="token parameter variable">--rm</span></span>
<span class="line"><span class="token comment"># 安装一个依赖</span></span>
<span class="line">pipenv <span class="token function">install</span> httpx</span>
<span class="line"><span class="token comment"># 导出requirements</span></span>
<span class="line">pipenv lock <span class="token parameter variable">-r</span> <span class="token operator">&gt;</span> requirements.txt</span>
<span class="line"><span class="token comment"># 安装包</span></span>
<span class="line">pipenv <span class="token function">install</span> <span class="token parameter variable">-r</span> requirements.txt</span>
<span class="line"><span class="token comment"># 检查包</span></span>
<span class="line">pipenv run pip list</span>
<span class="line"><span class="token comment"># 删除所有</span></span>
<span class="line">pipenv uninstall <span class="token parameter variable">--all</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如何运行呢? 需要在命令行加上一句<code>pipenv shell;$env:PYTHONPATH=&quot;E:\\PycharmProjects\\douyin-spider&quot;;激活当前的pipenv并</code>把<code>PYTHONPATH</code>改为当前路径,才能让python知道自己当前目录是一个包,不然自己写的包没办法引进去,会报错<code>ModuleNotFoundError: No module named &#39;util&#39;</code></p></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>命令</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">pipenv <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> COMMAND <span class="token punctuation">[</span>ARGS<span class="token punctuation">]</span><span class="token punctuation">..</span>.</span>
<span class="line"></span>
<span class="line">OPTIONS:</span>
<span class="line"><span class="token parameter variable">--where</span>          显示项目文件所在路径</span>
<span class="line"><span class="token parameter variable">--venv</span>           显示虚拟环境实际文件所在路径</span>
<span class="line"><span class="token parameter variable">--py</span>             显示虚拟环境 Python 解释器所在路径</span>
<span class="line"><span class="token parameter variable">--envs</span>           显示虚拟环境的选项变量</span>
<span class="line"><span class="token parameter variable">--rm</span>             删除虚拟环境</span>
<span class="line"><span class="token parameter variable">--bare</span>           最小化输出</span>
<span class="line"><span class="token parameter variable">--completion</span>     完整输出</span>
<span class="line"><span class="token parameter variable">--man</span>            显示帮助页面</span>
<span class="line"><span class="token parameter variable">--three</span> / two    使用 Python <span class="token number">3</span> / <span class="token number">2</span> 创建虚拟环境（注意须是本机已安装的 Python 版本）</span>
<span class="line"><span class="token parameter variable">--python</span> TEXT    指定某个 Python 版本作为虚拟环境的安装源</span>
<span class="line">--site-packages  附带安装原 Python 解释器中的第三方库</span>
<span class="line"><span class="token parameter variable">--jumbotron</span>      复活节彩蛋</span>
<span class="line"><span class="token parameter variable">--version</span>        版本信息</span>
<span class="line"><span class="token parameter variable">--h</span> / <span class="token builtin class-name">help</span>       帮助信息</span>
<span class="line"></span>
<span class="line">COMMANDS：</span>
<span class="line">check            检查安全漏洞</span>
<span class="line">graph            显示当前依赖关系图信息</span>
<span class="line"><span class="token function">install</span>          安装虚拟环境或者第三方库</span>
<span class="line">lock             锁定并生成 Pipfile.lock 文件</span>
<span class="line"><span class="token function">open</span>             在编辑其中查看一个库</span>
<span class="line">run              在虚拟环境中运行命令</span>
<span class="line">shell            进入虚拟环境</span>
<span class="line">uninstall        卸载一个库</span>
<span class="line">update           写在当前所有的库，并安装它们的最新版本</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`,14)])])}const o=s(i,[["render",l]]),r=JSON.parse('{"path":"/cs-tips/python-tip/pipenv.html","title":"pipenv使用","lang":"zh-CN","frontmatter":{"description":"pipenv使用 安装 安装python 安装包 windows安装后会自动吧pip和python加入到环境变量 安装pipenv 使用pipenv 配置在:Windows路径为：C:\\\\Users\\\\<UserName>\\\\pip\\\\pip.ini 默认安装的虚拟环境都在c盘%userprofile%的.virtualenvs文件夹下面,如果想更换,可以添加...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"pipenv使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/python-tip/pipenv.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"pipenv使用"}],["meta",{"property":"og:description","content":"pipenv使用 安装 安装python 安装包 windows安装后会自动吧pip和python加入到环境变量 安装pipenv 使用pipenv 配置在:Windows路径为：C:\\\\Users\\\\<UserName>\\\\pip\\\\pip.ini 默认安装的虚拟环境都在c盘%userprofile%的.virtualenvs文件夹下面,如果想更换,可以添加..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}]]},"git":{"createdTime":1658761077000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":6,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.88,"words":564},"filePathRelative":"cs-tips/python-tip/pipenv.md","autoDesc":true}');export{o as comp,r as data};
