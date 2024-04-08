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
