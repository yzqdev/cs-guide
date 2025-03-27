import{_ as t,c as a,a as s,o as n}from"./app-C8DxhDIZ.js";const o={};function p(i,e){return n(),a("div",null,e[0]||(e[0]=[s(`<h1 id="技巧1" tabindex="-1"><a class="header-anchor" href="#技巧1"><span>技巧1</span></a></h1><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token comment"># clone 下来指定的单一分支</span></span>
<span class="line">git clone <span class="token operator">-</span>b &lt;branch-name&gt; <span class="token operator">--</span>single-branch https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/user/repo<span class="token punctuation">.</span>git</span>
<span class="line"><span class="token comment"># 只会 clone 最近一次提交，将减少 clone 时间</span></span>
<span class="line">git clone <span class="token operator">--</span>depth=1 https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/user/repo<span class="token punctuation">.</span>git</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="gitclone单个文件夹" tabindex="-1"><a class="header-anchor" href="#gitclone单个文件夹"><span>gitclone单个文件夹</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">git config core.sparsecheckout true</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"> mkdir models # 创建一个与要clone的仓库同名或不同命的目录</span>
<span class="line"> cd models</span>
<span class="line"> git init #初始化</span>
<span class="line"> git remote add origin  https://github.com/tensorflow/models.git # 增加远端的仓库地址</span>
<span class="line"> git config core.sparsecheckout true # 设置Sparse Checkout 为true </span>
<span class="line"> echo &quot;research/deeplab&quot; &gt;&gt; .git/info/sparse-checkout # 将要部分clone的目录相对根目录的路径写入配置文件</span>
<span class="line"> git pull --depth 1 origin master </span>
<span class="line"></span></code></pre></div>`,4)]))}const l=t(o,[["render",p]]),r=JSON.parse('{"path":"/git-tutor/tips/params.html","title":"技巧1","lang":"zh-CN","frontmatter":{"description":"技巧1 gitclone单个文件夹","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/tips/params.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"技巧1"}],["meta",{"property":"og:description","content":"技巧1 gitclone单个文件夹"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-10T18:06:56.000Z"}],["meta",{"property":"article:modified_time","content":"2023-11-10T18:06:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"技巧1\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-10T18:06:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"gitclone单个文件夹","slug":"gitclone单个文件夹","link":"#gitclone单个文件夹","children":[]}],"git":{"createdTime":1699639616000,"updatedTime":1699639616000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.46,"words":139},"filePathRelative":"git-tutor/tips/params.md","localizedDate":"2023年11月10日","autoDesc":true}');export{l as comp,r as data};
