<script setup lang="ts">
import { reactive, h, ref, toRefs, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useClipboard } from "@vueuse/core";
const { text, isSupported, copy, copied } = useClipboard();
import Highlight from "./Highlight";

import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import go from "highlight.js/lib/languages/go";
import python from "highlight.js/lib/languages/python";
import php from "highlight.js/lib/languages/php";
import java from "highlight.js/lib/languages/java";
import csharp from "highlight.js/lib/languages/csharp";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("go", go);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("php", php);
hljs.registerLanguage("csharp", csharp);
function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function handleUpdateShow(show: boolean) {
  // message.success(show ? 'show' : 'hide')
}

let jsCode = `let pattern = /{0}/,
\tstr = '{1}';
console.log(pattern.test(str));`;
let pyCode = `import re
pattern = re.compile(ur'{0}')
str = u'{1}'
print(pattern.search(str))`;
let phpCode = `$str = '{1}';
$isMatched = preg_match('/{0}/', $str, $matches);
var_dump($isMatched, $matches);`;
let javaCode = `import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexMatches {
\t
\tpublic static void main(String args[]) {
\t\tString str = "{1}";
\t\tString pattern = "{0}";

\t\tPattern r = Pattern.compile(pattern);
\t\tMatcher m = r.matcher(str);
\t\tSystem.out.println(m.matches());
\t}

}`;
let goCode = `package main

import (
\t"fmt"
\t"regexp"
)

func main() {
\tstr := "{1}"
\tmatched, err := regexp.MatchString("{0}", str)
\tfmt.Println(matched, err)
}`;
let csharpCode = `using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string input = "{1}";
      string pattern = @"{0}";

      foreach (Match match in Regex.Matches(input, pattern))
         Console.WriteLine(match.Value);
   }
}`;
let languageCode: any = {
  js: jsCode,
  php: phpCode,
  py: pyCode,
  java: javaCode,
  go: goCode,
  csharp: csharpCode,
};
let digital: any[] = [
  {
    text: "数字",
    reg: "^[0-9]*$",
  },
  {
    text: "n位的数字",
    reg: "^\\d{n}$",
  },
  {
    text: "至少n位的数字",
    reg: "^\\d{n,}$",
  },
  {
    text: "m-n位的数字",
    reg: "^\\d{m,n}$",
  },
  {
    text: "零和非零开头的数字",
    reg: "^(0|[1-9][0-9]*)$",
  },
  {
    text: " 非零开头的最多带两位小数的数字",
    reg: "^([1-9][0-9]*)+(\\.[0-9]{1,2})?$",
  },
  {
    text: " 带1-2位小数的正数或负数",
    reg: "^(\\-)?\\d+(\\.\\d{1,2})$",
  },
  {
    text: " 正数、负数、和小数",
    reg: "^(\\-|\\+)?\\d+(\\.\\d+)?$",
  },
  {
    text: " 有两位小数的正实数",
    reg: "^[0-9]+(\\.[0-9]{2})?$",
  },
  {
    text: " 有1~3位小数的正实数",
    reg: "^[0-9]+(\\.[0-9]{1,3})?$",
  },
  {
    text: " 非零的正整数",
    reg: "^[1-9]\\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\\+?[1-9][0-9]*$",
  },
  {
    text: " 非零的负整数",
    reg: '^\\-[1-9][]0-9"*$ 或 ^-[1-9]\\d*$',
  },
  {
    text: "非负整数",
    reg: "^\\d+$ 或 ^[1-9]\\d*|0$",
  },
  {
    text: " 非正整数",
    reg: "^-[1-9]\\d*|0$ 或 ^((-\\d+)|(0+))$",
  },
  {
    text: " 非负浮点数",
    reg: "^\\d+(\\.\\d+)?$ 或 ^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*|0?\\.0+|0$",
  },
  {
    text: " 非正浮点数",
    reg: "^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$ 或 ^(-([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*))|0?\\.0+|0$",
  },
  {
    text: " 正浮点数",
    reg: "^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*$ 或 ^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$",
  },
  {
    text: " 负浮点数",
    reg: "^-([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*)$ 或 ^(-(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$",
  },
  {
    text: " 浮点数",
    reg: "^(-?\\d+)(\\.\\d+)?$ 或 ^-?([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*|0?\\.0+|0)$",
  },
];
let strings: any = [
  {
    text: "汉字",
    reg: "^[\\u4e00-\\u9fa5]{0,}$",
  },
  {
    text: " 英文和数字",
    reg: "^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$",
  },
  {
    text: "长度为3-20的所有字符",
    reg: "^.{3,20}$",
  },
  {
    text: " 由26个英文字母组成的字符串",
    reg: "^[A-Za-z]+$",
  },
  {
    text: " 由26个大写英文字母组成的字符串",
    reg: "^[A-Z]+$",
  },
  {
    text: " 由26个小写英文字母组成的字符串",
    reg: "^[a-z]+$",
  },
  {
    text: " 由数字和26个英文字母组成的字符串",
    reg: "^[A-Za-z0-9]+$",
  },
  {
    text: " 由数字、26个英文字母或者下划线组成的字符串",
    reg: "^\\w+$ 或 ^\\w{3,20}$",
  },
  {
    text: " 中文、英文、数字包括下划线",
    reg: "^[\\u4E00-\\u9FA5A-Za-z0-9_]+$",
  },
  {
    text: " 中文、英文、数字但不包括下划线等符号",
    reg: "^[\\u4E00-\\u9FA5A-Za-z0-9]+$ 或 ^[\\u4E00-\\u9FA5A-Za-z0-9]{2,20}$",
  },
  {
    text: " 可以输入含有^%&amp;',;=?$\\\"等字符",
    reg: "[^%&',;=?$\\x22]+",
  },
  {
    text: "禁止输入含有~的字符",
    reg: "[^~\\x22]+",
  },
];
let others: any = [
  {
    text: " Email地址",
    reg: "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
  },
  {
    text: " 域名",
    reg: "[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\\.?",
  },
  {
    text: " InternetURL",
    reg: "[a-zA-z]+://[^\\s]* 或 ^http://([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$",
  },
  {
    text: " 手机号码",
    reg: "^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$",
  },
  {
    text: ' 电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)',
    reg: "^(\\(\\d{3,4}-)|\\d{3.4}-)?\\d{7,8}$",
  },
  {
    text: " 国内电话号码(0511-4405222、021-87888822)",
    reg: "\\d{3}-\\d{8}|\\d{4}-\\d{7}",
  },
  {
    text: " 电话号码正则表达式（支持手机号码，3-4位区号，7-8位直播号码，1－4位分机号）",
    reg: "((\\d{11})|^((\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1})|(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1}))$)",
  },
  {
    text: " 身份证号(15位、18位数字)，最后一位是校验位，可能为数字或字符X",
    reg: "(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)",
  },
  {
    text: " 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)",
    reg: "^[a-zA-Z][a-zA-Z0-9_]{4,15}$",
  },
  {
    text: " 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)",
    reg: "^[a-zA-Z]\\w{5,17}$",
  },
  {
    text: " 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)",
    reg: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$",
  },
  {
    text: " 强密码(必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间)",
    reg: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$",
  },
  {
    text: "日期格式",
    reg: "^\\d{4}-\\d{1,2}-\\d{1,2}",
  },
  {
    text: " 一年的12个月(01～09和1～12)",
    reg: "^(0?[1-9]|1[0-2])$",
  },
  {
    text: " 一个月的31天(01～09和1～31)",
    reg: "^((0?[1-9])|((1|2)[0-9])|30|31)$",
  },
  {
    text: " 钱的输入格式",
    reg: "^[1-9][0-9]*$",
  },
  {
    text: " xml文件",
    reg: "^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\\\.[x|X][m|M][l|L]$",
  },
  {
    text: "中文字符的正则表达式",
    reg: "[\\u4e00-\\u9fa5]",
  },
  {
    text: " 双字节字符",
    reg: "[^\\x00-\\xff] (包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))",
  },
  {
    text: " 空白行的正则表达式",
    reg: "\\n\\s*\\r (可以用来删除空白行)",
  },
  {
    text: " HTML标记的正则表达式 ( 首尾空白字符的正则表达式：^\\s*|\\s*$或(^\\s*)|(\\s*$) (可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式)",
    reg: "<(\\S*?)[^>]*>.*? |<.*? />",
  },
  {
    text: " 腾讯QQ号 (腾讯QQ号从10000开始)",
    reg: "[1-9][0-9]{4,}",
  },
  {
    text: " 中国邮政编码 (中国邮政编码为6位数字)",
    reg: "[1-9]\\d{5}(?!\\d)",
  },
  {
    text: " IPv4地址",
    reg: "((2(5[0-5]|[0-4]\\d))|[0-1]?\\d{1,2})(\\.((2(5[0-5]|[0-4]\\d))|[0-1]?\\d{1,2})){3}",
  },
];

