import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';

import { User } from '@prisma/client';
import { RolesIds } from '../shared/types/roles';
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
          create: [
            {
              roleId: RolesIds.USER,
            },
          ],
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
          deleteMany: {},
          create: formattedRoles.map((role) => ({
            roleId: role.id,
          })),
        },
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
}
