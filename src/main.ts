import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);



  //config swagger
const config = new DocumentBuilder()
  .setTitle('Help Desk API')
  .setDescription('API para gerenciamento de tickets de suporte')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);

SwaggerModule.setup('api', app, document);

await app.listen(process.env.PORT ?? 3000);

}




bootstrap();


