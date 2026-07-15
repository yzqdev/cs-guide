# objdump — 二进制文件分析

`objdump` 是一种用于显示二进制文件（目标文件、可执行文件、共享库）信息的工具。它可以将机器码反汇编为汇编指令，查看段信息、符号表、重定位表等内容，是底层程序分析和逆向工程的重要工具。

## 命令格式

```bash
objdump [选项] 文件
```

## 常用参数

| 参数 | 说明 |
|------|------|
| `-d` | 反汇编可执行代码段 |
| `-D` | 反汇编所有段 |
| `-S` | 反汇编时显示源代码（需调试信息） |
| `-t` | 显示符号表 |
| `-T` | 显示动态符号表 |
| `-r` | 显示重定位信息 |
| `-R` | 显示动态重定位信息 |
| `-s` | 以十六进制显示段内容 |
| `-p` | 显示特定 ELF 段信息 |
| `-h` | 显示段头信息 |
| `-x` | 显示所有头信息 |

## 使用示例

### 反汇编代码段

```bash
$ objdump -d a.out

a.out:     file format elf64-x86-64

Disassembly of section .text:

00000000004004ed <main>:
  4004ed:   55                      push   %rbp
  4004ee:   48 89 e5                mov    %rsp,%rbp
  4004f1:   bf 10 06 40 00          mov    $0x400610,%edi
  4004f6:   e8 d5 fe ff ff          callq  4003d0 <puts@plt>
  4004fb:   5d                      pop    %rbp
  4004fc:   c3                      retq
```

### 反汇编并显示源代码

```bash
$ objdump -S a.out
```

### 显示符号表

```bash
$ objdump -t a.out
```

### 显示动态符号表

```bash
$ objdump -T /usr/lib/libc.so | head -20
```

### 显示段头信息

```bash
$ objdump -h a.out
```

### 以十六进制显示段内容

```bash
$ objdump -s -j .rodata a.out
```

### 显示重定位信息

```bash
$ objdump -r a.out
```

## 实用场景

### 查看程序入口点

```bash
$ objdump -f a.out
a.out:     file format elf64-x86-64
architecture: i386:x86-64, flags 0x00000112:
START_HEADER, EXEC_P, HAS_SYMS
start address 0x0000000000400430
```

### 分析库的版本信息

```bash
$ objdump -p /usr/lib/libc.so | grep "GLIBC"
```

## 参考

- `man objdump` — 查看完整帮助文档
- `readelf` — ELF 文件格式分析
- `nm` — 符号查看工具