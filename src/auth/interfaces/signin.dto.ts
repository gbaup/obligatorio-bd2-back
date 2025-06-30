import { IsNumber, IsString } from 'class-validator';

export class SignInDto {
  @IsNumber()
  ci: number;

  @IsString()
  password: string;
}
