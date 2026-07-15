# Angular HTTP 请求与 RxJS

## HttpClient 基本使用

```typescript
// app.module.ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
})
export class AppModule {}
```

```typescript
// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  // GET
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  // GET with params
  searchUsers(query: string): Observable<any[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<any[]>(`${this.apiUrl}/users`, { params });
  }

  // POST
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  // PUT
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

  // DELETE
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  // 自定义 headers
  getWithHeaders(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer token',
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.apiUrl}/protected`, { headers });
  }
}
```

## 在组件中使用

```typescript
@Component({...})
export class UsersComponent implements OnInit {
  users: any[] = [];
  loading = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loading = true;
    this.dataService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }
}
```

## RxJS 技巧

### 取消订阅

```typescript
import { Subject, takeUntil } from 'rxjs';

@Component({...})
export class MyComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.dataService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.data = data);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 使用 async 管道自动管理订阅

```html
<!-- 组件中不 subscribe，模板中自动管理 -->
<div *ngIf="users$ | async as users">
  <li *ngFor="let user of users">{{ user.name }}</li>
</div>
```

```typescript
users$ = this.dataService.getUsers();  // Observable
```

### 操作符组合

```typescript
import { map, filter, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// 搜索防抖
searchTerm$ = new Subject<string>();

ngOnInit() {
  this.searchTerm$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => this.dataService.searchUsers(term)),
    catchError(err => of([])),
  ).subscribe(results => this.results = results);
}

onSearchInput(value: string) {
  this.searchTerm$.next(value);
}
```

## HTTP 拦截器

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    const authReq = token
      ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
      : req;

    return next.handle(authReq);
  }
}

// 错误处理拦截器
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(err => {
        console.error('HTTP Error:', err);
        // 统一错误处理
        if (err.status === 401) {
          // 重定向到登录
        }
        throw err;
      })
    );
  }
}
```

```typescript
// 注册拦截器
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class AppModule {}
```

## 参考

- [Angular HttpClient 文档](https://angular.io/guide/http)
- [RxJS 官方文档](https://rxjs.dev/)
- [RxJS 操作符列表](https://rxjs.dev/api)