# 常见 Linux 发行版

> 均可在清华镜像源下载：[https://mirrors.tuna.tsinghua.edu.cn](https://mirrors.tuna.tsinghua.edu.cn/)

## 初学者入门推荐

### Linux Mint

- **官网**：[https://linuxmint.com/](https://linuxmint.com/)
- **特点**：基于 Ubuntu，界面美观，对初学者最友好，Cinnamon 桌面
- **适合**：从 Windows 转过来的初学者、日常办公
- **包管理**：`apt`

### Zorin OS

- **官网**：[https://zorin.com/os/](https://zorin.com/os/)
- **特点**：界面模仿 Windows，降低切换成本，付费版有更多布局
- **适合**：希望界面像 Windows 的新用户
- **包管理**：`apt`

### Deepin（深度）

- **官网**：[https://www.deepin.org/](https://www.deepin.org/)
- **特点**：中国团队开发，界面精美，内置大量国产软件
- **适合**：中文用户、追求美观的桌面体验
- **包管理**：`apt`

---

## 进阶用户

### Manjaro KDE

- **官网**：[https://manjaro.org/](https://manjaro.org/)
- **特点**：基于 Arch Linux，滚动更新，KDE 桌面
- **适合**：想体验 Arch 但不想折腾的初学者
- **包管理**：`pacman`

### Kubuntu

- **官网**：[https://kubuntu.org/](https://kubuntu.org/)
- **特点**：Ubuntu + KDE Plasma 桌面，美观且功能强大
- **适合**：喜欢 KDE 桌面的用户
- **包管理**：`apt`

---

## 安全/渗透测试

### Kali Linux

- **官网**：[https://www.kali.org/](https://www.kali.org/)
- **特点**：预装大量安全测试工具，基于 Debian
- **适合**：网络安全从业者、渗透测试人员
- **包管理**：`apt`

### Parrot OS

- **官网**：[https://www.parrotsec.org/](https://www.parrotsec.org/)
- **特点**：兼顾安全测试和日常使用，比 Kali 更轻量
- **适合**：安全研究人员、开发者
- **包管理**：`apt`

### BackBox

- **官网**：[https://www.backbox.org/](https://www.backbox.org/)
- **特点**：基于 Ubuntu 的渗透测试发行版
- **适合**：安全测试人员
- **包管理**：`apt`

---

## 高级用户

### Arch Linux

- **官网**：[https://archlinux.org/](https://archlinux.org/)
- **特点**：滚动更新，完全自定义，安装过程复杂
- **适合**：有经验的高级用户、想深入了解 Linux 的人
- **包管理**：`pacman`

### Gentoo

- **官网**：[https://www.gentoo.org/](https://www.gentoo.org/)
- **特点**：源码编译安装，极致自定义和性能优化
- **适合**：追求极致性能、愿意花时间折腾的高级用户
- **包管理**：`portage`

### FreeBSD

- **官网**：[https://www.freebsd.org/](https://www.freebsd.org/)
- **特点**：不是 Linux，但类 Unix，以稳定和安全著称
- **适合**：服务器、网络设备
- **包管理**：`pkg`

---

## 其他

### Solus

- **官网**：[https://getsol.us/](https://getsol.us/)
- **特点**：独立发行版，Budgie 桌面，滚动更新
- **适合**：追求简洁现代桌面的用户
- **包管理**：`eopkg`

---

## 发行版对比

| 发行版 | 难度 | 桌面 | 更新模式 | 包管理 | 适合场景 |
|--------|------|------|----------|--------|----------|
| Linux Mint | ⭐ | Cinnamon | 稳定版 | apt | 初学者/办公 |
| Zorin OS | ⭐ | GNOME | 稳定版 | apt | Windows 转 Linux |
| Deepin | ⭐⭐ | DDE | 稳定版 | apt | 中文用户 |
| Ubuntu | ⭐⭐ | GNOME | 稳定版 | apt | 通用/服务器 |
| Manjaro | ⭐⭐⭐ | KDE/XFCE | 滚动更新 | pacman | 想体验 Arch |
| Kali | ⭐⭐⭐ | XFCE | 稳定版 | apt | 安全测试 |
| Arch | ⭐⭐⭐⭐⭐ | 自定义 | 滚动更新 | pacman | 高级用户 |
| Gentoo | ⭐⭐⭐⭐⭐ | 自定义 | 源码编译 | portage | 极限定制 |

## 选择建议

- **第一次用 Linux** → Linux Mint 或 Zorin OS
- **想用中文系统** → Deepin
- **想做开发** → Ubuntu 或 Manjaro
- **想做安全测试** → Kali Linux
- **想深入学习 Linux** → Arch Linux
- **想要极致稳定服务器** → Debian 或 FreeBSD