# NeoForge 流体与状态效果

## 自定义流体

### 注册流体

```java
// ModFluids.java
public class ModFluids {
    public static final DeferredRegister<Fluid> FLUIDS =
        DeferredRegister.create(Registries.FLUID, MyMod.MODID);

    // 流体类型
    public static final DeferredHolder<Fluid, FlowingFluid> RUBY_WATER =
        FLUIDS.register("ruby_water", 
            () -> new RubWaterFluid.Source());
    public static final DeferredHolder<Fluid, FlowingFluid> RUBY_WATER_FLOWING =
        FLUIDS.register("ruby_water_flowing", 
            () -> new RubWaterFluid.Flowing());

    public static void register(IEventBus bus) {
        FLUIDS.register(bus);
    }
}
```

### 流体类

```java
// RubWaterFluid.java
public abstract class RubWaterFluid extends FlowingFluid {
    @Override
    public Fluid getFlowing() {
        return ModFluids.RUBY_WATER_FLOWING.get();
    }

    @Override
    public Fluid getSource() {
        return ModFluids.RUBY_WATER.get();
    }

    @Override
    public ItemStack getBucket() {
        return new ItemStack(ModItems.RUBY_WATER_BUCKET.get());
    }

    @Override
    protected boolean canConvertToSource(Level level) {
        return false; // 不能无限生成
    }

    @Override
    protected void beforeDestroyingBlock(LevelAccessor level, BlockPos pos, 
                                          BlockState state) {
        // 流体破坏方块时触发（如灭火）
        Block.dropResources(state, level, pos, null);
    }

    @Override
    protected int getSlopeFindDistance(LevelReader level) {
        return 4; // 流体寻路距离
    }

    @Override
    protected int getDropOff(LevelReader level) {
        return 1; // 每格下降量
    }

    @Override
    protected int getTickDelay(LevelReader level) {
        return 5; // 流动速度（tick）
    }

    @Override
    protected float getExplosionResistance() {
        return 100.0f;
    }

    @Override
    protected BlockState createLegacyBlock(BlockState state) {
        return ModBlocks.RUBY_WATER_BLOCK.get().defaultBlockState()
            .setValue(LiquidBlock.LEVEL, getLegacyLevel(state));
    }

    @Override
    public boolean isSame(Fluid fluid) {
        return fluid == ModFluids.RUBY_WATER.get() 
            || fluid == ModFluids.RUBY_WATER_FLOWING.get();
    }

    // 源流体
    public static class Source extends RubWaterFluid {
        @Override
        public int getAmount(FluidState state) {
            return 8; // 源方块为 8
        }

        @Override
        public boolean isSource(FluidState state) {
            return true;
        }
    }

    // 流动流体
    public static class Flowing extends RubWaterFluid {
        @Override
        protected void createFluidStateDefinition(
                StateDefinition.Builder<Fluid, FluidState> builder) {
            super.createFluidStateDefinition(builder);
            builder.add(LEVEL);
        }

        @Override
        public int getAmount(FluidState state) {
            return state.getValue(LEVEL);
        }

        @Override
        public boolean isSource(FluidState state) {
            return false;
        }
    }
}
```

### 流体方块

```java
// ModFluidBlocks.java
public class ModFluidBlocks {
    public static final DeferredRegister.Blocks FLUID_BLOCKS =
        DeferredRegister.createBlocks(MyMod.MODID);

    public static final DeferredBlock<LiquidBlock> RUBY_WATER_BLOCK =
        FLUID_BLOCKS.register("ruby_water",
            () -> new LiquidBlock(ModFluids.RUBY_WATER.get(), 
                BlockBehaviour.Properties.of()
                    .mapColor(MapColor.COLOR_RED)
                    .noCollission()
                    .strength(100.0f)
                    .noLootTable()
                    .liquid()));

    public static void register(IEventBus bus) {
        FLUID_BLOCKS.register(bus);
    }
}
```

### 流体桶

```java
// ModItems.java 中添加桶
public static final DeferredItem<Item> RUBY_WATER_BUCKET =
    ITEMS.register("ruby_water_bucket",
        () -> new BucketItem(ModFluids.RUBY_WATER.get(),
            new Item.Properties().craftRemainder(Items.BUCKET)
                .stacksTo(1)));
```

### 流体渲染

