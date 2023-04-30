# mp自动生成代码

- [https://www.cnblogs.com/diffx/p/10611082.html](https://www.cnblogs.com/diffx/p/10611082.html)
- [https://pengshiyu.blog.csdn.net/article/details/107307390](https://pengshiyu.blog.csdn.net/article/details/107307390)
- [https://gitee.com/best_handsome/mybatis-plus-join](https://gitee.com/best_handsome/mybatis-plus-join)
自动生成代码
需要安装依赖

```xml  
  <dependency>
                <groupId>org.apache.velocity</groupId>
                <artifactId>velocity-engine-core</artifactId>
                <version>2.3</version>
            </dependency>
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.5.2</version>
</dependency>

```

```java
package com.yzq;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.fill.Column;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @author yanni
 * @date time 2022/1/18 18:48
 * @modified By:
 */
public class CodeGen {
    static String url = "jdbc:mysql://localhost:3306/spring_simple?autoReconnect=true&useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=CONVERT_TO_NULL&useSSL=false&serverTimezone=Asia/Shanghai";
static  String path="d://tmp//yzq";
    @Test
    public void generateCode() {
        FastAutoGenerator.create(url, "root", "123456")
                .globalConfig(builder -> builder.outputDir(path))
                .packageConfig(builder -> {
                    builder.parent("com.yzq") // 设置父包名
                            .moduleName("") // 设置父包模块名
                            .pathInfo(Collections.singletonMap(OutputFile.mapperXml, path+"//mapper")); // 设置mapperXml生成路径
                })
                .strategyConfig(builder -> builder.addInclude("teacher"))

                .execute();
    }

    public static void main(String[] args) {
        FastAutoGenerator.create(url, "root", "123456")
                .globalConfig(builder -> builder.outputDir(path))
                // 全局配置
                .globalConfig((scanner, builder) -> builder.author(scanner.apply("请输入作者名称？")).fileOverride())
                // 包配置
                .packageConfig((scanner, builder) -> builder.parent(scanner.apply("请输入包名？")))
                // 策略配置
                .strategyConfig((scanner, builder) -> builder.addInclude(getTables(scanner.apply("请输入表名，多个英文逗号分隔？所有输入 all")))
                        .controllerBuilder().enableRestStyle().enableHyphenStyle()
                        .entityBuilder().enableLombok().build())
                /*
                    模板引擎配置，默认 Velocity 可选模板引擎 Beetl 或 Freemarker
                   .templateEngine(new BeetlTemplateEngine())
                   .templateEngine(new FreemarkerTemplateEngine())
                 */
                .execute();


// 处理 all 情况

    }
    protected static List<String> getTables(String tables) {
        return "all".equals(tables) ? Collections.emptyList() : Arrays.asList(tables.split(","));
    }
}

```

## 使用kotlin

```kotlin
blogConfigMapper.exists(KtQueryWrapper(BlogConfig::class.java).eq(BlogConfig::configCode,"init"))

```

[例子](https://github.com/baomidou/mybatis-plus/blob/master/mybatis-plus-extension/src/test/kotlin/com/baomidou/mybatisplus/test/kotlin/WrapperTest.kt)
