# Elementary OS 安装与配置

## 一、系统更新

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
```

## 二、安装额外驱动

在 **软件与更新** 中直接选择安装额外驱动即可。

## 三、安装媒体解码器

### 安装多媒体框架

```bash
sudo apt-add-repository ppa:mc3man/trusty-media
sudo apt-get update
sudo apt-get install ubuntu-restricted-extras ffmpeg gstreamer0.10-plugins-ugly \
  libavcodec-extra-54 libvdpau-va-gl1 libmad0 mpg321 gstreamer1.0-libav
```

### 启用 DVD 回放

```bash
sudo /usr/share/doc/libdvdread4/install-css.sh
```

## 四、安装常用软件

### 媒体播放

```bash
sudo apt-get install vlc           # VLC 媒体播放器
```

### Java 环境

```bash
sudo add-apt-repository -y ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java9-installer
```

### 压缩工具支持

```bash
sudo apt-get install unace rar unrar p7zip-rar p7zip sharutils \
  uudeview mpack arj cabextract lzip lunzip
```

### 办公软件

```bash
sudo apt-get install libreoffice libreoffice-gtk libreoffice-style-sifr
```

### 网页浏览器

```bash
sudo apt-get install chromium-browser firefox
```

### 下载工具

```bash
# 种子下载
sudo apt-get install transmission

# 下载管理器
wget http://xdman.sourceforge.net/xdman_mint_ubuntu.deb
sudo dpkg -i xdman_mint_ubuntu.deb
```

### 图像处理

```bash
sudo apt-get install gimp inkscape
```

## 五、系统增强

### 搜索指示器

```bash
sudo apt-add-repository ppa:elementary-os/unstable-upstream
sudo apt-get install indicator-synapse
```

### 系统调整工具

```bash
sudo apt-add-repository ppa:mpstark/elementary-tweaks-daily
sudo apt-get install elementary-tweak
```

### 系统清理

```bash
sudo apt-get install bleachbit
```

## 六、云存储

### DropBox

下载地址：[https://www.dropbox.com/install?os=lnx](https://www.dropbox.com/install?os=lnx)

### Google Drive

```bash
sudo add-apt-repository ppa:alessandro-strada/ppa
sudo apt-get update
sudo apt-get install google-drive-ocamlfuse
```

## 七、笔记本优化

### 安装 TLP（延长电池寿命，减少发热）

```bash
sudo add-apt-repository ppa:linrunner/tlp
sudo apt-get update
sudo apt-get install tlp tlp-rdw
sudo tlp start
```