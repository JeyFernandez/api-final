import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    detalle:string

    @IsNumber()
    @IsNotEmpty()
    price:number
    
    @IsNotEmpty()
    @IsNumber()
    stock:number
}