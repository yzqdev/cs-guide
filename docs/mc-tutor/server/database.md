# 数据库集成

[官方 Bukkit 教程](https://bukkit.windit.net/javadoc/org/bukkit/configuration/package-summary.html)

## SQLite（轻量级，推荐小项目）

### 连接与创建表

```java
public class DatabaseManager {
    private Connection connection;
    private final File dataFile;

    public DatabaseManager(JavaPlugin plugin) {
        dataFile = new File(plugin.getDataFolder(), "database.db");
        connect();
        createTables();
    }

    private void connect() {
        try {
            Class.forName("org.sqlite.JDBC");
            connection = DriverManager.getConnection(
                "jdbc:sqlite:" + dataFile.getAbsolutePath());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void createTables() {
        executeUpdate("""
            CREATE TABLE IF NOT EXISTS players (
                uuid VARCHAR(36) PRIMARY KEY,
                name VARCHAR(16) NOT NULL,
                level INT DEFAULT 1,
                exp DOUBLE DEFAULT 0.0,
                money DOUBLE DEFAULT 100.0,
                last_login BIGINT DEFAULT 0
            )
            """);

        executeUpdate("""
            CREATE TABLE IF NOT EXISTS homes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                uuid VARCHAR(36) NOT NULL,
                name VARCHAR(32) NOT NULL,
                world VARCHAR(64),
                x DOUBLE, y DOUBLE, z DOUBLE,
                yaw FLOAT, pitch FLOAT,
                UNIQUE(uuid, name)
            )
            """);
    }

    public void executeUpdate(String sql, Object... args) {
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            for (int i = 0; i < args.length; i++) {
                stmt.setObject(i + 1, args[i]);
            }
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public ResultSet executeQuery(String sql, Object... args) throws SQLException {
        PreparedStatement stmt = connection.prepareStatement(sql);
        for (int i = 0; i < args.length; i++) {
            stmt.setObject(i + 1, args[i]);
        }
        return stmt.executeQuery();
    }
}
```

### CRUD 操作

```java
public class PlayerDAO {
    private final DatabaseManager db;

    public PlayerDAO(DatabaseManager db) {
        this.db = db;
    }

    // 创建/更新玩家
    public void savePlayer(Player player) {
        String sql = """
            INSERT INTO players (uuid, name, level, exp, money, last_login)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(uuid) DO UPDATE SET
                name = excluded.name,
                level = excluded.level,
                exp = excluded.exp,
                money = excluded.money,
                last_login = excluded.last_login
            """;

        db.executeUpdate(sql,
            player.getUniqueId().toString(),
            player.getName(),
            1,         // level
            0.0,       // exp
            100.0,     // money
            System.currentTimeMillis()
        );
    }

    // 读取玩家
    public PlayerData loadPlayer(UUID uuid) {
        try (ResultSet rs = db.executeQuery(
            "SELECT * FROM players WHERE uuid = ?",
            uuid.toString())) {

            if (rs.next()) {
                return new PlayerData(
                    UUID.fromString(rs.getString("uuid")),
                    rs.getString("name"),
                    rs.getInt("level"),
                    rs.getDouble("exp"),
                    rs.getDouble("money"),
                    rs.getLong("last_login")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // 更新金币
    public void updateMoney(UUID uuid, double amount) {
        db.executeUpdate(
            "UPDATE players SET money = ? WHERE uuid = ?",
            amount, uuid.toString());
    }

    // 删除玩家数据
    public void deletePlayer(UUID uuid) {
        db.executeUpdate(
            "DELETE FROM players WHERE uuid = ?",
            uuid.toString());
    }
}

// 数据类
record PlayerData(UUID uuid, String name, int level,
                  double exp, double money, long lastLogin) {}
```

## MySQL（适合大型项目）

### 连接池 HikariCP

```java
// build.gradle 中添加依赖
// implementation 'com.zaxxer:HikariCP:5.1.0'

public class MySQLManager {
    private HikariDataSource dataSource;

    public MySQLManager(JavaPlugin plugin) {
        FileConfiguration config = plugin.getConfig();
        setupDataSource(
            config.getString("database.host", "localhost"),
            config.getInt("database.port", 3306),
            config.getString("database.name", "minecraft"),
            config.getString("database.user", "root"),
            config.getString("database.password", "")
        );
        createTables();
    }

    private void setupDataSource(String host, int port, String db,
                                  String user, String password) {
        HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setJdbcUrl(
            "jdbc:mysql://" + host + ":" + port + "/" + db +
            "?useSSL=false&characterEncoding=utf8");
        hikariConfig.setUsername(user);
        hikariConfig.setPassword(password);

        // 连接池配置
        hikariConfig.setMaximumPoolSize(10);        // 最大连接数
        hikariConfig.setMinimumIdle(2);              // 最小空闲
        hikariConfig.setConnectionTimeout(5000);     // 超时 5 秒
        hikariConfig.setMaxLifetime(1800000);        // 最大生命周期 30 分钟
        hikariConfig.setIdleTimeout(600000);         // 空闲超时 10 分钟

        // 连接测试
        hikariConfig.setConnectionTestQuery("SELECT 1");
        hikariConfig.setValidationTimeout(3000);

        dataSource = new HikariDataSource(hikariConfig);
    }

    public Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }

    public void close() {
        if (dataSource != null && !dataSource.isClosed()) {
            dataSource.close();
        }
    }

    private void createTables() {
        String sql = """
            CREATE TABLE IF NOT EXISTS players (
                uuid VARCHAR(36) PRIMARY KEY,
                name VARCHAR(16) NOT NULL,
                level INT DEFAULT 1,
                money DOUBLE DEFAULT 100.0,
                last_login BIGINT DEFAULT 0,
                INDEX idx_name (name)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
            """;

        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

### 使用连接池

```java
public class AsyncPlayerDAO {
    private final MySQLManager mysql;

    public AsyncPlayerDAO(MySQLManager mysql) {
        this.mysql = mysql;
    }

    // 异步保存（不阻塞主线程）
    public void savePlayerAsync(Player player) {
        Bukkit.getScheduler().runTaskAsynchronously(
            MyPlugin.getInstance(), () -> {
                savePlayerSync(player);
            });
    }

    public void savePlayerSync(Player player) {
        String sql = """
            INSERT INTO players (uuid, name, level, money, last_login)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                last_login = VALUES(last_login)
            """;

        try (Connection conn = mysql.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, player.getUniqueId().toString());
            stmt.setString(2, player.getName());
            stmt.setInt(3, 1);
            stmt.setDouble(4, 100.0);
            stmt.setLong(5, System.currentTimeMillis());
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // 异步加载（回调到主线程）
    public void loadPlayerAsync(UUID uuid, Consumer<PlayerData> callback) {
        Bukkit.getScheduler().runTaskAsynchronously(
            MyPlugin.getInstance(), () -> {
                PlayerData data = loadPlayerSync(uuid);
                Bukkit.getScheduler().runTask(
                    MyPlugin.getInstance(),
                    () -> callback.accept(data));
            });
    }

    public PlayerData loadPlayerSync(UUID uuid) {
        String sql = "SELECT * FROM players WHERE uuid = ?";
        try (Connection conn = mysql.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, uuid.toString());
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new PlayerData(
                        uuid,
                        rs.getString("name"),
                        rs.getInt("level"),
                        rs.getDouble("money"),
                        rs.getLong("last_login")
                    );
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

## 自动保存任务

```java
public class AutoSaveTask {
    private final PlayerDAO playerDAO;

    public AutoSaveTask(PlayerDAO playerDAO) {
        this.playerDAO = playerDAO;
    }

    public void start() {
        // 每 5 分钟自动保存一次
        Bukkit.getScheduler().runTaskTimer(
            MyPlugin.getInstance(),
            this::saveAllPlayers,
            20 * 60 * 5,   // 5 分钟后首次执行
            20 * 60 * 5     // 每 5 分钟执行
        );
    }

    private void saveAllPlayers() {
        MyPlugin.getInstance().getLogger().info("正在保存玩家数据...");

        for (Player player : Bukkit.getOnlinePlayers()) {
            playerDAO.savePlayer(player);
        }

        MyPlugin.getInstance().getLogger().info("玩家数据保存完成");
    }
}
```

## 连接关闭

```java
@Override
public void onDisable() {
    // 保存所有在线玩家
    saveAllPlayers();

    // 关闭数据库连接
    if (mysqlManager != null) {
        mysqlManager.close();
    }
}
```