let state = reactive({
  regName: "",
  matchResult: "",
  showModal: false,
  textPattern: "",

  textSource: "",
  copyBtnText: "",
  checkboxGroupValue: ["g"],
  checkDigital: digital,
  checkStrings: strings,
  checkOther: others,
  headBtns: [
    { id: "a", reg: `[0-9]+`, textSour: "123abc456def", text: "匹配数字" },
    { id: "b", reg: `[a-z]+`, textSour: "123abc456def", text: "匹配字母" },
    {
      id: "c",
      reg: `[\\u4e00-\\u9fa5]`,
      textSour: "ABC#123中文456def",
      text: "匹配中文",
    },
  ],
  textMatchResult: "",
  codeList: [
    {
      h4: "JavaScript",
      codeName: "JavaScript",
      linkHref: "http://www.runoob.com/js/js-regexp.html",
      linkText: "JavaScript 正则表达式",
      code: languageCode.js,
    },
    {
      h4: "Go",
      codeName: "go",
      linkHref: "",
      linkText: "",
      code: languageCode.go,
    },
    {
      h4: "Java",
      codeName: "java",
      linkHref: "",
      linkText: "Java 正则表达式",
      code: languageCode.java,
    },
    {
      h4: "Php",
      codeName: "php",
      linkHref: "",
      linkText: "",
      code: languageCode.php,
    },
    {
      h4: "Python",
      codeName: "python",
      linkHref: "",
      linkText: "",
      code: languageCode.py,
    },
    {
      h4: "Csharp",
      codeName: "csharp",
      linkHref: "",
      linkText: "",
      code: languageCode.csharp,
    },
  ],
});

