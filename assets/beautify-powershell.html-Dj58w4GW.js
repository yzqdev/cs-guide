import{_ as t,c as o,o as e,d as n}from"./app-CbULZrmi.js";const l={},a=n(`<h1 id="powershell美化" tabindex="-1"><a class="header-anchor" href="#powershell美化"><span>powershell美化</span></a></h1><h2 id="改造powershell" tabindex="-1"><a class="header-anchor" href="#改造powershell"><span><strong>改造PowerShell</strong></span></a></h2><p>默认的PowerShell并不美观，仅仅是将原来“傻大黑”变成了“傻大蓝”。（由于我的PowerShell已经改造过了所以我这里就没有办法截图了）我们的做法是在PowerShell里面加一个PowerLine，然后剩下的，在Terminal中配置。</p><h3 id="安装posh-git" tabindex="-1"><a class="header-anchor" href="#安装posh-git"><span>安装posh-git</span></a></h3><pre><code class="language-powershell">PowerShellGet\\Install-Module posh-git -Scope CurrentUser -Force
</code></pre><h3 id="安装psreadline" tabindex="-1"><a class="header-anchor" href="#安装psreadline"><span>安装PSReadLine</span></a></h3><pre><code class="language-powershell">Install-Module -Name PowerShellGet -Force
</code></pre><h3 id="安装terminal-icons" tabindex="-1"><a class="header-anchor" href="#安装terminal-icons"><span>安装terminal-icons</span></a></h3><p><a href="https://github.com/devblackops/Terminal-Icons" target="_blank" rel="noopener noreferrer">github地址</a></p><pre><code class="language-powershell">Install-Module -Name Terminal-Icons -Repository PSGallery
</code></pre><p>然后在<code>$profile</code>加入</p><pre><code class="language-powershell">Import-Module -Name Terminal-Icons
</code></pre><h2 id="安装psscripttools" tabindex="-1"><a class="header-anchor" href="#安装psscripttools"><span>安装PSScriptTools</span></a></h2><p><a href="https://github.com/jdhitsolutions/PSScriptTools" target="_blank" rel="noopener noreferrer">https://github.com/jdhitsolutions/PSScriptTools</a></p><h2 id="安装yarn-completion" tabindex="-1"><a class="header-anchor" href="#安装yarn-completion"><span>安装yarn completion</span></a></h2><p><a href="https://github.com/PowerShell-Completion/yarn-completion" target="_blank" rel="noopener noreferrer">https://github.com/PowerShell-Completion/yarn-completion</a></p><h2 id="安装maven-completion" tabindex="-1"><a class="header-anchor" href="#安装maven-completion"><span>安装maven completion</span></a></h2><p><a href="https://github.com/krymtkts/MavenAutoCompletion" target="_blank" rel="noopener noreferrer">https://github.com/krymtkts/MavenAutoCompletion</a></p><h3 id="startship" tabindex="-1"><a class="header-anchor" href="#startship"><span>startship</span></a></h3><p><a href="https://starship.rs/zh-CN/guide/#%F0%9F%9A%80-%E5%AE%89%E8%A3%85" target="_blank" rel="noopener noreferrer">https://starship.rs/zh-CN/guide/#🚀-安装</a></p><pre><code>scoop install starship
</code></pre><h3 id="startship配置" tabindex="-1"><a class="header-anchor" href="#startship配置"><span>startship配置</span></a></h3><pre><code class="language-toml">scan_timeout = 10
command_timeout = 3000
[directory]
truncation_length = 8
truncate_to_repo = false
[package]
disabled = true
# [status]
# style = &quot;bg:blue&quot;
# symbol = &quot; &quot;
# format = &#39;[\\[$symbol $common_meaning$signal_name$maybe_int\\]]($style) &#39;
# map_symbol = true
# disabled = false
# [username]
# style_user = &quot;white bold&quot;
# style_root = &quot;black bold&quot;
# format = &quot;[$user]($style) &quot;
# disabled = false
# show_always = true
# truncation_symbol = &#39;…/&#39;

[time]
disabled = true
format = &#39;[\\[ $time \\]]($style) &#39;
time_format = &quot;%T&quot;
utc_time_offset = &quot;+8&quot;
[bun]
format = &quot;via [$symbol]($style)&quot;

[buf]
format = &quot;via [$symbol]($style)&quot;

[cmake]
format = &quot;via [$symbol]($style)&quot;

[cobol]
format = &quot;via [$symbol]($style)&quot;

[crystal]
format = &quot;via [$symbol]($style)&quot;

[daml]
format = &quot;via [$symbol]($style)&quot;

[dart]
format = &quot;via [$symbol]($style)&quot;

[deno]
format = &quot;via [$symbol]($style)&quot;

[dotnet]
format = &quot;[$symbol(🎯 $tfm )]($style)&quot;

[elixir]
format = &#39;via [$symbol]($style)&#39;

[elm]
format = &#39;via [$symbol]($style)&#39;

[erlang]
format = &#39;via [$symbol]($style)&#39;

[fennel]
format = &#39;via [$symbol]($style)&#39;

[golang]
format = &#39;via [$symbol]($style)&#39;

[gradle]
format = &#39;via [$symbol]($style)&#39;

[haxe]
format = &#39;via [$symbol]($style)&#39;

[helm]
format = &#39;via [$symbol]($style)&#39;

[java]
format = &#39;via [$symbol]($style)&#39;

[julia]
format = &#39;via [$symbol]($style)&#39;

[kotlin]
format = &#39;via [$symbol]($style)&#39;

[lua]
format = &#39;via [$symbol]($style)&#39;

[meson]
format = &#39;via [$symbol]($style)&#39;

[nim]
format = &#39;via [$symbol]($style)&#39;

[nodejs]
format = &#39;via [$symbol]($style)&#39;

[ocaml]
format = &#39;via [$symbol(\\($switch_indicator$switch_name\\) )]($style)&#39;

[opa]
format = &#39;via [$symbol]($style)&#39;

[perl]
format = &#39;via [$symbol]($style)&#39;

[php]
format = &#39;via [$symbol]($style)&#39;

[pulumi]
format = &#39;via [$symbol$stack]($style)&#39;

[purescript]
format = &#39;via [$symbol]($style)&#39;

[python]
format = &#39;via [$symbol]($style)&#39;

[raku]
format = &#39;via [$symbol]($style)&#39;

[red]
format = &#39;via [$symbol]($style)&#39;

[rlang]
format = &#39;via [$symbol]($style)&#39;

[ruby]
format = &#39;via [$symbol]($style)&#39;

[rust]
format = &#39;via [$symbol]($style)&#39;

[solidity]
format = &#39;via [$symbol]($style)&#39;

[swift]
format = &#39;via [$symbol]($style)&#39;

[vagrant]
format = &#39;via [$symbol]($style)&#39;

[vlang]
format = &#39;via [$symbol]($style)&#39;

[zig]
format = &#39;via [$symbol]($style)&#39;
[git_branch]
disabled =false
[git_commit]
disabled =true
[git_state]
disabled = false
[git_metrics]
disabled = true
[git_status]
disabled = false

</code></pre><h3 id="安装oh-my-posh" tabindex="-1"><a class="header-anchor" href="#安装oh-my-posh"><span>安装oh-my-posh</span></a></h3><h3 id="linux安装" tabindex="-1"><a class="header-anchor" href="#linux安装"><span>linux安装</span></a></h3><p><a href="https://ohmyposh.dev/docs/installation/linux" target="_blank" rel="noopener noreferrer">https://ohmyposh.dev/docs/installation/linux</a></p><h3 id="windows安装" tabindex="-1"><a class="header-anchor" href="#windows安装"><span>windows安装</span></a></h3><p>地址<a href="https://ohmyposh.dev/" target="_blank" rel="noopener noreferrer">https://ohmyposh.dev/</a><br> 推荐在windows商店下载oh-my-sh或者在<a href="https://github.com/JanDeDobbeleer/oh-my-posh/releases" target="_blank" rel="noopener noreferrer">https://github.com/JanDeDobbeleer/oh-my-posh/releases</a>下载<code>install-amd64.exe</code>自行安装</p><p>然后在<code>$profile</code>添加</p><pre><code class="language-shell">oh-my-posh init pwsh --config &quot;$env:POSH_THEMES_PATH\\negligible.omp.json&quot;|Invoke-Expression
</code></pre><p>安装PowerLine的方法很简单，我们要先安装oh-my-posh，首先打开一个PowerShell，输入</p><pre><code class="language-powershell">Install-Module posh-git -Scope CurrentUser
https://ohmyposh.dev/
</code></pre><p>如果你使用管理员权限打开PowerShell并且想把oh-my-posh安装到所有用户，则输入</p><pre><code class="language-powershell">Install-Module posh-git
 
</code></pre><p><strong>如果你的电脑里没有安装Git，在输入</strong><code>**Import-Module posh-git**</code><strong>会报错，解决方法是</strong><a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer"><strong>安装Git</strong></a><strong>或者把这一行去掉。</strong></p><p>但是这次使用<code>Import-Module</code>的指令，再次启动PowerShell就会发现没有效果，这是因为这些指令仅限于本次会话的PowerShell有效，因此，若要使这一效果在每次启动的时候都有效，那就要将其添加到启动脚本中。</p><p>在PowerShell中输入<code>kate $profile</code> ，然后输入以下内容，保存。如果你没有安装kate，则使用<code>notepad $profile</code>。</p><pre><code class="language-powershell">Import-Module posh-git
 
</code></pre><p>如果提示禁止执行脚本之类的错误信息，请将脚本执行策略更改为<code>RemoteSigned</code>。具体方法为使用具有管理员权限的PowerShell，然后输入</p><pre><code class="language-powershell">Set-ExecutionPolicy RemoteSigned
</code></pre><p>这样，在每次PoweShell打开的时候都能启用PowerLine主题。</p><p>可是这样，PowerShell打开的时候仍有乱码（或者说，有违和感），这是因为没有给你使用的字体链接表情，乱码的地方其实就是表情符号。</p><p>我喜欢的oh-my-posh主题 <code>negligible</code> <code>pure</code> <code>ys</code><code>paradox</code> <code>powerlevel10k_classic</code>, <code>powerlevel10k_lean</code></p><blockquote><p>一个修改后的negligible主题</p></blockquote><pre><code class="language-json">{
  &quot;$schema&quot;: &quot;https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/schema.json&quot;,
  &quot;blocks&quot;: [
    {
      &quot;alignment&quot;: &quot;left&quot;,
      &quot;segments&quot;: [
        {
          &quot;foreground&quot;: &quot;cyan&quot;,
          &quot;style&quot;: &quot;powerline&quot;,
          &quot;template&quot;: &quot;{{ if .WSL }}WSL at {{ end }}{{.Icon}}&quot;,
          &quot;type&quot;: &quot;os&quot;
        },
        {
          &quot;foreground&quot;: &quot;cyan&quot;,
          &quot;properties&quot;: {
            &quot;style&quot;: &quot;full&quot;
          },
          &quot;style&quot;: &quot;plain&quot;,
          &quot;template&quot;: &quot; {{ .Path }} &quot;,
          &quot;type&quot;: &quot;path&quot;
        },
        {
          &quot;foreground&quot;: &quot;#F1502F&quot;,
          &quot;properties&quot;: {
            &quot;fetch_status&quot;: true
          },
          &quot;style&quot;: &quot;plain&quot;,
          &quot;template&quot;: &quot;:: {{ .HEAD }}{{ .BranchStatus }}{{ if .Staging.Changed }} \\uf046 {{ .Staging.String }}{{ end }}{{ if and (.Working.Changed) (.Staging.Changed) }} |{{ end }}{{ if .Working.Changed }} \\uf044 {{ .Working.String }}{{ end }} &quot;,
          &quot;type&quot;: &quot;git&quot;
        }
      ],
      &quot;type&quot;: &quot;prompt&quot;
    },
    {
      &quot;alignment&quot;: &quot;right&quot;,
      &quot;segments&quot;: [
        {
          &quot;foreground&quot;: &quot;red&quot;,
          &quot;style&quot;: &quot;plain&quot;,
          &quot;template&quot;: &quot;| root &quot;,
          &quot;type&quot;: &quot;root&quot;
        },
        {
          &quot;foreground&quot;: &quot;#06A4CE&quot;,
          &quot;style&quot;: &quot;powerline&quot;,
          &quot;template&quot;: &quot;| \\ue798 {{ if .Error }}{{ .Error }}{{ else }}{{ .Full }}{{ end }} &quot;,
          &quot;type&quot;: &quot;dart&quot;
        },
        {
          &quot;foreground&quot;: &quot;#6CA35E&quot;,
          &quot;style&quot;: &quot;powerline&quot;,
          &quot;template&quot;: &quot;| \\ue718 {{ if .PackageManagerIcon }}{{ .PackageManagerIcon }} {{ end }}{{ .Full }} &quot;,
          &quot;type&quot;: &quot;node&quot;
        },
        {
          &quot;foreground&quot;: &quot;#4584b6&quot;,
          &quot;properties&quot;: {
            &quot;display_mode&quot;: &quot;context&quot;,
            &quot;fetch_virtual_env&quot;: true
          },
          &quot;style&quot;: &quot;plain&quot;,
          &quot;template&quot;: &quot;| \\ue235 {{ .Venv }} &quot;,
          &quot;type&quot;: &quot;python&quot;
        },
        {
          &quot;type&quot;: &quot;dotnet&quot;,
          &quot;style&quot;: &quot;powerline&quot;,
          &quot;foreground&quot;: &quot;#00ffff&quot;,
          &quot;template&quot;: &quot;| \\uE77F {{ .Full }} &quot;
        },
        {
          &quot;type&quot;: &quot;flutter&quot;,
          &quot;style&quot;: &quot;powerline&quot;,
          &quot;foreground&quot;: &quot;#1389fd&quot;,
          &quot;template&quot;: &quot;| \\ue28e {{ if .Error }}{{ .Error }}{{ else }}{{ .Full }}{{ end }} &quot;
        },
        {
          &quot;type&quot;: &quot;java&quot;,
          &quot;style&quot;: &quot;powerline&quot;,
          &quot;foreground&quot;: &quot;#ce2c00&quot;,
          &quot;template&quot;: &quot;| \\uE738 {{ .Full }}&quot;
        },
        {
          &quot;foreground&quot;: &quot;lightGreen&quot;,
          &quot;style&quot;: &quot;plain&quot;,
          &quot;template&quot;: &quot;| {{ .CurrentDate | date .Format }} &quot;,
          &quot;type&quot;: &quot;time&quot;
        }
      ],
      &quot;type&quot;: &quot;prompt&quot;
    },
    {
      &quot;alignment&quot;: &quot;left&quot;,
      &quot;newline&quot;: true,
      &quot;segments&quot;: [
        {
          &quot;foreground&quot;: &quot;lightGreen&quot;,
          &quot;foreground_templates&quot;: [
            &quot;{{ if gt .Code 0 }}red{{ end }}&quot;
          ],
          &quot;properties&quot;: {
            &quot;always_enabled&quot;: true
          },
          &quot;style&quot;: &quot;powerline&quot;,
          &quot;template&quot;: &quot;\\u279c &quot;,
          &quot;type&quot;: &quot;exit&quot;
        }
      ],
      &quot;type&quot;: &quot;prompt&quot;
    }
  ],
  &quot;version&quot;: 2
}
</code></pre>`,45),r=[a];function s(u,i){return e(),o("div",null,r)}const q=t(l,[["render",s],["__file","beautify-powershell.html.vue"]]),h=JSON.parse('{"path":"/windows-tutor/powershell/beautify-powershell.html","title":"powershell美化","lang":"zh-CN","frontmatter":{"description":"powershell美化 改造PowerShell 默认的PowerShell并不美观，仅仅是将原来“傻大黑”变成了“傻大蓝”。（由于我的PowerShell已经改造过了所以我这里就没有办法截图了）我们的做法是在PowerShell里面加一个PowerLine，然后剩下的，在Terminal中配置。 安装posh-git 安装PSReadLine 安装...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/powershell/beautify-powershell.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"powershell美化"}],["meta",{"property":"og:description","content":"powershell美化 改造PowerShell 默认的PowerShell并不美观，仅仅是将原来“傻大黑”变成了“傻大蓝”。（由于我的PowerShell已经改造过了所以我这里就没有办法截图了）我们的做法是在PowerShell里面加一个PowerLine，然后剩下的，在Terminal中配置。 安装posh-git 安装PSReadLine 安装..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-19T03:14:18.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-19T03:14:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"powershell美化\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-19T03:14:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"改造PowerShell","slug":"改造powershell","link":"#改造powershell","children":[{"level":3,"title":"安装posh-git","slug":"安装posh-git","link":"#安装posh-git","children":[]},{"level":3,"title":"安装PSReadLine","slug":"安装psreadline","link":"#安装psreadline","children":[]},{"level":3,"title":"安装terminal-icons","slug":"安装terminal-icons","link":"#安装terminal-icons","children":[]}]},{"level":2,"title":"安装PSScriptTools","slug":"安装psscripttools","link":"#安装psscripttools","children":[]},{"level":2,"title":"安装yarn completion","slug":"安装yarn-completion","link":"#安装yarn-completion","children":[]},{"level":2,"title":"安装maven completion","slug":"安装maven-completion","link":"#安装maven-completion","children":[{"level":3,"title":"startship","slug":"startship","link":"#startship","children":[]},{"level":3,"title":"startship配置","slug":"startship配置","link":"#startship配置","children":[]},{"level":3,"title":"安装oh-my-posh","slug":"安装oh-my-posh","link":"#安装oh-my-posh","children":[]},{"level":3,"title":"linux安装","slug":"linux安装","link":"#linux安装","children":[]},{"level":3,"title":"windows安装","slug":"windows安装","link":"#windows安装","children":[]}]}],"git":{"createdTime":1647861419000,"updatedTime":1700363658000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":10}]},"readingTime":{"minutes":3.56,"words":1067},"filePathRelative":"windows-tutor/powershell/beautify-powershell.md","localizedDate":"2022年3月21日","autoDesc":true}');export{q as comp,h as data};
