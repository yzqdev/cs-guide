import{_ as e,c as t,o as n,d as i}from"./app-CbULZrmi.js";const a={},l=i(`<h1 id="fastdfs-结合-graphicsmagick" tabindex="-1"><a class="header-anchor" href="#fastdfs-结合-graphicsmagick"><span>FastDFS 结合 GraphicsMagick</span></a></h1><h2 id="单机安装部署-centos-6-7-环境" tabindex="-1"><a class="header-anchor" href="#单机安装部署-centos-6-7-环境"><span>单机安装部署（CentOS 6.7 环境）</span></a></h2><h3 id="先安装-fastdfs" tabindex="-1"><a class="header-anchor" href="#先安装-fastdfs"><span>先安装 FastDFS</span></a></h3><ul><li>软件准备： <ul><li>我这边统一提供了一个压缩包，方便使用。 <ul><li>下载地址：<a href="http://pan.baidu.com/s/1hsg2brA" target="_blank" rel="noopener noreferrer">http://pan.baidu.com/s/1hsg2brA</a></li></ul></li></ul></li><li>安装依赖包：<code>yum install -y gcc gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel libevent</code></li><li>安装 <strong>libfastcommon-1.0.7.tar.gz</strong><ul><li>解压：<code>tar zxvf libfastcommon-1.0.7.tar.gz</code></li><li>进入解压后目录：<code>cd libfastcommon-1.0.7/</code></li><li>编译：<code>./make.sh</code></li><li>安装：<code>./make.sh install</code></li><li>设置几个软链接：<code>ln -s /usr/lib64/libfastcommon.so /usr/local/lib/libfastcommon.so</code></li><li>设置几个软链接：<code>ln -s /usr/lib64/libfastcommon.so /usr/lib/libfastcommon.so</code></li><li>设置几个软链接：<code>ln -s /usr/lib64/libfdfsclient.so /usr/local/lib/libfdfsclient.so</code></li><li>设置几个软链接：<code>ln -s /usr/lib64/libfdfsclient.so /usr/lib/libfdfsclient.so</code></li></ul></li><li>安装 tracker （跟踪器）服务 <strong>FastDFS_v5.08.tar.gz</strong><ul><li>解压：<code>tar zxvf FastDFS_v5.05.tar.gz</code></li><li>进入解压后目录：<code>cd FastDFS/</code></li><li>编译：<code>./make.sh</code></li><li>安装：<code>./make.sh install</code></li></ul></li><li>配置 tracker 服务 <ul><li><p>复制一份配置文件：<code>cp /etc/fdfs/tracker.conf.sample /etc/fdfs/tracker.conf</code></p></li><li><p>编辑：<code>vim /etc/fdfs/tracker.conf</code>，编辑内容看下面中文注释</p><pre><code class="language-ini">disabled=false
bind_addr=
port=22122
connect_timeout=30
network_timeout=60
# 下面这个路径是保存 store data 和 log 的地方，需要我们改下，指向我们一个存在的目录
# 创建目录：mkdir -p /opt/fastdfs/tracker/data-and-log
base_path=/opt/fastdfs/tracker/data-and-log
max_connections=256
accept_threads=1
work_threads=4
store_lookup=2
store_group=group2
store_server=0
store_path=0
download_server=0
reserved_storage_space = 10%
log_level=info
run_by_group=
run_by_user=
allow_hosts=*
sync_log_buff_interval = 10
check_active_interval = 120
thread_stack_size = 64KB
storage_ip_changed_auto_adjust = true
storage_sync_file_max_delay = 86400
storage_sync_file_max_time = 300
use_trunk_file = false 
slot_min_size = 256
slot_max_size = 16MB
trunk_file_size = 64MB
trunk_create_file_advance = false
trunk_create_file_time_base = 02:00
trunk_create_file_interval = 86400
trunk_create_file_space_threshold = 20G
trunk_init_check_occupying = false
trunk_init_reload_from_binlog = false
trunk_compress_binlog_min_interval = 0
use_storage_id = false
storage_ids_filename = storage_ids.conf
id_type_in_filename = ip
store_slave_file_use_link = false
rotate_error_log = false
error_log_rotate_time=00:00
rotate_error_log_size = 0
log_file_keep_days = 0
use_connection_pool = false
connection_pool_max_idle_time = 3600
http.server_port=8080
http.check_alive_interval=30
http.check_alive_type=tcp
http.check_alive_uri=/status.html
</code></pre></li><li><p>启动 tracker 服务：<code>/usr/bin/fdfs_trackerd /etc/fdfs/tracker.conf</code></p></li><li><p>重启 tracker 服务：<code>/usr/bin/fdfs_trackerd /etc/fdfs/tracker.conf restart</code></p></li><li><p>查看是否有 tracker 进程：<code>ps aux | grep tracker</code></p></li></ul></li><li>storage （存储节点）服务部署 <ul><li><p>一般 storage 服务我们会单独装一台机子，但是这里为了方便我们安装在同一台。</p></li><li><p>如果 storage 单独安装的话，那上面安装的步骤都要在走一遍，只是到了编辑配置文件的时候，编辑的是 storage.conf 而已</p></li><li><p>复制一份配置文件：<code>cp /etc/fdfs/storage.conf.sample /etc/fdfs/storage.conf</code></p></li><li><p>编辑：<code>vim /etc/fdfs/storage.conf</code>，编辑内容看下面中文注释</p><pre><code class="language-ini">disabled=false
group_name=group1
bind_addr=
client_bind=true
port=23000
connect_timeout=30
network_timeout=60
heart_beat_interval=30
stat_report_interval=60
# 下面这个路径是保存 store data 和 log 的地方，需要我们改下，指向我们一个存在的目录
# 创建目录：mkdir -p /opt/fastdfs/storage/data-and-log
base_path=/opt/fastdfs/storage/data-and-log
max_connections=256
buff_size = 256KB
accept_threads=1
work_threads=4
disk_rw_separated = true
disk_reader_threads = 1
disk_writer_threads = 1
sync_wait_msec=50
sync_interval=0
sync_start_time=00:00
sync_end_time=23:59
write_mark_file_freq=500
store_path_count=1
# 图片实际存放路径，如果有多个，这里可以有多行：
# store_path0=/opt/fastdfs/storage/images-data0
# store_path1=/opt/fastdfs/storage/images-data1
# store_path2=/opt/fastdfs/storage/images-data2
# 创建目录：mkdir -p /opt/fastdfs/storage/images-data
store_path0=/opt/fastdfs/storage/images-data
subdir_count_per_path=256
# 指定 tracker 服务器的 IP 和端口
tracker_server=192.168.1.114:22122
log_level=info
run_by_group=
run_by_user=
allow_hosts=*
file_distribute_path_mode=0
file_distribute_rotate_count=100
fsync_after_written_bytes=0
sync_log_buff_interval=10
sync_binlog_buff_interval=10
sync_stat_file_interval=300
thread_stack_size=512KB
upload_priority=10
if_alias_prefix=
check_file_duplicate=0
file_signature_method=hash
key_namespace=FastDFS
keep_alive=0
use_access_log = false
rotate_access_log = false
access_log_rotate_time=00:00
rotate_error_log = false
error_log_rotate_time=00:00
rotate_access_log_size = 0
rotate_error_log_size = 0
log_file_keep_days = 0
file_sync_skip_invalid_record=false
use_connection_pool = false
connection_pool_max_idle_time = 3600
http.domain_name=
http.server_port=8888
</code></pre></li><li><p>启动 storage 服务：<code>/usr/bin/fdfs_storaged /etc/fdfs/storage.conf</code>，首次启动会很慢，因为它在创建预设存储文件的目录</p></li><li><p>重启 storage 服务：<code>/usr/bin/fdfs_storaged /etc/fdfs/storage.conf restart</code></p></li><li><p>查看是否有 storage 进程：<code>ps aux | grep storage</code></p></li></ul></li><li>测试是否部署成功 <ul><li><p>利用自带的 client 进行测试</p></li><li><p>复制一份配置文件：<code>cp /etc/fdfs/client.conf.sample /etc/fdfs/client.conf</code></p></li><li><p>编辑：<code>vim /etc/fdfs/client.conf</code>，编辑内容看下面中文注释</p><pre><code class="language-ini">connect_timeout=30
network_timeout=60
# 下面这个路径是保存 store log 的地方，需要我们改下，指向我们一个存在的目录
# 创建目录：mkdir -p /opt/fastdfs/client/data-and-log
base_path=/opt/fastdfs/client/data-and-log
# 指定 tracker 服务器的 IP 和端口
tracker_server=192.168.1.114:22122
log_level=info
use_connection_pool = false
connection_pool_max_idle_time = 3600
load_fdfs_parameters_from_tracker=false
use_storage_id = false
storage_ids_filename = storage_ids.conf
http.tracker_server_port=80
</code></pre></li><li><p>在终端中通过 shell 上传 opt 目录下的一张图片：<code>/usr/bin/fdfs_test /etc/fdfs/client.conf upload /opt/test.jpg</code></p></li><li><p>如下图箭头所示，生成的图片地址为：<code>http://192.168.1.114/group1/M00/00/00/wKgBclb0aqWAbVNrAAAjn7_h9gM813_big.jpg</code></p></li><li><p>即使我们现在知道图片的访问地址我们也访问不了，因为我们还没装 FastDFS 的 Nginx 模块</p></li></ul></li></ul><h3 id="安装-nginx-lua-graphicsmagick" tabindex="-1"><a class="header-anchor" href="#安装-nginx-lua-graphicsmagick"><span>安装 nginx-lua-GraphicsMagick</span></a></h3><ul><li>来源：<a href="https://github.com/yanue/nginx-lua-GraphicsMagick/blob/master/nginx-install.md" target="_blank" rel="noopener noreferrer">https://github.com/yanue/nginx-lua-GraphicsMagick/blob/master/nginx-install.md</a></li><li>添加专用用户，后面有用 <ul><li><code>groupadd www</code></li><li><code>useradd -g www www -s /bin/false</code></li></ul></li><li>安装依赖包 <ul><li><code>yum install -y gcc gcc-c++ zlib zlib-devel openssl openssl-devel pcre pcre-devel</code></li><li><code>yum install -y libpng libjpeg libpng-devel libjpeg-devel ghostscript libtiff libtiff-devel freetype freetype-devel</code></li><li><code>yum install -y GraphicsMagick GraphicsMagick-devel</code></li></ul></li><li>下面的这些软件都在本文在开头的那个压缩包里面。现在我们需要解压这些压缩包 <ul><li><code>cd /opt/setups</code></li><li><code>tar -zxvf nginx-1.8.0.tar.gz</code></li><li><code>tar -zxvf LuaJIT-2.0.4.tar.gz</code></li><li><code>tar -zxvf GraphicsMagick-1.3.21.tar.gz</code></li><li><code>tar -zxvf zlib-1.2.8.tar.gz</code></li></ul></li><li>安装 LuaJIT <ul><li><code>cd /opt/setups/LuaJIT-2.0.4</code></li><li><code>make</code></li><li><code>make install</code></li><li><code>export LUAJIT_LIB=/usr/local/lib</code></li><li><code>export LUAJIT_INC=/usr/local/include/luajit-2.0</code></li><li><code>ln -s /usr/local/lib/libluajit-5.1.so.2 /lib64/libluajit-5.1.so.2</code></li></ul></li><li>修改一些配置文件 <ul><li><p>编辑 Nginx 模块的配置文件：<code>vim /opt/setups/fastdfs-nginx-module/src/config</code></p></li><li><p>找到下面一行包含有 <code>local</code> 字眼去掉，因为这三个路径根本不是在 local 目录下的。（如果你的配置文件没有这个 local，那这一步跳过）</p><pre><code class="language-nginx">CORE_INCS=&quot;$CORE_INCS /usr/local/include/fastdfs /usr/local/include/fastcommon/&quot;
</code></pre></li><li><p>改为如下：</p><pre><code class="language-nginx">CORE_INCS=&quot;$CORE_INCS /usr/include/fastdfs /usr/include/fastcommon/&quot;
</code></pre></li><li><p>复制文件：<code>cp /opt/setups/FastDFS/conf/http.conf /etc/fdfs</code></p></li><li><p>复制文件：<code>cp /opt/setups/FastDFS/conf/mime.types /etc/fdfs</code></p></li></ul></li><li>开始安装 Nginx <ul><li><code>cd /opt/setups/nginx-1.8.0</code></li><li><code>mkdir -p /usr/local/nginx /var/log/nginx /var/temp/nginx /var/lock/nginx</code></li><li>执行下面编译语句：</li></ul></li></ul><pre><code class="language-nginx">   ./configure --prefix=/usr/local/nginx \\
   --user=www \\
   --group=www \\
   --pid-path=/var/local/nginx/nginx.pid  \\
   --lock-path=/var/lock/nginx/nginx.lock \\
   --error-log-path=/var/log/nginx/error.log \\
   --http-log-path=/var/log/nginx/access.log \\
   --http-client-body-temp-path=/var/temp/nginx/client \\
   --http-proxy-temp-path=/var/temp/nginx/proxy \\
   --http-fastcgi-temp-path=/var/temp/nginx/fastcgi \\
   --http-uwsgi-temp-path=/var/temp/nginx/uwsgi \\
   --http-scgi-temp-path=/var/temp/nginx/scgi \\
   --sbin-path=/usr/local/nginx/sbin/nginx \\
   --with-http_ssl_module \\
   --with-http_realip_module \\
   --with-http_sub_module \\
   --with-http_flv_module \\
   --with-http_dav_module \\
   --with-http_gzip_static_module \\
   --with-http_stub_status_module \\
   --with-http_addition_module \\
   --with-http_spdy_module \\
   --with-pcre \\
   --with-zlib=/opt/setups/zlib-1.2.8 \\
   --add-module=/opt/setups/nginx-http-concat \\
   --add-module=/opt/setups/lua-nginx-module \\
   --add-module=/opt/setups/ngx_devel_kit \\
   --add-module=/opt/setups/fastdfs-nginx-module/src
</code></pre><ul><li><code>make</code></li><li><code>make install</code></li><li>修改一下配置 <ul><li><p>复制 Nginx 模块的配置文件：<code>cp /opt/setups/fastdfs-nginx-module/src/mod_fastdfs.conf /etc/fdfs</code></p></li><li><p>编辑 Nginx 模块的配置文件：<code>vim /etc/fdfs/mod_fastdfs.conf</code>，编辑内容看下面中文注释</p></li><li><p>如果在已经启动 Nginx 的情况下修改下面内容记得要重启 Nginx。</p><pre><code class="language-ini">connect_timeout=2
network_timeout=30
# 下面这个路径是保存 log 的地方，需要我们改下，指向我们一个存在的目录
# 创建目录：mkdir -p /opt/fastdfs/fastdfs-nginx-module/data-and-log
base_path=/opt/fastdfs/fastdfs-nginx-module/data-and-log
load_fdfs_parameters_from_tracker=true
storage_sync_file_max_delay = 86400
use_storage_id = false
storage_ids_filename = storage_ids.conf
# 指定 tracker 服务器的 IP 和端口
tracker_server=192.168.1.114:22122
storage_server_port=23000
group_name=group1
# 因为我们访问图片的地址是：http://192.168.1.114/group1/M00/00/00/wKgBclb0aqWAbVNrAAAjn7_h9gM813_big.jpg
# 该地址前面是带有 /group1/M00，所以我们这里要使用 true，不然访问不到（原值是 false）
url_have_group_name = true
store_path_count=1
# 图片实际存放路径，如果有多个，这里可以有多行：
# store_path0=/opt/fastdfs/storage/images-data0
# store_path1=/opt/fastdfs/storage/images-data1
# store_path2=/opt/fastdfs/storage/images-data2
store_path0=/opt/fastdfs/storage/images-data
log_level=info
log_filename=
response_mode=proxy
if_alias_prefix=
flv_support = true
flv_extension = flv
group_count = 0
</code></pre></li><li><p>创建文件夹：<code>mkdir -p /opt/fastdfs/thumb</code></p></li><li><p>编辑 Nginx 配置文件</p></li><li><p><code>vim /usr/local/nginx/conf/nginx.conf</code></p><pre><code class="language-nginx"></code></pre></li></ul></li></ul><h1 id="注意这一行行-我特别加上了使用-root-用户去执行-不然有些日记目录没有权限访问" tabindex="-1"><a class="header-anchor" href="#注意这一行行-我特别加上了使用-root-用户去执行-不然有些日记目录没有权限访问"><span>注意这一行行，我特别加上了使用 root 用户去执行，不然有些日记目录没有权限访问</span></a></h1><p>user root; worker_processes 1;</p><p>events { worker_connections 1024; }</p><p>http { include mime.types; default_type application/octet-stream;</p><pre><code> sendfile        on;

 keepalive_timeout  65;
</code></pre><p>server{ listen 80; server_name 192.168.1.112;</p><pre><code>  set $img_thumbnail_root /opt/fastdfs/thumb; 
  set $img_file $img_thumbnail_root$uri;  

  # like：/pic/M00/xx/xx/xx.jpg_200x100.jpg
  # /group1/M00
  location ~* ^(\\/(\\w+)(\\/M00)(.+\\.(jpg|jpeg|gif|png))_(\\d+)+x(\\d+)+\\.(jpg|jpeg|gif|png))$ {
          root $img_thumbnail_root;    
          set $fdfs_group_root /opt/fastdfs/storage/images-data/data; 
 
 # 如果缩略图不存在
          if (!-f $img_file) {   
                  add_header X-Powered-By &#39;Nginx+Lua+GraphicsMagick By Yanue&#39;;  
                  add_header file-path $request_filename;
                  
                  set $request_filepath $fdfs_group_root$4;    
                  set $img_width $6;    
                  set $img_height $7;    
                  set $img_ext $5;     
                  content_by_lua_file /opt/setups/lua/cropSize.lua;   
          }
  }

  location /group1/M00 {
          alias /opt/fastdfs/storage/images-data/data;
          ngx_fastdfs_module;
  }
</code></pre><p>} } \`\`\`</p><ul><li>启动 Nginx <ul><li>停掉防火墙：<code>service iptables stop</code></li><li>启动：<code>/usr/local/nginx/sbin/nginx</code>，启动完成 shell 是不会有输出的</li><li>访问：<code>192.168.1.114</code>，如果能看到：<code>Welcome to nginx!</code>，即可表示安装成功</li><li>检查 时候有 Nginx 进程：<code>ps aux | grep nginx</code>，正常是显示 3 个结果出来</li><li>刷新 Nginx 配置后重启：<code>/usr/local/nginx/sbin/nginx -s reload</code></li><li>停止 Nginx：<code>/usr/local/nginx/sbin/nginx -s stop</code></li><li>如果访问不了，或是出现其他信息看下错误立即：<code>vim /var/log/nginx/error.log</code></li></ul></li></ul><h3 id="多机安装部署-centos-6-7-环境" tabindex="-1"><a class="header-anchor" href="#多机安装部署-centos-6-7-环境"><span>多机安装部署（CentOS 6.7 环境）</span></a></h3><ul><li>多机部署的情况，对生成大小图的 Nginx 也有地方要修改。</li><li>资料：<a href="http://blog.csdn.net/ricciozhang/article/details/49402273" target="_blank" rel="noopener noreferrer">http://blog.csdn.net/ricciozhang/article/details/49402273</a></li></ul><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><ul><li><a href="http://blog.csdn.net/ricciozhang/article/details/49402273" target="_blank" rel="noopener noreferrer">fastdfs+nginx安装配置</a></li></ul>`,21),o=[l];function s(r,c){return n(),t("div",null,o)}const p=e(a,[["render",s],["__file","FastDFS-Nginx-Lua-GraphicsMagick.html.vue"]]),_=JSON.parse('{"path":"/linux-tutor/server/FastDFS-Nginx-Lua-GraphicsMagick.html","title":"FastDFS 结合 GraphicsMagick","lang":"zh-CN","frontmatter":{"description":"FastDFS 结合 GraphicsMagick 单机安装部署（CentOS 6.7 环境） 先安装 FastDFS 软件准备： 我这边统一提供了一个压缩包，方便使用。 下载地址：http://pan.baidu.com/s/1hsg2brA 安装依赖包：yum install -y gcc gcc-c++ pcre pcre-devel zlib ...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/FastDFS-Nginx-Lua-GraphicsMagick.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"FastDFS 结合 GraphicsMagick"}],["meta",{"property":"og:description","content":"FastDFS 结合 GraphicsMagick 单机安装部署（CentOS 6.7 环境） 先安装 FastDFS 软件准备： 我这边统一提供了一个压缩包，方便使用。 下载地址：http://pan.baidu.com/s/1hsg2brA 安装依赖包：yum install -y gcc gcc-c++ pcre pcre-devel zlib ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-26T16:41:58.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-26T16:41:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"FastDFS 结合 GraphicsMagick\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-26T16:41:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"单机安装部署（CentOS 6.7 环境）","slug":"单机安装部署-centos-6-7-环境","link":"#单机安装部署-centos-6-7-环境","children":[{"level":3,"title":"先安装 FastDFS","slug":"先安装-fastdfs","link":"#先安装-fastdfs","children":[]},{"level":3,"title":"安装 nginx-lua-GraphicsMagick","slug":"安装-nginx-lua-graphicsmagick","link":"#安装-nginx-lua-graphicsmagick","children":[]},{"level":3,"title":"多机安装部署（CentOS 6.7 环境）","slug":"多机安装部署-centos-6-7-环境","link":"#多机安装部署-centos-6-7-环境","children":[]}]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1653565176000,"updatedTime":1658853718000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":6.11,"words":1834},"filePathRelative":"linux-tutor/server/FastDFS-Nginx-Lua-GraphicsMagick.md","localizedDate":"2022年5月26日","autoDesc":true}');export{p as comp,_ as data};
