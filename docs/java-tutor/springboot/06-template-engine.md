---
order: 6
---

# 模板引擎

> Spring Boot 中常用的模板引擎：Thymeleaf、Freemarker、Pebble、Velocity 对比与使用。

## 模板引擎对比

| 引擎 | 特点 | 适用场景 | 维护状态 |
|------|------|---------|---------|
| **Thymeleaf** | 官方推荐，自然模板 | Spring Boot 首选 | ✅ 活跃 |
| **Freemarker** | 灵活强大，非 XML 语法 | 传统 Web 项目 | ✅ 活跃 |
| **Pebble** | 轻量级，模板继承 | 小型项目 | ⚠️ 一般 |
| **Velocity** | 老牌引擎 | 遗留系统 | ❌ 停止维护 |

## Thymeleaf（推荐）

Thymeleaf 是 Spring Boot **官方推荐**的模板引擎，与 Spring MVC 集成最佳。

### 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

### 基本语法

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title th:text="${title}">默认标题</title>
</head>
<body>
    <!-- 文本输出 -->
    <h1 th:text="${message}">Hello World</h1>

    <!-- 条件判断 -->
    <div th:if="${user != null}">
        <p>欢迎您：<span th:text="${user.name}">用户</span></p>
    </div>
    <div th:unless="${user != null}">
        <a href="/login">登录</a>
    </div>

    <!-- 循环 -->
    <table>
        <tr th:each="item : ${items}">
            <td th:text="${item.id}">ID</td>
            <td th:text="${item.name}">名称</td>
            <td th:text="${#numbers.formatDecimal(item.price, 1, 2)}">价格</td>
        </tr>
    </table>

    <!-- URL 链接 -->
    <a th:href="@{/user/detail/{id}(id=${user.id})}">详情</a>
    <img th:src="@{/images/logo.png}" />

    <!-- 片段引用 -->
    <div th:replace="fragments/header :: header"></div>

    <!-- 内联表达式 -->
    <p>Hello, [[${user.name}]]!</p>
</body>
</html>
```

### Controller 示例

```java
@Controller
@RequestMapping("/users")
public class UserController {

    @GetMapping
    public String list(Model model) {
        model.addAttribute("title", "用户列表");
        model.addAttribute("users", userService.findAll());
        return "user/list";  // 对应 templates/user/list.html
    }
}
```

### 配置

```properties
# application.properties
spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.suffix=.html
spring.thymeleaf.mode=HTML
spring.thymeleaf.cache=false  # 开发时关闭缓存
spring.thymeleaf.encoding=UTF-8
```

## Freemarker

### 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-freemarker</artifactId>
</dependency>
```

### 基本语法

```html
<#-- 注释 -->
<!DOCTYPE html>
<html>
<head>
    <title>${title!"默认标题"}</title>
</head>
<body>
    <h1>${message}</h1>

    <#-- 条件判断 -->
    <#if user??>
        <p>欢迎：${user.name}</p>
    <#else>
        <a href="/login">登录</a>
    </#if>

    <#-- 循环 -->
    <table>
        <#list items as item>
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
        </tr>
        </#list>
    </table>

    <#-- 宏定义 -->
    <#macro showUser user>
        <p>${user.name} (${user.email})</p>
    </#macro>
    <@showUser user=currentUser />
</body>
</html>
```

## Pebble

### 添加依赖

```xml
<dependency>
    <groupId>io.pebbletemplates</groupId>
    <artifactId>pebble-spring-boot-starter</artifactId>
    <version>3.2.2</version>
</dependency>
```

### 基本语法

```html
<!DOCTYPE html>
<html>
<head>
    <title>{{ title | default("默认标题") }}</title>
</head>
<body>
    <h1>{{ message }}</h1>

    {% if user %}
        <p>欢迎：{{ user.name }}</p>
    {% endif %}

    <table>
    {% for item in items %}
        <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
        </tr>
    {% endfor %}
    </table>
</body>
</html>
```

## 模板引擎选择建议

| 场景 | 推荐引擎 |
|------|---------|
| 新项目，Spring Boot 首选 | **Thymeleaf** |
| 传统 Freemarker 项目升级 | **Freemarker** |
| 轻量级，倾向简单语法 | **Pebble** |
| 遗留系统维护 | **Velocity** |

> **注意**：Velocity 已在 Spring Boot 1.5 后停止支持，新项目不建议使用。
> Thymeleaf 教程推荐：[官方文档](https://www.thymeleaf.org/documentation.html)