# 电脑硬件知识

## 一、存储设备

### 1. SSD 类型对比

| 类型 | 接口 | 协议 | 速度 | 价格 |
|------|------|------|------|------|
| SATA SSD | SATA | AHCI | ~550 MB/s | 低 |
| M.2 SATA | M.2 | AHCI | ~550 MB/s | 中 |
| M.2 NVMe | M.2 | NVMe | ~3500 MB/s+ | 高 |
| PCIe NVMe | PCIe | NVMe | ~7000 MB/s+ | 很高 |

### 2. M.2 NVMe 与 M.2 SATA 的区别

**M.2** 是接口类型，**NVMe** 是协议，两者最大区别在于：

| 对比项 | M.2 NVMe | M.2 SATA |
|--------|----------|----------|
| 协议 | NVMe 协议 | AHCI 协议 |
| 通道 | PCIe 通道 | SATA 通道 |
| 速度 | 极快（3500 MB/s+）| 较慢（~550 MB/s）|
| 接口针脚 | 一个凹口，两段金手指 | 两个凹口，三段金手指 |
| 主板要求 | 需主板支持 PCIe | 通用 |

**购买建议**：
- 先查清楚主板是否有对应的 M.2 接口（支持什么协议）
- 两种协议不兼容，不能混插
- 预算允许优先选 NVMe

### 3. 固态硬盘组成

**主控芯片** — 固态硬盘的大脑：
- 主要品牌：SandForce、Indilinx、Marvell、Phison、Samsung、Intel
- 作用：数据调配、数据中转、连接闪存和 SATA 接口
- 不同主控性能差距可达数十倍

**闪存颗粒**：
- SLC：1bit/单元，速度快寿命长，价格高
- MLC：2bit/单元，均衡
- TLC：3bit/单元，常见，性价比高
- QLC：4bit/单元，容量大寿命短

### 4. NVMe 优势

1. **性能提升数倍**：相比 SATA SSD 速度提升 5-10 倍
2. **低延迟**：大幅降低访问延迟
3. **高队列深度**：队列深度从 32 提升到 64000，IOPS 大幅提升
4. **低功耗**：自动功耗状态切换和动态能耗管理
5. **统一驱动**：解决了不同 PCIe SSD 之间的驱动兼容性问题

---

## 二、CPU 处理器

### 1. 主流品牌

| 品牌 | 系列 | 特点 |
|------|------|------|
| Intel | Core i3/i5/i7/i9 | 单核性能强，兼容性好 |
| Intel | Xeon | 服务器级，多核多线程 |
| AMD | Ryzen 3/5/7/9 | 性价比高，多核性能强 |
| AMD | EPYC | 服务器级，核心数极多 |

### 2. 关键参数

| 参数 | 说明 | 对性能的影响 |
|------|------|-------------|
| 核心数 | 物理核心数量 | 多任务处理能力 |
| 线程数 | 可同时处理的线程数 | 多线程性能 |
| 主频 | 核心运行频率 (GHz) | 单核性能 |
| 睿频 | 自动超频的最高频率 | 峰值性能 |
| 缓存 | L1/L2/L3 高速缓存 | 数据访问速度 |
| TDP | 热设计功耗 (W) | 散热和功耗需求 |

### 3. 查看 CPU 信息

```bash
# Linux 下查看 CPU 信息
lscpu                              # 完整 CPU 信息
cat /proc/cpuinfo                  # CPU 详细信息
nproc                              # 核心数
lscpu | grep 'Model name'          # 型号
```

---

## 三、内存

### 内存类型

| 类型 | 说明 | 常见频率 |
|------|------|----------|
| DDR3 | 较老，已逐步淘汰 | 1333-2133 MHz |
| DDR4 | 当前主流 | 2133-3200 MHz |
| DDR5 | 新一代 | 4800-6400 MHz+ |

### 关键参数

| 参数 | 说明 |
|------|------|
| 容量 | 内存大小 (GB)，越大越好 |
| 频率 | 运行速度 (MHz)，越高越快 |
| 时序 | CL 值，越低延迟越低 |
| 通道 | 双通道内存带宽翻倍 |

### 查看内存信息

```bash
# Linux 下查看内存信息
free -h                            # 内存使用情况
cat /proc/meminfo                  # 详细内存信息
dmidecode -t memory                # 内存硬件信息
sudo lshw -class memory            # 完整内存信息
```

---

## 四、显卡

### 类型

| 类型 | 说明 | 适合场景 |
|------|------|----------|
| 集成显卡 | 集成在 CPU 中 | 办公、影音 |
| 独立显卡 | 独立 GPU 芯片 | 游戏、设计、AI |
| 专业显卡 | 如 NVIDIA Quadro | 专业设计、渲染 |

### 查看显卡信息

```bash
# Linux 下查看显卡信息
lspci | grep -i vga               # 查看显卡型号
lspci -v | grep -i vga            # 详细显卡信息
nvidia-smi                         # NVIDIA 显卡状态（N 卡）
glxinfo | grep "OpenGL renderer"  # OpenGL 信息
```

---

## 五、选购建议

### 办公电脑
- CPU：Intel i5 / AMD Ryzen 5
- 内存：8-16GB DDR4
- 硬盘：256-512GB NVMe SSD
- 显卡：集成显卡即可

### 开发/设计电脑
- CPU：Intel i7 / AMD Ryzen 7
- 内存：16-32GB DDR4/DDR5
- 硬盘：512GB-1TB NVMe SSD
- 显卡：中端独立显卡

### 游戏/渲染电脑
- CPU：Intel i9 / AMD Ryzen 9
- 内存：32-64GB DDR5
- 硬盘：1TB+ NVMe SSD
- 显卡：高端独立显卡 (RTX 4070+)

### 服务器
- CPU：Xeon / EPYC
- 内存：64GB+ ECC 内存
- 硬盘：企业级 SSD + HDD
- 重点：稳定性和可靠性

---

## 六、查看硬件信息的命令汇总

```bash
# 系统信息
uname -a                           # 系统信息
hostnamectl                        # 主机信息

# CPU
lscpu                              # CPU 详情
cat /proc/cpuinfo                  # CPU 信息
nproc                              # 核心数

# 内存
free -h                            # 内存使用
cat /proc/meminfo                  # 内存详情

# 磁盘
lsblk                              # 块设备列表
fdisk -l                           # 分区表
df -h                              # 磁盘使用

# 显卡
lspci | grep -i vga               # 显卡型号
nvidia-smi                         # N 卡详情

# 其他
lspci                              # 所有 PCI 设备
lsusb                              # USB 设备
lshw                               # 完整硬件信息
dmidecode                          # BIOS/硬件信息
```