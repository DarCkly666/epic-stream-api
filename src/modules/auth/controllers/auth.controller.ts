import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  //UseGuards,
  //Request,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../entities/dto/sign-in.dto';
import { Public } from '../public.endpoint';
//import { AuthGuard } from '../auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  //@UseGuards(AuthGuard)
  @Public()
  @Get('profile')
  getProfile() {
    return 'Public Profile';
  }
}
