import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { MailService } from '../mail/mail.service';
import { User } from '@prisma/client';

@Injectable()
export class RoleRequestsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly mailService: MailService,
  ) {}

  async create(currentUser: User) {
    const existingRequest = await this.prismaService.roleRequest.findFirst({
      where: {
        userId: currentUser.id,
        status: 'PENDING',
      },
    });

    if (existingRequest) {
      throw new ConflictException('Ya tienes una solicitud pendiente');
    }

    const request = await this.prismaService.roleRequest.create({
      data: {
        userId: currentUser.id,
      },
    });

    const master = await this.prismaService.user.findFirst({
      where: {
        role: 'MASTER',
      },
    });

    if (!master) return;

    await this.mailService.sendRoleRequestNotification(
      master.email,
      currentUser.name,
    );

    await this.notificationsService.create({
      userId: master.id,
      message: `El empleado ${currentUser.name} ha solicitado un cambio de rol a Administrador`,
    });

    return request;
  }

  async findAll() {
    return await this.prismaService.roleRequest.findMany({
      where: {
        status: 'PENDING',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const request = await this.prismaService.roleRequest.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!request) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    if (request.status !== 'PENDING') {
      throw new ConflictException('La solicitud ya fué procesada');
    }

    return request;
  }

  async approve(id: string) {
    const request = await this.findOne(id);

    await this.prismaService.user.update({
      where: { id: request.userId },
      data: {
        role: 'ADMIN',
      },
    });

    await this.prismaService.roleRequest.update({
      where: { id },
      data: {
        status: 'APPROVED',
      },
    });

    await this.mailService.sendRoleRequestResult(
      request.user.name,
      request.user.email,
      true,
    );

    await this.notificationsService.create({
      userId: request.userId,
      message:
        '¡Tu solicitud de cambio de rol fue aprobada, ahora esres Administrador!',
    });

    return {
      message: `${request.user.name} ahora es Administrador`,
    };
  }

  async reject(id: string) {
    const request = await this.findOne(id);

    await this.prismaService.roleRequest.update({
      where: { id },
      data: {
        status: 'REJECTED',
      },
    });

    await this.mailService.sendRoleRequestResult(
      request.user.name,
      request.user.email,
      false,
    );

    await this.notificationsService.create({
      userId: request.userId,
      message: 'Tu solicitud de cambio de rol fue rechazada',
    });

    return {
      message: `La solicitud de ${request.user.name} ha sido rechazada`,
    };
  }
}
