import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ example: 'usuario@correo.com', description: 'Correo electrónico del usuario' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Contrasena123*', description: 'Contraseña del usuario (mínimo 8 caracteres)' })
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
}