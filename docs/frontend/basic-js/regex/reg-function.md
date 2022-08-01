# regex函数

## reg.test

```js
let r = /\d{3}/;
let a = '123';
let b = '123ABC';
let c = 'abc';

r.test(a)  //true
r.test(b) //true
r.test(c) //false
```

## str.match

```js
let r = /compus/
let reg = /w+/
let s = "compus, I know something about you"
r.test(s)  //true
s.match(r)  //["compus"]
s.match(reg) //["compus"]
```

## reg.exec

`reg.exec()`每次调用，返回一个匹配的结果，匹配结果和分组以数组的形式返回，不断的调用即可返回下一个结果，直到返回

```js
let str = "Here is a Phone Number 111-2313 and 133-2311" ;
let srg = /(\d{3})[-.]\d{4}/g;
let result = srg.exec(str);
while(result !== null) {
    console.log(result);
    result = srg.exec(str);
}
```

## str.replace()

```js
var s = "Hello,My name is Vincent. What is your name?"
var newStr = s.replace(/\b\w{4}\b/g,replacer)
console.log(newStr)
function replacer(match) {
    console.log(match);
    return match.toUpperCase();
} 
```
