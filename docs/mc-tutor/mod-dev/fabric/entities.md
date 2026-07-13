# Fabric 实体注册

[官方文档](https://docs.fabricmc.net/develop/entities)

> 在 Minecraft 中添加自定义生物、怪物或非生物实体。

---

## 实体类型

Minecraft 中实体分为三大类：

| 类型 | 说明 | 示例 |
|------|------|------|
| **生物 (LivingEntity)** | 有生命的实体，可移动 | 玩家、猪、僵尸 |
| **可伤害实体** | 无生命但可被伤害 | 矿车、船 |
| **纯实体** | 既无生命也不可伤害 | 掉落物、经验球 |

---

## 注册实体

### 基础实体

```java
// ModEntities.java
public class ModEntities {
    // 注册一个简单实体（不需要 AI 的生物）
    public static final EntityType<BouncyBallEntity> BOUNCY_BALL =
        Registry.register(
            Registries.ENTITY_TYPE,
            Identifier.of(MyMod.MOD_ID, "bouncy_ball"),
            EntityType.Builder.create(BouncyBallEntity::new, SpawnGroup.MISC)
                .dimensions(0.5f, 0.5f)   // 碰撞箱尺寸
                .maxTrackingRange(8)      // 追踪范围
                .trackingTickInterval(20) // 追踪间隔 tick
                .build()
        );

    public static void register() {
        // 确保静态初始化
    }
}
```

### 自定义生物

```java
// 注册一个带有 AI 的自定义生物
public static final EntityType<ModCow> MOD_COW =
    Registry.register(
        Registries.ENTITY_TYPE,
        Identifier.of(MyMod.MOD_ID, "mod_cow"),
        EntityType.Builder.create(ModCow::new, SpawnGroup.CREATURE)
            .dimensions(0.9f, 1.4f)       // 同原版牛的大小
            .eyeHeight(0.6f)              // 眼睛高度
            .passengerAttachments(1.0f)    // 骑乘偏移
            .maxTrackingRange(10)
            .build()
    );
```

---

## 自定义生物类

```java
// ModCow.java — 继承 AnimalEntity
public class ModCow extends AnimalEntity {
    public ModCow(EntityType<? extends AnimalEntity> entityType, World world) {
        super(entityType, world);
    }

    @Override
    public EntityData initialize(ServerWorldAccess world, LocalDifficulty difficulty,
                                  SpawnReason spawnReason, @Nullable EntityData entityData) {
        // 初始化属性
        return super.initialize(world, difficulty, spawnReason, entityData);
    }

    @Override
    protected void initGoals() {
        // 添加 AI 目标（行为）
        this.goalSelector.add(0, new SwimGoal(this));                     // 游泳
        this.goalSelector.add(1, new EscapeDangerGoal(this, 2.0));       // 危险时逃跑
        this.goalSelector.add(2, new AnimalMateGoal(this, 1.0));         // 繁殖
        this.goalSelector.add(3, new WanderAroundGoal(this, 1.0));       // 闲逛
        this.goalSelector.add(4, new LookAtEntityGoal(this, PlayerEntity.class, 6.0f));
        this.goalSelector.add(5, new LookAroundGoal(this));
    }

    @Override
    public void tickMovement() {
        super.tickMovement();
        // 每 tick 自定义行为
    }

    @Override
    public ItemStack getPickBlockStack() {
        return new ItemStack(ModItems.RUBY);
    }
}
```

---

## 实体属性

实体的属性（生命值、速度、伤害等）通过 `DefaultAttributeRegistry` 注册：

```java
// 在 ModEntities 或单独类中
public static void registerAttributes() {
    FabricDefaultAttributeRegistry.register(
        MOD_COW,
        // 基于原版牛，修改属性
        CowEntity.createCowAttributes()
            .add(EntityAttributes.MAX_HEALTH, 20.0)      // 20 点生命
            .add(EntityAttributes.MOVEMENT_SPEED, 0.25)   // 移动速度
            .add(EntityAttributes.ATTACK_DAMAGE, 3.0)     // 攻击力
            .add(EntityAttributes.FOLLOW_RANGE, 16.0)     // 追踪范围
    );
}
```

### 常用属性

| 属性 ID | 说明 |
|---------|------|
| `MAX_HEALTH` | 最大生命值 |
| `MOVEMENT_SPEED` | 移动速度 |
| `ATTACK_DAMAGE` | 攻击伤害 |
| `ATTACK_SPEED` | 攻击速度（玩家） |
| `FOLLOW_RANGE` | 追踪范围 |
| `ARMOR` | 护甲值 |
| `ARMOR_TOUGHNESS` | 护甲韧性 |
| `KNOCKBACK_RESISTANCE` | 击退抗性 |
| `FLYING_SPEED` | 飞行速度 |
| `LUCK` | 幸运值 |
| `JUMP_STRENGTH` | 跳跃高度（马） |
| `HORSE_JUMP_STRENGTH` | 马的跳跃力 |

---

## AI 目标选择器 (Goal)

| 目标 | 说明 | 优先级参考 |
|------|------|-----------|
| `SwimGoal` | 游泳浮起 | 0 |
| `EscapeDangerGoal` | 危险时逃跑 | 1 |
| `MeleeAttackGoal` | 近战攻击 | 2 |
| `FollowOwnerGoal` | 跟随主人（狼） | 2 |
| `AnimalMateGoal` | 繁殖 | 2 |
| `TemptGoal` | 被食物吸引 | 3 |
| `FollowParentGoal` | 跟随幼崽 | 3 |
| `WanderAroundGoal` | 随机闲逛 | 4 |
| `LookAtEntityGoal` | 看着某个实体 | 5 |
| `LookAroundGoal` | 环顾四周 | 5 |
| `GoToVillageGoal` | 走向村庄 | 5 |

### 添加攻击目标

```java
@Override
protected void initGoals() {
    // ... 基础目标 ...

    // 攻击目标（仅在服务端）
    this.targetSelector.add(1, new RevengeGoal(this));             // 复仇
    this.targetSelector.add(2, new ActiveTargetGoal<>(this,
        PlayerEntity.class, true));                                // 主动攻击玩家
    this.targetSelector.add(3, new ActiveTargetGoal<>(this,
        CowEntity.class, false, entity -> !entity.isBaby()));      // 攻击成年牛
}
```

---

## 实体生成

### 自然生成

```java
// 在生物群系中添加自然生成
public static void registerEntitySpawning() {
    SpawnRestriction.register(
        MOD_COW,
        SpawnRestriction.Location.ON_GROUND,
        Heightmap.Type.MOTION_BLOCKING_NO_LEAVES,
        ModCow::canSpawn   // 使用默认条件
    );

    // 添加到生物群系
    BiomeModifications.addSpawn(
        BiomeSelectors.foundInOverworld(),
        SpawnGroup.CREATURE,
        MOD_COW,
        10,        // 权重（越大越常见）
        2,         // 最小群组
        5          // 最大群组
    );
}
```

### 刷怪蛋

```java
public static final Item MOD_COW_SPAWN_EGG = registerItem(
    "mod_cow_spawn_egg",
    new SpawnEggItem(MOD_COW, 0xFFFFFF, 0x000000,
        new Item.Settings())
);
```

---

## 实体渲染

```java
// ModEntityRenderer.java — 在客户端入口注册
public class ModEntityRenderer {
    public static void register() {
        // 使用原版模型渲染
        EntityRendererRegistry.register(
            ModEntities.MOD_COW,
            context -> new CowEntityRenderer(context)  // 复用原版牛模型
        );

        // 自定义模型渲染
        EntityRendererRegistry.register(
            ModEntities.BOUNCY_BALL,
            BouncyBallEntityRenderer::new
        );
    }
}
```

---

## 完整示例：会爆炸的羊

```java
// ExplodingSheepEntity.java
public class ExplodingSheepEntity extends SheepEntity {
    public ExplodingSheepEntity(EntityType<? extends SheepEntity> type, World world) {
        super(type, world);
    }

    @Override
    protected void initGoals() {
        this.goalSelector.add(1, new EscapeDangerGoal(this, 1.5));
        this.goalSelector.add(2, new WanderAroundGoal(this, 1.0));
        this.goalSelector.add(3, new LookAtEntityGoal(this, PlayerEntity.class, 8.0f));
    }

    @Override
    public void onDeath(DamageSource damageSource) {
        if (!this.getWorld().isClient) {
            // 死亡时爆炸
            this.getWorld().createExplosion(
                this, this.getX(), this.getY(), this.getZ(),
                3.0f, World.ExplosionSourceType.MOB
            );
        }
        super.onDeath(damageSource);
    }
}
```
