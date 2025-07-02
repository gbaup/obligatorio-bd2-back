import { Injectable, Inject } from '@nestjs/common';
import { Pool, ResultSetHeader } from 'mysql2/promise';

@Injectable()
export class MesasService {
  constructor(@Inject('MYSQL_CONNECTION') private readonly db: Pool) {}

  async findAll() {
    const [rows] = await this.db.query('SELECT * FROM Mesa');
    return rows;
  }

  async create(id_circuito: number) {
    const [result] = await this.db.query<ResultSetHeader>(
      'INSERT INTO Mesa (id_circuito, abierto) VALUES (?, FALSE)',
      [id_circuito],
    );
    return { id: result.insertId, id_circuito, abierto: false };
  }

  async delete(id: number) {
    await this.db.query('DELETE FROM MiembroMesa WHERE mesa_asignada = ?', [
      id,
    ]);
    await this.db.query('DELETE FROM Mesa WHERE id = ?', [id]);
    return { ok: true };
  }
}
