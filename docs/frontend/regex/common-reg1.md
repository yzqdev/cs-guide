# 常用正则表达式1

```text

"^\\d+$" //非负整数（正整数 + 0）

"^[0-9]_[1-9][0-9]_$" //正整数

"^((-\\d+)|(0+))$" //非正整数（负整数 + 0）

"^-[0-9]_[1-9][0-9]_$" //负整数

"^-?\\d+$" //整数

"^\\d+(\\.\\d+)?$" //非负浮点数（正浮点数 + 0）

"^(([0-9]+\\.[0-9]_[1-9][0-9]_)|([0-9]_[1-9][0-9]_\\.[0-9]+)|([0-9]_[1-9][0-9]_))$" //正浮点数

"^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$" //非正浮点数（负浮点数 + 0）
"^(-(([0-9]+\\.[0-9]_[1-9][0-9]_)|([0-9]_[1-9][0-9]_\\.[0-9]+)|([0-9]_[1-9][0-9]_)))$" //负浮点数

"^(-?\\d+)(\\.\\d+)?$" //浮点数

"^[A-Za-z]+$" //由26个英文字母组成的字符串

"^[A-Z]+$" //由26个英文字母的大写组成的字符串

"^[a-z]+$" //由26个英文字母的小写组成的字符串

"^[A-Za-z0-9]+$" //由数字和26个英文字母组成的字符串

"^\\w+$" //由数字、26个英文字母或者下划线组成的字符串

"^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$" //email地址

"^[a-zA-z]+://(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?$" //url
```

## javascript正则表达式检验

### 校验是否全由数字组成**

```javascript
function isDigit(s)
{
var patrn=/^[0-9]{1,20}$/;
if (!patrn.exec(s)) return false
return true
}
```

### 校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串**

```javascript
function isRegisterUserName(s)
{
var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
if (!patrn.exec(s)) return false
return true
}

```

### 校验用户姓名：只能输入1-30个以字母开头的字串**

```javascript
function isTrueName(s)
{
var patrn=/^[a-zA-Z]{1,30}$/;
if (!patrn.exec(s)) return false
return true
}

```

### 校验密码：只能输入6-20个字母、数字、下划线**

```javascript
function isPasswd(s)
{
var patrn=/^(\w){6,20}$/;
if (!patrn.exec(s)) return false
return true
}
```

### 校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”**

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

### 校验邮政编码**

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

/**
 * FUNCTION: isBetween
 * PARAMETERS: val AS any value
 * lo AS Lower limit to check
 * hi AS Higher limit to check
 * CALLS: NOTHING
 * RETURNS: TRUE if val is between lo and hi both inclusive, otherwise false.
 ***/
function isBetween(val, lo, hi) {
  if (val < lo || val > hi) {
    return false;
  } else {
    return true;
  }
}
/**
 * FUNCTION: isDate checks a valid date
 * PARAMETERS: theStr AS String
 * CALLS: isBetween, isInt
 * RETURNS: TRUE if theStr is a valid date otherwise false.
 ***/
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
/**
 * FUNCTION: isEuDate checks a valid date in British format
 * PARAMETERS: theStr AS String
 * CALLS: isBetween, isInt
 * RETURNS: TRUE if theStr is a valid date otherwise false.
 ***/
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
/*
 * FUNCTION: Compare Date! Which is the latest!
 * PARAMETERS: lessDate,moreDate AS String
 * CALLS: isDate,isBetween
 * RETURNS: TRUE if lessDate<moreDate
 **/
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
/**
 * FUNCTION isEmpty checks if the parameter is empty or null
 * PARAMETER str AS String
 ***/
function isEmpty(str) {
  if (str == null || str.length == 0) return true;
  else return false;
}
/**
 * FUNCTION: isInt
 * PARAMETER: theStr AS String
 * RETURNS: TRUE if the passed parameter is an integer, otherwise FALSE
 * CALLS: isDigit
 ***/
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
/**
* FUNCTION: isReal
* PARAMETER: heStr AS String 
decLen AS Integer (how many digits after period)
* RETURNS: TRUE if theStr is a float, otherwise FALSE
* CALLS: isInt
***/
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
/**
 * FUNCTION: isEmail
 * PARAMETER: String (Email Address)
 * RETURNS: TRUE if the String is a valid Email address
 * FALSE if the passed string is not a valid Email Address
 * EMAIL FORMAT: AnyName@EmailServer e.g; webmaster@hotmail.com
 * @ sign can appear only once in the email address.
 **/
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
/**
* FUNCTION: newWindow
* PARAMETERS: doc -> Document to open in the new window
hite -> Height of the new window
wide -> Width of the new window
bars -> 1-Scroll bars = YES 0-Scroll Bars = NO
resize -> 1-Resizable = YES 0-Resizable = NO
* CALLS: NONE
* RETURNS: New window instance
***/
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
/**
 * FUNCTION: DecimalFormat
 * PARAMETERS: paramValue -> Field value
 * CALLS: NONE
 * RETURNS: Formated string
 ***/
function DecimalFormat(paramValue) {
  var intPart = parseInt(paramValue);
  var decPart = parseFloat(paramValue) - intPart;
  str = "";
  if (decPart == 0 || decPart == null) str += intPart + ".00";
  else str += intPart + decPart;
  return str;
}

```
 
