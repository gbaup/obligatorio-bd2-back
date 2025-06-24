import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CiudadanosModule } from './ciudadanos/ciudadanos.module';
import { DatabaseModule } from './database/database.module';
import { PapeletasModule } from './papeletas/papeletas.module';

@Module({
  imports: [AuthModule, CiudadanosModule, DatabaseModule, PapeletasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}