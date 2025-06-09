import { Body, Controller, Get, Post } from '@nestjs/common';
import { CiudadanosService } from './ciudadanos.service';
import { CiudadanoDto } from './dto/ciudadano.dto';
import { CandidatoDto } from './dto/candidato.dto';

@Controller('ciudadanos')
export class CiudadanosController {
  constructor(private readonly ciudadanosService: CiudadanosService) {}

  @Get()
  async getAllCiudadanos() {
    return this.ciudadanosService.getAll();
  }

  @Post()
  async createCiudadano(@Body() dataCiudadano: CiudadanoDto) {
    return this.ciudadanosService.create(dataCiudadano);
  }

  @Post('candidato')
  async createCandidato(@Body() ci: CandidatoDto) {
    return this.ciudadanosService.createCandidato(ci);
  }
}
