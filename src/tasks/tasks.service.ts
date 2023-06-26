import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, User } from '@prisma/client';
import { TaskRepository } from './task.repository';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}
  async getTaskById(id: string): Promise<Task> {
    const foundTask = await this.taskRepository.findTaskById(id);

    if (!foundTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return foundTask;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.saveTask(createTaskDto, user);
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  deleteTask(id: string): void {
    const foundTask = this.taskRepository.findTaskById(id);
    if (!foundTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    this.taskRepository.deleteTask(id);
  }

  async updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto) {
    const foundTask = await this.getTaskById(id);

    if (!foundTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return this.taskRepository.updateTaskStatus(id, updateTaskStatusDto);
  }
}
