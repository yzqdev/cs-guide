# 2.pm2使用教程

## 简介

PM2 是 node 进程管理工具，可以利用它来简化很多 node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。

## 安装

```powershell
npm install -g pm2
```

## 快速使用

```powershell
pm2 start app.js

pm2 save
```

### 执行package.json的命令

```powershell
pm2 start  npm -- run dev
```

## 常用命令

### 启动

参数说明：

- `--watch`：监听应用目录的变化，一旦发生变化，自动重启。如果要精确监听、不见听的目录，最好通过配置文件。
- `-i --instances`：启用多少个实例，可用于负载均衡。如果`-i 0`或者`-i max`，则根据当前机器核数确定实例数目。
- `--ignore-watch`：排除监听的目录/文件，可以是特定的文件名，也可以是正则。比如`--ignore-watch="test node_modules "some scripts""`
- `-n --name`：应用的名称。查看应用信息的时候可以用到。
- `-o --output <path>`：标准输出日志文件的路径。
- `-e --error <path>`：错误输出日志文件的路径。
- `--interpreter <interpreter>`：the interpreter pm2 should use for executing app (bash, python...)。比如你用的coffee script来编写应用。

### 重启

```powershell
pm2 restart app.js
```

### 3.3 停止

停止特定的应用。可以先通过`pm2 list`获取应用的名字（--name指定的）或者进程id。

```undefined
pm2 stop app_name|app_id
```

如果要停止所有应用，可以

```undefined
pm2 stop all
```

### 停止

类似`pm2 stop`，如下

```undefined
pm2 stop app_name|app_id
pm2 stop all
```

### 从进程列表删除进程

```cpp
// pm2 delete [appname] | id
pm2 delete app  // 指定进程名删除
pm2 delete 0    // 指定进程id删除
```

### 删除进程列表中所有进程

```cpp
pm2 delete all
```

### 查看进程状态

```cpp
pm2 list
// 或者
pm2 ls
```

### 查看某个进程的信息

```undefined
pm2 describe 0
```

### 负载均衡

命令如下，表示开启三个进程。如果`-i 0`，则会根据机器当前核数自动开启尽可能多的进程。

```bash
pm2 start app.js -i 3 # 开启三个进程
pm2 start app.js -i max # 根据机器CPU核数，开启对应数目的进程 
```

### 日志查看

除了可以打开日志文件查看日志外，还可以通过`pm2 logs`来查看实时日志。这点对于线上问题排查非常重要。

比如某个 node 服务突然异常重启了，那么可以通过 pm2 提供的日志工具来查看实时日志，看是不是脚本出错之类导致的异常重启。

```undefined
pm2 logs
```

### 开机自动启动

