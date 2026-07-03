# Django 教程

> Django 是一个"全栈式"Python Web 框架，提供了开箱即用的 ORM、Admin 后台、认证系统、模板引擎等组件，适合快速构建大型 Web 应用。

## 入门资源

[Django 初学者指南](https://github.com/wzhbingo/django-beginners-guide/) — 含项目实战的中文入门教程

## 核心特性

| 特性 | 说明 |
|------|------|
| **ORM** | 对象关系映射，自动建表、查询、迁移 |
| **Admin** | 自动生成后台管理界面 |
| **URL 路由** | 正则匹配，支持命名空间 |
| **模板引擎** | Django Templates（DTL），支持继承和标签 |
| **表单系统** | 表单验证、CSRF 防护 |
| **认证系统** | 用户注册、登录、权限管理 |
| **中间件** | 请求/响应拦截处理 |
| **安全** | XSS/CSRF/SQL 注入防护 |

## 快速开始

```bash
# 安装
pip install django

# 创建项目
django-admin startproject mysite

# 创建应用
cd mysite
python manage.py startapp myapp

# 运行开发服务器
python manage.py runserver
```

## Hello World 示例

```python
# myapp/views.py
from django.http import HttpResponse

def hello(request):
    return HttpResponse("Hello, Django!")

# mysite/urls.py
from django.urls import path
from myapp import views

urlpatterns = [
    path('hello/', views.hello),
]
```

## 官方文档

- [Django 官方文档](https://docs.djangoproject.com/)
- [Django 中文文档](https://docs.djangoproject.com/zh-hans/)
