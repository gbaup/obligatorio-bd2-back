import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CircuitosService } from './circuitos.service';

@Controller('circuitos')
export class CircuitosController {
  constructor(private readonly circuitosService: CircuitosService) {
  }

  @Get()
  async getAll() {
    return this.circuitosService.getAll();
  }

  @Post()
  async create(@Body() body: any) {
    return this.circuitosService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.circuitosService.update(Number(id), body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.circuitosService.delete(Number(id));
  }

  @Get(':id/resultados')
  async obtenerResultados(@Param('id') id: string) {
    return this.circuitosService.obtenerResultados(Number(id));
  }
}
