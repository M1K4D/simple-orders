import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { itemRepository } from 'src/Repository/item.repository';
import { orderRepository } from 'src/Repository/order.repository';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports:[TypeOrmModule.forFeature([orderRepository,itemRepository])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
