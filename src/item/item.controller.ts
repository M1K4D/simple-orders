import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}
  @Get(':id/getbyid')
  async GetItemByID(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.GetItemById(id);
  }
}
