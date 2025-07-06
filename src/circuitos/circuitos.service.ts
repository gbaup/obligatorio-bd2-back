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

  async obtenerResultados(id_circuito: number, id_eleccion: number) {
    return this.circuitosRepository.obtenerResultadosCircuito(
      id_circuito,
      id_eleccion,
    );
  }

  async obtenerResultadosPorPartido(id_circuito: number, id_eleccion: number) {
    return this.circuitosRepository.obtenerResultadosPorPartido(
      id_circuito,
      id_eleccion,
    );
  }

  async obtenerResultadosPorCandidato(
    id_circuito: number,
    id_eleccion: number,
  ) {
    return this.circuitosRepository.obtenerResultadosPorCandidato(
      id_circuito,
      id_eleccion,
    );
  }
}
