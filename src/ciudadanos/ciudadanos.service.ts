import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CiudadanosRepository } from './repositories/ciudadanos.repository';
import { CiudadanoDto } from './dto/ciudadano.dto';
import { CandidatosRepository } from './repositories/candidatos.repository';
import { CandidatoDto } from './dto/candidato.dto';
import { MiembroMesaDto } from './dto/miembro-mesa.dto';
import { MiembrosMesaRepository } from './repositories/miembros-mesa.repository';
import { Pool } from 'mysql2/promise';

@Injectable()
export class CiudadanosService {
  constructor(
    private readonly ciudadanosRepository: CiudadanosRepository,
    private readonly candidatosRepository: CandidatosRepository,
    private readonly miembrosMesaRepository: MiembrosMesaRepository,
    @Inject('MYSQL_CONNECTION') private readonly db: Pool,
  ) {}

  async create(dataCiudadano: CiudadanoDto) {
    return this.ciudadanosRepository.create(dataCiudadano);
  }

  async getAll() {
    return this.ciudadanosRepository.findAll();
  }

  async createCandidato(ci_ciudadano: CandidatoDto) {
    return this.candidatosRepository.create(ci_ciudadano);
  }

  async createMiembroMesa(miembroMesa: MiembroMesaDto) {
    return this.miembrosMesaRepository.create(miembroMesa);
  }

  async getAllCandidatos() {
    return this.candidatosRepository.findAllWithNombres();
  }
  async getCiudadanoPorCi(ci: number) {
    const ciudadano = await this.ciudadanosRepository.findById(ci);
    if (!ciudadano) throw new NotFoundException('Ciudadano no encontrado');
    return ciudadano;
  }

  async habilitarCiudadano(ci: number, ha_votado: boolean) {
    await this.db.query('UPDATE Ciudadano SET ha_votado = ? WHERE ci = ?', [
      ha_votado,
      ci,
    ]);
    return { ok: true };
  }

  async habilitarTodos(ha_votado: boolean) {
    await this.db.query('UPDATE Ciudadano SET ha_votado = ?', [ha_votado]);
    return { ok: true };
  }

  async destituirMiembroMesa(ci: number) {
    await this.db.query(`DELETE FROM MiembroMesa WHERE ci_ciudadano = ?`, [ci]);
    return { ok: true };
  }

  async getMiembrosMesa() {
    const [rows] = await this.db.query(
      `SELECT mm.ci_ciudadano, mm.rol, mm.organismo, mm.mesa_asignada, c.nombres, c.apellidos
     FROM MiembroMesa mm
     JOIN Ciudadano c ON mm.ci_ciudadano = c.ci`,
    );
    return rows;
  }
}
