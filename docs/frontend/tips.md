---
order: 2
---
# 一些小问题

- [prettier格式html](https://stackoverflow.com/questions/63285895/make-prettier-less-uglier-prevent-split-tags)
新建一个`.prettierrc`
添加如下内容

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 600,
  "htmlWhitespaceSensitivity": "ignore"

}

```

<https://colorhunt.co/>
## 谷歌浏览器书签转json

目前书签导出大部分都是html,此代码可以将书签提取为json格式。

1：导出书签为html文件

2：在文件中加入以下代码，可自行根据需要编辑修改

3：在控制台第一行复制json文本

```html
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<script>
    $(document).ready(function() {
        var rootTag = $("DL").eq(0);
        getAll(rootTag, json);
        console.log(JSON.stringify(json));
        console.log(json);

    })
    var json = [];

    function getAll(tag, datas) {
        $.each($(tag).children("dt"), function(index, item) {
            if ($(item).children(":has(a)").length == 0) {
                datas.push({
                    name: $(item).children("a").html(),
                    href: $(item).children("a").attr("href"),
                });
            } else {
                var ssd = {
                    name: $(item).children("h3").html(),
                    children: []
                };
                datas.push(ssd);
                $.each($(item).children("dl"), function(index, item2) {
                    getAll(item2, ssd.children);
                });
            }
        })
    }
</script>
```

## 编写nodejs 命令行


推荐使用pnpm


在项目目录执行

```
pnpm link --global
```

如果要删除全局链接,要使用

```
pnpm uninstall --global <package>

`pnpm unlink` only removes the links in your current directory
```