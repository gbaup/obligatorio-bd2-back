import { IsNumber } from 'class-validator';

export class CandidatoDto {
  @IsNumber()
  readonly ci_ciudadano: number;
}
