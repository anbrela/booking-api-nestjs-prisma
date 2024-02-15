import { CreateQuestionDto } from './create-question.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateQuestionDto extends CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
