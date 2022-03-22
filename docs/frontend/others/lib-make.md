
# 编写自己的代码库（javascript常用实例的实现与封装）

## 1.前言

大家在开发的时候应该知道，有很多常见的实例操作。比如数组去重，关键词高亮，打乱数组等。这些操作，代码一般不会很多，实现的逻辑也不会很难，下面的代码，我解释就不解释太多了，打上注释，相信大家就会懂了。但是，用的地方会比较，如果项目有哪个地方需要用，如果重复写的话，就是代码沉余，开发效率也不用，复用基本就是复制粘贴！这样是一个很不好的习惯，大家可以考虑一下把一些常见的操作封装成函数，调用的时候，直接调用就好！
源码都放在github上了，大家想以后以后有什么修改或者增加的，欢迎大家来star一下[ec-do](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FchenhuiYj%2Fec-do)。

> 1.下面代码，我放的是es5版本的，如果大家需要看es6版本的，请移步[ec-do2.0.0.js](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FchenhuiYj%2Fec-do%2Fblob%2Fmaster%2Fsrc%2Fec-do-2.0.0.js)
>
> 2.想看完整代码的，或者部分实例的demo，建议去github看！
>
> 3.下面的代码，都是封装在ecDo这个对象里面，如果里面有this，除了特别说明的，都是指向ecDo

## 2.字符串操作

### 2-1去除字符串空格

```
//去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
//ecDo.trim('  1235asd',1)
//result：1235asd
//这个方法有原生的方案代替，但是考虑到有时候开发PC站需要兼容IE8，所以就还是继续保留
trim: function (str, type) {
    switch (type) {
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}

```

### 2-2字母大小写切换

```
/*type
 1:首字母大写
 2：首页母小写
 3：大小写转换
 4：全部大写
 5：全部小写
 * */
//ecDo.changeCase('asdasd',1)
//result：Asdasd
changeCase: function (str, type) {
    function ToggleCase(str) {
        var itemText = ""
        str.split("").forEach(
            function (item) {
                if (/^([a-z]+)/.test(item)) {
                    itemText += item.toUpperCase();
                } else if (/^([A-Z]+)/.test(item)) {
                    itemText += item.toLowerCase();
                } else {
                    itemText += item;
                }
            });
        return itemText;
    }
    switch (type) {
        case 1:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
            });
        case 2:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
            });
        case 3:
            return ToggleCase(str);
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}

```

### 2-3字符串循环复制

```
//repeatStr(str->字符串, count->次数)
//ecDo.repeatStr('123',3)
//"result：123123123"
repeatStr: function (str, count) {
    var text = '';
    for (var i = 0; i < count; i++) {
        text += str;
    }
    return text;
}

```

### 2-4字符串替换

```
//ecDo.replaceAll('这里是上海，中国第三大城市，广东省省会，简称穗，','上海','广州')
//result："这里是广州，中国第三大城市，广东省省会，简称穗，"
replaceAll: function (str, AFindText, ARepText) {
    raRegExp = new RegExp(AFindText, "g");
    return str.replace(raRegExp, ARepText);
}

```

### 2-5替换*

```
//字符替换*
//replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
//ecDo.replaceStr('18819322663',[3,5,3],0)
//result：188*****663
//ecDo.replaceStr('asdasdasdaa',[3,5,3],1)
//result：***asdas***
//ecDo.replaceStr('1asd88465asdwqe3',[5],0)
//result：*****8465asdwqe3
//ecDo.replaceStr('1asd88465asdwqe3',[5],1,'+')
//result："1asd88465as+++++"
replaceStr: function (str, regArr, type, ARepText) {
    var regtext = '',
        Reg = null,
        replaceText = ARepText || '*';
    //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
    if (regArr.length === 3 && type === 0) {
        regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
        Reg = new RegExp(regtext);
        var replaceCount = this.repeatStr(replaceText, regArr[1]);
        return str.replace(Reg, '$1' + replaceCount + '$2')
    }
    else if (regArr.length === 3 && type === 1) {
        regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
        Reg = new RegExp(regtext);
        var replaceCount1 = this.repeatStr(replaceText, regArr[0]);
        var replaceCount2 = this.repeatStr(replaceText, regArr[2]);
        return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
    }
    else if (regArr.length === 1 && type === 0) {
        regtext = '(^\\w{' + regArr[0] + '})'
        Reg = new RegExp(regtext);
        var replaceCount = this.repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
    else if (regArr.length === 1 && type === 1) {
        regtext = '(\\w{' + regArr[0] + '}$)'
        Reg = new RegExp(regtext);
        var replaceCount = this.repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
}

```

