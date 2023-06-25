import { TaskStatus } from '../task.status';
import { IsEnum, IsString } from 'class-validator';

export class UpdateTaskStatusDto {
  @IsString()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
