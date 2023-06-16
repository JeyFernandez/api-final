import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateSaleDto {
  @IsDate()
  fecha: string;

  @IsNotEmpty()
  @IsString()
  clienteName: string;

  @IsArray()
  @IsOptional()
  products: string[];

  @IsNumber()
  @Min(1)
  cantidad: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  total: number;

  @IsNotEmpty()
  @IsString()
  metodoPago: string;

  @IsNotEmpty()
  @IsString()
  estado: string;

  @IsNotEmpty()
  @IsString()
  empleado: string;
}