可以通过`pm2 startup`来实现开机自启动。细节可[参考](https://links.jianshu.com/go?to=http%3A%2F%2Fpm2.keymetrics.io%2Fdocs%2Fusage%2Fstartup%2F)。大致流程如下

1. 通过`pm2 save`保存当前进程状态。
2. 通过`pm2 startup [platform]`生成开机自启动的命令。（记得查看控制台输出）
3. 将步骤2生成的命令，粘贴到控制台进行，搞定。

### 监控(monitor)-查看进程的资源消耗情况

运行如下命令，查看当前通过pm2运行的进程的状态。

```undefined
pm2 monit
```

## 通过pm2配置文件来自动部署项目

### 在项目根目录下新建一个 deploy.yaml 文件

```csharp
# deploy.yaml
apps:
  - script: ./start.js       # 入口文件
    name: 'app'              # 程序名称
    env:                     # 环境变量
      COMMON_VARIABLE: true
    env_production:
      NODE_ENV: production

deploy:                     # 部署脚本
  production:               # 生产环境
    user: lentoo            # 服务器的用户名
    host: 192.168.2.166     # 服务器的ip地址
    port: 22                # ssh端口
    ref: origin/master      # 要拉取的git分支
    ssh_options: StrictHostKeyChecking=no # SSH 公钥检查
    repo: https://github.com/**.git # 远程仓库地址
    path: /home              # 拉取到服务器某个目录下
    pre-deploy: git fetch --all # 部署前执行
    post-deploy: npm install &&  pm2 reload deploy.yaml --env production # 部署后执行
    env:
      NODE_ENV: production
```

### 配置git的ssh免密认证

1. 在服务器中生成rsa公钥和私钥，当前是 **centos7** 下进行
2. 前提服务器要安装git，没有安装的先安装git，已安装的跳过

```undefined
yum –y install git
```

1. 生成秘钥

```powershell
ssh-keygen -t rsa -C "xxx@xxx.com"
```

在~/.ssh目录下有 id_rsa和 id_rsa.pub两个文件，其中id_rsa.pub文件里存放的即是公钥key。

1. 登录到GitHub，点击右上方的头像，选择settings ，点击Add SSH key，把id_rsa.pub的内容复制到里面即可。

![img](https:////upload-images.jianshu.io/upload_images/12842279-3e7086bd55d5a008.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

图片.png

### 使用pm2部署项目

:::tip
一般监控 node 有几种方案：

supervisor: 一般用作开发环境的使用；
forever: 管理多个站点，一般每个站点的访问量不大的情况，不需要监控；
PM2: 网站的访问量比较大，需要完整的监控页面。
:::
每次部署前先将本地的代码提交到远程git仓库

- 首次部署

```powershell
pm2 deploy deploy.yaml production setup 
```

部署完成后，既可登陆服务器查看配置的目录下是否从git上拉取了项目

- 再次部署

```powershell
pm2 deploy deploy.yaml production upddate
```

### 该部署流程同样适用前端项目

如vue-cli的项目，自动部署到服务器，自动执行`npm run build` 命令，生成的dist目录，指定到nginx的静态文件目录下。
由于 PM2 通常都用于 node 应用, 所以 exec_mode 应写为 fork, 其中最重要的是 args, -jar 和 jar 包所在的位置应该注明, 如果需要提供其他参数, 也要在 args 中一并注明.

假设创建如下所示的 fz.json, 使用命令 `pm2 start fz.json` 即可运行 fz.jar. 使用命令 tail -f /home/imzhizi/log/fz-out.log 还可以查看运行日志.

```text
name:应用程序名称
args:脚本的参数域
cwd:应用程序所在的目录
script:应用程序的脚本路径
log_date_format:
node_args:node 的参数域
error_file:自定义应用程序的错误日志文件
out_file:自定义应用程序日志文件
pid_file:自定义应用程序的pid文件
instances:
min_uptime:最小运行时间，这里设置的是60s即如果应用程序在60s内退出，pm2会认为程序异常退出，此时触发重启max_restarts设置数量
max_restarts:设置应用程序异常退出重启的次数，默认15次（从0开始计数）
cron_restart:定时启动，解决重启能解决的问题
watch:是否启用监控模式，默认是false。如果设置成true，当应用程序变动时，  pm2会自动重载。这里也可以设置你要监控的文件。
merge_logs:
exec_interpreter:应用程序的脚本类型，这里使用的shell，默认是nodejs
exec_mode:应用程序启动模式，这里设置的是cluster_mode（集群），默认是fork
autorestart:启用/禁用应用程序崩溃或退出时自动重启
vizion:启用/禁用vizion特性(版本控制)
 
```

```json
{
  "name": "zfile",
    "script": "java",
    "args": [
        "-jar",
        "zfile-3.2.war"
    ],
   "error_file":"./log/err.log",
    "out_file":"./log/out.log",
    "exec_interpreter": "",
    "exec_mode": "fork"
}
```

几点经验:

通过 json 启动之后, 就可以直接使用 json 文件中的名称来对项目进行控制, 如`pm2 stop name`;
每次重新打包之后, 使用 `pm2 restart name`就可以更新项目;
如果修改了 json 文件, 就无法通过 restart 更新项目了, 必须要先 `pm2 del name`然后再重新 `pm2 start xx.json`.
