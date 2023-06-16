import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsString()
  @IsNotEmpty()
  direction: string;

  @IsArray()
  @IsNotEmpty()
  products: string[];
}
