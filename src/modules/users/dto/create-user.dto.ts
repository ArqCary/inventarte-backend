import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Carlos Restrepo', description: 'Nombre completo del usuario' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'carlos@correo.com', description: 'Correo electrónico único del usuario' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 1234567890, description: 'Número de cédula único del usuario' })
  @IsNumber()
  @IsInt()
  idCard: number;

  @ApiProperty({ example: 'Contrasena123*', description: 'Contraseña (mínimo 8 caracteres)' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'Contrasena123*', description: 'Confirmación de contraseña' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  confirmPassword: string;

  @ApiPropertyOptional({ enum: Role, example: Role.EMPLOYEE, description: 'Rol del usuario (por defecto EMPLOYEE)' })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}