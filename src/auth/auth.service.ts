import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CiudadanosRepository } from '../ciudadanos/repositories/ciudadanos.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly ciudadanosRepository: CiudadanosRepository) {}

  async signIn(ci: number, password: string) {
    const ciudadano = await this.ciudadanosRepository.findOne({
      where: { ci: ci },
    });

    if (!ciudadano || !ciudadano.password) {
      throw new UnauthorizedException(
        'Ciudadano no registrado como administrador',
      );
    }

    const esValida = await bcrypt.compare(password, ciudadano.password);

    if (!esValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return ciudadano;
  }
}
