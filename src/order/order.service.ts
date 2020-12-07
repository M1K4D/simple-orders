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
import * as request from 'request';
import { promisify } from 'util';

const Fetch = promisify(request);

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: orderRepository,
    private readonly itemRepository: itemRepository,
  ) {}

  async fetch() {
    const option = {
      method: 'GET',
      url: 'http://192.168.1.136:3000/products/getproduct',
    };

    const data = await Fetch(option);
    const body = JSON.parse(data.body);
    console.log(body)
    return body
  }

  async getOrder() {
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
        console.log(_item);
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
    return await this.orderRepository.getOrderById(id);
  }

  async updateOrder(id: number, id_item: number, body: OrderCreateDto) {
    const { postcode, sender, receiver, address, status, item } = body;
    const find_item = await this.itemRepository.findOne({
      where: { id: id_item },
    });
    const find_order = await this.orderRepository.findOne({
      where: { id: id },
    });
    try {
      if (!find_order) throw new Error(`Not Found Order id ${id}`);
      if (!find_item) throw new Error(`Not Found Item id ${id_item}`);
      await getConnection()
        .createQueryBuilder()
        .update(Order)
        .set({
          postcode: postcode,
          sender: sender,
          receiver: receiver,
          address: address,
          status: status,
        })
        .where('id = :id', { id: find_order.id })
        .execute();

      await getConnection()
        .createQueryBuilder()
        .update(Item)
        .set({
          sku_code: item[0].sku_code,
          sku_name: item[0].sku_name,
          quanity: item[0].quantity,
        })
        .where('id = :id', { id: find_item.id })
        .execute();

      if (item[0].quantity == 0) {
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(Item)
          .where('id = :id', { id: find_item.id })
          .execute();
      }

      return {
        sucess: true,
        message: `update sucess`,
      };
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException({
        sucess: false,
        message: error.message,
      });
    }
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
