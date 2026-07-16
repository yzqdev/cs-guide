# Spring Boot

> Spring Boot 教程，涵盖核心注解、API 开发、数据访问、日志、安全、打包部署等。

<Catalog />

## 基础教程

| 分类 | 说明 |
|------|------|
| [Spring Boot 基础教程](./basic/README.md) | 从零入门：环境搭建 → CRUD → JPA → 安全 → 部署，共 20 章 |

## 进阶专题

| 编号 | 专题 | 说明 |
|------|------|------|
| 00 | [常用注解](./00-common-annotations.md) | @Configuration、@Component、@ControllerAdvice 等 |
| 01 | [注解对比](./01-annotation-compare.md) | @Component vs @Bean、@Autowired vs @Resource |
| 02 | [自定义注解](./02-custom-annotation.md) | 元注解、反射获取注解、Spring 自定义注解实战 |
| 03 | [Controller 参数传递](./03-controller-params.md) | @PathVariable、@RequestParam、@RequestBody 详解 |
| 04 | [JSON 处理](./04-json-process.md) | Jackson、Gson、Fastjson 三大 JSON 库配置与使用 |
| 05 | [静态资源映射](./05-static-resources.md) | 静态文件映射配置与缓存策略 |
| 06 | [模板引擎](./06-template-engine.md) | Thymeleaf、Freemarker、Pebble、Velocity 对比 |
| 07 | [API 文档](./07-api-docs.md) | Swagger / SpringDoc 配置与安全放行 |
| 08 | [日志框架](./08-logging.md) | SLF4J、Log4j、Logback 详解 + 配置 |
| 09 | [AOP 请求日志](./09-aop-log.md) | AOP 实现 Web 请求日志记录切面 |
| 10 | [Spring Data JPA](./10-spring-data-jpa.md) | JPA 完整教程：实体、Repository、复杂查询、分页 |
| 11 | [CORS 跨域](./11-cors.md) | 跨域配置（Filter / Interceptor / CorsMapping） |
| 12 | [启动初始化](./12-startup-init.md) | @PostConstruct、CommandLineRunner、监听器 |
| 13 | [启动事件监听](./13-application-events.md) | ApplicationListener 启动事件顺序 |
| 14 | [JWT 认证](./14-jwt-auth.md) | java-jwt 库生成和验证 Token |
| 15 | [Shiro 整合](./15-shiro.md) | Apache Shiro 整合配置与使用 |
| 16 | [Quartz 定时任务](./16-quartz.md) | @Scheduled 注解 / Quartz API 实现定时任务 |
| 17 | [打包部署](./17-packaging.md) | Fat JAR、Thin JAR、依赖分离、Docker 镜像 |
| 18 | [GraalVM 原生编译](./18-graalvm.md) | Spring Native + GraalVM 编译原生可执行文件 |
| 19 | [其他框架](./19-other-frameworks.md) | Quarkus、Micronaut、Vert.x、Javalin、Ktor 对比 |

## 子目录

| 分类 | 说明 |
|------|------|
| [spring-why](./spring-why/README.md) | Spring 原理 — IOC、DI 依赖注入理解 |
| [spring-errors](./spring-errors/README.md) | 常见错误 — YAML、Maven、JSON、雪花 ID 等 |
| [tips](./tips/README.md) | 技巧汇总 — 注入方式、统一封装、配置类、过滤器 |
| [upgrade](./upgrade/README.md) | 版本升级 — Spring Security 新配置、JPA 语法变更 |