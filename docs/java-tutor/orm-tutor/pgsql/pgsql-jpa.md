# jpa操作postgres

## 设置自增的主键

方法1

```java
 @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false,columnDefinition = "serial")
  private Long id;
```

方法2

```java
   @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "student_id_seq")
    @SequenceGenerator(name = "student_id_seq", sequenceName = "student_id_seq")
    @Column(name = "id")
    private Long id;
```
