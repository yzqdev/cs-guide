# 使用graalvm

## 下载安装

下载地址[https://github.com/graalvm/graalvm-ce-builds/releases](https://github.com/graalvm/graalvm-ce-builds/releases)

解压后直接配置`JAVA_HOME`为`C:\Users\yanni\.jdks\graalvm-ce-java17-22.1.0`
再配置`GRAALVM_HOME`为`C:\Users\yanni\.jdks\graalvm-ce-java17-22.1.0`
安装 GraalVM Native Image，运行命令：

```shell
gu install native-image
```

通过上述步骤，已经安装好了 GraalVM 的基础组件，如果需要额外支持 Python、R 等语言，需要使用 gu 组件。

```shell
gu install ruby
gu install r
gu install python
gu install wasm
```

### 配置好springboot项目

可以再[https://start.spring.io/](https://start.spring.io/)查看spring-native配置

## 注意事项

该插件在 Maven 中央仓库不存在，需要指定 pluginRepositories 和 repositories：
先在`$userhome/.m2`文件夹把settings.xml里面的mirror改一下

```xml
<mirror>
      <id>aliyunmaven</id>
      <mirrorOf>*,!papermc-repo,!spigotmc-repo,!placeholderapi,!citizens-repo,!jitpack.io,!dmulloy2-repo,!spring-releases</mirrorOf>
      <name>阿里云公共仓库</name>

      <url>https://maven.aliyun.com/repository/public</url>
    </mirror>
```

添加源

```xml
<repositories>
    <repository>
        <id>spring-milestones</id>
        <name>Spring Milestones</name>
        <url><https://repo.spring.io/milestone></url>
    </repository>
</repositories>
<pluginRepositories>
    <pluginRepository>
        <id>spring-milestones</id>
        <name>Spring Milestones</name>
        <url><https://repo.spring.io/milestone></url>
    </pluginRepository>
</pluginRepositories>
```

### 打包

```shell

mvn -Pnative -DskipTests package
```

<https://juejin.cn/post/6847902225012883469>
