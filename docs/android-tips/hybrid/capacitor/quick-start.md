# 快速开始

## 常用命令

## capacitor

```powershell
#安装 Capacitor
npm install --save @capacitor/core @capacitor/cli

#初始化 Capacitor，会要求输入 App Name、App ID
npx cap init

#添加 iOS 或 Android 平台
npx cap add ios 
npx cap add android 

#自动打开 Xcode 或 Android Studio 打包工程。
npx cap open ios 
npx cap open android 

#拷贝`www`目录到iOS或Android工程
 npx cap copy ios
 npx cap copy android 
 
#安装插件或依赖后更新iOS或Androd工程的依赖
 npx cap update ios 
 npx cap update android 
 
 #同步工程包括更新依赖以及拷贝`www`目录，相当于`copy`+`update`
 npx cap sync
 
 #打开浏览器测试PWA
 npx cap serve 

```

```shell
# live-reload
ionic capacitor run android -l --external

```
