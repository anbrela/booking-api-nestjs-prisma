import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { CreateQuestionDto } from './dto/create-question.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenCookieType } from '../auth/get-token.decorator';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    private questionRepository: QuestionRepository,
    private jwt: JwtService,
  ) {}

  async createQuestion(
    token: TokenCookieType,
    createQuestionDto: CreateQuestionDto,
  ) {
    const payload: JwtPayload = await this.jwt.verify(token);
    if (!payload) {
      throw new UnauthorizedException();
    }

    return this.questionRepository.createQuestion(createQuestionDto);
  }

  async updateQuestion(token: TokenCookieType, updateDto: UpdateQuestionDto) {
    const payload: JwtPayload = await this.jwt.verify(token);
    if (!payload) {
      throw new UnauthorizedException();
    }

    return this.questionRepository.updateQuestion(updateDto);
  }
}
