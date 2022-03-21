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
