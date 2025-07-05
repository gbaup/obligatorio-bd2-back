import { Injectable, Inject } from '@nestjs/common';
import { Pool, ResultSetHeader } from 'mysql2/promise';

@Injectable()
export class PapeletasService {
  constructor(@Inject('MYSQL_CONNECTION') private readonly db: Pool) {}

  async getPapeletasValidas(idEleccion: number) {
    const [rows] = await this.db.query(
      'SELECT id, color, tipo FROM Papeleta WHERE id_eleccion = ?',
      [idEleccion],
    );
    return rows;
  }

  async getPapeletaPorId(id: number) {
    const [rows] = await this.db.query(
      'SELECT id, color, tipo FROM Papeleta WHERE id = ?',
      [id],
    );
    return rows[0] || null;
  }

  async getCircuitosPorLocalidad(localidad: string) {
    const [rows] = await this.db.query(
      `SELECT id, direccion, es_accesible, localidad FROM Circuito WHERE localidad LIKE ?`,
      [`%${localidad}%`],
    );
    return rows;
  }

  async getListaPorPapeleta(idPapeleta: number) {
    const [rows] = await this.db.query(
      `SELECT
      L.numero,
      L.ci_candidato,
      L.id_partido,
      L.id_organo,
      L.nombre_departamento,
      Ciu.nombres,
      Ciu.apellidos,
      P.nombre AS partido,
      O.tipo AS organo,
      L.nombre_departamento AS departamento
      FROM Lista L
      JOIN Partido P ON L.id_partido = P.id
      JOIN Organo O ON L.id_organo = O.id
      JOIN Candidato C ON L.ci_candidato = C.ci_ciudadano
      JOIN Ciudadano Ciu ON C.ci_ciudadano = Ciu.CI
      WHERE L.id_papeleta = ?`,
      [idPapeleta],
    );
    return rows;
  }

  async getPlebiscitoPorPapeleta(idPapeleta: number) {
    const [rows] = await this.db.query(
      `SELECT valor, descripcion FROM Plebiscito WHERE id_plebiscito = ?`,
      [idPapeleta],
    );
    return rows[0] || null;
  }

  async getFormulaPorPapeleta(idPapeleta: number) {
    const [rows] = await this.db.query(
      `SELECT presidente, vicepresidente, lema FROM Formula WHERE id = ?`,
      [idPapeleta],
    );
    return rows[0] || null;
  }

  async crearPapeleta(body: any) {
    const color = body.color;
    const tipo = body.tipo;
    const id_eleccion = Number(body.id_eleccion);

    if (!color || !tipo || isNaN(id_eleccion)) {
      throw new Error('Datos inválidos para Papeleta');
    }

    const [result] = await this.db.query<ResultSetHeader>(
      'INSERT INTO Papeleta (color, tipo, id_eleccion) VALUES (?, ?, ?)',
      [color, tipo, id_eleccion],
    );
    const idPapeleta = result.insertId;

    if (tipo === 'lista') {
      const numero = Number(body.numero);
      const ci_candidato = Number(body.ci_candidato);
      const id_partido = Number(body.id_partido);
      const id_organo = Number(body.id_organo);
      const nombre_departamento = body.nombre_departamento;

      if (
        isNaN(numero) ||
        isNaN(ci_candidato) ||
        isNaN(id_partido) ||
        isNaN(id_organo) ||
        !nombre_departamento
      ) {
        throw new Error('Datos inválidos para Lista');
      }

      await this.db.query(
        `INSERT INTO Lista (id_papeleta, numero, ci_candidato, id_partido, id_organo, nombre_departamento)
      VALUES (?, ?, ?, ?, ?, ?)`,
        [
          idPapeleta,
          numero,
          ci_candidato,
          id_partido,
          id_organo,
          nombre_departamento,
        ],
      );
    } else if (tipo === 'plebiscito') {
      const valor = body.valor;
      const descripcion = body.descripcion;
      if (!valor || !descripcion) {
        throw new Error('Datos inválidos para Plebiscito');
      }
      await this.db.query(
        `INSERT INTO Plebiscito (id_plebiscito, valor, descripcion)
      VALUES (?, ?, ?)`,
        [idPapeleta, valor, descripcion],
      );
    } else if (tipo === 'formula') {
      const presidente = Number(body.presidente);
      const vicepresidente = Number(body.vicepresidente);
      const lema = body.lema;
      if (isNaN(presidente) || isNaN(vicepresidente) || !lema) {
        throw new Error('Datos inválidos para Formula');
      }
      await this.db.query(
        `INSERT INTO Formula (id, presidente, vicepresidente, lema)
      VALUES (?, ?, ?, ?)`,
        [idPapeleta, presidente, vicepresidente, lema],
      );
    }

    return { id: idPapeleta };
  }

  async editarPapeleta(id: number, body: any) {
    if (body.color) {
      await this.db.query('UPDATE Papeleta SET color = ? WHERE id = ?', [
        body.color,
        id,
      ]);
    }

    const [rows] = await this.db.query(
      'SELECT tipo FROM Papeleta WHERE id = ?',
      [id],
    );
    const papeleta =
      Array.isArray(rows) && rows.length > 0
        ? (rows[0] as { tipo: string })
        : null;
    if (!papeleta) throw new Error('Papeleta no encontrada');

    if (papeleta.tipo === 'lista') {
      await this.db.query(
        `UPDATE Lista SET numero = ?, ci_candidato = ?, id_partido = ?, id_organo = ?, nombre_departamento = ?
       WHERE id_papeleta = ?`,
        [
          body.numero,
          body.ci_candidato,
          body.id_partido,
          body.id_organo,
          body.nombre_departamento,
          id,
        ],
      );
    } else if (papeleta.tipo === 'plebiscito') {
      await this.db.query(
        `UPDATE Plebiscito SET valor = ?, descripcion = ? WHERE id_plebiscito = ?`,
        [body.valor, body.descripcion, id],
      );
    } else if (papeleta.tipo === 'formula') {
      await this.db.query(
        `UPDATE Formula SET presidente = ?, vicepresidente = ?, lema = ? WHERE id = ?`,
        [body.presidente, body.vicepresidente, body.lema, id],
      );
    }
    return { ok: true };
  }

  async borrarPapeleta(id: number) {
    const [rows] = await this.db.query(
      'SELECT tipo FROM Papeleta WHERE id = ?',
      [id],
    );
    const papeleta =
      Array.isArray(rows) && rows.length > 0
        ? (rows[0] as { tipo: string })
        : null;
    if (!papeleta) throw new Error('Papeleta no encontrada');

    if (papeleta.tipo === 'lista') {
      await this.db.query('DELETE FROM Lista WHERE id_papeleta = ?', [id]);
    } else if (papeleta.tipo === 'plebiscito') {
      await this.db.query('DELETE FROM Plebiscito WHERE id_plebiscito = ?', [
        id,
      ]);
    } else if (papeleta.tipo === 'formula') {
      await this.db.query('DELETE FROM Formula WHERE id = ?', [id]);
    }
    await this.db.query('DELETE FROM Papeleta WHERE id = ?', [id]);
    return { ok: true };
  }
}
