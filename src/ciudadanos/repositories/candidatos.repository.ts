import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { CustomRepository } from '../../repositories/custom.repository';
import { Candidato } from '../../common/domain/ciudadanos';

@Injectable()
export class CandidatosRepository extends CustomRepository<Candidato> {
  constructor(@Inject('MYSQL_CONNECTION') db: Pool) {
    const tableName = 'Candidato';
    super(tableName, db);
  }

  async findAllWithNombres() {
    const [rows] = await this.db.query(
      `SELECT Candidato.ci_ciudadano, Ciudadano.nombres, Ciudadano.apellidos
       FROM Candidato
       JOIN Ciudadano ON Candidato.ci_ciudadano = Ciudadano.ci`
    );
    return rows;
  }
}