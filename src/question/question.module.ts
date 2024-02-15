import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionRepository } from './question.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [QuestionController],
  imports: [AuthModule],
  providers: [QuestionService, QuestionRepository],
})
export class QuestionModule {}
