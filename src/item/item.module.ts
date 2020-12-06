import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { itemRepository } from 'src/Repository/item.repository';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [TypeOrmModule.forFeature([itemRepository])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
