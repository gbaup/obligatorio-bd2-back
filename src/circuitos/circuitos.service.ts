import { Injectable } from '@nestjs/common';
import { CircuitosRepository } from './circuitos.repository';

@Injectable()
export class CircuitosService {
  constructor(private readonly circuitosRepository: CircuitosRepository) {}

  async getAll() {
    return this.circuitosRepository.find();
  }

  async create(circuito: any) {
    return this.circuitosRepository.create(circuito);
  }

  async update(id: number, circuito: any) {
    return this.circuitosRepository.update(id, circuito);
  }

  async delete(id: number) {
    return this.circuitosRepository.delete(id);
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
