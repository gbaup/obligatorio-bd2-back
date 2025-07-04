import { Module } from '@nestjs/common';
import { VotosController } from './votos.controller';
import { VotosService } from './votos.service';
import { VotosRepository } from './votos.repository';

@Module({
  controllers: [VotosController],
  providers: [VotosService, VotosRepository],
  exports: [VotosService],
})
export class VotosModule {
}