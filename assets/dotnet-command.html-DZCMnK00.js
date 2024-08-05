import{_ as e,c as t,o,d as n}from"./app-CbULZrmi.js";const l={},a=n(`<h1 id="dotnet命令" tabindex="-1"><a class="header-anchor" href="#dotnet命令"><span>dotnet命令</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>最常用的dotnet命令</p><pre><code class="language-powershell">dotnet watch run
dotnet build
dotnet restore
dotnet tool install -g PowerShell
dotnet publish -r win-x64 -c Release -p:PublishSingleFile=true --self-contained false
</code></pre></div><h2 id="dotnet添加tab补全" tabindex="-1"><a class="header-anchor" href="#dotnet添加tab补全"><span>dotnet添加tab补全</span></a></h2><p><a href="https://docs.microsoft.com/zh-cn/dotnet/core/tools/enable-tab-autocomplete" target="_blank" rel="noopener noreferrer">官网</a></p><p>把下面的代码添加到powershell配置文件</p><pre><code class="language-powershell"># PowerShell parameter completion shim for the dotnet CLI
Register-ArgumentCompleter -Native -CommandName dotnet -ScriptBlock {
     param($commandName, $wordToComplete, $cursorPosition)
         dotnet complete --position $cursorPosition &quot;$wordToComplete&quot; | ForEach-Object {
            [System.Management.Automation.CompletionResult]::new($_, $_, &#39;ParameterValue&#39;, $_)
         }
 }
</code></pre><h2 id="安装全局工具" tabindex="-1"><a class="header-anchor" href="#安装全局工具"><span>安装全局工具</span></a></h2><pre><code class="language-powershell">dotnet tool install --global PowerShell
dotnet tool install -g PowerShell
</code></pre><h3 id="一些好用的全局工具" tabindex="-1"><a class="header-anchor" href="#一些好用的全局工具"><span>一些好用的全局工具</span></a></h3><p><a href="https://www.nuget.org/packages?packagetype=dotnettool&amp;sortby=totalDownloads-desc&amp;q=&amp;prerel=false" target="_blank" rel="noopener noreferrer">链接</a></p><pre><code class="language-powershell"># powershell安装
dotnet tool install -g PowerShell
# 根据editorconfig格式化cs代码
dotnet tool install --global dotnet-format --version 5.1.250801

dotnet tool install -g Microsoft.dotnet-interactive 
dotnet tool install --global dotnet-ef
dotnet tool install -g  Cake.Tool

dotnet tool install --global GitVersion.Tool 
# Octopus Deploy is an automated release management tool
dotnet tool install --global Octopus.DotNet.Cli 
# Dotnet CLI tool allowing you to run C# (CSX) scripts.
dotnet tool install --global dotnet-script --version 1.3.1
dotnet tool install --global Nuke.GlobalTool --version 6.2.1
# 更新所有的tool
dotnet tool install --global dotnetCampus.UpdateAllDotNetTools --version 1.0.7


# 卸载
dotnet tool uninstall dotnet-script -g
</code></pre><h2 id="打包发布" tabindex="-1"><a class="header-anchor" href="#打包发布"><span>打包发布</span></a></h2><p>使用msbuild <a href="https://docs.microsoft.com/zh-cn/visualstudio/msbuild/msbuild?view=vs-2022" target="_blank" rel="noopener noreferrer">使用msbuild</a> 打包程序 <a href="https://docs.microsoft.com/zh-cn/dotnet/core/deploying/deploy-with-cli" target="_blank" rel="noopener noreferrer">使用cli</a> 生成单个exe文件</p><p><a href="https://docs.microsoft.com/zh-cn/dotnet/core/deploying/single-file" target="_blank" rel="noopener noreferrer">打包生成单个文件</a></p><p>关于更多命令,见<a href="https://docs.microsoft.com/zh-cn/dotnet/core/tools/dotnet-run" target="_blank" rel="noopener noreferrer">官网</a></p><pre><code class="language-powershell">dotnet publish [&lt;PROJECT&gt;|&lt;SOLUTION&gt;] [-a|--arch &lt;ARCHITECTURE&gt;]
    [-c|--configuration &lt;CONFIGURATION&gt;]
    [-f|--framework &lt;FRAMEWORK&gt;] [--force] [--interactive]
    [--manifest &lt;PATH_TO_MANIFEST_FILE&gt;] [--no-build] [--no-dependencies]
    [--no-restore] [--nologo] [-o|--output &lt;OUTPUT_DIRECTORY&gt;]
    [--os &lt;OS&gt;] [-r|--runtime &lt;RUNTIME_IDENTIFIER&gt;]
    [--sc|--self-contained [true|false]] [--no-self-contained]
    [-s|--source &lt;SOURCE&gt;] [-v|--verbosity &lt;LEVEL&gt;]
    [--version-suffix &lt;VERSION_SUFFIX&gt;]

dotnet publish -h|--help
</code></pre><pre><code class="language-powershell">dotnet publish -r win-x64 -c Release -p:PublishSingleFile=true --self-contained false
# 依赖于框架的可执行文件
# --self-contained可以省略为--sc
dotnet publish -c Release -r &lt;RID&gt; --self-contained false
dotnet publish -c Release
# 独立部署
dotnet publish -c Release -r &lt;RID&gt; --self-contained true
</code></pre><p>其中rid</p><p>windows</p><ul><li>win-x64</li><li>win-x86</li></ul><p>linux</p><ul><li>linux-x64</li></ul><p>macos</p><ul><li>osx-x64</li></ul><p>部署的csproj</p><pre><code class="language-xml">&lt;Project Sdk=&quot;Microsoft.NET.Sdk&quot;&gt;

  &lt;PropertyGroup&gt;
    &lt;OutputType&gt;Exe&lt;/OutputType&gt;
    &lt;TargetFramework&gt;net6.0&lt;/TargetFramework&gt;
    &lt;PublishSingleFile&gt;true&lt;/PublishSingleFile&gt;
    &lt;SelfContained&gt;true&lt;/SelfContained&gt;
    &lt;RuntimeIdentifier&gt;win-x64&lt;/RuntimeIdentifier&gt;
    &lt;PublishReadyToRun&gt;true&lt;/PublishReadyToRun&gt;
  &lt;/PropertyGroup&gt;

&lt;/Project&gt;

</code></pre><ul><li>PublishSingleFile. 启用单文件发布。 此外，还会在 dotnet build 期间启用单文件警告。</li><li>SelfContained. 确定应用是独立的还是依赖于框架的。</li><li>RuntimeIdentifier. 指定目标 OS 和 CPU 类型。 默认情况下，还会设置 <code>&lt;SelfContained&gt;true&lt;/SelfContained&gt;</code>。</li><li>PublishReadyToRun. 启用预先 (AOT) 编译。</li></ul>`,27),r=[a];function i(s,d){return o(),t("div",null,r)}const p=e(l,[["render",i],["__file","dotnet-command.html.vue"]]),u=JSON.parse('{"path":"/csharp-tutor/basics/dotnet-command.html","title":"dotnet命令","lang":"zh-CN","frontmatter":{"description":"dotnet命令 提示 最常用的dotnet命令 dotnet添加tab补全 官网 把下面的代码添加到powershell配置文件 安装全局工具 一些好用的全局工具 链接 打包发布 使用msbuild 使用msbuild 打包程序 使用cli 生成单个exe文件 打包生成单个文件 关于更多命令,见官网 其中rid windows win-x64 win...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/csharp-tutor/basics/dotnet-command.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"dotnet命令"}],["meta",{"property":"og:description","content":"dotnet命令 提示 最常用的dotnet命令 dotnet添加tab补全 官网 把下面的代码添加到powershell配置文件 安装全局工具 一些好用的全局工具 链接 打包发布 使用msbuild 使用msbuild 打包程序 使用cli 生成单个exe文件 打包生成单个文件 关于更多命令,见官网 其中rid windows win-x64 win..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-20T13:56:22.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-01-20T13:56:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"dotnet命令\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-01-20T13:56:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"dotnet添加tab补全","slug":"dotnet添加tab补全","link":"#dotnet添加tab补全","children":[]},{"level":2,"title":"安装全局工具","slug":"安装全局工具","link":"#安装全局工具","children":[{"level":3,"title":"一些好用的全局工具","slug":"一些好用的全局工具","link":"#一些好用的全局工具","children":[]}]},{"level":2,"title":"打包发布","slug":"打包发布","link":"#打包发布","children":[]}],"git":{"createdTime":1653752204000,"updatedTime":1674222982000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":1.76,"words":529},"filePathRelative":"csharp-tutor/basics/dotnet-command.md","localizedDate":"2022年5月28日","autoDesc":true}');export{p as comp,u as data};
