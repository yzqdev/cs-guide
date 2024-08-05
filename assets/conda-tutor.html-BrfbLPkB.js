import{_ as n,c as a,o as e,d as o}from"./app-CbULZrmi.js";const t={},c=o(`<h1 id="conda使用" tabindex="-1"><a class="header-anchor" href="#conda使用"><span>conda使用</span></a></h1><h2 id="安装miniconda" tabindex="-1"><a class="header-anchor" href="#安装miniconda"><span>安装miniconda</span></a></h2><p>不要选择使用环境变量,因为一会儿自己配 anaconda下载地址: <a href="https://www.anaconda.com/products/individual#windows" target="_blank" rel="noopener noreferrer">https://www.anaconda.com/products/individual#windows</a>(请选择清华镜像)<br> miniconda下载地址: <a href="https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-latest-Windows-x86_64.exe" target="_blank" rel="noopener noreferrer">https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-latest-Windows-x86_64.exe</a> (点击下载)<br> 我把anaconda安装在了 <code>d:\\Miniconda3</code> 目录</p><p>安装后查看文档 <a href="https://conda.io/projects/conda/en/latest/user-guide/getting-started.html#before-you-start" target="_blank" rel="noopener noreferrer">conda文档</a> ​</p><h2 id="新建虚拟环境" tabindex="-1"><a class="header-anchor" href="#新建虚拟环境"><span>新建虚拟环境</span></a></h2><pre><code class="language-bash"># 创建一个名为condapkg的环境，指定Python版本是3.5（不用管是3.10，conda会为我们自动寻找3.10中的最新版本）
conda create --name condapkg python=3.10
</code></pre><h2 id="然后配置python" tabindex="-1"><a class="header-anchor" href="#然后配置python"><span>然后配置python</span></a></h2><pre><code class="language-powershell"># 在环境变量里面加了这些
D:\\Miniconda3\\Scripts
D:\\Miniconda3\\envs\\condapkg
D:\\Miniconda3\\envs\\condapkg\\Scripts
</code></pre><h2 id="添加-condarc和pip-ini文件" tabindex="-1"><a class="header-anchor" href="#添加-condarc和pip-ini文件"><span>添加.condarc和pip.ini文件</span></a></h2><p>.condarc</p><pre><code class="language-yaml">channels:
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - defaults
show_channel_urls: true
default_channels:
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
changeps1: false
auto_activate_base: true

</code></pre><p>pip.ini (<code>%userprofile%\\pip\\pip.ini</code>)</p><pre><code class="language-toml">[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = pypi.tuna.tsinghua.edu.cn
</code></pre><h2 id="conda的包管理" tabindex="-1"><a class="header-anchor" href="#conda的包管理"><span><strong>Conda的包管理</strong></span></a></h2><p>安装命令行工具建议用<code>conda install</code>,或者<code>pip3 install</code> 不能用<code>python -m pip install</code></p><pre><code class="language-powershell">conda activate condapkg
conda install httpie
pip3 install httpie
不能用 python -m pip install httpie
</code></pre><h2 id="安装库" tabindex="-1"><a class="header-anchor" href="#安装库"><span>安装库</span></a></h2><p>为当前环境安装库</p><pre><code># numpy
conda install numpy
# conda会从从远程搜索numpy的相关信息和依赖项目
</code></pre><h2 id="查看已经安装的库" tabindex="-1"><a class="header-anchor" href="#查看已经安装的库"><span>查看已经安装的库</span></a></h2><pre><code># 查看已经安装的packages
conda list
# 最新版的conda是从site-packages文件夹中搜索已经安装的包，可以显示出通过各种方式安装的包
</code></pre><h2 id="查看某个环境的已安装包" tabindex="-1"><a class="header-anchor" href="#查看某个环境的已安装包"><span>查看某个环境的已安装包</span></a></h2><pre><code class="language-shell"> # 更新python
 
conda update python
# 查看某个指定环境的已安装包
conda list -n py310
conda create -n env_name package_name #创建名为env_name的新环境，并在该环境下安装名为package_name 的包，可以指定新环境的版本号，例如：conda create -n python2 python=python2.7 numpy pandas，创建了python2环境，python版本为2.7，同时还安装了numpy pandas包
# 删除某个环境
conda remove --name env_name –all 
# 或者
conda env remove -n env_name
#在指定环境中安装包
conda install --name env_name package_name 
 
# 查找package信息
conda search numpy
 
# 安装package
conda install -n py310 numpy
# 如果不用-n指定环境名称，则被安装在当前活跃环境
# 也可以通过-c指定通过某个channel安装
 
# 更新package
conda update -n py310 numpy
 
# 删除package
conda remove -n py310 numpy
 
# 更新conda，保持conda最新
conda update conda
 
 
# 更新anaconda
conda update anaconda
</code></pre><div class="hint-container tip"><p class="hint-container-title">提示</p><p>兼容pip,所以直接可以用pip安装</p></div><h2 id="conda错误" tabindex="-1"><a class="header-anchor" href="#conda错误"><span>conda错误</span></a></h2><p>CondaHTTPError: HTTP 000 CONNECTION FAILED for url ＜<a href="https://repo.anaconda.com/pkgs/main/win-64/curre" target="_blank" rel="noopener noreferrer">https://repo.anaconda.com/pkgs/main/win-64/curre</a></p><p><a href="https://github.com/conda/conda/issues/9746" target="_blank" rel="noopener noreferrer">https://github.com/conda/conda/issues/9746</a></p><h3 id="安装conda后终端出现的-base-字样去除方法" tabindex="-1"><a class="header-anchor" href="#安装conda后终端出现的-base-字样去除方法"><span>安装conda后终端出现的(base)字样去除方法</span></a></h3><p>修改.condarc文件</p><pre><code class="language-bash">ssl_verify: true
channels:
  defaults
changeps1: False #加上这个
</code></pre><h2 id="推荐使用conda-forge" tabindex="-1"><a class="header-anchor" href="#推荐使用conda-forge"><span>推荐使用conda-forge</span></a></h2><p>安装</p><pre><code>scoop install extras/mambaforge
</code></pre>`,33),d=[c];function r(i,p){return e(),a("div",null,d)}const l=n(t,[["render",r],["__file","conda-tutor.html.vue"]]),h=JSON.parse('{"path":"/python-tutor/python-config/conda-tutor.html","title":"conda使用","lang":"zh-CN","frontmatter":{"description":"conda使用 安装miniconda 不要选择使用环境变量,因为一会儿自己配 anaconda下载地址: https://www.anaconda.com/products/individual#windows(请选择清华镜像) miniconda下载地址: https://mirrors.tuna.tsinghua.edu.cn/anaconda/...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/python-config/conda-tutor.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"conda使用"}],["meta",{"property":"og:description","content":"conda使用 安装miniconda 不要选择使用环境变量,因为一会儿自己配 anaconda下载地址: https://www.anaconda.com/products/individual#windows(请选择清华镜像) miniconda下载地址: https://mirrors.tuna.tsinghua.edu.cn/anaconda/..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-27T13:50:30.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-09-27T13:50:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"conda使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-27T13:50:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安装miniconda","slug":"安装miniconda","link":"#安装miniconda","children":[]},{"level":2,"title":"新建虚拟环境","slug":"新建虚拟环境","link":"#新建虚拟环境","children":[]},{"level":2,"title":"然后配置python","slug":"然后配置python","link":"#然后配置python","children":[]},{"level":2,"title":"添加.condarc和pip.ini文件","slug":"添加-condarc和pip-ini文件","link":"#添加-condarc和pip-ini文件","children":[]},{"level":2,"title":"Conda的包管理","slug":"conda的包管理","link":"#conda的包管理","children":[]},{"level":2,"title":"安装库","slug":"安装库","link":"#安装库","children":[]},{"level":2,"title":"查看已经安装的库","slug":"查看已经安装的库","link":"#查看已经安装的库","children":[]},{"level":2,"title":"查看某个环境的已安装包","slug":"查看某个环境的已安装包","link":"#查看某个环境的已安装包","children":[]},{"level":2,"title":"conda错误","slug":"conda错误","link":"#conda错误","children":[{"level":3,"title":"安装conda后终端出现的(base)字样去除方法","slug":"安装conda后终端出现的-base-字样去除方法","link":"#安装conda后终端出现的-base-字样去除方法","children":[]}]},{"level":2,"title":"推荐使用conda-forge","slug":"推荐使用conda-forge","link":"#推荐使用conda-forge","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1695822630000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":5}]},"readingTime":{"minutes":2.21,"words":662},"filePathRelative":"python-tutor/python-config/conda-tutor.md","localizedDate":"2022年3月21日","autoDesc":true}');export{l as comp,h as data};
