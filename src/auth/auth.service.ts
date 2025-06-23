import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CiudadanosRepository } from '../ciudadanos/repositories/ciudadanos.repository';

@Injectable()
export class AuthService {
  constructor(private readonly ciudadanosRepository: CiudadanosRepository) {}

  async signIn(username: string): Promise<any> {
    const ci = Number(username);
    if (isNaN(ci)) {
      throw new UnauthorizedException('CI inválida');
    }
    const ciudadano = await this.ciudadanosRepository.findById(ci);
    if (!ciudadano) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return {
      ...ciudadano,
      rol: 'CIUDADANO',
    };
  }
}