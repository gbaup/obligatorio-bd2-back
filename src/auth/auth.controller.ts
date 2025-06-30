import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './interfaces/signin.dto';
import { CiudadanoDto } from '../ciudadanos/dto/ciudadano.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post('register')
  async register(@Body() body: CiudadanoDto) {
    return this.authService.signUp(body);
  }
}
