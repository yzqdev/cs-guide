---
order: 1
---
# Minecraft 服务器插件开发

> 基于 Paper/Spigot 的 Bukkit 插件开发指南，包含服务端选择、开发环境配置、API 依赖管理等。

---

## 服务器端下载

> 选择正确的服务端核心是搭建服务器的第一步。

### PaperMC（推荐）

- **描述**: 高性能优化的 Spigot 分支，是目前最流行的服务端核心，修复了大量原版漏洞并支持性能优化
- **下载**: [papermc.io/downloads](https://papermc.io/downloads)
- **特点**: 支持 Timings 分析、反漏洞机制、异步区块加载

### Spigot

- **描述**: 原版 Bukkit 的高性能分支，插件兼容性最好
- **下载**: [getbukkit.org/download/spigot](https://getbukkit.org/download/spigot)
- **特点**: 需要自行 Build，但可以自定义配置

### 其他服务端

| 服务端 | 特点 | 适用场景 |
|--------|------|---------|
| **Purpur** | Paper 的增强分支，更多配置选项 | 需要深度定制的服务器 |
| **Airplane** | 优化版 Paper，专注性能 | 大型生电服务器 |
| **Mohist** | 同时支持 Bukkit 插件和 Forge MOD | 需要 MOD + 插件的混合服务器 |
| **Fabric** | 轻量级 MOD 加载器 | MOD 服务器（非 Bukkit 插件） |

### 基岩版服务端

- **下载**: [klpbbs.com](https://klpbbs.com/)
- 官方基岩版服务端可以通过 Minecraft 官网下载

### 其他资源

- **Minecraft 版本下载**: [minecraftversion.net](https://minecraftversion.net/) — 可以下载任何历史版本的客户端和服务端
- **Bukkit 插件库**: [dev.bukkit.org/bukkit-plugins](https://dev.bukkit.org/bukkit-plugins)
- **SpigotMC 资源**: [spigotmc.org/resources](https://www.spigotmc.org/resources/)

---

## 开发资源

### API 文档

- **Bukkit API**: [bukkit.windit.net/javadoc](https://bukkit.windit.net/javadoc/) — Bukkit API 的 JavaDoc
- **Paper API**: [papermc.io/javadocs](https://papermc.io/javadocs/) — Paper 的 API 文档（推荐新项目使用）
- **Spigot API**: [hub.spigotmc.org/javadocs/spigot](https://hub.spigotmc.org/javadocs/spigot/)

### 教程

- **插件开发教程**: [plgdev.xuogroup.top](https://plgdev.xuogroup.top/#/) — 中文插件开发入门教程
- **Spigot 官方教程**: [spigotmc.org/wiki/spigot-plugin-development](https://www.spigotmc.org/wiki/spigot-plugin-development/)

### 社区

- **Bukkit 官网**: [bukkit.org](https://bukkit.org/)
- **SpigotMC 论坛**: [spigotmc.org](https://www.spigotmc.org/)
- **MCBBS 插件版**: [mcbbs.net](https://www.mcbbs.net/) — 国内插件资源

### 开发工具

- **IntelliJ IDEA** — 推荐 IDE，内置 Minecraft 开发插件支持
- **Plugin-Dev-Toolkit** — 热重载插件，加速开发调试
- **WorldEdit** — 测试世界中快速搭建测试环境

---

## 插件管理工具

| 工具名称 | 功能描述 | 链接 |
|---------|---------|------|
| **Yum** | 插件管理工具（远程下载、更新、卸载） | [ci.yumc.pw](https://ci.yumc.pw/job/Minecraft/job/Yum/) |
| **PlugManX** | 热加载插件管理（无需重启服务器即可加载/卸载插件） | [SpigotMC](https://www.spigotmc.org/resources/plugmanx.88135/) |
| **AdvancedNMOTD** | MOTD 美化工具 | [SpigotMC](https://www.spigotmc.org/resources/advancednmotd-let-your-motd-smile.58677/) |

---

## Maven 配置

### 阿里云镜像配置

Maven 3.8.1+ 默认阻止了非 HTTPS 的仓库地址，需要在 `settings.xml` 中添加镜像配置，同时排除特殊仓库：

```xml
<mirror>
    <id>aliyunmaven</id>
    <mirrorOf>*,!papermc-repo,!spigotmc-repo,!placeholderapi,!citizens-repo,!jitpack.io,!dmulloy2-repo</mirrorOf>
    <name>阿里云公共仓库</name>
    <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```

### Spigot API 依赖

在 `pom.xml` 中添加 Spigot 仓库和依赖：

```xml
<repositories>
    <repository>
        <id>spigot-repo</id>
        <url>https://hub.spigotmc.org/nexus/content/groups/public/</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>org.spigotmc</groupId>
        <artifactId>spigot-api</artifactId>
        <version>1.18.1-R0.1-SNAPSHOT</version>
        <scope>provided</scope>
        <exclusions>
            <exclusion>
                <groupId>com.google.code.gson</groupId>
                <artifactId>gson</artifactId>
            </exclusion>
            <exclusion>
                <groupId>com.google.guava</groupId>
                <artifactId>guava</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    
    <dependency>
        <groupId>org.bukkit</groupId>
        <artifactId>bukkit</artifactId>
        <version>1.14.4-R0.1-SNAPSHOT</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

### Vault API 依赖

Vault 是经济/权限系统的标准 API，几乎所有经济插件都需要：

```xml
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>com.github.MilkBowl</groupId>
        <artifactId>VaultAPI</artifactId>
        <version>1.7</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

### ProtocolLib 依赖

ProtocolLib 用于拦截和发送网络数据包，实现自定义网络功能：

```xml
<repositories>
    <repository>
        <id>dmulloy2-repo</id>
        <url>https://repo.dmulloy2.net/repository/public/</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>com.comphenix.protocol</groupId>
        <artifactId>ProtocolLib</artifactId>
        <version>4.8.0</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

### Paper API 依赖（推荐新项目）

Paper 提供了比 Spigot 更丰富的 API，推荐新项目使用：

```xml
<repositories>
    <repository>
        <id>papermc</id>
        <url>https://repo.papermc.io/repository/maven-public/</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>io.papermc.paper</groupId>
        <artifactId>paper-api</artifactId>
        <version>1.20.1-R0.1-SNAPSHOT</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

> 提示：Paper API 包含了 Bukkit 和 Spigot API 的全部内容，依赖这一份即可。

---

## 开发小技巧

### plugin.yml 基础模板

```yaml
name: MyPlugin
version: 1.0.0
main: com.example.MyPlugin
api-version: 1.19
author: YourName
description: A description of your plugin

commands:
  mycommand:
    description: A sample command
    usage: /<command>
    permission: myplugin.use

permissions:
  myplugin.use:
    description: Allows using mycommand
    default: true
```

### 主类基础结构

```java
package com.example;

import org.bukkit.plugin.java.JavaPlugin;

public final class MyPlugin extends JavaPlugin {
    
    @Override
    public void onEnable() {
        getLogger().info("插件已启用！");
        getCommand("mycommand").setExecutor(new MyCommand());
        getServer().getPluginManager().registerEvents(new MyListener(), this);
    }
    
    @Override
    public void onDisable() {
        getLogger().info("插件已禁用！");
    }
}
```

---

## 参考资源

- **Vault GitHub**: [github.com/MilkBowl/Vault](https://github.com/MilkBowl/Vault)
- **ProtocolLib GitHub**: [github.com/dmulloy2/ProtocolLib](https://github.com/dmulloy2/ProtocolLib)
- **EssentialsX 配置参考**: [github.com/EssentialsX/Essentials/blob/2.x/settings.gradle.kts](https://github.com/EssentialsX/Essentials/blob/2.x/settings.gradle.kts)
- **Paper 官方文档**: [docs.papermc.io](https://docs.papermc.io/)
- **Spigot 插件开发 Wiki**: [spigotmc.org/wiki/spigot-plugin-development](https://www.spigotmc.org/wiki/spigot-plugin-development/)
