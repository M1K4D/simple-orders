import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator/types/decorator/typechecker/IsString';

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

  @IsString()
  sku_code: string;

  @IsString()
  sku_name: string;

  @IsNumber()
  quantity: number;
}
