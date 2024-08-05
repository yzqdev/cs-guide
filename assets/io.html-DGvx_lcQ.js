import{_ as e,c as t,o as n,d as i}from"./app-CbULZrmi.js";const a={},r=i(`<h1 id="io代码片段" tabindex="-1"><a class="header-anchor" href="#io代码片段"><span>io代码片段</span></a></h1><h2 id="inputsteam读取文件" tabindex="-1"><a class="header-anchor" href="#inputsteam读取文件"><span>inputsteam读取文件</span></a></h2><pre><code class="language-java">@Test  
void useSteam(){  
  //定义输入流  
  FileInputStream fis =null;  
  try {  
    //1、创建文件对象  
    File file = new File(&quot;E:\\\\tmpgit\\\\all.sql&quot;);  
    //2、创建输入流对象  
    fis = new FileInputStream(file);  
    //用定义字节数组，作为装字节数据的容器  
    byte[] buffer =new byte[1024];  
    int len;//记录每次读取的字节个数  
    //System.out.println(fis.read(buffer));  
    while ((len=fis.read(buffer))!=-1){  
      //转成String型，否则输出ASCII码  
      String str=new String(buffer,0,len);  
      System.out.println(str);  
    }  
  } catch (IOException e) {  
    e.printStackTrace();  
  } finally {  
    //释放资源  
    try {  
      fis.close();  
    } catch (IOException e) {  
      e.printStackTrace();  
    }  
  }  
}
</code></pre><h2 id="使用newio" tabindex="-1"><a class="header-anchor" href="#使用newio"><span>使用newio</span></a></h2><pre><code class="language-java">@Test  
void say(){  
  Path file = Paths.get(&quot;build.gradle.kts&quot;);  
  try (InputStream in = Files.newInputStream(file);  
       BufferedReader reader =  
         new BufferedReader(new InputStreamReader(in))) {  
    String line = null;  
    while ((line = reader.readLine()) != null) {  
      System.out.println(line);  
    }  
  } catch (IOException x) {  
    System.err.println(x);  
  }  
}
</code></pre><h2 id="复制文件" tabindex="-1"><a class="header-anchor" href="#复制文件"><span>复制文件</span></a></h2><pre><code class="language-java">@Test  
void copyFileTest(){  
  //根据数据源创建字节输入流对象  
     try {  
        InputStream fips=Files.newInputStream(Paths.get(&quot;build.gradle.kts&quot;));  
       //根据目的地创建字节输出流对象  
       FileOutputStream fops=new FileOutputStream(&quot;F:\\\\abc.txt&quot;);  

       fips.transferTo(Files.newOutputStream(Paths.get(&quot;F:/transfer.txt&quot;)));  
       //读写数据，复制文本文件(一次读取一个字节、一次写入一个字节；建议使用循环方式)  
       int by;  
       while((by=fips.read())!=-1){  
         fops.write(by);  
       }  
       //释放资源  
       fops.close();  
       fips.close();  
     }catch (Exception e){  
       e.printStackTrace();  
     }  
  
}\`\`\`

## buffered reader 读取文本文件

\`\`\`java
@Test  
  void readFileTest() throws IOException {  
    System.out.println(Paths.get(&quot;.&quot;).toAbsolutePath().toString());  
  
    //1 use buffered reader  
    try (BufferedReader br = Files.newBufferedReader(Paths.get(&quot;txt/testBufferedReader.txt&quot;))) {  
      String inValue;  
      while ((inValue = br.readLine()) != null) {  
        System.out.println(&quot;Files.newBufferedReader=&quot; + inValue);  
      }  
    } catch (IOException e) {  
      e.printStackTrace();  
    }  
// 2. use files. read all  
    List&lt;String&gt; lines = Files.readAllLines(Paths.get(&quot;txt/testBufferedReader.txt&quot;));  
  
  
    for (String line : lines) {  
      System.out.println(&quot;Files.readAllLines==&quot; + line);  
    }  
  
    // write file use buffered writer  
    String[] data = new String[]{&quot;hbh&quot;};  
    try (BufferedWriter bw = Files.newBufferedWriter(Paths.get(&quot;txt/testNewBufferedWriter.txt&quot;))) {  
      for (String d : data) {  
        bw.write(d);  
        bw.newLine();  
  
      }  
    }  
  }
</code></pre>`,7),o=[r];function s(l,u){return n(),t("div",null,o)}const p=e(a,[["render",s],["__file","io.html.vue"]]),c=JSON.parse('{"path":"/cs-tips/java-tip/io.html","title":"io代码片段","lang":"zh-CN","frontmatter":{"description":"io代码片段 inputsteam读取文件 使用newio 复制文件","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/java-tip/io.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"io代码片段"}],["meta",{"property":"og:description","content":"io代码片段 inputsteam读取文件 使用newio 复制文件"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-03T11:57:37.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-06-03T11:57:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"io代码片段\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-03T11:57:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"inputsteam读取文件","slug":"inputsteam读取文件","link":"#inputsteam读取文件","children":[]},{"level":2,"title":"使用newio","slug":"使用newio","link":"#使用newio","children":[]},{"level":2,"title":"复制文件","slug":"复制文件","link":"#复制文件","children":[]}],"git":{"createdTime":1717415857000,"updatedTime":1717415857000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.21,"words":362},"filePathRelative":"cs-tips/java-tip/io.md","localizedDate":"2024年6月3日","autoDesc":true}');export{p as comp,c as data};
