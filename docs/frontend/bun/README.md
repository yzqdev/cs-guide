# Bun 教程

> Bun 是一个快速的全能型 JavaScript 运行时、打包器、测试运行器和包管理器，旨在替代 Node.js。[官方文档](https://bun.sh/docs)

---

## 目录

- [安装与项目创建](./setup) — 安装 Bun、初始化项目、TypeScript 支持
- [常用命令与包管理](./commands) — CLI 命令、npm 兼容性、脚本运行
- [内置 API](./apis) — 文件系统、HTTP 服务器、SQLite、加密等

---

## 为什么选择 Bun？

| 特性 | Bun | Node.js |
|------|-----|---------|
| 启动速度 | 极快（Zig 编译） | 较慢 |
| 包管理器 | 内置（比 npm 快 10-30x） | 需 npm/pnpm/yarn |
| 打包器 | 内置 Bun.build | 需 webpack/vite/esbuild |
| 测试框架 | 内置 Bun.test（兼容 Jest） | 需 vitest/jest |
| 运行环境 | 类 Node.js 兼容 | 标准 |
| TypeScript | 原生支持，无需配置 | 需 ts-node/tsx |
| JSX/TSX | 原生支持 | 需配置 |
| 文件读取 | 内置 Bun.file() | 需 fs 模块 |
| SQLite | 内置 Bun.sqlite() | 需第三方库 |

---

## 版本要求

```bash
bun --version    # 查看当前版本
# 推荐使用 v1.2+ 版本
# 升级：bun upgrade
```

---

## 相关资源

- [Bun 官方文档](https://bun.sh/docs)
- [Bun GitHub](https://github.com/oven-sh/bun)
- [Bun 官方 Discord](https://discord.gg/CXDkvfN)
- [Awesome Bun](https://github.com/apvarun/awesome-bun)
