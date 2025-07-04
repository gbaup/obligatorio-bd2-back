import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { VotosService } from './votos.service';

@Controller('votos')
export class VotosController {
  constructor(private readonly votosService: VotosService) {
  }

  @Post()
  async emitirVoto(@Body() body: any) {
    return this.votosService.emitirVoto(body);
  }

  @Get()
  async obtenerVotosObservadosPorCircuito(@Query('circuito', ParseIntPipe) id_circuito: number,
  ) {
    return this.votosService.obtenerVotosObservados(id_circuito);
  }
}