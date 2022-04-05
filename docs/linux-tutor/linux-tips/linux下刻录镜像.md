# linux刻录镜像

## 制作USB安装器

可以使用ventory   [https://www.ventoy.net/cn/index.html](https://www.ventoy.net/cn/index.html)

```
Ventoy是一个制作可启动U盘的开源工具。有了Ventoy你就无需反复地格式化U盘，你只需要把ISO/WIM/IMG/VHD(x)/EFI文件拷贝到U盘里面就可以启动了，无需其他操作。 你可以一次性拷贝很多个不同类型的ISO文件，在启动时Ventoy会显示一个菜单来选择
```

> 推荐使用可视化软件  Etcher 网址: [https://www.balena.io/etcher/](https://www.balena.io/etcher/)    (有问题不能用）

1. 官网下载镜像
1. Linux下推荐通过命令行制作
1. 插上用于制作安装盘的U盘
1. 查看U盘盘符.

```bash
sudo fdisk -l
```

5. 写入镜像:

```bash
sudo dd if=manjaro-xfce-18.0-stable-x86_64.iso(替换成你下载的文件的名字) of=/dev/(这里替换成你上面的查到的盘符) bs=4M
```

6. Windows推荐使用Rufus:
6. 选择你要用于制作安装盘的U盘.
6. 在Boot selection, 点击Select选择下载的Manjaro镜像, 点击Start, 然后在出现的窗口中选择DD Image 方式.

[https://wiki.manjaro.org/index.php/Burn_an_ISO_File#Burning_to_CD.2FDVD_in_Linux](https://wiki.manjaro.org/index.php/Burn_an_ISO_File#Burning_to_CD.2FDVD_in_Linux)
