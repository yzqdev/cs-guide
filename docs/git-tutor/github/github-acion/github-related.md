# github tips

githubpages出现资源404找不到的情况
好吧，主要原因是 jekyll 不会处理以 `_` 开头的文件时，需要在 `gh-pages` 分支根目录下添加文件 `.nojekyll` 以禁止使用 jekyll 解析。

## github actions

### 发布pages

```yaml
name: Deploy Doc Website
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
          node-version: '14'

      - name: Install dependencies
        run: yarn

      - name: Build Website
        run: yarn build-site

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@3.7.1
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          FOLDER: dist


```

### 打包jar

```yml
name: CI

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
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*') }}
          restore-keys: ${{ runner.os }}-gradle-

      - name: Cache .gradle/wrapper
        uses: actions/cache@v1
        with:
          path: ~/.gradle/wrapper
          key: ${{ runner.os }}-gradle-wrapper-${{ hashFiles('**/*.gradle') }}
          restore-keys: ${{ runner.os }}-gradle-wrapper-

      - name: Grant execute permission for gradlew
        run: chmod +x gradlew

      - name: Build with Gradle
        run: ./gradlew clean build -s

      - name: Upload Artifacts
        uses: actions/upload-artifact@v2
        with:
          name: TrMenu Artifact
          path: build/libs/*.jar
```

### 发布pages到指定的仓库

```yml
name: Deploy V2 Docs

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
          node-version: "16"

      - name: restore lerna
        uses: actions/cache@v3
        id: lerna-cache
        with:
          path: |
            node_modules
            **/node_modules
          key: ${{ runner.os }}-lerna-${{ hashFiles('yarn.lock') }}

      - name: Get yarn cache directory path
        if: steps.lerna-cache.outputs.cache-hit != 'true'
        id: yarn-cache-dir-path
        run: echo "::set-output name=dir::$(yarn cache dir)"

      - name: yarn-cache
        if: steps.lerna-cache.outputs.cache-hit != 'true'
        uses: actions/cache@v3
        id: yarn-cache
        with:
          path: ${{ steps.yarn-cache-dir-path.outputs.dir }}
          key: ${{ runner.os }}-yarn-${{ hashFiles('yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      - name: Install Deps
        if: steps.lerna-cache.outputs.cache-hit != 'true'
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
          yarn cpx "docs/add-this/dist/**" dist/add-this
          yarn cpx "docs/blog2/dist/**" dist/blog
          yarn cpx "docs/comment2/dist/**" dist/comment
          yarn cpx "docs/components/dist/**" dist/components
          yarn cpx "docs/copy-code2/dist/**" dist/copy-code
          yarn cpx "docs/copyright2/dist/**" dist/copyright
          yarn cpx "docs/feed2/dist/**" dist/feed
          yarn cpx "docs/lightgallery/dist/**" dist/lightgallery
          yarn cpx "docs/md-enhance/dist/**" dist/md-enhance
          yarn cpx "docs/photo-swipe/dist/**" dist/photo-swipe
          yarn cpx "docs/pwa2/dist/**" dist/pwa
          yarn cpx "docs/reading-time2/dist/**" dist/reading-time
          yarn cpx "docs/sass-palette/dist/**" dist/sass-palette
          yarn cpx "docs/seo2/dist/**" dist/seo
          yarn cpx "docs/sitemap2/dist/**" dist/sitemap
          yarn cpx "docs/theme/dist/**" dist

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          repository-name: vuepress-theme-hope/v2
          branch: gh-pages
          folder: dist
          token: ${{ secrets.ACCESS_TOKEN }}
          single-commit: true
```

## 自动部署gitee pages

```yml
name: Sync pages

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
          # 注意在 Settings->Secrets 配置 GITEE_RSA_PRIVATE_KEY
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_PRIVATE_KEY }}
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
          # 注意在 Settings->Secrets 配置 GITEE_PASSWORD(是密码,不是token)
          gitee-password: ${{ secrets.GITEE_TOKEN }}
          # 注意替换为你的 Gitee 仓库，仓库名严格区分大小写，请准确填写，否则会出错
          gitee-repo: yzqdev/cs-guide
          # 要部署的分支，默认是 master，若是其他分支，则需要指定（指定的分支必须存在）
          branch: gh-pages

```

## 镜像github到gitee

```yml
name: Github to gitee

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
          dst_key: ${{ secrets.GITEE_PRIVATE_KEY }}
          dst_token: ${{ secrets.GITEE_TOKEN }}
          static_list: "cs-guide"

```
