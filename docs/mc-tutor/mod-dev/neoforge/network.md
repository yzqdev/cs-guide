# NeoForge 网络通信

[官方文档](https://docs.neoforged.net/docs/networking/)

## 数据包（Packet）系统

### 简单网络通道

```java
// ModNetwork.java
package com.example.mymod.network;

import net.neoforged.neoforge.network.event.RegisterPayloadHandlersEvent;
import net.neoforged.neoforge.network.registration.PayloadRegistrar;

public class ModNetwork {
    private static final String PROTOCOL_VERSION = "1.0";

    public static void register(final RegisterPayloadHandlersEvent event) {
        final PayloadRegistrar registrar = event.registrar(MyMod.MODID)
            .versioned(PROTOCOL_VERSION)
            .optional();

        // 注册 S2C（服务器 → 客户端）数据包
        registrar.playToClient(
            RubySpawnParticlePacket.TYPE,
            RubySpawnParticlePacket.STREAM_CODEC,
            RubySpawnParticlePacket::handle
        );

        // 注册 C2S（客户端 → 服务器）数据包
        registrar.playToServer(
            RubyRequestPacket.TYPE,
            RubyRequestPacket.STREAM_CODEC,
            RubyRequestPacket::handle
        );
    }

    // 在主类中注册
    public MyMod(IEventBus modEventBus) {
        modEventBus.addListener(ModNetwork::register);
    }
}
```

## S2C 数据包（服务器 → 客户端）

```java
// RubySpawnParticlePacket.java
public class RubySpawnParticlePacket implements CustomPacketPayload {
    public static final CustomPacketPayload.Type<RubySpawnParticlePacket> TYPE =
        new CustomPacketPayload.Type<>(
            ResourceLocation.fromNamespaceAndPath(MyMod.MODID, "ruby_particle"));

    public static final StreamCodec<ByteBuf, RubySpawnParticlePacket> STREAM_CODEC =
        StreamCodec.composite(
            BlockPos.STREAM_CODEC, RubySpawnParticlePacket::pos,
            RubySpawnParticlePacket::new
        );

    private final BlockPos pos;

    public RubySpawnParticlePacket(BlockPos pos) {
        this.pos = pos;
    }

    public BlockPos pos() { return pos; }

    @Override
    public CustomPacketPayload.Type<? extends CustomPacketPayload> type() {
        return TYPE;
    }

    // 客户端处理
    public static void handle(final RubySpawnParticlePacket packet, 
                              final IPayloadContext context) {
        context.enqueueWork(() -> {
            ClientLevel level = Minecraft.getInstance().level;
            if (level != null) {
                // 在客户端生成粒子效果
                level.addParticle(
                    ParticleTypes.END_ROD,
                    packet.pos.getX() + 0.5,
                    packet.pos.getY() + 1.0,
                    packet.pos.getZ() + 0.5,
                    0, 0.1, 0
                );
            }
        });
    }
}
```

## C2S 数据包（客户端 → 服务器）

```java
// RubyRequestPacket.java
public class RubyRequestPacket implements CustomPacketPayload {
    public static final CustomPacketPayload.Type<RubyRequestPacket> TYPE =
        new CustomPacketPayload.Type<>(
            ResourceLocation.fromNamespaceAndPath(MyMod.MODID, "ruby_request"));

    public static final StreamCodec<ByteBuf, RubyRequestPacket> STREAM_CODEC =
        StreamCodec.composite(
            BlockPos.STREAM_CODEC, RubyRequestPacket::pos,
            RubyRequestPacket::new
        );

    private final BlockPos pos;

    public RubyRequestPacket(BlockPos pos) {
        this.pos = pos;
    }

    public BlockPos pos() { return pos; }

    @Override
    public CustomPacketPayload.Type<? extends CustomPacketPayload> type() {
        return TYPE;
    }

    // 服务端处理
    public static void handle(final RubyRequestPacket packet, 
                              final IPayloadContext context) {
        context.enqueueWork(() -> {
            ServerPlayer player = (ServerPlayer) context.player();
            if (player != null) {
                // 检测玩家距离
                double dist = player.distanceToSqr(packet.pos.getX(), 
                    packet.pos.getY(), packet.pos.getZ());
                if (dist < 100) {
                    // 给玩家红宝石
                    player.addItem(new ItemStack(ModItems.RUBY.get()));
                }
            }
        });
    }
}
```

## 复杂数据包

```java
// 包含多种数据的数据包
public class RubySyncPacket implements CustomPacketPayload {
    public static final CustomPacketPayload.Type<RubySyncPacket> TYPE =
        new CustomPacketPayload.Type<>(
            ResourceLocation.fromNamespaceAndPath(MyMod.MODID, "ruby_sync"));

    public static final StreamCodec<ByteBuf, RubySyncPacket> STREAM_CODEC =
        StreamCodec.composite(
            StreamCodec.VAR_INT,          RubySyncPacket::entityId,
            BlockPos.STREAM_CODEC,        RubySyncPacket::pos,
            ByteBufCodecs.STRING_UTF8,    RubySyncPacket::data,
            RubySyncPacket::new
        );

    private final int entityId;
    private final BlockPos pos;
    private final String data;

    public RubySyncPacket(int entityId, BlockPos pos, String data) {
        this.entityId = entityId;
        this.pos = pos;
        this.data = data;
    }

    public int entityId() { return entityId; }
    public BlockPos pos() { return pos; }
    public String data() { return data; }

    @Override
    public CustomPacketPayload.Type<? extends CustomPacketPayload> type() {
        return TYPE;
    }
}
```

## 从服务器发送数据包

```java
// 发送到特定玩家
public static void sendToPlayer(ServerPlayer player, 
                                 CustomPacketPayload packet) {
    player.connection.send(packet);
}

// 发送到所有玩家
public static void sendToAllPlayers(CustomPacketPayload packet) {
    for (ServerPlayer player : ServerLifecycleHooks.getCurrentServer()
            .getPlayerList().getPlayers()) {
        sendToPlayer(player, packet);
    }
}

// 发送到附近玩家
public static void sendToNearby(Level level, BlockPos pos, 
                                  double radius, CustomPacketPayload packet) {
    if (level instanceof ServerLevel serverLevel) {
        serverLevel.getServer().getPlayerList()
            .getPlayers().stream()
            .filter(p -> p.distanceToSqr(pos.getX(), pos.getY(), pos.getZ()) 
                < radius * radius)
            .forEach(p -> sendToPlayer(p, packet));
    }
}

// 使用示例
public void spawnRubyParticle(Level level, BlockPos pos) {
    if (level instanceof ServerLevel serverLevel) {
        sendToNearby(serverLevel, pos, 32, 
            new RubySpawnParticlePacket(pos));
    }
}

// 从客户端发送到服务器
public static void sendToServer(CustomPacketPayload packet) {
    if (Minecraft.getInstance().getConnection() != null) {
        Minecraft.getInstance().getConnection().send(packet);
    }
}
```

## 方块交互网络示例

```java
// 右键方块时发送网络包
@EventHandler
public static void onBlockRightClick(PlayerInteractEvent.RightClickBlock event) {
    if (event.getLevel().isClientSide) {
        // 客户端发送请求到服务器
        sendToServer(new RubyRequestPacket(event.getPos()));
    }
}

// 服务端处理方块交互
public static void handleBlockInteraction(ServerPlayer player, BlockPos pos) {
    BlockState state = player.level().getBlockState(pos);
    
    // 发送粒子效果给附近玩家
    sendToNearby(player.level(), pos, 32, 
        new RubySpawnParticlePacket(pos));
    
    // 发送同步数据包
    sendToPlayer(player, new RubySyncPacket(
        player.getId(), pos, "interacted"));
}
```

## 同步 TileEntity（BlockEntity）数据

```java
// 在 BlockEntity 中同步数据
public class RubyStorageBE extends BlockEntity {
    private int storedRuby = 0;

    public RubyStorageBE(BlockPos pos, BlockState state) {
        super(ModBlockEntities.RUBY_STORAGE.get(), pos, state);
    }

    // 标记需要同步
    @Override
    public CompoundTag getUpdateTag() {
        CompoundTag tag = super.getUpdateTag();
        tag.putInt("storedRuby", storedRuby);
        return tag;
    }

    // 处理同步更新
    @Override
    public void handleUpdateTag(CompoundTag tag) {
        super.handleUpdateTag(tag);
        storedRuby = tag.getInt("storedRuby");
    }

    // 更新数据包
    @Override
    public Packet<ClientGamePacketListener> getUpdatePacket() {
        return ClientboundBlockEntityDataPacket.create(this);
    }

    public void setStoredRuby(int count) {
        this.storedRuby = count;
        setChanged();
        if (level != null && !level.isClientSide) {
            level.sendBlockUpdated(getBlockPos(), getBlockState(), 
                getBlockState(), 3);
        }
    }
}
```
