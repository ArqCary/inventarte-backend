import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as patch from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  let httpsOptions: { key: Buffer; cert: Buffer } | undefined = undefined;

  if (process.env.NODE_ENV !== 'production') {
    httpsOptions = {
      key: fs.readFileSync(patch.join(process.cwd(), 'ssl', 'key.pem')),
      cert: fs.readFileSync(patch.join(process.cwd(), 'ssl', 'cert.pem')),
    };
  }

  const app = await NestFactory.create(AppModule, { httpsOptions });
  // Por medio de esta configuración puedo agregar validaciones a nivel global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Este me sirve para eliminar propiedades que entren en el body pero no estén definidas en los dtos
      forbidNonWhitelisted: true, // Por medio de este lo que hago es tirar un error si me pasan más datos de los que tengo definidos en mis dtos
      transform: true, // Esto transforma los datos que pasan por el body según los tenga definidos en mis dtos
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('InventarteApp API')
    .setDescription(
      'API REST para la gestión de usuarios, autenticación y notificaciones',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.getHttpAdapter().get('/', (req, res) => {
    res.redirect('/api/docs');
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Servidor corriendo en https://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `Swagger disponible en https://localhost:${process.env.PORT ?? 3000}/api/docs`,
  );
}
bootstrap();
