# MyBatis-Plus 代码生成器

> MyBatis-Plus 代码生成器可以根据数据库表自动生成 Entity、Mapper、Service、Controller 等代码，大幅提升开发效率。

## 引入依赖

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.5.7</version>
</dependency>

<!-- 模板引擎（三选一） -->
<dependency>
    <groupId>org.apache.velocity</groupId>
    <artifactId>velocity-engine-core</artifactId>
    <version>2.3</version>
</dependency>
```

## FastAutoGenerator（推荐，3.5.0+）

```java
public class CodeGenerator {

    public static void main(String[] args) {
        FastAutoGenerator.create(
            "jdbc:mysql://localhost:3306/testdb?useSSL=false&serverTimezone=Asia/Shanghai",
            "root",
            "123456"
        )
        // 全局配置
        .globalConfig(builder -> {
            builder.outputDir("D:/generator")           // 输出目录
                   .author("程序员")                      // 作者
                   .enableSwagger()                      // 开启 Swagger
                   .dateType(DateType.TIME_PACK)         // 使用 java.time
                   .commentDate("yyyy-MM-dd");           // 注释日期格式
        })
        // 包配置
        .packageConfig(builder -> {
            builder.parent("com.example")                // 父包名
                   .moduleName("system")                 // 模块名
                   .entity("entity")                     // 实体包名
                   .service("service")                   // Service 包名
                   .serviceImpl("service.impl")          // ServiceImpl 包名
                   .mapper("mapper")                     // Mapper 包名
                   .controller("controller")             // Controller 包名
                   .xml("mapper.xml");                   // XML 包名
        })
        // 策略配置
        .strategyConfig(builder -> {
            builder.addInclude("users", "orders")        // 需要生成的表
                   .addTablePrefix("t_");                // 表前缀过滤

            // Entity 策略
            builder.entityBuilder()
                   .enableLombok()                       // 开启 Lombok
                   .enableChainModel()                   // 链式模型
                   .enableTableFieldAnnotation()          // 生成 @TableField
                   .versionColumnName("version")          // 乐观锁字段
                   .logicDeleteColumnName("deleted");     // 逻辑删除字段

            // Service 策略
            builder.serviceBuilder()
                   .formatServiceFileName("%sService")   // Service 文件名
                   .formatServiceImplFileName("%sServiceImpl");

            // Controller 策略
            builder.controllerBuilder()
                   .enableRestStyle()                     // 启用 @RestController
                   .enableHyphenStyle();                  // 路径使用短横线

            // Mapper 策略
            builder.mapperBuilder()
                   .enableMapperAnnotation()             // 生成 @Mapper
                   .enableBaseColumnList();               // 生成 BaseColumnList
        })
        // 模板配置
        .templateConfig(builder -> {
            builder.controller("/templates/controller.java");
        })
        // 执行
        .execute();
    }
}
```

## 交互式代码生成

支持在控制台交互输入：

```java
public class InteractiveCodeGen {

    public static void main(String[] args) {
        FastAutoGenerator.create(
            "jdbc:mysql://localhost:3306/testdb?useSSL=false",
            "root",
            "123456"
        )
        .globalConfig((scanner, builder) ->
            builder.author(scanner.apply("请输入作者名称？"))
                   .outputDir(scanner.apply("请输入输出路径？"))
        )
        .packageConfig((scanner, builder) ->
            builder.parent(scanner.apply("请输入包名？"))
        )
        .strategyConfig((scanner, builder) ->
            builder.addInclude(getTables(scanner.apply("请输入表名（多个用逗号分隔，all 表示全部）")))
                   .entityBuilder().enableLombok().build()
                   .controllerBuilder().enableRestStyle().enableHyphenStyle()
        )
        .execute();
    }

    protected static List<String> getTables(String tables) {
        return "all".equals(tables) ? Collections.emptyList()
                                    : Arrays.asList(tables.split(","));
    }
}
```

## 自定义模板

如果默认模板不满足需求，可以创建自定义模板：

```java
// 模板位置：src/main/resources/templates/
// 文件结构：
// templates/
// ├── entity.java.ftl     # 实体模板
// ├── mapper.java.ftl     # Mapper 模板
// ├── service.java.ftl    # Service 模板
// ├── controller.java.ftl # Controller 模板
// └── mapper.xml.ftl      # XML 模板

FastAutoGenerator.create(url, username, password)
    .templateConfig(builder -> {
        builder.entity("/templates/entity.java.ftl")
               .service("/templates/service.java.ftl")
               .controller("/templates/controller.java.ftl");
    })
    .execute();
```

### 自定义实体模板示例

```ftl
package ${package.Entity};

<#list table.importPackages as pkg>
import ${pkg};
</#list>

/**
 * ${table.comment!}
 *
 * @author ${author}
 * @since ${date}
 */
<#if entityLombokModel>
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
</#if>
<#if table.convert>
@TableName("${table.name}")
</#if>
public class ${entity} extends BaseEntity {

<#list table.fields as field>
    <#if field.comment!?length gt 0>
    /** ${field.comment} */
    </#if>
    <#if field.keyFlag>
    @TableId(value = "${field.name}", type = IdType.AUTO)
    <#elseif field.convert>
    @TableField("${field.name}")
    </#if>
    private ${field.propertyType} ${field.propertyName};
</#list>
}
```

## 生成后的文件结构

执行代码生成后，会创建如下目录结构：

```
D:/generator/
└── com/example/system/
    ├── entity/
    │   ├── User.java
    │   └── Order.java
    ├── mapper/
    │   ├── UserMapper.java
    │   └── OrderMapper.java
    ├── mapper.xml/
    │   ├── UserMapper.xml
    │   └── OrderMapper.xml
    ├── service/
    │   ├── UserService.java
    │   └── OrderService.java
    └── service/impl/
        ├── UserServiceImpl.java
        └── OrderServiceImpl.java
```

## MyBatis-Plus Kotlin 支持

```kotlin
// 使用 Kotlin 的 KtQueryWrapper
import com.baomidou.mybatisplus.core.conditions.query.KtQueryWrapper

// 判断是否存在
val exists = blogConfigMapper.exists(
    KtQueryWrapper(BlogConfig::class.java)
        .eq(BlogConfig::configCode, "init")
)
```

参考：[MyBatis-Plus Kotlin 官方示例](https://github.com/baomidou/mybatis-plus/tree/master/mybatis-plus-extension/src/test/kotlin/com/baomidou/mybatisplus/test/kotlin)

## 练习

```java
// 1. 使用 FastAutoGenerator 生成 users 表的完整 CRUD 代码
// 2. 配置生成 Lombok + Swagger 注解
// 3. 配置表前缀过滤（t_ 前缀自动去掉）
// 4. 查看生成的 Service 和 Controller 代码
```
