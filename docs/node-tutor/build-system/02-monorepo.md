# Monorepo 构建与管理

> Monorepo（单一仓库）将多个项目放在同一个仓库中管理，配合构建工具实现依赖共享、统一构建和发布。

## 为什么用 Monorepo

| 优势 | 说明 |
|------|------|
| 代码共享 | 多个项目共享组件、工具函数、类型定义 |
| 统一构建 | 一次配置，所有项目共享构建规则 |
| 原子提交 | 跨项目的修改可以在一个 PR 中完成 |
| 依赖管理 | 公共依赖提升到根目录，减少重复安装 |
| 统一发布 | 批量管理版本和发布流程 |

## 主流 Monorepo 方案对比

| 方案 | 特点 | 适用场景 |
|------|------|---------|
| pnpm workspace | 原生支持，软链接管理依赖 | 中小型项目 |
| Turborepo | Vercel 出品，增量构建 + 缓存 | 中大型项目 |
| Nx | 强大，支持多种技术栈 | 大型企业级项目 |
| Rush | 微软出品，严格的管理流程 | 超大型团队 |
| Lerna | 经典方案，生态成熟 | 传统 monorepo |
| Yarn Workspaces | Yarn 原生支持 | Yarn 用户 |

## pnpm workspace

### 配置

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - '!**/test/**'
```

### 目录结构

```
monorepo/
├── pnpm-workspace.yaml
├── package.json
├── packages/
│   ├── utils/              # 工具库
│   │   ├── package.json    # name: @my/utils
│   │   └── src/
│   ├── ui/                 # UI 组件库
│   │   ├── package.json    # name: @my/ui
│   │   └── src/
│   └── config/             # 共享配置
│       └── package.json    # name: @my/config
└── apps/
    ├── web/                # Web 应用
    │   └── package.json    # dependencies: { "@my/utils": "workspace:*" }
    └── admin/              # 管理后台
        └── package.json
```

### 常用命令

```bash
# 在根目录安装所有包
pnpm install

# 给特定包添加依赖
pnpm --filter @my/web add react

# 给所有包添加依赖
pnpm -r add lodash

# 运行所有包的 test 脚本
pnpm -r run test

# 运行特定包的脚本
pnpm --filter @my/web run dev

# 清理 node_modules
pnpm recursive exec -- rm -rf node_modules
```

## Turborepo

### 安装

```bash
pnpm add -D turbo
```

### `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"],
      "cache": true
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### package.json

```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "test": "turbo test",
    "lint": "turbo lint",
    "clean": "turbo clean"
  }
}
```

### 增量构建与缓存

Turborepo 默认启用缓存，会跳过未变更的任务：

```bash
turbo build
# 第二次运行将使用缓存，瞬间完成 ✅
turbo build
```

远程缓存（在 CI 中共享）：

```bash
turbo login
turbo link
turbo build
```

## Nx

### 安装

```bash
pnpm add -D nx
```

### `nx.json`

```json
{
  "extends": "nx/presets/npm.json",
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "lint", "test"],
        "parallel": 5
      }
    }
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"]
    },
    "test": {
      "inputs": ["default", "^production"]
    }
  }
}
```

### 常用命令

```bash
# 构建受影响的包
nx affected:build

# 运行测试
nx run @my/web:test

# 生成项目依赖图
nx graph

# 缓存清理
nx reset
```

## Lerna

```json
{
  "version": "independent",
  "npmClient": "pnpm",
  "command": {
    "publish": {
      "ignoreChanges": ["*.md"],
      "message": "chore(release): publish"
    },
    "bootstrap": {
      "ignore": "component-*"
    }
  }
}
```

```bash
# 初始化
npx lerna init

# 创建包
npx lerna create @my/package

# 为所有包安装依赖
npx lerna bootstrap

# 列出变更
npx lerna changed

# 发布
npx lerna publish
```

## 构建最佳实践

### 统一的 TypeScript 配置

```json
// packages/config/tsconfig/base.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

### 共享 ESLint 配置

```js
// packages/config/eslint/index.js
module.exports = {
  extends: ['@my/eslint-config-base'],
  rules: {
    'no-console': 'warn'
  }
}
```

### 构建脚本示例

```json
// 根 package.json
{
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "clean": "turbo run clean",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "changeset": "changeset",
    "release": "turbo run build && changeset publish"
  },
  "devDependencies": {
    "turbo": "^1.13.0",
    "@changesets/cli": "^2.27.0",
    "prettier": "^3.2.0"
  }
}
```

## 参考

- [Turborepo 文档](https://turbo.build/repo/docs)
- [Nx 文档](https://nx.dev/)
- [pnpm Workspace](https://pnpm.io/workspaces)
- [Rush.js](https://rushjs.io/)
