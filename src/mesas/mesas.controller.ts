import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { MesasService } from './mesas.service';

@Controller('mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {
  }

  @Get()
  async getAll() {
    return this.mesasService.findAll();
  }

  @Post()
  async create(@Body() body: { id_circuito: number }) {
    return this.mesasService.create(Number(body.id_circuito));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.mesasService.delete(Number(id));
  }

  @Patch(':id/abrir')
  async abrirMesa(@Param('id') id: string) {
    return this.mesasService.abrirMesa(Number(id));
  }

  @Patch(':id/cerrar')
  async cerrarMesa(@Param('id') id: string) {
    return this.mesasService.cerrarMesa(Number(id));
  }
}
