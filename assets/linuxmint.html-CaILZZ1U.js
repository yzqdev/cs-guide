import{_ as e,c as t,o as n,d as a}from"./app-CbULZrmi.js";const o={},r=a(`<h1 id="linuxmint配置" tabindex="-1"><a class="header-anchor" href="#linuxmint配置"><span>linuxmint配置</span></a></h1><ol><li>配置镜像源,全改为国内的镜像,加快包下载速度</li><li>下载各种软件,gedit, vscode, nvm,chrome, vivaldi,teamviewer等等</li><li>这里要配置node的环境,下载nvm,yarn,mirror-config-china</li><li>添加ohmyzsh美化终端,其中用户目录的.bash_profile,.bashrc,.zshrc要知道是干什么的</li><li>添加字体微软雅黑,yaheimono等,更改terminal字体样式</li><li>下载conda并配置condarc设置国内镜像</li></ol><p>​</p><h2 id="安装sshd" tabindex="-1"><a class="header-anchor" href="#安装sshd"><span>安装sshd</span></a></h2><pre><code class="language-python">sudo apt-get  install openssh-server
</code></pre><h2 id="安装nodejs" tabindex="-1"><a class="header-anchor" href="#安装nodejs"><span>安装nodejs</span></a></h2><h2 id="安装java" tabindex="-1"><a class="header-anchor" href="#安装java"><span>安装java</span></a></h2><p>在adoptopenjdk网站下载 <a href="https://adoptium.net/releases.html" target="_blank" rel="noopener noreferrer">https://adoptium.net/releases.html</a></p><pre><code class="language-python">解压
tar xzf OpenJDK17U-jdk_x64_linux_hotspot_17.0.2_8.tar.gz

添加环境变量(.bashrc,.zshrc)
export PATH=$PWD/jdk-17.0.2+8/bin:$PATH

检查是否安装
java -verison
</code></pre><h3 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker"><span>安装docker</span></a></h3><p><a href="https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script" target="_blank" rel="noopener noreferrer">https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script</a></p><h3 id="安装golang" tabindex="-1"><a class="header-anchor" href="#安装golang"><span>安装golang</span></a></h3><pre><code class="language-python">在golang官网下载go的安装包，go1.16.linux-amd64.tar.gz 然后
# 1.解压到local目录
wget  https://go.dev/dl/go1.17.7.linux-amd64.tar.gz
sudo tar -C /opt -xzf go1.17.7.linux-amd64.tar.gz
# 2.编辑环境变量，在/etc/profile和.bashrc添加
#vim ~/.zshrc  # OR ~/.bashrc OR ~/.profile
cp -r ~/.bashrc ~/bashrcbak
# 添加a环境变量
export GOMODPATH=/opt/go
export PATH=&quot;$GOMODPATH/bin:$GOMODPATH/golangmod/bin:$PATH&quot;
# 修改/opt的权限
sudo chmod -R 777 /opt/go



echo &#39;export GOMODPATH=/opt/go
export PATH=&quot;$GOMODPATH/bin:$GOMODPATH/golangmod/bin:$PATH&quot;&#39; &gt;&gt;~/.bashrc
source ~/.bashrc
# 3.输入go version检查是否有安装成功
# 4.配置go代理
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GOPATH=/opt/go/golangmod
</code></pre><h2 id="安装guake" tabindex="-1"><a class="header-anchor" href="#安装guake"><span>安装guake</span></a></h2><pre><code class="language-python">sudo apt install guake
</code></pre><h2 id="安装openresty" tabindex="-1"><a class="header-anchor" href="#安装openresty"><span>安装openresty</span></a></h2><pre><code class="language-python">https://openresty.org/cn/installation.html
</code></pre><h2 id="安装fastgithub" tabindex="-1"><a class="header-anchor" href="#安装fastgithub"><span>安装fastgithub</span></a></h2><p>在<a href="https://github.com/dotnetcore/FastGithub" target="_blank" rel="noopener noreferrer">https://github.com/dotnetcore/FastGithub</a>下载fastgithub的linux版本 ​</p><pre><code class="language-python">以服务启动
sudo ./fastgithub start

配置代理
修改   /etc/profile   文件
添加
export http_proxy=http://127.0.0.1:38457
export https_proxy=http://127.0.0.1:38457
</code></pre><h2 id="安装dotnet" tabindex="-1"><a class="header-anchor" href="#安装dotnet"><span>安装dotnet</span></a></h2><p><a href="https://docs.microsoft.com/zh-cn/dotnet/core/install/linux-ubuntu#2004-" target="_blank" rel="noopener noreferrer">https://docs.microsoft.com/zh-cn/dotnet/core/install/linux-ubuntu#2004-</a></p><h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h2>`,23),i=[r];function s(l,h){return n(),t("div",null,i)}const d=e(o,[["render",s],["__file","linuxmint.html.vue"]]),p=JSON.parse('{"path":"/linux-tutor/linux-tips/linuxmint.html","title":"linuxmint配置","lang":"zh-CN","frontmatter":{"description":"linuxmint配置 配置镜像源,全改为国内的镜像,加快包下载速度 下载各种软件,gedit, vscode, nvm,chrome, vivaldi,teamviewer等等 这里要配置node的环境,下载nvm,yarn,mirror-config-china 添加ohmyzsh美化终端,其中用户目录的.bash_profile,.bashrc,...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/linux-tips/linuxmint.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"linuxmint配置"}],["meta",{"property":"og:description","content":"linuxmint配置 配置镜像源,全改为国内的镜像,加快包下载速度 下载各种软件,gedit, vscode, nvm,chrome, vivaldi,teamviewer等等 这里要配置node的环境,下载nvm,yarn,mirror-config-china 添加ohmyzsh美化终端,其中用户目录的.bash_profile,.bashrc,..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T15:17:32.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T15:17:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"linuxmint配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T15:17:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安装sshd","slug":"安装sshd","link":"#安装sshd","children":[]},{"level":2,"title":"安装nodejs","slug":"安装nodejs","link":"#安装nodejs","children":[]},{"level":2,"title":"安装java","slug":"安装java","link":"#安装java","children":[{"level":3,"title":"安装docker","slug":"安装docker","link":"#安装docker","children":[]},{"level":3,"title":"安装golang","slug":"安装golang","link":"#安装golang","children":[]}]},{"level":2,"title":"安装guake","slug":"安装guake","link":"#安装guake","children":[]},{"level":2,"title":"安装openresty","slug":"安装openresty","link":"#安装openresty","children":[]},{"level":2,"title":"安装fastgithub","slug":"安装fastgithub","link":"#安装fastgithub","children":[]},{"level":2,"title":"安装dotnet","slug":"安装dotnet","link":"#安装dotnet","children":[]},{"level":2,"title":"","slug":"","link":"#","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1649171852000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.31,"words":393},"filePathRelative":"linux-tutor/linux-tips/linuxmint.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,p as data};
