import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionRepository {
  constructor(private prismaService: PrismaService) {}

  async createQuestion(createQuestionDto: CreateQuestionDto) {
    const { title, order, type, score, mapPointId, answer, gameId } =
      createQuestionDto;

    return this.prismaService.question.create({
      data: {
        title,
        order,
        type,
        score,
        answer,
        mapPoint: {
          connect: {
            id: mapPointId,
          },
        },
        game: {
          connect: {
            id: gameId,
          },
        },
      },
    });
  }

  async updateQuestion(updateDto: UpdateQuestionDto) {
    const { title, order, type, score, mapPointId, answer, gameId } = updateDto;

    return this.prismaService.question.update({
      where: {
        id: updateDto.id,
      },
      data: {
        title,
        order,
        type,
        score,
        answer,
        mapPoint: {
          connect: {
            id: mapPointId,
          },
        },
        game: {
          connect: {
            id: gameId,
          },
        },
      },
    });
  }
}
