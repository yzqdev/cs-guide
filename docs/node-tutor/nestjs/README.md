---
order: 0
---

# NestJS 教程

<Catalog />

## 目录

| 章节 | 标题 | 内容 |
|------|------|------|
| 01 | [概述与项目搭建](./01-overview.md) | NestJS 特性、环境搭建、CLI、项目结构、Hello World |
| 02 | [控制器与路由](./02-controllers.md) | 请求方法装饰器、路径参数、查询参数、请求体、响应处理 |
| 03 | [提供者与依赖注入](./03-providers.md) | @Injectable、构造函数注入、多种 Provider 写法、作用域 |
| 04 | [模块系统](./04-modules.md) | @Module、模块导入导出、全局模块、动态模块、循环依赖 |
| 05 | [中间件](./05-middleware.md) | 函数式/类中间件、路径限定、全局中间件、第三方中间件 |
| 06 | [管道与数据验证](./06-pipes.md) | 内置管道、ValidationPipe、class-validator、自定义管道 |
| 07 | [守卫与权限控制](./07-guards.md) | AuthGuard、RolesGuard、JWT 认证守卫、角色控制 |
| 08 | [拦截器](./08-interceptors.md) | 响应包装、耗时统计、缓存、超时、日志拦截器 |
| 09 | [异常过滤器](./09-filters.md) | 内置异常、自定义异常、统一错误响应、过滤器注册 |
| 10 | [自定义装饰器](./10-decorators.md) | 参数装饰器、方法装饰器、装饰器组合、元数据反射 |
| 11 | [数据库集成](./11-database.md) | TypeORM 集成、Prisma 集成、实体关系、事务处理 |
| 12 | [JWT 认证](./12-auth.md) | JWT 配置、AuthService、Passport 策略、全局 AuthGuard |
| 13 | [文件上传](./13-file-upload.md) | 单/多文件上传、文件验证、静态文件服务、云存储 |
| 14 | [Swagger API 文档](./14-swagger.md) | Swagger 配置、DTO 文档、枚举文档、文件上传文档 |
| 15 | [配置与环境变量](./15-config.md) | ConfigModule、Joi 验证、命名配置、多环境配置 |

## 已保留的原始文件

- [CLI 命令参考](./cli.md) — NestJS CLI 命令速查表
- [反向代理配置](./proxy.md) — http-proxy-middleware 使用
- [常见技巧](./tips.md) — 模块间 Service 导入等技巧

## 推荐学习路径

1. **入门**：01 → 02 → 03 → 04（理解核心框架结构）
2. **进阶**：05 → 06 → 07 → 08 → 09 → 10（掌握 NestJS 核心特性）
3. **实战**：11 → 12 → 13 → 14 → 15（数据库、认证、上传、文档、配置）
