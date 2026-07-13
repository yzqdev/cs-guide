# Bun 内置 API

> Bun 提供了一系列高性能的内置 API，无需安装任何第三方包即可使用。

---

## 文件系统 (Bun.file / Bun.write)

### 读取文件

```typescript
// 读取文本文件
const file = Bun.file("data.txt");
const text = await file.text();
console.log(text);

// 读取为 JSON
const json = await Bun.file("data.json").json();
console.log(json);

// 读取为二进制 ArrayBuffer
const buffer = await Bun.file("image.png").arrayBuffer();

// 读取为 ReadableStream
const stream = Bun.file("big-file.txt").stream();

// 获取文件信息
const stats = Bun.file("data.txt");
console.log(stats.size);      // 文件大小（字节）
console.log(stats.type);      // MIME 类型
console.log(stats.lastModified); // 最后修改时间
```

### 写入文件

```typescript
// 写入文本
await Bun.write("output.txt", "Hello, Bun!");

// 写入 JSON
await Bun.write("data.json", JSON.stringify({ name: "Bun" }));

// 写入 Buffer
const buffer = new TextEncoder().encode("Hello");
await Bun.write("output.bin", buffer);

// 复制文件
await Bun.write("copy.txt", Bun.file("original.txt"));

// 追加写入（使用文件写入器）
const file = Bun.file("log.txt");
const writer = file.writer();
writer.write("line 1\n");
writer.write("line 2\n");
writer.end();
```

### 目录操作

```typescript
// 读取目录
const dir = Bun.readdir("./src");
for await (const entry of dir) {
  console.log(entry); // 文件名
}

// 同步读取
const entries = Array.from(Bun.readdirSync("./src"));

// 判断路径类型
const path = Bun.file("src");
console.log(path.size);        // 文件大小
// 使用 fs.stat 获取目录信息
import { stat } from "node:fs/promises";
const info = await stat("src");
console.log(info.isDirectory()); // true/false
```

---

## HTTP 服务器 (Bun.serve)

### 基础服务器

```typescript
// server.ts
const server = Bun.serve({
  port: 3000,

  // 处理请求
  fetch(request) {
    return new Response("Hello from Bun!");
  },

  // 错误处理
  error(error) {
    return new Response("Server Error", { status: 500 });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
```

### 路由处理

```typescript
Bun.serve({
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);

    switch (url.pathname) {
      case "/":
        return new Response("Home Page");

      case "/api/users":
        return Response.json([
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
        ]);

      case "/api/data":
        if (request.method === "POST") {
          // 解析 JSON 请求体
          const body = await request.json();
          return Response.json({ received: body });
        }
        return new Response("Method Not Allowed", { status: 405 });

      default:
        return new Response("Not Found", { status: 404 });
    }
  },
});
```

### 静态文件服务

```typescript
Bun.serve({
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);
    let filePath = url.pathname;

    // 默认返回 index.html
    if (filePath === "/") filePath = "/index.html";

    // 尝试读取文件
    const file = Bun.file(`./public${filePath}`);

    // 检查文件是否存在
    return new Response(file);
  },
});
```

### TLS/SSL

```typescript
Bun.serve({
  port: 443,
  tls: {
    cert: Bun.file("cert.pem"),
    key: Bun.file("key.pem"),
  },
  fetch(request) {
    return new Response("Secure connection!");
  },
});
```

### WebSocket

```typescript
Bun.serve({
  port: 3000,
  fetch(request, server) {
    // 升级 WebSocket 连接
    if (server.upgrade(request)) {
      return; // 升级成功后不再返回 Response
    }
    return new Response("WebSocket Server");
  },
  websocket: {
    // 客户端连接时
    open(ws) {
      console.log("Client connected");
      ws.send("Welcome!");
    },
    // 收到消息时
    message(ws, message) {
      console.log("Received:", message);
      // 广播给所有客户端
      ws.send(`Echo: ${message}`);
    },
    // 客户端断开时
    close(ws) {
      console.log("Client disconnected");
    },
  },
});
```

---

## SQLite 数据库 (Bun.SQLite)

Bun 内置 SQLite 支持，无需安装 `better-sqlite3` 等第三方库。

### 基本操作

```typescript
// 创建/打开数据库
const db = new Bun.SQLite("mydb.sqlite");

// 创建表
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    age INTEGER
  )
`);

// 插入数据
db.run("INSERT INTO users (name, email, age) VALUES (?, ?, ?)", [
  "Alice",
  "alice@example.com",
  30,
]);

// 批量插入（事务）
const insert = db.prepare(
  "INSERT INTO users (name, email, age) VALUES ($name, $email, $age)"
);

db.transaction(() => {
  insert.run({ $name: "Bob", $email: "bob@example.com", $age: 25 });
  insert.run({ $name: "Charlie", $email: "charlie@example.com", $age: 35 });
})();
```

### 查询数据

```typescript
// 查询所有行
const users = db.query("SELECT * FROM users").all();
console.log(users);
// [{ id: 1, name: "Alice", email: "alice@example.com", age: 30 }, ...]

// 查询单行
const user = db.query("SELECT * FROM users WHERE id = ?").get(1);

// 参数化查询（防止 SQL 注入）
const results = db
  .query("SELECT * FROM users WHERE age > $minAge")
  .all({ $minAge: 20 });

