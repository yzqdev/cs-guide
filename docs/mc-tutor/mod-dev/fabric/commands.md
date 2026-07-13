# Fabric 指令系统

[官方文档](https://docs.fabricmc.net/develop/commands)

> 为你的 MOD 注册自定义指令，支持参数、权限和客户端/服务端指令。

---

## 基础指令

### 注册简单指令

```java
// ModCommands.java
public class ModCommands {
    public static void register() {
        // 所有指令注册在 onInitialize() 中
        CommandRegistrationCallback.EVENT.register(
            (dispatcher, registryAccess, environment) -> {
                // 注册 /mymod hello 指令
                dispatcher.register(CommandManager.literal("mymod")
                    .then(CommandManager.literal("hello")
                        .executes(context -> {
                            context.getSource().sendMessage(
                                Text.literal("§aHello from MyMod!"));
                            return 1;  // 返回成功
                        })
                    )
                    .executes(context -> {
                        context.getSource().sendMessage(
                            Text.literal("§e用法: /mymod hello"));
                        return 1;
                    })
                );
            }
        );
    }
}
```

### 服务端指令 vs 客户端指令

```text
服务端指令 (在 CommandRegistrationCallback 注册):
  - 服务端和单人模式均可执行
  - 可以操作世界、实体、玩家数据

客户端指令 (在 ClientCommandRegistrationCallback 注册):
  - 仅在客户端执行
  - 不能操作世界数据，只能用于渲染、按键、界面
```

---

## 参数类型

### 常用参数

```java
dispatcher.register(CommandManager.literal("mymod")
    // 整数参数
    .then(CommandManager.argument("count", IntegerArgumentType.integer())
        .executes(context -> {
            int count = IntegerArgumentType.getInteger(context, "count");
            context.getSource().sendMessage(
                Text.literal("Count: " + count));
            return 1;
        })
    )

    // 字符串参数
    .then(CommandManager.argument("name", StringArgumentType.string())
        .executes(context -> {
            String name = StringArgumentType.getString(context, "name");
            context.getSource().sendMessage(
                Text.literal("Hello, " + name));
            return 1;
        })
    )
);
```

### 参数类型表

| 参数类型 | Java 类 | 获取方法 |
|----------|---------|----------|
| 字符串 | `StringArgumentType.string()` | `getString(context, "name")` |
| 单词（无空格） | `StringArgumentType.word()` | `getString(context, "name")` |
| 贪婪字符串 | `StringArgumentType.greedyString()` | `getString(context, "name")` |
| 整数 | `IntegerArgumentType.integer()` | `getInteger(context, "name")` |
| 整数（范围） | `IntegerArgumentType.integer(min, max)` | `getInteger(context, "name")` |
| 浮点数 | `FloatArgumentType.floatArg()` | `getFloat(context, "name")` |
| 布尔值 | `BoolArgumentType.bool()` | `getBool(context, "name")` |
| 玩家 | `EntityArgumentType.player()` | `getPlayer(context, "target")` |
| 实体 | `EntityArgumentType.entity()` | `getEntity(context, "target")` |
| 多个实体 | `EntityArgumentType.entities()` | `getEntities(context, "target")` |
| 坐标 | `BlockPosArgumentType.blockPos()` | `getBlockPos(context, "pos")` |
| 物品 | `ItemStackArgumentType.itemStack()` | `getItemStackArgument(context, "item")` |
| 方块状态 | `BlockStateArgumentType.blockState()` | `getBlockState(context, "block")` |
| 消息 | `MessageArgumentType.message()` | `getMessage(context, "msg")` |
| 角度 | `RotationArgumentType.rotation()` | `getRotation(context, "rot")` |
| 生物群系 | `RegistryArgumentType` | `getRegistryEntry(context, "biome")` |
| 药水效果 | `RegistryArgumentType` | `getRegistryEntry(context, "effect")` |

---

## 完整指令示例

### /mymod give_item

给指定玩家指定数量的物品：

```java
dispatcher.register(CommandManager.literal("mymod")
    .then(CommandManager.literal("give_item")
        .requires(source -> source.hasPermissionLevel(2))  // OP 权限
        .then(CommandManager.argument("player", EntityArgumentType.player())
            .then(CommandManager.argument("item", ItemStackArgumentType.itemStack())
                .then(CommandManager.argument("count", IntegerArgumentType.integer(1, 64))
                    .executes(context -> {
                        ServerCommandSource source = context.getSource();
                        ServerPlayerEntity player =
                            EntityArgumentType.getPlayer(context, "player");
                        ItemStack item =
                            ItemStackArgumentType.getItemStackArgument(context, "item")
                                .createStack(IntegerArgumentType.getInteger(context, "count"), false);
                        player.getInventory().offerOrDrop(item);
                        source.sendMessage(
                            Text.literal("§a给予 " + player.getName().getString()
                                + " " + item.getItem().getName().getString()));
                        return 1;
                    })
                )
            )
        )
    )
);
```

### /mymod summon_custom

在指定位置召唤自定义实体：

```java
dispatcher.register(CommandManager.literal("mymod")
    .then(CommandManager.literal("summon")
        .then(CommandManager.argument("pos", BlockPosArgumentType.blockPos())
            .executes(context -> {
                ServerCommandSource source = context.getSource();
                BlockPos pos = BlockPosArgumentType.getBlockPos(context, "pos");
                ModCow cow = new ModCow(ModEntities.MOD_COW, source.getWorld());
                cow.setPos(pos.getX() + 0.5, pos.getY(), pos.getZ() + 0.5);
                source.getWorld().spawnEntity(cow);
                source.sendMessage(Text.literal("§a已生成"));
                return 1;
            })
        )
    )
);
```

---

## 权限系统

Fabric 没有内置权限系统，推荐集成第三方权限插件：

```java
// 检查玩家是否为 OP（不依赖权限插件）
dispatcher.register(CommandManager.literal("admin")
    .requires(source -> source.hasPermissionLevel(4))  // 需要 4 级 OP
    .executes(context -> { ... })
);

// 依赖 Fabric Permissions API（可选）
// https://github.com/lukebemishprojects/fabric-permissions-api
```

---

## 指令反馈

### 消息类型

```java
// 普通消息
source.sendMessage(Text.literal("绿色文字"));

// 错误
throw new SimpleCommandExceptionType(
    Text.literal("发生错误")).create();

// 反馈给执行者
source.sendFeedback(() -> Text.literal("完成"), false);
// 广播给所有 OP（第二个参数为 true 时）
source.sendFeedback(() -> Text.literal("所有人收到"), true);
```

---

## 完整示例

```java
// 注册 /mymod tp <player> <target>
CommandRegistrationCallback.EVENT.register((dispatcher, registryAccess, environment) -> {
    dispatcher.register(CommandManager.literal("mymod")
        .then(CommandManager.literal("tp")
            .then(CommandManager.argument("player", EntityArgumentType.player())
                .then(CommandManager.argument("target", EntityArgumentType.player())
                    .executes(context -> {
                        ServerPlayerEntity player =
                            EntityArgumentType.getPlayer(context, "player");
                        ServerPlayerEntity target =
                            EntityArgumentType.getPlayer(context, "target");
                        player.teleport(target.getX(), target.getY(), target.getZ());
                        context.getSource().sendFeedback(
                            () -> Text.literal("已传送 " + player.getName().getString()
                                + " 到 " + target.getName().getString()), true);
                        return 1;
                    })
                )
            )
        )
    );
});
```
