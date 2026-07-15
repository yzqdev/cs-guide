# ID 生成策略

数据库表的主键 ID 怎么生成，是每个项目都要面对的问题。这里整理了几种常见的方案。

## 自增 ID

最简单的方案，让数据库自动生成递增的整数 ID。

```go
type User struct {
    ID uint `gorm:"primarykey"` // 自增主键
}
```

**优点**：简单、有序、占空间小（4 或 8 字节）  
**缺点**：不能用于分布式系统（多个数据库实例同时写会冲突）、暴露记录数

## 雪花算法（Snowflake）

雪花算法是 Twitter 开源的分布式 ID 生成方案，在分布式系统中能生成唯一且有序的 ID。

### 原理

一个雪花 ID 是 64 位的整数，由四部分组成：

```
 0 | 41位时间戳 | 10位机器ID | 12位序列号
```

- **1 位**：符号位，始终为 0
- **41 位**：毫秒级时间戳（可用约 69 年）
- **10 位**：机器节点 ID（支持 1024 台机器）
- **12 位**：同一毫秒内的序列号（每毫秒可生成 4096 个 ID）

### 在 Go 中使用

推荐 [bwmarrin/snowflake](https://github.com/bwmarrin/snowflake) 库：

```go
package main

import (
    "fmt"
    "github.com/bwmarrin/snowflake"
)

func main() {
    // 创建一个节点，节点号 1（范围 0-1023）
    node, err := snowflake.NewNode(1)
    if err != nil {
        fmt.Println(err)
        return
    }

    // 生成一个 ID
    id := node.Generate()

    fmt.Printf("Int64  ID: %d\n", id)      // 整数形式
    fmt.Printf("String ID: %s\n", id)      // 字符串形式
    fmt.Printf("Base64 ID: %s\n", id.Base64())

    // 解析 ID 的组成部分
    fmt.Printf("生成时间: %d\n", id.Time())  // 时间戳
    fmt.Printf("节点号  : %d\n", id.Node())  // 机器节点
    fmt.Printf("序列号  : %d\n", id.Step())  // 序列号

    // 直接生成并打印
    fmt.Printf("ID       : %d\n", node.Generate().Int64())
}
```

### 在 GORM 中使用雪花 ID

```go
import "github.com/bwmarrin/snowflake"

var node *snowflake.Node

func init() {
    var err error
    node, err = snowflake.NewNode(1) // 节点号从环境变量读取
    if err != nil {
        panic(err)
    }
}

type User struct {
    ID   int64  `gorm:"primarykey"` // 雪花 ID 是 int64
    Name string
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
    u.ID = node.Generate().Int64()
    return
}
```

## UUID

UUID（通用唯一标识符）有多个版本，最常用的是 UUIDv4（随机生成）。

### 标准 UUID（v4）

```go
import "github.com/gofrs/uuid"

id, _ := uuid.NewV4()
fmt.Println(id.String()) // 例如：5b52d72c-82b3-4f8e-beb5-437a974842c
```

### 可排序的类 UUID 方案

标准 UUID 是无序的，作为数据库主键时会导致索引碎片。以下方案在保留唯一性的同时，加入了时间戳实现有序：

| 库                                                    | 示例 ID                       | 格式说明                               |
| :---------------------------------------------------- | :---------------------------- | :------------------------------------- |
| [segmentio/ksuid](https://github.com/segmentio/ksuid) | `0pPKHjWprnVxGH7dEsAoXX2YQvU` | 4 字节时间秒 + 16 字节随机             |
| [rs/xid](https://github.com/rs/xid)                   | `b50vl5e54p1000fo3gh0`        | 4 字节时间秒 + 机器 + 进程 + 随机      |
| [oklog/ulid](https://github.com/oklog/ulid)           | `01BJMVNPBBZC3E36FJTGVF0C4S`  | 6 字节时间毫秒 + 8 字节随机            |
| [sony/sonyflake](https://github.com/sony/sonyflake)   | `20f8707d6000108`             | 雪花算法 Go 实现，6 字节时间+序列+机器 |

### XID 用法示例

```go
import "github.com/rs/xid"

id := xid.New()
fmt.Println(id.String()) // 例如：b50vl5e54p1000fo3gh0
```

## 如何选择

| 方案               | 适用场景             | 特点                 |
| ------------------ | -------------------- | -------------------- |
| **自增 ID**        | 单机小项目、内部系统 | 简单，但有分布式限制 |
| **雪花算法**       | 分布式系统、微服务   | 有序、高性能、无冲突 |
| **UUIDv4**         | 无需排序、纯唯一标识 | 完全随机，索引性能差 |
| **KSUID/ULID/XID** | 需要排序的分布式 ID  | 兼顾唯一性和有序性   |

## 推荐

- **单机项目**：直接用自增 ID，省事
- **分布式项目**：优先考虑雪花算法（`bwmarrin/snowflake`）或 ULID（`oklog/ulid`）
- **需要人类可读**：用 KSUID（Base62 编码，比 UUID 短）
- **已有系统用 UUID**：继续用，但注意索引性能问题
