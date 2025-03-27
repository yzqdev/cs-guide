import{_ as t,c as o,a,o as d}from"./app-C8DxhDIZ.js";const s={};function r(n,e){return d(),o("div",null,e[0]||(e[0]=[a('<h1 id="技巧" tabindex="-1"><a class="header-anchor" href="#技巧"><span>技巧</span></a></h1><h2 id="安装版本vscode和portablevscode会在任务栏重叠-怎么办" tabindex="-1"><a class="header-anchor" href="#安装版本vscode和portablevscode会在任务栏重叠-怎么办"><span>安装版本vscode和portablevscode会在任务栏重叠,怎么办</span></a></h2><ol><li>Open directory {vscode_installation_dir}<strong>/resources/app</strong></li><li>Edit the file <strong>product.json</strong> with a text editor (VSCode/Notepad.exe/Notepad++ or whatever)</li><li>Locate the key <strong>win32AppUserModelId</strong></li><li>Change its value to what you want it to be, and save the file:</li></ol><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">&quot;win32AppUserModelId&quot;: &quot;Microsoft.VisualStudioCode.ForJupyter&quot;</span>\n<span class="line"></span></code></pre></div><p>就行了</p><h2 id="vscode运行python出现错误modulenotfounderror-no-module-named-crawel" tabindex="-1"><a class="header-anchor" href="#vscode运行python出现错误modulenotfounderror-no-module-named-crawel"><span>vscode运行python出现错误<code>ModuleNotFoundError: No module named &#39;crawel&#39;</code></span></a></h2><ol><li>Press <strong>Ctrl + Shift + P</strong> to open Command Palette</li><li>Go to <strong>Users.setting.json</strong></li><li>Add the following line</li></ol><p><code>&quot;terminal.integrated.env.windows&quot;: { &quot;PYTHONPATH&quot;: &quot;${workspaceFolder}&quot; }</code></p><h2 id="vscode加载appdata里面的types怎么办" tabindex="-1"><a class="header-anchor" href="#vscode加载appdata里面的types怎么办"><span>vscode加载appdata里面的types怎么办</span></a></h2><p>配置<code>settings.json</code>,设置<code>typescript.disableAutomaticTypeAcquisition</code></p>',10)]))}const l=t(s,[["render",r]]),p=JSON.parse(`{"path":"/windows-tutor/tools/vscode/tips.html","title":"技巧","lang":"zh-CN","frontmatter":{"description":"技巧 安装版本vscode和portablevscode会在任务栏重叠,怎么办 Open directory {vscode_installation_dir}/resources/app Edit the file product.json with a text editor (VSCode/Notepad.exe/Notepad++ or wha...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/tools/vscode/tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"技巧"}],["meta",{"property":"og:description","content":"技巧 安装版本vscode和portablevscode会在任务栏重叠,怎么办 Open directory {vscode_installation_dir}/resources/app Edit the file product.json with a text editor (VSCode/Notepad.exe/Notepad++ or wha..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-15T13:22:34.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-15T13:22:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-08-15T13:22:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安装版本vscode和portablevscode会在任务栏重叠,怎么办","slug":"安装版本vscode和portablevscode会在任务栏重叠-怎么办","link":"#安装版本vscode和portablevscode会在任务栏重叠-怎么办","children":[]},{"level":2,"title":"vscode运行python出现错误ModuleNotFoundError: No module named 'crawel'","slug":"vscode运行python出现错误modulenotfounderror-no-module-named-crawel","link":"#vscode运行python出现错误modulenotfounderror-no-module-named-crawel","children":[]},{"level":2,"title":"vscode加载appdata里面的types怎么办","slug":"vscode加载appdata里面的types怎么办","link":"#vscode加载appdata里面的types怎么办","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1723728154000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":4,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.37,"words":112},"filePathRelative":"windows-tutor/tools/vscode/tips.md","localizedDate":"2023年6月25日","autoDesc":true}`);export{l as comp,p as data};
