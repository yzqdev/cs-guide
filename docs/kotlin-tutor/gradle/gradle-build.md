# gradle插件相关


## 用Gradle构建lib分离的jar包

首先Jar包内是有一个`META-INF/MANIFEST.MF`这样的文件，里面我只挑能够达成jar包跟lib分离目的的参数：

- Main-Class  
    这是指定程序入口的参数，一般就是main方法所在的class，Kotlin的class需要加上Kt的后缀才正确。  
    这个一般打成jar运行是基础配置，不然无法运行。
- Class-Path  
    这个就是需要加载的lib的配置了，需要对每个lib包都做声明，空格分割。

下一步是对Gradle的jar任务做修改，让其排除所有的*.jar文件，并自定义一个删除以及拷贝lib的任务让其依赖。这需要了解一下Gradle如何自定义一个task以及jar任务如何修改。

 然后直接修改jar这个task
```kotlin
tasks.register<Delete>("clearLib") { //清除lib  
  
  delete(layout.buildDirectory.dir("libs/lib").get())  
}  
  
tasks.register<Copy>("copyLib") { //拷贝lib  
  from(configurations.runtimeClasspath) //从运行时目录  
  into(layout.buildDirectory.dir("libs/lib").get())  //到打包目录  
}
  
tasks.jar {  
  dependsOn("clearLib") //依赖清除和拷贝lib任务  
  dependsOn("copyLib")  
  exclude("**/*.jar") //打包时排除jar文件（不打包成fat jar）  
  manifest {  
    attributes["Manifest-Version"] = "1.0"  
    attributes["Multi-Release"] = "true"  
    attributes["Main-Class"] = "ab.yzq.javalindemo.Main" //main方法所在的class，我这个例子是用的Kotlin所以带有Kt后缀  
    attributes["Class-Path"] =  
      configurations.runtimeClasspath.get().files.joinToString(" ") { "lib/${it.name}" }  //构建出 lib/包名 的字符串并用空格分隔  
  }  
}
```

打包出来就是一个main.jar和一个lib文件夹

对于springboot项目,也可以打包分离依赖


```groovy
// 将依赖包复制到lib目录
task copyJar(type: Copy) {
    // 清除现有的lib目录
    delete "$buildDir/libs/lib"
    from configurations.runtimeClasspath
    into "$buildDir/libs/lib"
}

// 拷贝配置文件
task copyResources(type: Copy) {
    // 清除现有的配置目录
    delete "$buildDir/libs/config"
    from "src/main/resources"
    into "$buildDir/libs/config"
    // 只复制yml配置文件
    include "*.yml"
    // 排除指定文件
    // exclude "application.yml"
}

// 配置bootJar进行打包
bootJar {
    // 排除lib目录及yml配置文件
    excludes = ["*.jar", "*.yml"]
    // 引入需要的文件(多模块项目下可引入指定jar包)
    // includes = ['common-${project.version}.jar']
    // lib目录的清除和复制任务
    dependsOn copyJar
    // 配置目录的清除和复制任务
    dependsOn copyResources
    // 指定依赖包的路径
    manifest {
        attributes "Manifest-Version": 1.0,
                'Class-Path': 'config/ ' + configurations.runtimeClasspath.files.collect { "lib/$it.name" }.join(' ')
    }
}
```


## 打包java-library然后把依赖也打包进去


```kotlin

tasks.jar {  
   
  from(configurations.runtimeClasspath.get().map {  
    if (it.isDirectory) it else zipTree(it)  
  })  
  val sourcesMain = sourceSets.main.get()  
  sourcesMain.allSource.forEach { println("add from sources: ${it.name}") }  
  from(sourcesMain.output)  
  manifest {  
    attributes["Manifest-Version"] = "1.0"  
    attributes["Multi-Release"] = "true"  
  
  }  
  
}
```