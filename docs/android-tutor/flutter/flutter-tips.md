# flutter开发技巧

## 去除过渡动画

- vrouter
在themedata加上这个

```
 transitionDuration: Duration(seconds: 0),
```

- auto_route

```dart
 @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      theme: ThemeData(
        pageTransitionsTheme: PageTransitionsTheme(
          builders: {
            TargetPlatform.android: ZoomPageTransitionsBuilder(),
            TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
            TargetPlatform.windows: CupertinoPageTransitionsBuilder()//注意这里
          },
        ),
      ),
      routerDelegate: _appRouter.delegate(),
      routeInformationParser: _appRouter.defaultRouteParser(),
    );
  }
}
```

## 错误

debug Flutter Android应用时报错。报错内容如下：

```
Error connecting to the service protocol: failed to connect to  <http://127.0.0.1:57455/toyCz5p8HME=/>
```

 手机调试flutter APP时，不能热加载,报错如下图：
![图片](https://s2.51cto.com/images/202210/49c050f1846897a30e5614eab8f9f4b6f8b0d5.png )

*问题原因*
PC和手机未处于同一个局域网内

*解决方法：*  
将手机和PC连接同一个网络
处于同一网络后报错消失
