import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { TokenCookieType } from './get-token.decorator';
import { setAuthCookies } from './utils';
import { User } from '@prisma/client';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { updateProfileDto } from './dto/updateProfile.dto';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwt: JwtService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.authRepository.findUsers();
  }
  async signUp(registerDto: RegisterDto): Promise<{ accessToken: string }> {
    const { email, password } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const registerData = {
      email,
      password: hashedPassword,
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
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }

  async findUserByEmail(email: string): Promise<void> {
    const exists = await this.authRepository.findByEmail(email);

    if (!exists) {
      throw new ConflictException('Email does not exist');
    }
  }

  async signIn(response: any, token: TokenCookieType, loginDto: LoginDto) {
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

    setAuthCookies({ payload, response, jwt: this.jwt, isLogin: true });
  }

  async updateProfile(
    token: string,
    profileDto: updateProfileDto,
  ): Promise<void> {
    const payload: JwtPayload = await this.jwt.verify(token);
    if (!payload) {
      throw new UnauthorizedException();
    }

    await this.authRepository.updateProfile(payload.email, profileDto);
  }
  async refresh(token: string, response) {
    const payload: JwtPayload = await this.jwt.verify(token);
    if (!payload) {
      throw new UnauthorizedException();
    }

    setAuthCookies({ payload, response, jwt: this.jwt, isLogin: false });
  }

  async updateUserRole(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    return this.authRepository.updateUserRole(id, updateUserRoleDto);
  }
}
