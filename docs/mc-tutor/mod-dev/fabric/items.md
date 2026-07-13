# Fabric 物品注册

[官方文档](https://docs.fabricmc.net/develop/items)

## 基本物品

### 注册物品

```java
// ModItems.java
package com.example.mymod;

import net.fabricmc.fabric.api.itemgroup.v1.ItemGroupEvents;
import net.minecraft.item.Item;
import net.minecraft.item.ItemGroups;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
import net.minecraft.util.Identifier;

public class ModItems {
    // 注册简单物品
    public static final Item RUBY = registerItem("ruby",
        new Item(new Item.Settings()));

    public static final Item SAPPHIRE = registerItem("sapphire",
        new Item(new Item.Settings().maxCount(16))); // 堆叠数

    public static final Item CUSTOM_ITEM = registerItem("custom_item",
        new Item(new Item.Settings()
            .maxCount(1)
            .maxDamage(256)
            .fireproof()));   // 防火

    // 注册方法
    private static Item registerItem(String name, Item item) {
        return Registry.register(Registries.ITEM,
            Identifier.of(MyMod.MOD_ID, name), item);
    }

    // 注册所有物品
    public static void register() {
        // 添加到物品组
        ItemGroupEvents.modifyEntriesEvent(ItemGroups.INGREDIENTS)
            .register(content -> {
                content.add(RUBY);
                content.add(SAPPHIRE);
            });
    }
}
```

### 语言文件

```json
// assets/mymod/lang/en_us.json
{
    "item.mymod.ruby": "Ruby",
    "item.mymod.sapphire": "Sapphire",
    "item.mymod.custom_item": "Custom Item",
    "itemgroup.mymod": "My Mod"
}
```

```json
// assets/mymod/lang/zh_cn.json
{
    "item.mymod.ruby": "红宝石",
    "item.mymod.sapphire": "蓝宝石",
    "item.mymod.custom_item": "自定义物品",
    "itemgroup.mymod": "我的模组"
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

## 工具

### 注册工具材料

```java
public class ModToolMaterials {
    public static final ToolMaterial RUBY = new ToolMaterial(
        Tags.Blocks.INCORRECT_FOR_DIAMOND_TOOL, // 挖掘等级
        1800,        // 耐久
        9.0f,        // 挖掘速度
        4.0f,        // 攻击伤害加成
        15,          // 附魔等级
        ModTags.Items.RUBY_REPAIR // 修复材料
    );
}
```

### 注册工具

```java
public static final Item RUBY_SWORD = registerItem("ruby_sword",
    new SwordItem(ModToolMaterials.RUBY,
        new Item.Settings()
            .attributeModifiers(SwordItem.createAttributeModifiers(
                ModToolMaterials.RUBY, 3, -2.4f))
    ));

public static final Item RUBY_PICKAXE = registerItem("ruby_pickaxe",
    new PickaxeItem(ModToolMaterials.RUBY,
        new Item.Settings()
            .attributeModifiers(PickaxeItem.createAttributeModifiers(
                ModToolMaterials.RUBY, 1, -2.8f))
    ));

public static final Item RUBY_AXE = registerItem("ruby_axe",
    new AxeItem(ModToolMaterials.RUBY,
        new Item.Settings()
            .attributeModifiers(AxeItem.createAttributeModifiers(
                ModToolMaterials.RUBY, 6, -3.0f))
    ));

public static final Item RUBY_SHOVEL = registerItem("ruby_shovel",
    new ShovelItem(ModToolMaterials.RUBY,
        new Item.Settings()
            .attributeModifiers(ShovelItem.createAttributeModifiers(
                ModToolMaterials.RUBY, 1.5f, -3.0f))
    ));

public static final Item RUBY_HOE = registerItem("ruby_hoe",
    new HoeItem(ModToolMaterials.RUBY,
        new Item.Settings()
            .attributeModifiers(HoeItem.createAttributeModifiers(
                ModToolMaterials.RUBY, 0, -3.0f))
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
        SoundEvents.ITEM_ARMOR_EQUIP_DIAMOND,
        () -> Ingredient.ofItems(ModItems.RUBY),
        List.of(new ArmorMaterial.Layer(
            Identifier.of(MyMod.MOD_ID, "ruby"))),
        0.0f, 0.0f
    );
}
```

### 注册盔甲

```java
public static final Item RUBY_HELMET = registerItem("ruby_helmet",
    new ArmorItem(ModArmorMaterials.RUBY, ArmorItem.Type.HELMET,
        new Item.Settings()
            .attributeModifiers(ArmorItem.createAttributeModifiers(
                ModArmorMaterials.RUBY, ArmorItem.Type.HELMET))
    ));

public static final Item RUBY_CHESTPLATE = registerItem("ruby_chestplate",
    new ArmorItem(ModArmorMaterials.RUBY, ArmorItem.Type.CHESTPLATE,
        new Item.Settings()
            .attributeModifiers(ArmorItem.createAttributeModifiers(
                ModArmorMaterials.RUBY, ArmorItem.Type.CHESTPLATE))
    ));

public static final Item RUBY_LEGGINGS = registerItem("ruby_leggings",
    new ArmorItem(ModArmorMaterials.RUBY, ArmorItem.Type.LEGGINGS,
        new Item.Settings()
            .attributeModifiers(ArmorItem.createAttributeModifiers(
                ModArmorMaterials.RUBY, ArmorItem.Type.LEGGINGS))
    ));

public static final Item RUBY_BOOTS = registerItem("ruby_boots",
    new ArmorItem(ModArmorMaterials.RUBY, ArmorItem.Type.BOOTS,
        new Item.Settings()
            .attributeModifiers(ArmorItem.createAttributeModifiers(
                ModArmorMaterials.RUBY, ArmorItem.Type.BOOTS))
    ));
```

## 食物

```java
public static final Item CHEESE = registerItem("cheese",
    new Item(new Item.Settings()
        .food(new FoodComponent.Builder()
            .nutrition(6)
            .saturationModifier(0.8f)
            .alwaysEdible()
            .statusEffect(new StatusEffectInstance(
                StatusEffects.REGENERATION, 100, 0), 1.0f)
            .build()
        )
    ));
```

## 自定义物品行为

### 右键交互

```java
public class MagicWandItem extends Item {
    public MagicWandItem(Settings settings) {
        super(settings);
    }

    @Override
    public ActionResult use(World world, PlayerEntity player,
                            Hand hand) {
        ItemStack stack = player.getStackInHand(hand);

        if (!world.isClient) {
            Vec3d lookVec = player.getRotationVector();
            double x = player.getX() + lookVec.x * 10;
            double y = player.getEyeY() + lookVec.y * 10;
            double z = player.getZ() + lookVec.z * 10;

            // 产生爆炸
            world.createExplosion(player, x, y, z,
                3.0f, World.ExplosionSourceType.MOB);

            // 消耗耐久
            stack.damage(1, player, EquipmentSlot.MAINHAND);
        }

        player.playSound(SoundEvents.ENTITY_FIREWORK_ROCKET_USE,
            1.0f, 1.0f);

        return ActionResult.success(world.isClient);
    }
}
```

## 合成配方

### 有序合成

```json
// data/mymod/recipe/ruby.json
{
    "type": "minecraft:crafting_shaped",
    "pattern": [
        "###",
        "###",
        "###"
    ],
    "key": {
        "#": { "item": "mymod:ruby" }
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
    "ingredients": [
        { "item": "mymod:ruby_block" }
    ],
    "result": {
        "id": "mymod:ruby",
        "count": 9
    }
}
```

## 自定义物品组

```java
// ModItemGroups.java
package com.example.mymod;

import net.fabricmc.fabric.api.itemgroup.v1.FabricItemGroup;
import net.minecraft.item.ItemGroup;
import net.minecraft.item.ItemStack;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
import net.minecraft.text.Text;
import net.minecraft.util.Identifier;

public class ModItemGroups {
    public static final ItemGroup MY_GROUP = FabricItemGroup.builder()
        .icon(() -> new ItemStack(ModItems.RUBY))
        .displayName(Text.translatable("itemgroup.mymod"))
        .entries((context, entries) -> {
            entries.add(ModItems.RUBY);
            entries.add(ModItems.SAPPHIRE);
            entries.add(ModItems.RUBY_SWORD);
            entries.add(ModItems.RUBY_PICKAXE);
            entries.add(ModItems.RUBY_AXE);
            entries.add(ModItems.RUBY_SHOVEL);
            entries.add(ModItems.RUBY_HOE);
            entries.add(ModItems.RUBY_HELMET);
            entries.add(ModItems.RUBY_CHESTPLATE);
            entries.add(ModItems.RUBY_LEGGINGS);
            entries.add(ModItems.RUBY_BOOTS);
        })
        .build();

    public static void register() {
        Registry.register(Registries.ITEM_GROUP,
            Identifier.of(MyMod.MOD_ID, "mymod"), MY_GROUP);
    }
}
```
