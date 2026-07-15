# size — 查看程序内存映像大小

`size` 命令用于显示目标文件（可执行文件、共享库等）中各段（Section）的大小，包括代码段（text）、数据段（data）、BSS 段（bss）以及总大小。该工具主要用于分析程序的内存占用分布。

## 命令格式

```bash
size [选项] 文件
```

## 常用参数

| 参数 | 说明 |
|------|------|
| `-A` | 以 System V 格式显示 |
| `-B` | 以 Berkeley 格式显示（默认）|
| `-d` | 以十进制显示（默认）|
| `-o` | 以八进制显示 |
| `-x` | 以十六进制显示 |
| `-t` | 显示总计行 |

## 使用示例

### 查看程序各段大小

```bash
$ size a.out
   text    data     bss     dec     hex filename
   1146     256       8    1410     582 a.out
```

### 以 System V 格式显示

```bash
$ size -A a.out
a.out  :
section           size      addr
.text             1146   0x4004ed
.data              256   0x4a1b20
.bss                 8   0x4a2b40
Total             1410
```

### 以十六进制显示

```bash
$ size -x a.out
   text    data     bss     dec     hex filename
   47a     100       8     582     582 a.out
```

## 输出说明

| 段 | 说明 |
|----|------|
| `text` | 代码段，存放程序的可执行指令 |
| `data` | 数据段，存放已初始化的全局变量和静态变量 |
| `bss` | BSS 段，存放未初始化的全局变量和静态变量 |
| `dec` | 十进制总和 |
| `hex` | 十六进制总和 |

## 参考

- `man size` — 查看完整帮助文档
- `nm` — 符号查看工具
- `objdump` — 二进制文件分析