import{_ as t,c as e,o,d as n}from"./app-CbULZrmi.js";const p={},a=n(`<h1 id="python-命令行编写" tabindex="-1"><a class="header-anchor" href="#python-命令行编写"><span>python 命令行编写</span></a></h1><h2 id="命令行" tabindex="-1"><a class="header-anchor" href="#命令行"><span>命令行</span></a></h2><p>打包命令 <a href="https://packaging.python.org/en/latest/tutorials/installing-packages/#installing-from-a-local-src-tree" target="_blank" rel="noopener noreferrer">https://packaging.python.org/en/latest/tutorials/installing-packages/#installing-from-a-local-src-tree</a></p><p><a href="https://pip.pypa.io/en/stable/reference/build-system/pyproject-toml/" target="_blank" rel="noopener noreferrer">https://pip.pypa.io/en/stable/reference/build-system/pyproject-toml/</a> ::: 我的全局包 <code>pipx install mycli</code></p><pre><code>git-filter-repo
ipython
mycli
pgcli
httpie
poetry
 
</code></pre><p>:::</p><h2 id="click" tabindex="-1"><a class="header-anchor" href="#click"><span>click</span></a></h2><p>使用多个命令 <a href="https://zhuanlan.zhihu.com/p/444506577" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/444506577</a></p><h2 id="本地执行" tabindex="-1"><a class="header-anchor" href="#本地执行"><span>本地执行</span></a></h2><p>其中py是alias</p><pre><code class="language-powershell">function runPython {
   # param (
    #    [string] $file
   # )
    $env:PYTHONPATH=pwd
   # Write-Host $args -BackgroundColor Cyan
     &amp; &quot;$pwd\\.venv\\Scripts\\python.exe&quot;  $args
}
</code></pre><pre><code class="language-shell"> py .\\pytool\\hello.py --count 3
</code></pre><p>我们横向对比下argparse、docopt、click 和 fire 库的各项功能和特点</p><pre><code class="language-python">from setuptools import setup
setup(
    name=&#39;py_tool&#39;,
    version=&#39;0.0.2&#39;,
    packages=[&#39;&#39;],
    url=&#39;&#39;,
    license=&#39;MIT&#39;,
    author=&#39;yzqdev&#39;,
    author_email=&#39;&#39;,
    description=&#39;&#39;,
    install_requires=[&#39;click&#39;],
    entry_points={
        &#39;console_scripts&#39;: [
            &#39;say = hello:main&#39;,
        ]
    }
)
</code></pre><ul><li>install_requires 是安装的与依赖</li><li>entry_points  console_scripts指的是命令行工具 say是生成的exe名字,hello是模块名称,main是方法名称</li></ul><h2 id="安装到scripts目录-安装到python安装目录的lib下" tabindex="-1"><a class="header-anchor" href="#安装到scripts目录-安装到python安装目录的lib下"><span>安装到scripts目录(安装到python安装目录的lib下)</span></a></h2><pre><code class="language-shell">python setup.py install
</code></pre><p>或者</p><pre><code class="language-shell">pip install -e .
</code></pre><p>不是用setup.py</p><h2 id="使用pyproject-toml" tabindex="-1"><a class="header-anchor" href="#使用pyproject-toml"><span>使用pyproject.toml</span></a></h2><pre><code class="language-toml">[build-system]
requires = [&quot;setuptools&quot;, &quot;setuptools-scm&quot;]
build-backend = &quot;setuptools.build_meta&quot;
  
[project]
name = &quot;my_package&quot;
authors = [
    {name = &quot;Josiah Carberry&quot;, email = &quot;josiah_carberry@brown.edu&quot;},
]
description = &quot;My package description&quot;
readme = &quot;README.rst&quot;
requires-python = &quot;&gt;=3.7&quot;
  
keywords = [&quot;one&quot;, &quot;two&quot;]
license = {text = &quot;BSD-3-Clause&quot;}
classifiers = [
    &quot;Framework :: Django&quot;,
    &quot;Programming Language :: Python :: 3&quot;,
]
dependencies = [
    &quot;requests&quot;,
    &#39;importlib-metadata; python_version&lt;&quot;3.8&quot;&#39;,
]
dynamic = [&quot;version&quot;]
  
[project.optional-dependencies]
pdf = [&quot;ReportLab&gt;=1.2&quot;, &quot;RXP&quot;]
rest = [&quot;docutils&gt;=0.3&quot;, &quot;pack ==1.1, ==1.3&quot;]
  
[project.scripts]
my-script = &quot;my_package.module:function&quot;
</code></pre><p><a href="https://setuptools.pypa.io/en/latest/userguide/pyproject_config.html" target="_blank" rel="noopener noreferrer">https://setuptools.pypa.io/en/latest/userguide/pyproject_config.html</a></p><h2 id="使用pipx安装本地poetry包" tabindex="-1"><a class="header-anchor" href="#使用pipx安装本地poetry包"><span>使用pipx安装本地poetry包</span></a></h2><p>poetry的pyproject.toml添加脚本</p><pre><code class="language-toml">\`\`\`python
[tool.poetry.scripts]
my-script = &quot;my_package.log_revision:start&quot;
</code></pre><p>项目目录如下</p><pre><code class="language-python">my_package
├── my_package
│   ├── __init__.py
│   └── log_revision.py
└── pyproject.toml
</code></pre><p>然后</p><pre><code class="language-shell">poetry install
poetry run my-script
想要安装到本地可执行文件
pipx install .
更新代码之后重新部署
pipx install . --force
或者 
pipx upgrade my_package
 

然后可执行文件就是 my-script
卸载
pipx uninstall my_package
想要打包发布
poetry build
poetry publish
</code></pre><p>安装本地cli <a href="https://github.com/pypa/pipx/issues/216" target="_blank" rel="noopener noreferrer">https://github.com/pypa/pipx/issues/216</a></p><p>如果找不到setuptools 就需要</p><pre><code class="language-shell">poetry add setuptools
</code></pre><h2 id="一个python的cli项目模板" tabindex="-1"><a class="header-anchor" href="#一个python的cli项目模板"><span>一个python的cli项目模板</span></a></h2><h3 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h3><pre><code class="language-text"> .
├──  config.py
├──  lib_cmd
│   ├──  __init__.py
│   ├──  base_cmd.py
│   ├──  cmd
│   │   └──  http_cmd.py
│   └──  main.py
├──  poetry.lock
├──  pyproject.toml
├──  README.md
├──  settings.toml
</code></pre><h3 id="pyproject-toml" tabindex="-1"><a class="header-anchor" href="#pyproject-toml"><span>pyproject.toml</span></a></h3><p>注意<code>packages</code>这个字段和下面的<code>tool.poetry.scripts</code>字段,<code>poetry install</code>会把script这个命令写进临时环境变量<br> 如果找不到,请用powershell命令<code>gcm python</code>看下python所在位置,正确位置是当前目录的<code>.venv/scripts/python.exe</code><br> 如果位置不对,请运行<code>./venv/scripts/activate</code>让环境变量生效</p><pre><code class="language-ini">[tool.poetry]
name = &quot;py-libs&quot;
version = &quot;0.1.0&quot;
description = &quot;&quot;
authors = [&quot;yzqdev &lt;yzqdev@outlook.com&gt;&quot;]
readme = &quot;README.md&quot;
packages = [{ include = &quot;lib_cmd&quot; }]
[tool.poetry.dependencies]
python = &quot;^3.11&quot;
pymysql = &quot;^1.1.0&quot;
dynaconf = &quot;^3.2.3&quot;
qrcode = &quot;^7.4.2&quot;
click = &quot;^8.1.7&quot;
colorama = &quot;^0.4.6&quot;
rich = &quot;^13.6.0&quot;
[tool.poetry.scripts]
pylib = &quot;lib_cmd.main:main&quot;
[build-system]
requires = [&quot;poetry-core&quot;]
build-backend = &quot;poetry.core.masonry.api&quot;
</code></pre><h3 id="main-py" tabindex="-1"><a class="header-anchor" href="#main-py"><span>main.py</span></a></h3><p>分开是为了防止循环依赖</p><pre><code class="language-python">from lib_cmd.base_cmd import cli


def main():
    cli()

</code></pre><h3 id="base-cmd-py" tabindex="-1"><a class="header-anchor" href="#base-cmd-py"><span>base_cmd.py</span></a></h3><pre><code class="language-python">import click

from lib_cmd.cmd.http_cmd import http_cmd


@click.group()
 
def cli():
    pass


@cli.command(&quot;root&quot;)
@click.option(&quot;--count&quot;, default=1, help=&quot;Number of greetings.&quot;)
@click.option(&quot;--name&quot;, prompt=&quot;Your name&quot;, help=&quot;The person to greet.&quot;)
def root_cli(count, name):
    &quot;&quot;&quot;Simple program that greets NAME for a total of COUNT times.&quot;&quot;&quot;
    for x in range(count):
        click.echo(f&quot;Hello {name}!&quot;)


cli.add_command(http_cmd)

</code></pre><h3 id="http-cmd-py" tabindex="-1"><a class="header-anchor" href="#http-cmd-py"><span>http_cmd.py</span></a></h3><pre><code class="language-python">import click
import colorama
from click.core import Command
 
@click.group(&quot;http&quot;)
def http_cmd() -&gt; Command:
    &quot;&quot;&quot;
    初始化数据库

    &quot;&quot;&quot;
    print(&quot;hello&quot;)
    pass


@http_cmd.command(&quot;drop&quot;)
def dropdb():
    &quot;&quot;&quot;
    删除数据库
    :return:
    &quot;&quot;&quot;
    click.echo(&quot;Dropped the database&quot;)


</code></pre><p>在命令行运行<code>pylib</code>就可以看到帮助命令</p>`,47),r=[a];function l(c,i){return o(),e("div",null,r)}const u=t(p,[["render",l],["__file","cli.html.vue"]]),d=JSON.parse('{"path":"/python-tutor/python-tips/cli.html","title":"python 命令行编写","lang":"zh-CN","frontmatter":{"description":"python 命令行编写 命令行 打包命令 https://packaging.python.org/en/latest/tutorials/installing-packages/#installing-from-a-local-src-tree https://pip.pypa.io/en/stable/reference/build-system...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/python-tips/cli.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"python 命令行编写"}],["meta",{"property":"og:description","content":"python 命令行编写 命令行 打包命令 https://packaging.python.org/en/latest/tutorials/installing-packages/#installing-from-a-local-src-tree https://pip.pypa.io/en/stable/reference/build-system..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-27T13:03:42.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-27T13:03:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"python 命令行编写\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-27T13:03:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"命令行","slug":"命令行","link":"#命令行","children":[]},{"level":2,"title":"click","slug":"click","link":"#click","children":[]},{"level":2,"title":"本地执行","slug":"本地执行","link":"#本地执行","children":[]},{"level":2,"title":"安装到scripts目录(安装到python安装目录的lib下)","slug":"安装到scripts目录-安装到python安装目录的lib下","link":"#安装到scripts目录-安装到python安装目录的lib下","children":[]},{"level":2,"title":"使用pyproject.toml","slug":"使用pyproject-toml","link":"#使用pyproject-toml","children":[]},{"level":2,"title":"使用pipx安装本地poetry包","slug":"使用pipx安装本地poetry包","link":"#使用pipx安装本地poetry包","children":[]},{"level":2,"title":"一个python的cli项目模板","slug":"一个python的cli项目模板","link":"#一个python的cli项目模板","children":[{"level":3,"title":"目录","slug":"目录","link":"#目录","children":[]},{"level":3,"title":"pyproject.toml","slug":"pyproject-toml","link":"#pyproject-toml","children":[]},{"level":3,"title":"main.py","slug":"main-py","link":"#main-py","children":[]},{"level":3,"title":"base_cmd.py","slug":"base-cmd-py","link":"#base-cmd-py","children":[]},{"level":3,"title":"http_cmd.py","slug":"http-cmd-py","link":"#http-cmd-py","children":[]}]}],"git":{"createdTime":1697339432000,"updatedTime":1711544622000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":2.26,"words":679},"filePathRelative":"python-tutor/python-tips/cli.md","localizedDate":"2023年10月15日","autoDesc":true}');export{u as comp,d as data};
