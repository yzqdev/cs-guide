---
order: 8
---

# crypto — 加密与哈希

`crypto` 模块提供加密功能，包括哈希、HMAC、加密解密等。

```js
import crypto from 'crypto'
```

## 哈希（Hash）

```js
// MD5
const hash = crypto.createHash('md5')
hash.update('hello')
hash.digest('hex')  // '5d41402abc4b2a76b9719d911017c592'

// 链式调用
crypto.createHash('sha256').update('hello').digest('hex')

// 支持的算法列表
console.log(crypto.getHashes())
// ['md5', 'sha1', 'sha256', 'sha512', 'ripemd160', ...]
```

常见哈希算法：`md5`、`sha1`、`sha256`、`sha512`。

## HMAC（密钥哈希）

```js
const hmac = crypto.createHmac('sha256', 'secret-key')
hmac.update('message')
hmac.digest('hex')
```

## 随机字节

```js
crypto.randomBytes(16, (err, buf) => {
  console.log(buf.toString('hex'))  // 生成随机 token
})

const buf = crypto.randomBytes(16)  // 同步
```

## 加密与解密

```js
const algorithm = 'aes-256-cbc'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

// 加密
const cipher = crypto.createCipheriv(algorithm, key, iv)
let encrypted = cipher.update('plain text', 'utf8', 'hex')
encrypted += cipher.final('hex')

// 解密
const decipher = crypto.createDecipheriv(algorithm, key, iv)
let decrypted = decipher.update(encrypted, 'hex', 'utf8')
decrypted += decipher.final('utf8')
```
