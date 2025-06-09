import { Injectable } from '@nestjs/common';
import { CiudadanosRepository } from './ciudadanos.repository';
import { CiudadanoDto } from './interfaces/ciudadano.dto';

@Injectable()
export class CiudadanosService {
  constructor(private readonly ciudadanosRepository: CiudadanosRepository) {}

  async create(dataCiudadano: CiudadanoDto) {
    return this.ciudadanosRepository.create(dataCiudadano);
  }

  async getAll() {
    return this.ciudadanosRepository.findAll();
  }
}
