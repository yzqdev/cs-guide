# Bun 常用命令与包管理

> Bun 内置包管理器、脚本运行器和 CLI 工具，完全兼容 npm 生态。

---

## 包管理命令

Bun 的包管理器比 npm 快 10-30 倍。

### 安装依赖

```bash
# 安装 package.json 中的所有依赖
bun install

# 安装指定包
bun add express
bun add react react-dom

# 安装开发依赖
bun add -d typescript @types/bun
bun add --dev eslint

# 安装全局包
bun add -g bun

# 安装特定版本
bun add lodash@4.17.21
bun add zod@latest

# 根据 package.json 锁版本安装
bun install --frozen-lockfile
```

### 移除依赖

```bash
bun remove lodash
bun remove react react-dom
```

### 更新依赖

```bash
# 更新所有依赖
bun update

# 更新指定包
bun update express

# 检查过时包
bun outdated
```

### 管理锁文件

```bash
# bun.lock — Bun 的锁文件（二进制格式）
# 比 package-lock.json 小 10x，生成快 100x

# 生成/更新 bun.lock
bun install

# 从 package-lock.json 迁移
# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 然后运行 bun install 生成 bun.lock
bun install
```

---

## 运行脚本

### 运行文件

```bash
# 运行 TypeScript/JavaScript 文件
bun run index.ts
bun run app.js

# 不指定 run 也可以（简写）
bun index.ts

# 运行 package.json 中的脚本
bun run dev
bun run build
bun run test

# 简写形式
bun dev
bun build
```

### 热重载

```bash
# --watch 模式：文件变动自动重启
bun run --watch server.ts

# --hot 模式：实时重载（不重启进程，仅替换模块）
bun run --hot server.ts
```

### 传递参数

```bash
bun run script.ts -- --port 3000 --debug

# script.ts 中通过 process.argv 获取
console.log(process.argv);
// ['bun', 'script.ts', '--port', '3000', '--debug']
```

---

## 打包

### bun build — 打包器

Bun 内置了高效的打包器（基于 esbuild API）。

```bash
# 基本用法
bun build ./src/index.ts --outdir ./dist

# 指定入口和输出
bun build ./src/index.ts --outfile ./dist/bundle.js

# 支持多个入口
bun build ./src/index.ts ./src/worker.ts --outdir ./dist
```

### 配置选项

```bash
# 生成 sourcemap
bun build ./src/index.ts --outdir ./dist --sourcemap

# 压缩输出
bun build ./src/index.ts --outdir ./dist --minify

# 指定目标平台
bun build ./src/index.ts --outdir ./dist --target browser
bun build ./src/index.ts --outdir ./dist --target bun
bun build ./src/index.ts --outdir ./dist --target node

# 代码分割
bun build ./src/index.ts --outdir ./dist --splitting

# 外部依赖（不打包进输出）
bun build ./src/index.ts --outdir ./dist --external react
bun build ./src/index.ts --outdir ./dist --external '*'  # 所有依赖外部化

# 环境变量注入
bun build ./src/index.ts --outdir ./dist --define API_URL=https://api.example.com

# 加载器
bun build ./src/index.ts --outdir ./dist --loader .png:file
```

### 完整构建示例

```bash
# 生产构建
bun build ./src/index.ts \
  --outdir ./dist \
  --minify \
  --sourcemap \
  --target browser \
  --splitting \
  --external react \
  --external react-dom

# 构建输出
# dist/
# ├── index.js      # 打包后的文件
# ├── index.js.map  # sourcemap
# └── chunk-xxx.js  # 代码分割的 chunk
```

---

## 测试

### bun test — 测试运行器

Bun 内置测试框架，兼容 Jest API。

```typescript
// math.test.ts
import { describe, expect, test, beforeAll, afterAll, mock } from "bun:test";

// 基础测试
describe("Math operations", () => {
  test("1 + 1 = 2", () => {
    expect(1 + 1).toBe(2);
  });

  test("2 * 3 = 6", () => {
    expect(2 * 3).toBe(6);
  });
});

// 异步测试
describe("Async", () => {
  test("async function", async () => {
    const result = await Promise.resolve(42);
    expect(result).toBe(42);
  });
});

// Mock 函数
describe("Mock", () => {
  test("mock function", () => {
    const fn = mock(() => 42);
    expect(fn()).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

// 生命周期
describe("Lifecycle", () => {
  beforeAll(() => console.log("在所有测试之前执行"));
  afterAll(() => console.log("在所有测试之后执行"));

  test("test with lifecycle", () => {
    expect(true).toBe(true);
  });
});
```

### 运行测试

```bash
# 运行所有测试（匹配 *.test.ts / *_test.ts / *.spec.ts）
bun test

# 运行特定文件
bun test math.test.ts

# 使用过滤
bun test --filter "math"

# 运行测试并监听
bun test --watch

# 生成覆盖率报告
bun test --coverage

# 更新 snapshot
bun test --update-snapshots
```

### 测试配置

```json
// package.json
{
  "scripts": {
    "test": "bun test",
    "test:watch": "bun test --watch",
    "test:coverage": "bun test --coverage"
  }
}
```

---

## 工作区（Monorepo）

Bun 支持 npm/yarn/pnpm 风格的工作区：

```json
// 根目录 package.json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
}
```

### 工作区命令

```bash
# 安装所有工作区依赖
bun install

# 向特定工作区添加依赖
bun add lodash --workspace packages/utils

# 运行工作区脚本
bun run --filter @my-app/server dev

# 查看工作区依赖关系
bun pm ls
```

---

## Bun 特有命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `bun run` | 运行文件或脚本 | `bun run index.ts` |
| `bun add` | 添加依赖 | `bun add express` |
| `bun remove` | 移除依赖 | `bun remove lodash` |
| `bun install` | 安装所有依赖 | `bun install` |
| `bun update` | 更新依赖 | `bun update` |
| `bun build` | 打包代码 | `bun build ./src/index.ts` |
| `bun test` | 运行测试 | `bun test` |
| `bun create` | 创建项目模板 | `bun create elysia my-app` |
| `bun init` | 初始化项目 | `bun init -y` |
| `bun upgrade` | 升级 Bun 版本 | `bun upgrade` |
| `bun pm ls` | 查看已安装包 | `bun pm ls` |
| `bun pm cache` | 管理缓存 | `bun pm cache rm` |
| `bun x` | 直接运行 npm 包（类似 npx） | `bun x cowsay "Hello"` |

---

## 与 npm/pnpm/yarn 兼容的命令

| npm 命令 | Bun 等价 | 说明 |
|----------|----------|------|
| `npm install` | `bun install` | 安装依赖 |
| `npm add <pkg>` | `bun add <pkg>` | 添加依赖 |
| `npm remove <pkg>` | `bun remove <pkg>` | 移除依赖 |
| `npm run <script>` | `bun run <script>` | 运行脚本 |
| `npm test` | `bun test` | 运行测试 |
| `npx <pkg>` | `bun x <pkg>` | 直接运行包 |
| `npm init` | `bun init` | 初始化项目 |
| `npm publish` | `bun publish` | 发布包 |
| `npm link` | `bun link` | 链接本地包 |
| `npm outdated` | `bun outdated` | 检查过时包 |
| `npm update` | `bun update` | 更新依赖 |
| `npm cache clean` | `bun pm cache rm` | 清理缓存 |
