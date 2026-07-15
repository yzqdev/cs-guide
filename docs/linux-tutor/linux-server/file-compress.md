# Linux 压缩/解压命令速查

> 服务器运维常用压缩解压命令。详细教程请参考 [awesome-shell 压缩章节](../awesome-shell/07-compression-package.md)。

## 一、解压速查

| 格式 | 命令 |
|------|------|
| `.tar.gz` / `.tgz` | `tar -zxvf file.tar.gz` |
| `.tar.bz2` | `tar -jxvf file.tar.bz2` |
| `.tar.xz` | `tar -Jxvf file.tar.xz` |
| `.tar` | `tar -xvf file.tar` |
| `.gz` | `gunzip file.gz` 或 `gzip -d file.gz` |
| `.bz2` | `bzip2 -d file.bz2` |
| `.zip` | `unzip file.zip` |
| `.zip 到指定目录` | `unzip file.zip -d /opt/` |
| `.war` | `unzip -oq file.war -d ROOT` |
| `.7z` | `7za x file.7z` |
| `.rar` | `rar x file.rar` |

## 二、压缩速查

| 格式 | 命令 |
|------|------|
| `.tar.gz` | `tar -zcvf archive.tar.gz dir/` |
| `.tar.bz2` | `tar -jcvf archive.tar.bz2 dir/` |
| `.tar` | `tar -cvf archive.tar dir/` |
| `.zip` | `zip -r archive.zip dir/` |
| `.bz2` | `bzip2 -v file.txt` |
| `.7z` | `7za a archive.7z dir/` |
| `.war` | `jar -cvfM0 app.war ./*` |

## 三、分卷压缩

```bash
# 分卷压缩 zip
zip -s 100M myFile.zip --out newFile.zip
# 生成文件：newFile.z01, newFile.z02, ..., newFile.zip
```

## 四、工具安装

### 7z

```bash
wget https://sourceforge.net/projects/p7zip/files/p7zip/16.02/p7zip_16.02_src_all.tar.bz2
tar jxvf p7zip_16.02_src_all.tar.bz2
cd p7zip_16.02
sh install.sh
```

### rar

```bash
wget https://www.rarlab.com/rar/rarlinux-6.23.tar.gz
tar zxvf rarlinux-6.23.tar.gz
cd rar && make && make install
```

## 五、Jar 包操作

### 修改 jar 包配置文件

```bash
vim mytest.jar
# 进入后 /log4j2.xml 搜索文件，回车编辑，:wq 保存
```

### 替换 jar 包中的文件

```bash
# 替换 jar 根目录的文件
jar uvf mytest.jar ClassToAdd.class

# 替换多层目录下的文件（需本地创建相同层级目录）
mkdir -p ./com/youmeek
jar uvf mytest.jar com/youmeek/ClassToAdd.class
```