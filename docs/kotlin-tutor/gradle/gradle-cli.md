# Gradle 命令

> Gradle 命令行常用操作速查。

## Gradle Wrapper 下载慢

### 第一种方法：修改 distributionUrl

把 `gradle-wrapper.properties` 中的 `distributionUrl` 改为国内镜像：

```properties
distributionUrl=http\://mirrors.cloud.tencent.com/gradle/gradle-8.5-all.zip
```

不过这样的话每个项目的 `gradle-wrapper.properties` 都要改，太麻烦了。

### 第二种方法：手动下载并放置

将 `gradle-8.5-all.zip` 下载后丢到以下目录：

```
D:\configuration\.gradle\wrapper\dists\gradle-8.4-all\56r6xik2f6skrm47et0ibifug
```

然后重新运行 `./gradlew build`，Gradle 会自动识别 zip 包并解压。

### 第三种方法：使用代理

在全局的 `.gradle` 文件夹放一个 `gradle.properties` 文件，写入如下内容：

```properties
systemProp.jdk.http.auth.tunneling.disabledSchemes=""
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=7890
```

使用 Clash 等代理工具。然后运行：

```shell
./gradlew wrapper --gradle-version 8.4 --distribution-type all
```

## 常用命令速查

```shell
# 构建项目
./gradlew build

# 清理构建
./gradlew clean

# 运行应用
./gradlew run

# 运行测试
./gradlew test

# 查看可用的 task
./gradlew tasks

# 查看依赖树
./gradlew :app:dependencies

# 查看单个依赖的来源
./gradlew :app:dependencyInsight --dependency kotlin-stdlib --configuration debugCompileClasspath

# 更新 Gradle Wrapper 版本
./gradlew wrapper --gradle-version 8.7

# 并行构建（加速）
./gradlew build --parallel --max-workers=4
```

## 依赖分析

```shell
./gradlew :app:dependencyInsight --dependency kotlin-stdlib --configuration debugcompileClasspath
```
