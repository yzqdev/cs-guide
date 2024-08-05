import{_ as e,c as n,o as t,d as a}from"./app-CbULZrmi.js";const o={},r=a(`<h1 id="各种语言读取文件md5" tabindex="-1"><a class="header-anchor" href="#各种语言读取文件md5"><span>各种语言读取文件md5</span></a></h1><h2 id="go" tabindex="-1"><a class="header-anchor" href="#go"><span>go</span></a></h2><pre><code class="language-go">package main

import (
 &quot;crypto/md5&quot;
 &quot;fmt&quot;
 &quot;io&quot;
 &quot;os&quot;
 &quot;time&quot;
)

func CalcFileMD5(filename string) (string, error) {
 fmt.Println(filename)
 start := time.Now()
 f, err := os.Open(filename)
 if nil != err {
  fmt.Println(err)
  return &quot;&quot;, err
 }
 defer f.Close()
 md5Handle := md5.New()
 _, err = io.Copy(md5Handle, f)
 if nil != err {
  fmt.Println(err)
  return &quot;&quot;, err
 }
 md := md5Handle.Sum(nil)
 md5str := fmt.Sprintf(&quot;%x&quot;, md)
 elapsed := time.Since(start)
 fmt.Println(md5str)
 fmt.Println(&quot;time：&quot;, elapsed)
 return md5str, nil
}

func main() {
 var arg = os.Args
 CalcFileMD5(arg[1])
}
</code></pre><p>运行</p><pre><code class="language-powershell">go run .\\main.go D:\\Documents\\Windows11.iso
</code></pre><h2 id="python" tabindex="-1"><a class="header-anchor" href="#python"><span>python</span></a></h2><pre><code class="language-python">#!/usr/bin/python
# -*-coding:utf-8-*-

import hashlib
import sys
import time


def main(file_name):
    start = time.time()
    with open(file_name, &#39;rb&#39;) as f:
        data = f.read()
    file_md5 = hashlib.md5(data).hexdigest()
    print(&quot;md5=&gt;&quot; + file_md5)
    end = time.time()
    print(&#39;用时:&#39; + str(end - start) + &quot;s&quot;)


if __name__ == &quot;__main__&quot;:
    file_name = sys.argv[1]
    main(file_name)
</code></pre><p>运行</p><pre><code class="language-powershell">python .\\main.py D:\\Documents\\Windows11.iso
</code></pre><h2 id="java" tabindex="-1"><a class="header-anchor" href="#java"><span>java</span></a></h2><pre><code class="language-java">package com.yzq.simplecmd;

import org.apache.commons.codec.digest.DigestUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.time.LocalDateTime;


public class Main {
    public static void main(String[] args) throws IOException {
        String javaVersion = Runtime.version().toString();
        String time = LocalDateTime.now().toString();
        System.out.println(&quot;Java Version: &quot; + javaVersion);
        //getMD5Three(args[0]);
        getMd5UseCodec(args[0]);
    }
    static void getMd5UseCodec(String path) throws IOException {
        LocalDateTime start = LocalDateTime.now();
        System.out.println(path);
        String md5 = DigestUtils.md5Hex(new FileInputStream(path));
        System.out.println(&quot;md5=&gt;&quot; + md5);
        LocalDateTime end = LocalDateTime.now();
        Duration duration = Duration.between(start, end);
        System.out.println(&quot;用时: &quot; + duration.toSeconds() + &quot;s&quot;);
    }
    public static void getMD5Three(String path) {
        LocalDateTime start = LocalDateTime.now();
        BigInteger bi = null;
        try {
            byte[] buffer = new byte[8192];
            int len = 0;
            MessageDigest md = MessageDigest.getInstance(&quot;MD5&quot;);
            File f = new File(path);
            FileInputStream fis = new FileInputStream(f);
            while ((len = fis.read(buffer)) != -1) {
                md.update(buffer, 0, len);
            }
            fis.close();
            byte[] b = md.digest();
            bi = new BigInteger(1, b);

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        String md5 = bi.toString(16);
        System.out.println(&quot;md5=&gt;&quot; + md5);
        LocalDateTime end = LocalDateTime.now();
        Duration duration = Duration.between(start, end);
        System.out.println(&quot;用时: &quot; + duration.toSeconds() + &quot;s&quot;);
    }
}
</code></pre><p>运行</p><pre><code class="language-powershell">mvn compile&amp;&amp;mvn exec:java
</code></pre><h2 id="dart" tabindex="-1"><a class="header-anchor" href="#dart"><span>dart</span></a></h2><pre><code class="language-dart">import &#39;dart:io&#39;;

import &#39;package:crypto/crypto.dart&#39; as crypto;

bool isWin(String input) {
  RegExp pathReg = RegExp(r&quot;\\.\\\\&quot;);
  return pathReg.hasMatch(input);
}

void main(List&lt;String&gt; arguments) async {
  DateTime now = DateTime.now();

  var filePath = arguments[0];
  if (isWin(filePath)) {
    filePath = arguments[0].substring(2);
  }
  print(filePath);
  File file = File(filePath);

  try {
    final fileStream = file.openRead();
    var md5 = crypto.md5;
    final checksum = (await md5.bind(fileStream).first).toString();

    print(
        &#39;md5:$checksum \\n 用时: \${(DateTime.now().millisecondsSinceEpoch - now.millisecondsSinceEpoch) / 1000}s&#39;);
  } catch (e) {
    print(e);
    print(&quot;找不到文件&quot;);
  }
}
</code></pre><p>运行</p><pre><code class="language-powershell">dart run .\\bin\\md5.dart &quot;D:\\\\Documents\\\\Windows11.iso&quot;
</code></pre><h2 id="csharp" tabindex="-1"><a class="header-anchor" href="#csharp"><span>csharp</span></a></h2><pre><code class="language-cs">using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;

namespace ConsoleApp {
    internal class Program {
        static void Main(string[] args) {
            var file = args[0];
          
            Stopwatch sw = new Stopwatch();
            sw.Start();
            Console.WriteLine(file);
            Console.WriteLine(GetMD5HashFromFile(file));
            sw.Stop();
            TimeSpan ts = sw.Elapsed;
            Console.WriteLine(&quot;用时: {0}s&quot;, ts.TotalSeconds);
        }
        public static string GetMD5HashFromFile(string fileName) {
            try {
                FileStream file = new FileStream(fileName, System.IO.FileMode.Open);
                MD5 md5 = MD5.Create();
                byte[] retVal = md5.ComputeHash(file);
                file.Close();
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i &lt; retVal.Length; i++) {
                    sb.Append(retVal[i].ToString(&quot;x2&quot;));
                }
                return sb.ToString();
            } catch (Exception ex) {
                throw new Exception(&quot;GetMD5HashFromFile() fail,error:&quot; + ex.Message);
            }
        }
    }
}

</code></pre><p>运行</p><pre><code class="language-powershell">dotnet run --project ConsoleApp  D:\\Documents\\Windows11.iso
</code></pre><h2 id="rust" tabindex="-1"><a class="header-anchor" href="#rust"><span>Rust</span></a></h2><pre><code class="language-rust">use std::{env, fs};
use std::fs::File;
use std::time::Instant;
use digest::Digest;

fn main() {
    let args: Vec&lt;String&gt; = env::args().collect();
    println!(&quot;{}&quot;, &amp;args[1]);
    let now = Instant::now();

    gen_fsmd5(&amp;args[1]);
    println!(&quot;用时: {}s&quot;, now.elapsed().as_secs());

}
fn gen_fsmd5(file: &amp;str){
    let   f=fs::read(file).unwrap();
    println!(&quot;{:x}&quot;, md5::Md5::digest(f));
}

</code></pre><p>运行</p><pre><code class="language-powershell">cargo run --bin md5 D:\\Documents\\Windows11.iso
</code></pre><h2 id="nodejs" tabindex="-1"><a class="header-anchor" href="#nodejs"><span>nodejs</span></a></h2><pre><code class="language-js">import { createReadStream } from &quot;fs&quot;;
import { createHash } from &quot;crypto&quot;;
import { argv } from &quot;process&quot;;

export async function getLargeMd5(file) {
  console.log(file);
  let start = performance.now();
  const stream = createReadStream(file);
  const hash = createHash(&quot;md5&quot;);
  stream.on(&quot;data&quot;, (chunk) =&gt; {
    hash.update(chunk, &quot;utf8&quot;);
  });
  stream.on(&quot;end&quot;, () =&gt; {
    const md5 = hash.digest(&quot;hex&quot;);
    console.log(md5);
    let end = performance.now();
    console.log(\`用时:\${(end - start) / 1000}s\`);
  });
}
getLargeMd5(argv[2]);
</code></pre><p>运行</p><pre><code class="language-powershell">node .\\cli.mjs D:\\Documents\\Windows11.iso
</code></pre><h2 id="php" tabindex="-1"><a class="header-anchor" href="#php"><span>php</span></a></h2><pre><code class="language-php">&lt;?php
$time_start = microtime(true);
echo  &quot;$argv[1]\\n&quot;;
echo md5_file($argv[1] );

$time_end = microtime(true);
$time = $time_end - $time_start;
echo &quot;\\n&quot;;
echo &quot;时间: $time s\\n&quot;;

</code></pre><p>运行</p><pre><code class="language-powershell">php .\\index.php  D:\\Documents\\Windows11.iso
</code></pre>`,33),i=[r];function s(l,p){return t(),n("div",null,i)}const d=e(o,[["render",s],["__file","md5.html.vue"]]),m=JSON.parse('{"path":"/go-tutor/md5.html","title":"各种语言读取文件md5","lang":"zh-CN","frontmatter":{"description":"各种语言读取文件md5 go 运行 python 运行 java 运行 dart 运行 csharp 运行 Rust 运行 nodejs 运行 php 运行","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/md5.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"各种语言读取文件md5"}],["meta",{"property":"og:description","content":"各种语言读取文件md5 go 运行 python 运行 java 运行 dart 运行 csharp 运行 Rust 运行 nodejs 运行 php 运行"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-12T11:22:11.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-12T11:22:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"各种语言读取文件md5\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-12T11:22:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"go","slug":"go","link":"#go","children":[]},{"level":2,"title":"python","slug":"python","link":"#python","children":[]},{"level":2,"title":"java","slug":"java","link":"#java","children":[]},{"level":2,"title":"dart","slug":"dart","link":"#dart","children":[]},{"level":2,"title":"csharp","slug":"csharp","link":"#csharp","children":[]},{"level":2,"title":"Rust","slug":"rust","link":"#rust","children":[]},{"level":2,"title":"nodejs","slug":"nodejs","link":"#nodejs","children":[]},{"level":2,"title":"php","slug":"php","link":"#php","children":[]}],"git":{"createdTime":1660303331000,"updatedTime":1660303331000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.32,"words":695},"filePathRelative":"go-tutor/md5.md","localizedDate":"2022年8月12日","autoDesc":true}');export{d as comp,m as data};