### 2-6检测字符串

```
//检测字符串
//ecDo.checkType('165226226326','phone')
//result：false
//大家可以根据需要扩展
checkType: function (str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
            return /^[0-9]$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'text':
            return /^\w+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        default:
            return true;
    }
}

```

### 2-7 检测密码强度

```
//ecDo.checkPwd('12asdASAD')
//result：3(强度等级为3)
checkPwd: function (str) {
    var nowLv = 0;
    if (str.length < 6) {
        return nowLv
    }
    if (/[0-9]/.test(str)) {
        nowLv++
    }
    if (/[a-z]/.test(str)) {
        nowLv++
    }
    if (/[A-Z]/.test(str)) {
        nowLv++
    }
    if (/[\.|-|_]/.test(str)) {
        nowLv++
    }
    return nowLv;
}

```

### 2-8随机码（toString详解）

```
//count取值范围0-36
//ecDo.randomWord(10)
//result："2584316588472575"
//ecDo.randomWord(14)
//result："9b405070dd00122640c192caab84537"
//ecDo.randomWord(36)
//result："83vhdx10rmjkyb9"
randomWord: function (count) {
    return Math.random().toString(count).substring(2);
}

```

### 2-9查找字符串

可能标题会有点误导，下面我就简单说明一个需求，在字符串`'sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'`中找出'blog'的出现次数。代码如下

```
//var strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
//ecDo.countStr(strTest,'blog')
//result：6
countStr: function (str, strSplit) {
    return str.split(strSplit).length - 1
}

```

### 2-10 过滤字符串

```
//过滤字符串(html标签，表情，特殊字符)
//字符串，替换内容（special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文），要替换成什么，默认'',保留哪些特殊字符
//如果需要过滤多种字符，type参数使用,分割，如下栗子
//过滤字符串的html标签，大写字母，中文，特殊字符，全部替换成*,但是特殊字符'%'，'?'，除了这两个，其他特殊字符全部清除
//var str='asd    654a大蠢sasdasdASDQWEXZC6d5#%^*^&*^%^&*$\\"\'#@!()*/-())_\'":"{}?<div></div><img src=""/>啊实打实大蠢猪自行车这些课程';
// ecDo.filterStr(str,'html,WORD,chinese,special','*','%?')
//result："asd    654a**sasdasd*********6d5#%^*^&*^%^&*$\"'#@!()*/-())_'":"{}?*****************"
filterStr: function (str, type, restr, spstr) {
    var typeArr = type.split(','), _str = str;
    for (var i = 0, len = typeArr.length; i < len; i++) {
        //是否是过滤特殊符号
        if (typeArr[i] === 'special') {
            var pattern, regText = '$()[]{}?\|^*+./\"\'+';
            //是否有哪些特殊符号需要保留
            if (spstr) {
                var _spstr = spstr.split(""), _regText = "[^0-9A-Za-z\\s";
                for (var j = 0, len1 = _spstr.length; j < len1; j++) {
                    if (regText.indexOf(_spstr[j]) === -1) {
                        _regText += _spstr[j];
                    }
                    else {
                        _regText += '\\' + _spstr[j];
                    }
                }
                _regText += ']'
                pattern = new RegExp(_regText, 'g');
            }
            else {
                pattern = new RegExp("[^0-9A-Za-z\\s]", 'g')
            }
        }
        var _restr = restr || '';
        switch (typeArr[i]) {
            case 'special':
                _str = _str.replace(pattern, _restr);
                break;
            case 'html':
                _str = _str.replace(/<\/?[^>]*>/g, _restr);
                break;
            case 'emjoy':
                _str = _str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g, _restr);
                break;
            case 'word':
                _str = _str.replace(/[a-z]/g, _restr);
                break;
            case 'WORD':
                _str = _str.replace(/[A-Z]/g, _restr);
                break;
            case 'number':
                _str = _str.replace(/[0-9]/g, _restr);
                break;
            case 'chinese':
                _str = _str.replace(/[\u4E00-\u9FA5]/g, _restr);
                break;
        }
    }
    return _str;
}

```

### 2-11格式化处理字符串

```
//ecDo.formatText('1234asda567asd890')
//result："12,34a,sda,567,asd,890"
//ecDo.formatText('1234asda567asd890',4,' ')
//result："1 234a sda5 67as d890"
//ecDo.formatText('1234asda567asd890',4,'-')
//result："1-234a-sda5-67as-d890"
formatText: function (str, size, delimiter) {
    var _size = size || 3, _delimiter = delimiter || ',';
    var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
    var reg = new RegExp(regText, 'g');
    return str.replace(reg, _delimiter);
}

```

