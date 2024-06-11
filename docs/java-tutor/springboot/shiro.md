# shiro教程

## 添加依赖

```kts
implementation(platform("org.apache.shiro:shiro-bom:2.0.1"))  
  
implementation("org.apache.shiro:shiro-core"){artifact { classifier="jakarta" }}  
implementation("org.apache.shiro:shiro-spring-boot-starter"){artifact { classifier="jakarta" }}  
implementation("org.apache.shiro:shiro-spring-boot-web-starter"){artifact { classifier="jakarta" }}  
  
implementation("org.apache.shiro:shiro-web"){artifact { classifier="jakarta" }}  
implementation("org.apache.shiro:shiro-spring"){artifact { classifier="jakarta" }}
```