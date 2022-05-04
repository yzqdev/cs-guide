# rust包管理

:::tips
仓库搜索 1.[https://crates.io/](https://crates.io/) 2.[https://docs.rs/] (<https://docs.rs/>)
建议使用镜像  
[http://mirrors.ustc.edu.cn/help/crates.io-index.html](http://mirrors.ustc.edu.cn/help/crates.io-index.html)
:::

## 添加镜像

安装rust前配置环境变量，指定 rustup 镜像源  
 清华大学  
`RUSTUP_DIST_SERVER=https://mirrors.tuna.tsinghua.edu.cn/rustup`

 中国科学技术大学  

```
RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static
RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup
```

 上海交通大学  
`RUSTUP_DIST_SERVER=https://mirrors.sjtug.sjtu.edu.cn/rust-static/`
在`$HOME/.cargo/config`中添加

```ini
[source.crates-io]
replace-with = 'ustc'

[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
```

如果所处的环境中不允许使用 git 协议，可以把上述地址改为：

```ini
registry = "https://mirrors.ustc.edu.cn/crates.io-index"
```

升级rust

```shell
rustup update stable
```

## 配置config.toml

下面是一个配置文件

```toml
paths = ["/path/to/override"] # 覆盖 `Cargo.toml` 中通过 path 引入的本地依赖

[alias]     # 命令别名
b = "build"
c = "check"
t = "test"
r = "run"
rr = "run --release"
space_example = ["run", "--release", "--", "\"command list\""]

[build]
jobs = 1                      # 并行构建任务的数量，默认等于 CPU 的核心数
rustc = "rustc"               # rust 编译器
rustc-wrapper = "…"           # 使用该 wrapper 来替代 rustc
rustc-workspace-wrapper = "…" # 为工作空间的成员使用 该 wrapper 来替代 rustc
rustdoc = "rustdoc"           # 文档生成工具
target = "triple"             # 为 target triple 构建 ( `cargo install` 会忽略该选项)
target-dir = "target"         # 存放编译输出结果的目录
rustflags = ["…", "…"]        # 自定义flags，会传递给所有的编译器命令调用
rustdocflags = ["…", "…"]     # 自定义flags，传递给 rustdoc
incremental = true            # 是否开启增量编译
dep-info-basedir = "…"        # path for the base directory for targets in depfiles
pipelining = true             # rustc pipelining

[doc]
browser = "chromium"          # `cargo doc --open` 使用的浏览器,
                              # 可以通过 `BROWSER` 环境变量进行重写

[env]
# Set ENV_VAR_NAME=value for any process run by Cargo
ENV_VAR_NAME = "value"
# Set even if already present in environment
ENV_VAR_NAME_2 = { value = "value", force = true }
# Value is relative to .cargo directory containing `config.toml`, make absolute
ENV_VAR_NAME_3 = { value = "relative/path", relative = true }

[cargo-new]
vcs = "none"              # 所使用的 VCS  ('git', 'hg', 'pijul', 'fossil', 'none')

[http]
debug = false               # HTTP debugging
proxy = "host:port"         # HTTP 代理，libcurl 格式
ssl-version = "tlsv1.3"     # TLS version to use
ssl-version.max = "tlsv1.3" # 最高支持的 TLS 版本
ssl-version.min = "tlsv1.1" # 最小支持的 TLS 版本
timeout = 30                # HTTP 请求的超时时间，秒
low-speed-limit = 10        # 网络超时阈值 (bytes/sec)
cainfo = "cert.pem"         # path to Certificate Authority (CA) bundle
check-revoke = true         # check for SSL certificate revocation
multiplexing = true         # HTTP/2 multiplexing
user-agent = "…"            # the user-agent header

[install]
root = "/some/path"         # `cargo install` 安装到的目标目录

[net]
retry = 2                   # 网络重试次数
git-fetch-with-cli = true   # 是否使用 `git` 命令来执行 git 操作
offline = true              # 不能访问网络

[patch.<registry>]
# Same keys as for [patch] in Cargo.toml

[profile.<name>]         # profile 配置，详情见"如何在 Cargo.toml 中配置 profile" : https://course.rs/cargo/reference/profiles.html#profile设置
opt-level = 0
debug = true
split-debuginfo = '...'
debug-assertions = true
overflow-checks = true
lto = false
panic = 'unwind'
incremental = true
codegen-units = 16
rpath = false
[profile.<name>.build-override]
[profile.<name>.package.<name>]

[registries.<name>]  # 设置其它的注册服务： https://course.rs/cargo/reference/specify-deps.html#从其它注册服务引入依赖包
index = "…"          # 注册服务索引列表的 URL
token = "…"          # 连接注册服务所需的鉴权 token

[registry]
default = "…"        # 默认的注册服务名称: crates.io
token = "…"

[source.<name>]      # 注册服务源和替换source definition and replacement
replace-with = "…"   # 使用给定的 source 来替换当前的 source，例如使用科大源来替换crates.io源以提升国内的下载速度：[source.crates-io] replace-with = 'ustc'
directory = "…"      # path to a directory source
registry = "…"       # 注册源的 URL ，例如科大源: [source.ustc] registry = "git://mirrors.ustc.edu.cn/crates.io-index"
local-registry = "…" # path to a local registry source
git = "…"            # URL of a git repository source
branch = "…"         # branch name for the git repository
tag = "…"            # tag name for the git repository
rev = "…"            # revision for the git repository

[target.<triple>]
linker = "…"            # linker to use
runner = "…"            # wrapper to run executables
rustflags = ["…", "…"]  # custom flags for `rustc`

[target.<cfg>]
runner = "…"            # wrapper to run executables
rustflags = ["…", "…"]  # custom flags for `rustc`

[target.<triple>.<links>] # `links` build script override
rustc-link-lib = ["foo"]
rustc-link-search = ["/path/to/foo"]
rustc-flags = ["-L", "/some/path"]
rustc-cfg = ['key="value"']
rustc-env = {key = "value"}
rustc-cdylib-link-arg = ["…"]
metadata_key1 = "value"
metadata_key2 = "value"

[term]
verbose = false        # whether cargo provides verbose output
color = 'auto'         # whether cargo colorizes output
progress.when = 'auto' # whether cargo shows progress bar
progress.width = 80    # width of progress bar
```
