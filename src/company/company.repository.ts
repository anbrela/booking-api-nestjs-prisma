import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyRoles } from '../shared/types/company/roles';
@Injectable()
export class CompanyRepository {
  constructor(private prisma: PrismaService) {}

  async createCompany(data: CreateCompanyDto, user: User) {
    return this.prisma.company.create({
      data: {
        ...data,
        users: {
          create: [
            {
              userId: user?.id,
              role: CompanyRoles.ADMIN,
            },
          ],
        },
      },
    });
  }
}
