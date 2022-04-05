# 正则表达式教程

## 正则表达式基本语法

[正则测试工具](https://yzqdev.github.io/atools/)

两个特殊的符号'^'和'$'。他们的作用是分别指出一个字符串的开始和结束。
例子如下：

<pre>
"^The"：表示所有以"The"开始的字符串（"There"，"The cat"等）；
"of despair$"：表示所以以"of despair"结尾的字符串；
"^abc$"：表示开始和结尾都是"abc"的字符串——呵呵，只有"abc"自己了；
"notice"：表示任何包含"notice"的字符串。
象最后那个例子，如果你不使用两个特殊字符，你就在表示要查找的串在被查找串的任意部分——你并
不把它定位在某一个顶端。
其它还有'*'，'+'和'?'这三个符号，表示一个或一序列字符重复出现的次数。
它们分别表示“没有或更多”，“一次或更多”还有“没有或一次”。
</pre>

下面是几个例子：
<pre>
"ab*"：表示一个字符串有一个a后面跟着零个或若干个b。（"a", "ab", "abbb",……）；
"ab+"：表示一个字符串有一个a后面跟着至少一个b或者更多；
"ab?"：表示一个字符串有一个a后面跟着零个或者一个b；
"a?b+$"：表示在字符串的末尾有零个或一个a跟着一个或几个b。
你也可以使用范围，用大括号括起，用以表示重复次数的范围。
"ab{2}"：表示一个字符串有一个a跟着2个b（"abb"）；
"ab{2,}"：表示一个字符串有一个a跟着至少2个b；
"ab{3,5}"：表示一个字符串有一个a跟着3到5个b。
请注意，你必须指定范围的下限（如："{0,2}"而不是"{,2}"）。
还有，你可能注意到了，'*'，'+'和'?'相当于"{0,}"，"{1,}"和"{0,1}"。
还有一个'¦'，表示“或”操作：
"hi¦hello"：表示一个字符串里有"hi"或者"hello"；
"(b¦cd)ef"：表示"bef"或"cdef"；
"(a¦b)*c"：表示一串"a""b"混合的字符串后面跟一个"c"；
'.'可以替代任何字符：
"a.[0-9]"：表示一个字符串有一个"a"后面跟着一个任意字符和一个数字；
"^.{3}$"：表示有任意三个字符的字符串（长度为3个字符）；
方括号表示某些字符允许在一个字符串中的某一特定位置出现：
"[ab]"：表示一个字符串有一个"a"或"b"（相当于"a¦b"）；
"[a-d]"：表示一个字符串包含小写的'a'到'd'中的一个（相当于"a¦b¦c¦d"或者"[abcd]"）；
"^[a-zA-Z]"：表示一个以字母开头的字符串；
"[0-9]%"：表示一个百分号前有一位的数字；
",[a-zA-Z0-9]$"：表示一个字符串以一个逗号后面跟着一个字母或数字结束。
你也可以在方括号里用'^'表示不希望出现的字符，'^'应在方括号里的第一位。
（如："%[^a-zA-Z]%"表示两个百分号中不应该出现字母）。
为了逐字表达，你必须在"^.$()¦*+?{\"这些字符前加上转移字符'\'。

</pre>
请注意在方括号中，不需要转义字符。
**2.正则表达式验证控制文本框的输入字符类型**
**1.只能输入数字和英文的：**

```javascript
<input onkeyup="value=value.replace(/[\W]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" ID="Text1" NAME="Text1">
```

**2.只能输入数字的：**

```javascript
<input onkeyup="value=value.replace(/[^\d]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" ID="Text2" NAME="Text2">
```

**3.只能输入全角的：**

```javascript
<input onkeyup="value=value.replace(/[^\uFF00-\uFFFF]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\uFF00-\uFFFF]/g,''))" ID="Text3" NAME="Text3">
```

**4.只能输入汉字的：**

```javascript
<input onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\u4E00-\u9FA5]/g,''))" ID="Text4" NAME="Text4">
```

## 正则表达式的应用实例通俗说明

<pre>
*******************************************************************************
//校验是否全由数字组成
/^[0-9]{1,20}$/

^ 表示打头的字符要匹配紧跟^后面的规则
$ 表示打头的字符要匹配紧靠$前面的规则
`[ ]` 中的内容是可选字符集
[0-9] 表示要求字符范围在0-9之间
{1,20}表示数字字符串长度合法为1到20，即为[0-9]中的字符出现次数的范围是1到20次。

/^ 和 $/成对使用应该是表示要求整个字符串完全匹配定义的规则，而不是只匹配字符串中的一个子串。

*******************************************************************************
//校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串
/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/

^[a-zA-Z]{1} 表示第一个字符要求是字母。
([a-zA-Z0-9]|[._]){4,19} 表示从第二位开始（因为它紧跟在上个表达式后面）的一个长度为4到9位的字符串，它要求是由大小写字母、数字或者特殊字符集[._]组成。

*******************************************************************************
//校验用户姓名：只能输入1-30个以字母开头的字串

/^[a-zA-Z]{1,30}$/

*******************************************************************************

//校验密码：只能输入6-20个字母、数字、下划线

/^(\w){6,20}$/

\w：用于匹配字母，数字或下划线字符

*******************************************************************************

//校验普通电话、传真号码：可以“+”或数字开头，可含有“-” 和 “ ”

/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/

\d：用于匹配从0到9的数字；

“?”元字符规定其前导对象必须在目标对象中连续出现零次或一次

可以匹配的字符串如：+123 -999 999 ； +123-999 999 ；123 999 999 ；+123 999999等

*******************************************************************************
//校验URL
/^http[s]{0,1}:\/\/.+$/ 或 /^http[s]{0,1}:\/\/.{1,n}$/ (表示url串的长度为length(“https://”) + n )
\ / ：表示字符“/”。

. 表示所有字符的集

+ 等同于{1,}，就是1到正无穷吧。

*******************************************************************************
</pre>
//校验纯中文字符
/
^[\u4E00-\u9FA5]+$/

[\u4E00-\u9FA5] ：估计是中文字符集的范围吧

以上表达式均在下面的javascript中测试通过

```javascript
 
function regx(r,s)
{
  if (r == null || r == ""){
    return false;
  }
  var patrn= new RegExp(r);
  if (patrn.exec(s))
    return true
  return false
}
 
 
```

**规则表达式 ：**

```javascript
 <input type="input" name="regxStr" value="" > (填写/ /之间的表达式)
<br>
```

**校验字符串 ：**

```html
 <input type="input" name="str" value="" >
  <input type="button" name="match" value="匹配" onClick="alert(regx(regxStr.value,str.value));">
</form>
</body>
</html>
```

## 正则表达式应用

```js
"^\d+$" //非负整数（正整数 + 0）

"^[0-9]*[1-9][0-9]*$" //正整数

"^((-\d+)|(0+))$" //非正整数（负整数 + 0）

"^-[0-9]*[1-9][0-9]*$" //负整数

"^-?\d+$" //整数

"^\d+(\.\d+)?$" //非负浮点数（正浮点数 + 0）

"^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$" //正浮点数

"^((-\d+(\.\d+)?)|(0+(\.0+)?))$" //非正浮点数（负浮点数 + 0）
"^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$" //负浮点数

"^(-?\d+)(\.\d+)?$" //浮点数

"^[A-Za-z]+$" //由26个英文字母组成的字符串

"^[A-Z]+$" //由26个英文字母的大写组成的字符串

"^[a-z]+$" //由26个英文字母的小写组成的字符串

"^[A-Za-z0-9]+$" //由数字和26个英文字母组成的字符串

"^\w+$" //由数字、26个英文字母或者下划线组成的字符串

"^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$" //email地址

"^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$" //url
/^(d{2}|d{4})-((0([1-9]{1}))|(1[1|2]))-(([0-2]([1-9]{1}))|(3[0|1]))$/   //  年-月-日
/^((0([1-9]{1}))|(1[1|2]))/(([0-2]([1-9]{1}))|(3[0|1]))/(d{2}|d{4})$/   // 月/日/年

"^([w-.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([w-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$"   //Emil

"(d+-)?(d{4}-?d{7}|d{3}-?d{8}|^d{7,8})(-d+)?"     //电话号码

"^(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5])$"   //IP地址

^([0-9A-F]{2})(-[0-9A-F]{2}){5}$   //MAC地址的正则表达式

^[-+]?\d+(\.\d+)?$  //值类型正则表达式
```

## javascript正则表达式检验

**//校验是否全由数字组成**

```javascript
function isDigit(s)
{
var patrn=/^[0-9]{1,20}$/;
if (!patrn.exec(s)) return false
return true
}
```

**//校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串**

```javascript
function isRegisterUserName(s)
{
var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
if (!patrn.exec(s)) return false
return true
}

```

**//校验用户姓名：只能输入1-30个以字母开头的字串**

```javascript
function isTrueName(s)
{
var patrn=/^[a-zA-Z]{1,30}$/;
if (!patrn.exec(s)) return false
return true
}

```

**//校验密码：只能输入6-20个字母、数字、下划线**

```javascript
function isPasswd(s)
{
var patrn=/^(\w){6,20}$/;
if (!patrn.exec(s)) return false
return true
}
```

**//校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”**

```javascript
function isTel(s)
{
//var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?(\d){1,12})+$/;
var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
if (!patrn.exec(s)) return false
return true
}
```

//校验手机号码：必须以数字开头，除数字外，可含有“-”

```javascript
function isMobil(s)
{
var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
if (!patrn.exec(s)) return false
return true
}
```

**//校验邮政编码**

```javascript
function isPostalCode(s)
{
//var patrn=/^[a-zA-Z0-9]{3,12}$/;
var patrn=/^[a-zA-Z0-9 ]{3,12}$/;
if (!patrn.exec(s)) return false
return true
}
```

## 校验搜索关键字

```javascript
function isSearch(s) {
  var patrn =
    /^[^`~!@#$%^&*()+=|\\\][\]\{\}:;\'\,.<>/?]{1}[^`~!@$%^&()+=|\\\][\]\{\}:;\'\,.<>?]{0,19}$/;
  if (!patrn.exec(s)) return false;
  return true;
}
function isIP(s) {
  //by zergling
  var patrn = /^[0-9.]{1,20}$/;
  if (!patrn.exec(s)) return false;
  return true;
}

/*********************************************************************************
 * FUNCTION: isBetween
 * PARAMETERS: val AS any value
 * lo AS Lower limit to check
 * hi AS Higher limit to check
 * CALLS: NOTHING
 * RETURNS: TRUE if val is between lo and hi both inclusive, otherwise false.
 **********************************************************************************/
function isBetween(val, lo, hi) {
  if (val < lo || val > hi) {
    return false;
  } else {
    return true;
  }
}
/*********************************************************************************
 * FUNCTION: isDate checks a valid date
 * PARAMETERS: theStr AS String
 * CALLS: isBetween, isInt
 * RETURNS: TRUE if theStr is a valid date otherwise false.
 **********************************************************************************/
function isDate(theStr) {
  var the1st = theStr.indexOf("-");
  var the2nd = theStr.lastIndexOf("-");
  if (the1st == the2nd) {
    return false;
  } else {
    var y = theStr.substring(0, the1st);
    var m = theStr.substring(the1st + 1, the2nd);
    var d = theStr.substring(the2nd + 1, theStr.length);
    var maxDays = 31;
    if (isInt(m) == false || isInt(d) == false || isInt(y) == false) {
      return false;
    } else if (y.length < 4) {
      return false;
    } else if (!isBetween(m, 1, 12)) {
      return false;
    } else if (m == 4 || m == 6 || m == 9 || m == 11) maxDays = 30;
    else if (m == 2) {
      if (y % 4 > 0) maxDays = 28;
      else if (y % 100 == 0 && y % 400 > 0) maxDays = 28;
      else maxDays = 29;
    }
    if (isBetween(d, 1, maxDays) == false) {
      return false;
    } else {
      return true;
    }
  }
}
/*********************************************************************************
 * FUNCTION: isEuDate checks a valid date in British format
 * PARAMETERS: theStr AS String
 * CALLS: isBetween, isInt
 * RETURNS: TRUE if theStr is a valid date otherwise false.
 **********************************************************************************/
function isEuDate(theStr) {
  if (isBetween(theStr.length, 8, 10) == false) {
    return false;
  } else {
    var the1st = theStr.indexOf("/");
    var the2nd = theStr.lastIndexOf("/");
    if (the1st == the2nd) {
      return false;
    } else {
      var m = theStr.substring(the1st + 1, the2nd);
      var d = theStr.substring(0, the1st);
      var y = theStr.substring(the2nd + 1, theStr.length);
      var maxDays = 31;
      if (isInt(m) == false || isInt(d) == false || isInt(y) == false) {
        return false;
      } else if (y.length < 4) {
        return false;
      } else if (isBetween(m, 1, 12) == false) {
        return false;
      } else if (m == 4 || m == 6 || m == 9 || m == 11) maxDays = 30;
      else if (m == 2) {
        if (y % 4 > 0) maxDays = 28;
        else if (y % 100 == 0 && y % 400 > 0) maxDays = 28;
        else maxDays = 29;
      }
      if (isBetween(d, 1, maxDays) == false) {
        return false;
      } else {
        return true;
      }
    }
  }
}
/********************************************************************************
 * FUNCTION: Compare Date! Which is the latest!
 * PARAMETERS: lessDate,moreDate AS String
 * CALLS: isDate,isBetween
 * RETURNS: TRUE if lessDate<moreDate
 *********************************************************************************/
function isComdate(lessDate, moreDate) {
  if (!isDate(lessDate)) {
    return false;
  }
  if (!isDate(moreDate)) {
    return false;
  }
  var less1st = lessDate.indexOf("-");
  var less2nd = lessDate.lastIndexOf("-");
  var more1st = moreDate.indexOf("-");
  var more2nd = moreDate.lastIndexOf("-");
  var lessy = lessDate.substring(0, less1st);
  var lessm = lessDate.substring(less1st + 1, less2nd);
  var lessd = lessDate.substring(less2nd + 1, lessDate.length);
  var morey = moreDate.substring(0, more1st);
  var morem = moreDate.substring(more1st + 1, more2nd);
  var mored = moreDate.substring(more2nd + 1, moreDate.length);
  var Date1 = new Date(lessy, lessm, lessd);
  var Date2 = new Date(morey, morem, mored);
  if (Date1 > Date2) {
    return false;
  }
  return true;
}
/*********************************************************************************
 * FUNCTION isEmpty checks if the parameter is empty or null
 * PARAMETER str AS String
 **********************************************************************************/
function isEmpty(str) {
  if (str == null || str.length == 0) return true;
  else return false;
}
/*********************************************************************************
 * FUNCTION: isInt
 * PARAMETER: theStr AS String
 * RETURNS: TRUE if the passed parameter is an integer, otherwise FALSE
 * CALLS: isDigit
 **********************************************************************************/
function isInt(theStr) {
  var flag = true;
  if (isEmpty(theStr)) {
    flag = false;
  } else {
    for (var i = 0; i < theStr.length; i++) {
      if (isDigit(theStr.substring(i, i + 1)) == false) {
        flag = false;
        break;
      }
    }
  }
  return flag;
}
/*********************************************************************************
* FUNCTION: isReal
* PARAMETER: heStr AS String 
decLen AS Integer (how many digits after period)
* RETURNS: TRUE if theStr is a float, otherwise FALSE
* CALLS: isInt
**********************************************************************************/
function isReal(theStr, decLen) {
  var dot1st = theStr.indexOf(".");
  var dot2nd = theStr.lastIndexOf(".");
  var OK = true;
  if (isEmpty(theStr)) return false;
  if (dot1st == -1) {
    if (!isInt(theStr)) return false;
    else return true;
  } else if (dot1st != dot2nd) return false;
  else if (dot1st == 0) return false;
  else {
    var intPart = theStr.substring(0, dot1st);
    var decPart = theStr.substring(dot2nd + 1);
    if (decPart.length > decLen) return false;
    else if (!isInt(intPart) || !isInt(decPart)) return false;
    else if (isEmpty(decPart)) return false;
    else return true;
  }
}
/*********************************************************************************
 * FUNCTION: isEmail
 * PARAMETER: String (Email Address)
 * RETURNS: TRUE if the String is a valid Email address
 * FALSE if the passed string is not a valid Email Address
 * EMAIL FORMAT: AnyName@EmailServer e.g; webmaster@hotmail.com
 * @ sign can appear only once in the email address.
 *********************************************************************************/
function isEmail(theStr) {
  var atIndex = theStr.indexOf("@");
  var dotIndex = theStr.indexOf(".", atIndex);
  var flag = true;
  theSub = theStr.substring(0, dotIndex + 1);
  if (
    atIndex < 1 ||
    atIndex != theStr.lastIndexOf("@") ||
    dotIndex < atIndex + 2 ||
    theStr.length <= theSub.length
  ) {
    return false;
  } else {
    return true;
  }
}
/*********************************************************************************
* FUNCTION: newWindow
* PARAMETERS: doc -> Document to open in the new window
hite -> Height of the new window
wide -> Width of the new window
bars -> 1-Scroll bars = YES 0-Scroll Bars = NO
resize -> 1-Resizable = YES 0-Resizable = NO
* CALLS: NONE
* RETURNS: New window instance
**********************************************************************************/
function newWindow(doc, hite, wide, bars, resize) {
  var winNew = "_blank";
  var opt = "toolbar=0,location=0,directories=0,status=0,menubar=0,";
  opt += "scrollbars=" + bars + ",";
  opt += "resizable=" + resize + ",";
  opt += "width=" + wide + ",";
  opt += "height=" + hite;
  winHandle = window.open(doc, winNew, opt);
  return;
}
/*********************************************************************************
 * FUNCTION: DecimalFormat
 * PARAMETERS: paramValue -> Field value
 * CALLS: NONE
 * RETURNS: Formated string
 **********************************************************************************/
function DecimalFormat(paramValue) {
  var intPart = parseInt(paramValue);
  var decPart = parseFloat(paramValue) - intPart;
  str = "";
  if (decPart == 0 || decPart == null) str += intPart + ".00";
  else str += intPart + decPart;
  return str;
}

```

以上就是给大家分享的正则表达式基本语法，希望对大家学习有所帮助。
