# Monorepo 工作区

Monorepo 是将多个 package 放在同一个仓库中管理的方式。Babel、React、Vue、Jest 等知名项目都采用这种模式。

## 优点

- 统一构建，跨 package 调试方便
- 依赖管理简单，版本发布统一
- 搭配工具可自动生成 CHANGELOG

## 缺点

- 代码仓库体积变大
- 只开发一个 package 也需要安装整个项目的依赖

## Yarn Workspace

### 目录结构

```
mono-demo/
├── package.json
├── yarn.lock
├── packages/
│   ├── foo/
│   │   └── package.json
│   └── bar/
│       └── package.json
```

### 根目录 package.json

```json
{
  "name": "mono-demo",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["packages/*"]
}
```

- `private: true` — 防止根目录被发布
- `workspaces` — 声明 package 路径，支持 Glob 通配符

### 常用命令

```bash
# 在指定 package 中执行命令
yarn workspace foo add react react-dom --dev
yarn workspace bar remove lodash
yarn workspace bar run test

# 在所有 package 中执行命令
yarn workspaces run build

# 查看 workspace 依赖树
yarn workspaces info

# 在根目录安装依赖
yarn add eslint -D -W
```

### 依赖关系

如果 bar 依赖 foo，workspace 会自动创建软链接：

```
node_modules/foo -> packages/foo
```

## Yarn Workspace + Lerna

[Lerna](https://github.com/lerna/lerna) 是社区主流的 monorepo 管理工具。推荐方案：用 yarn workspace 管理依赖，用 lerna 管理版本发布。

### package.json

```json
{
  "name": "root",
  "private": true,
  "workspaces": ["packages/*"],
  "devDependencies": {
    "lerna": "latest"
  },
  "scripts": {
    "build": "lerna run build --parallel",
    "dev": "lerna run dev --parallel"
  }
}
```

### lerna.json

```json
{
  "npmClient": "yarn",
  "useWorkspaces": true,
  "packages": ["packages/*"],
  "version": "0.0.0"
}
```

## pnpm Workspace

创建 `pnpm-workspace.yaml`：

```yaml
packages:
  - 'packages/*'
  - 'components/**'
  - '!**/test/**'
```

在 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "dev:app": "pnpm -C packages/app dev",
    "build:lib": "pnpm -C packages/lib build"
  }
}
```

## 对比

| 特性 | Yarn Workspace | pnpm Workspace | Lerna |
|------|----------------|----------------|-------|
| 依赖管理 | 根目录统一安装 | 根目录统一安装 | 默认各 package 独立安装 |
| 软链接 | 自动 | 自动 | 需配合 workspace |
| 版本发布 | 不支持 | 不支持 | 支持 |
| 推荐搭配 | + Lerna | 独立使用 | + Yarn/pnpm |
