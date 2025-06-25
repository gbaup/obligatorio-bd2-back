import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class OrganosService {
  constructor(@Inject('MYSQL_CONNECTION') private readonly db: Pool) {}

  async findAll() {
    const [rows] = await this.db.query('SELECT * FROM Organo');
    return rows;
  }
}