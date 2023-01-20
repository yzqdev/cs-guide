#  一些爬虫常用框架

## Beautiful Soup

名气大，整合了一些常用爬虫需求。缺点：不能加载JS

## Scrapy

看起来很强大的爬虫框架，可以满足简单的页面爬取（比如可以明确获知url pattern的情况）。用这个框架可以轻松爬下来如亚马逊商品信息之类的数据。但是对于稍微复杂一点的页面，如weibo的页面信息，这个框架就满足不了需求了。

在学会了手写爬虫之后，你会发现爬虫框架会让你省事一万倍。框架中的各种参数都已经设置好，我们只需要改动些许参数，就能够事半功倍。

Scrapy主要包括了以下组件：

- 引擎(Scrapy): 用来处理整个系统的数据流处理, 触发事务(框架核心)
- 调度器(Scheduler): 用来接受引擎发过来的请求, 压入队列中, 并在引擎再次请求的时候返回. 可以想像成一个URL（抓取网页的网址或者说是链接）的优先队列, 由它来决定下一个要抓取的网址是什么, 同时去除重复的网址
- 下载器(Downloader): 用于下载网页内容, 并将网页内容返回给蜘蛛(Scrapy下载器是建立在twisted这个高效的异步模型上的)
- 爬虫(Spiders): 爬虫是主要干活的, 用于从特定的网页中提取自己需要的信息, 即所谓的实体(Item)。用户也可以从中提取出链接,让Scrapy继续抓取下一个页面
- 项目管道(Pipeline): 负责处理爬虫从网页中抽取的实体，主要的功能是持久化实体、验证实体的有效性、清除不需要的信息。当页面被爬虫解析后，将被发送到项目管道，并经过几个特定的次序处理数据。
- 下载器中间件(Downloader Middlewares): 位于Scrapy引擎和下载器之间的框架，主要是处理Scrapy引擎与下载器之间的请求及响应。
- 爬虫中间件(Spider Middlewares): 介于Scrapy引擎和爬虫之间的框架，主要工作是处理蜘蛛的响应输入和请求输出。
- 调度中间件(Scheduler Middewares): 介于Scrapy引擎和调度之间的中间件，从Scrapy引擎发送到调度的请求和响应。

Scrapy运行流程大概如下：

- 首先，引擎从调度器中取出一个链接(URL)用于接下来的抓取
- 引擎把URL封装成一个请求(Request)传给下载器，下载器把资源下载下来，并封装成应答包(Response)
- 然后，爬虫解析Response
- 若是解析出实体（Item）,则交给实体管道进行进一步的处理。
- 若是解析出的是链接（URL）,则把URL交给Scheduler等待抓取

## requests和httpx

这两个是请求用的,类似nodejs的fetch和axios,一般搭配bs4等进行解析
requests + beautifulsoup4 + lxml 完美组合

## selenium

这是一个调用浏览器的driver，通过这个库你可以直接调用浏览器完成某些操作，比如输入验证码。

## Puppeteer

[官网](https://pptr.dev/)
[https://github.com/puppeteer/puppeteer](https://github.com/puppeteer/puppeteer)
类似selenium
2017年，谷歌公开发布了 Puppeteer，跟进了无头 Chrome 。Chrome DevTools 团队开发了它，使其比其他类似项目具有重大优势，因为它得到了世界上使用最广泛的浏览器的同一家公司的机构支持。

Puppeteer 可以驱动 Chrome 或 Chromium（所基于Chrome的开源浏览器），默认情况下，安装 Puppeteer 还会下载兼容版本的 Chromium。这避免了您的浏览器最终获得破坏 Puppeteer 的更新的其他可能情况。

## playwright

[官网](https://playwright.dev/)
[https://github.com/microsoft/playwright](https://github.com/microsoft/playwright)

## pyspider

[http://docs.pyspider.org/en/latest/](http://docs.pyspider.org/en/latest/)
PySpider是binux做的一个爬虫架构的开源化实现。主要的功能需求是

- 抓取、更新调度多站点的特定的页面
- 需要对页面进行结构化信息提取
- 灵活可扩展，稳定可监控

## jsoup

[官网](https://jsoup.org/)
一个java爬虫

## colly

一个go语言爬虫

[http://go-colly.org/](http://go-colly.org/)

## goquery

[https://github.com/PuerkitoBio/goquery](https://github.com/PuerkitoBio/goquery)

## gospider

[https://github.com/zhshch2002/gospider](https://github.com/zhshch2002/gospider)
