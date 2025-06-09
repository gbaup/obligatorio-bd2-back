import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { RolMiembroDeMesa } from '../../common/enums/roles.enum';

export class MiembroMesaDto {
  @IsNumber()
  readonly ci_ciudadano: number;

  @IsEnum(RolMiembroDeMesa, {
    message: 'El rol debe ser uno de los valores permitidos',
  })
  readonly rol: RolMiembroDeMesa;

  @IsString()
  readonly organismo: string;

  @IsOptional()
  @IsString()
  readonly mesa_asignada: string;
}