let {
  regName,
  checkStrings,
  checkDigital,
  checkOther,
  showModal,
  checkboxGroupValue,
  headBtns,
  textPattern,
  textSource,
  textMatchResult,
  matchResult,
  codeList,

  copyBtnText,
} = toRefs(state);
let regFlag = computed(() => {
  return state.checkboxGroupValue.join("");
});
let txtRef = ref();
let containsSpace = computed(() => {
  return state.textPattern.includes(" ");
});

function handleSelect(key: string | number) {
  ElMessage(String(key));
}

function clearAll() {
  state.textSource = "";
  state.textPattern = "";
  state.textMatchResult = "";
  state.regName = "";
  state.matchResult = "";
}
function clickToCopy(item: any) {
  ElMessage({
    type: "success",
    message: "复制成功!",
  });
  copy(formatStr(item.code, [textPattern.value, textSource.value]));
}
function setTestSource() {
  state.textSource = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
occaecat cupidatat non proident, sunt in culpa qui officia
deserunt mollit anim id est laborum.

abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ
0123456789 _+-.,!@#$%^&*();/|<>"'
12345 -98.7 3.141 .6180 9,000 +42
555.123.4567\t+1-(800)-555-2468
foo@demo.net\tbar.ba@test.co.uk
www.demo.com\thttp://foo.co.uk/
https://marketplace.visualstudio.com/items?itemName=chrmarti.regex
https://github.com/chrmarti/vscode-regex
`;
  onMatch();
}

function setRegTo(item: any) {
  state.textPattern = item.reg;
  state.regName = item.text;
  onMatch();
}

function buildReg() {
  return new RegExp(state.textPattern, regFlag.value);
}

function setRegColor() {
  let text = state.textSource;

  let regex = buildReg();
  const matches: any = text.match(regex);
  let k = 0,
    str = "",
    lastEnd = 0;
  let match;
  while ((match = regex.exec(text)) != null) {
    let position = match.index;
    //console.log(match);
    if (k % 2) {
      str += [
        text.slice(lastEnd, position),
        `<i index='${k}'>`,
        escapeHtml(text.slice(position, match[0].length + position)),
        "</i>",
      ].join("");
    } else {
      str += [
        text.slice(lastEnd, position),
        `<b index='${k}'>`,
        escapeHtml(text.slice(position, match[0].length + position)),
        "</b>",
      ].join("");
    }
    k++;
    lastEnd = match[0].length + position;
    if (k > matches.length) {
      break;
    } else if (k > 5000) {
      break;
    }
  }
  str += escapeHtml([text.slice(lastEnd)].join(""));
  console.log("str=");
  console.log(str);
  let txtHtml = str.replace(/\r?\n/g, "<br/>");

  state.matchResult = txtHtml;
}

function genCode() {
  state.showModal = true;
  console.log(state.codeList[1].code);
  save_data();
}

function onMatch() {
  let regex = buildReg();
  console.log(
    `%c当前的reg是`,
    `color:red;font-size:16px;background:transparent`
  );
  console.log(regex);
  setRegColor();
  let result = state.textSource.match(regex);
  console.log("匹配", state.textSource, "->", regex, "结果", result);
  console.log(`console.log(\`${state.textSource}\`.match(${regex}))`);
  if (null == result || 0 == result.length) {
    textMatchResult.value = "（没有匹配）";
    return false;
  }

  if (state.checkboxGroupValue.includes("g")) {
    let strResult = `共找到 ${result.length} 处匹配：\r
`;
    for (let i = 0; i < result.length; ++i)
      strResult = strResult + result[i] + "\r\n";
    textMatchResult.value = strResult;
  } else {
    textMatchResult.value = `匹配位置：${regex.lastIndex}\r
匹配结果：${result[0]}`;
  }
}

