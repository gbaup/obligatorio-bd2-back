import { RolMiembroDeMesa } from '../enums/roles.enum';

interface Ciudadano {
  ci: number;
  cc: string;
  fecha_nacimiento: Date;
  nombres: string;
  apellidos: string;
}

interface Candidato extends Ciudadano {
  ci_ciudadano: number;
}

// interface Votante extends Ciudadano {}

interface MiembroDeMesa extends Ciudadano {
  //ci
  rol: RolMiembroDeMesa;
  organismo: string;
  //mesa_asignada
}

// Probablemente no exista esto
interface AgenteDePolicia extends Ciudadano {
  comisaria: string;
}

export type { Ciudadano, Candidato, MiembroDeMesa, AgenteDePolicia };
