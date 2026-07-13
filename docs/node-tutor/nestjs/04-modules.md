# 模块系统

模块是 NestJS 组织代码的基本单元。每个 NestJS 应用至少有一个根模块（`AppModule`）。模块将相关的控制器、提供者、导入和导出组织在一起。

## 一、基本模块

```typescript
// cats/cats.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
    imports: [],           // 导入其他模块
    controllers: [CatsController],  // 注册控制器
    providers: [CatsService],       // 注册提供者
    exports: [CatsService],         // 导出供其他模块使用
})
export class CatsModule {}
```

**`@Module()` 装饰器选项：**

| 选项 | 说明 |
|------|------|
| `imports` | 导入其他模块，使用其导出的 Provider |
| `controllers` | 该模块下定义的控制器 |
| `providers` | 该模块下定义的提供者 |
| `exports` | 导出 Provider 供其他模块使用 |

## 二、模块导入与导出

```typescript
// common/common.module.ts
import { Module } from '@nestjs/common';
import { CommonService } from './common.service';

@Module({
    providers: [CommonService],
    exports: [CommonService],  // 导出 CommonService
})
export class CommonModule {}
```

```typescript
// users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CommonModule } from '../common/common.module';

@Module({
    imports: [CommonModule],  // 导入 CommonModule，可使用其导出的 Service
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
```

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';

@Module({
    imports: [UsersModule, CommonModule],
})
export class AppModule {}
```

## 三、功能模块组织

推荐的项目结构：

```text
src/
├── common/          # 通用模块
│   ├── common.module.ts
│   ├── common.service.ts
│   └── guards/
├── users/           # 用户模块
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
├── posts/           # 文章模块
│   ├── posts.module.ts
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   └── entities/
├── auth/            # 认证模块
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   └── auth.service.ts
└── app.module.ts
```

## 四、全局模块

使用 `@Global()` 装饰器使模块全局可用，无需在每个模块中手动导入：

```typescript
// common/common.module.ts
import { Module, Global } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global()
@Module({
    providers: [LoggerService],
    exports: [LoggerService],
})
export class CommonModule {}
```

```typescript
// 任何模块中都可以直接注入 LoggerService，无需导入 CommonModule
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../common/logger.service';

@Injectable()
export class UsersService {
    constructor(private readonly logger: LoggerService) {}

    findAll() {
        this.logger.log('查询用户列表');
        return [];
    }
}
```

## 五、动态模块

动态模块可以在运行时接收参数，根据参数创建模块：

```typescript
// config/config.module.ts
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service';

export interface ConfigModuleOptions {
    path: string;
    environment: 'development' | 'production';
}

@Module({})
export class ConfigModule {
    static forRoot(options: ConfigModuleOptions): DynamicModule {
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: 'CONFIG_OPTIONS',
                    useValue: options,
                },
                ConfigService,
            ],
            exports: [ConfigService, 'CONFIG_OPTIONS'],
        };
    }
}
```

```typescript
// config/config.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ConfigModuleOptions } from './config.module';

@Injectable()
export class ConfigService {
    constructor(
        @Inject('CONFIG_OPTIONS') private readonly options: ConfigModuleOptions,
    ) {}

    get(key: string): string {
        // 读取配置文件中的值
        return `配置值（${key}）`;
    }

    getEnvironment(): string {
        return this.options.environment;
    }
}
```

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            path: './config.yaml',
            environment: 'development',
        }),
    ],
})
export class AppModule {}
```

### 常用的动态模块方法名

| 方法名 | 适用场景 |
|--------|----------|
| `forRoot` | 全局配置，只导入一次 |
| `forFeature` | 功能特定配置，可多次导入 |
| `forRootAsync` | 异步初始化配置 |
| `register` | 注册一个可复用的模块实例 |

## 六、模块引用

NestJS 允许在 Provider 中获取模块的引用：

```typescript
import { Injectable, ModuleRef } from '@nestjs/common';

@Injectable()
export class CatsService {
    constructor(private readonly moduleRef: ModuleRef) {}

    async findServiceInModule() {
        // 获取当前模块中的某个服务（非全局）
        const service = this.moduleRef.get(SomeService);
        // 获取全局服务
        const globalService = this.moduleRef.get(GlobalService, { strict: false });
        return service;
    }
}
```

## 七、循环依赖

当两个模块相互导入时会产生循环依赖，使用 `forwardRef` 解决：

```typescript
// cats/cats.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CommonModule } from '../common/common.module';

@Module({
    imports: [forwardRef(() => CommonModule)],  // 使用 forwardRef
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService],
})
export class CatsModule {}
```

```typescript
// common/common.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { CommonService } from './common.service';
import { CatsModule } from '../cats/cats.module';

@Module({
    imports: [forwardRef(() => CatsModule)],
    providers: [CommonService],
    exports: [CommonService],
})
export class CommonModule {}
```

在 Service 层面也需要 `@Inject(forwardRef(() => ...))`：

```typescript
import { Injectable, Inject, forwardRef } from '@nestjs/common';

@Injectable()
export class CommonService {
    constructor(
        @Inject(forwardRef(() => CatsService))
        private readonly catsService: CatsService,
    ) {}
}
```

## 八、模块的三种角色

| 角色 | 说明 |
|------|------|
| **共享模块** | 导入后可使用其导出的 Provider，默认所有模块都是共享的 |
| **全局模块** | 使用 `@Global()`，所有模块无需导入即可使用其导出的 Provider |
| **功能模块** | 将相关功能（控制器+服务+DTO）封装在一起，职责单一 |

## 九、练习

1. 创建一个 `DatabaseModule` 动态模块，接收数据库连接参数
2. 创建一个全局的 `LoggerModule`，在所有模块中可以直接注入使用
3. 按功能模块重构已有的代码（users / posts / auth 各一个模块）
