---
order: 11
---

# Entity Framework Core

## EF Core 简介

Entity Framework Core 是轻量级、跨平台的对象关系映射（ORM）框架。

### 安装

```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer    # SQL Server
dotnet add package Microsoft.EntityFrameworkCore.Sqlite       # SQLite
dotnet add package Microsoft.EntityFrameworkCore.MySql        # MySQL
dotnet add package Microsoft.EntityFrameworkCore.Tools        # 迁移工具
```

## DbContext 定义

```csharp
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // 配置实体关系
        modelBuilder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany(u => u.Orders)
            .HasForeignKey(o => o.UserId);

        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Order)
            .WithMany(o => o.Items)
            .HasForeignKey(oi => oi.OrderId);

        // 配置索引
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // 种子数据
        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "商品1", Price = 10.99m },
            new Product { Id = 2, Name = "商品2", Price = 20.99m }
        );
    }
}
```

## 实体模型

```csharp
public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // 导航属性
    public ICollection<Order> Orders { get; set; } = new List<Order>();
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;
}

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public decimal TotalAmount { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}

public enum OrderStatus { Pending, Paid, Shipped, Delivered, Cancelled }
```

## 配置连接字符串

```json
// appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyAppDb;User Id=sa;Password=your_password;TrustServerCertificate=true"
  }
}
```

```csharp
// Program.cs
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));
```

## 数据迁移

```bash
# 安装迁移工具（如果未安装）
dotnet tool install --global dotnet-ef

# 创建迁移
dotnet ef migrations add InitialCreate

# 更新数据库
dotnet ef database update

# 查看迁移
dotnet ef migrations list

# 移除最后一次迁移（未提交时）
dotnet ef migrations remove

# 生成 SQL 脚本
dotnet ef migrations script
```

## 基础 CRUD 操作

```csharp
public class UserService
{
    private readonly AppDbContext _db;

    public UserService(AppDbContext db) => _db = db;

    // 查询
    public async Task<List<User>> GetAllAsync()
    {
        return await _db.Users.AsNoTracking().ToListAsync();
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _db.Users.FindAsync(id);
    }

    // 创建
    public async Task<User> CreateAsync(User user)
    {
        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        return user;
    }

    // 更新
    public async Task UpdateAsync(User user)
    {
        _db.Users.Update(user);
        // 或局部更新
        // _db.Entry(user).Property(u => u.Email).IsModified = true;
        await _db.SaveChangesAsync();
    }

    // 删除
    public async Task DeleteAsync(int id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user != null)
        {
            _db.Users.Remove(user);
            await _db.SaveChangesAsync();
        }
    }
}
```

## 查询技巧

```csharp
// 条件查询
var activeUsers = await _db.Users
    .Where(u => u.IsActive && u.CreatedAt > DateTime.UtcNow.AddDays(-30))
    .ToListAsync();

// 排序
var products = await _db.Products
    .OrderBy(p => p.Category)
    .ThenByDescending(p => p.Price)
    .ToListAsync();

// 分页
var page = await _db.Products
    .Skip((pageIndex - 1) * pageSize)
    .Take(pageSize)
    .ToListAsync();

// 包含关联数据（Eager Loading）
var orders = await _db.Orders
    .Include(o => o.User)
    .Include(o => o.Items)
        .ThenInclude(oi => oi.Product)
    .ToListAsync();

// 投影查询
var userDtos = await _db.Users
    .Select(u => new UserDto
    {
        Id = u.Id,
        Name = u.Username,
        OrderCount = u.Orders.Count
    })
    .ToListAsync();

// 聚合
var stats = await _db.Orders
    .GroupBy(o => o.Status)
    .Select(g => new { Status = g.Key, Count = g.Count(), Total = g.Sum(o => o.TotalAmount) })
    .ToListAsync();
```