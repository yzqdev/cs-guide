# webstorm

## 关于webtypes

<https://juejin.cn/post/6954011748277944333>

### webtypes用法

<https://github.com/JetBrains/web-types/blob/master/examples/>

```json
{
  "$schema": "http://json.schemastore.org/web-types",
  "framework": "vue",
  "version": "1.0.0",
  "js-types-syntax": "typescript",
  "name": "VARLET",

  "contributions": {
    "html": {
      "vue-components": [
        {
          "name": "el-affix",
          "source": {
            "symbol": "ElAffix"
          },
          "description": "Fix the element to a specific visible area.",
          "doc-url": "https://element-plus.org/en-US/component/affix.html#affix",
          "props": [
            {
              "name": "offset",
              "description": "offset distance.",
              "doc-url": "https://element-plus.org/en-US/component/affix.html#affix-attributes",
              "type": [
                "number"
              ],
              "default": "0"
            },
            {
              "name": "position",
              "description": "position of affix.",
              "doc-url": "https://element-plus.org/en-US/component/affix.html#affix-attributes",
              "type": [
                "'top' | 'bottom'"
              ],
              "default": "'top'"
            },
            {
              "name": "target",
              "description": "target container. (CSS selector)",
              "doc-url": "https://element-plus.org/en-US/component/affix.html#affix-attributes",
              "type": [
                "string"
              ]
            },
            {
              "name": "z-index",
              "description": "`z-index` of affix",
              "doc-url": "https://element-plus.org/en-US/component/affix.html#affix-attributes",
              "type": [
                "number"
              ],
              "default": "100"
            }
          ],
          "events": [
            {
              "name": "change",
              "description": "triggers when fixed state changed.",
              "doc-url": "https://element-plus.org/en-US/component/affix.html#affix-events"
            },
            {
              "name": "scroll",
              "description": "triggers when scrolling.",
              "doc-url": "https://element-plus.org/en-US/component/affix.html#affix-events"
            }
          ],
          "slots": [
            {
              "name": "default",
              "description": "customize default content.",
              "doc-url": "https://element-plus.org/en-US/component/affix.html#affix-slots"
            }
          ]
        }
      ]
    }
  }
}


```
