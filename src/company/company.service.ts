import { ConflictException, Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from '@prisma/client';
import { UpdateCompanyStatusDto } from './dto/update-company-status.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async createCompany(data: CreateCompanyDto, user: User) {
    if (!user) {
      throw new ConflictException('User not found');
    }

    await this.companyRepository.createCompany(data, user);
  }

  async getAllCompanies() {
    return this.companyRepository.getAllCompanies();
  }

  async getCompanyById(id: string) {
    return this.companyRepository.getCompanyById(id);
  }

  async updateCompanyStatus(
    id: string,
    updateCompanyStatusDto: UpdateCompanyStatusDto,
  ) {
    return this.companyRepository.updateCompanyStatus(
      id,
      updateCompanyStatusDto,
    );
  }

  async updateCompany(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepository.updateCompany(id, updateCompanyDto);
  }
}
