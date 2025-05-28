import { Controller } from '@nestjs/common';
import { CiudadanosService } from './ciudadanos.service';

@Controller('ciudadanos')
export class CiudadanosController {
  constructor(private readonly ciudadanosService: CiudadanosService) {}
}
