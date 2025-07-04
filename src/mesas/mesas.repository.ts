import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { CustomRepository } from '../repositories/custom.repository';
import { Mesa } from '../common/domain/mesa';

@Injectable()
export class MesasRepository extends CustomRepository<Mesa> {
  constructor(@Inject('MYSQL_CONNECTION') db: Pool) {
    const tableName = 'Mesa';
    super(tableName, db);
  }
}
