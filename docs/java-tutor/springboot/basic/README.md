# Spring Boot 基础教程

> 从零开始学习 Spring Boot，涵盖开发环境搭建、REST API、数据访问、安全、测试、部署等核心主题。

<Catalog />

## 教程目录

### Part 1 — 入门基础

| # | 文件 | 内容 |
|---|------|------|
| 00 | [00-overview.md](./00-overview.md) | Spring Boot 概述、环境搭建、创建项目、Hello World |
| 01 | [01-quick-start.md](./01-quick-start.md) | 快速入门：第一个 CRUD 应用、三层架构 |
| 02 | [02-project-structure.md](./02-project-structure.md) | 项目结构详解、启动原理、配置体系、多环境配置 |
| 03 | [03-rest-api.md](./03-rest-api.md) | RESTful API 开发、参数接收、DTO、统一响应 |
| 04 | [04-bean-management.md](./04-bean-management.md) | IoC/DI、Bean 声明、注入方式、作用域、生命周期 |
| 05 | [05-configuration.md](./05-configuration.md) | 配置管理：@Value、@ConfigurationProperties、多环境 |

### Part 2 — 数据访问

| # | 文件 | 内容 |
|---|------|------|
| 06 | [06-data-jpa.md](./06-data-jpa.md) | Spring Data JPA 完整教程：实体映射、Repository、@Query、分页、事务 |
| 07 | [07-database.md](./07-database.md) | 其他数据库：MyBatis、Redis、MongoDB、多数据源配置 |

### Part 3 — Web 开发进阶

| # | 文件 | 内容 |
|---|------|------|
| 08 | [08-validation.md](./08-validation.md) | 参数校验：Bean Validation、分组校验、自定义注解 |
| 09 | [09-exception.md](./09-exception.md) | 异常处理：全局异常处理器、统一响应体、错误码 |
| 10 | [10-testing.md](./10-testing.md) | 测试：单元测试、MockMvc、DataJpaTest、集成测试 |
| 11 | [11-actuator.md](./11-actuator.md) | Actuator 监控：健康检查、指标、日志管理、自定义端点 |
| 12 | [12-security.md](./12-security.md) | Spring Security：用户认证、JWT、权限控制、CORS |
| 13 | [13-aop.md](./13-aop.md) | AOP 面向切面：日志切面、性能监控、权限校验 |
| 14 | [14-file-upload.md](./14-file-upload.md) | 文件上传下载、云存储（OSS）、文件校验 |
| 15 | [15-caching.md](./15-caching.md) | 缓存：@Cacheable、Caffeine、Redis 缓存 |
| 16 | [16-async.md](./16-async.md) | 异步任务与定时任务：@Async、@Scheduled、Cron 表达式 |
| 17 | [17-websocket.md](./17-websocket.md) | WebSocket：实时通信、Stomp、消息推送 |
| 18 | [18-logging.md](./18-logging.md) | 日志：SLF4J/Logback、MDC、Log4j2、日志级别管理 |
| 19 | [19-deploy.md](./19-deploy.md) | 打包部署：JAR/WAR、Docker、Docker Compose、性能优化 |

## 前置知识

- Java 基础（参考 [Java 基础教程](../../basic/README.md)）
- 了解 Maven 或 Gradle 基本使用
- 了解关系型数据库和 SQL 基础

## 学习建议

1. **按顺序学习**：从 Part 1 开始，打好基础再进入 Part 2 和 Part 3
2. **动手实践**：每个章节末尾都有练习，务必亲手实现
3. **参考已有内容**：学完基础后，参考 [Spring Boot 进阶](../README.md) 中的更多专题
