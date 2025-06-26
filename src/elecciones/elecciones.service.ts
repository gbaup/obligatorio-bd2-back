import { Injectable, Inject } from '@nestjs/common';
import { Pool, ResultSetHeader } from 'mysql2/promise';

@Injectable()
export class EleccionesService {
  constructor(@Inject('MYSQL_CONNECTION') private readonly db: Pool) {}

  async findAll() {
    const [rows] = await this.db.query('SELECT * FROM Eleccion');
    return rows;
  }

  async create({ fecha, tipo }) {
    const [result] = await this.db.query<ResultSetHeader>(
      'INSERT INTO Eleccion (fecha, tipo) VALUES (?, ?)',
      [fecha, tipo]
    );
    return { id: result.insertId, fecha, tipo };
  }

  async actualizarFecha(id: number, fecha: string) {
    await this.db.query(
      'UPDATE Eleccion SET fecha = ? WHERE id = ?',
      [fecha, id]
    );
    return { id, fecha };
  }

  async getEleccionEnCurso() {
    const [rows] = await this.db.query('SELECT * FROM Eleccion WHERE fecha = CURDATE() LIMIT 1');
    return rows[0] || null;
  }
}