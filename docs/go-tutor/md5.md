# 各种语言读取文件md5

## go

```go
package main

import (
 "crypto/md5"
 "fmt"
 "io"
 "os"
 "time"
)

func CalcFileMD5(filename string) (string, error) {
 fmt.Println(filename)
 start := time.Now()
 f, err := os.Open(filename)
 if nil != err {
  fmt.Println(err)
  return "", err
 }
 defer f.Close()
 md5Handle := md5.New()
 _, err = io.Copy(md5Handle, f)
 if nil != err {
  fmt.Println(err)
  return "", err
 }
 md := md5Handle.Sum(nil)
 md5str := fmt.Sprintf("%x", md)
 elapsed := time.Since(start)
 fmt.Println(md5str)
 fmt.Println("time：", elapsed)
 return md5str, nil
}

func main() {
 var arg = os.Args
 CalcFileMD5(arg[1])
}
```

运行

```powershell
go run .\main.go D:\Documents\Windows11.iso
```

## python

```python
#!/usr/bin/python
# -*-coding:utf-8-*-

import hashlib
import sys
import time


def main(file_name):
    start = time.time()
    with open(file_name, 'rb') as f:
        data = f.read()
    file_md5 = hashlib.md5(data).hexdigest()
    print("md5=>" + file_md5)
    end = time.time()
    print('用时:' + str(end - start) + "s")


if __name__ == "__main__":
    file_name = sys.argv[1]
    main(file_name)
```

运行

```powershell
python .\main.py D:\Documents\Windows11.iso
```

## java

```java
package com.yzq.simplecmd;

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
        System.out.println("Java Version: " + javaVersion);
        //getMD5Three(args[0]);
        getMd5UseCodec(args[0]);
    }
    static void getMd5UseCodec(String path) throws IOException {
        LocalDateTime start = LocalDateTime.now();
        System.out.println(path);
        String md5 = DigestUtils.md5Hex(new FileInputStream(path));
        System.out.println("md5=>" + md5);
        LocalDateTime end = LocalDateTime.now();
        Duration duration = Duration.between(start, end);
        System.out.println("用时: " + duration.toSeconds() + "s");
    }
    public static void getMD5Three(String path) {
        LocalDateTime start = LocalDateTime.now();
        BigInteger bi = null;
        try {
            byte[] buffer = new byte[8192];
            int len = 0;
            MessageDigest md = MessageDigest.getInstance("MD5");
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
        System.out.println("md5=>" + md5);
        LocalDateTime end = LocalDateTime.now();
        Duration duration = Duration.between(start, end);
        System.out.println("用时: " + duration.toSeconds() + "s");
    }
}
```

运行

```powershell
mvn compile&&mvn exec:java
```

## dart

```dart
import 'dart:io';

import 'package:crypto/crypto.dart' as crypto;

bool isWin(String input) {
  RegExp pathReg = RegExp(r"\.\\");
  return pathReg.hasMatch(input);
}

void main(List<String> arguments) async {
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
        'md5:$checksum \n 用时: ${(DateTime.now().millisecondsSinceEpoch - now.millisecondsSinceEpoch) / 1000}s');
  } catch (e) {
    print(e);
    print("找不到文件");
  }
}
```

运行

```powershell
dart run .\bin\md5.dart "D:\\Documents\\Windows11.iso"
```

## csharp

```cs
using System.Diagnostics;
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
            Console.WriteLine("用时: {0}s", ts.TotalSeconds);
        }
        public static string GetMD5HashFromFile(string fileName) {
            try {
                FileStream file = new FileStream(fileName, System.IO.FileMode.Open);
                MD5 md5 = MD5.Create();
                byte[] retVal = md5.ComputeHash(file);
                file.Close();
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < retVal.Length; i++) {
                    sb.Append(retVal[i].ToString("x2"));
                }
                return sb.ToString();
            } catch (Exception ex) {
                throw new Exception("GetMD5HashFromFile() fail,error:" + ex.Message);
            }
        }
    }
}

```

运行

```powershell
dotnet run --project ConsoleApp  D:\Documents\Windows11.iso
```

## Rust

```rust
use std::{env, fs};
use std::fs::File;
use std::time::Instant;
use digest::Digest;

fn main() {
    let args: Vec<String> = env::args().collect();
    println!("{}", &args[1]);
    let now = Instant::now();

    gen_fsmd5(&args[1]);
    println!("用时: {}s", now.elapsed().as_secs());

}
fn gen_fsmd5(file: &str){
    let   f=fs::read(file).unwrap();
    println!("{:x}", md5::Md5::digest(f));
}

```

运行

```powershell
cargo run --bin md5 D:\Documents\Windows11.iso
```

## nodejs

```js
import { createReadStream } from "fs";
import { createHash } from "crypto";
import { argv } from "process";

export async function getLargeMd5(file) {
  console.log(file);
  let start = performance.now();
  const stream = createReadStream(file);
  const hash = createHash("md5");
  stream.on("data", (chunk) => {
    hash.update(chunk, "utf8");
  });
  stream.on("end", () => {
    const md5 = hash.digest("hex");
    console.log(md5);
    let end = performance.now();
    console.log(`用时:${(end - start) / 1000}s`);
  });
}
getLargeMd5(argv[2]);
```

运行

```powershell
node .\cli.mjs D:\Documents\Windows11.iso
```

## php

```php
<?php
$time_start = microtime(true);
echo  "$argv[1]\n";
echo md5_file($argv[1] );

$time_end = microtime(true);
$time = $time_end - $time_start;
echo "\n";
echo "时间: $time s\n";

```

运行

```powershell
php .\index.php  D:\Documents\Windows11.iso
```
