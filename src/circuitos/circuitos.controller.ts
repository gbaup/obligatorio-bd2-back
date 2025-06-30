import { Controller } from '@nestjs/common';
import { CircuitosService } from './circuitos.service';

@Controller('circuitos')
export class CircuitosController {
  constructor(private readonly circuitosService: CircuitosService) {}
}
