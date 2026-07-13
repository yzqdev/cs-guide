# GUI 菜单

[Bukkit 库存 API](https://bukkit.windit.net/javadoc/org/bukkit/inventory/Inventory.html)

## 基本 GUI

### 创建容器 GUI

```java
public class BasicGUI implements Listener {

    public void openGUI(Player player) {
        // 创建 GUI (9 的倍数: 9, 18, 27, 36, 45, 54)
        Inventory gui = Bukkit.createInventory(
            player, 27, "§6§l我的菜单");

        // 添加物品
        gui.setItem(11, createItem(Material.DIAMOND, "§b钻石", "§7点击获得钻石"));
        gui.setItem(13, createItem(Material.GOLDEN_APPLE, "§6金苹果", "§7点击获得金苹果"));
        gui.setItem(15, createItem(Material.TOTEM_OF_UNDYING, "§c不死图腾", "§7点击获得图腾"));

        // 装饰边框
        ItemStack border = createItem(Material.BLACK_STAINED_GLASS_PANE, " ");
        for (int slot : new int[]{0,1,2,3,4,5,6,7,8,18,19,20,21,22,23,24,25,26}) {
            gui.setItem(slot, border);
        }

        player.openInventory(gui);
    }

    private ItemStack createItem(Material material, String name, String... lore) {
        ItemStack item = new ItemStack(material);
        ItemMeta meta = item.getItemMeta();
        meta.setDisplayName(name);
        if (lore.length > 0) {
            meta.setLore(Arrays.asList(lore));
        }
        item.setItemMeta(meta);
        return item;
    }
}
```

### 监听点击事件

```java
public class GUIListener implements Listener {

    @EventHandler
    public void onInventoryClick(InventoryClickEvent event) {
        if (!(event.getWhoClicked() instanceof Player player)) return;
        if (!event.getView().getTitle().equals("§6§l我的菜单")) return;
        if (event.getCurrentItem() == null) return;

        event.setCancelled(true); // 阻止物品移动

        switch (event.getCurrentItem().getType()) {
            case DIAMOND -> {
                player.getInventory().addItem(new ItemStack(Material.DIAMOND, 16));
                player.sendMessage("§a你获得了 16 颗钻石！");
            }
            case GOLDEN_APPLE -> {
                player.getInventory().addItem(new ItemStack(Material.GOLDEN_APPLE, 5));
                player.sendMessage("§a你获得了 5 个金苹果！");
            }
            case TOTEM_OF_UNDYING -> {
                player.getInventory().addItem(new ItemStack(Material.TOTEM_OF_UNDYING, 1));
                player.sendMessage("§a你获得了 1 个不死图腾！");
            }
        }

        player.closeInventory();
    }
}
```

### 注册监听器

```java
@Override
public void onEnable() {
    getServer().getPluginManager().registerEvents(new GUIListener(), this);
}
```

## 分页 GUI

```java
public class PaginatedGUI {

    private final List<ItemStack> items = new ArrayList<>();
    private final int pageSize = 27;

    public PaginatedGUI() {
        // 模拟 100 个物品
        for (int i = 1; i <= 100; i++) {
            items.add(createItem(Material.PAPER,
                "§e物品 #" + i,
                "§7第 " + i + " 个物品",
                "§a点击领取"));
        }
    }

    public void open(Player player, int page) {
        int totalPages = (int) Math.ceil((double) items.size() / pageSize);
        if (page < 0 || page >= totalPages) return;

        Inventory gui = Bukkit.createInventory(player, 54,
            "§6§l物品列表 §7(第 " + (page + 1) + "/" + totalPages + " 页)");

        // 填充当前页物品
        int start = page * pageSize;
        int end = Math.min(start + pageSize, items.size());
        for (int i = start; i < end; i++) {
            gui.addItem(items.get(i));
        }

        // 翻页按钮
        if (page > 0) {
            gui.setItem(45, createItem(Material.ARROW, "§a上一页"));
        }
        if (page < totalPages - 1) {
            gui.setItem(53, createItem(Material.ARROW, "§a下一页"));
        }

        // 关闭按钮
        gui.setItem(49, createItem(Material.BARRIER, "§c关闭"));

        player.openInventory(gui);
    }

    // 在监听器中处理翻页
    public void handleClick(InventoryClickEvent event) {
        if (!(event.getWhoClicked() instanceof Player player)) return;
        if (event.getCurrentItem() == null) return;

        String title = event.getView().getTitle();
        if (!title.startsWith("§6§l物品列表")) return;
        event.setCancelled(true);

        ItemStack clicked = event.getCurrentItem();
        if (!clicked.hasItemMeta()) return;

        String name = clicked.getItemMeta().getDisplayName();

        // 解析当前页码
        int currentPage = parseIntBetween(title, "第 ", "/");

        if (name.equals("§a上一页")) {
            open(player, currentPage - 1);
        } else if (name.equals("§a下一页")) {
            open(player, currentPage + 1);
        } else if (name.equals("§c关闭")) {
            player.closeInventory();
        }
    }

    private int parseIntBetween(String str, String prefix, String suffix) {
        int start = str.indexOf(prefix) + prefix.length();
        int end = str.indexOf(suffix, start);
        return Integer.parseInt(str.substring(start, end)) - 1;
    }
}
```

## 确认 GUI

```java
public class ConfirmationGUI {

    public interface ConfirmCallback {
        void onConfirm(Player player);
    }

    public static void open(Player player, String title,
                            String confirmText, ConfirmCallback callback) {
        Inventory gui = Bukkit.createInventory(player, 27, title);

        // 确认按钮
        gui.setItem(11, createItem(Material.LIME_WOOL, "§a" + confirmText,
            "§7点击确认操作"));

        // 取消按钮
        gui.setItem(15, createItem(Material.RED_WOOL, "§c取消",
            "§7点击取消操作"));

        // 提示
        gui.setItem(13, createItem(Material.BOOK, "§6§l确认操作",
            "§7请确认你要执行的操作"));

        player.openInventory(gui);

        // 存储回调
        // 在实际项目中，可以用 Map<UUID, ConfirmCallback> 存储
        ConfirmListener.pendingConfirm.put(player.getUniqueId(), callback);
    }
}

// 监听器
public class ConfirmListener implements Listener {

    public static final Map<UUID, ConfirmCallback> pendingConfirm = new HashMap<>();

    @EventHandler
    public void onClick(InventoryClickEvent event) {
        if (!(event.getWhoClicked() instanceof Player player)) return;
        if (event.getCurrentItem() == null) return;

        UUID uuid = player.getUniqueId();
        if (!pendingConfirm.containsKey(uuid)) return;
        event.setCancelled(true);

        ItemStack clicked = event.getCurrentItem();
        if (!clicked.hasItemMeta()) return;
        String name = clicked.getItemMeta().getDisplayName();

        if (name.startsWith("§a")) {
            // 确认
            pendingConfirm.get(uuid).onConfirm(player);
            player.sendMessage("§a操作已确认");
        }

        pendingConfirm.remove(uuid);
        player.closeInventory();
    }
}
```

## 动态更新 GUI

```java
public class AnimatedGUI implements Listener {
    private final Map<UUID, Integer> playerPages = new HashMap<>();

    public void openMainMenu(Player player) {
        Inventory gui = Bukkit.createInventory(player, 54, "§6§l服务器菜单");

        // 设置固定按钮
        gui.setItem(10, createItem(Material.COMPASS, "§b传送菜单"));
        gui.setItem(12, createItem(Material.CHEST, "§6商店"));
        gui.setItem(14, createItem(Material.GRASS_BLOCK, "§a领地管理"));
        gui.setItem(16, createItem(Material.PLAYER_HEAD, "§e个人信息"));

        // 底部状态行
        gui.setItem(48, createItem(Material.CLOCK,
            "§7时间: §f" + getFormattedTime(player.getWorld().getTime())));
        gui.setItem(49, createItem(Material.REDSTONE,
            "§7在线: §a" + Bukkit.getOnlinePlayers().size()));
        gui.setItem(50, createItem(Material.DIAMOND,
            "§7TPS: §a" + formatTPS(Bukkit.getTPS()[0])));

        player.openInventory(gui);
    }
}
```

## 实用技巧

```java
// 1. 填充边框
public void fillBorder(Inventory inv, ItemStack borderItem) {
    int size = inv.getSize();
    int rows = size / 9;

    // 顶部和底部
    for (int i = 0; i < 9; i++) {
        inv.setItem(i, borderItem);
        inv.setItem(size - 9 + i, borderItem);
    }

    // 左右两侧
    for (int i = 1; i < rows - 1; i++) {
        inv.setItem(i * 9, borderItem);
        inv.setItem(i * 9 + 8, borderItem);
    }
}

// 2. 防止玩家把物品放入 GUI
@EventHandler
public void onInventoryClick(InventoryClickEvent event) {
    if (event.getView().getTitle().contains("§6")) {
        event.setCancelled(true);
    }
}

// 3. 防止玩家从 GUI 拖动物品
@EventHandler
public void onInventoryDrag(InventoryDragEvent event) {
    if (event.getView().getTitle().contains("§6")) {
        event.setCancelled(true);
    }
}

// 4. 打开 GUI 指令
public class MenuCommand implements CommandExecutor {
    @Override
    public boolean onCommand(CommandSender sender, Command cmd,
                             String label, String[] args) {
        if (!(sender instanceof Player player)) return true;

        new BasicGUI().openGUI(player);
        return true;
    }
}
```
