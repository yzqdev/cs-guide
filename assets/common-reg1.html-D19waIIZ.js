import{_ as s,r as l,c as o,b as n,w as a,d as r,a as e,o as i}from"./app-CbULZrmi.js";const u={},d=r(`<h1 id="常用正则表达式1" tabindex="-1"><a class="header-anchor" href="#常用正则表达式1"><span>常用正则表达式1</span></a></h1><pre><code class="language-text">
&quot;^\\\\d+$&quot; //非负整数（正整数 + 0）

&quot;^[0-9]_[1-9][0-9]_$&quot; //正整数

&quot;^((-\\\\d+)|(0+))$&quot; //非正整数（负整数 + 0）

&quot;^-[0-9]_[1-9][0-9]_$&quot; //负整数

&quot;^-?\\\\d+$&quot; //整数

&quot;^\\\\d+(\\\\.\\\\d+)?$&quot; //非负浮点数（正浮点数 + 0）

&quot;^(([0-9]+\\\\.[0-9]_[1-9][0-9]_)|([0-9]_[1-9][0-9]_\\\\.[0-9]+)|([0-9]_[1-9][0-9]_))$&quot; //正浮点数

&quot;^((-\\\\d+(\\\\.\\\\d+)?)|(0+(\\\\.0+)?))$&quot; //非正浮点数（负浮点数 + 0）
&quot;^(-(([0-9]+\\\\.[0-9]_[1-9][0-9]_)|([0-9]_[1-9][0-9]_\\\\.[0-9]+)|([0-9]_[1-9][0-9]_)))$&quot; //负浮点数

&quot;^(-?\\\\d+)(\\\\.\\\\d+)?$&quot; //浮点数

&quot;^[A-Za-z]+$&quot; //由26个英文字母组成的字符串

&quot;^[A-Z]+$&quot; //由26个英文字母的大写组成的字符串

&quot;^[a-z]+$&quot; //由26个英文字母的小写组成的字符串

&quot;^[A-Za-z0-9]+$&quot; //由数字和26个英文字母组成的字符串

&quot;^\\\\w+$&quot; //由数字、26个英文字母或者下划线组成的字符串

&quot;^[\\\\w-]+(\\\\.[\\\\w-]+)*@[\\\\w-]+(\\\\.[\\\\w-]+)+$&quot; //email地址

&quot;^[a-zA-z]+://(\\\\w+(-\\\\w+)*)(\\\\.(\\\\w+(-\\\\w+)*))*(\\\\?\\\\S*)?$&quot; //url
</code></pre><h2 id="javascript正则表达式检验" tabindex="-1"><a class="header-anchor" href="#javascript正则表达式检验"><span>javascript正则表达式检验</span></a></h2><h3 id="校验是否全由数字组成" tabindex="-1"><a class="header-anchor" href="#校验是否全由数字组成"><span>校验是否全由数字组成**</span></a></h3><pre><code class="language-javascript">function isDigit(s)
{
let patrn=/^[0-9]{1,20}$/;
if (!patrn.exec(s)) return false
return true
}
</code></pre><h3 id="校验登录名-只能输入5-20个以字母开头、可带数字、-、-的字串" tabindex="-1"><a class="header-anchor" href="#校验登录名-只能输入5-20个以字母开头、可带数字、-、-的字串"><span>校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串**</span></a></h3><pre><code class="language-javascript">function isRegisterUserName(s)
{
let patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
if (!patrn.exec(s)) return false
return true
}

</code></pre><h3 id="校验用户姓名-只能输入1-30个以字母开头的字串" tabindex="-1"><a class="header-anchor" href="#校验用户姓名-只能输入1-30个以字母开头的字串"><span>校验用户姓名：只能输入1-30个以字母开头的字串**</span></a></h3><pre><code class="language-javascript">function isTrueName(s)
{
let patrn=/^[a-zA-Z]{1,30}$/;
if (!patrn.exec(s)) return false
return true
}

</code></pre><h3 id="校验密码-只能输入6-20个字母、数字、下划线" tabindex="-1"><a class="header-anchor" href="#校验密码-只能输入6-20个字母、数字、下划线"><span>校验密码：只能输入6-20个字母、数字、下划线**</span></a></h3><pre><code class="language-javascript">function isPasswd(s)
{
let patrn=/^(\\w){6,20}$/;
if (!patrn.exec(s)) return false
return true
}
</code></pre><h3 id="校验普通电话、传真号码-可以-开头-除数字外-可含有" tabindex="-1"><a class="header-anchor" href="#校验普通电话、传真号码-可以-开头-除数字外-可含有"><span>校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”**</span></a></h3><pre><code class="language-javascript">function isTel(s)
{
//let patrn=/^[+]{0,1}(\\d){1,3}[ ]?([-]?(\\d){1,12})+$/;
let patrn=/^[+]{0,1}(\\d){1,3}[ ]?([-]?((\\d)|[ ]){1,12})+$/;
if (!patrn.exec(s)) return false
return true
}
</code></pre><p>//校验手机号码：必须以数字开头，除数字外，可含有“-”</p><pre><code class="language-javascript">function isMobil(s)
{
let patrn=/^[+]{0,1}(\\d){1,3}[ ]?([-]?((\\d)|[ ]){1,12})+$/;
if (!patrn.exec(s)) return false
return true
}
</code></pre><pre><code>                                                                                           |
</code></pre><h2 id="正则表达式验证控制文本框的输入字符类型" tabindex="-1"><a class="header-anchor" href="#正则表达式验证控制文本框的输入字符类型"><span>正则表达式验证控制文本框的输入字符类型</span></a></h2><p>对于form表单也可以使用原生的<code>pattern</code>属性</p><pre><code class="language-html">&lt;form action=&quot;&quot;&gt;
&lt;input type=&quot;text&quot;  name=&quot;country_code&quot; pattern=&#39;[a-zA-Z0-9]|[._]){4,19}&#39;  title=&quot;Three letter country code&quot;/&gt;
&lt;input type=&quot;submit&quot;&gt;
&lt;/form&gt;
</code></pre><p><strong>1.只能输入数字和英文的：</strong></p>`,20),c=e("pre",null,[e("code",{class:"language-html"},`<input onkeyup="value=value.replace(/[\\W]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\\d]/g,''))" ID="Text1" NAME="Text1">
`)],-1),p=e("p",null,[e("strong",null,"2.只能输入数字的：")],-1),h=e("pre",null,[e("code",{class:"language-html"},`<input onkeyup="value=value.replace(/[^\\d]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\\d]/g,''))" ID="Text2" NAME="Text2">
`)],-1),f=e("p",null,[e("strong",null,"3.只能输入全角的：")],-1),m=e("pre",null,[e("code",{class:"language-html"},`<input onkeyup="value=value.replace(/[^\\uFF00-\\uFFFF]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\\uFF00-\\uFFFF]/g,''))" ID="Text3" NAME="Text3">
`)],-1),g=e("p",null,[e("strong",null,"4.只能输入汉字的：")],-1),q=e("pre",null,[e("code",{class:"language-html"},`<input onkeyup="value=value.replace(/[^\\u4E00-\\u9FA5]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\\u4E00-\\u9FA5]/g,''))" ID="Text4" NAME="Text4">
`)],-1),S=r(`<h2 id="javascript-测试正则" tabindex="-1"><a class="header-anchor" href="#javascript-测试正则"><span>javascript 测试正则</span></a></h2><pre><code class="language-javascript">function regx(r,s){
  if (r == null || r == &quot;&quot;){
    return false;
  }
  let patrn= new RegExp(r);
  if (patrn.exec(s))
    return true
  return false
}
</code></pre><p><strong>校验字符串 ：</strong></p><pre><code class="language-html"> &lt;input type=&quot;input&quot; name=&quot;str&quot; value=&quot;&quot; &gt;
  &lt;input type=&quot;button&quot; name=&quot;match&quot; value=&quot;匹配&quot; onClick=&quot;alert(regx(regxStr.value,str.value));&quot;&gt;
&lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><h3 id="校验邮政编码" tabindex="-1"><a class="header-anchor" href="#校验邮政编码"><span>校验邮政编码</span></a></h3><pre><code class="language-javascript">function isPostalCode(s)
{
//let patrn=/^[a-zA-Z0-9]{3,12}$/;
let patrn=/^[a-zA-Z0-9 ]{3,12}$/;
if (!patrn.exec(s)) return false
return true
}
</code></pre><h2 id="校验搜索关键字" tabindex="-1"><a class="header-anchor" href="#校验搜索关键字"><span>校验搜索关键字</span></a></h2><pre><code class="language-javascript">function isSearch(s) {
  let patrn =
    /^[^\`~!@#$%^&amp;*()+=|\\\\\\][\\]\\{\\}:;\\&#39;\\,.&lt;&gt;/?]{1}[^\`~!@$%^&amp;()+=|\\\\\\][\\]\\{\\}:;\\&#39;\\,.&lt;&gt;?]{0,19}$/;
  if (!patrn.exec(s)) return false;
  return true;
}
function isIP(s) {
  //by zergling
  let patrn = /^[0-9.]{1,20}$/;
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
  if (val &lt; lo || val &gt; hi) {
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
  let the1st = theStr.indexOf(&quot;-&quot;);
  let the2nd = theStr.lastIndexOf(&quot;-&quot;);
  if (the1st == the2nd) {
    return false;
  } else {
    let y = theStr.substring(0, the1st);
    let m = theStr.substring(the1st + 1, the2nd);
    let d = theStr.substring(the2nd + 1, theStr.length);
    let maxDays = 31;
    if (isInt(m) == false || isInt(d) == false || isInt(y) == false) {
      return false;
    } else if (y.length &lt; 4) {
      return false;
    } else if (!isBetween(m, 1, 12)) {
      return false;
    } else if (m == 4 || m == 6 || m == 9 || m == 11) maxDays = 30;
    else if (m == 2) {
      if (y % 4 &gt; 0) maxDays = 28;
      else if (y % 100 == 0 &amp;&amp; y % 400 &gt; 0) maxDays = 28;
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
    let the1st = theStr.indexOf(&quot;/&quot;);
    let the2nd = theStr.lastIndexOf(&quot;/&quot;);
    if (the1st == the2nd) {
      return false;
    } else {
      let m = theStr.substring(the1st + 1, the2nd);
      let d = theStr.substring(0, the1st);
      let y = theStr.substring(the2nd + 1, theStr.length);
      let maxDays = 31;
      if (isInt(m) == false || isInt(d) == false || isInt(y) == false) {
        return false;
      } else if (y.length &lt; 4) {
        return false;
      } else if (isBetween(m, 1, 12) == false) {
        return false;
      } else if (m == 4 || m == 6 || m == 9 || m == 11) maxDays = 30;
      else if (m == 2) {
        if (y % 4 &gt; 0) maxDays = 28;
        else if (y % 100 == 0 &amp;&amp; y % 400 &gt; 0) maxDays = 28;
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
 * RETURNS: TRUE if lessDate&lt;moreDate
 **/
function isComdate(lessDate, moreDate) {
  if (!isDate(lessDate)) {
    return false;
  }
  if (!isDate(moreDate)) {
    return false;
  }
  let less1st = lessDate.indexOf(&quot;-&quot;);
  let less2nd = lessDate.lastIndexOf(&quot;-&quot;);
  let more1st = moreDate.indexOf(&quot;-&quot;);
  let more2nd = moreDate.lastIndexOf(&quot;-&quot;);
  let lessy = lessDate.substring(0, less1st);
  let lessm = lessDate.substring(less1st + 1, less2nd);
  let lessd = lessDate.substring(less2nd + 1, lessDate.length);
  let morey = moreDate.substring(0, more1st);
  let morem = moreDate.substring(more1st + 1, more2nd);
  let mored = moreDate.substring(more2nd + 1, moreDate.length);
  let Date1 = new Date(lessy, lessm, lessd);
  let Date2 = new Date(morey, morem, mored);
  if (Date1 &gt; Date2) {
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
  let flag = true;
  if (isEmpty(theStr)) {
    flag = false;
  } else {
    for (let i = 0; i &lt; theStr.length; i++) {
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
  let dot1st = theStr.indexOf(&quot;.&quot;);
  let dot2nd = theStr.lastIndexOf(&quot;.&quot;);
  let OK = true;
  if (isEmpty(theStr)) return false;
  if (dot1st == -1) {
    if (!isInt(theStr)) return false;
    else return true;
  } else if (dot1st != dot2nd) return false;
  else if (dot1st == 0) return false;
  else {
    let intPart = theStr.substring(0, dot1st);
    let decPart = theStr.substring(dot2nd + 1);
    if (decPart.length &gt; decLen) return false;
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
  let atIndex = theStr.indexOf(&quot;@&quot;);
  let dotIndex = theStr.indexOf(&quot;.&quot;, atIndex);
  let flag = true;
  theSub = theStr.substring(0, dotIndex + 1);
  if (
    atIndex &lt; 1 ||
    atIndex != theStr.lastIndexOf(&quot;@&quot;) ||
    dotIndex &lt; atIndex + 2 ||
    theStr.length &lt;= theSub.length
  ) {
    return false;
  } else {
    return true;
  }
}
/**
* FUNCTION: newWindow
* PARAMETERS: doc -&gt; Document to open in the new window
hite -&gt; Height of the new window
wide -&gt; Width of the new window
bars -&gt; 1-Scroll bars = YES 0-Scroll Bars = NO
resize -&gt; 1-Resizable = YES 0-Resizable = NO
* CALLS: NONE
* RETURNS: New window instance
***/
function newWindow(doc, hite, wide, bars, resize) {
  let winNew = &quot;_blank&quot;;
  let opt = &quot;toolbar=0,location=0,directories=0,status=0,menubar=0,&quot;;
  opt += &quot;scrollbars=&quot; + bars + &quot;,&quot;;
  opt += &quot;resizable=&quot; + resize + &quot;,&quot;;
  opt += &quot;width=&quot; + wide + &quot;,&quot;;
  opt += &quot;height=&quot; + hite;
  winHandle = window.open(doc, winNew, opt);
  return;
}
/**
 * FUNCTION: DecimalFormat
 * PARAMETERS: paramValue -&gt; Field value
 * CALLS: NONE
 * RETURNS: Formated string
 ***/
function DecimalFormat(paramValue) {
  let intPart = parseInt(paramValue);
  let decPart = parseFloat(paramValue) - intPart;
  str = &quot;&quot;;
  if (decPart == 0 || decPart == null) str += intPart + &quot;.00&quot;;
  else str += intPart + decPart;
  return str;
}

</code></pre>`,8);function x(y,D){const t=l("CodeDemo");return i(),o("div",null,[d,n(t,{id:"code-demo-42",type:"normal",code:"eJyrVsooyc1RslKyycwrKC1RyM/LTq0sLbCNUSpLzClNtQWTekWpBTmJyaka+tExMeGx+uk66uqaCjFKQNVJqWn5QNnE4pJUoJ7knMyCpPzEohSXxJJEveLUEhCtoV6SWlGiroMqmY4iqYlkRVxMTArUDk2gHZ4uQINDgIoMgRw/R19XBNcuJk+pFgCnXkEC"},{default:a(()=>[c]),_:1}),p,n(t,{id:"code-demo-48",type:"normal",code:"eJyrVsooyc1RslKyycwrKC1RyM/LTq0sLbCNUSpLzClNtQWTekWpBTmJyaka+tFxMTEpsfrpOurqmgoxSkDlSalp+UDpxOKSVKCm5JzMgqT8xKIUl8SSRL3i1BIQraFeklpRoq6DKpmOIqmJ3Q5NoB2eLkCDQ4CKjIAcP0dfVwTXLiZPqRYA9h1Bbw=="},{default:a(()=>[h]),_:1}),f,n(t,{id:"code-demo-54",type:"normal",code:"eJyrVsooyc1RslKyycwrKC1RyM/LTq0sLbCNUSpLzClNtQWTekWpBTmJyaka+tFxMTGlbm4GBrpg2s0tVj9dR11dM0YJqDMpNS0fqDKxuCQVqD85J7MgKT+xKMUlsSRRrzi1BERrqJekVpSo66BKpqNIahK2DmSfpwvQkhCgBmMgx8/R1xXBtYvJU6oFAANmSC8="},{default:a(()=>[m]),_:1}),g,n(t,{id:"code-demo-60",type:"normal",code:"eJyrVsooyc1RslKyycwrKC1RyM/LTq0sLbCNUSpLzClNtQWTekWpBTmJyaka+tFxMTGlJq4GBrpA2tLN0TRWP11HXV0zRgmoMyk1LR+oMrG4JBWoPzknsyApP7EoxSWxJFGvOLUERGuol6RWlKjroEqmo0hqErYOZJ+nC9CSEKAGEyDHz9HXFcG1i8lTqgUA14RHxQ=="},{default:a(()=>[q]),_:1}),S])}const R=s(u,[["render",x],["__file","common-reg1.html.vue"]]),T=JSON.parse('{"path":"/frontend/basic-js/regex/common-reg1.html","title":"常用正则表达式1","lang":"zh-CN","frontmatter":{"description":"常用正则表达式1 javascript正则表达式检验 校验是否全由数字组成** 校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串** 校验用户姓名：只能输入1-30个以字母开头的字串** 校验密码：只能输入6-20个字母、数字、下划线** 校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”** //校验手机号码：必须...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-js/regex/common-reg1.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"常用正则表达式1"}],["meta",{"property":"og:description","content":"常用正则表达式1 javascript正则表达式检验 校验是否全由数字组成** 校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串** 校验用户姓名：只能输入1-30个以字母开头的字串** 校验密码：只能输入6-20个字母、数字、下划线** 校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”** //校验手机号码：必须..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-01T04:28:17.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-01T04:28:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常用正则表达式1\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-01T04:28:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"javascript正则表达式检验","slug":"javascript正则表达式检验","link":"#javascript正则表达式检验","children":[{"level":3,"title":"校验是否全由数字组成**","slug":"校验是否全由数字组成","link":"#校验是否全由数字组成","children":[]},{"level":3,"title":"校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串**","slug":"校验登录名-只能输入5-20个以字母开头、可带数字、-、-的字串","link":"#校验登录名-只能输入5-20个以字母开头、可带数字、-、-的字串","children":[]},{"level":3,"title":"校验用户姓名：只能输入1-30个以字母开头的字串**","slug":"校验用户姓名-只能输入1-30个以字母开头的字串","link":"#校验用户姓名-只能输入1-30个以字母开头的字串","children":[]},{"level":3,"title":"校验密码：只能输入6-20个字母、数字、下划线**","slug":"校验密码-只能输入6-20个字母、数字、下划线","link":"#校验密码-只能输入6-20个字母、数字、下划线","children":[]},{"level":3,"title":"校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”**","slug":"校验普通电话、传真号码-可以-开头-除数字外-可含有","link":"#校验普通电话、传真号码-可以-开头-除数字外-可含有","children":[]}]},{"level":2,"title":"正则表达式验证控制文本框的输入字符类型","slug":"正则表达式验证控制文本框的输入字符类型","link":"#正则表达式验证控制文本框的输入字符类型","children":[]},{"level":2,"title":"javascript 测试正则","slug":"javascript-测试正则","link":"#javascript-测试正则","children":[{"level":3,"title":"校验邮政编码","slug":"校验邮政编码","link":"#校验邮政编码","children":[]}]},{"level":2,"title":"校验搜索关键字","slug":"校验搜索关键字","link":"#校验搜索关键字","children":[]}],"git":{"createdTime":1649085570000,"updatedTime":1659328097000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":5.7,"words":1709},"filePathRelative":"frontend/basic-js/regex/common-reg1.md","localizedDate":"2022年4月4日","autoDesc":true}');export{R as comp,T as data};
