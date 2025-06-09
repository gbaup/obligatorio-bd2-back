import { IsNotEmpty, IsString } from 'class-validator';

export class CiudadanoDto {
  @IsNotEmpty()
  @IsString()
  readonly nombres: string;

  @IsNotEmpty()
  @IsString()
  readonly apellidos: string;

  @IsNotEmpty()
  @IsString()
  readonly ci: string;

  @IsNotEmpty()
  @IsString()
  readonly cc: string;

  @IsNotEmpty()
  readonly fecha_nacimiento: Date;
}
