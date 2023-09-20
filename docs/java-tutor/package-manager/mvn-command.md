# maven命令


## 打包命令

```
mvn clean package -pl module-a


多模块带有依赖需要加上-am

mvn clean package -pl log-app -am
```

:::warning
对于idea ,多模块打包必须先install,上面带参数这种方法不适用

:::