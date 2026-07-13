# Node.js 学习笔记

<Catalog />

## 目录

| 章节 | 标题 | 内容 |
|------|------|------|
| 01 | [Node.js 简介与环境搭建](./01-intro.md) | 安装、REPL、第一个程序、全局对象、console |
| 02 | [模块系统](./02-modules.md) | CommonJS、ES Modules、exports/require、核心模块一览 |
| 03 | [文件系统（fs 模块）](./03-fs.md) | 文件读写、目录操作、文件监控、JSON 存取、Stream 基础 |
| 04 | [路径与操作系统模块](./04-path-os.md) | path（拼接/解析/安全）、os（CPU/内存/网络/系统信息） |
| 05 | [HTTP 模块](./05-http.md) | 创建服务器、路由处理、静态文件、RESTful API、HTTP 客户端 |
| 06 | [npm 包管理](./06-npm.md) | package.json、安装/卸载、npm scripts、npx、发布包 |
| 07 | [异步编程](./07-async.md) | 回调、Promise、async/await、EventEmitter、并发控制 |
| 08 | [Buffer 与 Stream](./08-buffer-stream.md) | Buffer 操作、可读/可写/转换流、pipe 管道、背压处理 |
| 09 | [Express 框架入门](./09-express.md) | 路由、中间件、请求/响应对象、路由模块化、RESTful API |
| 10 | [错误处理与调试](./10-errors.md) | try/catch、Promise 错误、自定义错误、日志、调试技巧 |

## 推荐学习路径

1. **入门**：01 → 02（先了解 Node.js 是什么，模块如何工作）
2. **基础**：03 → 04 → 06（核心模块与包管理）
3. **进阶**：05 → 07 → 08（网络开发与异步编程）
4. **框架**：09（Express 实战）
5. **完善**：10（错误处理与生产环境最佳实践）

## 其他资源

- 框架列表：[node-libs.md](./node-libs.md)
- 常见问题：[node-tip.md](./node-tip.md)
