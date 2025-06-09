import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CiudadanoDto {
  @IsString()
  readonly nombres: string;

  @IsString()
  readonly apellidos: string;

  @IsNumber()
  readonly ci: number;

  @IsString()
  readonly cc: string;

  @IsDateString()
  readonly fecha_nacimiento: Date;
}
