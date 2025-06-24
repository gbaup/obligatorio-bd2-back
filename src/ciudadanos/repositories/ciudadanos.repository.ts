import { Inject, Injectable } from '@nestjs/common';
import { CustomRepository } from '../../repositories/custom.repository';
import { Ciudadano } from '../../common/domain/ciudadanos';
import { Pool, RowDataPacket } from 'mysql2/promise';

@Injectable()
export class CiudadanosRepository extends CustomRepository<Ciudadano> {
  constructor(@Inject('MYSQL_CONNECTION') db: Pool) {
    const tableName = 'Ciudadano';
    super(tableName, db);
  }

  async findById(ci: number): Promise<Ciudadano | null> {
    const sql = `SELECT * FROM ${this.tableName} WHERE ci = ?`;
    const [rows] = await this.db.query<RowDataPacket[]>(sql, [ci]);
    return Array.isArray(rows) && rows.length > 0 ? (rows[0] as Ciudadano) : null;
  }

  async findCircuitoAsignado(serie: string, num: number) {
    const sql = `SELECT * FROM Circuito WHERE serie_cc = ? AND inicio_num_cc <= ? AND fin_num_cc >= ? LIMIT 1`;
    const [rows] = await (this as any).db.query(sql, [serie, num, num]);
    return rows[0] || null;
  }
}