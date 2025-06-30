import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CiudadanoDto {
  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsNumber()
  ci: number;

  @IsString()
  cc: string;

  @IsString()
  contrasena: string;

  @IsDateString()
  fecha_nacimiento: Date;
}
