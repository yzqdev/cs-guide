# maven插件推荐

## 配置使用java17编译

```xml
 <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>17</source>
                    <target>17</target>
                </configuration>
            </plugin>
```

## 配置打包跳过tests

```xml
<!-- maven 打包时跳过测试 -->
            <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <configuration>
          <skip>true</skip>
        </configuration>
      </plugin>
```

## Do not use @ for indentation错误解决方法

重新import一下就好了
maven多环境配置如下：

```xml
<profiles>
        <profile>
            <!--开发环境-->
            <id>dev</id>
            <properties>
                <profileActive>dev</profileActive>
            </properties>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
        </profile>
        <profile>
            <!--测试环境-->
            <id>test</id>
            <properties>
                <profileActive>test</profileActive>
            </properties>
        </profile>
        <profile>
            <!--正式环境-->
            <id>prod</id>
            <properties>
                <profileActive>prod</profileActive>
            </properties>
        </profile>
</profiles>
复制代码
```

application.yml使用如下：

```yml
spring:
  profiles:
    active: @profileActive@
复制代码
```

报错如下：

```text
Caused by: org.yaml.snakeyaml.scanner.ScannerException: while scanning for the next token
found character '@' that cannot start any token. (Do not use @ for indentation)
 in 'reader', line 19, column 13:
        active: @profileActive@
复制代码
```

解决方案如下：

```xml
<!--build节点增加内容-->
<resources>
        <resource>
                <directory>src/main/resources</directory>
                <!--开启过滤，用指定的参数替换directory下的文件中的参数-->
                <filtering>true</filtering>
        </resource>
</resources>
```
