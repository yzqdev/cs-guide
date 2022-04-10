# 添加镜像源

## 全局镜像源

maven的默认配置文件在 `$home/.m2/settings.xml` 需要自己从maven配置文件(maven/conf/settings.xml)复制过来
参见阿里云的依赖教程
[https://maven.aliyun.com/mvn/guide](https://maven.aliyun.com/mvn/guide)

```xml
# 加入如下代码
# 这是本地储存依赖的位置
<localRepository>D:\configuration\repomaven</localRepository>
# 加入阿里镜像源
  <mirror>
      <id>aliyunmaven</id>
      <mirrorOf>*,!papermc-repo,!spigotmc-repo,!placeholderapi,!citizens-repo,!jitpack.io,!dmulloy2-repo</mirrorOf>
      <name>阿里云公共仓库</name>

      <url>https://maven.aliyun.com/repository/public</url>
    </mirror>
```

## 单项目配置

在项目的pom.xml中添加类似下面的

```xml
<repositories>
    <repository>
        <id>aliyunmaven</id>
        <url>https://maven.aliyun.com/repository/public</url>
    </repository>
</repositories>
```

## 版本管理

maven其实也可以使用版本范围
![版本](./res/maven-version.png)  

因为JSON协议以及fastjson库的兼容性和稳定性都非常好，所以才可以考虑自动升级到最新版本，pom.xml中依赖配置这样写，将自动引用版本大于等于1.2.60的fastjson

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>[1.2.60, )</version>
</dependency>
```

注意`[1.2.60, )`这种方式会下载1.2.60到最新版直接所有的包的索引,强迫症患者慎用

![索引](./res/maven-index.webp)

## vue项目添加到springboot

直接把打包文件放到static文件夹即可
