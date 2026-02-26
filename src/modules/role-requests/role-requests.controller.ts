import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoleRequestsService } from './role-requests.service';
import { UpdateRoleRequestDto } from './dto/update-role-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import type { User } from '@prisma/client';

@Controller('role-requests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoleRequestsController {
  constructor(private readonly roleRequestsService: RoleRequestsService) {}

  @Post()
  @Roles('EMPLOYEE')
  create(@GetUser() currentUser: User) {
    return this.roleRequestsService.create(currentUser);
  }

  @Get()
  @Roles('MASTER')
  findAll() {
    return this.roleRequestsService.findAll();
  }

  @Patch(':id/approve')
  @Roles('MASTER')
  approve(@Param('id') id: string) {
    return this.roleRequestsService.approve(id);
  }
  @Patch(':id/reject')
  @Roles('MASTER')
  reject(@Param('id') id: string) {
    return this.roleRequestsService.reject(id);
  }
}
