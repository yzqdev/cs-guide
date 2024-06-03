
# maven和gradle

## mvn命令

maven 命令的格式为 mvn [plugin-name]:[goal-name]，可以接受的参数如下，

-D 指定参数，如 -Dmaven.test.skip=true 跳过单元测试；

-P 指定 Profile 配置，可以用于区分环境；

-e 显示maven运行出错的信息；

-o 离线执行命令,即不去远程仓库更新包；

-X 显示maven允许的debug信息；

-U 强制去远程更新snapshot的插件或依赖，默认每天只更新一次。

常用maven命令
创建maven项目：mvn archetype:create
指定 group： -DgroupId=packageName

指定 artifact：-DartifactId=projectName

创建web项目：-DarchetypeArtifactId=maven-archetype-webapp

创建maven项目：mvn archetype:generate
验证项目是否正确：mvn validate
maven 打包：mvn package
只打jar包：mvn jar:jar
生成源码jar包：mvn source:jar
产生应用需要的任何额外的源代码：mvn generate-sources
编译源代码： mvn compile
编译测试代码：mvn test-compile
运行测试：mvn test
运行检查：mvn verify
清理maven项目：mvn clean
生成eclipse项目：mvn eclipse:eclipse
清理eclipse配置：mvn eclipse:clean
生成idea项目：mvn idea:idea
安装项目到本地仓库：mvn install
发布项目到远程仓库：mvn:deploy
在集成测试可以运行的环境中处理和发布包：mvn integration-test
显示maven依赖树：mvn dependency:tree
显示maven依赖列表：mvn dependency:list
下载依赖包的源码：mvn dependency:sources
安装本地jar到本地仓库：mvn install:install-file -DgroupId=packageName -DartifactId=projectName -Dversion=version -Dpackaging=jar -Dfile=path
web项目相关命令
启动tomcat：mvn tomcat:run
启动jetty：mvn jetty:run
运行打包部署：mvn tomcat:deploy
撤销部署：mvn tomcat:undeploy
启动web应用：mvn tomcat:start
停止web应用：mvn tomcat:stop
重新部署：mvn tomcat:redeploy
部署展开的war文件：mvn war:exploded tomcat:exploded

## maven

配置jdk版本

```
    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
```

### maven下载地址

<https://archive.apache.org/dist/maven/maven-3/>

## maven 打包

```
mvn clean package -Dmaven.test.skip=true

mvn package -DskipTests 
```

The easiest way to setup the Maven Wrapper for your project is to use the Maven Wrapper Plugin with its provided wrapper goal. To add or update all the necessary Maven Wrapper files to your project execute the following command:

注意国内一些原因,下载wrapper太慢,不推荐使用

```

 

mvn wrapper:wrapper
# 更新版本
mvn wrapper:wrapper -Dmaven=3.9.0


```

Normally you instruct users to install a specific version of Apache Maven, put it on the PATH and then run the mvn command like the following:

```
mvn clean install
```

But now, with a Maven Wrapper setup, you can instruct users to run wrapper scripts:

```
./mvnw clean install
```

or on Windows

```
mvnw.cmd clean install
```

A normal Maven build will be executed, with the one important change that if the user doesn't have the necessary version of Maven specified in .mvn/wrapper/maven-wrapper.properties it will be downloaded for the user first, installed and then used.

## gradle命令

### 更新gradle

```shell
跳过test
./gradlew build -x test

./gradlew wrapper --gradle-version=8.8 --distribution-type=all

./gradlew tasks
# Downloading https://services.gradle.org/distributions/gradle-8.0-bin.zip
```
