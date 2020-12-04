import { Item } from 'src/entity/item.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Item)
export class itemRepository extends Repository<Item> {}
