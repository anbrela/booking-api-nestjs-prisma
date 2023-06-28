import { IsEnum, IsISO8601, IsOptional, IsString } from 'class-validator';
import { AvailabilityStatus } from '../../shared/types/status/availability-status';

export class FilterAvailabilitiesDto {
  @IsISO8601()
  @IsOptional()
  day?: string;

  @IsOptional()
  @IsString()
  companyId?: number;

  @IsOptional()
  @IsEnum(AvailabilityStatus)
  status?: AvailabilityStatus;
}
