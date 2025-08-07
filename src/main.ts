import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dataSource from './config/typeorm-config';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const PORT = config.get<number>('port') ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation
  app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Amazon Clone Backend API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);  // Using '/api' endpoint


  await app.listen(PORT);
  console.log(`Server running on http://localhost:${PORT}`);
  //console.log(`Swagger UI: http://localhost:${PORT}/api`);
   // Database connection
  await dataSource.initialize()
    .then(() => console.log('Database Connected Successfully..'))
    .catch(error => console.log('Database Connection Error:', error));
}

bootstrap();