import{_ as e,c as l,o as t,d as o}from"./app-CbULZrmi.js";const n={},r=o(`<h1 id="powershell命令" tabindex="-1"><a class="header-anchor" href="#powershell命令"><span>powershell命令</span></a></h1><h2 id="powershell模块" tabindex="-1"><a class="header-anchor" href="#powershell模块"><span>powershell模块</span></a></h2><p><a href="https://learn.microsoft.com/zh-cn/powershell/scripting/developer/module/understanding-a-windows-powershell-module?view=powershell-7.3" target="_blank" rel="noopener noreferrer">https://learn.microsoft.com/zh-cn/powershell/scripting/developer/module/understanding-a-windows-powershell-module?view=powershell-7.3</a></p><h2 id="删除命令" tabindex="-1"><a class="header-anchor" href="#删除命令"><span>删除命令</span></a></h2><pre><code class="language-powershell"># 删除指定文件
 Remove-Item * -Include *.json -Recurse
# 删除文件而保留文件夹
# 「This example deletes all of the files that have names that include a dot (.) 」
 Remove-Item * -Include *.* -Exclude *.md -Recurse
# 删除包含指定字符的文件夹
# 一定要注意加上通配符「*bin*」，否则只会删除bin这样的文件夹
Remove-Item * -Recurse -Include *bin*

</code></pre><h2 id="获取文件夹内文件个数" tabindex="-1"><a class="header-anchor" href="#获取文件夹内文件个数"><span>获取文件夹内文件个数</span></a></h2><pre><code class="language-powershell">@(Get-ChildItem -Exclude .\\node_modules\\,.cache,.temp -r).Count
</code></pre><h2 id="获取文件夹大小" tabindex="-1"><a class="header-anchor" href="#获取文件夹大小"><span>获取文件夹大小</span></a></h2><pre><code class="language-powershell">switch((ls -r|measure -sum Length).Sum) {
  {$_ -gt 1GB} {
    &#39;{0:0.0} GiB&#39; -f ($_/1GB)
    break
  }
  {$_ -gt 1MB} {
    &#39;{0:0.0} MiB&#39; -f ($_/1MB)
    break
  }
  {$_ -gt 1KB} {
    &#39;{0:0.0} KiB&#39; -f ($_/1KB)
    break
  }
  default {&quot;$_ bytes&quot; }
}
</code></pre><h2 id="遍历一个文件夹-并排除node-modules" tabindex="-1"><a class="header-anchor" href="#遍历一个文件夹-并排除node-modules"><span>遍历一个文件夹,并排除node_modules</span></a></h2><pre><code class="language-powershell">@(Get-ChildItem   -Exclude node_module*|Get-ChildItem -r).Count

Get-ChildItem -Path E:\\WebstormProjects\\  -Exclude node_module*|Get-ChildItem -r

多层
@(Get-ChildItem -Exclude node_module*|Get-ChildItem -Exclude node_module*|Get-ChildItem -Exclude node_module*|Get-ChildItem -Exclude node_module*|Get-ChildItem -Exclude node_module*|Get-ChildItem -Exclude node_module*|Get-ChildItem -Exclude node_module*).Count
</code></pre><h2 id="删除-文件" tabindex="-1"><a class="header-anchor" href="#删除-文件"><span>删除._文件</span></a></h2><pre><code class="language-powershell">dir ._* /a/s 

del ._* /a/s
</code></pre><h2 id="powershell查看运行时间" tabindex="-1"><a class="header-anchor" href="#powershell查看运行时间"><span>powershell查看运行时间</span></a></h2><pre><code class="language-powershell">(Measure-Command {ping baidu.com}).TotalSeconds
</code></pre><h3 id="在我的配置文件里面引用模块" tabindex="-1"><a class="header-anchor" href="#在我的配置文件里面引用模块"><span>在我的配置文件里面引用模块</span></a></h3><p><strong>Microsoft.PowerShell_profile.ps1</strong></p><pre><code class="language-powershell">. $PSScriptRoot\\myalias.ps1
</code></pre><h2 id="命令行运行wpf" tabindex="-1"><a class="header-anchor" href="#命令行运行wpf"><span>命令行运行wpf</span></a></h2><pre><code class="language-powershell">dotnet watch run
</code></pre><p>不过console.write不会生效 需要把<code>&lt;OutputType&gt;WinExe&lt;/OutputType&gt;</code>改为<code>&lt;OutputType&gt;Exe&lt;/OutputType&gt;</code></p><h2 id="dotnet发布" tabindex="-1"><a class="header-anchor" href="#dotnet发布"><span>dotnet发布</span></a></h2><p>发布单文件</p><pre><code class="language-xml">&lt;Project Sdk=&quot;Microsoft.NET.Sdk&quot;&gt;

  &lt;PropertyGroup&gt;
    &lt;OutputType&gt;Exe&lt;/OutputType&gt;
    &lt;TargetFramework&gt;net6.0&lt;/TargetFramework&gt;
    &lt;PublishSingleFile&gt;true&lt;/PublishSingleFile&gt;
    &lt;SelfContained&gt;true&lt;/SelfContained&gt;
    &lt;RuntimeIdentifier&gt;win-x64&lt;/RuntimeIdentifier&gt;
    &lt;PublishReadyToRun&gt;true&lt;/PublishReadyToRun&gt;
  &lt;/PropertyGroup&gt;

&lt;/Project&gt;
</code></pre><p><a href="https://learn.microsoft.com/zh-cn/dotnet/core/deploying/single-file/overview?tabs=cli" target="_blank" rel="noopener noreferrer">https://learn.microsoft.com/zh-cn/dotnet/core/deploying/single-file/overview?tabs=cli</a></p>`,25),s=[r];function a(d,i){return t(),l("div",null,s)}const h=e(n,[["render",a],["__file","powershell.html.vue"]]),c=JSON.parse('{"path":"/cs-tips/shell/powershell.html","title":"powershell命令","lang":"zh-CN","frontmatter":{"description":"powershell命令 powershell模块 https://learn.microsoft.com/zh-cn/powershell/scripting/developer/module/understanding-a-windows-powershell-module?view=powershell-7.3 删除命令 获取文件夹内文件个数 获...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/shell/powershell.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"powershell命令"}],["meta",{"property":"og:description","content":"powershell命令 powershell模块 https://learn.microsoft.com/zh-cn/powershell/scripting/developer/module/understanding-a-windows-powershell-module?view=powershell-7.3 删除命令 获取文件夹内文件个数 获..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-27T13:03:42.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-27T13:03:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"powershell命令\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-27T13:03:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"powershell模块","slug":"powershell模块","link":"#powershell模块","children":[]},{"level":2,"title":"删除命令","slug":"删除命令","link":"#删除命令","children":[]},{"level":2,"title":"获取文件夹内文件个数","slug":"获取文件夹内文件个数","link":"#获取文件夹内文件个数","children":[]},{"level":2,"title":"获取文件夹大小","slug":"获取文件夹大小","link":"#获取文件夹大小","children":[]},{"level":2,"title":"遍历一个文件夹,并排除node_modules","slug":"遍历一个文件夹-并排除node-modules","link":"#遍历一个文件夹-并排除node-modules","children":[]},{"level":2,"title":"删除._文件","slug":"删除-文件","link":"#删除-文件","children":[]},{"level":2,"title":"powershell查看运行时间","slug":"powershell查看运行时间","link":"#powershell查看运行时间","children":[{"level":3,"title":"在我的配置文件里面引用模块","slug":"在我的配置文件里面引用模块","link":"#在我的配置文件里面引用模块","children":[]}]},{"level":2,"title":"命令行运行wpf","slug":"命令行运行wpf","link":"#命令行运行wpf","children":[]},{"level":2,"title":"dotnet发布","slug":"dotnet发布","link":"#dotnet发布","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1711544622000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":1.15,"words":345},"filePathRelative":"cs-tips/shell/powershell.md","localizedDate":"2023年5月25日","autoDesc":true}');export{h as comp,c as data};
