import{_ as e,c as p,o as t,d as n}from"./app-CbULZrmi.js";const i={},a=n(`<h1 id="pip配置" tabindex="-1"><a class="header-anchor" href="#pip配置"><span>pip配置</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>常用的全局包</p><pre><code class="language-python">pip install -U you-get pipenv rembg pyinstaller auto-py-to-exe
</code></pre></div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p>python3已经自带了pip,运行<code>python -m pip -V</code> ,就可以看到了</p><p>配置文件路径</p><ul><li>On Unix and macOS the configuration file is: <code>$HOME/.pip/pip.conf</code></li><li>On Windows the configuration file is: <code>%HOME%\\pip\\pip.ini</code></li></ul><h2 id="配置国内镜像源" tabindex="-1"><a class="header-anchor" href="#配置国内镜像源"><span>配置国内镜像源</span></a></h2><p>将pip源更换到国内镜像 用pip管理工具安装库文件时，默认使用国外的源文件，因此在国内的下载速度会比较慢，可能只有50KB/s。幸好，国内的一些顶级科研机构已经给我们准备好了各种镜像，下载速度可达2MB/s。 其中，比较常用的国内镜像包括：</p><ul><li>阿里云 <a href="http://mirrors.aliyun.com/pypi/simple/" target="_blank" rel="noopener noreferrer">http://mirrors.aliyun.com/pypi/simple/</a></li><li>豆瓣<a href="http://pypi.douban.com/simple/" target="_blank" rel="noopener noreferrer">http://pypi.douban.com/simple/</a></li><li>清华大学 <a href="https://pypi.tuna.tsinghua.edu.cn/simple/" target="_blank" rel="noopener noreferrer">https://pypi.tuna.tsinghua.edu.cn/simple/</a></li><li>中国科学技术大学 <a href="http://pypi.mirrors.ustc.edu.cn/simple/" target="_blank" rel="noopener noreferrer">http://pypi.mirrors.ustc.edu.cn/simple/</a></li><li>华中科技大学<a href="http://pypi.hustunique.com/" target="_blank" rel="noopener noreferrer">http://pypi.hustunique.com/</a></li></ul><p>注意：新版ubuntu要求使用https源。</p><p>设置方法：（以清华镜像为例，其它镜像同理）<br> （1）临时使用：<br> 可以在使用pip的时候，加上参数-i和镜像地址(如 <a href="https://pypi.tuna.tsinghua.edu.cn/simple" target="_blank" rel="noopener noreferrer">https://pypi.tuna.tsinghua.edu.cn/simple)</a>)， 例如：pip install -i <a href="https://pypi.tuna.tsinghua.edu.cn/simple" target="_blank" rel="noopener noreferrer">https://pypi.tuna.tsinghua.edu.cn/simple</a> pandas，这样就会从清华镜像安装pandas库。</p><p>（2）永久修改，一劳永逸：<br> （a）Linux下，修改 ~/.pip/pip.conf (没有就创建一个文件夹及文件。文件夹要加“.”，表示是隐藏文件夹) 内容如下：</p><pre><code class="language-ini">[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = https://pypi.tuna.tsinghua.edu.cn
</code></pre><p>(b) windows下，直接在user目录中创建一个pip目录，如：C:\\Users\\xx\\pip，然后新建文件pip.ini，即 %HOMEPATH%\\pip\\pip.ini，在pip.ini文件中输入以下内容（以豆瓣镜像为例）：</p><pre><code class="language-ini">[global]
index-url = http://pypi.douban.com/simple
[install]
trusted-host = pypi.douban.com
</code></pre><p>或者使用命令行</p><pre><code class="language-bash">pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
</code></pre><h2 id="安装依赖" tabindex="-1"><a class="header-anchor" href="#安装依赖"><span>安装依赖</span></a></h2><p>注意:pip默认安装依赖的位置在 <code>python文件夹\\Lib\\site-packages</code> 比如我的就是在<code>C:\\Users\\yanni\\miniconda3\\envs\\condapkg\\Lib\\site-packages</code> conda在某个环境比如condapkg安装依赖比如pandas的时候,会在两个目录生成pandas包目录 使用conda安装依赖和pip安装依赖在pycharm中依赖的位置是一样的,没区别哦</p><pre><code class="language-bash">miniconda3/pkgs   # 这个目录是全局的
miniconda3/envs/condapkg/Lib/site-packages   #这个是condapkg环境的依赖

</code></pre><p>​</p><pre><code class="language-bash">python -m pip install SomePackage            # latest version
python -m pip install SomePackage==1.0.4     # specific version
python -m pip install &#39;SomePackage&gt;=1.0.4&#39;     # minimum version
python -m pip uninstall SomePackage            #删除依赖
python -m pip list                #列出依赖
python -m pip search &quot;query&quot;


#安装和生成requirements中的依赖
python -m pip freeze &gt; requirements.txt
python -m pip install -r requirements.txt

</code></pre><h2 id="ubuntu-安装最新版本的-python3-10" tabindex="-1"><a class="header-anchor" href="#ubuntu-安装最新版本的-python3-10"><span>Ubuntu 安装最新版本的 Python3.10</span></a></h2><blockquote><p>必须在 <code>root</code> 下执行。</p></blockquote><p><strong>安装最新版本的 Python3.10</strong></p><ul><li><p>查看当前 python3 的版本</p><pre><code class="language-bash">$ python3 --version
Python 3.8.10
</code></pre></li><li><p>升级包及安装环境前置依赖</p><pre><code class="language-bash">apt update
apt install software-properties-common
</code></pre></li><li><p>添加 deadsnakes PPA 到源列表 安装过程中需要按 <code>Enter</code> 进入下一步</p><pre><code class="language-bash">add-apt-repository ppa:deadsnakes/ppa
apt update
</code></pre></li><li><p>查看软件包是否包含 python3.10</p><pre><code class="language-bash">apt list | grep python3.10
</code></pre></li><li><p>安装 python3.10</p><pre><code class="language-bash">apt install python3.10
</code></pre></li><li><p>查看当前 Python 版本，发现版本未更新</p><pre><code class="language-bash">python3 --version
</code></pre></li><li><p>设置默认版本为 Python3.10</p><pre><code class="language-bash">update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1
update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.10 2
</code></pre><p>执行，选择默认版本</p><pre><code class="language-bash">update-alternatives --config python3
</code></pre></li><li><p>查看最新的 Python 版本</p><pre><code class="language-bash">$ python --version
Python 3.10.0
</code></pre></li></ul><p><strong>按需要决定是否移除旧版本的 Python3.8（因是默认的 Python，建议不移除，以防个别破坏内置依赖）</strong></p><pre><code class="language-bash">apt remove python3.8
apt autoremove
</code></pre><ul><li><p>修复 pip 和 disutils 执行 <code>pip --version</code> 会报错：</p><pre><code class="language-bash">ModuleNotFoundError: No module named &#39;distutils.util&#39;
</code></pre><p>解决：</p><pre><code class="language-bash">apt install python3.10-distutils
</code></pre></li><li><p>重装 pip</p><pre><code>curl -fSL https://bootstrap.pypa.io/get-pip.py |   python3 get-pip.py --user
</code></pre></li></ul>`,29),o=[a];function s(r,l){return t(),p("div",null,o)}const d=e(i,[["render",s],["__file","pip-tutor.html.vue"]]),h=JSON.parse('{"path":"/cs-tips/python-tip/pip-tutor.html","title":"pip配置","lang":"zh-CN","frontmatter":{"description":"pip配置 提示 常用的全局包 安装 python3已经自带了pip,运行python -m pip -V ,就可以看到了 配置文件路径 On Unix and macOS the configuration file is: $HOME/.pip/pip.conf On Windows the configuration file is: %HOME...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/python-tip/pip-tutor.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"pip配置"}],["meta",{"property":"og:description","content":"pip配置 提示 常用的全局包 安装 python3已经自带了pip,运行python -m pip -V ,就可以看到了 配置文件路径 On Unix and macOS the configuration file is: $HOME/.pip/pip.conf On Windows the configuration file is: %HOME..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"pip配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"配置国内镜像源","slug":"配置国内镜像源","link":"#配置国内镜像源","children":[]},{"level":2,"title":"安装依赖","slug":"安装依赖","link":"#安装依赖","children":[]},{"level":2,"title":"Ubuntu 安装最新版本的 Python3.10","slug":"ubuntu-安装最新版本的-python3-10","link":"#ubuntu-安装最新版本的-python3-10","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.9,"words":869},"filePathRelative":"cs-tips/python-tip/pip-tutor.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,h as data};
