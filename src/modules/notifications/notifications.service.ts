import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    return await this.prismaService.notification.create({
      data: createNotificationDto,
    });
  }

  async findAll(id: string) {
    return await this.prismaService.notification.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async contUnread(id: string) {
    const count = await this.prismaService.notification.count({
      where: { userId: id, read: false },
    });
    return { unread: count };
  }

  async markAllAsRead(id: string) {
    await this.prismaService.notification.updateMany({
      where: { userId: id, read: false },
      data: { read: true },
    });
    return { message: 'Notificaciones marcadas como leídas' };
  }
}
