import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectionSource } from './config/typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { loggerGlobal } from './middleware/logger.middleware';
import { auth } from 'express-openid-connect';
import {config as auth0Config, config} from './config/auth0'


/*if (process.env.ALLOW_INSECURE_TLS === 'true') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}*/

async function bootstrap() {
  await connectionSource.initialize()
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config))
  app.use(loggerGlobal)
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Votaciones 2024')
  .setDescription('Esta es una API construida con Nest para ser empleada en el modulo 5')
  .setVersion('2.0')
  .addBearerAuth()
  .build()
  const document =SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)
  app.enableCors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization']
  });
  await app.listen(3000);
}
bootstrap();
