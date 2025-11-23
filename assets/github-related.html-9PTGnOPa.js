import{_ as s,c as a,a as e,o as p}from"./app-B6vXTniy.js";const t={};function l(i,n){return p(),a("div",null,[...n[0]||(n[0]=[e(`<h1 id="github-tips" tabindex="-1"><a class="header-anchor" href="#github-tips"><span>github tips</span></a></h1><p>githubpages出现资源404找不到的情况 好吧，主要原因是 jekyll 不会处理以 <code>_</code> 开头的文件时，需要在 <code>gh-pages</code> 分支根目录下添加文件 <code>.nojekyll</code> 以禁止使用 jekyll 解析。</p><h2 id="github-actions" tabindex="-1"><a class="header-anchor" href="#github-actions"><span>github actions</span></a></h2><h3 id="发布pages" tabindex="-1"><a class="header-anchor" href="#发布pages"><span>发布pages</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy Doc Website</span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> main</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">master-deploy</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">persist-credentials</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup node</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v2</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">&#39;14&#39;</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build Website</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn build<span class="token punctuation">-</span>site</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> JamesIves/github<span class="token punctuation">-</span>pages<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>action@3.7.1</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">ACCESS_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.ACCESS_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">BRANCH</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages</span>
<span class="line">          <span class="token key atrule">FOLDER</span><span class="token punctuation">:</span> dist</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="打包jar" tabindex="-1"><a class="header-anchor" href="#打包jar"><span>打包jar</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> CI</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> master <span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> master <span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">releaseJar</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2</span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>java@v1</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">java-version</span><span class="token punctuation">:</span> <span class="token number">8</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Cache .gradle/caches</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v1</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">path</span><span class="token punctuation">:</span> ~/.gradle/caches</span>
<span class="line">          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>gradle<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles(&#39;<span class="token important">**/*.gradle*&#39;)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">restore-keys</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>gradle<span class="token punctuation">-</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Cache .gradle/wrapper</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v1</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">path</span><span class="token punctuation">:</span> ~/.gradle/wrapper</span>
<span class="line">          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>gradle<span class="token punctuation">-</span>wrapper<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles(&#39;<span class="token important">**/*.gradle&#39;)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">restore-keys</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>gradle<span class="token punctuation">-</span>wrapper<span class="token punctuation">-</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Grant execute permission for gradlew</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> chmod +x gradlew</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build with Gradle</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> ./gradlew clean build <span class="token punctuation">-</span>s</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Upload Artifacts</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/upload<span class="token punctuation">-</span>artifact@v2</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">name</span><span class="token punctuation">:</span> TrMenu Artifact</span>
<span class="line">          <span class="token key atrule">path</span><span class="token punctuation">:</span> build/libs/<span class="token important">*.jar</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="发布pages到指定的仓库" tabindex="-1"><a class="header-anchor" href="#发布pages到指定的仓库"><span>发布pages到指定的仓库</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy V2 Docs</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> main</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">deploy-gh-pages</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy V2 docs to gh pages</span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">&quot;16&quot;</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> restore lerna</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v3</span>
<span class="line">        <span class="token key atrule">id</span><span class="token punctuation">:</span> lerna<span class="token punctuation">-</span>cache</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">            node_modules</span>
<span class="line">            **/node_modules</span></span>
<span class="line">          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>lerna<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles(&#39;yarn.lock&#39;) <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Get yarn cache directory path</span>
<span class="line">        <span class="token key atrule">if</span><span class="token punctuation">:</span> steps.lerna<span class="token punctuation">-</span>cache.outputs.cache<span class="token punctuation">-</span>hit <span class="token tag">!=</span> &#39;true&#39;</span>
<span class="line">        <span class="token key atrule">id</span><span class="token punctuation">:</span> yarn<span class="token punctuation">-</span>cache<span class="token punctuation">-</span>dir<span class="token punctuation">-</span>path</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> echo &quot;<span class="token punctuation">:</span><span class="token punctuation">:</span>set<span class="token punctuation">-</span>output name=dir<span class="token punctuation">:</span><span class="token punctuation">:</span>$(yarn cache dir)&quot;</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> yarn<span class="token punctuation">-</span>cache</span>
<span class="line">        <span class="token key atrule">if</span><span class="token punctuation">:</span> steps.lerna<span class="token punctuation">-</span>cache.outputs.cache<span class="token punctuation">-</span>hit <span class="token tag">!=</span> &#39;true&#39;</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v3</span>
<span class="line">        <span class="token key atrule">id</span><span class="token punctuation">:</span> yarn<span class="token punctuation">-</span>cache</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">path</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.yarn<span class="token punctuation">-</span>cache<span class="token punctuation">-</span>dir<span class="token punctuation">-</span>path.outputs.dir <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>yarn<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles(&#39;yarn.lock&#39;) <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">restore-keys</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">            \${{ runner.os }}-yarn-</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install Deps</span>
<span class="line">        <span class="token key atrule">if</span><span class="token punctuation">:</span> steps.lerna<span class="token punctuation">-</span>cache.outputs.cache<span class="token punctuation">-</span>hit <span class="token tag">!=</span> &#39;true&#39;</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn install <span class="token punctuation">-</span><span class="token punctuation">-</span>frozen<span class="token punctuation">-</span>lockfile</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build project</span>
<span class="line">        <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">NODE_OPTIONS</span><span class="token punctuation">:</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>max_old_space_size=4096</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn run build</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Docs build</span>
<span class="line">        <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">BASE</span><span class="token punctuation">:</span> /v2/</span>
<span class="line">          <span class="token key atrule">HOSTNAME</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//vuepress<span class="token punctuation">-</span>theme<span class="token punctuation">-</span>hope.github.io/</span>
<span class="line">          <span class="token key atrule">NODE_OPTIONS</span><span class="token punctuation">:</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>max_old_space_size=4096</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn run docs<span class="token punctuation">:</span>vite<span class="token punctuation">-</span>build</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Combine output</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">          yarn cpx &quot;docs/add-this/dist/**&quot; dist/add-this</span>
<span class="line">          yarn cpx &quot;docs/blog2/dist/**&quot; dist/blog</span>
<span class="line">          yarn cpx &quot;docs/comment2/dist/**&quot; dist/comment</span>
<span class="line">          yarn cpx &quot;docs/components/dist/**&quot; dist/components</span>
<span class="line">          yarn cpx &quot;docs/copy-code2/dist/**&quot; dist/copy-code</span>
<span class="line">          yarn cpx &quot;docs/copyright2/dist/**&quot; dist/copyright</span>
<span class="line">          yarn cpx &quot;docs/feed2/dist/**&quot; dist/feed</span>
<span class="line">          yarn cpx &quot;docs/lightgallery/dist/**&quot; dist/lightgallery</span>
<span class="line">          yarn cpx &quot;docs/md-enhance/dist/**&quot; dist/md-enhance</span>
<span class="line">          yarn cpx &quot;docs/photo-swipe/dist/**&quot; dist/photo-swipe</span>
<span class="line">          yarn cpx &quot;docs/pwa2/dist/**&quot; dist/pwa</span>
<span class="line">          yarn cpx &quot;docs/reading-time2/dist/**&quot; dist/reading-time</span>
<span class="line">          yarn cpx &quot;docs/sass-palette/dist/**&quot; dist/sass-palette</span>
<span class="line">          yarn cpx &quot;docs/seo2/dist/**&quot; dist/seo</span>
<span class="line">          yarn cpx &quot;docs/sitemap2/dist/**&quot; dist/sitemap</span>
<span class="line">          yarn cpx &quot;docs/theme/dist/**&quot; dist</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> JamesIves/github<span class="token punctuation">-</span>pages<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>action@v4</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">repository-name</span><span class="token punctuation">:</span> vuepress<span class="token punctuation">-</span>theme<span class="token punctuation">-</span>hope/v2</span>
<span class="line">          <span class="token key atrule">branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages</span>
<span class="line">          <span class="token key atrule">folder</span><span class="token punctuation">:</span> dist</span>
<span class="line">          <span class="token key atrule">token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.ACCESS_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">single-commit</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自动部署gitee-pages" tabindex="-1"><a class="header-anchor" href="#自动部署gitee-pages"><span>自动部署gitee pages</span></a></h2><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> Sync pages</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">workflow_run</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">workflows</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>Deploy GitHub Page<span class="token punctuation">]</span></span>
<span class="line">    <span class="token key atrule">types</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> completed</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">build</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Sync to Gitee</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> wearerequired/git<span class="token punctuation">-</span>mirror<span class="token punctuation">-</span>action@master</span>
<span class="line">        <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token comment"># 注意在 Settings-&gt;Secrets 配置 GITEE_RSA_PRIVATE_KEY</span></span>
<span class="line">          <span class="token key atrule">SSH_PRIVATE_KEY</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITEE_PRIVATE_KEY <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token comment"># 注意替换为你的 GitHub 源仓库地址</span></span>
<span class="line">          <span class="token key atrule">source-repo</span><span class="token punctuation">:</span> git@github.com<span class="token punctuation">:</span>yzqdev/cs<span class="token punctuation">-</span>guide.git</span>
<span class="line">          <span class="token comment"># 注意替换为你的 Gitee 目标仓库地址</span></span>
<span class="line">          <span class="token key atrule">destination-repo</span><span class="token punctuation">:</span> git@gitee.com<span class="token punctuation">:</span>yzqdev/cs<span class="token punctuation">-</span>guide.git</span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build Gitee Pages</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> yanglbme/gitee<span class="token punctuation">-</span>pages<span class="token punctuation">-</span>action@main</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token comment"># 注意替换为你的 Gitee 用户名</span></span>
<span class="line">          <span class="token key atrule">gitee-username</span><span class="token punctuation">:</span> yzqdev</span>
<span class="line">          <span class="token comment"># 注意在 Settings-&gt;Secrets 配置 GITEE_PASSWORD(是密码,不是token)</span></span>
<span class="line">          <span class="token key atrule">gitee-password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITEE_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token comment"># 注意替换为你的 Gitee 仓库，仓库名严格区分大小写，请准确填写，否则会出错</span></span>
<span class="line">          <span class="token key atrule">gitee-repo</span><span class="token punctuation">:</span> yzqdev/cs<span class="token punctuation">-</span>guide</span>
<span class="line">          <span class="token comment"># 要部署的分支，默认是 master，若是其他分支，则需要指定（指定的分支必须存在）</span></span>
<span class="line">          <span class="token key atrule">branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="镜像github到gitee" tabindex="-1"><a class="header-anchor" href="#镜像github到gitee"><span>镜像github到gitee</span></a></h2><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> Github to gitee</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> main</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">docs-deploy</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">permissions</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">contents</span><span class="token punctuation">:</span> write</span>
<span class="line"></span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Mirror the Github organization repos to Gitee.</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> Yikun/hub<span class="token punctuation">-</span>mirror<span class="token punctuation">-</span>action@master</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">src</span><span class="token punctuation">:</span> github/yzqdev</span>
<span class="line">          <span class="token key atrule">dst</span><span class="token punctuation">:</span> gitee/yzqdev</span>
<span class="line">          <span class="token key atrule">dst_key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITEE_PRIVATE_KEY <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">dst_token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITEE_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">static_list</span><span class="token punctuation">:</span> <span class="token string">&quot;cs-guide&quot;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13)])])}const u=s(t,[["render",l]]),o=JSON.parse('{"path":"/git-tutor/github/github-acion/github-related.html","title":"github tips","lang":"zh-CN","frontmatter":{"description":"github tips githubpages出现资源404找不到的情况 好吧，主要原因是 jekyll 不会处理以 _ 开头的文件时，需要在 gh-pages 分支根目录下添加文件 .nojekyll 以禁止使用 jekyll 解析。 github actions 发布pages 打包jar 发布pages到指定的仓库 自动部署gitee pages...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"github tips\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/github/github-acion/github-related.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"github tips"}],["meta",{"property":"og:description","content":"github tips githubpages出现资源404找不到的情况 好吧，主要原因是 jekyll 不会处理以 _ 开头的文件时，需要在 gh-pages 分支根目录下添加文件 .nojekyll 以禁止使用 jekyll 解析。 github actions 发布pages 打包jar 发布pages到指定的仓库 自动部署gitee pages..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}]]},"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.45,"words":734},"filePathRelative":"git-tutor/github/github-acion/github-related.md","autoDesc":true}');export{u as comp,o as data};
