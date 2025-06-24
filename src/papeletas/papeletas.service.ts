import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class PapeletasService {
  constructor(@Inject('MYSQL_CONNECTION') private readonly db: Pool) {}

  async getPapeletasValidas(idEleccion: number) {
    const [rows] = await this.db.query(
      'SELECT id, color, tipo FROM Papeleta WHERE id_eleccion = ?',
      [idEleccion]
    );
    return rows;
  }

   async getCircuitosPorLocalidad(localidad: string) {
    const [rows] = await this.db.query(
        `SELECT id, direccion, es_accesible, localidad FROM Circuito WHERE localidad LIKE ?`,
        [`%${localidad}%`]
    );
    return rows;
  }
}