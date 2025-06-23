import { Inject, Injectable } from '@nestjs/common';
import { CustomRepository } from '../../repositories/custom.repository';
import { MiembroMesa } from '../../common/domain/ciudadanos';
import { Pool } from 'mysql2/promise';

@Injectable()
export class MiembrosMesaRepository extends CustomRepository<MiembroMesa> {
  constructor(@Inject('MYSQL_CONNECTION') db: Pool) {
    const tableName = 'MiembroMesa';
    super(tableName, db);
  }
}
