import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectionSource } from './config/typeorm';

async function bootstrap() {
  await connectionSource.initialize()
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
