import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CircuitosService } from './circuitos.service';

@Controller('circuitos')
export class CircuitosController {
  constructor(private readonly circuitosService: CircuitosService) {}

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
  async obtenerResultados(
    @Param('id') id: string,
    @Query('id_eleccion', ParseIntPipe) id_eleccion: number,
  ) {
    return this.circuitosService.obtenerResultados(Number(id), id_eleccion);
  }

  @Get(':id/resultados-partido')
  async obtenerResultadosPorPartido(
    @Param('id') id: string,
    @Query('id_eleccion', ParseIntPipe) id_eleccion: number,
  ) {
    return this.circuitosService.obtenerResultadosPorPartido(
      Number(id),
      id_eleccion,
    );
  }

  @Get(':id/resultados-candidato')
  async obtenerResultadosPorCandidato(
    @Param('id') id: string,
    @Query('id_eleccion', ParseIntPipe) id_eleccion: number,
  ) {
    return this.circuitosService.obtenerResultadosPorCandidato(
      Number(id),
      id_eleccion,
    );
  }

  @Get('por-cc/:cc')
  async getPorCC(@Param('cc') cc: string) {
    return this.circuitosService.getCircuitoSegunCredencial(cc);
  }
}