function onNegativeClick() {
  ElMessage("Cancel");
  showModal.value = false;
}

function getOption(val: any) {
  state.checkboxGroupValue = val;
  console.log(val);
}

function getType(obj: any) {
  return Object.prototype.toString.call(obj).slice(7, 14).toLowerCase();
}

/**
 * 用正则和字符串替换掉内部的{0}和{1}
 * @param result
 * @param args [textpattern,textSource]
 */
function formatStr(result: string, args: any) {
  if (args.length != 0 && getType(args) == "object") {
    for (let key in args) {
      let reg = new RegExp("({" + key + "})", "g");
      result = result.replace(reg, args[key]);
    }
  } else {
    for (let i = 0; i < args.length; i++) {
      let reg = new RegExp("\\{" + i + "\\}", "gm");
      result = result.replace(reg, args[i]);
    }
  }
  return result;
}

function save_data() {}

function testReg(reg: string, textSour: string) {
  state.textSource = textSour;
  state.textPattern = reg;
  onMatch();
}

function onPositiveClick() {
  showModal.value = false;
}

onMounted(() => {
  state.textPattern = `[\\u4e00-\\u9fa5]`;
  state.textSource = "ABC#123中文456def";
  onMatch();
});
</script>

<template>
  <el-space class="reg-test">
    <el-container style="padding: 24px">
      <el-header>
        <el-card style="margin-bottom: 20px" shadow="never">
          <el-space>
            <label><strong>正则表达式在线测试</strong> </label>
            <el-button type="info" @click.stop="genCode">生成代码</el-button>

            <el-button type="info" @click.stop="setTestSource"
              >生成测试字符串</el-button
            >
            <el-button
              v-for="(item, index) in headBtns"
              type="primary"
              @click="testReg(item.reg, item.textSour)"
            >
              {{ item.text }}
            </el-button>
            <el-button type="danger" @click.stop="clearAll">清空</el-button>
          </el-space>
        </el-card>
      </el-header>

      <el-container>
        <el-main>
          <el-space fill direction="vertical" size="large" style="width: 100%">
            <el-alert type="info" v-if="containsSpace"
              >注意,你的正则表达式内有空格,需要谨慎</el-alert
            >
            <span style="color: darkgreen">{{ regName }}</span>
            <el-row>
              <el-col :span="24">
                <div style="display: flex">
                  <el-input
                    class="reg-input"
                    size="large"
                    v-model="textPattern"
                    @change="onMatch"
                    @keyup="onMatch"
                    placeholder="在此输入正则表达式"
                  >
                    <template #prepend> / </template>
                    <template #append>{{ "/" + regFlag }} </template>
                  </el-input>
                  <el-popover
                    placement="bottom"
                    trigger="click"
                    :hide-after="0"
                    @update:show="handleUpdateShow"
                  >
                    <template #reference>
                      <el-button size="large">修饰符</el-button>
                    </template>
                    <el-checkbox-group v-model="checkboxGroupValue">
                      <el-space direction="vertical" size="small">
                        <el-checkbox label="g">
                          全局搜索 <strong> -g</strong>
                        </el-checkbox>
                        <el-checkbox label="i">
                          忽略大小写<strong> -i</strong>
                        </el-checkbox>
                        <el-checkbox label="m">
                          多行模式<strong> -m</strong>
                        </el-checkbox>
                        <el-checkbox label="s">
                          包括换行符<strong> -s</strong>
                        </el-checkbox>
                        <hr />
                        <el-button :text="true">修饰符介绍-></el-button>
                      </el-space>
                    </el-checkbox-group>
                  </el-popover>
                  <el-popover
                    placement="bottom"
                    trigger="click"
                    width="350px"
                    :hide-after="0"
                  >
                    <ul style="padding: 12px">
                      <li class="dropdown-code">
                        <code><strong>.</strong></code> -
                        除换行符以外的所有字符。
                      </li>
                      <li class="dropdown-code">
                        <code><strong>^</strong></code> - 字符串开头。
                      </li>
                      <li class="dropdown-code">
                        <code><strong>$</strong></code> - 字符串结尾。
                      </li>
                      <li class="dropdown-code">
                        <strong
                          ><code>\d</code>,<code>\w</code>,<code
                            >\s</code
                          ></strong
                        >
                        - 匹配数字、字符、空格。
                      </li>
                      <li class="dropdown-code">
                        <strong
                          ><code>\D</code>,<code>\W</code>,<code
                            >\S</code
                          ></strong
                        >
                        - 匹配非数字、非字符、非空格。
                      </li>
                      <li class="dropdown-code">
                        <code><strong>[abc]</strong></code> - 匹配 a、b 或 c
                        中的一个字母。
                      </li>
                      <li class="dropdown-code">
                        <code><strong>[a-z]</strong></code> - 匹配 a 到 z
                        中的一个字母。
                      </li>
                      <li class="dropdown-code">
                        <code><strong>[^abc]</strong></code> - 匹配除了 a、b 或
                        c 中的其他字母。
                      </li>
                      <li class="dropdown-code">
                        <code><strong>aa|bb</strong></code> - 匹配 aa 或 bb。
                      </li>
                      <li class="dropdown-code">
                        <code><strong>?</strong></code> - 0 次或 1 次匹配。
                      </li>

                      <li class="dropdown-code">
                        <code><strong>*</strong></code> - 匹配 0 次或多次。
                      </li>
                      <li class="dropdown-code">
                        <code><strong>+</strong></code> - 匹配 1 次或多次。
                      </li>
                      <li class="dropdown-code">
                        <code><strong>{<em>n</em>}</strong></code> - 匹配
                        <em>n</em>次。
                      </li>
                      <li class="dropdown-code">
                        <code><strong>{<em>n</em>,}</strong></code> - 匹配
                        <em>n</em>次以上。
                      </li>
                      <li class="dropdown-code">
                        <code><strong>{<em>m</em>,<em>n</em>}</strong></code>
                        - 最少 <em>m</em> 次，最多 <em>n</em> 次匹配。
                      </li>
                      <li class="dropdown-code">
                        <strong
                          ><code>(</code><em>expr</em><code>)</code></strong
                        >
                        - 捕获 <em>expr</em> 子模式,以 <code>\1</code> 使用它。
                      </li>
                      <li class="dropdown-code">
                        <strong
                          ><code>(?:</code><em>expr</em><code>)</code></strong
                        >
                        - 忽略捕获的子模式。
                      </li>
                      <li class="dropdown-code">
                        <strong
                          ><code>(?=</code><em>expr</em><code>)</code></strong
                        >
                        - 正向预查模式 <em>expr</em>。
                      </li>
                      <li class="dropdown-code">
                        <strong
                          ><code>(?!</code><em>expr</em><code>)</code></strong
                        >
                        - 负向预查模式 <em>expr</em>。
                      </li>
                    </ul>
                    <template #reference>
                      <el-button size="large">语法参考</el-button>
                    </template>
                  </el-popover>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-input
                  type="textarea"
                  rows="6"
                  v-model="textSource"
                  @change="onMatch"
                  @keyup="onMatch"
                  style="width: 100%"
                >
                </el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div
                  ref="txtRef"
                  id="txt"
                  contenteditable="false"
                  data-text="匹配结果..."
                  spellcheck="false"
                  v-html="matchResult"
                ></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-input
                  rows="6"
                  type="textarea"
                  v-model="textMatchResult"
                ></el-input>
              </el-col>
            </el-row>
          </el-space>
        </el-main>
      </el-container>

      <el-dialog v-model="showModal" title="各种语言代码参考" width="40%">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <el-alert type="warning" v-if="!textPattern">
                你还没输入正则表达式
              </el-alert>
              <div>
                <div v-for="item in codeList">
                  <h4>
                    {{ item.codeName }} -
                    <a :href="item.linkHref" target="_blank">{{
                      item.linkText
                    }}</a>
                  </h4>
                  <el-button @click="clickToCopy(item)"> 复制代码 </el-button>
                  {{ copyBtnText }}

                  <highlight
                    class="prettyprint"
                    :code="formatStr(item.code, [textPattern, textSource])"
                    :language="item.codeName"
                  ></highlight>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </el-container>
  </el-space>
