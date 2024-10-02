import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectionSource } from './config/typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { loggerGlobal } from './middleware/logger.middleware';
import { auth } from 'express-openid-connect';
import { config as auth0Config } from './config/auth0';

/*if (process.env.ALLOW_INSECURE_TLS === 'true') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}*/

async function bootstrap() {
  await connectionSource.initialize();
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config));
  app.use(loggerGlobal);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Votaciones 2024')
    .setDescription(
      'Esta es una API construida con Nest para ser empleada en el modulo 5',
    )
    .setVersion('2.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
    // estos dos parametros el primero es para que funcione el despligue el otro es para que funcione local descomentar el que necesiten
    app.enableCors({
      origin: [
        'https://proyecto-modulo5-9du8p6xjj-christians-projects-35503206.vercel.app',  // Dominio de Vercel
        'http://localhost:4000',  // Para entorno local
      ], // Incluye tu dominio de Vercel y localhost
      methods: 'GET,POST,PUT,PATCH,DELETE',
      credentials: true, // Si estás manejando autenticación basada en cookies o encabezados de autenticación
    });
  await app.listen(3000);
}
bootstrap();
