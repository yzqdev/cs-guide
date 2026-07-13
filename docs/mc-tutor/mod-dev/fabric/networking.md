# Fabric 网络编程

[官方文档](https://docs.fabricmc.net/develop/networking)

> 网络编程让客户端和服务端之间通信，是实现多人游戏功能的核心。

---

## 基本概念

```text
# 通信流程
客户端 ←→ 服务端

服务端 → 客户端 (S2C): 通知客户端发生的事件
客户端 → 服务端 (C2S): 将玩家操作告知服务端

# 关键术语
Payload (负载):   数据包中传输的实际数据
Packet (数据包):  网络传输的最小单位
Codec (编解码器): 序列化/反序列化数据的工具
```

**始终在服务端验证收到的数据**，客户端可能被修改。

---

## 服务端到客户端 (S2C)

### 1. 定义 Payload

```java
// ClientboundSummonLightningPayload.java
public record ClientboundSummonLightningPayload(BlockPos pos)
        implements CustomPacketPayload {

    // Payload 的唯一标识符
    public static final Identifier ID =
        Identifier.of(MyMod.MOD_ID, "summon_lightning");

    public static final CustomPacketPayload.Type<ClientboundSummonLightningPayload> TYPE =
        new CustomPacketPayload.Type<>(ID);

    // 编解码器：将 Payload 写入和读取字节流
    public static final StreamCodec<RegistryFriendlyByteBuf, ClientboundSummonLightningPayload> CODEC =
        StreamCodec.composite(
            BlockPos.STREAM_CODEC,
            ClientboundSummonLightningPayload::pos,
            ClientboundSummonLightningPayload::new
        );

    @Override
    public Type<? extends CustomPacketPayload> type() {
        return TYPE;
    }
}
```

### 2. 注册 Payload

在 **Common Initializer** 中注册：

```java
public class MyMod implements ModInitializer {
    @Override
    public void onInitialize() {
        // 注册 S2C Payload
        PayloadTypeRegistry.playS2C().register(
            ClientboundSummonLightningPayload.TYPE,
            ClientboundSummonLightningPayload.CODEC
        );
    }
}
```

### 3. 发送到客户端

```java
// 发送给指定玩家
ServerPlayNetworking.send(player, new ClientboundSummonLightningPayload(pos));

// 发送给世界中的所有玩家
for (ServerPlayer player : PlayerLookup.world((ServerWorld) world)) {
    ServerPlayNetworking.send(player, payload);
}

// 发送给追踪某个实体的玩家
for (ServerPlayer player : PlayerLookup.tracking(entity)) {
    ServerPlayNetworking.send(player, payload);
}
```

### 4. 客户端接收

在 **Client Initializer** 中处理：

```java
public class MyModClient implements ClientModInitializer {
    @Override
    public void onInitializeClient() {
        ClientPlayNetworking.registerGlobalReceiver(
            ClientboundSummonLightningPayload.TYPE,
            (payload, context) -> {
                // 在客户端主线程执行
                ClientWorld world = context.client().world;
                if (world == null) return;

                BlockPos pos = payload.pos();
                LightningEntity lightning = EntityType.LIGHTNING_BOLT
                    .create(world, SpawnReason.TRIGGERED);
                if (lightning != null) {
                    lightning.setPos(pos.getX(), pos.getY(), pos.getZ());
                    world.addEntity(lightning.getId(), lightning);
                }
            }
        );
    }
}
```

---

## 客户端到服务端 (C2S)

### 1. 定义 Payload

```java
// GiveGlowingEffectPayload.java
public record GiveGlowingEffectPayload(int entityId)
        implements CustomPacketPayload {

    public static final Identifier ID =
        Identifier.of(MyMod.MOD_ID, "give_glowing_effect");

    public static final CustomPacketPayload.Type<GiveGlowingEffectPayload> TYPE =
        new CustomPacketPayload.Type<>(ID);

    public static final StreamCodec<RegistryFriendlyByteBuf, GiveGlowingEffectPayload> CODEC =
        StreamCodec.composite(
            ByteBufCodecs.INT,
            GiveGlowingEffectPayload::entityId,
            GiveGlowingEffectPayload::new
        );

    @Override
    public Type<? extends CustomPacketPayload> type() {
        return TYPE;
    }
}
```

### 2. 注册 Payload

```java
// Common Initializer 中
PayloadTypeRegistry.playC2S().register(
    GiveGlowingEffectPayload.TYPE,
    GiveGlowingEffectPayload.CODEC
);
```

### 3. 客户端发送

```java
// 客户端发出请求
ClientPlayNetworking.send(
    new GiveGlowingEffectPayload(targetEntity.getId())
);
```

### 4. 服务端接收

```java
// Common Initializer 中注册接收器
ServerPlayNetworking.registerGlobalReceiver(
    GiveGlowingEffectPayload.TYPE,
    (payload, context) -> {
        // 服务端验证：检查实体是否存在且在范围内
        Entity entity = context.player().world
            .getEntityById(payload.entityId());
        if (entity instanceof LivingEntity living
            && living.distanceTo(context.player()) < 5) {
            living.addEffect(new StatusEffectInstance(
                StatusEffects.GLOWING, 100));
        }
    }
);
```

---

## 自定义编解码器

```java
// 复杂数据结构
public record CustomDataPayload(UUID uuid, String name,
                                 List<BlockPos> positions,
                                 @Nullable CompoundNbt nbt)
        implements CustomPacketPayload {

    public static final Identifier ID =
        Identifier.of(MyMod.MOD_ID, "custom_data");

    public static final CustomPacketPayload.Type<CustomDataPayload> TYPE =
        new CustomPacketPayload.Type<>(ID);

    public static final StreamCodec<RegistryFriendlyByteBuf, CustomDataPayload> CODEC =
        StreamCodec.composite(
            ByteBufCodecs.UUID,          CustomDataPayload::uuid,
            ByteBufCodecs.STRING_UTF8,   CustomDataPayload::name,
            BlockPos.STREAM_CODEC.apply(ByteBufCodecs.list()),
                                         CustomDataPayload::positions,
            ByteBufCodecs.COMPOUND_TAG,  CustomDataPayload::nbt,
            CustomDataPayload::new
        );

    @Override
    public Type<? extends CustomPacketPayload> type() {
        return TYPE;
    }
}
```

### 可用编解码器

| 编解码器 | 用途 |
|---------|------|
| `ByteBufCodecs.INT` | 整数 |
| `ByteBufCodecs.FLOAT` | 浮点数 |
| `ByteBufCodecs.DOUBLE` | 双精度浮点数 |
| `ByteBufCodecs.BOOLEAN` | 布尔值 |
| `ByteBufCodecs.STRING_UTF8` | 字符串 |
| `ByteBufCodecs.UUID` | UUID |
| `ByteBufCodecs.COMPOUND_TAG` | NBT 数据 |
| `BlockPos.STREAM_CODEC` | 坐标 |
| `ItemStack.STREAM_CODEC` | 物品栈 |
| `ByteBufCodecs.idMapper(...)` | 枚举映射 |

---

## 网络最佳实践

```text
✅ 服务端必须验证所有收到的数据（距离、权限、有效性）
✅ 使用 PlayerLookup 精确定位目标玩家，不要广播到全服
✅ 使用 RegistryFriendlyByteBuf 进行编解码
✅ Payload 使用 Record 类型，简洁且不可变
✅ 发送前检查 isClient()，避免重复发送

❌ 不要把客户端数据直接写入世界/实体（会被反作弊检测）
❌ 不要发送超过 2MB 的数据包（会被踢出）
❌ 不要在服务端使用仅在客户端注册的 Payload
```

### 性能建议

```text
# 高频更新时使用批次处理而不是每 tick 发送
# 使用 PlayerLookup.tracking(entity) 减少不必要的数据传输
# 尽可能合并多个数据为一个 Payload

# 示例：批量更新
if (tickCounter % 5 == 0) {  // 每 0.25 秒发送一次
    ServerPlayNetworking.send(player, batchUpdatePayload);
}
```
