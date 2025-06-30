import { Module } from '@nestjs/common';
import { CiudadanosService } from './ciudadanos.service';
import { CiudadanosController } from './ciudadanos.controller';
import { CiudadanosRepository } from './repositories/ciudadanos.repository';
import { CandidatosRepository } from './repositories/candidatos.repository';
import { MiembrosMesaRepository } from './repositories/miembros-mesa.repository';
import { CircuitosService } from '../circuitos/circuitos.service';
import { CircuitosRepository } from '../circuitos/circuitos.repository';

@Module({
  controllers: [CiudadanosController],
  providers: [
    CiudadanosService,
    CircuitosService,
    CircuitosRepository,
    CiudadanosRepository,
    CandidatosRepository,
    MiembrosMesaRepository,
  ],
  exports: [CiudadanosService],
})
export class CiudadanosModule {}
