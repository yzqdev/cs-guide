# Sandstone — TypeScript 数据包框架

[![GitHub](https://img.shields.io/github/stars/sandstone-mc/sandstone)](https://github.com/sandstone-mc/sandstone)
[![Discord](https://img.shields.io/discord/800035701243772969)](https://discord.gg/4tzM5aXDRe)

> 官网：<https://sandstone.dev/>
> 仓库：<https://github.com/sandstone-mc/sandstone>

Sandstone 是一个 TypeScript 库，让你用 TypeScript 编写 Minecraft 数据包和资源包，然后编译为原版的 `.mcfunction`、JSON 文件。

## 核心特性

- **完美的自动补全** — 在 VS Code 中编写时自动提示命令参数
- **内置控制流** — `if/else`、`while`、`for`、`sleep` 等抽象，编译为优化后的命令
- **类型安全** — 编译时检查命令、选择器、NBT 的正确性
- **易于分享** — 发布到 npm，其他人可以直接引用
- **内置 CLI** — `sand` 命令，一行启动构建和监听

## 安装

### 前置条件

Sandstone 需要 [Bun](https://bun.sh/) 运行时：

```bash
# 安装 Bun（Windows/macOS/Linux）
powershell -c "irm bun.sh/install.ps1 | iex"
# 或
curl -fsSL https://bun.sh/install | bash
```

### 安装 CLI

```bash
bun i -g sandstone-cli
```

## 快速开始（3 步）

### 第 1 步：创建项目

```bash
sand create my-datapack
```

这会创建一个包含以下结构的项目：

```
my-datapack/
├── package.json
├── tsconfig.json
├── sand.config.ts         # Sandstone 配置
├── src/
│   └── index.ts           # 入口文件
└── .gitignore
```

### 第 2 步：编写代码

编辑 `src/index.ts`：

```typescript
import { MCFunction, say } from "sandstone";

// 创建一个函数
MCFunction("welcome", () => {
  say("§a欢迎使用 Sandstone 数据包！");
  give("@a", "minecraft:diamond", 64);
  effect.give("@a", "minecraft:speed", 30, 1);
});
```

### 第 3 步：构建

```bash
# 构建一次
sand build

# 或进入监听模式（文件修改自动构建）
sand dev:watch
```

构建后的输出在 `build/` 目录中，可以直接复制到游戏 `datapacks/` 目录。

## 配置

### sand.config.ts

```typescript
import { defineConfig } from "sandstone";

export default defineConfig({
  // 命名空间
  namespace: "my_pack",

  // 数据包元数据
  pack: {
    packFormat: 48,       // 1.21.4
    description: "§a我的 Sandstone 数据包",
  },

  // 输出目录
  output: "./build",

  // Minecraft 版本
  minecraftVersion: "1.21.4",
});
```

## 核心 API

### 函数（MCFunction）

```typescript
import { MCFunction, say } from "sandstone";

// 基本函数
MCFunction("hello", () => {
  say("Hello World!");
});

// 带标签的函数（自动加载/每 tick 执行）
MCFunction("init", () => {
  say("数据包已加载！");
}, {
  tags: ["minecraft:load"]  // 世界加载时执行
});

MCFunction("tick", () => {
  say("每 tick 执行一次");
}, {
  tags: ["minecraft:tick"]  // 每 tick 执行
});
```

### 命令

所有原版命令都有对应的 TypeScript 函数：

```typescript
import { MCFunction, say, give, setblock, execute } from "sandstone";

MCFunction("example", () => {
  say("Hello!");                  // /say
  give("@a", "minecraft:diamond"); // /give
  setblock("0 64 0", "stone");     // /setblock
  
  // execute 链
  execute.as("@a").at("@s").run(() => {
    say("你好！");
  });
});
```

### 控制流

```typescript
import { MCFunction, say, _if, _while, _for, sleep } from "sandstone";

MCFunction("control_flow", () => {
  // if/else
  _if(score("玩家分数").matches(10..20), () => {
    say("分数在 10 到 20 之间");
  }).else(() => {
    say("分数不在这个范围");
  });
});

// while 循环
MCFunction("loop_example", () => {
  let i = 0;
  _while(() => i < 10, () => {
    say("循环中...");
    i++;
  });
});

// sleep（延时）
MCFunction("delayed", () => {
  say("等待 3 秒...");
  sleep(60);  // 60 ticks = 3 秒
  say("时间到！");
});
```

### 记分板

```typescript
import { MCFunction, scoreboard, say } from "sandstone";

// 创建记分板
const myScore = scoreboard("my_score", "dummy");

// 使用记分板
MCFunction("score_example", () => {
  // 设置分数
  myScore.set("@a", 100);
  
  // 增减分数
  myScore.add("@a", 5);
  myScore.remove("@a", 3);
  
  // 条件判断
  _if(myScore.matches(10..50), () => {
    say("分数在 10~50 之间");
  });
});
```

### 实体选择器

```typescript
import { MCFunction, Selector, say } from "sandstone";

MCFunction("selector_example", () => {
  // @a[scores={my_score=10..}]
  const players = Selector("@a", {
    scores: { my_score: "10.." },
    tag: "vip",
  });
  
  execute.as(players).run(() => {
    say("VIP 玩家你好！");
  });
});
```

### 进度（Advancements）

```typescript
import { MCFunction, Advancement, say } from "sandstone";

const myAdvancement = Advancement("first_join", {
  criteria: {
    joined: {
      trigger: "minecraft:tick",
    },
  },
  rewards: {
    commands: ["say §a恭喜获得进度！"],
  },
});

MCFunction("check_advancement", () => {
  myAdvancement.grant("@a");  // 给予进度
});
```

### 战利品表（Loot Tables）

```typescript
import { LootTable, Item } from "sandstone";

const myLoot = LootTable("custom_drop", (table) => {
  table.pool({
    rolls: 1,
    entries: [
      Item("minecraft:diamond").setCount(1, 3),
      Item("minecraft:emerald").setCount(1, 2),
    ],
  });
});
```

## 完整示例

### 示例 1：自定义合成系统

```typescript
// src/recipes.ts
import { MCFunction, _if, scoreboard, say, give, clear, execute } from "sandstone";

const craftCount = scoreboard("craft_count", "dummy");

// 检查玩家是否有足够的材料
function canCraftDiamond(): void {
  _if(
    execute.as("@p").if.inventory("minecraft:iron_ingot", 9),
    () => {
      // 消耗材料
      clear("@p", "minecraft:iron_ingot", 9);
      // 给予成品
      give("@p", "minecraft:diamond", 1);
      // 增加合成计数
      craftCount.add("@p", 1);
      say("§a合成成功！");
    }
  ).else(() => {
    say("§c材料不足！需要 9 个铁锭");
  });
}

MCFunction("craft_diamond", canCraftDiamond, {
  tags: ["minecraft:load"],
});
```

### 示例 2：粒子特效系统

```typescript
// src/particles.ts
import { MCFunction, particle, execute, rel } from "sandstone";

// 在玩家周围生成粒子光环
MCFunction("particle_halo", () => {
  execute.as("@a").at("@s").run(() => {
    // 6 个方向的粒子
    const positions = [
      [1, 0, 0], [-1, 0, 0],
      [0, 0, 1], [0, 0, -1],
      [0, 1, 0], [0, -1, 0],
    ];
    
    for (const [x, y, z] of positions) {
      particle("minecraft:flame", rel(x, y, z), [0, 0, 0], 0, 1, false);
    }
  });
}, {
  tags: ["minecraft:tick"]  // 每 tick 生成粒子
});
```

### 示例 3：Boss 战系统

```typescript
// src/boss.ts
import { MCFunction, say, execute, summon, scoreboard, _if, sleep, tellraw } from "sandstone";

const bossHealth = scoreboard("boss_health", "dummy");

// 召唤 Boss
MCFunction("spawn_boss", () => {
  summon("minecraft:zombie", "~ ~5 ~", {
    CustomName: '{"text":"§c§l暗影领主","bold":true}',
    Health: 200,
    Attributes: [
      { Name: "generic.max_health", Base: 200 },
      { Name: "generic.attack_damage", Base: 15 },
    ],
  });
  
  bossHealth.set("@e[type=minecraft:zombie,limit=1]", 200);
  say("§c§l暗影领主出现了！");
});

// Boss 阶段判断
MCFunction("boss_phase", () => {
  execute.as("@e[type=minecraft:zombie,tag=!boss_init]").run(() => {
    // 初始化 Boss 标签
    execute.run("tag @s add boss_init");
    execute.run("tag @s add boss");
  });
  
  _if(bossHealth.matches(0..50), () => {
    // 第二阶段：狂暴模式
    execute.as("@e[tag=boss]").run(() => {
      effect.give("@s", "minecraft:speed", 9999, 1);
      effect.give("@s", "minecraft:strength", 9999, 1);
    });
    tellraw("@a", [{"text":"§c§l暗影领主进入狂暴状态！","bold":true}]);
  });
}, {
  tags: ["minecraft:tick"],
});
```

### 示例 4：随机抽奖系统

```typescript
// src/lottery.ts
import { MCFunction, say, give, execute, _if, scoreboard } from "sandstone";

const lotteryCount = scoreboard("lottery_count", "dummy");

const prizes = [
  { item: "minecraft:diamond", count: 1, chance: 0.05, name: "§b钻石" },
  { item: "minecraft:gold_ingot", count: 5, chance: 0.15, name: "§6金锭 x5" },
  { item: "minecraft:iron_ingot", count: 10, chance: 0.30, name: "§7铁锭 x10" },
  { item: "minecraft:stone", count: 1, chance: 0.50, name: "§8石头（安慰奖）" },
];

MCFunction("lottery", () => {
  // 使用随机数实现概率
  execute.store.result.score("抽奖随机数", "rand").run("random value 0..99");
  
  // 按概率发放奖品（此处为简化逻辑，实际可用多个 if 链）
  say("§a你抽中了奖品！");
  give("@p", "minecraft:diamond", 1);
  lotteryCount.add("@p", 1);
});
```

## 常用命令速查

| 命令 | Sandstone 写法 |
|------|---------------|
| `say <text>` | `say("text")` |
| `give <target> <item> [count]` | `give(target, item, count)` |
| `setblock <pos> <block>` | `setblock(pos, block)` |
| `execute as <target> run <cmd>` | `execute.as(target).run(() => cmd())` |
| `effect give <target> <effect> [time] [amp]` | `effect.give(target, effect, time, amp)` |
| `summon <entity> <pos> [nbt]` | `summon(entity, pos, nbt)` |
| `particle <particle> <pos> <delta> <speed> <count>` | `particle(name, pos, delta, speed, count)` |
| `scoreboard objectives add <name> <criteria>` | `scoreboard(name, criteria)` |
| `tellraw <target> <json>` | `tellraw(target, json)` |

## 一个简单示例

```ts
/**
 * Sandstone 示例文件 — 展示常用 API 用法
 *
 * 构建后输出到 .sandstone/output/datapack/
 * 命名空间: default (配置在 sandstone.config.ts)
 */

// ============================================================
// 1. 配方 (Recipes)
// ============================================================

import {
  Advancement,
  Recipe,
  MCFunction,
  give,
  say,
  tellraw,
  execute,
  rel,
  setblock,
  effect,
  Objective,
  Selector,
  _,
  sleep,
  Tag,
  LootTable,
  Predicate,
  Data,
  DataVariable,
  NBT,
  ItemPredicate,
} from 'sandstone'

// --- 1a. 有序合成 (Shaped) ---
// 3x3 合成: 木棍 + 圆石 → 石剑
Recipe('stone_sword_custom', {
  type: 'crafting_shaped',
  pattern: [
    'S',
    'S',
    'C',
  ],
  key: {
    S: 'minecraft:stick',
    C: 'minecraft:cobblestone',
  },
  result: {
    id: 'minecraft:stone_sword',
    components: {
      'minecraft:unbreakable': {},
    },
  },
})

// --- 1b. 无序合成 (Shapeless) ---
// 任意 4 个木板 → 工作台
Recipe('crafting_table_from_planks', {
  type: 'crafting_shapeless',
  group: 'planks',
  ingredients: [
    'minecraft:oak_planks',
    'minecraft:oak_planks',
    'minecraft:oak_planks',
    'minecraft:oak_planks',
  ],
  result: {
    id: 'minecraft:crafting_table',
    count: NBT.int(1),
  },
})

// --- 1c. 烧炼 (Smelting) ---
// 圆石 → 石头 (0.1 XP, 5 秒)
Recipe('stone_from_cobble', {
  type: 'smelting',
  ingredient: 'minecraft:cobblestone',
  result: { id: 'minecraft:stone' },
  experience: NBT.float(0.1),
  cookingtime: NBT.int(100),
})

// --- 1d. 切石 (Stonecutting) ---
// 石头 → 石砖楼梯 (1:1)
Recipe('stone_brick_stairs_from_stonecutting', {
  type: 'stonecutting',
  ingredient: 'minecraft:stone',
  result: { id: 'minecraft:stone_brick_stairs' },
})

// --- 1e. 锻造 (Smithing Transform) ---
// 铁剑 + 钻石 → 钻石剑
Recipe('diamond_sword_upgrade', {
  type: 'smithing_transform',
  base: 'minecraft:iron_sword',
  addition: 'minecraft:diamond',
  template: 'minecraft:netherite_upgrade_smithing_template',
  result: { id: 'minecraft:diamond_sword' },
})


// ============================================================
// 2. Minecraft 函数 (MCFunctions)
// ============================================================

// --- 2a. 基础函数 — 加载时运行 ---
MCFunction('welcome', () => {
  say('数据包已加载!')
  give('@a', 'minecraft:diamond', 1)
}, { runOnLoad: true })

// --- 2b. 每 tick 运行函数 ---
MCFunction('every_tick', () => {
  // 给所有玩家速度效果
  effect.give(Selector('@a'), 'minecraft:speed', 1, 0, true)
}, { runOnTick: true })

// --- 2c. 带延迟的异步函数 ---
MCFunction('delayed_announcement', async () => {
  tellraw('@a', [{ text: '3...', color: 'red' }])
  sleep('1s')

  tellraw('@a', [{ text: '2...', color: 'gold' }])
  sleep('1s')

  tellraw('@a', [{ text: '1...', color: 'yellow' }])
  sleep('1s')

  tellraw('@a', [{ text: '🎉 倒计时结束!', color: 'green', bold: true }])
  give('@a', 'minecraft:firework_rocket', 3)
}, { runOnLoad: true })

// --- 2d. 懒加载函数 (lazy) — 仅在被调用时创建 ---
const healPlayer = MCFunction('heal_player', () => {
  effect.give('@s', 'minecraft:regeneration', 5, 2, true)
  say('你已被治疗!')
}, { lazy: true })

// --- 2e. 调用另一个 MCFunction ---
MCFunction('admin_heal', () => {
  execute.as('@a').run(() => healPlayer())
}, { runOnLoad: true })


// ============================================================
// 3. Execute 命令
// ============================================================

// --- 3a. 单条命令 ---
MCFunction('lightning_strike', () => {
  // 在每个玩家位置召唤闪电
  execute.as('@a').at('@s').run.summon('minecraft:lightning_bolt', rel(0, 0, 0))
}, { lazy: true })

// --- 3b. 多条命令 ---
MCFunction('build_pillar', () => {
  execute.as('@p').at('@s').run(() => {
    setblock(rel(0, 1, 0), 'minecraft:stone')
    setblock(rel(0, 2, 0), 'minecraft:stone')
    setblock(rel(0, 3, 0), 'minecraft:stone')
    setblock(rel(0, 4, 0), 'minecraft:redstone_torch')
  })
}, { lazy: true })


// ============================================================
// 4. 计分板 (Objectives & Scores)
// ============================================================

// 创建计分板
const kills = Objective.create('kills', 'playerKillCount')
const coins = Objective.create('coins', 'dummy')

MCFunction('score_example', () => {
  const myKills = kills('@s')
  const myCoins = coins('@s')

  // 计分板操作
  myKills.add(1)
  myCoins.set(100)
  myCoins.add(50)

  // 条件判断
  _.if(myKills.greaterThan(10), () => {
    say('你已经杀了 10+ 个怪物!')
  }).else(() => {
    say('继续加油!')
  })
}, { lazy: true })


// ============================================================
// 5. 流程控制 (Flow Control)
// ============================================================

// --- 5a. 计分板循环 ---
MCFunction('loop_example', () => {
  const counter = Objective.create('counter', 'dummy')('@s')

  // 从 0 循环到 5 (使用 range 语法)
  _.for([0, 5], 'iterate', () => {
    say('循环中...')
  })
}, { lazy: true })

// --- 5b. Switch 分支 ---
MCFunction('switch_example', () => {
  const role = Objective.create('role', 'dummy')('@s')

  _.switch(role, [
    ['case', 0, () => { say('你是战士!') }],
    ['case', 1, () => { say('你是法师!') }],
    ['case', 2, () => { say('你是弓箭手!') }],
    ['default', () => { say('未知职业!') }],
  ])
}, { lazy: true })


// ============================================================
// 6. 数据 (Data & DataVariables)
// ============================================================

MCFunction('data_example', () => {
  // 引用实体数据
  const playerData = Data('entity', '@s')
  const health = playerData.select('Health')

  // 引用存储空间
  const myStorage = Data('storage', 'default:data')
  myStorage.select('player_name').set('Steve')

  // 临时存储变量
  const temp = DataVariable({ value: 0 })
  temp.select('value').set(42)

  // 将 NBT 数据设置为分数
  health.set(20)
}, { lazy: true })


// ============================================================
// 7. 选择器 (Selectors)
// ============================================================

// 自定义选择器
const allCows = Selector('@e', { type: 'minecraft:cow', limit: 3, sort: 'nearest' })
const highScorePlayers = Selector('@a', { scores: { kills: [10, Infinity] } })

MCFunction('selector_example', () => {
  // 给最近 3 头牛命名
  execute.as(allCows).run(() => {
    say('你是一头牛!')
  })

  // 给高分玩家奖励
  execute.as(highScorePlayers).run(() => {
    give('@s', 'minecraft:emerald', 5)
  })
}, { lazy: true })


// ============================================================
// 8. 进度 (Advancements)
// ============================================================

Advancement('first_diamond', {
  display: {
    title: '第一颗钻石!',
    description: '挖到你的第一颗钻石',
    icon: { id: 'minecraft:diamond' },
    frame: 'task',
    show_toast: true,
    announce_to_chat: true,
  },
  criteria: {
    has_diamond: {
      trigger: 'minecraft:inventory_changed',
      conditions: {
        items: [
          {
            items: ['minecraft:diamond'],
            count: { min: 1 },
          },
        ],
      },
    },
  },
  rewards: {
    experience: NBT.int(100),
    loot: ['minecraft:blocks/diamond_block'],
  },
})


// ============================================================
// 9. 战利品表 (Loot Tables)
// ============================================================

LootTable('custom_zombie_drops', {
  type: 'minecraft:entity',
  pools: [
    {
      rolls: NBT.int(1),
      bonus_rolls: NBT.int(0),
      entries: [
        {
          type: 'minecraft:item',
          name: 'minecraft:rotten_flesh',
          weight: 8,
          functions: [
            {
              function: 'minecraft:set_count',
              count: { min: 1, max: 3 },
            },
          ],
        },
        {
          type: 'minecraft:item',
          name: 'minecraft:iron_ingot',
          weight: 2,
        },
        {
          type: 'minecraft:item',
          name: 'minecraft:diamond',
          weight: 1,
          conditions: [
            {
              condition: 'minecraft:killed_by_player',
            },
          ],
        },
      ],
    },
  ],
})


// ============================================================
// 10. 谓词 (Predicates)
// ============================================================

Predicate('is_raining', {
  condition: 'minecraft:weather_check',
  raining: true,
} as any)

Predicate('at_night', {
  condition: 'minecraft:time_check',
  value: {
    min: 13000,
    max: 23000,
  },
} as any)


// ============================================================
// 11. 标签 (Tags)
// ============================================================

// 物品标签
Tag('items', 'my_custom_ores', [
  'minecraft:diamond_ore',
  'minecraft:iron_ore',
  'minecraft:gold_ore',
  'minecraft:emerald_ore',
])

// 函数标签
Tag('functions', 'load', [
  'default:welcome',
])


// ============================================================
// 12. tellraw / JSON 文本组件
// ============================================================

MCFunction('show_help', () => {
  tellraw('@a', [
    '\n',
    { text: '📖 帮助菜单', color: 'gold', bold: true },
    '\n',
    { text: ' /help', color: 'green' },
    { text: ' - 显示帮助', color: 'gray' },
    '\n',
    { text: ' /trigger', color: 'green' },
    { text: ' - 触发事件', color: 'gray' },
    '\n',
    { text: '点击这里', color: 'aqua', underlined: true, clickEvent: { action: 'run_command', value: '/say 你好!' } },
  ])
}, { lazy: true })


// ============================================================
// 13. 条件判断 (Conditions)
// ============================================================

MCFunction('condition_check', () => {
  // 检查脚下是否为石头
  _.if(_.block(rel(0, -1, 0), 'minecraft:stone'), () => {
    say('你站在石头上!')
  })

  // 检查是否夜晚
  _.if(_.predicate('default:at_night'), () => {
    say('现在是夜晚!')
  })
}, { lazy: true })
```

## 参考链接

- [官网](https://sandstone.dev/)
- [文档](https://sandstone.dev/docs)
- [GitHub 仓库](https://github.com/sandstone-mc/sandstone)
- [Discord 社区](https://discord.gg/4tzM5aXDRe)
- [npm 包](https://www.npmjs.com/package/sandstone)
