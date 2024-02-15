import { Module } from '@nestjs/common';
import { MapPointController } from './map-point.controller';
import { MapPointService } from './map-point.service';
import { MapPointRepository } from './map-point.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [MapPointController],
  imports: [JwtModule],
  providers: [MapPointService, MapPointRepository],
  exports: [MapPointService],
})
export class MapPointModule {}
