# 手机刷机教程

刷机教程 :    [http://www.miui.com/shuaji-329.html](http://www.miui.com/shuaji-329.html)
小米5s plus刷机包下载     [https://www.xiaomi.cn/post/17843063](https://www.xiaomi.cn/post/17843063)

## 常用命令

```powershell
adb reboot
# 进入recovery
adb reboot recovery
# 然后加载卡刷包
adb sideload *.zip
# 进入fastboot墨汁是
adb reboot bootloader

# 通常需要进入bootloader(fastboot)才能加载recovery
# 安装recovery命令
fastboot flash recovery *.img


```

## 快捷键

音量下+关机  =>   recovery

音量上+关机   =>  fastboot

音量上+音量下 +关机  => mkt模式

## 线刷和卡刷

卡刷一般都是你的手机相应官网给你提供的卡刷包，这是不需要获取root权限就可以直接进入手机相关模式刷的，一般用于手机系统升级或则降级使用，不能解除密码，当然，卡刷还有一种就是你曾经获取了root权限，并且有第三方re，这样你可以使用网上各位大神修改好的相应卡刷包，这种就需要一定的方面知识，不会的容易搞成渣。

什么又是线刷呢？线刷可以理解为更深层次的刷机，线刷通常用在手机无法正常使用，已经出现黑屏、不开机、忘记密码了等等，一般来说，只有当我们的手机出现以上问题时才线刷，还有就是降级也可线刷，线刷需要用到电脑，而且方式的话，比卡刷第三方简单，但比卡刷中的官方要麻烦点。通常都有教程的。

### 总结

官方卡刷用于:升级系统、降级系统。

线刷用于:解锁、软件问题、无法开机、黑屏、成砖等。
常见的adb sideload 都是卡刷

### 小米rom网址

<https://xiaomifirmwareupdater.com/miui/>
<https://miuirom.org/>
<https://lineageos.org/>  =>非常好用的rom
