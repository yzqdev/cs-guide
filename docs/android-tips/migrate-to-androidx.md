
# androidx迁移

 

## compose兼容性

<https://developer.android.google.cn/jetpack/androidx/releases/compose-kotlin>
 
迁移文档:     [谷歌开发者迁移文档](https://developer.android.google.cn/jetpack/androidx/migrate)
Google 2018 IO 大会推出了 Android新的扩展库 AndroidX，用于替换原来的 Android扩展库，将原来的`android.*`替换成`androidx.*`；只有包名和Maven工件名受到影响，原来的类名，方法名和字段名不会更改。接下来我们来看看使用 AndroidX的扩展库需要哪些配置。

## 1. AndroidX变化

**1）常用依赖库对比：**

| Old  build artifact                                      | AndroidX  build artifact                           |
| -------------------------------------------------------- | -------------------------------------------------- |
| `com.android.support:appcompat-v7:28.0.2`                | `androidx.appcompat:appcompat:1.0.0`               |
| `com.android.support:design:28.0.2`                      | `com.google.android.material:material:1.0.0`       |
| `com.android.support:support-v4:28.0.2`                  | `androidx.legacy:legacy-support-v4:1.0.0`          |
| `com.android.support:recyclerview-v7:28.0.2`             | `androidx.recyclerview:recyclerview:1.0.0`         |
| `com.android.support.constraint:constraint-layout:1.1.2` | `androidx.constraintlayout:constraintlayout:1.1.2` |

更多详细变化内容，可以[下载CSV格式](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.android.google.cn%2Ftopic%2Flibraries%2Fsupport-library%2Fdownloads%2Fandroidx-artifact-mapping.csv)映射文件；

**2）常用支持库类对比：**

| Support Library class                      | AndroidX class                              |
| ------------------------------------------ | ------------------------------------------- |
| `android.support.v4.app.Fragment`          | `androidx.fragment.app.Fragment`            |
| `android.support.v4.app.FragmentActivity`  | `androidx.fragment.app.FragmentActivity`    |
| `android.support.v7.app.AppCompatActivity` | `androidx.appcompat.app.AppCompatActivity`  |
| `android.support.v7.app.ActionBar`         | `androidx.appcompat.app.ActionBar`          |
| `android.support.v7.widget.RecyclerView`   | `androidx.recyclerview.widget.RecyclerView` |

更多详细变化内容，可以[下载CSV格式](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.android.google.cn%2Ftopic%2Flibraries%2Fsupport-library%2Fdownloads%2Fandroidx-class-mapping.csv)映射文件。

## 2. AndroidX配置

**1）更新升级插件**

- 将AS更新至 **AS 3.2**及以上；
- Gradle 插件版本改为 **4.6**及以上；
项目下 `gradle/wrapper/gradle-wrapper.propertie` 文件中的`distributionUrl`改为：

```ruby
distributionUrl=https\://services.gradle.org/distributions/gradle-4.6-all.zip
```

- compileSdkVersion 版本升级到 **28**及以上；
- buildToolsVersion 版本改为 **28.0.2**及以上。

![](https://upload-images.jianshu.io/upload_images/4625401-92ed6de990f27533.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/546/format/webp#align=left&display=inline&height=261&id=Kdgqq&margin=%5Bobject%20Object%5D&originHeight=261&originWidth=546&status=done&style=none&width=546)

插件更新提示

**2）开启迁移AndroidX**
在项目的`gradle.properties`文件里添加如下配置：

```bash
android.useAndroidX=true
android.enableJetifier=true
```

表示项目启用 AndroidX 并迁移到 AndroidX。

**3）替换依赖库**
修改项目app目录下的`build.gradle`依赖库：

```bash
implementation 'com.android.support:appcompat-v7:28.0.2' → implementation 'androidx.appcompat:appcompat:1.0.0'
implementation 'com.android.support:design:28.0.2'  → implementation 'com.google.android.material:material:1.0.0'
implementation 'com.android.support.constraint:constraint-layout:1.1.2' → implementation 'androidx.constraintlayout:constraintlayout:1.1.2'
...
```

**4）修改支持库类**
将原来`import`的`android.**`包删除，重新`import`新的`androidx.**`包；

```java
import android.support.v7.app.AppCompatActivity; → import androidx.appcompat.app.AppCompatActivity;
```

**5）一键迁移AndroidX库**
AS 3.2 及以上版本提供了更加方便快捷的方法一键迁移到 AndroidX。选择菜单上的**ReFactor —— Migrate to AndroidX...** 即可。（如果迁移失败，就需要重复上面1，2，3，4步手动去修改迁移）

![](https://upload-images.jianshu.io/upload_images/4625401-b9524e8fa789d620.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/316/format/webp#align=left&display=inline&height=423&id=yiTs2&margin=%5Bobject%20Object%5D&originHeight=423&originWidth=316&status=done&style=none&width=316)

AndroidX 迁移

**注意：**如果你的项目compileSdkVersion 低于28，点击Refactor to AndroidX...会提示：

```cpp
You need to have at least have compileSdk 28 set in your module build.gradle to refactor to androidx
```

提示让你使用不低于28的sdk，升级最新到SDK，然后点击 **Migrate to AndroidX...**，AS就会自动将项目重构并使用AndroidX库。

## 3. AndroidX迁移问题

[《Android Support库和AndroidX冲突问题》](https://www.jianshu.com/p/7507c25fd986)

## 4. AndroidX影响

虽然说目前对我们没有多大影响，我们可以不使用仍然使用旧版本的支持库，毕竟没有强制，但长远来看还是有好处的。AndroidX重新设计了包结构，旨在鼓励库的小型化，支持库和架构组件包的名字也都简化了；而且也是减轻Android生态系统碎片化的有效方式。
