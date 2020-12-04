import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
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
      return this.orderService.GetById(id)
  }
}
