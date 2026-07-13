# 调度与异步

[Bukkit 调度 API](https://bukkit.windit.net/javadoc/org/bukkit/scheduler/package-summary.html)

## 同步任务

同步任务在主服务器线程执行，可以安全地操作 Bukkit API。

### 延迟执行

```java
// 延迟 3 秒执行
Bukkit.getScheduler().runTaskLater(plugin, () -> {
    player.sendMessage("§a这是 3 秒后的消息");
}, 20 * 3); // 20 ticks = 1 秒

// 延迟 5 分钟执行
Bukkit.getScheduler().runTaskLater(plugin, () -> {
    player.sendMessage("§a5 分钟到了！");
}, 20 * 60 * 5);
```

### 循环任务

```java
// 每 2 秒循环一次
Bukkit.getScheduler().runTaskTimer(plugin, () -> {
    // 给所有在线玩家每秒回复 1 点生命
    for (Player p : Bukkit.getOnlinePlayers()) {
        double newHealth = Math.min(p.getHealth() + 1, p.getMaxHealth());
        p.setHealth(newHealth);
    }
}, 0, 20 * 2); // 0延迟启动，每 40 ticks 执行
```

### 取消任务

```java
private BukkitTask task;

public void startTask() {
    task = Bukkit.getScheduler().runTaskTimer(plugin, () -> {
        // 循环任务
    }, 0, 20);
}

public void stopTask() {
    if (task != null && !task.isCancelled()) {
        task.cancel();
        task = null;
    }
}
```

## BukkitRunnable

推荐使用 BukkitRunnable 管理任务。

```java
public class BroadcastTask extends BukkitRunnable {
    private int count = 0;
    private final String[] messages = {
        "§6服务器商店已更新！",
        "§e明天有活动！",
        "§a欢迎加入 Discord！"
    };

    @Override
    public void run() {
        // 广播消息
        Bukkit.broadcastMessage(messages[count % messages.length]);
        count++;
    }
}

// 使用
public void startBroadcast(JavaPlugin plugin) {
    new BroadcastTask().runTaskTimer(plugin, 0, 20 * 120); // 每 2 分钟
}
```

### 延迟与循环

```java
// 延迟执行（一次）
new BukkitRunnable() {
    @Override
    public void run() {
        player.sendMessage("§a你的传送请求已超时");
    }
}.runTaskLater(plugin, 20 * 30); // 30 秒后

// 循环执行
new BukkitRunnable() {
    @Override
    public void run() {
        if (Bukkit.getOnlinePlayers().isEmpty()) {
            this.cancel(); // 没有玩家时停止
        }
        // 更新计分板
    }
}.runTaskTimer(plugin, 0, 20);
```

## 异步任务

异步任务在独立线程执行，不能直接调用 Bukkit API。

### 基本异步任务

```java
// 异步执行（不阻塞主线程）
Bukkit.getScheduler().runTaskAsynchronously(plugin, () -> {
    // 耗时操作：数据库查询、网络请求、文件读写
    List<PlayerData> data = database.getAllPlayers();

    // 完成后切回主线程处理结果
    new BukkitRunnable() {
        @Override
        public void run() {
            // 现在可以安全调用 Bukkit API
            player.sendMessage("§a共加载了 " + data.size() + " 条数据");
        }
    }.runTask(plugin);
});
```

### 异步回调模式

```java
public class AsyncCallback {
    // 异步保存+主线程通知
    public static void saveAsync(Player player, PlayerData data,
                                  Runnable callback) {
        Bukkit.getScheduler().runTaskAsynchronously(
            MyPlugin.getInstance(), () -> {

                // 异步保存到数据库
                saveToDatabase(player.getUniqueId(), data);

                // 保存完成后切回主线程
                if (callback != null) {
                    Bukkit.getScheduler().runTask(
                        MyPlugin.getInstance(), callback);
                }
            });
    }

    // 异步加载+主线程回调
    public static void loadAsync(UUID uuid,
                                  Consumer<PlayerData> callback) {
        Bukkit.getScheduler().runTaskAsynchronously(
            MyPlugin.getInstance(), () -> {

                PlayerData data = loadFromDatabase(uuid);

                // 切回主线程
                Bukkit.getScheduler().runTask(
                    MyPlugin.getInstance(),
                    () -> callback.accept(data));
            });
    }
}
```

## 延时任务管理

### 传送延时

```java
public class TeleportManager {
    private final Map<UUID, BukkitTask> pendingTeleports = new HashMap<>();

    public void teleportWithDelay(Player player, Location target, int delaySeconds) {
        // 取消之前的待定传送
        cancelPending(player);

        player.sendMessage("§e传送中，请等待 " + delaySeconds + " 秒...");

        BukkitTask task = new BukkitRunnable() {
            int countdown = delaySeconds;

            @Override
            public void run() {
                countdown--;
                if (countdown > 0) {
                    player.sendMessage("§e传送剩余 " + countdown + " 秒...");
                    player.playSound(player.getLocation(),
                        Sound.BLOCK_NOTE_BLOCK_PLING, 0.5f, 1.0f);
                } else {
                    // 传送
                    player.teleport(target);
                    player.sendMessage("§a传送完成！");
                    player.playSound(player.getLocation(),
                        Sound.ENTITY_ENDERMAN_TELEPORT, 1.0f, 1.0f);
                    pendingTeleports.remove(player.getUniqueId());
                    this.cancel();
                }
            }
        }.runTaskTimer(MyPlugin.getInstance(), 0, 20);

        pendingTeleports.put(player.getUniqueId(), task);
    }

    public void cancelPending(Player player) {
        BukkitTask task = pendingTeleports.remove(player.getUniqueId());
        if (task != null && !task.isCancelled()) {
            task.cancel();
            player.sendMessage("§c传送已取消");
        }
    }

    @EventHandler
    public void onPlayerMove(PlayerMoveEvent event) {
        Player player = event.getPlayer();
        if (!pendingTeleports.containsKey(player.getUniqueId())) return;

        // 移动一段距离后取消传送
        Location from = event.getFrom();
        Location to = event.getTo();
        if (to == null) return;

        if (from.getBlockX() != to.getBlockX() ||
            from.getBlockZ() != to.getBlockZ()) {
            cancelPending(player);
        }
    }
}
```

### 冷却系统

```java
public class CooldownManager {
    private final Map<UUID, Map<String, Long>> cooldowns = new HashMap<>();

    public boolean isOnCooldown(Player player, String key) {
        Map<String, Long> playerCooldowns = cooldowns.get(player.getUniqueId());
        if (playerCooldowns == null) return false;

        Long expiry = playerCooldowns.get(key);
        return expiry != null && System.currentTimeMillis() < expiry;
    }

    public long getRemainingSeconds(Player player, String key) {
        Map<String, Long> playerCooldowns = cooldowns.get(player.getUniqueId());
        if (playerCooldowns == null) return 0;

        Long expiry = playerCooldowns.get(key);
        if (expiry == null) return 0;

        return Math.max(0, (expiry - System.currentTimeMillis()) / 1000);
    }

    public void setCooldown(Player player, String key, int seconds) {
        cooldowns
            .computeIfAbsent(player.getUniqueId(), k -> new HashMap<>())
            .put(key, System.currentTimeMillis() + (seconds * 1000L));
    }

    public void removeCooldown(Player player, String key) {
        Map<String, Long> playerCooldowns = cooldowns.get(player.getUniqueId());
        if (playerCooldowns != null) {
            playerCooldowns.remove(key);
        }
    }
}
```

## 粒子/声音效果调度

```java
public class EffectScheduler {

    // 粒子圆圈效果
    public void playCircleEffect(Location center, Particle particle,
                                  double radius, int count) {
        new BukkitRunnable() {
            int tick = 0;

            @Override
            public void run() {
                if (tick >= count) {
                    this.cancel();
                    return;
                }

                double angle = 2 * Math.PI * tick / count;
                double x = center.getX() + radius * Math.cos(angle);
                double z = center.getZ() + radius * Math.sin(angle);

                Location particleLoc = new Location(center.getWorld(),
                    x, center.getY() + 0.5, z);

                center.getWorld().spawnParticle(particle, particleLoc, 1, 0, 0, 0, 0);
                tick++;
            }
        }.runTaskTimer(plugin, 0, 1); // 每 tick 执行
    }
}
```

## 计划任务管理

```java
public class ScheduledTaskManager {
    private final List<BukkitTask> tasks = new ArrayList<>();

    public BukkitTask runTimer(Runnable runnable, long delay, long period) {
        BukkitTask task = Bukkit.getScheduler()
            .runTaskTimer(MyPlugin.getInstance(), runnable, delay, period);
        tasks.add(task);
        return task;
    }

    public BukkitTask runLater(Runnable runnable, long delay) {
        BukkitTask task = Bukkit.getScheduler()
            .runTaskLater(MyPlugin.getInstance(), runnable, delay);
        tasks.add(task);
        return task;
    }

    // 插件卸载时取消所有任务
    public void cancelAll() {
        for (BukkitTask task : tasks) {
            if (!task.isCancelled()) {
                task.cancel();
            }
        }
        tasks.clear();
    }
}

// 在 onDisable 中取消所有任务
@Override
public void onDisable() {
    Bukkit.getScheduler().cancelTasks(this);
}
```
