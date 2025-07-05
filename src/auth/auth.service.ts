import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './interfaces/signin.dto';
import { CiudadanoDto } from '../ciudadanos/dto/ciudadano.dto';
import { CiudadanosService } from '../ciudadanos/ciudadanos.service';

@Injectable()
export class AuthService {
  constructor(private readonly ciudadanosService: CiudadanosService) {}

  async signIn(body: SignInDto) {
    const { ci, password } = body;

    const ciudadano = await this.ciudadanosService.getCiudadanoPorCi(ci);

    if (!ciudadano) {
      throw new UnauthorizedException('Ciudadano no registrado');
    }

    const esValida = await bcrypt.compare(password, ciudadano.contrasena);

    if (!esValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const { contrasena, ...ciudadanoSinContrasena } = ciudadano;

    return ciudadanoSinContrasena;
  }

  async signUp(ciudadano: CiudadanoDto) {
    ciudadano.contrasena = await bcrypt.hash(ciudadano.contrasena, 10);
    return this.ciudadanosService.create(ciudadano);
  }
}
