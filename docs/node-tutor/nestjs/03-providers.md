# 提供者与依赖注入

提供者（Providers）是 NestJS 的核心概念之一。几乎所有的业务逻辑都封装在提供者中，通过依赖注入（Dependency Injection）机制组织起来。

## 一、什么是提供者

提供者是用 `@Injectable()` 装饰器注解的类。最常见的形式就是 Service。

```typescript
// cats.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    private readonly cats = [];

    findAll() {
        return this.cats;
    }

    create(cat: any) {
        this.cats.push(cat);
    }
}
```

## 二、依赖注入

依赖注入（DI）是一种设计模式，其中类的依赖由外部容器注入，而不是类自行创建。

### 1. 注入服务

```typescript
// cats.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    // 通过构造函数注入 CatsService
    constructor(private readonly catsService: CatsService) {}

    @Get()
    findAll() {
        return this.catsService.findAll();
    }

    @Post()
    create(@Body() createCatDto: any) {
        this.catsService.create(createCatDto);
    }
}
```

### 2. 等价写法

```typescript
// 简写方式（推荐）
constructor(private readonly catsService: CatsService) {}

// 完整写法（等价）
private readonly catsService: CatsService;

constructor(catsService: CatsService) {
    this.catsService = catsService;
}
```

## 三、注册提供者

在模块中注册提供者，NestJS 才能解析依赖关系：

```typescript
// cats.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
    controllers: [CatsController],
    providers: [CatsService],  // 注册服务
})
export class CatsModule {}
```

## 四、Provider 的多种写法

```typescript
@Module({
    providers: [
        // 1. 标准写法（简写）
        UsersService,

        // 2. 完整写法
        {
            provide: UsersService,
            useClass: UsersService,
        },

        // 3. 使用其他类实现
        {
            provide: UsersService,
            useClass: ProductionUsersService,  // 可切换实现
        },

        // 4. 使用值（Value Provider）
        {
            provide: 'CONFIG',
            useValue: { db: 'mysql', port: 3306 },
        },

        // 5. 使用工厂（Factory Provider）
        {
            provide: 'DATABASE_CONNECTION',
            useFactory: (config) => {
                return createConnection(config);
            },
            inject: ['CONFIG'],  // 工厂函数的依赖
        },

        // 6. 使用别名
        {
            provide: 'ALIAS_SERVICE',
            useExisting: UsersService,
        },
    ],
})
export class AppModule {}
```

## 五、自定义 Provider 注入

```typescript
// 使用 @Inject 注入非类 Token
import { Controller, Get, Inject } from '@nestjs/common';

@Controller('config')
export class ConfigController {
    constructor(
        @Inject('CONFIG') private readonly config: any,
        @Inject('DATABASE_CONNECTION') private readonly db: any,
    ) {}

    @Get()
    getConfig() {
        return {
            config: this.config,
            db: this.db,
        };
    }
}
```

## 六、可选依赖

```typescript
import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class CatsService {
    constructor(
        @Optional()  // 可选，没有提供时不报错
        @Inject('CACHE_OPTIONS') private readonly cacheOptions: any,
    ) {}
}
```

## 七、属性注入

除了构造函数注入，还可以使用 `@Inject` 直接在属性上注入：

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { CatsService } from './cats.service';

@Injectable()
export class OtherService {
    @Inject(CatsService)
    private readonly catsService: CatsService;

    // 等价于构造函数注入：
    // constructor(private readonly catsService: CatsService) {}
}
```

## 八、全局模块与动态模块

```typescript
// 全局模块 —— 导出的 Provider 全局可用，无需在每个模块中导入
import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';

@Global()
@Module({
    providers: [CommonService],
    exports: [CommonService],
})
export class CommonModule {}

// 动态模块 —— 运行时根据参数创建模块
@Module({})
export class ConfigModule {
    static forRoot(options: ConfigOptions): DynamicModule {
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: 'CONFIG_OPTIONS',
                    useValue: options,
                },
            ],
            exports: ['CONFIG_OPTIONS'],
        };
    }
}

// 使用动态模块
@Module({
    imports: [ConfigModule.forRoot({ path: './config.yaml' })],
})
export class AppModule {}
```

## 九、作用域（Scopes）

```typescript
import { Injectable, Scope } from '@nestjs/common';

// 默认单例（应用级别，所有请求共享一个实例）
@Injectable()
export class SingletonService {}

// 请求级别（每个请求创建新实例）
@Injectable({ scope: Scope.REQUEST })
export class RequestScopedService {}

// 瞬态（每次注入创建新实例）
@Injectable({ scope: Scope.TRANSIENT })
export class TransientService {}
```

## 十、完整示例：复杂依赖注入

```typescript
// database.module.ts
import { Module, DynamicModule } from '@nestjs/common';

@Module({})
export class DatabaseModule {
    static forRoot(options: { type: 'mysql' | 'postgres'; host: string }): DynamicModule {
        return {
            module: DatabaseModule,
            providers: [
                {
                    provide: 'DB_OPTIONS',
                    useValue: options,
                },
                {
                    provide: 'DATABASE_CONNECTION',
                    useFactory: async (opts) => {
                        // 模拟创建数据库连接
                        const connection = {
                            type: opts.type,
                            host: opts.host,
                            connected: true,
                            async query(sql: string) {
                                return `执行查询：${sql}`;
                            },
                        };
                        return connection;
                    },
                    inject: ['DB_OPTIONS'],
                },
            ],
            exports: ['DATABASE_CONNECTION'],
        };
    }
}
```

```typescript
// users.service.ts
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(
        @Inject('DATABASE_CONNECTION') private readonly db: any,
    ) {}

    async findAll() {
        return this.db.query('SELECT * FROM users');
    }
}
```

## 十一、练习

1. 创建一个 `LoggerService`，提供 `log()`、`warn()`、`error()` 方法
2. 将 LoggerService 注册为全局模块，在其他模块中直接注入使用
3. 使用工厂 Provider 创建数据库连接配置
