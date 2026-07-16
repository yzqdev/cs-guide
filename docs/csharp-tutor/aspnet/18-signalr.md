---
order: 18
---

# 实时通信（SignalR）

## SignalR 简介

SignalR 是一个实时通信库，支持 WebSocket 回退到 Server-Sent Events 和长轮询。

### 适用场景

- 聊天应用
- 实时通知
- 实时仪表盘
- 协同编辑
- 实时游戏
- 进度更新

## 安装

```bash
dotnet add package Microsoft.AspNetCore.SignalR
```

## 创建 Hub

```csharp
// Hubs/ChatHub.cs
public class ChatHub : Hub
{
    private static readonly Dictionary<string, string> _connections = new();

    // 客户端可以调用的方法
    public async Task SendMessage(string user, string message)
    {
        // 广播给所有连接
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public async Task SendToUser(string userId, string message)
    {
        // 发送给特定用户
        await Clients.User(userId).SendAsync("ReceiveMessage", message);
    }

    public async Task SendToGroup(string groupName, string message)
    {
        // 发送给组
        await Clients.Group(groupName).SendAsync("ReceiveMessage", message);
    }

    // 连接生命周期
    public override async Task OnConnectedAsync()
    {
        var userId = Context.UserIdentifier;
        _connections[Context.ConnectionId] = userId ?? "anonymous";

        await Clients.All.SendAsync("UserConnected", userId);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        _connections.Remove(Context.ConnectionId);
        await Clients.All.SendAsync("UserDisconnected", Context.UserIdentifier);
        await base.OnDisconnectedAsync(exception);
    }
}
```

## 注册 SignalR

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = builder.Environment.IsDevelopment();
    options.KeepAliveInterval = TimeSpan.FromSeconds(15);
    options.ClientTimeoutInterval = TimeSpan.FromSeconds(30);
    options.MaximumReceiveMessageSize = 32 * 1024;  // 32KB
});

var app = builder.Build();

app.MapHub<ChatHub>("/hubs/chat");  // 映射 Hub 终结点

app.Run();
```

## 客户端连接

### JavaScript 客户端

```html
<script src="~/lib/microsoft/signalr/dist/browser/signalr.js"></script>

<script>
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/hubs/chat")
        .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])  // 自动重连
        .configureLogging(signalR.LogLevel.Information)
        .build();

    // 监听服务器方法
    connection.on("ReceiveMessage", (user, message) => {
        console.log(`${user}: ${message}`);
        const li = document.createElement("li");
        li.textContent = `${user}: ${message}`;
        document.getElementById("messageList").appendChild(li);
    });

    // 监听连接状态
    connection.onreconnecting(error => {
        console.log("正在重连...", error);
    });

    connection.onreconnected(connectionId => {
        console.log("重连成功", connectionId);
    });

    connection.onclose(error => {
        console.log("连接关闭", error);
    });

    // 启动连接
    async function start() {
        try {
            await connection.start();
            console.log("连接成功");
        } catch (err) {
            console.log("连接失败", err);
            setTimeout(start, 5000);
        }
    }

    start();

    // 调用服务器方法
    async function sendMessage() {
        const user = document.getElementById("userInput").value;
        const message = document.getElementById("messageInput").value;
        try {
            await connection.invoke("SendMessage", user, message);
        } catch (err) {
            console.error("发送失败", err);
        }
    }
</script>
```

### .NET 客户端

```bash
dotnet add package Microsoft.AspNetCore.SignalR.Client
```

```csharp
using Microsoft.AspNetCore.SignalR.Client;

var connection = new HubConnectionBuilder()
    .WithUrl("https://localhost:5001/hubs/chat")
    .WithAutomaticReconnect()
    .Build();

// 监听
connection.On<string, string>("ReceiveMessage", (user, message) =>
{
    Console.WriteLine($"{user}: {message}");
});

// 启动
await connection.StartAsync();

// 调用
await connection.InvokeAsync("SendMessage", "Bot", "Hello!");
```

## 组管理

```csharp
public class NotificationHub : Hub
{
    // 加入组
    public async Task JoinGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        await Clients.Group(groupName).SendAsync("Notify", 
            $"{Context.UserIdentifier} 加入群组");
    }

    // 离开组
    public async Task LeaveGroup(string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
    }

    // 向组发送消息
    public async Task SendToGroup(string groupName, string message)
    {
        await Clients.Group(groupName).SendAsync("ReceiveMessage", message);
    }

    // 排除调用者
    public async Task SendToOthers(string message)
    {
        await Clients.Others.SendAsync("ReceiveMessage", message);
    }
}
```

## 用户标识

```csharp
// 使用 JWT 认证时，自动设置 Context.UserIdentifier
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                // 从查询字符串读取 Token（WebSocket 无法设置请求头）
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;

                if (!string.IsNullOrEmpty(accessToken) &&
                    path.StartsWithSegments("/hubs"))
                {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    });

// 在 Hub 中获取用户信息
public class NotificationHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        var userId = Context.UserIdentifier;  // JWT 中的 NameIdentifier
        var userName = Context.User?.Identity?.Name;

        // 将连接与用户关联
        await Clients.User(userId).SendAsync("Connected", "连接成功");
    }
}
```

## 强类型 Hub

```csharp
// 定义客户端接口
public interface IChatClient
{
    Task ReceiveMessage(string user, string message);
    Task UserConnected(string userId);
    Task UserDisconnected(string userId);
    Task Error(string message);
}

// 强类型 Hub
public class StronglyTypedChatHub : Hub<IChatClient>
{
    public async Task SendMessage(string user, string message)
    {
        // 使用强类型方法
        await Clients.All.ReceiveMessage(user, message);
    }

    public async Task SendToUser(string userId, string message)
    {
        await Clients.User(userId).ReceiveMessage("System", message);
    }
}
```

## 流式处理

```csharp
// 服务器端流式处理
public class StreamingHub : Hub
{
    public async IAsyncEnumerable<int> CounterStream(
        int count, int delay, [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        for (var i = 0; i < count; i++)
        {
            yield return i;
            await Task.Delay(delay, cancellationToken);
        }
    }
}

// 客户端接收
const stream = connection.stream("CounterStream", 10, 1000);
stream.subscribe({
    next: value => console.log(value),
    complete: () => console.log("完成"),
    error: err => console.log("错误", err)
});
```