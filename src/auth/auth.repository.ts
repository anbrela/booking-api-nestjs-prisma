import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';

import { User } from '@prisma/client';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async findUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  async signUp(registerDto: RegisterDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...registerDto,
        roles: {
          connect: {
            role: 'USER',
          },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        roles: {
          select: {
            role: true,
          },
        },
      },
    });
  }

  async updateProfile(email: string, profileDto: any): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { email },
        data: {
          ...profileDto,
        },
      });
    } catch (e) {
      throw new ConflictException('Error desconocido');
    }
  }

  async updateUserRole(
    id: string,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<any> {
    const { roles } = updateUserRoleDto;

    const appRoles = await this.prisma.role.findMany();
    const formattedRoles = roles.map((role) =>
      appRoles.find((appRole) => appRole.role === role),
    );

    return this.prisma.user.update({
      where: { id },
      data: {
        roles: {
          connect: formattedRoles.map((role) => ({ role: role.role })),
        },
      },
    });
  }
}
