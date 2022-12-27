# 书签转json

把书签保存为html格式,然后加入

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
