import{_ as e,c as o,o as l,d as a}from"./app-CbULZrmi.js";const t={},c=a(`<h1 id="别名alias" tabindex="-1"><a class="header-anchor" href="#别名alias"><span>别名alias</span></a></h1><pre><code class="language-powershell">function fluship{
    ipconfig /flushdns
}
function yarnDev{
    yarn&amp;&amp;yarn dev
}
Set-Alias ip fluship
Set-Alias y yarnDev
</code></pre><p><code>PowerShell</code>在Windows10中的地位被慢慢提高，在最近的系统版本中，Powershell已经在资源管理器中完全代替以前的<code>cmd</code>出现。所以我本人也逐渐把运行命令的习惯向PowerShell迁移。 在使用过程中发现PowerShell虽然默认支持类似Unix系统的<code>ls</code>命令，但是其默认展示方式是非常详细的，包括<code>Mode</code>，<code>LastWriteTime</code>,<code>Length</code>和 <code>Name</code>共4个字段。这里的<code>ls</code>其实是PowerShell命令<code>Get-ChildItem</code>的一个别名，显示效果如下：</p><pre><code class="language-powershell">PS D:\\apktool&gt; get-childitem


    Directory: D:\\apktool


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----        2/23/2016     20:15            159 apktool.bat
-a----        2/23/2016     20:16        6433219 apktool.jar
</code></pre><p>而在实际工作中，其实我是比较喜欢用<code>ls</code>命令只显示文件名。那么在PowerShell中默认的命令需要输入<code>ls -Name</code>或<code>Get-ChildItem -Name</code>来实现。 下面来说说一些关于PowerShell中设置命令别名Alias的常用相关命令和方法：</p><p><em>以下命令中的大小写不敏感</em>：</p><h2 id="查看别名" tabindex="-1"><a class="header-anchor" href="#查看别名"><span>查看别名</span></a></h2><ul><li>查看此Session中已经设定的所有别名：<code>Get-Alias</code>或<code>gal</code></li></ul><pre><code class="language-text"> Get-Alias
CommandType     Name
-----------     ----
Alias           % -&gt; ForEach-Object
Alias           ? -&gt; Where-Object
Alias           ac -&gt; Add-Content
Alias           asnp -&gt; Add-PSSnapin
</code></pre><ul><li>查看某别名的原命令，如<code>ls</code>的原命令：<code>&gt; Get-Alias ls</code></li><li>查看某原命令的别名，如<code>Get-ChildItem</code>的别名：<code>&gt; Get-Alias -Definition Get-ChildItem</code></li></ul><h2 id="创建或更改别名" tabindex="-1"><a class="header-anchor" href="#创建或更改别名"><span>创建或更改别名</span></a></h2><h3 id="创建不带参数的别名" tabindex="-1"><a class="header-anchor" href="#创建不带参数的别名"><span>创建不带参数的别名</span></a></h3><p>使用<code>Set-Alias</code>命令创建或更改别名。注意使用该命令设定的别名只在目前的Windows PowerShell session中生效。也就是说在关闭此会话后这个别名将会失效。<em>如何创建永久的别名？往下看</em>。 如为<code>Get-ChildItem</code>命令设定别名<code>list</code>：</p><pre><code class="language-powershelltext"> Set-Alias -Name list -Value get-childitem
</code></pre><p>或简单一些：</p><pre><code class="language-powershelltext"> Set-Alias list get-childitem
</code></pre><p><em>注意：对于系统默认设定的别名，不可在删除此别名之前重新对这个别名赋值。</em> 另外，PowerShell中还有一个命令<code>New-Alias</code>，该命令和<code>Set-Alias</code>基本功能一样，只是前者不能<strong>更改</strong>别名，只能<strong>创建</strong>别名。当试图使用<code>New-Alias</code>命令创建已存在的别名时，会报错。</p><h3 id="创建或更改带参数的别名" tabindex="-1"><a class="header-anchor" href="#创建或更改带参数的别名"><span>创建或更改带参数的别名</span></a></h3><p>如果命令带参数如想为<code>Get-ChildItem -Name</code>设定别名为<code>ls</code>则我们需要两步，第一步为这个带参数原命令设定一个中间<code>function</code>，第二步为这个function指定别名：</p><pre><code class="language-powershell"> function getlist {Get-ChildItem -Name}
 Set-Alias ls getlist
</code></pre><h2 id="删除别名" tabindex="-1"><a class="header-anchor" href="#删除别名"><span>删除别名</span></a></h2><p>使用<code>Remove-Item alias</code>命令删除已设定的别名。 如删除别名<code>ls</code>：</p><pre><code class="language-powershell"> Remove-Item alias:\\ls
</code></pre><h2 id="创建永久的别名" tabindex="-1"><a class="header-anchor" href="#创建永久的别名"><span>创建永久的别名</span></a></h2><p>在PowerShell中直接使用<code>Set-Alias</code>或<code>New-Alias</code>命令创建的别名在关闭此Session后即会失效，防止此现象的方法是将此命令写入<code>Windows PowerShell profile</code>文件。 查看此文件在计算机中的位置：</p><pre><code class="language-powershell"> $profile
</code></pre><p>一般该文件在没有创建前是不存在的，使用以下命令为当前用户创建profile命令并返回文件地址：</p><pre><code class="language-powershell"> New-Item -Type file -Force $profile
</code></pre><p>一般创建的位置在<code>~\\Documents\\WindowsPowerShell\\Microsoft.PowerShell_profile.ps1</code> 打开文件，键入文件内容为<code>Get-ChildItem -Name</code>创建别名<code>ls</code>：</p><pre><code class="language-powershell">function fluship{
ipconfig /flushdns
}

Set-Alias ip fluship
</code></pre><p>这里首先为<code>Get-ChildItem -Name</code>创建了方法<code>getFileName</code>作为中介，然后为该方法赋予别名<code>ls</code>，但是因为<code>ls</code>是Windows PowerShell中的默认别名，因此必须先删除再创建，所以先使用<code>Remove-Item</code>再使用<code>Set-Alias</code>或<code>New-Alias</code>。 以后每次在打开PowerShell会话框的时候其会先读取<code>$profile</code>文件中的内容。</p><p>试试效果：</p><pre><code class="language-powershell">PS D:\\apktool&gt; ls
apktool.bat
apktool.jar
</code></pre>`,33),d=[c];function s(i,n){return l(),o("div",null,d)}const p=e(t,[["render",s],["__file","my-alias.html.vue"]]),h=JSON.parse('{"path":"/windows-tutor/powershell/basics/my-alias.html","title":"别名alias","lang":"zh-CN","frontmatter":{"description":"别名alias PowerShell在Windows10中的地位被慢慢提高，在最近的系统版本中，Powershell已经在资源管理器中完全代替以前的cmd出现。所以我本人也逐渐把运行命令的习惯向PowerShell迁移。 在使用过程中发现PowerShell虽然默认支持类似Unix系统的ls命令，但是其默认展示方式是非常详细的，包括Mode，LastW...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/powershell/basics/my-alias.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"别名alias"}],["meta",{"property":"og:description","content":"别名alias PowerShell在Windows10中的地位被慢慢提高，在最近的系统版本中，Powershell已经在资源管理器中完全代替以前的cmd出现。所以我本人也逐渐把运行命令的习惯向PowerShell迁移。 在使用过程中发现PowerShell虽然默认支持类似Unix系统的ls命令，但是其默认展示方式是非常详细的，包括Mode，LastW..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-19T03:14:18.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-19T03:14:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"别名alias\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-19T03:14:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"查看别名","slug":"查看别名","link":"#查看别名","children":[]},{"level":2,"title":"创建或更改别名","slug":"创建或更改别名","link":"#创建或更改别名","children":[{"level":3,"title":"创建不带参数的别名","slug":"创建不带参数的别名","link":"#创建不带参数的别名","children":[]},{"level":3,"title":"创建或更改带参数的别名","slug":"创建或更改带参数的别名","link":"#创建或更改带参数的别名","children":[]}]},{"level":2,"title":"删除别名","slug":"删除别名","link":"#删除别名","children":[]},{"level":2,"title":"创建永久的别名","slug":"创建永久的别名","link":"#创建永久的别名","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1700363658000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":3.09,"words":928},"filePathRelative":"windows-tutor/powershell/basics/my-alias.md","localizedDate":"2022年3月21日","autoDesc":true}');export{p as comp,h as data};
