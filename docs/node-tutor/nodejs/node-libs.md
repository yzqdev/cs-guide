---
order: 11
---

# Node.js 常用库与框架

收集整理了 Node.js 生态中常用的框架、库和工具，方便查阅。

> 图标说明：⭐ 强烈推荐 · 📦 npm 包 · 🔧 工具

---

## 一、Web 框架

### API 服务框架

| 框架 | 说明 | 官网 |
|------|------|------|
| ⭐ **Express** | 最流行的 Node.js Web 框架，简洁灵活，中间件生态丰富 | https://expressjs.com |
| ⭐ **Koa** | Express 原班人马打造，使用 async/await，更轻量 | https://koajs.com |
| ⭐ **NestJS** | 渐进式框架，支持 TypeScript，借鉴 Angular 架构 | https://docs.nestjs.com |
| **Fastify** | 高性能框架，速度极快，内置 JSON Schema 验证 | https://fastify.dev |
| **Midway** | 阿里出品，TypeScript 全栈框架，支持多种部署模式 | https://www.midwayjs.org |
| **Hono** | 超轻量（~12KB），支持多种运行环境（Node/Deno/Bun/Cloudflare） | https://hono.dev |
| **Elysia** | 基于 Bun 的高性能框架，类型安全，开发体验优秀 | https://elysiajs.com |
| **Serverless** | 无服务器框架，支持 AWS/阿里云/腾讯云等多云部署 | https://cn.serverless.com |

### 全栈框架

| 框架 | 说明 | 官网 |
|------|------|------|
| ⭐ **Next.js** | React 全栈框架，支持 SSR/SSG/ISR，App Router | https://nextjs.org |
| ⭐ **Nuxt.js** | Vue 全栈框架，支持 SSR/SSG，Vue 3 | https://nuxt.com |
| **Remix** | React 全栈框架，基于 Web 标准，嵌套路由 | https://remix.run |
| **SvelteKit** | Svelte 全栈框架，编译时框架，体积小 | https://kit.svelte.dev |
| **AdonisJS** | Node.js 全栈框架，类似 Laravel，内置 ORM/验证/认证 | https://adonisjs.com |

---

## 二、数据库

### ORM / 数据库驱动

| 库 | 说明 | 官网 |
|----|------|------|
| ⭐ **Prisma** | 下一代 ORM，类型安全，自动生成类型，支持 PostgreSQL/MySQL/SQLite/MongoDB 等 | https://www.prisma.io |
| ⭐ **TypeORM** | TypeScript ORM，支持 Active Record 和 Data Mapper 模式 | https://typeorm.io |
| **Drizzle ORM** | 轻量级 TypeScript ORM，SQL-like API，性能优秀 | https://orm.drizzle.team |
| **Sequelize** | 老牌 ORM，支持 PostgreSQL/MySQL/MariaDB/SQLite | https://sequelize.org |
| **Knex.js** | SQL 查询构建器，支持链式调用，可配合多种数据库 | https://knexjs.org |
| **Mongoose** | MongoDB ODM，提供 Schema 验证、中间件等 | https://mongoosejs.com |
| **better-sqlite3** | 同步 SQLite 驱动，速度极快，API 简洁 | https://github.com/WiseLibs/better-sqlite3 |
| **ioredis** | 功能完善的 Redis 客户端，支持集群/哨兵/Pipeline | https://github.com/redis/ioredis |
| **node-postgres** | PostgreSQL 原生驱动，轻量可靠 | https://node-postgres.com |

### 数据库工具

| 工具 | 说明 | 官网 |
|------|------|------|
| **Redis Commander** | Redis 图形化管理工具 | https://github.com/joeferner/redis-commander |
| **AdminJS** | 自动生成后台管理面板 | https://adminjs.co |
| **Drizzle Studio** | Drizzle ORM 配套的数据库浏览器 | https://orm.drizzle.team/drizzle-studio |

---

## 三、测试

| 库 | 说明 | 官网 |
|----|------|------|
| ⭐ **Vitest** | 新一代测试框架，与 Vite 集成，速度极快 | https://vitest.dev |
| ⭐ **Jest** | 最流行的测试框架，零配置，内置断言/mock/覆盖率 | https://jestjs.io |
| **Mocha** | 灵活可扩展的测试框架 | https://mochajs.org |
| **Playwright** | 微软出品，端到端测试，跨浏览器 | https://playwright.dev |
| **Supertest** | HTTP 接口测试库，常与 Jest/Mocha 配合 | https://github.com/ladjs/supertest |

---

## 四、工具库

