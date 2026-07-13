# 事件系统

[Bukkit 事件 API](https://bukkit.windit.net/javadoc/org/bukkit/event/package-summary.html)

## 注册事件监听器

### 实现 Listener 接口

```java
package com.example.listeners;

import org.bukkit.event.Listener;
import org.bukkit.event.EventHandler;
import org.bukkit.event.player.PlayerJoinEvent;

public class MyListener implements Listener {

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        event.setJoinMessage("§e欢迎 " + event.getPlayer().getName() + " 加入服务器！");
    }
}
```

### 在主类注册

```java
@Override
public void onEnable() {
    getServer().getPluginManager().registerEvents(new MyListener(), this);
}
```

## 事件优先级

```java
@EventHandler(priority = EventPriority.LOWEST)
public void onLowest(PlayerJoinEvent event) {
    // 最先执行
}

@EventHandler(priority = EventPriority.LOW)
public void onLow(PlayerJoinEvent event) { }

@EventHandler(priority = EventPriority.NORMAL)
public void onNormal(PlayerJoinEvent event) {
    // 默认优先级
}

@EventHandler(priority = EventPriority.HIGH)
public void onHigh(PlayerJoinEvent event) { }

@EventHandler(priority = EventPriority.HIGHEST)
public void onHighest(PlayerJoinEvent event) {
    // 最后执行
}

@EventHandler(priority = EventPriority.MONITOR)
public void onMonitor(PlayerJoinEvent event) {
    // 监控用，不应修改事件状态
}
```

## 取消事件

```java
@EventHandler
public void onBlockBreak(BlockBreakEvent event) {
    Player player = event.getPlayer();

    // 禁止在出生点附近破坏方块
    Location loc = event.getBlock().getLocation();
    Location spawn = loc.getWorld().getSpawnLocation();

    if (loc.distance(spawn) < 50 && !player.isOp()) {
        player.sendMessage("§c出生点附近禁止破坏方块！");
        event.setCancelled(true);
    }
}

@EventHandler
public void onEntityDamage(EntityDamageEvent event) {
    // 取消所有火焰伤害
    if (event.getCause() == EntityDamageEvent.DamageCause.FIRE ||
        event.getCause() == EntityDamageEvent.DamageCause.FIRE_TICK) {
        event.setCancelled(true);
    }

    // PVP 区域内减少伤害
    if (event instanceof EntityDamageByEntityEvent entityEvent) {
        if (entityEvent.getDamager() instanceof Player &&
            entityEvent.getEntity() instanceof Player) {
            // PVP 区域减半伤害
            event.setDamage(event.getDamage() * 0.5);
        }
    }
}
```

## 常用事件示例

### 玩家事件

```java
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
    Player player = event.getPlayer();

    // 设置欢迎消息
    event.setJoinMessage(null); // 取消默认消息

    // 发送自定义欢迎
    player.sendMessage("");
    player.sendMessage("§6§l=== " + player.getName() + " 欢迎回来 ===");
    player.sendMessage("§e在线人数: §a" + Bukkit.getOnlinePlayers().size());
    player.sendMessage("");

    // 首次加入
    if (!player.hasPlayedBefore()) {
        player.sendMessage("§a欢迎新玩家！送你一套新手装备");
        player.getInventory().addItem(new ItemStack(Material.STONE_SWORD));
        player.getInventory().addItem(new ItemStack(Material.BREAD, 16));
    }
}

@EventHandler
public void onPlayerQuit(PlayerQuitEvent event) {
    event.setQuitMessage("§e" + event.getPlayer().getName() + " 离开了服务器");
}

@EventHandler
public void onPlayerDeath(PlayerDeathEvent event) {
    Player player = event.getEntity();
    Player killer = player.getKiller();

    if (killer != null) {
        // PVP 击杀
        event.setDeathMessage(
            "§c" + player.getName() + " §7被 §c" +
            killer.getName() + " §7击杀了");
        // 击杀者获得金币
        MyPlugin.getEconomy().depositPlayer(killer, 50.0);
    } else {
        // 自然死亡
        event.setDeathMessage(
            "§7" + event.getDeathMessage());
    }
}

@EventHandler
public void onPlayerMove(PlayerMoveEvent event) {
    Player player = event.getPlayer();

    // 限制玩家不能走出边界
    Location from = event.getFrom();
    Location to = event.getTo();
    if (to == null) return;

    // 只在移动了整格时才检查（减少计算量）
    if (from.getBlockX() == to.getBlockX() &&
        from.getBlockZ() == to.getBlockZ()) return;

    int border = 10000;
    if (Math.abs(to.getX()) > border ||
        Math.abs(to.getZ()) > border) {
        player.sendMessage("§c你已到达世界边界！");
        event.setCancelled(true);
    }
}
```

### 方块事件

```java
@EventHandler
public void onBlockPlace(BlockPlaceEvent event) {
    Player player = event.getPlayer();
    Block block = event.getBlock();

    // 记录方块放置日志
    Location loc = block.getLocation();
    getLogger().info(String.format(
        "%s 在 %d,%d,%d 放置了 %s",
        player.getName(),
        loc.getBlockX(), loc.getBlockY(), loc.getBlockZ(),
        block.getType().name()
    ));
}

@EventHandler
public void onBlockBreak(BlockBreakEvent event) {
    Player player = event.getPlayer();
    Block block = event.getBlock();

    // 连锁挖矿（简单版）
    if (player.isSneaking() && isOre(block.getType())) {
        breakConnectedOres(block, player);
    }
}

private boolean isOre(Material type) {
    return switch (type) {
        case COAL_ORE, IRON_ORE, GOLD_ORE, DIAMOND_ORE,
             DEEPSLATE_COAL_ORE, DEEPSLATE_IRON_ORE,
             DEEPSLATE_GOLD_ORE, DEEPSLATE_DIAMOND_ORE,
             COPPER_ORE, LAPIS_ORE, REDSTONE_ORE,
             NETHER_GOLD_ORE, NETHER_QUARTZ_ORE -> true;
        default -> false;
    };
}

private void breakConnectedOres(Block start, Player player) {
    // BFS 遍历相连矿石
    Set<Block> toBreak = new HashSet<>();
    Queue<Block> queue = new LinkedList<>();
    queue.add(start);

    while (!queue.isEmpty() && toBreak.size() < 64) {
        Block current = queue.poll();
        if (toBreak.contains(current)) continue;
        if (!isOre(current.getType())) continue;

        toBreak.add(current);
        // 添加相邻方块
        for (int x = -1; x <= 1; x++)
            for (int y = -1; y <= 1; y++)
                for (int z = -1; z <= 1; z++) {
                    Block neighbor = current.getRelative(x, y, z);
                    if (!toBreak.contains(neighbor)) {
                        queue.add(neighbor);
                    }
                }
    }

    // 破坏所有相连矿石
    for (Block block : toBreak) {
        block.breakNaturally(player.getInventory().getItemInMainHand());
    }
}
```

### 交互事件

```java
@EventHandler
public void onPlayerInteract(PlayerInteractEvent event) {
    Player player = event.getPlayer();
    Action action = event.getAction();
    ItemStack item = player.getInventory().getItemInMainHand();

    // 右键点击方块
    if (action == Action.RIGHT_CLICK_BLOCK) {
        Block clicked = event.getClickedBlock();
        if (clicked == null) return;

        // 点击箱子打开 GUI
        if (clicked.getType() == Material.CHEST ||
            clicked.getType() == Material.TRAPPED_CHEST) {
            if (player.isSneaking()) {
                event.setCancelled(true);
                openChestGUI(player, clicked);
            }
        }
    }

    // 右键空气或方块
    if (action == Action.RIGHT_CLICK_AIR ||
        action == Action.RIGHT_CLICK_BLOCK) {

        // 使用自定义物品
        if (item.getType() == Material.STICK && item.getItemMeta() != null) {
            if (item.getItemMeta().getDisplayName().equals("§6魔法法杖")) {
                event.setCancelled(true);
                castSpell(player);
            }
        }
    }
}

private void castSpell(Player player) {
    // 发射火球
    player.launchProjectile(Fireball.class);
    player.sendMessage("§a§o火焰魔法！");
}

private void openChestGUI(Player player, Block chest) {
    // 打开自定义 GUI（见 GUI 章节）
    player.sendMessage("§e打开箱子 GUI...");
}
```

### 实体事件

```java
@EventHandler
public void onCreatureSpawn(CreatureSpawnEvent event) {
    // 限制特定生物生成数量
    if (event.getEntityType() == EntityType.CREEPER) {
        if (countNearbyEntities(event.getLocation(), EntityType.CREEPER, 50) > 10) {
            event.setCancelled(true);
        }
    }

    // 禁止自然生成某些生物
    if (event.getSpawnReason() == CreatureSpawnEvent.SpawnReason.NATURAL) {
        switch (event.getEntityType()) {
            case PHANTOM, SILVERFISH, CAVE_SPIDER -> event.setCancelled(true);
        }
    }
}

private long countNearbyEntities(Location center, EntityType type, double radius) {
    return center.getWorld().getNearbyEntities(center, radius, radius, radius)
        .stream()
        .filter(e -> e.getType() == type)
        .count();
}

@EventHandler
public void onEntityDeath(EntityDeathEvent event) {
    // 自定义掉落物
    if (event.getEntityType() == EntityType.CREEPER) {
        event.getDrops().clear();
        event.getDrops().add(new ItemStack(Material.GUNPOWDER, 3));
        event.setDroppedExp(10);

        // 概率掉落特殊物品
        if (Math.random() < 0.1) {
            event.getDrops().add(new ItemStack(Material.CREEPER_HEAD));
        }
    }
}

@EventHandler
public void onProjectileHit(ProjectileHitEvent event) {
    if (event.getEntity() instanceof Arrow arrow) {
        if (arrow.getShooter() instanceof Player) {
            // 箭矢击中生成闪电
            arrow.getWorld().strikeLightningEffect(arrow.getLocation());
        }
    }
}
```

## 自定义事件

```java
// 定义自定义事件
public class CustomPlayerLevelUpEvent extends Event {
    private static final HandlerList HANDLERS = new HandlerList();
    private final Player player;
    private final int newLevel;

    public CustomPlayerLevelUpEvent(Player player, int newLevel) {
        this.player = player;
        this.newLevel = newLevel;
    }

    public Player getPlayer() { return player; }
    public int getNewLevel() { return newLevel; }

    @Override
    public HandlerList getHandlers() { return HANDLERS; }
    public static HandlerList getHandlerList() { return HANDLERS; }
}

// 触发自定义事件
public void giveExp(Player player, int amount) {
    int oldLevel = getLevel(player);
    addExp(player, amount);
    int newLevel = getLevel(player);

    if (newLevel > oldLevel) {
        // 触发自定义升级事件
        CustomPlayerLevelUpEvent event =
            new CustomPlayerLevelUpEvent(player, newLevel);
        Bukkit.getPluginManager().callEvent(event);
    }
}

// 监听自定义事件
@EventHandler
public void onPlayerLevelUp(CustomPlayerLevelUpEvent event) {
    Player player = event.getPlayer();
    player.sendMessage("§6§l恭喜升到 " + event.getNewLevel() + " 级！");
    player.playSound(player.getLocation(), Sound.ENTITY_PLAYER_LEVELUP, 1.0f, 1.0f);

    // 升级奖励
    player.getInventory().addItem(new ItemStack(Material.EXPERIENCE_BOTTLE, 5));
}
```

## 事件取消 vs 修改

```java
@EventHandler
public void onFoodLevelChange(FoodLevelChangeEvent event) {
    if (event.getEntity() instanceof Player) {
        // 取消饥饿值下降（和平模式效果）
        if (event.getFoodLevel() < ((Player) event.getEntity()).getFoodLevel()) {
            event.setCancelled(true);
        }
    }
}

@EventHandler
public void onPlayerDamage(EntityDamageEvent event) {
    if (!(event.getEntity() instanceof Player player)) return;

    // 修改伤害值而非取消
    double originalDamage = event.getDamage();
    double newDamage = originalDamage * 0.5; // 减伤 50%
    event.setDamage(newDamage);

    // 创建伤害指示
    player.sendActionBar("§c受到 §f" + String.format("%.1f", newDamage) + " §c点伤害");
}
```
