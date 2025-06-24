import { Body, Controller, Post } from '@nestjs/common';
import { VotosService } from './votos.service';

@Controller('votos')
export class VotosController {
  constructor(private readonly votosService: VotosService) {}

  @Post()
    async emitirVoto(@Body() body: any) {
    return this.votosService.emitirVoto(body);
  }
}