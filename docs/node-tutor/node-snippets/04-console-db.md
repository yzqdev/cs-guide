---
order: 4
---

# 控制台与数据库

> 控制台美化输出和数据库操作片段。

## 控制台显示 Badge

```js
/**
 * 在控制台输出彩色徽章（Badge）
 * 效果类似 npm 包上的 Shields.io 徽章
 */
export function showBadge(name, value, nameColor = '#606060', valueColor = '#2196F3') {
  console.log(
    `%c ${name} %c ${value} `,
    `padding: 2px 4px; border-radius: 3px 0 0 3px; color: #fff; background: ${nameColor};`,
    `padding: 2px 4px; border-radius: 0 3px 3px 0; color: #fff; background: ${valueColor};`
  );
}

// 使用示例
showBadge('Environment', 'production', '#606060', '#4CAF50');
showBadge('Platform', 'Node.js', '#606060', '#2196F3');
showBadge('Version', '20.11.0', '#606060', '#FF9800');
showBadge('Build Date', new Date().toISOString(), '#606060', '#9C27B0');
```

## 控制台颜色输出

```js
// 控制台颜色常量
export const Colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

export function colorize(text, color) {
  return `${color}${text}${Colors.reset}`;
}

// 使用示例
console.log(colorize('✓ 成功', Colors.green));
console.log(colorize('✗ 失败', Colors.red));
console.log(colorize('ℹ 信息', Colors.blue));
console.log(colorize('⚠ 警告', Colors.yellow));
```

## 进度条

```js
/**
 * 简单的控制台进度条
 */
export class ProgressBar {
  constructor(total, label = '进度') {
    this.total = total;
    this.current = 0;
    this.label = label;
  }

  update(increment = 1) {
    this.current += increment;
    const percent = Math.round((this.current / this.total) * 100);
    const barLength = 30;
    const filled = Math.round((barLength * this.current) / this.total);
    const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);
    process.stdout.write(`\r${this.label}: [${bar}] ${percent}% (${this.current}/${this.total})`);
    if (this.current >= this.total) process.stdout.write('\n');
  }
}

// 使用示例
// const bar = new ProgressBar(100, '下载');
// for (let i = 0; i < 100; i++) {
//   bar.update();
//   // 模拟异步操作
// }
```

## 加载动画

```js
/**
 * 控制台加载动画
 */
export class Spinner {
  constructor(message = '加载中') {
    this.message = message;
    this.frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    this.interval = null;
    this.frameIndex = 0;
  }

  start() {
    this.interval = setInterval(() => {
      process.stdout.write(`\r${this.frames[this.frameIndex]} ${this.message}...`);
      this.frameIndex = (this.frameIndex + 1) % this.frames.length;
    }, 80);
  }

  stop(message = '完成') {
    clearInterval(this.interval);
    process.stdout.write(`\r✓ ${message}\n`);
  }

  fail(message = '失败') {
    clearInterval(this.interval);
    process.stdout.write(`\r✗ ${message}\n`);
  }
}

// 使用示例
// const spinner = new Spinner('正在处理');
// spinner.start();
// setTimeout(() => spinner.stop('处理完成'), 3000);
```

## Mongoose 技巧

### 去掉 _id 字段

```js
import mongoose from 'mongoose';

// 在 Schema 中配置 toJSON 转换
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
}, {
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

const User = mongoose.model('User', userSchema);
```

### 查询时排除字段

```js
// 查询时排除 _id
const users = await User.find({}, { _id: 0, __v: 0 });

// 使用 lean() 返回普通对象（性能更好）
const result = await User.find({ role: 'admin' }, { name: 1, email: 1 }).lean();

// 批量查询指定 ID
const ids = ['id1', 'id2', 'id3'];
const items = await Model.find({ _id: { $in: ids } }).lean();
```

### 分页查询

```js
export async function paginate(model, query = {}, page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    model.find(query).skip(skip).limit(limit).lean(),
    model.countDocuments(query),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  };
}

// 使用示例
// const result = await paginate(User, { role: 'user' }, 1, 10);
```

## Sequelize 技巧

```js
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// 定义模型
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  age: { type: DataTypes.INTEGER },
});

// 同步数据库
await sequelize.sync({ alter: true });

// CRUD 操作
const user = await User.create({ name: '张三', email: 'zhangsan@test.com', age: 25 });
const users = await User.findAll({ where: { age: { [Op.gte]: 18 } } });
await User.update({ age: 26 }, { where: { id: user.id } });
await User.destroy({ where: { id: user.id } });
```

## SQLite 快速操作（better-sqlite3）

```bash
npm install better-sqlite3
```

```js
import Database from 'better-sqlite3';

const db = new Database('app.db');

// 创建表
db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// 插入
const insert = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
insert.run('张三', 'zhangsan@test.com');

// 查询
const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
const user = stmt.get(1);
const allUsers = db.prepare('SELECT * FROM users').all();

// 事务
const insertMany = db.transaction((users) => {
  for (const user of users) {
    insert.run(user.name, user.email);
  }
});
insertMany([{ name: '李四', email: 'lisi@test.com' }]);

db.close();
```