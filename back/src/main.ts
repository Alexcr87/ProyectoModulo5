import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectionSource } from './config/typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { loggerGlobal } from './middleware/logger.middleware';



async function bootstrap() {
  await connectionSource.initialize();
  const app = await NestFactory.create(AppModule);

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
    app.enableCors({
      origin: [
       'https://proyecto-modulo5.vercel.app',
       'http://localhost:4000'
      ], // Incluye tu dominio de Vercel y localhost
      methods: 'GET,POST,PUT,PATCH,DELETE',
      credentials:true
  
  // Si estás manejando autenticación basada en cookies o encabezados de autenticación
    });
  await app.listen(3000);
}
bootstrap();
