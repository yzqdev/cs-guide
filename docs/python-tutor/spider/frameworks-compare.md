# 一些爬虫框架

 Playwright VS Selenium VS Puppeteer VS Cypress

## 支持语言

- Playwright: ✅✅✅✅ 支持主流语言：JavaScript & TypeScript\python\C#\Go\Java
- Selenium: ✅✅✅✅✅ 支持主流语言：java\python\ruby\C#\C++\JavaScript
- Cypress: ✅ 只支持 JavaScript & TypeScript
- Puppeteer: ✅✅ 只支持 JavaScript & TypeScript \ python

## 覆盖浏览器

- Playwright: ✅✅✅ 支持Chromium/WebKit/Firefox
- Selenium: ✅✅✅✅✅ 运行在目前所有主流浏览器上（不包括国内套皮的浏览器）。
- Cypress: ✅✅ 只支持 Chrome/Firefox
- Puppeteer: ✅✅ 只支持 Chrome/Firefox

## 支持多标签 + 表单

- Selenium: ✅✅✅ 通过 `switch_to` 切换，但不好用。
- Cypress: ❌ 没有真正支持
- Puppeteer: ✅✅✅✅✅ 更符合直觉的 API
- Playwright: ✅✅✅✅✅ 更符合直觉的 API

为证明playwright 更简单，我们来做个代码对比。

## 测试创建速度

- Selenium: ✅ Yes Selenium IDE可以录制脚本。
- Cypress: ❌ 不支持脚本录制。
- Puppeteer: ✅✅ Yes 基于Puppeteer Recorder录制脚本。
- Playwright: ✅✅ Yes 基于 `playwright codegen` 命令录制脚本。

## 并行网格和基础服务

- Selenium: ✅ Yes 托管或构建自己解决方案。
- Cypress: 🤷 只能在自己的闭源付费云构建。
- Puppeteer: ❌ 通常构建自己的
- Playwright: ❌ 通常构建自己的。

## 稳定性

这个主要评估用例编写之后的失败率，不包含真的发现bug之后的失败。

Selenium: ❌✅ 复杂的自动等待机制。
Cypress: ❌✅ 复杂的机制，并且不能与框架一起工作。
Puppeteer:❌✅ 等待某些元素，但必须手工等待其他元素。
Playwright: ❌✅✅ 最好等待某些元素，但必须手工等待其他元素。

## 智能定位

Selenium: ❌ 不支持以多种方式选择元素
Cypress: ❌ 不支持以多种方式选择元素
Puppeteer❌ 不支持以多种方式选择元素
Playwright: ❌✅✅ 非常前景，开始支持自定义选择器引擎。

## Debugging

- Selenium: ❌✅ 远程教程网格依赖于网格提供的程序。
- Cypress: ❌✅ 你甚至不是在写常规的JavaScript。
- Puppeteer: ✅ 在IDE中编写和调试Javascript。
- Playwright: ✅ 在IDE中编写和调试Javascript或其他语言。

## Documentation and Resources

- Selenium: ✅✅ 官方文档写得确实不好，但是第三方资料太丰富，相关的书籍也很多。
- Cypress: ✅✅ 虽然社区很小，但是很热闹，官方文档也写的非常赞。
- Puppeteer: ✅ 社区比较小，但目前有大量的教程。
- Playwright: ✅❌ 工具比较新，API也在变化，文档和教程可能跟不上。

注：要分范围 1 ~ 5，代表分值，分值越高说明越优。

| categories   | Playwright | Selenium | Cypress | Puppeteer |
| :----------- | :--------: | :------: | :-----: | :-------: |
| 支持语言     |     4      |    5     |    1    |     2     |
| 覆盖浏览器   |     3      |    5     |    2    |     2     |
| 多标签&表单  |     5      |    3     |    0    |     5     |
| 测试编写速度 |     4      |    4     |    4    |     3     |
| 并行，网格   |     0      |    4     |    2    |     0     |
| 稳定性       |     4      |    3     |    3    |     3     |
| 智能定位     |     3      |    2     |    2    |     2     |
| Debugging    |     3      |    2     |    3    |     2     |
| 文档和资源   |     3      |    4     |    4    |     3     |

## 如何选择？

首先，这些测试工具都是基础。他们只是提供了一套API来定位和操作元素。并不能成为你自动化项目成功或失败的决定因素。

自动化的是否成功我认为主要取决于以下几个方面：

1. 调研你的项目是否真的适合自动化。
2. 是否真的找到自动化的应用场景。（比如，我们用自动化测试埋点，用自动化配合检查App性能都是很好应用场景）
3. 是否有足够人力投入到自动化中。
4. 测试人员的水平，不要怀疑这一点，不少同学还在定位元素面前磕磕绊绊。
5. 是否有团队支持和配合。有些同学还在纠结验证的问题，让开发配合一些很轻松可绕过，可你就是做不到。

好了，这些工具都无法决定自动化项目是否成功，那怎么选？

如果，你不懂并且也不打算学习JavaScript， 那么就不用选 Cypress 和 Puppeteer 了。

如果，你只是一个新手，那么还是稳妥点，先学会Selenium，这是测试的必备技能。

我非常鼓励那些有一些自动化经验的同学尝试学习JavaScript，他会让你对前端（web）技术有更深的理解，因为你要测试的就是前端(web)应用。就像我可灵活的控制元素的隐藏，修改属性，更快速的定位到疑难杂症的元素，这完全是因为我做过前端开发。Cypress 或 Puppeteer 就是很好的选择
