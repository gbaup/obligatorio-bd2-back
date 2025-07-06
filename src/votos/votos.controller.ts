import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { VotosService } from './votos.service';

@Controller('votos')
export class VotosController {
  constructor(private readonly votosService: VotosService) {}

  @Post()
  async emitirVoto(@Body() body: any) {
    return this.votosService.emitirVoto(body);
  }

  @Patch(':id/aprobar')
  async aprobarVoto(@Param('id') id: string) {
    return this.votosService.aprobarVoto(Number(id));
  }

  @Delete(':id')
  async eliminarVoto(@Param('id') id: string) {
    return this.votosService.eliminarVoto(Number(id));
  }

  @Get('por-circuito')
  async obtenerVotosPorCircuito(
    @Query('circuito', ParseIntPipe) id_circuito: number,
  ) {
    return this.votosService.obtenerVotodsPorCircuito(id_circuito);
  }

  @Get('observados')
  async obtenerVotosObservadosPorCircuito(
    @Query('circuito', ParseIntPipe) id_circuito: number,
  ) {
    return this.votosService.obtenerVotosObservados(id_circuito);
  }

  @Get('observados-total')
  async cantidadVotosObservados() {
    return this.votosService.cantidadVotosObservados();
  }

  @Get('participacion-circuito')
  async participacionPorCircuito() {
    return this.votosService.participacionPorCircuito();
  }

  @Get('votos-accesibilidad')
  async distribucionVotosAccesibilidad() {
    return this.votosService.distribucionVotosAccesibilidad();
  }

  @Get('por-partido')
  async obtenerVotosPorPartido(
    @Query('partido', ParseIntPipe) id_partido: number,
  ) {
    return this.votosService.obtenerVotosPorPartido(id_partido);
  }

  @Get('resultados-departamento')
  async resultadosPorDepartamento(
    @Query('departamento') departamento: string,
    @Query('id_eleccion', ParseIntPipe) id_eleccion: number,
  ) {
    return this.votosService.resultadosPorDepartamento(
      departamento,
      id_eleccion,
    );
  }

  @Get('global/distribucion-listas')
  async distribucionListasGlobal(
    @Query('id_eleccion', ParseIntPipe) id_eleccion: number,
  ) {
    return this.votosService.distribucionListasGlobal(id_eleccion);
  }

  @Get('global/distribucion-plebiscito')
  async distribucionPlebiscitoGlobal(
    @Query('id_eleccion', ParseIntPipe) id_eleccion: number,
  ) {
    return this.votosService.distribucionPlebiscitoGlobal(id_eleccion);
  }

  @Get('global/distribucion-formula')
  async distribucionFormulaGlobal(
    @Query('id_eleccion', ParseIntPipe) id_eleccion: number,
  ) {
    return this.votosService.distribucionFormulaGlobal(id_eleccion);
  }

  @Get('global/desglose-tipo-voto')
  async desgloseTipoVotoGlobal(
    @Query('id_eleccion', ParseIntPipe) id_eleccion: number,
  ) {
    return this.votosService.desgloseTipoVotoGlobal(id_eleccion);
  }

  @Get('global/participacion-formularios')
  async participacionFormulariosGlobal(
    @Query('id_eleccion', ParseIntPipe) id_eleccion: number,
  ) {
    return this.votosService.participacionFormulariosGlobal(id_eleccion);
  }

  @Get('global/resultados-partido')
  async resultadosPorPartidoGlobal(
    @Query('id_eleccion', ParseIntPipe) id_eleccion: number,
  ) {
    return this.votosService.resultadosPorPartidoGlobal(id_eleccion);
  }

  @Get('global/resultados-candidato')
  async resultadosPorCandidatoGlobal(
    @Query('id_eleccion', ParseIntPipe) id_eleccion: number,
  ) {
    return this.votosService.resultadosPorCandidatoGlobal(id_eleccion);
  }
}
