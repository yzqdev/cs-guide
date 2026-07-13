# NeoForge 实体与生物

[官方文档](https://docs.neoforged.net/docs/entities/)

## 注册实体

### 实体类型注册

```java
// ModEntities.java
public class ModEntities {
    public static final DeferredRegister<EntityType<?>> ENTITIES =
        DeferredRegister.create(Registries.ENTITY_TYPE, MyMod.MODID);

    // 自定义生物
    public static final DeferredHolder<EntityType<?>, EntityType<RubyGolem>> RUBY_GOLEM =
        ENTITIES.register("ruby_golem", () -> EntityType.Builder.of(
                RubyGolem::new, MobCategory.MISC)
            .sized(1.4f, 2.7f)      // 碰撞箱宽高
            .eyeHeight(2.4f)         // 眼睛高度
            .clientTrackingRange(10) // 跟踪距离
            .build("ruby_golem"));

    // 自定义弹射物
    public static final DeferredHolder<EntityType<?>, EntityType<RubyProjectile>> RUBY_PROJECTILE =
        ENTITIES.register("ruby_projectile", () -> EntityType.Builder.of(
                RubyProjectile::new, MobCategory.MISC)
            .sized(0.25f, 0.25f)
            .clientTrackingRange(4)
            .updateInterval(10)
            .build("ruby_projectile"));

    public static void register(IEventBus bus) {
        ENTITIES.register(bus);
    }
}
```

## 自定义生物

### 生物类

```java
// RubyGolem.java
public class RubyGolem extends PathfinderMob {
    public RubyGolem(EntityType<? extends PathfinderMob> type, Level level) {
        super(type, level);
    }

    @Override
    protected void registerGoals() {
        // 行为目标
        this.goalSelector.addGoal(1, new FloatGoal(this));
        this.goalSelector.addGoal(2, new MeleeAttackGoal(this, 1.0D, true));
        this.goalSelector.addGoal(3, new WaterAvoidingRandomStrollGoal(this, 0.6D));
        this.goalSelector.addGoal(4, new LookAtPlayerGoal(this, Player.class, 6.0F));
        this.goalSelector.addGoal(5, new RandomLookAroundGoal(this));

        // 攻击目标
        this.targetSelector.addGoal(1, new HurtByTargetGoal(this));
        this.targetSelector.addGoal(2, 
            new NearestAttackableTargetGoal<>(this, Monster.class, true));
    }

    @Override
    protected void defineSynchedData() {
        super.defineSynchedData();
        // 同步数据
        this.entityData.define(DATA_ATTACK_MODE, false);
    }

    private static final EntityDataAccessor<Boolean> DATA_ATTACK_MODE =
        SynchedEntityData.defineId(RubyGolem.class, 
            EntityDataSerializers.BOOLEAN);

    public boolean isAttackMode() {
        return this.entityData.get(DATA_ATTACK_MODE);
    }

    public void setAttackMode(boolean mode) {
        this.entityData.set(DATA_ATTACK_MODE, mode);
    }

    @Override
    public void aiStep() {
        super.aiStep();
        // 攻击模式粒子
        if (isAttackMode() && level().isClientSide) {
            level().addParticle(ParticleTypes.FLAME,
                getX(), getY() + 2.0, getZ(),
                0, 0.1, 0);
        }
    }

    @Override
    public boolean doHurtTarget(Entity target) {
        boolean hurt = super.doHurtTarget(target);
        if (hurt) {
            // 攻击特效
            level().broadcastEntityEvent(this, (byte) 4);
        }
        return hurt;
    }

    @Override
    protected void defineAttributes() {
        // 设置属性
        this.getAttribute(Attributes.MAX_HEALTH).setBaseValue(60.0D);
        this.getAttribute(Attributes.ARMOR).setBaseValue(10.0D);
        this.getAttribute(Attributes.ATTACK_DAMAGE).setBaseValue(8.0D);
        this.getAttribute(Attributes.MOVEMENT_SPEED).setBaseValue(0.3D);
        this.getAttribute(Attributes.FOLLOW_RANGE).setBaseValue(32.0D);
        this.getAttribute(Attributes.KNOCKBACK_RESISTANCE).setBaseValue(1.0D);
    }

    @Override
    public MobType getMobType() {
        return MobType.UNDEFINED;
    }
}
```

### 属性注册

```java
// ModAttributes.java
@Mod.EventBusSubscriber(modid = MyMod.MODID, bus = Mod.EventBusSubscriber.Bus.MOD)
public class ModAttributes {
    @SubscribeEvent
    public static void onRegisterAttributes(RegisterAttributesEvent event) {
        // 注册生物属性
        event.register(ModEntities.RUBY_GOLEM.get(), RubyGolem::createAttributes);
    }
}

// 在 RubyGolem 中
public static AttributeSupplier.Builder createAttributes() {
    return Mob.createMobAttributes()
        .add(Attributes.MAX_HEALTH, 60.0D)
        .add(Attributes.ARMOR, 10.0D)
        .add(Attributes.ATTACK_DAMAGE, 8.0D)
        .add(Attributes.MOVEMENT_SPEED, 0.3D)
        .add(Attributes.FOLLOW_RANGE, 32.0D)
        .add(Attributes.KNOCKBACK_RESISTANCE, 1.0D);
}
```

### 生成规则

```java
// ModSpawnRules.java
@Mod.EventBusSubscriber(modid = MyMod.MODID, bus = Mod.EventBusSubscriber.Bus.MOD)
public class ModSpawnRules {
    @SubscribeEvent
    public static void onRegisterSpawnPlacements(RegisterSpawnPlacementsEvent event) {
        // 在草地上自然生成
        event.register(ModEntities.RUBY_GOLEM.get(),
            SpawnPlacementTypes.ON_GROUND,
            Heightmap.Types.MOTION_BLOCKING_NO_LEAVES,
            RubyGolem::checkMobSpawnRules,
            RegisterSpawnPlacementsEvent.Operation.REPLACE);
    }

    // 添加到生物群系
    public static void addSpawnToBiomes() {
        BiomeModifications.addSpawn(
            BiomeFilters.IS_OVERWORLD,
            MobCategory.CREATURE,
            ModEntities.RUBY_GOLEM.get(),
            5,     // 权重
            1,     // 最小数量
            3      // 最大数量
        );
    }
}
```

### 生物生成蛋

```java
// ModSpawnEggs.java
public class ModSpawnEggs {
    public static final DeferredRegister.Items SPAWN_EGGS =
        DeferredRegister.createItems(MyMod.MODID);

    public static final DeferredItem<Item> RUBY_GOLEM_SPAWN_EGG =
        SPAWN_EGGS.register("ruby_golem_spawn_egg",
            () -> new SpawnEggItem(ModEntities.RUBY_GOLEM.get(),
                0xFF4444, 0x44FF44,
                new Item.Properties()));
}
```

## 自定义弹射物

```java
// RubyProjectile.java
public class RubyProjectile extends ThrowableItemProjectile {
    public RubyProjectile(EntityType<? extends ThrowableItemProjectile> type, 
                          Level level) {
        super(type, level);
    }

    public RubyProjectile(Level level, LivingEntity shooter) {
        super(ModEntities.RUBY_PROJECTILE.get(), shooter, level);
    }

    @Override
    protected Item getDefaultItem() {
        return ModItems.RUBY.get();
    }

    @Override
    protected void onHit(HitResult result) {
        super.onHit(result);

        if (!level().isClientSide) {
            // 爆炸效果
            level().explode(this, getX(), getY(), getZ(), 
                2.0f, Level.ExplosionInteraction.MOB);

            // 伤害实体
            if (result.getType() == HitResult.Type.ENTITY) {
                Entity hit = ((EntityHitResult) result).getEntity();
                hit.hurt(this.damageSources().thrown(this, getOwner()), 6.0F);
            }

            this.discard();
        }
    }
}

// 注册弹射物渲染
@SubscribeEvent
public static void onRegisterEntityRenderers(
        EntityRenderersEvent.RegisterRenderers event) {
    event.registerEntityRenderer(ModEntities.RUBY_PROJECTILE.get(),
        ThrownItemRenderer::new);
}
```

## 自定义 Boss

```java
// RubyBoss.java — 更强大的 Boss 生物
public class RubyBoss extends Monster implements RangedAttackMob {
    public RubyBoss(EntityType<? extends Monster> type, Level level) {
        super(type, level);
        this.xpReward = 500; // 经验值
    }

    @Override
    protected void registerGoals() {
        this.goalSelector.addGoal(1, new RangedAttackGoal(this, 1.0, 20, 15.0F));
        this.goalSelector.addGoal(2, new LookAtPlayerGoal(this, Player.class, 8.0F));
        this.goalSelector.addGoal(3, new RandomLookAroundGoal(this));

        this.targetSelector.addGoal(1, new HurtByTargetGoal(this));
        this.targetSelector.addGoal(2, 
            new NearestAttackableTargetGoal<>(this, Player.class, true));
    }

    @Override
    public void performRangedAttack(LivingEntity target, float distance) {
        // 远程攻击：发射火球
        RubyProjectile projectile = new RubyProjectile(level(), this);
        double dx = target.getX() - this.getX();
        double dy = target.getY() - this.getY(0.5);
        double dz = target.getZ() - this.getZ();
        projectile.shoot(dx, dy, dz, 1.5F, 0);
        level().addFreshEntity(projectile);
    }

    // Boss 血条
    @Override
    public ServerBossEvent getBossBar() {
        ServerBossEvent bossBar = new ServerBossEvent(
            this.getDisplayName(), 
            ServerBossEvent.BossBarColor.RED,
            ServerBossEvent.BossBarOverlay.PROGRESS);
        bossBar.setProgress(this.getHealth() / this.getMaxHealth());
        return bossBar;
    }

    @Override
    public void startSeenByPlayer(ServerPlayer player) {
        super.startSeenByPlayer(player);
        getBossBar().addPlayer(player);
    }

    @Override
    public void stopSeenByPlayer(ServerPlayer player) {
        super.stopSeenByPlayer(player);
        getBossBar().removePlayer(player);
    }
}
```

## 实体数据同步

```java
// 同步自定义数据
public class RubyGolem extends PathfinderMob {
    // 定义需要同步的数据
    private static final EntityDataAccessor<Integer> DATA_RUBY_COUNT =
        SynchedEntityData.defineId(RubyGolem.class, 
            EntityDataSerializers.INT);

    @Override
    protected void defineSynchedData() {
        super.defineSynchedData();
        this.entityData.define(DATA_RUBY_COUNT, 0);
    }

    public int getRubyCount() {
        return entityData.get(DATA_RUBY_COUNT);
    }

    public void setRubyCount(int count) {
        entityData.set(DATA_RUBY_COUNT, count);
    }
}
```

## 实体渲染

```java
// RubyGolemRenderer.java
public class RubyGolemRenderer extends MobRenderer<RubyGolem, RubyGolemModel> {
    public RubyGolemRenderer(EntityRendererProvider.Context context) {
        super(context, new RubyGolemModel(), 0.5f);
    }

    @Override
    public ResourceLocation getTextureLocation(RubyGolem entity) {
        return ResourceLocation.fromNamespaceAndPath(MyMod.MODID, 
            "textures/entity/ruby_golem.png");
    }

    // 攻击模式时变色
    @Override
    protected void render(RubyGolem entity, float entityYaw, float partialTick,
                           PoseStack poseStack, MultiBufferSource buffer,
                           int packedLight) {
        if (entity.isAttackMode()) {
            // 红色叠加层
        }
        super.render(entity, entityYaw, partialTick, poseStack, buffer, packedLight);
    }
}

// 注册渲染
@SubscribeEvent
public static void onRegisterEntityRenderers(
        EntityRenderersEvent.RegisterRenderers event) {
    event.registerEntityRenderer(ModEntities.RUBY_GOLEM.get(), 
        RubyGolemRenderer::new);
}
```

## 食物与效果

```java
// 注册自定义状态效果
public class ModEffects {
    public static final DeferredRegister<MobEffect> EFFECTS =
        DeferredRegister.create(Registries.MOB_EFFECT, MyMod.MODID);

    public static final DeferredHolder<MobEffect, MobEffect> RUBY_POWER =
        EFFECTS.register("ruby_power", 
            () -> new RubyPowerEffect(MobEffectCategory.BENEFICIAL, 0xFF4444));

    public static void register(IEventBus bus) {
        EFFECTS.register(bus);
    }
}

// RubyPowerEffect.java
public class RubyPowerEffect extends MobEffect {
    public RubyPowerEffect(MobEffectCategory category, int color) {
        super(category, color);
    }

    @Override
    public void applyEffectTick(LivingEntity entity, int amplifier) {
        // 持续治疗效果
        entity.heal(1.0f);
    }

    @Override
    public boolean isDurationEffectTick(int duration, int amplifier) {
        // 每 2 秒执行一次
        return duration % 40 == 0;
    }
}
```
