import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/password-crypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pwd: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValidPassword = await comparePassword(pwd, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.idUser, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
