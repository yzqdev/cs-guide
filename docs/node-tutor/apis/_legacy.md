# Legacy Node.js API Docs (合并归档)

> 此文件为旧版 API 文档的合并归档，内容保留原样供参考。
> 新版教程请查看当前目录下 `00-xx.md` 系列文件。

---

# Buffer

JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。
但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

## 创建buffer

```js
const buf = Buffer.from('runoob', 'ascii');

// 输出 72756e6f6f62
console.log(buf.toString('hex'));

// 输出 cnVub29i
console.log(buf.toString('base64'));
```

**Node.js 目前支持的字符编码包括：**

- **ascii** - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
- **utf8** - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
- **utf16le** - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
- **ucs2** - **utf16le** 的别名。
- **base64** - Base64 编码。
- **latin1** - 一种把 **Buffer** 编码成一字节编码的字符串的方式。
- **binary** - **latin1** 的别名。
- **hex** - 将每个字节编码为两个十六进制字符。

## 创建 Buffer 类

Buffer 提供了以下 API 来创建 Buffer 类：

- **Buffer.alloc(size[, fill[, encoding]])：** 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
- **Buffer.allocUnsafe(size)：** 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
- **Buffer.allocUnsafeSlow(size)**
- **Buffer.from(array)：** 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
- **Buffer.from(arrayBuffer[, byteOffset[, length]])：** 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
- **Buffer.from(buffer)：** 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
- **Buffer.from(string[, encoding])：** 返回一个被 string 的值初始化的新的 Buffer 实例

```js
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');
```

------

## 写入缓冲区

写入 Node 缓冲区的语法如下所示：

```js
buf.write(string[, offset[, length]][, encoding])
```

参数描述如下：

- **string** - 写入缓冲区的字符串。
- **offset** - 缓冲区开始写入的索引值，默认为 0 。
- **length** - 写入的字节数，默认为 buffer.length
- **encoding** - 使用的编码。默认为 'utf8' 。

根据 encoding 的字符编码写入 string 到 buf 中的 offset 位置。 length 参数是写入的字节数。 如果 buf 没有足够的空间保存整个字符串，则只会写入 string 的一部分。 只部分解码的字符不会被写入。

- 返回值

返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。

- 实例

```js
buf = Buffer.alloc(256);
len = buf.write("www.runoob.com");

console.log("写入字节数 : "+  len);
```

执行以上代码，输出结果为：

```
$node main.js
写入字节数 : 14
```

## 从缓冲区读取数据

- 语法

读取 Node 缓冲区数据的语法如下所示：

```js
buf.toString([encoding[, start[, end]]])
```

- 参数

参数描述如下：

- **encoding** - 使用的编码。默认为 'utf8' 。
- **start** - 指定开始读取的索引位置，默认为 0。
- **end** - 结束位置，默认为缓冲区的末尾。

- 返回值

解码缓冲区数据并使用指定的编码返回字符串。

- 实例

```js
buf = Buffer.alloc(26);
for (let i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}

console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   //使用 'ascii' 编码, 并输出: abcde
console.log( buf.toString('utf8',0,5));    // 使用 'utf8' 编码, 并输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用默认的 'utf8' 编码, 并输出: abcde
```

执行以上代码，输出结果为：

```
$ node main.js
abcdefghijklmnopqrstuvwxyz
abcde
abcde
abcde
```

------

## 将 Buffer 转换为 JSON 对象

- 语法

将 Node Buffer 转换为 JSON 对象的函数语法格式如下：

```js
buf.toJSON()
```

