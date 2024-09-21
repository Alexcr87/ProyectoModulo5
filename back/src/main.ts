import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectionSource } from './config/typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  await connectionSource.initialize()
  const app = await NestFactory.create(AppModule);
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
  });
  await app.listen(3000);
}
bootstrap();
