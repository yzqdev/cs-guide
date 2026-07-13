# 自定义物品与配方

[Bukkit 物品 API](https://bukkit.windit.net/javadoc/org/bukkit/inventory/package-summary.html)

## 创建物品

### 基本物品

```java
public ItemStack createItem(Material material, String name, String... lore) {
    ItemStack item = new ItemStack(material);
    ItemMeta meta = item.getItemMeta();
    meta.setDisplayName(name);
    if (lore.length > 0) {
        meta.setLore(Arrays.asList(lore));
    }
    item.setItemMeta(meta);
    return item;
}

// 使用
ItemStack diamond = createItem(
    Material.DIAMOND,
    "§b§l超级钻石",
    "§7一颗闪耀的钻石",
    "§e右键可以获得力量效果"
);
```

### 附魔物品

```java
public ItemStack createEnchantedItem() {
    ItemStack item = new ItemStack(Material.DIAMOND_SWORD);
    ItemMeta meta = item.getItemMeta();
    meta.setDisplayName("§6§l传说之剑");
    meta.setLore(List.of(
        "§7一把传说中的神剑",
        "",
        "§6⚔ 攻击力 +10",
        "§b✨ 火焰附加 II"
    ));

    // 添加附魔
    meta.addEnchant(Enchantment.SHARPNESS, 5, true);   // 锋利 V
    meta.addEnchant(Enchantment.FIRE_ASPECT, 2, true); // 火焰附加 II
    meta.addEnchant(Enchantment.UNBREAKING, 3, true);  // 耐久 III

    // 添加物品标志（隐藏附魔显示）
    meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);

    item.setItemMeta(meta);

    // 添加发光效果
    item.addUnsafeEnchantment(Enchantment.LOOT_BONUS_BLOCKS, 1);

    return item;
}
```

### 玩家头颅

```java
public ItemStack getPlayerHead(String playerName) {
    ItemStack head = new ItemStack(Material.PLAYER_HEAD);
    SkullMeta meta = (SkullMeta) head.getItemMeta();
    meta.setOwningPlayer(Bukkit.getOfflinePlayer(playerName));
    meta.setDisplayName("§e" + playerName + " 的头颅");
    head.setItemMeta(meta);
    return head;
}

// 自定义纹理头颅
public ItemStack getCustomHead(String base64Texture) {
    ItemStack head = new ItemStack(Material.PLAYER_HEAD);
    SkullMeta meta = (SkullMeta) head.getItemMeta();

    GameProfile profile = new GameProfile(UUID.randomUUID(), null);
    byte[] encodedData = Base64.getEncoder().encode(
        String.format("{\"textures\":{\"SKIN\":{\"url\":\"%s\"}}}",
            base64Texture).getBytes());
    profile.getProperties().put("textures",
        new Property("textures", new String(encodedData)));

    try {
        Field profileField = meta.getClass().getDeclaredField("profile");
        profileField.setAccessible(true);
        profileField.set(meta, profile);
    } catch (Exception e) {
        e.printStackTrace();
    }

    head.setItemMeta(meta);
    return head;
}
```

### 皮革染色

```java
public ItemStack getColoredLeatherArmor(Color color) {
    ItemStack chestplate = new ItemStack(Material.LEATHER_CHESTPLATE);
    LeatherArmorMeta meta = (LeatherArmorMeta) chestplate.getItemMeta();
    meta.setColor(color);
    meta.setDisplayName("§6§l染色胸甲");
    chestplate.setItemMeta(meta);
    return chestplate;
}

// 使用
ItemStack red = getColoredLeatherArmor(Color.RED);
ItemStack blue = getColoredLeatherArmor(Color.fromRGB(0, 100, 200));
```

### 药水物品

```java
public ItemStack createPotionItem() {
    ItemStack potion = new ItemStack(Material.POTION);
    PotionMeta meta = (PotionMeta) potion.getItemMeta();
    meta.setDisplayName("§b§l强力治疗药水");
    meta.setColor(Color.RED);

    // 添加药水效果
    meta.addCustomEffect(
        new PotionEffect(PotionEffectType.HEAL, 1, 1), true);
    meta.addCustomEffect(
        new PotionEffect(PotionEffectType.REGENERATION, 100, 1), true);
    meta.addCustomEffect(
        new PotionEffect(PotionEffectType.ABSORPTION, 1200, 0), true);

    potion.setItemMeta(meta);
    return potion;
}
```

### 旗帜

```java
public ItemStack createBanner() {
    ItemStack banner = new ItemStack(Material.WHITE_BANNER);
    BannerMeta meta = (BannerMeta) banner.getItemMeta();
    meta.setDisplayName("§6§l自定义旗帜");

    // 添加图案层
    meta.addPattern(new Pattern(DyeColor.RED, PatternType.STRIPE_TOP));
    meta.addPattern(new Pattern(DyeColor.BLUE, PatternType.STRIPE_BOTTOM));
    meta.addPattern(new Pattern(DyeColor.YELLOW, PatternType.CROSS));

    banner.setItemMeta(meta);
    return banner;
}
```

## 物品 Attribute（属性）

```java
public ItemStack createAttributeItem() {
    ItemStack item = new ItemStack(Material.DIAMOND_SWORD);
    ItemMeta meta = item.getItemMeta();
    meta.setDisplayName("§6§l传奇之剑");
    meta.setLore(List.of("§7攻击: §c+15", "§7速度: §a+10%"));

    // 添加自定义属性
    AttributeModifier damageMod = new AttributeModifier(
        UUID.randomUUID(),
        "generic.attack_damage",
        15,
        AttributeModifier.Operation.ADD_NUMBER,
        EquipmentSlot.HAND
    );
    meta.addAttributeModifier(Attribute.GENERIC_ATTACK_DAMAGE, damageMod);

    AttributeModifier speedMod = new AttributeModifier(
        UUID.randomUUID(),
        "generic.movement_speed",
        0.1,
        AttributeModifier.Operation.MULTIPLY_SCALAR_1,
        EquipmentSlot.HAND
    );
    meta.addAttributeModifier(Attribute.GENERIC_MOVEMENT_SPEED, speedMod);

    item.setItemMeta(meta);
    return item;
}
```

## 合成配方

### 有序合成

```java
@Override
public void onEnable() {
    // 注册配方
    addShapedRecipe();
}

private void addShapedRecipe() {
    ItemStack result = createItem(Material.DIAMOND_SWORD,
        "§b§l冰霜之剑");

    NamespacedKey key = new NamespacedKey(this, "frost_sword");
    ShapedRecipe recipe = new ShapedRecipe(key, result);
    recipe.shape(
        " D ",
        " D ",
        " S "
    );
    recipe.setIngredient('D', Material.DIAMOND);
    recipe.setIngredient('S', Material.STICK);

    Bukkit.addRecipe(recipe);
}
```

### 无序合成

```java
private void addShapelessRecipe() {
    ItemStack result = new ItemStack(Material.NETHERITE_INGOT);

    NamespacedKey key = new NamespacedKey(this, "netherite_from_blocks");
    ShapelessRecipe recipe = new ShapelessRecipe(key, result);
    recipe.addIngredient(4, Material.GOLD_INGOT);
    recipe.addIngredient(4, Material.ANCIENT_DEBRIS);

    Bukkit.addRecipe(recipe);
}
```

### 熔炉/高炉配方

```java
private void addFurnaceRecipe() {
    ItemStack result = new ItemStack(Material.DIAMOND, 2);

    NamespacedKey key = new NamespacedKey(this, "diamond_from_coal");
    FurnaceRecipe recipe = new FurnaceRecipe(
        key, result, Material.COAL_BLOCK, 1.0f, 200);

    Bukkit.addRecipe(recipe);
}
```

### 自定义配方发现（解锁）

```java
private void addDiscoveredRecipe() {
    ItemStack result = new ItemStack(Material.ENCHANTED_GOLDEN_APPLE);

    NamespacedKey key = new NamespacedKey(this, "god_apple");
    ShapedRecipe recipe = new ShapedRecipe(key, result);
    recipe.shape(
        "DDD",
        "DGD",
        "DDD"
    );
    recipe.setIngredient('D', Material.DIAMOND_BLOCK);
    recipe.setIngredient('G', Material.GOLD_BLOCK);

    Bukkit.addRecipe(recipe);

    // 给所有在线玩家解锁
    for (Player player : Bukkit.getOnlinePlayers()) {
        player.discoverRecipe(key);
    }
}
```

## 物品检测与处理

### 右键检测自定义物品

```java
@EventHandler
public void onPlayerInteract(PlayerInteractEvent event) {
    Player player = event.getPlayer();
    ItemStack item = event.getItem();
    if (item == null || !item.hasItemMeta()) return;

    // 检查物品名称
    if (item.getItemMeta().getDisplayName().equals("§b§l冰霜之剑")) {
        if (event.getAction() == Action.RIGHT_CLICK_AIR ||
            event.getAction() == Action.RIGHT_CLICK_BLOCK) {
            event.setCancelled(true);

            // 冰冻效果
            Location loc = player.getTargetBlockExact(10) != null
                ? player.getTargetBlockExact(10).getLocation()
                : player.getLocation().add(player.getLocation().getDirection().multiply(5));

            // 创建冰柱
            loc.getBlock().setType(Material.ICE);
            player.getWorld().playSound(loc, Sound.BLOCK_GLASS_BREAK, 1.0f, 0.5f);

            // 伤害范围内的实体
            for (Entity entity : player.getNearbyEntities(5, 5, 5)) {
                if (entity instanceof LivingEntity living) {
                    living.setFreezeTicks(100);
                    living.damage(5, player);
                }
            }
        }
    }
}
```

### 物品标识

```java
// 使用 PersistentDataContainer 标识自定义物品（推荐）
public ItemStack createCustomFood() {
    ItemStack item = new ItemStack(Material.COOKED_BEEF);
    ItemMeta meta = item.getItemMeta();
    meta.setDisplayName("§6§l超级牛排");

    // 添加持久化数据
    PersistentDataContainer data = meta.getPersistentDataContainer();
    data.set(
        new NamespacedKey(MyPlugin.getInstance(), "food_type"),
        PersistentDataType.STRING,
        "super_beef"
    );
    data.set(
        new NamespacedKey(MyPlugin.getInstance(), "heal_amount"),
        PersistentDataType.INTEGER,
        20
    );

    item.setItemMeta(meta);
    return item;
}

// 检测物品
private boolean isCustomFood(ItemStack item) {
    if (item == null || !item.hasItemMeta()) return false;
    PersistentDataContainer data = item.getItemMeta().getPersistentDataContainer();
    return data.has(
        new NamespacedKey(MyPlugin.getInstance(), "food_type"),
        PersistentDataType.STRING
    );
}

// 使用自定义物品时
@EventHandler
public void onPlayerInteract(PlayerInteractEvent event) {
    ItemStack item = event.getItem();
    if (item == null) return;

    PersistentDataContainer data = item.getItemMeta()
        .getPersistentDataContainer();

    // 读取持久化数据
    String foodType = data.get(
        new NamespacedKey(this, "food_type"),
        PersistentDataType.STRING
    );
    if ("super_beef".equals(foodType)) {
        event.setCancelled(true);
        event.getPlayer().setFoodLevel(Math.min(
            event.getPlayer().getFoodLevel() + 20, 20));
        item.setAmount(item.getAmount() - 1);
    }
}
```
