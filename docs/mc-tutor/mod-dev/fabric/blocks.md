# Fabric 方块注册

[官方文档](https://docs.fabricmc.net/develop/blocks)

## 基本方块

### 注册方块

```java
// ModBlocks.java
package com.example.mymod;

import net.minecraft.block.AbstractBlock;
import net.minecraft.block.Block;
import net.minecraft.block.Blocks;
import net.minecraft.item.BlockItem;
import net.minecraft.item.Item;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
import net.minecraft.sound.BlockSoundGroup;
import net.minecraft.util.Identifier;

public class ModBlocks {
    // 注册简单方块
    public static final Block RUBY_BLOCK = registerBlock("ruby_block",
        new Block(AbstractBlock.Settings.copyOf(Blocks.DIAMOND_BLOCK)
            .sounds(BlockSoundGroup.METAL)
            .strength(5.0f, 6.0f)
            .requiresTool()
        ));

    // 发光方块
    public static final Block GLOWING_BLOCK = registerBlock("glowing_block",
        new Block(AbstractBlock.Settings.copyOf(Blocks.GLASS)
            .luminance(state -> 15)
            .strength(0.5f)
        ));

    // 注册方块（不带物品）
    private static Block registerBlockWithoutItem(String name, Block block) {
        return Registry.register(Registries.BLOCK,
            Identifier.of(MyMod.MOD_ID, name), block);
    }

    // 注册方块 + 方块物品
    private static Block registerBlock(String name, Block block) {
        registerBlockItem(name, block);
        return Registry.register(Registries.BLOCK,
            Identifier.of(MyMod.MOD_ID, name), block);
    }

    // 注册方块物品
    private static void registerBlockItem(String name, Block block) {
        Registry.register(Registries.ITEM,
            Identifier.of(MyMod.MOD_ID, name),
            new BlockItem(block, new Item.Settings()));
    }

    public static void register() {
        // 确保静态初始化
    }
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

### 物品模型（方块物品）

```json
// assets/mymod/models/item/ruby_block.json
{
    "parent": "mymod:block/ruby_block"
}
```

### 战利品表

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
public static final Block RUBY_ORE = registerBlock("ruby_ore",
    new Block(AbstractBlock.Settings.copyOf(Blocks.IRON_ORE)
        .strength(3.0f, 3.0f)
        .requiresTool()
    ));

public static final Block DEEPSLATE_RUBY_ORE = registerBlock(
    "deepslate_ruby_ore",
    new Block(AbstractBlock.Settings.copyOf(
        Blocks.DEEPSLATE_IRON_ORE)
        .strength(4.5f, 3.0f)
        .sounds(BlockSoundGroup.DEEPSLATE)
        .requiresTool()
    ));
```

### 矿词标签 (Tags)

将矿石添加到对应标签中，让镐子能正确挖掘：

```java
// 在 ModItemGroups 或单独的 Tag 类中
public class ModTags {
    public static final TagKey<Block> RUBY_ORES = TagKey.of(
        RegistryKeys.BLOCK, Identifier.of(MyMod.MOD_ID, "ruby_ores"));
}

// 添加到原版标签
public class ModBlockTags {
    public static void init() {
        // 使用 Fabric API 的 Tag API
    }
}
```

```json
// data/mymod/tags/block/ruby_ores.json
{
    "replace": false,
    "values": [
        "mymod:ruby_ore",
        "mymod:deepslate_ruby_ore"
    ]
}

// data/minecraft/tags/block/needs_iron_tool.json
{
    "replace": false,
    "values": [
        "mymod:ruby_ore",
        "mymod:deepslate_ruby_ore"
    ]
}

// data/minecraft/tags/block/mineable/pickaxe.json
{
    "replace": false,
    "values": [
        "mymod:ruby_ore"
    ]
}
```

### 矿石战利品表

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

## 自定义方块行为

### 右键交互

```java
public class CustomBlock extends Block {
    public CustomBlock(Settings settings) {
        super(settings);
    }

    @Override
    public ActionResult onUse(BlockState state, World world,
                              BlockPos pos, PlayerEntity player,
                              BlockHitResult hit) {
        if (!world.isClient) {
            // 产生火焰粒子
            world.addParticle(
                ParticleTypes.FLAME,
                pos.getX() + 0.5, pos.getY() + 1.0, pos.getZ() + 0.5,
                0, 0.1, 0
            );
        }

        player.playSound(SoundEvents.ENTITY_FIREWORK_ROCKET_USE,
            1.0f, 1.0f);

        return ActionResult.success(world.isClient);
    }

    @Override
    public void onSteppedOn(World world, BlockPos pos,
                            BlockState state, Entity entity) {
        // 踩踏时着火
        if (!world.isClient && !entity.isFireImmune()) {
            entity.setOnFireFor(5);
        }
    }
}
```

### 有方向方块

```java
public class DirectionalBlock extends HorizontalFacingBlock {
    public DirectionalBlock(Settings settings) {
        super(settings);
        setDefaultState(getStateManager().getDefaultState()
            .with(FACING, Direction.NORTH));
    }

    @Override
    public BlockState getPlacementState(ItemPlacementContext ctx) {
        return getDefaultState().with(FACING,
            ctx.getHorizontalPlayerFacing().getOpposite());
    }

    @Override
    protected void appendProperties(StateManager.Builder<Block, BlockState> builder) {
        builder.add(FACING);
    }
}
```

## 方块变体

### 楼梯、台阶、栅栏、门（木材全套）

```java
// ModBlocks.java — 全套方块变体
public class ModBlocks {
    // 基础方块
    public static final Block RUBY_BLOCK = registerBlock("ruby_block", ...);

    // 楼梯 (Stairs)
    public static final Block RUBY_STAIRS = registerBlock("ruby_stairs",
        new StairsBlock(RUBY_BLOCK.getDefaultState(),
            AbstractBlock.Settings.copyOf(RUBY_BLOCK)));

    // 台阶 (Slab)
    public static final Block RUBY_SLAB = registerBlock("ruby_slab",
        new SlabBlock(AbstractBlock.Settings.copyOf(RUBY_BLOCK)));

    // 栅栏 (Fence)
    public static final Block RUBY_FENCE = registerBlock("ruby_fence",
        new FenceBlock(AbstractBlock.Settings.copyOf(RUBY_BLOCK)));

    // 栅栏门 (Fence Gate)
    public static final Block RUBY_FENCE_GATE = registerBlock("ruby_fence_gate",
        new FenceGateBlock(WoodType.OAK,
            AbstractBlock.Settings.copyOf(RUBY_BLOCK)));

    // 墙 (Wall)
    public static final Block RUBY_WALL = registerBlock("ruby_wall",
        new WallBlock(AbstractBlock.Settings.copyOf(RUBY_BLOCK)));

    // 按钮 (Button) — 木按钮或石按钮
    public static final Block RUBY_BUTTON = registerBlock("ruby_button",
        new ButtonBlock(BlockSetType.IRON, 20,
            AbstractBlock.Settings.copyOf(RUBY_BLOCK)));

    // 压力板 (Pressure Plate)
    public static final Block RUBY_PRESSURE_PLATE = registerBlock("ruby_pressure_plate",
        new PressurePlateBlock(BlockSetType.IRON,
            AbstractBlock.Settings.copyOf(RUBY_BLOCK)));

    // 门 (Door)
    public static final Block RUBY_DOOR = registerBlockWithoutItem("ruby_door",
        new DoorBlock(BlockSetType.IRON,
            AbstractBlock.Settings.copyOf(RUBY_BLOCK).nonOpaque()));
    // 注意：门需要单独注册物品 (BlockItem)，且方块模型使用 door_bottom/ door_top

    // 活板门 (Trapdoor)
    public static final Block RUBY_TRAPDOOR = registerBlock("ruby_trapdoor",
        new TrapdoorBlock(BlockSetType.IRON,
            AbstractBlock.Settings.copyOf(RUBY_BLOCK).nonOpaque()));
}
```

### 模型文件示例

```json
// assets/mymod/models/block/ruby_stairs.json
{
    "parent": "minecraft:block/stairs",
    "textures": {
        "bottom": "mymod:block/ruby_block",
        "side": "mymod:block/ruby_block",
        "top": "mymod:block/ruby_block"
    }
}

// assets/mymod/models/block/ruby_slab.json
{
    "parent": "minecraft:block/slab",
    "textures": {
        "bottom": "mymod:block/ruby_block",
        "side": "mymod:block/ruby_block",
        "top": "mymod:block/ruby_block"
    }
}
```

## 自定义碰撞箱

使用 `VoxelShape` 定义方块的碰撞和选取形状：

```java
public class CustomChairBlock extends Block {
    // 定义形状：底部一个半砖大小的方块
    private static final VoxelShape SHAPE = VoxelShapes.cuboid(
        0.0, 0.0, 0.0,  // 起始坐标 (x1, y1, z1)
        1.0, 0.5, 1.0   // 结束坐标 (x2, y2, z2)
    );

    public CustomChairBlock(Settings settings) {
        super(settings);
    }

    @Override
    public VoxelShape getOutlineShape(BlockState state, BlockView world,
                                       BlockPos pos, ShapeContext context) {
        return SHAPE;
    }

    @Override
    public VoxelShape getCollisionShape(BlockState state, BlockView world,
                                        BlockPos pos, ShapeContext context) {
        return SHAPE;
    }
}
```

多面体组合（如椅子带靠背）：

```java
private static final VoxelShape CHAIR_SHAPE = VoxelShapes.union(
    VoxelShapes.cuboid(0.0, 0.0, 0.0, 1.0, 0.5, 1.0),  // 坐垫
    VoxelShapes.cuboid(0.8, 0.0, 0.2, 1.0, 0.8, 0.8)   // 靠背
);
```

## 带物品栏的方块实体 (Inventory BlockEntity)

```java
public class ModInventoryBlockEntity extends BlockEntity
        implements ImplementedInventory {  // Fabric API 接口
    private final SimpleInventory inventory = new SimpleInventory(9); // 9 格

    public ModInventoryBlockEntity(BlockPos pos, BlockState state) {
        super(ModBlockEntities.INVENTORY_BLOCK_ENTITY, pos, state);
    }

    @Override
    protected void writeNbt(NbtCompound nbt) {
        super.writeNbt(nbt);
        inventory.writeNbtList(nbt);  // 保存物品到 NBT
    }

    @Override
    public void readNbt(NbtCompound nbt) {
        super.readNbt(nbt);
        inventory.readNbtList(nbt);   // 从 NBT 读取物品
    }

    // 创建方块实体时调用
    public static BlockEntity create(BlockPos pos, BlockState state) {
        return new ModInventoryBlockEntity(pos, state);
    }
}
```

配合方块右键打开 GUI：

```java
public class InventoryBlock extends BlockWithEntity {
    // ...

    @Override
    public ActionResult onUse(BlockState state, World world, BlockPos pos,
                              PlayerEntity player, BlockHitResult hit) {
        if (!world.isClient) {
            // 打开箱子式界面
            NamedScreenHandlerFactory screenHandlerFactory =
                state.createScreenHandlerFactory(world, pos);
            if (screenHandlerFactory != null) {
                player.openHandledScreen(screenHandlerFactory);
            }
        }
        return ActionResult.success(world.isClient);
    }

    @Override
    public BlockEntity createBlockEntity(BlockPos pos, BlockState state) {
        return new ModInventoryBlockEntity(pos, state);
    }

    @Override
    public BlockRenderType getRenderType(BlockState state) {
        return BlockRenderType.MODEL;  // 正常渲染
    }
}
```

## 方块实体（BlockEntity）

```java
// 方块实体类
public class ModBlockEntity extends BlockEntity {
    private int counter = 0;

    public ModBlockEntity(BlockPos pos, BlockState state) {
        super(ModBlockEntities.MOD_BLOCK_ENTITY, pos, state);
    }

    public static void tick(World world, BlockPos pos,
                            BlockState state, ModBlockEntity be) {
        if (!world.isClient) {
            be.counter++;
            if (be.counter % 20 == 0) {
                world.playSound(null, pos,
                    SoundEvents.BLOCK_NOTE_BLOCK_PLING.value(),
                    SoundCategory.BLOCKS, 1.0f, 1.0f);
            }
        }
    }

    @Override
    protected void writeNbt(NbtCompound nbt) {
        super.writeNbt(nbt);
        nbt.putInt("counter", counter);
    }

    @Override
    public void readNbt(NbtCompound nbt) {
        super.readNbt(nbt);
        counter = nbt.getInt("counter");
    }
}

// 注册方块实体
public class ModBlockEntities {
    public static final BlockEntityType<ModBlockEntity> MOD_BLOCK_ENTITY =
        Registry.register(
            Registries.BLOCK_ENTITY_TYPE,
            Identifier.of(MyMod.MOD_ID, "mod_block_entity"),
            BlockEntityType.Builder.create(
                ModBlockEntity::new,
                ModBlocks.CUSTOM_BLOCK
            ).build()
        );

    public static void register() {
        // 确保静态初始化
    }
}
```

## 世界生成

### 矿石生成（Fabric API）

```java
public class ModWorldGen {
    public static void register() {
        // 注册矿石生成
        Registry.register(
            Registries.PLACED_FEATURE,
            Identifier.of(MyMod.MOD_ID, "ruby_ore_placed"),
            ModOreFeatures.RUBY_ORE_PLACED
        );

        // 添加到生物群系
        BiomeModifications.addFeature(
            BiomeSelectors.foundInOverworld(),
            GenerationStep.Feature.UNDERGROUND_ORES,
            RegistryKey.of(
                RegistryKeys.PLACED_FEATURE,
                Identifier.of(MyMod.MOD_ID, "ruby_ore_placed")
            )
        );
    }
}
```

### 配置特征

```java
public class ModOreFeatures {
    public static final ConfiguredFeature<?, ?> RUBY_ORE_CONFIGURED =
        new ConfiguredFeature<>(
            Feature.ORE,
            new OreFeatureConfig(
                OreConfiguredFeatures.STONE_ORE_REPLACEABLES,
                ModBlocks.RUBY_ORE.getDefaultState(),
                8  // 矿脉大小
            )
        );

    public static final PlacedFeature RUBY_ORE_PLACED =
        new PlacedFeature(
            RegistryEntry.of(RUBY_ORE_CONFIGURED),
            List.of(
                CountPlacementModifier.of(10),    // 每区块尝试次数
                HeightRangePlacementModifier.uniform(
                    VerticalAnchor.absolute(-64),
                    VerticalAnchor.absolute(40)
                )
            )
        );
}
```
