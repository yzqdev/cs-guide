---
title: "WebSocket"
order: 17
---

# WebSocket

> WebSocket 实现服务端主动推送消息到客户端，适用于聊天、通知、实时数据等场景。

## 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

## WebSocket 配置

```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 应用前缀：客户端发送消息的路径前缀
        config.setApplicationDestinationPrefixes("/app");

        // 简单消息代理：订阅前缀
        config.enableSimpleBroker("/topic", "/queue");

        // 点对点前缀
        config.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // WebSocket 连接端点
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();  // 兼容不支持 WebSocket 的浏览器
    }
}
```

## 服务端发送消息

```java
@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // 客户端通过 /app/hello 发送消息，服务端处理后推送到 /topic/greetings
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        Thread.sleep(1000);
        return new Greeting("Hello, " + message.getName() + "!");
    }

    // 点对点发送
    @MessageMapping("/private")
    public void privateMessage(Principal principal, PrivateMessage message) {
        messagingTemplate.convertAndSendToUser(
                message.getTo(), "/queue/private",
                new PrivateMessage(principal.getName(), message.getContent()));
    }
}

// 消息模型
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HelloMessage {
    private String name;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Greeting {
    private String content;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrivateMessage {
    private String from;
    private String to;
    private String content;

    public PrivateMessage(String from, String content) {
        this.from = from;
        this.content = content;
    }
}
```

## 服务端主动推送

```java
@Component
@RequiredArgsConstructor
public class NotificationService {

    private final SimpMessagingTemplate messagingTemplate;

    // 广播消息给所有订阅 /topic/notifications 的客户端
    public void broadcast(String message) {
        Notification notification = new Notification("BROADCAST", message);
        messagingTemplate.convertAndSend("/topic/notifications", notification);
    }

    // 发送给指定用户
    public void sendToUser(String username, String message) {
        Notification notification = new Notification("PRIVATE", message);
        messagingTemplate.convertAndSendToUser(username, "/queue/notifications", notification);
    }

    // 发送给指定 Session
    public void sendToSession(String sessionId, String message) {
        // 使用 SimpUserRegistry 获取用户信息
    }
}

@Data
@AllArgsConstructor
public class Notification {
    private String type;
    private String message;
}
```

## 监听 WebSocket 连接

```java
@Component
@Slf4j
public class WebSocketEventListener {

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
        log.info("WebSocket 连接: sessionId={}", headers.getSessionId());
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
        log.info("WebSocket 断开: sessionId={}", headers.getSessionId());
    }

    @EventListener
    public void handleSessionSubscribeEvent(SessionSubscribeEvent event) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
        log.info("订阅: destination={}, sessionId={}",
                headers.getDestination(), headers.getSessionId());
    }

    @EventListener
    public void handleSessionUnsubscribeEvent(SessionUnsubscribeEvent event) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
        log.info("取消订阅: sessionId={}", headers.getSessionId());
    }
}
```

## 客户端示例（JavaScript）

```javascript
// 建立连接
const socket = new SockJS('http://localhost:8080/ws');
const stompClient = Stomp.over(socket);

stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);

    // 订阅广播
    stompClient.subscribe('/topic/greetings', function (greeting) {
        showGreeting(JSON.parse(greeting.body).content);
    });

    // 订阅通知
    stompClient.subscribe('/topic/notifications', function (notification) {
        showNotification(JSON.parse(notification.body));
    });

    // 订阅私人消息
    stompClient.subscribe('/user/queue/notifications', function (notification) {
        showPrivateMessage(JSON.parse(notification.body));
    });
});

// 发送消息
function sendHello() {
    stompClient.send("/app/hello", {}, JSON.stringify({
        'name': $('#name').val()
    }));
}
```

## 使用 WebSocketHandler（底层）

```java
// 方式二：使用 WebSocketHandler
@Configuration
@EnableWebSocket
public class WebSocketHandlerConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(myWebSocketHandler(), "/chat")
                .setAllowedOrigins("*")
                .addInterceptors(new HttpSessionHandshakeInterceptor());
    }

    @Bean
    public WebSocketHandler myWebSocketHandler() {
        return new MyWebSocketHandler();
    }
}

public class MyWebSocketHandler extends TextWebSocketHandler {

    private static final Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.add(session);
        log.info("连接建立: {}", session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        // 接收消息并广播给所有客户端
        for (WebSocketSession s : sessions) {
            if (s.isOpen()) {
                s.sendMessage(message);
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
        log.info("连接关闭: {}", session.getId());
    }
}
```

## 练习

1. 实现一个简单的群聊系统，所有连接的用户可以互相发送消息
2. 实现点对点私聊功能
3. 通过 WebSocket 向前端推送实时数据（如股票价格、系统负载等）
4. 添加心跳检测，防止 WebSocket 连接断开
