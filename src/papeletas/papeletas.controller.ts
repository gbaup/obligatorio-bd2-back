import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { PapeletasService } from './papeletas.service';

@Controller('papeletas')
export class PapeletasController {
  constructor(private readonly papeletasService: PapeletasService) {}

  @Get('validas')
  async getPapeletasValidas(@Query('id_eleccion') idEleccion: number) {
    return this.papeletasService.getPapeletasValidas(idEleccion);
  }

  @Get(':id')
  async getPapeletaPorId(@Param('id') id: string) {
    return this.papeletasService.getPapeletaPorId(Number(id));
  }

  @Get('/circuitos-por-localidad')
  async getCircuitosPorLocalidad(@Query('localidad') localidad: string) {
    return this.papeletasService.getCircuitosPorLocalidad(localidad);
  }

  @Get('lista/:id')
  async getLista(@Param('id') id: string) {
    return this.papeletasService.getListaPorPapeleta(Number(id));
  }

  @Get('plebiscito/:id')
  async getPlebiscito(@Param('id') id: string) {
    return this.papeletasService.getPlebiscitoPorPapeleta(Number(id));
  }

  @Get('formula/:id')
  async getFormula(@Param('id') id: string) {
    return this.papeletasService.getFormulaPorPapeleta(Number(id));
  }

  @Post()
  async crearPapeleta(@Body() body: any) {
    return this.papeletasService.crearPapeleta(body);
  }

  @Patch(':id')
  async editarPapeleta(@Param('id') id: string, @Body() body: any) {
    return this.papeletasService.editarPapeleta(Number(id), body);
  }

  @Delete(':id')
  async borrarPapeleta(@Param('id') id: string) {
    return this.papeletasService.borrarPapeleta(Number(id));
  }
}
