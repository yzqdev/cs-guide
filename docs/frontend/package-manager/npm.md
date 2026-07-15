# npm 配置

## 镜像源配置

### 使用淘宝镜像

编辑 `~/.npmrc` 文件，添加以下内容：

```ini
registry=https://registry.npmmirror.com
disturl=https://npmmirror.com/dist
electron_mirror=https://npmmirror.com/mirrors/electron/
sass_binary_site=https://npmmirror.com/mirrors/node-sass
chromedriver-cdnurl=https://npmmirror.com/mirrors/chromedriver
```

### 命令行设置

```bash
npm config set registry https://registry.npmmirror.com
```

## 常用命令

### 安装包

```bash
# 从 GitHub 用户名安装
npm install RobinCK/vue-ls
npm install github:RobinCK/vue-ls

# 从 git 仓库安装
npm install git+https://github.com/user/repo.git#branch
npm install git+ssh://git@github.com:user/repo.git#branch

# 安装本地包
npm install ./my-local-package
```

### 路径管理

```bash
# 查看全局安装路径
npm prefix -g

# 修改全局安装路径
npm config set prefix "D:\nodejs\node_global"

# 修改全局缓存路径
npm config set cache "D:/nodejs/npm_cache"

# 查看配置列表
npm config ls
```

## Yarn 路径管理

```bash
# 查看全局 bin 位置
yarn global bin

# 查看全局安装位置
yarn global dir

# 查看全局 cache 位置
yarn cache dir

# 修改全局 bin 位置
yarn config set prefix "E:\yarn\Data"

# 修改全局安装位置
yarn config set global-folder "E:\yarn\Data\global"

# 修改全局 cache 位置
yarn config set cache-folder "E:\yarn\Cache"
```

或直接在 `~/.yarnrc` 中配置：

```ini
registry "https://registry.npmmirror.com/"
cache-folder "E:\\yarn\\Cache"
global-folder "E:\\yarn\\Data\\global"
link-folder "E:\\yarn\\Data\\link"
prefix "E:\\yarn\\Data"
```
