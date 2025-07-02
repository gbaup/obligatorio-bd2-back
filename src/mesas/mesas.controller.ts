import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { MesasService } from './mesas.service';

@Controller('mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

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
}
