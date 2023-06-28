import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability-dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateBulkAvailabilityDto } from './dto/create-bulk-availability.dto';
import { FilterAvailabilitiesDto } from './dto/filter-availabilities.dto';

@Controller('availability')
@UseGuards(AuthGuard())
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @Post()
  async createAvailability(
    @Body() createAvailabilityDto: CreateAvailabilityDto,
  ) {
    return this.availabilityService.createAvailability(createAvailabilityDto);
  }

  @Get()
  async getAvailabilities(
    @Query() filterAvailabilities: FilterAvailabilitiesDto,
  ) {
    return this.availabilityService.getAvailabilities(filterAvailabilities);
  }

  @Post('/bulk')
  async createBulkAvailability(
    @Body() createBulkAvailabilityDto: CreateBulkAvailabilityDto,
  ) {
    return this.availabilityService.createBulkAvailability(
      createBulkAvailabilityDto,
    );
  }
}
