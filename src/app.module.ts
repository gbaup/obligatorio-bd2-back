import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CiudadanosModule } from './ciudadanos/ciudadanos.module';
import mysql from 'mysql2/promise';

@Module({
  imports: [AuthModule, CiudadanosModule],
  controllers: [],
  providers: [
    {
      provide: 'MYSQL_CONNECTION',
      useFactory: () => {
        return mysql.createPool({
          host: process.env.DB_HOST || 'localhost',
          user: process.env.DB_USER || 'root',
          password: process.env.DB_PASSWORD || 'admin',
          database: process.env.DB_NAME || 'mi_basededatos',
          waitForConnections: true,
          connectionLimit: 10,
        });
      },
    },
  ],
})
export class AppModule {}
