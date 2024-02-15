import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Game } from '@prisma/client';
import { gameToUpdate } from '../shared/types/game/updateGame';

@Injectable()
export class GameRepository {
  constructor(private prismaService: PrismaService) {}

  async getGameById(id: string): Promise<Game> {
    return this.prismaService.game.findUnique({
      where: {
        id,
      },
      include: {
        city: true,
      },
    });
  }

  async createGame(email: string, gameDto: any) {
    return this.prismaService.game.create({
      data: {
        ...gameDto,
        city: {
          connect: {
            id: gameDto.city,
          },
        },
        author: {
          connect: {
            email,
          },
        },
      },
    });
  }

  async updateGame(gameData: gameToUpdate) {
    const {
      title,
      city,
      description,
      price,
      distance,
      images,
      duration,
      pointsOfInterest,
    } = gameData;

    return this.prismaService.game.update({
      where: {
        id: gameData.id,
      },
      data: {
        title,
        city: {
          connect: {
            id: city,
          },
        },
        description,
        price,
        images,
        distance,
        duration,
        pointsOfInterest: {
          connect: pointsOfInterest?.map((id) => ({ id })),
        },
        startingPoint: {
          connect: {
            id: gameData.startingPointId,
          },
        },
        endingPoint: {
          connect: {
            id: gameData.endingPointId,
          },
        },
      },
    });
  }
}
