import { Module } from '@nestjs/common';
import { CiudadanosService } from './ciudadanos.service';
import { CiudadanosController } from './ciudadanos.controller';
import { CiudadanosRepository } from './repositories/ciudadanos.repository';
import { CandidatosRepository } from './repositories/candidatos.repository';

@Module({
  controllers: [CiudadanosController],
  providers: [CiudadanosService, CiudadanosRepository, CandidatosRepository],
})
export class CiudadanosModule {}
