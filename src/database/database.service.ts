import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@Inject('MYSQL_CONNECTION') private readonly db: Pool) {}

  private readonly logger = new Logger(DatabaseService.name);

  async onModuleInit() {
    try {
      const conn = await this.db.getConnection();
      await conn.ping();
      conn.release();
      this.logger.log(
        'Conexión a la base de datos verificada correctamente ✅',
      );
    } catch (error) {
      this.logger.error('Error al conectar a la base de datos ❌', error);
      process.exit(1);
    }
  }
}
