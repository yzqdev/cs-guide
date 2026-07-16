---
order: 17
---

# 打包部署

> Spring Boot 项目打包方式：fat jar、thin jar、依赖分离、Docker 镜像。

## 方式一：Fat JAR（默认）

Spring Boot 默认打包为可执行的 fat jar，包含所有依赖。

### Maven

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

```bash
mvn clean package
# 生成 target/app-1.0.0.jar

# 运行
java -jar target/app-1.0.0.jar

# 指定端口
java -jar target/app-1.0.0.jar --server.port=8081

# 指定配置文件
java -jar target/app-1.0.0.jar --spring.profiles.active=prod
```

### Gradle

```bash
./gradlew bootJar
# 生成 build/libs/app-1.0.0.jar
```

## 方式二：依赖分离（Thin JAR）

将依赖库和业务代码分开打包，减少部署时传输量。

### Gradle（Kotlin DSL）

```kotlin
tasks.register<Delete>("clearLib") {
    delete(layout.buildDirectory.dir("libs/lib"))
}

tasks.register<Copy>("copyLib") {
    from(configurations.runtimeClasspath)
    into(layout.buildDirectory.dir("libs/lib"))
}

tasks.register<BootJar>("thin") {
    dependsOn("clearLib")
    dependsOn("copyLib")
    exclude("**/*.jar")  // 打包时排除 jar 依赖
    mainClass.set("com.example.Application")
    archiveBaseName = "app-thin"
    manifest {
        attributes["Manifest-Version"] = "1.0"
        attributes["Class-Path"] =
            configurations.runtimeClasspath.get().files.joinToString(" ") { "lib/${it.name}" }
    }
}
```

### Gradle（Groovy DSL）

```groovy
task clearLib(type: Delete) {
    delete layout.buildDirectory.dir("libs/lib")
}

task copyLib(type: Copy) {
    from configurations.runtimeClasspath
    into layout.buildDirectory.dir("libs/lib")
}

task thinJar(type: BootJar) {
    dependsOn clearLib, copyLib
    archiveBaseName = 'app-thin'
    mainClass = 'com.example.Application'
    exclude("**/*.jar")
    manifest {
        attributes 'Manifest-Version': '1.0'
        attributes 'Class-Path': configurations.runtimeClasspath.collect { 'lib/' + it.name }.join(' ')
    }
}
```

## 方式三：多环境打包

```xml
<!-- Maven Profile -->
<profiles>
    <profile>
        <id>dev</id>
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
        <properties>
            <activatedProperties>dev</activatedProperties>
        </properties>
    </profile>
    <profile>
        <id>prod</id>
        <properties>
            <activatedProperties>prod</activatedProperties>
        </properties>
    </profile>
</profiles>
```

```bash
# 打包指定环境
mvn clean package -P prod
```

## 方式四：Docker 镜像打包

### Dockerfile

```dockerfile
# 多阶段构建
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### docker-compose.yml

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DB_HOST=db
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=root123
      - MYSQL_DATABASE=myapp
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

## JVM 参数优化

```bash
# 生产环境 JVM 参数
java -jar app.jar \
    -Xms512m \
    -Xmx1024m \
    -XX:+UseG1GC \
    -XX:MaxGCPauseMillis=200 \
    -XX:+HeapDumpOnOutOfMemoryError \
    -XX:HeapDumpPath=/logs/dump.hprof \
    -Dspring.profiles.active=prod
```

## 部署后检查清单

- [ ] 确认配置文件正确（`application-prod.yml`）
- [ ] 数据库连接字符串正确
- [ ] 日志级别调整为 `WARN` 或 `ERROR`
- [ ] 关闭开发环境特有功能（如 Swagger）
- [ ] 配置健康检查接口
- [ ] 配置资源限制（内存、CPU）
- [ ] 设置合理的超时时间
- [ ] 配置日志轮转策略