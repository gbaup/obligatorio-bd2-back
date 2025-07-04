import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CiudadanosModule } from '../ciudadanos/ciudadanos.module';

@Module({
  imports: [CiudadanosModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}