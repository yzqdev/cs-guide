# nest技巧

## 引入另一个module的service

<https://blog.bitsrc.io/nest-js-inject-service-from-another-module-cf85987398d5>

> item.module.ts

```ts
import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}

```

> player.module.ts

```ts
import { Module } from '@nestjs/common';
import { ItemModule } from 'src/item/item.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [ItemModule],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
```

> player.controller.ts
这样使用

```ts
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  @Inject(PlayerService)
  private readonly service: PlayerService;

  @Get('find/:id')
  public findPlayerById(@Param('id') id: string): Promise<any> {
    return this.service.findPlayerById(id);
  }
}

```
