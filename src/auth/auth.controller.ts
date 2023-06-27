import {
  Body,
  Controller,
  Delete,
  Get,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { GetToken, TokenCookieType } from './get-token.decorator';
import { User } from '@prisma/client';

@ApiCookieAuth()
@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() registerDto: RegisterDto) {
    return this.authService.signUp(registerDto);
  }

  @Delete('/remove')
  async signOut(@Body('email') email: string): Promise<void> {
    return this.authService.deleteUser(email);
  }

  @Get('/users')
  async getAllUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }

  @Post('/refresh')
  async refresh(
    @Res({ passthrough: true }) response: any,
    @GetToken() token: TokenCookieType,
  ): Promise<void> {
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    return this.authService.refresh(token, response);
  }

  @Post('/signin')
  async signIn(
    @GetToken() token: TokenCookieType,
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: any,
  ): Promise<void> {
    return this.authService.signIn(res, token, loginDto);
  }
}
