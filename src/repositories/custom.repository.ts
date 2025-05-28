import { Injectable } from '@nestjs/common';
import { IRepository } from './repository.interface';

@Injectable()
export abstract class CustomRepository<T extends object>
  implements IRepository<T>
{
  findAll(): Promise<T[]> {
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
