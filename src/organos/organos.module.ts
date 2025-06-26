import { Module } from '@nestjs/common';
import { OrganosController } from './organos.controller';
import { OrganosService } from './organos.service';

@Module({
  controllers: [OrganosController],
  providers: [OrganosService],
})
export class OrganosModule {}