import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@Inject('MYSQL_CONNECTION') private readonly db: Pool) {}

  private readonly logger = new Logger(DatabaseService.name);

  async onModuleInit() {
    const maxRetries = 10;
    const delayMs = 3000;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const conn = await this.db.getConnection();
        await conn.ping();
        conn.release();

        this.logger.log(
          'Conexión a la base de datos verificada correctamente ✅',
        );
        return;
      } catch (error) {
        attempt++;
        this.logger.warn(
          `Intento ${attempt}/${maxRetries} de conexión fallido. Reintentando en ${delayMs / 1000}s...`,
        );
        await new Promise((res) => setTimeout(res, delayMs));
      }
    }

    this.logger.error(
      'No se pudo establecer conexión con la base de datos después de varios intentos ❌',
    );
    process.exit(1);
  }
}
