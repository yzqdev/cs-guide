# Linux 远程管理工具

## 一、Web 管理面板

### 1. WG Cloud（WGSTArt）

> 轻量级的 Linux 服务器监控和管理系统

- **官网**：[https://www.wgstart.com](https://www.wgstart.com/)
- **特点**：开源免费，支持服务器监控、告警、资产管理
- **安装**：`wget https://www.wgstart.com/download/wgcloud.tar.gz`

### 2. 宝塔面板（BT Panel）

> 国内最流行的 Linux 服务器管理面板

- **官网**：[https://www.bt.cn/](https://www.bt.cn/)
- **特点**：可视化界面，一键部署 LNMP/LAMP，文件管理，数据库管理，定时任务
- **安装**：
  ```bash
  # CentOS
  yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh

  # Ubuntu/Debian
  wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh
  ```
- **功能**：网站管理、FTP、数据库、SSL 证书、防火墙、计划任务、文件管理

### 3. 1Panel

> 新一代 Linux 服务器管理面板

- **官网**：[https://1panel.cn/](https://1panel.cn/)
- **特点**：现代化 UI，Docker 集成，开源免费
- **安装**：
  ```bash
  curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sudo bash quick_start.sh
  ```

### 4. Cockpit

> Red Hat 出品的 Web 管理工具

- **官网**：[https://cockpit-project.org/](https://cockpit-project.org/)
- **特点**：轻量级，系统自带集成，官方维护
- **安装**：
  ```bash
  sudo apt install cockpit          # Debian/Ubuntu
  sudo yum install cockpit          # CentOS/RHEL
  sudo systemctl enable --now cockpit
  ```
- **访问**：`https://your-server:9090`

### 5. Webmin

> 老牌 Web 管理面板

- **官网**：[https://www.webmin.com/](https://www.webmin.com/)
- **特点**：功能全面，历史悠久，模块化设计
- **安装**：
  ```bash
  wget https://prdownloads.sourceforge.net/webadmin/webmin_2.111_all.deb
  sudo dpkg -i webmin_2.111_all.deb
  ```

---

## 二、SSH 客户端

### 1. Termius

- **官网**：[https://termius.com/](https://termius.com/)
- **平台**：Windows、macOS、Linux、iOS、Android
- **特点**：跨平台同步，界面美观，支持 SFTP

### 2. Tabby（原名 Terminus）

- **官网**：[https://tabby.sh/](https://tabby.sh/)
- **平台**：Windows、macOS、Linux
- **特点**：现代化终端，支持插件，GPU 加速

### 3. WindTerm

- **官网**：[https://github.com/kingToolbox/WindTerm](https://github.com/kingToolbox/WindTerm)
- **平台**：Windows、macOS、Linux
- **特点**：开源免费，性能优秀，支持会话管理

### 4. Electerm

- **官网**：[https://electerm.github.io/electerm/](https://electerm.github.io/electerm/)
- **平台**：Windows、macOS、Linux
- **特点**：基于 Electron，支持多标签，文件传输

### 5. MobaXterm

- **官网**：[https://mobaxterm.mobatek.net/](https://mobaxterm.mobatek.net/)
- **平台**：Windows
- **特点**：功能强大，集成 X 服务器，支持多标签，内置 SFTP 文件管理器

---

## 三、文件传输工具

### 1. FileZilla

- **官网**：[https://filezilla-project.org/](https://filezilla-project.org/)
- **平台**：Windows、macOS、Linux
- **特点**：图形化 FTP/SFTP/FTPS 客户端，拖拽操作
- **安装**：
  ```bash
  sudo apt install filezilla
  ```

### 2. WinSCP

- **官网**：[https://winscp.net/](https://winscp.net/)
- **平台**：Windows
- **特点**：SFTP/FTP/SCP 客户端，支持同步功能

### 3. Rclone

- **官网**：[https://rclone.org/](https://rclone.org/)
- **特点**：命令行云存储同步工具，支持 40+ 存储后端
- **安装**：
  ```bash
  curl https://rclone.org/install.sh | sudo bash
  ```

---

## 四、监控工具

### 1. Prometheus + Grafana

> 企业级监控方案

- **Prometheus**：数据采集和存储
- **Grafana**：数据可视化仪表板

### 2. Netdata

> 实时服务器监控

- **官网**：[https://www.netdata.cloud/](https://www.netdata.cloud/)
- **安装**：
  ```bash
  bash <(curl -Ss https://my-netdata.io/kickstart.sh)
  ```
- **访问**：`http://your-server:19999`

### 3. Zabbix

> 企业级开源监控系统

- **官网**：[https://www.zabbix.com/](https://www.zabbix.com/)
- **特点**：支持网络监控、服务器监控、云监控

---

## 五、远程桌面

### 1. VNC

```bash
# 安装 VNC 服务器
sudo apt install tightvncserver
vncserver                          # 启动 VNC 服务

# 连接
# 使用 VNC Viewer 连接：your-server:1
```

### 2. X2Go

```bash
# 安装
sudo apt install x2goserver x2goclient
```

### 3. NoMachine

- **官网**：[https://www.nomachine.com/](https://www.nomachine.com/)
- **特点**：高性能远程桌面，跨平台

---

## 六、命令速查

| 场景 | 命令 |
|------|------|
| SSH 远程登录 | `ssh user@hostname` |
| SSH 复制文件 | `scp file user@host:/path/` |
| 远程同步 | `rsync -av /src/ user@host:/dest/` |
| 端口转发 | `ssh -L 8080:localhost:80 user@host` |
| 代理转发 | `ssh -D 1080 user@host` |
| 查看端口 | `ss -tlnp` |
| 网络监控 | `nload` 或 `iftop` |
| 服务状态 | `systemctl status nginx` |