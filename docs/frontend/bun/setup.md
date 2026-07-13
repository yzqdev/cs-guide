# Bun 安装与项目创建

> 从零开始搭建 Bun 开发环境。

---

## 安装 Bun

### macOS / Linux

```bash
# 推荐方式（自动安装）
curl -fsSL https://bun.sh/install | bash

# 或者使用 npm
npm install -g bun

# 验证安装
bun --version
```

### Windows

```bash
# 方式一：使用 npm（推荐）
npm install -g bun

# 方式二：使用 PowerShell
powershell -c "irm bun.sh/install.ps1 | iex"

# 方式三：通过 Scoop
scoop install bun
```

### Docker

```dockerfile
FROM oven/bun:latest
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
COPY . .
CMD ["bun", "run", "index.ts"]
```

### 升级

```bash
bun upgrade
```

---

## 创建项目

### bun init — 初始化项目

```bash
# 创建新目录并初始化
mkdir my-project
cd my-project
bun init

# 交互式创建时会询问：
# - Package name (my-project)
# - Entry point (index.ts)
# 也可跳过交互直接创建
bun init -y
```

生成的项目结构：

```
my-project/
├── index.ts          # 入口文件
├── package.json      # 包配置
├── bun.lock          # Bun 锁文件
├── tsconfig.json     # TypeScript 配置
└── node_modules/     # 依赖
```

### 示例 package.json

```json
{
  "name": "my-project",
  "module": "index.ts",
  "type": "module",
  "scripts": {
    "dev": "bun run --watch index.ts",
    "start": "bun run index.ts",
    "test": "bun test",
    "build": "bun build ./index.ts --outdir ./dist"
  },
  "devDependencies": {
    "@types/bun": "latest"
  }
}
```

---

## TypeScript 支持

Bun 原生支持 TypeScript，无需任何配置。

### 直接运行 TypeScript

```bash
# 直接运行 .ts 文件
bun run app.ts

# 运行 .tsx 文件（React/JSX）
bun run component.tsx
```

### tsconfig.json 推荐配置

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ESNext"],
    "types": ["bun-types"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
```

### JSX 支持

```tsx
// component.tsx — 原生支持，无需配置
function App() {
  return <div>Hello Bun!</div>;
}

// 使用 Hono/JSX
import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';

const app = new Hono();

app.get('/', jsxRenderer(() => (
  <html>
    <body>
      <h1>Hello Bun + Hono + JSX!</h1>
    </body>
  </html>
)));
```

---

## 第一个程序

### 简单 HTTP 服务器

```typescript
// server.ts
const server = Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("Hello from Bun!");
  },
});

console.log(`Server running at http://localhost:${server.port}`);
```

```bash
bun run server.ts
# Server running at http://localhost:3000
```

### 文件读写

```typescript
// file.ts
const file = Bun.file("hello.txt");
await Bun.write("hello.txt", "Hello, Bun!");
const content = await file.text();
console.log(content); // Hello, Bun!
```

### SQLite 数据库

```typescript
// db.ts
const db = new Bun.SQLite("mydb.sqlite");
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)");
db.run("INSERT INTO users (name) VALUES (?)", ["Alice"]);
const users = db.query("SELECT * FROM users").all();
console.log(users);
```

---

## 使用框架

### Elysia（类 Express）

```bash
bun create elysia my-app
cd my-app
bun dev
```

```typescript
import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/user/:id", ({ params }) => `User ${params.id}`)
  .post("/data", ({ body }) => body)
  .listen(3000);
```

### Hono（轻量级）

```bash
bun create hono my-app
cd my-app
bun dev
```

### Vite + React

```bash
bun create vite my-app --template react-ts
cd my-app
bun install
bun dev
```

### Next.js

```bash
bun create next-app my-app
cd my-app
bun dev
```

---

## 环境变量

Bun 原生支持 `.env` 文件：

```bash
# .env
DATABASE_URL=postgres://localhost:5432/db
API_KEY=my-secret-key
```

```typescript
// 直接读取，无需 dotenv 包
console.log(process.env.DATABASE_URL);

// 指定 .env 文件
--env-file=.env.local

// 优先级：process.env > .env.local > .env
```

---

## 常见问题

### 与 Node.js 的兼容性

```text
Bun 目标兼容大部分 Node.js API：
✅ fs、path、http、crypto 等核心模块
✅ npm 生态（99% 的包可正常工作）
✅ CommonJS 和 ESM 模块

❌ 原生 C++ 插件（如 node-canvas、sharp）可能不兼容
❌ 某些依赖 Node.js 内部机制的包

解决方案：在 package.json 中设置 "bun" 字段指定兼容模式
```

### 常见错误

| 错误 | 解决方案 |
|------|----------|
| `bun: command not found` | 重新运行安装脚本或检查 PATH |
| `Cannot find module 'xxx'` | 运行 `bun install` 安装依赖 |
| `TypeError: Bun is not defined` | 确认使用 `bun run` 而不是 `node` 运行 |
| `EACCES: permission denied` | 使用 `sudo bun install -g`（macOS/Linux） |
| `Expected a JavaScript module` | 确认 `package.json` 中有 `"type": "module"` |
