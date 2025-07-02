import { Controller, Get } from '@nestjs/common';
import { ZonasService } from './zonas.service';

@Controller('zonas')
export class ZonasController {
  constructor(private readonly zonasService: ZonasService) {}

  @Get()
  async getAll() {
    return this.zonasService.getAll();
  }
}
