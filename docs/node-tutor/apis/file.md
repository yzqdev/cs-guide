# file

:::tip
<https://nodejs.dev/learn/the-nodejs-fs-module>
:::

## 使用readfile

```ts
import * as fs from 'fs'

fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

```

当然也可以使用同步的方式

```ts
import * as fs from 'fs'
try {
  const data = fs.readFileSync('/Users/joe/test.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}
```

使用promise格式的fs

```ts
imort * as fsPromises from 'fs/promises'
async function example() {
  try {
    const data = await fsPromises.readFile('/Users/joe/test.txt', { encoding: 'utf8' });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
example();
```

## 写入文件

```ts
import * as fs from 'fs'
const content = 'Some content!';

fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});
```

使用同步的写法

```ts
import * as fs from 'fs'
const content = 'Some content!';

try {
  fs.writeFileSync('/Users/joe/test.txt', content);
  // file written successfully
} catch (err) {
  console.error(err);
}
```

使用promise的写法

```ts
imort * as fsPromises from 'fs/promises'

async function example() {
  try {
    const content = 'Some content!';
    await fsPromises.writeFile('/Users/joe/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}
example();

```

添加写入的flag

```ts
fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {});

```

r+:打开文件(写入或者读取)

## 在末尾追加

```ts
const content = 'Some content!';

fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err);
  }
  // done!
});
```

使用promise

```ts
async function example() {
  try {
    const content = 'Some content!';
    await fsPromises.appendFile('/Users/joe/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}
example();
```

## 写入流

```ts
import * as fs from 'fs'
let data = '菜鸟教程官网地址：www.runoob.com';

// 创建一个可以写入的流，写入到文件 output.txt 中
let  writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> finish、error
writerStream.on('finish', function() {
    console.log("写入完成。");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```
