# Quasar 使用

## 安装

```bash
npm create quasar@latest
# 或使用 CLI
npm install -g @quasar/cli
quasar create my-app
```

## 解决 Create Project 卡死

### 现象

执行 `quasar create app` 卡死在：

```
Quasar downloading quasar starter kit...
```

### 原因

由于 github.com 访问太慢，导致卡死。下载到本地，避免从 GitHub 上拉取。

### 解决

**Windows 上：**

```bash
cd C:\Users\你的用户名\
git clone https://github.com/quasarframework/quasar-starter-kit.git .quasar-starter-kits
```

**Linux 上：**

```bash
cd ~
git clone git@github.com:quasarframework/quasar-starter-kit.git
cd your-project-directory
quasar create <project> --kit ~/quasar-starter-kit
```

## 常用命令

```bash
quasar dev          # 启动开发服务器
quasar build        # 构建生产版本
quasar dev -m cordova  # 构建移动端
quasar dev -m electron # 构建桌面端
```

## 参考

- [Quasar 官方文档](https://quasar.dev/)
- [Quasar 组件](https://quasar.dev/vue-components/)
- [Quasar UMD 使用](https://quasar.dev/start/umd)