| 库 | 说明 | 官网 |
|----|------|------|
| ⭐ **Lodash** | 实用工具函数库（深拷贝、去重、合并等） | https://lodash.com |
| **Day.js** | 轻量级日期处理库，API 兼容 Moment.js | https://day.js.org |
| **date-fns** | 函数式日期处理库，按需引入 | https://date-fns.org |
| **Zod** | TypeScript 模式验证库，类型安全 | https://zod.dev |
| **yup** | 模式验证库，常用于表单验证 | https://github.com/jquense/yup |
| **Axios** | HTTP 客户端，支持浏览器和 Node.js | https://axios-http.com |
| **node-fetch** | 浏览器 fetch API 的 Node.js 实现 | https://github.com/node-fetch/node-fetch |
| **nanoid** | 轻量级唯一 ID 生成器，比 UUID 更快更短 | https://github.com/ai/nanoid |
| **uuid** | UUID 生成库 | https://github.com/uuidjs/uuid |
| **dotenv** | 从 `.env` 文件加载环境变量 | https://github.com/motdotla/dotenv |
| **chalk** | 终端彩色输出 | https://github.com/chalk/chalk |
| **winston** | 功能完善的日志库，支持多传输通道 | https://github.com/winstonjs/winston |
| **pino** | 超低开销的日志库，适合生产环境 | https://getpino.io |
| **commander** | 命令行工具框架，解析参数和生成帮助 | https://github.com/tj/commander.js |
| **yargs** | 命令行参数解析库 | https://yargs.js.org |
| **sharp** | 高性能图片处理（缩放、格式转换等） | https://sharp.pixelplumbing.com |

---

## 五、认证与安全

| 库 | 说明 | 官网 |
|----|------|------|
| ⭐ **Passport** | 认证中间件，支持 500+ 策略（OAuth/JWT/本地等） | https://www.passportjs.org |
| **jsonwebtoken** | JWT 签发与验证 | https://github.com/auth0/node-jsonwebtoken |
| **bcrypt** | 密码哈希（加盐） | https://github.com/kelektiv/node.bcrypt.js |
| **helmet** | 设置安全相关的 HTTP 头 | https://helmetjs.github.io |
| **cors** | 跨域资源共享中间件 | https://github.com/expressjs/cors |
| **express-rate-limit** | 请求频率限制 | https://github.com/express-rate-limit/express-rate-limit |

---

## 六、文件上传

| 库 | 说明 | 官网 |
|----|------|------|
| **multer** | Express 文件上传中间件 | https://github.com/expressjs/multer |
| **busboy** | 流式表单解析器 | https://github.com/mscdex/busboy |
| **sharp** | 图片处理（缩放、裁剪、格式转换） | https://sharp.pixelplumbing.com |
| **cwebp** | 图片转 WebP 格式工具的 Node 绑定 | https://developers.google.cn/speed/webp/download |

---

## 七、实时通信

| 库 | 说明 | 官网 |
|----|------|------|
| ⭐ **Socket.IO** | WebSocket 封装，支持房间/命名空间/自动重连 | https://socket.io |
| **ws** | 轻量级 WebSocket 库 | https://github.com/websockets/ws |
| **MQTT.js** | MQTT 协议客户端，适合 IoT 场景 | https://github.com/mqttjs/MQTT.js |

---

## 八、任务调度

| 库 | 说明 | 官网 |
|----|------|------|
| **node-cron** | 基于 cron 表达式的任务调度 | https://github.com/node-cron/node-cron |
| **Bull** | Redis 驱动的任务队列，支持延迟/重复/优先级 | https://github.com/OptimalBits/bull |
| **Agenda** | MongoDB 驱动的任务调度器 | https://github.com/agenda/agenda |
| **node-schedule** | 灵活的定时任务调度 | https://github.com/node-schedule/node-schedule |

---

## 九、开发工具

| 工具 | 说明 | 官网 |
|------|------|------|
| ⭐ **nodemon** | 文件变更时自动重启 Node.js 应用 | https://nodemon.io |
| **ts-node** | TypeScript 直接运行，无需编译 | https://typestrong.org/ts-node |
| **tsx** | 增强版 ts-node，更快更现代 | https://github.com/privatenumber/tsx |
| **esbuild** | 极速 JavaScript/TypeScript 打包器 | https://esbuild.github.io |
| **PM2** | 生产环境进程管理器，支持负载均衡/日志/监控 | https://pm2.keymetrics.io |
| **concurrently** | 同时运行多个命令（如前后端并行开发） | https://github.com/open-cli/concurrently |
| **husky** | Git hooks 工具（提交前自动格式化/测试） | https://typicode.github.io/husky |
| **lint-staged** | 仅对暂存文件运行 linter | https://github.com/okonet/lint-staged |

---

## 十、构建与打包

| 工具 | 说明 | 官网 |
|------|------|------|
| **Webpack** | 模块打包器，功能强大，插件生态丰富 | https://webpack.js.org |
| **Vite** | 下一代前端构建工具，开发服务器秒级启动 | https://vitejs.dev |
| **Turbopack** | Vercel 出品，基于 Rust 的增量打包器 | https://turbo.build/pack |
| **SWC** | 基于 Rust 的 JavaScript/TypeScript 编译器 | https://swc.rs |

---

> 以上列表会持续更新。更多推荐可查看 Awesome Node.js 列表：https://github.com/sindresorhus/awesome-nodejs
