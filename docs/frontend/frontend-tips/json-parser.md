# JSON 处理

## JSON 转义与反转义

```java
package com.yzq.hutooltest;

import org.apache.commons.text.StringEscapeUtils;
import org.junit.jupiter.api.Test;

public class JsonTest {
    @Test
    public void parseJson() {
        String s = "{\"c_25\":{\"filter\":{\"text\":\"[\\\"地区/璃月\\\",\\\"元素/岩\\\",\\\"星级/四星\\\",\\\"武器/长柄武器\\\"]\"}}}";
        System.out.println(StringEscapeUtils.unescapeEcmaScript(s));
    }
}
```

## JavaScript 处理

```javascript
// JSON 转义
const str = JSON.stringify({ name: '测试', value: 'a"b' });
console.log(str); // {"name":"测试","value":"a\"b"}

// JSON 反转义
const parsed = JSON.parse(str);
console.log(parsed); // { name: '测试', value: 'a"b' }

// 处理嵌套转义（双重转义）
const doubleEncoded = '{\\"name\\":\\"test\\"}';
const singleEncoded = doubleEncoded.replace(/\\"/g, '"');
const obj = JSON.parse(singleEncoded);
console.log(obj); // { name: 'test' }
```

## 在线工具

- [JSON.cn](https://www.json.cn/) — JSON 格式化/压缩/校验
- [JSON Editor Online](https://jsoneditoronline.org/) — 可视化 JSON 编辑器
- [JSON Schema Store](https://www.schemastore.org/json/) — JSON Schema 参考
