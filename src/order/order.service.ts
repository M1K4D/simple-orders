import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Item } from 'src/entity/item.entity';
import { Order } from 'src/entity/order.entity';
import { orderRepository } from 'src/Repository/order.repository';
import { getConnection } from 'typeorm';
import { OrderCreateDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: orderRepository) {}
  async GetOrder() {
    try {
      const find = await this.orderRepository.find({ relations: ['item'] });
      //   if(find.length == 0) throw new Error('Not found data')
      return {
        success: true,
        data: find,
      };
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async createOrder(body: OrderCreateDto) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let err = '';
    const { postcode, sender, receiver, address, status, item } = body;

    
    const order = new Order();

    try {
      order.postcode = postcode;
      order.sender = sender;
      order.receiver = receiver;
      order.address = address;
      order.status = status;
      await queryRunner.manager.save(order);
      for (const _item of item) {
        const items = new Item();
        items.sku_code = _item.sku_code;
        items.sku_name = _item.sku_name;
        items.quanity = _item.quantity;
        items.order = order;
        await queryRunner.manager.save(items);
      }
      
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log('error message ::', error.message);
      await queryRunner.rollbackTransaction();
      err = error.message;
    } finally {
      await queryRunner.release();
      if (err)
        throw new BadRequestException({
          success: false,
          message: err,
        });
      return {
        success: true,
        message: 'add success',
      };
    }
  }
}
