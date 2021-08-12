import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.APP_PORT;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  await app.listen(Number(PORT));
}
bootstrap();
