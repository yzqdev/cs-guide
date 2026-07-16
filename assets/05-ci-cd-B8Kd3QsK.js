import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/node-tutor/build-system/05-ci-cd.html","title":"CI/CD 与构建自动化","lang":"zh-CN","frontmatter":{"description":"CI/CD 与构建自动化 持续集成 / 持续部署与构建流水线配置。 CI/CD 流程 GitHub Actions 基础配置 发布到 npm Docker 构建与推送 缓存策略 依赖缓存 构建缓存（Turborepo） 版本控制与发布 changesets semantic-release 构建安全检查 参考 GitHub Actions 文档 cha...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CI/CD 与构建自动化\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/build-system/05-ci-cd.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"CI/CD 与构建自动化"}],["meta",{"property":"og:description","content":"CI/CD 与构建自动化 持续集成 / 持续部署与构建流水线配置。 CI/CD 流程 GitHub Actions 基础配置 发布到 npm Docker 构建与推送 缓存策略 依赖缓存 构建缓存（Turborepo） 版本控制与发布 changesets semantic-release 构建安全检查 参考 GitHub Actions 文档 cha..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.4,"words":420},"filePathRelative":"node-tutor/build-system/05-ci-cd.md","autoDesc":true}`),a={name:`05-ci-cd.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="ci-cd-与构建自动化" tabindex="-1"><a class="header-anchor" href="#ci-cd-与构建自动化"><span>CI/CD 与构建自动化</span></a></h1><blockquote><p>持续集成 / 持续部署与构建流水线配置。</p></blockquote><h2 id="ci-cd-流程" tabindex="-1"><a class="header-anchor" href="#ci-cd-流程"><span>CI/CD 流程</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">代码提交 → Lint → 测试 → 构建 → 部署</span>
<span class="line"></span></code></pre></div><h2 id="github-actions" tabindex="-1"><a class="header-anchor" href="#github-actions"><span>GitHub Actions</span></a></h2><h3 id="基础配置" tabindex="-1"><a class="header-anchor" href="#基础配置"><span>基础配置</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token comment"># .github/workflows/ci.yml</span></span>
<span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> CI</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">,</span> develop<span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">quality</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line"></span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> pnpm/action<span class="token punctuation">-</span>setup@v2</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">8</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v4</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token number">20</span></span>
<span class="line">          <span class="token key atrule">cache</span><span class="token punctuation">:</span> <span class="token string">&#39;pnpm&#39;</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm install</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm lint</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm test</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">build</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">needs</span><span class="token punctuation">:</span> quality</span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line"></span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> pnpm/action<span class="token punctuation">-</span>setup@v2</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">8</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v4</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token number">20</span></span>
<span class="line">          <span class="token key atrule">cache</span><span class="token punctuation">:</span> <span class="token string">&#39;pnpm&#39;</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm install</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm build</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/upload<span class="token punctuation">-</span>artifact@v4</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">name</span><span class="token punctuation">:</span> dist</span>
<span class="line">          <span class="token key atrule">path</span><span class="token punctuation">:</span> dist/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="发布到-npm" tabindex="-1"><a class="header-anchor" href="#发布到-npm"><span>发布到 npm</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> Publish</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">release</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">types</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>published<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">publish</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line"></span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> pnpm/action<span class="token punctuation">-</span>setup@v2</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">8</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v4</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token number">20</span></span>
<span class="line">          <span class="token key atrule">registry-url</span><span class="token punctuation">:</span> <span class="token string">&#39;https://registry.npmjs.org&#39;</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm install</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm build</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm publish <span class="token punctuation">-</span><span class="token punctuation">-</span>no<span class="token punctuation">-</span>git<span class="token punctuation">-</span>checks</span>
<span class="line">        <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">NODE_AUTH_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.NPM_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-构建与推送" tabindex="-1"><a class="header-anchor" href="#docker-构建与推送"><span>Docker 构建与推送</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> Docker Build</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">docker</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line"></span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/setup<span class="token punctuation">-</span>buildx<span class="token punctuation">-</span>action@v3</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/login<span class="token punctuation">-</span>action@v3</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">registry</span><span class="token punctuation">:</span> ghcr.io</span>
<span class="line">          <span class="token key atrule">username</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.actor <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/build<span class="token punctuation">-</span>push<span class="token punctuation">-</span>action@v5</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">context</span><span class="token punctuation">:</span> .</span>
<span class="line">          <span class="token key atrule">push</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">          <span class="token key atrule">tags</span><span class="token punctuation">:</span> ghcr.io/$<span class="token punctuation">{</span><span class="token punctuation">{</span> github.repository <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">:</span>latest</span>
<span class="line">          <span class="token key atrule">cache-from</span><span class="token punctuation">:</span> type=gha</span>
<span class="line">          <span class="token key atrule">cache-to</span><span class="token punctuation">:</span> type=gha<span class="token punctuation">,</span>mode=max</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="缓存策略" tabindex="-1"><a class="header-anchor" href="#缓存策略"><span>缓存策略</span></a></h2><h3 id="依赖缓存" tabindex="-1"><a class="header-anchor" href="#依赖缓存"><span>依赖缓存</span></a></h3><div class="language-yaml" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v4</span>
<span class="line">  <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token number">20</span></span>
<span class="line">    <span class="token key atrule">cache</span><span class="token punctuation">:</span> <span class="token string">&#39;pnpm&#39;</span></span>
<span class="line"></span></code></pre></div><h3 id="构建缓存-turborepo" tabindex="-1"><a class="header-anchor" href="#构建缓存-turborepo"><span>构建缓存（Turborepo）</span></a></h3><div class="language-yaml" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Turbo Cache</span>
<span class="line">  <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v3</span>
<span class="line">  <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">path</span><span class="token punctuation">:</span> node_modules/.cache/turbo</span>
<span class="line">    <span class="token key atrule">key</span><span class="token punctuation">:</span> turbo<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> github.ref_name <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> github.sha <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">    <span class="token key atrule">restore-keys</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">      turbo-\${{ github.ref_name }}-</span>
<span class="line">      turbo-main-</span></span>
<span class="line"></span></code></pre></div><h2 id="版本控制与发布" tabindex="-1"><a class="header-anchor" href="#版本控制与发布"><span>版本控制与发布</span></a></h2><h3 id="changesets" tabindex="-1"><a class="header-anchor" href="#changesets"><span>changesets</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> @changesets/cli</span>
<span class="line"></span></code></pre></div><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// package.json</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;changeset&quot;</span><span class="token operator">:</span> <span class="token string">&quot;changeset&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;version-packages&quot;</span><span class="token operator">:</span> <span class="token string">&quot;changeset version&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;release&quot;</span><span class="token operator">:</span> <span class="token string">&quot;pnpm build &amp;&amp; changeset publish&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 创建一个 changeset</span></span>
<span class="line"><span class="token function">pnpm</span> changeset</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 升级版本</span></span>
<span class="line"><span class="token function">pnpm</span> version-packages</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 发布</span></span>
<span class="line"><span class="token function">pnpm</span> release</span>
<span class="line"></span></code></pre></div><h3 id="semantic-release" tabindex="-1"><a class="header-anchor" href="#semantic-release"><span>semantic-release</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> semantic-release</span>
<span class="line"></span></code></pre></div><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// package.json</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;release&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;branches&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;main&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token string">&quot;@semantic-release/commit-analyzer&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&quot;@semantic-release/release-notes-generator&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&quot;@semantic-release/npm&quot;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string">&quot;@semantic-release/github&quot;</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h2 id="构建安全检查" tabindex="-1"><a class="header-anchor" href="#构建安全检查"><span>构建安全检查</span></a></h2><div class="language-yaml" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token comment"># 在 CI 中集成安全检查</span></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">security</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Snyk Security Scan</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> snyk/actions/node@master</span>
<span class="line">        <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">SNYK_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SNYK_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> npm audit</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm audit <span class="token punctuation">-</span><span class="token punctuation">-</span>prod</span>
<span class="line"></span></code></pre></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><ul><li><a href="https://docs.github.com/actions" target="_blank" rel="noopener noreferrer">GitHub Actions 文档</a></li><li><a href="https://github.com/changesets/changesets" target="_blank" rel="noopener noreferrer">changesets</a></li><li><a href="https://semantic-release.gitbook.io/" target="_blank" rel="noopener noreferrer">semantic-release</a></li><li><a href="https://github.com/docker/build-push-action" target="_blank" rel="noopener noreferrer">Docker Build Push Action</a></li></ul>`,28)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};