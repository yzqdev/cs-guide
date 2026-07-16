---
order: 14
---

# dns — 域名解析

`dns` 模块用于域名解析。

```js
import dns from 'dns'
```

## lookup

将域名解析为 IP 地址（使用操作系统 DNS）：

```js
dns.lookup('example.com', (err, address, family) => {
  console.log(address)  // '93.184.216.34'
  console.log(family)   // 4 (IPv4)
})

// 获取所有地址
dns.lookup('example.com', { all: true }, (err, addresses) => {
  console.log(addresses)
  // [{ address: '93.184.216.34', family: 4 }]
})
```

## resolve

使用 DNS 协议解析特定类型的记录：

```js
dns.resolve('example.com', 'A', (err, addresses) => {
  console.log(addresses)  // ['93.184.216.34']
})

dns.resolve('example.com', 'MX', (err, addresses) => {
  // [{ exchange: 'mail.example.com', priority: 10 }]
})

dns.resolve('example.com', 'TXT', (err, addresses) => {
  // [['v=spf1 ...']]
})
```

记录类型：`'A'`（IPv4）、`'AAAA'`（IPv6）、`'MX'`（邮件）、`'CNAME'`（别名）、`'TXT'`（文本）、`'NS'`（名称服务器）。

## 反向解析

```js
dns.reverse('8.8.8.8', (err, hostnames) => {
  console.log(hostnames)  // ['dns.google']
})
```

## 常用方法

| 方法 | 说明 |
|------|------|
| `dns.lookup()` | 使用系统 DNS 解析（默认） |
| `dns.resolve()` | 使用 DNS 协议解析 |
| `dns.resolve4()` | 解析 A 记录 |
| `dns.resolve6()` | 解析 AAAA 记录 |
| `dns.resolveMx()` | 解析 MX 记录 |
| `dns.resolveCname()` | 解析 CNAME 记录 |
| `dns.reverse()` | IP 反查域名 |
