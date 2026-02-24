import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Por medio de esta configuración puedo agregar validaciones a nivel global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Este me sirve para eliminar propiedades que entren en el body pero no estén definidas en los dtos
      forbidNonWhitelisted: true, // Por medio de este lo que hago es tirar un error si me pasan más datos de los que tengo definidos en mis dtos
      transform: true, // Esto transforma los datos que pasan por el body según los tenga definidos en mis dtos
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
