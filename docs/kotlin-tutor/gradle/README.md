# Gradle 教程

> Gradle 是 Android 和 Kotlin 多平台项目的官方构建系统。

<Catalog />

## 目录

| 章节 | 标题 | 内容 |
|------|------|------|
| 01 | [Gradle 简介与基础](./01-intro.md) | 安装、Wrapper、项目结构、构建生命周期、Task 基础 |
| 02 | [构建脚本与依赖管理](./02-build-script.md) | KTS 基础、依赖配置、版本管理、自定义 Task/Plugin |
| 03 | [Android 构建配置](./03-agp-config.md) | AGP 版本、完整 build.gradle.kts、签名、多渠道、ABI 拆分 |
| 04 | [镜像与仓库配置](./04-mirror-repo.md) | 国内镜像、全局配置、Wrapper 加速、JitPack |
| 05 | [命令行与 Wrapper](./05-cli-wrapper.md) | 常用命令、守护进程、构建缓存、Task 管理 |
| 06 | [版本目录](./06-version-catalog.md) | libs.versions.toml、BOM、Bundle、多目录 |
| 07 | [KTS 迁移](./07-kts-migration.md) | Groovy → Kotlin DSL 对照表、迁移步骤、常见问题 |
| 08 | [打包与发布](./08-publishing.md) | JAR/Fat JAR、Spring Boot、Android AAR、Compose Desktop、Maven Central |
| 09 | [高级技巧](./09-tips.md) | ext/extra、外部脚本、includeBuild、冲突解决、Split ABI |
| 10 | [基础用法详解](./10-basic-usage.md) | Task 生命周期、文件操作、日志、增量构建、多模块配置 |
| 11 | [插件开发](./11-plugin-dev.md) | 脚本插件、buildSrc、预编译脚本、独立发布、测试、最佳实践 |

## 推荐学习路径

1. **入门**：01 → 02 → 05 → 10（理解基本概念和常用命令）
2. **Android**：03 → 04（配置 Android 项目和镜像源）
3. **进阶**：06 → 07 → 08（版本管理、KTS 迁移、打包发布）
4. **工程化**：09（高级技巧和最佳实践）
5. **高阶**：11（插件开发，自定义构建逻辑）
