import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWorkerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsString()
  @IsNotEmpty()
  direction: string;

  @IsString()
  @IsNotEmpty()
  position: string;
}
