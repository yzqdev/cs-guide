# Linux 死机处理方案

> Linux 图形界面死机很常见，死机后鼠标键盘完全失效。主要原因通常是系统负载过高，此时各种操作全卡，强制关机不利于硬盘等硬件，有时还会导致无法启动。

## 一、切换 TTY

```bash
# 按 Ctrl+Alt+F2 ~ F6（F1 通常是图形界面）
# 稍等片刻即可进入 TTY 终端

# 登录后使用 top 查找高负载进程
top

# 找到高负载进程后，按 k 输入 PID 杀死它
kill -9 PID
```

## 二、REISUB — 安全重启

REISUB 是 Linux 内核自带的安全重启方法，可以在各种情况下安全地重启计算机。

### 操作步骤

按住 `Ctrl+Alt+PrtSc（SysRq）`，然后依次按下以下字母键（不要松开 Ctrl+Alt）：

| 按键 | 含义 | 作用 |
|------|------|------|
| **R** | unRaw | 从 X Server 抢回键盘控制 |
| **E** | tErminate | 给所有进程发送 SIGTERM，让它们自行善后 |
| **I** | kIll | 给所有进程发送 SIGKILL，强制关闭 |
| **S** | Sync | 将所有数据同步至磁盘 |
| **U** | Unmount | 将所有分区挂载为只读模式 |
| **B** | reBoot | 重启系统 |

> **记忆方法**：可用 "busier"（busy 的比较级）来辅助记忆，或 "Raising Elephant Is So Utterly Boring"。

### 检查是否启用

```bash
# 查看 sysrq 是否启用（1 为启用）
cat /proc/sys/kernel/sysrq
```

### 启用 REISUB（如未启用）

**临时启用**：

```bash
sudo sysctl -w kernel.sysrq=1
```

**永久启用**：

```bash
# 创建配置文件
echo "kernel.sysrq=1" | sudo tee /etc/sysctl.d/99-sysctl.conf
```

## 三、预防措施

1. **监控系统负载**：定期使用 `top`、`htop` 查看系统状态
2. **限制进程资源**：使用 `ulimit` 限制单个进程的资源使用
3. **设置进程优先级**：使用 `nice`、`renice` 调整进程优先级
4. **定期清理**：及时清理日志和临时文件，避免磁盘写满