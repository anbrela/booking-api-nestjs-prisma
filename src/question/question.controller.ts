import { Body, Controller, Post, Put } from '@nestjs/common';
import { QuestionService } from './question.service';
import { GetToken, TokenCookieType } from '../auth/get-token.decorator';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post('/')
  async createQuestion(
    @GetToken() token: TokenCookieType,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionService.createQuestion(token, createQuestionDto);
  }

  @Put('/')
  async updateQuestion(
    @GetToken() token: TokenCookieType,
    @Body() updateDto: UpdateQuestionDto,
  ) {
    return this.questionService.updateQuestion(token, updateDto);
  }
}
