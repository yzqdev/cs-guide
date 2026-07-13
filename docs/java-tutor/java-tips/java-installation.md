# Java 安装与配置

> JDK 下载、环境变量配置、版本切换及常见问题指南。

## JDK 下载地址

| 来源 | 地址 | 说明 |
|------|------|------|
| Liberica JDK | <https://bell-sw.com/pages/downloads/> | 推荐，含 OpenJFX |
| Adoptium (Eclipse Temurin) | <https://adoptium.net/> | 官方 OpenJDK 构建 |
| Oracle JDK 存档 | <https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html> | 仅下载，商用需授权 |
| 国内镜像 | <https://www.injdk.cn/> | 各类 JDK 下载 |
| 清华镜像 (AdoptOpenJDK) | <https://mirror.tuna.tsinghua.edu.cn/AdoptOpenJDK/> | 推荐 OpenJ9 版本，内存占用少 |

:::tip
Oracle JDK 1.8 之后已不可免费商用，建议使用 AdoptOpenJDK 或 Liberica JDK。推荐使用压缩包版本，方便多版本管理。
:::

## 环境变量配置

### Windows

1. 新建系统变量 `JAVA_HOME`，变量值为 JDK 解压路径，例如：
   - 变量名：`JAVA_HOME`
   - 变量值：`C:\Users\yzqde\.jdks\jdk8u302-b08`

2. 编辑系统变量 `Path`，添加：
   ```
   %JAVA_HOME%\bin
   ```

:::tip
建议将 `%JAVA_HOME%\bin` 放在 `Path` 的最前面，避免系统目录下的旧版 java.exe 被优先调用。
:::

## 版本切换问题

### 切换版本后 `java -version` 没有变化？

**原因：** Windows 系统目录 `C:\WINDOWS\system32` 中存在旧的 `java.exe`，优先级高于 `JAVA_HOME` 配置。

**解决方法：**

1. 检查 `C:\WINDOWS\system32` 下是否存在 `java.exe`
2. 将 `%JAVA_HOME%\bin` 移到 `Path` 环境变量的最前面

## macOS / Linux

```bash
# 使用 sdkman 管理多版本 JDK（推荐）
curl -s "https://get.sdkman.io" | bash
sdk list java
sdk install java 17.0.2-tem
sdk use java 17.0.2-tem

# 或手动配置
export JAVA_HOME=/path/to/jdk-17
export PATH=$JAVA_HOME/bin:$PATH
```
