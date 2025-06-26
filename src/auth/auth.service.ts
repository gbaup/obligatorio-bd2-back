import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CiudadanosRepository } from '../ciudadanos/repositories/ciudadanos.repository';

@Injectable()
export class AuthService {
  constructor(private readonly ciudadanosRepository: CiudadanosRepository) {}

  async signIn(username: string, cc: string): Promise<any> {
    const ci = Number(username);
    if (isNaN(ci)) {
      throw new UnauthorizedException('CI inválida');
    }

    // admin hardcodeado para no cambiar la bd
    if (ci === 55797403) {
      if (cc !== 'admin') {
        throw new UnauthorizedException('CC inválida para admin');
      }
      return {
        ci,
        nombres: 'Administrador',
        apellidos: '',
        rol: 'ADMIN',
      };
    }

    const ccPattern = /^[A-Z]{3}\d{6}$/i;
    if (!ccPattern.test(cc.trim())) {
      throw new UnauthorizedException('Formato de CC inválido');
    }

    const ciudadano = await this.ciudadanosRepository.findById(ci);
    if (!ciudadano) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    if (ciudadano.cc.trim().toUpperCase() !== cc.trim().toUpperCase()) {
      throw new UnauthorizedException('CI o CC inválida');
    }
    const serie = ciudadano.cc.substring(0, 3);
    const num = Number(ciudadano.cc.substring(3));
    const circuito = await this.ciudadanosRepository.findCircuitoAsignado(serie, num);
    return {
      ...ciudadano,
      rol: 'CIUDADANO',
      circuitoAsignado: circuito,
    };
  }

}