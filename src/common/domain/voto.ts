import { EstadoVoto } from '../enums/votos.enum';

export interface Voto {
  id: string; //UUID
  fecha_hora: Date;
  es_observado: boolean;
  estado: EstadoVoto;
}
