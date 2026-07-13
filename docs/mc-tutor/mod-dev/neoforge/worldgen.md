# NeoForge 世界生成

[官方文档](https://docs.neoforged.net/docs/worldgen/)

## 矿石生成

### 配置特征（ConfiguredFeature）

```java
// ModConfiguredFeatures.java
package com.example.mymod.worldgen;

import com.example.mymod.ModBlocks;
import net.minecraft.core.registries.Registries;
import net.minecraft.data.worldgen.BootstapContext;
import net.minecraft.resources.ResourceKey;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.level.levelgen.feature.ConfiguredFeature;
import net.minecraft.world.level.levelgen.feature.Feature;
import net.minecraft.world.level.levelgen.feature.configurations.OreConfiguration;
import net.minecraft.world.level.levelgen.structure.templatesystem.RuleTest;
import net.minecraft.world.level.levelgen.structure.templatesystem.TagMatchTest;
import net.minecraft.tags.BlockTags;

import java.util.List;

public class ModConfiguredFeatures {
    public static final ResourceKey<ConfiguredFeature<?, ?>> RUBY_ORE_KEY = 
        registerKey("ruby_ore");

    public static void bootstrap(BootstapContext<ConfiguredFeature<?, ?>> context) {
        // 矿石替换规则
        RuleTest stoneReplaceables = new TagMatchTest(BlockTags.STONE_ORE_REPLACEABLES);
        RuleTest deepslateReplaceables = new TagMatchTest(BlockTags.DEEPSLATE_ORE_REPLACEABLES);

        List<OreConfiguration.TargetBlockState> rubyOres = List.of(
            OreConfiguration.target(stoneReplaceables, 
                ModBlocks.RUBY_ORE.get().defaultBlockState()),
            OreConfiguration.target(deepslateReplaceables, 
                ModBlocks.DEEPSLATE_RUBY_ORE.get().defaultBlockState())
        );

        register(context, RUBY_ORE_KEY, Feature.ORE, 
            new OreConfiguration(rubyOres, 8)); // 矿脉大小 8
    }

    private static ResourceKey<ConfiguredFeature<?, ?>> registerKey(String name) {
        return ResourceKey.create(Registries.CONFIGURED_FEATURE, 
            ResourceLocation.fromNamespaceAndPath(MyMod.MODID, name));
    }

    private static <FC extends FeatureConfiguration, F extends Feature<FC>> 
    void register(BootstapContext<ConfiguredFeature<?, ?>> context,
                  ResourceKey<ConfiguredFeature<?, ?>> key, F feature, FC configuration) {
        context.register(key, new ConfiguredFeature<>(feature, configuration));
    }
}
```

### 放置特征（PlacedFeature）

```java
// ModPlacedFeatures.java
public class ModPlacedFeatures {
    public static final ResourceKey<PlacedFeature> RUBY_ORE_PLACED_KEY = 
        registerKey("ruby_ore_placed");

    public static void bootstrap(BootstapContext<PlacedFeature> context) {
        var configuredFeatures = context.lookup(Registries.CONFIGURED_FEATURE);

        register(context, RUBY_ORE_PLACED_KEY,
            configuredFeatures.getOrThrow(ModConfiguredFeatures.RUBY_ORE_KEY),
            List.of(
                CountPlacementModifier.of(10),           // 每区块尝试 10 次
                HeightRangePlacementModifier.uniform(
                    VerticalAnchor.absolute(-64),
                    VerticalAnchor.absolute(40)
                ),
                BiomeFilter.biome()                       // 按群系过滤
            ));
    }

    private static ResourceKey<PlacedFeature> registerKey(String name) {
        return ResourceKey.create(Registries.PLACED_FEATURE,
            ResourceLocation.fromNamespaceAndPath(MyMod.MODID, name));
    }

    private static void register(BootstapContext<PlacedFeature> context,
                                  ResourceKey<PlacedFeature> key,
                                  Holder<ConfiguredFeature<?, ?>> configuredFeature,
                                  List<PlacementModifier> modifiers) {
        context.register(key, new PlacedFeature(configuredFeature, modifiers));
    }
}
```

### 生物群系修改

```java
// ModBiomeModifiers.java
public class ModBiomeModifiers {
    public static final ResourceKey<BiomeModifier> ADD_RUBY_ORE = 
        ResourceKey.create(Registries.BIOME_MODIFIER,
            ResourceLocation.fromNamespaceAndPath(MyMod.MODID, "add_ruby_ore"));

    public static void bootstrap(BootstapContext<BiomeModifier> context) {
        var placedFeatures = context.lookup(Registries.PLACED_FEATURE);
        var biomes = context.lookup(Registries.BIOME);

        context.register(ADD_RUBY_ORE, new BiomeModifier(
            biomes.getOrThrow(BiomeFilters.IS_OVERWORLD),
            BiomeModifier.AddFeaturesModifier.ADD_FEATURES(
                placedFeatures.getOrThrow(ModPlacedFeatures.RUBY_ORE_PLACED_KEY),
                GenerationStep.Decoration.UNDERGROUND_ORES
            )
        ));
    }
}
```

### 注册到事件总线

```java
// 在主类中注册数据生成
@Mod(MyMod.MODID)
public class MyMod {
    public MyMod(IEventBus modEventBus) {
        // 注册世界生成数据
        modEventBus.addListener(ModConfiguredFeatures::bootstrap);
        modEventBus.addListener(ModPlacedFeatures::bootstrap);
        modEventBus.addListener(ModBiomeModifiers::bootstrap);
    }
}
```

## 自定义结构

### 结构定义

```java
// ModStructures.java
public class ModStructures {
    public static final DeferredRegister<StructureType<?>> STRUCTURE_TYPES =
        DeferredRegister.create(Registries.STRUCTURE_TYPE, MyMod.MODID);

    public static final DeferredHolder<StructureType<?>, StructureType<SkyStructure>> SKY_STRUCTURE =
        STRUCTURE_TYPES.register("sky_structure", 
            () -> () -> SkyStructure.CODEC);

    // 注册到主类
    public static void register(IEventBus bus) {
        STRUCTURE_TYPES.register(bus);
    }
}

// SkyStructure.java
public class SkyStructure extends Structure {
    public static final Codec<SkyStructure> CODEC = RecordCodecBuilder.create(
        instance -> instance.group(
            settingsCodec(instance)
        ).apply(instance, SkyStructure::new));

    public SkyStructure(StructureSettings settings) {
        super(settings);
    }

    @Override
    protected Optional<GenerationStub> findGenerationPoint(
            GenerationContext context) {
        // 在特定 Y 高度生成
        ChunkPos chunkPos = context.chunkPos();
        int x = chunkPos.getMinBlockX();
        int z = chunkPos.getMinBlockZ();
        int y = 100; // 固定高度

        return Optional.of(new GenerationStub(
            new BlockPos(x, y, z),
            (piecesBuilder) -> {
                piecesBuilder.addPiece(new SkyStructurePiece(
                    new BlockPos(x, y, z)));
            }));
    }

    @Override
    public StructureType<?> type() {
        return ModStructures.SKY_STRUCTURE.get();
    }
}
```

### 结构部件

```java
// SkyStructurePiece.java
public class SkyStructurePiece extends StructurePiece {
    private static final BoundingBox BOX = new BoundingBox(0, 0, 0, 10, 5, 10);

    public SkyStructurePiece(BlockPos pos) {
        super(ModStructures.SKY_STRUCTURE.get(), 0, 
              new BoundingBox(pos.getX(), pos.getY(), pos.getZ(),
                              pos.getX() + 10, pos.getY() + 5, pos.getZ() + 10));
    }

    @Override
    protected void addAdditionalSaveData(CompoundTag tag) {
        // 保存额外数据
    }

    @Override
    protected void readAdditionalSaveData(CompoundTag tag) {
        // 读取额外数据
    }

    @Override
    public void postProcess(WorldGenLevel level, StructureManager structures,
                            ChunkGenerator generator, RandomState random,
                            BoundingBox box, ChunkPos chunkPos, BlockPos pos) {
        // 在这里构建结构
        for (int x = 0; x <= 10; x++) {
            for (int z = 0; z <= 10; z++) {
                // 地板
                placeBlock(level, Blocks.STONE.defaultBlockState(), 
                          x, 0, z, box);
                // 顶部
                placeBlock(level, Blocks.STONE.defaultBlockState(), 
                          x, 5, z, box);
            }
        }
    }
}
```

## 自定义生物群系

```java
// ModBiomes.java
public class ModBiomes {
    public static final ResourceKey<Biome> CRYSTAL_PLAINS = 
        ResourceKey.create(Registries.BIOME,
            ResourceLocation.fromNamespaceAndPath(MyMod.MODID, "crystal_plains"));

    public static void bootstrap(BootstapContext<Biome> context) {
        context.register(CRYSTAL_PLAINS, createCrystalPlainsBiome());
    }

    private static Biome createCrystalPlainsBiome() {
        // 生成设置
        MobSpawnSettings.Builder spawnBuilder = new MobSpawnSettings.Builder();
        // 添加生物生成
        spawnBuilder.addSpawn(MobCategory.CREATURE,
            new MobSpawnSettings.SpawnerData(
                EntityType.RABBIT, 5, 2, 5));

        BiomeGenerationSettings.Builder genBuilder = 
            new BiomeGenerationSettings.Builder();
        // 添加基础地表
        genBuilder.addFeature(GenerationStep.Decoration.SURFACE_STRUCTURES,
            ModPlacedFeatures.CRYSTAL_STRUCTURE);

        return new Biome.BiomeBuilder()
            .hasPrecipitation(true)
            .temperature(0.8f)
            .downfall(0.4f)
            .specialEffects(new BiomeSpecialEffects.Builder()
                .waterColor(0x4444FF)
                .waterFogColor(0x2222AA)
                .fogColor(0xCCCCFF)
                .skyColor(0x8888FF)
                .ambientParticle(new ParticleOptionsInstance(
                    ParticleTypes.END_ROD, 0.01f))
                .ambientLoopSound(SoundEvents.AMBIENT_CAVE)
                .build())
            .mobSpawnSettings(spawnBuilder.build())
            .generationSettings(genBuilder.build())
            .build();
    }
}
```

## 树木与植被

```java
// 自定义树木
public class ModTreeFeatures {
    public static final ResourceKey<ConfiguredFeature<?, ?>> CRYSTAL_TREE =
        registerKey("crystal_tree");

    public static void bootstrap(BootstapContext<ConfiguredFeature<?, ?>> context) {
        register(context, CRYSTAL_TREE, Feature.TREE,
            new TreeConfiguration.TreeConfigurationBuilder(
                Blocks.AMETHYST_BLOCK.defaultBlockState(), // 树干
                new StraightTrunkPlacer(5, 3, 2),          // 树干高度
                Blocks.LIGHT_BLUE_STAINED_GLASS.defaultBlockState(), // 树叶
                new BlobFoliagePlacer(ConstantInt.of(2), ConstantInt.of(1), 3),
                new TwoLayersFeatureSize(1, 0, 1)
            ).ignoreVines().build());
    }
}
```

## 植被放置

```java
// 地表植被
public class ModVegetationFeatures {
    public static final ResourceKey<PlacedFeature> CRYSTAL_TREES =
        registerKey("crystal_trees");

    public static void bootstrap(BootstapContext<PlacedFeature> context) {
        var configured = context.lookup(Registries.CONFIGURED_FEATURE);

        register(context, CRYSTAL_TREES,
            configured.getOrThrow(ModTreeFeatures.CRYSTAL_TREE),
            List.of(
                RarityFilter.onAverageOnceEvery(3),  // 每 3 区块尝试一次
                InSquarePlacementModifier.spread(),   // 范围内散布
                PlacementUtils.HEIGHTMAP_TOP_SOLID,   // 地表放置
                BiomeFilter.biome()
            ));
    }
}
```

## 矿物通配（Variant）

```java
// ModOreFeatures.java — 支持多种矿物变体
public class ModOreFeatures {
    // 贫瘠矿石
    public static final ResourceKey<ConfiguredFeature<?, ?>> POOR_RUBY_ORE =
        registerKey("poor_ruby_ore");

    // 富矿
    public static final ResourceKey<ConfiguredFeature<?, ?>> RICH_RUBY_ORE =
        registerKey("rich_ruby_ore");

    public static void bootstrap(BootstapContext<ConfiguredFeature<?, ?>> context) {
        // 贫瘠矿脉（小但生成多）
        register(context, POOR_RUBY_ORE, Feature.ORE,
            new OreConfiguration(List.of(
                OreConfiguration.target(
                    new TagMatchTest(BlockTags.STONE_ORE_REPLACEABLES),
                    ModBlocks.POOR_RUBY_ORE.get().defaultBlockState())
            ), 4)); // 小矿脉

        // 富矿（大但生成少）
        register(context, RICH_RUBY_ORE, Feature.ORE,
            new OreConfiguration(List.of(
                OreConfiguration.target(
                    new TagMatchTest(BlockTags.STONE_ORE_REPLACEABLES),
                    ModBlocks.RICH_RUBY_ORE.get().defaultBlockState())
            ), 16));
    }
}
```

## 生成条件控制

```java
// 自定义生成条件
public class ModPlacementModifiers {
    // 只在特定 Y 层附近生成
    record NearSurfacePlacement() implements PlacementModifier {
        public static final NearSurfacePlacement INSTANCE = new NearSurfacePlacement();
        
        @Override
        public PositionStream getPositions(
                PlacementContext context, RandomSource random, BlockPos pos) {
            // 只在 Y=60-70 之间生成
            if (pos.getY() >= 60 && pos.getY() <= 70) {
                return PositionStream.single(pos);
            }
            return PositionStream.empty();
        }

        @Override
        public PlacementModifierType<?> type() {
            return ModPlacementModifierTypes.NEAR_SURFACE.get();
        }
    }
}
```

## 数据生成注册

```java
// 在 DataGenerator 中注册
@Mod.EventBusSubscriber(modid = MyMod.MODID, bus = Mod.EventBusSubscriber.Bus.MOD)
public class ModWorldGenData {
    @SubscribeEvent
    public static void onDatapackRegistry(
            DataPackRegistryEvent.NewRegistry event) {
        event.dataPackRegistry(
            Registries.CONFIGURED_FEATURE,
            ConfiguredFeature.CODEC
        );
    }
}
```
