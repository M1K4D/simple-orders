import { Order } from "src/entity/order.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Order)
export class orderRepository extends Repository<Order>{
    
}