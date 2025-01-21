import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService extends PrismaClient and manages the database connection lifecycle.
 * Implements OnModuleInit and OnModuleDestroy for integration with NestJS lifecycle hooks.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name, { timestamp: true });

  constructor() {
    super();
  }

  /**
   * Lifecycle hook that is called when the module is initialized.
   * Establishes the database connection.
   * @throws Error if the database connection fails.
   */
  async onModuleInit() {
    try {
      this.logger.log('Connecting to the database...');
      await this.$connect();
      this.logger.log('Database connection established.');
    } catch (error) {
      this.logger.error('Failed to connect to the database:', error.stack);
      throw error;
    }
  }

  /**
   * Lifecycle hook that is called when the module is destroyed.
   * Ensures the database connection is properly closed.
   */
  async onModuleDestroy() {
    this.logger.warn('Disconnecting from the database...');
    await this.$disconnect();
    this.logger.warn('Database connection closed.');
  }
}
