import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class ZonasService {
  constructor(@Inject('MYSQL_CONNECTION') private readonly db: Pool) {}

  async getAll() {
    const [rows] = await this.db.query('SELECT * FROM Zona');
    return rows;
  }
}