### 2-12找出最长单词

```
//ecDo.longestWord('Find the Longest word in a String')
//result：7
//ecDo.longestWord('Find|the|Longest|word|in|a|String','|')
//result：7
longestWord: function (str, splitType) {
    var _splitType = splitType || /\s+/g,
        _max = 0,_item='';
    var strArr = str.split(_splitType);
    strArr.forEach(function (item) {
        if (_max < item.length) {
            _max = item.length
            _item=item;
        }
    })
    return {el:_item,max:_max};
}

```

### 2-13句中单词首字母大写

```
//这个我也一直在纠结，英文标题，即使是首字母大写，也未必每一个单词的首字母都是大写的，但是又不知道哪些应该大写，哪些不应该大写
//ecDo.titleCaseUp('this is a title')
//"This Is A Title"
titleCaseUp: function (str, splitType) {
    var _splitType = splitType || /\s+/g;
    var strArr = str.split(_splitType),
        result = "", _this = this
    strArr.forEach(function (item) {
        result += _this.changeCase(item, 1) + ' ';
    })
    return this.trim(result, 4)
}  

```

## 3.数组操作

### 3-1数组去重

```
removeRepeatArray: function (arr) {
    return arr.filter(function (item, index, self) {
        return self.indexOf(item) === index;
    });
}

```

### 3-2数组顺序打乱

```
upsetArr: function (arr) {
    return arr.sort(function () {
        return Math.random() - 0.5
    });
},

```

### 3-3数组最大值最小值

```
//数组最大值
maxArr: function (arr) {
    return Math.max.apply(null, arr);
},
//数组最小值
minArr: function (arr) {
    return Math.min.apply(null, arr);
}

```

### 3-4数组求和，平均值

```
//这一块的封装，主要是针对数字类型的数组
//求和
sumArr: function (arr) {
    return arr.reduce(function (pre, cur) {
        return pre + cur
    })
}
//数组平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活！
covArr: function (arr) {
    return this.sumArr(arr) / arr.length;
},

```

### 3-5从数组中随机获取元素

```
//ecDo.randomOne([1,2,3,6,8,5,4,2,6])
//2
//ecDo.randomOne([1,2,3,6,8,5,4,2,6])
//8
//ecDo.randomOne([1,2,3,6,8,5,4,2,6])
//8
//ecDo.randomOne([1,2,3,6,8,5,4,2,6])
//1
randomOne: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

```

### 3-6返回数组（字符串）一个元素出现的次数

```
//ecDo.getEleCount('asd56+asdasdwqe','a')
//result：3
//ecDo.getEleCount([1,2,3,4,5,66,77,22,55,22],22)
//result：2
getEleCount: function (obj, ele) {
    var num = 0;
    for (var i = 0, len = obj.length; i < len; i++) {
        if (ele === obj[i]) {
            num++;
        }
    }
    return num;
}

```

### 3-7返回数组（字符串）出现最多的几次元素和出现次数 ###

```
//arr, rank->长度，默认为数组长度，ranktype，排序方式，默认降序
//返回值：el->元素，count->次数
//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])
//默认情况，返回所有元素出现的次数
//result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2},{"el":"4","count":1},{"el":"5","count":1},{"el":"6","count":1}]
//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)
//传参（rank=3），只返回出现次数排序前三的
//result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2}]
//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1)
//传参（ranktype=1,rank=null），升序返回所有元素出现次数
//result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1},{"el":"3","count":2},{"el":"1","count":4},{"el":"2","count":6}]
//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3,1)
//传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的
//result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1}]
getCount: function (arr, rank, ranktype) {
    var obj = {},
        k, arr1 = []
    //记录每一元素出现的次数
    for (var i = 0, len = arr.length; i < len; i++) {
        k = arr[i];
        if (obj[k]) {
            obj[k]++;
        } else {
            obj[k] = 1;
        }
    }
    //保存结果{el-'元素'，count-出现次数}
    for (var o in obj) {
        arr1.push({el: o, count: obj[o]});
    }
    //排序（降序）
    arr1.sort(function (n1, n2) {
        return n2.count - n1.count
    });
    //如果ranktype为1，则为升序，反转数组
    if (ranktype === 1) {
        arr1 = arr1.reverse();
    }
    var rank1 = rank || arr1.length;
    return arr1.slice(0, rank1);
}

```

### 3-8得到n1-n2下标的数组

```
//ecDo.getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)
//result：[5, 6, 7, 8, 9]
//getArrayNum([0,1,2,3,4,5,6,7,8,9],2) //不传第二个参数,默认返回从n1到数组结束的元素
//result：[2, 3, 4, 5, 6, 7, 8, 9]
getArrayNum: function (arr, n1, n2) {
    return arr.slice(n1, n2);
}

```

