import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';

import { User } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}
  async signUp(registerDto: RegisterDto): Promise<User> {
    return this.prisma.user.create({
      data: registerDto,
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
