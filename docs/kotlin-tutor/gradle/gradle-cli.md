# gradle 命令

## gradle wrapper下载很慢

## 第一种方法
把distributionUrl 改为`distributionUrl=http\://mirrors.cloud.tencent.com/gradle/gradle-8.5-all.zip`,不过这样的话每个gradle-wrapper.properties都要改,太麻烦了


可以吧gradle-8.5-all.zip下载完丢到`D:\configuration\.gradle\wrapper\dists\gradle-8.4-all\56r6xik2f6skrm47et0ibifug`这个文件夹,然后重新`./gradlew build`,会自动识别zip包并解压二进制


## 第二种方法

在全局的.gradle文件夹放一个`gradle.properties`文件,写下如下内容

```
systemProp.jdk.http.auth.tunneling.disabledSchemes=""
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=7890

```
使用clash 代理

然后
```
./gradlew wrapper --gradle-version 8.4 --distribution-type all
```

## dependencies

```shell
./gradlew :app:dependencyInsight --dependency kotlin-stdlib --configuration debugcompileClasspath
```
