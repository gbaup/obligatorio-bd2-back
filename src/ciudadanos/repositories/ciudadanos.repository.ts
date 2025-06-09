import { Inject, Injectable } from '@nestjs/common';
import { CustomRepository } from '../../repositories/custom.repository';
import { Ciudadano } from '../../common/domain/ciudadanos';
import { Pool } from 'mysql2/promise';

@Injectable()
export class CiudadanosRepository extends CustomRepository<Ciudadano> {
  constructor(@Inject('MYSQL_CONNECTION') db: Pool) {
    const tableName = 'Ciudadano';
    super(tableName, db);
  }
}
