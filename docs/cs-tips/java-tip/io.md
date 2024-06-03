# io代码片段

## inputsteam读取文件

```java
@Test  
void useSteam(){  
  //定义输入流  
  FileInputStream fis =null;  
  try {  
    //1、创建文件对象  
    File file = new File("E:\\tmpgit\\all.sql");  
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
```
## 使用newio
```java
@Test  
void say(){  
  Path file = Paths.get("build.gradle.kts");  
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
```
## 复制文件

```java
@Test  
void copyFileTest(){  
  //根据数据源创建字节输入流对象  
     try {  
        InputStream fips=Files.newInputStream(Paths.get("build.gradle.kts"));  
       //根据目的地创建字节输出流对象  
       FileOutputStream fops=new FileOutputStream("F:\\abc.txt");  

       fips.transferTo(Files.newOutputStream(Paths.get("F:/transfer.txt")));  
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
  
}```

## buffered reader 读取文本文件

```java
@Test  
  void readFileTest() throws IOException {  
    System.out.println(Paths.get(".").toAbsolutePath().toString());  
  
    //1 use buffered reader  
    try (BufferedReader br = Files.newBufferedReader(Paths.get("txt/testBufferedReader.txt"))) {  
      String inValue;  
      while ((inValue = br.readLine()) != null) {  
        System.out.println("Files.newBufferedReader=" + inValue);  
      }  
    } catch (IOException e) {  
      e.printStackTrace();  
    }  
// 2. use files. read all  
    List<String> lines = Files.readAllLines(Paths.get("txt/testBufferedReader.txt"));  
  
  
    for (String line : lines) {  
      System.out.println("Files.readAllLines==" + line);  
    }  
  
    // write file use buffered writer  
    String[] data = new String[]{"hbh"};  
    try (BufferedWriter bw = Files.newBufferedWriter(Paths.get("txt/testNewBufferedWriter.txt"))) {  
      for (String d : data) {  
        bw.write(d);  
        bw.newLine();  
  
      }  
    }  
  }
```