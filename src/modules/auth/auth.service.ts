import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const existingUser = await this.usersService.findOneWithPassword(
      loginAuthDto.email,
    );

    if (!existingUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const passwordMatch = await bcrypt.compare(
      loginAuthDto.password,
      existingUser.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = this.jwtService.sign({
      sub: existingUser.id,
      email: existingUser.email,
    });

    return {
      user: await this.usersService.findOne(existingUser.id),
      token,
    };
  }
}