### 3-9筛选数组

```
//删除值为'val'的数组元素
//ecDo.removeArrayForValue(['test','test1','test2','test','aaa'],'test',')
//result：["aaa"]   带有'test'的都删除
//ecDo.removeArrayForValue(['test','test1','test2','test','aaa'],'test')
//result：["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
removeArrayForValue: function (arr, val, type) {
    return arr.filter(function (item) {
        return type ? item.indexOf(val) === -1 : item !== val
    })
}

```

### 3-10 获取对象数组某些项

```
//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
//ecDo.getOptionArray(arr,'a,c')
//result：[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
//ecDo.getOptionArray(arr,'b')
//result：[2, 3, 9, 2, 5]
getOptionArray: function (arr, keys) {
    var newArr = []
    if (!keys) {
        return arr
    }
    var _keys = keys.split(','), newArrOne = {};
    //是否只是需要获取某一项的值
    if (_keys.length === 1) {
        for (var i = 0, len = arr.length; i < len; i++) {
            newArr.push(arr[i][keys])
        }
        return newArr;
    }
    for (var i = 0, len = arr.length; i < len; i++) {
        newArrOne = {};
        for (var j = 0, len1 = _keys.length; j < len1; j++) {
            newArrOne[_keys[j]] = arr[i][_keys[j]]
        }
        newArr.push(newArrOne);
    }
    return newArr
}

```

### 3-11 排除对象数组某些项

```
//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
//ecDo.filterOptionArray(arr,'a')
//result：[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
//ecDo.filterOptionArray(arr,'a,c')
//result：[{b:2},{b:3},{b:9},{b:2},{b:5}]
filterOptionArray: function (arr, keys) {
    var newArr = []
    var _keys = keys.split(','), newArrOne = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        newArrOne = {};
        for (var key in arr[i]) {
            //如果key不存在排除keys里面,添加数据
            if (_keys.indexOf(key) === -1) {
                newArrOne[key] = arr[i][key];
            }
        }
        newArr.push(newArrOne);
    }
    return newArr
}

```

### 3-12 对象数组排序

```
//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
//ecDo.arraySort(arr,'a,b')a是第一排序条件，b是第二排序条件
//result：[{"a":1,"b":2,"c":9},{"a":2,"b":3,"c":5},{"a":4,"b":2,"c":5},{"a":4,"b":5,"c":7},{"a":5,"b":9}]
arraySort: function (arr, sortText) {
    if (!sortText) {
        return arr
    }
    var _sortText = sortText.split(',').reverse(), _arr = arr.slice(0);
    for (var i = 0, len = _sortText.length; i < len; i++) {
        _arr.sort(function (n1, n2) {
            return n1[_sortText[i]] - n2[_sortText[i]]
        })
    }
    return _arr;
}

```

### 3-13 数组扁平化

```
//ecDo.steamroller([1,2,[4,5,[1,23]]])
//[1, 2, 4, 5, 1, 23]
steamroller: function (arr) {
    var newArr = [],_this=this;
    for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            // 如果是数组，调用(递归)steamroller 将其扁平化
            // 然后再 push 到 newArr 中
            newArr.push.apply(newArr, _this.steamroller(arr[i]));
        } else {
            // 不是数组直接 push 到 newArr 中
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

```

## 4.基础DOM操作

这个部分代码其实参考jquery的一些函数写法，唯一区别就是调用不用，参数一样.
比如下面的栗子

```
//设置对象内容
jquery：$('#xxx').html('hello world');
现在：ecDo.html(document.getElementById('xxx'),'hello world')
//获取对象内容
jquery：$('#xxx').html();
现在：ecDo.html(document.getElementById('xxx'))

```

### 4-1检测对象是否有哪个类名

```
//检测对象是否有哪个类名
hasClass: function (obj, classStr) {
    if (obj.className && this.trim(obj.className, 1) !== "") {
        var arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
        return (arr.indexOf(classStr) == -1) ? false : true;
    }
    else {
        return false;
    }
}

```

### 4-2 添加类名

```
addClass: function (obj, classStr) {
    if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length >= 1) {
        for (var i = 0, len = obj.length; i < len; i++) {
            if (!this.hasClass(obj[i], classStr)) {
                obj[i].className += " " + classStr;
            }
        }
    }
    else {
        if (!this.hasClass(obj, classStr)) {
            obj.className += " " + classStr;
        }
    }
}

```

### 4-3删除类名

