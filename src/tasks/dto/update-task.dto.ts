import { TaskStatus } from '../task.status';

export class UpdateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
}
