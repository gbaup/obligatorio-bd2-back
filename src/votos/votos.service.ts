import { Injectable, Inject } from '@nestjs/common';
import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { VotosRepository } from './votos.repository';

@Injectable()
export class VotosService {
  constructor(
    @Inject('MYSQL_CONNECTION') private readonly db: Pool,
    private readonly votosRepository: VotosRepository,
  ) {
  }

  private toMySQLDateTime(isoString: string) {
    return isoString.replace('T', ' ').substring(0, 19);
  }

  async emitirVoto(body: any) {
    const { id_papeletas, id_circuito_votado, fecha_hora, es_observado, estado } = body;
    const fechaMySQL = this.toMySQLDateTime(fecha_hora);

    // Verificar si hay elección en curso (fecha = hoy)
    const [elecciones] = await this.db.query<RowDataPacket[]>(
      'SELECT id FROM Eleccion WHERE fecha = CURDATE()',
    );
    if (!elecciones || elecciones.length === 0) {
      throw new Error('No hay elección en curso hoy');
    }
    const eleccionEnCurso = elecciones[0];

    const results: ResultSetHeader[] = [];
    if (estado === 'blanco' && (!id_papeletas || id_papeletas.length === 0)) {
      const [result] = await this.db.query<ResultSetHeader>(
        `INSERT INTO Voto (fecha_hora, es_observado, estado, id_papeleta, id_circuito)
        VALUES (?, ?, ?, ?, ?)`,
        [fechaMySQL, es_observado, estado, null, id_circuito_votado],
      );
      results.push(result);
    } else {
      for (const id_papeleta of id_papeletas) {
        const [result] = await this.db.query<ResultSetHeader>(
          `INSERT INTO Voto (fecha_hora, es_observado, estado, id_papeleta, id_circuito)
            VALUES (?, ?, ?, ?, ?)`,
          [fechaMySQL, es_observado, estado, id_papeleta, id_circuito_votado],
        );
        results.push(result);
      }
    }
    return { estado };
  }

  async obtenerVotosObservados(id_circuito: number) {
    //Actualmente devuelve un array de Votos observados. Si te interesa solo la cantidad hay que cambiar el return
    return this.votosRepository.find({
      where: {
        id_circuito,
        es_observado: true,
      },
    });
  }

  async obtenerVotodsPorCircuito(id_circuito: number) {
    return this.votosRepository.find({
      where: {
        id_circuito,
      },
    });
  }

  async obtenerVotosPorPartido(id_partido: number) {
    return this.votosRepository.find({
      where: {
        // id_partido, falta ver la logica de esto
      },
    });
  }
}