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

  async getListaPorPapeleta(idPapeleta: number) {
    const [rows] = await this.db.query(
        `SELECT L.numero, P.nombre AS partido, C.ci_ciudadano AS candidato
        FROM Lista L
        JOIN Partido P ON L.id_partido = P.id
        JOIN Candidato C ON L.ci_candidato = C.ci_ciudadano
        WHERE L.id_papeleta = ?`,
        [idPapeleta]
    );
    return rows;
  }

    async getPlebiscitoPorPapeleta(idPapeleta: number) {
    const [rows] = await this.db.query(
        `SELECT valor, descripcion FROM Plebiscito WHERE id_plebiscito = ?`,
        [idPapeleta]
    );
    return rows[0];
  }

    async getFormulaPorPapeleta(idPapeleta: number) {
    const [rows] = await this.db.query(
        `SELECT lema, presidente, vicepresidente FROM Formula WHERE id = ?`,
        [idPapeleta]
    );
    return rows[0];
  }
}