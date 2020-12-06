import { Injectable } from '@nestjs/common';
import { itemRepository } from 'src/Repository/item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: itemRepository) {}
  async GetItemById(id: number) {
    return await this.itemRepository.getItemById(id);
  }
}
