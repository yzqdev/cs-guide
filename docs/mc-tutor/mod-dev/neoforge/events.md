# NeoForge 事件系统

[官方文档](https://docs.neoforged.net/docs/events/)

## 事件总线

NeoForge 有两个事件总线：

```text
MOD 总线（Mod Event Bus）：
- 在 @Mod 构造器中获取
- 处理 MOD 生命周期事件
- 注册方式：modEventBus.addListener(this::method)

FORGE 总线（Forge Event Bus）：
- 使用 @SubscribeEvent 注解
- 处理游戏运行时事件
```

## 监听 MOD 事件

```java
@Mod(MyMod.MODID)
public class MyMod {
    public MyMod(IEventBus modEventBus) {
        // 直接注册监听器
        modEventBus.addListener(this::commonSetup);
        modEventBus.addListener(this::onRegisterItems);
    }

    private void commonSetup(final FMLCommonSetupEvent event) {
        // 在 Common Setup 阶段执行
        event.enqueueWork(() -> {
            // 跨线程安全操作
            LOGGER.info("Common setup 完成");
        });
    }

    private void onRegisterItems(final RegisterEvent event) {
        // 注册物品事件
    }
}
```

## 监听 FORGE 事件

```java
@Mod.EventBusSubscriber(modid = MyMod.MODID)
public class ModForgeEvents {
    // 物品右键点击
    @SubscribeEvent
    public static void onItemRightClick(PlayerInteractEvent.RightClickItem event) {
        ItemStack stack = event.getItemStack();
        Player player = event.getEntity();

        if (stack.is(ModItems.MAGIC_WAND)) {
            event.setCanceled(true); // 取消默认行为
            player.displayClientMessage(
                Component.literal("你使用了法杖！"), true);
        }
    }

    // 玩家加入
    @SubscribeEvent
    public static void onPlayerJoin(PlayerEvent.PlayerLoggedInEvent event) {
        Player player = event.getEntity();
        player.sendSystemMessage(
            Component.literal("欢迎来到我的世界！"));
    }

    // 方块破坏
    @SubscribeEvent
    public static void onBlockBreak(BlockEvent.BreakEvent event) {
        Player player = event.getPlayer();
        BlockState state = event.getState();

        if (state.is(ModBlocks.RUBY_BLOCK.get())) {
            player.displayClientMessage(
                Component.literal("你破坏了红宝石块！"), true);
        }
    }
}
```

### 使用 `@NewEvent` 监听器

```java
@Mod.EventBusSubscriber(modid = MyMod.MODID)
public class ModEvents {
    @SubscribeEvent
    public static void onLivingHurt(LivingHurtEvent event) {
        // 修改受伤逻辑
        if (event.getEntity() instanceof Player) {
            if (event.getSource().isFire()) {
                // 减免50%火焰伤害
                event.setAmount(event.getAmount() * 0.5f);
            }
        }
    }

    @SubscribeEvent
    public static void onEntitySpawn(EntityJoinLevelEvent event) {
        // 自定义实体生成逻辑
        if (event.getEntity() instanceof Creeper creeper) {
            // 苦力怕生成时变大
            creeper.setSize(2);
        }
    }
}
```

## 常用事件列表

### 玩家事件

| 事件 | 说明 |
|------|------|
| `PlayerEvent.PlayerLoggedInEvent` | 玩家登录 |
| `PlayerEvent.PlayerLoggedOutEvent` | 玩家登出 |
| `PlayerEvent.PlayerRespawnEvent` | 玩家重生 |
| `PlayerInteractEvent.RightClickBlock` | 右键点击方块 |
| `PlayerInteractEvent.RightClickItem` | 右键点击物品 |
| `PlayerInteractEvent.LeftClickBlock` | 左键点击方块 |
| `AttackEntityEvent` | 攻击实体 |

### 方块事件

| 事件 | 说明 |
|------|------|
| `BlockEvent.BreakEvent` | 方块被破坏（可取消） |
| `BlockEvent.PlaceEvent` | 方块被放置 |
| `BlockEvent.NeighborNotifyEvent` | 方块邻居变化 |
| `BlockEvent.FarmlandTrampleEvent` | 耕地被踩踏 |

### 实体事件

| 事件 | 说明 |
|------|------|
| `LivingHurtEvent` | 实体受伤 |
| `LivingDamageEvent` | 实体受到伤害 |
| `LivingDeathEvent` | 实体死亡 |
| `LivingSpawnEvent` | 实体生成 |
| `EntityJoinLevelEvent` | 实体加入世界 |
| `LivingDropEvent` | 实体掉落物品 |

### 世界事件

| 事件 | 说明 |
|------|------|
| `WorldEvent.Load` | 世界加载 |
| `WorldEvent.Save` | 世界保存 |
| `ExplosionEvent.Start` | 爆炸开始（可取消） |
| `ExplosionEvent.Detonate` | 爆炸完成 |
| `ServerChatEvent` | 玩家发送消息 |

## 事件优先级

```java
@SubscribeEvent(priority = EventPriority.HIGH)
public static void onHighPriority(LivingHurtEvent event) {
    // 高优先级先执行
}

@SubscribeEvent(priority = EventPriority.NORMAL)
public static void onNormalPriority(LivingHurtEvent event) {
    // 默认优先级
}

@SubscribeEvent(priority = EventPriority.LOW)
public static void onLowPriority(LivingHurtEvent event) {
    // 低优先级后执行
}
```

## 取消事件

```java
@SubscribeEvent
public static void onExplosion(ExplosionEvent.Start event) {
    // 在特定维度禁止爆炸
    if (event.getLevel().dimension() == Level.NETHER) {
        event.setCanceled(true);
    }
}

@SubscribeEvent
public static void onFarmlandTrample(
        BlockEvent.FarmlandTrampleEvent event) {
    // 禁止踩踏耕地
    event.setCanceled(true);
}
```

## 完整案例

```java
@Mod.EventBusSubscriber(modid = MyMod.MODID)
public class ModEventHandler {

    // 1. 玩家挖矿时额外掉落
    @SubscribeEvent
    public static void onBlockBreak(BlockEvent.BreakEvent event) {
        Player player = event.getPlayer();
        BlockPos pos = event.getPos();
        Level level = (Level) event.getLevel();

        // 只有生存模式有效
        if (player.isCreative()) return;

        // 挖掘特定方块额外掉落
        BlockState state = level.getBlockState(pos);
        if (state.is(Blocks.IRON_ORE) || state.is(Blocks.DEEPSLATE_IRON_ORE)) {
            // 额外掉落经验
            player.giveExperiencePoints(2);
        }
    }

    // 2. 玩家右键使用自定义物品
    @SubscribeEvent
    public static void onItemRightClick(PlayerInteractEvent.RightClickItem event) {
        ItemStack stack = event.getItemStack();

        if (stack.is(ModItems.MAGIC_WAND.get())) {
            Player player = event.getEntity();
            Level level = event.getLevel();

            if (!level.isClientSide) {
                // 发射火球
                Location projectile = new Location(level,
                    player.getX(), player.getEyeY(), player.getZ());
                // ...

                stack.hurtAndBreak(1, player, EquipmentSlot.MAINHAND);
            }

            event.setCanceled(true);
        }
    }

    // 3. 玩家死亡时不掉落
    @SubscribeEvent
    public static void onPlayerDeath(LivingDeathEvent event) {
        if (event.getEntity() instanceof Player) {
            // 这里需要配合 gamerule 或自定义逻辑
        }
    }

    // 4. 自定义合成配方事件
    @SubscribeEvent
    public static void onCraft(PlayerEvent.ItemCraftedEvent event) {
        Player player = event.getEntity();
        ItemStack crafted = event.getCrafting();

        if (crafted.is(Items.DIAMOND_SWORD)) {
            player.sendSystemMessage(
                Component.literal("你合成了一把钻石剑！"));
            player.giveExperiencePoints(10);
        }
    }
}
```

## 客户端事件

```java
// 仅在客户端执行的事件
@Mod.EventBusSubscriber(modid = MyMod.MODID, bus = Mod.EventBusSubscriber.Bus.FORGE, value = Dist.CLIENT)
public class ModClientEvents {

    // 按键注册
    @SubscribeEvent
    public static void onKeyRegister(RegisterKeyMappingsEvent event) {
        event.register(ModKeybinds.OPEN_MENU_KEY);
    }

    // 渲染后事件
    @SubscribeEvent
    public static void onRenderLevelStage(RenderLevelStageEvent event) {
        if (event.getStage() == RenderLevelStageEvent.Stage.AFTER_WEATHER) {
            // 自定义渲染
        }
    }
}
```
