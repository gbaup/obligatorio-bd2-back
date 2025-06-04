import { Injectable } from '@nestjs/common';
import { CiudadanosRepository } from './ciudadanos.repository';

@Injectable()
export class CiudadanosService {
  constructor(private readonly ciudadanosRepository: CiudadanosRepository) {}

  async getAllCiudadanos() {
    return this.ciudadanosRepository.findAll();
  }
}
