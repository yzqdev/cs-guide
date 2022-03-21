# spring-openapi-ui使用

swagger似乎已经不再维护了

```java
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>


```

可以替换为

```java
<dependency>
      <groupId>org.springdoc</groupId>
      <artifactId>springdoc-openapi-ui</artifactId>
      <version>1.5.12</version>
   </dependency>
```

文档在这里
[https://springdoc.org/#migrating-from-springfox](https://springdoc.org/#migrating-from-springfox)
​

[https://blog.csdn.net/m0_47333020/article/details/109776819](https://blog.csdn.net/m0_47333020/article/details/109776819)
​

## 添加全局token

```java

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Swagger3",
                version = "1.0",
                description = "Swagger3使用演示",
                contact = @Contact(name = "TOM")
        ),
        security = @SecurityRequirement(name = "token"),
        externalDocs = @ExternalDocumentation(description = "参考文档",
                url = "https://github.com/swagger-api/swagger-core/wiki/Swagger-2.X---Annotations"
        )
)
@SecurityScheme(type = SecuritySchemeType.APIKEY, name = "token", in = SecuritySchemeIn.HEADER)

public class SwaggerConfig {
    @Bean
    public GroupedOpenApi docker() {
        return GroupedOpenApi.builder()
                .packagesToScan("com.example.springtransfer.controller")
                .group("api")
                .pathsToMatch("/**").build();


    }


}
```

## 添加多个header

```java

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Swagger3",
                version = "1.0",
                description = "Swagger3使用演示",
                contact = @Contact(name = "TOM")
        ),
        security ={ @SecurityRequirement(name = "usersOrigin"), @SecurityRequirement(name = "Authorization")},
        externalDocs = @ExternalDocumentation(description = "参考文档",
                url = "https://github.com/swagger-api/swagger-core/wiki/Swagger-2.X---Annotations"
        )
)

@SecuritySchemes({@SecurityScheme(type = SecuritySchemeType.APIKEY, name = "Authorization", in = SecuritySchemeIn.HEADER), @SecurityScheme(type = SecuritySchemeType.APIKEY, name = "usersOrigin", in = SecuritySchemeIn.HEADER)})
public class SwaggerConfig {
    @Bean
    public GroupedOpenApi docker() {
        return GroupedOpenApi.builder()
                .packagesToScan("com.example.springtransfer.controller")
                .group("api")
                .pathsToMatch("/**").build();


    }


}
```

## 添加参数注解

```java

@Tag(name = "操作接口", description = "操作描述")
@RestController
@RequestMapping("hs")
public class HsApi {

    @Resource
    private HsService hsService;

    @Resource
    private HsTypeService hsTypeService;

    @Operation(summary = "添加", description = "添加描述")
    @Parameters({
            @Parameter(name = "name", description = "名字", required = true),
            @Parameter(name = "typeId", description = "类型ID", required = true)
    })
    @PutMapping("add")
    public JSONObject add(String name, Long typeId) {
        HsType hsType = hsTypeService.findById(typeId);
        Hs hs = new Hs();
        hs.setName(name);
        hs.setType(hsType);
        hs.setDateCreated(new Date());
        hs = hsService.save(hs);
        return JSONObject.parseObject(JSONObject.toJSONString(hs));
    }

    @Operation(summary = "获取")
    @GetMapping("get")
    public JSONObject get(@Parameter(name = "id", description = "数据ID") Long id) {
        Hs hs = hsService.findById(id);
        return JSONObject.parseObject(JSONObject.toJSONString(hs));
    }
}
```
