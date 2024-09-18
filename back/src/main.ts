import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { connectionSource } from './config/typeorm';

async function bootstrap() {
  await connectionSource.initialize()
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Votaciones')
  .setDescription('Esta es una API construida con Nest para ser empleada en el modulo 5')
  .setVersion('2.0')
  .addBearerAuth()
  .build()
  const document =SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)
  await app.listen(3000);
}
bootstrap();
