---
order: 13
---

# 文件上传

NestJS 提供了处理文件上传的内置机制，基于 `multer` 中间件。

## 一、安装依赖

```bash
npm install @nestjs/platform-express multer
npm install -D @types/multer
```

## 二、单文件上传

### 1. 创建上传模块

```typescript
// upload/upload.module.ts
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';

@Module({
    controllers: [UploadController],
})
export class UploadModule {}
```

### 2. 单文件上传控制器

```typescript
// upload/upload.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('upload')
export class UploadController {
    @Post('file')
    @UseInterceptors(
        FileInterceptor('file', {  // 'file' 对应表单字段名
            storage: diskStorage({
                // 文件存储目录
                destination: join(__dirname, '../../uploads'),
                // 文件名处理
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `${uniqueSuffix}${ext}`);
                },
            }),
            // 文件大小限制（5MB）
            limits: { fileSize: 5 * 1024 * 1024 },
            // 文件类型过滤
            fileFilter: (req, file, callback) => {
                const allowedMimes = [
                    'image/jpeg',
                    'image/png',
                    'image/gif',
                    'application/pdf',
                ];
                if (allowedMimes.includes(file.mimetype)) {
                    callback(null, true);
                } else {
                    callback(new BadRequestException('不支持的文件类型'), false);
                }
            },
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('请选择文件');
        }
        return {
            originalName: file.originalname,
            filename: file.filename,
            path: file.path,
            size: file.size,
            mimetype: file.mimetype,
        };
    }
}
```

### 3. 测试上传

使用 curl 或 Postman 测试：

```bash
curl -X POST http://localhost:3000/upload/file \
  -F "file=@/path/to/image.jpg"
```

## 三、多文件上传

```typescript
// upload/upload.controller.ts
import { Post, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
    @Post('files')
    @UseInterceptors(
        FilesInterceptor('files', 10, {  // 最多 10 个文件
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    callback(null, `${uniqueSuffix}-${file.originalname}`);
                },
            }),
            limits: { fileSize: 5 * 1024 * 1024 },
        }),
    )
    uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
        if (!files || files.length === 0) {
            throw new BadRequestException('请选择文件');
        }
        return files.map(file => ({
            originalName: file.originalname,
            filename: file.filename,
            size: file.size,
        }));
    }
}
```

## 四、文件验证（使用 Pipe）

```typescript
// upload/file-validation.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
    constructor(
        private readonly options: {
            maxSize?: number;
            allowedTypes?: string[];
        } = {},
    ) {}

    transform(file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('文件不能为空');
        }

        // 验证大小
        if (this.options.maxSize && file.size > this.options.maxSize) {
            throw new BadRequestException(
                `文件大小不能超过 ${this.options.maxSize / 1024 / 1024}MB`,
            );
        }

        // 验证类型
        if (this.options.allowedTypes && !this.options.allowedTypes.includes(file.mimetype)) {
            throw new BadRequestException('不支持的文件类型');
        }

        return file;
    }
}
```

```typescript
// 使用
@Post('file')
@UseInterceptors(FileInterceptor('file'))
uploadFile(
    @UploadedFile(new FileValidationPipe({
        maxSize: 2 * 1024 * 1024,  // 2MB
        allowedTypes: ['image/jpeg', 'image/png'],
    }))
    file: Express.Multer.File,
) {
    return { filename: file.filename };
}
```

## 五、静态文件服务

配置静态目录，使上传的文件可以通过 URL 访问：

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 提供静态文件服务
    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

    await app.listen(3000);
}
```

现在可以通过 `http://localhost:3000/uploads/xxx.jpg` 访问上传的文件。

## 六、头像上传完整示例

```typescript
// upload/avatar.controller.ts
import {
    Controller, Post, UseInterceptors,
    UploadedFile, BadRequestException,
    MaxFileSizeValidator, FileTypeValidator,
    ParseFilePipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('avatar')
export class AvatarController {
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('avatar', {
            storage: diskStorage({
                destination: './uploads/avatars',
                filename: (req, file, callback) => {
                    const name = req.user?.id || 'anonymous';
                    const ext = extname(file.originalname);
                    callback(null, `avatar-${name}-${Date.now()}${ext}`);
                },
            }),
        }),
    )
    uploadAvatar(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
                    new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        return {
            url: `/uploads/avatars/${file.filename}`,
            size: file.size,
        };
    }
}
```

## 七、内存存储（用于云存储）

如果不想将文件存到本地磁盘（直接上传到云存储），可以使用内存存储：

```typescript
@Post('to-cloud')
@UseInterceptors(
    FileInterceptor('file', { storage: memoryStorage() }),
)
async uploadToCloud(@UploadedFile() file: Express.Multer.File) {
    // file.buffer 包含文件内容（Buffer）
    // 上传到云存储（阿里云 OSS、AWS S3 等）
    const url = await this.cloudService.upload({
        buffer: file.buffer,
        originalname: file.originalname,
        mimetype: file.mimetype,
    });

    return { url };
}
```

## 八、练习

1. 实现一个图片上传接口，限制为 jpg/png 格式，最大 2MB
2. 上传后返回图片的可访问 URL
3. 添加 `ParseFilePipe` 验证，确保文件类型和大小符合要求
