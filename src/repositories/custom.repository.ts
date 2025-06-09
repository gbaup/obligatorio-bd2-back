import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from './repository.interface';
import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

@Injectable()
export abstract class CustomRepository<T extends object>
  implements IRepository<T>
{
  protected readonly tableName: string;

  protected constructor(
    tableName: string,
    @Inject('MYSQL_CONNECTION') private readonly db: Pool,
  ) {
    this.tableName = tableName;
  }

  async findAll(): Promise<T[]> {
    const sql = `SELECT *
                 FROM ${this.tableName}`;
    const [rows] = await this.db.query<RowDataPacket[]>(sql);
    return rows as T[];
  }

  async findById(id: string | number): Promise<T | null> {
    const sql = `SELECT *
                 FROM ${this.tableName}
                 WHERE id = ?`;
    return this.db
      .query<RowDataPacket[]>(sql, [id])
      .then(([rows]) => (rows.length > 0 ? (rows[0] as T) : null));
  }

  async create(data: Partial<T>): Promise<T> {
    const sql = `INSERT INTO ${this.tableName}
                 SET ?`;
    await this.db.query<ResultSetHeader>(sql, [data]);
    return { ...data } as T;
  }

  async update(id: string | number, data: Partial<T>): Promise<T | null> {
    const sql = `UPDATE ${this.tableName}
                 SET ?
                 WHERE id = ?`;
    return this.db
      .query<ResultSetHeader>(sql, [data, id])
      .then(() => this.findById(id));
  }

  async delete(id: string | number): Promise<void> {
    const sql = `DELETE
                 FROM ${this.tableName}
                 WHERE id = ?`;
    return this.db.query<ResultSetHeader>(sql, [id]).then(() => {});
  }
}
