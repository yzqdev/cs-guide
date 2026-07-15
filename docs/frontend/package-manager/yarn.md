# Yarn 配置

## create 命令

`yarn create` 等价于全局安装 → 运行 → 卸载：

```bash
yarn create react-app my-app
# 等价于：
yarn add create-react-app
create-react-app my-app
yarn remove create-react-app
```

## 全局包位置

| 包管理器 | 路径 |
|----------|------|
| yarn | `~\AppData\Local\Yarn`（bin 目录是可执行文件） |
| npm | `~\AppData\Roaming\npm` |

## 镜像配置

### 设置淘宝镜像

```bash
yarn config set registry https://registry.npmmirror.com -g
yarn config set disturl https://npmmirror.com/dist -g
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/ -g
yarn config set sass_binary_site https://npmmirror.com/mirrors/node-sass/ -g
yarn config set chromedriver_cdnurl https://npmmirror.com/dist/chromedriver -g
yarn config set operadriver_cdnurl https://npmmirror.com/dist/operadriver -g
yarn config set fse_binary_host_mirror https://npmmirror.com/mirrors/fsevents -g
```

### 通过 .yarnrc 文件配置

在项目根目录创建 `.yarnrc` 文件：

```bash
phantomjs_cdnurl https://npmmirror.com/mirrors/phantomjs
sass_binary_site https:://npmmirror.com/mirrors/node-sass/
registry https://registry.npmmirror.com
```

## 常见问题

### node-sass 安装失败

`node-sass` 已弃用，建议使用 `dart-sass`：

```bash
yarn add sass
```
