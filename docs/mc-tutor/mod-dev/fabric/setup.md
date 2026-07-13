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
    "environment": "*",               // *=通用, client=仅客户端, server=仅服务端
    "entrypoints": {
        "main": ["com.example.mymod.MyMod"],
        "client": ["com.example.mymod.client.MyModClient"],
        "fabric-datagen": ["com.example.mymod.datagen.MyModDataGenerator"]
    },
    "mixins": ["mymod.mixins.json"],
    "depends": {
        "fabricloader": ">=0.15.0",
        "minecraft": "~1.21",
        "java": ">=21",
        "fabric-api": "*"
    },
    "suggests": {
        "another-mod": "*"             // 推荐安装但不强制
    }
}
```

| 字段 | 说明 |
|------|------|
| `id` | MOD 唯一标识符，全小写，用下划线或连字符 |
| `entrypoints.main` | 服务端+客户端共用的入口 |
| `entrypoints.client` | 仅客户端执行（渲染、按键等） |
| `entrypoints.fabric-datagen` | 数据生成入口 |
| `mixins` | Mixin 配置文件路径 |
| `depends` | 强制依赖，缺少则无法加载 |
| `suggests` | 推荐但非必需的依赖 |
| `environment` | `*`=通用, `client`=仅客户端, `server`=仅服务端 |

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

## Mixin 配置

Fabric 使用 Mixin 修改原版代码。详细用法见 [Mixin 完全指南](../mixin)。

### 配置文件

```json
// src/main/resources/mymod.mixins.json
{
    "required": true,
    "package": "com.example.mymod.mixin",
    "compatibilityLevel": "JAVA_21",
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
| `defaultRequire` | 找不到目标方法时的行为：1=警告，0=忽略 |

### fabric.mod.json 引用

```json
{
    "mixins": ["mymod.mixins.json"]
}
```

> Fabric 使用 Fabric Loom 处理 Mixin，无需额外配置依赖。所有 Mixin 注解、注入方式、@Accessor/@Invoker 等详细用法请参考 [Mixin 完全指南](../mixin)。

## 数据生成

Fabric 提供内置数据生成 API，自动生成配方、战利品表、模型等 JSON 文件。

### 启用数据生成

```groovy
// build.gradle
fabricApi {
    configureDataGeneration() {
        client = true
    }
}
```

```java
// MyModDataGenerator.java — 入口点
public class MyModDataGenerator implements DataGeneratorEntrypoint {
    @Override
    public void onInitializeDataGenerator(FabricDataGenerator generator) {
        FabricDataGenerator.Pack pack = generator.createPack();
        // 添加提供者
        pack.addProvider(MyRecipeProvider::new);
        pack.addProvider(MyLootTableProvider::new);
        pack.addProvider(MyModelProvider::new);
    }
}
```

### 提供者一览

| 提供者 | 生成内容 |
|--------|----------|
| `FabricRecipeProvider` | 合成配方 |
| `FabricBlockLootTableProvider` | 方块战利品表 |
| `FabricModelProvider` | 方块/物品模型 |
| `FabricLanguageProvider` | 语言文件 |
| `FabricTagProvider` | 标签文件 |
| `FabricAdvancementProvider` | 进度 |

运行 `./gradlew runDatagen` 生成文件到 `src/main/generated`。

## 常见问题与最佳实践

### 开发规范

```text
✅ MOD ID 使用全小写，单词用连字符或下划线：my-mod 或 my_mod
✅ 包名使用公司域名反转：com.github.username.mymod
✅ 所有注册操作放在 onInitialize() 中
✅ 客户端代码放在 client 包下，用 @Environment(EnvType.CLIENT) 标记
✅ 所有资源文件放在对应路径：assets/<mod-id>/...

❌ 不要硬编码 Identifer，使用 Identifier.of() 创建
❌ 不要在服务端调用客户端 API（渲染、按键等）
❌ 不要泄露 MOD 的 API 内部实现细节
```

### 常见编译错误

| 错误 | 解决方案 |
|------|----------|
| `Could not find method loom()` | 确认 `build.gradle` 顶部有 `id 'fabric-loom'` 插件 |
| `java.lang.NoClassDefFoundError` | 检查 `fabric.mod.json` 中的依赖配置 |
| `Mixin target not found` | 检查 Mixin 配置中的目标方法名和 @At 位置 |
| `Access widener not applied` | 检查 `fabric.mod.json` 中的 `accessWidener` 字段 |
| `Outdated Loom version` | 在 [Fabric Maven](https://maven.fabricmc.net/) 检查最新版本 |
