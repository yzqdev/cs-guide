---
index: 7
---
# 压缩归档与包管理

## 一、`tar` — 归档工具

**tar** 用于将多个文件打包成一个归档文件，常与压缩工具配合使用。

### 语法

```bash
tar [选项] [归档文件] [源文件/目录]
```

### 常用参数

| 参数 | 说明 |
|------|------|
| `-c` | 创建归档 |
| `-x` | 提取归档 |
| `-t` | 列出归档内容 |
| `-f` | 指定归档文件名 |
| `-v` | 显示过程 |
| `-z` | 通过 gzip 压缩/解压（.tar.gz）|
| `-j` | 通过 bzip2 压缩/解压（.tar.bz2）|
| `-J` | 通过 xz 压缩/解压（.tar.xz）|
| `-C DIR` | 解压到指定目录 |
| `-p` | 保留权限 |
| `-P` | 保留绝对路径 |
| `--exclude` | 排除匹配的文件 |
| `-X FILE` | 从文件读取排除模式 |
| `-r` | 追加文件到归档 |
| `-u` | 更新归档（仅添加更新的文件）|
| `-O` | 提取到标准输出 |
| `--delete` | 从归档中删除 |
| `--strip-components=N` | 提取时跳过前 N 级目录 |

### 创建归档

```bash
# 打包
tar -cvf archive.tar file1 file2 dir/         # 打包为 .tar
tar -czvf archive.tar.gz dir/                 # 打包并用 gzip 压缩（最常用）
tar -cjvf archive.tar.bz2 dir/                # 打包并用 bzip2 压缩
tar -cJvf archive.tar.xz dir/                 # 打包并用 xz 压缩
tar -cvf archive.tar --exclude='*.log' dir/   # 排除 .log 文件
tar -cvf archive.tar -X exclude.txt dir/       # 从文件读取排除列表
tar -cvf archive.tar $(find dir/ -name '*.txt') # 选择特定文件

# 查看压缩包内容
tar -tvf archive.tar                          # 查看 .tar 内容
tar -tzvf archive.tar.gz                      # 查看 .tar.gz 内容
tar -tjvf archive.tar.bz2                     # 查看 .tar.bz2 内容

# 解压
tar -xvf archive.tar                          # 解压 .tar
tar -xzvf archive.tar.gz                      # 解压 .tar.gz（最常用）
tar -xjvf archive.tar.bz2                     # 解压 .tar.bz2
tar -xJvf archive.tar.xz                      # 解压 .tar.xz
tar -xzvf archive.tar.gz -C /target/dir/      # 解压到指定目录
tar -xzvf archive.tar.gz --strip-components=1 # 跳过第一级目录
tar -xzvf archive.tar.gz file1 file2          # 只提取特定文件
tar -xzvf archive.tar.gz -O > output.txt      # 提取到标准输出
```

### 实用技巧

```bash
# 压缩时排除多个目录
tar -czvf archive.tar.gz --exclude='node_modules' --exclude='.git' dir/

# 压缩时保留权限
tar -cpzvf archive.tar.gz dir/

# 增量备份（使用快照）
tar -czvg snapshot.snar -f backup.tar.gz dir/  # 第一次全量
tar -czvg snapshot.snar -f backup2.tar.gz dir/ # 后续增量

# 通过 SSH 远程传输
tar -czvf - dir/ | ssh user@host "tar -xzvf - -C /target/"
```

---

## 二、`gzip` / `gunzip` — gzip 压缩

### `gzip`

```bash
gzip file.txt                         # 压缩，生成 file.txt.gz（原文件被删除）
gzip -k file.txt                      # 压缩，保留原文件
gzip -c file.txt > file.txt.gz        # 压缩到标准输出（保留原文件）
gzip -r dir/                          # 递归压缩目录中的文件
gzip -1 file.txt                      # 快速压缩（压缩率低）
gzip -9 file.txt                      # 高压缩率（慢）
gzip -v file.txt                      # 显示压缩比
gzip -d file.txt.gz                   # 解压（同 gunzip）
gzip -l file.txt.gz                   # 查看压缩文件信息
gzip -t file.txt.gz                   # 测试压缩文件完整性
gzip -n file.txt                      # 不保存原文件名和时间戳
```

### `gunzip`

```bash
gunzip file.txt.gz                    # 解压
gunzip -c file.txt.gz > file.txt      # 解压到标准输出
gunzip -k file.txt.gz                 # 解压，保留 .gz 文件
gunzip -r dir/                        # 递归解压
gunzip -f file.txt.gz                 # 强制覆盖
```

### `zcat` — 查看压缩文件内容

