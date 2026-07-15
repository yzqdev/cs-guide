# nm — 目标文件符号分析

`nm` 命令用于列出目标文件（可执行文件、静态库、共享库等）中的符号表信息。符号表包含了函数、全局变量、静态变量等标识符的信息，常用于分析程序结构和解决链接问题。

## 命令格式

```bash
nm [选项] 文件
```

## 常用参数

| 参数 | 说明 |
|------|------|
| `-A` | 显示完整文件名 |
| `-C` | 解码 C++ 符号名（demangle） |
| `-D` | 显示动态符号 |
| `-g` | 仅显示全局（外部）符号 |
| `-u` | 仅显示未定义符号 |
| `-l` | 显示符号所在的源代码行号（需调试信息）|
| `-n` | 按地址排序 |
| `-r` | 逆序排序 |
| `--size-sort` | 按大小排序 |

## 符号类型

| 类型 | 说明 |
|------|------|
| `A` | 绝对值（Absolute） |
| `B` / `b` | 未初始化数据段（BSS） |
| `D` / `d` | 已初始化数据段（Data） |
| `T` / `t` | 代码段（Text） |
| `R` / `r` | 只读数据段（Read-only） |
| `U` | 未定义符号（Undefined） |
| `W` / `w` | 弱符号（Weak） |
| `C` | 未初始化公共符号 |

大写字母表示全局符号，小写字母表示局部符号。

## 使用示例

### 列出目标文件的所有符号

```bash
$ nm /usr/bin/ls
00000000004a1b20 B acl_names
00000000004a2b40 D acl_names_opt
0000000000423c00 T main
000000000041f000 T print_file
                 U printf@@GLIBC_2.2.5
```

### 仅显示全局符号

```bash
$ nm -g /usr/lib/libc.a | head -10
```

### 解码 C++ 符号名

```bash
$ nm -C myapp.o
0000000000000000 T MyClass::myMethod()
```

### 显示动态符号（共享库）

```bash
$ nm -D /usr/lib/libpthread.so
```

### 按地址排序

```bash
$ nm -n /usr/bin/ls | head -10
```

### 查看未定义符号（需要链接的库）

```bash
$ nm -u myapp.o
         U printf
         U malloc
         U free
```

## 实用场景

### 检查函数是否在库中定义

```bash
$ nm /usr/lib/libc.a | grep "T printf"
0000000000000000 T printf
```

### 查看静态库中的符号

```bash
$ nm /usr/local/lib/libmyapp.a
```

### 对比两个文件的符号差异

```bash
$ nm -g lib1.a | sort > lib1.sym
$ nm -g lib2.a | sort > lib2.sym
$ diff lib1.sym lib2.sym
```

## 参考

- `man nm` — 查看完整帮助文档
- `objdump` — 更详细的二进制文件分析
- `readelf` — ELF 文件格式分析