import { IsISO8601, IsNotEmpty, IsOptional } from 'class-validator';
import { AvailabilityStatus } from '../../shared/types/status/availability-status';

export class CreateAvailabilityDto {
  @IsNotEmpty()
  companyId: string;

  @IsISO8601()
  day: string;

  @IsISO8601()
  start: string;

  @IsISO8601()
  end: string;

  @IsOptional()
  status?: AvailabilityStatus;
}
