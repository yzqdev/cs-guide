# 一些安卓技巧



## 添加依赖

```groovy
implementation fileTree(dir: 'libs', include: ['*.jar'])
implementation(files("/commonjar/3rdparty/gson-2.8.5.jar"))
```

```groovy
implementation(files("/commonjar/3rdparty/gson-2.8.5.jar"))
implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.jar", "*.aar"))))
implementation(fileTree("src/main/libs") {
        include("*.jar", "*.aar")
    })
```

```
./gradlew build --refresh-dependencies
./gradlew app:dependencies --configuration implementation 
```

## 批量删除apk

```
要在git bash下用
adb shell "pm list packages ab.yzq | cut -c9- | xargs -n 1 sh /system/bin/pm uninstall"
```


## gradle用法

```
org.gradle.daemon=true
org.gradle.parallel=true
```

