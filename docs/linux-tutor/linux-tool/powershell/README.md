# PowerShell 脚本合集
# 对应 Linux 版 scripts 的 Windows/PowerShell 实现

---

## 📋 对应关系

| PowerShell 脚本 | 对应 Shell 脚本 | 功能 |
|----------------|----------------|------|
| [restart-redis.ps1](./restart-redis.ps1) | crontab-redis-restart.sh | Redis 服务重启 |
| [cron-test.ps1](./cron-test.ps1) | crontab-test.sh | 定时任务测试 |
| [install-common-tools.ps1](./install-common-tools.ps1) | install_common_tool_ubuntu.sh | 常用工具安装 |
| [install-vim.ps1](./install-vim.ps1) | install_common_vim.sh | Vim 配置 |
| [install-docker.ps1](./install-docker.ps1) | install_docker_centos7.sh | Docker 安装 |
| [install-docker-k8s.ps1](./install-docker-k8s.ps1) | install_docker_k8s_disable_firewalld_centos7-aliyun.sh | Docker + K8s 安装 |
| [install-jdk.ps1](./install-jdk.ps1) | install_jdk_online.sh | JDK 在线安装 |
| [install-jdk-offline.ps1](./install-jdk-offline.ps1) | install_jdk_offline_to_bash.sh | JDK 离线安装 |
| [install-maven.ps1](./install-maven.ps1) | install_maven_offline_to_bash.sh | Maven 安装 |
| [install-mycat.ps1](./install-mycat.ps1) | install_mycat_offline.sh | Mycat 安装 |
| [mysql-backup.ps1](./mysql-backup.ps1) | mysql_backup.sh | MySQL 备份 |
| [for-loop.ps1](./for-loop.ps1) | shell-for.sh | For 循环演示 |
| [service-manager.ps1](./service-manager.ps1) | shell-with-param-demo.sh | 服务管理脚本 |

---

> 💡 **使用说明**：PowerShell 脚本需在 Windows 上以管理员身份运行。
> 执行策略：`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`