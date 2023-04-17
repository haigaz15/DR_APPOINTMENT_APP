import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('DR Appointment Web App')
    .setDescription('The DR appointment web app API')
    .setVersion('1.0')
    .build();
    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('api',app,document);
    
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(4000, '127.0.0.1');
}
bootstrap();
