# child_process

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