当字符串化一个 Buffer 实例时，[JSON.stringify()](https://www.runoob.com/js/javascript-json-stringify.html) 会隐式地调用该 **toJSON()**。

- 返回值

返回 JSON 对象。

- 实例

```
const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);

// 输出: {"type":"Buffer","data":[1,2,3,4,5]}
console.log(json);

const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ?
    Buffer.from(value.data) :
    value;
});

// 输出: <Buffer 01 02 03 04 05>
console.log(copy);
```

执行以上代码，输出结果为：

```
{"type":"Buffer","data":[1,2,3,4,5]}
<Buffer 01 02 03 04 05>
```

------

## 缓冲区合并

- 语法

Node 缓冲区合并的语法如下所示：

```
Buffer.concat(list[, totalLength])
```

- 参数

参数描述如下：

- **list** - 用于合并的 Buffer 对象数组列表。
- **totalLength** - 指定合并后Buffer对象的总长度。

- 返回值

返回一个多个成员合并的新 Buffer 对象。

- 实例

```js
let buffer1 = Buffer.from(('菜鸟教程'));
let buffer2 = Buffer.from(('www.runoob.com'));
let buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());
```

执行以上代码，输出结果为：

```
buffer3 内容: 菜鸟教程www.runoob.com
```

------

## 缓冲区比较

- 语法

Node Buffer 比较的函数语法如下所示, 该方法在 Node.js v0.12.2 版本引入：

```
buf.compare(otherBuffer);
```

- 参数

参数描述如下：

- **otherBuffer** - 与 **buf** 对象比较的另外一个 Buffer 对象。

- 返回值

返回一个数字，表示 **buf** 在 **otherBuffer** 之前，之后或相同。

- 实例

```js
let buffer1 = Buffer.from('ABC');
let buffer2 = Buffer.from('ABCD');
let result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}
```

执行以上代码，输出结果为：

```
ABC在ABCD之前
```

------

## 拷贝缓冲区

- 语法

Node 缓冲区拷贝语法如下所示：

```
buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
```

- 参数

参数描述如下：

- **targetBuffer** - 要拷贝的 Buffer 对象。
- **targetStart** - 数字, 可选, 默认: 0
- **sourceStart** - 数字, 可选, 默认: 0
- **sourceEnd** - 数字, 可选, 默认: buffer.length

- 返回值

没有返回值。

- 实例

```js
let buf1 = Buffer.from('abcdefghijkl');
let buf2 = Buffer.from('RUNOOB');

//将 buf2 插入到 buf1 指定位置上
buf2.copy(buf1, 2);

console.log(buf1.toString());
```

执行以上代码，输出结果为：

```
abRUNOOBijkl
```

------

## 缓冲区裁剪

Node 缓冲区裁剪语法如下所示：

```
buf.slice([start[, end]])
```

- 参数

参数描述如下：

- **start** - 数字, 可选, 默认: 0
- **end** - 数字, 可选, 默认: buffer.length

- 返回值

返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。

- 实例

```
let buffer1 = Buffer.from('runoob');
// 剪切缓冲区
let buffer2 = buffer1.slice(0,2);
console.log("buffer2 content: " + buffer2.toString());
```

执行以上代码，输出结果为：

```
buffer2 content: ru
```

------

## 缓冲区长度

- 语法

Node 缓冲区长度计算语法如下所示：

```
buf.length;
```

- 返回值

返回 Buffer 对象所占据的内存长度。

- 实例

```
let buffer = Buffer.from('www.runoob.com');
//  缓冲区长度
console.log("buffer length: " + buffer.length);
```

执行以上代码，输出结果为：

```
buffer length: 14
```

---

# child_process
NodeJS自带的`fs`模块比较基础，把一个目录里的所有文件和子目录都拷贝到另一个目录里需要写不少代码。另外我们也知道，终端下的`cp`命令比较好用，一条`cp -r source/* target`命令就能搞定目录拷贝。那我们首先看看如何使用NodeJS调用终端命令来简化目录拷贝，示例代码如下：

```js
 let child_process = require('child_process');
 let util = require('util');

 function copy(source, target, callback) {
  child_process.exec(
   util.format('cp -r %s/* %s', source, target), callback);
 }

 copy('a', 'b', function (err) {
  // ...
 });
```

从以上代码中可以看到，子进程是异步运行的，通过回调函数返回执行结果。

## API走马观花

我们先大致看看NodeJS提供了哪些和进程管理有关的API。这里并不逐一介绍每个API的使用方法，官方文档已经做得很好了。

### Process

> **官方文档：** [http://nodejs.org/api/process.html](http://nodejs.org/api/process.html)

任何一个进程都有启动进程时使用的命令行参数，有标准输入标准输出，有运行权限，有运行环境和运行状态。在NodeJS中，可以通过`process`对象感知和控制NodeJS自身进程的方方面面。另外需要注意的是，`process`不是内置模块，而是一个全局对象，因此在任何地方都可以直接使用。

### Child Process

> **官方文档：** [http://nodejs.org/api/child_process.html](http://nodejs.org/api/child_process.html)

使用`child_process`模块可以创建和控制子进程。该模块提供的API中最核心的是`.spawn`，其余API都是针对特定使用场景对它的进一步封装，算是一种语法糖。

### Cluster

> **官方文档：** [http://nodejs.org/api/cluster.html](http://nodejs.org/api/cluster.html)

`cluster`模块是对`child_process`模块的进一步封装，专用于解决单进程NodeJS Web服务器无法充分利用多核CPU的问题。使用该模块可以简化多进程服务器程序的开发，让每个核上运行一个工作进程，并统一通过主进程监听端口和分发请求。

## 应用场景

和进程管理相关的API单独介绍起来比较枯燥，因此这里从一些典型的应用场景出发，分别介绍一些重要API的使用方法。

### 如何获取命令行参数

在NodeJS中可以通过`process.argv`获取命令行参数。但是比较意外的是，`node`执行程序路径和主模块文件路径固定占据了`argv[0]`和`argv[1]`两个位置，而第一个命令行参数从`argv[2]`开始。为了让`argv`使用起来更加自然，可以按照以下方式处理。

```js
 function main(argv) {
  // ...
 }

 main(process.argv.slice(2));
```

### 如何退出程序

通常一个程序做完所有事情后就正常退出了，这时程序的退出状态码为`0`。或者一个程序运行时发生了异常后就挂了，这时程序的退出状态码不等于`0`。如果我们在代码中捕获了某个异常，但是觉得程序不应该继续运行下去，需要立即退出，并且需要把退出状态码设置为指定数字，比如`1`，就可以按照以下方式：

```js
 try {
  // ...
 } catch (err) {
  // ...
  process.exit(1);
 }
```

### 如何控制输入输出

NodeJS程序的标准输入流（stdin）、一个标准输出流（stdout）、一个标准错误流（stderr）分别对应`process.stdin`、`process.stdout`和`process.stderr`，第一个是只读数据流，后边两个是只写数据流，对它们的操作按照对数据流的操作方式即可。例如，`console.log`可以按照以下方式实现。

```js
 function log() {
  process.stdout.write(
   util.format.apply(util, arguments) + '\n');
 }
```

### 如何降权

在Linux系统下，我们知道需要使用root权限才能监听1024以下端口。但是一旦完成端口监听后，继续让程序运行在root权限下存在安全隐患，因此最好能把权限降下来。以下是这样一个例子。

```js
 http.createServer(callback).listen(80, function () {
  let env = process.env,
   uid = parseInt(env['SUDO_UID'] || process.getuid(), 10),
   gid = parseInt(env['SUDO_GID'] || process.getgid(), 10);

  process.setgid(gid);
  process.setuid(uid);
 });
```

上例中有几点需要注意：

1. 如果是通过`sudo`获取root权限的，运行程序的用户的UID和GID保存在环境变量`SUDO_UID`和`SUDO_GID`里边。如果是通过`chmod +s`方式获取root权限的，运行程序的用户的UID和GID可直接通过`process.getuid`和`process.getgid`方法获取。

2. `process.setuid`和`process.setgid`方法只接受`number`类型的参数。

3. 降权时必须先降GID再降UID，否则顺序反过来的话就没权限更改程序的GID了。

### 如何创建子进程

以下是一个创建NodeJS子进程的例子。

```js
 let child = child_process.spawn('node', [ 'xxx.js' ]);

 child.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
 });

 child.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
 });

 child.on('close', function (code) {
  console.log('child process exited with code ' + code);
 });
```

上例中使用了`.spawn(exec, args, options)`方法，该方法支持三个参数。第一个参数是执行文件路径，可以是执行文件的相对或绝对路径，也可以是根据PATH环境变量能找到的执行文件名。第二个参数中，数组中的每个成员都按顺序对应一个命令行参数。第三个参数可选，用于配置子进程的执行环境与行为。

另外，上例中虽然通过子进程对象的`.stdout`和`.stderr`访问子进程的输出，但通过`options.stdio`字段的不同配置，可以将子进程的输入输出重定向到任何数据流上，或者让子进程共享父进程的标准输入输出流，或者直接忽略子进程的输入输出。

### 进程间如何通讯

在Linux系统下，进程之间可以通过信号互相通信。以下是一个例子。

```js
 /*parent.js*/
 let child = child_process.spawn('node', [ 'child.js' ]);

 child.kill('SIGTERM');

 /*child.js*/
 process.on('SIGTERM', function () {
  cleanUp();
  process.exit(0);
 });
```

在上例中，父进程通过`.kill`方法向子进程发送`SIGTERM`信号，子进程监听`process`对象的`SIGTERM`事件响应信号。不要被`.kill`方法的名称迷惑了，该方法本质上是用来给进程发送信号的，进程收到信号后具体要做啥，完全取决于信号的种类和进程自身的代码。

另外，如果父子进程都是NodeJS进程，就可以通过IPC（进程间通讯）双向传递数据。以下是一个例子。

```js
 /*parent.js*/
 let child = child_process.spawn('node', [ 'child.js' ], {
   stdio: [ 0, 1, 2, 'ipc' ]
  });

 child.on('message', function (msg) {
  console.log(msg);
 });

 child.send({ hello: 'hello' });

 /*child.js*/
 process.on('message', function (msg) {
  msg.hello = msg.hello.toUpperCase();
  process.send(msg);
 });
```

可以看到，父进程在创建子进程时，在`options.stdio`字段中通过`ipc`开启了一条IPC通道，之后就可以监听子进程对象的`message`事件接收来自子进程的消息，并通过`.send`方法给子进程发送消息。在子进程这边，可以在`process`对象上监听`message`事件接收来自父进程的消息，并通过`.send`方法向父进程发送消息。数据在传递过程中，会先在发送端使用`JSON.stringify`方法序列化，再在接收端使用`JSON.parse`方法反序列化。

### 如何守护子进程

守护进程一般用于监控工作进程的运行状态，在工作进程不正常退出时重启工作进程，保障工作进程不间断运行。以下是一种实现方式。

```js
 /*daemon.js*/
 function spawn(mainModule) {
  let worker = child_process.spawn('node', [ mainModule ]);

  worker.on('exit', function (code) {
   if (code !== 0) {
    spawn(mainModule);
   }
  });
 }

 spawn('worker.js');
```

可以看到，工作进程非正常退出时，守护进程立即重启工作进程。


## exec

```js
import { exec} from 'child_process'

let ls = exec('ls -l', function (error, stdout, stderr) {
  if (error) {
    console.log(error.stack);
    console.log('Error code: ' + error.code);
  }
  console.log('Child Process STDOUT: ' + stdout);
});
```

## execFile

```js
import child_process from 'child_process'

let path = ".";
child_process.execFile('/bin/ls', ['-l', path], function (err, result) {
    console.log(result)
});
```

等同于

```js
let child = exec('ls -l');

child.stdout.on('data', function(data) {
  console.log('stdout: ' + data);
});
child.stderr.on('data', function(data) {
  console.log('stdout: ' + data);
});
child.on('close', function(code) {
  console.log('closing code: ' + code);
});
```

## execSync

```js
import execSync from "child_process" 

let SEPARATOR = process.platform === 'win32' ? ';' : ':';
let env = Object.assign({}, process.env);

env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH;

function myExecSync(cmd) {
  let output = execSync(cmd, {
    cwd: process.cwd(),
    env: env
  });

  console.log(output);
}

myExecSync('eslint .');
```

上面代码中，`execSync`方法的第二个参数是一个对象。该对象的cwd属性指定脚本的当前目录，env属性指定环境变量。上面代码将`./node_modules/.bin`目录，存入`$PATH`变量。这样就可以不加路径，引用项目内部的模块命令了，比如eslint命令实际执行的是`./node_modules/.bin/eslint`。

## spawn

spawn方法创建一个子进程来执行特定命令，用法与execFile方法类似，但是没有回调函数，只能通过监听事件，来获取运行结果。它属于异步执行，适用于子进程长时间运行的情况。

```js
import child_process from 'child_process'

let path = '.';
let ls = child_process.spawn('/bin/ls', ['-l', path]);
ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ls.on('close', function (code) {
  console.log('child process exited with code ' + code);
});
```

## fork()

fork方法直接创建一个子进程，执行Node脚本，`fork('./child.js')` 相当于 `spawn('node', ['./child.js'])` 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。

```js
let n = child_process.fork('./child.js');
n.on('message', function(m) {
  console.log('PARENT got message:', m);
});
n.send({ hello: 'world' });
```

上面代码中，fork方法返回一个代表进程间通信管道的对象，对该对象可以监听message事件，用来获取子进程返回的信息，也可以向子进程发送信息。

child.js脚本的内容如下。

```js
process.on('message', function(m) {
  console.log('CHILD got message:', m);
});
process.send({ foo: 'bar' });
```

上面代码中，子进程监听message事件，并向父进程发送信息。

## send()

使用 child_process.fork() 生成新进程之后，就可以用 `child.send(message, [sendHandle])` 向新进程发送消息。新进程中通过监听message事件，来获取消息。

下面的例子是主进程的代码。

```js
import cp from 'child_process'

let n = cp.fork(__dirname + '/sub.js');

n.on('message', function(m) {
  console.log('PARENT got message:', m);
});

n.send({ hello: 'world' });
```

下面是子进程sub.js代码。

```js
process.on('message', function(m) {
  console.log('CHILD got message:', m);
});

process.send({ foo: 'bar' });
```

---

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

---

# events

events模块提供一个事件监听器,用来监听各种事件,ws就是用的events

```ts
import EventEmitter from 'events'

const door = new EventEmitter();
```

他有两个内置的事件监听器

- `newListener` 添加新的监听器
- `removeListener`移除一个监听器

## emitter.addListener()

是`emitter.on()`的缩写

## emitter.emit()

触发事件

```ts
door.emit('slam'); // emitting the event "slam"
```

## emitter.eventNames()

获取一个事件名的数组

## emitter.getMaxListeners()

获取最多能添加的监听器数量,默认是10,可以用`setMaxListeners()`增加

## emitter.listenerCount()

获取事件的参数个数

```ts
door.listenerCount('open');

```

## emitter.listeners()

```ts
door.listeners('open');
```

## emitter.off()

`emitter.removeListener()`的缩写

## emitter.on()

触发一个事件,执行函数

```ts
door.on('open', () => {
  console.log('Door was opened');
});
```

## emitter.once()

只执行一次回调函数

```ts
import EventEmitter from 'events'

const ee = new EventEmitter();

ee.once('my-event', () => {
  // call callback function once
});
```

## emitter.prependListener()

在事件列表最前面添加事件

## emitter.removeAllListeners()

移除所有的事件

```ts
door.removeAllListeners('open');
```

## emitter.removeListener()

移除一个特定的事件

```ts
const doSomething = () => {};
door.on('open', doSomething);
door.removeListener('open', doSomething);
```

## emitter.setMaxListeners()

设置最多的的监听器,默认是10

---

# file

:::tip
<https://nodejs.dev/learn/the-nodejs-fs-module>
:::

## 使用readfile

```ts
import * as fs from 'fs'

fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

```

当然也可以使用同步的方式

```ts
import * as fs from 'fs'
try {
  const data = fs.readFileSync('/Users/joe/test.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}
```

使用promise格式的fs

```ts
imort * as fsPromises from 'fs/promises'
async function example() {
  try {
    const data = await fsPromises.readFile('/Users/joe/test.txt', { encoding: 'utf8' });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
example();
```

## 写入文件

```ts
import * as fs from 'fs'
const content = 'Some content!';

fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});
```

使用同步的写法

```ts
import * as fs from 'fs'
const content = 'Some content!';

try {
  fs.writeFileSync('/Users/joe/test.txt', content);
  // file written successfully
} catch (err) {
  console.error(err);
}
```

使用promise的写法

```ts
imort * as fsPromises from 'fs/promises'

async function example() {
  try {
    const content = 'Some content!';
    await fsPromises.writeFile('/Users/joe/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}
example();

```

添加写入的flag

```ts
fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {});

```

r+:打开文件(写入或者读取)

## 在末尾追加

```ts
const content = 'Some content!';

fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err);
  }
  // done!
});
```

使用promise

```ts
async function example() {
  try {
    const content = 'Some content!';
    await fsPromises.appendFile('/Users/joe/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}
example();
```

## 写入流

```ts
import * as fs from 'fs'
let data = '菜鸟教程官网地址：www.runoob.com';

// 创建一个可以写入的流，写入到文件 output.txt 中
let  writerStream = fs.createWriteStream('output.txt');

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

### 小文件拷贝

我们使用NodeJS内置的`fs`模块简单实现这个程序如下。

```js
 import * as fs from 'fs'

 function copy(src, dst) {
  fs.writeFileSync(dst, fs.readFileSync(src));
 }

 function main(argv) {
  copy(argv[0], argv[1]);
 }

 main(process.argv.slice(2));
```

以上程序使用`fs.readFileSync`从源路径读取文件内容，并使用`fs.writeFileSync`将文件内容写入目标路径。

> **豆知识：** `process`是一个全局变量，可通过`process.argv`获得命令行参数。由于`argv[0]`固定等于NodeJS执行程序的绝对路径，`argv[1]`固定等于主模块的绝对路径，因此第一个命令行参数从`argv[2]`这个位置开始。

### 大文件拷贝

上边的程序拷贝一些小文件没啥问题，但这种一次性把所有文件内容都读取到内存中后再一次性写入磁盘的方式不适合拷贝大文件，内存会爆仓。对于大文件，我们只能读一点写一点，直到完成拷贝。因此上边的程序需要改造如下。

```js
 import * as fs from 'fs'

 function copy(src, dst) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
 }

 function main(argv) {
  copy(argv[0], argv[1]);
 }

 main(process.argv.slice(2));
```

以上程序使用`fs.createReadStream`创建了一个源文件的只读数据流，并使用`fs.createWriteStream`创建了一个目标文件的只写数据流，并且用`pipe`方法把两个数据流连接了起来。连接起来后发生的事情，说得抽象点的话，水顺着水管从一个桶流到了另一个桶。

## API走马观花

我们先大致看看NodeJS提供了哪些和文件操作有关的API。这里并不逐一介绍每个API的使用方法，官方文档已经做得很好了。

### Buffer（数据块）

> **官方文档：** [http://nodejs.org/api/buffer.html](http://nodejs.org/api/buffer.html)

JS语言自身只有字符串数据类型，没有二进制数据类型，因此NodeJS提供了一个与`String`对等的全局构造函数`Buffer`来提供对二进制数据的操作。除了可以读取文件得到`Buffer`的实例外，还能够直接构造，例如：

```js
 let bin = Buffer.from([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
```

`Buffer`与字符串类似，除了可以用`.length`属性得到字节长度外，还可以用`[index]`方式读取指定位置的字节，例如：

```js
 bin[0]; // => 0x68;
```

`Buffer`与字符串能够互相转化，例如可以使用指定编码将二进制数据转化为字符串：

```js
 let str = bin.toString('utf-8'); // => "hello"
```

或者反过来，将字符串转换为指定编码下的二进制数据：

```js
 let bin = Buffer.from('hello', 'utf-8'); // => <Buffer 68 65 6c 6c 6f>
```

`Buffer`与字符串有一个重要区别。字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变。至于`Buffer`，更像是可以做指针操作的C语言数组。例如，可以用`[index]`方式直接修改某个位置的字节。

```js
 bin[0] = 0x48;
```

而`.slice`方法也不是返回一个新的`Buffer`，而更像是返回了指向原`Buffer`中间的某个位置的指针，如下所示。

```text
 [ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]
     ^           ^
     |           |
    bin     bin.slice(2)
```

因此对`.slice`方法返回的`Buffer`的修改会作用于原`Buffer`，例如：

```js
 let bin = Buffer.from([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
 let sub = bin.slice(2);

 sub[0] = 0x65;
 console.log(bin); // => <Buffer 68 65 65 6c 6f>
```

也因此，如果想要拷贝一份`Buffer`，得首先创建一个新的`Buffer`，并通过`.copy`方法把原`Buffer`中的数据复制过去。这个类似于申请一块新的内存，并把已有内存中的数据复制过去。以下是一个例子。

```js
 let bin = Buffer.from([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
 let dup = Buffer.from(bin.length);

 bin.copy(dup);
 dup[0] = 0x48;
 console.log(bin); // => <Buffer 68 65 6c 6c 6f>
 console.log(dup); // => <Buffer 48 65 65 6c 6f>
```

总之，`Buffer`将JS的数据处理能力从字符串扩展到了任意二进制数据。

### Stream（数据流）

> **官方文档：** [http://nodejs.org/api/stream.html](http://nodejs.org/api/stream.html)

当内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，我们就需要用到数据流。NodeJS中通过各种`Stream`来提供对数据流的操作。

以上边的大文件拷贝程序为例，我们可以为数据来源创建一个只读数据流，示例如下：

```js
 let rs = fs.createReadStream(pathname);

 rs.on('data', function (chunk) {
  doSomething(chunk);
 });

 rs.on('end', function () {
  cleanUp();
 });
```

> **豆知识：** `Stream`基于事件机制工作，所有`Stream`的实例都继承于NodeJS提供的[EventEmitter](http://nodejs.org/api/events.html)。

上边的代码中`data`事件会源源不断地被触发，不管`doSomething`函数是否处理得过来。代码可以继续做如下改造，以解决这个问题。

```js
 let rs = fs.createReadStream(src);

 rs.on('data', function (chunk) {
  rs.pause();
  doSomething(chunk, function () {
   rs.resume();
  });
 });

 rs.on('end', function () {
  cleanUp();
 });
```

以上代码给`doSomething`函数加上了回调，因此我们可以在处理数据前暂停数据读取，并在处理数据后继续读取数据。

此外，我们也可以为数据目标创建一个只写数据流，示例如下：

```js
 let rs = fs.createReadStream(src);
 let ws = fs.createWriteStream(dst);

 rs.on('data', function (chunk) {
  ws.write(chunk);
 });

 rs.on('end', function () {
  ws.end();
 });
```

我们把`doSomething`换成了往只写数据流里写入数据后，以上代码看起来就像是一个文件拷贝程序了。但是以上代码存在上边提到的问题，如果写入速度跟不上读取速度的话，只写数据流内部的缓存会爆仓。我们可以根据`.write`方法的返回值来判断传入的数据是写入目标了，还是临时放在了缓存了，并根据`drain`事件来判断什么时候只写数据流已经将缓存中的数据写入目标，可以传入下一个待写数据了。因此代码可以改造如下：

```js
 let rs = fs.createReadStream(src);
 let ws = fs.createWriteStream(dst);

 rs.on('data', function (chunk) {
  if (ws.write(chunk) === false) {
   rs.pause();
  }
 });

 rs.on('end', function () {
  ws.end();
 });

 ws.on('drain', function () {
  rs.resume();
 });
```

以上代码实现了数据从只读数据流到只写数据流的搬运，并包括了防爆仓控制。因为这种使用场景很多，例如上边的大文件拷贝程序，NodeJS直接提供了`.pipe`方法来做这件事情，其内部实现方式与上边的代码类似。

### File System（文件系统）

> **官方文档：** [http://nodejs.org/api/fs.html](http://nodejs.org/api/fs.html)

NodeJS通过`fs`内置模块提供对文件的操作。`fs`模块提供的API基本上可以分为以下三类：

+ 文件属性读写。

 其中常用的有`fs.stat`、`fs.chmod`、`fs.chown`等等。

+ 文件内容读写。

 其中常用的有`fs.readFile`、`fs.readdir`、`fs.writeFile`、`fs.mkdir`等等。

+ 底层文件操作。

 其中常用的有`fs.open`、`fs.read`、`fs.write`、`fs.close`等等。

NodeJS最精华的异步IO模型在`fs`模块里有着充分的体现，例如上边提到的这些API都通过回调函数传递结果。以`fs.readFile`为例：

```js
 fs.readFile(pathname, function (err, data) {
  if (err) {
   // Deal with error.
  } else {
   // Deal with data.
  }
 });
```

如上边代码所示，基本上所有`fs`模块API的回调参数都有两个。第一个参数在有错误发生时等于异常对象，第二个参数始终用于返回API方法执行结果。

此外，`fs`模块的所有异步API都有对应的同步版本，用于无法使用异步操作时，或者同步操作更方便时的情况。同步API除了方法名的末尾多了一个`Sync`之外，异常对象与执行结果的传递方式也有相应变化。同样以`fs.readFileSync`为例：

```js
 try {
  let data = fs.readFileSync(pathname);
  // Deal with data.
 } catch (err) {
  // Deal with error.
 }
```

`fs`模块提供的API很多，这里不一一介绍，需要时请自行查阅官方文档。

### Path（路径）

> **官方文档：** [http://nodejs.org/api/path.html](http://nodejs.org/api/path.html)

操作文件时难免不与文件路径打交道。NodeJS提供了`path`内置模块来简化路径相关操作，并提升代码可读性。以下分别介绍几个常用的API。

+ path.normalize

 将传入的路径转换为标准路径，具体讲的话，除了解析路径中的`.`与`..`外，还能去掉多余的斜杠。如果有程序需要使用路径作为某些数据的索引，但又允许用户随意输入路径时，就需要使用该方法保证路径的唯一性。以下是一个例子：

```js
  let cache = {};
  
  function store(key, value) {
   cache[path.normalize(key)] = value;
  }

  store('foo/bar', 1);
  store('foo//baz//../bar', 2);
  console.log(cache);  // => { "foo/bar": 2 }
```

 > **坑出没注意：** 标准化之后的路径里的斜杠在Windows系统下是`\`，而在Linux系统下是`/`。如果想保证任何系统下都使用`/`作为路径分隔符的话，需要用`.replace(/\\/g, '/')`再替换一下标准路径。

+ path.join

 将传入的多个路径拼接为标准路径。该方法可避免手工拼接路径字符串的繁琐，并且能在不同系统下正确使用相应的路径分隔符。以下是一个例子：

```js
  path.join('foo/', 'baz/', '../bar'); // => "foo/bar"
```

+ path.extname

 当我们需要根据不同文件扩展名做不同操作时，该方法就显得很好用。以下是一个例子：

  path.extname('foo/bar.js'); // => ".js"

`path`模块提供的其余方法也不多，稍微看一下官方文档就能全部掌握。

## 遍历目录

遍历目录是操作文件时的一个常见需求。比如写一个程序，需要找到并处理指定目录下的所有JS文件时，就需要遍历整个目录。

### 递归算法

遍历目录时一般使用递归算法，否则就难以编写出简洁的代码。递归算法与数学归纳法类似，通过不断缩小问题的规模来解决问题。以下示例说明了这种方法。

```js
 function factorial(n) {
  if (n === 1) {
   return 1;
  } else {
   return n * factorial(n - 1);
  }
 }
```

上边的函数用于计算N的阶乘（N!）。可以看到，当N大于1时，问题简化为计算N乘以N-1的阶乘。当N等于1时，问题达到最小规模，不需要再简化，因此直接返回1。

> **陷阱：** 使用递归算法编写的代码虽然简洁，但由于每递归一次就产生一次函数调用，在需要优先考虑性能时，需要把递归算法转换为循环算法，以减少函数调用次数。

### 遍历算法

目录是一个树状结构，在遍历时一般使用深度优先+先序遍历算法。深度优先，意味着到达一个节点后，首先接着遍历子节点而不是邻居节点。先序遍历，意味着首次到达了某节点就算遍历完成，而不是最后一次返回某节点才算数。因此使用这种遍历方式时，下边这棵树的遍历顺序是`A > B > D > E > C > F`。

```text
           A
          / \
         B   C
        / \   \
       D   E   F
```

### 同步遍历

了解了必要的算法后，我们可以简单地实现以下目录遍历函数。

```js
 function travel(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
   let pathname = path.join(dir, file);

   if (fs.statSync(pathname).isDirectory()) {
    travel(pathname, callback);
   } else {
    callback(pathname);
   }
  });
 }
```

可以看到，该函数以某个目录作为遍历的起点。遇到一个子目录时，就先接着遍历子目录。遇到一个文件时，就把文件的绝对路径传给回调函数。回调函数拿到文件路径后，就可以做各种判断和处理。因此假设有以下目录：

```
+ /home/user/
+ foo/
   x.js
+ bar/
   y.js
  z.css
```

使用以下代码遍历该目录时，得到的输入如下。

```js
 travel('/home/user', function (pathname) {
  console.log(pathname);
 });

 ------------------------
 /home/user/foo/x.js
 /home/user/bar/y.js
 /home/user/z.css
```

### 异步遍历

如果读取目录或读取文件状态时使用的是异步API，目录遍历函数实现起来会有些复杂，但原理完全相同。`travel`函数的异步版本如下。

```js
 function travel(dir, callback, finish) {
  fs.readdir(dir, function (err, files) {
   (function next(i) {
    if (i < files.length) {
     let pathname = path.join(dir, files[i]);

     fs.stat(pathname, function (err, stats) {
      if (stats.isDirectory()) {
       travel(pathname, callback, function () {
        next(i + 1);
       });
      } else {
       callback(pathname, function () {
        next(i + 1);
       });
      }
     });
    } else {
     finish && finish();
    }
   }(0));
  });
 }
```

这里不详细介绍异步遍历函数的编写技巧，在后续章节中会详细介绍这个。总之我们可以看到异步编程还是蛮复杂的。

## 文本编码

使用NodeJS编写前端工具时，操作得最多的是文本文件，因此也就涉及到了文件编码的处理问题。我们常用的文本编码有`UTF8`和`GBK`两种，并且`UTF8`文件还可能带有BOM。在读取不同编码的文本文件时，需要将文件内容转换为JS使用的`UTF8`编码字符串后才能正常处理。

### BOM的移除

BOM用于标记一个文本文件使用Unicode编码，其本身是一个Unicode字符（"\uFEFF"），位于文本文件头部。在不同的Unicode编码下，BOM字符对应的二进制字节如下：

```
     Bytes      Encoding
 ----------------------------
     FE FF       UTF16BE
  FF FE       UTF16LE
     EF BB BF    UTF8
```

因此，我们可以根据文本文件头几个字节等于啥来判断文件是否包含BOM，以及使用哪种Unicode编码。但是，BOM字符虽然起到了标记文件编码的作用，其本身却不属于文件内容的一部分，如果读取文本文件时不去掉BOM，在某些使用场景下就会有问题。例如我们把几个JS文件合并成一个文件后，如果文件中间含有BOM字符，就会导致浏览器JS语法错误。因此，使用NodeJS读取文本文件时，一般需要去掉BOM。例如，以下代码实现了识别和去除UTF8 BOM的功能。

```js
 function readText(pathname) {
  let bin = fs.readFileSync(pathname);

  if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
   bin = bin.slice(3);
  }

  return bin.toString('utf-8');
 }
```

### GBK转UTF8

NodeJS支持在读取文本文件时，或者在`Buffer`转换为字符串时指定文本编码，但遗憾的是，GBK编码不在NodeJS自身支持范围内。因此，一般我们借助`iconv-lite`这个三方包来转换编码。使用NPM下载该包后，我们可以按下边方式编写一个读取GBK文本文件的函数。

```js
 let iconv = require('iconv-lite');

 function readGBKText(pathname) {
  let bin = fs.readFileSync(pathname);

  return iconv.decode(bin, 'gbk');
 }
```

### 单字节编码

有时候，我们无法预知需要读取的文件采用哪种编码，因此也就无法指定正确的编码。比如我们要处理的某些CSS文件中，有的用GBK编码，有的用UTF8编码。虽然可以一定程度可以根据文件的字节内容猜测出文本编码，但这里要介绍的是有些局限，但是要简单得多的一种技术。

首先我们知道，如果一个文本文件只包含英文字符，比如`Hello World`，那无论用GBK编码或是UTF8编码读取这个文件都是没问题的。这是因为在这些编码下，ASCII0~128范围内字符都使用相同的单字节编码。

反过来讲，即使一个文本文件中有中文等字符，如果我们需要处理的字符仅在ASCII0~128范围内，比如除了注释和字符串以外的JS代码，我们就可以统一使用单字节编码来读取文件，不用关心文件的实际编码是GBK还是UTF8。以下示例说明了这种方法。

```js
 1. GBK编码源文件内容：
  let foo = '中文';
 2. 对应字节：
  76 61 72 20 66 6F 6F 20 3D 20 27 D6 D0 CE C4 27 3B
 3. 使用单字节编码读取后得到的内容：
  let foo = '{乱码}{乱码}{乱码}{乱码}';
 4. 替换内容：
  let bar = '{乱码}{乱码}{乱码}{乱码}';
 5. 使用单字节编码保存后对应字节：
  76 61 72 20 62 61 72 20 3D 20 27 D6 D0 CE C4 27 3B
 6. 使用GBK编码读取后得到内容：
  let bar = '中文';
```

这里的诀窍在于，不管大于0xEF的单个字节在单字节编码下被解析成什么乱码字符，使用同样的单字节编码保存这些乱码字符时，背后对应的字节保持不变。

NodeJS中自带了一种`binary`编码可以用来实现这个方法，因此在下例中，我们使用这种编码来演示上例对应的代码该怎么写。

```js
 function replace(pathname) {
  let str = fs.readFileSync(pathname, 'binary');
  str = str.replace('foo', 'bar');
  fs.writeFileSync(pathname, str, 'binary');
 }
```

---

# http

## 创建一个服务器

```js
import http from 'http'
http.createServer(function (req, res) {
  res.write('Hello xkd'); 
  res.end(); 
}).listen(8888);
```

或者

```js
import http from 'http'
let server = new http.Server();

server.on("request",function(req,res){
    res.writeHead(200,{        
      "content-type":"text/plain; charset=utf-8"
    });
    res.write("xkd");
    res.end();
});
server.listen(8888);
```

## 查询字符串

拆分查询字符串

```js
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  let q = url.parse(req.url, true).query;
  let txt = q.year + " " + q.month;
  res.end(txt);
}).listen(8080);
```

## 模拟加载很慢的请求

```js
http
  .createServer((req, res) => {
    const index = req.url.indexOf('?');
    if (index >= 0) {
      const query = req.url.slice(index);
      const ss = new URLSearchParams(query);
      const timeout = ss.get('timeout');
      const type = ss.get('type');
      if (timeout && Number(timeout)) {
        return setTimeout(() => {
          if (type === 'json') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ code: 0, msg: 'hello world' }));
          } else if (type === 'image') {
            // 输出本地一个图片
          } else {
            res.end(`delay ${timeout}ms response`);
          }
        }, Number(timeout));
      }
    }
    res.end('hello world!');
  })
  .listen(port, ip);
