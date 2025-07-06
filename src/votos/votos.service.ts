import { Injectable, Inject } from '@nestjs/common';
import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { VotosRepository } from './votos.repository';

@Injectable()
export class VotosService {
  constructor(
    @Inject('MYSQL_CONNECTION') private readonly db: Pool,
    private readonly votosRepository: VotosRepository,
  ) {}

  private toMySQLDateTime(isoString: string) {
    return isoString.replace('T', ' ').substring(0, 19);
  }

  async emitirVoto(body: any) {
    const {
      id_papeletas,
      id_circuito_votado,
      fecha_hora,
      es_observado,
      estado,
    } = body;
    const fechaMySQL = this.toMySQLDateTime(fecha_hora);

    const now = new Date();
    const uruguayOffset = -3 * 60;
    const local = new Date(
      now.getTime() + (uruguayOffset - now.getTimezoneOffset()) * 60000,
    );
    const fechaUy = local.toISOString().slice(0, 10);

    const [elecciones] = await this.db.query<RowDataPacket[]>(
      'SELECT id FROM Eleccion WHERE fecha = ?',
      [fechaUy],
    );
    if (!elecciones || elecciones.length === 0) {
      throw new Error('No hay elección en curso hoy');
    }
    const eleccionEnCurso = elecciones[0];

    const results: ResultSetHeader[] = [];
    if (estado === 'blanco' && (!id_papeletas || id_papeletas.length === 0)) {
      const [result] = await this.db.query<ResultSetHeader>(
        `INSERT INTO Voto (fecha_hora, es_observado, estado, id_papeleta, id_circuito)
        VALUES (?, ?, ?, ?, ?)`,
        [fechaMySQL, es_observado, estado, null, id_circuito_votado],
      );
      results.push(result);
    } else {
      for (const id_papeleta of id_papeletas) {
        const [result] = await this.db.query<ResultSetHeader>(
          `INSERT INTO Voto (fecha_hora, es_observado, estado, id_papeleta, id_circuito)
            VALUES (?, ?, ?, ?, ?)`,
          [fechaMySQL, es_observado, estado, id_papeleta, id_circuito_votado],
        );
        results.push(result);
      }
    }
    return { estado };
  }

  async aprobarVoto(id: number) {
    await this.votosRepository.update(id, { es_observado: false });
    return { ok: true };
  }

  async eliminarVoto(id: number) {
    await this.votosRepository.delete(id);
    return { ok: true };
  }

  async obtenerVotosObservados(id_circuito: number) {
    //Actualmente devuelve un array de Votos observados. Si te interesa solo la cantidad hay que cambiar el return
    return this.votosRepository.find({
      where: {
        id_circuito,
        es_observado: true,
      },
    });
  }

  async obtenerVotodsPorCircuito(id_circuito: number) {
    return this.votosRepository.find({
      where: {
        id_circuito,
      },
    });
  }

  async obtenerVotosPorPartido(id_partido: number) {
    return this.votosRepository.find({
      where: {
        // id_partido, falta ver la logica de esto
      },
    });
  }

  async resultadosPorDepartamento(departamento: string, id_eleccion: number) {
    const [totalRows] = await this.db.query(
      `SELECT COUNT(*) as total
      FROM Voto v
      JOIN Papeleta p ON v.id_papeleta = p.id
      JOIN Circuito c ON v.id_circuito = c.id
      JOIN Zona z ON c.id_zona = z.id
      WHERE z.nombre_departamento = ? AND p.id_eleccion = ? AND p.tipo = 'lista' AND v.estado = 'valido'`,
      [departamento, id_eleccion],
    );
    const total = totalRows[0]?.total || 1;

    const [rows] = await this.db.query(
      `SELECT
       pa.id as id_partido,
       pa.nombre as nombre_partido,
       COUNT(*) as votos,
       ROUND(COUNT(*) / ? * 100, 2) as porcentaje
      FROM Voto v
      JOIN Papeleta p ON v.id_papeleta = p.id
      JOIN Circuito c ON v.id_circuito = c.id
      JOIN Zona z ON c.id_zona = z.id
      JOIN Lista l ON l.id_papeleta = p.id
      JOIN Partido pa ON l.id_partido = pa.id
      WHERE z.nombre_departamento = ? AND p.id_eleccion = ? AND p.tipo = 'lista' AND v.estado = 'valido'
      GROUP BY pa.id, pa.nombre
      ORDER BY votos DESC`,
      [total, departamento, id_eleccion],
    );
    return {
      total_votos_validos: total,
      resultados: rows,
    };
  }

