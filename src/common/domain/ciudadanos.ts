import { RolMiembroDeMesa } from '../enums/roles.enum';

interface Ciudadano {
  ci: number;
  cc: string;
  fecha_nacimiento: Date;
  nombres: string;
  apellidos: string;
  ha_votado: boolean;
  es_admin: boolean;
  password: string;
}

interface Candidato extends Ciudadano {
  ci_ciudadano: number;
}

interface MiembroMesa extends Ciudadano {
  ci_ciudadano: number;
  rol: RolMiembroDeMesa;
  organismo: string;
  mesa_asignada: string;
}

// Probablemente no exista esto
interface AgenteDePolicia extends Ciudadano {
  comisaria: string;
}

export type { Ciudadano, Candidato, MiembroMesa, AgenteDePolicia };
