# 关于dto等

1、entity 里的每一个字段，与数据库相对应，
2、vo 里的每一个字段，是和你前台 html 页面相对应，
3、dto 这是用来转换从 entity 到 vo，或者从 vo 到 entity 的中间的东西 。（DTO中拥有的字段应该是entity中或者是vo中的一个子集）
举个例子：
你的html页面上有三个字段，name，pass，age
你的数据库表里，有两个字段，name，pass ， 注意没有 age。
而你的 vo 里，就应该有下面三个成员变量 ，因为对应 html 页面上三个字段 。

```java
private string name；

private string pass; 

private string age;
```

这个时候，你的 entity 里，就应该有两个成员变量 ，因为对应数据库表中的 2 个字段 。

```java
private string name；

private string pass;
```

到了这里，好了，业务经理让你做这样一个业务“年龄大于 20 的才能存入数据库，这个时候，你就要用到 dto 了，
1）你要先从页面上拿到 vo，然后判断 vo 中的 age 是不是大于 20。
2）如果大于 20，就把 vo 中的 name 和 pass 拿出来，放到 dto 中。
3）然后在把 dto 中的 name 和 pass 原封不动的给 entity，然后根据 entity 的值，在传入数据库。
这就是他们三个的区别。
PS： dto 和 entity 里面的字段应该是一样的，dto 只是 entity 到 vo，或者 vo 到 entity 的中间过程，如果没有这个过程，你仍然可以做到增删改查，这是根据具体公司规范来的 。
​

​

## 知乎回答

DO我不确定有没有这个东西，就暂时不说了， POJO PO BO DTO VO 我归在一起，因为PO DTO VO BO 都叫是POJO，就是个简单的java对象；DAO 的话就是进行数据库增删改查的类。
下面重点说下这几个，他们都是POJO
PO 持久对象，数据；
BO 业务对象，封装对象、复杂对象 ，里面可能包含多个类；
DTO 传输对象，前端调用时传输 ；
VO 表现对象，前端界面展示。
当你业务足够简单时，一个POJO 也完全当做PO BO DTO VO 看，下面是例子：
比如有个用户类 只有 name 以及 phone
对于数据库层面也就两列，业务层面，传输，和前台展示时 都只有这两项。
然后说下他们区别开来的例子：
1 、还是用户类 name phone 加了个password。
那么你后端的PO属性也是这3个，一般数据库里这个表有几个字段你的PO就有多少属性，但是传输到前台或者展现时，我们不应该把password 密码这种东西也一起传过去，所以他们的DTO VO 就还是 name + phone
po : name phone password
dto : name phone
vo : name phone
2、现在又加了一个 枚举的状态位 status 表示用户的一些特殊状态，前台不会直接显示，可能会根据这个状态产生后续的操作，
po : name phone password status
dto : name phone status
vo : name phone
3、接着看下BO ，一个用户下面 肯定会关联很多其他的表
比如用户设置 用户信息等，那么这个BO 下 不但有用户本身的一些属性，还包含了用户设置 和用户信息这两个类。
​

​

​
