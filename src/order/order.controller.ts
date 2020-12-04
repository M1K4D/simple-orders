import { Body, Controller, Post } from '@nestjs/common';
import { OrderCreateDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

  @Post('create')
  async createOrder(@Body() body: any){
    return this.orderService.createOrder(body);
  }
}
