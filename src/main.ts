import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend communication with a more permissive policy
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip away properties that do not have any decorators
    transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
  }));

  // The database is now managed manually via SQL scripts.
  // The seeding service is removed to avoid conflicts during startup.

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('VIRAL 33 Rent Cars API')
    .setDescription("Documentation de l'API pour l'application VIRAL 33 Rent Cars")
    .setVersion('1.0')
    .addBearerAuth() // For JWT authentication
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`🚀 Backend server is running on http://localhost:3000`);
  console.log(`📄 API documentation is available at http://localhost:3000/api`);
}
bootstrap();
