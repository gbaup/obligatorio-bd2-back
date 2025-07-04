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

  @Get('por-circuito')
  async obtenerVotosPorCircuito(@Query('circuito', ParseIntPipe) id_circuito: number,
  ) {
    return this.votosService.obtenerVotodsPorCircuito(id_circuito);
  }

  @Get('observados')
  async obtenerVotosObservadosPorCircuito(@Query('circuito', ParseIntPipe) id_circuito: number,
  ) {
    return this.votosService.obtenerVotosObservados(id_circuito);
  }

  @Get('por-partido')
  async obtenerVotosPorPartido(@Query('partido', ParseIntPipe) id_partido: number,
  ) {
    return this.votosService.obtenerVotosPorPartido(id_partido);
  }
}