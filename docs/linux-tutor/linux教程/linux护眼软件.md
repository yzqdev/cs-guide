# linux护眼软件

manjaro安装redshift软件

```bash
kate   ～/.config/redshift.conf
```

添加下面的东西

```bash
[redshift]
; 白天屏幕温度
temp-day=4200
; 夜晚屏幕温度
temp-night=4200
; 昼夜是否平滑过度(1/0)
transition=1
; 全局屏幕亮度
;brightness=1
; 昼夜屏幕亮度(version >= 1.8)
brightness-day=1
brightness-night=1
; 屏幕gamma
gamma=0.9
; 位置提供方式(redshift -l list)
location-provider=manual
; 调整工具(redshift -m list)
adjustment-method=randr
[manual]
; 位置提供方式设置
; 经纬度(北京)
lat=39.90
lon=116.41
```
