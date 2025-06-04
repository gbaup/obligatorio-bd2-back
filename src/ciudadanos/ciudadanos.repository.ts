import { Injectable } from '@nestjs/common';
import { CustomRepository } from '../repositories/custom.repository';
import { Ciudadano } from '../common/domain/ciudadanos';

@Injectable()
export class CiudadanosRepository extends CustomRepository<Ciudadano> {
  constructor() {
    const tableName = 'Ciudadano';
    super(tableName);
  }
}
