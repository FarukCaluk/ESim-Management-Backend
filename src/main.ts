import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module'; // ispravna putanja
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  // --- Config i port ---
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  // --- Swagger setup ---
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SIM Management API')
    .setDescription('API za korisnike i SIM kartice')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  // --- kraj Swagger setup ---

  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📖 Swagger docs available at http://localhost:${port}/api`);
}

bootstrap();
