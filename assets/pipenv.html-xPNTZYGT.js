import{_ as e,c as n,o as p,d as t}from"./app-CbULZrmi.js";const i={},o=t(`<h1 id="pipenv使用" tabindex="-1"><a class="header-anchor" href="#pipenv使用"><span>pipenv使用</span></a></h1><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p>安装python <a href="https://registry.npmmirror.com/binary.html?path=python/" target="_blank" rel="noopener noreferrer">安装包</a><br> windows安装后会自动吧pip和python加入到环境变量</p><h2 id="安装pipenv" tabindex="-1"><a class="header-anchor" href="#安装pipenv"><span>安装pipenv</span></a></h2><pre><code class="language-shell">pip install pipenv 
# 更新
pip install pipenv -U

</code></pre><h2 id="使用pipenv" tabindex="-1"><a class="header-anchor" href="#使用pipenv"><span>使用pipenv</span></a></h2><pre><code>添加镜像

「清华源」：&quot;https://pypi.tuna.tsinghua.edu.cn/simple/&quot;
「阿里源」：&quot;http://mirrors.aliyun.com/pypi/simple/&quot;
「豆瓣源」：&quot;http://pypi.douban.com/simple&quot;
华为也有镜像源 [华为](https://mirrors.huaweicloud.com/home)


配置镜像
export PIPENV_DEFAULT_PYTHON_VERSION=3.7 
export PIPENV_PYPI_MIRROR=https://pypi.tuna.tsinghua.edu.cn/simple
</code></pre><pre><code class="language-toml">[[source]]
url = &quot;https://pypi.tuna.tsinghua.edu.cn/simple&quot;
verify_ssl = true
name = &quot;pypi&quot;
</code></pre><p>配置在:Windows路径为：<code>C:\\Users\\&lt;UserName&gt;\\pip\\pip.ini</code></p><p>推荐使用清华镜像</p><pre><code class="language-ini">[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = https://pypi.tuna.tsinghua.edu.cn
</code></pre><pre><code class="language-toml">[global]
index-url = https://repo.huaweicloud.com/repository/pypi/simple
trusted-host = repo.huaweicloud.com
timeout = 120
</code></pre><p>默认安装的虚拟环境都在c盘<code>%userprofile%的.virtualenvs</code>文件夹下面,如果想更换,可以添加<code>PIPENV_VENV_IN_PROJECT</code>环境变量,并设置值为<code>1</code>,就是在项目下面创建虚拟环境</p><pre><code class="language-shell"># 创建一个env环境
pipenv install
# 删除env
pipenv --rm
# 安装一个依赖
pipenv install httpx
# 导出requirements
pipenv lock -r &gt; requirements.txt
# 安装包
pipenv install -r requirements.txt
# 检查包
pipenv run pip list
# 删除所有
pipenv uninstall --all

</code></pre><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如何运行呢? 需要在命令行加上一句<code>pipenv shell;$env:PYTHONPATH=&quot;E:\\PycharmProjects\\douyin-spider&quot;;激活当前的pipenv并</code>把<code>PYTHONPATH</code>改为当前路径,才能让python知道自己当前目录是一个包,不然自己写的包没办法引进去,会报错<code>ModuleNotFoundError: No module named &#39;util&#39;</code></p></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>命令</p><pre><code class="language-shell">pipenv [OPTIONS] COMMAND [ARGS]...

OPTIONS:
--where          显示项目文件所在路径
--venv           显示虚拟环境实际文件所在路径
--py             显示虚拟环境 Python 解释器所在路径
--envs           显示虚拟环境的选项变量
--rm             删除虚拟环境
--bare           最小化输出
--completion     完整输出
--man            显示帮助页面
--three / two    使用 Python 3 / 2 创建虚拟环境（注意须是本机已安装的 Python 版本）
--python TEXT    指定某个 Python 版本作为虚拟环境的安装源
--site-packages  附带安装原 Python 解释器中的第三方库
--jumbotron      复活节彩蛋
--version        版本信息
--h / help       帮助信息

COMMANDS：
check            检查安全漏洞
graph            显示当前依赖关系图信息
install          安装虚拟环境或者第三方库
lock             锁定并生成 Pipfile.lock 文件
open             在编辑其中查看一个库
run              在虚拟环境中运行命令
shell            进入虚拟环境
uninstall        卸载一个库
update           写在当前所有的库，并安装它们的最新版本

</code></pre></div>`,16),r=[o];function a(s,l){return p(),n("div",null,r)}const d=e(i,[["render",a],["__file","pipenv.html.vue"]]),h=JSON.parse('{"path":"/python-tutor/python-config/pipenv.html","title":"pipenv使用","lang":"zh-CN","frontmatter":{"description":"pipenv使用 安装 安装python 安装包 windows安装后会自动吧pip和python加入到环境变量 安装pipenv 使用pipenv 配置在:Windows路径为：C:\\\\Users\\\\<UserName>\\\\pip\\\\pip.ini 推荐使用清华镜像 默认安装的虚拟环境都在c盘%userprofile%的.virtualenvs文件夹下面,如...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/python-config/pipenv.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"pipenv使用"}],["meta",{"property":"og:description","content":"pipenv使用 安装 安装python 安装包 windows安装后会自动吧pip和python加入到环境变量 安装pipenv 使用pipenv 配置在:Windows路径为：C:\\\\Users\\\\<UserName>\\\\pip\\\\pip.ini 推荐使用清华镜像 默认安装的虚拟环境都在c盘%userprofile%的.virtualenvs文件夹下面,如..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"pipenv使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"安装pipenv","slug":"安装pipenv","link":"#安装pipenv","children":[]},{"level":2,"title":"使用pipenv","slug":"使用pipenv","link":"#使用pipenv","children":[]}],"git":{"createdTime":1658761077000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":6}]},"readingTime":{"minutes":1.96,"words":589},"filePathRelative":"python-tutor/python-config/pipenv.md","localizedDate":"2022年7月25日","autoDesc":true}');export{d as comp,h as data};
