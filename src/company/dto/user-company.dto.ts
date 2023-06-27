import { IsNotEmpty } from 'class-validator';

export class UserCompanyDto {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  companyId: string;
}