```
removeClass: function (obj, classStr) {
    if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length > 1) {
        for (var i = 0, len = obj.length; i < len; i++) {
            if (this.hasClass(obj[i], classStr)) {
                var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
                obj[i].className = obj[i].className.replace(reg, '');
            }
        }
    }
    else {
        if (this.hasClass(obj, classStr)) {
            var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
            obj.className = obj.className.replace(reg, '');
        }
    }
}

```

### 4-4替换类名("被替换的类名","替换的类名")

```
replaceClass: function (obj, newName, oldName) {
    this.removeClass(obj, oldName);
    this.addClass(obj, newName);
}

```

### 4-5获取兄弟节点

```
//ecDo.siblings(obj,'#id')
siblings: function (obj, opt) {
    var a = []; //定义一个数组，用来存o的兄弟元素
    var p = obj.previousSibling;
    while (p) { //先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
        if (p.nodeType === 1) {
            a.push(p);
        }
        p = p.previousSibling //最后把上一个节点赋给p
    }
    a.reverse() //把顺序反转一下 这样元素的顺序就是按先后的了
    var n = obj.nextSibling; //再取o的弟弟
    while (n) { //判断有没有下一个弟弟结点 n是nextSibling的意思
        if (n.nodeType === 1) {
            a.push(n);
        }
        n = n.nextSibling;
    }
    if (opt) {
        var _opt = opt.substr(1);
        var b = [];//定义一个数组，用于储存过滤a的数组
        if (opt[0] === '.') {
            b = a.filter(function (item) {
                return item.className === _opt
            });
        }
        else if (opt[0] === '#') {
            b = a.filter(function (item) {
                return item.id === _opt
            });
        }
        else {
            b = a.filter(function (item) {
                return item.tagName.toLowerCase() === opt
            });
        }
        return b;
    }
    return a;
}

```

### 4-6设置样式

```
css: function (obj, json) {
    for (var attr in json) {
        obj.style[attr] = json[attr];
    }
}

```

### 4-7设置文本内容

```
html: function (obj) {
    if (arguments.length === 1) {
        return obj.innerHTML;
    } else if (arguments.length === 2) {
        obj.innerHTML = arguments[1];
    }
}
text: function (obj) {
    if (arguments.length === 1) {
        return obj.innerHTML;
    } else if (arguments.length === 2) {
        obj.innerHTML = this.filterStr(arguments[1],'html');
    }
}

```

### 4-8显示隐藏

```
show: function (obj) {
    var blockArr=['div','li','ul','ol','dl','table','article','h1','h2','h3','h4','h5','h6','p','hr','header','footer','details','summary','section','aside','']
    if(blockArr.indexOf(obj.tagName.toLocaleLowerCase())===-1){
        obj.style.display ='inline';
    }
    else{
        obj.style.display ='block';
    }
},
hide: function (obj) {
    obj.style.display = "none";
}

```

## 5.其他操作

### 5-1cookie

```
//cookie
//设置cookie
setCookie: function (name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + ';expires=' + oDate;
},
//获取cookie
getCookie: function (name) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return '';
},
//删除cookie
removeCookie: function (name) {
    this.setCookie(name, 1, -1);
},

```

### 5-2清除对象中值为空的属性

```
//ecDo.filterParams({a:"",b:null,c:"010",d:123})
//Object {c: "010", d: 123}
filterParams: function (obj) {
    var _newPar = {};
    for (var key in obj) {
        if ((obj[key] === 0 ||obj[key] === false|| obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
            _newPar[key] = obj[key];
        }
    }
    return _newPar;
}

```

### 5-3现金额大写转换函数

```
//ecDo.upDigit(168752632)
//result："人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
//ecDo.upDigit(1682)
//result："人民币壹仟陆佰捌拾贰元整"
//ecDo.upDigit(-1693)
//result："欠人民币壹仟陆佰玖拾叁元整"
upDigit: function (n) {
    var fraction = ['角', '分', '厘'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠人民币' : '人民币';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        //s = p + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
} 

```

### 5-4获取，设置url参数

```
//设置url参数
//ecDo.setUrlPrmt({'a':1,'b':2})
//result：a=1&b=2
setUrlPrmt: function (obj) {
    var _rs = [];
    for (var p in obj) {
        if (obj[p] != null && obj[p] != '') {
            _rs.push(p + '=' + obj[p])
        }
    }
    return _rs.join('&');
},
//获取url参数
//ecDo.getUrlPrmt('test.com/write?draftId=122000011938')
//result：Object{draftId: "122000011938"}
getUrlPrmt: function (url) {
    url = url ? url : window.location.href;
    var _pa = url.substring(url.indexOf('?') + 1),
        _arrS = _pa.split('&'),
        _rs = {};
    for (var i = 0, _len = _arrS.length; i < _len; i++) {
        var pos = _arrS[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        var name = _arrS[i].substring(0, pos),
            value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
}

```

