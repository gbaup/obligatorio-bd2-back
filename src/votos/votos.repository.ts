import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { CustomRepository } from '../repositories/custom.repository';
import { Voto } from '../common/domain/voto';

@Injectable()
export class VotosRepository extends CustomRepository<Voto> {
  constructor(@Inject('MYSQL_CONNECTION') db: Pool) {
    const tableName = 'Voto';
    super(tableName, db);
  }
}
