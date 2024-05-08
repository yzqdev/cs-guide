# 常用命令

## dotnet命令

```
https://learn.microsoft.com/zh-cn/dotnet/core/tools/dotnet-publish
```

## hbuildx adb冲突

hbuilder的adb位置是
`D:/HBuilderX/plugins/launcher/tools/adbs/adb.exe`

下载安卓app
<https://apps.evozi.com/apk-downloader/?id=com.microsoft.bing>

<https://he3.app/>

## sql操作

## 批量修改数据库编码

```sql

SELECT 
CONCAT("ALTER TABLE `",TABLE_NAME,
"` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;")  AS target_tables 
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA="数据库名称" AND TABLE_TYPE="BASE TABLE"

```

## git

git clean是和git reset --hard一对的命令。

git clean -f是删除untracked的文件，无法删除add过的文件
git reset --hard是删除add过的文件，无法删除untracked的文件

```shell
  git clean -f  --是清除untracked文件
  git clean -df --是清除untracked目录和文件
```

## google go文档

<https://golang.google.cn/>

## python字符串表示方法

有r字符串(原始字符串)和f字符串表示
命令行: <https://typer.tiangolo.com/>

## 一些动物名称

fly,pig,bee, cat ,rat,cow, duck,cock, bear,bird

bird鸟、panda熊猫、lion狮子、goat 山羊 、lamb 羊羔、deer 鹿、cat 猫、
kitty小猫、fox 狐、wolf 狼 、bear 熊、mole 鼹鼠、seal 海豹、cock 公鸡
hen 母鸡、duck 鸭、swan 天鹅 、dove 鸽 、lark 百鸟,云雀、frog 青蛙 、
chub 鲢鱼、 fly 苍蝇、moth 蛾...

## visual studio 插件

- viasfora
- xaml styler

## caddy部署

```

:5800 {
    handle /api/* {

    uri strip_prefix /api
    root * D:\tmp\candy\dist
    encode gzip
    file_server
    }

}

```

## 高德地图错误代码

<https://lbs.amap.com/api/android-location-sdk/guide/utilities/errorcode/>

## 前端

pixi.js <https://pixijs.com/>

````shell
wt /d .

```

## dart打包exe

```
dart compile exe bin/myapp.dart
```
````

Live editor for CSS, Less & Sass - Magic CSS chrome插件 [地址](https://github.com/webextensions/live-css-editor)

svelte prettier配置

```json
{
 "singleQuote": true,
 "trailingComma": "none",
 "tabWidth": 2,
 "htmlWhitespaceSensitivity": "ignore",
 "useTabs": false,
 "endOfLine": "auto",
 "proseWrap": "preserve",
 "quoteProps": "as-needed",

 "insertPragma": false,
 "printWidth": 200,
 "pluginSearchDirs": ["."],
 "overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
}

```

## gitignore配置

### 安装yarn4

```shell
yarn set version stable
```

 
## npm搭建私库

<https://segmentfault.com/a/1190000040243909>

```
kotlin优势
kotlin有这么些好处：
1、空引用由类型系统控制，再也不会遇到NullPointerException。
2、使用高阶函数，就是可以将函数作为参数，或者作为返回值来使用。
3、给一个类扩展函数，不需要继承，直接通过类名+"." + 方法就可以。比如
fun MyClass.add(a:Int,b:Int) = a+b 就对MyClass扩展了一个函数。

kotlin与java 区别
接下来，列举kotlin 与 java 区别：

1、java 中的原始类是Object， 而在kotlin 中是Any。
Any 方法中只有equals(), hashCode(),toString()
2、kotlin 中的类型判断是is， 类型转换是as
is 相当于java的instanceof
3、kotlin 中默认的访问权限是public，就是类如果不写修饰符，默认是public
4、类默认是final， 如果这个类要被继承，就要加个修饰符open
5、kotlin 中没有switch 而是使用when， when 不仅支持String类型，还支持表达式，而且还能有返回值。
6、声明一个类直接就一行代码，比如 class Student（var name：String， var age：Int）
7、声明一个单例更简单，比如 object SingleInstance
8、实体类，直接通过data 来进行修饰。
data class Student(var name: String, var age: Int）
1、自动为成员生成 setter 和 getter
2、会自动重写 equals()/ hashCode() 和 toString()
3、data 类默认是final的，无法被继承。

9、kotlin接口中的方法可以写默认实现，java不行。
10、kotlin 的类名之外的函数，叫做包级函数，包括扩展函数，都是静态的。在编译的时候，
kotlin 就把所有的包级函放在一个类中，java 可以通过Student.getMessage()来调用。
class Student（var name: String, var age: Int）{ }
fun getMessage(){
//todo
}
11、kotlin 通配符是*，不再是？。？一般放在申明变量是可null的。
12、kotlin 中没有static，用伴生类代替。
companion object{
var num: Int = 3
fun get(): Int{
return num
}
}
13、kotlin 中，函数是一种类型，可以把具体的函数当成对象传递，比如lambda表达式就是一个匿名函数
14、kotlin 有几个常用的标准高阶函数，比如run(), with(),apply(),alse(),let()，这几个在开发中使用，可以让代码看起来更整洁。

总结
语言更多的通过项目的实践，然后多写，慢慢就熟悉了。因为本身有java的开发经验，所以要用kotlin 写也不难的，另外开发工具还支持，拷贝java代码粘贴到kotlin文件就转化成kotlin的代码了，应急的时候这么做也是可以的。熟练之后，koltin开发还是很舒服的。
```

windows ui库   <https://slint-ui.com/>

dotnet命令行工具  <https://learn.microsoft.com/zh-cn/dotnet/core/tools/global-tools-how-to-create>
dotnet命令  <https://learn.microsoft.com/zh-cn/dotnet/core/tools/>

<https://blog.csdn.net/seoalphas/article/details/81480271>

### 浏览器推荐 


https://thorium.rocks/
https://github.com/ungoogled-software/ungoogled-chromium-windows
brave浏览器
ARC浏览器  https://arc.net/
vivaldi浏览器
opera浏览器
360极速浏览器
tor浏览器
cent browser <https://www.centbrowser.cn/>

firefox浏览器
firefox developer 浏览器
waterfox浏览器
https://www.runningcheese.com/firefox
floorp浏览器 https://floorp.app/en/




## 安卓

<https://juejin.cn/post/6975689084173811743>

<https://www.gpt4.hk/>

<https://kaisery.github.io/trpl-zh-cn/title-page.html>

<https://doc.rust-lang.org/stable/rust-by-example/index.html>
<https://zhuanlan.zhihu.com/p/373659914>
安装wix

```shell
scoop install wixtoolset
```

tauri打包慢：解决tauri的打包慢以及超时的方法

<https://github.com/wixtoolset/wix3/releases/download/wix3112rtm/wix311-binaries.zip>

在C盘找到 Tauri文件夹，我的文件夹路径是

%LocalAppData%/tauri/WixTools

创建一个WixTools文件夹，然后将下载下来的安装包加压到这个文件下，记住解压后，删除安装包。接下来再运行刚才的打包命令即可。

android studio gbk错误
<https://doracoin.cc/431/>
