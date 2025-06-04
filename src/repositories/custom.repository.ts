import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from './repository.interface';
import { Pool, RowDataPacket } from 'mysql2/promise';

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

  findById(id: string | number): Promise<T | null> {
    throw new Error('Method not implemented.');
  }

  create(data: Partial<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  update(id: string | number, data: Partial<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  delete(id: string | number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
