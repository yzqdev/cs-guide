# crypto

crypto模块提供加密相关操作

```ts
// getHashes 方法用于查看支持的加密算法
console.log(crypto.getHashes());
```

## md5加密

```ts
let md5 = crypto.createHash("md5"); // 创建 md5
let md5Sum = md5.update("hello"); // update 加密
let result = md5Sum.digest(); // 获取加密后结果
console.log(result) //// <Buffer 5d 41 40 2a bc 4b 2a 76 b9 71 9d 91 10 17 c5 92>
```

digest 方法参数用于指定加密后的返回值的格式，不传参默认返回加密后的 Buffer，常用的参数有 hex 和 Base64，hex 代表十六进制，加密后长度为 32，Base64 的结果长度为 24，以 == 结尾。

```ts
let md5 = crypto.createHash("md5"); // 创建 md5
let md5Sum = md5.update("hello"); // update 加密
let result = md5Sum.digest('hex'); // 获取加密后结果
//let result = md5Sum.digest("Base64");使用base64
console.log(result)//5d41402abc4b2a76b9719d911017c592
```

crypto支持链式调用

```ts
let result = crypto
    .createHash("md5")
    .update("he")
    .update("llo")
    .digest("hex");

console.log(result);
```
