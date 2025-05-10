import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api/v0');

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true
  }))
  app.enableCors(false);
  // verificar error del cors porke cuando decido obtener get users


  const config = new DocumentBuilder()
    .setTitle('Chanoi Api')
    .setDescription('API Description')
    .setVersion('0.1')
    .addApiKey({ type: 'apiKey', in: 'header', name: 'token', description: 'Token de autenticación' },'token')
    .addSecurityRequirements('token')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
