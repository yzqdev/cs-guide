# readelf — ELF 文件格式分析

`readelf` 用于显示 ELF（Executable and Linkable Format）格式文件的详细信息。与 `objdump` 相比，`readelf` 不依赖 BFD 库，显示的信息更为底层和具体，是分析 ELF 文件结构的标准工具。

## 命令格式

```bash
readelf [选项] 文件
```

## 常用参数

| 参数 | 说明 |
|------|------|
| `-h` | 显示 ELF 文件头 |
| `-l` | 显示程序头（段）|
| `-S` | 显示节头（Section） |
| `-s` | 显示符号表 |
| `-d` | 显示动态段信息 |
| `-r` | 显示重定位信息 |
| `-n` | 显示注释信息 |
| `-a` | 显示所有信息 |
| `-e` | 显示全部头信息 |

## 使用示例

### 显示 ELF 文件头

```bash
$ readelf -h a.out
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              EXEC (Executable file)
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x400430
  Start of program headers:          64 (bytes into file)
  Start of section headers:          4412 (bytes into file)
  Size of this header:               64 (bytes)
  Size of program headers:           56 (bytes)
  Number of program headers:         9
  Size of section headers:           64 (bytes)
  Number of section headers:         30
  Section header string table index: 27
```

### 显示程序头（段）

```bash
$ readelf -l a.out
```

### 显示节头（Section）

```bash
$ readelf -S a.out
```

### 显示符号表

```bash
$ readelf -s a.out
```

### 显示动态段信息

```bash
$ readelf -d /usr/lib/libc.so
```

### 显示所有信息

```bash
$ readelf -a a.out
```

### 查看调试信息

```bash
$ readelf --debug-dump a.out | more
```

## 实用场景

### 检查文件是否为 ELF 格式

```bash
$ readelf -h /bin/ls | grep "Class"
  Class:                             ELF64
```

### 查看程序的入口点

```bash
$ readelf -h a.out | grep "Entry"
  Entry point address:               0x400430
```

### 分析库的依赖关系

```bash
$ readelf -d /usr/bin/python3 | grep NEEDED
 0x0000000000000001 (NEEDED)  Shared library: [libpython3.8.so.1.0]
 0x0000000000000001 (NEEDED)  Shared library: [libc.so.6]
```

## 参考

- `man readelf` — 查看完整帮助文档
- `objdump` — 二进制文件分析工具
- `nm` — 符号查看工具