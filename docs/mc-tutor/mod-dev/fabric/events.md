# Fabric 事件系统

[官方文档](https://docs.fabricmc.net/develop/events)

Fabric 使用事件回调（Callback）机制，比 NeoForge 的注解驱动事件更加轻量。

## 事件注册方式

Fabric 的事件通过静态回调注册，在 `ModInitializer.onInitialize()` 中设置。

```java
public class MyMod implements ModInitializer {
    @Override
    public void onInitialize() {
        // 在初始化时注册所有事件
        ModEvents.register();
    }
}
```

## 常用事件

### 玩家事件

```java
public class ModEvents {
    public static void register() {
        // 玩家加入
        ServerLifecycleEvents.SERVER_STARTED.register(server -> {
            server.getPlayerManager().getPlayerList().forEach(player -> {
                player.sendMessage(
                    Text.literal("欢迎来到服务器！"), false);
            });
        });

        // 玩家攻击实体
        AttackEntityCallback.EVENT.register((player, world, hand, entity, hitResult) -> {
            if (entity instanceof Creeper creeper) {
                // 苦力怕被攻击时变大
                creeper.setSize(2);
                return ActionResult.FAIL; // 取消攻击
            }
            return ActionResult.PASS;
        });
    }
}
```

### 方块事件

```java
// 方块放置
BlockPlaceCallback.EVENT.register((world, pos, state, placer, itemStack) -> {
    if (placer instanceof PlayerEntity player) {
        player.sendMessage(
            Text.literal("你放置了 " + state.getBlock().getName().getString()),
            true);
    }
    return ActionResult.PASS;
});

// 方块破坏
PlayerBlockBreakEvents.AFTER.register((world, player, pos, state, blockEntity) -> {
    if (state.isOf(ModBlocks.RUBY_BLOCK)) {
        player.sendMessage(Text.literal("你破坏了红宝石块！"), true);

        // 额外掉落
        Block.dropStack(world, pos, new ItemStack(ModItems.RUBY, 2));
    }
});
```

### 实体事件

```java
// 实体受伤
LivingHurtCallback.EVENT.register((entity, source, amount) -> {
    if (entity instanceof PlayerEntity && source.isFire()) {
        // 减免 50% 火焰伤害
        return amount * 0.5f;
    }
    return amount;
});

// 实体死亡掉落
LootTableLoadingCallback.EVENT.register((resourceManager, lootManager, id, tableBuilder, source) -> {
    // 自定义战利品表
});
```

### 右键交互

```java
// 右键方块
UseBlockCallback.EVENT.register((player, world, hand, hitResult) -> {
    BlockPos pos = hitResult.getBlockPos();
    BlockState state = world.getBlockState(pos);

    if (state.isOf(Blocks.CRAFTING_TABLE)) {
        // 使用工作台时额外效果
        player.sendMessage(
            Text.literal("打开了工作台！"), true);
    }
    return ActionResult.PASS;
});

// 右键物品
UseEntityCallback.EVENT.register((player, world, hand, entity, hitResult) -> {
    if (entity instanceof VillagerEntity villager) {
        ItemStack stack = player.getStackInHand(hand);
        if (stack.isOf(ModItems.RUBY)) {
            // 用红宝石与村民交易
            villager.gift(player, new ItemStack(Items.EMERALD, 5));
            stack.decrement(1);
            return ActionResult.SUCCESS;
        }
    }
    return ActionResult.PASS;
});
```

## Mixin

Fabric 使用 Mixin 修改 Minecraft 代码，比事件系统更底层。详细用法见 [Mixin 完全指南](../mixin)。

> Mixin 配置方式请参考 [setup.md 中的 Mixin 配置](./setup#mixin-配置)。

### Mixin 配置

```json
// fabric.mod.json 中启用
{
    "mixins": ["mymod.mixins.json"]
}
```

```json
// mymod.mixins.json
{
    "required": true,
    "package": "com.example.mymod.mixin",
    "compatibilityLevel": "JAVA_21",
    "mixins": [
        "ExampleMixin"
    ],
    "client": [
        "ClientExampleMixin"
    ],
    "injectors": {
        "defaultRequire": 1
    }
}
```

## 服务端与客户端事件

### 服务端事件

```java
// 仅在服务端注册
public class ModServerEvents {
    public static void register() {
        ServerLifecycleEvents.SERVER_STARTED.register(server -> {
            // 服务器启动后
            MyMod.LOGGER.info("服务器已启动");
        });

        ServerLifecycleEvents.SERVER_STOPPING.register(server -> {
            // 服务器关闭时
            MyMod.LOGGER.info("服务器关闭中");
        });

        PlayerEvent.PLAYER_JOINED.register(player -> {
            // 玩家加入
            player.sendMessage(
                Text.literal("欢迎 " + player.getName().getString()));
        });
    }
}
```

### 客户端事件

```java
// 客户端事件（在 ClientModInitializer 中注册）
public class MyModClient implements ClientModInitializer {
    @Override
    public void onInitializeClient() {
        // 注册按键
        KeyBindingHelper.registerKeyBinding(new KeyBinding(
            "key.mymod.open_menu",     // 翻译 key
            InputUtil.Type.KEYSYM,     // 类型
            GLFW.GLFW_KEY_O,          // 默认按键 O
            "category.mymod"          // 分类
        ));

        // 客户端 tick 事件
        ClientTickEvents.END_CLIENT_TICK.register(client -> {
            while (Keybinds.OPEN_MENU_KEY.wasPressed()) {
                // 打开自定义界面
                client.setScreen(new MyModScreen());
            }
        });
    }
}
```

## Fabric API 事件速查表

| 事件 | 触发时机 | 返回值 | 常用场景 |
|------|----------|--------|----------|
| `ServerLifecycleEvents.SERVER_STARTED` | 服务器启动后 | void | 初始化服务器数据 |
| `ServerLifecycleEvents.SERVER_STOPPING` | 服务器关闭前 | void | 保存数据 |
| `PlayerBlockBreakEvents.AFTER` | 方块破坏后 | void | 额外掉落/经验 |
| `PlayerBlockBreakEvents.BEFORE` | 方块破坏前 | boolean | 阻止破坏 |
| `BlockPlaceCallback.EVENT` | 方块放置 | ActionResult | 限制放置 |
| `UseBlockCallback.EVENT` | 右键方块 | ActionResult | 自定义交互 |
| `UseItemCallback.EVENT` | 右键物品 | ActionResult | 自定义物品行为 |
| `UseEntityCallback.EVENT` | 右键实体 | ActionResult | 与实体交互 |
| `AttackEntityCallback.EVENT` | 攻击实体 | ActionResult | 修改伤害/取消攻击 |
| `EntityJoinWorldCallback.EVENT` | 实体加入世界 | ActionResult | 修改实体生成 |
| `LivingHurtCallback.EVENT` | 生物受伤 | float | 伤害修改 |
| `LivingDeathCallback.EVENT` | 生物死亡 | ActionResult | 阻止死亡 |
| `ExplosionStartCallback.EVENT` | 爆炸开始 | ActionResult | 取消爆炸 |
| `LootTableLoadingCallback.EVENT` | 战利品表加载 | void | 修改掉落 |
| `CommandRegistrationCallback.EVENT` | 命令注册 | void | 注册自定义命令 |
| `FuelRegistryEvents.BUILD` | 燃料注册 | void | 添加燃料 |
| `EntityAttributeModificationCallback.EVENT` | 实体属性修改 | void | 修改实体属性 |
| `ClientTickEvents.END_CLIENT_TICK` | 客户端 tick 结束 | void | 客户端逻辑 |
| `ClientTickEvents.START_CLIENT_TICK` | 客户端 tick 开始 | void | 客户端逻辑 |

## 事件优先级

Fabric 的 Event 使用 `Phase` 控制优先级：

```java
// 注册高优先级事件
AttackEntityCallback.EVENT.addPhaseOrdering(
    Event.DEFAULT_PHASE, "early_phase");

AttackEntityCallback.EVENT.register("early_phase", (player, world, hand, entity, hitResult) -> {
    // 先执行
    return ActionResult.PASS;
});

AttackEntityCallback.EVENT.register((player, world, hand, entity, hitResult) -> {
    // 后执行
    return ActionResult.PASS;
});
```

## 完整案例

```java
public class ModEvents {
    public static void register() {
        // 1. 玩家右键自定义物品
        UseItemCallback.EVENT.register((player, world, hand) -> {
            ItemStack stack = player.getStackInHand(hand);

            if (stack.isOf(ModItems.MAGIC_WAND)) {
                if (!world.isClient) {
                    // 发射火球
                    Vec3d look = player.getRotationVec(1.0f);
                    SmallFireballEntity fireball = new SmallFireballEntity(
                        world, player, look.x, look.y, look.z);
                    fireball.setPosition(
                        player.getX() + look.x * 2,
                        player.getEyeY() + look.y * 2,
                        player.getZ() + look.z * 2);
                    world.spawnEntity(fireball);

                    stack.damage(1, player, EquipmentSlot.MAINHAND);
                }

                player.playSound(
                    SoundEvents.ENTITY_FIREWORK_ROCKET_USE, 1.0f, 1.0f);
                return ActionResult.success(world.isClient);
            }
            return ActionResult.PASS;
        });

        // 2. 玩家挖掘矿石额外掉落经验
        PlayerBlockBreakEvents.AFTER.register(
            (world, player, pos, state, blockEntity) -> {
            if (state.isOf(Blocks.IRON_ORE) ||
                state.isOf(Blocks.DEEPSLATE_IRON_ORE)) {
                player.addExperience(2);
            }
        });

        // 3. 阻止苦力怕破坏地形
        ExplosionStartCallback.EVENT.register(world -> {
            return ActionResult.FAIL; // 取消所有爆炸
        });
    }
}
```
