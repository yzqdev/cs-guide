---
title: "单元测试与集成测试"
order: 10
---

# 单元测试与集成测试

> Spring Boot 提供了丰富的测试支持，包括单元测试、集成测试、Mock 测试等。

## 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

内置 JUnit 5、Mockito、AssertJ、Hamcrest 等测试框架。

## 测试目录结构

```
src/
└── test/
    └── java/
        └── com/example/demo/
            ├── DemoApplicationTests.java        # 整体上下文测试
            ├── controller/
            │   └── UserControllerTest.java
            ├── service/
            │   └── UserServiceTest.java
            └── repository/
                └── UserRepositoryTest.java
```

## 单元测试 Service

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldFindUserById() {
        // given
        User user = User.builder()
                .id(1L)
                .name("张三")
                .email("zhangsan@example.com")
                .build();
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // when
        User result = userService.findById(1L);

        // then
        assertThat(result.getName()).isEqualTo("张三");
        verify(userRepository).findById(1L);
    }

    @Test
    void shouldThrowWhenUserNotFound() {
        // given
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        // when & then
        assertThrows(ResourceNotFoundException.class,
                () -> userService.findById(999L));
    }

    @Test
    void shouldCreateUser() {
        // given
        UserCreateRequest request = new UserCreateRequest();
        request.setName("李四");
        request.setEmail("lisi@example.com");
        request.setAge(20);

        User savedUser = User.builder()
                .id(2L)
                .name("李四")
                .email("lisi@example.com")
                .age(20)
                .build();
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // when
        User result = userService.create(request);

        // then
        assertThat(result.getId()).isEqualTo(2L);
        assertThat(result.getName()).isEqualTo("李四");
        verify(userRepository).save(any(User.class));
    }
}
```

## Controller 层测试

```java
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void shouldReturnUserList() throws Exception {
        // given
        List<User> users = List.of(
                User.builder().id(1L).name("张三").email("z@e.com").build(),
                User.builder().id(2L).name("李四").email("l@e.com").build()
        );
        when(userService.findAll()).thenReturn(users);

        // when & then
        mockMvc.perform(get("/api/users")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(2)))
                .andExpect(jsonPath("$.data[0].name").value("张三"));
    }

    @Test
    void shouldCreateUser() throws Exception {
        // given
        UserCreateRequest request = new UserCreateRequest();
        request.setName("王五");
        request.setEmail("w@e.com");
        request.setAge(25);

        User created = User.builder()
                .id(3L).name("王五").email("w@e.com").age(25).build();
        when(userService.create(any())).thenReturn(created);

        // when & then
        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"王五\",\"email\":\"w@e.com\",\"age\":25}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.id").value(3));
    }

    @Test
    void shouldReturn400WhenValidationFails() throws Exception {
        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"\",\"email\":\"invalid\"}"))
                .andExpect(status().isBadRequest());
    }
}
```

## Repository 层测试

```java
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestEntityManager entityManager;

    private User user;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .name("测试用户")
                .email("test@example.com")
                .age(20)
                .build();
        entityManager.persist(user);
    }

    @Test
    void shouldFindByName() {
        List<User> users = userRepository.findByName("测试用户");
        assertThat(users).hasSize(1);
        assertThat(users.get(0).getEmail()).isEqualTo("test@example.com");
    }

    @Test
    void shouldNotFindNonExistentEmail() {
        boolean exists = userRepository.existsByEmail("nonexist@example.com");
        assertThat(exists).isFalse();
    }
}
```

## 集成测试

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void shouldPerformFullCrud() {
        // Create
        UserCreateRequest request = new UserCreateRequest();
        request.setName("集成测试");
        request.setEmail("integration@test.com");
        request.setAge(30);

        ResponseEntity<UserResponse> createResp = restTemplate.postForEntity(
                "/api/users", request, UserResponse.class);
        assertThat(createResp.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        Long id = createResp.getBody().getId();

        // Read
        ResponseEntity<UserResponse> getResp = restTemplate.getForEntity(
                "/api/users/" + id, UserResponse.class);
        assertThat(getResp.getBody().getName()).isEqualTo("集成测试");

        // Update
        request.setName("更新后名称");
        restTemplate.put("/api/users/" + id, request);

        // Verify update
        getResp = restTemplate.getForEntity("/api/users/" + id, UserResponse.class);
        assertThat(getResp.getBody().getName()).isEqualTo("更新后名称");

        // Delete
        restTemplate.delete("/api/users/" + id);

        // Verify delete
        getResp = restTemplate.getForEntity("/api/users/" + id, UserResponse.class);
        assertThat(getResp.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
}
```

## 测试切片

| 注解 | 测试范围 |
|------|---------|
| `@SpringBootTest` | 完整应用上下文 |
| `@WebMvcTest` | 仅 Web 层 |
| `@DataJpaTest` | 仅 JPA 层 |
| `@JsonTest` | JSON 序列化/反序列化 |
| `@RestClientTest` | REST 客户端 |
| `@WebFluxTest` | WebFlux 控制器 |

## 常用断言

```java
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// AssertJ
assertThat(result).isNotNull()
    .hasFieldOrPropertyWithValue("name", "张三")
    .extracting(User::getEmail)
    .isEqualTo("z@e.com");

// Mockito
verify(userRepository, times(1)).findById(1L);
verify(userRepository, never()).delete(any());
verifyNoInteractions(emailService);

// MockMvc
.andExpect(status().isOk())
.andExpect(jsonPath("$.data[*].name").value(hasItem("张三")))
.andExpect(jsonPath("$.page.totalElements").value(10));
```

## 练习

1. 为 `UserService` 编写完整的单元测试，覆盖 CRUD + 异常场景
2. 为 `UserController` 编写 WebMvcTest，测试正常流程和参数校验失败
3. 编写一个集成测试，验证完整的用户创建 → 查询 → 更新 → 删除流程
