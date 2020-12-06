import { BadRequestException, Injectable } from '@nestjs/common';
import { Item } from 'src/entity/item.entity';
import { ItemCreateDto } from 'src/order/dto/item.dto';
import { itemRepository } from 'src/Repository/item.repository';
import { getConnection } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: itemRepository) {}
  async GetItemById(id: number) {
    return await this.itemRepository.getItemById(id);
  }

  async updateItem(id: number, body: ItemCreateDto) {
    const { sku_code, sku_name, quantity } = body;
    const find_item = await this.itemRepository.findOne({ where: { id: id } });
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Item)
        .set({
          sku_code: sku_code,
          sku_name: sku_name,
          quanity: quantity,
        })
        .where('id = :id', { id: find_item.id })
        .execute();

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
}
