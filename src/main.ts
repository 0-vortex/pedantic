import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { fastifyHelmet } from 'fastify-helmet';
import fastifyRateLimit from 'fastify-rate-limit';
import { AppModule } from './app.module';

export const SWAGGER_API_ROOT = 'docs';
export const SWAGGER_API_NAME = 'Pedantic';
export const SWAGGER_API_DESCRIPTION = 'Personal GitHub intelligence crawler';
export const SWAGGER_API_CURRENT_VERSION = '1.0';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );
  const configService = app.get(ConfigService);
  app.useLogger(app.get(Logger));

  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string,
    ) => methodKey,
  });
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document, customOptions);
  app.enableCors();
  app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });
  app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<number>('api.port'), configService.get<string>('api.host'));
})();
