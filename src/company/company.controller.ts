import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';
import { GetUser } from '../shared/decorators/user/get-user.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCompanyStatusDto } from './dto/update-company-status.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('company')
@Controller('company')
@UseGuards(AuthGuard())
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  async createCompany(
    @GetUser() user: User,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    return this.companyService.createCompany(createCompanyDto, user);
  }

  @Get()
  async getAllCompanies() {
    return this.companyService.getAllCompanies();
  }

  @Get('/:id')
  async getCompanyById(@Param('id') id: string) {
    return this.companyService.getCompanyById(id);
  }

  @Patch('/status')
  async updateCompanyStatus(
    @Query('companyId') id: string,
    @Body() updateCompanyStatusDto: UpdateCompanyStatusDto,
  ) {
    return this.companyService.updateCompanyStatus(id, updateCompanyStatusDto);
  }

  @Put('/:id')
  async updateCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.updateCompany(id, updateCompanyDto);
  }
}
