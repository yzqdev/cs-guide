# NeoForge 数据生成

[官方文档](https://docs.neoforged.net/docs/datagen/)

数据生成器可以自动生成 JSON（配方、战利品表、模型等），减少手动编写。

## 启用数据生成

### 添加运行配置

```java
// 在 gradle 中已经默认配置
// 运行命令：
// ./gradlew runData
```

### 主类注册

```java
@Mod(MyMod.MODID)
public class MyMod {
    public MyMod(IEventBus modEventBus) {
        // 注册数据生成
        modEventBus.addListener(ModDataGenerator::gatherData);
    }
}
```

## 数据生成入口

```java
// ModDataGenerator.java
public class ModDataGenerator {
    @SubscribeEvent
    public static void gatherData(GatherDataEvent event) {
        DataGenerator generator = event.getGenerator();
        PackOutput output = event.getGenerator().getPackOutput();
        ExistingFileHelper existingFileHelper = event.getExistingFileHelper();
        CompletableFuture<HolderLookup.Provider> lookupProvider = 
            event.getLookupProvider();

        // 服务端数据
        generator.addProvider(event.includeServer(), 
            new ModRecipeProvider(output, lookupProvider));
        generator.addProvider(event.includeServer(),
            new ModLootTableProvider(output, lookupProvider));
        generator.addProvider(event.includeServer(),
            new ModAdvancementProvider(output, lookupProvider));

        // 客户端数据
        generator.addProvider(event.includeClient(),
            new ModBlockStateProvider(output, existingFileHelper));
        generator.addProvider(event.includeClient(),
            new ModItemModelProvider(output, existingFileHelper));
        generator.addProvider(event.includeClient(),
            new ModLanguageProvider(output, "en_us"));

        // Tags
        ModBlockTagsProvider blockTags = 
            new ModBlockTagsProvider(output, lookupProvider, existingFileHelper);
        generator.addProvider(event.includeServer(), blockTags);
        generator.addProvider(event.includeServer(),
            new ModItemTagsProvider(output, lookupProvider, blockTags, existingFileHelper));
    }
}
```

## 配方数据生成

```java
// ModRecipeProvider.java
public class ModRecipeProvider extends RecipeProvider {
    public ModRecipeProvider(PackOutput output, CompletableFuture<HolderLookup.Provider> lookup) {
        super(output, lookup);
    }

    @Override
    protected void buildRecipes(RecipeOutput output) {
        // 有序合成
        ShapedRecipeBuilder.shaped(RecipeCategory.MISC, ModItems.RUBY_BLOCK.get())
            .pattern("###")
            .pattern("###")
            .pattern("###")
            .define('#', ModItems.RUBY.get())
            .unlockedBy("has_ruby", has(ModItems.RUBY.get()))
            .save(output);

        // 无序合成
        ShapelessRecipeBuilder.shapeless(RecipeCategory.MISC, ModItems.RUBY.get(), 9)
            .requires(ModItems.RUBY_BLOCK.get())
            .unlockedBy("has_ruby_block", has(ModItems.RUBY_BLOCK.get()))
            .save(output);

        // 熔炉配方
        SimpleCookingRecipeBuilder.smelting(
                Ingredient.of(Items.DIAMOND),
                RecipeCategory.MISC,
                ModItems.RUBY.get(),
                1.0f, 200)
            .unlockedBy("has_diamond", has(Items.DIAMOND))
            .save(output, "ruby_from_smelting");

        // 高炉配方（速度 2 倍）
        SimpleCookingRecipeBuilder.blasting(
                Ingredient.of(Items.DIAMOND),
                RecipeCategory.MISC,
                ModItems.RUBY.get(),
                1.0f, 100)
            .unlockedBy("has_diamond", has(Items.DIAMOND))
            .save(output, "ruby_from_blasting");

        // 烟熏炉配方
        SimpleCookingRecipeBuilder.smoking(
                Ingredient.of(ModItems.RAW_RUBY.get()),
                RecipeCategory.FOOD,
                ModItems.RUBY.get(),
                0.5f, 100)
            .unlockedBy("has_raw_ruby", has(ModItems.RAW_RUBY.get()))
            .save(output);

        // 切石机配方
        StonecutterRecipeBuilder.stonecutter(
                Ingredient.of(ModBlocks.RUBY_BLOCK.get()),
                RecipeCategory.BUILDING_BLOCKS,
                ModBlocks.RUBY_SLAB.get(), 2)
            .unlockedBy("has_ruby_block", has(ModBlocks.RUBY_BLOCK.get()))
            .save(output);

        // 锻造台配方（下界合金升级）
        SmithingTransformRecipeBuilder.smithing(
                Ingredient.of(Items.NETHERITE_UPGRADE_SMITHING_TEMPLATE),
                Ingredient.of(Items.DIAMOND_SWORD),
                Ingredient.of(ModItems.RUBY.get()),
                RecipeCategory.COMBAT,
                ModItems.RUBY_SWORD.get().asItem().getDefaultInstance())
            .unlocks("has_ruby", has(ModItems.RUBY.get()))
            .save(output, "ruby_sword_smithing");
    }
}
```

## 战利品表数据生成

```java
// ModLootTableProvider.java
public class ModLootTableProvider extends LootTableProvider {
    public ModLootTableProvider(PackOutput output, CompletableFuture<HolderLookup.Provider> lookup) {
        super(output, Set.of(), List.of(
            new SubProviderEntry(ModBlockLoot::new, 
                LootContextParamSets.BLOCK)
        ), lookup);
    }

    // 方块战利品表
    private static class ModBlockLoot extends BlockLootSubProvider {
        protected ModBlockLoot() {
            super(Set.of(), 
                buildBlockLootTable());
        }

        @Override
        protected void generate() {
            // 简单方块：掉落自身
            dropSelf(ModBlocks.RUBY_BLOCK.get());

            // 矿石：掉落物品（有时运）
            add(ModBlocks.RUBY_ORE.get(),
                createOreDrop(ModBlocks.RUBY_ORE.get(), ModItems.RUBY.get()));

            // 多层矿石
            add(ModBlocks.DEEPSLATE_RUBY_ORE.get(),
                createOreDrop(ModBlocks.DEEPSLATE_RUBY_ORE.get(), ModItems.RUBY.get()));

            // 用 Silk Touch 时掉落自身
            add(ModBlocks.RUBY_ORE.get(),
                createSilkTouchDispatchTable(ModBlocks.RUBY_ORE.get(),
                    applyExplosionDecay(ModBlocks.RUBY_ORE.get(),
                        LootItem.lootTableItem(ModItems.RUBY.get())
                            .apply(ApplyBonusCount.addUniformBonusCount(
                                Enchantments.FORTUNE))
                    )));
            
            // 自定义掉落条件
            add(ModBlocks.CUSTOM_BLOCK.get(), LootTable.lootTable()
                .withPool(LootPool.lootPool()
                    .setRolls(ConstantValue.exactly(1))
                    .add(LootItem.lootTableItem(ModItems.CUSTOM_ITEM.get())
                        .when(LootItemRandomChanceCondition.randomChance(0.5f))))
            );
        }
    }
}

// 额外：实体战利品表
public class ModEntityLoot extends EntityLootSubProvider {
    @Override
    public void generate() {
        // 自定义实体掉落
        add(ModEntities.RUBY_GOLEM.get(), LootTable.lootTable()
            .withPool(LootPool.lootPool()
                .setRolls(ConstantValue.exactly(1))
                .add(LootItem.lootTableItem(ModItems.RUBY.get())
                    .apply(SetItemCountFunction.setCount(
                        UniformGenerator.between(1.0f, 3.0f)))))
            .withPool(LootPool.lootPool()
                .setRolls(ConstantValue.exactly(1))
                .add(LootItem.lootTableItem(Items.EXPERIENCE_BOTTLE)
                    .apply(SetItemCountFunction.setCount(
                        UniformGenerator.between(0.0f, 2.0f))))));
    }
}
```

## 模型和方块状态

```java
// ModBlockStateProvider.java
public class ModBlockStateProvider extends BlockStateProvider {
    public ModBlockStateProvider(PackOutput output, ExistingFileHelper helper) {
        super(output, MyMod.MODID, helper);
    }

    @Override
    protected void registerStatesAndModels() {
        // 简单方块（6面相同）
        simpleBlock(ModBlocks.RUBY_BLOCK.get());

        // 自定义纹理的简单方块
        simpleBlock(ModBlocks.CRYSTAL_BLOCK.get(),
            new CubeAllBlockStateProvider(blockTexture(ModBlocks.CRYSTAL_BLOCK.get())));

        // 方向方块
        horizontalBlock(ModBlocks.DIRECTIONAL_BLOCK.get(),
            new ModelFile.UncheckedModelFile(
                modLoc("block/directional_block")));

        // 楼梯
        stairsBlock((StairBlock) ModBlocks.RUBY_STAIRS.get(),
            blockTexture(ModBlocks.RUBY_BLOCK.get()));

        // 栅栏
        fenceBlock((FenceBlock) ModBlocks.RUBY_FENCE.get(),
            blockTexture(ModBlocks.RUBY_BLOCK.get()));

        // 墙
        wallBlock((WallBlock) ModBlocks.RUBY_WALL.get(),
            blockTexture(ModBlocks.RUBY_BLOCK.get()));

        // 门
        doorBlockWithRenderType((DoorBlock) ModBlocks.RUBY_DOOR.get(),
            modLoc("block/ruby_door_bottom"),
            modLoc("block/ruby_door_top"), "cutout");

        // 活板门
        trapdoorBlockWithRenderType((TrapDoorBlock) ModBlocks.RUBY_TRAPDOOR.get(),
            modLoc("block/ruby_trapdoor"), true, "cutout");
    }
}
```

## 物品模型

```java
// ModItemModelProvider.java
public class ModItemModelProvider extends ItemModelProvider {
    public ModItemModelProvider(PackOutput output, ExistingFileHelper helper) {
        super(output, MyMod.MODID, helper);
    }

    @Override
    protected void registerModels() {
        // 简单物品模型（generated）
        basicItem(ModItems.RUBY.get());
        basicItem(ModItems.SAPPHIRE.get());

        // 工具（handheld）
        handheldItem(ModItems.RUBY_SWORD.get());
        handheldItem(ModItems.RUBY_PICKAXE.get());
        handheldItem(ModItems.RUBY_AXE.get());

        // 方块物品（使用方块模型）
        withExistingParent(ModItems.RUBY_BLOCK_ITEM.getId().getPath(),
            modLoc("block/ruby_block"));

        // 按钮/开关
        buttonInventory("ruby_button",
            modLoc("block/ruby_button"));
    }
}
```

## Tag 数据生成

```java
// ModBlockTagsProvider.java
public class ModBlockTagsProvider extends BlockTagsProvider {
    public ModBlockTagsProvider(PackOutput output, 
                                CompletableFuture<HolderLookup.Provider> lookup,
                                ExistingFileHelper helper) {
        super(output, lookup, MyMod.MODID, helper);
    }

    @Override
    protected void addTags(HolderLookup.Provider provider) {
        // 需要的挖掘等级
        tag(Tags.Blocks.NEEDS_DIAMOND_TOOL)
            .add(ModBlocks.RUBY_BLOCK.get());

        tag(Tags.Blocks.NEEDS_IRON_TOOL)
            .add(ModBlocks.RUBY_ORE.get());

        // 镐子可以挖掘
        tag(BlockTags.MINEABLE_WITH_PICKAXE)
            .add(ModBlocks.RUBY_BLOCK.get())
            .add(ModBlocks.RUBY_ORE.get())
            .add(ModBlocks.DEEPSLATE_RUBY_ORE.get());
    }
}
```

## 语言文件生成

```java
// ModLanguageProvider.java
public class ModLanguageProvider extends LanguageProvider {
    public ModLanguageProvider(PackOutput output, String locale) {
        super(output, MyMod.MODID, locale);
    }

    @Override
    protected void addTranslations() {
        // 物品
        add(ModItems.RUBY.get(), "Ruby");
        add(ModItems.SAPPHIRE.get(), "Sapphire");
        add(ModItems.RUBY_SWORD.get(), "Ruby Sword");
        add(ModItems.RUBY_PICKAXE.get(), "Ruby Pickaxe");
        add(ModItems.RUBY_AXE.get(), "Ruby Axe");

        // 方块
        add(ModBlocks.RUBY_BLOCK.get(), "Ruby Block");
        add(ModBlocks.RUBY_ORE.get(), "Ruby Ore");
        add(ModBlocks.DEEPSLATE_RUBY_ORE.get(), "Deepslate Ruby Ore");

        // 创造标签页
        add(ModTabs.MY_TAB.getKey(), "My Mod");

        // 提示信息
        add("item.mymod.custom_item.desc", "A very special item");
    }
}
```

## 运行数据生成

```bash
# 生成所有数据
./gradlew runData

# 生成的 JSON 在：
# src/main/generated/resources/
# 然后手动复制到：
# src/main/resources/
```