// 遍历结果
const query = db.query("SELECT * FROM users");
for (const row of query.iter()) {
  console.log(row.name, row.email);
}

// 查询结果数量
const count = db.query("SELECT COUNT(*) as count FROM users").get();
console.log(count.count);
```

### 内存数据库

```typescript
const db = new Bun.SQLite(":memory:");

// 写入内存数据库（速度快，但不持久化）
// 适合缓存、临时数据、测试
```

### 数据库配置

```typescript
const db = new Bun.SQLite("mydb.sqlite", {
  // 启用 WAL 模式（写入性能更好）
  readwrite: true,
  create: true,

  // 严格模式
  strict: true,
});

// WAL 模式
db.run("PRAGMA journal_mode = WAL");

// 设置超时
db.exec("PRAGMA busy_timeout = 5000");
```

---

## 密码学 (Bun.CryptoHasher / Crypto)

### 哈希

```typescript
import { Hash } from "bun";

// SHA-256 哈希
const hash = await Hash.sha256("hello");
console.log(hash); // 十六进制字符串

// SHA-512
const hash512 = await Hash.sha512("hello");

// 流式哈希
const hasher = new Hash("sha256");
hasher.update("hello ");
hasher.update("world");
const result = hasher.digest("hex");
console.log(result); // "b94d27b9934d3e08..."
```

### 密码安全

```typescript
// 密码哈希
const password = "my-secret-password";
const hash = await Bun.password.hash(password);
// 默认使用 bcrypt，结果格式：$2b$10$...

// 验证密码
const isValid = await Bun.password.verify(password, hash);
console.log(isValid); // true

// 指定算法
const argonHash = await Bun.password.hash(password, {
  algorithm: "argon2id", // 更安全的算法
  timeCost: 2,
  memoryCost: 19456,
});
```

### 随机数与 UUID

```typescript
// 加密安全随机数
const randomBytes = crypto.getRandomValues(new Uint8Array(16));

// UUID v4
const uuid = crypto.randomUUID();
console.log(uuid); // "550e8400-e29b-41d4-a716-446655440000"
```

---

## 进程与环境

### 子进程 (Bun.spawn)

```typescript
// 执行命令
const proc = Bun.spawn(["echo", "Hello from Bun!"]);
const output = await new Response(proc.stdout).text();
console.log(output); // "Hello from Bun!\n"

// 管道输入
const proc = Bun.spawn(["cat"], {
  stdin: new Blob(["Hello world"]),
});
console.log(await new Response(proc.stdout).text()); // "Hello world"

// 指定工作目录和环境变量
Bun.spawn(["npm", "test"], {
  cwd: "./my-project",
  env: { ...process.env, NODE_ENV: "test" },
  stdio: ["inherit", "inherit", "inherit"], // 继承控制台
});
```

### 环境变量

```typescript
// 读取 .env 文件
Bun.env.API_KEY;           // 从 .env 自动加载
process.env.API_KEY;       // 兼容 Node.js 方式

// 所有环境变量
console.log(Bun.env);

// 检查环境
if (Bun.env.NODE_ENV === "development") {
  console.log("开发模式");
}
```

---

## 全局工具

### 性能测试

```typescript
// 基准测试
const result = Bun.CryptoHasher.hash("sha256", "hello");

// 使用 performance 测量
const start = performance.now();
// ... 你的代码 ...
const end = performance.now();
console.log(`耗时: ${end - start}ms`);
```

### Console 增强

```typescript
// Bun 的 console 支持彩色输出
console.log("普通消息");
console.warn("警告消息");
console.error("错误消息");

// 查看对象
console.table([{ name: "Alice", age: 30 }]);

// 性能追踪
console.time("操作");
// ... 代码 ...
console.timeEnd("操作"); // "操作: 1.234ms"
```

---

## API 速查表

| API | 用途 | 示例 |
|-----|------|------|
| `Bun.file(path)` | 读取文件 | `Bun.file("data.json").json()` |
| `Bun.write(path, data)` | 写入文件 | `Bun.write("out.txt", "hello")` |
| `Bun.serve({...})` | HTTP 服务器 | `Bun.serve({port:3000, fetch})` |
| `Bun.SQLite(path)` | SQLite 数据库 | `new Bun.SQLite("db.sqlite")` |
| `Bun.hash(data)` | 生成哈希 | `Bun.hash("hello")` |
| `Bun.password.hash(pwd)` | 密码加密 | `Bun.password.hash("secret")` |
| `Bun.password.verify(pwd, hash)` | 密码验证 | `Bun.password.verify("secret", hash)` |
| `Bun.spawn(cmd)` | 执行命令 | `Bun.spawn(["ls", "-la"])` |
| `Bun.env` | 环境变量 | `Bun.env.PATH` |
| `Bun.version` | 版本号 | `Bun.version` |
| `Bun.readdir(path)` | 读取目录 | `Bun.readdir("./src")` |
| `Bun.build({...})` | 代码打包 | `Bun.build({entry, outdir})` |
| `Bun.write(fd, data)` | 写入文件描述符 | `Bun.write(stdout, "hello")` |
| `Bun.stdin()` | 标准输入 | `Bun.stdin.stream()` |
| `crypto.randomUUID()` | 生成 UUID | `crypto.randomUUID()` |
