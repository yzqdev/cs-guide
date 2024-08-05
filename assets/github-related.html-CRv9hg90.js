import{_ as e,c as n,o as t,d as s}from"./app-CbULZrmi.js";const a={},i=s(`<h1 id="github-tips" tabindex="-1"><a class="header-anchor" href="#github-tips"><span>github tips</span></a></h1><p>githubpages出现资源404找不到的情况 好吧，主要原因是 jekyll 不会处理以 <code>_</code> 开头的文件时，需要在 <code>gh-pages</code> 分支根目录下添加文件 <code>.nojekyll</code> 以禁止使用 jekyll 解析。</p><h2 id="github-actions" tabindex="-1"><a class="header-anchor" href="#github-actions"><span>github actions</span></a></h2><h3 id="发布pages" tabindex="-1"><a class="header-anchor" href="#发布pages"><span>发布pages</span></a></h3><pre><code class="language-yaml">name: Deploy Doc Website
on:
  push:
    branches:
      - main

jobs:
  master-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false
      - name: Setup node
        uses: actions/setup-node@v2
        with:
          node-version: &#39;14&#39;

      - name: Install dependencies
        run: yarn

      - name: Build Website
        run: yarn build-site

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@3.7.1
        with:
          ACCESS_TOKEN: \${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          FOLDER: dist


</code></pre><h3 id="打包jar" tabindex="-1"><a class="header-anchor" href="#打包jar"><span>打包jar</span></a></h3><pre><code class="language-yml">name: CI

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  releaseJar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-java@v1
        with:
          java-version: 8

      - name: Cache .gradle/caches
        uses: actions/cache@v1
        with:
          path: ~/.gradle/caches
          key: \${{ runner.os }}-gradle-\${{ hashFiles(&#39;**/*.gradle*&#39;) }}
          restore-keys: \${{ runner.os }}-gradle-

      - name: Cache .gradle/wrapper
        uses: actions/cache@v1
        with:
          path: ~/.gradle/wrapper
          key: \${{ runner.os }}-gradle-wrapper-\${{ hashFiles(&#39;**/*.gradle&#39;) }}
          restore-keys: \${{ runner.os }}-gradle-wrapper-

      - name: Grant execute permission for gradlew
        run: chmod +x gradlew

      - name: Build with Gradle
        run: ./gradlew clean build -s

      - name: Upload Artifacts
        uses: actions/upload-artifact@v2
        with:
          name: TrMenu Artifact
          path: build/libs/*.jar
</code></pre><h3 id="发布pages到指定的仓库" tabindex="-1"><a class="header-anchor" href="#发布pages到指定的仓库"><span>发布pages到指定的仓库</span></a></h3><pre><code class="language-yml">name: Deploy V2 Docs

on:
  push:
    branches:
      - main

jobs:
  deploy-gh-pages:
    name: Deploy V2 docs to gh pages
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v3
        with:
          node-version: &quot;16&quot;

      - name: restore lerna
        uses: actions/cache@v3
        id: lerna-cache
        with:
          path: |
            node_modules
            **/node_modules
          key: \${{ runner.os }}-lerna-\${{ hashFiles(&#39;yarn.lock&#39;) }}

      - name: Get yarn cache directory path
        if: steps.lerna-cache.outputs.cache-hit != &#39;true&#39;
        id: yarn-cache-dir-path
        run: echo &quot;::set-output name=dir::$(yarn cache dir)&quot;

      - name: yarn-cache
        if: steps.lerna-cache.outputs.cache-hit != &#39;true&#39;
        uses: actions/cache@v3
        id: yarn-cache
        with:
          path: \${{ steps.yarn-cache-dir-path.outputs.dir }}
          key: \${{ runner.os }}-yarn-\${{ hashFiles(&#39;yarn.lock&#39;) }}
          restore-keys: |
            \${{ runner.os }}-yarn-

      - name: Install Deps
        if: steps.lerna-cache.outputs.cache-hit != &#39;true&#39;
        run: yarn install --frozen-lockfile

      - name: Build project
        env:
          NODE_OPTIONS: --max_old_space_size=4096
        run: yarn run build

      - name: Docs build
        env:
          BASE: /v2/
          HOSTNAME: https://vuepress-theme-hope.github.io/
          NODE_OPTIONS: --max_old_space_size=4096
        run: yarn run docs:vite-build

      - name: Combine output
        run: |
          yarn cpx &quot;docs/add-this/dist/**&quot; dist/add-this
          yarn cpx &quot;docs/blog2/dist/**&quot; dist/blog
          yarn cpx &quot;docs/comment2/dist/**&quot; dist/comment
          yarn cpx &quot;docs/components/dist/**&quot; dist/components
          yarn cpx &quot;docs/copy-code2/dist/**&quot; dist/copy-code
          yarn cpx &quot;docs/copyright2/dist/**&quot; dist/copyright
          yarn cpx &quot;docs/feed2/dist/**&quot; dist/feed
          yarn cpx &quot;docs/lightgallery/dist/**&quot; dist/lightgallery
          yarn cpx &quot;docs/md-enhance/dist/**&quot; dist/md-enhance
          yarn cpx &quot;docs/photo-swipe/dist/**&quot; dist/photo-swipe
          yarn cpx &quot;docs/pwa2/dist/**&quot; dist/pwa
          yarn cpx &quot;docs/reading-time2/dist/**&quot; dist/reading-time
          yarn cpx &quot;docs/sass-palette/dist/**&quot; dist/sass-palette
          yarn cpx &quot;docs/seo2/dist/**&quot; dist/seo
          yarn cpx &quot;docs/sitemap2/dist/**&quot; dist/sitemap
          yarn cpx &quot;docs/theme/dist/**&quot; dist

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          repository-name: vuepress-theme-hope/v2
          branch: gh-pages
          folder: dist
          token: \${{ secrets.ACCESS_TOKEN }}
          single-commit: true
</code></pre><h2 id="自动部署gitee-pages" tabindex="-1"><a class="header-anchor" href="#自动部署gitee-pages"><span>自动部署gitee pages</span></a></h2><pre><code class="language-yml">name: Sync pages

on:
  workflow_run:
    workflows: [Deploy GitHub Page]
    types:
      - completed

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          # 注意在 Settings-&gt;Secrets 配置 GITEE_RSA_PRIVATE_KEY
          SSH_PRIVATE_KEY: \${{ secrets.GITEE_PRIVATE_KEY }}
        with:
          # 注意替换为你的 GitHub 源仓库地址
          source-repo: git@github.com:yzqdev/cs-guide.git
          # 注意替换为你的 Gitee 目标仓库地址
          destination-repo: git@gitee.com:yzqdev/cs-guide.git

      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@main
        with:
          # 注意替换为你的 Gitee 用户名
          gitee-username: yzqdev
          # 注意在 Settings-&gt;Secrets 配置 GITEE_PASSWORD(是密码,不是token)
          gitee-password: \${{ secrets.GITEE_TOKEN }}
          # 注意替换为你的 Gitee 仓库，仓库名严格区分大小写，请准确填写，否则会出错
          gitee-repo: yzqdev/cs-guide
          # 要部署的分支，默认是 master，若是其他分支，则需要指定（指定的分支必须存在）
          branch: gh-pages

</code></pre><h2 id="镜像github到gitee" tabindex="-1"><a class="header-anchor" href="#镜像github到gitee"><span>镜像github到gitee</span></a></h2><pre><code class="language-yml">name: Github to gitee

on:
  push:
    branches:
      - main

jobs:
  docs-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: Mirror the Github organization repos to Gitee.
        uses: Yikun/hub-mirror-action@master
        with:
          src: github/yzqdev
          dst: gitee/yzqdev
          dst_key: \${{ secrets.GITEE_PRIVATE_KEY }}
          dst_token: \${{ secrets.GITEE_TOKEN }}
          static_list: &quot;cs-guide&quot;

</code></pre>`,13),o=[i];function r(c,u){return t(),n("div",null,o)}const p=e(a,[["render",r],["__file","github-related.html.vue"]]),h=JSON.parse('{"path":"/git-tutor/github/github-acion/github-related.html","title":"github tips","lang":"zh-CN","frontmatter":{"description":"github tips githubpages出现资源404找不到的情况 好吧，主要原因是 jekyll 不会处理以 _ 开头的文件时，需要在 gh-pages 分支根目录下添加文件 .nojekyll 以禁止使用 jekyll 解析。 github actions 发布pages 打包jar 发布pages到指定的仓库 自动部署gitee pages...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/github/github-acion/github-related.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"github tips"}],["meta",{"property":"og:description","content":"github tips githubpages出现资源404找不到的情况 好吧，主要原因是 jekyll 不会处理以 _ 开头的文件时，需要在 gh-pages 分支根目录下添加文件 .nojekyll 以禁止使用 jekyll 解析。 github actions 发布pages 打包jar 发布pages到指定的仓库 自动部署gitee pages..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"github tips\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"github actions","slug":"github-actions","link":"#github-actions","children":[{"level":3,"title":"发布pages","slug":"发布pages","link":"#发布pages","children":[]},{"level":3,"title":"打包jar","slug":"打包jar","link":"#打包jar","children":[]},{"level":3,"title":"发布pages到指定的仓库","slug":"发布pages到指定的仓库","link":"#发布pages到指定的仓库","children":[]}]},{"level":2,"title":"自动部署gitee pages","slug":"自动部署gitee-pages","link":"#自动部署gitee-pages","children":[]},{"level":2,"title":"镜像github到gitee","slug":"镜像github到gitee","link":"#镜像github到gitee","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.45,"words":734},"filePathRelative":"git-tutor/github/github-acion/github-related.md","localizedDate":"2023年6月25日","autoDesc":true}');export{p as comp,h as data};
