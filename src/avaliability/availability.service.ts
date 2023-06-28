import { ConflictException, Injectable } from '@nestjs/common';
import { AvailabilityRepository } from './avaliability.repository';
import { CreateAvailabilityDto } from './dto/create-availability-dto';
import { CreateBulkAvailabilityDto } from './dto/create-bulk-availability.dto';
import * as moment from 'moment/moment';
import { FilterAvailabilitiesDto } from './dto/filter-availabilities.dto';

@Injectable()
export class AvailabilityService {
  constructor(private availabilityRepository: AvailabilityRepository) {}

  async getAvailabilities(filterAvailabilities: FilterAvailabilitiesDto) {
    return this.availabilityRepository.getAvailabilities(filterAvailabilities);
  }

  async createAvailability(createAvaliabilityDto: CreateAvailabilityDto) {
    return this.availabilityRepository.createAvailability(
      createAvaliabilityDto,
    );
  }

  async createBulkAvailability(
    createBulkAvailabilityDto: CreateBulkAvailabilityDto,
  ) {
    const { start, end, day, interval, duration, companyId } =
      createBulkAvailabilityDto;
    const startTime = moment(start).utc().hour();
    const endTime = moment(end).utc().hour();

    const isAvailable = await this.availabilityRepository.validateAvailability(
      start,
      end,
      day,
    );

    if (!isAvailable) {
      throw new ConflictException('There are other availability in this time');
    }

    const availabilities = [];

    const durationAndIntervalToHours = (duration + interval) / 60;

    for (let i = startTime; i <= endTime; i += durationAndIntervalToHours) {
      availabilities.push({
        companyId,
        day,
        start: moment(day)
          .utc()
          .hour(i)
          .minutes(i % 1 === 0 ? 0 : 30)
          .toISOString(),
        end: moment(day)
          .utc()
          .hour(i)
          .minutes(i % 1 === 0 ? 0 : 30)
          .add(duration / 60, 'hours')
          .toISOString(),
      });
    }

    return this.availabilityRepository.createBulkAvailability(availabilities);
  }
}
