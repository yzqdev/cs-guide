import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/linux-tutor/linux-tool/mysql-1g.html","title":"MySQL 配置参考","lang":"zh-CN","frontmatter":{"description":"MySQL 配置参考 MySQL 配置文件（my.cnf）针对不同服务器配置的优化参考。 1GB 内存服务器配置 从库配置（my-for-slave.cnf） 主库配置（my-for-master.cnf） 综合配置（my-for-comprehensive.cnf） 8GB 内存服务器配置（my.cnf） Windows 配置（my-windows....","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL 配置参考\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/linux-tool/mysql-1g.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"MySQL 配置参考"}],["meta",{"property":"og:description","content":"MySQL 配置参考 MySQL 配置文件（my.cnf）针对不同服务器配置的优化参考。 1GB 内存服务器配置 从库配置（my-for-slave.cnf） 主库配置（my-for-master.cnf） 综合配置（my-for-comprehensive.cnf） 8GB 内存服务器配置（my.cnf） Windows 配置（my-windows...."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1784119030000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.48,"words":1045},"filePathRelative":"linux-tutor/linux-tool/mysql-1g.md","autoDesc":true}`),a={name:`mysql-1g.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="mysql-配置参考" tabindex="-1"><a class="header-anchor" href="#mysql-配置参考"><span>MySQL 配置参考</span></a></h1><blockquote><p>MySQL 配置文件（my.cnf）针对不同服务器配置的优化参考。</p></blockquote><h2 id="_1gb-内存服务器配置" tabindex="-1"><a class="header-anchor" href="#_1gb-内存服务器配置"><span>1GB 内存服务器配置</span></a></h2><h3 id="从库配置-my-for-slave-cnf" tabindex="-1"><a class="header-anchor" href="#从库配置-my-for-slave-cnf"><span>从库配置（my-for-slave.cnf）</span></a></h3><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre><code class="language-ini"><span class="line"><span class="token comment"># 适用于 MySQL 5.6</span></span>
<span class="line"><span class="token comment"># 该配置适合 1G 内存左右的机子，储存类型为 InnoDB</span></span>
<span class="line"><span class="token comment"># 在线生成配置工具：http://tools.percona.com</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysql</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">port</span> <span class="token punctuation">=</span> <span class="token value attr-value">3306</span></span>
<span class="line"><span class="token key attr-name">socket</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql.sock</span></span>
<span class="line"><span class="token key attr-name">default-character-set</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf8</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqld</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">user</span> <span class="token punctuation">=</span> <span class="token value attr-value">mysql</span></span>
<span class="line"><span class="token key attr-name">port</span> <span class="token punctuation">=</span> <span class="token value attr-value">3306</span></span>
<span class="line"><span class="token key attr-name">default-storage-engine</span> <span class="token punctuation">=</span> <span class="token value attr-value">InnoDB</span></span>
<span class="line"><span class="token key attr-name">socket</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql.sock</span></span>
<span class="line"><span class="token key attr-name">pid-file</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql.pid</span></span>
<span class="line"><span class="token key attr-name">collation-server</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf8_general_ci</span></span>
<span class="line"><span class="token key attr-name">init_connect</span> <span class="token punctuation">=</span> <span class="token value attr-value">&#39;<span class="token inner-value">SET NAMES utf8</span>&#39;</span></span>
<span class="line"><span class="token key attr-name">character-set-server</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf8</span></span>
<span class="line"><span class="token key attr-name">basedir</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql</span></span>
<span class="line"><span class="token key attr-name">datadir</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data</span></span>
<span class="line"><span class="token key attr-name">log-error</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql-error.log</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">server-id</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 从库特有配置</span></span>
<span class="line"><span class="token key attr-name">read_only</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span></span>
<span class="line"><span class="token key attr-name">skip-slave-start</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span></span>
<span class="line"><span class="token key attr-name">log-slave-updates</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span></span>
<span class="line"><span class="token key attr-name">relay-log</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/relay-bin</span></span>
<span class="line"><span class="token key attr-name">slave-net-timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">60</span></span>
<span class="line"><span class="token key attr-name">sync_master_info</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">sync_relay_log</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">sync_relay_log_info</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">back_log</span> <span class="token punctuation">=</span> <span class="token value attr-value">512</span></span>
<span class="line"><span class="token key attr-name">max_connections</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000</span></span>
<span class="line"><span class="token key attr-name">max_allowed_packet</span> <span class="token punctuation">=</span> <span class="token value attr-value">16M</span></span>
<span class="line"><span class="token key attr-name">max_connect_errors</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000000</span></span>
<span class="line">skip-name-resolve</span>
<span class="line"><span class="token key attr-name">open_files_limit</span> <span class="token punctuation">=</span> <span class="token value attr-value">65535</span></span>
<span class="line"><span class="token key attr-name">table_open_cache</span> <span class="token punctuation">=</span> <span class="token value attr-value">2048</span></span>
<span class="line"><span class="token key attr-name">binlog_cache_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">1M</span></span>
<span class="line"><span class="token key attr-name">max_heap_table_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">32M</span></span>
<span class="line"><span class="token key attr-name">tmp_table_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">32M</span></span>
<span class="line"><span class="token key attr-name">read_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">2M</span></span>
<span class="line"><span class="token key attr-name">read_rnd_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">sort_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">2M</span></span>
<span class="line"><span class="token key attr-name">join_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">4M</span></span>
<span class="line"><span class="token key attr-name">key_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">64M</span></span>
<span class="line"><span class="token key attr-name">thread_cache_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8</span></span>
<span class="line"><span class="token key attr-name">thread_stack</span> <span class="token punctuation">=</span> <span class="token value attr-value">256k</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">query_cache_type</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">query_cache_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">query_cache_limit</span> <span class="token punctuation">=</span> <span class="token value attr-value">2M</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">ft_min_word_len</span> <span class="token punctuation">=</span> <span class="token value attr-value">4</span></span>
<span class="line"><span class="token key attr-name">log-bin</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql-bin</span></span>
<span class="line"><span class="token key attr-name">binlog-format</span> <span class="token punctuation">=</span> <span class="token value attr-value">mixed</span></span>
<span class="line"><span class="token key attr-name">expire_logs_days</span> <span class="token punctuation">=</span> <span class="token value attr-value">30</span></span>
<span class="line"><span class="token key attr-name">sync_binlog</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">slow_query_log</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">long_query_time</span> <span class="token punctuation">=</span> <span class="token value attr-value">3</span></span>
<span class="line"><span class="token key attr-name">slow_query_log_file</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql-slow.log</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">performance_schema</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span></span>
<span class="line"><span class="token key attr-name">explicit_defaults_for_timestamp</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span></span>
<span class="line"><span class="token key attr-name">lower_case_table_names</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line">skip_external_locking</span>
<span class="line"><span class="token key attr-name">table_definition_cache</span> <span class="token punctuation">=</span> <span class="token value attr-value">1024</span></span>
<span class="line"><span class="token key attr-name">thread_concurrency</span> <span class="token punctuation">=</span> <span class="token value attr-value">2</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">innodb</span> <span class="token punctuation">=</span> <span class="token value attr-value">FORCE</span></span>
<span class="line"><span class="token key attr-name">innodb_file_per_table</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">innodb_open_files</span> <span class="token punctuation">=</span> <span class="token value attr-value">500</span></span>
<span class="line"><span class="token key attr-name">innodb_buffer_pool_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">592M</span></span>
<span class="line"><span class="token key attr-name">innodb_write_io_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">4</span></span>
<span class="line"><span class="token key attr-name">innodb_read_io_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">4</span></span>
<span class="line"><span class="token key attr-name">innodb_thread_concurrency</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span></span>
<span class="line"><span class="token key attr-name">innodb_purge_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">innodb_flush_log_at_trx_commit</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">innodb_log_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">2M</span></span>
<span class="line"><span class="token key attr-name">innodb_log_file_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">64M</span></span>
<span class="line"><span class="token key attr-name">innodb_log_files_in_group</span> <span class="token punctuation">=</span> <span class="token value attr-value">3</span></span>
<span class="line"><span class="token key attr-name">innodb_max_dirty_pages_pct</span> <span class="token punctuation">=</span> <span class="token value attr-value">90</span></span>
<span class="line"><span class="token key attr-name">innodb_lock_wait_timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">120</span></span>
<span class="line"><span class="token key attr-name">innodb_additional_mem_pool_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">2M</span></span>
<span class="line"><span class="token key attr-name">bulk_insert_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">myisam_sort_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">myisam_max_sort_file_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">100G</span></span>
<span class="line"><span class="token key attr-name">myisam_repair_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">interactive_timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">28800</span></span>
<span class="line"><span class="token key attr-name">wait_timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">3600</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqldump</span><span class="token punctuation">]</span></span></span>
<span class="line">quick</span>
<span class="line"><span class="token key attr-name">max_allowed_packet</span> <span class="token punctuation">=</span> <span class="token value attr-value">16M</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">myisamchk</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">key_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">sort_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">read_buffer</span> <span class="token punctuation">=</span> <span class="token value attr-value">4M</span></span>
<span class="line"><span class="token key attr-name">write_buffer</span> <span class="token punctuation">=</span> <span class="token value attr-value">4M</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="主库配置-my-for-master-cnf" tabindex="-1"><a class="header-anchor" href="#主库配置-my-for-master-cnf"><span>主库配置（my-for-master.cnf）</span></a></h3><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre><code class="language-ini"><span class="line"><span class="token comment"># 适用于 MySQL 5.6</span></span>
<span class="line"><span class="token comment"># 该配置适合 1G 内存左右的机子，储存类型为 InnoDB</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysql</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">port</span> <span class="token punctuation">=</span> <span class="token value attr-value">3306</span></span>
<span class="line"><span class="token key attr-name">socket</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql.sock</span></span>
<span class="line"><span class="token key attr-name">default-character-set</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf8</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqld</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">user</span> <span class="token punctuation">=</span> <span class="token value attr-value">mysql</span></span>
<span class="line"><span class="token key attr-name">port</span> <span class="token punctuation">=</span> <span class="token value attr-value">3306</span></span>
<span class="line"><span class="token key attr-name">default-storage-engine</span> <span class="token punctuation">=</span> <span class="token value attr-value">InnoDB</span></span>
<span class="line"><span class="token key attr-name">socket</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql.sock</span></span>
<span class="line"><span class="token key attr-name">pid-file</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql.pid</span></span>
<span class="line"><span class="token key attr-name">collation-server</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf8_general_ci</span></span>
<span class="line"><span class="token key attr-name">init_connect</span> <span class="token punctuation">=</span> <span class="token value attr-value">&#39;<span class="token inner-value">SET NAMES utf8</span>&#39;</span></span>
<span class="line"><span class="token key attr-name">character-set-server</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf8</span></span>
<span class="line"><span class="token key attr-name">basedir</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql</span></span>
<span class="line"><span class="token key attr-name">datadir</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data</span></span>
<span class="line"><span class="token key attr-name">log-error</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql-error.log</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">server-id</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">back_log</span> <span class="token punctuation">=</span> <span class="token value attr-value">512</span></span>
<span class="line"><span class="token key attr-name">max_connections</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000</span></span>
<span class="line"><span class="token key attr-name">max_allowed_packet</span> <span class="token punctuation">=</span> <span class="token value attr-value">16M</span></span>
<span class="line"><span class="token key attr-name">max_connect_errors</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000000</span></span>
<span class="line">skip-name-resolve</span>
<span class="line"><span class="token key attr-name">open_files_limit</span> <span class="token punctuation">=</span> <span class="token value attr-value">65535</span></span>
<span class="line"><span class="token key attr-name">table_open_cache</span> <span class="token punctuation">=</span> <span class="token value attr-value">2048</span></span>
<span class="line"><span class="token key attr-name">binlog_cache_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">1M</span></span>
<span class="line"><span class="token key attr-name">max_heap_table_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">32M</span></span>
<span class="line"><span class="token key attr-name">tmp_table_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">32M</span></span>
<span class="line"><span class="token key attr-name">read_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">2M</span></span>
<span class="line"><span class="token key attr-name">read_rnd_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">sort_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">2M</span></span>
<span class="line"><span class="token key attr-name">join_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">4M</span></span>
<span class="line"><span class="token key attr-name">key_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">64M</span></span>
<span class="line"><span class="token key attr-name">thread_cache_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8</span></span>
<span class="line"><span class="token key attr-name">thread_stack</span> <span class="token punctuation">=</span> <span class="token value attr-value">256k</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">query_cache_type</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span></span>
<span class="line"><span class="token key attr-name">query_cache_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span></span>
<span class="line"><span class="token key attr-name">query_cache_limit</span> <span class="token punctuation">=</span> <span class="token value attr-value">2M</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">ft_min_word_len</span> <span class="token punctuation">=</span> <span class="token value attr-value">4</span></span>
<span class="line"><span class="token key attr-name">log-bin</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql-bin</span></span>
<span class="line"><span class="token key attr-name">binlog-format</span> <span class="token punctuation">=</span> <span class="token value attr-value">mixed</span></span>
<span class="line"><span class="token key attr-name">expire_logs_days</span> <span class="token punctuation">=</span> <span class="token value attr-value">30</span></span>
<span class="line"><span class="token key attr-name">sync_binlog</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">slow_query_log</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span></span>
<span class="line"><span class="token key attr-name">long_query_time</span> <span class="token punctuation">=</span> <span class="token value attr-value">3</span></span>
<span class="line"><span class="token key attr-name">slow_query_log_file</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql-slow.log</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">performance_schema</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span></span>
<span class="line"><span class="token key attr-name">explicit_defaults_for_timestamp</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span></span>
<span class="line"><span class="token key attr-name">lower_case_table_names</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line">skip_external_locking</span>
<span class="line"><span class="token key attr-name">table_definition_cache</span> <span class="token punctuation">=</span> <span class="token value attr-value">1024</span></span>
<span class="line"><span class="token key attr-name">thread_concurrency</span> <span class="token punctuation">=</span> <span class="token value attr-value">2</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">innodb</span> <span class="token punctuation">=</span> <span class="token value attr-value">FORCE</span></span>
<span class="line"><span class="token key attr-name">innodb_file_per_table</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">innodb_open_files</span> <span class="token punctuation">=</span> <span class="token value attr-value">500</span></span>
<span class="line"><span class="token key attr-name">innodb_buffer_pool_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">592M</span></span>
<span class="line"><span class="token key attr-name">innodb_write_io_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">4</span></span>
<span class="line"><span class="token key attr-name">innodb_read_io_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">4</span></span>
<span class="line"><span class="token key attr-name">innodb_thread_concurrency</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span></span>
<span class="line"><span class="token key attr-name">innodb_purge_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">innodb_flush_log_at_trx_commit</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">innodb_log_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">2M</span></span>
<span class="line"><span class="token key attr-name">innodb_log_file_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">64M</span></span>
<span class="line"><span class="token key attr-name">innodb_log_files_in_group</span> <span class="token punctuation">=</span> <span class="token value attr-value">3</span></span>
<span class="line"><span class="token key attr-name">innodb_max_dirty_pages_pct</span> <span class="token punctuation">=</span> <span class="token value attr-value">90</span></span>
<span class="line"><span class="token key attr-name">innodb_lock_wait_timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">120</span></span>
<span class="line"><span class="token key attr-name">innodb_additional_mem_pool_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">2M</span></span>
<span class="line"><span class="token key attr-name">bulk_insert_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">myisam_sort_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">myisam_max_sort_file_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">100G</span></span>
<span class="line"><span class="token key attr-name">myisam_repair_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">interactive_timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">28800</span></span>
<span class="line"><span class="token key attr-name">wait_timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">3600</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqldump</span><span class="token punctuation">]</span></span></span>
<span class="line">quick</span>
<span class="line"><span class="token key attr-name">max_allowed_packet</span> <span class="token punctuation">=</span> <span class="token value attr-value">16M</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">myisamchk</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">key_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">sort_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">read_buffer</span> <span class="token punctuation">=</span> <span class="token value attr-value">4M</span></span>
<span class="line"><span class="token key attr-name">write_buffer</span> <span class="token punctuation">=</span> <span class="token value attr-value">4M</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="综合配置-my-for-comprehensive-cnf" tabindex="-1"><a class="header-anchor" href="#综合配置-my-for-comprehensive-cnf"><span>综合配置（my-for-comprehensive.cnf）</span></a></h3><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre><code class="language-ini"><span class="line"><span class="token comment"># 适用于 MySQL 5.6</span></span>
<span class="line"><span class="token comment"># 综合配置，兼顾主从</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysql</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">port</span> <span class="token punctuation">=</span> <span class="token value attr-value">3306</span></span>
<span class="line"><span class="token key attr-name">socket</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql.sock</span></span>
<span class="line"><span class="token key attr-name">default-character-set</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf8</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqld</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">user</span> <span class="token punctuation">=</span> <span class="token value attr-value">mysql</span></span>
<span class="line"><span class="token key attr-name">port</span> <span class="token punctuation">=</span> <span class="token value attr-value">3306</span></span>
<span class="line"><span class="token key attr-name">default-storage-engine</span> <span class="token punctuation">=</span> <span class="token value attr-value">InnoDB</span></span>
<span class="line"><span class="token key attr-name">socket</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql.sock</span></span>
<span class="line"><span class="token key attr-name">pid-file</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql.pid</span></span>
<span class="line"><span class="token key attr-name">collation-server</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf8_general_ci</span></span>
<span class="line"><span class="token key attr-name">init_connect</span> <span class="token punctuation">=</span> <span class="token value attr-value">&#39;<span class="token inner-value">SET NAMES utf8</span>&#39;</span></span>
<span class="line"><span class="token key attr-name">character-set-server</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf8</span></span>
<span class="line"><span class="token key attr-name">basedir</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql</span></span>
<span class="line"><span class="token key attr-name">datadir</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data</span></span>
<span class="line"><span class="token key attr-name">log-error</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql-error.log</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">server-id</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">back_log</span> <span class="token punctuation">=</span> <span class="token value attr-value">512</span></span>
<span class="line"><span class="token key attr-name">max_connections</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000</span></span>
<span class="line"><span class="token key attr-name">max_allowed_packet</span> <span class="token punctuation">=</span> <span class="token value attr-value">16M</span></span>
<span class="line"><span class="token key attr-name">max_connect_errors</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000000</span></span>
<span class="line">skip-name-resolve</span>
<span class="line"><span class="token key attr-name">open_files_limit</span> <span class="token punctuation">=</span> <span class="token value attr-value">65535</span></span>
<span class="line"><span class="token key attr-name">table_open_cache</span> <span class="token punctuation">=</span> <span class="token value attr-value">2048</span></span>
<span class="line"><span class="token key attr-name">binlog_cache_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">1M</span></span>
<span class="line"><span class="token key attr-name">max_heap_table_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">32M</span></span>
<span class="line"><span class="token key attr-name">tmp_table_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">32M</span></span>
<span class="line"><span class="token key attr-name">read_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">2M</span></span>
<span class="line"><span class="token key attr-name">read_rnd_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">sort_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">2M</span></span>
<span class="line"><span class="token key attr-name">join_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">4M</span></span>
<span class="line"><span class="token key attr-name">key_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">64M</span></span>
<span class="line"><span class="token key attr-name">thread_cache_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8</span></span>
<span class="line"><span class="token key attr-name">thread_stack</span> <span class="token punctuation">=</span> <span class="token value attr-value">256k</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">query_cache_type</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">query_cache_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">query_cache_limit</span> <span class="token punctuation">=</span> <span class="token value attr-value">2M</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">ft_min_word_len</span> <span class="token punctuation">=</span> <span class="token value attr-value">4</span></span>
<span class="line"><span class="token key attr-name">log-bin</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql-bin</span></span>
<span class="line"><span class="token key attr-name">binlog-format</span> <span class="token punctuation">=</span> <span class="token value attr-value">mixed</span></span>
<span class="line"><span class="token key attr-name">expire_logs_days</span> <span class="token punctuation">=</span> <span class="token value attr-value">30</span></span>
<span class="line"><span class="token key attr-name">sync_binlog</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">slow_query_log</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">long_query_time</span> <span class="token punctuation">=</span> <span class="token value attr-value">3</span></span>
<span class="line"><span class="token key attr-name">slow_query_log_file</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql-slow.log</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">performance_schema</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span></span>
<span class="line"><span class="token key attr-name">explicit_defaults_for_timestamp</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span></span>
<span class="line"><span class="token key attr-name">lower_case_table_names</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line">skip_external_locking</span>
<span class="line"><span class="token key attr-name">table_definition_cache</span> <span class="token punctuation">=</span> <span class="token value attr-value">1024</span></span>
<span class="line"><span class="token key attr-name">thread_concurrency</span> <span class="token punctuation">=</span> <span class="token value attr-value">2</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">innodb</span> <span class="token punctuation">=</span> <span class="token value attr-value">FORCE</span></span>
<span class="line"><span class="token key attr-name">innodb_file_per_table</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">innodb_open_files</span> <span class="token punctuation">=</span> <span class="token value attr-value">500</span></span>
<span class="line"><span class="token key attr-name">innodb_buffer_pool_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">592M</span></span>
<span class="line"><span class="token key attr-name">innodb_write_io_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">4</span></span>
<span class="line"><span class="token key attr-name">innodb_read_io_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">4</span></span>
<span class="line"><span class="token key attr-name">innodb_thread_concurrency</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span></span>
<span class="line"><span class="token key attr-name">innodb_purge_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">innodb_flush_log_at_trx_commit</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">innodb_log_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">2M</span></span>
<span class="line"><span class="token key attr-name">innodb_log_file_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">64M</span></span>
<span class="line"><span class="token key attr-name">innodb_log_files_in_group</span> <span class="token punctuation">=</span> <span class="token value attr-value">3</span></span>
<span class="line"><span class="token key attr-name">innodb_max_dirty_pages_pct</span> <span class="token punctuation">=</span> <span class="token value attr-value">90</span></span>
<span class="line"><span class="token key attr-name">innodb_lock_wait_timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">120</span></span>
<span class="line"><span class="token key attr-name">innodb_additional_mem_pool_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">2M</span></span>
<span class="line"><span class="token key attr-name">bulk_insert_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">myisam_sort_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">myisam_max_sort_file_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">100G</span></span>
<span class="line"><span class="token key attr-name">myisam_repair_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">interactive_timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">28800</span></span>
<span class="line"><span class="token key attr-name">wait_timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">3600</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqldump</span><span class="token punctuation">]</span></span></span>
<span class="line">quick</span>
<span class="line"><span class="token key attr-name">max_allowed_packet</span> <span class="token punctuation">=</span> <span class="token value attr-value">16M</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">myisamchk</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">key_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">sort_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">read_buffer</span> <span class="token punctuation">=</span> <span class="token value attr-value">4M</span></span>
<span class="line"><span class="token key attr-name">write_buffer</span> <span class="token punctuation">=</span> <span class="token value attr-value">4M</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8gb-内存服务器配置-my-cnf" tabindex="-1"><a class="header-anchor" href="#_8gb-内存服务器配置-my-cnf"><span>8GB 内存服务器配置（my.cnf）</span></a></h2><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre><code class="language-ini"><span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysql</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">port</span> <span class="token punctuation">=</span> <span class="token value attr-value">3306</span></span>
<span class="line"><span class="token key attr-name">socket</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql.sock</span></span>
<span class="line"><span class="token key attr-name">default-character-set</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf8</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqld</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">user</span> <span class="token punctuation">=</span> <span class="token value attr-value">mysql</span></span>
<span class="line"><span class="token key attr-name">port</span> <span class="token punctuation">=</span> <span class="token value attr-value">3306</span></span>
<span class="line"><span class="token key attr-name">server-id</span> <span class="token punctuation">=</span> <span class="token value attr-value">100866</span></span>
<span class="line"><span class="token key attr-name">default-storage-engine</span> <span class="token punctuation">=</span> <span class="token value attr-value">InnoDB</span></span>
<span class="line"><span class="token key attr-name">socket</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql.sock</span></span>
<span class="line"><span class="token key attr-name">pid-file</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql.pid</span></span>
<span class="line"><span class="token key attr-name">collation-server</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf8_general_ci</span></span>
<span class="line"><span class="token key attr-name">init_connect</span> <span class="token punctuation">=</span> <span class="token value attr-value">&#39;<span class="token inner-value">SET NAMES utf8</span>&#39;</span></span>
<span class="line"><span class="token key attr-name">character-set-server</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf8</span></span>
<span class="line"><span class="token key attr-name">basedir</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql</span></span>
<span class="line"><span class="token key attr-name">datadir</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data</span></span>
<span class="line"><span class="token key attr-name">log-error</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql-error.log</span></span>
<span class="line"></span>
<span class="line">skip-external-locking</span>
<span class="line">skip-name-resolve</span>
<span class="line"><span class="token key attr-name">back_log</span> <span class="token punctuation">=</span> <span class="token value attr-value">500</span></span>
<span class="line"><span class="token key attr-name">max_connections</span> <span class="token punctuation">=</span> <span class="token value attr-value">500</span></span>
<span class="line"><span class="token key attr-name">max_connect_errors</span> <span class="token punctuation">=</span> <span class="token value attr-value">10000</span></span>
<span class="line"><span class="token key attr-name">open_files_limit</span> <span class="token punctuation">=</span> <span class="token value attr-value">65535</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">table_open_cache</span> <span class="token punctuation">=</span> <span class="token value attr-value">2048</span></span>
<span class="line"><span class="token key attr-name">table_definition_cache</span> <span class="token punctuation">=</span> <span class="token value attr-value">1024</span></span>
<span class="line"><span class="token key attr-name">max_allowed_packet</span> <span class="token punctuation">=</span> <span class="token value attr-value">64M</span></span>
<span class="line"><span class="token key attr-name">max_heap_table_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">128M</span></span>
<span class="line"><span class="token key attr-name">tmp_table_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">128M</span></span>
<span class="line"><span class="token key attr-name">sort_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">4M</span></span>
<span class="line"><span class="token key attr-name">join_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">4M</span></span>
<span class="line"><span class="token key attr-name">thread_cache_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">64</span></span>
<span class="line"><span class="token key attr-name">thread_stack</span> <span class="token punctuation">=</span> <span class="token value attr-value">512k</span></span>
<span class="line"><span class="token key attr-name">query_cache_type</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span></span>
<span class="line"><span class="token key attr-name">query_cache_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">ft_min_word_len</span> <span class="token punctuation">=</span> <span class="token value attr-value">4</span></span>
<span class="line"><span class="token key attr-name">binlog_cache_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">4M</span></span>
<span class="line"><span class="token key attr-name">max_binlog_cache_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">1G</span></span>
<span class="line"><span class="token key attr-name">max_binlog_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">1G</span></span>
<span class="line"><span class="token key attr-name">expire_logs_days</span> <span class="token punctuation">=</span> <span class="token value attr-value">7</span></span>
<span class="line"><span class="token key attr-name">log-bin</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql-bin</span></span>
<span class="line"><span class="token key attr-name">binlog-format</span> <span class="token punctuation">=</span> <span class="token value attr-value">mixed</span></span>
<span class="line"><span class="token key attr-name">sync_binlog</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">slow_query_log</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">long_query_time</span> <span class="token punctuation">=</span> <span class="token value attr-value">2</span></span>
<span class="line"><span class="token key attr-name">slow_query_log_file</span> <span class="token punctuation">=</span> <span class="token value attr-value">/usr/program/mysql/data/mysql-slow.log</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">performance_schema</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span></span>
<span class="line"><span class="token key attr-name">explicit_defaults_for_timestamp</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span></span>
<span class="line"><span class="token key attr-name">lower_case_table_names</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">innodb</span> <span class="token punctuation">=</span> <span class="token value attr-value">FORCE</span></span>
<span class="line"><span class="token key attr-name">innodb_file_per_table</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">innodb_open_files</span> <span class="token punctuation">=</span> <span class="token value attr-value">2048</span></span>
<span class="line"><span class="token key attr-name">innodb_buffer_pool_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">4G</span></span>
<span class="line"><span class="token key attr-name">innodb_write_io_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">8</span></span>
<span class="line"><span class="token key attr-name">innodb_read_io_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">8</span></span>
<span class="line"><span class="token key attr-name">innodb_thread_concurrency</span> <span class="token punctuation">=</span> <span class="token value attr-value">16</span></span>
<span class="line"><span class="token key attr-name">innodb_purge_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">4</span></span>
<span class="line"><span class="token key attr-name">innodb_flush_log_at_trx_commit</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">innodb_log_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">16M</span></span>
<span class="line"><span class="token key attr-name">innodb_log_file_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">512M</span></span>
<span class="line"><span class="token key attr-name">innodb_log_files_in_group</span> <span class="token punctuation">=</span> <span class="token value attr-value">3</span></span>
<span class="line"><span class="token key attr-name">innodb_max_dirty_pages_pct</span> <span class="token punctuation">=</span> <span class="token value attr-value">80</span></span>
<span class="line"><span class="token key attr-name">innodb_lock_wait_timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">120</span></span>
<span class="line"><span class="token key attr-name">bulk_insert_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">64M</span></span>
<span class="line"><span class="token key attr-name">myisam_sort_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">64M</span></span>
<span class="line"><span class="token key attr-name">myisam_max_sort_file_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">10G</span></span>
<span class="line"><span class="token key attr-name">myisam_repair_threads</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">interactive_timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">28800</span></span>
<span class="line"><span class="token key attr-name">wait_timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">3600</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqldump</span><span class="token punctuation">]</span></span></span>
<span class="line">quick</span>
<span class="line"><span class="token key attr-name">max_allowed_packet</span> <span class="token punctuation">=</span> <span class="token value attr-value">64M</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">myisamchk</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">key_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">64M</span></span>
<span class="line"><span class="token key attr-name">sort_buffer_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">64M</span></span>
<span class="line"><span class="token key attr-name">read_buffer</span> <span class="token punctuation">=</span> <span class="token value attr-value">16M</span></span>
<span class="line"><span class="token key attr-name">write_buffer</span> <span class="token punctuation">=</span> <span class="token value attr-value">16M</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="windows-配置-my-windows-ini" tabindex="-1"><a class="header-anchor" href="#windows-配置-my-windows-ini"><span>Windows 配置（my-windows.ini）</span></a></h2><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre><code class="language-ini"><span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">client</span><span class="token punctuation">]</span></span></span>
<span class="line">no-beep</span>
<span class="line"><span class="token key attr-name">port</span><span class="token punctuation">=</span><span class="token value attr-value">3306</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysql</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">default-character-set</span><span class="token punctuation">=</span><span class="token value attr-value">utf8</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqld</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">port</span><span class="token punctuation">=</span><span class="token value attr-value">3306</span></span>
<span class="line"><span class="token key attr-name">basedir</span><span class="token punctuation">=</span><span class="token value attr-value">&quot;<span class="token inner-value">C:/Program Files/MySQL/MySQL Server 5.6/</span>&quot;</span></span>
<span class="line"><span class="token key attr-name">datadir</span><span class="token punctuation">=</span><span class="token value attr-value">&quot;<span class="token inner-value">C:/ProgramData/MySQL/MySQL Server 5.6/Data/</span>&quot;</span></span>
<span class="line"><span class="token key attr-name">character-set-server</span><span class="token punctuation">=</span><span class="token value attr-value">utf8</span></span>
<span class="line"><span class="token key attr-name">default-storage-engine</span><span class="token punctuation">=</span><span class="token value attr-value">INNODB</span></span>
<span class="line"><span class="token key attr-name">sql-mode</span><span class="token punctuation">=</span><span class="token value attr-value">&quot;<span class="token inner-value">STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION</span>&quot;</span></span>
<span class="line"><span class="token key attr-name">max_connections</span><span class="token punctuation">=</span><span class="token value attr-value">100</span></span>
<span class="line"><span class="token key attr-name">query_cache_size</span><span class="token punctuation">=</span><span class="token value attr-value">0</span></span>
<span class="line"><span class="token key attr-name">table_open_cache</span><span class="token punctuation">=</span><span class="token value attr-value">256</span></span>
<span class="line"><span class="token key attr-name">tmp_table_size</span><span class="token punctuation">=</span><span class="token value attr-value">18M</span></span>
<span class="line"><span class="token key attr-name">thread_cache_size</span><span class="token punctuation">=</span><span class="token value attr-value">8</span></span>
<span class="line"><span class="token key attr-name">myisam_max_sort_file_size</span><span class="token punctuation">=</span><span class="token value attr-value">100G</span></span>
<span class="line"><span class="token key attr-name">myisam_sort_buffer_size</span><span class="token punctuation">=</span><span class="token value attr-value">23M</span></span>
<span class="line"><span class="token key attr-name">key_buffer_size</span><span class="token punctuation">=</span><span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">read_buffer_size</span><span class="token punctuation">=</span><span class="token value attr-value">64K</span></span>
<span class="line"><span class="token key attr-name">read_rnd_buffer_size</span><span class="token punctuation">=</span><span class="token value attr-value">256K</span></span>
<span class="line"><span class="token key attr-name">sort_buffer_size</span><span class="token punctuation">=</span><span class="token value attr-value">256K</span></span>
<span class="line"><span class="token key attr-name">innodb_flush_log_at_trx_commit</span><span class="token punctuation">=</span><span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">innodb_log_buffer_size</span><span class="token punctuation">=</span><span class="token value attr-value">1M</span></span>
<span class="line"><span class="token key attr-name">innodb_buffer_pool_size</span><span class="token punctuation">=</span><span class="token value attr-value">8M</span></span>
<span class="line"><span class="token key attr-name">innodb_log_file_size</span><span class="token punctuation">=</span><span class="token value attr-value">10M</span></span>
<span class="line"><span class="token key attr-name">innodb_thread_concurrency</span><span class="token punctuation">=</span><span class="token value attr-value">8</span></span>
<span class="line"><span class="token key attr-name">innodb_autoextend_increment</span><span class="token punctuation">=</span><span class="token value attr-value">1000</span></span>
<span class="line"><span class="token key attr-name">innodb_file_per_table</span><span class="token punctuation">=</span><span class="token value attr-value">1</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置要点说明" tabindex="-1"><a class="header-anchor" href="#配置要点说明"><span>配置要点说明</span></a></h2><table><thead><tr><th>配置项</th><th>说明</th></tr></thead><tbody><tr><td><code>innodb_buffer_pool_size</code></td><td>InnoDB 缓冲池大小，建议为可用内存的 60%-70%</td></tr><tr><td><code>max_connections</code></td><td>最大连接数</td></tr><tr><td><code>query_cache_size</code></td><td>查询缓存大小（MySQL 8.0 已移除）</td></tr><tr><td><code>sort_buffer_size</code></td><td>排序缓冲区大小</td></tr><tr><td><code>join_buffer_size</code></td><td>连接缓冲区大小</td></tr></tbody></table><h3 id="内存配置建议" tabindex="-1"><a class="header-anchor" href="#内存配置建议"><span>内存配置建议</span></a></h3><table><thead><tr><th>服务器内存</th><th>InnoDB 缓冲池</th><th>总 MySQL 内存预估</th></tr></thead><tbody><tr><td>1GB</td><td>256MB - 512MB</td><td>~600MB</td></tr><tr><td>4GB</td><td>2GB - 2.5GB</td><td>~3GB</td></tr><tr><td>8GB</td><td>4GB - 5GB</td><td>~5.5GB</td></tr><tr><td>16GB</td><td>10GB - 12GB</td><td>~13GB</td></tr></tbody></table><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><ul><li><a href="https://dev.mysql.com/doc/" target="_blank" rel="noopener noreferrer">MySQL 官方文档</a></li><li><a href="https://tools.percona.com/" target="_blank" rel="noopener noreferrer">Percona 配置生成器</a></li></ul>`,19)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};