import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { typeorm_config } from './config/typeorm_config';
import { OrderModule } from './order/order.module';

@Module({
  imports: [OrderModule,TypeOrmModule.forRoot(typeorm_config)],
  controllers: [],
  providers: [],
})
export class AppModule {}
