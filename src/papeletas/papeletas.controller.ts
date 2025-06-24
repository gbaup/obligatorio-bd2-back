import { Controller, Get, Query } from '@nestjs/common';
import { PapeletasService } from './papeletas.service';

@Controller('papeletas')
export class PapeletasController {
  constructor(private readonly papeletasService: PapeletasService) {}

  @Get('validas')
  async getPapeletasValidas(@Query('id_eleccion') idEleccion: number) {
    return this.papeletasService.getPapeletasValidas(idEleccion);
  }

  @Get('/circuitos-por-localidad')
  async getCircuitosPorLocalidad(@Query('localidad') localidad: string) {
    return this.papeletasService.getCircuitosPorLocalidad(localidad);
  }

  @Get('lista/:id')
  async getLista(@Query('id') id: number) {
    return this.papeletasService.getListaPorPapeleta(id);
  }

  @Get('plebiscito/:id')
  async getPlebiscito(@Query('id') id: number) {
    return this.papeletasService.getPlebiscitoPorPapeleta(id);
  }

  @Get('formula/:id')
  async getFormula(@Query('id') id: number) {
    return this.papeletasService.getFormulaPorPapeleta(id);
  }
}