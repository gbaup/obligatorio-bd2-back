import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CiudadanosModule } from './ciudadanos/ciudadanos.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, CiudadanosModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
