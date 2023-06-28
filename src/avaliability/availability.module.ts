import { Module } from '@nestjs/common';
import { AvailabilityController } from './avaliability.controller';
import { AvailabilityService } from './availability.service';
import { AuthModule } from '../auth/auth.module';
import { AvailabilityRepository } from './avaliability.repository';

@Module({
  imports: [AuthModule],
  controllers: [AvailabilityController],
  providers: [AvailabilityService, AvailabilityRepository],
})
export class AvailabilityModule {}
