import { Module } from '@nestjs/common';
import { CiudadanosService } from './ciudadanos.service';
import { CiudadanosController } from './ciudadanos.controller';
import { CiudadanosRepository } from './ciudadanos.repository';

@Module({
  controllers: [CiudadanosController],
  providers: [CiudadanosService, CiudadanosRepository],
})
export class CiudadanosModule {}
