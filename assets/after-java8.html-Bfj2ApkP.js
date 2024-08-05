import{_ as e,c as t,o as a,d as r}from"./app-CbULZrmi.js";const n={},o=r(`<h1 id="java8之后的兼容性" tabindex="-1"><a class="header-anchor" href="#java8之后的兼容性"><span>java8之后的兼容性</span></a></h1><p>​</p><h2 id="缺少javafx和javax-添加javax" tabindex="-1"><a class="header-anchor" href="#缺少javafx和javax-添加javax"><span>缺少javafx和javax,添加javax</span></a></h2><pre><code class="language-xml">&lt;dependency&gt;
    &lt;groupId&gt;javax.annotation&lt;/groupId&gt;
    &lt;artifactId&gt;javax.annotation-api&lt;/artifactId&gt;
    &lt;version&gt;1.3.2&lt;/version&gt;
&lt;/dependency&gt;

</code></pre><h2 id="如何在java8以上版本使用javafx" tabindex="-1"><a class="header-anchor" href="#如何在java8以上版本使用javafx"><span>如何在java8以上版本使用javafx?</span></a></h2><p>fx下载地址 <a href="https://gluonhq.com/products/javafx/" target="_blank" rel="noopener noreferrer">https://gluonhq.com/products/javafx/</a> ​ Open the command prompt and run <code>java --module-path &lt;path to unzipped folder&gt;/lib --add-modules ALL-MODULE-PATH -jar &lt;path to mcaselector-1.16.3.jar&gt;</code> where you replace everything in <code>&lt;&gt;</code> with the appropriate paths.</p><h2 id="jdk1-8-找不到-sun-misc-base64decoder-的解决方法" tabindex="-1"><a class="header-anchor" href="#jdk1-8-找不到-sun-misc-base64decoder-的解决方法"><span>JDK1.8 找不到 sun.misc.BASE64Decoder 的解决方法</span></a></h2><p>使用JDK.18 自带</p><pre><code class="language-java">java.util.Base64
java.util.Base64.Encoder;
java.util.Base64.Decoder;

</code></pre><p>代替sun.misc.BASE64Decoder 例子1</p><pre><code class="language-java">BASE64Decoder base64 = new BASE64Decoder();
byte[] buffer = base64.decodeBuffer(publicKeyStr);

</code></pre><p>替代方法</p><pre><code class="language-java">Decoder decoder=Base64.getMimeDecoder(); //注不要使用.getDecoder();
byte[] buffer =decoder.decode(publicKeyStr);

</code></pre><h2 id="问-在java里最简单的创建文件写文件的方法是什么" tabindex="-1"><a class="header-anchor" href="#问-在java里最简单的创建文件写文件的方法是什么"><span>问：在java里最简单的创建文件写文件的方法是什么</span></a></h2><h3 id="最佳答案" tabindex="-1"><a class="header-anchor" href="#最佳答案"><span>最佳答案</span></a></h3><p>创建一个文本文件（注意：如果该文件存在，则会覆盖该文件）</p><pre><code class="language-java">PrintWriter writer = new PrintWriter(&quot;the-file-name.txt&quot;, &quot;UTF-8&quot;);
writer.println(&quot;The first line&quot;);
writer.println(&quot;The second line&quot;);
writer.close();
</code></pre><p>创建一个二进制文件（同样会覆盖这文件）</p><pre><code class="language-java">byte data[] = ...
FileOutputStream out = new FileOutputStream(&quot;the-file-name&quot;);
out.write(data);
out.close();
</code></pre><p>Java 7+ 用户可以用<a href="http://docs.oracle.com/javase/7/docs/api/index.html?java/nio/file/Files.html" target="_blank" rel="noopener noreferrer"><code>File</code></a>类来写文件 创建一个文本文件</p><pre><code class="language-java">List&lt;String&gt; lines = Arrays.asList(&quot;The first line&quot;, &quot;The second line&quot;);
Path file = Paths.get(&quot;the-file-name.txt&quot;);
Files.write(file, lines, Charset.forName(&quot;UTF-8&quot;));
//Files.write(file, lines, Charset.forName(&quot;UTF-8&quot;), StandardOpenOption.APPEND);
</code></pre><p>创建一个二进制文件</p><pre><code class="language-java">byte data[] = ...
Path file = Paths.get(&quot;the-file-name&quot;);
Files.write(file, data);
//Files.write(file, data, StandardOpenOption.APPEND);
</code></pre><h3 id="其他的答案-1" tabindex="-1"><a class="header-anchor" href="#其他的答案-1"><span>其他的答案（1）</span></a></h3><p>在Java 7+中</p><pre><code class="language-java">try (Writer writer =new BufferedWriter(new OutputStreamWriter(
              new FileOutputStream(&quot;filename.txt&quot;), &quot;utf-8&quot;))) {
   writer.write(&quot;something&quot;);
}
</code></pre><p>还有一些实用的方法如下：</p><ul><li><a href="https://commons.apache.org/proper/commons-io/apidocs/org/apache/commons/io/FileUtils.html#writeStringToFile%28java.io.File,%20java.lang.String,%20java.nio.charset.Charset%29" target="_blank" rel="noopener noreferrer"><code>FileUtils.writeStringtoFile(..)</code></a> 来自于 commons-io 包</li><li><a href="http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/io/Files.html#write%28java.lang.CharSequence,%20java.io.File,%20java.nio.charset.Charset%29" target="_blank" rel="noopener noreferrer"><code>Files.write(..)</code></a> 来自于 guava</li></ul><p>Note also that you can use a FileWriter, but it uses the default encoding, which is often a bad idea - it&#39;s best to specify the encoding explicitly. 还要注意可以使用 <code>FileWriter</code>，但是它使用的是默认编码，这不是很好的方法，最好是明确指定编码</p><p>下面是来自于prior-to-java-7的原始方法</p><pre><code class="language-java">Writer writer = null;

try {
    writer = Buffer.fromedWriter(new OutputStreamWriter(
          new FileOutputStream(&quot;filename.txt&quot;), &quot;utf-8&quot;));
    writer.write(&quot;Something&quot;);
} catch (IOException ex) {
  // report
} finally {
   try {writer.close();} catch (Exception ex) {/*ignore*/}
}
</code></pre><p>可以看<a href="http://docs.oracle.com/javase/tutorial/essential/io/file.html" target="_blank" rel="noopener noreferrer"><code>Reading, Writing, and Creating Files</code></a>(包含NIO2)</p><h3 id="其他答案-2" tabindex="-1"><a class="header-anchor" href="#其他答案-2"><span>其他答案（2）</span></a></h3><pre><code class="language-java">public class Program {
    public static void main(String[] args) {
        String text = &quot;Hello world&quot;;
        BufferedWriter output = null;
        try {
            File file = new File(&quot;example.txt&quot;);
            output = Buffer.fromedWriter(new FileWriter(file));
            output.write(text);
        } catch ( IOException e ) {
            e.printStackTrace();
        } finally {
            if ( output != null ) output.close();
        }
    }
}
</code></pre><h3 id="其他答案-3" tabindex="-1"><a class="header-anchor" href="#其他答案-3"><span>其他答案（3）</span></a></h3><p>如果已经有想要写到文件中的内容，<a href="https://docs.oracle.com/javase/7/docs/api/java/nio/file/Files.html" target="_blank" rel="noopener noreferrer"><code>java.nio.file.Files</code></a> 作为 Java 7 附加部分的native I/O，提供了简单高效的方法来实现你的目标</p><p>基本上创建文件，写文件只需要一行，而且是只需一个方法调用！ 下面的例子创建并且写了6个不同的文件来展示是怎么使用的</p><pre><code class="language-java">Charset utf8 = StandardCharsets.UTF_8;
List&lt;String&gt; lines = Arrays.asList(&quot;1st line&quot;, &quot;2nd line&quot;);
byte[] data = {1, 2, 3, 4, 5};

try {
    Files.write(Paths.get(&quot;file1.bin&quot;), data);
    Files.write(Paths.get(&quot;file2.bin&quot;), data,
            StandardOpenOption.CREATE, StandardOpenOption.APPEND);
    Files.write(Paths.get(&quot;file3.txt&quot;), &quot;content&quot;.getBytes());
    Files.write(Paths.get(&quot;file4.txt&quot;), &quot;content&quot;.getBytes(utf8));
    Files.write(Paths.get(&quot;file5.txt&quot;), lines, utf8);
    Files.write(Paths.get(&quot;file6.txt&quot;), lines, utf8,
            StandardOpenOption.CREATE, StandardOpenOption.APPEND);
} catch (IOException e) {
    e.printStackTrace();
}
</code></pre><h3 id="其他答案-4" tabindex="-1"><a class="header-anchor" href="#其他答案-4"><span>其他答案（4）</span></a></h3><p>下面是一个小程序来创建和写文件。该版本的代码比较长，但是可以容易理解</p><pre><code class="language-java">import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;

public class writer {
    public void writing() {
        try {
            //Whatever the file path is.
            File statText = new File(&quot;E:/Java/Reference/bin/images/statsTest.txt&quot;);
            FileOutputStream is = new FileOutputStream(statText);
            OutputStreamWriter osw = new OutputStreamWriter(is);    
            Writer w = Buffer.fromedWriter(osw);
            w.write(&quot;POTATO!!!&quot;);
            w.close();
        } catch (IOException e) {
            System.err.println(&quot;Problem writing to the file statsTest.txt&quot;);
        }
    }

    public static void main(String[]args) {
        writer write = new writer();
        write.writing();
    }
}
</code></pre><p>stackoverflow链接： <a href="http://stackoverflow.com/questions/2885173/how-to-create-a-file-and-write-to-a-file-in-java" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/2885173/how-to-create-a-file-and-write-to-a-file-in-java</a></p>`,42),i=[o];function l(s,c){return a(),t("div",null,i)}const d=e(n,[["render",l],["__file","after-java8.html.vue"]]),u=JSON.parse('{"path":"/java-tutor/java-tips/after-java8.html","title":"java8之后的兼容性","lang":"zh-CN","frontmatter":{"description":"java8之后的兼容性 ​ 缺少javafx和javax,添加javax 如何在java8以上版本使用javafx? fx下载地址 https://gluonhq.com/products/javafx/ ​ Open the command prompt and run java --module-path <path to unzipped fol...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/java-tips/after-java8.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"java8之后的兼容性"}],["meta",{"property":"og:description","content":"java8之后的兼容性 ​ 缺少javafx和javax,添加javax 如何在java8以上版本使用javafx? fx下载地址 https://gluonhq.com/products/javafx/ ​ Open the command prompt and run java --module-path <path to unzipped fol..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-24T12:34:23.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-24T12:34:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java8之后的兼容性\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-24T12:34:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"缺少javafx和javax,添加javax","slug":"缺少javafx和javax-添加javax","link":"#缺少javafx和javax-添加javax","children":[]},{"level":2,"title":"如何在java8以上版本使用javafx?","slug":"如何在java8以上版本使用javafx","link":"#如何在java8以上版本使用javafx","children":[]},{"level":2,"title":"JDK1.8 找不到 sun.misc.BASE64Decoder 的解决方法","slug":"jdk1-8-找不到-sun-misc-base64decoder-的解决方法","link":"#jdk1-8-找不到-sun-misc-base64decoder-的解决方法","children":[]},{"level":2,"title":"问：在java里最简单的创建文件写文件的方法是什么","slug":"问-在java里最简单的创建文件写文件的方法是什么","link":"#问-在java里最简单的创建文件写文件的方法是什么","children":[{"level":3,"title":"最佳答案","slug":"最佳答案","link":"#最佳答案","children":[]},{"level":3,"title":"其他的答案（1）","slug":"其他的答案-1","link":"#其他的答案-1","children":[]},{"level":3,"title":"其他答案（2）","slug":"其他答案-2","link":"#其他答案-2","children":[]},{"level":3,"title":"其他答案（3）","slug":"其他答案-3","link":"#其他答案-3","children":[]},{"level":3,"title":"其他答案（4）","slug":"其他答案-4","link":"#其他答案-4","children":[]}]}],"git":{"createdTime":1647861419000,"updatedTime":1711283663000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":2.76,"words":829},"filePathRelative":"java-tutor/java-tips/after-java8.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,u as data};
