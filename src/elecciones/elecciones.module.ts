import { Module } from '@nestjs/common';
import { EleccionesService } from './elecciones.service';
import { EleccionesController } from './elecciones.controller';

@Module({
  controllers: [EleccionesController],
  providers: [EleccionesService],
})
export class EleccionesModule {}