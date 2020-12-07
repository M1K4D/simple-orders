import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderCreateDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
@UsePipes(new ValidationPipe())
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('getorder')
  async GetOder() {
    return await this.orderService.getOrder();
  }

  @Post('create')
  async createOrder(@Body() body: OrderCreateDto) {
    return await this.orderService.createOrder(body);
  }

  @Get(':id/getbyid')
  async getbyId(@Param('id', ParseIntPipe) id: number) {
    return await this.orderService.GetById(id);
  }

  @Patch('/update/order/:id/item/:iditem')
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Param('iditem', ParseIntPipe) id_item: number,
    @Body() body: OrderCreateDto,
  ) {
    return await this.orderService.updateOrder(id, id_item, body);
  }

  @Delete(':id/delete')
  async deleteOrder(@Param('id', ParseIntPipe) id) {
    return await this.orderService.deleteOrder(id);
  }

  @Get()
  async fetch() {
    return await this.orderService.fetch();
  }
}
