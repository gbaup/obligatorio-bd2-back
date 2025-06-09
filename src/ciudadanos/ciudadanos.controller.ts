import { Body, Controller, Get, Post } from '@nestjs/common';
import { CiudadanosService } from './ciudadanos.service';
import { CiudadanoDto } from './interfaces/ciudadano.dto';

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
}
