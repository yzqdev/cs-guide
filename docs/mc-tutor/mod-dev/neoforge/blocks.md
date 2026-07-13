# NeoForge 方块注册

[官方文档](https://docs.neoforged.net/docs/blocks/)

## 基本方块

### 注册方块

```java
// ModBlocks.java
package com.example.mymod;

import net.neoforged.neoforge.registries.DeferredBlock;
import net.neoforged.neoforge.registries.DeferredRegister;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.state.BlockBehaviour;
import net.minecraft.world.level.material.MapColor;
import net.minecraft.core.registries.Registries;

public class ModBlocks {
    public static final DeferredRegister.Blocks BLOCKS =
        DeferredRegister.createBlocks(MyMod.MODID);

    // 简单方块
    public static final DeferredBlock<Block> RUBY_BLOCK =
        BLOCKS.registerSimpleBlock("ruby_block",
            BlockBehaviour.Properties.of()
                .mapColor(MapColor.COLOR_RED)
                .requiresCorrectToolForDrops()
                .strength(5.0f, 6.0f)    // 硬度和抗爆性
        );

    // 自定义方块
    public static final DeferredBlock<Block> GLOWING_BLOCK =
        BLOCKS.registerBlock("glowing_block",
            Block::new,
            BlockBehaviour.Properties.of()
                .mapColor(MapColor.COLOR_YELLOW)
                .lightLevel(state -> 15)  // 发光等级
                .strength(0.5f)
        );
}
```

### 注册对应物品

```java
// ModItems.java（追加）
public class ModItems {
    // ...

    // 为方块注册物品（方块物品）
    public static final DeferredItem<BlockItem> RUBY_BLOCK_ITEM =
        ITEMS.registerSimpleBlockItem(
            ModBlocks.RUBY_BLOCK,
            new Item.Properties()
        );

    public static final DeferredItem<BlockItem> GLOWING_BLOCK_ITEM =
        ITEMS.registerSimpleBlockItem(ModBlocks.GLOWING_BLOCK);
}
```

### 方块模型

```json
// assets/mymod/models/block/ruby_block.json
{
    "parent": "block/cube_all",
    "textures": {
        "all": "mymod:block/ruby_block"
    }
}
```

### 方块状态

```json
// assets/mymod/blockstates/ruby_block.json
{
    "variants": {
        "": { "model": "mymod:block/ruby_block" }
    }
}
```

### 掉落物品

```json
// data/mymod/loot_table/blocks/ruby_block.json
{
    "type": "minecraft:block",
    "pools": [{
        "rolls": 1,
        "entries": [{
            "type": "minecraft:item",
            "name": "mymod:ruby_block"
        }],
        "conditions": [{
            "condition": "minecraft:survives_explosion"
        }]
    }]
}
```

## 矿石方块

```java
public class ModBlocks {
    // ...

    // 矿石
    public static final DeferredBlock<Block> RUBY_ORE =
        BLOCKS.registerBlock("ruby_ore",
            Block::new,
            BlockBehaviour.Properties.of()
                .mapColor(MapColor.STONE)
                .requiresCorrectToolForDrops()
                .strength(3.0f, 3.0f)
        );

    // 深层矿石
    public static final DeferredBlock<Block> DEEPSLATE_RUBY_ORE =
        BLOCKS.registerBlock("deepslate_ruby_ore",
            Block::new,
            BlockBehaviour.Properties.of()
                .mapColor(MapColor.DEEPSLATE)
                .requiresCorrectToolForDrops()
                .strength(4.5f, 3.0f)
                .sound(SoundType.DEEPSLATE)
        );
}
```

### 矿石掉落

```json
// data/mymod/loot_table/blocks/ruby_ore.json
{
    "type": "minecraft:block",
    "pools": [{
        "rolls": 1,
        "entries": [{
            "type": "minecraft:item",
            "name": "mymod:ruby"
        }],
        "functions": [
            {
                "function": "minecraft:apply_bonus",
                "enchantment": "minecraft:fortune",
                "formula": "minecraft:ore_drops"
            },
            {
                "function": "minecraft:explosion_decay"
            }
        ]
    }]
}
```

## 自定义方块

### 有状态方块

```java
public class CustomBlock extends Block {
    public CustomBlock(Properties properties) {
        super(properties);
    }

    @Override
    public InteractionResult use(
            BlockState state, Level level, BlockPos pos,
            Player player, InteractionHand hand, BlockHitResult hit) {

        if (!level.isClientSide) {
            // 产生粒子
            level.addParticle(
                ParticleTypes.FLAME,
                pos.getX() + 0.5, pos.getY() + 1.0, pos.getZ() + 0.5,
                0, 0.1, 0
            );
        }

        // 播放音效
        level.playSound(player, pos,
            SoundEvents.FIRECHARGE_USE,
            SoundSource.BLOCKS, 1.0f, 1.0f);

        return InteractionResult.sidedSuccess(level.isClientSide);
    }

    @Override
    public void stepOn(Level level, BlockPos pos,
            BlockState state, Entity entity) {
        // 踩踏时着火
        if (!level.isClientSide && !entity.fireImmune()) {
            entity.setRemainingFireTicks(100);
        }
    }
}
```

### 有方向方块

```java
public class DirectionalBlock extends HorizontalDirectionalBlock {
    public static final DirectionProperty FACING =
        HorizontalDirectionalBlock.FACING;

    public DirectionalBlock(Properties properties) {
        super(properties);
        this.registerDefaultState(
            this.stateDefinition.any()
                .setValue(FACING, Direction.NORTH));
    }

    @Override
    public BlockState getStateForPlacement(BlockPlaceContext context) {
        return this.defaultBlockState()
            .setValue(FACING, context.getHorizontalDirection().getOpposite());
    }

    @Override
    protected void createBlockStateDefinition(
            StateDefinition.Builder<Block, BlockState> builder) {
        builder.add(FACING);
    }
}
```

## 世界生成

### 矿石生成

```java
// 使用数据生成添加矿石
public class ModWorldGen {
    @SubscribeEvent
    public static void onBiomeModification(
            BiomeModificationEvent event) {
        // 在 Overworld 添加矿石
        event.add(GenerationStep.Decoration.UNDERGROUND_ORES,
            (context) -> context.getKey().location().getPath().equals("overworld"),
            (context) -> {
                // 定义矿石生成参数
                var ruleTest = new RuleTest() {
                    @Override
                    public boolean test(BlockState state, RandomSource random) {
                        return state.is(Blocks.STONE);
                    }

                    @Override
                    protected RuleTestType<?> getType() {
                        return RuleTestType.ALWAYS_TRUE;
                    }
                };

                var target = new RuleTestBlockStateModifier(
                    ruleTest, Blocks.AIR.defaultBlockState());

                var configuration = new OreConfiguration(
                    List.of(OreConfiguration.target(
                        ruleTest,
                        ModBlocks.RUBY_ORE.get().defaultBlockState()
                    )),
                    8  // 矿脉大小
                );

                // 注册到世界生成
                context.addFeature(
                    GenerationStep.Decoration.UNDERGROUND_ORES,
                    OreConfiguration.create(
                        OreConfiguration.Predicates.NATURAL_STONE,
                        ModBlocks.RUBY_ORE.get().defaultBlockState(),
                        8  // 每区块尝试次数
                    )
                );
            }
        );
    }
}
```

### 在事件中注册世界生成

```java
@Mod.EventBusSubscriber(modid = MyMod.MODID, bus = Mod.EventBusSubscriber.Bus.MOD)
public class ModWorldGen {
    @SubscribeEvent
    public static void onRegisterFeatures(RegisterEvent event) {
        event.register(Registries.PLACED_FEATURE, helper -> {
            // 注册放置特征
        });
    }
}
```

## 方块实体（BlockEntity）

```java
// 方块实体类
public class ModBlockEntity extends BlockEntity {
    private int counter = 0;

    public ModBlockEntity(BlockPos pos, BlockState state) {
        super(ModBlockEntities.MOD_BLOCK_ENTITY.get(), pos, state);
    }

    public void tick() {
        if (level != null && !level.isClientSide) {
            counter++;
            if (counter % 20 == 0) {
                // 每秒执行
                level.playSound(null, worldPosition,
                    SoundEvents.NOTE_BLOCK_PLING.value(),
                    SoundSource.BLOCKS, 1.0f, 1.0f);
            }
        }
    }

    @Override
    protected void saveAdditional(CompoundTag tag) {
        super.saveAdditional(tag);
        tag.putInt("Counter", counter);
    }

    @Override
    public void load(CompoundTag tag) {
        super.load(tag);
        counter = tag.getInt("Counter");
    }
}

// 注册方块实体
public class ModBlockEntities {
    public static final DeferredRegister<BlockEntityType<?>> BLOCK_ENTITIES =
        DeferredRegister.create(Registries.BLOCK_ENTITY_TYPE, MyMod.MODID);

    public static final DeferredHolder<BlockEntityType<?>, BlockEntityType<ModBlockEntity>> MOD_BLOCK_ENTITY =
        BLOCK_ENTITIES.register("mod_block_entity",
            () -> BlockEntityType.Builder.of(
                ModBlockEntity::new,
                ModBlocks.CUSTOM_BLOCK.get()
            ).build(null));
}
```
