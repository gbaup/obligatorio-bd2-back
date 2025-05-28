import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CiudadanosModule } from './ciudadanos/ciudadanos.module';

@Module({
  imports: [AuthModule, CiudadanosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