```bash
zcat file.txt.gz                      # 查看压缩文件内容（同 gunzip -c）
zcat file1.txt.gz file2.txt.gz        # 查看多个压缩文件
zcat file.txt.gz | head -n 10         # 查看前 10 行
```

---

## 三、`bzip2` / `bunzip2` — bzip2 压缩

```bash
bzip2 file.txt                        # 压缩，生成 file.txt.bz2
bzip2 -k file.txt                     # 压缩，保留原文件
bzip2 -1 file.txt                     # 快速（1-9 级别）
bzip2 -9 file.txt                     # 高压缩率（默认 9）
bzip2 -d file.txt.bz2                 # 解压（同 bunzip2）
bzip2 -t file.txt.bz2                 # 测试完整性

bunzip2 file.txt.bz2                  # 解压
bunzip2 -k file.txt.bz2               # 解压，保留 .bz2 文件

bzcat file.txt.bz2                    # 查看压缩文件内容
bzmore file.txt.bz2                   # 分页查看
bzless file.txt.bz2                   # 使用 less 查看
bzgrep pattern file.txt.bz2           # 搜索压缩文件
```

---

## 四、`xz` / `unxz` — xz 压缩

```bash
xz file.txt                           # 压缩，生成 file.txt.xz
xz -k file.txt                        # 压缩，保留原文件
xz -0 file.txt                        # 快速（0-9 级别）
xz -9 file.txt                        # 高压缩率（最慢）
xz -e file.txt                        # 使用极限压缩（更慢）
xz -d file.txt.xz                     # 解压（同 unxz）
xz -t file.txt.xz                     # 测试完整性
xz -l file.txt.xz                     # 查看压缩信息
xz -T 4 file.txt                      # 使用 4 个线程

unxz file.txt.xz                      # 解压
xzcat file.txt.xz                     # 查看压缩文件内容
```

### 压缩率对比

| 工具 | 压缩速度 | 解压速度 | 压缩率 | 文件后缀 |
|------|---------|---------|--------|---------|
| gzip | 快 | 快 | 中等 | .gz |
| bzip2 | 中等 | 中等 | 较高 | .bz2 |
| xz | 慢 | 中等 | 最高 | .xz |

---

## 五、`zip` / `unzip` — ZIP 压缩

### `zip`

```bash
zip archive.zip file1 file2           # 创建 zip 归档
zip -r archive.zip dir/               # 递归压缩目录
zip -r archive.zip dir/ -x "*.log"    # 排除 .log 文件
zip -9 archive.zip file1              # 最大压缩（1-9，默认 6）
zip -0 archive.zip file1              # 只存储不压缩
zip -m archive.zip file1              # 压缩后删除原文件
zip -u archive.zip file1              # 更新已存在的文件
zip -d archive.zip file1              # 从归档中删除文件
zip -e archive.zip file1              # 加密压缩（输入密码）
zip -P password archive.zip file1     # 密码加密（⚠️ 不安全，密码会暴露）
zip -s 100m archive.zip file1         # 分卷压缩（每卷 100MB）
zip -T archive.zip                    # 测试完整性
zip -l archive.zip                    # 显示归档内容（同 unzip -l）
```

### `unzip`

```bash
unzip archive.zip                     # 解压到当前目录
unzip archive.zip -d /target/dir/     # 解压到指定目录
unzip -l archive.zip                  # 列出归档内容（不解压）
unzip -t archive.zip                  # 测试完整性
unzip -o archive.zip                  # 覆盖已存在的文件
unzip -n archive.zip                  # 不覆盖已存在的文件
unzip -j archive.zip                  # 忽略目录结构
unzip -P password archive.zip         # 使用密码解压
unzip -q archive.zip                  # 安静模式
unzip -x file1 archive.zip            # 解压时排除特定文件
unzip -v archive.zip                  # 详细显示
unzip "*.txt" -d /target/             # 只解压 .txt 文件
```

---

## 六、包管理

### Debian/Ubuntu (`apt`)

```bash
# 更新软件包列表
sudo apt update                       # 更新源（必做第一步）

# 升级软件包
sudo apt upgrade                      # 升级所有可升级的包
sudo apt full-upgrade                 # 升级包含依赖变更
sudo apt dist-upgrade                 # 同上（发行版升级）

# 安装和卸载
sudo apt install package              # 安装软件包
sudo apt install -y package           # 自动确认安装
sudo apt install package1 package2    # 安装多个包
sudo apt remove package               # 卸载软件包（保留配置）
sudo apt purge package                # 彻底卸载（删除配置）
sudo apt autoremove                   # 自动卸载不需要的依赖

# 搜索和信息
apt search keyword                    # 搜索软件包
apt show package                      # 查看软件包信息
apt list --installed                  # 列出已安装的包
apt list --upgradable                 # 列出可升级的包
apt list --all-versions               # 列出所有版本

# 清理
sudo apt autoclean                    # 清理旧版本缓存
sudo apt clean                        # 清理所有缓存
sudo apt autoremove --purge           # 清理无用的依赖和配置

# 修复
sudo apt --fix-broken install         # 修复依赖问题
sudo apt --fix-missing update         # 修复源问题
```

