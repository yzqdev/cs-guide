# 配置与环境变量

NestJS 提供了 `@nestjs/config` 模块来管理配置和环境变量。

## 一、安装

```bash
npm install @nestjs/config
```

## 二、基本使用

### 1. 注册 ConfigModule

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,  // 全局可用，无需在模块中重复导入
            envFilePath: '.env',  // 环境变量文件路径
            encoding: 'utf8',
        }),
    ],
})
export class AppModule {}
```

### 2. 创建环境变量文件

```bash
# .env（开发环境）
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=nest_demo
JWT_SECRET=my-secret-key
JWT_EXPIRES_IN=7d
```

```bash
# .env.production（生产环境）
NODE_ENV=production
PORT=8080
DB_HOST=prod-db.example.com
DB_PORT=3306
DB_USERNAME=admin
DB_PASSWORD=prod-password
DB_NAME=nest_prod
JWT_SECRET=prod-secret-key
JWT_EXPIRES_IN=1d
```

### 3. 使用 ConfigService

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
    constructor(private readonly configService: ConfigService) {}

    getDatabaseConfig() {
        return {
            host: this.configService.get<string>('DB_HOST', 'localhost'),
            port: this.configService.get<number>('DB_PORT', 3306),
            username: this.configService.get<string>('DB_USERNAME', 'root'),
            database: this.configService.get<string>('DB_NAME', 'nest_demo'),
        };
    }

    isProduction() {
        return this.configService.get<string>('NODE_ENV') === 'production';
    }
}
```

## 三、配置验证

使用 `joi` 验证环境变量的完整性：

```bash
npm install joi
```

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid('development', 'production', 'test')
                    .default('development'),
                PORT: Joi.number().default(3000),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().default(3306),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                JWT_SECRET: Joi.string().required().min(6),
                JWT_EXPIRES_IN: Joi.string().default('7d'),
            }),
            validationOptions: {
                allowUnknown: true,   // 允许其他未知字段
                abortEarly: false,    // 显示所有验证错误
            },
        }),
    ],
})
export class AppModule {}
```

## 四、配置文件

对于复杂的配置，可以将配置组织为类：

```typescript
// config/database.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'nest_demo',
    synchronize: process.env.NODE_ENV === 'development',
}));
```

```typescript
// config/app.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    env: process.env.NODE_ENV || 'development',
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
    },
}));
```

```typescript
// config/jwt.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET || 'default-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
}));
```

### 加载配置文件

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import jwtConfig from './config/jwt.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, appConfig, jwtConfig],
        }),
    ],
})
export class AppModule {}
```

### 使用命名配置

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
    constructor(private readonly configService: ConfigService) {}

    getConfig() {
        // 使用 'database' 命名空间
        return {
            host: this.configService.get<string>('database.host'),
            port: this.configService.get<number>('database.port'),
            username: this.configService.get<string>('database.username'),
        };
    }

    // 使用 inject 注入
    constructor(
        @Inject(databaseConfig.KEY)
        private readonly dbConfig: ReturnType<typeof databaseConfig>,
    ) {
        console.log(dbConfig.host);  // 直接访问
    }
}
```

## 五、异步配置

```typescript
// config/typeorm.config.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get('DB_HOST', 'localhost'),
            port: this.configService.get('DB_PORT', 3306),
            username: this.configService.get('DB_USERNAME', 'root'),
            password: this.configService.get('DB_PASSWORD', ''),
            database: this.configService.get('DB_NAME', 'nest_demo'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: this.configService.get('NODE_ENV') === 'development',
        };
    }
}
```

```typescript
// database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../config/typeorm.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
        }),
    ],
})
export class DatabaseModule {}
```

## 六、多环境配置

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            // 根据 NODE_ENV 加载不同的 .env 文件
            envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
        }),
    ],
})
export class AppModule {}
```

```text
node .
# 加载 .env.development → .env

NODE_ENV=production node .
# 加载 .env.production → .env

NODE_ENV=test node .
# 加载 .env.test → .env
```

## 七、在 main.ts 中使用

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const port = configService.get('PORT', 3000);
    const env = configService.get('NODE_ENV', 'development');

    await app.listen(port);
    console.log(`应用已启动（环境：${env}，端口：${port}）`);
}
bootstrap();
```

## 八、自定义 YAML 配置文件

```bash
npm install js-yaml
```

```typescript
// config/yaml.config.ts
import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';

export default () => {
    const env = process.env.NODE_ENV || 'development';
    const configPath = join(__dirname, `../../config/${env}.yaml`);

    try {
        const config = yaml.load(readFileSync(configPath, 'utf8'));
        return config as Record<string, any>;
    } catch {
        return {};
    }
};
```

```yaml
# config/development.yaml
server:
  port: 3000
  cors:
    origin: '*'

database:
  host: localhost
  port: 3306
  username: root
  password: ''
  name: nest_dev

jwt:
  secret: dev-secret
  expiresIn: 7d
```

## 九、练习

1. 创建一个 `.env` 文件，包含 PORT、DB_HOST、JWT_SECRET 等变量
2. 在 ConfigModule 中启用 `validationSchema`，确保关键配置必填
3. 创建一个命名配置 `cacheConfig`，包含 redis 连接参数
