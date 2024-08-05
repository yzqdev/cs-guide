import{_ as e,c as a,o,d as n}from"./app-CbULZrmi.js";const r={},t=n(`<h1 id="工作区使用" tabindex="-1"><a class="header-anchor" href="#工作区使用"><span>工作区使用</span></a></h1><h2 id="yarn工作区" tabindex="-1"><a class="header-anchor" href="#yarn工作区"><span>yarn工作区</span></a></h2><p>Yarn Workspaces（工作区）是Yarn提供的<code>monorepo</code>的依赖管理机制，从Yarn 1.0开始默认支持，用于在代码仓库的根目录下管理多个package的依赖。</p><h2 id="monorepo" tabindex="-1"><a class="header-anchor" href="#monorepo"><span><strong>Monorepo</strong></span></a></h2><p>假如你是一个npm工具的维护者，管理着多个功能相近的包，或者这些包之间存在依赖关系。如果将这些包拆分在不同仓库里，那么面临要跨多个包进行更改时，工作会非常繁琐和复杂。</p><p>为了简化流程，很多大型项目采用了menorepo的做法，即把所有的包放在一个仓库中管理。Babel、React、Vue、Jest等都使用了menorepo的管理方式。</p><p>Menorepo的优点是可以在一个仓库里维护多个package，可统一构建，跨package调试、依赖管理、版本发布都十分方便，搭配工具还能统一生成CHANGELOG；</p><p>缺点是代码仓库体积会变大，只开发其中一个package也需要安装整个项目的依赖。</p><p>来看一下**<a href="https://github.com/babel/babel/tree/master" target="_blank" rel="noopener noreferrer">Babel</a>**的仓库目录（简化）：</p><pre><code class="language-text">babel/
|--package.json
|--yarn.lock
|--packages/
|  |--babel-cli/
|  |  |--package.json
|  |--babel-core/
|  |  |--package.json
|  |--babel-parser/
|  |  |--package.json
</code></pre><h2 id="why-yarn-workspace" tabindex="-1"><a class="header-anchor" href="#why-yarn-workspace"><span><strong>Why Yarn Workspace?</strong></span></a></h2><ul><li>开发多个互相依赖的package时，workspace会自动对package的引用设置软链接（symlink），比yarn link更加方便，且链接仅局限在当前workspace中，不会对整个系统造成影响</li><li>所有package的依赖会安装在最根目录的node_modules下，节省磁盘空间，且给了yarn更大的依赖优化空间</li><li>所有package使用同一个yarn.lock，更少造成冲突且易于审查</li></ul><h2 id="如何使用workspace" tabindex="-1"><a class="header-anchor" href="#如何使用workspace"><span><strong>如何使用Workspace</strong></span></a></h2><p>根目录的package.json设置：</p><pre><code class="language-text">{
  &quot;name&quot;: &quot;mono-demo&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;private&quot;: true,
  &quot;workspaces&quot;: [
    &quot;packages/*&quot;
  ],
}
</code></pre><p><code>private</code>：</p><p>根目录一般是项目的脚手架，无需发布，<code>&quot;private&quot;: true</code>会确保根目录不被发布出去。</p><p><code>workspaces</code>:</p><p>声明workspace中package的路径。值是一个字符串数组，支持Glob通配符。</p><p>其中<code>&quot;packages/*&quot;</code>是社区的常见写法，也可以枚举所有package： <code>&quot;workspaces&quot;: [&quot;package-a&quot;, &quot;package-b&quot;]</code>。</p><h2 id="命令和示例" tabindex="-1"><a class="header-anchor" href="#命令和示例"><span><strong>命令和示例</strong></span></a></h2><blockquote><p>PS：以下命令基于yarn@1.x</p></blockquote><p>假设项目中有foo和bar两个package：</p><pre><code class="language-text">mono-demo/
|--package.json
|--packages/
|  |--foo/
|  |  |--package.json
|  |--bar/
|  |  |--package.json
</code></pre><h3 id="yarn-workspace-workspace-name-command" tabindex="-1"><a class="header-anchor" href="#yarn-workspace-workspace-name-command"><span><strong><code>yarn workspace &lt;workspace_name&gt; &lt;command&gt;</code></strong></span></a></h3><p>在指定的package中运行指定的命令。</p><pre><code class="language-text"># 在foo中添加react，react-dom作为devDependencies
yarn workspace foo add react react-dom --dev

# 移除bar中的lodash依赖
yarn workspace bar remove lodash

# 运行bar中package.json的 scripts.test 命令
yarn workspace bar run test
</code></pre><h3 id="yarn-workspaces-run-command" tabindex="-1"><a class="header-anchor" href="#yarn-workspaces-run-command"><span><strong><code>yarn workspaces run &lt;command&gt;</code></strong></span></a></h3><p>在所有package中运行指定的命令，若某个package中没有对应的命令则会报错。</p><pre><code class="language-text"># 运行所有package（foo、bar）中package.json的 scripts.build 命令
yarn workspaces run build
</code></pre><h3 id="yarn-workspaces-info-json" tabindex="-1"><a class="header-anchor" href="#yarn-workspaces-info-json"><span><strong><code>yarn workspaces info [--json]</code></strong></span></a></h3><p>查看项目中的workspace依赖树。</p><p>例如我的bar依赖了foo，如下：</p><pre><code class="language-text">// bar/package.json
{
  &quot;name&quot;: &quot;bar&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;dependencies&quot;: {
    &quot;foo&quot;: &quot;^1.0.0&quot;
  }
}
</code></pre><p>在项目中的依赖结构是这样的（假设foo/package.json的版本匹配bar的依赖版本，否则会另外安装一个匹配的foo）：</p><pre><code class="language-text">/package.json
/yarn.lock

/node_modules
/node_modules/foo -&gt; /packages/foo

/packages/foo/package.json
/packages/bar/package.json
</code></pre><p>那么运行<code>yarn workspaces info</code>会得到如下输出：</p><pre><code class="language-text">yarn workspaces v1.22.4
{
  &quot;bar&quot;: {
    &quot;location&quot;: &quot;packages/bar&quot;,
    &quot;workspaceDependencies&quot;: [
      &quot;foo&quot;
    ],
    &quot;mismatchedWorkspaceDependencies&quot;: []
  },
  &quot;foo&quot;: {
    &quot;location&quot;: &quot;packages/foo&quot;,
    &quot;workspaceDependencies&quot;: [],
    &quot;mismatchedWorkspaceDependencies&quot;: []
  }
}
</code></pre><h3 id="yarn-add-remove-package-w" tabindex="-1"><a class="header-anchor" href="#yarn-add-remove-package-w"><span><code>yarn &lt;add|remove&gt; &lt;package&gt; -W</code></span></a></h3><ul><li>-W: --ignore-workspace-root-check ，允许依赖被安装在workspace的根目录</li></ul><p>管理根目录的依赖。</p><pre><code class="language-text"># 安装eslint作为根目录的devDependencies
yarn add eslint -D -W
</code></pre><h2 id="yarn-workspace与lerna" tabindex="-1"><a class="header-anchor" href="#yarn-workspace与lerna"><span>Yarn Workspace与Lerna</span></a></h2><p><a href="https://github.com/lerna/lerna#readme" target="_blank" rel="noopener noreferrer">Lerna</a>是社区主流的monorepo管理工具之一，集成了依赖管理、版本发布管理等功能。</p><p>使用Learn管理的项目的目录结构和yarn workspace类似。</p><p>Lerna的依赖管理是也基于<code>yarn/npm</code>，但是安装依赖的方式和yarn workspace有些差异：</p><p>Yarn workspace只会在根目录安装一个node_modules，这有利于提升依赖的安装效率和不同package间的版本复用。而Lerna默认会进到每一个package中运行<code>yarn/npm install</code>，并在每个package中创建一个node_modules。</p><p>目前社区中最主流的方案，也是yarn官方推荐的方案，是集成yarn workspace和lerna。使用yarn workspace来管理依赖，使用lerna来管理npm包的版本发布。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>本项目就是使用yarn workspace+lerna管理的</p></div><pre><code class="language-json">// package.json
{
  &quot;name&quot;: &quot;root&quot;,
  &quot;private&quot;: true,
  &quot;workspaces&quot;: [
    &quot;android-docs&quot;,
    &quot;cs-guide&quot; 
  ],
  &quot;devDependencies&quot;: {
    &quot;lerna&quot;: &quot;latest&quot;,
    &quot;cpx2&quot;: &quot;latest&quot;
  },
  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;lerna run docs:build --parallel&quot;,
    &quot;dev&quot;: &quot;lerna run docs:dev --parallel&quot;,
    &quot;cs-guide&quot;: &quot;yarn workspace cs-guide docs:dev&quot;,
    &quot;android&quot;: &quot;yarn workspace android-docs docs:dev&quot; 
  
  }
}

</code></pre><p>lerna.json</p><pre><code class="language-json">{
  &quot;npmClient&quot;: &quot;yarn&quot;,
  &quot;useWorkspaces&quot;: true,
  &quot;packages&quot;: [
    &quot;android-docs&quot;,
    &quot;cs-guide&quot; 
  ],
  &quot;version&quot;: &quot;0.0.0&quot;,
  &quot;command&quot;: {
    &quot;run&quot;: {
      &quot;npmClient&quot;: &quot;yarn&quot;
    }
  }
}

</code></pre><h2 id="pnpm工作区" tabindex="-1"><a class="header-anchor" href="#pnpm工作区"><span>pnpm工作区</span></a></h2><p>新建一个pnpm-workspace.yaml</p><pre><code class="language-yaml">packages:
  - &#39;android-docs&#39;
  - &quot;cs-guide&quot;
  - &#39;packages/*&#39;
</code></pre><p>然后在package.json里面添加</p><pre><code>&quot;cs-guide&quot; :&quot;pnpm -C cs-guide dev&quot;
</code></pre>`,57),p=[t];function c(s,d){return o(),a("div",null,p)}const u=e(r,[["render",c],["__file","workspace.html.vue"]]),i=JSON.parse('{"path":"/frontend/package-manager/workspace.html","title":"工作区使用","lang":"zh-CN","frontmatter":{"description":"工作区使用 yarn工作区 Yarn Workspaces（工作区）是Yarn提供的monorepo的依赖管理机制，从Yarn 1.0开始默认支持，用于在代码仓库的根目录下管理多个package的依赖。 Monorepo 假如你是一个npm工具的维护者，管理着多个功能相近的包，或者这些包之间存在依赖关系。如果将这些包拆分在不同仓库里，那么面临要跨多个包...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/package-manager/workspace.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"工作区使用"}],["meta",{"property":"og:description","content":"工作区使用 yarn工作区 Yarn Workspaces（工作区）是Yarn提供的monorepo的依赖管理机制，从Yarn 1.0开始默认支持，用于在代码仓库的根目录下管理多个package的依赖。 Monorepo 假如你是一个npm工具的维护者，管理着多个功能相近的包，或者这些包之间存在依赖关系。如果将这些包拆分在不同仓库里，那么面临要跨多个包..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-01T04:28:17.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-01T04:28:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"工作区使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-01T04:28:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"yarn工作区","slug":"yarn工作区","link":"#yarn工作区","children":[]},{"level":2,"title":"Monorepo","slug":"monorepo","link":"#monorepo","children":[]},{"level":2,"title":"Why Yarn Workspace?","slug":"why-yarn-workspace","link":"#why-yarn-workspace","children":[]},{"level":2,"title":"如何使用Workspace","slug":"如何使用workspace","link":"#如何使用workspace","children":[]},{"level":2,"title":"命令和示例","slug":"命令和示例","link":"#命令和示例","children":[{"level":3,"title":"yarn workspace <workspace_name> <command>","slug":"yarn-workspace-workspace-name-command","link":"#yarn-workspace-workspace-name-command","children":[]},{"level":3,"title":"yarn workspaces run <command>","slug":"yarn-workspaces-run-command","link":"#yarn-workspaces-run-command","children":[]},{"level":3,"title":"yarn workspaces info [--json]","slug":"yarn-workspaces-info-json","link":"#yarn-workspaces-info-json","children":[]},{"level":3,"title":"yarn <add|remove> <package> -W","slug":"yarn-add-remove-package-w","link":"#yarn-add-remove-package-w","children":[]}]},{"level":2,"title":"Yarn Workspace与Lerna","slug":"yarn-workspace与lerna","link":"#yarn-workspace与lerna","children":[]},{"level":2,"title":"pnpm工作区","slug":"pnpm工作区","link":"#pnpm工作区","children":[]}],"git":{"createdTime":1649440976000,"updatedTime":1659328097000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":3.72,"words":1117},"filePathRelative":"frontend/package-manager/workspace.md","localizedDate":"2022年4月8日","autoDesc":true}');export{u as comp,i as data};
