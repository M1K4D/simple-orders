import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ItemCreateDto } from 'src/order/dto/item.dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}
  @Get(':id/getbyid')
  async GetItemByID(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.GetItemById(id);
  }

  @Patch(':id/update')
  @UsePipes(new ValidationPipe())
  async updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ItemCreateDto,
  ) {
    return this.itemService.updateItem(id, body);
  }

  @Delete(':id/delete')
  async deleteItem(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.deleteItem(id)
  }
}
