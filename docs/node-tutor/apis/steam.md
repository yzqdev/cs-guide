# 流

## 读取流

```js
let data = '';

// 创建可读流
let readerStream = fs.createReadStream('input.txt');

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```

## 写入流

```js
let data = '菜鸟教程官网地址：www.runoob.com';

// 创建一个可以写入的流，写入到文件 output.txt 中
let writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> finish、error
writerStream.on('finish', function() {
    console.log("写入完成。");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");

```

## 创建一个大文件

```js
import fs from 'fs'
const file = fs.createWriteStream('./bigfile.txt');

for(let i=0; i<= 500; i++) {
  file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n');
}

file.end();
```

Node的fs模块给我们提供了一个可以操作任何文件的可读流,通过createReadStream方法创建。我们可以把它和response对象连接起来。

```js
import fs from 'fs'
import { createServer } from 'http';
let server=createServer()
server.on("request", (req, res) => {
  const src = fs.createReadStream("./bigfile.txt");
  src.pipe(res);
});

server.listen(8000);

```

## 链式流

链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。

接下来我们就是用管道和链式来压缩和解压文件。

```js
压缩
// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
  
console.log("文件压缩完成。");
```

解压

```js
// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));
  
console.log("文件解压完成。");

```

## 实现一个可写流

你输入什么,他输出什么

```js
import {Writable} from 'stream'

const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },
});

process.stdin.pipe(outStream);
```

## 创建一个可读流

```js
import {Readable} from 'stream'

const inStream = new Readable();
inStream.push("ABCDEFGHIJKLM");
inStream.push("NOPQRSTUVWXYZ");
inStream.push(null); // No more data
inStream.pipe(process.stdout);
```
