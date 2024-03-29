# 笔记

## 安卓组件

| 编号 | 组件        | 描述                                       |
| ---- | ----------- | ------------------------------------------ |
| 1    | `Fragments` | 表示`Activity`中的用户界面的一部分。       |
| 2    | `Views`     | 在屏幕上绘制的UI元素，包括按钮，列表形式等 |
| 3    | `Layouts`   | 查看控制屏幕格式和视图外观的层次结构。     |
| 4    | `Intents`   | 消息连接组件在一起。                       |
| 5    | `Resources` | 外部元素，如字符串，常量和可绘制图片。     |
| 6    | `Manifest`  | 应用程序的配置文件。                       |

## manifest详解

Activity启动模式(launchMode)

```text
android:launchMode="singleTop"

```

## 关于字体大小

- 使用sp作为字体大小单位,会随着系统的字体大小改变
- 而dp作为单位则不会.

## 设置颜色的几种方式

```kotlin
 basicTv.setTextColor(Color.GREEN)

basicTv.setTextColor(0xff00ff)
basicTv.setTextColor(Color.rgb(22,33,55))
basicTv.setTextColor(Color.argb(0,200,0,0))
basicTv.setTextColor(Color.parseColor("#00ff00"))
```

## 安卓打包修改名字

### 关于打包的定义

```text
Make Project:- Means you create a real aplication which is working on device and has a executable file like apk.

Make Module:- means you create a library project for you aplication which is executed with that project and has no executable file like apk but has jar files which work as a library.

Build apk: when you normally run your application an apk file is generated locally which is like a zipfile and is easily unzipable no security is implemented and you can get the code from that apk file. It is used basically for local testing.

Signed apk: it is that apk you can create with a password and security and it is not easily unzipable and is used for production.
```

### 定义打包名称

```groovy
    // 打包 用来打包修改名字的 跟defaultConfig是同一级的
    applicationVariants.all { variant ->
        variant.outputs.all { output -> // 这里和2.0的不一样 2.0是each 3.0是all
            def outputFile = output.outputFile
            def fileName;
            if (outputFile != null && outputFile.name.endsWith('.apk')) {
                if (variant.buildType.name.equals('release')) {
                    fileName = "[项目名]${releaseTime()}_${defaultConfig.versionName}_release.apk"
                } else if (variant.buildType.name.equals('debug')) {
                    fileName = "[项目名]${releaseTime()}_${defaultConfig.versionName}_debug.apk"
                }
                outputFileName = fileName // 这里和2.0不一样
            }
        }
    }
```

### 定义一个时间

```groovy
//打包 打包版本需要的当前时间名字 跟 Android 是同一级的
def releaseTime() {
    //注意时间不对 请注意时区问题 时区在小时分钟的时候不一样
    return new Date().format("yyyy-MM-dd-HH-mm", TimeZone.getTimeZone("Asia/Shanghai"))
}
```

## 在build.gradle.kts引入function.gradle中方法

```kotlin
import groovy.lang.Closure
apply(from="functions.gradle")
val buildVersionName: Closure<Any> by ext
buildVersionName()
```

## 获取所有的provider

```kotlin

@Composable

fun ThirdScreen() {
  val ctx = LocalContext.current as ComponentActivity
  Button(onClick = {
    for (pack in ctx.getPackageManager().getInstalledPackages(PackageManager.GET_PROVIDERS)) {
      val providers = pack.providers
      if (providers != null) {
        for (provider in providers) {
          if (provider.toString().contains("neofileprovider")){
            XLog.d(  "provider: " + provider.authority)
            XLog.d(ctx.getPackageName() )
          }

        }
      }
    }
  }) {
    Text(text = "provide")
  }
}
```

## provider冲突解决办法

添加一个MiniProvider继承FileProvider,authority都要`${applicationId}..multi_image.provider`这种,然后使用`requireActivity().getPackageName()+".multi_image.provider"`,

```
FileProvider.getUriForFile(  requireActivity(),  requireActivity().getPackageName()+".multi_image.provider",  mTmpFile)
```

### 使用fragmentutils

```kotlin
  FragmentUtils.add(supportFragmentManager, frags, R.id.lib_frag, 0)
    val callback = object : OnBackPressedCallback(
      true // default to enabled
    ) {
      override fun handleOnBackPressed() {
        XLog.enableStackTrace(2).d( FragmentUtils.getTopShow(supportFragmentManager))
        if (FragmentUtils.getTopShow(supportFragmentManager) is LiblistFragment){
          finish()
        }else{
          FragmentUtils.replace(supportFragmentManager,LiblistFragment(),R.id.lib_frag)
        }
      }
    }
    this.onBackPressedDispatcher.addCallback(callback)
```

## kotlin获取appllication实例

```kotlin
class MyApp: Application() {

    override fun onCreate() {
        super.onCreate()
        instance = this
    }

    companion object {
        lateinit var instance: MyApp
            private set
    }
}
```
