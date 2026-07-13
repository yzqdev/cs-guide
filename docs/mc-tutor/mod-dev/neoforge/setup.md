# NeoForge MOD 开发入门

NeoForge 是 Minecraft Forge 的一个分支，为 1.20.1+ 版本提供 MOD 开发框架。

## 环境搭建

### 前置要求

```text
1. JDK 17+（推荐 JDK 21）
2. IntelliJ IDEA（推荐）或 Eclipse
3. Git
```

### 创建项目

从官方 MDK 开始：

```bash
# 1. 从 NeoForge 官网下载 MDK（或 clone 模板）
git clone https://github.com/neoforged/MDK.git mymod
cd mymod

# 2. 修改设置
修改 gradle.properties 中的版本号
修改 mods.toml 中的 MOD ID

# 3. 运行设置
./gradlew genIntellijRuns   # IDEA
./gradlew genEclipseRuns    # Eclipse

# 4. 运行客户端
./gradlew runClient
```

### 项目结构

```
mymod/
├── src/
│   ├── main/
│   │   ├── java/com/example/mymod/
│   │   │   ├── MyMod.java          # 主类
│   │   │   ├── ModItems.java       # 物品注册
│   │   │   ├── ModBlocks.java      # 方块注册
│   │   │   ├── ModTab.java         # 创造模式标签页
│   │   │   └── event/
│   │   │       └── ModEvents.java  # 事件处理
│   │   └── resources/
│   │       ├── META-INF/
│   │       │   └── mods.toml       # MOD 元数据
│   │       ├── assets/mymod/
│   │       │   ├── blockstates/    # 方块状态文件
│   │       │   ├── lang/           # 语言文件
│   │       │   ├── models/         # 模型文件
│   │       │   └── textures/       # 贴图文件
│   │       └── data/mymod/
│   │           ├── recipes/        # 合成配方
│   │           └── loot_tables/    # 战利品表
│   └── test/java/                  # 测试
├── build.gradle
└── gradle.properties
```

### 主类（MyMod.java）

```java
package com.example.mymod;

import net.neoforged.bus.api.IEventBus;
import net.neoforged.fml.common.Mod;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Mod(MyMod.MODID)
public class MyMod {
    public static final String MODID = "mymod";
    public static final Logger LOGGER = LoggerFactory.getLogger(MyMod.class);

    public MyMod(IEventBus modEventBus) {
        // 注册 deferred registers
        ModItems.ITEMS.register(modEventBus);
        ModBlocks.BLOCKS.register(modEventBus);
        ModTabs.CREATIVE_TABS.register(modEventBus);

        // 注册事件监听
        modEventBus.addListener(this::commonSetup);
    }

    private void commonSetup(final FMLCommonSetupEvent event) {
        LOGGER.info("{} 加载完成!", MODID);
    }
}
```

### mods.toml

```toml
modLoader="javafml"
loaderVersion="[4,)"
license="MIT"

[[mods]]
modId="mymod"
version="1.0.0"
displayName="My Mod"
logoFile="logo.png"
credits=""
authors="YourName"
description='''
这是一个示例 MOD
'''

[[dependencies.mymod]]
    modId="neoforge"
    mandatory=true
    versionRange="[21,)"
    ordering="NONE"
    side="BOTH"
```

### build.gradle

```groovy
plugins {
    id 'java-library'
    id 'eclipse'
    id 'idea'
    id 'net.neoforged.gradle.userdev' version '7.0.80'
}

base {
    archivesName = "mymod"
}

java.toolchain.languageVersion = JavaLanguageVersion.of(21)

repositories {
    mavenCentral()
}

dependencies {
    implementation "net.neoforged:neoforge:${neo_version}"
}

tasks.named('jar', Jar).configure {
    manifest {
        attributes(
            "Specification-Title": "mymod",
            "Specification-Vendor": "example",
            "Specification-Version": "1",
            "Implementation-Title": project.name,
            "Implementation-Version": project.jar.archiveVersion,
            "Implementation-Vendor": "example"
        )
    }
}
```

## 注册机制

NeoForge 使用 DeferredRegister 进行注册：

```java
// 创建注册器
public static final DeferredRegister.Items ITEMS =
    DeferredRegister.createItems(MyMod.MODID);

public static final DeferredRegister.Blocks BLOCKS =
    DeferredRegister.createBlocks(MyMod.MODID);

// 必须在主类构造器中注册到总线
ModItems.ITEMS.register(modEventBus);
```

## 运行测试

```bash
./gradlew runClient       # 运行客户端
./gradlew runServer       # 运行服务器
./gradlew runData         # 运行数据生成
./gradlew build           # 构建 JAR
```

## 调试技巧

```text
1. 在 IDEA 中创建运行配置
   - 主类：cpw.mods.modlauncher.Launcher
   - 参数：--launchTarget forgeclient --version MOD_DEV

2. 热重载（开发时不需要重启客户端）
   - 安装 HotSwapAgent 插件
   - 使用 JRebel
```

---

## Mixin 配置

NeoForge 同样使用 [SpongePowered Mixin](https://github.com/SpongePowered/Mixin) 进行字节码修改，API 与 Fabric 完全一致。详细用法见 [Mixin 完全指南](../mixin)。

### Mixin 配置文件

```json
// src/main/resources/mymod.mixins.json
{
    "required": true,
    "minVersion": "0.8.5",
    "package": "com.example.mymod.mixin",
    "compatibilityLevel": "JAVA_21",
    "refmap": "mymod.refmap.json",
    "mixins": [
        "ExampleMixin"
    ],
    "client": [
        "ClientExampleMixin"
    ],
    "injectors": {
        "defaultRequire": 1
    }
}
```

| 字段 | 说明 |
|------|------|
| `package` | Mixin 类所在的包路径 |
| `mixins` | 通用 Mixin（服务端+客户端） |
| `client` | 仅客户端加载的 Mixin |
| `server` | 仅服务端加载的 Mixin |
| `refmap` | 方法映射文件（NeoForge 必需，Fabric Loom 自动生成） |
| `defaultRequire` | 找不到目标时：1=报错，0=忽略 |

### 注册方式

NeoForge 不会自动扫描 Mixin 配置文件，需要在 `mods.toml` 或 `@Mod` 中注册：

```toml
# META-INF/neoforge.mods.toml — 添加 mixinConfigs
[[mods]]
    modId="mymod"
    # ...
    [[mods.mixinConfigs]]
    config="mymod.mixins.json"
```

或者在 `@Mod` 注解中声明：

```java
@Mod(value = MyMod.MODID, mixinConfigs = "mymod.mixins.json")
public class MyMod {
    // ...
}
```

> **提示**: NeoForge 1.20.1+ 部分版本支持自动扫描，但手动声明更可靠。
