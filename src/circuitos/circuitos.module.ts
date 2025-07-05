import { Module } from '@nestjs/common';
import { CircuitosService } from './circuitos.service';
import { CircuitosController } from './circuitos.controller';
import { CircuitosRepository } from './circuitos.repository';
import { VotosModule } from '../votos/votos.module';

@Module({
  controllers: [CircuitosController],
  providers: [CircuitosService, CircuitosRepository],
  imports: [VotosModule],
  exports: [CircuitosService],
})
export class CircuitosModule {
}
