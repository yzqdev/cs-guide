<script setup lang="ts">
import { reactive, h, ref, toRefs, computed } from "vue";
import {
  NAvatar,
  NAlert,
  NButton,
  NCard,
  NCheckbox,
  NCode,
  NCheckboxGroup,
  NConfigProvider,
  NGi,
  NInput,
} from "naive-ui";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import go from "highlight.js/lib/languages/go";
import python from "highlight.js/lib/languages/python";
import php from "highlight.js/lib/languages/php";
import java from "highlight.js/lib/languages/java";
import csharp from "highlight.js/lib/languages/csharp";
import { zhCN, dateZhCN } from "naive-ui";
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
let state = reactive({
  locale: zhCN,
  dateLocale: dateZhCN,
  name: "a",
  showModal: false,
  textPattern: "",
  textSource: "",
  checkboxGroupValue: ["g"],
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
  locale,
  dateLocale,
  name,
  showModal,
  checkboxGroupValue,
  headBtns,
  textPattern,
  textSource,
  textMatchResult,
  codeList,
} = toRefs(state);

let regFlag = computed(() => {
  return state.checkboxGroupValue.join("");
});
let txtRef = ref();

function handleSelect(key: string | number) {}

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
        text.slice(0 + lastEnd, position),
        `<i index='${k}'>`,
        escapeHtml(text.slice(position, match[0].length + position)),
        "</i>",
      ].join("");
    } else {
      str += [
        text.slice(0 + lastEnd, position),
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
  let txtHtml = str.replace(/\r?\n/g, "<br/>");
  txtRef.value.innerHTML = txtHtml;
}

function genCode() {
  state.showModal = true;
  console.log(state.codeList[1].code);
  save_data();
}

function onMatch() {
  let regex = buildReg();
  setRegColor();
  let result = state.textSource.match(regex);
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

const count = ref(0);
</script>

<template>
  <ClientOnly>
    <n-config-provider :hljs="hljs" :locale="locale" :date-locale="dateLocale">
      <n-space vertical size="large">
        <n-layout content-style="padding: 24px;">
          <n-layout-header>
            <n-card style="margin-bottom: 20px">
              <n-space align="center">
                <label><strong>正则表达式在线测试</strong> </label>
                <n-button type="info" @click.stop="genCode">生成代码</n-button>
                <n-button
                  v-for="(item, index) in headBtns"
                  type="primary"
                  @click="testReg(item.reg, item.textSour)"
                >
                  {{ item.text }}
                </n-button>
              </n-space>
            </n-card>
          </n-layout-header>
          <n-layout has-sider>
            <n-layout-content>
              <n-space vertical size="large">
                <n-grid x-gap="12" :y-gap="8" :cols="1">
                  <n-gi>
                    <n-input-group>
                      <n-input-group-label size="large">/</n-input-group-label>
                      <n-input
                        class="reg-input"
                        size="large"
                        v-model:value="textPattern"
                        @change="onMatch"
                        @keyup="onMatch"
                        placeholder="在此输入正则表达式"
                      />
                      <n-input-group-label size="large">{{
                        "/" + regFlag
                      }}</n-input-group-label>
                      <n-popover
                        placement="bottom"
                        trigger="click"
                        @update:show="handleUpdateShow"
                      >
                        <template #trigger>
                          <n-button size="large">修饰符</n-button>
                        </template>
                        <n-checkbox-group v-model:value="checkboxGroupValue">
                          <n-space vertical size="small">
                            <n-checkbox value="g">
                              全局搜索 <strong> -g</strong>
                            </n-checkbox>
                            <n-checkbox value="i">
                              忽略大小写<strong> -i</strong>
                            </n-checkbox>
                            <n-checkbox value="m">
                              多行模式<strong> -m</strong>
                            </n-checkbox>
                            <n-checkbox value="s">
                              包括换行符<strong> -s</strong>
                            </n-checkbox>
                            <hr />
                            <n-button :text="true">修饰符介绍-></n-button>
                          </n-space>
                        </n-checkbox-group>
                      </n-popover>
                      <n-popover placement="bottom" trigger="click">
                        <ul style="padding: 12px; min-width: 350px">
                          <li class="dropdown-item">
                            <code><strong>.</strong></code> -
                            除换行符以外的所有字符。
                          </li>
                          <li class="dropdown-item">
                            <code><strong>^</strong></code> - 字符串开头。
                          </li>
                          <li class="dropdown-item">
                            <code><strong>$</strong></code> - 字符串结尾。
                          </li>
                          <li class="dropdown-item">
                            <strong
                              ><code>\d</code>,<code>\w</code>,<code
                                >\s</code
                              ></strong
                            >
                            - 匹配数字、字符、空格。
                          </li>
                          <li class="dropdown-item">
                            <strong
                              ><code>\D</code>,<code>\W</code>,<code
                                >\S</code
                              ></strong
                            >
                            - 匹配非数字、非字符、非空格。
                          </li>
                          <li class="dropdown-item">
                            <code><strong>[abc]</strong></code> - 匹配 a、b 或 c
                            中的一个字母。
                          </li>
                          <li class="dropdown-item">
                            <code><strong>[a-z]</strong></code> - 匹配 a 到 z
                            中的一个字母。
                          </li>
                          <li class="dropdown-item">
                            <code><strong>[^abc]</strong></code> - 匹配除了 a、b
                            或 c 中的其他字母。
                          </li>
                          <li class="dropdown-item">
                            <code><strong>aa|bb</strong></code> - 匹配 aa 或
                            bb。
                          </li>
                          <li class="dropdown-item">
                            <code><strong>?</strong></code> - 0 次或 1 次匹配。
                          </li>

                          <li class="dropdown-item">
                            <code><strong>*</strong></code> - 匹配 0 次或多次。
                          </li>
                          <li class="dropdown-item">
                            <code><strong>+</strong></code> - 匹配 1 次或多次。
                          </li>
                          <li class="dropdown-item">
                            <code><strong>{<em>n</em>}</strong></code> - 匹配
                            <em>n</em>次。
                          </li>
                          <li class="dropdown-item">
                            <code><strong>{<em>n</em>,}</strong></code> - 匹配
                            <em>n</em>次以上。
                          </li>
                          <li class="dropdown-item">
                            <code
                              ><strong>{<em>m</em>,<em>n</em>}</strong></code
                            >
                            - 最少 <em>m</em> 次，最多 <em>n</em> 次匹配。
                          </li>
                          <li class="dropdown-item">
                            <strong
                              ><code>(</code><em>expr</em><code>)</code></strong
                            >
                            - 捕获 <em>expr</em> 子模式,以
                            <code>\1</code> 使用它。
                          </li>
                          <li class="dropdown-item">
                            <strong
                              ><code>(?:</code><em>expr</em
                              ><code>)</code></strong
                            >
                            - 忽略捕获的子模式。
                          </li>
                          <li class="dropdown-item">
                            <strong
                              ><code>(?=</code><em>expr</em
                              ><code>)</code></strong
                            >
                            - 正向预查模式 <em>expr</em>。
                          </li>
                          <li class="dropdown-item">
                            <strong
                              ><code>(?!</code><em>expr</em
                              ><code>)</code></strong
                            >
                            - 负向预查模式 <em>expr</em>。
                          </li>
                          <li class="dropdown-divider"></li>
                          <li class="dropdown-item">
                            <a
                              role="menuitem"
                              target="_blank"
                              tabindex="-1"
                              href="https://www.runoob.com/regexp/regexp-tutorial.html"
                              ><i class="fa fa-external-link-alt"></i>
                              正则表达式教程
                            </a>
                          </li>
                        </ul>
                        <template #trigger>
                          <n-button size="large">语法参考</n-button>
                        </template>
                      </n-popover>
                    </n-input-group>
                  </n-gi>
                  <n-gi>
                    <n-input
                      type="textarea"
                      rows="6"
                      v-model:value="textSource"
                      @change="onMatch"
                      @keyup="onMatch"
                      show-count
                    >
                      <template #count="{ value }"></template>
                    </n-input>
                  </n-gi>
                  <n-gi>
                    <div
                      ref="txtRef"
                      id="txt"
                      contenteditable="false"
                      data-text="匹配结果..."
                      spellcheck="false"
                    ></div>
                  </n-gi>
                </n-grid>
                <n-grid :cols="1">
                  <n-gi>
                    <n-input
                      rows="6"
                      type="textarea"
                      v-model:value="textMatchResult"
                    ></n-input>
                  </n-gi>
                </n-grid>
              </n-space> </n-layout-content
            ><n-layout-sider
              collapse-mode="transform"
              width="30%"
              :native-scrollbar="true"
              content-style="padding: 24px;"
              bordered
            >
              <n-table>
                <tbody>
                  <tr>
                    <th>修饰符</th>
                    <th>含义</th>
                    <th>描述</th>
                  </tr>
                  <tr>
                    <td><span class="imp">i</span></td>
                    <td>ignore - 不区分大小写</td>
                    <td>
                      将匹配设置为不区分大小写，搜索时不区分大小写: A 和 a
                      没有区别。
                    </td>
                  </tr>
                  <tr>
                    <td><span class="imp">g</span></td>
                    <td>global - 全局匹配</td>
                    <td>查找所有的匹配项。</td>
                  </tr>
                  <tr>
                    <td><span class="imp">m</span></td>
                    <td>multi line - 多行匹配</td>
                    <td>
                      使边界字符 <span class="marked">^</span> 和
                      <span class="marked">$</span>
                      匹配每一行的开头和结尾，记住是多行，而不是整个字符串的开头和结尾。
                    </td>
                  </tr>
                  <tr>
                    <td><span class="imp">s</span></td>
                    <td>
                      特殊字符圆点 <span class="marked">.</span> 中包含换行符
                      <span class="marked">\n</span>
                    </td>
                    <td>
                      默认情况下的圆点
                      <span class="marked">.</span> 是匹配除换行符
                      <span class="marked">\n</span> 之外的任何字符，加上
                      <span class="marked">s</span> 修饰符之后,
                      <span class="marked">.</span> 中包含换行符 \n。
                    </td>
                  </tr>
                </tbody>
              </n-table>
            </n-layout-sider>
          </n-layout>
          <n-modal
            v-model:show="showModal"
            preset="card"
            title="各种语言代码参考"
            style="width: 30%"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                  <n-alert type="warning" v-if="!textPattern">
                    你还没输入正则表达式
                  </n-alert>
                  <div>
                    <div v-for="item in codeList">
                      <h4>
                        {{ item.codeName }} -
                        <a :href="item.linkHref" target="_blank">{{
                          item.linkText
                        }}</a>
                      </h4>
                      <pre
                        class="prettyprint"
                      > <n-code :code="formatStr(item.code,[textPattern,textSource])"
                            :language="item.codeName"></n-code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </n-modal>
        </n-layout>
      </n-space> </n-config-provider
  ></ClientOnly>
</template>

<style lang="scss">
.reg-input {
  .n-input__input-el {
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

.dropdown-item {
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

.runoob-regex-test {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 0px;
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
}

#exp:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

.popover {
  max-width: 100%;
  width: auto;
}

#exp_dsp {
  display: inline-block;
  cursor: pointer;
  white-space: pre-wrap;
}

#exp_dsp .error {
  color: #f13f86;
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
}

#txt ol li:first-child {
  opacity: 0.5;
}

#txt:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
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
