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

  async findByCredencial(cc: string): Promise<Circuito | null> {
    const serie = cc.slice(0, 3).toUpperCase();
    const num = parseInt(cc.slice(3), 10);

    const [rows] = await this.db.query(
      `SELECT * FROM Circuito
       WHERE UPPER(serie_cc) = ?
         AND ? BETWEEN inicio_num_cc AND fin_num_cc
       LIMIT 1`,
      [serie, num],
    );
    return rows[0] || null;
  }

  async obtenerResultadosCircuito(id_circuito: number, id_eleccion: number) {
    const [totalRows] = await this.db.query(
      `SELECT COUNT(*) as total
     FROM Voto v
     JOIN Papeleta p ON v.id_papeleta = p.id
     WHERE v.id_circuito = ? AND p.id_eleccion = ?`,
      [id_circuito, id_eleccion],
    );
    const total = totalRows[0]?.total || 0;

    const [totalListasRows] = await this.db.query(
      `SELECT COUNT(*) as total
     FROM Voto v
     JOIN Papeleta p ON v.id_papeleta = p.id
     WHERE v.id_circuito = ? AND p.id_eleccion = ? AND p.tipo = 'lista' AND v.estado = 'valido'`,
      [id_circuito, id_eleccion],
    );
    const totalListas = totalListasRows[0]?.total || 1;

    const [totalPlebiscitoRows] = await this.db.query(
      `SELECT COUNT(*) as total
     FROM Voto v
     JOIN Papeleta p ON v.id_papeleta = p.id
     WHERE v.id_circuito = ? AND p.id_eleccion = ? AND p.tipo = 'plebiscito' AND v.estado = 'valido'`,
      [id_circuito, id_eleccion],
    );
    const totalPlebiscito = totalPlebiscitoRows[0]?.total || 1;

    const [totalFormulaRows] = await this.db.query(
      `SELECT COUNT(*) as total
     FROM Voto v
     JOIN Papeleta p ON v.id_papeleta = p.id
     WHERE v.id_circuito = ? AND p.id_eleccion = ? AND p.tipo = 'formula' AND v.estado = 'valido'`,
      [id_circuito, id_eleccion],
    );
    const totalFormula = totalFormulaRows[0]?.total || 1;

    const [listas] = await this.db.query(
      `SELECT
       l.numero as numero_lista,
       pa.nombre as nombre_partido,
       COUNT(*) as votos,
       ROUND(COUNT(*) / ? * 100, 2) as porcentaje
     FROM Voto v
     JOIN Papeleta p ON v.id_papeleta = p.id
     JOIN Lista l ON l.id_papeleta = p.id
     JOIN Partido pa ON l.id_partido = pa.id
     WHERE v.id_circuito = ? AND p.id_eleccion = ? AND p.tipo = 'lista' AND v.estado = 'valido'
     GROUP BY l.numero, pa.nombre`,
      [totalListas, id_circuito, id_eleccion],
    );

    const [plebiscitos] = await this.db.query(
      `SELECT
         pl.valor,
         pl.descripcion,
         COUNT(*) as votos,
         ROUND(COUNT(*) / ? * 100, 2) as porcentaje
       FROM Voto v
       JOIN Papeleta p ON v.id_papeleta = p.id
       JOIN Plebiscito pl ON pl.id_plebiscito = p.id
       WHERE v.id_circuito = ? AND p.id_eleccion = ? AND p.tipo = 'plebiscito' AND v.estado = 'valido'
       GROUP BY pl.valor, pl.descripcion`,
      [totalPlebiscito, id_circuito, id_eleccion],
    );

    const [formulas] = await this.db.query(
      `SELECT
        f.lema,
        cpres.nombres AS presidente_nombre,
        cpres.apellidos AS presidente_apellido,
        cvice.nombres AS vicepresidente_nombre,
        cvice.apellidos AS vicepresidente_apellido,
        COUNT(*) as votos,
        ROUND(COUNT(*) / ? * 100, 2) as porcentaje
      FROM Voto v
      JOIN Papeleta p ON v.id_papeleta = p.id
      JOIN Formula f ON f.id = p.id
      JOIN Ciudadano cpres ON f.presidente = cpres.ci
      JOIN Ciudadano cvice ON f.vicepresidente = cvice.ci
      WHERE v.id_circuito = ? AND p.id_eleccion = ? AND p.tipo = 'formula' AND v.estado = 'valido'
      GROUP BY f.lema, cpres.nombres, cpres.apellidos, cvice.nombres, cvice.apellidos`,
      [totalFormula, id_circuito, id_eleccion],
    );

    const [tipos] = await this.db.query(
      `SELECT estado, COUNT(*) as cantidad
       FROM Voto v
       JOIN Papeleta p ON v.id_papeleta = p.id
       WHERE v.id_circuito = ? AND p.id_eleccion = ?
       GROUP BY estado`,
      [id_circuito, id_eleccion],
    );

    const [formularios] = await this.db.query(
      `SELECT p.tipo, COUNT(*) as cantidad
       FROM Voto v
       JOIN Papeleta p ON v.id_papeleta = p.id
       WHERE v.id_circuito = ? AND p.id_eleccion = ?
       GROUP BY p.tipo`,
      [id_circuito, id_eleccion],
    );

    return {
      total_votos: total,
      distribucion_listas: listas,
      distribucion_plebiscito: plebiscitos,
      distribucion_formula: formulas,
      desglose_tipo_voto: tipos,
      participacion_formularios: formularios,
    };
  }

  async obtenerResultadosPorPartido(id_circuito: number, id_eleccion: number) {
    const [totalRows] = await this.db.query(
      `SELECT COUNT(*) as total
     FROM Voto v
     JOIN Papeleta p ON v.id_papeleta = p.id
     WHERE v.id_circuito = ? AND p.id_eleccion = ? AND p.tipo = 'lista' AND v.estado = 'valido'`,
      [id_circuito, id_eleccion],
    );
    const total = totalRows[0]?.total || 1;

    const [rows] = await this.db.query(
      `SELECT
       pa.id as id_partido,
       pa.nombre as nombre_partido,
       SUM(1) as votos,
       ROUND(SUM(1) / ? * 100, 2) as porcentaje
     FROM Voto v
     JOIN Papeleta p ON v.id_papeleta = p.id
     JOIN Lista l ON l.id_papeleta = p.id
     JOIN Partido pa ON l.id_partido = pa.id
     WHERE v.id_circuito = ? AND p.id_eleccion = ? AND p.tipo = 'lista' AND v.estado = 'valido'
     GROUP BY pa.id, pa.nombre
     ORDER BY votos DESC`,
      [total, id_circuito, id_eleccion],
    );
    return {
      total_votos_validos: total,
      resultados: rows,
    };
  }

  async obtenerResultadosPorCandidato(
    id_circuito: number,
    id_eleccion: number,
  ) {
    const [totalRows] = await this.db.query(
      `SELECT COUNT(*) as total
     FROM Voto v
     JOIN Papeleta p ON v.id_papeleta = p.id
     WHERE v.id_circuito = ? AND p.id_eleccion = ? AND p.tipo = 'lista' AND v.estado = 'valido'`,
      [id_circuito, id_eleccion],
    );
    const total = totalRows[0]?.total || 1;

    const [rows] = await this.db.query(
      `SELECT
      l.ci_candidato as ci,
      ciu.nombres,
      ciu.apellidos,
      pa.nombre as nombre_partido,
      l.numero as numero_lista,
      COUNT(v.id) as votos,
      ROUND(COUNT(v.id) / ? * 100, 2) as porcentaje
    FROM Voto v
    JOIN Papeleta p ON v.id_papeleta = p.id
    JOIN Lista l ON l.id_papeleta = p.id
    JOIN Partido pa ON l.id_partido = pa.id
    JOIN Ciudadano ciu ON l.ci_candidato = ciu.ci
    WHERE v.id_circuito = ? AND p.id_eleccion = ? AND p.tipo = 'lista' AND v.estado = 'valido'
    GROUP BY l.ci_candidato, ciu.nombres, ciu.apellidos, pa.nombre, l.numero
    ORDER BY votos DESC`,
      [total, id_circuito, id_eleccion],
    );
    return {
      total_votos_validos: total,
      resultados: rows,
    };
  }
}
