import { Controller, Get } from '@nestjs/common';
import { CircuitosService } from './circuitos.service';

@Controller('circuitos')
export class CircuitosController {
  constructor(private readonly circuitosService: CircuitosService) {}

  @Get()
  async getAll() {
    return this.circuitosService.getAll();
  }
}