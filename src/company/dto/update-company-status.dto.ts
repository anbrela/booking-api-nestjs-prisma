import { IsEnum, IsNotEmpty } from 'class-validator';
import { CompanyStatus } from '../../shared/types/status/company-status';

export class UpdateCompanyStatusDto {
  @IsNotEmpty()
  @IsEnum(CompanyStatus)
  status: string;
}
