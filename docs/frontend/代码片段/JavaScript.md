# js代码片段

## 格式化文件大小

```javascript
//格式化文件大小
export const renderSize = value => {
  if (null == value || value == '') {
    return '0 Bytes'
  }
  var unitArr = new Array('Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB')
  var index = 0
  var srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  var size = srcsize / Math.pow(1024, index)
  size = size.toFixed(2) //保留的小数位数
  return size + unitArr[index]
}

```

## 文本链接复制

```javascript
copyPersonURL(content) {
    let that = this
    if (window.ClipboardData) {
        window.clipboardData.setData('text', content)
        this.$message.success('链接复制成功')
    } else {
        ;(function (content) {
            document.oncopy = function (e) {
                e.clipboardData.setData('text', content)
                e.preventDefault()
                document.oncopy = null
                that.$message.success('链接复制成功')
            }
        })(content)
        document.execCommand('Copy')
    }
},

```

## 时间戳转换(可以用dayjs替换)

```javascript
// 时间戳转年月日 时分秒
export const Time = value => {
  return transformTime(value)
}
function transformTime(timestamp = +new Date()) {
  if (timestamp) {
    var time = new Date(timestamp)
    var y = time.getFullYear()
    var M = time.getMonth() + 1
    var d = time.getDate()
    var h = time.getHours()
    var m = time.getMinutes()
    var s = time.getSeconds()
    return y + '-' + addZero(M) + '-' + addZero(d) + ' ' + addZero(h) + ':' + addZero(m) + ':' + addZero(s)
  } else {
    return ''
  }
}
function addZero(m) {
  return m < 10 ? '0' + m : m
}

```

## 数据类型验证

```javascript
function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object',
    '[object FormData]' : 'formData'
  };
  return map[toString.call(obj)];
}

```

## h5全屏代码

```javascript
function fullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
fullscreen(document.documentElement)
```

## 字符串中某字符出现最多次数

```javascript
/**
 * @param {String}str 只接受字符串类型
 * @return{JSON} key:出现最多字符， value:出现次数;  数组类型不是String类型，则返回空对象
 **/
function getMax(str) {
  let hash = {};
  let num = 0;
  let json = {}; //返回的对象
  //判断是否是字符串
  if (Object.prototype.toString.call(str) !== "[object String]") {
    return json;
  }
  for (let i = 0; i < str.length; i++) {
    if (hash[str[i]] === undefined) {
      hash[str[i]] = 1;
    } else {
      hash[str[i]]++;
    }
  }
  for (let item in hash) {
    if (num < hash[item]) {
      num = hash[item];
      json = { 字符: item, 次数: hash[item] };
    }
  }
  return json;
}
console.log(getMax("aaaabbbbcccccccceeeeeeeeeeeeeeetttttttttt"))
```

## 字符串中某字符出现次数

```javascript
function getMost(str) {
  // 步骤1
  var result = {};
  for (let i in str) {
    if (str[i] in result) {
      // 步骤2
      result[str[i]]++;
    } else {
      // 步骤3
      var object = {};
      object[str[i]] = 1;
      result = Object.assign(result, object);
    }
  }
  return result;
}

var result = getMost("xyzzyxyz");
console.log(result); //{x: 2, y: 3, z: 3}

```

### 使用reduce

```javascript
function getMost(str) {
    var result = Array.prototype.reduce.call(str, function(allWords, curWord) {
        allWords[curWord] ? allWords[curWord]++ : allWords[curWord] = 1;
        return allWords;
    }, {});

    return result;
}

var result = getMost("xyzzyxyz");
console.log(result);        //{x: 2, y: 3, z: 3}
```

## 根据id对数组进行分组

```javascript
let arr = [
  { id: '1001', name: '值1', value: '111' },
  { id: '1001', name: '值1', value: '11111' },
  { id: '1002', name: '值2', value: '25462' },
  { id: '1002', name: '值2', value: '23131' },
  { id: '1002', name: '值2', value: '2315432' },
  { id: '1003', name: '值3', value: '333333' }
]
let map = {}
let dest = []
for (let i = 0; i < arr.length; i++) {
  let ai = arr[i]
  if (!map[ai.id]) {
    dest.push({
      id: ai.id,
      name: ai.name,
      data: [ai]
    })
    map[ai.id] = ai
  } else {
    for (let j = 0; j < dest.length; j++) {
      let dj = dest[j]
      if (dj.id == ai.id) {
        dj.data.push(ai)
        break
      }
    }
  }
}
console.log(dest)

```

### 或者使用reduce

```javascript
let a=[
  { name:"张三1", age: 13 },
  { name:"张三2", age: 13 },
  { name:"张三3", age: 13 },
  { name:"张三4", age: 14 },
  { name:"张三5", age: 14 },
  { name:"张三6", age: 14 },
  { name:"张三7", age: 15 }
]
let b=a.reduce(
  (a, b) => {
    let item = a.filter(
      x => x[0] && x[0].age == b.age)[0];
    item ? item.push(b) : a.push([b]);
    return a;
  },
  []
);
console.log(b)

```
