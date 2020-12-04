import { IsString, IsNumber } from "class-validator";

export class ItemCreateDto {
  @IsString()
  sku_code: string;

  @IsString()
  sku_name: string;

  @IsNumber()
  quantity: number;
}
