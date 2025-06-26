import { Controller, Get } from '@nestjs/common';
import { PartidosService } from './partidos.service';

@Controller('partidos')
export class PartidosController {
  constructor(private readonly partidosService: PartidosService) {}

  @Get()
  async getAll() {
    return this.partidosService.findAll();
  }
}