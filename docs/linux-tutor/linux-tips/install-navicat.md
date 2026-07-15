# Linux 使用 Navicat 数据库管理工具

> 工作环境：CentOS 7 64位 / Deepin 15.8 / Ubuntu

## 一、下载 Navicat

### 官方下载（推荐）

从 Navicat 官网下载试用版，避免第三方平台的版本混乱问题：

- **中文版**：[navicat.com.cn/download/navicat-for-mysql](http://www.navicat.com.cn/download/navicat-for-mysql)
- **英文版**：[navicat.com/en/download/navicat-for-mysql](https://www.navicat.com/en/download/navicat-for-mysql)

> 免费试用 14 天。浏览器下载较慢，可复制链接到迅雷等 P2P 工具下载。

## 二、安装步骤

### 1. 解压安装包

```bash
# 将下载的包复制到安装目录
sudo cp navicat120_mysql_cs_x64.tar.gz /usr/local/

# 解压
cd /usr/local/
sudo tar -zxvf navicat120_mysql_cs_x64.tar.gz
```

### 2. 启动 Navicat

```bash
cd /usr/local/navicat120_mysql_cs_x64
./start_navicat
```

首次启动会弹出安装 Wine 的对话框，**请确认安装**。Navicat 安装包自带了 Wine，无需单独安装。

> ⚠️ 第三方平台的 Navicat 可能没有集成 Wine，导致无法运行。官方版自带可用 Wine，省去很多麻烦。

### 3. 修复中文乱码

关闭 Navicat，编辑启动脚本：

```bash
# 用文本编辑器打开 start_navicat
vim ./start_navicat
```

找到第 8 行左右的 `export LANG="en_US.UTF-8"`，改为：

```bash
export LANG="zh_CN.UTF-8"
```

保存后重新启动 Navicat，中文即可正常显示。

## 三、试用过期处理

Navicat 试用到期后，删除以下文件即可重置试用期：

```bash
# 删除记录注册信息的文件
rm -rf ~/.navicat64/system.reg
# 或
rm -rf ~/.wine/system.reg

# 如果找不到文件，可以使用 find 命令查找
sudo find /root -name 'system.reg'
```

> 原理：Navicat 运行时会在 `~/.navicat64/` 或 `~/.wine/` 目录下生成 `system.reg` 文件，记录注册信息和过期时间。删除后 Navicat 会重新计算试用期。

## 四、注意事项

1. **不要使用注册机或破解版**，可能包含恶意代码
2. **官方版自带 Wine**，无需额外安装
3. 如果遇到启动问题，检查系统是否已安装 Wine：`wine --version`
4. 建议使用正版授权，支持开发者