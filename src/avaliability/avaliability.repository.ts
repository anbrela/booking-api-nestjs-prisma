import { PrismaService } from '../prisma/prisma.service';
import { CreateAvailabilityDto } from './dto/create-availability-dto';
import * as moment from 'moment';
import { ConflictException, Injectable } from '@nestjs/common';
import { Availability } from '@prisma/client';
import { FilterAvailabilitiesDto } from './dto/filter-availabilities.dto';
import { formatAvailabilitiesQuery } from './utils';
@Injectable()
export class AvailabilityRepository {
  constructor(private prisma: PrismaService) {}

  async getAvailabilities(filterAvailabilities: FilterAvailabilitiesDto) {
    const query = formatAvailabilitiesQuery(filterAvailabilities);

    return this.prisma.availability.findMany({
      orderBy: {
        start: 'asc',
      },
      where: query,
    });
  }

  async validateAvailability(start: string, end: string, day: string) {
    const dayAvailabilities = await this.getAvailabilities({ day });

    if (!dayAvailabilities?.length) {
      return true;
    }

    const startTime = moment(start).utc().hour();
    const endTime = moment(end).utc().hour();

    return dayAvailabilities.every((availability) => {
      const availabilityStartTime = moment(availability.start).utc().hour();
      const availabilityEndTime = moment(availability.end).utc().hour();

      return (
        startTime >= availabilityEndTime || endTime <= availabilityStartTime
      );
    });
  }

  async createAvailability(createAvailabilityDto: CreateAvailabilityDto) {
    const { start, end, day } = createAvailabilityDto;

    const isAvailable = await this.validateAvailability(start, end, day);

    if (!isAvailable) {
      throw new ConflictException('There are other availability in this time');
    }

    return this.prisma.availability.create({
      data: createAvailabilityDto,
    });
  }

  async createBulkAvailability(availabilities: Availability[]) {
    const saved = await this.prisma.availability.createMany({
      data: availabilities,
    });

    if (saved?.count > 0) {
      return availabilities;
    } else {
      throw new ConflictException('There was an error on creating bulk');
    }
  }
}
