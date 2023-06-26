import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwt: JwtService,
  ) {}
  async signUp(registerDto: RegisterDto): Promise<{ accessToken: string }> {
    const { email, password, name } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const registerData = {
      email,
      password: hashedPassword,
      name,
    };

    try {
      const savedUser = await this.authRepository.signUp(registerData);

      const payload: JwtPayload = {
        email: savedUser.email,
        name: savedUser.name,
      };

      const accessToken = await this.jwt.sign(payload);

      return { accessToken };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      } else {
        console.log('error', error);

        throw new InternalServerErrorException('Internal server error');
      }
    }
  }

  async signIn(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new ConflictException('Email does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ConflictException('Invalid password');
    }

    const payload: JwtPayload = {
      email: user.email,
      name: user.name,
    };

    const accessToken = await this.jwt.sign(payload);

    return { accessToken };
  }
}
