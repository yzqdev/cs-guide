# maven注意事项

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


https://www.baeldung.com/maven-java-version

## maven跳过测试

### maven跳过测试编译过程


```
mvn -Dmaven.test.skip package
```

使用配置文件pom.xml

```xml
<properties>
    <maven.test.skip>true</maven.test.skip>
</properties>
```
### maven跳过测试执行过程

```
mvn -DskipTests package
```

## maven打包可执行jar
https://www.baeldung.com/executable-jar-with-maven