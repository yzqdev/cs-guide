# id生成策略

## 雪花算法生成id

使用[https://github.com/bwmarrin/snowflake](https://github.com/bwmarrin/snowflake)

```go
package main

import (
 "fmt"

 "github.com/bwmarrin/snowflake"
)

func main() {

 // Create a new Node with a Node number of 1
 node, err := snowflake.NewNode(1)
 if err != nil {
  fmt.Println(err)
  return
 }

 // Generate a snowflake ID.
 id := node.Generate()

 // Print out the ID in a few different ways.
 fmt.Printf("Int64  ID: %d\n", id)
 fmt.Printf("String ID: %s\n", id)
 fmt.Printf("Base2  ID: %s\n", id.Base2())
 fmt.Printf("Base64 ID: %s\n", id.Base64())

 // Print out the ID's timestamp
 fmt.Printf("ID Time  : %d\n", id.Time())

 // Print out the ID's node number
 fmt.Printf("ID Node  : %d\n", id.Node())

 // Print out the ID's sequence number
 fmt.Printf("ID Step  : %d\n", id.Step())

  // Generate and print, all in one.
  fmt.Printf("ID       : %d\n", node.Generate().Int64())
}
```

## 生成uuid

| package                                                                | id                                    | format                                                                             |
| :--------------------------------------------------------------------- | :------------------------------------ | :--------------------------------------------------------------------------------- |
| [github.com/segmentio/ksuid](https://github.com/segmentio/ksuid)421    | `0pPKHjWprnVxGH7dEsAoXX2YQvU`         | 4 bytes of time (seconds) + 16 random bytes                                        |
| [github.com/rs/xid](https://github.com/rs/xid)960                      | `b50vl5e54p1000fo3gh0`                | 4 bytes of time (seconds) + 3 byte machine id + 2 byte process id + 3 bytes random |
| [github.com/kjk/betterguid](https://github.com/kjk/betterguid)96       | `-Kmdih_fs4ZZccpx2Hl1`                | 8 bytes of time (milliseconds) + 9 random bytes                                    |
| [github.com/sony/sonyflake](https://github.com/sony/sonyflake)283      | `20f8707d6000108`                     | ~6 bytes of time (10 ms) + 1 byte sequence + 2 bytes machine id                    |
| [github.com/oklog/ulid](https://github.com/oklog/ulid)142              | `01BJMVNPBBZC3E36FJTGVF0C4S`          | 6 bytes of time (milliseconds) + 8 bytes random                                    |
| [github.com/chilts/sid](https://github.com/chilts/sid)105              | `1JADkqpWxPx-4qaWY47~FqI`             | 8 bytes of time (ns) + 8 random bytes                                              |
| [github.com/satori/go.uuid](https://github.com/gofrs/uuid)582          | `5b52d72c-82b3-4f8e-beb5-437a974842c` | UUIDv4 from [RFC 4112](http://tools.ietf.org/html/rfc4122)44 for comparison        |
| [https://github.com/edwingeng/wuid](https://github.com/edwingeng/wuid) | `187500764`                           | 6 bytes                                                                            |