### 5-5随机返回一个范围的数字

```
//ecDo.randomNumber(5,10)
//返回5-10的随机整数，包括5，10
//ecDo.randomNumber(10)
//返回0-10的随机整数，包括0，10
//ecDo.randomNumber()
//返回0-255的随机整数，包括0，255
randomNumber: function (n1, n2) {
    if (arguments.length === 2) {
        return Math.round(n1 + Math.random() * (n2 - n1));
    }
    else if (arguments.length === 1) {
        return Math.round(Math.random() * n1)
    }
    else {
        return Math.round(Math.random() * 255)
    }
}

```

### 5-6随进产生颜色

```
randomColor: function () {
    //randomNumber是下面定义的函数
    //写法1
    //return 'rgb(' + this.randomNumber(255) + ',' + this.randomNumber(255) + ',' + this.randomNumber(255) + ')';
    //写法2
    return '#' + Math.random().toString(16).substring(2).substr(0, 6);
    //写法3
    //var color='#',_index=this.randomNumber(15);
    //for(var i=0;i<6;i++){
    //color+='0123456789abcdef'[_index];
    //}
    //return color;
}
//这种写法，偶尔会有问题。大家得注意哦
//Math.floor(Math.random()*0xffffff).toString(16);

```

![clipboard.png](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="549" height="216"></svg>)

### 5-7Date日期时间部分

```
//到某一个时间的倒计时
//ecDo.getEndTime('2017/7/22 16:0:0')
//result："剩余时间6天 2小时 28 分钟20 秒"
getEndTime: function (endTime) {
    var startDate = new Date(); //开始时间，当前时间
    var endDate = new Date(endTime); //结束时间，需传入时间参数
    var t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return "剩余时间" + d + "天 " + h + "小时 " + m + " 分钟" + s + " 秒";
}

```

### 5-8适配rem

