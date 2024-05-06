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
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use((req, res, next) => {
    const originalSend = res.send;

    // Customize the send method
    res.send = function (data: any) {
      console.log(data);
      // const customData = {
      //   data: data,
      //   message: 'success',
      // };

      originalSend.call(this, data);
    };
    next();
  });

  app.use(
    morgan('common', {
      skip: (req, res) => res.statusCode < 400,
    }),
  );

  const port = process.env.PORT;
  await app.listen(port);
}
bootstrap();
