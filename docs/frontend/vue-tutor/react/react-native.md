# react native

:::tip

<https://reactnative.dev/>
:::

## 第一种方法

### 安装 expo

先安装旧版本expo,然后让expo cli帮你把expo升级到需要的版本,[旧版本地址](https://apkgit.com/app/expo/host.exp.exponent)
也可以试试这个[地址](https://apkaio.com/app/host.exp.exponent)

## 第二种方法

使用react-native cli

<https://reactnative.dev/docs/environment-setup>

一定要配置好,不然很麻烦

## 创建项目

```powershell
npx react-native init MyApp --template react-native-template-typescript
```

### 打包生成apk

```powershell
# 查看所有命令
 ./gradlew tasks
# 打包生成apk
./gradlew assembleRelease
# 生成aab格式
./gradlew bundleRelease
```
