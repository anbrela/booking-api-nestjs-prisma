import { IsOptional, IsString } from 'class-validator';

export class updateProfileDto {
  @IsString()
  @IsOptional()
  city?: string;
  @IsString()
  @IsOptional()
  about?: string;
  @IsString()
  @IsOptional()
  name?: string;
}
