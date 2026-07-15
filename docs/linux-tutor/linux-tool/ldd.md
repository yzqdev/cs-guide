# ldd — 查看程序依赖的共享库

`ldd`（List Dynamic Dependencies）用于查看可执行文件或共享库所依赖的动态链接库。在程序因缺少依赖库而无法运行或报错时，`ldd` 是排查依赖问题的首要工具。

## 命令格式

```bash
ldd [选项] 文件
```

## 常用参数

| 参数 | 说明 |
|------|------|
| `-v` | 详细模式，显示符号版本信息 |
| `-u` | 显示未使用的直接依赖 |
| `-d` | 执行数据重定位并报告缺失的函数 |
| `-r` | 执行数据和函数重定位并报告缺失的内容 |

## 使用示例

### 查看程序依赖的共享库

```bash
$ ldd /bin/ls
    linux-vdso.so.1 (0x00007ffe12345000)
    libselinux.so.1 => /lib/x86_64-linux-gnu/libselinux.so.1 (0x00007f1234500000)
    libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f1234000000)
    libpcre2-8.so.0 => /lib/x86_64-linux-gnu/libpcre2-8.so.0 (0x00007f1233c00000)
    /lib64/ld-linux-x86-64.so.2 (0x00007f1234900000)
```

### 检查 Nginx 依赖

```bash
$ ldd /usr/sbin/nginx
    linux-vdso.so.1 (0x00007ffe12345000)
    libcrypt.so.1 => /lib/x86_64-linux-gnu/libcrypt.so.1 (0x00007f1234500000)
    libpcre.so.3 => /lib/x86_64-linux-gnu/libpcre.so.3 (0x00007f1234000000)
    libssl.so.1.1 => /lib/x86_64-linux-gnu/libssl.so.1.1 (0x00007f1233c00000)
    libcrypto.so.1.1 => /lib/x86_64-linux-gnu/libcrypto.so.1.1 (0x00007f1233000000)
    libz.so.1 => /lib/x86_64-linux-gnu/libz.so.1 (0x00007f1232c00000)
```

### 查看详细依赖信息

```bash
$ ldd -v /bin/ls
```

### 检查缺失的依赖库

当输出中出现 `not found` 时，表示对应的依赖库缺失：

```bash
$ ldd ./myapp
    libsomething.so.1 => not found
```

## 输出说明

输出格式为：`库名 => 路径 (地址)`

| 状态 | 说明 |
|------|------|
| `=> /path/to/lib.so` | 依赖库已找到，显示完整路径 |
| `=> not found` | 依赖库缺失，程序无法运行 |
| `linux-vdso.so.1` | 内核提供的虚拟动态共享库，无路径 |

## 实用场景

### 排查程序无法启动的依赖问题

```bash
$ ldd /usr/local/bin/myapp | grep "not found"
    libmysqlclient.so.18 => not found
```

### 查看所有依赖库的版本

```bash
$ ldd -v /usr/bin/python3
```

## 注意事项

- `ldd` 会执行目标文件来获取依赖信息，对于不可信文件，建议使用 `objdump -p` 或 `readelf -d` 替代
- `ldd` 的输出结果依赖于当前的 `LD_LIBRARY_PATH` 和 `/etc/ld.so.conf` 配置

## 参考

- `man ldd` — 查看完整帮助文档
- `ldconfig` — 配置动态链接库缓存
- `objdump` — 二进制文件分析工具