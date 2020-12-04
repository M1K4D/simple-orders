import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderCreateDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('getorder')
  async GetOder() {
    return this.orderService.GetOrder();
  }

  @Post('create')
  async createOrder(@Body() body: OrderCreateDto) {
    return this.orderService.createOrder(body);
  }

  @Get(':id/getbyid')
  async getbyId(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.GetById(id);
  }

  @Patch(':id/update')
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: OrderCreateDto,
  ) {
    return this.orderService.updateOrder(id, body);
  }

  @Delete(':id/delete')
  async deleteOrder(@Param('id', ParseIntPipe) id) {
    return this.orderService.deleteOrder(id);
  }
}
