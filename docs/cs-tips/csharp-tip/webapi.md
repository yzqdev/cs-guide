# ASP.NET Core WebAPI

## 快速创建

```bash
# 安装 CLI 模板
dotnet new webapi -n MyApi
cd MyApi
dotnet run
```

## 控制器示例

```csharp
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private static readonly List<User> Users = new()
    {
        new User { Id = 1, Name = "Alice", Email = "alice@example.com" },
        new User { Id = 2, Name = "Bob", Email = "bob@example.com" },
    };

    [HttpGet]
    public ActionResult<List<User>> GetAll()
    {
        return Ok(Users);
    }

    [HttpGet("{id}")]
    public ActionResult<User> GetById(int id)
    {
        var user = Users.Find(u => u.Id == id);
        if (user == null) return NotFound();
        return Ok(user);
    }

    [HttpPost]
    public ActionResult<User> Create(User user)
    {
        user.Id = Users.Max(u => u.Id) + 1;
        Users.Add(user);
        return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
    }

    [HttpPut("{id}")]
    public ActionResult Update(int id, User updated)
    {
        var index = Users.FindIndex(u => u.Id == id);
        if (index == -1) return NotFound();
        updated.Id = id;
        Users[index] = updated;
        return NoContent();
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var removed = Users.RemoveAll(u => u.Id == id);
        if (removed == 0) return NotFound();
        return NoContent();
    }
}

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}
```

## Program.cs

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
```

## 参考资料

- 官方教程：https://learn.microsoft.com/zh-cn/aspnet/core/tutorials/first-web-api
