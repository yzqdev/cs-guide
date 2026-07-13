# DTO / VO / PO / BO / POJO 详解

> 理清 Java 后端开发中这些绕口的"对象"概念及其区别。

## 基本概念

所有 POJO（Plain Old Java Object）都是一个简单的 Java 对象，而 PO、DTO、VO、BO 都属于 POJO 的范畴，只是在不同的分层中承担不同的职责。

| 缩写 | 全称 | 职责 |
|------|------|------|
| **PO** | Persistent Object | 持久化对象，与数据库表字段一一对应 |
| **DTO** | Data Transfer Object | 数据传输对象，用于前端与后端之间的数据传输 |
| **VO** | View Object | 表现层对象，对应前端页面展示的数据 |
| **BO** | Business Object | 业务对象，封装业务逻辑，可能包含多个类 |
| **POJO** | Plain Old Java Object | 普通 Java 对象，以上所有对象的统称 |
| **DAO** | Data Access Object | 数据访问对象，用于数据库增删改查 |

## 通俗理解

Entity（实体类）中的每一个字段与数据库相对应；
VO 中的每一个字段与前端 HTML 页面相对应；
DTO 是用于从 Entity 到 VO（或从 VO 到 Entity）转换的中间对象，其字段是 Entity 或 VO 的一个子集。

### 举个例子

你的 HTML 页面上有三个字段：`name`、`pass`、`age`。
你的数据库表里有两个字段：`name`、`pass`（注意没有 `age`）。

**VO** — 对应前端的三个字段：

```java
private String name;
private String pass;
private String age;
```

**Entity** — 对应数据库的两个字段：

```java
private String name;
private String pass;
```

### 何时使用 DTO？

业务场景：年龄大于 20 的才能存入数据库。

1. 先从页面上拿到 VO，判断 VO 中的 age 是否大于 20
2. 如果大于 20，将 VO 中的 name 和 pass 拿出来放到 DTO 中
3. 再将 DTO 中的 name 和 pass 原封不动地赋给 Entity

```java
// 常用转换工具：BeanUtils 或 MapStruct
BeanUtils.copyProperties(dto, entity);
```

:::tip
DTO 和 Entity 的字段通常是一致的，DTO 只是 Entity 到 VO（或 VO 到 Entity）的中间过程。没有 DTO 仍然可以完成增删改查，具体取决于公司规范。
:::

## 区别详解

当业务足够简单时，一个 POJO 完全可以同时充当 PO、BO、DTO、VO 的角色。

### 示例：用户类

**基础情况：** 只有 name 和 phone
- 数据库两列，业务、传输、前台展示都只有这两项
- PO = DTO = VO = `{name, phone}`

**加入 password：**
- 传输到前台时不应把密码传过去
- PO: `{name, phone, password}`
- DTO: `{name, phone}`
- VO: `{name, phone}`

**加入状态枚举 status：**
- status 用于后续操作，前台不直接显示
- PO: `{name, phone, password, status}`
- DTO: `{name, phone, status}`
- VO: `{name, phone}`

**加入 BO：**
- 一个用户关联了用户设置、用户信息等其他表
- BO 不但有用户本身的属性，还包含了用户设置和用户信息这两个类

### 总结

| 对象 | 层级 | 说明 |
|------|------|------|
| PO | DAO 层 | 持久对象，与数据库记录对应 |
| DTO | Service 层 | 传输对象，前后端数据交互 |
| VO | Controller 层 | 表现对象，前端展示 |
| BO | Service 层 | 业务对象，封装复杂业务逻辑 |
