import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

// custom imports
import { AppModule } from './app.module';

// type imports
import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    morgan('common', {
      skip: (req, res) => res.statusCode < 400,
    }),
  );

  await app.listen(5000);
}
bootstrap();
