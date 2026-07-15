# Angular 路由

## 基本配置

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: '**', redirectTo: '' }  // 404 回退
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## 导航

```html
<!-- 导航链接 -->
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
  <a [routerLink]="['/user', userId]">User Detail</a>
</nav>

<!-- 路由出口 -->
<router-outlet></router-outlet>
```

### 编程式导航

```typescript
import { Router } from '@angular/router';

export class MyComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }

  goToUser(id: number) {
    this.router.navigate(['/user', id]);
  }

  goWithQuery() {
    this.router.navigate(['/search'], { queryParams: { q: 'angular' } });
  }
}
```

## 路由参数

```typescript
import { ActivatedRoute } from '@angular/router';

export class UserDetailComponent implements OnInit {
  userId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // 快照方式（组件不复用时）
    this.userId = this.route.snapshot.paramMap.get('id') || '';

    // 订阅方式（组件复用时使用）
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
    });

    // 查询参数
    this.route.queryParams.subscribe(params => {
      console.log(params);
    });
  }
}
```

## 路由守卫

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
```

```typescript
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canDeactivate: [UnsavedChangesGuard],
  },
];
```

## 懒加载模块

```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'products',
    loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent)
  }
];
```

## 子路由

```typescript
const routes: Routes = [
  {
    path: 'user/:id',
    component: UserComponent,
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'posts', component: UserPostsComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ],
  },
];
```

## 参考

- [Angular 路由文档](https://angular.io/guide/routing-overview)