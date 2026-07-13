# 配置与数据存储

[Bukkit 配置 API](https://bukkit.windit.net/javadoc/org/bukkit/configuration/package-summary.html)

## config.yml 基础

### 自动生成配置文件

```java
@Override
public void onEnable() {
    // 自动创建 config.yml (从 jar 中复制默认配置)
    saveDefaultConfig();
}

// 也可以手动生成
private void createDefaultConfig() {
    // 创建 config.yml
    getConfig().addDefault("server-name", "My Server");
    getConfig().addDefault("motd", "Welcome!");
    getConfig().addDefault("max-players", 100);

    // 嵌套配置
    getConfig().addDefault("database.host", "localhost");
    getConfig().addDefault("database.port", 3306);
    getConfig().addDefault("database.name", "minecraft");

    // 列表配置
    getConfig().addDefault("disabled-worlds", List.of("world_nether", "world_the_end"));

    // 保存默认值
    getConfig().options().copyDefaults(true);
    saveConfig();
}
```

### config.yml 示例

```yaml
# 服务器设置
server-name: "我的服务器"
motd: "&a欢迎来到我的服务器！"
max-players: 100

# 新玩家设置
starter-kit:
  enabled: true
  items:
    - material: "STONE_SWORD"
      amount: 1
      name: "&e新手剑"
    - material: "BREAD"
      amount: 16
    - material: "IRON_PICKAXE"
      amount: 1

# 经济设置
economy:
  start-balance: 100.0
  interest-rate: 0.01
  interest-interval-minutes: 60

# 数据库
database:
  host: localhost
  port: 3306
  name: minecraft
  user: root
  password: ""

# 禁用的世界
disabled-worlds:
  - world_nether
  - world_the_end
```

## 读写配置

### 读取配置

```java
// 在 onEnable 中加载配置
@Override
public void onEnable() {
    saveDefaultConfig();
    loadConfig();
}

private void loadConfig() {
    // 读取基本值
    String serverName = getConfig().getString("server-name", "默认服务器");
    String motd = getConfig().getString("motd", "Welcome!");
    int maxPlayers = getConfig().getInt("max-players", 20);

    // 读取嵌套值
    String dbHost = getConfig().getString("database.host");
    int dbPort = getConfig().getInt("database.port");

    // 读取列表
    List<String> disabledWorlds = getConfig().getStringList("disabled-worlds");

    // 读取配置段
    double startBalance = getConfig().getDouble("economy.start-balance");
}
```

### 保存配置

```java
// 保存运行时修改
public void updateServerName(String newName) {
    getConfig().set("server-name", newName);
    saveConfig(); // 保存到磁盘
}

// 重载配置
public void reloadPluginConfig() {
    reloadConfig();
    loadConfig();
    getLogger().info("配置已重载");
}
```

## 配置文件节

```java
// 获取配置节
ConfigurationSection starterKit = getConfig().getConfigurationSection("starter-kit");
if (starterKit != null) {
    boolean enabled = starterKit.getBoolean("enabled", true);

    if (enabled) {
        List<Map<?, ?>> items = starterKit.getMapList("items");
        for (Map<?, ?> itemData : items) {
            Material material = Material.getMaterial((String) itemData.get("material"));
            int amount = (int) itemData.get("amount");
            String name = (String) itemData.get("name");

            if (material != null) {
                ItemStack item = new ItemStack(material, amount);
                if (name != null) {
                    ItemMeta meta = item.getItemMeta();
                    meta.setDisplayName(ChatColor.translateAlternateColorCodes('&', name));
                    item.setItemMeta(meta);
                }
                starterItems.add(item);
            }
        }
    }
}
```

## 数据文件存储

### 自定义数据文件

```java
private FileConfiguration playerData;
private File playerDataFile;

public void loadPlayerData() {
    playerDataFile = new File(getDataFolder(), "playerdata.yml");
    if (!playerDataFile.exists()) {
        saveResource("playerdata.yml", false);
    }
    playerData = YamlConfiguration.loadConfiguration(playerDataFile);
}

public void savePlayerData() {
    try {
        playerData.save(playerDataFile);
    } catch (IOException e) {
        getLogger().severe("保存玩家数据失败: " + e.getMessage());
    }
}

// 使用
public void setPlayerData(UUID uuid, String key, Object value) {
    playerData.set(uuid.toString() + "." + key, value);
    savePlayerData();
}

public Object getPlayerData(UUID uuid, String key) {
    return playerData.get(uuid.toString() + "." + key);
}
```

### 多文件存储（每个玩家一个文件）

```java
public class PlayerDataManager {
    private final File dataFolder;

    public PlayerDataManager(JavaPlugin plugin) {
        dataFolder = new File(plugin.getDataFolder(), "players");
        if (!dataFolder.exists()) {
            dataFolder.mkdirs();
        }
    }

    public FileConfiguration getPlayerConfig(UUID uuid) {
        File file = new File(dataFolder, uuid.toString() + ".yml");
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return YamlConfiguration.loadConfiguration(file);
    }

    public void savePlayerConfig(UUID uuid, FileConfiguration config) {
        File file = new File(dataFolder, uuid.toString() + ".yml");
        try {
            config.save(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 便捷方法
    public int getPlayerLevel(UUID uuid) {
        FileConfiguration config = getPlayerConfig(uuid);
        return config.getInt("level", 1);
    }

    public void setPlayerLevel(UUID uuid, int level) {
        FileConfiguration config = getPlayerConfig(uuid);
        config.set("level", level);
        savePlayerConfig(uuid, config);
    }
}
```

## 对象序列化

### ConfigurationSerializable

```java
public class Kit implements ConfigurationSerializable {
    private final String name;
    private final List<ItemStack> items;
    private final long cooldown;

    public Kit(String name, List<ItemStack> items, long cooldown) {
        this.name = name;
        this.items = items;
        this.cooldown = cooldown;
    }

    // 序列化：对象 → Map
    @Override
    public Map<String, Object> serialize() {
        Map<String, Object> map = new HashMap<>();
        map.put("name", name);
        map.put("items", items);
        map.put("cooldown", cooldown);
        return map;
    }

    // 反序列化：Map → 对象
    public static Kit deserialize(Map<String, Object> args) {
        String name = (String) args.get("name");
        List<ItemStack> items = (List<ItemStack>) args.get("items");
        long cooldown = ((Number) args.get("cooldown")).longValue();
        return new Kit(name, items, cooldown);
    }

    // 注册序列化类（在 onEnable 中）
    public static void register() {
        ConfigurationSerialization.registerClass(Kit.class);
    }
}

// 使用
Kit kit = new Kit("VIP", List.of(new ItemStack(Material.DIAMOND)), 86400000);
getConfig().set("kits.vip", kit);
saveConfig();

// 读取
Kit loadedKit = (Kit) getConfig().get("kits.vip");
```

## 国际化（i18n）

```java
public class I18n {
    private final JavaPlugin plugin;
    private final Map<String, FileConfiguration> locales = new HashMap<>();

    public I18n(JavaPlugin plugin) {
        this.plugin = plugin;
        loadLocale("zh_CN");
        loadLocale("en_US");
    }

    private void loadLocale(String locale) {
        File file = new File(plugin.getDataFolder(), "messages_" + locale + ".yml");
        if (!file.exists()) {
            plugin.saveResource("messages_" + locale + ".yml", false);
        }
        locales.put(locale, YamlConfiguration.loadConfiguration(file));
    }

    public String getMessage(String key, String locale, Object... args) {
        FileConfiguration config = locales.getOrDefault(locale, locales.get("zh_CN"));
        String message = config.getString(key, "§c未找到消息: " + key);
        // 颜色代码转换
        message = ChatColor.translateAlternateColorCodes('&', message);
        // 参数替换
        for (int i = 0; i < args.length; i++) {
            message = message.replace("{" + i + "}", String.valueOf(args[i]));
        }
        return message;
    }
}
```

```yaml
# messages_zh_CN.yml
join-message: "&e{0} &7加入了游戏"
quit-message: "&e{0} &7离开了游戏"
command:
  no-permission: "&c你没有权限执行此指令"
  player-only: "&c此指令只能由玩家执行"
  reload: "&a配置已重载"
economy:
  balance: "&a你的余额: &e{0}"
  deposit: "&a已存入 &e{0}"
  withdraw: "&a已取出 &e{0}"
```
