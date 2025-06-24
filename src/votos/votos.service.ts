import { Injectable, Inject } from '@nestjs/common';
import { Pool, ResultSetHeader } from 'mysql2/promise';

@Injectable()
export class VotosService {
  constructor(@Inject('MYSQL_CONNECTION') private readonly db: Pool) {}

  private toMySQLDateTime(isoString: string) {
    return isoString.replace('T', ' ').substring(0, 19);
  }

  async emitirVoto(body: any) {
    const { id_papeletas, id_circuito_votado, fecha_hora, es_observado, estado } = body;
    const fechaMySQL = this.toMySQLDateTime(fecha_hora);
    const results: ResultSetHeader[] = [];
    for (const id_papeleta of id_papeletas) {
      const [result] = await this.db.query<ResultSetHeader>(
        `INSERT INTO Voto (fecha_hora, es_observado, estado, id_papeleta, id_circuito)
         VALUES (?, ?, ?, ?, ?)`,
        [fechaMySQL, es_observado, estado, id_papeleta, id_circuito_votado]
      );
      results.push(result);
    }
    return { estado };
  }
}