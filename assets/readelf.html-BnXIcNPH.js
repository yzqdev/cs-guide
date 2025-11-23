import{_ as n,c as t,a as i,o as a}from"./app-B6vXTniy.js";const r={};function s(o,e){return a(),t("div",null,[...e[0]||(e[0]=[i(`<h1 id="readelf-elf文件格式分析" tabindex="-1"><a class="header-anchor" href="#readelf-elf文件格式分析"><span>readelf elf文件格式分析</span></a></h1><p>这个工具和objdump命令提供的功能类似，但是它显示的信息更为具体，并且它不依赖BFD库(BFD库是一个GNU项目，它的目标就是希望通过一种统一的接口来处理不同的目标文件）；</p><p><strong>ELF文件类型</strong></p><p>: ELF(Executable and Linking Format)是一种对象文件的格式，用于定义不同类型的对象文件(Object files)中都放了什么东西、以及都以什么样的格式去放这些东西。它自最早在 System V 系统上出现后，被 xNIX 世界所广泛接受，作为缺省的二进制文件格式来使用。可以说，ELF是构成众多xNIX系统的基础之一。</p><p>ELF文件有三种类型：</p><ol><li></li></ol><pre><code>可重定位的对象文件(Relocatable file)

:   由汇编器汇编生成的 .o 文件
</code></pre><ol start="2"><li></li></ol><pre><code>可执行的对象文件(Executable file)

:   可执行应用程序
</code></pre><ol start="3"><li></li></ol><pre><code>可被共享的对象文件(Shared object file)

:   动态库文件，也即 .so 文件
</code></pre><ul><li>.text section 里装载了可执行代码；</li><li>.data section 里面装载了被初始化的数据；</li><li>.bss section 里面装载了未被初始化的数据；</li><li>以 .rec 打头的 sections 里面装载了重定位条目；</li><li>.symtab 或者 .dynsym section 里面装载了符号信息；</li><li>.strtab 或者 .dynstr section 里面装载了字符串信息；</li></ul><h2 id="参数说明" tabindex="-1"><a class="header-anchor" href="#参数说明"><span>参数说明</span></a></h2><ul><li>-a --all 全部 Equivalent to: -h -l -S -s -r -d -V -A -I</li><li>-h --file-header 文件头 Display the ELF file header</li><li>-l --program-headers 程序 Display the program headers</li><li>--segments An alias for --program-headers</li><li>-S --section-headers 段头 Display the sections&#39; header</li><li>--sections An alias for --section-headers</li><li>-e --headers 全部头 Equivalent to: -h -l -S</li><li>-s --syms 符号表 Display the symbol table</li><li>--symbols An alias for --syms</li><li>-n --notes 内核注释 Display the core notes (if present)</li><li>-r --relocs 重定位 Display the relocations (if present)</li><li>-u --unwind Display the unwind info (if present)</li><li>-d --dynamic 动态段 Display the dynamic segment (if present)</li><li>-V --version-info 版本 Display the version sections (if present)</li><li>-A --arch-specific CPU构架 Display architecture specific information (if any).</li><li>-D --use-dynamic 动态段 Use the dynamic section info when displaying symbols</li><li>-x --hex-dump=&lt;number&gt; 显示 段内内容Dump the contents of section &lt;number&gt;</li><li>-w[liaprmfFso] or</li><li>-I --histogram Display histogram of bucket list lengths</li><li>-W --wide 宽行输出 Allow output width to exceed 80 characters</li><li>-H --help Display this information</li><li>-v --version Display the version number of readelf</li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>想知道一个应用程序的可运行的架构平台:</p><pre><code>$readelf -h main| grep Machine
</code></pre><p>-h选项将显示文件头的概要信息，从里面可以看到，有很多有用的信息：</p><pre><code>$readelf -h main
ELF Header:
Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
Class:                             ELF64
Data:                              2 s complement, little endian
Version:                           1 (current)
OS/ABI:                            UNIX - System V
ABI Version:                       0
Type:                              EXEC (Executable file)
Machine:                           Advanced Micro Devices X86-64
Version:                           0x1
Entry point address:               0x400790
Start of program headers:          64 (bytes into file)
Start of section headers:          5224 (bytes into file)
Flags:                             0x0
Size of this header:               64 (bytes)
Size of program headers:           56 (bytes)
Number of program headers:         8
Size of section headers:           64 (bytes)
Number of section headers:         29
Section header string table index: 26
</code></pre><p>一个编译好的应用程序，想知道其编译时是否使用了-g选项（加入调试信息）:</p><pre><code>$readelf -S main| grep debug
</code></pre><p>用-S选项是显示所有段信息；如果编译时使用了-g选项，则会有debug段;</p><p>查看.o文件是否编入了调试信息（编译的时候是否加了-g):</p><pre><code>$readelf -S Shpos.o | grep debug
</code></pre><h2 id="完整输出" tabindex="-1"><a class="header-anchor" href="#完整输出"><span>完整输出</span></a></h2><p>readelf输出的完整内容:</p><pre><code>$readelf -all a.out
ELF Header:
  Magic:   7f 45 4c 46 01 01 01 00 00 00 00 00 00 00 00 00 
  Class:                             ELF32
  Data:                              2&#39;s complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              EXEC (Executable file)
  Machine:                           Intel 80386
  Version:                           0x1
  Entry point address:               0x8048330
  Start of program headers:          52 (bytes into file)
  Start of section headers:          4412 (bytes into file)
  Flags:                             0x0
  Size of this header:               52 (bytes)
  Size of program headers:           32 (bytes)
  Number of program headers:         9
  Size of section headers:           40 (bytes)
  Number of section headers:         30
  Section header string table index: 27

Section Headers:
  [Nr] Name              Type            Addr     Off    Size   ES Flg Lk Inf Al
  [ 0]                   NULL            00000000 000000 000000 00      0   0  0
  [ 1] .interp           PROGBITS        08048154 000154 000013 00   A  0   0  1
  [ 2] .note.ABI-tag     NOTE            08048168 000168 000020 00   A  0   0  4
  [ 3] .note.gnu.build-i NOTE            08048188 000188 000024 00   A  0   0  4
  [ 4] .gnu.hash         GNU_HASH        080481ac 0001ac 000020 04   A  5   0  4
  [ 5] .dynsym           DYNSYM          080481cc 0001cc 000050 10   A  6   1  4
  [ 6] .dynstr           STRTAB          0804821c 00021c 00004c 00   A  0   0  1
  [ 7] .gnu.version      VERSYM          08048268 000268 00000a 02   A  5   0  2
  [ 8] .gnu.version_r    VERNEED         08048274 000274 000020 00   A  6   1  4
  [ 9] .rel.dyn          REL             08048294 000294 000008 08   A  5   0  4
  [10] .rel.plt          REL             0804829c 00029c 000018 08   A  5  12  4
  [11] .init             PROGBITS        080482b4 0002b4 00002e 00  AX  0   0  4
  [12] .plt              PROGBITS        080482f0 0002f0 000040 04  AX  0   0 16
  [13] .text             PROGBITS        08048330 000330 00018c 00  AX  0   0 16
  [14] .fini             PROGBITS        080484bc 0004bc 00001a 00  AX  0   0  4
  [15] .rodata           PROGBITS        080484d8 0004d8 000011 00   A  0   0  4
  [16] .eh_frame_hdr     PROGBITS        080484ec 0004ec 000034 00   A  0   0  4
  [17] .eh_frame         PROGBITS        08048520 000520 0000c4 00   A  0   0  4
  [18] .ctors            PROGBITS        08049f14 000f14 000008 00  WA  0   0  4
  [19] .dtors            PROGBITS        08049f1c 000f1c 000008 00  WA  0   0  4
  [20] .jcr              PROGBITS        08049f24 000f24 000004 00  WA  0   0  4
  [21] .dynamic          DYNAMIC         08049f28 000f28 0000c8 08  WA  6   0  4
  [22] .got              PROGBITS        08049ff0 000ff0 000004 04  WA  0   0  4
  [23] .got.plt          PROGBITS        08049ff4 000ff4 000018 04  WA  0   0  4
  [24] .data             PROGBITS        0804a00c 00100c 000008 00  WA  0   0  4
  [25] .bss              NOBITS          0804a014 001014 000008 00  WA  0   0  4
  [26] .comment          PROGBITS        00000000 001014 00002a 01  MS  0   0  1
  [27] .shstrtab         STRTAB          00000000 00103e 0000fc 00      0   0  1
  [28] .symtab           SYMTAB          00000000 0015ec 000410 10     29  45  4
  [29] .strtab           STRTAB          00000000 0019fc 0001f9 00      0   0  1
Key to Flags:
  W (write), A (alloc), X (execute), M (merge), S (strings)
  I (info), L (link order), G (group), T (TLS), E (exclude), x (unknown)
  O (extra OS processing required) o (OS specific), p (processor specific)

There are no section groups in this file.

Program Headers:
  Type           Offset   VirtAddr   PhysAddr   FileSiz MemSiz  Flg Align
  PHDR           0x000034 0x08048034 0x08048034 0x00120 0x00120 R E 0x4
  INTERP         0x000154 0x08048154 0x08048154 0x00013 0x00013 R   0x1
      [Requesting program interpreter: /lib/ld-linux.so.2]
  LOAD           0x000000 0x08048000 0x08048000 0x005e4 0x005e4 R E 0x1000
  LOAD           0x000f14 0x08049f14 0x08049f14 0x00100 0x00108 RW  0x1000
  DYNAMIC        0x000f28 0x08049f28 0x08049f28 0x000c8 0x000c8 RW  0x4
  NOTE           0x000168 0x08048168 0x08048168 0x00044 0x00044 R   0x4
  GNU_EH_FRAME   0x0004ec 0x080484ec 0x080484ec 0x00034 0x00034 R   0x4
  GNU_STACK      0x000000 0x00000000 0x00000000 0x00000 0x00000 RW  0x4
  GNU_RELRO      0x000f14 0x08049f14 0x08049f14 0x000ec 0x000ec R   0x1

 Section to Segment mapping:
  Segment Sections...
   00     
   01     .interp 
   02     .interp .note.ABI-tag .note.gnu.build-id .gnu.hash .dynsym .dynstr .gnu.version .gnu.version_r .rel.dyn .rel.plt .init .plt .text .fini .rodata .eh_frame_hdr .eh_frame 
   03     .ctors .dtors .jcr .dynamic .got .got.plt .data .bss 
   04     .dynamic 
   05     .note.ABI-tag .note.gnu.build-id 
   06     .eh_frame_hdr 
   07     
   08     .ctors .dtors .jcr .dynamic .got 

Dynamic section at offset 0xf28 contains 20 entries:
  Tag        Type                         Name/Value
 0x00000001 (NEEDED)                     Shared library: [libc.so.6]
 0x0000000c (INIT)                       0x80482b4
 0x0000000d (FINI)                       0x80484bc
 0x6ffffef5 (GNU_HASH)                   0x80481ac
 0x00000005 (STRTAB)                     0x804821c
 0x00000006 (SYMTAB)                     0x80481cc
 0x0000000a (STRSZ)                      76 (bytes)
 0x0000000b (SYMENT)                     16 (bytes)
 0x00000015 (DEBUG)                      0x0
 0x00000003 (PLTGOT)                     0x8049ff4
 0x00000002 (PLTRELSZ)                   24 (bytes)
 0x00000014 (PLTREL)                     REL
 0x00000017 (JMPREL)                     0x804829c
 0x00000011 (REL)                        0x8048294
 0x00000012 (RELSZ)                      8 (bytes)
 0x00000013 (RELENT)                     8 (bytes)
 0x6ffffffe (VERNEED)                    0x8048274
 0x6fffffff (VERNEEDNUM)                 1
 0x6ffffff0 (VERSYM)                     0x8048268
 0x00000000 (NULL)                       0x0

Relocation section &#39;.rel.dyn&#39; at offset 0x294 contains 1 entries:
 Offset     Info    Type            Sym.Value  Sym. Name
08049ff0  00000206 R_386_GLOB_DAT    00000000   __gmon_start__

Relocation section &#39;.rel.plt&#39; at offset 0x29c contains 3 entries:
 Offset     Info    Type            Sym.Value  Sym. Name
0804a000  00000107 R_386_JUMP_SLOT   00000000   printf
0804a004  00000207 R_386_JUMP_SLOT   00000000   __gmon_start__
0804a008  00000307 R_386_JUMP_SLOT   00000000   __libc_start_main

There are no unwind sections in this file.

Symbol table &#39;.dynsym&#39; contains 5 entries:
   Num:    Value  Size Type    Bind   Vis      Ndx Name
     0: 00000000     0 NOTYPE  LOCAL  DEFAULT  UND 
     1: 00000000     0 FUNC    GLOBAL DEFAULT  UND printf@GLIBC_2.0 (2)
     2: 00000000     0 NOTYPE  WEAK   DEFAULT  UND __gmon_start__
     3: 00000000     0 FUNC    GLOBAL DEFAULT  UND __libc_start_main@GLIBC_2.0 (2)
     4: 080484dc     4 OBJECT  GLOBAL DEFAULT   15 _IO_stdin_used

Symbol table &#39;.symtab&#39; contains 65 entries:
   Num:    Value  Size Type    Bind   Vis      Ndx Name
     0: 00000000     0 NOTYPE  LOCAL  DEFAULT  UND 
     1: 08048154     0 SECTION LOCAL  DEFAULT    1 
     2: 08048168     0 SECTION LOCAL  DEFAULT    2 
     3: 08048188     0 SECTION LOCAL  DEFAULT    3 
     4: 080481ac     0 SECTION LOCAL  DEFAULT    4 
     5: 080481cc     0 SECTION LOCAL  DEFAULT    5 
     6: 0804821c     0 SECTION LOCAL  DEFAULT    6 
     7: 08048268     0 SECTION LOCAL  DEFAULT    7 
     8: 08048274     0 SECTION LOCAL  DEFAULT    8 
     9: 08048294     0 SECTION LOCAL  DEFAULT    9 
    10: 0804829c     0 SECTION LOCAL  DEFAULT   10 
    11: 080482b4     0 SECTION LOCAL  DEFAULT   11 
    12: 080482f0     0 SECTION LOCAL  DEFAULT   12 
    13: 08048330     0 SECTION LOCAL  DEFAULT   13 
    14: 080484bc     0 SECTION LOCAL  DEFAULT   14 
    15: 080484d8     0 SECTION LOCAL  DEFAULT   15 
    16: 080484ec     0 SECTION LOCAL  DEFAULT   16 
    17: 08048520     0 SECTION LOCAL  DEFAULT   17 
    18: 08049f14     0 SECTION LOCAL  DEFAULT   18 
    19: 08049f1c     0 SECTION LOCAL  DEFAULT   19 
    20: 08049f24     0 SECTION LOCAL  DEFAULT   20 
    21: 08049f28     0 SECTION LOCAL  DEFAULT   21 
    22: 08049ff0     0 SECTION LOCAL  DEFAULT   22 
    23: 08049ff4     0 SECTION LOCAL  DEFAULT   23 
    24: 0804a00c     0 SECTION LOCAL  DEFAULT   24 
    25: 0804a014     0 SECTION LOCAL  DEFAULT   25 
    26: 00000000     0 SECTION LOCAL  DEFAULT   26 
    27: 00000000     0 FILE    LOCAL  DEFAULT  ABS crtstuff.c
    28: 08049f14     0 OBJECT  LOCAL  DEFAULT   18 __CTOR_LIST__
    29: 08049f1c     0 OBJECT  LOCAL  DEFAULT   19 __DTOR_LIST__
    30: 08049f24     0 OBJECT  LOCAL  DEFAULT   20 __JCR_LIST__
    31: 08048360     0 FUNC    LOCAL  DEFAULT   13 __do_global_dtors_aux
    32: 0804a014     1 OBJECT  LOCAL  DEFAULT   25 completed.6086
    33: 0804a018     4 OBJECT  LOCAL  DEFAULT   25 dtor_idx.6088
    34: 080483c0     0 FUNC    LOCAL  DEFAULT   13 frame_dummy
    35: 00000000     0 FILE    LOCAL  DEFAULT  ABS crtstuff.c
    36: 08049f18     0 OBJECT  LOCAL  DEFAULT   18 __CTOR_END__
    37: 080485e0     0 OBJECT  LOCAL  DEFAULT   17 __FRAME_END__
    38: 08049f24     0 OBJECT  LOCAL  DEFAULT   20 __JCR_END__
    39: 08048490     0 FUNC    LOCAL  DEFAULT   13 __do_global_ctors_aux
    40: 00000000     0 FILE    LOCAL  DEFAULT  ABS a.c
    41: 08049f14     0 NOTYPE  LOCAL  DEFAULT   18 __init_array_end
    42: 08049f28     0 OBJECT  LOCAL  DEFAULT   21 _DYNAMIC
    43: 08049f14     0 NOTYPE  LOCAL  DEFAULT   18 __init_array_start
    44: 08049ff4     0 OBJECT  LOCAL  DEFAULT   23 _GLOBAL_OFFSET_TABLE_
    45: 08048480     2 FUNC    GLOBAL DEFAULT   13 __libc_csu_fini
    46: 08048482     0 FUNC    GLOBAL HIDDEN    13 __i686.get_pc_thunk.bx
    47: 0804a00c     0 NOTYPE  WEAK   DEFAULT   24 data_start
    48: 00000000     0 FUNC    GLOBAL DEFAULT  UND printf@@GLIBC_2.0
    49: 0804a014     0 NOTYPE  GLOBAL DEFAULT  ABS _edata
    50: 080484bc     0 FUNC    GLOBAL DEFAULT   14 _fini
    51: 08049f20     0 OBJECT  GLOBAL HIDDEN    19 __DTOR_END__
    52: 0804a00c     0 NOTYPE  GLOBAL DEFAULT   24 __data_start
    53: 00000000     0 NOTYPE  WEAK   DEFAULT  UND __gmon_start__
    54: 0804a010     0 OBJECT  GLOBAL HIDDEN    24 __dso_handle
    55: 080484dc     4 OBJECT  GLOBAL DEFAULT   15 _IO_stdin_used
    56: 00000000     0 FUNC    GLOBAL DEFAULT  UND __libc_start_main@@GLIBC_
    57: 08048410    97 FUNC    GLOBAL DEFAULT   13 __libc_csu_init
    58: 0804a01c     0 NOTYPE  GLOBAL DEFAULT  ABS _end
    59: 08048330     0 FUNC    GLOBAL DEFAULT   13 _start
    60: 080484d8     4 OBJECT  GLOBAL DEFAULT   15 _fp_hw
    61: 0804a014     0 NOTYPE  GLOBAL DEFAULT  ABS __bss_start
    62: 080483e4    40 FUNC    GLOBAL DEFAULT   13 main
    63: 00000000     0 NOTYPE  WEAK   DEFAULT  UND _Jv_RegisterClasses
    64: 080482b4     0 FUNC    GLOBAL DEFAULT   11 _init

Histogram for \`.gnu.hash&#39; bucket list length (total of 2 buckets):
 Length  Number     % of total  Coverage
      0  1          ( 50.0%)
      1  1          ( 50.0%)    100.0%

Version symbols section &#39;.gnu.version&#39; contains 5 entries:
 Addr: 0000000008048268  Offset: 0x000268  Link: 5 (.dynsym)
  000:   0 (*local*)       2 (GLIBC_2.0)     0 (*local*)       2 (GLIBC_2.0)  
  004:   1 (*global*)   

Version needs section &#39;.gnu.version_r&#39; contains 1 entries:
 Addr: 0x0000000008048274  Offset: 0x000274  Link: 6 (.dynstr)
  000000: Version: 1  File: libc.so.6  Cnt: 1
  0x0010:   Name: GLIBC_2.0  Flags: none  Version: 2

Notes at offset 0x00000168 with length 0x00000020:
  Owner                 Data size   Description
  GNU                  0x00000010   NT_GNU_ABI_TAG (ABI version tag)
    OS: Linux, ABI: 2.6.15

Notes at offset 0x00000188 with length 0x00000024:
  Owner                 Data size   Description
  GNU                  0x00000014   NT_GNU_BUILD_ID (unique build ID bitstring)
    Build ID: 17fb9651029b6a8543bfafec9eea23bd16454e65
</code></pre><p>关于ELF文件格式的参考：<a href="http://www.cnblogs.com/xmphoenix/archive/2011/10/23/2221879.html" target="_blank" rel="noopener noreferrer">http://www.cnblogs.com/xmphoenix/archive/2011/10/23/2221879.html</a></p>`,28)])])}const L=n(r,[["render",s]]),c=JSON.parse('{"path":"/linux-tutor/tool/readelf.html","title":"readelf elf文件格式分析","lang":"zh-CN","frontmatter":{"description":"readelf elf文件格式分析 这个工具和objdump命令提供的功能类似，但是它显示的信息更为具体，并且它不依赖BFD库(BFD库是一个GNU项目，它的目标就是希望通过一种统一的接口来处理不同的目标文件）； ELF文件类型 : ELF(Executable and Linking Format)是一种对象文件的格式，用于定义不同类型的对象文件(O...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"readelf elf文件格式分析\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/tool/readelf.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"readelf elf文件格式分析"}],["meta",{"property":"og:description","content":"readelf elf文件格式分析 这个工具和objdump命令提供的功能类似，但是它显示的信息更为具体，并且它不依赖BFD库(BFD库是一个GNU项目，它的目标就是希望通过一种统一的接口来处理不同的目标文件）； ELF文件类型 : ELF(Executable and Linking Format)是一种对象文件的格式，用于定义不同类型的对象文件(O..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":7.64,"words":2293},"filePathRelative":"linux-tutor/tool/readelf.md","autoDesc":true}');export{L as comp,c as data};
