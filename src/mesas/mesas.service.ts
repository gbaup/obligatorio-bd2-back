import { Injectable, Inject } from '@nestjs/common';
import { Pool, ResultSetHeader } from 'mysql2/promise';
import { MesasRepository } from './mesas.repository';

@Injectable()
export class MesasService {
  constructor(
    @Inject('MYSQL_CONNECTION') private readonly db: Pool,
    private readonly mesasRepository: MesasRepository,
  ) {
  }

  async findAll() {
    return await this.mesasRepository.find();
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

  async abrirMesa(id: number) {
    return await this.mesasRepository.update(id, { abierto: true });
  }

  async cerrarMesa(id: number) {
    return await this.mesasRepository.update(id, { abierto: false });
  }
}
