import { NotFoundException } from '@nestjs/common';
import { Order } from 'src/entity/order.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Order)
export class orderRepository extends Repository<Order> {
  async getProductById(id: number): Promise<Order> {
    try {
      const data = await this.findOne({
        where: { id: id },
        relations: ['item'],
      });
      if (!data) throw new Error('not found id.');

      return data;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException(error.message);
    }
  }
}
