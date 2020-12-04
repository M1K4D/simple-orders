import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Item } from 'src/entity/item.entity';
import { Order } from 'src/entity/order.entity';
import { itemRepository } from 'src/Repository/item.repository';
import { orderRepository } from 'src/Repository/order.repository';
import { getConnection } from 'typeorm';
import { OrderCreateDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: orderRepository,
    private readonly itemRepository: itemRepository,
  ) {}
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

  async GetById(id: number) {
    return await this.orderRepository.getProductById(id);
  }

  async updateOrder(id: number, body: OrderCreateDto) {
    const { postcode, sender, receiver, address, status, item } = body;
    const find_item = await this.itemRepository.find({ where: { order: id } });
    
    console.log(find_item);
  }

  async deleteOrder(id: number) {
    try {
      const find = await this.orderRepository.findOne({ where: { id: id } });
      if (!find) throw new Error(`id ${id} not found`);
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Order)
        .where('id = :id', { id: id })
        .execute();
      return {
        success: true,
        message: `delete id ${id} sucess`,
      };
    } catch (error) {
      throw new NotFoundException({
        success: false,
        message: error.message,
      });
    }
  }
}
