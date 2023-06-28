import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Res,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { GetToken, TokenCookieType } from './get-token.decorator';
import { User } from '@prisma/client';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { RoleGuard } from './role/role.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiCookieAuth()
@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() registerDto: RegisterDto) {
    return this.authService.signUp(registerDto);
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

  //update user

  @UseGuards(AuthGuard(), RoleGuard)
  @SetMetadata('roles', ['ADMINISTRATOR'])
  @Patch('/:id')
  async updateUserRole(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.authService.updateUserRole(id, updateUserRoleDto);
  }
}
