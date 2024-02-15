import { Body, Controller, Get, Post } from '@nestjs/common';
import { MapPointService } from './map-point.service';
import { GetToken, TokenCookieType } from '../auth/get-token.decorator';
import { createMapPointDto } from './dto/create-map-point.dto';

@Controller('map-point')
export class MapPointController {
  constructor(private mapPointService: MapPointService) {}

  @Get('/:id')
  async getMapPointById(
    @GetToken() token: TokenCookieType,
    @Body() id: string,
  ) {
    return this.mapPointService.getMapPointById(token, id);
  }

  @Post('/')
  async createMapPoint(
    @GetToken() token: TokenCookieType,
    @Body() mapPointDto: createMapPointDto,
  ) {
    return this.mapPointService.createMapPoint(mapPointDto);
  }
}
