# linux驱动问题

选择驱动:
一般选择 opensource,除非你是双显卡
​

## Manjaro软件更新失败：无效或已损坏的软件包(pgp签名)

```java
# 1,移除旧的keys
sudo rm -rf /etc/pacman.d/gnupg
# 2,初始化pacman的keys
sudo pacman-key --init
# 3,加载签名的keys
sudo pacman-key --populate archlinux
# 4,刷新升级已经签名的keys
sudo pacman-key --refresh-keys
# 5,清空并且下载新数据
sudo pacman -Sc
# 6,安装archlinuxcn-keyring
sudo pacman -S archlinuxcn-keyring

```
