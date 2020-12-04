import { IsArray, IsNumber, IsString } from 'class-validator';
import { ItemCreateDto } from './item.dto';
// import { IsString } from 'class-validator/types/decorator/typechecker/IsString';

export class OrderCreateDto {
  @IsString()
  postcode: string;

  @IsString()
  sender: string;

  @IsString()
  receiver: string;

  @IsString()
  address: string;

  @IsString()
  status: string;

  // @IsArray()
  item: ItemCreateDto[];
}
