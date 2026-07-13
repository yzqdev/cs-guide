# NeoForge 物品注册

[官方文档](https://docs.neoforged.net/docs/items/)

## 基本物品

### 注册物品

```java
// ModItems.java
package com.example.mymod;

import net.neoforged.neoforge.registries.DeferredItem;
import net.neoforged.neoforge.registries.DeferredRegister;
import net.minecraft.world.item.Item;
import net.minecraft.core.registries.Registries;

public class ModItems {
    // 创建 DeferredRegister
    public static final DeferredRegister.Items ITEMS =
        DeferredRegister.createItems(MyMod.MODID);

    // 注册简单物品
    public static final DeferredItem<Item> RUBY =
        ITEMS.registerSimpleItem("ruby");

    public static final DeferredItem<Item> SAPPHIRE =
        ITEMS.registerSimpleItem("sapphire",
            new Item.Properties().stacksTo(16)); // 限制堆叠数

    // 注册带自定义属性的物品
    public static final DeferredItem<Item> CUSTOM_ITEM =
        ITEMS.register("custom_item",
            () -> new Item(new Item.Properties()
                .stacksTo(1)
                .durability(256)
                .fireResistant() // 防火
            ));
}
```

### 语言文件

```json
// assets/mymod/lang/en_us.json
{
    "item.mymod.ruby": "Ruby",
    "item.mymod.sapphire": "Sapphire",
    "item.mymod.custom_item": "Custom Item",
    "creativetab.mymod.tab": "My Mod Tab"
}
```

```json
// assets/mymod/lang/zh_cn.json
{
    "item.mymod.ruby": "红宝石",
    "item.mymod.sapphire": "蓝宝石",
    "item.mymod.custom_item": "自定义物品",
    "creativetab.mymod.tab": "我的模组"
}
```

### 物品模型

```json
// assets/mymod/models/item/ruby.json
{
    "parent": "item/generated",
    "textures": {
        "layer0": "mymod:item/ruby"
    }
}
```

### 物品贴图

```text
贴图位置：assets/mymod/textures/item/ruby.png
推荐大小：16×16 像素
```

## 工具

### 注册工具

```java
// 先定义工具等级
public class ModToolTiers {
    public static final Tier RUBY = new SimpleTier(
        4,                    // 挖掘等级（4=钻石级）
        1800,                 // 耐久
        9.0f,                 // 挖掘速度
        4.0f,                 // 攻击伤害加成
        15,                   // 附魔等级
        BuiltInRegistries.ITEM.getTag(ModTags.Items.RUBY_TOOL),
        // 修复材料
        () -> Ingredient.of(ModItems.RUBY)
    );
}

// 注册工具
public static final DeferredItem<SwordItem> RUBY_SWORD =
    ITEMS.register("ruby_sword",
        () -> new SwordItem(ModToolTiers.RUBY,
            new Item.Properties()
                .attributes(SwordItem.createAttributes(ModToolTiers.RUBY, 3, -2.4f))
        ));

public static final DeferredItem<PickaxeItem> RUBY_PICKAXE =
    ITEMS.register("ruby_pickaxe",
        () -> new PickaxeItem(ModToolTiers.RUBY,
            new Item.Properties()
                .attributes(PickaxeItem.createAttributes(ModToolTiers.RUBY, 1, -2.8f))
        ));

public static final DeferredItem<AxeItem> RUBY_AXE =
    ITEMS.register("ruby_axe",
        () -> new AxeItem(ModToolTiers.RUBY,
            new Item.Properties()
                .attributes(AxeItem.createAttributes(ModToolTiers.RUBY, 6, -3.0f))
        ));

public static final DeferredItem<ShovelItem> RUBY_SHOVEL =
    ITEMS.register("ruby_shovel",
        () -> new ShovelItem(ModToolTiers.RUBY,
            new Item.Properties()
                .attributes(ShovelItem.createAttributes(ModToolTiers.RUBY, 1.5f, -3.0f))
        ));

public static final DeferredItem<HoeItem> RUBY_HOE =
    ITEMS.register("ruby_hoe",
        () -> new HoeItem(ModToolTiers.RUBY,
            new Item.Properties()
                .attributes(HoeItem.createAttributes(ModToolTiers.RUBY, 0, -3.0f))
        ));
```

## 盔甲

### 注册盔甲材料

```java
public class ModArmorMaterials {
    public static final ArmorMaterial RUBY = new ArmorMaterial(
        Map.of(               // 每件护甲的保护值
            ArmorItem.Type.HELMET, 3,
            ArmorItem.Type.CHESTPLATE, 8,
            ArmorItem.Type.LEGGINGS, 6,
            ArmorItem.Type.BOOTS, 3
        ),
        15,                   // 附魔等级
        SoundEvents.ARMOR_EQUIP_DIAMOND,  // 装备音效
        () -> Ingredient.of(ModItems.RUBY), // 修复材料
        List.of(              // 免伤属性
            new ArmorMaterial.Layer(MyMod.MODID, "ruby")
        ),
        0.0f,                 // 韧性
        0.0f                  // 击退抗性
    );
}
```

### 注册盔甲

```java
public static final DeferredItem<ArmorItem> RUBY_HELMET =
    ITEMS.register("ruby_helmet",
        () -> new ArmorItem(ModArmorMaterials.RUBY, ArmorItem.Type.HELMET,
            new Item.Properties()
                .attributes(ArmorItem.createAttributes(ModArmorMaterials.RUBY, ArmorItem.Type.HELMET))
        ));

public static final DeferredItem<ArmorItem> RUBY_CHESTPLATE =
    ITEMS.register("ruby_chestplate",
        () -> new ArmorItem(ModArmorMaterials.RUBY, ArmorItem.Type.CHESTPLATE,
            new Item.Properties()
                .attributes(ArmorItem.createAttributes(ModArmorMaterials.RUBY, ArmorItem.Type.CHESTPLATE))
        ));

public static final DeferredItem<ArmorItem> RUBY_LEGGINGS =
    ITEMS.register("ruby_leggings",
        () -> new ArmorItem(ModArmorMaterials.RUBY, ArmorItem.Type.LEGGINGS,
            new Item.Properties()
                .attributes(ArmorItem.createAttributes(ModArmorMaterials.RUBY, ArmorItem.Type.LEGGINGS))
        ));

public static final DeferredItem<ArmorItem> RUBY_BOOTS =
    ITEMS.register("ruby_boots",
        () -> new ArmorItem(ModArmorMaterials.RUBY, ArmorItem.Type.BOOTS,
            new Item.Properties()
                .attributes(ArmorItem.createAttributes(ModArmorMaterials.RUBY, ArmorItem.Type.BOOTS))
        ));
```

## 食物

```java
// 自定义食物
public static final DeferredItem<Item> CHEESE =
    ITEMS.register("cheese",
        () -> new Item(new Item.Properties()
            .food(new FoodProperties.Builder()
                .nutrition(6)           // 恢复的饱食度
                .saturationModifier(0.8f) // 饱和度
                .alwaysEdible()         // 任何时候可吃
                .effect(() -> new MobEffectInstance(
                    MobEffects.REGENERATION, 100, 0), 1.0f)
                .build()
            )
        ));
```

## 自定义物品行为

### 右键交互

```java
public class MagicWandItem extends Item {
    public MagicWandItem(Properties properties) {
        super(properties);
    }

    @Override
    public InteractionResultHolder<ItemStack> use(
            Level level, Player player, InteractionHand hand) {
        ItemStack stack = player.getItemInHand(hand);

        if (!level.isClientSide) {
            // 在服务器端执行
            Vec3 lookVec = player.getLookAngle();
            double x = player.getX() + lookVec.x * 10;
            double y = player.getY() + lookVec.y * 10;
            double z = player.getZ() + lookVec.z * 10;

            // 产生爆炸效果
            level.explode(player, x, y, z, 3.0f, Level.ExplosionInteraction.MOB);

            // 消耗耐久
            stack.hurtAndBreak(1, player, EquipmentSlot.MAINHAND);
        }

        // 播放音效
        player.playSound(SoundEvents.FIRECHARGE_USE);

        return InteractionResultHolder.sidedSuccess(stack, level.isClientSide);
    }
}
```

## 合成配方

### 合成配方 JSON

```json
// data/mymod/recipe/ruby.json（有序合成）
{
    "type": "minecraft:crafting_shaped",
    "pattern": [
        "###",
        "###",
        "###"
    ],
    "key": {
        "#": {
            "item": "mymod:ruby"
        }
    },
    "result": {
        "id": "mymod:ruby_block",
        "count": 1
    }
}
```

### 无序合成

```json
// data/mymod/recipe/ruby_from_block.json
{
    "type": "minecraft:crafting_shapeless",
    "category": "misc",
    "ingredients": [
        { "item": "mymod:ruby_block" }
    ],
    "result": {
        "id": "mymod:ruby",
        "count": 9
    }
}
```

### 熔炉配方

```json
// data/mymod/recipe/ruby_from_smelting.json
{
    "type": "minecraft:smelting",
    "category": "misc",
    "cookingtime": 200,
    "experience": 1.0,
    "ingredient": {
        "item": "minecraft:diamond"
    },
    "result": {
        "id": "mymod:ruby"
    }
}
```

## 创造模式标签页

```java
// ModTabs.java
public class ModTabs {
    public static final DeferredRegister<CreativeModeTab> CREATIVE_TABS =
        DeferredRegister.create(Registries.CREATIVE_MODE_TAB, MyMod.MODID);

    public static final DeferredHolder<CreativeModeTab, CreativeModeTab> MY_TAB =
        CREATIVE_TABS.register("tab", () -> CreativeModeTab.builder()
            .title(Component.translatable("creativetab.mymod.tab"))
            .icon(() -> new ItemStack(ModItems.RUBY))
            .displayItems((params, output) -> {
                // 添加所有 MOD 物品
                output.accept(ModItems.RUBY);
                output.accept(ModItems.SAPPHIRE);
                output.accept(ModItems.RUBY_SWORD);
                output.accept(ModItems.RUBY_PICKAXE);
                // ...
            })
            .build());
}
```
