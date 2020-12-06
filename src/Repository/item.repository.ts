import { NotFoundException } from '@nestjs/common';
import { Item } from 'src/entity/item.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Item)
export class itemRepository extends Repository<Item> {
  async getItemById(id: number): Promise<Item> {
    try {
      const data = await this.findOne({
        where: { id: id },
      });
      if (!data) throw new Error('not found id.');

      return data;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException(error.message);
    }
  }
}
