# 常用 GitHub Actions

GitHub Actions 市场中高频使用的官方和第三方 Action。

## 官方 Actions

| Action | 说明 | 链接 |
|--------|------|------|
| checkout | 检出代码仓库 | [marketplace](https://github.com/marketplace/actions/checkout) |
| setup-node | 配置 Node.js 环境 | [marketplace](https://github.com/marketplace/actions/setup-node-js-environment) |
| setup-pnpm | 配置 pnpm 包管理器 | [marketplace](https://github.com/marketplace/actions/setup-pnpm) |
| setup-java | 配置 Java 环境 | [marketplace](https://github.com/marketplace/actions/setup-java) |
| setup-python | 配置 Python 环境 | [marketplace](https://github.com/marketplace/actions/setup-python) |
| upload-artifact | 上传构建产物 | [marketplace](https://github.com/marketplace/actions/upload-a-build-artifact) |
| download-artifact | 下载构建产物 | [marketplace](https://github.com/marketplace/actions/download-artifact) |
| cache | 缓存依赖 | [marketplace](https://github.com/marketplace/actions/cache) |

## 部署相关

| Action | 说明 | 链接 |
|--------|------|------|
| deploy-gh-pages | 部署到 GitHub Pages | [marketplace](https://github.com/marketplace/actions/deploy-to-github-pages) |
| gitee-pages-action | 自动部署 Gitee Pages | [marketplace](https://github.com/marketplace/actions/gitee-pages-action) |
| hub-mirror-action | 同步 GitHub 到 Gitee | [marketplace](https://github.com/marketplace/actions/hub-mirror-action) |
| docker/build-push-action | Docker 镜像构建推送 | [marketplace](https://github.com/marketplace/actions/docker-build-push-action) |

## 第三方 Actions 集合

| 项目 | 说明 | 链接 |
|------|------|------|
| actions-cool | 常用 Actions 合集 | [GitHub](https://github.com/actions-cool) |
| actions/starter-workflows | 官方工作流模板 | [GitHub](https://github.com/actions/starter-workflows) |
| sdras/awesome-actions | Actions 资源列表 | [GitHub](https://github.com/sdras/awesome-actions) |

## 使用示例

```yaml
# 基础 Node.js 项目
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm test
```

```yaml
# 缓存 Maven 依赖
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
      
      - uses: actions/cache@v4
        with:
          path: ~/.m2/repository
          key: ${{ runner.os }}-maven-${{ hashFiles('**/pom.xml') }}
```
