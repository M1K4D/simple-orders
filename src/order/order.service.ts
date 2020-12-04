import { BadRequestException, Injectable } from '@nestjs/common';
import { Item } from 'src/entity/item.entity';
import { Order } from 'src/entity/order.entity';
import { getConnection } from 'typeorm';
import { OrderCreateDto } from './dto/order.dto';

@Injectable()
export class OrderService {
    async createOrder(body:OrderCreateDto) {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let err = '';
        const {
          postcode,
          sender,
          receiver,
          address,
          status,
          sku_code,
          sku_name,
          quantity,
        } = body;
    
        const item = new Item();
        const order = new Order();
    
        try {
          order.postcode = postcode;
          order.sender = sender;
          order.receiver = receiver;
          order.address = address;
          order.status = status;
          await queryRunner.manager.save(order);
    
          item.sku_code = sku_code;
          item.sku_name = sku_name;
          item.quanity = quantity;
          await queryRunner.manager.save(item);
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
