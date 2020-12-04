import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  postcode: string;

  @Column({ type: 'varchar', length: '255' })
  sender: string;

  @Column({ type: 'varchar', length: '255' })
  receiver: string;

  @Column({ type: 'varchar', length: '255' })
  address: string;

  @Column({ type: 'varchar', length: '255' })
  status: string;

  @OneToMany(() => Item, (item) => item.order, { cascade: true })
  item: Item[];
}
