# 常见问题

## Gradle Build Task :app:dataBindingGenBaseClassesShopDevDebug Failed配置DataBinding时错误

1、开启DataBind如果版本足够高的话，不用听过时的教程，这里加几行代码，那里加几行代码的。
只需要在build-grade（有android的那个）中的android内添加

```xml
    buildFeatures{
        dataBinding = true
    }
```

2、然后刷新下，你就遇到了标题那样的错误，或者直接报出这个错误
not a valid name:？
我放个例子

```xml
    <import type="Com.System.Bean.User" />
    <variable
        name="user"
        type="User" />
```

假如你像这个一样，引用的包名是大写的，就会无法解析报错，所以要注意代码规范。在这个代码中除了User类以外都要小写，要改成这样

```xml
    <import type="com.system.bean.User" />
    <variable
        name="user"
        type="User" />
```

我是因为这个Bean是自己建的所以会自动大写，进而报错，检查下你们的代码。
​

# databinding下面有错但是可以运行

```powershell
import com.yzq.tutor.databinding.FragmentFirstBinding
下面有波浪线
```

只需要在app的build.gradle里面把sdk版本改为1.8就行

```groovy
 compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
```

## 从4.0 升级到了最新版4.1的Android studio  然后代码就全都变成了白色

和惯例的 低电量模式、代码样式都没有关系 ​
   通过报错

```groovy
com.intellij.diagnostic.PluginException: While loading class com.avast.android.butterknifezelezny.InjectAction: com/intellij/codeInsight/generation/actions/BaseGenerateAction [Plugin: eu.inmite.android.plugin.butterknifezelezny]
```

显示是butterknife zelezny 版本问题,禁用或者卸载就可以

## 已解决：Could not create task ‘:app:minifyDebugWithR8‘.. Cannot query the value of this provider

解决办法：1.打开你项目的build.gradle文件，查看dependencies中的版本号；
​

2.在Android studio中双击shift，在弹框中输入sdk manager，回车；
​

3. 下载和你的build.gradle中的版本号相同的sdk；
​

4.重新build项目，即可通过！
