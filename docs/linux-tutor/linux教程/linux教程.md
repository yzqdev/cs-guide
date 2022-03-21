# linux刻录教程

- 下载Arch安装盘 [下载地址](https://link.jianshu.com?t=https://www.archlinux.org/download/)
- VMware创建虚拟机，类型选择 linux2.6内核，一路下一步即可。 开启虚拟机。
- 分区，输入fdisk /dev/sda，输入n创建分区，选择p，再输入w保存退出
- 格式化分区，输入命令mkfs.ext4 /dev/sda1
- 格式化结束后，就可以挂载分区了。输入mount /dev/sda1 /mnt
- 修改镜像源，因为安装arch还需要下载，所以必须保证虚拟机处于联网状态。可以采用NAT模式
- 删除其他的源，保存中国地区的。vi /etc/pacman.d/mirrorslist 建议将163的复制到最前面。
- 现在可以进行安装了, 输入pacstrap /mnt base
- 安装完毕后。输入：arch-chroot /mnt
- 此时安装grub。输入：pacman -S grub
- 安装配置grub。输入：grub-install /dev/sda
- 最后配置boot文件。输入：grub-mkconfig -o /boot/grub/grub.cfg
- reboot 尽情的玩耍吧~~

<https://wangchujiang.com/linux-command/>
