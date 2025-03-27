import{_ as t,c as n,a as i,o as l}from"./app-C8DxhDIZ.js";const a={};function o(r,e){return l(),n("div",null,e[0]||(e[0]=[i(`<h1 id="nm-目标文件格式分析" tabindex="-1"><a class="header-anchor" href="#nm-目标文件格式分析"><span>nm 目标文件格式分析</span></a></h1><p>nm 命令显示关于指定 File 中符号的信息，文件可以是对象文件、可执行文件或对象文件库。如果文件没有包含符号信息，nm 命令报告该情况，但不把它解释为出错条件。 nm 命令缺省情况下报告十进制符号表示法下的数字值。</p><pre><code>$nm myProgrammer
08049f28 d _DYNAMIC
08049ff4 d _GLOBAL_OFFSET_TABLE_
080484dc R _IO_stdin_used
         w _Jv_RegisterClasses
08049f18 d __CTOR_END__
08049f14 d __CTOR_LIST__
08049f20 D __DTOR_END__
08049f1c d __DTOR_LIST__
080485e0 r __FRAME_END__
08049f24 d __JCR_END__
08049f24 d __JCR_LIST__
0804a014 A __bss_start
0804a00c D __data_start
08048490 t __do_global_ctors_aux
08048360 t __do_global_dtors_aux
0804a010 D __dso_handle
         w __gmon_start__
08048482 T __i686.get_pc_thunk.bx
08049f14 d __init_array_end
08049f14 d __init_array_start
08048480 T __libc_csu_fini
08048410 T __libc_csu_init
         U __libc_start_main@@GLIBC_2.0
0804a014 A _edata
0804a01c A _end
080484bc T _fini
080484d8 R _fp_hw
080482b4 T _init
08048330 T _start
0804a014 b completed.6086
0804a00c W data_start
0804a018 b dtor_idx.6088
080483c0 t frame_dummy
080483e4 T main
         U printf@@GLIBC_2.0
</code></pre><p>这些包含可执行代码的段称为正文段。同样地，数据段包含了不可执行的信息或数据。另一种类型的段，称为 BSS 段，它包含以符号数据开头的块。对于 nm 命令列出的每个符号，它们的值使用十六进制来表示（缺省行为），并且在该符号前面加上了一个表示符号类型的编码字符。</p><p>可以将目标文件中所包含的不同的部分划分为段。段可以包含可执行代码、符号名称、初始数据值和许多其他类型的数据。有关这些类型的数据的详细信息，可以阅读 UNIX 中 nm 的 man 页面，其中按照该命令输出中的字符编码分别对每种类型进行了描述。</p><h2 id="选项说明" tabindex="-1"><a class="header-anchor" href="#选项说明"><span>选项说明</span></a></h2><ul><li>-a或--debug-syms：显示所有的符号，包括debugger-only symbols。</li><li>-B：等同于--format=bsd，用来兼容MIPS的nm。</li><li>-C或--demangle：将低级符号名解析(demangle)成用户级名字。这样可以使得C++函数名具有可读性。</li><li>--no-demangle：默认的选项，不需要将低级符号名解析成用户级名。</li><li>-D或--dynamic：显示动态符号。该任选项仅对于动态目标(例如特定类型的共享库)有意义。</li><li>-f format：使用format格式输出。format可以选取bsd、sysv或posix，该选项在GNU的nm中有用。默认为bsd。</li><li>-g或--extern-only：仅显示外部符号。</li><li>-n、-v或--numeric-sort：按符号对应地址的顺序排序，而非按符号名的字符顺序。</li><li>-p或--no-sort：按目标文件中遇到的符号顺序显示，不排序。</li><li>-P或--portability：使用POSIX.2标准输出格式代替默认的输出格式。等同于使用任选项-f posix。</li><li>-s或--print-armap：当列出库中成员的符号时，包含索引。索引的内容包含：哪些模块包含哪些名字的映射。</li><li>-r或--reverse-sort：反转排序的顺序(例如，升序变为降序)。</li><li>--size-sort：按大小排列符号顺序。该大小是按照一个符号的值与它下一个符号的值进行计算的。</li><li>--target=bfdname：指定一个目标代码的格式，而非使用系统的默认格式。</li><li>-u或--undefined-only：仅显示没有定义的符号(那些外部符号)。</li><li>--defined-only:仅显示定义的符号。</li><li>-l或--line-numbers：对每个符号，使用调试信息来试图找到文件名和行号。</li><li>-V或--version：显示nm的版本号。</li><li>--help：显示nm的选项。</li></ul><h2 id="符号说明" tabindex="-1"><a class="header-anchor" href="#符号说明"><span>符号说明</span></a></h2><p>对于每一个符号来说，其类型如果是小写的，则表明该符号是local的；大写则表明该符号是global(external)的。</p><ul><li><p>A 该符号的值是绝对的，在以后的链接过程中，不允许进行改变。这样的符号值，常常出现在中断向量表中，例如用符号来表示各个中断向量函数在中断向量表中的位置。</p></li><li><p>B 该符号的值出现在非初始化数据段(bss)中。例如，在一个文件中定义全局static int test。则该符号test的类型为b，位于bss section中。其值表示该符号在bss段中的偏移。一般而言，bss段分配于RAM中。</p></li><li><p>C 该符号为common。common symbol是未初始话数据段。该符号没有包含于一个普通section中。只有在链接过程中才进行分配。符号的值表示该符号需要的字节数。例如在一个c文件中，定义int test，并且该符号在别的地方会被引用，则该符号类型即为C。否则其类型为B。</p></li><li></li></ul><pre><code>D 该符号位于初始化数据段中。一般来说，分配到data section中。

:   例如：定义全局int baud_table\\[5\\] = {9600, 19200, 38400, 57600,
    115200}，会分配到初始化数据段中。
</code></pre><ul><li><p>G 该符号也位于初始化数据段中。主要用于small object提高访问small data object的一种方式。</p></li><li><p>I 该符号是对另一个符号的间接引用。</p></li><li><p>N 该符号是一个debugging符号。</p></li><li></li></ul><pre><code>R 该符号位于只读数据区。

:   -   例如定义全局const int test\\[\\] = {123,
        123};则test就是一个只读数据区的符号。
    -   值得注意的是，如果在一个函数中定义const char \\*test =
        \\&quot;abc\\&quot;, const char test_int =
        3。使用nm都不会得到符号信息，但是字符串\\&quot;abc\\&quot;分配于只读存储器中，test在rodata
        section中，大小为4。
</code></pre><ul><li><p>S 符号位于非初始化数据区，用于small object。</p></li><li><p>T 该符号位于代码区text section。</p></li><li></li></ul><pre><code>U 该符号在当前文件中是未定义的，即该符号的定义在别的文件中。

:   例如，当前文件调用另一个文件中定义的函数，在这个被调用的函数在当前就是未定义的；但是在定义它的文件中类型是T。但是对于全局变量来说，在定义它的文件中，其符号类型为C，在使用它的文件中，其类型为U。
</code></pre><ul><li><p>V 该符号是一个weak object。</p></li><li><p>W The symbol is a weak symbol that has not been specifically tagged as a weak object symbol.</p></li><li><p>? 该符号类型没有定义</p></li></ul><p><em>库或对象名</em> 如果您指定了 -A 选项，则 nm 命令只报告与该文件有关的或者库或者对象名。</p><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><ol><li>寻找特殊标识</li></ol><p>有时会碰到一个编译了但没有链接的代码，那是因为它缺失了标识符；这种情况，可以用nm和objdump、readelf命令来查看程序的符号表；所有这些命令做的工作基本一样；</p><p>比如连接器报错有未定义的标识符；大多数情况下，会发生在库的缺失或企图链接一个错误版本的库的时候；浏览目标代码来寻找一个特殊标识符的引用:</p><pre><code>nm -uCA *.o | grep foo
</code></pre><p>-u选项限制了每个目标文件中未定义标识符的输出。-A选项用于显示每个标识符的文件名信息；对于C++代码，常用的还有-C选项，它也为解码这些标识符；</p><div class="hint-container note"><p class="hint-container-title">注</p><p>::: title Note</p></div><p>objdump、readld命令可以完成同样的任务。等效命令为： $objdump -t $readelf -s :::</p><ol start="2"><li><p>列出 a.out 对象文件的静态和外部符:</p><pre><code> $nm -e a.out
</code></pre></li><li><p>以十六进制显示符号大小和值并且按值排序符号:</p><pre><code> $nm -xv a.out
</code></pre></li><li><p>显示 libc.a 中所有 64 位对象符号，忽略所有 32 位对象:</p><pre><code> $nm -X64 /usr/lib/libc.a
</code></pre></li></ol>`,26)]))}const p=t(a,[["render",o]]),d=JSON.parse('{"path":"/linux-tutor/tool/nm.html","title":"nm 目标文件格式分析","lang":"zh-CN","frontmatter":{"description":"nm 目标文件格式分析 nm 命令显示关于指定 File 中符号的信息，文件可以是对象文件、可执行文件或对象文件库。如果文件没有包含符号信息，nm 命令报告该情况，但不把它解释为出错条件。 nm 命令缺省情况下报告十进制符号表示法下的数字值。 这些包含可执行代码的段称为正文段。同样地，数据段包含了不可执行的信息或数据。另一种类型的段，称为 BSS 段，...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/tool/nm.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"nm 目标文件格式分析"}],["meta",{"property":"og:description","content":"nm 目标文件格式分析 nm 命令显示关于指定 File 中符号的信息，文件可以是对象文件、可执行文件或对象文件库。如果文件没有包含符号信息，nm 命令报告该情况，但不把它解释为出错条件。 nm 命令缺省情况下报告十进制符号表示法下的数字值。 这些包含可执行代码的段称为正文段。同样地，数据段包含了不可执行的信息或数据。另一种类型的段，称为 BSS 段，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nm 目标文件格式分析\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"选项说明","slug":"选项说明","link":"#选项说明","children":[]},{"level":2,"title":"符号说明","slug":"符号说明","link":"#符号说明","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1653565176000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":6.18,"words":1855},"filePathRelative":"linux-tutor/tool/nm.md","localizedDate":"2022年5月26日","autoDesc":true}');export{p as comp,d as data};
