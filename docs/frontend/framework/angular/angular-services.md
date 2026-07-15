# Angular 服务与依赖注入

## 创建服务

```typescript
// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // 全局单例，无需在模块中注册
})
export class DataService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('https://api.example.com/users');
  }
}
```

## 在组件中使用

```typescript
@Component({
  selector: 'app-users',
  template: `...`,
  providers: [],  // 如果不需要全局单例，可在此处提供
})
export class UsersComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
}
```

## 服务层级

- **`providedIn: 'root'`** - 全局单例，整个应用共享
- **`providedIn: 'any'`** - 每个懒加载模块一个实例
- **组件 `providers`** - 每个组件实例一个服务

## 典型服务模式

### 数据服务

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('/api/users', user);
  }
}
```

### 共享状态服务

```typescript
@Injectable({ providedIn: 'root' })
export class AppStateService {
  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  setLoading(v: boolean) {
    this.loading.next(v);
  }
}
```

## 参考

- [Angular 依赖注入](https://angular.io/guide/dependency-injection)
- [Angular 服务](https://angular.io/guide/architecture-services)