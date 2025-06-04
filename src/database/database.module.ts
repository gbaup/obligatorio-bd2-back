import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import mysql from 'mysql2/promise';

@Global()
@Module({
  providers: [
    {
      provide: 'MYSQL_CONNECTION',
      useFactory: () => {
        return mysql.createPool({
          host: process.env.DB_HOST || 'localhost',
          port: 3306,
          user: process.env.DB_USER || 'admin',
          password: process.env.DB_PASSWORD || 'admin',
          database: process.env.DB_NAME || 'db2-db',
          waitForConnections: true,
          connectionLimit: 10,
        });
      },
    },
    DatabaseService,
  ],
  exports: ['MYSQL_CONNECTION'],
})
export class DatabaseModule {}
