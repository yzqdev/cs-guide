# 指令系统

[Bukkit 指令 API](https://bukkit.windit.net/javadoc/org/bukkit/command/package-summary.html)

## 注册指令

### plugin.yml 注册

```yaml
name: MyPlugin
version: 1.0.0
main: com.example.MyPlugin
api-version: 1.20

commands:
  mycommand:
    description: 示例指令
    usage: /<command> [参数]
    aliases: [mc, mycmd]
    permission: myplugin.command.mycommand
    permission-message: §c你没有权限使用此指令！

  admin:
    description: 管理员指令
    usage: /<command> <reload|info>
    permission: myplugin.admin
    default: op  # 仅 OP 可用

permissions:
  myplugin.command.mycommand:
    description: 允许使用 /mycommand
    default: true  # 所有玩家可用
  myplugin.admin:
    description: 管理员权限
    default: op
  myplugin.*:
    description: 所有权限
    default: op
    children:
      myplugin.command.mycommand: true
      myplugin.admin: true
```

### Java 注册指令

```java
// 方式1：在 onEnable 中设置执行器
@Override
public void onEnable() {
    getCommand("mycommand").setExecutor(new MyCommandExecutor());
    getCommand("admin").setExecutor(new AdminCommand());
}

// 方式2：使用插件自身作为执行器
@Override
public void onEnable() {
    // 在 plugin.yml 中配置了 commands，this 实现 CommandExecutor
    // 需要在主类 implements CommandExecutor
}
```

## 基本指令执行器

```java
package com.example.commands;

import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class MyCommandExecutor implements CommandExecutor {

    @Override
    public boolean onCommand(CommandSender sender, Command command,
                             String label, String[] args) {
        // sender: 指令发送者（玩家/控制台）
        // command: 指令对象
        // label: 使用的指令别名
        // args: 参数数组

        if (sender instanceof Player) {
            Player player = (Player) sender;
            player.sendMessage("§a你好 " + player.getName() + "！");
        } else {
            sender.sendMessage("§c此指令只能由玩家使用");
        }
        return true;
    }
}
```

## 多参数处理

```java
public class TeleportCommand implements CommandExecutor {

    @Override
    public boolean onCommand(CommandSender sender, Command command,
                             String label, String[] args) {
        if (!(sender instanceof Player player)) {
            sender.sendMessage("§c只能由玩家执行");
            return true;
        }

        // /tpa <player>
        if (args.length == 0) {
            player.sendMessage("§c用法: /tpa <玩家名>");
            return true;
        }

        // 查找目标玩家
        Player target = Bukkit.getPlayer(args[0]);
        if (target == null) {
            player.sendMessage("§c玩家 " + args[0] + " 不在线");
            return true;
        }

        // 发送传送请求
        player.sendMessage("§a已向 " + target.getName() + " 发送传送请求");
        target.sendMessage("§e" + player.getName() + " 请求传送到你这里");
        target.sendMessage("§e输入 §a/tpaccept §e接受，输入 §c/tpdeny §e拒绝");

        // 存储请求等待处理...
        TeleportManager.addRequest(target.getUniqueId(), player.getUniqueId());
        return true;
    }
}
```

### 子指令分发

```java
public class AdminCommand implements CommandExecutor {

    @Override
    public boolean onCommand(CommandSender sender, Command command,
                             String label, String[] args) {
        if (args.length == 0) {
            sender.sendMessage("§6===== 管理指令 =====");
            sender.sendMessage("§e/admin reload §7- 重载配置");
            sender.sendMessage("§e/admin info §7- 查看信息");
            sender.sendMessage("§e/admin help §7- 查看帮助");
            return true;
        }

        switch (args[0].toLowerCase()) {
            case "reload" -> handleReload(sender);
            case "info" -> handleInfo(sender);
            case "help" -> showHelp(sender);
            default -> sender.sendMessage("§c未知子指令: " + args[0]);
        }
        return true;
    }

    private void handleReload(CommandSender sender) {
        MyPlugin.getInstance().reloadConfig();
        sender.sendMessage("§a配置已重载");
    }

    private void handleInfo(CommandSender sender) {
        sender.sendMessage("§6服务器信息:");
        sender.sendMessage("§eTPS: §a" + formatTPS(Bukkit.getTPS()[0]));
        sender.sendMessage("§e在线玩家: §a" + Bukkit.getOnlinePlayers().size());
        sender.sendMessage("§e版本: §a" + Bukkit.getVersion());
    }

    private String formatTPS(double tps) {
        return (tps > 18.0 ? "§a" : tps > 15.0 ? "§e" : "§c") +
               String.format("%.2f", tps);
    }

    private void showHelp(CommandSender sender) {
        sender.sendMessage("§6/admin reload §7- 重载配置");
        sender.sendMessage("§6/admin info §7- 查看服务器信息");
    }
}
```

## Tab 补全

```java
package com.example.commands;

import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.command.TabExecutor;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;

public class KitCommand implements TabExecutor {

    @Override
    public boolean onCommand(CommandSender sender, Command command,
                             String label, String[] args) {
        if (!(sender instanceof Player player)) return true;

        if (args.length == 0) {
            player.sendMessage("§6可用礼包: /kit starter, /kit vip");
            return true;
        }

        // 发放礼包逻辑...
        return true;
    }

    @Override
    public List<String> onTabComplete(CommandSender sender, Command command,
                                       String label, String[] args) {
        List<String> completions = new ArrayList<>();

        if (args.length == 1) {
            // 在补全列表中过滤已输入的内容
            for (String kit : List.of("starter", "vip", "admin")) {
                if (kit.startsWith(args[0].toLowerCase())) {
                    completions.add(kit);
                }
            }
        }

        return completions;
    }
}

// 在主类中注册
@Override
public void onEnable() {
    getCommand("kit").setExecutor(new KitCommand());
    getCommand("kit").setTabCompleter(new KitCommand());
}
```

## 获取在线玩家列表补全

```java
public class PlayerCommand implements TabExecutor {

    @Override
    public boolean onCommand(CommandSender sender, Command command,
                             String label, String[] args) {
        // ...
        return true;
    }

    @Override
    public List<String> onTabComplete(CommandSender sender, Command command,
                                       String label, String[] args) {
        if (args.length == 1) {
            // 返回在线玩家名（过滤已输入部分）
            return Bukkit.getOnlinePlayers().stream()
                .map(Player::getName)
                .filter(name -> name.toLowerCase()
                    .startsWith(args[0].toLowerCase()))
                .toList();
        }
        return List.of();
    }
}
```

## 控制台检测

```java
@Override
public boolean onCommand(CommandSender sender, Command command,
                         String label, String[] args) {
    // 检查是否为控制台
    if (!(sender instanceof Player)) {
        sender.sendMessage("§c此指令必须由玩家执行");
        return true;
    }

    // 也可以检查是否为 OP
    if (!sender.isOp()) {
        sender.sendMessage("§c你没有权限");
        return true;
    }

    Player player = (Player) sender;
    // ...
    return true;
}
```

## 多指令管理（指令组）

```java
public class CommandManager implements CommandExecutor, TabCompleter {

    private final Map<String, SubCommand> subCommands = new HashMap<>();

    public CommandManager() {
        registerSubCommand("help", new HelpCommand());
        registerSubCommand("give", new GiveCommand());
        registerSubCommand("set", new SetCommand());
    }

    private void registerSubCommand(String name, SubCommand cmd) {
        subCommands.put(name.toLowerCase(), cmd);
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command,
                             String label, String[] args) {
        if (args.length == 0) {
            sender.sendMessage("§c用法: /myplugin <子指令> [参数]");
            return true;
        }

        SubCommand sub = subCommands.get(args[0].toLowerCase());
        if (sub == null) {
            sender.sendMessage("§c未知子指令: " + args[0]);
            return true;
        }

        // 检查权限
        if (sub.getPermission() != null && !sender.hasPermission(sub.getPermission())) {
            sender.sendMessage("§c你没有权限");
            return true;
        }

        sub.execute(sender, Arrays.copyOfRange(args, 1, args.length));
        return true;
    }

    @Override
    public List<String> onTabComplete(CommandSender sender, Command command,
                                       String label, String[] args) {
        if (args.length == 1) {
            return subCommands.keySet().stream()
                .filter(name -> name.startsWith(args[0].toLowerCase()))
                .toList();
        }
        SubCommand sub = subCommands.get(args[0].toLowerCase());
        if (sub != null) {
            return sub.onTabComplete(sender, args);
        }
        return List.of();
    }
}

// 子指令接口
interface SubCommand {
    void execute(CommandSender sender, String[] args);
    List<String> onTabComplete(CommandSender sender, String[] args);
    default String getPermission() { return null; }
}
```

## 完整案例：小游戏指令

```java
public class GameCommand implements TabExecutor {

    @Override
    public boolean onCommand(CommandSender sender, Command cmd,
                             String label, String[] args) {
        if (!(sender instanceof Player player)) return true;

        if (args.length == 0) {
            sendHelp(player);
            return true;
        }

        switch (args[0].toLowerCase()) {
            case "join" -> handleJoin(player, args);
            case "leave" -> handleLeave(player);
            case "list" -> handleList(player);
            default -> sendHelp(player);
        }
        return true;
    }

    private void handleJoin(Player player, String[] args) {
        if (args.length < 2) {
            player.sendMessage("§c用法: /game join <游戏名>");
            return;
        }
        String gameName = args[1];
        // 加入游戏逻辑...
    }

    private void handleLeave(Player player) {
        // 离开游戏逻辑...
    }

    private void handleList(Player player) {
        player.sendMessage("§6当前可用游戏:");
        // 列出游戏...
    }

    private void sendHelp(Player player) {
        player.sendMessage("§6===== 游戏指令 =====");
        player.sendMessage("§e/game join <游戏> §7- 加入游戏");
        player.sendMessage("§e/game leave §7- 离开游戏");
        player.sendMessage("§e/game list §7- 列出游戏");
    }

    @Override
    public List<String> onTabComplete(CommandSender sender, Command cmd,
                                       String label, String[] args) {
        if (args.length == 1) {
            return List.of("join", "leave", "list");
        }
        if (args.length == 2 && args[0].equalsIgnoreCase("join")) {
            return List.of("生存游戏", "跑酷", "PVP");
        }
        return List.of();
    }
}
```
