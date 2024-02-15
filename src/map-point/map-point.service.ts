import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MapPointRepository } from './map-point.repository';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MapPointService {
  constructor(
    private mapPointRepository: MapPointRepository,
    private jwt: JwtService,
  ) {}

  async createMapPoint(mapPointDto) {
    return this.mapPointRepository.createMapPoint(mapPointDto);
  }

  async getMapPointById(token: string, id: string) {
    const payload: JwtPayload = await this.jwt.verify(token);
    if (!payload) {
      throw new UnauthorizedException();
    }

    return this.mapPointRepository.getMapPointById(id);
  }
}
