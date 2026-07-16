import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/tools/vscode/08-remote-development.html","title":"08 — 远程开发","lang":"zh-CN","frontmatter":{"description":"08 — 远程开发 Remote Development 是 VS Code 的杀手级特性。通过远程开发，你可以在本地编辑器中操作远程环境（服务器、WSL、Docker 容器）中的代码，就像在本地一样。 8.1 三种远程方案 前置条件：安装 Remote Development 扩展包，它包含以上三个扩展。 8.2 Remote-SSH 基本用法 安装...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"08 — 远程开发\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/tools/vscode/08-remote-development.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"08 — 远程开发"}],["meta",{"property":"og:description","content":"08 — 远程开发 Remote Development 是 VS Code 的杀手级特性。通过远程开发，你可以在本地编辑器中操作远程环境（服务器、WSL、Docker 容器）中的代码，就像在本地一样。 8.1 三种远程方案 前置条件：安装 Remote Development 扩展包，它包含以上三个扩展。 8.2 Remote-SSH 基本用法 安装..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.4,"words":1020},"filePathRelative":"windows-tutor/tools/vscode/08-remote-development.md","autoDesc":true}`),u={name:`08-remote-development.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_08-—-远程开发" tabindex="-1"><a class="header-anchor" href="#_08-—-远程开发"><span>08 — 远程开发</span></a></h1><blockquote><p>Remote Development 是 VS Code 的杀手级特性。通过远程开发，你可以在本地编辑器中操作远程环境（服务器、WSL、Docker 容器）中的代码，就像在本地一样。</p></blockquote><hr><h2 id="_8-1-三种远程方案" tabindex="-1"><a class="header-anchor" href="#_8-1-三种远程方案"><span>8.1 三种远程方案</span></a></h2><table><thead><tr><th>方案</th><th>扩展</th><th>适用场景</th></tr></thead><tbody><tr><td><strong>Remote-SSH</strong></td><td><code>ms-vscode-remote.remote-ssh</code></td><td>连接远程 Linux 服务器、虚拟机</td></tr><tr><td><strong>Remote-WSL</strong></td><td><code>ms-vscode-remote.remote-wsl</code></td><td>在 Windows Subsystem for Linux 中开发</td></tr><tr><td><strong>Dev Containers</strong></td><td><code>ms-vscode-remote.remote-containers</code></td><td>在 Docker 容器中开发，环境一致</td></tr></tbody></table><blockquote><p><strong>前置条件</strong>：安装 <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack" target="_blank" rel="noopener noreferrer">Remote Development 扩展包</a>，它包含以上三个扩展。</p></blockquote><hr><h2 id="_8-2-remote-ssh" tabindex="-1"><a class="header-anchor" href="#_8-2-remote-ssh"><span>8.2 Remote-SSH</span></a></h2><h3 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法"><span>基本用法</span></a></h3><ol><li>安装 Remote-SSH 扩展</li><li>点击左下角 <code>&gt;&lt;</code> 图标 → <code>Connect to Host...</code></li><li>输入 <code>ssh user@your-server.com</code></li><li>输入密码或使用密钥认证</li><li>连接成功后，在远程服务器上打开文件夹</li></ol><h3 id="ssh-配置管理" tabindex="-1"><a class="header-anchor" href="#ssh-配置管理"><span>SSH 配置管理</span></a></h3><p>编辑 <code>~/.ssh/config</code> 配置常用服务器：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># ~/.ssh/config</span>
<span class="line"></span>
<span class="line">Host dev-server</span>
<span class="line">    HostName 192.168.1.100</span>
<span class="line">    User root</span>
<span class="line">    Port 22</span>
<span class="line">    IdentityFile ~/.ssh/id_rsa</span>
<span class="line">    ForwardAgent yes</span>
<span class="line"></span>
<span class="line">Host prod-server</span>
<span class="line">    HostName prod.example.com</span>
<span class="line">    User deploy</span>
<span class="line">    Port 2222</span>
<span class="line">    IdentityFile ~/.ssh/deploy_key</span>
<span class="line"></span></code></pre></div><p>配置后，在 VS Code 中连接时直接选择 <code>dev-server</code> 或 <code>prod-server</code>。</p><h3 id="端口转发" tabindex="-1"><a class="header-anchor" href="#端口转发"><span>端口转发</span></a></h3><p>远程服务器上的服务（如 <code>localhost:3000</code>）可以通过端口转发映射到本地：</p><ol><li>连接远程后，点击左下角 Ports 面板</li><li>点击 <code>Forward a Port</code></li><li>输入远程端口号（如 <code>3000</code>）</li><li>本地打开 <code>http://localhost:3000</code> 即可访问</li></ol><p>或在 <code>devcontainer.json</code> 中配置：</p><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;forwardPorts&quot;: [3000, 5173, 9229],</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="远程终端配置" tabindex="-1"><a class="header-anchor" href="#远程终端配置"><span>远程终端配置</span></a></h3><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">// settings.json（远程连接后，在远程服务器上设置）</span>
<span class="line">{</span>
<span class="line">  &quot;remote.SSH.showLoginTerminal&quot;: true,</span>
<span class="line">  &quot;remote.SSH.defaultExtensions&quot;: [&quot;dbaeumer.vscode-eslint&quot;, &quot;esbenp.prettier-vscode&quot;],</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><hr><h2 id="_8-3-remote-wsl" tabindex="-1"><a class="header-anchor" href="#_8-3-remote-wsl"><span>8.3 Remote-WSL</span></a></h2><h3 id="前置条件" tabindex="-1"><a class="header-anchor" href="#前置条件"><span>前置条件</span></a></h3><ul><li>Windows 10 2004+ 或 Windows 11</li><li>安装 WSL 和 Linux 发行版（如 Ubuntu）</li></ul><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 在 PowerShell（管理员）中</span></span>
<span class="line">wsl <span class="token parameter variable">--install</span></span>
<span class="line">wsl --set-default-version <span class="token number">2</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装 Ubuntu</span></span>
<span class="line">wsl <span class="token parameter variable">--install</span> <span class="token parameter variable">-d</span> Ubuntu-22.04</span>
<span class="line"></span></code></pre></div><h3 id="在-wsl-中开发" tabindex="-1"><a class="header-anchor" href="#在-wsl-中开发"><span>在 WSL 中开发</span></a></h3><ol><li>打开 VS Code</li><li>点击左下角 <code>&gt;&lt;</code> 图标 → <code>Connect to WSL</code></li><li>或直接在 WSL 终端中运行 <code>code .</code></li></ol><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 在 WSL 终端中</span></span>
<span class="line"><span class="token builtin class-name">cd</span> /home/user/project</span>
<span class="line">code <span class="token builtin class-name">.</span></span>
<span class="line"></span></code></pre></div><h3 id="wsl-配置" tabindex="-1"><a class="header-anchor" href="#wsl-配置"><span>WSL 配置</span></a></h3><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">// settings.json（WSL 远程连接后）</span>
<span class="line">{</span>
<span class="line">  &quot;wsl.environment&quot;: {</span>
<span class="line">    &quot;PATH&quot;: &quot;/usr/local/bin:/usr/bin:/bin&quot;,</span>
<span class="line">  },</span>
<span class="line">  &quot;wsl.distribution&quot;: &quot;Ubuntu-22.04&quot;,</span>
<span class="line">  &quot;terminal.integrated.defaultProfile.linux&quot;: &quot;zsh&quot;,</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><hr><h2 id="_8-4-dev-containers" tabindex="-1"><a class="header-anchor" href="#_8-4-dev-containers"><span>8.4 Dev Containers</span></a></h2><p>Dev Containers 是本教程最推荐的远程方案——<strong>团队一致的开发环境，告别&quot;我机器上能跑&quot;</strong>。</p><h3 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始"><span>快速开始</span></a></h3><ol><li>安装 Dev Containers 扩展</li><li>打开项目文件夹</li><li>点击左下角 <code>&gt;&lt;</code> → <code>Reopen in Container</code></li><li>VS Code 会检测 <code>.devcontainer/devcontainer.json</code> 并构建容器</li></ol><h3 id="devcontainer-json-完全配置" tabindex="-1"><a class="header-anchor" href="#devcontainer-json-完全配置"><span>.devcontainer.json 完全配置</span></a></h3><div class="language-jsonc line-numbers-mode" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;Node.js 20 Development&quot;,</span>
<span class="line">  // 方式一：使用预构建镜像</span>
<span class="line">  &quot;image&quot;: &quot;mcr.microsoft.com/devcontainers/typescript-node:20&quot;,</span>
<span class="line"></span>
<span class="line">  // 方式二：使用 Dockerfile 自定义</span>
<span class="line">  // &quot;build&quot;: {</span>
<span class="line">  //   &quot;dockerfile&quot;: &quot;Dockerfile&quot;,</span>
<span class="line">  //   &quot;args&quot;: {</span>
<span class="line">  //     &quot;VARIANT&quot;: &quot;20-bookworm&quot;</span>
<span class="line">  //   }</span>
<span class="line">  // },</span>
<span class="line"></span>
<span class="line">  // 方式三：使用 Docker Compose</span>
<span class="line">  // &quot;dockerComposeFile&quot;: &quot;docker-compose.yml&quot;,</span>
<span class="line">  // &quot;service&quot;: &quot;app&quot;,</span>
<span class="line">  // &quot;workspaceFolder&quot;: &quot;/workspace&quot;,</span>
<span class="line"></span>
<span class="line">  // 端口转发</span>
<span class="line">  &quot;forwardPorts&quot;: [3000, 5173],</span>
<span class="line"></span>
<span class="line">  // 容器启动后执行的命令</span>
<span class="line">  &quot;postCreateCommand&quot;: &quot;npm install&quot;,</span>
<span class="line">  &quot;postStartCommand&quot;: &quot;npm run dev&quot;,</span>
<span class="line"></span>
<span class="line">  // 容器内 VS Code 的扩展和设置</span>
<span class="line">  &quot;customizations&quot;: {</span>
<span class="line">    &quot;vscode&quot;: {</span>
<span class="line">      &quot;extensions&quot;: [&quot;dbaeumer.vscode-eslint&quot;, &quot;esbenp.prettier-vscode&quot;, &quot;bradlc.vscode-tailwindcss&quot;],</span>
<span class="line">      &quot;settings&quot;: {</span>
<span class="line">        &quot;editor.formatOnSave&quot;: true,</span>
<span class="line">        &quot;editor.defaultFormatter&quot;: &quot;esbenp.prettier-vscode&quot;,</span>
<span class="line">      },</span>
<span class="line">    },</span>
<span class="line">  },</span>
<span class="line"></span>
<span class="line">  // 远程用户</span>
<span class="line">  &quot;remoteUser&quot;: &quot;node&quot;,</span>
<span class="line"></span>
<span class="line">  // 挂载额外的卷</span>
<span class="line">  &quot;mounts&quot;: [&quot;source=\${env:HOME}/.ssh,target=/home/node/.ssh,type=bind,consistency=cached&quot;],</span>
<span class="line"></span>
<span class="line">  // 容器特性（Features）</span>
<span class="line">  &quot;features&quot;: {</span>
<span class="line">    &quot;ghcr.io/devcontainers/features/git:1&quot;: {},</span>
<span class="line">    &quot;ghcr.io/devcontainers/features/docker-outside-of-docker:1&quot;: {},</span>
<span class="line">    &quot;ghcr.io/devcontainers/features/python:1&quot;: {</span>
<span class="line">      &quot;version&quot;: &quot;3.11&quot;,</span>
<span class="line">    },</span>
<span class="line">  },</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用-dockerfile-自定义" tabindex="-1"><a class="header-anchor" href="#使用-dockerfile-自定义"><span>使用 Dockerfile 自定义</span></a></h3><div class="language-docker" data-highlighter="prismjs" data-ext="docker"><pre><code class="language-docker"><span class="line"><span class="token comment"># .devcontainer/Dockerfile</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> mcr.microsoft.com/devcontainers/typescript-node:20</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装额外工具</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; export DEBIAN_FRONTEND=noninteractive <span class="token operator">\\</span></span>
<span class="line">    &amp;&amp; apt-get -y install --no-install-recommends <span class="token operator">\\</span></span>
<span class="line">    redis-server <span class="token operator">\\</span></span>
<span class="line">    postgresql-client <span class="token operator">\\</span></span>
<span class="line">    &amp;&amp; apt-get clean</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 全局安装工具</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> npm install -g pnpm @nestjs/cli</span></span>
<span class="line"></span></code></pre></div><h3 id="dev-container-特性-features" tabindex="-1"><a class="header-anchor" href="#dev-container-特性-features"><span>Dev Container 特性（Features）</span></a></h3><p>Features 是 Dev Containers 的&quot;即插即用&quot;功能包，可以快速添加工具：</p><table><thead><tr><th>Feature</th><th>用途</th></tr></thead><tbody><tr><td><code>ghcr.io/devcontainers/features/docker-outside-of-docker</code></td><td>容器内使用 Docker</td></tr><tr><td><code>ghcr.io/devcontainers/features/python</code></td><td>安装 Python</td></tr><tr><td><code>ghcr.io/devcontainers/features/java</code></td><td>安装 Java</td></tr><tr><td><code>ghcr.io/devcontainers/features/sshd</code></td><td>开启 SSH 服务器</td></tr><tr><td><code>ghcr.io/devcontainers/features/terraform</code></td><td>安装 Terraform</td></tr></tbody></table><h3 id="实战-java-项目" tabindex="-1"><a class="header-anchor" href="#实战-java-项目"><span>实战：Java 项目</span></a></h3><div class="language-jsonc line-numbers-mode" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;Java 17 Development&quot;,</span>
<span class="line">  &quot;image&quot;: &quot;mcr.microsoft.com/devcontainers/java:17&quot;,</span>
<span class="line">  &quot;features&quot;: {</span>
<span class="line">    &quot;ghcr.io/devcontainers/features/java:1&quot;: {</span>
<span class="line">      &quot;version&quot;: &quot;17&quot;,</span>
<span class="line">      &quot;installMaven&quot;: true,</span>
<span class="line">      &quot;installGradle&quot;: true,</span>
<span class="line">    },</span>
<span class="line">  },</span>
<span class="line">  &quot;customizations&quot;: {</span>
<span class="line">    &quot;vscode&quot;: {</span>
<span class="line">      &quot;extensions&quot;: [&quot;vscjava.vscode-java-pack&quot;, &quot;vscjava.vscode-spring-initializr&quot;],</span>
<span class="line">    },</span>
<span class="line">  },</span>
<span class="line">  &quot;forwardPorts&quot;: [8080],</span>
<span class="line">  &quot;postCreateCommand&quot;: &quot;mvn install -DskipTests&quot;,</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_8-5-远程开发最佳实践" tabindex="-1"><a class="header-anchor" href="#_8-5-远程开发最佳实践"><span>8.5 远程开发最佳实践</span></a></h2><h3 id="_1-环境变量管理" tabindex="-1"><a class="header-anchor" href="#_1-环境变量管理"><span>① 环境变量管理</span></a></h3><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;remoteEnv&quot;: {</span>
<span class="line">    &quot;DATABASE_URL&quot;: &quot;postgres://user:pass@localhost:5432/db&quot;,</span>
<span class="line">    &quot;REDIS_URL&quot;: &quot;redis://localhost:6379&quot;,</span>
<span class="line">  },</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="_2-性能优化" tabindex="-1"><a class="header-anchor" href="#_2-性能优化"><span>② 性能优化</span></a></h3><div class="language-jsonc" data-highlighter="prismjs" data-ext="jsonc"><pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  // 远程连接时禁用不必要的扩展</span>
<span class="line">  &quot;remote.extensionKind&quot;: {</span>
<span class="line">    &quot;ms-azuretools.vscode-docker&quot;: [&quot;workspace&quot;],</span>
<span class="line">    &quot;GitHub.copilot&quot;: [&quot;ui&quot;],</span>
<span class="line">  },</span>
<span class="line">  // 文件监视优化</span>
<span class="line">  &quot;files.watcherExclude&quot;: {</span>
<span class="line">    &quot;**/node_modules/**&quot;: true,</span>
<span class="line">    &quot;**/.git/objects/**&quot;: true,</span>
<span class="line">  },</span>
<span class="line">  &quot;search.followSymlinks&quot;: false,</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="_3-安全建议" tabindex="-1"><a class="header-anchor" href="#_3-安全建议"><span>③ 安全建议</span></a></h3><ul><li>使用 SSH 密钥而非密码认证</li><li>不要在远程配置中硬编码密钥</li><li>使用 <code>.env</code> 文件加载敏感信息</li><li>容器中不要以 root 运行</li></ul><hr><h2 id="下一步" tabindex="-1"><a class="header-anchor" href="#下一步"><span>下一步</span></a></h2>`,55),i(`p`,null,[l[1]||=e(`进入 `,-1),a(m,{to:`/windows-tutor/tools/vscode/09-workspace-profile-sync.html`},{default:r(()=>[...l[0]||=[e(`09 — 工作区、Profile 与同步`,-1)]]),_:1}),l[2]||=e(` 学习如何管理多项目工作区和配置同步。`,-1)])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};