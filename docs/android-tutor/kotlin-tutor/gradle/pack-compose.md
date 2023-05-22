# compose desktop打包

## 打包exe

:::tip
不推荐使用android studio  
建议用idea创建compose desktop项目
:::

```powershell
# 这里可能会出现下载失败，如果下载失败，请手动到 Github 下载 wix311-binaries.zip。然后将文件命名为 wix311.zip 放在 build/wixToolset 下，重新运行 packageMsi

.\gradlew.bat packageMsi
# 下面这个会根据当前系统进行打包
.\gradlew.bat package 
# 打包绿色版
.\gradlew.bat createDistributable
# 打包jar
.\gradlew.bat packageUberJarForCurrentOS
```

idea的compose预览插件(使用@preview)[https://plugins.jetbrains.com/plugin/16541-compose-multiplatform-ide-support](https://plugins.jetbrains.com/plugin/16541-compose-multiplatform-ide-support)
