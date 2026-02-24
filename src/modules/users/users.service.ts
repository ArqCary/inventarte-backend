import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

type SafeUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  // Este objeto me permite mostrar los campos que deseo, en este caso evito devolver la password
  private readonly safeUser = {
    id: true,
    name: true,
    email: true,
    idCard: true,
    role: true,
    createdAt: true,
    updatedAt: true,
    password: false,
  };

  async create(createUserDto: CreateUserDto): Promise<SafeUser> {
    // Separamos el confirmPassword des resto para poder validarlo
    const { confirmPassword, ...rest } = createUserDto;

    // También validamos si el usuario existe antes de crearlo directamente, asi evito errores de prisma
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: rest.email }, { idCard: rest.idCard }],
      },
    });

    if (existingUser) {
      if (rest.email === existingUser.email) {
        throw new ConflictException('Un usuario con este correo ya existe');
      }
      throw new ConflictException(
        'Un usuario con este documento de identificación ya existe',
      );
    }

    if (rest.password !== confirmPassword) {
      throw new ConflictException('Las contraseñas no coinciden');
    }

    // Hasheo la password por temas de segguridad
    const hashedPassword = await bcrypt.hash(rest.password, 10);

    return this.prismaService.user.create({
      data: { ...rest, password: hashedPassword },
      select: this.safeUser,
    });
  }

  async findAll(): Promise<SafeUser[]> {
    return await this.prismaService.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: this.safeUser,
    });
  }

  async findOne(id: string): Promise<SafeUser> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: this.safeUser,
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  // Este lo estoy usando para validaciones de contraseñas en el auth.service
  async findOneWithPassword(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  // Aqui aplico la misma lógica del create para validar la password solo si el usuario quiere actualizar su contraseña
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    currentUser: SafeUser,
  ): Promise<SafeUser> {
    await this.findOne(id);

    if (
      currentUser.role !== Role.MASTER &&
      currentUser.role !== Role.ADMIN &&
      currentUser.id !== id
    ) {
      throw new ForbiddenException('Solo puedes actualizar tu propio perfil');
    }

    const { confirmPassword, ...rest } = updateUserDto;

    if (rest.password) {
      if (rest.password !== confirmPassword) {
        throw new ConflictException('Las contraseñas no coinciden');
      }
      rest.password = await bcrypt.hash(rest.password, 10);
    }

    return this.prismaService.user.update({
      where: { id },
      data: rest,
      select: this.safeUser,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prismaService.user.delete({
      where: { id },
    });
    return { message: 'Usuario eliminado correctamente' };
  }
}
