# CI/CD 与构建自动化

> 持续集成 / 持续部署与构建流水线配置。

## CI/CD 流程

```
代码提交 → Lint → 测试 → 构建 → 部署
```

## GitHub Actions

### 基础配置

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install

      - run: pnpm lint

      - run: pnpm test

  build:
    needs: quality
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install

      - run: pnpm build

      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
```

### 发布到 npm

```yaml
name: Publish

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'

      - run: pnpm install

      - run: pnpm build

      - run: pnpm publish --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Docker 构建与推送

```yaml
name: Docker Build

on:
  push:
    branches: [main]

jobs:
  docker:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: docker/setup-buildx-action@v3

      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

## 缓存策略

### 依赖缓存

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'pnpm'
```

### 构建缓存（Turborepo）

```yaml
- name: Turbo Cache
  uses: actions/cache@v3
  with:
    path: node_modules/.cache/turbo
    key: turbo-${{ github.ref_name }}-${{ github.sha }}
    restore-keys: |
      turbo-${{ github.ref_name }}-
      turbo-main-
```

## 版本控制与发布

### changesets

```bash
pnpm add -D @changesets/cli
```

```json
// package.json
{
  "scripts": {
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "pnpm build && changeset publish"
  }
}
```

```bash
# 创建一个 changeset
pnpm changeset

# 升级版本
pnpm version-packages

# 发布
pnpm release
```

### semantic-release

```bash
pnpm add -D semantic-release
```

```json
// package.json
{
  "release": {
    "branches": ["main"],
    "plugins": [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      "@semantic-release/npm",
      "@semantic-release/github"
    ]
  }
}
```

## 构建安全检查

```yaml
# 在 CI 中集成安全检查
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Snyk Security Scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

      - name: npm audit
        run: pnpm audit --prod
```

## 参考

- [GitHub Actions 文档](https://docs.github.com/actions)
- [changesets](https://github.com/changesets/changesets)
- [semantic-release](https://semantic-release.gitbook.io/)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
