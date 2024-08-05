import{_ as t,c as e,o,d as r}from"./app-CbULZrmi.js";const n={},u=r(`<h1 id="安装rust" tabindex="-1"><a class="header-anchor" href="#安装rust"><span>安装rust</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>下载程序: <a href="https://www.rust-lang.org/learn/get-started" target="_blank" rel="noopener noreferrer">https://www.rust-lang.org/learn/get-started</a></p><p>关于包管理器</p><ul><li>build your project with <code>cargo build</code></li><li>run your project with <code>cargo run</code></li><li>test your project with <code>cargo test</code></li><li>build documentation for your project with <code>cargo doc</code></li><li>publish a library to crates.io with <code>cargo publish</code></li><li>To test that you have Rust and Cargo installed, you can run this in your terminal of choice:<code>cargo --version</code></li></ul><h1 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识"><span>基础知识</span></a></h1><h2 id="rust包管理" tabindex="-1"><a class="header-anchor" href="#rust包管理"><span>rust包管理</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>仓库搜索</p><ul><li><a href="https://crates.io/" target="_blank" rel="noopener noreferrer">https://crates.io/</a></li><li><a href="https://docs.rs/" target="_blank" rel="noopener noreferrer">https://docs.rs/</a></li></ul><p>建议使用镜像<br><a href="http://mirrors.ustc.edu.cn/help/crates.io-index.html" target="_blank" rel="noopener noreferrer">http://mirrors.ustc.edu.cn/help/crates.io-index.html</a></p></div></div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p><a href="https://www.rust-lang.org/tools/install" target="_blank" rel="noopener noreferrer">https://www.rust-lang.org/tools/install</a></p><h2 id="添加镜像" tabindex="-1"><a class="header-anchor" href="#添加镜像"><span>添加镜像</span></a></h2><h3 id="rustup镜像" tabindex="-1"><a class="header-anchor" href="#rustup镜像"><span>rustup镜像</span></a></h3><p>安装rust前配置环境变量，指定 rustup 镜像源</p><blockquote><p>华中科技大学<br> https://mirrors.hust.edu.cn/docs/rustup</p></blockquote><blockquote><p>清华大学<br><code>RUSTUP_DIST_SERVER=https://mirrors.tuna.tsinghua.edu.cn/rustup</code></p></blockquote><blockquote><p>中国科学技术大学</p></blockquote><pre><code class="language-shell">RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static
RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup
</code></pre><blockquote><p>上海交通大学</p></blockquote><p><code>RUSTUP_DIST_SERVER=https://mirrors.sjtug.sjtu.edu.cn/rust-static/</code></p><h3 id="crates镜像" tabindex="-1"><a class="header-anchor" href="#crates镜像"><span>crates镜像</span></a></h3><blockquote><p>字节跳动</p></blockquote><p>https://rsproxy.cn</p><p>对应的类似nvm, nrm的工具 https://github.com/wtklbm/crm 可以切换镜像源</p><p><code>rustup</code> 默认会将 Rust 的工具链和 Cargo 的家目录设置在用户的主目录下的隐藏文件夹 <code>.cargo</code> 中。<code>CARGO_HOME</code> 环境变量可以被认为是依赖下载的文件夹，而 <code>RUSTUP_HOME</code> 环境变量是rust工具链的文件夹,注意一定要保证<code>$CARGO_HOME/bin</code>在path环境变量中,这样cargo才可以使用</p><p>在<code>$HOME/.cargo/config.toml</code>中添加</p><pre><code class="language-ini">[source.crates-io]
replace-with = &#39;ustc&#39;

[source.ustc]
registry = &quot;git://mirrors.ustc.edu.cn/crates.io-index&quot;
</code></pre><p>如果所处的环境中不允许使用 git 协议，可以把上述地址改为：</p><pre><code class="language-ini">registry = &quot;https://mirrors.ustc.edu.cn/crates.io-index&quot;
</code></pre><p>升级rust</p><pre><code class="language-shell">rustup update stable
# 或者直接
rustup update
</code></pre><h2 id="配置config-toml" tabindex="-1"><a class="header-anchor" href="#配置config-toml"><span>配置config.toml</span></a></h2><p>下面是一个配置文件,路径<code>$HOME/.cargo/config.toml</code></p><pre><code class="language-toml">paths = [&quot;/path/to/override&quot;] # 覆盖 \`Cargo.toml\` 中通过 path 引入的本地依赖

[alias]     # 命令别名
b = &quot;build&quot;
c = &quot;check&quot;
t = &quot;test&quot;
r = &quot;run&quot;
rr = &quot;run --release&quot;
space_example = [&quot;run&quot;, &quot;--release&quot;, &quot;--&quot;, &quot;\\&quot;command list\\&quot;&quot;]

[build]
jobs = 1                      # 并行构建任务的数量，默认等于 CPU 的核心数
rustc = &quot;rustc&quot;               # rust 编译器
rustc-wrapper = &quot;…&quot;           # 使用该 wrapper 来替代 rustc
rustc-workspace-wrapper = &quot;…&quot; # 为工作空间的成员使用 该 wrapper 来替代 rustc
rustdoc = &quot;rustdoc&quot;           # 文档生成工具
target = &quot;triple&quot;             # 为 target triple 构建 ( \`cargo install\` 会忽略该选项)
target-dir = &quot;target&quot;         # 存放编译输出结果的目录
rustflags = [&quot;…&quot;, &quot;…&quot;]        # 自定义flags，会传递给所有的编译器命令调用
rustdocflags = [&quot;…&quot;, &quot;…&quot;]     # 自定义flags，传递给 rustdoc
incremental = true            # 是否开启增量编译
dep-info-basedir = &quot;…&quot;        # path for the base directory for targets in depfiles
pipelining = true             # rustc pipelining

[doc]
browser = &quot;chromium&quot;          # \`cargo doc --open\` 使用的浏览器,
                              # 可以通过 \`BROWSER\` 环境变量进行重写

[env]
# Set ENV_VAR_NAME=value for any process run by Cargo
ENV_VAR_NAME = &quot;value&quot;
# Set even if already present in environment
ENV_VAR_NAME_2 = { value = &quot;value&quot;, force = true }
# Value is relative to .cargo directory containing \`config.toml\`, make absolute
ENV_VAR_NAME_3 = { value = &quot;relative/path&quot;, relative = true }

[cargo-new]
vcs = &quot;none&quot;              # 所使用的 VCS  (&#39;git&#39;, &#39;hg&#39;, &#39;pijul&#39;, &#39;fossil&#39;, &#39;none&#39;)

[http]
debug = false               # HTTP debugging
proxy = &quot;host:port&quot;         # HTTP 代理，libcurl 格式
ssl-version = &quot;tlsv1.3&quot;     # TLS version to use
ssl-version.max = &quot;tlsv1.3&quot; # 最高支持的 TLS 版本
ssl-version.min = &quot;tlsv1.1&quot; # 最小支持的 TLS 版本
timeout = 30                # HTTP 请求的超时时间，秒
low-speed-limit = 10        # 网络超时阈值 (bytes/sec)
cainfo = &quot;cert.pem&quot;         # path to Certificate Authority (CA) bundle
check-revoke = true         # check for SSL certificate revocation
multiplexing = true         # HTTP/2 multiplexing
user-agent = &quot;…&quot;            # the user-agent header

[install]
root = &quot;/some/path&quot;         # \`cargo install\` 安装到的目标目录

[net]
retry = 2                   # 网络重试次数
git-fetch-with-cli = true   # 是否使用 \`git\` 命令来执行 git 操作
offline = true              # 不能访问网络

[patch.&lt;registry&gt;]
# Same keys as for [patch] in Cargo.toml

[profile.&lt;name&gt;]         # profile 配置，详情见&quot;如何在 Cargo.toml 中配置 profile&quot; : https://course.rs/cargo/reference/profiles.html#profile设置
opt-level = 0
debug = true
split-debuginfo = &#39;...&#39;
debug-assertions = true
overflow-checks = true
lto = false
panic = &#39;unwind&#39;
incremental = true
codegen-units = 16
rpath = false
[profile.&lt;name&gt;.build-override]
[profile.&lt;name&gt;.package.&lt;name&gt;]

[registries.&lt;name&gt;]  # 设置其它的注册服务： https://course.rs/cargo/reference/specify-deps.html#从其它注册服务引入依赖包
index = &quot;…&quot;          # 注册服务索引列表的 URL
token = &quot;…&quot;          # 连接注册服务所需的鉴权 token

[registry]
default = &quot;…&quot;        # 默认的注册服务名称: crates.io
token = &quot;…&quot;

[source.&lt;name&gt;]      # 注册服务源和替换source definition and replacement
replace-with = &quot;…&quot;   # 使用给定的 source 来替换当前的 source，例如使用科大源来替换crates.io源以提升国内的下载速度：[source.crates-io] replace-with = &#39;ustc&#39;
directory = &quot;…&quot;      # path to a directory source
registry = &quot;…&quot;       # 注册源的 URL ，例如科大源: [source.ustc] registry = &quot;git://mirrors.ustc.edu.cn/crates.io-index&quot;
local-registry = &quot;…&quot; # path to a local registry source
git = &quot;…&quot;            # URL of a git repository source
branch = &quot;…&quot;         # branch name for the git repository
tag = &quot;…&quot;            # tag name for the git repository
rev = &quot;…&quot;            # revision for the git repository

[target.&lt;triple&gt;]
linker = &quot;…&quot;            # linker to use
runner = &quot;…&quot;            # wrapper to run executables
rustflags = [&quot;…&quot;, &quot;…&quot;]  # custom flags for \`rustc\`

[target.&lt;cfg&gt;]
runner = &quot;…&quot;            # wrapper to run executables
rustflags = [&quot;…&quot;, &quot;…&quot;]  # custom flags for \`rustc\`

[target.&lt;triple&gt;.&lt;links&gt;] # \`links\` build script override
rustc-link-lib = [&quot;foo&quot;]
rustc-link-search = [&quot;/path/to/foo&quot;]
rustc-flags = [&quot;-L&quot;, &quot;/some/path&quot;]
rustc-cfg = [&#39;key=&quot;value&quot;&#39;]
rustc-env = {key = &quot;value&quot;}
rustc-cdylib-link-arg = [&quot;…&quot;]
metadata_key1 = &quot;value&quot;
metadata_key2 = &quot;value&quot;

[term]
verbose = false        # whether cargo provides verbose output
color = &#39;auto&#39;         # whether cargo colorizes output
progress.when = &#39;auto&#39; # whether cargo shows progress bar
progress.width = 80    # width of progress bar
</code></pre>`,27),s=[u];function a(i,c){return o(),e("div",null,s)}const p=t(n,[["render",a],["__file","install.html.vue"]]),d=JSON.parse('{"path":"/go-tutor/rust-tutor/install.html","title":"安装rust","lang":"zh-CN","frontmatter":{"description":"安装rust 提示 下载程序: https://www.rust-lang.org/learn/get-started 关于包管理器 build your project with cargo build run your project with cargo run test your project with cargo test build do...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/rust-tutor/install.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"安装rust"}],["meta",{"property":"og:description","content":"安装rust 提示 下载程序: https://www.rust-lang.org/learn/get-started 关于包管理器 build your project with cargo build run your project with cargo run test your project with cargo test build do..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-13T15:07:53.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-05-13T15:07:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"安装rust\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-05-13T15:07:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"添加镜像","slug":"添加镜像","link":"#添加镜像","children":[{"level":3,"title":"rustup镜像","slug":"rustup镜像","link":"#rustup镜像","children":[]},{"level":3,"title":"crates镜像","slug":"crates镜像","link":"#crates镜像","children":[]}]},{"level":2,"title":"配置config.toml","slug":"配置config-toml","link":"#配置config-toml","children":[]}],"git":{"createdTime":1675510145000,"updatedTime":1715612873000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":3.67,"words":1100},"filePathRelative":"go-tutor/rust-tutor/install.md","localizedDate":"2023年2月4日","autoDesc":true}');export{p as comp,d as data};
