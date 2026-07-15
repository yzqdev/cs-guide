# Linux 配置 Node.js 环境

## 一、解决 `node` 命令未找到

```bash
# 问题：/usr/bin/env: "node": 没有那个文件或目录

# 解决方案：手动创建软链接
sudo ln -s $(which nodejs) /usr/bin/node
# 或
sudo ln -s /usr/bin/nodejs /usr/bin/node
```

## 二、nvm — Node 版本管理

### 安装 nvm

```bash
# 官方方式
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 如果 GitHub 下载慢，先配置 hosts
echo "199.232.68.133 raw.githubusercontent.com" >> /etc/hosts
```

### 配置国内镜像

```bash
# 在 ~/.bashrc 或 ~/.zshrc 中添加
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node

# 使配置生效
source ~/.bashrc   # bash
source ~/.zshrc    # zsh
```

### 使用 nvm

```bash
# 安装 Node.js
nvm install node             # 安装最新版
nvm install 18               # 安装指定大版本
nvm install 16.20.0          # 安装指定版本

# 查看版本
nvm ls                       # 列出已安装版本
nvm ls-remote                # 列出可安装版本

# 切换版本
nvm use 18                   # 使用版本 18
nvm alias default 18         # 设置默认版本
```

## 三、npm 配置

### 设置国内镜像

```bash
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com

# 查看配置
npm config get registry

# 安装镜像配置工具
npm i -g mirror-config-china
```

### 修改全局安装路径（避免 C 盘占用）

```bash
# 修改全局安装位置
npm config set prefix "D:\appCache\nodejs\node_global"

# 修改缓存位置
npm config set cache "D:\appCache\nodejs\node_cache"

# 查看全局包位置
npm root -g

# 查看所有全局包
npm ls -g --depth 0
```

## 四、yarn 配置

### 安装 yarn

```bash
npm i -g yarn
```

### 设置国内镜像

```bash
yarn config set registry https://registry.npmmirror.com -g
yarn config set disturl https://npmmirror.com/dist -g
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/ -g
yarn config set sass_binary_site https://npmmirror.com/mirrors/node-sass/ -g
yarn config set phantomjs_cdnurl https://npmmirror.com/mirrors/phantomjs/ -g
yarn config set chromedriver_cdnurl https://npmmirror.com/dist/chromedriver -g
yarn config set operadriver_cdnurl https://npmmirror.com/dist/operadriver -g
yarn config set fse_binary_host_mirror https://npmmirror.com/mirrors/fsevents -g
```

### yarn 常用命令

| 命令 | 说明 |
|------|------|
| `yarn add package` | 安装依赖包 |
| `yarn add package@1.2.3` | 安装指定版本 |
| `yarn remove package` | 移除依赖 |
| `yarn install` / `yarn` | 安装所有依赖 |
| `yarn upgrade` | 更新依赖 |
| `yarn why package` | 查看为何安装此包 |
| `yarn run` | 运行 scripts 中的命令 |
| `yarn global add package` | 全局安装 |
| `yarn global dir` | 查看全局安装目录 |

### 修改 yarn 全局安装路径

```bash
# 修改全局安装位置
yarn config set global-folder "D:\appCache\yarn\global"

# 修改缓存位置
yarn config set cache-folder "D:\appCache\yarn\cache"

# 查看 bin 位置
yarn global bin

# 查看全局安装目录
yarn global dir
```

### 创建 .npmrc 配置文件

在用户目录下创建 `.npmrc` 文件，写入以下内容使用国内镜像：

```ini
registry=https://registry.npmmirror.com
disturl=https://npmmirror.com/dist
chromedriver-cdnurl=https://npmmirror.com/mirrors/chromedriver
electron-mirror=https://npmmirror.com/mirrors/electron/
sass-binary-site=https://npmmirror.com/mirrors/node-sass
phantomjs-cdnurl=https://npmmirror.com/mirrors/phantomjs
puppeteer-download-host=https://npmmirror.com/mirrors
```

## 五、nvm 设置镜像

```bash
# Windows 版本
nvm npm_mirror https://npmmirror.com/mirrors/npm/
nvm node_mirror https://npmmirror.com/mirrors/node/

# Linux 版本（在 .bashrc 中添加）
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node
```

## 六、yarn 常用命令详解

### 添加依赖

```bash
yarn add webpack                  # 安装最新版本
yarn add package-name@1.2.3      # 安装指定版本
yarn add package-name@tag        # 安装指定 tag（如 beta、next）
```

### 查看包信息

```bash
yarn info react                  # 查看包信息
yarn info react --json           # JSON 格式
yarn info react@15.3.0           # 查看指定版本
```

### 发布包

```bash
yarn publish                     # 发布自己的包
yarn init                        # 初始化项目
```