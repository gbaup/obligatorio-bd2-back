import { Controller, Get } from '@nestjs/common';
import { MesasService } from './mesas.service';

@Controller('mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  @Get()
  async getAll() {
    return this.mesasService.findAll();
  }
}
