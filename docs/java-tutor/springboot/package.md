
# 打包

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
