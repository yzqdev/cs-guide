# maven注意事项

## maven命令

```powershell
mvn compile

mvn clean

mvn install 
#跳过测试
mvn package -DskipTests #这个还是会编译的,推荐用下面的
mvn package -Dmaven.test.skip=true  # 不编译测试class
# powershell上需要
mvn package "-Dmaven.test.skip=true"
mvn clean package -pl module-a


# 多模块带有依赖需要加上-am

mvn clean package -pl log-app -am

等同于
mvn install && mvn clean package -pl log-app

```

:::warning
对于idea ,多模块打包必须先install,上面带参数这种方法不适用
多模块要指定`<relativePath>../pom.xml</relativePath>`
:::

## 打包注意

maven 默认的打包类型为 jar，
在项目聚合的时候，需要显式的将 父项目的 packing 指定为 pom，子项目可以定义为jar或者war
然后再指定所属的子模块，如下所示：
​

```xml
<packing>pom</packing>
<modules>
       <module>kern-base</module>
       <module>kern-dao</module>
       <module>kern-service</module>
       <module>kern-control</module>
</modules>
```

如果没有将packing 指定为pom ，那么子模块之间将无法正常的进行依赖传递。
我们执行的maven命令的时候将首先对父项目执行，而后当 父项目 的packing 类型为 pom 时，将对所有的子模块执行同样的命令，否则将无法执行同样的命令，那么依赖的传递将无法由maven 编译或者打包命令 得以执行。
参考官网：
[http://maven.apache.org/guides/introduction/introduction-to-the-pom.html](http://maven.apache.org/guides/introduction/introduction-to-the-pom.html)

## maven配置项目jdk版本

<https://www.baeldung.com/maven-java-version>

## maven跳过测试

### maven跳过测试编译过程

```powershell
mvn -Dmaven.test.skip package

# powershell使用

mvn package `-Dmaven.test.skip=true
#  或者
mvn package '-Dmaven.test.skip=true'
# 或者
mvn clean package --% -Dmaven.test.skip=true

mvnd  -pl aspect-main package --%  -Dmaven.test.skip
 
```

使用配置文件pom.xml

```xml
<properties>
    <maven.test.skip>true</maven.test.skip>
</properties>
```

### maven跳过测试执行过程

```powershell
mvn -DskipTests package
```

## maven打包可执行jar

<https://www.baeldung.com/executable-jar-with-maven>

## 配置项目内镜像

```xml

<repositories>  
  <repository>  
    <id>central</id>  
    <name>aliyun</name>  
    <layout>default</layout>  
    <url>https://maven.aliyun.com/repository/central</url>  
    <releases>  
      <enabled>true</enabled>  
    </releases>  
    <snapshots>  
      <enabled>false</enabled>  
    </snapshots>  
  </repository>  
</repositories>
```

## 错误   [Maven: Non-resolvable parent POM](https://stackoverflow.com/questions/7612309/maven-non-resolvable-parent-pom)

需要先在主目录`mvn install`一下,然后再打包`mvn -pl app package`
或者`mvn -pl app -am package`

## maven打包fatjar

最好使用maven-shade-plugin,专门用来打fatjar(uber-jar)的

### 使用maven-assembly-plugin

<https://maven.apache.org/plugins/maven-dependency-plugin/examples/copying-project-dependencies.html>

自定义的打包结构，也可以定制依赖项等

```xml
<plugins>  
  <plugin>  
    <artifactId>maven-assembly-plugin</artifactId>  
    <version>3.6.0</version>  
    <configuration>  
      <archive>  
        <manifest>  
          <mainClass>cn.yzq.javademo.Main</mainClass>  
        </manifest>  
      </archive>  
      <descriptorRefs>  
        <descriptorRef>jar-with-dependencies</descriptorRef>  
      </descriptorRefs>  
    </configuration>  
    <executions>  
      <execution>  
        <id>make-assembly</id>  
        <phase>package</phase>  
        <goals>  
          <goal>single</goal>  
        </goals>  
      </execution>  
    </executions>  
  </plugin>  
</plugins>

```

### 使用maven-jar-plugin

默认的打包方式，用来打普通的project JAR包，**此方式是没有真正打包到一个独立jar**

<https://maven.apache.org/shared/maven-archiver/examples/classpath.html>

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    <configuration>
        <archive>
            <manifest>
                <addClasspath>true</addClasspath>
                <classpathPrefix>lib/</classpathPrefix>
                <mainClass>ab.yzq.tutor.Main</mainClass>
            </manifest>
        </archive>
    </configuration>
</plugin>
```xml
<!-- 拷贝依赖包 -->
<plugin>
 <groupId>org.apache.maven.plugins</groupId>
 <artifactId>maven-dependency-plugin</artifactId>
 <executions>
  <execution>
   <id>copy</id>
   <phase>package</phase>
   <goals>
    <goal>copy-dependencies</goal>
   </goals>
   <configuration>
    <outputDirectory>${project.build.directory}/lib</outputDirectory>
   </configuration>
  </execution>
 </executions>
</plugin>
```

### 使用maven-shade-plugin

用来打可执行jar包，也就是所谓的uber jar包;
<https://maven.apache.org/plugins/maven-shade-plugin/examples/executable-jar.html>

```xml

<plugin>  
  <groupId>org.apache.maven.plugins</groupId>  
  <artifactId>maven-shade-plugin</artifactId>  
  <version>3.5.0</version>  
  <executions>  
    <execution>  
      <phase>package</phase>  
      <goals>  
        <goal>shade</goal>  
      </goals>  
      <configuration>  
        <transformers>  
          <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">  
            <mainClass>cn.yzq.javademo.Main</mainClass>  
          </transformer>  
        </transformers>  
        <filters>  
          <filter>  
            <artifact>*:*</artifact>  
            <excludes>  
              <exclude>META-INF/*.SF</exclude>  
              <exclude>META-INF/*.DSA</exclude>  
              <exclude>META-INF/*.RSA</exclude>  
            </excludes>  
          </filter>  
        </filters>  
      </configuration>  
    </execution>  
  </executions>  
</plugin>
```

## 使用javapackager

<https://github.com/fvarrui/JavaPackager>

```xml

<plugin>
    <groupId>io.github.fvarrui</groupId>
    <artifactId>javapackager</artifactId>
    <version>{latest.version}</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>package</goal>
            </goals>
            <configuration>
                <!-- mandatory -->
                <mainClass>path.to.your.mainClass</mainClass>
                <!-- optional -->
                <bundleJre>true|false</bundleJre>
                <generateInstaller>true|false</generateInstaller>
                <administratorRequired>true|false</administratorRequired>
                <platform>auto|linux|mac|windows</platform>
                <additionalResources>
                    <additionalResource>file path</additionalResource>
                    <additionalResource>folder path</additionalResource>
                    <additionalResource>...</additionalResource>
                </additionalResources>
                <linuxConfig>...</linuxConfig>
                <macConfig>...</macConfig>
                <winConfig>...</winConfig>
                [...]
            </configuration>
        </execution>
    </executions>
</plugin>
```

这个可能会遇到找不到依赖的问题

需要再项目中的pom.xml配置
注意这个`edu.sc.seis.launch4j:launch4j不在maven仓库而是再gradle plugin 仓库

```xml
<repositories>  
  <repository>  
    <id>aliyun-repo</id>  
    <name>aliyun</name>  
    <layout>default</layout>  
    <url>https://maven.aliyun.com/repository/gradle-plugin</url>  
  
  </repository>  
</repositories>  
  
<pluginRepositories>  
  <pluginRepository>  
    <id>aliyun-repo</id>  
    <name>aliyuddn</name>  
  
    <url>https://maven.aliyun.com/repository/gradle-plugin</url>  
  
  </pluginRepository>  
</pluginRepositories>
```

然后.m2/settings.xml中需要把这个id exclude掉,避免全局的仓库覆盖本地仓库

```xml
<mirror>  
  <id>nexus-tencentyun</id>  
  <mirrorOf>*,!spring-shell,!papermc-repo,!spigotmc-repo,!placeholderapi,!citizens-repo,!jitpack.io,!dmulloy2-repo,!commons-codec,!aliyun-repo</mirrorOf>  
  <name>Nexus tencentyun</name>  
  <url>http://mirrors.cloud.tencent.com/nexus/repository/maven-public/</url>  
</mirror>
```

## gradle打包

```
./gradlew bootJar
```

依赖分离打包

在build.gradle.kts中加入下面的代码,然后运行`./gradlew thin`和`./gradlew bootJar`同时打包thin包和fatjar

```kotlin
  
tasks.register<BootJar>("thin") {  
  dependsOn("clearLib") //依赖清除和拷贝lib任务  
  dependsOn("copyLib")  
  exclude("**/*.jar") //打包时排除jar文件（不打包成fat jar）  
  mainClass.set("ab.yzq.jv.mini.MiniApp")  
  archiveBaseName="spring-min-thin"  
  targetJavaVersion = JavaVersion.VERSION_17  
  manifest {  
    attributes["Manifest-Version"] = "1.0"  
    attributes["Multi-Release"] = "true"  
//    attributes["Main-Class"] = "org.springframework.boot.loader.JarLauncher" //main方法所在的class，我这个例子是用的Kotlin所以带有Kt后缀  
    attributes["Class-Path"] =  
      configurations.runtimeClasspath.get().files.joinToString(" ") { "lib/${it.name}" }  //构建出 lib/包名 的字符串并用空格分隔  
  }  
  with(tasks.named("bootJar").get() as CopySpec)  
}
```

groovy版本

```groovy
task customJar(type: BootJar) {  
  archiveBaseName = 'custom-spring-boot'  
  version = '0.1.0'  
  mainClass = 'ab.yzq.springdemo.SpringDemoApp'  
  targetJavaVersion = JavaVersion.VERSION_17  
  dependsOn("clearLib") //依赖清除和拷贝lib任务  
  dependsOn("copyLib")  
  exclude("**/*.jar") //打包时排除jar文件（不打包成fat jar）  
  manifest {  
    attributes["Manifest-Version"] = "1.0"  
    attributes["Multi-Release"] = "true"  
//    attributes["Main-Class"] = "org.springframework.boot.loader.JarLauncher" //main方法所在的class，我这个例子是用的Kotlin所以带有Kt后缀  
    attributes['Class-Path'] = configurations.runtimeClasspath.collect { 'lib/' + it.getName() }.join(' ')  
  }  
  println("below is bootjar")  
  print(bootJar)  
  with bootJar    
}
```
