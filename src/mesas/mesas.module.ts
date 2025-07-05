import { Module } from '@nestjs/common';
import { MesasController } from './mesas.controller';
import { MesasService } from './mesas.service';
import { MesasRepository } from './mesas.repository';

@Module({
  controllers: [MesasController],
  providers: [MesasService, MesasRepository],
})
export class MesasModule {
}
