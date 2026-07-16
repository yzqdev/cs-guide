# Windows 系统优化技巧

> 不装第三方软件，从系统层面让 Windows 运行更流畅。

## 启动项管理

很多软件安装时会自动添加到开机启动项，拖慢开机速度。

### 方法一：任务管理器

1. `Ctrl + Shift + Esc` 打开任务管理器
2. 切换到 **启动** 标签页
3. 右键 → 禁用不必要的程序

### 方法二：设置

```
设置 → 应用 → 启动
```

### 常见可禁用的启动项

| 程序 | 建议 | 说明 |
|------|------|------|
| 微信/QQ | 按需 | 需要即时消息可保留 |
| 迅雷/百度网盘 | 禁用 | 下载时才打开 |
| 打印机驱动 | 保留 | 打印需要 |
| 云盘同步 | 按需 | OneDrive、Dropbox 等 |
| 更新程序 | 禁用 | 如 Adobe Updater |

## 关闭视觉效果

Windows 的动画和特效会消耗一定的系统资源，对于低配机器尤为明显。

```bash
# 快速打开性能选项
sysdm.cpl
# → 高级 → 性能 → 设置
```

推荐设置：
- 勾选：**平滑屏幕字体边缘**
- 勾选：**显示缩略图，而不是显示图标**
- 取消勾选：**动画任务栏**、**淡入淡出效果**、**在窗口下显示阴影**

## 存储感知（自动清理）

Windows 内置的自动清理功能：

```
设置 → 系统 → 存储 → 存储感知 → 开启
```

可以自动清理：
- 临时文件
- 回收站文件（超过指定天数）
- 下载文件夹（超过指定天数未打开的文件）

### 手动清理

```bash
# 打开磁盘清理工具
cleanmgr

# 清理系统文件（包括 Windows 更新缓存）
cleanmgr /sageset:1
```

## 关闭后台应用

很多应用在后台运行消耗 CPU 和内存：

```
设置 → 隐私和安全 → 后台应用
→ 关闭不需要的后台应用
```

或直接关闭所有后台应用，只保留需要的。

## 传递优化（P2P 更新）

Windows 更新默认启用 P2P 分发，会占用上传带宽：

```
设置 → Windows 更新 → 高级选项 → 传递优化
→ 关闭"允许从其他电脑下载"
```

## 快速启动 vs 完整关机

### 快速启动（默认）

- 优点：开机速度快
- 缺点：不彻底关机，某些更新需要"重启"而不是"关机"
- 缺点：偶尔会导致驱动问题

### 完全关机

```bash
# 完全关机（跳过快速启动）
shutdown /s /t 0

# 或关闭快速启动
# 控制面板 → 电源选项 → 选择电源按钮功能 → 更改当前不可用的设置
# → 取消勾选"启用快速启动"
```

## 电源计划

```
控制面板 → 电源选项
```

| 计划 | 适用场景 |
|------|---------|
| 平衡（推荐） | 日常使用 |
| 高性能 | 游戏、渲染（耗电增加） |
| 节能 | 笔记本省电 |

### 高性能计划隐藏设置

```bash
# 显示隐藏的"卓越性能"计划（仅 Win10/11 专业版/工作站版）
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61
```

## 卸载预装应用

Windows 预装了很多可能用不到的应用：

### 使用 PowerShell 卸载

```powershell
# 查看所有预装应用
Get-AppxPackage | Select Name, PackageFullName

# 卸载特定应用（以 Xbox 为例）
Get-AppxPackage *xbox* | Remove-AppxPackage

# 卸载所有预装应用（谨慎！）
Get-AppxPackage | Remove-AppxPackage
```

### 常见可卸载的预装应用

| 应用 | 命令 |
|------|------|
| Xbox | `Get-AppxPackage *xbox* | Remove-AppxPackage` |
| OneNote | `Get-AppxPackage *onenote* | Remove-AppxPackage` |
| 3D Builder | `Get-AppxPackage *3dbuilder* | Remove-AppxPackage` |
| 纸牌游戏 | `Get-AppxPackage *solitaire* | Remove-AppxPackage` |
| Skype | `Get-AppxPackage *skype* | Remove-AppxPackage` |
| 新闻 | `Get-AppxPackage *bingnews* | Remove-AppxPackage` |
| 天气 | `Get-AppxPackage *bingweather* | Remove-AppxPackage` |

## 磁盘碎片整理

对于 HDD（机械硬盘）定期整理碎片，SSD 不需要（系统会自动优化）。

```bash
# 打开碎片整理工具
dfrgui
```

SSD 用户请确保开启了 **TRIM**：

```bash
# 检查 TRIM 状态
fsutil behavior query DisableDeleteNotify

# 结果为 0 表示已启用（正常）
# 结果为 1 表示未启用
```

## 索引优化

Windows 搜索索引会占用 CPU 和磁盘：

```
控制面板 → 索引选项 → 修改
→ 只保留需要搜索的路径（如文档、桌面）
→ 移除不需要的路径（如 C:\Windows）
```

## 服务优化

**注意：修改服务可能影响系统功能，请谨慎操作。**

```bash
# 打开服务管理器
services.msc
```

### 可安全禁用的服务

| 服务名称 | 说明 |
|---------|------|
| Windows Search | 不使用搜索功能可禁用 |
| Print Spooler | 没有打印机可禁用 |
| Xbox Live 相关服务 | 不玩 Xbox 游戏可禁用 |
| Windows Error Reporting | 错误报告，可禁用 |
| Diagnostic Tracking | 诊断跟踪，可禁用 |
| Touch Keyboard 服务 | 没有触摸屏可禁用 |

## 关闭休眠

如果你不需要休眠功能（注意：是休眠，不是睡眠），可以关闭来释放磁盘空间：

```bash
# 查看休眠文件大小
powercfg /h /size

# 关闭休眠（释放 C 盘空间，通常 4-16GB）
powercfg /h off

# 重新开启
powercfg /h on
```

## 临时文件清理

```bash
# 打开临时文件夹
%temp%

# 也可以打开
temp
# 和
prefetch
```

定期清理这些文件夹中的文件可以释放磁盘空间。

## 减少开机等待时间

```bash
# 打开系统配置
msconfig
# → 引导 → 超时 → 改为 3 秒（默认 30 秒）
```

## 查看系统健康状态

```bash
# 系统文件检查（修复系统文件）
sfc /scannow

# 部署映像服务和管理（修复系统映像）
DISM /Online /Cleanup-Image /RestoreHealth
```

## 推荐操作顺序

```
1. 关闭不必要的启动项
2. 关闭视觉效果
3. 开启存储感知
4. 关闭后台应用
5. 关闭 P2P 传递优化
6. 选择合适的电源计划
7. 卸载不需要的预装应用
8. 关闭不需要的 Windows 功能
9. 关闭休眠（如果不需要）
10. 清理临时文件
```