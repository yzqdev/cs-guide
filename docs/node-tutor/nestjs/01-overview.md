---
order: 1
---

# NestJS 概述与项目搭建

NestJS 是一个用于构建高效、可扩展的 Node.js 服务端应用的框架。它使用 TypeScript，融合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式响应式编程）的理念。

## 一、NestJS 核心特性

| 特性 | 说明 |
|------|------|
| **模块化架构** | 借鉴 Angular 的模块系统，代码组织清晰 |
| **依赖注入** | 内置 DI 容器，松耦合、易测试 |
| **面向切面编程** | 通过 Guards / Interceptors / Pipes / Filters 实现横切关注点分离 |
| **TypeScript 支持** | 原生 TypeScript，类型安全 |
| **多种传输层** | 支持 HTTP / WebSocket / gRPC / GraphQL |
| **丰富的生态** | 官方和社区提供了大量模块（数据库、认证、配置等） |

## 二、环境准备

### 1. 安装 Node.js

确保已安装 Node.js v16+：

```bash
node --version   # ≥ v16
npm --version    # ≥ v8
```

### 2. 安装 NestJS CLI

```bash
npm install -g @nestjs/cli

# 验证安装
nest --version
```

## 三、创建新项目

```bash
# 创建项目
nest new my-nest-app

# 选择包管理器（npm / yarn / pnpm）
# 创建完成后进入项目目录
cd my-nest-app

# 启动开发服务器
npm run start:dev
```

项目结构：

```text
my-nest-app/
├── src/
│   ├── main.ts          # 入口文件
│   ├── app.module.ts    # 根模块
│   ├── app.controller.ts # 根控制器
│   └── app.service.ts   # 根服务
├── test/                # 测试文件
├── nest-cli.json        # Nest CLI 配置
├── tsconfig.json        # TypeScript 配置
├── tsconfig.build.json  # 构建配置
├── package.json
└── .eslintrc.js
```

## 四、入口文件分析

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();
```

- `NestFactory.create()` — 创建 Nest 应用实例
- `AppModule` — 应用的根模块
- `app.listen(3000)` — 监听 3000 端口

添加常用配置：

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 启用 CORS
    app.enableCors();

    // 设置全局路由前缀
    app.setGlobalPrefix('api');

    // 设置全局管道（自动验证）
    // app.useGlobalPipes(new ValidationPipe());

    await app.listen(3000);
    console.log('应用已启动：http://localhost:3000');
}
bootstrap();
```

## 五、启动方式

```bash
# 开发模式（热重载）
npm run start:dev

# 生产模式
npm run build
npm run start:prod

# 调试模式
npm run start:debug
```

## 六、Hello World

创建项目后默认的 `app.controller.ts`：

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    getHello(): string {
        return 'Hello NestJS!';
    }
}
```

访问 `http://localhost:3000`，返回 `Hello NestJS!`。

## 七、CLI 快速创建资源

```bash
# 创建 CRUD 资源（推荐）
nest g resource users

# 选择 REST API，自动生成：
# - users.controller.ts
# - users.service.ts
# - users.module.ts
# - users.entity.ts
# - users.dto.ts
# - 完整 CRUD 代码
```

## 八、练习

1. 使用 CLI 创建一个新的 NestJS 项目
2. 修改 `main.ts`，在启动时打印"服务器已启动"
3. 在根控制器中添加一个返回当前时间的 GET 接口
