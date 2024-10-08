import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Role } from '../role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  @IsEnum(Role)
  role: Role;
}
