# selenium教程

> Selenium chromeDriver启动时报错：session not created: This version of ChromeDriver only supports Chrome

## 第一个解决方案

这是因为ChromeDriver与本地chrome浏览器的版本不一致导致
ChromeDriver下载地址：[淘宝镜像](http://npmmirror.com/mirrors/chromedriver/)
​

## 第二个解决方案

发现并没有这个必要， webdriver-manager可以解决这个问题

```python
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(ChromeDriverManager(version="91.0.4472.19").install())
driver.get("https://www.zhihu.com")
```
