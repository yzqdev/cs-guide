# PM2 使用教程

PM2 是 Node.js 进程管理工具，支持性能监控、自动重启、负载均衡等功能。

[官方文档](https://pm2.keymetrics.io/docs/usage/quick-start/)

## 安装

```bash
npm install -g pm2
```

## 快速使用

```bash
# 启动应用
pm2 start app.js

# 保存当前进程列表
pm2 save
```

## 常用命令

### 进程管理

| 命令 | 说明 |
|------|------|
| `pm2 start app.js` | 启动应用 |
| `pm2 restart app.js` | 重启应用 |
| `pm2 stop app.js` | 停止应用 |
| `pm2 delete app.js` | 删除应用 |
| `pm2 list` / `pm2 ls` | 查看进程列表 |
| `pm2 describe 0` | 查看进程详情 |
| `pm2 logs` | 查看实时日志 |
| `pm2 monit` | 监控进程资源 |

### 启动参数

| 参数 | 说明 |
|------|------|
| `--watch` | 监听目录变化自动重启 |
| `-i <n>` | 启动 n 个实例（负载均衡），`-i max` 根据 CPU 核数 |
| `--ignore-watch` | 排除监听的目录/文件 |
| `-n <name>` | 指定应用名称 |
| `-o <path>` | 标准输出日志路径 |
| `-e <path>` | 错误输出日志路径 |

### 执行 package.json 脚本

```bash
pm2 start "npm run dev" --name my-app
pm2 start npm -- run dev
```

### 负载均衡

```bash
# 开启 3 个进程
pm2 start app.js -i 3

# 根据 CPU 核数自动开启
pm2 start app.js -i max
```

### 开机自启动

```bash
# 1. 保存当前进程状态
pm2 save

# 2. 生成自启动命令（查看控制台输出并执行）
pm2 startup [platform]
```

## 配置文件部署

### 生成配置文件

```bash
pm2 init simple
# 或
pm2 ecosystem
```

### ecosystem.config.js 示例

```js
module.exports = {
  apps: [{
    name: 'my-app',
    script: './app.js',
    watch: '.',
    error_file: "./log/err.log",
    out_file: "./log/out.log",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }]
};
```

```bash
# 使用配置文件启动
pm2 start ecosystem.config.js

# 指定环境
pm2 start ecosystem.config.js --env production
```

### deploy.yaml 远程部署

```yaml
apps:
  - script: ./start.js
    name: 'app'
    env:
      NODE_ENV: production

deploy:
  production:
    user: root
    host: 192.168.1.100
    port: 22
    ref: origin/main
    repo: https://github.com/user/repo.git
    path: /home/app
    pre-deploy: git fetch --all
    post-deploy: npm install && pm2 reload deploy.yaml --env production
```

```bash
# 首次部署
pm2 deploy deploy.yaml production setup

# 更新部署
pm2 deploy deploy.yaml production update
```

## 配置项说明

| 字段 | 说明 |
|------|------|
| `name` | 应用名称 |
| `script` | 启动脚本路径 |
| `args` | 脚本参数 |
| `cwd` | 应用目录 |
| `instances` | 实例数 |
| `exec_mode` | 启动模式（`fork` / `cluster`） |
| `autorestart` | 崩溃自动重启 |
| `watch` | 监听文件变化 |
| `max_restarts` | 最大重启次数 |
| `min_uptime` | 最小运行时间（毫秒） |
| `cron_restart` | 定时重启 |
| `error_file` | 错误日志路径 |
| `out_file` | 输出日志路径 |