### RedHat/CentOS (`yum` / `dnf`)

```bash
# yum（CentOS 7 及更早）
sudo yum install package              # 安装
sudo yum remove package               # 卸载
sudo yum update                       # 更新系统
sudo yum update package               # 更新指定包
sudo yum check-update                 # 检查可更新的包
sudo yum search keyword               # 搜索
sudo yum info package                 # 查看包信息
sudo yum list installed               # 列出已安装
sudo yum clean all                    # 清理缓存
sudo yum groupinstall "Development Tools"  # 安装软件组

# dnf（Fedora / CentOS 8+）
sudo dnf install package              # 安装
sudo dnf remove package               # 卸载
sudo dnf update                       # 更新
sudo dnf search keyword               # 搜索
sudo dnf info package                 # 查看信息
sudo dnf list --installed             # 已安装
sudo dnf reinstall package            # 重新安装
sudo dnf downgrade package            # 降级
sudo dnf clean all                    # 清理缓存
sudo dnf history                      # 查看操作历史
sudo dnf groupinstall "Development Tools"  # 安装软件组
```

### `dpkg` — Debian 包管理器

```bash
sudo dpkg -i package.deb              # 安装 .deb 包
sudo dpkg -r package                  # 卸载（保留配置）
sudo dpkg -P package                  # 彻底卸载（删除配置）
sudo dpkg -l                          # 列出所有已安装包
sudo dpkg -l | grep package           # 搜索已安装包
sudo dpkg -L package                  # 查看包安装的文件
sudo dpkg -s package                  # 查看包状态
sudo dpkg -c package.deb              # 查看 .deb 包内容
sudo dpkg -S /path/to/file            # 查看文件属于哪个包
sudo dpkg --configure -a              # 修复未完成的安装
sudo dpkg --audit                     # 检查包状态
```

### `rpm` — RedHat 包管理器

```bash
sudo rpm -ivh package.rpm             # 安装
sudo rpm -Uvh package.rpm             # 升级
sudo rpm -e package                   # 卸载
sudo rpm -qa                          # 列出所有已安装包
sudo rpm -qa | grep package           # 搜索已安装包
sudo rpm -ql package                  # 查看包安装的文件
sudo rpm -qi package                  # 查看包信息
sudo rpm -qf /path/to/file            # 文件属于哪个包
sudo rpm -V package                   # 验证包完整性
sudo rpm -qpR package.rpm             # 查看依赖
sudo rpm --rebuilddb                  # 重建 RPM 数据库
```

### `snap` — Snap 包

```bash
sudo snap install package             # 安装
sudo snap remove package              # 卸载
sudo snap list                        # 列出已安装
sudo snap refresh package             # 更新
sudo snap refresh                     # 更新所有
sudo snap revert package              # 回滚到上一版本
sudo snap info package                # 查看信息
sudo snap find keyword                # 搜索
sudo snap changes                     # 查看变更历史
sudo snap tasks                       # 查看后台任务
```

### `flatpak` — Flatpak 包

```bash
flatpak install flathub package       # 安装
flatpak uninstall package             # 卸载
flatpak list                          # 列出已安装
flatpak update                        # 更新
flatpak search keyword                # 搜索
flatpak run package                   # 运行
flatpak info package                  # 查看信息
flatpak override --user package       # 覆盖权限
```

---

## 七、源码编译安装

```bash
# 典型三步安装
./configure                           # 检查环境和配置
make                                  # 编译
sudo make install                     # 安装到系统

# 常用选项
./configure --prefix=/usr/local       # 指定安装路径
./configure --help                    # 查看所有选项
make -j $(nproc)                      # 使用所有核心并行编译
make clean                            # 清理编译产物
make uninstall                        # 卸载（如果支持）
```

### 编译工具

```bash
# GCC
gcc -o output source.c                # 编译 C 程序
gcc -Wall -O2 -o output source.c      # 带警告和优化
g++ -o output source.cpp              # 编译 C++ 程序

# Make
make                                  # 编译
make -j4                              # 4 线程并行编译
make install                          # 安装
make clean                            # 清理
```