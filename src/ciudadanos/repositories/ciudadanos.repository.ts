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
}