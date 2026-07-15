# GitHub Actions

GitHub Actions 是 GitHub 提供的 CI/CD 平台，可以自动化构建、测试和部署流程。

<Catalog />

## 内容导航

| 文件 | 说明 |
|------|------|
| [入门教程](use-actions.md) | 基础概念、工作流语法、常用环境变量 |
| [常用 Actions](common-actions.md) | checkout、setup-node、cache 等高频 Action |
| [实用示例](github-related.md) | Pages 部署、JAR 打包、Gitee 同步等模板 |
| [开源项目参考](using-actions.md) | 使用 Actions 的优秀项目案例 |

## 快速开始

```yaml
# .github/workflows/hello.yml
name: Hello World

on:
  push:
    branches: [main]

jobs:
  greet:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Hello, GitHub Actions!"
```

## 常用场景

| 场景 | 推荐 Action |
|------|-------------|
| 部署 GitHub Pages | [deploy-gh-pages](github-related.md#示一部署-github-pages) |
| Java 项目打包 | [打包 JAR](github-related.md#示二java-项目打包-jar) |
| 同步到 Gitee | [hub-mirror-action](common-actions.md#部署相关) |
| 缓存依赖 | [actions/cache](common-actions.md#官方-actions) |
