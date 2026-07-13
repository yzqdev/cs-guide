# Mixin 完全指南

> Mixin 是 Minecraft 模组开发中最强大的工具——它可以注入、修改、覆盖原版代码，实现事件系统无法完成的功能。Fabric 和 NeoForge 均使用 [SpongePowered Mixin](https://github.com/SpongePowered/Mixin)，API 完全一致，仅项目配置略有不同。

---

## 目录

1. [Mixin 概念](#mixin-概念)
2. [项目配置](#项目配置)
3. [核心注解参考](#核心注解参考)
4. [@Inject 详解](#inject-详解)
5. [@Redirect 详解](#redirect-详解)
6. [@ModifyArg / @ModifyArgs](#modifyarg--modifyargs)
7. [@ModifyVariable](#modifyvariable)
8. [@Overwrite](#overwrite)
9. [Shadow / Unique](#shadow--unique)
10. [@Accessor / @Invoker](#accessor--invoker)
11. [客户端与服务端 Mixin](#客户端与服务端-mixin)
12. [Mixin 优先级与冲突处理](#mixin-优先级与冲突处理)
13. [调试与排错](#调试与排错)
14. [实战案例](#实战案例)

---

## Mixin 概念

### 什么是 Mixin

Mixin 是一种在**字节码层面**修改已有类的方法和字段的技术。与事件系统不同，Mixin 可以：

- 在原版方法前后插入自定义代码
- 替换方法的参数或返回值
- 完全覆盖一个方法
- 访问或修改类的私有字段
- 添加新字段或方法到已有类

### 工作原理

```text
原版类 (CreeperEntity)              Mixin 类 (CreeperMixin)
┌──────────────────────┐          ┌──────────────────────┐
│ explode() {          │  ←注入→  │ @Inject(at = @At(   │
│   // 原版爆炸逻辑     │          │   "HEAD"), method = │
│ }                    │          │   "explode")         │
└──────────────────────┘          └──────────────────────┘
         ↓
编译后字节码 ───→ 运行时 Mixin 处理器合并两者
         ↓
┌────────────────────────────────────────┐
│ CreeperEntity (增强版) {               │
│   explode() {                          │
│     自定义代码 ← 插入                  │
│     原版代码                           │
│   }                                    │
│ }                                      │
└────────────────────────────────────────┘
```

---

## 项目配置

### Fabric 配置

#### 1. build.gradle

Fabric Loom 内置 Mixin 支持，无需额外依赖：

```groovy
// build.gradle — 无需额外配置，Fabric Loom 已内置
```

#### 2. Mixin 配置文件

```json
// src/main/resources/mymod.mixins.json
{
    "required": true,               // true=Mixin 加载失败时阻止游戏启动
    "minVersion": "0.8.5",          // Mixin 最低版本
    "package": "com.example.mymod.mixin",  // Mixin 类所在的包
    "compatibilityLevel": "JAVA_21",
    "mixins": [
        "ExampleMixin"              // 通用 Mixin（服务端+客户端都加载）
    ],
    "client": [
        "ClientExampleMixin"        // 仅客户端加载
    ],
    "server": [
        "ServerExampleMixin"        // 仅服务端加载（极少使用）
    ],
    "injectors": {
        "defaultRequire": 1         // 1=找不到目标方法时报错，0=忽略
    }
}
```

#### 3. fabric.mod.json

```json
{
    "mixins": ["mymod.mixins.json"]  // 引用 Mixin 配置文件
    // ...
}
```

### NeoForge 配置

#### 1. build.gradle

NeoForge 需要显式启用 Mixin：

```groovy
// build.gradle
plugins {
    // NeoForge 自带 Mixin 支持
}

minecraft {
    runs {
        client {
            // NeoForge 自动处理 Mixin 配置
        }
    }
}

dependencies {
    // NeoForge 已包含 Mixin，无需额外添加
}
```

#### 2. Mixin 配置文件

```json
// src/main/resources/mymod.mixins.json
{
    "required": true,
    "minVersion": "0.8.5",
    "package": "com.example.mymod.mixin",
    "compatibilityLevel": "JAVA_21",
    "refmap": "mymod.refmap.json",   // NeoForge 需要 refmap（Fabric Loom 自动生成）
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

#### 3. mods.toml

```toml
# src/main/resources/META-INF/neoforge.mods.toml
[[mods]]
modId="mymod"
# ...

[[dependencies.mymod]]
    modId="neoforge"
    mandatory=true
    # ...

# Mixin 配置的引用方式：
# 在 @Mod 注解中或通过 mods.toml 的 mixinConfigs 字段
```

#### 4. 主类中引用

```java
// NeoForge 需要在 @Mod 注解中指定 Mixin 配置文件
// 或者使用自动化配置（1.20.1+ 自动扫描）

@Mod(MyMod.MODID)
public class MyMod {
    // NeoForge 通常自动加载 META-INF/mymod.mixins.json
    // 无需手动声明
}
```

---

## 核心注解参考

### 注解总览

| 注解 | 用途 | 破坏性 | 兼容性 |
|------|------|--------|--------|
| `@Inject` | 在方法中插入代码 | ⭐ 低 | 高 |
| `@Redirect` | 重定向方法调用 | ⭐⭐ 中 | 中 |
| `@ModifyArg` | 修改方法参数 | ⭐⭐ 中 | 中 |
| `@ModifyArgs` | 批量修改参数 | ⭐⭐ 中 | 中 |
| `@ModifyVariable` | 修改局部变量 | ⭐⭐⭐ 高 | 低 |
| `@Overwrite` | 完全覆盖方法 | ⭐⭐⭐⭐⭐ | 极低 |
| `@Accessor` | 访问私有字段 | ⭐ 低 | 高 |
| `@Invoker` | 调用私有方法 | ⭐ 低 | 高 |
| `@Shadow` | 引用私有成员 | ⭐ 低 | 高 |
| `@Unique` | 标记新增方法 | ⭐ 低 | 高 |
| `@Final` | Mixin 类标记 | - | - |

> **破坏性**：越高的注解越可能与其他 MOD 的 Mixin 冲突。
> **优先使用 `@Inject`**，只有在实现不了时才用更暴力的方式。

### @At 定位方式

`@At` 注解是 Mixin 中最核心的定位工具，用于指定插入代码的位置：

| @At 类型 | 定位方式 | 示例 |
|----------|----------|------|
| `@At("HEAD")` | 方法开头 | `@At("HEAD")` |
| `@At("RETURN")` | 方法返回前 | `@At("RETURN")` |
| `@At("TAIL")` | 方法末尾（最后一个 return） | `@At("TAIL")` |
| `@At(value = "INVOKE", target = "...")` | 调用某个方法时 | `@At(value = "INVOKE", target = "Lnet/minecraft/...")` |
| `@At(value = "INVOKE_ASSIGN")` | 调用方法并赋值时 | 同上，在赋值后注入 |
| `@At(value = "FIELD", target = "...")` | 访问某个字段时 | `@At(value = "FIELD", target = "L...;fieldName")` |
| `@At(value = "NEW", target = "...")` | 创建对象时 | `@At(value = "NEW", target = "Lnet/minecraft/...")` |
| `@At(value = "JUMP")` | 条件跳转时 | 极少使用 |
| `@At(value = "CONSTANT")` | 常量出现时 | `@At(value = "CONSTANT", args = "intValue=100")` |

---

## @Inject 详解

> `@Inject` 是**最常用**的 Mixin 注解，将自定义代码注入到目标方法的指定位置。

### 基本语法

```java
@Mixin(CreeperEntity.class)
public class CreeperMixin {

    // 在方法开头注入
    @Inject(method = "explode", at = @At("HEAD"), cancellable = true)
    private void onExplode(CreeperEntity instance, CallbackInfo ci) {
        // 自定义代码
        instance.setExplosionRadius(6); // 爆炸半径加倍
    }

    // 在方法返回前注入（可以修改返回值）
    @Inject(method = "getExplosionRadius", at = @At("RETURN"), cancellable = true)
    private void onGetExplosionRadius(CallbackInfoReturnable<Integer> cir) {
        cir.setReturnValue(cir.getReturnValue() * 2); // 返回值翻倍
    }
}
```

### HEAD — 方法开头注入

```java
@Mixin(LivingEntity.class)
public class LivingEntityMixin {

    // 在 hurt 方法开头注入
    @Inject(method = "hurt", at = @At("HEAD"), cancellable = true)
    private void onHurt(DamageSource source, float amount, CallbackInfo ci) {
        // 取消所有火焰伤害
        if (source.isFire()) {
            ci.cancel(); // 取消方法执行（伤害不会生效）
        }
    }
}
```

### RETURN — 方法返回前

```java
@Mixin(PlayerEntity.class)
public class PlayerEntityMixin {

    // 在 getAttackStrengthScale 返回前注入
    @Inject(method = "getAttackStrengthScale", at = @At("RETURN"), cancellable = true)
    private void onGetAttackStrengthScale(CallbackInfoReturnable<Float> cir) {
        // 总是返回满蓄力值（100% 攻击强度）
        cir.setReturnValue(1.0f);
    }
}
```

### INVOKE — 调用特定方法时

```java
@Mixin(ServerPlayerEntity.class)
public class ServerPlayerEntityMixin {

    // 当游戏调用 player.sendMessage 发送消息时
    @Inject(method = "sendMessageToPlayer",
            at = @At(value = "INVOKE",
                     target = "Lnet/minecraft/server/network/ServerPlayerEntity;sendMessage(Lnet/minecraft/text/Text;Lnet/minecraft/network/MessageType;)V"))
    private void onSendMessage(Text message, CallbackInfo ci) {
        // 记录所有发送给玩家的消息
        MyMod.LOGGER.info("发送给玩家的消息: {}", message.getString());
    }
}
```

### TAIL — 方法末尾

```java
@Mixin(ItemStack.class)
public class ItemStackMixin {

    // 在 getMaxCount 方法末尾注入
    @Inject(method = "getMaxCount", at = @At("TAIL"), cancellable = true)
    private void onGetMaxCount(CallbackInfoReturnable<Integer> cir) {
        // 如果物品是自定义物品，修改最大堆叠数
        ItemStack self = (ItemStack)(Object)this;
        if (self.isOf(ModItems.CUSTOM_ITEM)) {
            cir.setReturnValue(64); // 强制为 64
        }
    }
}
```

### 方法签名参数表

使用 `cancellable = true` 时方法签名的最后一个参数必须是回调类型：

| 目标方法返回类型 | 回调参数类型 | 说明 |
|----------------|-------------|------|
| `void` | `CallbackInfo` | 可调用 `ci.cancel()` |
| 非 void | `CallbackInfoReturnable<T>` | 可调用 `cir.setReturnValue(val)` 和 `cir.cancel()` |

`@Inject` 方法的参数可以灵活匹配：

```java
// 方法签名的参数可以匹配目标方法的部分或全部参数
// 合法的参数列表组合：

@Inject(method = "hurt", at = @At("HEAD"))
private void onHurt(DamageSource source, float amount, CallbackInfo ci) {}   // ✓ 全部参数

@Inject(method = "hurt", at = @At("HEAD"))
private void onHurt(CallbackInfo ci) {}  // ✓ 仅回调（不关心参数）

@Inject(method = "hurt", at = @At("HEAD"))
private void onHurt(DamageSource source, CallbackInfo ci) {}  // ✓ 部分参数
```

---

## @Redirect 详解

> `@Redirect` 拦截目标方法内部的**某个方法调用**，将其替换为你的实现。

### 基本用法

```java
@Mixin(CreeperEntity.class)
public class CreeperMixin {

    // 当 CreeperEntity 调用 ExplosionHelper.createExplosion 时重定向
    @Redirect(
        method = "explode",
        at = @At(value = "INVOKE",
                 target = "Lnet/minecraft/world/World;createExplosion(Lnet/minecraft/entity/Entity;DDDFLnet/minecraft/world/World$ExplosionSourceType;)Lnet/minecraft/world/explosion/Explosion;")
    )
    private Explosion redirectExplosion(World world, Entity entity,
                                        double x, double y, double z,
                                        float power, World.ExplosionSourceType source) {
        // 创建更强大的爆炸（威力翻倍）
        return world.createExplosion(entity, x, y, z, power * 2, source);
    }
}
```

### 核心参数

```java
@Redirect(
    method = "目标方法名",          // 你要修改的方法
    at = @At(                      // 定位要替换的调用点
        value = "INVOKE",          // 调用方法时
        target = "L路径/类名;方法名(参数签名)返回类型"  // 目标方法的完整描述符
    )
)
private 返回类型 方法名(原方法的参数, 目标方法的参数) {
    // 返回替代结果
}
```

### 获取方法描述符

在 Minecraft 反编译代码中找到目标方法后，方法描述符的格式为：

```
Lnet/minecraft/class/Name;methodName(LparamType;)LreturnType;
```

使用 **javap** 或 IDE 的 "Copy Reference" 功能获取。

---

## @ModifyArg / @ModifyArgs

> 修改方法调用时的参数值，不改变调用本身。

### @ModifyArg — 修改单个参数

```java
@Mixin(BowItem.class)
public class BowItemMixin {

    // 修改箭的伤害系数
    @ModifyArg(
        method = "onStoppedUsing",
        at = @At(value = "INVOKE",
                 target = "Lnet/minecraft/entity/projectile/ArrowEntity;setDamage(D)V"),
        index = 0  // 第 0 个参数（setDamage 的第一个参数）
    )
    private double modifyArrowDamage(double originalDamage) {
        return originalDamage * 1.5; // 箭矢伤害提高 50%
    }
}
```

### @ModifyArgs — 同时修改多个参数

```java
@Mixin(AnvilScreenHandler.class)
public class AnvilScreenHandlerMixin {

    @ModifyArgs(
        method = "updateResult",
        at = @At(value = "INVOKE",
                 target = "Lnet/minecraft/screen/AnvilScreenHandler;setNewItemName(Ljava/lang/String;)V")
    )
    private void modifyAnvilName(Args args) {
        // 修改铁砧重命名的默认行为
        String originalName = args.get(0);
        args.set(0, "§b" + originalName); // 加蓝色前缀
    }
}
```

---

## @ModifyVariable

> 修改方法中局部变量的值。**兼容性最差**，因为变量索引随 Minecraft 版本变化。

```java
@Mixin(LivingEntity.class)
public class LivingEntityMixin {

    // 修改 applyDamage 方法中的伤害值
    @ModifyVariable(
        method = "applyDamage",
        at = @At("HEAD"),
        index = 2,          // 局部变量索引（容易随版本变化）
        argsOnly = true     // true=只匹配参数，不匹配方法内声明的局部变量
    )
    private float modifyDamage(float amount, DamageSource source) {
        if (source.isExplosion()) {
            return amount * 0.5f; // 爆炸伤害减半
        }
        return amount;
    }
}
```

---

## @Overwrite

> 完全覆盖目标方法的全部代码。**不兼容性极高**，与其他 MOD 的 Mixin 冲突时只有一方生效。

```java
@Mixin(PlayerEntity.class)
public class PlayerEntityMixin {

    // ⚠️ 完全覆盖 getAttackCooldownProgress 方法
    @Overwrite
    public float getAttackCooldownProgress(float baseTime) {
        // 移除攻击冷却（快攻）
        return 1.0f;
    }
}
```

**使用原则**：

```text
✅ 仅在调试或测试时使用
✅ 仅在你自己能完全控制的环境使用
✅ 当 @Inject 无法实现需求时考虑

❌ 绝不在发布 API 的 MOD 中大面积使用
❌ 绝不与其他功能类 MOD 共享同一个 @Overwrite
❌ 绝不覆盖逻辑复杂的核心方法（如 tick、init）
```

---

## Shadow / Unique

### @Shadow — 访问私有成员

> 任何被 `@Shadow` 标记的字段或方法都可以**直接访问目标类的私有成员**（不报编译错误）。

```java
@Mixin(LivingEntity.class)
public abstract class LivingEntityMixin {

    @Shadow
    protected int hurtTime;  // LivingEntity 的私有字段

    @Shadow
    public abstract boolean isClimbing();  // 私有方法

    @Inject(method = "tick", at = @At("HEAD"))
    private void onTick(CallbackInfo ci) {
        // 直接访问原版私有字段
        if (this.hurtTime > 0) {
            // 受伤时做点什么
        }

        // 调用私有方法
        if (this.isClimbing()) {
            // 攀爬时做点什么
        }
    }
}
```

> **注意**: 用 `@Shadow` 标记的类必须声明为 `abstract`，因为方法体不会被编译器检查。

### @Unique — 添加新方法/字段

> 向目标类添加 Mixin 类中特有的方法或字段（仅在 Mixin 内部可用，除非使用 `@Accessor` 暴露）。

```java
@Mixin(PlayerEntity.class)
public class PlayerEntityMixin {

    @Unique
    private int customMana = 100;  // 在 PlayerEntity 中新增字段

    @Unique
    private void decreaseMana(int amount) {  // 在 PlayerEntity 中新增方法
        this.customMana -= amount;
        if (this.customMana < 0) this.customMana = 0;
    }

    @Inject(method = "tick", at = @At("TAIL"))
    private void onTick(CallbackInfo ci) {
        // 每 tick 恢复法力
        if (this.customMana < 100) {
            this.customMana++;
        }
    }
}
```

---

## @Accessor / @Invoker

> 生成**接口**来暴露目标类的私有成员，比 `@Shadow` 更安全、可复用。

### @Accessor — 暴露私有字段

```java
// Accessor 接口定义
@Mixin(LivingEntity.class)
public interface LivingEntityAccessor {

    @Accessor("hurtTime")
    int getHurtTime();           // 生成 getter: living.getHurtTime()

    @Accessor("hurtTime")
    void setHurtTime(int time);  // 生成 setter: living.setHurtTime(10)
}
```

使用方式：

```java
// 在其他类中使用
LivingEntity entity = ...;
int time = ((LivingEntityAccessor) entity).getHurtTime();
((LivingEntityAccessor) entity).setHurtTime(20);
```

### @Invoker — 暴露私有方法

```java
// Invoker 接口定义
@Mixin(ServerPlayerEntity.class)
public interface ServerPlayerEntityInvoker {

    @Invoker("sendMessageToPlayer")
    void invokeSendMessageToPlayer(Text message, boolean overlay);
}
```

使用方式：

```java
// 在其他类中调用私有方法
ServerPlayerEntity player = ...;
((ServerPlayerEntityInvoker) player).invokeSendMessageToPlayer(
    Text.literal("Hello!"), false);
```

### 命名规范

| 注解 | 默认方法名 | 自定义名称 |
|------|-----------|-----------|
| `@Accessor("fieldName")` | `getFieldName()` / `setFieldName()` | 无，方法由注解推断 |
| `@Invoker("methodName")` | `invokeMethodName()` | 可以任意命名方法 |

---

## 客户端与服务端 Mixin

### 分类配置

```json
// mixins.json
{
    "mixins": [
        "通用Mixin"     // 加载到所有环境
    ],
    "client": [
        "客户端Mixin"   // 仅在客户端加载
    ],
    "server": [
        "服务端Mixin"   // 仅在服务端加载（极少使用）
    ]
}
```

### 客户端 Mixin 示例

```java
// client/ExampleClientMixin.java
// 只用客户端环境的 Mixin，放在 client 分类下

@Mixin(WorldRenderer.class)
public class WorldRendererMixin {

    @Inject(method = "render", at = @At("HEAD"))
    private void onRender(CallbackInfo ci) {
        // 自定义渲染（仅在客户端）
        MyModClient.customRender();
    }
}
```

### 使用 @Environment 注解

```java
// 如果需要在同一个 Mixin 文件中区分环境，使用 @Environment
@Mixin(Entity.class)
public class EntityMixin {

    // 仅在客户端执行的方法
    @Environment(EnvType.CLIENT)
    @Inject(method = "tick", at = @At("HEAD"))
    private void onClientTick(CallbackInfo ci) {
        // 客户端 tick 逻辑
    }

    // 通用方法（服务端+客户端）
    @Inject(method = "tick", at = @At("HEAD"))
    private void onCommonTick(CallbackInfo ci) {
        // 通用逻辑
    }
}
```

---

## Mixin 优先级与冲突处理

### 优先级设置

> 当一个类有多个 Mixin 注入同一个方法时，可通过 `@Mixin` 的 `priority` 控制执行顺序。

```java
// priority 值越大，优先级越高（默认 1000）
@Mixin(value = PlayerEntity.class, priority = 1500)  // 更高优先级
public class HighPriorityMixin {

    @Inject(method = "tick", at = @At("HEAD"))
    private void onTick(CallbackInfo ci) {
        // 先执行
    }
}

@Mixin(value = PlayerEntity.class, priority = 500)   // 更低优先级
public class LowPriorityMixin {

    @Inject(method = "tick", at = @At("HEAD"))
    private void onTick(CallbackInfo ci) {
        // 后执行
    }
}
```

### 兼容性最佳实践

```text
✅ 始终优先使用 @Inject（而不是 @Overwrite）
✅ 使用 cancellable = true 时，取消前检查是否已被取消
✅ 在 @Inject 的 RETURN 注入中，先读取再修改返回值
✅ 用 @Accessor/@Invoker 代替 @Shadow（接口更安全）

❌ 不要依赖其他 MOD 的 Mixin 注入顺序
❌ 不要在同一个方法上同时使用多个 @Redirect
❌ 不要在自己的 API 类上使用 @Overwrite
```

---

## 调试与排错

### 常见错误

| 错误信息 | 原因 | 解决方案 |
|----------|------|----------|
| `Mixin target not found` | Mixin 找不到目标方法 | 检查方法名拼写、参数签名是否正确 |
| `Mixin apply failed` | Mixin 应用失败 | 检查目标类是否存在、Mixin 版本兼容性 |
| `@At("INVOKE") target not found` | INVOKE 定位失败 | 用 jadx 反编译确认方法描述符 |
| `Shadow field/method not found` | @Shadow 引用错误 | 确认目标类有该字段/方法 |
| `NoClassDefFoundError` | Mixin 依赖的类不存在 | 检查 `fabric.mod.json` 的 `depends` |
| `ClassCastException` | Mixin 接口类型错误 | 确认 `@Mixin` 和目标类一致 |

### 调试技巧

```java
// 1. 让 Mixin 在找不到目标时只警告不报错
// 在 mixins.json 中设置
{
    "injectors": {
        "defaultRequire": 0  // 0=不强制要求，找不到只警告
    }
}

// 2. 为单个注入设置 require
@Inject(method = "someMethod", at = @At("HEAD"), require = 0)
private void onOptionalInject(CallbackInfo ci) {
    // 如果目标不存在，这个注入被静默跳过
}

// 3. 启用 Mixin 调试日志
// JVM 参数：-Dmixin.debug.export=true
// 这将把混合后的类导出到文件，方便查看
```

---

## 实战案例

### 案例 1：自定义玩家属性（法力值）

```java
@Mixin(PlayerEntity.class)
public class PlayerMixin {

    @Unique
    private int mana = 100;
    @Unique
    private static final int MAX_MANA = 100;

    // 每 tick 恢复法力
    @Inject(method = "tick", at = @At("TAIL"))
    private void onTick(CallbackInfo ci) {
        if (this.mana < MAX_MANA) {
            this.mana++;
        }
    }

    // 暴露法力值到 HUD
    @Accessor("mana")
    @Unique
    public int getMana() {
        return this.mana;
    }

    @Unique
    public boolean consumeMana(int amount) {
        if (this.mana >= amount) {
            this.mana -= amount;
            return true;
        }
        return false;
    }
}
```

### 案例 2：禁止方块破坏

```java
@Mixin(PlayerEntity.class)
public class PlayerMixin {

    @Inject(method = "canBreakBlock", at = @At("HEAD"), cancellable = true)
    private void onCanBreakBlock(BlockPos pos, BlockState state, CallbackInfoReturnable<Boolean> cir) {
        // 禁止破坏特定方块
        if (state.isOf(Blocks.BEDROCK)) {
            cir.setReturnValue(false);
        }

        // 可以用自定义标签控制
        if (state.isIn(ModTags.NOT_BREAKABLE)) {
            cir.setReturnValue(false);
        }
    }
}
```

### 案例 3：修改生物掉落

```java
@Mixin(LivingEntity.class)
public class LivingEntityMixin {

    @Inject(method = "dropLoot", at = @At("TAIL"))
    private void onDropLoot(DamageSource source, boolean causedByPlayer, CallbackInfo ci) {
        if (causedByPlayer) {
            // 杀死任何生物时额外掉落一块红宝石
            LivingEntity self = (LivingEntity)(Object)this;
            self.dropStack(new ItemStack(ModItems.RUBY));
        }
    }
}
```

### 案例 4：修改苦力怕渲染

```java
// client/CreeperRendererMixin.java — 放在 client 分类

@Mixin(CreeperEntityRenderer.class)
public class CreeperRendererMixin {

    @Inject(method = "render", at = @At("HEAD"))
    private void onRender(CreeperEntity entity, float yaw, float tickDelta,
                           MatrixStack matrices, VertexConsumerProvider vertexConsumers,
                           int light, CallbackInfo ci) {
        // 让苦力怕发光（忽略光照）
        // 通过修改 light 参数实现
    }
}
```

### 案例 5：NeoForge 中使用 @Accessor

```java
// NeoForge 和 Fabric 的 Mixin API 完全相同
// 以下代码在两个平台上都可用

@Mixin(AbstractFurnaceBlockEntity.class)
public interface FurnaceAccessor {

    @Accessor("burnTime")
    int getBurnTime();

    @Accessor("cookTime")
    int getCookTime();

    @Accessor("cookTimeTotal")
    int getCookTimeTotal();
}

// 使用
AbstractFurnaceBlockEntity furnace = ...;
int progress = ((FurnaceAccessor) furnace).getCookTime() * 100
               / ((FurnaceAccessor) furnace).getCookTimeTotal();
```

---

## 快速参考卡

```text
# 常用 @At 定位速查

@At("HEAD")                          → 方法开头
@At("RETURN")                        → 方法返回前（含异常路径）
@At("TAIL")                          → 方法末尾（正常返回路径）
@At(value = "INVOKE", target = "...")→ 调用特定方法时
@At(value = "FIELD", target = "...") → 访问特定字段时
@At(value = "NEW", target = "...")   → 创建特定对象时

# 回调参数类型

void 方法      → CallbackInfo        (可 cancel)
非 void 方法   → CallbackInfoReturnable<T> (可 setReturnValue + cancel)

# 配置对比

Fabric:   mixins.json 放入 src/main/resources/，fabric.mod.json 引用
NeoForge: mixins.json 放入 src/main/resources/，需要 refmap 和 mods.toml 引用
```
