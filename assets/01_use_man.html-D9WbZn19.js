import{_ as e,c as a,o as n,d as t}from"./app-CbULZrmi.js";const i={},p=t(`<h1 id="学会使用命令帮助" tabindex="-1"><a class="header-anchor" href="#学会使用命令帮助"><span>学会使用命令帮助</span></a></h1><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>在linux终端，面对命令不知道怎么用，或不记得命令的拼写及参数时，我们需要求助于系统的帮助文档； linux系统内置的帮助文档很详细，通常能解决我们的问题，我们需要掌握如何正确的去使用它们；</p><ul><li>在只记得部分命令关键字的场合，我们可通过man -k来搜索；</li><li>需要知道某个命令的简要说明，可以使用whatis；而更详细的介绍，则可用info命令；</li><li>查看命令在哪个位置，我们需要使用which；</li><li>而对于命令的具体参数及使用方法，我们需要用到强大的man；</li></ul><p>下面介绍这些命令；</p><h2 id="命令使用" tabindex="-1"><a class="header-anchor" href="#命令使用"><span>命令使用</span></a></h2><h3 id="查看命令的简要说明" tabindex="-1"><a class="header-anchor" href="#查看命令的简要说明"><span>查看命令的简要说明</span></a></h3><p>简要说明命令的作用（显示命令所处的man分类页面）:</p><pre><code class="language-shell">whatis command
</code></pre><p>正则匹配:</p><pre><code class="language-shell">whatis -w &quot;loca*&quot;
</code></pre><p>更加详细的说明文档:</p><pre><code class="language-shell">info command  
</code></pre><h3 id="使用man" tabindex="-1"><a class="header-anchor" href="#使用man"><span>使用man</span></a></h3><p>查询命令command的说明文档:</p><pre><code class="language-shell">man command
# eg：man date
</code></pre><p>使用page up和page down来上下翻页</p><p>在man的帮助手册中，将帮助文档分为了9个类别，对于有的关键字可能存在多个类别中， 我们就需要指定特定的类别来查看；（一般我们查询bash命令，归类在1类中）；</p><p>man页面所属的分类标识(常用的是分类1和分类3) :</p><pre><code>(1)、用户可以操作的命令或者是可执行文件 
(2)、系统核心可调用的函数与工具等
(3)、一些常用的函数与数据库 
(4)、设备文件的说明 
(5)、设置文件或者某些文件的格式 
(6)、游戏  
(7)、惯例与协议等。例如Linux标准文件系统、网络协议、ASCⅡ，码等说明内容  
(8)、系统管理员可用的管理条令  
(9)、与内核有关的文件 
</code></pre><p>前面说到使用whatis会显示命令所在的具体的文档类别，我们学习如何使用它 :</p><pre><code class="language-shell">    eg:
    whatis printf  
    printf               (1)  - format and print data  
    printf               (1p)  - write formatted output  
    printf               (3)  - formatted output conversion  
    printf               (3p)  - print formatted output  
    printf [builtins]    (1)  - bash built-in commands, see bash(1)  
</code></pre><p>我们看到printf在分类1和分类3中都有；分类1中的页面是命令操作及可执行文件的帮助；而3是常用函数库说明；如果我们想看的是C语言中printf的用法，可以指定查看分类3的帮助： :</p><pre><code class="language-shell">man 3 printf

man -k keyword
</code></pre><p>查询关键字 根据命令中部分关键字来查询命令，适用于只记住部分命令的场合；</p><p>eg：查找GNOME的config配置工具命令:</p><pre><code class="language-shell">man -k GNOME config| grep 1  
</code></pre><p>对于某个单词搜索，可直接使用/word来使用: /-a; 多关注下SEE ALSO 可看到更多精彩内容</p><h3 id="查看路径" tabindex="-1"><a class="header-anchor" href="#查看路径"><span>查看路径</span></a></h3><p>查看程序的binary文件所在路径:</p><pre><code class="language-shell">which command  
</code></pre><p>eg:查找make程序安装路径:</p><pre><code class="language-shell">    $which make
    /opt/app/openav/soft/bin/make install
</code></pre><p>查看程序的搜索路径:</p><pre><code class="language-shell">    $whereis command
</code></pre><p>当系统中安装了同一软件的多个版本时，不确定使用的是哪个版本时，这个命令就能派上用场；</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p>whatis info man which whereis</p>`,38),l=[p];function o(r,s){return n(),a("div",null,l)}const d=e(i,[["render",o],["__file","01_use_man.html.vue"]]),h=JSON.parse('{"path":"/linux-tutor/base/01_use_man.html","title":"学会使用命令帮助","lang":"zh-CN","frontmatter":{"order":1,"description":"学会使用命令帮助 概述 在linux终端，面对命令不知道怎么用，或不记得命令的拼写及参数时，我们需要求助于系统的帮助文档； linux系统内置的帮助文档很详细，通常能解决我们的问题，我们需要掌握如何正确的去使用它们； 在只记得部分命令关键字的场合，我们可通过man -k来搜索； 需要知道某个命令的简要说明，可以使用whatis；而更详细的介绍，则可用i...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/base/01_use_man.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"学会使用命令帮助"}],["meta",{"property":"og:description","content":"学会使用命令帮助 概述 在linux终端，面对命令不知道怎么用，或不记得命令的拼写及参数时，我们需要求助于系统的帮助文档； linux系统内置的帮助文档很详细，通常能解决我们的问题，我们需要掌握如何正确的去使用它们； 在只记得部分命令关键字的场合，我们可通过man -k来搜索； 需要知道某个命令的简要说明，可以使用whatis；而更详细的介绍，则可用i..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-26T17:48:57.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-26T17:48:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"学会使用命令帮助\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-26T17:48:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"命令使用","slug":"命令使用","link":"#命令使用","children":[{"level":3,"title":"查看命令的简要说明","slug":"查看命令的简要说明","link":"#查看命令的简要说明","children":[]},{"level":3,"title":"使用man","slug":"使用man","link":"#使用man","children":[]},{"level":3,"title":"查看路径","slug":"查看路径","link":"#查看路径","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}]}],"git":{"createdTime":1653565176000,"updatedTime":1653587337000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":2.72,"words":816},"filePathRelative":"linux-tutor/base/01_use_man.md","localizedDate":"2022年5月26日","autoDesc":true}');export{d as comp,h as data};
