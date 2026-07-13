# Fabric 数据生成

[官方文档](https://docs.fabricmc.net/develop/data-generation/setup)

> 数据生成 (Data Generation) 可以自动生成配方、战利品表、模型、语言文件等 JSON 资源，避免手动编写大量模板文件。

---

## 基本概念

数据生成将 Java 代码自动导出为 Minecraft 所需的 JSON 文件——配方、战利品表、标签、模型、语言文件等全部可以代码生成。

### 优点

```text
- 无需手动编写 JSON，减少格式错误
- 改名或改 ID 后自动同步所有引用
- 条件逻辑可以写 if/for 循环
- 团队协作时统一资源输出
```

---

## 设置

### build.gradle

```groovy
// build.gradle
fabricApi {
    configureDataGeneration() {
        client = true
    }
}
```

### 入口点

```java
// MyModDataGenerator.java — 放在 client 包下
package com.example.mymod.datagen;

import net.fabricmc.fabric.api.datagen.v1.DataGeneratorEntrypoint;
import net.fabricmc.fabric.api.datagen.v1.FabricDataGenerator;

public class MyModDataGenerator implements DataGeneratorEntrypoint {
    @Override
    public void onInitializeDataGenerator(FabricDataGenerator generator) {
        FabricDataGenerator.Pack pack = generator.createPack();

        // 添加各个提供者
        pack.addProvider(MyRecipeProvider::new);
        pack.addProvider(MyLootTableProvider::new);
        pack.addProvider(MyModelProvider::new);
        pack.addProvider(MyLanguageProvider::new);
        pack.addProvider(MyTagProvider::new);
    }
}
```

### fabric.mod.json

```json
{
    "entrypoints": {
        "fabric-datagen": [
            "com.example.mymod.datagen.MyModDataGenerator"
        ]
    }
}
```

---

## 提供者详解

### 1. 合成配方 (RecipeProvider)

```java
public class MyRecipeProvider extends FabricRecipeProvider {
    public MyRecipeProvider(FabricDataOutput output) {
        super(output);
    }

    @Override
    public void generate(RecipeExporter exporter) {
        // 有序合成：红宝石块
        ShapedRecipeJsonBuilder.create(RecipeCategory.BUILDING_BLOCKS,
                ModBlocks.RUBY_BLOCK)
            .pattern("###")
            .pattern("###")
            .pattern("###")
            .input('#', ModItems.RUBY)
            .criterion(FabricRecipeProvider.hasItem(ModItems.RUBY),
                FabricRecipeProvider.conditionsFromItem(ModItems.RUBY))
            .offerTo(exporter);

        // 无序合成：红宝石 -> 9 个宝石
        ShapelessRecipeJsonBuilder.create(RecipeCategory.MISC, ModItems.RUBY, 9)
            .input(ModBlocks.RUBY_BLOCK)
            .criterion(hasItem(ModBlocks.RUBY_BLOCK),
                conditionsFromItem(ModBlocks.RUBY_BLOCK))
            .offerTo(exporter);

        // 烧炼：红宝石矿石 -> 红宝石
        CookingRecipeJsonBuilder.createSmelting(
                Ingredient.ofItems(ModBlocks.RUBY_ORE),
                RecipeCategory.MISC, ModItems.RUBY, 1.0f, 200)
            .criterion(hasItem(ModBlocks.RUBY_ORE),
                conditionsFromItem(ModBlocks.RUBY_ORE))
            .offerTo(exporter);

        // 复制配方
        SmithingTransformRecipeJsonBuilder.create(
                Ingredient.ofItems(ModItems.UPGRADE_TEMPLATE),
                Ingredient.ofItems(Items.DIAMOND_SWORD),
                Ingredient.ofItems(ModItems.RUBY),
                RecipeCategory.COMBAT, ModItems.RUBY_SWORD)
            .criterion(hasItem(ModItems.RUBY),
                conditionsFromItem(ModItems.RUBY))
            .offerTo(exporter);
    }
}
```

### 2. 战利品表 (LootTableProvider)

```java
public class MyLootTableProvider extends FabricBlockLootTableProvider {
    public MyLootTableProvider(FabricDataOutput output) {
        super(output);
    }

    @Override
    public void generate() {
        // 方块掉落自身
        addDrop(ModBlocks.RUBY_BLOCK);

        // 矿石掉落（有时运 + 爆炸衰减）
        addDrop(ModBlocks.RUBY_ORE, oreDrops(ModBlocks.RUBY_ORE, ModItems.RUBY));
        addDrop(ModBlocks.DEEPSLATE_RUBY_ORE,
            oreDrops(ModBlocks.DEEPSLATE_RUBY_ORE, ModItems.RUBY));

        // 自定义条件掉落
        addDrop(ModBlocks.CUSTOM_BLOCK, block ->
            BlockLootTableGenerator.dropsWithSilkTouchOrRandomly(block,
                ModItems.SPECIAL_DROP));
    }
}
```

### 3. 模型 (ModelProvider)

```java
public class MyModelProvider extends FabricModelProvider {
    public MyModelProvider(FabricDataOutput output) {
        super(output);
    }

    @Override
    public void generateBlockStateModels(BlockStateModelGenerator generator) {
        // 简单方块（cubes all）
        generator.registerSimpleCubeAll(ModBlocks.RUBY_BLOCK);
        generator.registerSimpleCubeAll(ModBlocks.RUBY_ORE);
        generator.registerSimpleCubeAll(ModBlocks.DEEPSLATE_RUBY_ORE);

        // 楼梯
        generator.registerBlockWithItem(ModBlocks.RUBY_STAIRS,
            block -> BlockStateModelGenerator.createStairsState(
                ModBlocks.RUBY_STAIRS, ModBlocks.RUBY_BLOCK));
    }

    @Override
    public void generateItemModels(ItemModelGenerator generator) {
        // 手持物品（generated 类型）
        generator.register(ModItems.RUBY, Models.GENERATED);
        generator.register(ModItems.SAPPHIRE, Models.GENERATED);

        // 手持工具（handheld 类型）
        generator.register(ModItems.RUBY_SWORD, Models.HANDHELD);
        generator.register(ModItems.RUBY_PICKAXE, Models.HANDHELD);
    }
}
```

### 4. 语言文件 (LanguageProvider)

```java
public class MyLanguageProvider extends FabricLanguageProvider {
    public MyLanguageProvider(FabricDataOutput output) {
        super(output);
    }

    @Override
    public void generateTranslations(TranslationBuilder translationBuilder) {
        // 英文
        translationBuilder.add(ModItems.RUBY, "Ruby");
        translationBuilder.add(ModBlocks.RUBY_BLOCK, "Ruby Block");
        translationBuilder.add(ModItems.RUBY_SWORD, "Ruby Sword");
        translationBuilder.add(ModItems.RUBY_PICKAXE, "Ruby Pickaxe");

        // 中文
        translationBuilder.add(ModItems.RUBY, "红宝石");
        translationBuilder.add(ModBlocks.RUBY_BLOCK, "红宝石块");
        translationBuilder.add(ModItems.RUBY_SWORD, "红宝石剑");
        translationBuilder.add(ModItems.RUBY_PICKAXE, "红宝石镐");
    }
}
```

### 5. 标签 (TagProvider)

```java
public class MyTagProvider extends FabricTagProvider.BlockTagProvider {
    public MyTagProvider(FabricDataOutput output,
                         CompletableFuture<RegistryWrapper.WrapperLookup> registries) {
        super(output, registries);
    }

    @Override
    protected void configure(RegistryWrapper.WrapperLookup lookup) {
        // 添加到原版标签：需要铁镐挖掘
        getOrCreateTagBuilder(BlockTags.NEEDS_IRON_TOOL)
            .add(ModBlocks.RUBY_ORE)
            .add(ModBlocks.DEEPSLATE_RUBY_ORE);

        // 可被镐挖掘
        getOrCreateTagBuilder(BlockTags.PICKAXE_MINEABLE)
            .add(ModBlocks.RUBY_BLOCK)
            .add(ModBlocks.RUBY_ORE)
            .add(ModBlocks.DEEPSLATE_RUBY_ORE)
            .add(ModBlocks.RUBY_STAIRS)
            .add(ModBlocks.RUBY_SLAB);

        // 自定义标签
        getOrCreateTagBuilder(ModTags.RUBY_ORES)
            .add(ModBlocks.RUBY_ORE)
            .add(ModBlocks.DEEPSLATE_RUBY_ORE);
    }
}
```

---

## 运行

```bash
# 命令行
./gradlew runDatagen

# IDE: 在 Gradle 面板中找到 Tasks → fabric → runDatagen

# 生成的文件在 src/main/generated/ 目录
# 如果生成目录不存在，会自动创建
```

---

## 完整示例

```java
public class MyModDataGenerator implements DataGeneratorEntrypoint {
    @Override
    public void onInitializeDataGenerator(FabricDataGenerator generator) {
        FabricDataGenerator.Pack pack = generator.createPack();

        pack.addProvider(MyRecipeProvider::new);
        pack.addProvider(MyLootTableProvider::new);
        pack.addProvider(MyModelProvider::new);
        pack.addProvider(MyLanguageProvider::new);
        pack.addProvider(MyTagProvider::new);
        // pack.addProvider(MyAdvancementProvider::new);
    }
}
```

运行后自动生成：
- `data/mymod/recipe/*.json` — 所有配方
- `data/mymod/loot_table/blocks/*.json` — 战利品表
- `assets/mymod/models/block/*.json` — 方块模型
- `assets/mymod/models/item/*.json` — 物品模型
- `assets/mymod/lang/en_us.json` — 英文语言文件
- `data/mymod/tags/blocks/*.json` — 方块标签
