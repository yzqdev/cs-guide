import{_ as e,c as a,o as t,d as p}from"./app-CbULZrmi.js";const n={},s=p(`<h1 id="elementaryos安装" tabindex="-1"><a class="header-anchor" href="#elementaryos安装"><span>elementaryos安装</span></a></h1><h2 id="安装系统更新" tabindex="-1"><a class="header-anchor" href="#安装系统更新"><span>安装系统更新</span></a></h2><pre><code class="language-bash">sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist upgrade
</code></pre><p>◾安装额外的驱动</p><p>在软件与更新中直接选择安装额外驱动即可。</p><p>◾安装媒体解码器并且启用 DVD 回放</p><p>a) 安装多媒体框架</p><pre><code class="language-bash">sudo apt-add-repository ppa:mc3man/trusty-media

sudo apt-get update

sudo apt-get install [Ubuntu](https://www.linuxidc.com/topicnews.aspx?tid=2)-restricted-extras ffmpeg gstreamer0.10-plugins-ugly libavcodec-extra-54 libvdpau-va-gl1 libmad0 mpg321 gstreamer1.0-libav
</code></pre><p>b) 启用 DVD 回放</p><pre><code class="language-bash">sudo /usr/share/doc/libdvdread4/install-css.s­h
</code></pre><p>◾安装 VLC 媒体播放器</p><pre><code class="language-bash">sudo apt-get install vlc
</code></pre><p>◾安装 <a href="http://www.linuxidc.com/Java" target="_blank" rel="noopener noreferrer">Java</a></p><pre><code class="language-bash">sudo add-apt-repository -y ppa:webupd8team/java

sudo apt-get update

sudo apt-get install [Oracle](https://www.linuxidc.com/topicnews.aspx?tid=12)-java9-installer
</code></pre><p>◾安装各种归档文件，压缩文件格式支持</p><pre><code class="language-bash">sudo apt-get unace rar unrar p7zip-rar p7zip sharutils uudeview mpack arj cabextract lzip lunzip
</code></pre><p>◾安装 LibreOffice 办公软件</p><pre><code class="language-bash">sudo apt-get install libreoffice libreoffice-gtk libreoffice-style-sifr
</code></pre><p>◾安装其他的网页浏览器</p><pre><code class="language-bash">sudo apt-get install chromium-browser firefox
</code></pre><p>◾安装种子下载器</p><pre><code class="language-bash">sudo apt-get install transmission
</code></pre><p>◾安装下载管理器</p><pre><code class="language-bash">wget http://xdman.sourceforge.net/xdman_mint_ubuntu.deb

sudo dpkg -i xdman_mint_ubuntu.deb
</code></pre><p>◾安装图像处理软件</p><pre><code class="language-bash">sudo apt-get install gimp inkscape
</code></pre><p>◾安装搜索指示器</p><pre><code class="language-bash">sudo apt-add-repository ppa:elementary-os/unstable-upstream

sudo apt-get install indicator-synapse
</code></pre><p>◾安装系统调整工具</p><pre><code class="language-bash">sudo apt-add-repository ppa:mpstark/elementary-tweaks-daily

sudo apt-get install elementary-tweak
</code></pre><p>◾安装 Bleachbit 系统记录清理工具</p><pre><code class="language-bash">sudo apt-get install bleachbit
</code></pre><p>◾安装在线云存储客户端</p><p>下载 DropBox : <a href="https://www.dropbox.com/install?os=lnx" target="_blank" rel="noopener noreferrer">https://www.dropbox.com/install?os=lnx</a></p><p>安装 Google Drive</p><pre><code class="language-bash">sudo add-apt-repository ppa:alessandro-strada/ppa

sudo apt-get update

sudo apt-get install google-drive-ocamlfuse
</code></pre><p>◾针对笔记本，安装 TLP 以延长电池寿命，减少发热</p><pre><code class="language-bash">sudo add-apt-repository ppa:linrunner/tlp

sudo apt-get update

sudo apt-get install tlp tlp-rdw

sudo tlp start
</code></pre>`,38),o=[s];function r(l,d){return t(),a("div",null,o)}const c=e(n,[["render",r],["__file","elementary-linux.html.vue"]]),u=JSON.parse('{"path":"/linux-tutor/linux-tips/elementary-linux.html","title":"elementaryos安装","lang":"zh-CN","frontmatter":{"description":"elementaryos安装 安装系统更新 ◾安装额外的驱动 在软件与更新中直接选择安装额外驱动即可。 ◾安装媒体解码器并且启用 DVD 回放 a) 安装多媒体框架 b) 启用 DVD 回放 ◾安装 VLC 媒体播放器 ◾安装 Java ◾安装各种归档文件，压缩文件格式支持 ◾安装 LibreOffice 办公软件 ◾安装其他的网页浏览器 ◾安装种子下...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/linux-tips/elementary-linux.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"elementaryos安装"}],["meta",{"property":"og:description","content":"elementaryos安装 安装系统更新 ◾安装额外的驱动 在软件与更新中直接选择安装额外驱动即可。 ◾安装媒体解码器并且启用 DVD 回放 a) 安装多媒体框架 b) 启用 DVD 回放 ◾安装 VLC 媒体播放器 ◾安装 Java ◾安装各种归档文件，压缩文件格式支持 ◾安装 LibreOffice 办公软件 ◾安装其他的网页浏览器 ◾安装种子下..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T13:45:58.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T13:45:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"elementaryos安装\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T13:45:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安装系统更新","slug":"安装系统更新","link":"#安装系统更新","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1649166358000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.4,"words":419},"filePathRelative":"linux-tutor/linux-tips/elementary-linux.md","localizedDate":"2022年3月21日","autoDesc":true}');export{c as comp,u as data};
