# NeoForge 高级配方

[官方文档](https://docs.neoforged.net/docs/recipes/)

## 配方类型

NeoForge 支持 Minecraft 所有原版配方类型，并可以创建自定义配方。

## 自定义配方序列化器

### 定义配方

```java
// RubyForgeRecipe.java — 自定义合成配方
public class RubyForgeRecipe implements Recipe<RecipeInput> {
    private final Ingredient inputIngredient;
    private final ItemStack result;
    private final int processTime;

    public RubyForgeRecipe(Ingredient input, ItemStack result, int processTime) {
        this.inputIngredient = input;
        this.result = result;
        this.processTime = processTime;
    }

    public Ingredient getInput() { return inputIngredient; }
    public int getProcessTime() { return processTime; }

    @Override
    public boolean matches(RecipeInput input, Level level) {
        return inputIngredient.test(input.getItem(0));
    }

    @Override
    public ItemStack assemble(RecipeInput input, HolderLookup<?> lookup) {
        return result.copy();
    }

    @Override
    public boolean canCraftInDimensions(int w, int h) {
        return true;
    }

    @Override
    public ItemStack getResultItem(HolderLookup<?> lookup) {
        return result;
    }

    @Override
    public RecipeSerializer<?> getSerializer() {
        return ModRecipeSerializers.RUBY_FORGE.get();
    }

    @Override
    public RecipeType<?> getType() {
        return ModRecipeTypes.RUBY_FORGE.get();
    }
}
```

### 配方序列化器

```java
// ModRecipeSerializers.java
public class ModRecipeSerializers {
    public static final DeferredRegister<RecipeSerializer<?>> SERIALIZERS =
        DeferredRegister.create(Registries.RECIPE_SERIALIZER, MyMod.MODID);

    public static final DeferredHolder<RecipeSerializer<?>, RecipeSerializer<RubyForgeRecipe>> RUBY_FORGE =
        SERIALIZERS.register("ruby_forge", RubyForgeRecipeSerializer::new);

    public static void register(IEventBus bus) {
        SERIALIZERS.register(bus);
    }
}

// RubyForgeRecipeSerializer.java
public class RubyForgeRecipeSerializer implements RecipeSerializer<RubyForgeRecipe> {

    @Override
    public Codec<RubyForgeRecipe> codec() {
        return RecordCodecBuilder.create(instance -> instance.group(
            Ingredient.CODEC.fieldOf("ingredient").forGetter(RubyForgeRecipe::getInput),
            ItemStack.CODEC.fieldOf("result").forGetter(r -> r.getResultItem(null)),
            Codec.INT.fieldOf("processTime").forGetter(RubyForgeRecipe::getProcessTime)
        ).apply(instance, RubyForgeRecipe::new));
    }

    @Override
    public StreamCodec<ByteBuf, RubyForgeRecipe> streamCodec() {
        return StreamCodec.composite(
            Ingredient.CONTENTS_STREAM_CODEC, RubyForgeRecipe::getInput,
            ItemStack.STREAM_CODEC, r -> r.getResultItem(null),
            ByteBufCodecs.VAR_INT, RubyForgeRecipe::getProcessTime,
            RubyForgeRecipe::new
        );
    }
}
```

### 配方类型

```java
// ModRecipeTypes.java
public class ModRecipeTypes {
    public static final DeferredRegister<RecipeType<?>> RECIPE_TYPES =
        DeferredRegister.create(Registries.RECIPE_TYPE, MyMod.MODID);

    public static final DeferredHolder<RecipeType<?>, RecipeType<RubyForgeRecipe>> RUBY_FORGE =
        RECIPE_TYPES.register("ruby_forge", 
            () -> new RecipeType<>() {
                @Override
                public String toString() {
                    return "mymod:ruby_forge";
                }
            });

    public static void register(IEventBus bus) {
        RECIPE_TYPES.register(bus);
    }
}
```

## 炉灶配方

### 篝火配方

```java
// 可烹饪食物在篝火上
ShapedRecipeBuilder.shaped(RecipeCategory.FOOD, ModItems.COOKED_RUBY.get())
    .pattern(" R ")
    .pattern(" S ")
    .define('R', ModItems.RAW_RUBY.get())
    .define('S', Items.STICK)
    .unlockedBy("has_raw_ruby", has(ModItems.RAW_RUBY.get()))
    .save(output);
```

### 烟熏炉配方（2×速度）

```java
SimpleCookingRecipeBuilder.smoking(
        Ingredient.of(ModItems.RAW_RUBY.get()),
        RecipeCategory.FOOD,
        ModItems.COOKED_RUBY.get(),
        0.5f, 100)
    .unlockedBy("has_raw_ruby", has(ModItems.RAW_RUBY.get()))
    .save(output, "cooked_ruby_from_smoking");
```

### 营火配方（3×时间，可多人共用）

```java
SimpleCookingRecipeBuilder.campfireCooking(
        Ingredient.of(ModItems.RAW_RUBY.get()),
        RecipeCategory.FOOD,
        ModItems.COOKED_RUBY.get(),
        0.5f, 600)
    .unlockedBy("has_raw_ruby", has(ModItems.RAW_RUBY.get()))
    .save(output);
```

## 切石机与锻造

### 切石机配方

```java
StonecutterRecipeBuilder.stonecutter(
        Ingredient.of(ModBlocks.RUBY_BLOCK.get()),
        RecipeCategory.BUILDING_BLOCKS,
        ModBlocks.RUBY_STAIRS.get(), 1)
    .unlockedBy("has_ruby_block", has(ModBlocks.RUBY_BLOCK.get()))
    .save(output);

// 多个切石机输出
for (int i = 1; i <= 3; i++) {
    StonecutterRecipeBuilder.stonecutter(
            Ingredient.of(ModBlocks.RUBY_BLOCK.get()),
            RecipeCategory.BUILDING_BLOCKS,
            ModBlocks.RUBY_SLAB.get(), i * 2)
        .unlockedBy("has_ruby_block", has(ModBlocks.RUBY_BLOCK.get()))
        .save(output, "ruby_slab_" + i);
}
```

### 锻造台配方

```java
// 下界合金升级样式配方
SmithingTransformRecipeBuilder.smithing(
        Ingredient.of(Items.NETHERITE_UPGRADE_SMITHING_TEMPLATE),
        Ingredient.of(Items.DIAMOND_SWORD),
        Ingredient.of(ModItems.RUBY.get()),
        RecipeCategory.COMBAT,
        ModItems.RUBY_SWORD.get().asItem().getDefaultInstance())
    .unlocks("has_ruby", has(ModItems.RUBY.get()))
    .save(output, "ruby_sword_smithing");

// 模板复制配方
SmithingTrimRecipeBuilder.smithingTrim(
        Ingredient.of(ModItems.RUBY_UPGRADE_TEMPLATE.get()),
        Ingredient.of(Items.DIAMOND),
        Ingredient.of(Items.STONE),
        RecipeCategory.MISC)
    .unlocks("has_template", has(ModItems.RUBY_UPGRADE_TEMPLATE.get()))
    .save(output, "ruby_trim_template");
```

## 药水配方

```java
// 酿造配方
public class ModPotionRecipes {
    @SubscribeEvent
    public static void onRegisterBrewingRecipes(
            RegisterBrewingRecipesEvent event) {
        ItemStack input = PotionUtils.setPotion(
            new ItemStack(Items.POTION), Potions.AWKWARD);
        Ingredient ingredient = Ingredient.of(ModItems.RUBY.get());
        ItemStack output = PotionUtils.setPotion(
            new ItemStack(Items.POTION), ModPotions.RUBY_POWER.get());

        event.getBuilder().addMix(input, ingredient, output);
    }
}
```

## 条件配方

```java
// 按条件启用的配方
ShapedRecipeBuilder.shaped(RecipeCategory.MISC, ModItems.RUBY_BLOCK.get())
    .pattern("###")
    .pattern("###")
    .pattern("###")
    .define('#', ModItems.RUBY.get())
    .unlockedBy("has_ruby", has(ModItems.RUBY.get()))
    .save(conditionalOutput -> {
        // 仅在某个 MOD 加载时启用
        conditionalOutput.accept(
            new ConditionalRecipe(
                List.of(new ModLoadedCondition("mymod")),
                output
            ),
            MyMod.MODID + ":ruby_block_conditional"
        );
    });
```

## 完整配方示例：机器配方

```java
// 自定义机器配方 — 适用于 BlockEntity 机器
@Override
protected void buildRecipes(RecipeOutput output) {
    // 1. 输入 8 个圆石 + 1 个红宝石 = 1 个红石块
    ShapedRecipeBuilder.shaped(RecipeCategory.BUILDING_BLOCKS, 
            ModBlocks.RUBY_BLOCK.get())
        .pattern("RRR")
        .pattern("RCR")
        .pattern("RRR")
        .define('R', Items.COBBLESTONE)
        .define('C', ModItems.RUBY.get())
        .unlockedBy("has_ruby", has(ModItems.RUBY.get()))
        .save(output);

    // 2. 机器利用配方 — 自定义配方类型
    output.accept(
        new RubyForgeRecipe(
            Ingredient.of(Items.IRON_INGOT),
            new ItemStack(ModItems.STEEL_INGOT.get()),
            100  // 处理时间 100 tick
        ),
        ResourceLocation.fromNamespaceAndPath(MyMod.MODID, 
            "steel_ingot_from_ruby_forge")
    );

    // 3. 多输入配方
    output.accept(
        new RubyForgeRecipe(
            Ingredient.of(Items.GOLD_INGOT, Items.NETHERITE_SCRAP),
            new ItemStack(ModItems.REINFORCED_INGOT.get()),
            200
        ),
        ResourceLocation.fromNamespaceAndPath(MyMod.MODID, 
            "reinforced_ingot")
    );
}
```

## 配方书分类

```java
// 将自定义配方添加到配方书中
public class ModRecipeCategories {
    public static void register() {
        // 注册自定义配方分类
        // RecipeBook 分类在客户端和服务端同步
    }
}
```

## JSON 配方示例

```json
{
    "type": "mymod:ruby_forge",
    "ingredient": {
        "item": "minecraft:iron_ingot"
    },
    "result": {
        "id": "mymod:steel_ingot",
        "count": 1
    },
    "processTime": 100
}
```
