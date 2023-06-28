import { IsOptional } from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;
}