  async cantidadVotosObservados() {
    const [rows] = await this.db.query(
      `SELECT COUNT(*) as cantidad FROM Voto WHERE es_observado = true`,
    );
    return rows[0];
  }

  async participacionPorCircuito() {
    const [rows] = await this.db.query(
      `SELECT
      c.id as id_circuito,
      c.localidad as nombre_circuito,
      c.serie_cc,
      c.inicio_num_cc,
      c.fin_num_cc,
      (c.fin_num_cc - c.inicio_num_cc + 1) as padron,
      COUNT(DISTINCT v.id) as votos_emitidos,
      ROUND(COUNT(DISTINCT v.id) / GREATEST((c.fin_num_cc - c.inicio_num_cc + 1), 1) * 100, 2) as porcentaje
    FROM Circuito c
    LEFT JOIN Voto v ON v.id_circuito = c.id AND v.estado != 'anulado'
    GROUP BY c.id, c.localidad, c.serie_cc, c.inicio_num_cc, c.fin_num_cc`,
    );
    return rows;
  }

  async distribucionVotosAccesibilidad() {
    const [rows] = await this.db.query(
      `SELECT
      c.es_accesible,
      COUNT(v.id) as votos
    FROM Circuito c
    LEFT JOIN Voto v ON v.id_circuito = c.id AND v.estado = 'valido'
    GROUP BY c.es_accesible`,
    );
    return rows;
  }

  async distribucionListasGlobal(id_eleccion: number) {
    const [totalRows] = await this.db.query(
      `SELECT COUNT(*) as total
       FROM Voto v
       JOIN Papeleta p ON v.id_papeleta = p.id
       WHERE p.id_eleccion = ? AND p.tipo = 'lista' AND v.estado = 'valido'`,
      [id_eleccion],
    );
    const total = totalRows[0]?.total || 1;

    const [rows] = await this.db.query(
      `SELECT
         pa.nombre as nombre_partido,
         l.numero as numero_lista,
         COUNT(*) as votos,
         ROUND(COUNT(*) / ? * 100, 2) as porcentaje
       FROM Voto v
       JOIN Papeleta p ON v.id_papeleta = p.id
       JOIN Lista l ON l.id_papeleta = p.id
       JOIN Partido pa ON l.id_partido = pa.id
       WHERE p.id_eleccion = ? AND p.tipo = 'lista' AND v.estado = 'valido'
       GROUP BY pa.nombre, l.numero
       ORDER BY votos DESC`,
      [total, id_eleccion],
    );
    return rows;
  }

  async distribucionPlebiscitoGlobal(id_eleccion: number) {
    const [totalRows] = await this.db.query(
      `SELECT COUNT(*) as total
       FROM Voto v
       JOIN Papeleta p ON v.id_papeleta = p.id
       WHERE p.id_eleccion = ? AND p.tipo = 'plebiscito' AND v.estado = 'valido'`,
      [id_eleccion],
    );
    const total = totalRows[0]?.total || 1;

    const [rows] = await this.db.query(
      `SELECT
         pl.valor,
         pl.descripcion,
         COUNT(*) as votos,
         ROUND(COUNT(*) / ? * 100, 2) as porcentaje
       FROM Voto v
       JOIN Papeleta p ON v.id_papeleta = p.id
       JOIN Plebiscito pl ON pl.id_plebiscito = p.id
       WHERE p.id_eleccion = ? AND p.tipo = 'plebiscito' AND v.estado = 'valido'
       GROUP BY pl.valor, pl.descripcion
       ORDER BY votos DESC`,
      [total, id_eleccion],
    );
    return rows;
  }

