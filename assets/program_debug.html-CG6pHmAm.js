import{_ as n,c as a,a as e,o as i}from"./app-B6vXTniy.js";const l={};function p(d,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="程序调试" tabindex="-1"><a class="header-anchor" href="#程序调试"><span>程序调试</span></a></h1><h2 id="进程调试" tabindex="-1"><a class="header-anchor" href="#进程调试"><span>进程调试</span></a></h2><h3 id="gdb-程序交互调试" tabindex="-1"><a class="header-anchor" href="#gdb-程序交互调试"><span>gdb 程序交互调试</span></a></h3><p>GDB是一个由GNU开源组织发布的、UNIX/LINUX操作系统下的、基于命令行的、功能强大的程序调试工具。</p><p>对于一名Linux下工作的c++程序员，gdb是必不可少的工具；</p><p>GDB中的命令固然很多，但我们只需掌握其中十个左右的命令，就大致可以完成日常的基本的程序调试工作。</p><p>以下从一个完整的调试过程简单说明最基本的几个命令;</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">    <span class="token variable">$gdb</span> programmer     <span class="token comment"># 启动gdb</span></span>
<span class="line">    <span class="token operator">&gt;</span>break main         <span class="token comment"># 设置断点</span></span>
<span class="line">    <span class="token operator">&gt;</span>run                <span class="token comment"># 运行调试程序</span></span>
<span class="line">    <span class="token operator">&gt;</span>next               <span class="token comment"># 单步调试</span></span>
<span class="line">    <span class="token operator">&gt;</span>print var1         <span class="token comment"># 在调试过程中，我们需要查看当前某个变量值的时候，使用print 命令打印该值</span></span>
<span class="line">    <span class="token operator">&gt;</span>list               <span class="token comment"># 显示当前调试处的源代码 </span></span>
<span class="line">    <span class="token operator">&gt;</span>info b             <span class="token comment"># 显示当前断点设置情况</span></span>
<span class="line"></span></code></pre></div><p>当你完成了第一个程序调试之后，你当然会需要更多的命令：关于gdb常用命令及各种调试方法详见 <code>gdb</code>{.interpreted-text role=&quot;ref&quot;} ;</p><p>同时，你需要更高效的调试：常用的调试命令都会有单字符的缩写，使用缩写更方便；同时，直接敲回车表示重复执行上一步命令；这在单步调试时非常有用；</p><h3 id="pstack-跟踪栈空间" tabindex="-1"><a class="header-anchor" href="#pstack-跟踪栈空间"><span>pstack 跟踪栈空间</span></a></h3><p>pstack是一个脚本工具，可显示每个进程的栈跟踪。pstack 命令必须由相应进程的属主或 root 运行。其核心实现就是使用了gdb以及thread apply all bt命令;</p><p>语法:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    $pstack &lt;program-pid&gt;</span>
<span class="line"></span></code></pre></div><p>示例:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    $ pstack 4551</span>
<span class="line">    Thread 7 (Thread 1084229984 (LWP 4552)):</span>
<span class="line">    #0  0x000000302afc63dc in epoll_wait () from /lib64/tls/libc.so.6</span>
<span class="line">    #1  0x00000000006f0730 in ub::EPollEx::poll ()</span>
<span class="line">    #2  0x00000000006f172a in ub::NetReactor::callback ()</span>
<span class="line">    #3  0x00000000006fbbbb in ub::UBTask::CALLBACK ()</span>
<span class="line">    #4  0x000000302b80610a in start_thread () from /lib64/tls/libpthread.so.0</span>
<span class="line">    #5  0x000000302afc6003 in clone () from /lib64/tls/libc.so.6</span>
<span class="line">    #6  0x0000000000000000 in ?? ()</span>
<span class="line"></span></code></pre></div><h3 id="strace-分析系统调用" tabindex="-1"><a class="header-anchor" href="#strace-分析系统调用"><span>strace 分析系统调用</span></a></h3><p>strace常用来跟踪进程执行时的系统调用和所接收的信号。在Linux世界，进程不能直接访问硬件设备，当进程需要访问硬件设备(比如读取磁盘文件，接收网络数据等等)时，必须由用户态模式切换至内核态模式，通过系统调用访问硬件设备。strace可以跟踪到一个进程产生的系统调用,包括参数，返回值，执行消耗的时间。</p><p>完整程序:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    strace -o output.txt -T -tt -e trace=all -p 28979</span>
<span class="line"></span></code></pre></div><p>跟踪28979进程的所有系统调用（-e trace=all），并统计系统调用的花费时间，以及开始时间（以可视化的时分秒格式显示），最后将记录结果存在output.txt文件里面。</p><p>查看进程正在做什么(实时输出进程执行系统调用的情况):</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    $strace -p &lt;process-pid&gt;</span>
<span class="line"></span></code></pre></div><p>关于strace的详细介绍，详见 <code>strace</code>{.interpreted-text role=&quot;ref&quot;} ;</p><h2 id="目标文件分析" tabindex="-1"><a class="header-anchor" href="#目标文件分析"><span>目标文件分析</span></a></h2><h3 id="nm" tabindex="-1"><a class="header-anchor" href="#nm"><span>nm</span></a></h3><p>nm用来列出目标文件的符号清单。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    $nm myProgrammer</span>
<span class="line">    08049f28 d _DYNAMIC</span>
<span class="line">    08049ff4 d _GLOBAL_OFFSET_TABLE_</span>
<span class="line">    080484dc R _IO_stdin_used</span>
<span class="line">             w _Jv_RegisterClasses</span>
<span class="line">    08049f18 d __CTOR_END__</span>
<span class="line">    08049f14 d __CTOR_LIST__</span>
<span class="line">    08049f20 D __DTOR_END__</span>
<span class="line">    08049f1c d __DTOR_LIST__</span>
<span class="line">    080485e0 r __FRAME_END__</span>
<span class="line">    08049f24 d __JCR_END__</span>
<span class="line">    08049f24 d __JCR_LIST__</span>
<span class="line">    0804a014 A __bss_start</span>
<span class="line">    0804a00c D __data_start</span>
<span class="line">    08048490 t __do_global_ctors_aux</span>
<span class="line">    08048360 t __do_global_dtors_aux</span>
<span class="line">    0804a010 D __dso_handle</span>
<span class="line">             w __gmon_start__</span>
<span class="line">    08048482 T __i686.get_pc_thunk.bx</span>
<span class="line">    08049f14 d __init_array_end</span>
<span class="line">    08049f14 d __init_array_start</span>
<span class="line">    08048480 T __libc_csu_fini</span>
<span class="line">    08048410 T __libc_csu_init</span>
<span class="line">             U __libc_start_main@@GLIBC_2.0</span>
<span class="line">    0804a014 A _edata</span>
<span class="line">    0804a01c A _end</span>
<span class="line">    080484bc T _fini</span>
<span class="line">    080484d8 R _fp_hw</span>
<span class="line">    080482b4 T _init</span>
<span class="line">    08048330 T _start</span>
<span class="line">    0804a014 b completed.6086</span>
<span class="line">    0804a00c W data_start</span>
<span class="line">    0804a018 b dtor_idx.6088</span>
<span class="line">    080483c0 t frame_dummy</span>
<span class="line">    080483e4 T main</span>
<span class="line">             U printf@@GLIBC_2.0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些包含可执行代码的段称为正文段。同样地，数据段包含了不可执行的信息或数据。另一种类型的段，称为 BSS 段，它包含以符号数据开头的块。对于 nm 命令列出的每个符号，它们的值使用十六进制来表示（缺省行为），并且在该符号前面加上了一个表示符号类型的编码字符。</p><p>常见的各种编码包括：</p><ul><li>A 表示绝对 (absolute)，这意味着不能将该值更改为其他的连接；</li><li>B 表示 BSS 段中的符号；</li><li>C 表示引用未初始化的数据的一般符号。</li></ul><p>可以将目标文件中所包含的不同的部分划分为段。段可以包含可执行代码、符号名称、初始数据值和许多其他类型的数据。有关这些类型的数据的详细信息，可以阅读 UNIX 中 nm 的 man 页面，其中按照该命令输出中的字符编码分别对每种类型进行了描述。</p><p>在目标文件阶段，即使是一个简单的 Hello World 程序，其中也包含了大量的细节信息。nm 程序可用于列举符号及其类型和值，但是，要更仔细地研究目标文件中这些命名段的内容，需要使用功能更强大的工具。</p><p>其中两种功能强大的工具是 objdump 和 readelf 程序。</p><p>关于nm工具的参数说明及更多示例详见 <code>nm</code>{.interpreted-text role=&quot;ref&quot;} ;</p><h3 id="objdump" tabindex="-1"><a class="header-anchor" href="#objdump"><span>objdump</span></a></h3><p>objdump工具用来显示二进制文件的信息，就是以一种可阅读的格式让你更多地了解二进制文件可能带有的附加信息。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    $objdump -d myprogrammer</span>
<span class="line">    a.out:     file format elf32-i386</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    Disassembly of section .init:</span>
<span class="line"></span>
<span class="line">    080482b4 &lt;_init&gt;:</span>
<span class="line">     80482b4:   53                      push   %ebx</span>
<span class="line">     80482b5:   83 ec 08                sub    $0x8,%esp</span>
<span class="line">     80482b8:   e8 00 00 00 00          call   80482bd &lt;_init+0x9&gt;</span>
<span class="line">     80482bd:   5b                      pop    %ebx</span>
<span class="line">     80482be:   81 c3 37 1d 00 00       add    $0x1d37,%ebx</span>
<span class="line">     80482c4:   8b 83 fc ff ff ff       mov    -0x4(%ebx),%eax</span>
<span class="line">     80482ca:   85 c0                   test   %eax,%eax</span>
<span class="line">     80482cc:   74 05                   je     80482d3 &lt;_init+0x1f&gt;</span>
<span class="line">     80482ce:   e8 3d 00 00 00          call   8048310 &lt;__gmon_start__@plt&gt;</span>
<span class="line">     80482d3:   e8 e8 00 00 00          call   80483c0 &lt;frame_dummy&gt;</span>
<span class="line">     80482d8:   e8 b3 01 00 00          call   8048490 &lt;__do_global_ctors_aux&gt;</span>
<span class="line">     80482dd:   83 c4 08                add    $0x8,%esp</span>
<span class="line">     80482e0:   5b                      pop    %ebx</span>
<span class="line">     80482e1:   c3                      ret    </span>
<span class="line"></span>
<span class="line">    Disassembly of section .plt:</span>
<span class="line">    ...</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个可执行代码段将在需要特定的事件时执行，这些事件包括库的初始化和该程序本身主入口点。</p><p>对于那些着迷于底层编程细节的程序员来说，这是一个功能非常强大的工具，可用于研究编译器和汇编器的输出。细节信息，比如这段代码中所显示的这些信息，可以揭示有关本地处理器本身运行方式的很多内容。对该处理器制造商提供的技术文档进行深入的研究，您可以收集关于一些有价值的信息，通过这些信息可以深入地了解内部的运行机制，因为功能程序提供了清晰的输出。</p><p>关于objdump工具的参数说明及更多示例详见 <code>objdump</code>{.interpreted-text role=&quot;ref&quot;} ;</p><h3 id="readelf" tabindex="-1"><a class="header-anchor" href="#readelf"><span>readelf</span></a></h3><p>这个工具和objdump命令提供的功能类似，但是它显示的信息更为具体，并且它不依赖BFD库(BFD库是一个GNU项目，它的目标就是希望通过一种统一的接口来处理不同的目标文件）；</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    $readelf -all a.out</span>
<span class="line">    ELF Header:</span>
<span class="line">      Magic:   7f 45 4c 46 01 01 01 00 00 00 00 00 00 00 00 00 </span>
<span class="line">      Class:                             ELF32</span>
<span class="line">      Data:                              2&#39;s complement, little endian</span>
<span class="line">      Version:                           1 (current)</span>
<span class="line">      OS/ABI:                            UNIX - System V</span>
<span class="line">      ABI Version:                       0</span>
<span class="line">      Type:                              EXEC (Executable file)</span>
<span class="line">      Machine:                           Intel 80386</span>
<span class="line">      Version:                           0x1</span>
<span class="line">      Entry point address:               0x8048330</span>
<span class="line">      Start of program headers:          52 (bytes into file)</span>
<span class="line">      Start of section headers:          4412 (bytes into file)</span>
<span class="line">      Flags:                             0x0</span>
<span class="line">      Size of this header:               52 (bytes)</span>
<span class="line">      Size of program headers:           32 (bytes)</span>
<span class="line">      Number of program headers:         9</span>
<span class="line">      Size of section headers:           40 (bytes)</span>
<span class="line">      Number of section headers:         30</span>
<span class="line">      Section header string table index: 27</span>
<span class="line"></span>
<span class="line">    Section Headers:</span>
<span class="line">      [Nr] Name              Type            Addr     Off    Size   ES Flg Lk Inf Al</span>
<span class="line">      [ 0]                   NULL            00000000 000000 000000 00      0   0  0</span>
<span class="line">      [ 1] .interp           PROGBITS        08048154 000154 000013 00   A  0   0  1</span>
<span class="line">      [ 2] .note.ABI-tag     NOTE            08048168 000168 000020 00   A  0   0  4</span>
<span class="line">      [ 3] .note.gnu.build-i NOTE            08048188 000188 000024 00   A  0   0  4</span>
<span class="line">      [ 4] .gnu.hash         GNU_HASH        080481ac 0001ac 000020 04   A  5   0  4</span>
<span class="line">      [ 5] .dynsym           DYNSYM          080481cc 0001cc 000050 10   A  6   1  4</span>
<span class="line">      [ 6] .dynstr           STRTAB          0804821c 00021c 00004c 00   A  0   0  1</span>
<span class="line">      [ 7] .gnu.version      VERSYM          08048268 000268 00000a 02   A  5   0  2</span>
<span class="line">      [ 8] .gnu.version_r    VERNEED         08048274 000274 000020 00   A  6   1  4</span>
<span class="line">      [ 9] .rel.dyn          REL             08048294 000294 000008 08   A  5   0  4</span>
<span class="line">      [10] .rel.plt          REL             0804829c 00029c 000018 08   A  5  12  4</span>
<span class="line">      [11] .init             PROGBITS        080482b4 0002b4 00002e 00  AX  0   0  4</span>
<span class="line">      [12] .plt              PROGBITS        080482f0 0002f0 000040 04  AX  0   0 16</span>
<span class="line">      [13] .text             PROGBITS        08048330 000330 00018c 00  AX  0   0 16</span>
<span class="line">      [14] .fini             PROGBITS        080484bc 0004bc 00001a 00  AX  0   0  4</span>
<span class="line">      [15] .rodata           PROGBITS        080484d8 0004d8 000011 00   A  0   0  4</span>
<span class="line">      [16] .eh_frame_hdr     PROGBITS        080484ec 0004ec 000034 00   A  0   0  4</span>
<span class="line">      [17] .eh_frame         PROGBITS        08048520 000520 0000c4 00   A  0   0  4</span>
<span class="line">      [18] .ctors            PROGBITS        08049f14 000f14 000008 00  WA  0   0  4</span>
<span class="line">      [19] .dtors            PROGBITS        08049f1c 000f1c 000008 00  WA  0   0  4</span>
<span class="line">      [20] .jcr              PROGBITS        08049f24 000f24 000004 00  WA  0   0  4</span>
<span class="line">      [21] .dynamic          DYNAMIC         08049f28 000f28 0000c8 08  WA  6   0  4</span>
<span class="line">      [22] .got              PROGBITS        08049ff0 000ff0 000004 04  WA  0   0  4</span>
<span class="line">      [23] .got.plt          PROGBITS        08049ff4 000ff4 000018 04  WA  0   0  4</span>
<span class="line">      [24] .data             PROGBITS        0804a00c 00100c 000008 00  WA  0   0  4</span>
<span class="line">      [25] .bss              NOBITS          0804a014 001014 000008 00  WA  0   0  4</span>
<span class="line">      [26] .comment          PROGBITS        00000000 001014 00002a 01  MS  0   0  1</span>
<span class="line">      [27] .shstrtab         STRTAB          00000000 00103e 0000fc 00      0   0  1</span>
<span class="line">      [28] .symtab           SYMTAB          00000000 0015ec 000410 10     29  45  4</span>
<span class="line">      [29] .strtab           STRTAB          00000000 0019fc 0001f9 00      0   0  1</span>
<span class="line">      ...</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ELF Header 为该文件中所有段入口显示了详细的摘要。在列举出这些 Header 中的内容之前，您可以看到 Header 的具体数目。在研究一个较大的目标文件时，该信息可能非常有用。</p><p>除了所有这些段之外，编译器可以将调试信息放入到目标文件中，并且还可以显示这些信息。输入下面的命令，仔细分析编译器的输出（假设您扮演了调试程序的角色）:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    $readelf --debug-dump a.out | more </span>
<span class="line"></span></code></pre></div><p>调试工具，如 GDB，可以读取这些调试信息，并且当程序在调试器中运行的同时，您可以使用该工具显示更具描述性的标记，而不是对代码进行反汇编时的原始地址值。</p><p>关于readelf工具的参数说明及更多示例详见 <code>readelf</code>{.interpreted-text role=&quot;ref&quot;} ;</p><h3 id="size-查看程序内存占用" tabindex="-1"><a class="header-anchor" href="#size-查看程序内存占用"><span>size 查看程序内存占用</span></a></h3><p>size这个工具用来查看程序运行时各个段的实际内存占用:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    $size a.out</span>
<span class="line">    text       data     bss     dec     hex filename</span>
<span class="line">    1146        256       8    1410     582 a.out</span>
<span class="line"></span></code></pre></div><h3 id="file-文件类型查询" tabindex="-1"><a class="header-anchor" href="#file-文件类型查询"><span>file 文件类型查询</span></a></h3><p>这个工具用于查看文件的类型；</p><p>比如我们在64位机器上发现了一个32位的库，链接不上，这就有问题了： :</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    $file a.out</span>
<span class="line">    a.out: ELF 64-bit LSB executable, AMD x86-64, version 1 (SYSV), for GNU/Linux 2.6.9, dynamically linked (uses shared libs), for GNU/Linux 2.6.9, not stripped</span>
<span class="line"></span></code></pre></div><p>也可以查看Core文件是由哪个程序生成:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    $file core.22355</span>
<span class="line"></span></code></pre></div><h3 id="strings-查询数据中的文本信息" tabindex="-1"><a class="header-anchor" href="#strings-查询数据中的文本信息"><span>strings 查询数据中的文本信息</span></a></h3><p>一个文件中包含二进制数据和文本数据，如果只需要查看其文本信息，使用这个命令就很方便；过滤掉非字符数据，将文本信息输出:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    $strings &lt;objfile&gt;</span>
<span class="line"></span></code></pre></div><h3 id="fuser-显示文件使用者" tabindex="-1"><a class="header-anchor" href="#fuser-显示文件使用者"><span>fuser 显示文件使用者</span></a></h3><p>显示所有正在使用着指定的file, file system 或者 sockets的进程信息;</p><pre><code>$fuser -m -u redis-server
redis-server: 11552rce(weber) 22912rce(weber) 25501rce(weber)
</code></pre><p>使用了-m和-u选项，用来查找所有正在使用redis-server的所有进程的PID以及该进程的OWNER；</p><p>fuser通常被用在诊断系统的&quot;resource busy&quot;问题。如果你希望kill所有正在使用某一指定的file, file system or sockets的进程的时候，你可以使用-k选项:</p><pre><code>$fuser –k /path/to/your/filename
</code></pre><h3 id="xxd-十六进制显示数据" tabindex="-1"><a class="header-anchor" href="#xxd-十六进制显示数据"><span>xxd 十六进制显示数据</span></a></h3><p>以十六进制方式显示文件，只显示文本信息:</p><pre><code>$xxd a.out 
0000000: 7f45 4c46 0101 0100 0000 0000 0000 0000  .ELF............
0000010: 0200 0300 0100 0000 3083 0408 3400 0000  ........0...4...
0000020: 3c11 0000 0000 0000 3400 2000 0900 2800  &lt;.......4. ...(.
0000030: 1e00 1b00 0600 0000 3400 0000 3480 0408  ........4...4...
0000040: 3480 0408 2001 0000 2001 0000 0500 0000  4... ... .......
0000050: 0400 0000 0300 0000 5401 0000 5481 0408  ........T...T...
...    
</code></pre><h3 id="od" tabindex="-1"><a class="header-anchor" href="#od"><span>od</span></a></h3><p>通常使用od命令查看特殊格式的文件内容。通过指定该命令的不同选项可以以十进制、八进制、十六进制和ASCII码来显示文件。</p><p>参数说明：</p><p>-A 指定地址基数，包括：</p><ul><li>d 十进制</li><li>o 八进制（系统默认值）</li><li>x 十六进制</li><li>n 不打印位移值</li></ul><p>-t 指定数据的显示格式，主要的参数有：</p><ul><li>c ASCII字符或反斜杠序列</li><li>d 有符号十进制数</li><li>f 浮点数</li><li>o 八进制（系统默认值为02）</li><li>u 无符号十进制数</li></ul><p>- x 十六进制数 除了选项c以外的其他选项后面都可以跟一个十进制数n，指定每个显示值所包含的字节数。</p><p>说明：od命令系统默认的显示方式是八进制，这也是该命令的名称由来（Octal Dump）。但这不是最有用的显示方式，用ASCII码和十六进制组合的方式能提供更有价值的信息输出。</p><p>以十六进制和字符同时显示:</p><pre><code>$od -Ax -tcx4 a.c 
000000   #   i   n   c   l   u   d   e       &lt;   s   t   d   i   o   .
              636e6923        6564756c        74733c20        2e6f6964
000010   h   &gt;  \\n  \\n   v   o   i   d       m   a   i   n   (   )  \\n
              0a0a3e68        64696f76        69616d20        0a29286e
000020   {  \\n  \\t   i   n   t       i       =       5   ;  \\n  \\t   p
              69090a7b        6920746e        35203d20        70090a3b
000030   r   i   n   t   f   (   &quot;   h   e   l   l   o   ,   %   d   &quot;
              746e6972        68222866        6f6c6c65        2264252c
000040   ,   i   )   ;  \\n   }  \\n
              3b29692c        000a7d0a
000047
</code></pre><p>以字符方式显示:</p><pre><code>$od -c a.c
0000000   #   i   n   c   l   u   d   e       &lt;   s   t   d   i   o   .
0000020   h   &gt;  \\n  \\n   v   o   i   d       m   a   i   n   (   )  \\n
0000040   {  \\n  \\t   i   n   t       i       =       5   ;  \\n  \\t   p
0000060   r   i   n   t   f   (   &quot;   h   e   l   l   o   ,   %   d   &quot;
0000100   ,   i   )   ;  \\n   }  \\n
0000107
</code></pre><p>注：类似命令还有hexdump（十六进制输出）</p>`,84)])])}const t=n(l,[["render",p]]),r=JSON.parse('{"path":"/linux-tutor/common/program_debug.html","title":"程序调试","lang":"zh-CN","frontmatter":{"description":"程序调试 进程调试 gdb 程序交互调试 GDB是一个由GNU开源组织发布的、UNIX/LINUX操作系统下的、基于命令行的、功能强大的程序调试工具。 对于一名Linux下工作的c++程序员，gdb是必不可少的工具； GDB中的命令固然很多，但我们只需掌握其中十个左右的命令，就大致可以完成日常的基本的程序调试工作。 以下从一个完整的调试过程简单说明最基...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"程序调试\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-14T11:30:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/common/program_debug.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"程序调试"}],["meta",{"property":"og:description","content":"程序调试 进程调试 gdb 程序交互调试 GDB是一个由GNU开源组织发布的、UNIX/LINUX操作系统下的、基于命令行的、功能强大的程序调试工具。 对于一名Linux下工作的c++程序员，gdb是必不可少的工具； GDB中的命令固然很多，但我们只需掌握其中十个左右的命令，就大致可以完成日常的基本的程序调试工作。 以下从一个完整的调试过程简单说明最基..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-14T11:30:49.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-14T11:30:49.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1684063849000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":10.69,"words":3208},"filePathRelative":"linux-tutor/common/program_debug.md","autoDesc":true}');export{t as comp,r as data};
