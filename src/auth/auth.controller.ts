import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() registerDto: RegisterDto) {
    return this.authService.signUp(registerDto);
  }

  @Post('/signin')
  async signIn(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginDto);
  }
}
