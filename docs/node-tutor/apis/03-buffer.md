---
order: 3
---

# Buffer — 二进制数据

`Buffer` 用于处理二进制数据，是全局对象，无需导入。

## 创建 Buffer

```js
Buffer.alloc(10)                    // 创建 10 字节，填 0
Buffer.alloc(10, 1)                 // 创建 10 字节，填 0x1
Buffer.allocUnsafe(10)              // 创建 10 字节（可能含旧数据，更快）

Buffer.from('hello')                // 字符串 → Buffer（UTF-8）
Buffer.from('hello', 'base64')      // 指定编码
Buffer.from([0x68, 0x65, 0x6c])     // 字节数组 → Buffer
Buffer.from(buffer)                 // 复制 Buffer
```

## 读取与写入

```js
const buf = Buffer.alloc(256)
buf.write('hello')                  // 写入字符串，返回写入字节数

buf.toString()                      // 默认 UTF-8
buf.toString('hex')                 // 十六进制
buf.toString('base64')              // Base64
buf.toString('ascii', 0, 5)         // 指定编码和范围

buf[0]                              // 读取单个字节（类似数组）
buf.length                          // Buffer 字节长度
```

## Buffer 操作

```js
// 合并
const combined = Buffer.concat([buf1, buf2])

// 比较
buf1.compare(buf2)                  // -1, 0, 1

// 拷贝
buf1.copy(buf2, targetStart, sourceStart, sourceEnd)

// 裁剪（共享内存）
const sub = buf.slice(0, 5)
sub[0] = 0x65                       // 会修改原 buf

// JSON 序列化
JSON.stringify(Buffer.from([1,2,3]))
// '{"type":"Buffer","data":[1,2,3]}'
```

## 编码对照

| 编码 | 说明 |
|------|------|
| `utf8` | 默认，多字节 Unicode |
| `ascii` | 仅 7 位 ASCII |
| `base64` | Base64 编码 |
| `hex` | 十六进制（每字节 2 字符） |
| `latin1` / `binary` | 单字节编码 |
