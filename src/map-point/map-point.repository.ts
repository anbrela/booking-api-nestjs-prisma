import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MapPointRepository {
  constructor(private prismaService: PrismaService) {}

  async getMapPointById(id: string) {
    return this.prismaService.mapPoint.findUnique({
      where: {
        id,
      },
    });
  }

  async createMapPoint(mapPointDto) {
    return this.prismaService.mapPoint.create({
      data: {
        name: mapPointDto.name,
        latitude: mapPointDto.latitude,
        longitude: mapPointDto.longitude,
      },
    });
  }
}
