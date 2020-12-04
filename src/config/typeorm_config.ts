import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

export const typeorm_config: TypeOrmModule = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'sku_2',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};