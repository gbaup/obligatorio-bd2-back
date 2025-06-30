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
}
