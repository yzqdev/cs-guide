import{_ as t,c as o,a as i,o as a}from"./app-C8DxhDIZ.js";const n={};function r(s,e){return a(),o("div",null,e[0]||(e[0]=[i(`<h1 id="size-查看程序内存映像大小" tabindex="-1"><a class="header-anchor" href="#size-查看程序内存映像大小"><span>size 查看程序内存映像大小</span></a></h1><p>作用：查看程序被映射到内存中的映像所占用的大小信息。</p><p>程序映射到内存中，从低地址到高地址依次为下列段:</p><ul><li>代码段： 只读，可共享; 代码段（code segment/text segment ）通常是指用来存放程序执行代码的一块内存区域。这部分区域的大小在程序运行前就已经确定，并且内存区域通常属于只读, 某些架构也允许代码段为可写，即允许修改程序。在代码段中，也有可能包含一些只读的常数变量，例如字符串常量等。</li><li>数据段： 储存已被初始化了的静态数据。数据段（data segment ）通常是指用来存放程序中已初始化的全局变量的一块内存区域。数据段属于静态内存分配。</li><li>BSS 段：未初始化的数据段. BSS 段（bss segment ）通常是指用来存放程序中未初始化的全局变量的一块内存区域。BSS 是英文Block Started by Symbol 的简称。BSS 段属于静态内存分配。</li><li>堆（heap ）： 堆是用于存放进程运行中被动态分配的内存段，它的大小并不固定，可动态扩张或缩减。当进程调用malloc 等函数分配内存时，新分配的内存就被动态添加到堆上（堆被扩张）；当利用free 等函数释放内存时，被释放的内存从堆中被剔除（堆被缩减）</li><li>栈(stack) ：栈又称堆栈，是用户存放程序临时创建的局部变量，也就是说我们函数括弧&quot;{} &quot;中定义的变量（但不包括static 声明的变量，static 意味着在数据段中存放变量）。除此以外，在函数被调用时，其参数也会被压入发起调用的进程栈中，并且待到调用结束后，函数的返回值也会被存放回栈中。由于栈的先进先出特点，所以栈特别方便用来保存/ 恢复调用现场。从这个意义上讲，我们可以把堆栈看成一个寄存、交换临时数据的内存区。</li></ul><p>另外, 在高地址还储存了命令行参数及环境变量.</p><p>因为内存程序映像中的各段可能位于不同的地址空间中, 它们不一定位于连续的内存块中. 操作系统将程序映像映射到地址空间时, 通常将内存程序映像划分为大小相同的块(也就是page, 页). 只有该页被引用时, 它才被加载到内存中. 不过对于程序员来说, 可以视内存程序映像在逻辑上是连续的.</p><pre><code>/opt/app/todeav1/colin/tests#size main
text    data     bss     dec     hex filename
1259     540      16    1815     717 main
</code></pre><p>关于程序内存映像，这篇文章讲的很好：<a href="http://blog.chinaunix.net/uid-9012903-id-2011435.html" target="_blank" rel="noopener noreferrer">http://blog.chinaunix.net/uid-9012903-id-2011435.html</a></p>`,8)]))}const l=t(n,[["render",r]]),c=JSON.parse('{"path":"/linux-tutor/tool/size.html","title":"size 查看程序内存映像大小","lang":"zh-CN","frontmatter":{"description":"size 查看程序内存映像大小 作用：查看程序被映射到内存中的映像所占用的大小信息。 程序映射到内存中，从低地址到高地址依次为下列段: 代码段： 只读，可共享; 代码段（code segment/text segment ）通常是指用来存放程序执行代码的一块内存区域。这部分区域的大小在程序运行前就已经确定，并且内存区域通常属于只读, 某些架构也允许代码...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/tool/size.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"size 查看程序内存映像大小"}],["meta",{"property":"og:description","content":"size 查看程序内存映像大小 作用：查看程序被映射到内存中的映像所占用的大小信息。 程序映射到内存中，从低地址到高地址依次为下列段: 代码段： 只读，可共享; 代码段（code segment/text segment ）通常是指用来存放程序执行代码的一块内存区域。这部分区域的大小在程序运行前就已经确定，并且内存区域通常属于只读, 某些架构也允许代码..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"size 查看程序内存映像大小\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1653565176000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.48,"words":745},"filePathRelative":"linux-tutor/tool/size.md","localizedDate":"2022年5月26日","autoDesc":true}');export{l as comp,c as data};
