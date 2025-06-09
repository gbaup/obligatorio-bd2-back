import { IsNotEmpty, IsString } from 'class-validator';

export class CandidatoDto {
  @IsNotEmpty()
  @IsString()
  readonly ci_ciudadano: number;
}
