import { Injectable } from '@nestjs/common';
import { CircuitosRepository } from './circuitos.repository';

@Injectable()
export class CircuitosService {
  constructor(private readonly circuitosRepository: CircuitosRepository) {}

  async getAll() {
    return this.circuitosRepository.find();
  }

  async getCircuitoSegunCredencial(cc: string) {
    const serie = cc.slice(0, 3);
    const num = cc.slice(3);

    const circuito = await this.circuitosRepository.findOne({
      where: {
        serie_cc: serie,
        inicio_num_cc: parseInt(num),
      },
    });

    if (!circuito) {
      throw new Error('Circuito no encontrado');
    }

    return circuito;
  }
}
