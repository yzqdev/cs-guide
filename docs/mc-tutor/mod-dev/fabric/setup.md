# Fabric MOD 开发入门

Fabric 是轻量级 Minecraft MOD 加载器，支持 1.14+ 版本，以快速更新和模块化设计著称。

## 环境搭建

### 前置要求

```text
1. JDK 17+（推荐 JDK 21）
2. IntelliJ IDEA（推荐）
3. Git
```

### 创建项目

```bash
# 1. 使用 Fabric 官方模板
git clone https://github.com/FabricMC/fabric-example-mod.git mymod
cd mymod

# 2. 修改设置
修改 gradle.properties 中的版本号
修改 fabric.mod.json 中的 MOD ID

# 3. 生成 IDEA 配置
./gradlew idea

# 4. 运行客户端
./gradlew runClient

# 5. 构建
./gradlew build
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
│   │   │   └── ModItemGroups.java  # 物品组
│   │   └── resources/
│   │       ├── fabric.mod.json     # MOD 元数据
│   │       ├── assets/mymod/
│   │       │   ├── blockstates/    # 方块状态
│   │       │   ├── lang/           # 语言文件
│   │       │   ├── models/         # 模型
│   │       │   └── textures/       # 贴图
│   │       └── data/mymod/
│   │           ├── recipes/        # 配方
│   │           └── loot_tables/    # 战利品表
│   └── client/
│       └── resources/              # 客户端资源
├── build.gradle
└── settings.gradle
```

### 主类

```java
// MyMod.java
package com.example.mymod;

import net.fabricmc.api.ModInitializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyMod implements ModInitializer {
    public static final String MOD_ID = "mymod";
    public static final Logger LOGGER = LoggerFactory.getLogger(MOD_ID);

    @Override
    public void onInitialize() {
        // 注册物品
        ModItems.register();
        // 注册方块
        ModBlocks.register();
        // 注册物品组
        ModItemGroups.register();
        // 注册事件
        ModEvents.register();

        LOGGER.info("{} 加载完成!", MOD_ID);
    }
}
```

### 客户端入口

```java
// MyModClient.java
package com.example.mymod.client;

import net.fabricmc.api.ClientModInitializer;
import net.fabricmc.api.EnvType;
import net.fabricmc.api.Environment;

@Environment(EnvType.CLIENT)
public class MyModClient implements ClientModInitializer {
    @Override
    public void onInitializeClient() {
        // 客户端初始化（渲染、按键等）
    }
}
```

### fabric.mod.json

```json
{
    "schemaVersion": 1,
    "id": "mymod",
    "version": "1.0.0",
    "name": "My Mod",
    "description": "这是一个示例 MOD",
    "authors": ["YourName"],
    "contact": {
        "homepage": "https://example.com",
        "sources": "https://github.com/yourname/mymod"
    },
    "license": "MIT",
    "icon": "assets/mymod/icon.png",
    "environment": "*",
    "entrypoints": {
        "main": ["com.example.mymod.MyMod"],
        "client": ["com.example.mymod.client.MyModClient"]
    },
    "depends": {
        "fabricloader": ">=0.15.0",
        "minecraft": "~1.21",
        "java": ">=21",
        "fabric-api": "*"
    }
}
```

### build.gradle

```groovy
plugins {
    id 'fabric-loom' version '1.6-SNAPSHOT'
    id 'maven-publish'
}

version = project.mod_version
group = project.maven_group

base {
    archivesName = project.archives_base_name
}

repositories {
    mavenCentral()
}

dependencies {
    minecraft "com.mojang:minecraft:${project.minecraft_version}"
    mappings loom.officialMojangMappings()
    modImplementation "net.fabricmc:fabric-loader:${project.loader_version}"
    modImplementation "net.fabricmc.fabric-api:fabric-api:${project.fabric_version}"
}

processResources {
    inputs.property "version", project.version
    filteringCharset "UTF-8"

    filesMatching("fabric.mod.json") {
        expand "version": project.version
    }
}
```

### gradle.properties

```properties
# 版本
mod_version=1.0.0
maven_group=com.example
archives_base_name=mymod

# 依赖版本
minecraft_version=1.21
loader_version=0.15.11
fabric_version=0.100.0+1.21
```

## 注册系统

### 简单注册（Fabric API）

```java
// 使用 Fabric API 的 Registry 系统
public class ModItems {
    public static final Item RUBY = register(
        "ruby",
        new Item(new Item.Settings())
    );

    public static Item register(String name, Item item) {
        return Registry.register(
            Registries.ITEM,
            Identifier.of(MyMod.MOD_ID, name),
            item
        );
    }

    public static void register() {
        // 确保静态初始化
    }
}
```

## Fabric vs NeoForge 对比

| 特性 | Fabric | NeoForge |
|------|--------|----------|
| 加载器 | Fabric Loader | NeoForge |
| API | Fabric API（可选） | 内置 |
| 注册方式 | Registry.register | DeferredRegister |
| Mixin | 内置支持 | 需额外配置 |
| 更新速度 | 快 | 较慢 |
| 社区 | 现代 MOD 首选 | 传统 MOD 首选 |
