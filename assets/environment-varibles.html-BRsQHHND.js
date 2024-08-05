import{_ as e,c as t,o as n,d as o}from"./app-CbULZrmi.js";const r="/cs-guide/assets/img1-DIkFVlUS.png",a="/cs-guide/assets/image-DK4q46c1.png",i={},s=o(`<h1 id="环境变量配置" tabindex="-1"><a class="header-anchor" href="#环境变量配置"><span>环境变量配置</span></a></h1><pre><code>%SystemRoot%\\system32;%INTEL_DEV_REDIST%redist\\intel64\\compiler;%JAVA_HOME%\\bin;C:\\Program Files (x86)\\Common Files\\Oracle\\Java\\javapath;%SystemRoot%;%SystemRoot%\\System32\\Wbem;%SYSTEMROOT%\\System32\\WindowsPowerShell\\v1.0\\;%SYSTEMROOT%\\System32\\OpenSSH\\;C:\\Program Files\\dotnet\\;%NVM_HOME%;%NVM_SYMLINK%;C:\\Android_Reverse\\apkTool;C:\\Go\\bin;C:\\Program Files (x86)\\dotnet-core-uninstall\\;C:\\codeblocks-20.03mingw-nosetup\\MinGW\\bin;C:\\Program Files\\Memurai\\;C:\\Users\\yzqde\\AppData\\Local\\Yarn\\bin;C:\\Users\\yzqde\\.conda\\envs\\condapkg;C:\\Program Files\\Git\\cmd
</code></pre><p>环境变量默认编辑界面是这样的 <img src="`+r+'" alt="image.png"> 编辑编辑文本会变成 <img src="'+a+`" alt="image.png"></p><p>如果出现环境变量path的编辑一直是编辑文本的样式,则需要将<code>%SystemRoot%\\system32</code> 这个变量移到最前面,这样干就变成了列表的样式</p><h2 id="使用powershell编辑环境变量" tabindex="-1"><a class="header-anchor" href="#使用powershell编辑环境变量"><span>使用powershell编辑环境变量</span></a></h2><p>查看微软官方文档 <a href="https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables?view=powershell-7.1" target="_blank" rel="noopener noreferrer">链接</a> 注意下面的方法只是临时修改了环境变量</p><pre><code class="language-powershell"># 获取path环境变量
$env:path 
# 获取用户名
$env:USERNAME
# env有如下变量: USERPROFILE,username,path,windir,COMPUTERNAME等等

#Powershell设置环境变量

#查看所有环境变量  
ls env:

#搜索环境变量   
ls env:NODE*

#查看单个环境变量 
$env:NODE_ENV

#添加/更新环境变量 
$env:NODE_ENV=development

#删除环境变量        
del evn:NODE_ENV

# 改变path环境变量
$env:PATH += &quot;;$env:ERLANG_HOME\\bin;c:\\temp&quot;
</code></pre><div class="hint-container tip"><p class="hint-container-title">提示</p><p>使用c#语法操作环境变量</p><pre><code class="language-powershell"># 读取环境变量
[environment]::GetEnvironmentvariable(&quot;Path&quot;, &quot;Machine&quot;)

# 用户变量
[environment]::SetEnvironmentvariable(&quot;变量名称&quot;, &quot;变量值&quot;, &quot;User&quot;)

# 系统变量
[environment]::SetEnvironmentvariable(&quot;变量名称&quot;, &quot;变量值&quot;, &quot;Machine&quot;)
#新建和追加环境变量
[environment]::SetEnvironmentvariable(&quot;GOPATH&quot;, &quot;$env:USERPROFILE\\gopath&quot;, &quot;User&quot;)
#调用命令结果：$(命令)
#获取原有用户 PATH 变量：$([environment]::GetEnvironmentvariable(&quot;Path&quot;, &quot;User&quot;))
#注意 PATH 中条目以分号结尾
[environment]::SetEnvironmentvariable(&quot;PATH&quot;, &quot;$([environment]::GetEnvironmentvariable(&quot;Path&quot;, &quot;User&quot;));%GOPATH%\\bin&quot;, &quot;User&quot;)

[environment]::SetEnvironmentvariable(&quot;GOROOT&quot;, &quot;C:\\go&quot;, &quot;Machine&quot;)
#调用命令结果：$(命令)
#获取原有系统 PATH 变量：$([environment]::GetEnvironmentvariable(&quot;Path&quot;, &quot;Machine&quot;))
[environment]::SetEnvironmentvariable(&quot;PATH&quot;, &quot;$([environment]::GetEnvironmentvariable(&quot;Path&quot;, &quot;Machine&quot;));%GOROOT%\\bin&quot;, &quot;Machine&quot;)

</code></pre></div>`,8),l=[s];function m(p,c){return n(),t("div",null,l)}const d=e(i,[["render",m],["__file","environment-varibles.html.vue"]]),h=JSON.parse('{"path":"/windows-tutor/powershell/basics/environment-varibles.html","title":"环境变量配置","lang":"zh-CN","frontmatter":{"description":"环境变量配置 环境变量默认编辑界面是这样的 image.png 编辑编辑文本会变成 image.png 如果出现环境变量path的编辑一直是编辑文本的样式,则需要将%SystemRoot%\\\\system32 这个变量移到最前面,这样干就变成了列表的样式 使用powershell编辑环境变量 查看微软官方文档 链接 注意下面的方法只是临时修改了环境变量 ...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/powershell/basics/environment-varibles.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"环境变量配置"}],["meta",{"property":"og:description","content":"环境变量配置 环境变量默认编辑界面是这样的 image.png 编辑编辑文本会变成 image.png 如果出现环境变量path的编辑一直是编辑文本的样式,则需要将%SystemRoot%\\\\system32 这个变量移到最前面,这样干就变成了列表的样式 使用powershell编辑环境变量 查看微软官方文档 链接 注意下面的方法只是临时修改了环境变量 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-31T13:53:29.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-31T13:53:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"环境变量配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-31T13:53:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"使用powershell编辑环境变量","slug":"使用powershell编辑环境变量","link":"#使用powershell编辑环境变量","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1659275609000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.49,"words":447},"filePathRelative":"windows-tutor/powershell/basics/environment-varibles.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,h as data};