```java
// ModFluidRenderer.java
@Mod.EventBusSubscriber(modid = MyMod.MODID, value = Dist.CLIENT,
                         bus = Mod.EventBusSubscriber.Bus.MOD)
public class ModFluidRenderer {
    @SubscribeEvent
    public static void onRegisterFluidRenderers(
            RegisterFluidRenderersEvent event) {
        event.registerRenderer(ModFluids.RUBY_WATER.get(),
            new SimpleFluidRenderer(
                0x88FF4444,          // 颜色 (ARGB)
                true));              // 是否发光
        event.registerRenderer(ModFluids.RUBY_WATER_FLOWING.get(),
            new SimpleFluidRenderer(0x88FF4444, true));
    }
}
```

## 状态效果

### 注册自定义效果

```java
// ModEffects.java
public class ModEffects {
    public static final DeferredRegister<MobEffect> EFFECTS =
        DeferredRegister.create(Registries.MOB_EFFECT, MyMod.MODID);

    public static final DeferredHolder<MobEffect, MobEffect> RUBY_POWER =
        EFFECTS.register("ruby_power", 
            () -> new RubyPowerEffect(MobEffectCategory.BENEFICIAL, 0xFF4444));

    public static final DeferredHolder<MobEffect, MobEffect> RUBY_POISON =
        EFFECTS.register("ruby_poison", 
            () -> new RubyPoisonEffect(MobEffectCategory.HARMFUL, 0x44FF44));

    public static void register(IEventBus bus) {
        EFFECTS.register(bus);
    }
}
```

### 效果实现

```java
// RubyPowerEffect.java — 增益效果
public class RubyPowerEffect extends MobEffect {
    public RubyPowerEffect(MobEffectCategory category, int color) {
        super(category, color);
    }

    @Override
    public void applyEffectTick(LivingEntity entity, int amplifier) {
        if (!entity.level().isClientSide) {
            // 每 tick 恢复生命
            entity.heal(0.5f * (amplifier + 1));
            
            // 移除负面效果
            entity.removeEffect(MobEffects.POISON);
            entity.removeEffect(MobEffects.WITHER);
            entity.removeEffect(MobEffects.HUNGER);
        }
        
        // 粒子效果
        if (entity.level().isClientSide) {
            double x = entity.getX() + (random.nextDouble() - 0.5) * entity.getBbWidth();
            double y = entity.getY() + random.nextDouble() * entity.getBbHeight();
            double z = entity.getZ() + (random.nextDouble() - 0.5) * entity.getBbWidth();
            entity.level().addParticle(ParticleTypes.END_ROD, x, y, z, 0, 0.05, 0);
        }
    }

    @Override
    public boolean isDurationEffectTick(int duration, int amplifier) {
        return duration % 20 == 0; // 每秒执行
    }
}

// RubyPoisonEffect.java — 负面效果
public class RubyPoisonEffect extends MobEffect {
    public RubyPoisonEffect(MobEffectCategory category, int color) {
        super(category, color);
    }

    @Override
    public void applyEffectTick(LivingEntity entity, int amplifier) {
        if (!entity.level().isClientSide) {
            // 造成伤害
            entity.hurt(entity.damageSources().magic(), 
                1.0f * (amplifier + 1));
        }
    }

    @Override
    public boolean isDurationEffectTick(int duration, int amplifier) {
        int interval = 50 >> amplifier;
        return interval > 0 && duration % interval == 0;
    }
}
```

### 药水注册

```java
// ModPotions.java
public class ModPotions {
    public static final DeferredRegister<Potion> POTIONS =
        DeferredRegister.create(Registries.POTION, MyMod.MODID);

    public static final DeferredHolder<Potion, Potion> RUBY_POWER_POTION =
        POTIONS.register("ruby_power", 
            () -> new Potion(new MobEffectInstance(
                ModEffects.RUBY_POWER.get(), 3600, 0))); // 3 分钟

    public static final DeferredHolder<Potion, Potion> LONG_RUBY_POWER =
        POTIONS.register("long_ruby_power",
            () -> new Potion(new MobEffectInstance(
                ModEffects.RUBY_POWER.get(), 9600, 0))); // 8 分钟

    public static final DeferredHolder<Potion, Potion> STRONG_RUBY_POWER =
        POTIONS.register("strong_ruby_power",
            () -> new Potion(new MobEffectInstance(
                ModEffects.RUBY_POWER.get(), 1800, 1))); // 1.5 分钟 II 级

    public static void register(IEventBus bus) {
        POTIONS.register(bus);
    }
}
```

