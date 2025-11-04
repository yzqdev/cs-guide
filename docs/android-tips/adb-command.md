# adb命令


## 拍照
```

adb shell screencap -p /sdcard/screen.png

adb pull /sdcard/screen.png ~/users/download
```

## 录像
```
adb shell screenrecord --time-limit 180 --size 1280x720 --bit-rate 6000000 /sdcard/demo.mp4
```

## adb传文件

```
# 单文件
adb pull /sdcard/DCIM/Camera/IMG_1234.JPG

# 重命名并放到指定目录
adb pull /sdcard/log.txt  ~/Documents/logcat_20250708.txt

# 整个相册目录
adb pull /sdcard/DCIM .

# 单文件
adb push app-debug.apk /sdcard/

# 改名并放到 Download
adb push readme.md /sdcard/Download/readme.txt

# 批量传一堆 png
adb push icons/ /sdcard/Pictures/icons/
```

## 设备 & 连接
``` 
adb devices / adb devices -l  列出在线设备（含详情）
adb get-serialno  只拿序列号
adb connect 192.168.x.x:5555  Wi-Fi 无线连
adb disconnect  断开无线
adb tcpip 5555  让设备改为 TCP 监听模式
adb -s <序列号> <任意命令>  多设备时精准指定
```
## 服务本身
```
adb start-server / adb kill-server  重启 ADB 后台
adb -P <端口> start-server  改默认 5037 端口
```
## APK 安装与卸载
```

adb install app.apk  全新安装
adb install -r app.apk  保留数据重装
adb install -d app.apk  允许降级安装
adb uninstall <包名>  卸载
adb uninstall -k <包名>  卸载但保数据
adb shell pm clear <包名>  清数据并恢复首次安装状态
```