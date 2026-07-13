# 命令行与 Wrapper

## 一、Gradle Wrapper

Wrapper 是 Gradle 推荐的项目构建方式，它确保所有开发者使用相同的 Gradle 版本。

### 生成 Wrapper

```bash
# 使用系统安装的 Gradle 生成 Wrapper
gradle wrapper --gradle-version 8.7

# 指定下载类型（all 包含源码和文档）
gradle wrapper --gradle-version 8.7 --distribution-type all
```

### Wrapper 配置文件

```properties
# gradle/wrapper/gradle-wrapper.properties
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-8.7-all.zip
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
```

### 更新 Wrapper 版本

```bash
# 更新到指定版本
./gradlew wrapper --gradle-version 8.7

# 更新到最新版
./gradlew wrapper --gradle-version latest
```

## 二、常用命令速查

```bash
# ===== 构建 =====
./gradlew build                   # 完整构建（编译 + 测试 + 打包）
./gradlew assemble                # 仅编译打包（不运行测试）
./gradlew assembleDebug           # Debug 构建
./gradlew assembleRelease         # Release 构建

# ===== 清理 =====
./gradlew clean                   # 清理构建产物
./gradlew cleanBuildCache         # 清理构建缓存

# ===== 测试 =====
./gradlew test                    # 运行单元测试
./gradlew lint                    # 代码风格检查
./gradlew check                   # 运行所有检查（test + lint 等）

# ===== 安装 =====
./gradlew installDebug            # 安装 Debug APK
./gradlew installRelease          # 安装 Release APK

# ===== 依赖 =====
./gradlew :app:dependencies       # 查看 app 模块依赖树
./gradlew buildEnvironment        # 查看构建环境
./gradlew dependencyUpdates       # 检查依赖更新（需插件）

# ===== 性能 =====
./gradlew build --scan            # 生成构建扫描报告
./gradlew build --parallel        # 并行构建
./gradlew build --build-cache     # 启用构建缓存
./gradlew build --daemon          # 使用守护进程（默认启用）
./gradlew build --no-daemon       # 不使用守护进程
./gradlew build --offline         # 离线模式（不下载依赖）
./gradlew build --refresh-dependencies  # 刷新依赖缓存
```

## 三、Gradle 守护进程

Gradle 守护进程（Daemon）是一个后台进程，在首次构建时启动，后续构建复用，可显著提升构建速度。

```bash
# 查看守护进程状态
./gradlew --status

# 停止所有守护进程
./gradlew --stop

# 配置守护进程 JVM 参数
# gradle.properties
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m
```

## 四、Task 管理

```bash
# 查看所有可用 Task
./gradlew tasks

# 查看 Task 详情
./gradlew help --task build

# 运行指定 Task
./gradlew :app:compileDebugKotlin

# 跳过测试
./gradlew build -x test

# 断点续传（从上次失败处继续）
./gradlew build --continue
```

## 五、构建缓存

```properties
# gradle.properties —— 启用构建缓存
org.gradle.caching=true
```

```bash
# 本地构建缓存（默认在 ~/.gradle/caches/）
./gradlew build --build-cache

# 远程构建缓存（需配置）
# gradle.properties
org.gradle.caching=true
org.gradle.caching.http.url=https://cache.example.com/
```

## 六、配置缓存（Gradle 7.0+）

```properties
# gradle.properties —— 启用配置缓存
org.gradle.configuration-cache=true
```

配置缓存可以缓存构建脚本的配置阶段结果，大幅优化后续构建速度：

```bash
# 首次构建会生成配置缓存
./gradlew build

# 后续构建会使用缓存
# 配置缓存命中时，配置阶段几乎瞬时完成
```

## 七、自定义构建参数

```bash
# 传递项目属性
./gradlew build -PmyProperty=myValue

# 使用系统属性
./gradlew build -Dorg.gradle.project.version=2.0

# 指定构建文件
./gradlew -b other.gradle.kts build
```

## 八、开发常用工作流

```bash
# 日常开发
./gradlew assembleDebug          # 编译 Debug

# 提交前检查
./gradlew clean test lint        # 清理 + 测试 + 检查

# 发布前构建
./gradlew clean assembleRelease  # 清理并构建 Release

# 依赖冲突排查
./gradlew :app:dependencies --configuration debugRuntimeClasspath

# 构建性能分析
./gradlew build --scan           # 打开浏览器查看报告
```
