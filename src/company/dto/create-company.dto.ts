import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