</template>

<style lang="scss">
.reg-test {
  .card-body {
    li {
      strong {
        cursor: pointer;
        color: #1060c9;
      }
    }
  }
  .prettyprint {
    margin: 1rem 0;
  }
}

.reg-input {
  .el-input__inner {
    color: #3030c0;
    font-weight: bold;
  }
}

.dropdown-divider {
  height: 0;
  margin: 0.5rem 0;
  overflow: hidden;
  border-top: 1px solid #e9ecef;
}

.dropdown-code {
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;

  code {
    font-size: 87.5%;
    color: #e83e8c;
    word-wrap: break-word;
  }
}

#textPattern {
  color: #3030c0;
  font-weight: bold;
}

[contentEditable="false"]:empty:not(:focus):before {
  content: attr(data-text);
  color: #9a9a9a;
}

#flags {
  padding: 4px;
  border: 1px solid #ccc;
  margin-bottom: 4px;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #fff;
}

#exp,
#txt {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
  background-color: #fff;
}

#exp,
#exp_dsp,
#flags,
#match,
#txt {
  font-size: 14px;
  font-family: Menlo, Consolas, Monaco, "Lucida Console", "Liberation Mono",
    "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace,
    serif;
}

#exp {
  min-height: 34px;
  padding: 6px 12px;
  margin: 0;
  background: #fff;

  &:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
  }
}

.popover {
  max-width: 100%;
  width: auto;
}

#exp_dsp {
  display: inline-block;
  cursor: pointer;
  white-space: pre-wrap;

  .error {
    color: #f13f86;
  }
}

#match {
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 3px #aaa;
  padding: 10px;
}

.g {
  white-space: pre-wrap;
  background: #eee;
  border-radius: 4px;
}

#txt {
  min-height: 100px;
  background: #fff;

  &:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
  }
}

#txt ol li:first-child {
  opacity: 0.5;
}

#txt i {
  background: #cff5ff;
  box-shadow: 0 0 0 1px #09f;
}

#txt b {
  background: #ffdfff;
  box-shadow: 0 0 0 1px #df56ad;
}

#txt i,
#txt b {
  border-radius: 4px;
  font-style: normal;
  font-weight: normal;
}
</style>
