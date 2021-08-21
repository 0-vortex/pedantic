import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { Connection } from 'typeorm';

import { DatabaseModule } from './database/database.module';
import { StatusController } from './status/status.controller';
import apiConfig from './config/api.config';
import validationSchema from './config/environment.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        prettyPrint: process.env.NODE_ENV !== 'production' ? {
          colorize: true,
          levelFirst: true,
          translateTime: 'UTC:yyyy/mm/dd, hh:MM:ss Z',
        } : {},
      },
    }),
    ConfigModule.forRoot({
      load: [apiConfig],
      isGlobal: true,
      validationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    DatabaseModule,
  ],
  controllers: [StatusController],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