### 酿造配方

```java
@SubscribeEvent
public static void onRegisterBrewingRecipes(
        RegisterBrewingRecipesEvent event) {
    IRecipeBuilder builder = event.getBuilder();
    
    // 粗制药水 → 红宝石之力
    builder.addMix(
        Potions.AWKWARD,
        Ingredient.of(ModItems.RUBY.get()),
        ModPotions.RUBY_POWER_POTION.get()
    );
    
    // 红石 → 延长持续时间
    builder.addMix(
        ModPotions.RUBY_POWER_POTION.get(),
        Ingredient.of(Items.REDSTONE),
        ModPotions.LONG_RUBY_POWER.get()
    );
    
    // 萤石粉 → 增强等级
    builder.addMix(
        ModPotions.RUBY_POWER_POTION.get(),
        Ingredient.of(Items.GLOWSTONE_DUST),
        ModPotions.STRONG_RUBY_POWER.get()
    );
}
```

## 附魔

### 注册自定义附魔

```java
// ModEnchantments.java
public class ModEnchantments {
    public static final DeferredRegister<Enchantment> ENCHANTMENTS =
        DeferredRegister.create(Registries.ENCHANTMENT, MyMod.MODID);

    public static final DeferredHolder<Enchantment, Enchantment> RUBY_BOUNCE =
        ENCHANTMENTS.register("ruby_bounce",
            () -> Enchantment.enchantment(
                Enchantment.definition(
                    EquipmentSlotGroup.ARMOR,     // 适用槽
                    5,                            // 稀有度权重
                    3,                            // 最大等级
                    Enchantment.dynamicCost(5, 8), // 最小附魔花费
                    Enchantment.dynamicCost(25, 8),// 最大附魔花费
                    2,                            // 附魔等级差异
                    EquipmentSlots.ARMOR
                ))
            .exclusiveWith(Enchantments.PROTECTION)
            .build(ResourceLocation.fromNamespaceAndPath(
                MyMod.MODID, "ruby_bounce").toString()));

    public static void register(IEventBus bus) {
        ENCHANTMENTS.register(bus);
    }
}

// 附魔效果实现
@Mod.EventBusSubscriber(modid = MyMod.MODID)
public class ModEnchantmentEvents {
    @SubscribeEvent
    public static void onLivingFall(LivingFallEvent event) {
        if (event.getEntity() instanceof LivingEntity living) {
            ItemStack boots = living.getItemBySlot(EquipmentSlot.FEET);
            int level = boots.getEnchantmentLevel(ModEnchantments.RUBY_BOUNCE.get());
            if (level > 0) {
                // 减少摔落伤害
                event.setDamageMultiplier(event.getDamageMultiplier() * 
                    (1.0f - level * 0.5f));
            }
        }
    }
}
```

### 附魔语言文件

```json
{
    "enchantment.mymod.ruby_bounce": "Ruby Bounce",
    "enchantment.mymod.ruby_bounce.desc": "Reduces fall damage by 50% per level"
}
```

## 粒子效果

```java
// ModParticles.java
public class ModParticles {
    public static final DeferredRegister<ParticleType<?>> PARTICLES =
        DeferredRegister.create(Registries.PARTICLE_TYPE, MyMod.MODID);

    public static final DeferredHolder<ParticleType<?>, ParticleType<SimpleParticleType>> RUBY_SPARKLE =
        PARTICLES.register("ruby_sparkle",
            () -> new SimpleParticleType(true));

    public static void register(IEventBus bus) {
        PARTICLES.register(bus);
    }
}

// 粒子渲染
@Mod.EventBusSubscriber(modid = MyMod.MODID, value = Dist.CLIENT,
                         bus = Mod.EventBusSubscriber.Bus.MOD)
public class ModParticleProviders {
    @SubscribeEvent
    public static void onRegisterParticleProviders(
            RegisterParticleProvidersEvent event) {
        event.registerSprite(ModParticles.RUBY_SPARKLE.get(), 
            RubySparkleParticle.Provider::new);
    }
}

// 使用粒子
public void spawnSparkle(Level level, BlockPos pos) {
    if (level.isClientSide) {
        level.addParticle(ModParticles.RUBY_SPARKLE.get(),
            pos.getX() + 0.5, pos.getY() + 1.0, pos.getZ() + 0.5,
            0, 0.1, 0);
    }
}
```
