# 08 — 远程开发

> Remote Development 是 VS Code 的杀手级特性。通过远程开发，你可以在本地编辑器中操作远程环境（服务器、WSL、Docker 容器）中的代码，就像在本地一样。

---

## 8.1 三种远程方案

| 方案               | 扩展                                 | 适用场景                              |
| ------------------ | ------------------------------------ | ------------------------------------- |
| **Remote-SSH**     | `ms-vscode-remote.remote-ssh`        | 连接远程 Linux 服务器、虚拟机         |
| **Remote-WSL**     | `ms-vscode-remote.remote-wsl`        | 在 Windows Subsystem for Linux 中开发 |
| **Dev Containers** | `ms-vscode-remote.remote-containers` | 在 Docker 容器中开发，环境一致        |

> **前置条件**：安装 [Remote Development 扩展包](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)，它包含以上三个扩展。

---

## 8.2 Remote-SSH

### 基本用法

1. 安装 Remote-SSH 扩展
2. 点击左下角 `><` 图标 → `Connect to Host...`
3. 输入 `ssh user@your-server.com`
4. 输入密码或使用密钥认证
5. 连接成功后，在远程服务器上打开文件夹

### SSH 配置管理

编辑 `~/.ssh/config` 配置常用服务器：

```text
# ~/.ssh/config

Host dev-server
    HostName 192.168.1.100
    User root
    Port 22
    IdentityFile ~/.ssh/id_rsa
    ForwardAgent yes

Host prod-server
    HostName prod.example.com
    User deploy
    Port 2222
    IdentityFile ~/.ssh/deploy_key
```

配置后，在 VS Code 中连接时直接选择 `dev-server` 或 `prod-server`。

### 端口转发

远程服务器上的服务（如 `localhost:3000`）可以通过端口转发映射到本地：

1. 连接远程后，点击左下角 Ports 面板
2. 点击 `Forward a Port`
3. 输入远程端口号（如 `3000`）
4. 本地打开 `http://localhost:3000` 即可访问

或在 `devcontainer.json` 中配置：

```jsonc
{
  "forwardPorts": [3000, 5173, 9229],
}
```

### 远程终端配置

```jsonc
// settings.json（远程连接后，在远程服务器上设置）
{
  "remote.SSH.showLoginTerminal": true,
  "remote.SSH.defaultExtensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"],
}
```

---

## 8.3 Remote-WSL

### 前置条件

- Windows 10 2004+ 或 Windows 11
- 安装 WSL 和 Linux 发行版（如 Ubuntu）

```bash
# 在 PowerShell（管理员）中
wsl --install
wsl --set-default-version 2

# 安装 Ubuntu
wsl --install -d Ubuntu-22.04
```

### 在 WSL 中开发

1. 打开 VS Code
2. 点击左下角 `><` 图标 → `Connect to WSL`
3. 或直接在 WSL 终端中运行 `code .`

```bash
# 在 WSL 终端中
cd /home/user/project
code .
```

### WSL 配置

```jsonc
// settings.json（WSL 远程连接后）
{
  "wsl.environment": {
    "PATH": "/usr/local/bin:/usr/bin:/bin",
  },
  "wsl.distribution": "Ubuntu-22.04",
  "terminal.integrated.defaultProfile.linux": "zsh",
}
```

---

## 8.4 Dev Containers

Dev Containers 是本教程最推荐的远程方案——**团队一致的开发环境，告别"我机器上能跑"**。

### 快速开始

1. 安装 Dev Containers 扩展
2. 打开项目文件夹
3. 点击左下角 `><` → `Reopen in Container`
4. VS Code 会检测 `.devcontainer/devcontainer.json` 并构建容器

### .devcontainer.json 完全配置

```jsonc
{
  "name": "Node.js 20 Development",
  // 方式一：使用预构建镜像
  "image": "mcr.microsoft.com/devcontainers/typescript-node:20",

  // 方式二：使用 Dockerfile 自定义
  // "build": {
  //   "dockerfile": "Dockerfile",
  //   "args": {
  //     "VARIANT": "20-bookworm"
  //   }
  // },

  // 方式三：使用 Docker Compose
  // "dockerComposeFile": "docker-compose.yml",
  // "service": "app",
  // "workspaceFolder": "/workspace",

  // 端口转发
  "forwardPorts": [3000, 5173],

  // 容器启动后执行的命令
  "postCreateCommand": "npm install",
  "postStartCommand": "npm run dev",

  // 容器内 VS Code 的扩展和设置
  "customizations": {
    "vscode": {
      "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode", "bradlc.vscode-tailwindcss"],
      "settings": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
      },
    },
  },

  // 远程用户
  "remoteUser": "node",

  // 挂载额外的卷
  "mounts": ["source=${env:HOME}/.ssh,target=/home/node/.ssh,type=bind,consistency=cached"],

  // 容器特性（Features）
  "features": {
    "ghcr.io/devcontainers/features/git:1": {},
    "ghcr.io/devcontainers/features/docker-outside-of-docker:1": {},
    "ghcr.io/devcontainers/features/python:1": {
      "version": "3.11",
    },
  },
}
```

### 使用 Dockerfile 自定义

```dockerfile
# .devcontainer/Dockerfile
FROM mcr.microsoft.com/devcontainers/typescript-node:20

# 安装额外工具
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    redis-server \
    postgresql-client \
    && apt-get clean

# 全局安装工具
RUN npm install -g pnpm @nestjs/cli
```

### Dev Container 特性（Features）

Features 是 Dev Containers 的"即插即用"功能包，可以快速添加工具：

| Feature                                                   | 用途              |
| --------------------------------------------------------- | ----------------- |
| `ghcr.io/devcontainers/features/docker-outside-of-docker` | 容器内使用 Docker |
| `ghcr.io/devcontainers/features/python`                   | 安装 Python       |
| `ghcr.io/devcontainers/features/java`                     | 安装 Java         |
| `ghcr.io/devcontainers/features/sshd`                     | 开启 SSH 服务器   |
| `ghcr.io/devcontainers/features/terraform`                | 安装 Terraform    |

### 实战：Java 项目

```jsonc
{
  "name": "Java 17 Development",
  "image": "mcr.microsoft.com/devcontainers/java:17",
  "features": {
    "ghcr.io/devcontainers/features/java:1": {
      "version": "17",
      "installMaven": true,
      "installGradle": true,
    },
  },
  "customizations": {
    "vscode": {
      "extensions": ["vscjava.vscode-java-pack", "vscjava.vscode-spring-initializr"],
    },
  },
  "forwardPorts": [8080],
  "postCreateCommand": "mvn install -DskipTests",
}
```

---

## 8.5 远程开发最佳实践

### ① 环境变量管理

```jsonc
{
  "remoteEnv": {
    "DATABASE_URL": "postgres://user:pass@localhost:5432/db",
    "REDIS_URL": "redis://localhost:6379",
  },
}
```

### ② 性能优化

```jsonc
{
  // 远程连接时禁用不必要的扩展
  "remote.extensionKind": {
    "ms-azuretools.vscode-docker": ["workspace"],
    "GitHub.copilot": ["ui"],
  },
  // 文件监视优化
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.git/objects/**": true,
  },
  "search.followSymlinks": false,
}
```

### ③ 安全建议

- 使用 SSH 密钥而非密码认证
- 不要在远程配置中硬编码密钥
- 使用 `.env` 文件加载敏感信息
- 容器中不要以 root 运行

---

## 下一步

进入 [09 — 工作区、Profile 与同步](./09-workspace-profile-sync.md) 学习如何管理多项目工作区和配置同步。
