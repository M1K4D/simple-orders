import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  sku_code: string;

  @Column({ type: 'varchar', length: '255' })
  sku_name: string;

  @Column()
  quanity: number;

  @ManyToOne(() => Order, (order) => order.id)
  order: Order;
}
