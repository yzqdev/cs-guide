# Redis 安装与入门

> Redis 是一个开源的内存数据库，常用于缓存、消息队列和会话存储。支持多种数据结构（String、Hash、List、Set、ZSet）。

## 安装 Redis

### 使用 Docker（推荐）

```bash
# 拉取并启动
docker run --name redis \
  -p 6379:6379 \
  -d redis:7-alpine

# 带密码与持久化
docker run --name redis \
  -v redis_data:/data \
  -p 6379:6379 \
  -d redis:7-alpine \
  redis-server --requirepass 123456 --appendonly yes

# 连接容器中的 redis-cli
docker exec -it redis redis-cli
```

### macOS 安装

```bash
# Homebrew
brew install redis

# 启动
brew services start redis

# 验证
redis-cli ping  # PONG
```

### Linux 安装（Ubuntu）

```bash
# 安装
sudo apt update
sudo apt install redis-server -y

# 启动
sudo systemctl start redis
sudo systemctl enable redis

# 配置
sudo vim /etc/redis/redis.conf
# 修改: requirepass 123456
# 修改: bind 0.0.0.0（需要远程访问时）

# 重启
sudo systemctl restart redis
```

### Windows 安装

Redis 官方不支持 Windows，可以使用以下替代方案：

```bash
# 方式一：WSL（推荐）
wsl --install
wsl sudo apt install redis-server

# 方式二：使用 Memurai（兼容 Redis）
# https://www.memurai.com/

# 方式三：tporadowski 的 Windows 移植版
# https://github.com/tporadowski/redis/releases
```

## redis-cli 基本使用

```bash
# 连接
redis-cli
redis-cli -h 127.0.0.1 -p 6379
redis-cli -a 123456  # 带密码（不安全，密码会出现在进程列表）
redis-cli --askpass  # 安全方式（交互式输入密码）

# 认证
AUTH 123456

# 基本的 PING
PING  # → PONG

# 选择数据库（默认 0-15）
SELECT 0

# 查看所有 key（生产环境慎用）
KEYS *
```

## 核心概念

```
Redis 特点
├── 内存存储：读写极快（10万+ QPS）
├── 数据结构丰富：String/Hash/List/Set/ZSet
├── 支持持久化：RDB（快照）/ AOF（日志）
├── 支持过期时间：自动淘汰过期 key
├── 支持发布订阅：消息通知
└── 单线程模型：原子操作，无需锁
```

## 基本操作示例

```bash
# String
SET name "张三"
GET name       # "张三"
DEL name

# 设置过期时间（秒）
SET code "1234" EX 60     # 60 秒后自动删除
TTL code                  # 查看剩余秒数

# 查看 key 类型
TYPE name

# 查看所有 key
KEYS *
# 或使用 SCAN（推荐生产环境）
SCAN 0 MATCH user:* COUNT 100

# 清空所有数据
FLUSHALL  # 清空所有数据库
FLUSHDB   # 清空当前数据库
```

## 配置文件

```conf
# /etc/redis/redis.conf 核心配置

# 绑定地址
bind 127.0.0.1
# bind 0.0.0.0  # 允许远程访问

# 端口
port 6379

# 密码
requirepass 123456

# 持久化（AOF）
appendonly yes
appendfsync everysec

# 最大内存（缓存场景）
maxmemory 1gb
maxmemory-policy allkeys-lru  # 淘汰策略

# 数据库数量
databases 16
```

## 可视化工具

| 工具 | 平台 | 说明 |
|------|------|------|
| **RedisInsight** | 全平台 | 官方出品，推荐 |
| **AnotherRedisDesktopManager** | 全平台 | 免费开源 |
| **Tiny RDM** | 全平台 | 轻量免费 |
| **QuickRedis** | Windows | 免费 |

## 常用命令速查

```bash
# 连接操作
AUTH password
PING
SELECT db_index
QUIT

# 查看信息
INFO                # 服务器信息
INFO memory         # 内存信息
INFO clients        # 客户端信息
INFO stats          # 统计信息

# 监控
MONITOR             # 实时监控所有命令（慎用）
SLOWLOG GET 10      # 查看最近 10 条慢查询
CLIENT LIST         # 查看所有客户端
```

## 练习

```bash
# 1. 使用 Docker 启动 Redis
# 2. 连接 Redis 并设置/获取一个字符串
# 3. 设置一个带过期时间的 key
# 4. 查看当前数据库中所有 key
# 5. 修改 Redis 密码并重启
```