  async distribucionFormulaGlobal(id_eleccion: number) {
    const [totalRows] = await this.db.query(
      `SELECT COUNT(*) as total
       FROM Voto v
       JOIN Papeleta p ON v.id_papeleta = p.id
       WHERE p.id_eleccion = ? AND p.tipo = 'formula' AND v.estado = 'valido'`,
      [id_eleccion],
    );
    const total = totalRows[0]?.total || 1;

    const [rows] = await this.db.query(
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
       WHERE p.id_eleccion = ? AND p.tipo = 'formula' AND v.estado = 'valido'
       GROUP BY f.lema, cpres.nombres, cpres.apellidos, cvice.nombres, cvice.apellidos
       ORDER BY votos DESC`,
      [total, id_eleccion],
    );
    return rows;
  }

  async desgloseTipoVotoGlobal(id_eleccion: number) {
    const [rows] = await this.db.query(
      `SELECT v.estado, COUNT(*) as cantidad
       FROM Voto v
       LEFT JOIN Papeleta p ON v.id_papeleta = p.id
       WHERE (p.id_eleccion = ? OR v.id_papeleta IS NULL)
       GROUP BY v.estado`,
      [id_eleccion],
    );
    return rows;
  }

  async participacionFormulariosGlobal(id_eleccion: number) {
    const [rows] = await this.db.query(
      `SELECT p.tipo, COUNT(*) as cantidad
       FROM Voto v
       JOIN Papeleta p ON v.id_papeleta = p.id
       WHERE p.id_eleccion = ?
       GROUP BY p.tipo`,
      [id_eleccion],
    );
    return rows;
  }

  async resultadosPorPartidoGlobal(id_eleccion: number) {
    const [totalRows] = await this.db.query(
      `SELECT COUNT(*) as total
       FROM Voto v
       JOIN Papeleta p ON v.id_papeleta = p.id
       WHERE p.id_eleccion = ? AND p.tipo = 'lista' AND v.estado = 'valido'`,
      [id_eleccion],
    );
    const total = totalRows[0]?.total || 1;

    const [rows] = await this.db.query(
      `SELECT
         pa.id as id_partido,
         pa.nombre as nombre_partido,
         COUNT(*) as votos,
         ROUND(COUNT(*) / ? * 100, 2) as porcentaje
       FROM Voto v
       JOIN Papeleta p ON v.id_papeleta = p.id
       JOIN Lista l ON l.id_papeleta = p.id
       JOIN Partido pa ON l.id_partido = pa.id
       WHERE p.id_eleccion = ? AND p.tipo = 'lista' AND v.estado = 'valido'
       GROUP BY pa.id, pa.nombre
       ORDER BY votos DESC`,
      [total, id_eleccion],
    );
    return {
      total_votos_validos: total,
      resultados: rows,
    };
  }

  async resultadosPorCandidatoGlobal(id_eleccion: number) {
    const [totalRows] = await this.db.query(
      `SELECT COUNT(*) as total
     FROM Voto v
     JOIN Papeleta p ON v.id_papeleta = p.id
     WHERE p.id_eleccion = ? AND p.tipo = 'lista' AND v.estado = 'valido'`,
      [id_eleccion],
    );
    const total = totalRows[0]?.total || 1;

    const [rows] = await this.db.query(
      `SELECT
       l.ci_candidato as ci,
       ciu.nombres,
       ciu.apellidos,
       pa.nombre as nombre_partido,
       l.numero as numero_lista,
       COUNT(DISTINCT v.id) as votos,
       ROUND(COUNT(DISTINCT v.id) / ? * 100, 2) as porcentaje
     FROM Voto v
     JOIN Papeleta p ON v.id_papeleta = p.id
     JOIN Lista l ON l.id_papeleta = p.id
     JOIN Candidato c ON l.ci_candidato = c.ci_ciudadano
     JOIN Ciudadano ciu ON ciu.ci = c.ci_ciudadano
     JOIN Partido pa ON l.id_partido = pa.id
     WHERE p.id_eleccion = ? AND p.tipo = 'lista' AND v.estado = 'valido'
     GROUP BY l.ci_candidato, ciu.nombres, ciu.apellidos, pa.nombre, l.numero
     ORDER BY votos DESC`,
      [total, id_eleccion],
    );
    return {
      total_votos_validos: total,
      resultados: rows,
    };
  }

  async totalVotosEmitidosGlobal(id_eleccion: number) {
    const [rows] = await this.db.query(
      `SELECT COUNT(*) as total
     FROM Voto v
     JOIN Papeleta p ON v.id_papeleta = p.id
     WHERE p.id IS NOT NULL AND p.id_eleccion = ?`,
      [id_eleccion],
    );
    return { total: rows[0]?.total || 0 };
  }
}
