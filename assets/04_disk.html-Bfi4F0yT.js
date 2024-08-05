import{_ as e,c as t,o as a,d as p}from"./app-CbULZrmi.js";const l={},o=p(`<h1 id="磁盘管理" tabindex="-1"><a class="header-anchor" href="#磁盘管理"><span>磁盘管理</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>日程磁盘管理中，我们最常用的有查看当前磁盘使用情况，查看当前目录所占大小，以及打包压缩与解压缩；</p></div><h2 id="查看磁盘空间" tabindex="-1"><a class="header-anchor" href="#查看磁盘空间"><span>查看磁盘空间</span></a></h2><p>查看磁盘空间利用大小:</p><pre><code class="language-shell">df -h
</code></pre><p>-h: human缩写，以易读的方式显示结果（即带单位：比如M/G，如果不加这个参数，显示的数字以B为单位）</p><pre><code class="language-shell">df -h
    # /opt/app/todeav/config#df -h
    # Filesystem            Size  Used Avail Use% Mounted on
    # /dev/mapper/VolGroup00-LogVol00
    # 2.0G  711M  1.2G  38% /
    # /dev/mapper/vg1-lv2    20G  3.8G   15G  21% /opt/applog
    # /dev/mapper/vg1-lv1    20G   13G  5.6G  70% /opt/app
</code></pre><p>查看当前目录所占空间大小:</p><pre><code class="language-shell">du -sh
</code></pre><ul><li>-h 人性化显示</li><li>-s 递归整个目录的大小</li></ul><pre><code class="language-{=html}">&lt;!-- --&gt;
</code></pre><pre><code class="language-shell">du -sh
    # 653M
</code></pre><p>查看当前目录下所有子文件夹排序后的大小:</p><pre><code class="language-shell">for i in \`ls\`; do du -sh $i; done | sort
或者：
du -sh \`ls\` | sort
</code></pre><h2 id="打包-压缩" tabindex="-1"><a class="header-anchor" href="#打包-压缩"><span>打包/ 压缩</span></a></h2><p>在linux中打包和压缩和分两步来实现的；</p><p><strong>打包</strong></p><p>打包是将多个文件归并到一个文件:</p><pre><code class="language-shell">tar -cvf etc.tar /etc &lt;==仅打包，不压缩！
</code></pre><ul><li>-c :打包选项</li><li>-v :显示打包进度</li></ul><p>- -f :使用档案文件 注：有的系统中指定参数时不需要在前面加上-，直接使用tar xvf</p><p>示例：用tar实现文件夹同步，排除部分文件不同步:</p><pre><code class="language-shell">tar --exclude &#39;*.svn&#39; -cvf - /path/to/source | ( cd /path/to/target; tar -xf -)
</code></pre><p><strong>压缩</strong> :</p><pre><code class="language-shell">gzip demo.txt
</code></pre><p>生成 demo.txt.gz</p><h2 id="解包-解压缩" tabindex="-1"><a class="header-anchor" href="#解包-解压缩"><span>解包/解压缩</span></a></h2><p><strong>解包</strong> :</p><pre><code class="language-shell">tar -xvf demo.tar
</code></pre><p>-x 解包选项</p><p>解压后缀为 .tar.gz的文件 1. 先解压缩，生成**.tar:</p><pre><code class="language-shell">gunzip    demo.tar.gz
</code></pre><ol start="2"><li>解包:</li></ol><pre><code class="language-shell">tar -xvf  demo.tar
bzip2 -d demo.tar.bz2
</code></pre><p>bz2解压:</p><pre><code class="language-shell">tar jxvf demo.tar.bz2
</code></pre><p>如果tar 不支持j，则同样需要分两步来解包解压缩，使用bzip2来解压，再使用tar解包:</p><pre><code class="language-shell">bzip2 -d  demo.tar.bz2
tar -xvf  demo.tar
</code></pre><p>-d decompose,解压缩</p><p>tar解压参数说明：</p><ul><li>-z 解压gz文件</li><li>-j 解压bz2文件</li><li>-J 解压xz文件</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>查看磁盘空间 df -h</p><p>查看目录大小 du -sh</p><p>打包 tar -cvf</p><p>解包 tar -xvf</p><p>压缩 gzip</p><p>解压缩 gunzip bzip</p>`,48),r=[o];function n(s,d){return a(),t("div",null,r)}const i=e(l,[["render",n],["__file","04_disk.html.vue"]]),h=JSON.parse('{"path":"/linux-tutor/base/04_disk.html","title":"磁盘管理","lang":"zh-CN","frontmatter":{"index":4,"description":"磁盘管理 提示 日程磁盘管理中，我们最常用的有查看当前磁盘使用情况，查看当前目录所占大小，以及打包压缩与解压缩； 查看磁盘空间 查看磁盘空间利用大小: -h: human缩写，以易读的方式显示结果（即带单位：比如M/G，如果不加这个参数，显示的数字以B为单位） 查看当前目录所占空间大小: -h 人性化显示 -s 递归整个目录的大小 查看当前目录下所有子...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/base/04_disk.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"磁盘管理"}],["meta",{"property":"og:description","content":"磁盘管理 提示 日程磁盘管理中，我们最常用的有查看当前磁盘使用情况，查看当前目录所占大小，以及打包压缩与解压缩； 查看磁盘空间 查看磁盘空间利用大小: -h: human缩写，以易读的方式显示结果（即带单位：比如M/G，如果不加这个参数，显示的数字以B为单位） 查看当前目录所占空间大小: -h 人性化显示 -s 递归整个目录的大小 查看当前目录下所有子..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-26T17:48:57.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-26T17:48:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"磁盘管理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-26T17:48:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"查看磁盘空间","slug":"查看磁盘空间","link":"#查看磁盘空间","children":[]},{"level":2,"title":"打包/ 压缩","slug":"打包-压缩","link":"#打包-压缩","children":[]},{"level":2,"title":"解包/解压缩","slug":"解包-解压缩","link":"#解包-解压缩","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1653565176000,"updatedTime":1653587337000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":1.68,"words":504},"filePathRelative":"linux-tutor/base/04_disk.md","localizedDate":"2022年5月26日","autoDesc":true}');export{i as comp,h as data};
