import { Module } from '@nestjs/common';
import { RoleRequestsService } from './role-requests.service';
import { RoleRequestsController } from './role-requests.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [PrismaModule, NotificationsModule, MailModule],
  controllers: [RoleRequestsController],
  providers: [RoleRequestsService],
})
export class RoleRequestsModule {}
