# adb命令

# adb命令

<https://blog.csdn.net/Next_Second/article/details/73648754>

## 常用

```
adb version 查看adb版本
adb devices 查看连接设备
adb connect <android_ip>    连接android设备（需要在同一网段下）
adb kill-server 杀死adb 服务
adb start-server 启动adb服务
adb reboot 重启手机
```

## 应用相关

```
adb shell pm list packages    显示所有应用信息
adb shell pm list packages -s    显示系统应用信息
adb shell pm list packages -3   显示第三方应用信息
adb shell pm list permissions -d -g    显示权限信息
adb shell pm clear <package_name>    清除数据
adb shell pm install <package_name>    安装应用
adb shell pm install -r -r <package_name>    保留数据和缓存文件，重新安装apk
adb shell pm uninstall <package_name>    卸载应用(与adb uninstall相同)

adb install <package_name>    安装应用
adb install -r <package_name>    保留数据和缓存文件，重新安装apk
adb uninstall <package_name>    卸载应用
```

## 获取系统信息

```
adb shell cat /proc/cpuinfo     显示cpu信息
adb get-serialno    获取序列号
adb shell  cat /sys/class/net/wlan0/address    获取mac地址
adb shell getprop ro.product.model    获取设备型号
adb shell wm size    查看屏幕分辨率
adb shell wm density    查看屏幕密度
```

## log相关

```
adb logcat -v time    带时间戳的log
adb logcat -b <buffer>    查看不同类型的log，如main,system,radio,events,crash,all.默认为main log
adb logcat -c    清除log
adb logcat | grep -i "str"    忽略大小写筛选指定字符串log
adb logcat | grep -iE "str1|str2|str3"    筛选多个字符串
adb logcat > log.txt    打印log输入到文件

```

## fastboot

```
adb reboot-bootloader
fastboot flash boot boot.img
fastboot flash recovery recovery.img
fastboot flash android system.img
```

## 截屏录屏

```
截屏：
adb shell screencap -p <output_file>    截取屏幕，并设置图片存储路径
adb pull <output_file> .    拉取该截图到PC
adb shell rm <output_file>    删除截图文件
eg.
adb shell screencap -p /sdcard/screen.png

录屏：
adb shell screenrecord <output_file> 录屏
```

## am相关

```
启动Activity:
adb shell am start -n <package_name>/<package_name>.<activity_name>
eg.
adb shell am start -n com.example.hello/com.example.hello.MainActivity

启动Service:
adb shell am startservice -n <package_name>/<package_name>.<service_name>    启动service
eg.
adb shell am startservice -n com.example.test/com.example.test.TestService

发送广播:
adb shell am broadcast -a <action>    发送广播

```

## 网络相关

```
adb shell netcfg    查看设备的 ip 地址
adb shell netstat    查看设备的端口号信息

# 获取属性
adb shell getprop [prop_name]    查看属性信息
adb shell setprop <prop_name> <value>    设置属性值
```

## adb安装apk

```
adb install -t .\app-debug.apk
```

## adb传输文件

```
2，输入: adb pull 手机存储路径  电脑路径
adb pull  /sdcard/xxx  /Users/xxxx/ xxx.tx
二 从电脑端向手机复制文件
输入: adb push 电脑路径  手机存储路径  
 adb push  /Users/xxxx/xxx.txt   /sdcard/xxx
 ```
