# elementaryos安装

## 安装系统更新

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist upgrade
```

◾安装额外的驱动

在软件与更新中直接选择安装额外驱动即可。

◾安装媒体解码器并且启用 DVD 回放

a) 安装多媒体框架

```bash
sudo apt-add-repository ppa:mc3man/trusty-media

sudo apt-get update

sudo apt-get install [Ubuntu](https://www.linuxidc.com/topicnews.aspx?tid=2)-restricted-extras ffmpeg gstreamer0.10-plugins-ugly libavcodec-extra-54 libvdpau-va-gl1 libmad0 mpg321 gstreamer1.0-libav
```

b) 启用 DVD 回放

```bash
sudo /usr/share/doc/libdvdread4/install-css.s­h
```

◾安装 VLC 媒体播放器

```bash
sudo apt-get install vlc
```

◾安装 [Java](http://www.linuxidc.com/Java)

```bash
sudo add-apt-repository -y ppa:webupd8team/java

sudo apt-get update

sudo apt-get install [Oracle](https://www.linuxidc.com/topicnews.aspx?tid=12)-java9-installer
```

◾安装各种归档文件，压缩文件格式支持

```bash
sudo apt-get unace rar unrar p7zip-rar p7zip sharutils uudeview mpack arj cabextract lzip lunzip
```

◾安装 LibreOffice 办公软件

```bash
sudo apt-get install libreoffice libreoffice-gtk libreoffice-style-sifr
```

◾安装其他的网页浏览器

```bash
sudo apt-get install chromium-browser firefox
```

◾安装种子下载器

```bash
sudo apt-get install transmission
```

◾安装下载管理器

```bash
wget http://xdman.sourceforge.net/xdman_mint_ubuntu.deb

sudo dpkg -i xdman_mint_ubuntu.deb
```

◾安装图像处理软件

```bash
sudo apt-get install gimp inkscape
```

◾安装搜索指示器

```bash
sudo apt-add-repository ppa:elementary-os/unstable-upstream

sudo apt-get install indicator-synapse
```

◾安装系统调整工具

```bash
sudo apt-add-repository ppa:mpstark/elementary-tweaks-daily

sudo apt-get install elementary-tweak
```

◾安装 Bleachbit 系统记录清理工具

```bash
sudo apt-get install bleachbit
```

◾安装在线云存储客户端

下载 DropBox : [https://www.dropbox.com/install?os=lnx](https://www.dropbox.com/install?os=lnx)

安装 Google Drive

```bash
sudo add-apt-repository ppa:alessandro-strada/ppa

sudo apt-get update

sudo apt-get install google-drive-ocamlfuse
```

◾针对笔记本，安装 TLP 以延长电池寿命，减少发热

```bash
sudo add-apt-repository ppa:linrunner/tlp

sudo apt-get update

sudo apt-get install tlp tlp-rdw

sudo tlp start
```
