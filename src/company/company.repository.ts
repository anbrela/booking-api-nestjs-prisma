import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Company, User } from '@prisma/client';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyRoles } from '../shared/types/company/roles';
import { UpdateCompanyStatusDto } from './dto/update-company-status.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
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

  async getAllCompanies() {
    return this.prisma.company.findMany();
  }

  async getCompanyById(id: string) {
    return this.prisma.company.findUnique({
      where: {
        id,
      },
    });
  }

  async updateCompanyStatus(
    id: string,
    updateCompanyStatusDto: UpdateCompanyStatusDto,
  ) {
    const { status } = updateCompanyStatusDto;

    return this.prisma.company.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async updateCompany(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.prisma.company.update({
      where: {
        id,
      },
      data: {
        ...updateCompanyDto,
      },
    });
  }
}
