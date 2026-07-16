---
order: 10
---

# child_process — 子进程

`child_process` 模块用于创建和管理子进程。

```js
import { spawn, exec, execFile, fork } from 'child_process'
```

## spawn

最核心的 API，适用于长时间运行的子进程，基于事件驱动：

```js
const child = spawn('node', ['worker.js'])

child.stdout.on('data', data => console.log(`stdout: ${data}`))
child.stderr.on('data', data => console.log(`stderr: ${data}`))
child.on('close', code => console.log(`exit code: ${code}`))
child.on('error', err => console.error(err))
```

## exec

启动子进程执行命令，缓存输出后通过回调返回（适合短命令）：

```js
exec('ls -la', (error, stdout, stderr) => {
  if (error) return console.error(error)
  console.log(stdout)
})
```

## execFile

直接执行可执行文件，不通过 shell：

```js
execFile('/bin/ls', ['-l', '.'], (err, result) => {
  console.log(result)
})
```

## execSync

同步执行命令：

```js
import { execSync } from 'child_process'

const output = execSync('eslint .', {
  cwd: process.cwd(),
  env: { ...process.env, PATH: `./node_modules/.bin:${process.env.PATH}` }
})
console.log(output.toString())
```

## fork

专用于创建 Node.js 子进程，自带 IPC 通信通道：

```js
// parent.js
const child = fork('./child.js')
child.on('message', msg => console.log('来自子进程:', msg))
child.send({ hello: 'world' })

// child.js
process.on('message', msg => {
  process.send({ echo: msg })
})
```

## 进程间通信（IPC）

```js
// 使用 spawn 开启 IPC
const child = spawn('node', ['child.js'], { stdio: [0, 1, 2, 'ipc'] })
child.send({ data: 'hello' })
child.on('message', msg => console.log(msg))
```

## 守护进程

```js
function spawnWorker(module) {
  const worker = spawn('node', [module])
  worker.on('exit', code => {
    if (code !== 0) spawnWorker(module)  // 自动重启
  })
}
spawnWorker('app.js')
```
