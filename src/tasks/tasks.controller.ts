import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from '@prisma/client';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @Param('id') id: string,
  ): void {
    this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