这个适配的方法很多，我就写我自己用的方法。大家也可以去我回答过得一个问题那里看更详细的说明！[移动端适配问题](https://link.juejin.im/?target=https%3A%2F%2Fsegmentfault.com%2Fq%2F1010000010179208%2Fa-1020000010179558)

```
getFontSize: function (_client) {
    var doc = document,
        win = window;
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
            if (clientWidth > _client) {
                clientWidth = _client
            }
            //设置根元素font-size大小
            docEl.style.fontSize = 100 * (clientWidth / _client) + 'px';
        };
    //屏幕大小改变，或者横竖屏切换时，触发函数
    win.addEventListener(resizeEvt, recalc, false);
    //文档加载完成时，触发函数
    doc.addEventListener('DOMContentLoaded', recalc, false);
}
//ecDo.getFontSize(750)
//使用方式很简单，比如效果图上，有张图片。宽高都是100px;
//750是设计图的宽度
//样式写法就是
img{
    width:1rem;
    height:1rem;
}
//这样的设置，比如在屏幕宽度大于等于750px设备上，1rem=100px；图片显示就是宽高都是100px
//比如在iphone6(屏幕宽度：375)上，375/750*100=50px;就是1rem=50px;图片显示就是宽高都是50px;

```

### 5-9ajax

```
/* 封装ajax函数
 * @param {string}obj.type http连接的方式，包括POST和GET两种方式
 * @param {string}obj.url 发送请求的url
 * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}obj.data 发送的参数，格式为对象类型
 * @param {function}obj.success ajax发送并接收成功调用的回调函数
 * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
 */
//  ecDo.ajax({
//      type:'get',
//      url:'xxx',
//      data:{
//          id:'111'
//      },
//      success:function(res){
//          console.log(res)
//      }
//  })
ajax: function (obj) {
    obj = obj || {};
    obj.type = obj.type.toUpperCase() || 'POST';
    obj.url = obj.url || '';
    obj.async = obj.async || true;
    obj.data = obj.data || null;
    obj.success = obj.success || function () {
        };
    obj.error = obj.error || function () {
        };
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var params = [];
    for (var key in obj.data) {
        params.push(key + '=' + obj.data[key]);
    }
    var postData = params.join('&');
    if (obj.type.toUpperCase() === 'POST') {
        xmlHttp.open(obj.type, obj.url, obj.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    } else if (obj.type.toUpperCase() === 'GET') {
        xmlHttp.open(obj.type, obj.url + '?' + postData, obj.async);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            obj.success(xmlHttp.responseText);
        } else {
            obj.error(xmlHttp.responseText);
        }
    };
}

```

### 5-10图片懒加载

```
//图片没加载出来时用一张图片代替
aftLoadImg: function (obj, url, errorUrl,cb) {
    var oImg = new Image(), _this = this;
    oImg.src = url;
    oImg.onload = function () {
        obj.src = oImg.src;
        if (cb && _this.istype(cb, 'function')) {
            cb(obj);
        }
    }
    oImg.onerror=function () {
        obj.src=errorUrl;
        if (cb && _this.istype(cb, 'function')) {
            cb(obj);
        }
    }
},
//图片滚动懒加载
//@className {string} 要遍历图片的类名
//@num {number} 距离多少的时候开始加载 默认 0
//比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载
//html代码
//<p><img data-src="https://user-gold-cdn.xitu.io/2017/12/7/160319f12631736f" class="load-img" width='528' height='304' /></p>
//<p><img data-src="https://user-gold-cdn.xitu.io/2017/12/7/160319f12631736f" class="load-img" width='528' height='304' /></p>
//<p><img data-src="https://user-gold-cdn.xitu.io/2017/12/7/160319f12631736f" class="load-img" width='528' height='304' /></p>....
//data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。
//详细可以查看testLoadImg.html
//window.onload = function() {
//    loadImg('load-img',100);
//    window.onscroll = function() {
//        ecDo.loadImg('load-img',100);
//        }
//}
loadImg: function (className, num, errorUrl) {
    var _className = className || 'ec-load-img', _num = num || 0, _this = this,_errorUrl=errorUrl||null;
    var oImgLoad = document.getElementsByClassName(_className);
    for (var i = 0, len = oImgLoad.length; i < len; i++) {
        //如果图片已经滚动到指定的高度
        if (document.documentElement.clientHeight + document.documentElement.scrollTop > oImgLoad[i].offsetTop - _num && !oImgLoad[i].isLoad) {
            //记录图片是否已经加载
            oImgLoad[i].isLoad = true;
            //设置过渡，当图片下来的时候有一个图片透明度变化
            oImgLoad[i].style.cssText = "transition: ''; opacity: 0;"
            if (oImgLoad[i].dataset) {
                this.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, _errorUrl, function (o) {
                    //添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑
                    setTimeout(function () {
                        if (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = "";
                        }
                    }, 1000)
                });
            } else {
                this.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute("data-src"), _errorUrl, function (o) {
                    //添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑
                    setTimeout(function () {
                        if (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = "";
                        }
                    }, 1000)
                });
            }
            (function (i) {
                setTimeout(function () {
                    oImgLoad[i].style.cssText = "transition:all 1s; opacity: 1;";
                }, 16)
            })(i);
        }
    }
}

```

### 5-11关键词加标签

```
//这两个函数多用于搜索的时候，关键词高亮
//创建正则字符
//ecDo.createKeyExp([前端，过来])
//result:(前端|过来)/g
createKeyExp: function (strArr) {
    var str = "";
    for (var i = 0; i < strArr.length; i++) {
        if (i != strArr.length - 1) {
            str = str + strArr[i] + "|";
        } else {
            str = str + strArr[i];
        }
    }
    return "(" + str + ")";
},
//关键字加标签（多个关键词用空格隔开）
//ecDo.findKey('守侯我oaks接到了来自下次你离开快乐吉祥留在开城侯','守侯 开','i')
//"<i>守侯</i>我oaks接到了来自下次你离<i>开</i>快乐吉祥留在<i>开</i>城侯"
findKey: function (str, key, el) {
    var arr = null,
        regStr = null,
        content = null,
        Reg = null,
        _el = el || 'span';
    arr = key.split(/\s+/);
    //alert(regStr); //    如：(前端|过来)
    regStr = this.createKeyExp(arr);
    content = str;
    //alert(Reg);//        /如：(前端|过来)/g
    Reg = new RegExp(regStr, "g");
    //过滤html标签 替换标签，往关键字前后加上标签
    content = content.replace(/<\/?[^>]*>/g, '')
    return content.replace(Reg, "<" + _el + ">$1</" + _el + ">");
}

```

### 5-12数据类型判断

```
//ecDo.istype([],'array')
//true
//ecDo.istype([])
//'[object Array]'
istype: function (o, type) {
    if (type) {
        var _type = type.toLowerCase();
    }
    switch (_type) {
        case 'string':
            return Object.prototype.toString.call(o) === '[object String]';
        case 'number':
            return Object.prototype.toString.call(o) === '[object Number]';
        case 'boolean':
            return Object.prototype.toString.call(o) === '[object Boolean]';
        case 'undefined':
            return Object.prototype.toString.call(o) === '[object Undefined]';
        case 'null':
            return Object.prototype.toString.call(o) === '[object Null]';
        case 'function':
            return Object.prototype.toString.call(o) === '[object Function]';
        case 'array':
            return Object.prototype.toString.call(o) === '[object Array]';
        case 'object':
            return Object.prototype.toString.call(o) === '[object Object]';
        case 'nan':
            return isNaN(o);
        case 'elements':
            return Object.prototype.toString.call(o).indexOf('HTML') !== -1
        default:
            return Object.prototype.toString.call(o)
    }
}

```

### 5-13手机类型判断

```
browserInfo: function (type) {
    switch (type) {
        case 'android':
            return navigator.userAgent.toLowerCase().indexOf('android') !== -1
        case 'iphone':
            return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
        case 'ipad':
            return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
        case 'weixin':
            return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
        default:
            return navigator.userAgent.toLowerCase()
    }
}

```

### 5-14函数节流

```
//多用于鼠标滚动，移动，窗口大小改变等高频率触发事件
// var count=0;
// function fn1(){
//     count++;
//     console.log(count)
// }
// //100ms内连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔200ms至少执行一次
// document.onmousemove=ecDo.delayFn(fn1,100,200)
delayFn: function (fn, delay, mustDelay) {
    var timer = null;
    var t_start;
    return function () {
        var context = this, args = arguments, t_cur = +new Date();
        //先清理上一次的调用触发（上一次调用触发事件不执行）
        clearTimeout(timer);
        //如果不存触发时间，那么当前的时间就是触发时间
        if (!t_start) {
            t_start = t_cur;
        }
        //如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
        if (t_cur - t_start >= mustDelay) {
            fn.apply(context, args);
            t_start = t_cur;
        }
        //否则延迟执行
        else {
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        }
    };
}

```

## 6.封装成形

> 可能有小伙伴会有疑问，这样封装，调用有点麻烦，为什么不直接在原型上面封装，调用方便。比如下面的栗子！

```
String.prototype.trim=function(type){
    switch (type){
        case 1:return this.replace(/\s+/g,"");
        case 2:return this.replace(/(^\s*)|(\s*$)/g, "");
        case 3:return this.replace(/(^\s*)/g, "");
        case 4:return this.replace(/(\s*$)/g, "");
        default:return this;
    }
}
//'  12345 6 8 96  '.trim(1)
//"123456896"
//比这样trim('  12345 6 8 96  ',1)调用方便。
//但是，这样是不推荐的做法，这样就污染了原生对象String,别人创建的String也会被污染，造成不必要的开销。
//更可怕的是，万一自己命名的跟原生的方法重名了，就被覆盖原来的方法了
//String.prototype.substr=function(){console.log('asdasd')}  
//'asdasdwe46546'.substr()
//asdasd 
//substr方法有什么作用，大家应该知道，不知道的可以去w3c看下

```

所以在原生对象原型的修改很不推荐！至少很多的公司禁止这样操作！

所以建议的封装姿势是

```
var ecDo={
    trim:function(){..},
    changeCase:function(){..}...
}

```

## 7.小结

这篇文章，写了很久了，几个小时了，因为我写这篇文章，我也是重新改我以前代码的，因为我以前写的代码，功能一样，代码比较多，现在是边想边改边写，还要自己测试（之前的代码for循环很多，现在有很多简洁的写法代替）。加上最近公司比较忙，所以这一篇文章也是花了几天才整理完成。
源码都放在github上了，大家想以后以后有什么修改或者增加的，欢迎大家来star一下[ec-do](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FchenhuiYj%2Fec-do)。
我自己封装这个，并不是我有造轮子的习惯，而是：

1，都是一些常用，但是零散的小实例，网上基本没有插件。

2，因为零散的小实例，涉及到的有字符串，数组，对象等类型，就算找到插件，在项目引入的很有可能不止一个插件。

3.都是简单的代码，封装也不难。维护也简单。

其他的不多说了，上面的只是我自己在开发中常用到，希望能帮到小伙伴们，最理想就是这篇文章能起到一个 **抛砖引玉** 的作用，就是说，如果觉得还有什么操作是常用的，或者觉得我哪里写得不好的，也欢迎指出，让大家相互帮助，相互学习。

[JavaScript](https://juejin.im/tag/JavaScript)

[前端](https://juejin.im/tag/%E5%89%8D%E7%AB%AF)

[GitHub](https://juejin.im/tag/GitHub)

[jQuery](https://juejin.im/tag/jQuery)
