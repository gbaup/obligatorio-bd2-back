import { Module } from '@nestjs/common';
import { CiudadanosService } from './ciudadanos.service';
import { CiudadanosController } from './ciudadanos.controller';
import { CiudadanosRepository } from './repositories/ciudadanos.repository';
import { CandidatosRepository } from './repositories/candidatos.repository';
import { MiembrosMesaRepository } from './repositories/miembros-mesa.repository';
import { CircuitosModule } from '../circuitos/circuitos.module';
import { VotosModule } from '../votos/votos.module';

@Module({
  controllers: [CiudadanosController],
  providers: [
    CiudadanosService,
    CiudadanosRepository,
    CandidatosRepository,
    MiembrosMesaRepository,
  ],
  imports: [
    CircuitosModule,
    VotosModule,
  ],
  exports: [CiudadanosService],
})
export class CiudadanosModule {
}