```

延迟输出图片

```js
const stream = fs.createReadStream('./img/s.jpg');
const responseData = []; //存储文件流
if (stream) {
  //判断状态
  stream.on('data', function (chunk) {
    responseData.push(chunk);
  });
  stream.on('end', function () {
    const finalData = Buffer.concat(responseData);
    // response.write();
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(finalData);
  });
}
```

## 实现接口的中转代理

```js
 

const ip = process.env.IP || '127.0.0.1';
const port = process.env.PORT || 3001;

http
  .createServer((req, res) => {
    const allowList = ['joke.qq.com', 'www.qq.com'];
    if (!req.headers || !req.headers.referer || allow) {
      res.writeHead(403, 'forbidden');
      res.end('403 forbidden');
      return;
    }
    console.log('发起请求', req.headers);
    https
      .get('https://www.v2ex.com/api/topics/latest.json', (response) => {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          res.setHeader('Access-Control-Allow-Origin', (req.headers.referer || '').replace(/\/$/, ''));
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
          res.end(data);
        });
      })
      .on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`, e);
        res.end('error');
      });
  })
  .listen(port, ip);
console.log(`server has started at ${ip}:${port}`);
```
NodeJS本来的用途是编写高性能Web服务器。我们首先在这里重复一下官方文档里的例子，使用NodeJS内置的`http`模块简单实现一个HTTP服务器。

