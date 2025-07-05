import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { Circuito } from '../common/domain/circuito';
import { CustomRepository } from '../repositories/custom.repository';

@Injectable()
export class CircuitosRepository extends CustomRepository<Circuito> {
  constructor(@Inject('MYSQL_CONNECTION') db: Pool) {
    const tableName = 'Circuito';
    super(tableName, db);
  }

  async findByCredencial(cc: string): Promise<Circuito | null> {
    const serie = cc.slice(0, 3).toUpperCase();
    const num = parseInt(cc.slice(3), 10);

    const [rows] = await this.db.query(
      `SELECT * FROM Circuito
       WHERE UPPER(serie_cc) = ?
         AND ? BETWEEN inicio_num_cc AND fin_num_cc
       LIMIT 1`,
      [serie, num],
    );
    return rows[0] || null;
  }
}
