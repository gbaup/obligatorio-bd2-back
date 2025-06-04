import { TipoPapeleta, ValorPlebiscito } from '../enums/papeletas.enum';

interface Papeleta {
  id: number;
  color: string;
  tipo: TipoPapeleta;
}

interface Lista extends Papeleta {
  numero: number;
  ci_candidato: string;
  id_partido: string;
  id_organo: string;
  nombre_departamento: string;
}

interface Plebiscito extends Papeleta {
  descripcion: string;
  valor: ValorPlebiscito;
}
