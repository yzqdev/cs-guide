# Redshift — Linux 护眼软件

> Redshift 根据时间自动调整屏幕色温，减轻眼睛疲劳，类似 Windows 的夜间模式。

## 安装

```bash
# Debian/Ubuntu
sudo apt install redshift

# Arch/Manjaro
sudo pacman -S redshift
```

## 配置文件

编辑配置文件 `~/.config/redshift.conf`：

```ini
[redshift]
; 白天屏幕色温 (K)
temp-day=4200
; 夜晚屏幕色温 (K)
temp-night=4200
; 昼夜是否平滑过渡 (1/0)
transition=1
; 全局屏幕亮度
;brightness=1
; 白天屏幕亮度 (version >= 1.8)
brightness-day=1
; 夜晚屏幕亮度
brightness-night=1
; 屏幕 gamma 值
gamma=0.9
; 位置提供方式 (redshift -l list)
location-provider=manual
; 调整工具 (redshift -m list)
adjustment-method=randr

[manual]
; 位置提供方式设置
; 经纬度（以北京为例）
lat=39.90
lon=116.41
```

## 使用

```bash
# 启动（使用配置文件）
redshift

# 手动指定色温
redshift -O 3500

# 重置色温
redshift -x

# 查看帮助
redshift -h
```

## 开机自启

在系统设置中添加自启动项，或编辑 `~/.xprofile`：

```bash
# 在 ~/.xprofile 中添加
redshift &
```

## 参数说明

| 参数 | 说明 |
|------|------|
| `temp-day` | 白天色温，默认 5500K |
| `temp-night` | 夜晚色温，默认 3500K |
| `transition` | 是否平滑过渡 (1/0) |
| `brightness` | 全局亮度 (0.1-1.0) |
| `gamma` | Gamma 值 (0.1-1.0) |
| `lat` / `lon` | 纬度/经度，用于计算日出日落时间 |

> 色温值越低，屏幕越偏暖（黄/红），对眼睛更友好。