```js
import * as http from 'http'

 http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text-plain' });
  response.end('Hello World\n');
 }).listen(8124);
```

以上程序创建了一个HTTP服务器并监听`8124`端口，打开浏览器访问该端口`http://127.0.0.1:8124/`就能够看到效果。

> 在Linux系统下，监听1024以下端口需要root权限。因此，如果想监听80或443端口的话，需要使用`sudo`命令启动程序。

## API走马观花

我们先大致看看NodeJS提供了哪些和网络操作有关的API。这里并不逐一介绍每个API的使用方法，官方文档已经做得很好了。

### HTTP

> **官方文档：** [http://nodejs.org/api/http.html](http://nodejs.org/api/http.html)

'http'模块提供两种使用方式：

+ 作为服务端使用时，创建一个HTTP服务器，监听HTTP客户端请求并返回响应。

+ 作为客户端使用时，发起一个HTTP客户端请求，获取服务端响应。

首先我们来看看服务端模式下如何工作。如开门红中的例子所示，首先需要使用`.createServer`方法创建一个服务器，然后调用`.listen`方法监听端口。之后，每当来了一个客户端请求，创建服务器时传入的回调函数就被调用一次。可以看出，这是一种事件机制。

HTTP请求本质上是一个数据流，由请求头（headers）和请求体（body）组成。例如以下是一个完整的HTTP请求数据内容。

```js
 POST / HTTP/1.1
 User-Agent: curl/7.26.0
 Host: localhost
 Accept: */*
 Content-Length: 11
 Content-Type: application/x-www-form-urlencoded

 Hello World
```

可以看到，空行之上是请求头，之下是请求体。HTTP请求在发送给服务器时，可以认为是按照从头到尾的顺序一个字节一个字节地以数据流方式发送的。而`http`模块创建的HTTP服务器在接收到完整的请求头后，就会调用回调函数。在回调函数中，除了可以使用`request`对象访问请求头数据外，还能把`request`对象当作一个只读数据流来访问请求体数据。以下是一个例子。

```js
 http.createServer(function (request, response) {
  let body = [];

  console.log(request.method);
  console.log(request.headers);

  request.on('data', function (chunk) {
   body.push(chunk);
  });

  request.on('end', function () {
   body = Buffer.concat(body);
   console.log(body.toString());
  });
 }).listen(80);

 ------------------------------------
 POST
 { 'user-agent': 'curl/7.26.0',
   host: 'localhost',
   accept: '*/*',
   'content-length': '11',
   'content-type': 'application/x-www-form-urlencoded' }
 Hello World
```

HTTP响应本质上也是一个数据流，同样由响应头（headers）和响应体（body）组成。例如以下是一个完整的HTTP请求数据内容。

 HTTP/1.1 200 OK
 Content-Type: text/plain
 Content-Length: 11
 Date: Tue, 05 Nov 2013 05:31:38 GMT
 Connection: keep-alive

 Hello World

在回调函数中，除了可以使用`response`对象来写入响应头数据外，还能把`response`对象当作一个只写数据流来写入响应体数据。例如在以下例子中，服务端原样将客户端请求的请求体数据返回给客户端。

```js
 http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });

  request.on('data', function (chunk) {
   response.write(chunk);
  });

  request.on('end', function () {
   response.end();
  });
 }).listen(80);
```

接下来我们看看客户端模式下如何工作。为了发起一个客户端HTTP请求，我们需要指定目标服务器的位置并发送请求头和请求体，以下示例演示了具体做法。

```js
 let options = {
   hostname: 'www.example.com',
   port: 80,
   path: '/upload',
   method: 'POST',
   headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
   }
  };

 let request = http.request(options, function (response) {});

 request.write('Hello World');
 request.end();
```

可以看到，`.request`方法创建了一个客户端，并指定请求目标和请求头数据。之后，就可以把`request`对象当作一个只写数据流来写入请求体数据和结束请求。另外，由于HTTP请求中`GET`请求是最常见的一种，并且不需要请求体，因此`http`模块也提供了以下便捷API。

 http.get('http://www.example.com/', function (response) {});

当客户端发送请求并接收到完整的服务端响应头时，就会调用回调函数。在回调函数中，除了可以使用`response`对象访问响应头数据外，还能把`response`对象当作一个只读数据流来访问响应体数据。以下是一个例子。

```js
 http.get('http://www.example.com/', function (response) {
  let body = [];

  console.log(response.statusCode);
  console.log(response.headers);

  response.on('data', function (chunk) {
   body.push(chunk);
  });

  response.on('end', function () {
   body = Buffer.concat(body);
   console.log(body.toString());
  });
 });

 ------------------------------------
 200
 { 'content-type': 'text/html',
   server: 'Apache',
   'content-length': '801',
   date: 'Tue, 05 Nov 2013 06:08:41 GMT',
   connection: 'keep-alive' }
 <!DOCTYPE html>
 ...
```

### HTTPS

> **官方文档：** [http://nodejs.org/api/https.html](http://nodejs.org/api/https.html)

`https`模块与`http`模块极为类似，区别在于`https`模块需要额外处理SSL证书。

在服务端模式下，创建一个HTTPS服务器的示例如下。

```js
 let options = {
   key: fs.readFileSync('./ssl/default.key'),
   cert: fs.readFileSync('./ssl/default.cer')
  };

 let server = https.createServer(options, function (request, response) {
   // ...
  });
```

可以看到，与创建HTTP服务器相比，多了一个`options`对象，通过`key`和`cert`字段指定了HTTPS服务器使用的私钥和公钥。

另外，NodeJS支持SNI技术，可以根据HTTPS客户端请求使用的域名动态使用不同的证书，因此同一个HTTPS服务器可以使用多个域名提供服务。接着上例，可以使用以下方法为HTTPS服务器添加多组证书。

```js
 server.addContext('foo.com', {
  key: fs.readFileSync('./ssl/foo.com.key'),
  cert: fs.readFileSync('./ssl/foo.com.cer')
 });

 server.addContext('bar.com', {
  key: fs.readFileSync('./ssl/bar.com.key'),
  cert: fs.readFileSync('./ssl/bar.com.cer')
 });
```

在客户端模式下，发起一个HTTPS客户端请求与`http`模块几乎相同，示例如下。

```js
 let options = {
   hostname: 'www.example.com',
   port: 443,
   path: '/',
   method: 'GET'
  };

 let request = https.request(options, function (response) {});

 request.end();
```

但如果目标服务器使用的SSL证书是自制的，不是从颁发机构购买的，默认情况下`https`模块会拒绝连接，提示说有证书安全问题。在`options`里加入`rejectUnauthorized: false`字段可以禁用对证书有效性的检查，从而允许`https`模块请求开发环境下使用自制证书的HTTPS服务器。

### URL

> **官方文档：** [http://nodejs.org/api/url.html](http://nodejs.org/api/url.html)

处理HTTP请求时`url`模块使用率超高，因为该模块允许解析URL、生成URL、以及拼接URL。首先我们来看看一个完整的URL的各组成部分。

```text
                            href
  -----------------------------------------------------------------
                             host              path
                       --------------- ----------------------------
  http: // user:pass @ host.com : 8080 /p/a/t/h ?query=string #hash
  -----    ---------   --------   ---- -------- ------------- -----
 protocol     auth     hostname   port pathname     search     hash
                                                 ------------
                                                    query
```

我们可以使用`.parse`方法来将一个URL字符串转换为URL对象，示例如下。

```js
 url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');
 /*=>
 { protocol: 'http:',
   auth: 'user:pass',
   host: 'host.com:8080',
   port: '8080',
   hostname: 'host.com',
   hash: '#hash',
   search: '?query=string',
   query: 'query=string',
   pathname: '/p/a/t/h',
   path: '/p/a/t/h?query=string',
   href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }
 */
```

传给`.parse`方法的不一定要是一个完整的URL，例如在HTTP服务器回调函数中，`request.url`不包含协议头和域名，但同样可以用`.parse`方法解析。

```js
 http.createServer(function (request, response) {
  let tmp = request.url; // => "/foo/bar?a=b"
  url.parse(tmp);
  /*=>
  { protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?a=b',
    query: 'a=b',
    pathname: '/foo/bar',
    path: '/foo/bar?a=b',
    href: '/foo/bar?a=b' }
  */
 }).listen(80);
```

`.parse`方法还支持第二个和第三个布尔类型可选参数。第二个参数等于`true`时，该方法返回的URL对象中，`query`字段不再是一个字符串，而是一个经过`querystring`模块转换后的参数对象。第三个参数等于`true`时，该方法可以正确解析不带协议头的URL，例如`//www.example.com/foo/bar`。

反过来，`format`方法允许将一个URL对象转换为URL字符串，示例如下。

```js
 url.format({
  protocol: 'http:',
  host: 'www.example.com',
  pathname: '/p/a/t/h',
  search: 'query=string'
 });
 /*=>
 'http://www.example.com/p/a/t/h?query=string'
 */
```

另外，`.resolve`方法可以用于拼接URL，示例如下。

```js
 url.resolve('http://www.example.com/foo/bar', '../baz');
 /*=>
 <http://www.example.com/baz>
 */
```

### Query String

> **官方文档：** [http://nodejs.org/api/querystring.html](http://nodejs.org/api/querystring.html)

`querystring`模块用于实现URL参数字符串与参数对象的互相转换，示例如下。

```js
 querystring.parse('foo=bar&baz=qux&baz=quux&corge');
 /*=>
 { foo: 'bar', baz: ['qux', 'quux'], corge: '' }
 */

 querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
 /*=>
 'foo=bar&baz=qux&baz=quux&corge='
 */
```

### Zlib

> **官方文档：** [http://nodejs.org/api/zlib.html](http://nodejs.org/api/zlib.html)

`zlib`模块提供了数据压缩和解压的功能。当我们处理HTTP请求和响应时，可能需要用到这个模块。

首先我们看一个使用`zlib`模块压缩HTTP响应体数据的例子。这个例子中，判断了客户端是否支持gzip，并在支持的情况下使用`zlib`模块返回gzip之后的响应体数据。

```js
 http.createServer(function (request, response) {
  let i = 1024,
   data = '';

  while (i--) {
   data += '.';
  }

  if ((request.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
   zlib.gzip(data, function (err, data) {
    response.writeHead(200, {
     'Content-Type': 'text/plain',
     'Content-Encoding': 'gzip'
    });
    response.end(data);
   });
  } else {
   response.writeHead(200, {
    'Content-Type': 'text/plain'
   });
   response.end(data);
  }
 }).listen(80);
```

接着我们看一个使用`zlib`模块解压HTTP响应体数据的例子。这个例子中，判断了服务端响应是否使用gzip压缩，并在压缩的情况下使用`zlib`模块解压响应体数据。

```js
 let options = {
   hostname: 'www.example.com',
   port: 80,
   path: '/',
   method: 'GET',
   headers: {
    'Accept-Encoding': 'gzip, deflate'
   }
  };

 http.request(options, function (response) {
  let body = [];

  response.on('data', function (chunk) {
   body.push(chunk);
  });

  response.on('end', function () {
   body = Buffer.concat(body);

   if (response.headers['content-encoding'] === 'gzip') {
    zlib.gunzip(body, function (err, data) {
     console.log(data.toString());
    });
   } else {
    console.log(data.toString());
   }
  });
 }).end();
```

### Net

> **官方文档：** [http://nodejs.org/api/net.html](http://nodejs.org/api/net.html)

`net`模块可用于创建Socket服务器或Socket客户端。由于Socket在前端领域的使用范围还不是很广，这里先不涉及到WebSocket的介绍，仅仅简单演示一下如何从Socket层面来实现HTTP请求和响应。

首先我们来看一个使用Socket搭建一个很不严谨的HTTP服务器的例子。这个HTTP服务器不管收到啥请求，都固定返回相同的响应。

```js
 net.createServer(function (conn) {
  conn.on('data', function (data) {
   conn.write([
    'HTTP/1.1 200 OK',
    'Content-Type: text/plain',
    'Content-Length: 11',
    '',
    'Hello World'
   ].join('\n'));
  });
 }).listen(80);
```

接着我们来看一个使用Socket发起HTTP客户端请求的例子。这个例子中，Socket客户端在建立连接后发送了一个HTTP GET请求，并通过`data`事件监听函数来获取服务器响应。

```js
 let options = {
   port: 80,
   host: 'www.example.com'
  };

 let client = net.connect(options, function () {
   client.write([
    'GET / HTTP/1.1',
    'User-Agent: curl/7.26.0',
    'Host: www.baidu.com',
    'Accept: */*',
    '',
    ''
   ].join('\n'));
  });

 client.on('data', function (data) {
  console.log(data.toString());
  client.end();
 });
```

## 灵机一点

使用NodeJS操作网络，特别是操作HTTP请求和响应时会遇到一些惊喜，这里对一些常见问题做解答。

+ 问： 为什么通过`headers`对象访问到的HTTP请求头或响应头字段不是驼峰的？

 答： 从规范上讲，HTTP请求头和响应头字段都应该是驼峰的。但现实是残酷的，不是每个HTTP服务端或客户端程序都严格遵循规范，所以NodeJS在处理从别的客户端或服务端收到的头字段时，都统一地转换为了小写字母格式，以便开发者能使用统一的方式来访问头字段，例如`headers['content-length']`。

+ 问： 为什么`http`模块创建的HTTP服务器返回的响应是`chunked`传输方式的？

 答： 因为默认情况下，使用`.writeHead`方法写入响应头后，允许使用`.write`方法写入任意长度的响应体数据，并使用`.end`方法结束一个响应。由于响应体数据长度不确定，因此NodeJS自动在响应头里添加了`Transfer-Encoding: chunked`字段，并采用`chunked`传输方式。但是当响应体数据长度确定时，可使用`.writeHead`方法在响应头里加上`Content-Length`字段，这样做之后NodeJS就不会自动添加`Transfer-Encoding`字段和使用`chunked`传输方式。

+ 问： 为什么使用`http`模块发起HTTP客户端请求时，有时候会发生`socket hang up`错误？

 答： 发起客户端HTTP请求前需要先创建一个客户端。`http`模块提供了一个全局客户端`http.globalAgent`，可以让我们使用`.request`或`.get`方法时不用手动创建客户端。但是全局客户端默认只允许5个并发Socket连接，当某一个时刻HTTP客户端请求创建过多，超过这个数字时，就会发生`socket hang up`错误。解决方法也很简单，通过`http.globalAgent.maxSockets`属性把这个数字改大些即可。另外，`https`模块遇到这个问题时也一样通过`https.globalAgent.maxSockets`属性来处理。

---

# os

os模块可以获取系统的各种信息

## os.arch()

获取cpu架构,arm, x64, arm64

## os.cpus()

获取cpu信息

## os.freemem()

获取空闲的内存

## os.homedir()

获取用户目录

## os.hostname()

获取host

## os.networkInterfaces()

获取网络接口

## os.platform()

os.release()
获取系统类型,linux,win32等等

## os.tmpdir()

获取临时目录

## os.totalmem()

获取所有的内存

## os.uptime()

获取开机时间

## os.userInfo()

获取用户信息

---

# path

path模块提供和系统路径相关的api

:::tip
`path.sep`在windows上是`\`,在linux上是`/`
`path.delimiter`在windows上是`;`在linux上是`/`
:::

## path.basename()

获取基础路径

```ts
import {basename } from 'path'
basename('/test/something'); // something
basename('/test/something.txt'); // something.txt
basename('/test/something.txt', '.txt'); // something
```

## path.dirname()

获取路径名称

```ts
dirname('/test/something'); // /test
dirname('/test/something/file.txt'); // /test/something
```

## path.extname()

获取后缀

```ts
extname('/test/something'); // ''
extname('/test/something/file.txt'); // '.txt'
```

## path.format()

`path.parse`的反面

```ts
// POSIX
format({ dir: '/Users/joe', base: 'test.txt' }); //  '/Users/joe/test.txt'
format({ root: '/Users/joe', name: 'test', ext: '.txt' }); //  '/Users/joe/test.txt'
//windows
format({ dir: 'C:\\Users\\joe', base: 'test.txt' }); //  'C:\\Users\\joe\\test.txt'
```

## path.isAbsolute()

是否是绝对路径

```ts
isAbsolute('/test/something'); // true
isAbsolute('./test/something'); // false

```

## path.join

```ts
const name = 'joe';
 join('/', 'users', name, 'notes.txt'); // '/users/joe/notes.txt'
```

使用平台特定的分隔符（window：/）作为定界符,将所有给定的path片段连接在一起,然后规范化生成的路径

```js
path.join('a', 'b', 'c')   // 输出结果为： '/a/b/c'
path.join('a', '/b', 'c')  // 输出结果为： '/a/b/c'
path.join('a/b', '../', 'c') // 输出结果为： '/a/c'
path.join('a', './', 'c') // 输出结果为：'/a/c'
```

## path.resolve()

将路径或者路径片段序列化为绝对路径

```js
// 假设当前绝对路径为/admin/user
path.resolve('a', 'b', 'c') // 输出结果为：'/admin/user/a/a/c'
path.resolve('a', '/b', 'c') // 输出结果为： '/b/c'
path.resolve('a/b', '../', 'c') // 输出结果为：'/admin/user/a/c'
path.resolve('a', './', 'c') // 输出结果为：'admin/user/a/c'
resolve('joe.txt'); // '/Users/joe/joe.txt' if run from my home folder
resolve('tmp', 'joe.txt'); // '/Users/joe/tmp/joe.txt' if run from my home folder
resolve('/etc', 'joe.txt'); // '/etc/joe.txt'
注意`/`的存在, '/a'代表的是根目录下的a, 'a'代表的是当前目录下的a
```

为了要获取到符合 `/` 格式的路径，我们可以使用 `PATH` 模块提供的 `path.sep` [接口](https://nodejs.org/dist/latest-v12.x/docs/api/path.html#path_path_sep)进行字符串匹配截取，接口会根据系统环境的不同进行匹配截取。

在 Unix 系统下

```js
foo/bar/baz'.split(path.sep);
// Returns: ['foo', 'bar', 'baz']
```

Windows 系统下

```js
foo\\bar\\baz'.split(path.sep);
// Returns: ['foo', 'bar', 'baz']
```

`path.sep` 的赋值也是根据操作系统来决定是 `/` 还是 `\

最终的方案自然是 `string.split(path.sep).join('/')` 来进行分隔符的替换。

## path.normalize()

计算最合适的路径

```ts
normalize('/users/joe/..//test.txt'); // '/users/test.txt'
```

## path.parse()

解析路径

```ts
parse('/users/test.txt');
//结果
{
  root: '/',
  dir: '/users',
  base: 'test.txt',
  ext: '.txt',
  name: 'test'
}
```

## path.relative()

获取相对路径

```ts
relative('/Users/joe', '/Users/joe/test.txt'); // 'test.txt'
relative('/Users/joe', '/Users/joe/something/test.txt'); // 'something/test.txt'

```

---

# process 对象

`process`对象是 Node 原生提供的对象，表示当前运行的 Node 进程。它不用引入模块，可以直接使用。

## process.argv

`process.argv`是一个数组，表示启动脚本时的命令行参数。

它的前两项是固定的。

- 第一项是 Node 可执行文件的路径
- 第二项是 JavaScript 脚本的路径

后面的数组成员都是命令行参数。

```bash
node index.js --watch
```

上面这个命令执行后，在`index.js`脚本里面，`process.argv`数组共有三项。

- `process.argv[0]`：/path/to/node
- `process.argv[1]`：/path/to/index.js
- `process.argv[2]`：--watch

如果只需要命令行参数，可以用解构赋值获取。

```javascript
const [ , , ...args ] = process.argv;
console.log(args[0]);   // "--watch"
```

## process.cwd()

当前js文件执行路径,跟系统pwd一样

## process.memoryUsage()

获取当前进程所使用的的内存

## process.cpuUsage()

获取cpu占用

## process.versions,process.arch,process.env,process.platform

获取系统相关信息

## process.execPath

获取执行目录

## process.uptime(),process.pid

获取运行时间,当前pid

---

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
