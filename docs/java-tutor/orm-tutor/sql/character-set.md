# 字符集

:::tip
字符是各种文字和符号的统称，包括各个国家文字、标点符号、表情、数字等等。 字符集 就是一系列字符的集合。字符集的种类较多，每个字符集可以表示的字符范围通常不同，就比如说有些字符集是无法表示汉字的
:::

对于mysql来说,有两种常见编码实现: `utf8`和`utf8mb4`,用`utf8`的话,存储emoji 符号和一些比较复杂的汉字、繁体字就会出错,`utf8mb4`则不会
