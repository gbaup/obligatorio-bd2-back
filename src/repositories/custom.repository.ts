import { Injectable } from '@nestjs/common';
import { IRepository } from './repository.interface';

@Injectable()
export abstract class CustomRepository<T extends object>
  implements IRepository<T>
{
  protected readonly tableName: string;

  protected constructor(tableName: string) {
    this.tableName = tableName;
  }

  findAll(): Promise<T[] | null> {
    const sql = `SELECT *
                 FROM ${this.tableName}`;
    console.log(`Executing SQL: ${sql}`);
    throw new Error('Method not implemented.');
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
