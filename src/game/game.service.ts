import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GameRepository } from './game.repository';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { TokenCookieType } from '../auth/get-token.decorator';
import { createGameDto } from './dto/createGame.dto';
import { updateGameDto } from './dto/updateGame.dto';
import { MapPointService } from '../map-point/map-point.service';
import { calculateDistance } from '../shared/funcs/distance';
import { v4 as uuidv4 } from 'uuid';

import sharp from 'sharp';
import * as path from 'path';

@Injectable()
export class GameService {
  constructor(
    private gameRepository: GameRepository,
    private mapPointService: MapPointService,
    private jwt: JwtService,
  ) {}
  async createGame(token: TokenCookieType, gameDto: createGameDto) {
    const payload: JwtPayload = await this.jwt.verify(token);
    if (!payload) {
      throw new UnauthorizedException();
    }
    await this.gameRepository.createGame(payload.email, gameDto);
  }

  async updateGame(token: TokenCookieType, gameDto: updateGameDto) {
    const payload: JwtPayload = await this.jwt.verify(token);
    if (!payload) {
      throw new UnauthorizedException();
    }

    const { startingPointId, endingPointId } = gameDto;

    const startingPoint = await this.mapPointService.getMapPointById(
      token,
      startingPointId,
    );

    const endingPoint = await this.mapPointService.getMapPointById(
      token,
      endingPointId,
    );

    const distance = calculateDistance(
      startingPoint.latitude,
      startingPoint.longitude,
      endingPoint.latitude,
      endingPoint.longitude,
    );

    const gameData = {
      ...gameDto,
      distance,
    };

    await this.gameRepository.updateGame(gameData);
  }

  async getGame(token: TokenCookieType, id: string) {
    const payload: JwtPayload = await this.jwt.verify(token);
    if (!payload) {
      throw new UnauthorizedException();
    }

    return await this.gameRepository.getGameById(id);
  }

  async processImage(token, file) {
    const payload: JwtPayload = await this.jwt.verify(token);
    if (!payload) {
      throw new UnauthorizedException();
    }

    const randomName = uuidv4() + '.webp';

    await sharp(file.buffer)
      .resize({
        width: 1200,
      })
      .webp({ effort: 3 })
      .toFile(path.join('uploads', randomName));

    return randomName;
  }
}
