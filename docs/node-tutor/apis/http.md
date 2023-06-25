# http

## 创建一个服务器

```js
import http from 'http'
http.createServer(function (req, res) {
  res.write('Hello xkd'); 
  res.end(); 
}).listen(8888);
```

或者

```js
import http from 'http'
let server = new http.Server();

server.on("request",function(req,res){
    res.writeHead(200,{        
      "content-type":"text/plain; charset=utf-8"
    });
    res.write("xkd");
    res.end();
});
server.listen(8888);
```

## 查询字符串

拆分查询字符串

```js
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  let q = url.parse(req.url, true).query;
  let txt = q.year + " " + q.month;
  res.end(txt);
}).listen(8080);
```

## 模拟加载很慢的请求

```js
http
  .createServer((req, res) => {
    const index = req.url.indexOf('?');
    if (index >= 0) {
      const query = req.url.slice(index);
      const ss = new URLSearchParams(query);
      const timeout = ss.get('timeout');
      const type = ss.get('type');
      if (timeout && Number(timeout)) {
        return setTimeout(() => {
          if (type === 'json') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ code: 0, msg: 'hello world' }));
          } else if (type === 'image') {
            // 输出本地一个图片
          } else {
            res.end(`delay ${timeout}ms response`);
          }
        }, Number(timeout));
      }
    }
    res.end('hello world!');
  })
  .listen(port, ip);
```

延迟输出图片

```js
const stream = fs.createReadStream('./img/s.jpg');
const responseData = []; //存储文件流
if (stream) {
  //判断状态
  stream.on('data', function (chunk) {
    responseData.push(chunk);
  });
  stream.on('end', function () {
    const finalData = Buffer.concat(responseData);
    // response.write();
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(finalData);
  });
}
```

## 实现接口的中转代理

```js
 

const ip = process.env.IP || '127.0.0.1';
const port = process.env.PORT || 3001;

http
  .createServer((req, res) => {
    const allowList = ['joke.qq.com', 'www.qq.com'];
    if (!req.headers || !req.headers.referer || allow) {
      res.writeHead(403, 'forbidden');
      res.end('403 forbidden');
      return;
    }
    console.log('发起请求', req.headers);
    https
      .get('https://www.v2ex.com/api/topics/latest.json', (response) => {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          res.setHeader('Access-Control-Allow-Origin', (req.headers.referer || '').replace(/\/$/, ''));
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
          res.end(data);
        });
      })
      .on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`, e);
        res.end('error');
      });
  })
  .listen(port, ip);
console.log(`server has started at ${ip}:${port}`);
```
