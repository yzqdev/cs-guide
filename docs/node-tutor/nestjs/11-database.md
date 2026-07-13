# 数据库集成

NestJS 支持多种数据库 ORM，最常用的是 TypeORM 和 Prisma。

## 一、TypeORM 集成

### 1. 安装

```bash
npm install @nestjs/typeorm typeorm mysql2
# 或使用 PostgreSQL
npm install @nestjs/typeorm typeorm pg
# 或使用 SQLite
npm install @nestjs/typeorm typeorm sqlite3
```

### 2. 配置

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',                 // 数据库类型
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'nest_demo',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,             // 开发环境自动建表（生产不要用）
            logging: true,                 // 打印 SQL 日志
        }),
    ],
})
export class AppModule {}
```

### 3. 创建实体

```typescript
// users/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')  // 表名
export class User {
    @PrimaryGeneratedColumn()       // 自增主键
    id: number;

    @Column({ length: 50 })         // VARCHAR(50)
    username: string;

    @Column({ unique: true })       // 唯一索引
    email: string;

    @Column({ select: false })      // 查询时默认不返回
    password: string;

    @Column({ default: true })      // 默认值
    isActive: boolean;

    @CreateDateColumn()             // 自动填充创建时间
    createdAt: Date;

    @UpdateDateColumn()             // 自动填充更新时间
    updatedAt: Date;
}
```

### 4. 实体关系

```typescript
// posts/entities/post.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @ManyToOne(() => User, (user) => user.posts)  // 多对一
    @JoinColumn({ name: 'authorId' })
    author: User;

    @Column()
    authorId: number;

    @OneToMany(() => Comment, (comment) => comment.post)  // 一对多
    comments: Comment[];
}
```

```typescript
// users/entities/user.entity.ts（补充）
import { OneToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

export class User {
    // ... 其他字段

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];
}
```

### 5. 注入 Repository

```typescript
// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(data: Partial<User>): Promise<User> {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        await this.userRepository.update(id, data);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
```

### 6. 注册模块

```typescript
// users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],  // 注册实体
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
```

### 7. 查询示例

```typescript
// 基础查询
const user = await this.userRepository.findOne({
    where: { id: 1 },
    relations: ['posts'],     // 关联查询
});

// 条件查询
const users = await this.userRepository.find({
    where: { isActive: true },
    order: { createdAt: 'DESC' },
    skip: 0,
    take: 10,
});

// 使用 QueryBuilder
const users = await this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.posts', 'post')
    .where('user.isActive = :active', { active: true })
    .andWhere('user.createdAt >= :date', { date: new Date('2026-01-01') })
    .orderBy('user.createdAt', 'DESC')
    .skip(0)
    .take(20)
    .getMany();

// 事务
await this.userRepository.manager.transaction(async (manager) => {
    const user = await manager.save(User, { username: 'Alice' });
    const post = await manager.save(Post, { title: '文章', authorId: user.id });
});
```

## 二、Prisma 集成

### 1. 安装

```bash
npm install @nestjs/prisma prisma @prisma/client
npx prisma init
```

### 2. 定义 Schema

```prisma
// prisma/schema.prisma
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "mysql"       // 或 "postgresql" / "sqlite"
    url      = env("DATABASE_URL")
}

model User {
    id        Int      @id @default(autoincrement())
    username  String   @db.VarChar(50)
    email     String   @unique
    password  String
    isActive  Boolean  @default(true)
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    posts     Post[]
}

model Post {
    id        Int      @id @default(autoincrement())
    title     String
    content   String   @db.Text
    author    User     @relation(fields: [authorId], references: [id])
    authorId  Int
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
```

### 3. Prisma 模块

```typescript
// prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
```

```typescript
// prisma/prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
```

### 4. 使用 Prisma

```typescript
// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async create(data: { username: string; email: string; password: string }) {
        return this.prisma.user.create({ data });
    }

    // 关联查询
    async getUserWithPosts(userId: number) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            include: { posts: true },
        });
    }

    // 分页查询
    async findWithPagination(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.user.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.user.count(),
        ]);
        return { data, total, page, limit };
    }
}
```

## 三、异步配置

使用 `forRootAsync` 从配置服务中获取数据库参数：

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'mysql',
                host: config.get('DB_HOST', 'localhost'),
                port: config.get('DB_PORT', 3306),
                username: config.get('DB_USERNAME', 'root'),
                password: config.get('DB_PASSWORD', ''),
                database: config.get('DB_NAME', 'nest_demo'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: config.get('NODE_ENV') === 'development',
            }),
        }),
    ],
})
export class DatabaseModule {}
```

## 四、事务处理

```typescript
// TypeORM 事务
async transferMoney(fromId: number, toId: number, amount: number) {
    await this.dataSource.transaction(async (manager) => {
        const from = await manager.findOne(User, { where: { id: fromId } });
        const to = await manager.findOne(User, { where: { id: toId } });

        from.balance -= amount;
        to.balance += amount;

        await manager.save(from);
        await manager.save(to);
    });
}

// Prisma 事务
async transferMoney(fromId: number, toId: number, amount: number) {
    await this.prisma.$transaction([
        this.prisma.user.update({
            where: { id: fromId },
            data: { balance: { decrement: amount } },
        }),
        this.prisma.user.update({
            where: { id: toId },
            data: { balance: { increment: amount } },
        }),
    ]);
}
```

## 五、练习

1. 创建一个 `Product` 实体，包含 id、name、price、stock、createdAt 字段
2. 使用 TypeORM 实现商品的 CRUD 操作
3. 创建一个查询：根据价格范围筛选商品，并支持分页
