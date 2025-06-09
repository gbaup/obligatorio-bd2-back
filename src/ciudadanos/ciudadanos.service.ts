import { Injectable } from '@nestjs/common';
import { CiudadanosRepository } from './repositories/ciudadanos.repository';
import { CiudadanoDto } from './dto/ciudadano.dto';
import { CandidatosRepository } from './repositories/candidatos.repository';
import { CandidatoDto } from './dto/candidato.dto';

@Injectable()
export class CiudadanosService {
  constructor(
    private readonly ciudadanosRepository: CiudadanosRepository,
    private readonly candidatosRepository: CandidatosRepository,
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
}
