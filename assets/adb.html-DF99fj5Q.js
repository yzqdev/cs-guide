import{_ as e,c as a,o as t,d as l}from"./app-CbULZrmi.js";const n={},d=l(`<h1 id="adb命令" tabindex="-1"><a class="header-anchor" href="#adb命令"><span>adb命令</span></a></h1><h1 id="adb命令-1" tabindex="-1"><a class="header-anchor" href="#adb命令-1"><span>adb命令</span></a></h1><p><a href="https://blog.csdn.net/Next_Second/article/details/73648754" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/Next_Second/article/details/73648754</a></p><h2 id="常用" tabindex="-1"><a class="header-anchor" href="#常用"><span>常用</span></a></h2><pre><code>adb version 查看adb版本
adb devices 查看连接设备
adb connect &lt;android_ip&gt;    连接android设备（需要在同一网段下）
adb kill-server 杀死adb 服务
adb start-server 启动adb服务
adb reboot 重启手机
</code></pre><h2 id="应用相关" tabindex="-1"><a class="header-anchor" href="#应用相关"><span>应用相关</span></a></h2><pre><code>adb shell pm list packages    显示所有应用信息
adb shell pm list packages -s    显示系统应用信息
adb shell pm list packages -3   显示第三方应用信息
adb shell pm list permissions -d -g    显示权限信息
adb shell pm clear &lt;package_name&gt;    清除数据
adb shell pm install &lt;package_name&gt;    安装应用
adb shell pm install -r -r &lt;package_name&gt;    保留数据和缓存文件，重新安装apk
adb shell pm uninstall &lt;package_name&gt;    卸载应用(与adb uninstall相同)

adb install &lt;package_name&gt;    安装应用
adb install -r &lt;package_name&gt;    保留数据和缓存文件，重新安装apk
adb uninstall &lt;package_name&gt;    卸载应用
</code></pre><h2 id="获取系统信息" tabindex="-1"><a class="header-anchor" href="#获取系统信息"><span>获取系统信息</span></a></h2><pre><code>adb shell cat /proc/cpuinfo     显示cpu信息
adb get-serialno    获取序列号
adb shell  cat /sys/class/net/wlan0/address    获取mac地址
adb shell getprop ro.product.model    获取设备型号
adb shell wm size    查看屏幕分辨率
adb shell wm density    查看屏幕密度
</code></pre><h2 id="log相关" tabindex="-1"><a class="header-anchor" href="#log相关"><span>log相关</span></a></h2><pre><code>adb logcat -v time    带时间戳的log
adb logcat -b &lt;buffer&gt;    查看不同类型的log，如main,system,radio,events,crash,all.默认为main log
adb logcat -c    清除log
adb logcat | grep -i &quot;str&quot;    忽略大小写筛选指定字符串log
adb logcat | grep -iE &quot;str1|str2|str3&quot;    筛选多个字符串
adb logcat &gt; log.txt    打印log输入到文件

</code></pre><h2 id="fastboot" tabindex="-1"><a class="header-anchor" href="#fastboot"><span>fastboot</span></a></h2><pre><code>adb reboot-bootloader
fastboot flash boot boot.img
fastboot flash recovery recovery.img
fastboot flash android system.img
</code></pre><h2 id="截屏录屏" tabindex="-1"><a class="header-anchor" href="#截屏录屏"><span>截屏录屏</span></a></h2><pre><code>截屏：
adb shell screencap -p &lt;output_file&gt;    截取屏幕，并设置图片存储路径
adb pull &lt;output_file&gt; .    拉取该截图到PC
adb shell rm &lt;output_file&gt;    删除截图文件
eg.
adb shell screencap -p /sdcard/screen.png

录屏：
adb shell screenrecord &lt;output_file&gt; 录屏
</code></pre><h2 id="am相关" tabindex="-1"><a class="header-anchor" href="#am相关"><span>am相关</span></a></h2><pre><code>启动Activity:
adb shell am start -n &lt;package_name&gt;/&lt;package_name&gt;.&lt;activity_name&gt;
eg.
adb shell am start -n com.example.hello/com.example.hello.MainActivity

启动Service:
adb shell am startservice -n &lt;package_name&gt;/&lt;package_name&gt;.&lt;service_name&gt;    启动service
eg.
adb shell am startservice -n com.example.test/com.example.test.TestService

发送广播:
adb shell am broadcast -a &lt;action&gt;    发送广播

</code></pre><h2 id="网络相关" tabindex="-1"><a class="header-anchor" href="#网络相关"><span>网络相关</span></a></h2><pre><code>adb shell netcfg    查看设备的 ip 地址
adb shell netstat    查看设备的端口号信息

# 获取属性
adb shell getprop [prop_name]    查看属性信息
adb shell setprop &lt;prop_name&gt; &lt;value&gt;    设置属性值
</code></pre><h2 id="adb安装apk" tabindex="-1"><a class="header-anchor" href="#adb安装apk"><span>adb安装apk</span></a></h2><pre><code>adb install -t .\\app-debug.apk
</code></pre><h2 id="adb传输文件" tabindex="-1"><a class="header-anchor" href="#adb传输文件"><span>adb传输文件</span></a></h2><pre><code>2，输入: adb pull 手机存储路径  电脑路径
adb pull  /sdcard/xxx  /Users/xxxx/ xxx.tx
二 从电脑端向手机复制文件
输入: adb push 电脑路径  手机存储路径  
 adb push  /Users/xxxx/xxx.txt   /sdcard/xxx
</code></pre>`,23),s=[d];function o(r,c){return t(),a("div",null,s)}const p=e(n,[["render",o],["__file","adb.html.vue"]]),h=JSON.parse('{"path":"/cs-tips/android/adb.html","title":"adb命令","lang":"zh-CN","frontmatter":{"description":"adb命令 adb命令 https://blog.csdn.net/Next_Second/article/details/73648754 常用 应用相关 获取系统信息 log相关 fastboot 截屏录屏 am相关 网络相关 adb安装apk adb传输文件","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/android/adb.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"adb命令"}],["meta",{"property":"og:description","content":"adb命令 adb命令 https://blog.csdn.net/Next_Second/article/details/73648754 常用 应用相关 获取系统信息 log相关 fastboot 截屏录屏 am相关 网络相关 adb安装apk adb传输文件"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"adb命令\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"常用","slug":"常用","link":"#常用","children":[]},{"level":2,"title":"应用相关","slug":"应用相关","link":"#应用相关","children":[]},{"level":2,"title":"获取系统信息","slug":"获取系统信息","link":"#获取系统信息","children":[]},{"level":2,"title":"log相关","slug":"log相关","link":"#log相关","children":[]},{"level":2,"title":"fastboot","slug":"fastboot","link":"#fastboot","children":[]},{"level":2,"title":"截屏录屏","slug":"截屏录屏","link":"#截屏录屏","children":[]},{"level":2,"title":"am相关","slug":"am相关","link":"#am相关","children":[]},{"level":2,"title":"网络相关","slug":"网络相关","link":"#网络相关","children":[]},{"level":2,"title":"adb安装apk","slug":"adb安装apk","link":"#adb安装apk","children":[]},{"level":2,"title":"adb传输文件","slug":"adb传输文件","link":"#adb传输文件","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.03,"words":608},"filePathRelative":"cs-tips/android/adb.md","localizedDate":"2023年5月25日","autoDesc":true}');export{p as comp,h as data};
