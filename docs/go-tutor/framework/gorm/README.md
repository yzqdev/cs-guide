# GORM 教程：从入门到实践

<Catalog />

[GORM](https://gorm.io/) 是 Go 生态中最流行的 ORM（对象关系映射）库。它帮我们把数据库表映射成 Go 结构体，让我们能用操作结构体的方式操作数据库，不用手写 SQL。

## 为什么要用 ORM？

直接写 SQL 本身没什么问题，但在实际项目中会遇到几个痛点：

- **重复劳动**：每个表都要写增删改查，代码大量重复
- **类型不安全**：SQL 字符串拼错一个字母，运行时才报错
- **数据库迁移麻烦**：改表结构要手动维护 SQL 脚本
- **代码和 SQL 分离**：业务逻辑分散在代码和 SQL 文件里

GORM 解决这些问题的方式很简单：**用 Go 结构体定义表结构，用方法调用代替 SQL 语句**。

## 安装

GORM 分两部分：核心库 + 数据库驱动。核心库提供 ORM 功能，驱动负责跟具体数据库通信。

```bash
# 核心库
go get -u gorm.io/gorm

# 选一个驱动装上
go get -u gorm.io/driver/mysql      # MySQL
go get -u gorm.io/driver/postgres   # PostgreSQL
go get -u gorm.io/driver/sqlite     # SQLite
go get -u gorm.io/driver/sqlserver  # SQL Server
```

## 第一步：连接数据库

连接数据库需要两样东西：**驱动** 和 **连接信息（DSN）**。

DSN 的格式因数据库而异，MySQL 的格式如下：

```
用户名:密码@协议(地址:端口)/库名?参数
```

来看一个完整的连接例子：

```go
package main

import (
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

func main() {
    // DSN 格式：user:password@tcp(host:port)/dbname?charset=utf8mb4&parseTime=True&loc=Local
    dsn := "root:123456@tcp(127.0.0.1:3306)/testdb?charset=utf8mb4&parseTime=True&loc=Local"

    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("数据库连接失败: " + err.Error())
    }

    // db 就是数据库连接对象，后面所有操作都靠它
}
```

几个关键参数说明：

| 参数              | 作用                                                     |
| ----------------- | -------------------------------------------------------- |
| `charset=utf8mb4` | 支持 emoji 和特殊字符                                    |
| `parseTime=True`  | 把数据库的 datetime/timestamp 自动转成 Go 的 `time.Time` |
| `loc=Local`       | 使用本地时区                                             |

### 连接池配置

GORM 底层用的是 Go 标准库的 `database/sql`，可以配置连接池：

```go
sqlDB, err := db.DB()
if err != nil {
    panic(err)
}

// 最大空闲连接数
sqlDB.SetMaxIdleConns(10)
// 最大打开连接数
sqlDB.SetMaxOpenConns(100)
// 连接最大存活时间
sqlDB.SetConnMaxLifetime(time.Hour)
```

## 第二步：定义模型

模型就是 Go 结构体，每个字段对应数据库表的一列。

```go
type User struct {
    ID        uint           `gorm:"primarykey"`
    Name      string         `gorm:"size:100;not null"`
    Email     string         `gorm:"uniqueIndex;size:255"`
    Age       int
    CreatedAt time.Time
    UpdatedAt time.Time
    DeletedAt gorm.DeletedAt `gorm:"index"`
}
```

### 字段标签说明

`gorm:"..."` 里的内容是 GORM 的字段标签，常用的有：

| 标签               | 说明                                 |
| ------------------ | ------------------------------------ |
| `primarykey`       | 主键                                 |
| `size:100`         | 字段长度                             |
| `not null`         | 非空                                 |
| `uniqueIndex`      | 唯一索引                             |
| `default:18`       | 默认值                               |
| `column:user_name` | 自定义列名（默认用字段名的蛇形命名） |
| `-`                | 忽略该字段，不参与数据库操作         |

### 嵌入结构体

GORM 提供了一个内嵌结构体 `gorm.Model`，包含 ID、创建时间、更新时间、删除时间四个常用字段：

```go
type User struct {
    gorm.Model          // 嵌入：ID, CreatedAt, UpdatedAt, DeletedAt
    Name  string
    Email string
}
```

等价于：

```go
type User struct {
    ID        uint           `gorm:"primarykey"`
    CreatedAt time.Time
    UpdatedAt time.Time
    DeletedAt gorm.DeletedAt `gorm:"index"`
    Name      string
    Email     string
}
```

## 第三步：自动迁移

模型定义好了，怎么让数据库里真的有这张表？GORM 的 `AutoMigrate` 可以自动创建或更新表结构：

```go
db.AutoMigrate(&User{})
// 可以同时迁移多个模型
db.AutoMigrate(&User{}, &Order{}, &Product{})
```

**自动迁移只会新增列和索引，不会删除已有的列**，所以开发阶段可以放心用。生产环境建议用专门的迁移工具。

## 第四步：增删改查（CRUD）

### 创建数据

```go
// 创建单条
user := User{Name: "张三", Email: "zhangsan@example.com", Age: 25}
result := db.Create(&user)

fmt.Println(user.ID)          // 创建后 ID 会被回填
fmt.Println(result.Error)     // 错误信息
fmt.Println(result.RowsAffected) // 影响的行数

// 批量创建
users := []User{
    {Name: "李四", Email: "lisi@example.com"},
    {Name: "王五", Email: "wangwu@example.com"},
}
db.Create(&users)
```

### 查询数据

```go
// 查询单条记录
var user User

// 按主键查找
db.First(&user, 1)

// 按条件查找
db.First(&user, "name = ?", "张三")

// 查询不存在时，First 返回 gorm.ErrRecordNotFound
result := db.First(&user, 999)
if errors.Is(result.Error, gorm.ErrRecordNotFound) {
    fmt.Println("记录不存在")
}

// 查询多条记录
var users []User

// 条件查询
db.Where("age > ?", 18).Find(&users)

// IN 查询
db.Where("name IN ?", []string{"张三", "李四"}).Find(&users)

// LIKE 查询
db.Where("name LIKE ?", "%张%").Find(&users)

// 只查特定字段
db.Select("name", "email").Find(&users)

// 排序
db.Order("age DESC").Find(&users)

// 限制和偏移（分页）
db.Limit(10).Offset(0).Find(&users)
```

### 更新数据

```go
// 先查询再更新
var user User
db.First(&user, 1)

// 更新单个字段
db.Model(&user).Update("name", "张三（改）")

// 更新多个字段
db.Model(&user).Updates(User{Name: "张三", Age: 26})
// 注意：Updates 用结构体时，零值字段不会被更新
// 如果想更新零值，用 map
db.Model(&user).Updates(map[string]interface{}{
    "name": "张三",
    "age":  0,
})

// 条件更新（不先查询）
db.Model(&User{}).Where("age < ?", 18).Update("name", "未成年人")
```

### 删除数据

```go
// 先查询再删除
var user User
db.First(&user, 1)
db.Delete(&user)

// 条件删除
db.Where("age < ?", 18).Delete(&User{})

// 如果模型包含 DeletedAt 字段，Delete 执行的是软删除
// 软删除的记录不会真的消失，查询时默认也查不到它们

// 要查包含软删除的记录，用 Unscoped
var users []User
db.Unscoped().Where("name = ?", "张三").Find(&users)

// 永久删除（物理删除）
db.Unscoped().Delete(&user)
```

## 第五步：高级查询

### 链式操作

GORM 的方法可以链式调用，直观地拼出复杂的查询：

```go
db.Where("age > ?", 18).
    Where("name LIKE ?", "%张%").
    Order("age DESC").
    Limit(10).
    Offset(0).
    Find(&users)
```

### Scopes（查询范围）

对于经常重复的查询条件，可以封装成 Scopes：

```go
// 定义一个查询范围
func AdultUsers(db *gorm.DB) *gorm.DB {
    return db.Where("age >= ?", 18)
}

func OrderByAgeDesc(db *gorm.DB) *gorm.DB {
    return db.Order("age DESC")
}

// 使用
db.Scopes(AdultUsers, OrderByAgeDesc).Find(&users)
```

### 分页查询的通用写法

```go
func Paginate(page, pageSize int) func(db *gorm.DB) *gorm.DB {
    return func(db *gorm.DB) *gorm.DB {
        if page <= 0 {
            page = 1
        }
        if pageSize <= 0 || pageSize > 100 {
            pageSize = 20
        }
        offset := (page - 1) * pageSize
        return db.Offset(offset).Limit(pageSize)
    }
}

// 使用
db.Scopes(Paginate(1, 20)).Find(&users)
```

### 分组与聚合

```go
type Result struct {
    Name  string
    Total int
}

var results []Result

db.Model(&User{}).
    Select("name, count(*) as total").
    Group("name").
    Having("count(*) > ?", 1).
    Scan(&results)
```

### 原生 SQL

当 ORM 的表达力不够时，可以直接写 SQL：

```go
type Result struct {
    Name  string
    Email string
}

var results []Result
db.Raw("SELECT name, email FROM users WHERE age > ?", 18).Scan(&results)
```

## 第六步：模型关联

GORM 支持四种常见的关联关系。

### 一对一（HasOne）

```go
type User struct {
    gorm.Model
    Name    string
    Profile Profile // 一个用户有一个 Profile
}

type Profile struct {
    gorm.Model
    UserID uint   // 外键（GORM 自动识别）
    Bio    string
}

// 创建时关联
db.Create(&User{
    Name: "张三",
    Profile: Profile{Bio: "Hello"},
})

// 查询时预加载
var user User
db.Preload("Profile").First(&user, 1)
```

### 一对多（HasMany）

```go
type User struct {
    gorm.Model
    Name   string
    Orders []Order // 一个用户有多个订单
}

type Order struct {
    gorm.Model
    UserID uint    // 外键
    Amount float64
}

// 查询时预加载
var users []User
db.Preload("Orders").Find(&users)

// 带条件的预加载
db.Preload("Orders", "amount > ?", 100).Find(&users)
```

### 多对多（ManyToMany）

```go
type User struct {
    gorm.Model
    Name    string
    Languages []Language `gorm:"many2many:user_languages;"`
}

type Language struct {
    gorm.Model
    Name  string
    Users []User `gorm:"many2many:user_languages;"`
}

// GORM 会自动创建中间表 user_languages
db.Preload("Languages").Find(&users)
```

### 预加载的更多用法

```go
// 嵌套预加载
db.Preload("Orders.Items").Preload("Profile").First(&user)

// 预加载全部关联
db.Preload(clause.Associations).Find(&users)
```

## 第七步：事务

事务保证一组数据库操作要么全部成功，要么全部回滚。

### 自动事务（推荐）

```go
err := db.Transaction(func(tx *gorm.DB) error {
    // 在事务中执行操作
    if err := tx.Create(&user).Error; err != nil {
        return err // 返回错误 → 自动回滚
    }
    if err := tx.Create(&order).Error; err != nil {
        return err // 同上
    }
    return nil // 返回 nil → 自动提交
})

if err != nil {
    fmt.Println("事务失败:", err)
}
```

### 手动事务

```go
tx := db.Begin()

user := User{Name: "张三"}
if err := tx.Create(&user).Error; err != nil {
    tx.Rollback()
    return
}

order := Order{UserID: user.ID, Amount: 99.9}
if err := tx.Create(&order).Error; err != nil {
    tx.Rollback()
    return
}

tx.Commit()
```

## 第八步：钩子（Hooks）

钩子是在数据库操作前后自动执行的方法。GORM 支持以下钩子：

| 操作 | 前             | 后            |
| ---- | -------------- | ------------- |
| 创建 | `BeforeCreate` | `AfterCreate` |
| 查询 |                | `AfterFind`   |
| 更新 | `BeforeUpdate` | `AfterUpdate` |
| 删除 | `BeforeDelete` | `AfterDelete` |
| 保存 | `BeforeSave`   | `AfterSave`   |

常见用法——密码加密：

```go
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
    // 密码自动加密
    hashed, _ := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
    u.Password = string(hashed)
    return
}

func (u *User) BeforeUpdate(tx *gorm.DB) (err error) {
    if u.Password != "" {
        hashed, _ := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
        u.Password = string(hashed)
    }
    return
}
```

---

掌握了上面这些内容，日常开发中的数据库操作基本够用了。更多进阶技巧可以参考 [GORM 技巧](./gorm-tips.md) 和 [ID 生成策略](./go-id.md)。
