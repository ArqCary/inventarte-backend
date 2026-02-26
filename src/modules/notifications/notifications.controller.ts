import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationsService } from './notifications.service';
import type { User } from '@prisma/client';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async findAll(@GetUser() currentUser: User) {
    return await this.notificationsService.findAll(currentUser.id);
  }

  @Get('unread')
  async coutUnread(@GetUser() currentUser: User) {
    return await this.notificationsService.contUnread(currentUser.id);
  }

  @Patch('read')
  async markAllAsRead(@GetUser() currentUser: User) {
    return await this.notificationsService.markAllAsRead(currentUser.id);
  }
}
