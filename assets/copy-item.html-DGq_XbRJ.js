import{_ as e,c as o,o as t,d as n}from"./app-CbULZrmi.js";const l={},r=n(`<h1 id="复制" tabindex="-1"><a class="header-anchor" href="#复制"><span>复制</span></a></h1><p>PowerShell 中使用<code>Copy-Item</code>将一个项目从一个位置复制到另一个位置，可以是复制单个文件、也可以复制文件夹。</p><h2 id="复制文件和文件夹" tabindex="-1"><a class="header-anchor" href="#复制文件和文件夹"><span>复制文件和文件夹</span></a></h2><p>最简单的复制一个文件到另一个文件夹内，如果目标文件夹不存在会自动创建。</p><pre><code class="language-powershell">Copy-Item &quot;E:\\PowerShell\\form\\1.txt&quot; -Destination &quot;E:\\PowerShell\\to\\&quot;
</code></pre><p>如果<code>-Destination</code>参数是文件名，就会重命名文件。</p><pre><code class="language-powershell">Copy-Item &quot;E:\\PowerShell\\form\\1.txt&quot; -Destination &quot;E:\\PowerShell\\to\\2.txt&quot;
</code></pre><p>使用通配符可以复制文件夹内所有文件到另一个文件内，加上<code>-Recurse</code>就能复制所有的文件和子文件夹的内容。</p><pre><code class="language-powershell">Copy-Item &quot;E:\\PowerShell\\form\\*&quot; -Destination &quot;E:\\PowerShell\\to\\&quot; -Recurse
</code></pre><p>注意，在复制文件夹时，<strong>当 to 文件夹不存在时</strong>，效果和上面一样，但实际功能是<strong>复制 from 文件夹并且重命名为 to</strong>。 当 to 文件夹已存在时，最终的结果目录结构会是 <code>E:\\PowerShell\\to\\from\\</code>，也就是把整个 from 文件夹复制到 to 文件夹内。</p><pre><code class="language-powershell">Copy-Item &quot;E:\\PowerShell\\form\\&quot; -Destination &quot;E:\\PowerShell\\to\\ -Recurse&quot;
</code></pre><h2 id="排除和包含" tabindex="-1"><a class="header-anchor" href="#排除和包含"><span>排除和包含</span></a></h2><p>使用<code>-Filter</code>参数可以设置复制特定文件名的文件或文件夹，如下例子，如果文件夹名称是 *.txt 也会被复制。 注意，使用此参数时目标文件夹 to 必须是存在的，否则报错。</p><pre><code class="language-powershell">Copy-Item &quot;E:\\PowerShell\\from\\*&quot; -Destination &quot;E:\\PowerShell\\to\\&quot; -Filter &#39;*.txt&#39;
</code></pre><p>使用<code>-Exclude</code>或<code>-Include</code>参数来排除或包含文件或文件夹，值是单个文件名，或者是包含多个文件名称的数组，同样这里的文件名也包含文件夹名。</p><pre><code class="language-powershell">Copy-Item &quot;E:\\PowerShell\\from\\*&quot; -Destination &quot;E:\\PowerShell\\to\\&quot; -Exclude &#39;*.pdf&#39;
</code></pre><h2 id="不复制空文件夹" tabindex="-1"><a class="header-anchor" href="#不复制空文件夹"><span>不复制空文件夹</span></a></h2><p>可以通过判断文件夹内项目数量来确定文件夹是否为空。 首先通过<code>Get-ChildItem $from -Recurse</code>获取文件夹内所有的项目。 然后遍历每个项目，通过<code>$item.PSIsContainer</code>判断是否是文件夹，如果是文件夹且项目个数为 0 则跳过，否则就复制。 由于是按照单个项目来复制，所以需要通过替换原目录为新目录来设置目标路径。</p><pre><code class="language-powershell">$from = &quot;E:\\PowerShell\\from\\&quot;
$to = &quot;E:\\PowerShell\\to\\&quot;
$items = Get-ChildItem $from -Recurse
ForEach ($item in $items)
{
    if($item.PSIsContainer -and (Get-ChildItem $($item.FullName)).Count -eq 0)
    {
        Continue
    }else{
        $t = $item.Fullname.replace(&quot;$from&quot;,&quot;$to&quot;)
        Copy-Item $item.FullName -Destination $t
    }
}
</code></pre><h2 id="跳过和覆盖" tabindex="-1"><a class="header-anchor" href="#跳过和覆盖"><span>跳过和覆盖</span></a></h2><p>当复制单个文件时默认会直接覆盖同名文件，如果想跳过需要通过<code>Test-Path</code>来判断是否存在同名文件。</p><pre><code class="language-powershell">if(!(Test-Path &quot;E:\\PowerShell\\to\\1.txt&quot;)){
    Copy-Item &quot;E:\\PowerShell\\from\\1.txt&quot; &quot;E:\\PowerShell\\to\\1.txt&quot;
}else{
    Write-Host &quot;包含同名文件&quot;
}
</code></pre><p>但是当使用通配符复制文件夹内所有内容时，同名的文件夹默认并不会覆盖，而且会报错，这个时候加上<code>-Force</code>参数即可。</p><pre><code class="language-powershell">Copy-Item &quot;E:\\PowerShell\\from\\*&quot; &quot;E:\\PowerShell\\to\\&quot; -Recurse -Force\`
</code></pre><h2 id="显示复制进度" tabindex="-1"><a class="header-anchor" href="#显示复制进度"><span>显示复制进度</span></a></h2><p>Copy-Item 并没有参数来设置显示复制进度的功能，要显示进度需要用到<code>Write-Progress</code>。 显示复制单个文件的进度</p><pre><code class="language-powershell">function Copy-File {
    param( [string]$from, [string]$to)
    $ffile = [io.file]::OpenRead($from)
    $tofile = [io.file]::OpenWrite($to)
    try {
        [byte[]]$buff = new-object byte[] 4096
        [long]$total = [int]$count = 0
        do {
            $count = $ffile.Read($buff, 0, $buff.Length)
            $tofile.Write($buff, 0, $count)
            $total += $count
            if ($total % 1mb -eq 0) {
                Write-Progress -Activity &quot;从[$from]复制到[$to]&quot; -status &quot;复制中&quot; \`
                   -PercentComplete ([long]($total * 100 / $ffile.Length))
            }
        } while ($count -gt 0)
    }
    finally {
        $ffile.Dispose()
        $tofile.Dispose()
    }
}
$from = &quot;E:\\PowerShell\\from\\1.txt&quot;
$to = &quot;E:\\PowerShell\\to\\1.txt&quot;
Copy-File $from $to
</code></pre><p>显示复制多个文件的进度</p><pre><code class="language-powershell">function Copy-File{
    Param([string]$from,[string]$to)
    $Filelist=Get-Childitem &quot;$from&quot; –Recurse
    $Total=$Filelist.count
    $Position=0
 
    foreach ($File in $Filelist)
    {
        $Filename=$File.Fullname.replace($from,&#39;&#39;)
        $DestinationFile=($to+$Filename)
        Write-Progress -Activity &quot;从[$from]复制到[$to]&quot; -Status &quot;正在复制[$Filename]&quot; -PercentComplete (($Position/$total)*100)
        Copy-Item $File.FullName -Destination $DestinationFile
        $Position++
    }
 
}
$from = &quot;E:\\PowerShell\\from\\&quot;
$to = &quot;E:\\PowerShell\\to\\&quot;
Copy-File $from $to
</code></pre><p><em>参考：</em><em><a href="https://www.spguides.com/powershell-copy-item/" target="_blank" rel="noopener noreferrer">https://www.spguides.com/powershell-copy-item/</a></em><em><a href="https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/copy-item" target="_blank" rel="noopener noreferrer">https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/copy-item</a></em></p>`,30),i=[r];function a(s,c){return t(),o("div",null,i)}const u=e(l,[["render",a],["__file","copy-item.html.vue"]]),m=JSON.parse('{"path":"/windows-tutor/powershell/basics/copy-item.html","title":"复制","lang":"zh-CN","frontmatter":{"description":"复制 PowerShell 中使用Copy-Item将一个项目从一个位置复制到另一个位置，可以是复制单个文件、也可以复制文件夹。 复制文件和文件夹 最简单的复制一个文件到另一个文件夹内，如果目标文件夹不存在会自动创建。 如果-Destination参数是文件名，就会重命名文件。 使用通配符可以复制文件夹内所有文件到另一个文件内，加上-Recurse就能...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/powershell/basics/copy-item.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"复制"}],["meta",{"property":"og:description","content":"复制 PowerShell 中使用Copy-Item将一个项目从一个位置复制到另一个位置，可以是复制单个文件、也可以复制文件夹。 复制文件和文件夹 最简单的复制一个文件到另一个文件夹内，如果目标文件夹不存在会自动创建。 如果-Destination参数是文件名，就会重命名文件。 使用通配符可以复制文件夹内所有文件到另一个文件内，加上-Recurse就能..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-26T16:22:32.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-26T16:22:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"复制\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-26T16:22:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"复制文件和文件夹","slug":"复制文件和文件夹","link":"#复制文件和文件夹","children":[]},{"level":2,"title":"排除和包含","slug":"排除和包含","link":"#排除和包含","children":[]},{"level":2,"title":"不复制空文件夹","slug":"不复制空文件夹","link":"#不复制空文件夹","children":[]},{"level":2,"title":"跳过和覆盖","slug":"跳过和覆盖","link":"#跳过和覆盖","children":[]},{"level":2,"title":"显示复制进度","slug":"显示复制进度","link":"#显示复制进度","children":[]}],"git":{"createdTime":1653582152000,"updatedTime":1653582152000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.12,"words":937},"filePathRelative":"windows-tutor/powershell/basics/copy-item.md","localizedDate":"2022年5月26日","autoDesc":true}');export{u as comp,m as data};
