import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { RoleRequestsModule } from './modules/role-requests/role-requests.module';

@Module({
  imports: [
    // Esto permite que las variables de entorno estén disponibles en toda la aplicación sin necesidad de importar ConfigModule en cada módulo
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PrismaModule,
    AuthModule,
    MailModule,
    NotificationsModule,
    RoleRequestsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
