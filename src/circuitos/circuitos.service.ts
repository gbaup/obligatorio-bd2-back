import { Injectable } from '@nestjs/common';
import { CircuitosRepository } from './circuitos.repository';
import { VotosService } from '../votos/votos.service';

@Injectable()
export class CircuitosService {
  constructor(
    private readonly circuitosRepository: CircuitosRepository,
    private readonly votosService: VotosService,
  ) {}

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
    return this.circuitosRepository.findByCredencial(cc);
  }

  async obtenerResultados(id_circuito: number) {
    const circuito = await this.circuitosRepository.findById(id_circuito);

    if (!circuito) {
      throw new Error('Circuito no encontrado');
    }

    const totalVotosDelCircuito =
      await this.votosService.obtenerVotodsPorCircuito(id_circuito);

    // Aca tenes TODOS los votos del circuito. Faltaría agregar la lógica de que queres que devuelva este endpoint, si la suma por partidos o que
    // Estoy viendo que la tabla Voto no tiene relación con Lista. Te lo dejo en bandeja pa q lo liquides
  }
}
