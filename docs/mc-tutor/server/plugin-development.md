---
order: 1
---
# Minecraft 服务器插件开发

## 服务器端下载

### PaperMC
- **描述**: 高性能优化的 Spigot 分支
- **下载**: [papermc.io/downloads](https://papermc.io/downloads)

### Spigot
- **描述**: 原版 Bukkit 的高性能分支
- **下载**: [getbukkit.org/download/spigot](https://getbukkit.org/download/spigot)

### 基岩版服务端
- **下载**: [klpbbs.com](https://klpbbs.com/)

### 其他资源
- **Minecraft 版本下载**: [minecraftversion.net](https://minecraftversion.net/)
- **Bukkit 插件库**: [dev.bukkit.org/bukkit-plugins](https://dev.bukkit.org/bukkit-plugins)
- **SpigotMC 资源**: [spigotmc.org/resources](https://www.spigotmc.org/resources/)

## 开发资源

### API 文档
- **Bukkit API**: [bukkit.windit.net/javadoc](https://bukkit.windit.net/javadoc/)

### 教程
- **插件开发教程**: [plgdev.xuogroup.top](https://plgdev.xuogroup.top/#/)

### 社区
- **Bukkit 官网**: [bukkit.org](https://bukkit.org/)
- **SpigotMC 论坛**: [spigotmc.org](https://www.spigotmc.org/)

## 插件管理工具

| 工具名称 | 功能描述 | 链接 |
|---------|---------|------|
| **Yum** | 插件管理工具 | [ci.yumc.pw](https://ci.yumc.pw/job/Minecraft/job/Yum/) |
| **PlugManX** | 热加载插件管理 | [SpigotMC](https://www.spigotmc.org/resources/plugmanx.88135/) |
| **AdvancedNMOTD** | MOTD 美化工具 | [SpigotMC](https://www.spigotmc.org/resources/advancednmotd-let-your-motd-smile.58677/) |

## Maven 配置

### 阿里云镜像配置

Maven 3.8.1+ 阻止了非 HTTPS 地址，需要在 `settings.xml` 中添加镜像配置：

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

## 参考资源

- **Vault GitHub**: [github.com/MilkBowl/Vault](https://github.com/MilkBowl/Vault)
- **ProtocolLib GitHub**: [github.com/dmulloy2/ProtocolLib](https://github.com/dmulloy2/ProtocolLib)
- **EssentialsX 配置参考**: [github.com/EssentialsX/Essentials/blob/2.x/settings.gradle.kts](https://github.com/EssentialsX/Essentials/blob/2.x/settings.gradle.kts)
