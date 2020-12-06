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

  @Patch('/update/order/:id/item/:iditem/')
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Param('iditem', ParseIntPipe) id_item: number,
    @Body() body: OrderCreateDto,
  ) {
    return this.orderService.updateOrder(id, id_item, body);
  }

  @Delete(':id/delete')
  async deleteOrder(@Param('id', ParseIntPipe) id) {
    return this.orderService.deleteOrder(id);
  }
}
