# Angular 常见问题与技巧

## 性能优化

### 使用 trackBy 提升列表性能

```html
<div *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</div>
```

```typescript
trackById(index: number, item: any): number {
  return item.id;
}
```

### 使用 ChangeDetectionStrategy.OnPush

```typescript
@Component({
  selector: 'app-my',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent {
  @Input() data: any;
}
```

### 懒加载模块

```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];
```

## 开发技巧

### 修改端口号

```bash
ng serve --port 4201
# 或在 angular.json 中配置
"serve": {
  "options": {
    "port": 4201
  }
}
```

### 生成模板代码

```bash
ng generate component components/user-list
ng generate service services/auth
ng generate directive directives/highlight
ng generate pipe pipes/date-format
ng generate guard guards/auth
```

### 环境变量

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com',
};
```

## 常见错误

### `NullInjectorError: No provider for HttpClient`

需要在模块中导入 `HttpClientModule`：

```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
})
export class AppModule {}
```

### `Can't bind to 'ngModel' since it isn't a known property of 'input'`

需要导入 `FormsModule`：

```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
})
```

### 组件模板中访问未定义的属性

使用安全导航运算符 `?.`：

```html
<p>{{ user?.name }}</p>
```

## 推荐 UI 库

- [Angular Material](https://material.angular.io/) - 官方 Material Design 组件库
- [PrimeNG](https://primeng.org/) - 功能丰富的组件库
- [NG-ZORRO](https://ng.ant.design/) - Ant Design 的 Angular 实现
- [NGX-Bootstrap](https://valor-software.com/ngx-bootstrap/) - Bootstrap 组件

## 参考

- [Angular 官方文档](https://angular.io/docs)
- [Angular 中文文档](https://angular.cn/docs)