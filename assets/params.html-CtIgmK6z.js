import{_ as e,c as t,o,d as n}from"./app-CbULZrmi.js";const r={},i=n(`<h1 id="技巧1" tabindex="-1"><a class="header-anchor" href="#技巧1"><span>技巧1</span></a></h1><pre><code class="language-powershell"># clone 下来指定的单一分支
git clone -b &lt;branch-name&gt; --single-branch https://github.com/user/repo.git
# 只会 clone 最近一次提交，将减少 clone 时间
git clone --depth=1 https://github.com/user/repo.git

</code></pre><h2 id="gitclone单个文件夹" tabindex="-1"><a class="header-anchor" href="#gitclone单个文件夹"><span>gitclone单个文件夹</span></a></h2><pre><code>git config core.sparsecheckout true


 mkdir models # 创建一个与要clone的仓库同名或不同命的目录
 cd models
 git init #初始化
 git remote add origin  https://github.com/tensorflow/models.git # 增加远端的仓库地址
 git config core.sparsecheckout true # 设置Sparse Checkout 为true 
 echo &quot;research/deeplab&quot; &gt;&gt; .git/info/sparse-checkout # 将要部分clone的目录相对根目录的路径写入配置文件
 git pull --depth 1 origin master 
</code></pre>`,4),a=[i];function c(s,p){return o(),t("div",null,a)}const d=e(r,[["render",c],["__file","params.html.vue"]]),g=JSON.parse('{"path":"/git-tutor/tips/params.html","title":"技巧1","lang":"zh-CN","frontmatter":{"description":"技巧1 gitclone单个文件夹","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/tips/params.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"技巧1"}],["meta",{"property":"og:description","content":"技巧1 gitclone单个文件夹"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-10T18:06:56.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-10T18:06:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"技巧1\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-10T18:06:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"gitclone单个文件夹","slug":"gitclone单个文件夹","link":"#gitclone单个文件夹","children":[]}],"git":{"createdTime":1699639616000,"updatedTime":1699639616000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.46,"words":139},"filePathRelative":"git-tutor/tips/params.md","localizedDate":"2023年11月10日","autoDesc":true}');export{d as comp,g as data};
