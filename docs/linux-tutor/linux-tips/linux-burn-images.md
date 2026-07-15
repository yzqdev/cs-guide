# Linux 制作 USB 启动盘

## 一、推荐工具

### Ventoy — 最推荐

> 一个制作可启动U盘的开源工具，无需反复格式化U盘，只需把 ISO/WIM/IMG/VHD(x)/EFI 文件拷贝到U盘即可启动，可以一次性拷贝多个不同类型的 ISO 文件。

- **官网**：[https://www.ventoy.net](https://www.ventoy.net/cn/index.html)
- **平台**：Windows、Linux
- **特点**：多系统共存，无需重复格式化

### balenaEtcher — 可视化工具

- **官网**：[https://www.balena.io/etcher/](https://www.balena.io/etcher/)
- **平台**：Windows、macOS、Linux
- **特点**：界面简洁，操作简单，支持校验

### Rufus — Windows 推荐

- **官网**：[https://rufus.ie/](https://rufus.ie/)
- **平台**：Windows
- **特点**：轻量快速，功能强大

## 二、Linux 命令行制作启动盘

### 使用 dd 命令

```bash
# 1. 查看U盘盘符
sudo fdisk -l

# 2. 卸载U盘（假设盘符为 /dev/sdb）
sudo umount /dev/sdb*

# 3. 写入镜像（⚠️ 注意：of= 后面一定要写对盘符，否则会覆盖其他磁盘）
sudo dd if=/path/to/your.iso of=/dev/sdb bs=4M status=progress

# 4. 等待完成，执行 sync 确保数据写入
sync
```

**参数说明**：
- `if=` 输入文件（ISO 镜像路径）
- `of=` 输出文件（U盘设备）
- `bs=4M` 块大小（4MB，提高写入速度）
- `status=progress` 显示写入进度

### 使用 Ventoy 命令行

```bash
# 1. 下载 Ventoy
wget https://github.com/ventoy/Ventoy/releases/latest/download/ventoy-1.0.96-linux.tar.gz
tar -xzf ventoy-1.0.96-linux.tar.gz
cd ventoy-1.0.96

# 2. 安装到U盘（注意：会格式化U盘）
sudo bash Ventoy2Disk.sh -i /dev/sdb

# 3. 安装完成后，直接拷贝 ISO 文件到U盘即可
cp /path/to/your.iso /media/username/Ventoy/
```

## 三、Windows 制作启动盘

### 使用 Rufus

1. 下载并打开 Rufus
2. 选择U盘设备
3. 点击 **Select** 选择 ISO 镜像
4. 点击 **Start** 开始制作
5. 如果提示写入模式，选择 **DD Image** 方式

### 使用 Ventoy

1. 下载并打开 Ventoy2Disk.exe
2. 选择U盘设备
3. 点击 **Install** 安装
4. 安装完成后，将 ISO 文件复制到U盘即可

## 四、注意事项

1. **备份数据**：制作启动盘会格式化U盘，请提前备份数据
2. **确认盘符**：使用 `dd` 命令时务必确认盘符正确，避免覆盖其他磁盘
3. **校验镜像**：制作完成后建议校验 MD5 或 SHA256，确保镜像完整
4. **启动设置**：部分电脑需要在 BIOS 中关闭 Secure Boot 并开启 Legacy Boot

## 五、参考链接

- [Manjaro Wiki - Burn an ISO File](https://wiki.manjaro.org/index.php/Burn_an_ISO_File)
- [Ventoy 官方文档](https://www.ventoy.net/cn/doc_start.html)