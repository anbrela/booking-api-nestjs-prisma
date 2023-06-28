import { IsNotEmpty } from 'class-validator';
import { CreateAvailabilityDto } from './create-availability-dto';

export class CreateBulkAvailabilityDto extends CreateAvailabilityDto {
  @IsNotEmpty()
  interval: number;

  @IsNotEmpty()
  duration: number;
}
