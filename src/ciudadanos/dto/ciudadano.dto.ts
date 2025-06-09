import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CiudadanoDto {
  @IsNotEmpty()
  @IsString()
  readonly nombres: string;

  @IsNotEmpty()
  @IsString()
  readonly apellidos: string;

  @IsNotEmpty()
  @IsNumber()
  readonly ci: number;

  @IsNotEmpty()
  @IsString()
  readonly cc: string;

  @IsNotEmpty()
  readonly fecha_nacimiento: Date;
}
