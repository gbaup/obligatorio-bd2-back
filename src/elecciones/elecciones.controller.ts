import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { EleccionesService } from './elecciones.service';

@Controller('elecciones')
export class EleccionesController {
  constructor(private readonly eleccionesService: EleccionesService) {}

  @Get()
  async findAll() {
    return this.eleccionesService.findAll();
  }

  @Post()
  async create(@Body() body: { fecha: string; tipo: string }) {
    return this.eleccionesService.create(body);
  }

  @Get('en-curso')
  async getEleccionEnCurso() {
    return this.eleccionesService.getEleccionEnCurso();
  }

  @Patch(':id/fecha')
  async actualizarFecha(@Param('id') id: string, @Body() body: { fecha: string }) {
    return this.eleccionesService.actualizarFecha(Number(id), body.fecha);
  }

}