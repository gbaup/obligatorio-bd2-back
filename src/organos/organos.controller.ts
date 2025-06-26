import { Controller, Get } from '@nestjs/common';
import { OrganosService } from './organos.service';

@Controller('organos')
export class OrganosController {
  constructor(private readonly organosService: OrganosService) {}

  @Get()
  async getAll() {
    return this.organosService.findAll();
  }
}