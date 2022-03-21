# json相关

json串反转义

```java
package com.yzq.hutooltest;

import org.apache.commons.text.StringEscapeUtils;
import org.junit.jupiter.api.Test;

/**
 * @author yanni
 * @date time 2022/3/13 13:45
 * @modified By:
 */
public class JsonTest {

    @Test
    public  void parseJson(){
        String s="{\"c_25\":{\"filter\":{\"text\":\"[\\\"地区/璃月\\\",\\\"元素/岩\\\",\\\"星级/四星\\\",\\\"武器/长柄武器\\\"]\"}}}";
        System.out.println(StringEscapeUtils.unescapeEcmaScript(s));
    }
}
```
