import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import * as winston from 'winston';
import { AppModule } from './app.module'
import { createLoggerService } from '@natankamusher/custom-logger-nest';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule, {
    logger: createLoggerService()
  });

  const config = new DocumentBuilder()
    .setTitle('School example')
    .setDescription('The school API description')
    .setVersion('1.0')
    .addTag('school')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(4002);
}
bootstrap();
