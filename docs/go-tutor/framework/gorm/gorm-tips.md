# GORM 进阶技巧

这里整理了一些主教程没展开的进阶用法，遇到具体问题时可以来查阅。

## 自定义表名

默认情况下 GORM 把结构体名转成蛇形复数作为表名（`User` → `users`）。如果想自定义：

```go
// 方式一：实现 Tabler 接口
func (User) TableName() string {
    return "t_user" // 固定表名
}

// 方式二：动态切换表名
db.Table("user_2024").Where("name = ?", "张三").Find(&user)
```

## 日志与调试

### 开启 SQL 日志

```go
// 方式一：全局开启（所有操作都打印 SQL）
db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
    Logger: logger.Default.LogMode(logger.Info),
})

// 级别说明
// logger.Silent - 不打印（默认）
// logger.Error  - 只打印错误
// logger.Warn   - 打印警告和慢查询（>200ms）
// logger.Info   - 打印所有 SQL
```

### 单次查询调试

```go
// 只想看某条语句的 SQL，用 Debug()
db.Debug().Where("name = ?", "张三").Find(&user)
```

### 自定义日志

```go
import (
    "gorm.io/gorm/logger"
    "log"
    "os"
    "time"
)

newLogger := logger.New(
    log.New(os.Stdout, "\r\n", log.LstdFlags),
    logger.Config{
        SlowThreshold:             time.Second,  // 慢查询阈值
        LogLevel:                  logger.Info,  // 日志级别
        IgnoreRecordNotFoundError: true,         // 忽略记录未找到的错误
        Colorful:                  true,         // 彩色输出
    },
)

db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
    Logger: newLogger,
})
```

## 唯一约束冲突处理

插入数据时如果遇到唯一约束冲突，可以忽略或自动更新：

```go
import "gorm.io/gorm/clause"

// 冲突时忽略，不报错
db.Clauses(clause.OnConflict{DoNothing: true}).Create(&user)

// 冲突时自动更新指定字段
db.Clauses(clause.OnConflict{
    Columns:   []clause.Column{{Name: "email"}},       // 冲突列
    DoUpdates: clause.AssignmentColumns([]string{"name", "age"}), // 更新列
}).Create(&user)
```

## 错误处理

```go
result := db.Where("name = ?", "不存在的").First(&user)

if errors.Is(result.Error, gorm.ErrRecordNotFound) {
    // 没找到记录，这是常见情况，不是真正的"错误"
    fmt.Println("记录不存在")
} else if result.Error != nil {
    // 真正的数据库错误（连接断开、语法错误等）
    fmt.Println("查询出错:", result.Error)
}
```

## 字段权限控制

GORM 支持对字段设置读写权限：

```go
type User struct {
    Name  string `gorm:"<-:create"`          // 只允许创建时写入
    Email string `gorm:"<-:update"`          // 只允许更新时写入
    Role  string `gorm:"<-"`                 // 允许读写（默认）
    Token string `gorm:"->:false"`           // 不允许读取
    Hash  string `gorm:"-"`                  // 忽略该字段
}
```

## 复合主键

```go
type OrderItem struct {
    OrderID   uint   `gorm:"primaryKey"`
    ProductID uint   `gorm:"primaryKey"`
    Quantity  int
}
```

## 索引

```go
type User struct {
    Email string `gorm:"uniqueIndex"`          // 唯一索引
    Name  string `gorm:"index:idx_name_age"`  // 普通索引
    Age   int    `gorm:"index:idx_name_age"`  // 复合索引
    City  string `gorm:"index:,class:FULLTEXT,option:WITH PARSER ngram"`
}
```

## 时间字段的默认值

Go 的零值 `0001-01-01` 写入数据库可能引发问题，可以用指针或 `sql.NullTime`：

```go
type User struct {
    Birthday *time.Time `gorm:"default:null"`    // 指针类型
    LastLogin sql.NullTime                        // 标准库类型
}
```

## 数据库驱动的选择

GORM 支持多种数据库，但生产环境建议：

- **MySQL**：用 `gorm.io/driver/mysql`，配合 `charset=utf8mb4` 和 `parseTime=True`
- **PostgreSQL**：用 `gorm.io/driver/postgres`，支持 JSONB、数组等高级类型
- **SQLite**：适合开发测试和单机小应用
- **TiDB**：兼容 MySQL 驱动，直接用 MySQL 驱动即可

## 迁移工具推荐

`AutoMigrate` 适合开发阶段，生产环境建议用以下工具管理迁移：

- [golang-migrate/migrate](https://github.com/golang-migrate/migrate) — 最流行的迁移工具
- [pressly/goose](https://github.com/pressly/goose) — 支持正向和回滚

## 常见问题

### 1. 更新时零值字段不生效

```go
// 结构体更新会忽略零值
db.Model(&user).Updates(User{Age: 0}) // 不生效

// 改用 map 或使用 Select 指定字段
db.Model(&user).Select("Age").Updates(User{Age: 0}) // 生效
db.Model(&user).Updates(map[string]interface{}{"age": 0}) // 生效
```

### 2. 查询时只想查特定字段

```go
// 用 Select 指定
db.Select("id", "name").Find(&users)

// 或者定义一个只包含所需字段的结构体
type UserBrief struct {
    ID   uint
    Name string
}
var briefs []UserBrief
db.Model(&User{}).Find(&briefs)
```

### 3. 如何统计记录数

```go
var count int64
db.Model(&User{}).Where("age > ?", 18).Count(&count)
fmt.Println("成年用户数:", count)
```
