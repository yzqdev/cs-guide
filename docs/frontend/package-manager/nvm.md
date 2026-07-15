# Node.js 版本管理

## nvm

nvm（Node Version Manager）用于安装和切换不同版本的 Node.js。

:::tip
推荐使用 [fnm](https://github.com/Schniz/fnm)，基于 Rust 编写，速度更快。
:::

### Linux 安装

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

参考: [nvm GitHub](https://github.com/nvm-sh/nvm)

### Windows 安装

下载地址: [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases)

### 镜像配置

```bash
# 设置淘宝镜像（Windows）
nvm npm_mirror https://npmmirror.com/mirrors/npm/
nvm node_mirror https://npmmirror.com/mirrors/node/
```

### 常用命令

```bash
# 安装最新版 Node.js
nvm install node

# 使用指定版本
nvm use 16.2.0

# 查看已安装版本
nvm ls

# 卸载指定版本
nvm uninstall 16.2.0
```

## fnm

[fnm](https://github.com/Schniz/fnm) 是基于 Rust 的跨平台 Node.js 版本管理器，速度比 nvm 快很多。

```bash
# 安装
curl -fsSL https://fnm.vercel.app/install | bash

# 安装 Node.js
fnm install 18

# 使用指定版本
fnm use 18
```

## nrm

nrm 用于快速切换 npm 镜像源：

```bash
# 安装
npm install -g nrm

# 查看可用源
nrm ls

# 切换源
nrm use taobao
```

可用源：

| 源 | 地址 |
|-----|------|
| npm | `https://registry.npmjs.org/` |
| taobao | `https://registry.npmmirror.com/` |
| tencent | `https://mirrors.cloud.tencent.com/npm/` |
