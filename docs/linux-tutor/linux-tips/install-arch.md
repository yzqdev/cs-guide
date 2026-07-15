# Arch Linux 安装教程

> 虚拟机安装 Arch Linux 的简要步骤

## 一、准备工作

### 下载镜像

- **Arch Linux 镜像**：[archlinux.org/download](https://www.archlinux.org/download/)
- **推荐工具**：Ventoy（制作启动盘）或直接使用 VMware/虚拟机加载 ISO

### 创建虚拟机

- VMware 创建虚拟机，类型选择 **Linux 2.6 内核**，一路下一步即可
- 网络建议使用 **NAT 模式**，确保安装时可以联网下载

## 二、安装步骤

### 1. 分区

```bash
# 查看磁盘
fdisk -l

# 分区（假设磁盘为 /dev/sda）
fdisk /dev/sda

# fdisk 交互命令
# n - 创建新分区
# p - 选择主分区
# w - 保存并退出
```

### 2. 格式化分区

```bash
# 格式化分区为 ext4
mkfs.ext4 /dev/sda1
```

### 3. 挂载分区

```bash
mount /dev/sda1 /mnt
```

### 4. 配置镜像源

```bash
# 编辑镜像源列表，将中国源（如 163、清华）移到最前面
vi /etc/pacman.d/mirrorlist
```

### 5. 安装基础系统

```bash
pacstrap /mnt base base-devel linux linux-firmware
```

### 6. 配置系统

```bash
# 进入新系统
arch-chroot /mnt

# 设置时区
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# 设置语言
echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
echo "zh_CN.UTF-8 UTF-8" >> /etc/locale.gen
locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf

# 设置主机名
echo "myarch" > /etc/hostname
```

### 7. 安装引导程序

```bash
# 安装 GRUB
pacman -S grub

# 安装到磁盘
grub-install /dev/sda

# 生成配置文件
grub-mkconfig -o /boot/grub/grub.cfg
```

### 8. 设置网络

```bash
# 安装网络工具
pacman -S networkmanager

# 启用网络服务
systemctl enable NetworkManager
```

### 9. 设置密码

```bash
# 设置 root 密码
passwd
```

### 10. 完成安装

```bash
# 退出 chroot 环境
exit

# 卸载分区
umount -R /mnt

# 重启
reboot
```

## 三、安装后配置

### 创建用户

```bash
useradd -m -G wheel -s /bin/bash username
passwd username
```

### 安装 yay（AUR 助手）

```bash
pacman -S git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

### 安装桌面环境

```bash
# GNOME
pacman -S gnome gnome-extra
systemctl enable gdm

# KDE Plasma
pacman -S plasma plasma-desktop
systemctl enable sddm
```

## 四、参考资源

- [Arch Linux Wiki（中文）](https://wiki.archlinux.org/title/Main_page_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
- [Arch Linux 初学者安装指南](https://archlinuxstudio.github.io/ArchLinuxTutorial/)
- 在线 Linux 命令查询：[wangchujiang.com/linux-command](https://wangchujiang.com/linux-command/)