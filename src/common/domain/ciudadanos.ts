import { RolMiembroDeMesa } from '../enums/roles.enum';

interface Ciudadano {
  ci: string;
  cc: string;
  fecha_nacimiento: Date;
  nombres: string;
  apellidos: string;
}

interface Candidato extends Ciudadano {}

interface Votante extends Ciudadano {}

interface MiembroDeMesa extends Ciudadano {
  rol: RolMiembroDeMesa;
  organismo: string;
}

// Probablemente no exista esto
interface AgenteDePolicia extends Ciudadano {
  comisaria: string;
}

export type { Ciudadano, Candidato, Votante, MiembroDeMesa, AgenteDePolicia };
