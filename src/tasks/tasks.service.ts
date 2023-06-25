import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from '@prisma/client';
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

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.saveTask(createTaskDto);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAllTasks();
  }

  async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskRepository.getTasksWithFilters(filterDto);
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
